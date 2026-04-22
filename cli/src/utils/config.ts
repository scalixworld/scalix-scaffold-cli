import fs from 'fs-extra';
import path from 'path';

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  repository: string;
  branch?: string;
  tags?: string[];
  postInstall?: string[];
}

export interface TemplatePackage {
  name: string;
  version: string;
  description: string;
  scalixWorldTemplate?: TemplateConfig;
}

// Default templates - these can be extended or loaded from a config file
const DEFAULT_TEMPLATES: TemplateConfig[] = [
  {
    id: 'react',
    name: 'React App',
    description: 'Modern React application with Vite, TypeScript, and Tailwind CSS',
    repository: 'https://github.com/scalixworld/template-react.git',
    branch: 'main',
    tags: ['react', 'vite', 'typescript', 'tailwind'],
    postInstall: [
      'Configure your environment variables in .env.local',
      'Run "npm run dev" to start the development server'
    ]
  },
  {
    id: 'nextjs',
    name: 'Next.js App',
    description: 'Full-stack Next.js application with App Router and API routes',
    repository: 'https://github.com/scalixworld/template-nextjs.git',
    branch: 'main',
    tags: ['nextjs', 'react', 'typescript', 'fullstack'],
    postInstall: [
      'Configure your database connection in .env.local',
      'Run "npm run dev" to start the development server'
    ]
  },
  {
    id: 'admin-dashboard',
    name: 'Admin Dashboard',
    description: 'Comprehensive admin dashboard with analytics, user management, and data visualization',
    repository: 'https://github.com/scalixworld/template-admin-dashboard.git',
    branch: 'main',
    tags: ['admin', 'dashboard', 'analytics', 'management', 'business'],
    postInstall: [
      'Configure your API endpoints in the services directory',
      'Customize the dashboard widgets and analytics',
      'Set up user authentication and permissions'
    ]
  },
  {
    id: 'crm',
    name: 'CRM System',
    description: 'Complete CRM with customer management, lead tracking, sales pipeline, and analytics',
    repository: 'https://github.com/scalixworld/template-crm.git',
    branch: 'main',
    tags: ['crm', 'sales', 'customers', 'leads', 'business', 'management'],
    postInstall: [
      'Configure your database connection for customer data',
      'Set up email integration for communication tracking',
      'Customize the sales pipeline stages for your business',
      'Configure user permissions and access controls'
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Platform',
    description: 'Complete e-commerce platform with product catalog, shopping cart, checkout, and admin panel',
    repository: 'https://github.com/scalixworld/template-ecommerce.git',
    branch: 'main',
    tags: ['ecommerce', 'shopping', 'store', 'commerce', 'business', 'retail', 'sales'],
    postInstall: [
      'Configure your payment processor (Stripe, PayPal, etc.)',
      'Set up product images and media storage',
      'Configure shipping rates and tax calculations',
      'Set up email notifications for orders',
      'Configure inventory management and low stock alerts'
    ]
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Comprehensive analytics dashboard with data visualization, KPIs, and business intelligence',
    repository: 'https://github.com/scalixworld/template-analytics-dashboard.git',
    branch: 'main',
    tags: ['analytics', 'dashboard', 'data', 'visualization', 'business', 'intelligence', 'charts', 'metrics', 'bi'],
    postInstall: [
      'Connect your data sources (database, APIs, or data warehouses)',
      'Configure KPI definitions and alert thresholds',
      'Set up data refresh schedules and real-time updates',
      'Configure user permissions and dashboard access controls',
      'Set up automated report generation and email delivery'
    ]
  },
];

/**
 * Get all available templates
 */
export async function getAvailableTemplates(): Promise<TemplateConfig[]> {
  // Start with default templates (remote/GitHub based)
  const templates = [...DEFAULT_TEMPLATES];

  // Load local templates from templates directory
  const templatesDir = path.join(process.cwd(), 'templates');
  const localTemplates = await loadTemplatesFromPackages(templatesDir);

  // Merge local templates with defaults, giving priority to local ones
  // Local templates override remote ones with the same ID
  for (const localTemplate of localTemplates) {
    const existingIndex = templates.findIndex(t => t.id === localTemplate.id);
    if (existingIndex >= 0) {
      // Replace remote template with local one
      templates[existingIndex] = localTemplate;
    } else {
      // Add new local template
      templates.push(localTemplate);
    }
  }

  return templates;
}

/**
 * Get a specific template configuration by ID
 */
export async function getTemplateConfig(templateId: string): Promise<TemplateConfig> {
  const templates = await getAvailableTemplates();
  const template = templates.find(t => t.id === templateId);

  if (!template) {
    throw new Error(`Template "${templateId}" not found. Run "scalix-scaffold list" to see available templates.`);
  }

  return template;
}

/**
 * Validate template configuration
 */
export function validateTemplateConfig(config: Partial<TemplateConfig>): boolean {
  return !!(
    config.id &&
    config.name &&
    config.description &&
    config.repository
  );
}

/**
 * Get templates from package.json files in templates directory
 */
export async function loadTemplatesFromPackages(templatesDir: string): Promise<TemplateConfig[]> {
  const templates: TemplateConfig[] = [];

  try {
    const templateDirs = await fs.readdir(templatesDir);

    for (const dir of templateDirs) {
      const packagePath = path.join(templatesDir, dir, 'package.json');

      if (await fs.pathExists(packagePath)) {
        const packageJson: TemplatePackage = await fs.readJson(packagePath);

        if (packageJson.scalixWorldTemplate && validateTemplateConfig(packageJson.scalixWorldTemplate)) {
          templates.push(packageJson.scalixWorldTemplate);
        }
      }
    }
  } catch (error) {
    // If templates directory doesn't exist or can't be read, return empty array
    console.warn('Could not load templates from packages:', error);
  }

  return templates;
}
