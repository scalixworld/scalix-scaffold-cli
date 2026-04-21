import chalk from 'chalk';
import { validateTemplate, validateTemplateForUse, formatValidationResults } from '../utils/validation';
import { getAvailableTemplates, getTemplateConfig } from '../utils/config';

interface ValidateOptions {
  template?: string;
  strict?: boolean;
  all?: boolean;
}

export async function validateCommand(options: ValidateOptions) {
  const { template, strict = false, all = false } = options;

  try {
    if (all) {
      // Validate all templates
      console.log(chalk.blue.bold('🔍 Validating all templates...\n'));

      const templates = await getAvailableTemplates();
      let totalErrors = 0;
      let totalWarnings = 0;

      for (const templateConfig of templates) {
        console.log(chalk.cyan(`Validating template: ${templateConfig.name} (${templateConfig.id})`));

        const result = await validateTemplateForUse(templateConfig);

        if (!result.isValid || result.errors.length > 0 || result.warnings.length > 0) {
          console.log(formatValidationResults(result));
        } else {
          console.log(chalk.green('✅ Template is valid'));
        }

        totalErrors += result.errors.length;
        totalWarnings += result.warnings.length;

        console.log(); // Empty line between templates
      }

      console.log(chalk.blue.bold('📊 Validation Summary:'));
      console.log(`Total errors: ${totalErrors > 0 ? chalk.red(totalErrors) : chalk.green(totalErrors)}`);
      console.log(`Total warnings: ${totalWarnings > 0 ? chalk.yellow(totalWarnings) : chalk.green(totalWarnings)}`);

      if (totalErrors === 0) {
        console.log(chalk.green.bold('\n🎉 All templates are valid!'));
      } else {
        console.log(chalk.red.bold('\n❌ Some templates have errors that need to be fixed.'));
        process.exit(1);
      }

    } else if (template) {
      // Validate specific template
      console.log(chalk.blue.bold(`🔍 Validating template: ${template}\n`));

      const templateConfig = await getTemplateConfig(template);
      const result = await validateTemplateForUse(templateConfig);

      console.log(formatValidationResults(result));

      if (!result.isValid) {
        console.log(chalk.red.bold('\n❌ Template validation failed!'));
        process.exit(1);
      } else {
        console.log(chalk.green.bold('\n✅ Template is valid!'));
      }

    } else {
      // Validate current directory as template
      console.log(chalk.blue.bold('🔍 Validating current directory as template...\n'));

      const result = await validateTemplate(process.cwd(), {
        checkRepository: true,
        checkDependencies: true,
        strictMode: strict
      });

      console.log(formatValidationResults(result));

      if (!result.isValid) {
        console.log(chalk.red.bold('\n❌ Directory is not a valid template!'));
        process.exit(1);
      } else {
        console.log(chalk.green.bold('\n✅ Directory is a valid template!'));
      }
    }

  } catch (error) {
    console.error(chalk.red(`Error during validation: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}
