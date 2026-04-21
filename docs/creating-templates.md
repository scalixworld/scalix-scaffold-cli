# Creating Templates

This guide explains how to create new templates for the Scalix Scaffold System.

## Template Structure

Every template should follow a consistent structure:

```
your-template/
├── package.json          # Template metadata and configuration
├── src/                  # Source code
├── public/               # Static assets (for web apps)
├── index.html            # Entry HTML file (for SPAs)
├── vite.config.ts        # Vite configuration (if applicable)
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind configuration (if applicable)
├── postcss.config.js     # PostCSS configuration (if applicable)
├── .env.example          # Environment variables template
├── README.md             # Template-specific documentation
└── .gitignore           # Git ignore rules
```

## Package.json Configuration

The `package.json` serves two purposes:
1. NPM package configuration
2. Template metadata for the scaffold system

```json
{
  "name": "scalix-template-your-template",
  "version": "1.0.0",
  "description": "Your template description",
  "scalixTemplate": {
    "id": "your-template",
    "name": "Your Template Name",
    "description": "Detailed description of what this template provides",
    "repository": "https://github.com/scalix-world/scalix/scaffold-templates-your-template.git",
    "branch": "main",
    "tags": ["framework", "language", "features"],
    "postInstall": [
      "Step 1: Do something",
      "Step 2: Configure environment",
      "Step 3: Run development server"
    ]
  },
  "dependencies": {
    // Runtime dependencies
  },
  "devDependencies": {
    // Development dependencies
  },
  "scripts": {
    "dev": "development command",
    "build": "build command",
    "test": "test command"
  }
}
```

## Template Variables

Use placeholders that get replaced when creating apps:

### Available Variables

- `{{project-name}}` - Project name (kebab-case, e.g., "my-awesome-app")
- `{{PROJECT_NAME}}` - Project name (UPPER_CASE, e.g., "MY_AWESOME_APP")
- `{{ProjectName}}` - Project name (PascalCase, e.g., "MyAwesomeApp")

### Usage in Files

**package.json:**
```json
{
  "name": "{{project-name}}",
  "description": "A {{project-name}} application"
}
```

**README.md:**
```markdown
# {{ProjectName}}

Welcome to {{ProjectName}}!
```

**HTML:**
```html
<title>{{ProjectName}}</title>
```

## Template Categories

### 1. Frontend Frameworks

- **React**: Single-page applications with modern tooling
- **Vue**: Progressive framework with Composition API
- **Svelte**: Compile-time framework
- **Next.js**: Full-stack React framework
- **Nuxt**: Full-stack Vue framework

### 2. Backend Frameworks

- **Express**: Minimalist Node.js framework
- **Fastify**: High-performance Node.js framework
- **NestJS**: Enterprise Node.js framework

### 3. Full-Stack Solutions

- **Next.js**: React full-stack
- **Nuxt**: Vue full-stack
- **SvelteKit**: Svelte full-stack
- **Remix**: React full-stack with SSR

## Best Practices

### Code Quality

1. **TypeScript**: Use TypeScript for type safety
2. **ESLint**: Include linting configuration
3. **Prettier**: Include code formatting
4. **Testing**: Include test setup (Jest, Vitest, etc.)

### Project Structure

1. **Consistent Naming**: Follow framework conventions
2. **Modular Architecture**: Organize code into logical modules
3. **Environment Config**: Include `.env.example`
4. **Documentation**: Comprehensive README

### Dependencies

1. **Minimal**: Only include essential dependencies
2. **Latest**: Use recent, stable versions
3. **Pinned**: Use exact versions for reproducibility
4. **Peer Dependencies**: Specify peer deps appropriately

## Template Development Workflow

### 1. Create Template Repository

```bash
# Create GitHub repository
# Clone locally
git clone https://github.com/scalix-world/scalix/scaffold-templates-your-template.git
cd scaffold-templates-your-template
```

### 2. Set Up Project Structure

```bash
npm init -y
# Edit package.json with template configuration
mkdir src public
# Add source files
```

### 3. Test Template Locally

```bash
# In scaffold-system directory
cd cli
npm run build
npm link

# Test template creation
scalix-scaffold create test-app --template your-template
cd test-app
npm install
npm run dev
```

### 4. Add to Scaffold System

1. Update `cli/src/utils/config.ts` with template configuration
2. Test the template appears in `scalix-scaffold list`
3. Ensure template clones correctly

### 5. Document Template

Create comprehensive documentation:

```markdown
# Template Name

## Overview
What this template provides and when to use it.

## Features
- Feature 1
- Feature 2
- Feature 3

## Getting Started
```bash
npx scalix-scaffold create my-app --template template-id
cd my-app
npm install
npm run dev
```

## Project Structure
```
/src
  /components    # Reusable components
  /pages         # Application pages
  /lib           # Utility functions
  /styles        # Styling
```

## Configuration
Environment variables, build settings, etc.

## Deployment
How to deploy applications created with this template.
```

## Testing Templates

### Manual Testing

1. Create app from template
2. Install dependencies
3. Run development server
4. Test basic functionality
5. Build for production
6. Verify build output

### Automated Testing

```typescript
// template.test.ts
import { cloneTemplate, getTemplateConfig } from '../utils/template';

describe('Template Tests', () => {
  test('should create valid app structure', async () => {
    const config = await getTemplateConfig('your-template');
    // Test template creation
  });
});
```

## Publishing Templates

### GitHub Repository

1. Create repository under `scalix-world/scaffold-templates-*`
2. Initialize with template code
3. Add comprehensive README
4. Tag releases for versioning

### Scaffold System Integration

1. Update CLI configuration
2. Test template discovery
3. Update documentation
4. Announce new template

## Template Maintenance

### Versioning

- Use semantic versioning
- Tag GitHub releases
- Update scaffold system when breaking changes

### Updates

- Monitor dependency updates
- Test with new framework versions
- Update documentation
- Communicate changes to users

### Deprecation

- Mark deprecated templates
- Provide migration guides
- Maintain backward compatibility
- Remove after grace period

## Examples

### React Template Example

See `templates/react/` for a complete example of a modern React template.

### Next.js Template Example

```bash
# Structure for Next.js template
nextjs-template/
├── package.json
├── next.config.js
├── tailwind.config.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
└── README.md
```

## Troubleshooting

### Common Issues

1. **Template not found**: Check repository URL and branch
2. **Build failures**: Verify dependencies and configurations
3. **Variable replacement**: Ensure correct placeholder syntax
4. **Git clone issues**: Check repository permissions

### Debugging

```bash
# Enable verbose logging
DEBUG=scalix:* scalix-scaffold create my-app --template your-template

# Test template cloning directly
git clone --depth 1 --branch main https://github.com/scalix-world/scalix/scaffold-templates-your-template.git test
```

## Contributing

1. Follow the template creation guidelines
2. Test thoroughly before submitting
3. Include comprehensive documentation
4. Update the main scaffold system configuration
