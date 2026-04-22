import fs from 'fs-extra';
import path from 'path';
import { TemplateConfig } from './config';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface TemplateValidationOptions {
  checkRepository?: boolean;
  checkDependencies?: boolean;
  strictMode?: boolean;
}

/**
 * Comprehensive template validation
 */
export async function validateTemplate(
  templatePath: string,
  options: TemplateValidationOptions = {}
): Promise<ValidationResult> {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  try {
    // Check if template directory exists
    if (!(await fs.pathExists(templatePath))) {
      result.errors.push(`Template directory does not exist: ${templatePath}`);
      result.isValid = false;
      return result;
    }

    // Check package.json
    await validatePackageJson(templatePath, result);

    // Check required files
    await validateRequiredFiles(templatePath, result);

    // Check configuration files
    await validateConfigFiles(templatePath, result);

    // Check source structure
    await validateSourceStructure(templatePath, result);

    // Optional checks
    if (options.checkRepository) {
      await validateRepository(templatePath, result);
    }

    if (options.checkDependencies) {
      await validateDependencies(templatePath, result);
    }

    // Strict mode checks
    if (options.strictMode) {
      await validateStrictMode(templatePath, result);
    }

  } catch (error) {
    result.errors.push(`Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    result.isValid = false;
  }

  return result;
}

/**
 * Validate package.json
 */
async function validatePackageJson(templatePath: string, result: ValidationResult): Promise<void> {
  const packagePath = path.join(templatePath, 'package.json');

  if (!(await fs.pathExists(packagePath))) {
    result.errors.push('package.json is required');
    result.isValid = false;
    return;
  }

  try {
    const packageJson = await fs.readJson(packagePath);

    // Check required fields
    const requiredFields = ['name', 'version'];
    for (const field of requiredFields) {
      if (!packageJson[field]) {
        result.errors.push(`package.json missing required field: ${field}`);
        result.isValid = false;
      }
    }

    // Check scalixWorldTemplate configuration
    if (!packageJson.scalixWorldTemplate) {
      result.errors.push('package.json missing scalixWorldTemplate configuration');
      result.isValid = false;
      return;
    }

    const templateConfig = packageJson.scalixWorldTemplate;
    const requiredTemplateFields = ['id', 'name', 'description'];

    for (const field of requiredTemplateFields) {
      if (!templateConfig[field]) {
        result.errors.push(`scalixWorldTemplate missing required field: ${field}`);
        result.isValid = false;
      }
    }

    // Validate template ID format
    if (templateConfig.id && !/^[a-z][a-z0-9-]*$/.test(templateConfig.id)) {
      result.errors.push('Template ID must be lowercase with hyphens only');
      result.isValid = false;
    }

    // Check for template variables in name
    if (packageJson.name && packageJson.name.includes('{{project-name}}')) {
      result.warnings.push('Template name contains placeholder variables');
    }

  } catch (error) {
    result.errors.push(`Invalid package.json: ${error instanceof Error ? error.message : 'Parse error'}`);
    result.isValid = false;
  }
}

/**
 * Validate required files exist
 */
async function validateRequiredFiles(templatePath: string, result: ValidationResult): Promise<void> {
  const requiredFiles = [
    'package.json'
  ];

  const recommendedFiles = [
    'README.md',
    'README-template.md'
  ];

  for (const file of requiredFiles) {
    if (!(await fs.pathExists(path.join(templatePath, file)))) {
      result.errors.push(`Required file missing: ${file}`);
      result.isValid = false;
    }
  }

  for (const file of recommendedFiles) {
    if (!(await fs.pathExists(path.join(templatePath, file)))) {
      result.warnings.push(`Recommended file missing: ${file}`);
    }
  }
}

/**
 * Validate configuration files
 */
async function validateConfigFiles(templatePath: string, result: ValidationResult): Promise<void> {
  const configFiles = [
    { file: 'tsconfig.json', type: 'typescript' },
    { file: 'vite.config.ts', type: 'vite' },
    { file: 'next.config.js', type: 'nextjs' },
    { file: 'tailwind.config.js', type: 'tailwind' },
    { file: 'postcss.config.js', type: 'postcss' }
  ];

  for (const config of configFiles) {
    const configPath = path.join(templatePath, config.file);
    if (await fs.pathExists(configPath)) {
      try {
        if (config.file.endsWith('.json')) {
          await fs.readJson(configPath);
        } else if (config.file.endsWith('.js') || config.file.endsWith('.ts')) {
          // Basic syntax check by requiring the file
          const content = await fs.readFile(configPath, 'utf-8');
          if (!content.trim()) {
            result.warnings.push(`Empty config file: ${config.file}`);
          }
        }
      } catch (error) {
        result.errors.push(`Invalid ${config.type} config: ${config.file}`);
        result.isValid = false;
      }
    }
  }
}

/**
 * Validate source code structure
 */
async function validateSourceStructure(templatePath: string, result: ValidationResult): Promise<void> {
  const srcDirs = ['src', 'app', 'pages', 'components'];

  let hasSource = false;
  for (const dir of srcDirs) {
    if (await fs.pathExists(path.join(templatePath, dir))) {
      hasSource = true;

      // Check for main entry files
      const entryFiles = ['index.js', 'index.ts', 'index.tsx', 'main.ts', 'main.tsx', 'page.tsx', 'page.js'];
      let hasEntry = false;

      for (const entry of entryFiles) {
        if (await fs.pathExists(path.join(templatePath, dir, entry))) {
          hasEntry = true;
          break;
        }
      }

      if (!hasEntry) {
        result.warnings.push(`No entry file found in ${dir}/ directory`);
      }
      break;
    }
  }

  if (!hasSource) {
    result.errors.push('No source directory found (src/, app/, pages/, or components/)');
    result.isValid = false;
  }
}

/**
 * Validate repository accessibility
 */
async function validateRepository(templatePath: string, result: ValidationResult): Promise<void> {
  try {
    const packagePath = path.join(templatePath, 'package.json');
    const packageJson = await fs.readJson(packagePath);

    if (packageJson.scalixWorldTemplate?.repository) {
      const repo = packageJson.scalixWorldTemplate.repository;

      // Basic URL validation
      try {
        const url = new URL(repo);
        if (!url.protocol.startsWith('http')) {
          result.errors.push('Repository URL must use HTTP/HTTPS protocol');
          result.isValid = false;
        }
        if (!url.hostname.includes('github.com')) {
          result.warnings.push('Repository is not on GitHub - may not be accessible');
        }
      } catch {
        result.errors.push('Invalid repository URL format');
        result.isValid = false;
      }
    } else {
      result.warnings.push('No repository URL specified in scalixWorldTemplate');
    }
  } catch (error) {
    result.warnings.push('Could not validate repository configuration');
  }
}

/**
 * Validate dependencies
 */
async function validateDependencies(templatePath: string, result: ValidationResult): Promise<void> {
  try {
    const packagePath = path.join(templatePath, 'package.json');
    const packageJson = await fs.readJson(packagePath);

    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies
    };

    // Check for problematic dependencies
    const problematicDeps = ['webpack', 'babel-core']; // Old versions
    for (const dep of problematicDeps) {
      if (allDeps[dep]) {
        result.warnings.push(`Potentially outdated dependency: ${dep}`);
      }
    }

    // Check for required peer dependencies
    if (allDeps['vite'] && !packageJson.peerDependencies?.vite) {
      result.warnings.push('Vite is used but not listed as peer dependency');
    }

  } catch (error) {
    result.warnings.push('Could not validate dependencies');
  }
}

/**
 * Strict mode validations
 */
async function validateStrictMode(templatePath: string, result: ValidationResult): Promise<void> {
  // Check for .gitignore
  if (!(await fs.pathExists(path.join(templatePath, '.gitignore')))) {
    result.errors.push('.gitignore file is required');
    result.isValid = false;
  }

  // Check for LICENSE file
  if (!(await fs.pathExists(path.join(templatePath, 'LICENSE')))) {
    result.warnings.push('LICENSE file is recommended');
  }

  // Check package.json for additional fields
  try {
    const packagePath = path.join(templatePath, 'package.json');
    const packageJson = await fs.readJson(packagePath);

    const recommendedFields = ['description', 'keywords', 'author', 'license'];
    for (const field of recommendedFields) {
      if (!packageJson[field]) {
        result.warnings.push(`Recommended package.json field missing: ${field}`);
      }
    }
  } catch {
    // Already handled in package.json validation
  }
}

/**
 * Validate template before using it
 */
export async function validateTemplateForUse(template: TemplateConfig): Promise<ValidationResult> {
  // For now, just do basic validation of the template config
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Validate required fields
  if (!template.id) {
    result.errors.push('Template ID is required');
    result.isValid = false;
  }

  if (!template.name) {
    result.errors.push('Template name is required');
    result.isValid = false;
  }

  if (!template.description) {
    result.errors.push('Template description is required');
    result.isValid = false;
  }

  if (!template.repository) {
    result.errors.push('Template repository is required');
    result.isValid = false;
  }

  // Validate repository URL format
  if (template.repository) {
    try {
      const url = new URL(template.repository);
      if (!url.protocol.startsWith('http')) {
        result.errors.push('Repository URL must use HTTP/HTTPS protocol');
        result.isValid = false;
      }
    } catch {
      result.errors.push('Invalid repository URL format');
      result.isValid = false;
    }
  }

  // Validate tags
  if (template.tags) {
    for (const tag of template.tags) {
      if (!/^[a-z0-9-]+$/.test(tag)) {
        result.warnings.push(`Tag "${tag}" should be lowercase with hyphens only`);
      }
    }
  }

  return result;
}

/**
 * Format validation results for display
 */
export function formatValidationResults(result: ValidationResult): string {
  let output = '';

  if (result.errors.length > 0) {
    output += '❌ Errors:\n';
    result.errors.forEach(error => {
      output += `  • ${error}\n`;
    });
  }

  if (result.warnings.length > 0) {
    output += '⚠️  Warnings:\n';
    result.warnings.forEach(warning => {
      output += `  • ${warning}\n`;
    });
  }

  if (result.isValid && result.errors.length === 0 && result.warnings.length === 0) {
    output += '✅ Template validation passed\n';
  }

  return output.trim();
}
