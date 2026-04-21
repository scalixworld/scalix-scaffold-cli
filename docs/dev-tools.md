# Development Tools (@scalix-ai/*)

This document covers the development tools provided by the Scalix Scaffold System under the `@scalix-ai/*` namespace.

## Overview

The `@scalix-ai/*` packages are specialized development tools designed to enhance the development experience for Scalix applications. These tools are separate from the main application runtime and are intended for build-time use.

## Available Tools

### @scalix-ai/react-vite-component-tagger

A development tool for tagging React components in Vite-based applications.

#### Features

- Automatic component tagging for debugging
- Integration with React DevTools
- Build-time component identification
- Performance monitoring hooks

#### Installation

```bash
npm install @scalix-ai/react-vite-component-tagger --save-dev
```

#### Usage

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { componentTagger } from '@scalix-ai/react-vite-component-tagger';

export default defineConfig({
  plugins: [
    react(),
    componentTagger({
      enabled: process.env.NODE_ENV === 'development',
      prefix: 'Scalix'
    })
  ]
});
```

#### Configuration Options

```typescript
interface ComponentTaggerOptions {
  enabled?: boolean;           // Enable/disable tagging (default: true in dev)
  prefix?: string;            // Component name prefix (default: 'Scalix')
  include?: string[];         // File patterns to include
  exclude?: string[];         // File patterns to exclude
  displayName?: boolean;      // Add displayName to components (default: true)
  sourceMap?: boolean;        // Generate source maps (default: true)
}
```

### @scalix-ai/nextjs-webpack-component-tagger

Similar functionality for Next.js applications using Webpack.

#### Features

- Next.js specific optimizations
- Webpack integration
- SSR-compatible tagging
- Middleware support

#### Installation

```bash
npm install @scalix-ai/nextjs-webpack-component-tagger --save-dev
```

#### Usage

```javascript
// next.config.js
const { componentTagger } = require('@scalix-ai/nextjs-webpack-component-tagger');

module.exports = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.plugins.push(
        componentTagger({
          prefix: 'ScalixNext'
        })
      );
    }
    return config;
  }
};
```

## Development Tool Philosophy

### Build-Time vs Runtime

- **Build-time tools**: Execute during development/build process
- **Runtime tools**: Execute in the browser/production
- **Dev-only tools**: Only active in development mode

### Separation of Concerns

Development tools are kept separate from application runtime to:

1. **Reduce bundle size** in production
2. **Maintain clean dependencies** for end users
3. **Enable tool-specific versioning** and updates
4. **Allow optional usage** based on project needs

## Creating New Dev Tools

### Tool Structure

```
packages/@scalix-ai/tool-name/
├── src/
│   ├── index.ts          # Main export
│   ├── plugin.ts         # Build tool integration
│   └── utils.ts          # Utility functions
├── package.json          # Package configuration
├── tsconfig.json         # TypeScript config
├── README.md             # Documentation
└── LICENSE               # License file
```

### Package Configuration

```json
{
  "name": "@scalix-ai/tool-name",
  "version": "1.0.0",
  "description": "Description of the development tool",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  },
  "keywords": ["scalix", "development", "tool"],
  "author": "Scalix World",
  "license": "MIT",
  "peerDependencies": {
    "vite": "^4.0.0 || ^5.0.0",
    "webpack": "^5.0.0"
  },
  "peerDependenciesMeta": {
    "vite": {
      "optional": true
    },
    "webpack": {
      "optional": true
    }
  }
}
```

### Tool Implementation

#### Vite Plugin Example

```typescript
// src/plugin.ts
import { Plugin } from 'vite';

export interface ToolOptions {
  enabled?: boolean;
  // ... other options
}

export function createToolPlugin(options: ToolOptions = {}): Plugin {
  const { enabled = true } = options;

  return {
    name: '@scalix-ai/tool-name',
    enforce: 'pre',

    config(config) {
      if (!enabled) return config;

      // Modify Vite config
      return {
        ...config,
        // Tool-specific configuration
      };
    },

    transform(code, id) {
      if (!enabled) return null;

      // Transform code
      return {
        code: transformedCode,
        map: sourceMap
      };
    }
  };
}
```

#### Webpack Plugin Example

```typescript
// src/webpack-plugin.ts
import { Compiler } from 'webpack';

export class ToolWebpackPlugin {
  options: ToolOptions;

  constructor(options: ToolOptions = {}) {
    this.options = { enabled: true, ...options };
  }

  apply(compiler: Compiler) {
    if (!this.options.enabled) return;

    compiler.hooks.compilation.tap('@scalix-ai/tool-name', (compilation) => {
      // Webpack compilation logic
    });
  }
}
```

### Export Structure

```typescript
// src/index.ts
export { createToolPlugin } from './plugin';
export { ToolWebpackPlugin } from './webpack-plugin';
export type { ToolOptions } from './types';
```

## Tool Categories

### Build Tools

- **Component taggers**: Development-time component identification
- **Bundle analyzers**: Build output analysis
- **Asset optimizers**: Development asset processing

### Development Tools

- **Hot reload enhancers**: Improved development experience
- **Error overlays**: Better error reporting
- **Performance monitors**: Development-time performance tracking

### Code Quality Tools

- **Linting extensions**: Custom ESLint rules
- **Type checkers**: Enhanced TypeScript checking
- **Code formatters**: Custom Prettier plugins

## Publishing Dev Tools

### Version Management

```bash
# Bump version
npm version patch

# Build and publish
npm run build
npm publish
```

### Changelog

Maintain a changelog for each tool:

```markdown
# Changelog

## [1.1.0] - 2024-01-15
- Added new feature X
- Fixed bug Y

## [1.0.0] - 2024-01-01
- Initial release
```

## Tool Maintenance

### Dependency Updates

Regularly update peer dependencies:

```json
"peerDependencies": {
  "vite": "^4.0.0 || ^5.0.0",
  "react": "^17.0.0 || ^18.0.0"
}
```

### Breaking Changes

For breaking changes:

1. **Major version bump**: `1.x.x` → `2.x.x`
2. **Migration guide**: Document breaking changes
3. **Deprecation warnings**: Warn about deprecated APIs
4. **Support period**: Maintain old version support

### Testing

Comprehensive testing strategy:

```typescript
// __tests__/plugin.test.ts
import { createToolPlugin } from '../src/plugin';

describe('@scalix-ai/tool-name', () => {
  test('should transform code correctly', () => {
    const plugin = createToolPlugin();
    // Test plugin functionality
  });
});
```

## Integration with Scaffold System

### Automatic Tool Installation

Templates can specify dev tools:

```json
{
  "scalixTemplate": {
    "devTools": [
      "@scalix-ai/react-vite-component-tagger",
      "@scalix-ai/nextjs-webpack-component-tagger"
    ]
  }
}
```

### Tool Configuration

Templates can include tool configuration:

```javascript
// Template vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
/// #if DEV_TOOLS
import { componentTagger } from '@scalix-ai/react-vite-component-tagger';
/// #endif

export default defineConfig({
  plugins: [
    react(),
    /// #if DEV_TOOLS
    componentTagger(),
    /// #endif
  ]
});
```

## Best Practices

### Tool Design

1. **Optional by default**: Don't force tool usage
2. **Zero production impact**: No runtime overhead
3. **Clear configuration**: Simple, documented options
4. **Error resilience**: Graceful failure handling

### Documentation

1. **Installation instructions**: Clear setup steps
2. **Configuration examples**: Real-world usage
3. **Troubleshooting**: Common issues and solutions
4. **Migration guides**: Version upgrade instructions

### Performance

1. **Lazy loading**: Load only when needed
2. **Minimal processing**: Fast build-time operations
3. **Caching**: Cache expensive operations
4. **Conditional execution**: Only run when enabled

## Troubleshooting

### Common Issues

#### Tool not working in production

**Problem**: Tool effects appear in production builds

**Solution**: Ensure proper environment checks:

```typescript
export function createToolPlugin(options: ToolOptions = {}): Plugin {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    name: '@scalix-ai/tool-name',
    transform(code, id) {
      if (!isDev) return null;
      // Transform logic
    }
  };
}
```

#### Peer dependency warnings

**Problem**: NPM warns about peer dependency mismatches

**Solution**: Use appropriate peer dependency ranges:

```json
"peerDependencies": {
  "vite": "^4.0.0 || ^5.0.0"
}
```

#### Build performance issues

**Problem**: Tool slows down build process

**Solution**: Add performance optimizations:

```typescript
export function createToolPlugin(options: ToolOptions = {}): Plugin {
  const cache = new Map();

  return {
    name: '@scalix-ai/tool-name',
    transform(code, id) {
      if (cache.has(id)) return cache.get(id);

      const result = expensiveTransform(code);
      cache.set(id, result);
      return result;
    }
  };
}
```

## Future Development

### Planned Tools

- **@scalix-ai/component-storybook-generator**: Automatic Storybook setup
- **@scalix-ai/api-mock-generator**: Development API mocking
- **@scalix-ai/performance-profiler**: Build-time performance analysis
- **@scalix-ai/dependency-analyzer**: Bundle dependency visualization

### Tool Ecosystem

Build a cohesive tool ecosystem:

1. **Shared configuration**: Common tool settings
2. **Interoperability**: Tools that work together
3. **Presets**: Curated tool combinations
4. **Extensions**: Plugin system for custom tools
