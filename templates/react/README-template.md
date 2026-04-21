# {{project-name}}

A modern React application built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Vitest** - Fast unit testing
- 📱 **Responsive** - Mobile-first design
- 🔍 **Component Tagging** - Built-in component identification for development

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI

# Linting
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── main.tsx         # Application entry point
├── App.tsx          # Main App component
├── index.css        # Global styles (Tailwind directives)
└── assets/          # Static assets (create as needed)
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Key classes and patterns:

- **Layout**: `flex`, `grid`, `container`, `mx-auto`
- **Spacing**: `p-4`, `m-2`, `space-x-4`
- **Colors**: `bg-blue-500`, `text-gray-700`, `border-red-300`
- **Typography**: `text-xl`, `font-bold`, `text-center`
- **Responsive**: `md:text-lg`, `lg:flex`, `sm:hidden`

### Custom Components

Create reusable components in `src/components/`:

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your values
VITE_API_URL=https://api.example.com
VITE_APP_TITLE="My App"
```

### Vite Configuration

Modify `vite.config.ts` for custom build settings:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Tailwind Configuration

Customize Tailwind in `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#3b82f6',
      }
    },
  },
  plugins: [],
}
```

## 🧪 Testing

### Writing Tests

Create test files alongside your components:

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui
```

## 🚀 Deployment

### Build for Production

```bash
# Create production build
npm run build

# Preview the build
npm run preview
```

### Deploy to Platforms

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

#### GitHub Pages
```bash
npm i -g gh-pages
npm run build
npx gh-pages -d dist
```

## 🔍 Development Tools

### Component Tagging

This template includes **Scalix Component Tagger** which automatically adds data attributes to components for development:

```html
<button data-scalix-id="src/components/Button.tsx:15:10" data-scalix-name="button">
  Click me
</button>
```

This helps with:
- **Testing**: Easier component selection
- **Debugging**: Component identification
- **Analytics**: Component tracking

### Hot Module Replacement

Vite provides fast HMR for instant updates during development.

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

Built with ❤️ using Scalix Scaffold
