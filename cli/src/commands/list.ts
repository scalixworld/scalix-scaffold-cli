import chalk from 'chalk';
import { getAvailableTemplates } from '../utils/config';

export async function listTemplates() {
  console.log(chalk.blue.bold('📋 Available Scalix World Templates\n'));

  try {
    const templates = await getAvailableTemplates();

    if (templates.length === 0) {
      console.log(chalk.yellow('No templates found.'));
      return;
    }

    templates.forEach((template, index) => {
      console.log(`${chalk.green(template.id.padEnd(12))} ${chalk.cyan(template.name)}`);
      console.log(`  ${chalk.gray(template.description)}`);
      if (template.tags && template.tags.length > 0) {
        console.log(`  ${chalk.gray('Tags:')} ${template.tags.map(tag => chalk.blue(tag)).join(', ')}`);
      }
      if (index < templates.length - 1) {
        console.log();
      }
    });

    console.log('\n' + chalk.gray('Use: scalix-world create <name> --template <template-id>'));

  } catch (error) {
    console.error(chalk.red(`Error listing templates: ${error instanceof Error ? error.message : 'Unknown error'}`));
    process.exit(1);
  }
}
