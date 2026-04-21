# Setup and Installation Guide

This guide covers setting up the Scalix Scaffold System for development and usage.

## Prerequisites

### System Requirements

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0 or **yarn**: >= 1.22.0 or **pnpm**: >= 7.0.0
- **Git**: >= 2.30.0

### Development Requirements

- **TypeScript**: >= 5.0.0
- **GitHub Account**: For template repositories
- **Code Editor**: VS Code recommended

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/scalix-world/scalix.git
cd scalix/INTERNAL/Scaffold-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build the CLI

```bash
npm run build
```

### 4. Test Installation

```bash
# Check CLI is working
npx scalix-scaffold --help

# List available templates
npx scalix-scaffold list
```

## Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Build CLI in watch mode
cd cli
npm run dev

# In another terminal, link for testing
npm link
```

### Testing CLI Locally

```bash
# Create a test app
scalix-scaffold create test-app --template react

# Navigate to app
cd test-app

# Install dependencies and run
npm install
npm run dev
```

## Repository Structure Setup

### GitHub Organization

Create repositories under the `scalix-world` organization:

```
scalix-world/
├── scalix/                          # Main monorepo
├── scaffold/                        # Scaffold system (separate repo)
├── scaffold-templates-react/        # React template
├── scaffold-templates-nextjs/       # Next.js template
├── scaffold-templates-vue/          # Vue template
└── scaffold-templates-svelte/       # Svelte template
```

### Repository Configuration

Each template repository should:

1. **Be public** for easy cloning
2. **Have a `main` branch** as default
3. **Include comprehensive README**
4. **Follow semantic versioning** with tags

## Template Development

### Creating a New Template

1. **Create GitHub repository**
   ```bash
   # Repository name: scalix-world/scaffold-templates-your-template
   ```

2. **Set up template structure**
   ```bash
   cd your-template
   npm init -y
   mkdir src public
   # Add template files
   ```

3. **Configure template metadata**
   ```json
   {
     "name": "scalix-template-your-template",
     "scalixTemplate": {
       "id": "your-template",
       "name": "Your Template",
       "description": "Template description",
       "repository": "https://github.com/scalix-world/scalix/scaffold-templates-your-template.git"
     }
   }
   ```

4. **Add to scaffold system**
   - Update `cli/src/utils/config.ts`
   - Add template configuration
   - Test template loading

### Template Testing

```bash
# Test template creation
scalix-scaffold create test-app --template your-template

# Verify app structure
cd test-app
npm install
npm run dev
```

## Dev Tools Setup

### Publishing @scalix-world Packages

1. **Build package**
   ```bash
   cd packages/@scalix-world/tool-name
   npm run build
   ```

2. **Login to npm**
   ```bash
   npm login
   ```

3. **Publish package**
   ```bash
   npm publish
   ```

### Package Configuration

Ensure packages have proper configuration:

```json
{
  "name": "@scalix-world/tool-name",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "peerDependencies": {
    "vite": "^4.0.0 || ^5.0.0"
  }
}
```

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/` in scaffold repositories:

```yaml
# .github/workflows/publish.yml
name: Publish
on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org/'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Release Process

1. **Update version**
   ```bash
   npm version patch  # or minor/major
   ```

2. **Push changes and tag**
   ```bash
   git push && git push --tags
   ```

3. **GitHub Actions publishes automatically**

## Deployment

### Separate Repository

The scaffold system should be maintained as a separate repository:

```bash
# Create separate scaffold repository
git clone https://github.com/scalix-world/scalix.git
cd scalix
git subtree push --prefix=INTERNAL/Scaffold-System https://github.com/scalix-world/scaffold main
```

### Monorepo Integration

For monorepo usage, the scaffold system can be included as:

1. **Git submodule**
   ```bash
   git submodule add https://github.com/scalix-world/scaffold INTERNAL/Scaffold-System
   ```

2. **Workspace dependency**
   ```json
   {
     "dependencies": {
       "@scalix-world/scaffold-cli": "workspace:*"
     }
   }
   ```

## Usage in Projects

### Global Installation

```bash
# Install CLI globally
npm install -g @scalix-world/scaffold-cli

# Use CLI
scalix-scaffold create my-app --template react
```

### Local Installation

```bash
# Install in project
npm install @scalix-world/scaffold-cli --save-dev

# Use via npx
npx scalix-scaffold create my-app --template react
```

### CI/CD Integration

```yaml
# .github/workflows/create-app.yml
name: Create App
on: workflow_dispatch

jobs:
  create:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @scalix-world/scaffold-cli
      - run: scalix-scaffold create my-app --template react --yes
      - run: cd my-app && npm install && npm run build
```

## Troubleshooting

### Common Issues

#### CLI not found

**Problem**: `scalix-scaffold` command not found

**Solutions**:
```bash
# Install globally
npm install -g @scalix-world/scaffold-cli

# Or use npx
npx @scalix-world/scaffold-cli create my-app --template react

# Or link locally
cd cli && npm link
```

#### Template not found

**Problem**: Template doesn't appear in list

**Solutions**:
- Check repository URL is correct
- Verify repository is public
- Ensure branch exists (default: main)
- Update CLI configuration

#### Build failures

**Problem**: Template fails to build

**Solutions**:
- Check Node.js version compatibility
- Verify dependencies are installed
- Check for missing peer dependencies
- Review build configuration

#### Permission issues

**Problem**: Cannot publish packages

**Solutions**:
- Login to npm: `npm login`
- Check npm permissions for @scalix-world scope
- Verify GitHub repository access

### Debug Mode

Enable debug logging:

```bash
DEBUG=scalix:* scalix-scaffold create my-app --template react
```

### Environment Variables

Useful environment variables:

```bash
# Disable colors
NO_COLOR=1 scalix-scaffold list

# Custom npm registry
npm config set registry https://your-registry.com

# Custom GitHub token (for private repos)
GITHUB_TOKEN=your_token scalix-scaffold create my-app --template private-template
```

## Performance Optimization

### Template Caching

The CLI caches cloned templates to improve performance:

```bash
# Cache location
~/.scalix-templates/

# Clear cache
rm -rf ~/.scalix-templates
```

### Build Optimization

For development:

```bash
# Build CLI in watch mode
cd cli && npm run dev

# Build all packages
npm run build --workspaces
```

## Security Considerations

### Repository Access

- Keep template repositories public for easy access
- Use GitHub tokens for private repositories if needed
- Validate repository URLs before cloning

### Package Security

- Audit dependencies regularly: `npm audit`
- Keep packages updated: `npm update`
- Use exact versions for reproducible builds

### Code Security

- Run security linters: `npm run lint`
- Test thoroughly before publishing
- Review code changes in pull requests

## Contributing

### Development Workflow

1. **Fork repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/new-template
   ```
3. **Make changes**
4. **Test thoroughly**
5. **Submit pull request**

### Code Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write comprehensive tests
- Update documentation

### Documentation

- Keep README files current
- Document breaking changes
- Provide migration guides
- Include code examples

## Support

### Getting Help

- **Issues**: Create GitHub issues
- **Discussions**: Use GitHub discussions
- **Documentation**: Check docs/ directory
- **Community**: Join Scalix Discord

### Reporting Bugs

When reporting bugs, include:

- CLI version: `scalix-scaffold --version`
- Node.js version: `node --version`
- Operating system
- Full error output
- Steps to reproduce

### Feature Requests

Feature requests should include:

- Use case description
- Expected behavior
- Current workaround (if any)
- Implementation suggestions

## Roadmap

### Short Term

- [ ] Additional template frameworks (Vue, Svelte, Next.js)
- [ ] Template validation system
- [ ] Interactive CLI mode
- [ ] Template marketplace

### Long Term

- [ ] Visual template builder
- [ ] Template sharing platform
- [ ] Advanced customization options
- [ ] Multi-language support

---

**Happy scaffolding! 🚀**
