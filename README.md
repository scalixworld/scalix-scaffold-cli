# Scalix World Scaffold System

A powerful template-based scaffolding system for creating new Scalix World applications. This system provides a CLI tool and pre-built templates to quickly bootstrap new projects with modern development stacks.

## 🎯 Overview

The Scalix World Scaffold System is designed to:

- **Accelerate Development**: Quickly create new applications from proven templates
- **Maintain Consistency**: Ensure all Scalix World apps follow the same architectural patterns
- **Simplify Onboarding**: New developers can get started with standardized project structures
- **Enable Innovation**: Templates can be easily extended and customized

## 📁 Project Structure

```
INTERNAL/Scaffold-System/
├── cli/                    # Command-line interface
│   ├── src/
│   │   ├── commands/      # CLI commands (create, list, init)
│   │   └── utils/         # Template and config utilities
│   └── package.json
├── templates/              # Template repositories
│   ├── react/             # React template
│   ├── nextjs/            # Next.js template
│   └── ...
├── packages/               # Shared packages (@scalix-world/*)
├── generators/             # Code generators
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Installation

```bash
# Clone the scaffold system
git clone https://github.com/scalixworld/scalix/scaffold.git
cd scaffold

# Install dependencies
npm install
```

### Build the CLI

```bash
npm run build
```

### Create Your First App

```bash
# Create a new Scalix World app
npx scalix-world create my-app --template admin-dashboard

# Or initialize in current directory
npx scalix-world init admin-dashboard
```

## 📋 Available Templates

| Template | Description | Tags |
|----------|-------------|------|
| `admin-dashboard` | Enterprise admin dashboard with analytics | admin, dashboard, analytics, business |
| `crm` | Customer relationship management system | crm, sales, customers, business |
| `ecommerce` | Complete e-commerce platform with shopping cart | ecommerce, shopping, commerce, retail |
| `analytics-dashboard` | Advanced analytics dashboard with data visualization | analytics, dashboard, data, visualization |

## 🛠️ CLI Commands

### Create a New App

```bash
scalix-world create <name> [options]

Options:
  -t, --template <template>  Template to use (default: "admin-dashboard")
  -d, --directory <dir>      Directory to create app in
  --yes                      Skip interactive prompts
```

### Initialize Template in Current Directory

```bash
scalix-world init <template>
```

### List Available Templates

```bash
scalix-world list
```

### Get Help

```bash
scalix-world --help
scalix-world <command> --help
```

## 🏗️ Creating Templates

### Template Structure

Each template should follow this structure:

```
template-name/
├── package.json          # Template metadata and scalixWorldTemplate config
├── src/                  # Source code
├── public/               # Static assets (if applicable)
├── index.html            # Entry HTML (for Vite/SPA apps)
├── vite.config.ts        # Build configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Template-specific documentation
```

### Template Configuration

Add template metadata to `package.json`:

```json
{
  "name": "template-name",
  "scalixWorldTemplate": {
    "id": "template-id",
    "name": "Template Display Name",
    "description": "Template description",
    "repository": "https://github.com/scalixworld/scalix/scaffold-templates-template-id.git",
    "branch": "main",
    "tags": ["tag1", "tag2"],
    "postInstall": [
      "Configure environment variables",
      "Run 'npm run dev' to start"
    ]
  }
}
```

### Template Variables

Use placeholders in template files that get replaced during creation:

- `{{project-name}}` - Project name (lowercase with hyphens)
- `{{PROJECT_NAME}}` - Project name (uppercase)
- `{{ProjectName}}` - Project name (PascalCase)

## 🔧 Development Tools

The scaffold system includes development tools under `@scalix-world/*` packages:

### Available Tools

- `@scalix-world/react-vite-component-tagger` - Component tagging for React/Vite apps
- `@scalix-world/nextjs-webpack-component-tagger` - Component tagging for Next.js apps

### Using Dev Tools

```bash
npm install @scalix-world/react-vite-component-tagger --save-dev
```

## 🚢 Deployment

### Publishing Templates

1. Create a GitHub repository for your template
2. Push your template code
3. Update the CLI configuration with the new template

### Publishing the CLI

```bash
npm run build
npm publish
```

## 📚 Documentation

- [Template Creation Guide](./docs/creating-templates.md)
- [CLI Development](./docs/cli-development.md)
- [Dev Tools Guide](./docs/dev-tools.md)
- [Contributing](./docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the Scalix World Pvt Ltd EULA - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Create an issue on GitHub
- Check the documentation
- Reach out to the Scalix development team

---

**Built with ❤️ by the Scalix Team**
