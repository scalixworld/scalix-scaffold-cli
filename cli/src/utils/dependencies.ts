import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import fs from 'fs-extra';
import path from 'path';

const execAsync = promisify(exec);

export interface DependencyCheck {
  name: string;
  required: boolean;
  installed: boolean;
  version?: string;
  error?: string;
}

export interface SystemRequirements {
  node: string;
  npm: string;
  git: string;
  platform?: string;
}

/**
 * Check if a command is available on the system
 */
export async function checkCommand(command: string): Promise<DependencyCheck> {
  try {
    const { stdout } = await execAsync(`${command} --version`);
    const version = stdout.trim().split('\n')[0];

    return {
      name: command,
      required: true,
      installed: true,
      version
    };
  } catch (error) {
    return {
      name: command,
      required: true,
      installed: false,
      error: `${command} is not installed or not in PATH`
    };
  }
}

/**
 * Check Node.js version
 */
export async function checkNodeVersion(): Promise<DependencyCheck> {
  try {
    const { stdout } = await execAsync('node --version');
    const version = stdout.trim().replace('v', '');

    // Parse version number
    const [major] = version.split('.').map(Number);
    const isValid = major >= 18;

    return {
      name: 'Node.js',
      required: true,
      installed: true,
      version,
      error: isValid ? undefined : 'Node.js version 18+ is required'
    };
  } catch (error) {
    return {
      name: 'Node.js',
      required: true,
      installed: false,
      error: 'Node.js is not installed'
    };
  }
}

/**
 * Check npm version
 */
export async function checkNpmVersion(): Promise<DependencyCheck> {
  try {
    const { stdout } = await execAsync('npm --version');
    const version = stdout.trim();

    return {
      name: 'npm',
      required: true,
      installed: true,
      version
    };
  } catch (error) {
    return {
      name: 'npm',
      required: true,
      installed: false,
      error: 'npm is not installed'
    };
  }
}

/**
 * Check Git version
 */
export async function checkGitVersion(): Promise<DependencyCheck> {
  try {
    const { stdout } = await execAsync('git --version');
    const version = stdout.trim().split(' ').pop() || '';

    return {
      name: 'Git',
      required: true,
      installed: true,
      version
    };
  } catch (error) {
    return {
      name: 'Git',
      required: true,
      installed: false,
      error: 'Git is not installed'
    };
  }
}

/**
 * Check system requirements
 */
export async function checkSystemRequirements(requirements: SystemRequirements = {
  node: '>=18.0.0',
  npm: '>=8.0.0',
  git: '>=2.30.0'
}): Promise<DependencyCheck[]> {
  const checks: DependencyCheck[] = [];

  // Check Node.js
  const nodeCheck = await checkNodeVersion();
  if (nodeCheck.version) {
    const [major] = nodeCheck.version.split('.').map(Number);
    nodeCheck.installed = major >= 18;
    if (!nodeCheck.installed) {
      nodeCheck.error = `Node.js ${requirements.node} is required, found ${nodeCheck.version}`;
    }
  }
  checks.push(nodeCheck);

  // Check npm
  const npmCheck = await checkNpmVersion();
  checks.push(npmCheck);

  // Check Git
  const gitCheck = await checkGitVersion();
  checks.push(gitCheck);

  return checks;
}

/**
 * Check if package manager is available
 */
export async function checkPackageManager(manager: 'npm' | 'yarn' | 'pnpm'): Promise<DependencyCheck> {
  return checkCommand(manager);
}

/**
 * Check disk space for template creation
 */
export async function checkDiskSpace(requiredMB: number = 100): Promise<DependencyCheck> {
  try {
    // Get free space in MB
    const freeSpaceMB = Math.floor(os.freemem() / (1024 * 1024));

    return {
      name: 'Disk Space',
      required: true,
      installed: freeSpaceMB >= requiredMB,
      version: `${freeSpaceMB}MB free`,
      error: freeSpaceMB < requiredMB ? `At least ${requiredMB}MB free space required` : undefined
    };
  } catch (error) {
    return {
      name: 'Disk Space',
      required: false,
      installed: true, // Assume OK if we can't check
      version: 'Unknown'
    };
  }
}

/**
 * Check if directory is writable
 */
export async function checkDirectoryWritable(dirPath: string): Promise<DependencyCheck> {
  try {
    const testFile = path.join(dirPath, '.scalix-test-write');
    await fs.writeFile(testFile, 'test');
    await fs.remove(testFile);

    return {
      name: 'Directory Permissions',
      required: true,
      installed: true,
      version: 'Writable'
    };
  } catch (error) {
    return {
      name: 'Directory Permissions',
      required: true,
      installed: false,
      error: `Cannot write to directory: ${dirPath}`
    };
  }
}

/**
 * Comprehensive pre-flight check before creating an app
 */
export async function runPreflightChecks(targetDir: string): Promise<{
  checks: DependencyCheck[];
  allPassed: boolean;
  criticalErrors: string[];
}> {
  const checks: DependencyCheck[] = [];
  const criticalErrors: string[] = [];

  // System requirements
  const systemChecks = await checkSystemRequirements();
  checks.push(...systemChecks);

  // Disk space
  const diskCheck = await checkDiskSpace();
  checks.push(diskCheck);

  // Directory permissions
  const dirCheck = await checkDirectoryWritable(path.dirname(targetDir));
  checks.push(dirCheck);

  // Check for critical errors
  for (const check of checks) {
    if (check.required && !check.installed) {
      criticalErrors.push(check.error || `${check.name} check failed`);
    }
  }

  const allPassed = criticalErrors.length === 0;

  return {
    checks,
    allPassed,
    criticalErrors
  };
}

/**
 * Format dependency check results for display
 */
export function formatDependencyResults(checks: DependencyCheck[]): string {
  let output = '';

  const passed = checks.filter(c => c.installed);
  const failed = checks.filter(c => !c.installed);

  if (passed.length > 0) {
    output += '✅ Passed checks:\n';
    passed.forEach(check => {
      output += `  • ${check.name}${check.version ? ` (${check.version})` : ''}\n`;
    });
  }

  if (failed.length > 0) {
    output += '\n❌ Failed checks:\n';
    failed.forEach(check => {
      output += `  • ${check.name}: ${check.error || 'Not available'}\n`;
    });
  }

  return output.trim();
}

/**
 * Get installation instructions for failed dependencies
 */
export function getInstallationInstructions(checks: DependencyCheck[]): string {
  const instructions: string[] = [];

  for (const check of checks) {
    if (!check.installed && check.error) {
      if (check.name === 'Node.js') {
        instructions.push('Install Node.js from https://nodejs.org/');
      } else if (check.name === 'npm') {
        instructions.push('npm is usually installed with Node.js');
      } else if (check.name === 'Git') {
        instructions.push('Install Git from https://git-scm.com/');
      } else if (check.name.includes('Disk Space')) {
        instructions.push('Free up disk space or choose a different location');
      } else if (check.name.includes('Permissions')) {
        instructions.push('Check directory permissions or choose a different location');
      }
    }
  }

  return instructions.length > 0 ? instructions.join('\n') : '';
}
