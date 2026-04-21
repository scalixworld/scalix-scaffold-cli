#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { createApp } from './commands/create';
import { listTemplates } from './commands/list';
import { initTemplate } from './commands/init';
import { validateCommand } from './commands/validate';

const program = new Command();

program
  .name('scalix-world')
  .description('Scalix World CLI - Create new Scalix World applications from templates')
  .version('0.1.0');

program
  .command('create <name>')
  .description('Create a new Scalix World application from a template')
  .option('-t, --template <template>', 'Template to use (admin-dashboard, crm, ecommerce, analytics)', 'admin-dashboard')
  .option('-d, --directory <directory>', 'Directory to create the app in')
  .option('--yes', 'Skip interactive prompts and use defaults')
  .action(createApp);

program
  .command('list')
  .alias('ls')
  .description('List available Scalix World templates')
  .action(listTemplates);

program
  .command('init <template>')
  .description('Initialize a Scalix World template in the current directory')
  .action(initTemplate);

program
  .command('validate')
  .description('Validate Scalix World templates or current directory')
  .option('-t, --template <template>', 'Validate a specific template')
  .option('--all', 'Validate all available templates')
  .option('--strict', 'Use strict validation mode')
  .action(validateCommand);

program
  .command('help')
  .description('Display help information')
  .action(() => program.help());

// Handle unknown commands
program.on('command:*', (unknownCommand) => {
  console.error(chalk.red(`Unknown command: ${unknownCommand[0]}`));
  console.log(chalk.yellow('Run "scalix-world --help" to see available commands'));
  process.exit(1);
});

// Default action when no command is provided
if (process.argv.length === 2) {
  console.log(chalk.blue.bold('🚀 Scalix World CLI'));
  console.log(chalk.gray('Create new Scalix World applications from templates\n'));
  program.help();
}

program.parse();
