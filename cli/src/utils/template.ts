import fs from 'fs-extra';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { TemplateConfig } from './config';

const execAsync = promisify(exec);

interface CloneOptions {
  name?: string;
  [key: string]: any;
}

/**
 * Clone a template repository to the target directory or copy from local template
 */
export async function cloneTemplate(
  template: TemplateConfig,
  targetDir: string,
  options: CloneOptions = {}
): Promise<void> {
  const { repository, branch = 'main', id } = template;

  // Ensure target directory exists
  await fs.ensureDir(targetDir);

  try {
    // Check if this is a local template (no repository or local path)
    const templatesDir = path.join(process.cwd(), 'templates');
    const localTemplateDir = path.join(templatesDir, id);

    if (!repository || repository.startsWith('file://') || await fs.pathExists(localTemplateDir)) {
      // Use local template
      const sourceDir = repository && repository.startsWith('file://')
        ? repository.replace('file://', '')
        : localTemplateDir;

      if (await fs.pathExists(sourceDir)) {
        // Copy local template directory
        await fs.copy(sourceDir, targetDir);
      } else {
        throw new Error(`Local template directory not found: ${sourceDir}`);
      }
    } else {
      // Clone from Git repository
      const cloneCommand = `git clone --depth 1 --branch ${branch} ${repository} "${targetDir}"`;
      await execAsync(cloneCommand);

      // Remove .git directory to make it a fresh project
      const gitDir = path.join(targetDir, '.git');
      if (await fs.pathExists(gitDir)) {
        await fs.remove(gitDir);
      }
    }

    // Process template variables
    await processTemplateVariables(targetDir, options);

  } catch (error) {
    throw new Error(`Failed to clone/copy template: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Process template variables in files
 */
async function processTemplateVariables(targetDir: string, options: CloneOptions): Promise<void> {
  const { name } = options;

  if (!name) return;

  // Files that commonly contain project names
  const filesToProcess = [
    'package.json',
    'README.md',
    'index.html',
    'public/index.html',
    'src/index.html',
    'vite.config.ts',
    'vite.config.js',
    'next.config.js',
    'nuxt.config.ts',
    'svelte.config.js'
  ];

  for (const file of filesToProcess) {
    const filePath = path.join(targetDir, file);

    if (await fs.pathExists(filePath)) {
      try {
        let content = await fs.readFile(filePath, 'utf-8');

        // Replace common placeholders
        content = content.replace(/\{\{project-name\}\}/g, name);
        content = content.replace(/\{\{PROJECT_NAME\}\}/g, name.toUpperCase());
        content = content.replace(/\{\{ProjectName\}\}/g, capitalizeFirst(name));

        await fs.writeFile(filePath, content, 'utf-8');
      } catch (error) {
        // Skip files that can't be processed
        console.warn(`Could not process template variables in ${file}:`, error);
      }
    }
  }
}

/**
 * Initialize a git repository in the target directory
 */
export async function initializeGitRepo(targetDir: string): Promise<void> {
  try {
    await execAsync('git init', { cwd: targetDir });
    await execAsync('git add .', { cwd: targetDir });
    await execAsync('git commit -m "Initial commit from Scalix scaffold"', { cwd: targetDir });
  } catch (error) {
    console.warn('Could not initialize git repository:', error);
  }
}

/**
 * Install dependencies in the target directory
 */
export async function installDependencies(targetDir: string, packageManager: 'npm' | 'yarn' | 'pnpm' = 'npm'): Promise<void> {
  try {
    const installCommand = packageManager === 'yarn' ? 'yarn install' : `${packageManager} install`;
    await execAsync(installCommand, { cwd: targetDir });
  } catch (error) {
    console.warn('Could not install dependencies:', error);
  }
}

/**
 * Check if a template repository exists and is accessible
 */
export async function validateTemplateRepository(template: TemplateConfig): Promise<boolean> {
  try {
    // Try to fetch repository info using git ls-remote
    await execAsync(`git ls-remote --heads ${template.repository}`);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Utility function to capitalize first letter
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
