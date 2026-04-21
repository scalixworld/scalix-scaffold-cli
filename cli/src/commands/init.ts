import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { cloneTemplate } from '../utils/template';
import { getTemplateConfig } from '../utils/config';

export async function initTemplate(templateId: string) {
  const spinner = ora();

  try {
    console.log(chalk.blue.bold(`🚀 Initializing template: ${chalk.green(templateId)}`));

    // Check if current directory is empty (except for common files)
    const currentDir = process.cwd();
    const files = await fs.readdir(currentDir);
    const ignoreFiles = ['.git', '.gitignore', 'README.md', '.DS_Store'];
    const significantFiles = files.filter(file => !ignoreFiles.includes(file));

    if (significantFiles.length > 0) {
      console.log(chalk.yellow('Warning: Current directory is not empty.'));
      console.log('Files found:', significantFiles.join(', '));
      console.log(chalk.red('Please run this command in an empty directory or use "scalix-scaffold create" instead.'));
      process.exit(1);
    }

    // Get template configuration
    spinner.start('Fetching template information...');
    const templateConfig = await getTemplateConfig(templateId);
    spinner.succeed(`Using template: ${chalk.cyan(templateConfig.name)}`);

    // Clone template to current directory
    spinner.start('Initializing template in current directory...');
    await cloneTemplate(templateConfig, currentDir);
    spinner.succeed('Template initialized successfully!');

    // Display next steps
    console.log('\n' + chalk.green.bold('✅ Success!'));
    console.log(`Template "${templateId}" has been initialized in the current directory.`);

    console.log('\n' + chalk.blue.bold('Next steps:'));
    console.log('  npm install');
    console.log('  npm run dev');

    if (templateConfig.postInstall) {
      console.log('\n' + chalk.yellow('Additional setup required:'));
      templateConfig.postInstall.forEach((step: string) => {
        console.log(`  ${chalk.gray('•')} ${step}`);
      });
    }

  } catch (error) {
    spinner.fail('Failed to initialize template');
    console.error(chalk.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}
