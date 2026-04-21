import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { cloneTemplate } from '../utils/template';
import { getTemplateConfig, validateTemplateConfig } from '../utils/config';
import { validateTemplateForUse } from '../utils/validation';
import { runPreflightChecks, formatDependencyResults, getInstallationInstructions } from '../utils/dependencies';
import { StepProgress, startProgress, succeedProgress, failProgress } from '../utils/progress';

interface CreateOptions {
  template: string;
  directory?: string;
  yes: boolean;
}

export async function createApp(name: string, options: CreateOptions) {
  const steps = new StepProgress(6, 'Initializing');

  try {
    console.log(chalk.blue.bold(`🚀 Creating new Scalix World app: ${chalk.green(name)}`));

    // Determine target directory first
    let targetDir = options.directory;
    if (!targetDir) {
      if (options.yes) {
        targetDir = name;
      } else {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'directory',
            message: 'Where would you like to create the app?',
            default: name,
            validate: (input: string) => {
              if (!input.trim()) {
                return 'Directory name cannot be empty';
              }
              return true;
            }
          }
        ]);
        targetDir = answers.directory;
      }
    }

    // Step 1: Pre-flight checks
    steps.next('Running pre-flight checks');
    const preflight = await runPreflightChecks(path.dirname(path.resolve(targetDir!)));

    if (!preflight.allPassed) {
      console.log('\n' + chalk.red('❌ Pre-flight checks failed:'));
      console.log(formatDependencyResults(preflight.checks.filter(c => !c.installed)));

      const instructions = getInstallationInstructions(preflight.checks);
      if (instructions) {
        console.log('\n' + chalk.yellow('💡 Installation instructions:'));
        console.log(instructions);
      }

      throw new Error('System requirements not met. Please install required dependencies and try again.');
    }

    console.log(chalk.green('✅ System requirements met'));

    // Step 2: Validate inputs
    steps.next('Validating inputs');
    if (!name.trim()) {
      throw new Error('App name cannot be empty');
    }

    // Step 3: Check target directory
    steps.next('Setting up target directory');

    const fullPath = path.resolve(targetDir!);

    // Check if directory already exists
    if (await fs.pathExists(fullPath)) {
      const { overwrite } = options.yes ? { overwrite: false } : await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Directory "${targetDir}" already exists. Overwrite?`,
          default: false
        }
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
      }

      startProgress('Removing existing directory...');
      await fs.remove(fullPath);
      succeedProgress('Removed existing directory');
    }

    // Step 3: Get and validate template
    steps.next('Validating template');
    const templateConfig = await getTemplateConfig(options.template);

    // Validate template configuration
    const validationResult = await validateTemplateForUse(templateConfig);
    if (!validationResult.isValid) {
      console.log(chalk.red('Template validation failed:'));
      validationResult.errors.forEach(error => console.log(`  ❌ ${error}`));
      throw new Error('Invalid template configuration');
    }

    if (validationResult.warnings.length > 0) {
      console.log(chalk.yellow('Template warnings:'));
      validationResult.warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
    }

    console.log(`Using template: ${chalk.cyan(templateConfig.name)}`);

    // Step 5: Clone and process template
    steps.next('Creating app from template');
    try {
      startProgress('Setting up template...');
      await cloneTemplate(templateConfig, fullPath, { name });
      succeedProgress('Template cloned successfully');
    } catch (error) {
      failProgress('Failed to clone template');
      console.error(chalk.red('\n❌ Failed to clone template:'));
      console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
      console.log(chalk.yellow('\n💡 Troubleshooting tips:'));
      console.log('  • Check if the template directory exists');
      console.log('  • Ensure you have read/write permissions');
      console.log('  • Try a different template with: scalix-world list');
      process.exit(1);
    }

    // Step 6: Final setup
    steps.next('Finalizing setup');
    try {
      // Replace project-name in package.json and other files
      const projectName = path.basename(fullPath);
      await replaceTemplateVariables(fullPath, projectName);
      steps.complete('App created successfully!');
    } catch (error) {
      failProgress('Failed to finalize setup');
      console.error(chalk.red('\n❌ Failed to finalize setup:'));
      console.error(chalk.red(error instanceof Error ? error.message : 'Unknown error'));
      console.log(chalk.yellow('\nThe app was created but some files may not be properly configured.'));
      console.log(chalk.yellow('You can manually edit the files or delete and recreate the app.'));
      process.exit(1);
    }

    // Display next steps
    console.log('\n' + chalk.green.bold('✅ Success!'));
    console.log(`Your new Scalix World app has been created in: ${chalk.cyan(fullPath)}`);

    console.log('\n' + chalk.blue.bold('Next steps:'));
    console.log(`  cd ${targetDir}`);
    console.log('  npm install');
    console.log('  npm run dev');

    if (templateConfig.postInstall) {
      console.log('\n' + chalk.yellow('Additional setup required:'));
      templateConfig.postInstall.forEach((step: string) => {
        console.log(`  ${chalk.gray('•')} ${step}`);
      });
    }

  } catch (error) {
    steps.fail('Failed to create app');

    // Provide helpful error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('Template') && errorMessage.includes('not found')) {
      console.log('\n' + chalk.yellow('💡 Tip: Run "scalix-world list" to see available templates'));
    } else if (errorMessage.includes('directory') && errorMessage.includes('exists')) {
      console.log('\n' + chalk.yellow('💡 Tip: Use --yes flag to overwrite existing directories'));
    } else if (errorMessage.includes('network') || errorMessage.includes('clone')) {
      console.log('\n' + chalk.yellow('💡 Tip: Check your internet connection and repository access'));
    }

    console.error(chalk.red(`Error: ${errorMessage}`));
    process.exit(1);
  }
}

/**
 * Replace template variables in files
 */
async function replaceTemplateVariables(appPath: string, projectName: string) {
  const filesToProcess = [
    'package.json',
    'README-template.md',
    'src/index.html', // For Vite apps
    'index.html', // For other apps
    'src/App.tsx', // For React template
    'src/main.tsx', // For Vite React apps
    'src/app/page.tsx', // For Next.js template
    'src/app/layout.tsx', // For Next.js template
  ];

  for (const file of filesToProcess) {
    const filePath = path.join(appPath, file);
    if (await fs.pathExists(filePath)) {
      try {
        let content = await fs.readFile(filePath, 'utf-8');
        content = content.replace(/\{\{project-name\}\}/g, projectName);
        content = content.replace(/\{\{PROJECT_NAME\}\}/g, projectName.toUpperCase().replace(/[^A-Z0-9]/g, '_'));
        await fs.writeFile(filePath, content, 'utf-8');
      } catch (error) {
        console.warn(chalk.yellow(`Warning: Could not process ${file}: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    }
  }
}
