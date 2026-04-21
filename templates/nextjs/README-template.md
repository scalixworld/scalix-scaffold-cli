# {{project-name}}

A full-stack Next.js application built with TypeScript, Tailwind CSS, and API routes.

## 🚀 Features

- ⚡️ **Next.js 14** - Latest Next.js with App Router
- ⚛️ **React 18** - Latest React with concurrent features
- 🔷 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧪 **Jest** - Testing framework setup
- 📡 **API Routes** - Built-in API endpoints
- 🔍 **Component Tagging** - Development tooling for component identification

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

# Open http://localhost:3000 in your browser
```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode

# Linting
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/               # API routes
│   │   └── hello/         # Sample API endpoint
│   ├── globals.css        # Global styles (Tailwind)
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
└── components/            # Reusable components (create as needed)
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling. Key patterns:

### Layout Components

```tsx
// Container with responsive design
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

### Card Components

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h3 className="text-lg font-medium text-gray-900">Card Title</h3>
  <p className="mt-2 text-gray-600">Card content goes here.</p>
</div>
```

### Button Components

```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
  Click me
</button>
```

## 📡 API Routes

Next.js API routes are located in `src/app/api/`. Example:

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // Fetch users from database
  const users = await getUsers()
  return NextResponse.json({ users })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Create new user
  const user = await createUser(body)
  return NextResponse.json({ user }, { status: 201 })
}
```

## 🧪 Testing

### Writing Tests

Create test files alongside your components:

```tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/components/Button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
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
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# API Keys
NEXT_PUBLIC_API_KEY="your-api-key"
API_SECRET_KEY="your-secret-key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Next.js Configuration

Modify `next.config.js` for custom settings:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'],
  },
  // Custom webpack config
  webpack: (config) => {
    // Add custom webpack rules
    return config
  },
}

module.exports = nextConfig
```

### TypeScript Configuration

Update `tsconfig.json` for path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Other Platforms

#### Netlify

```bash
npm i -g netlify-cli
npm run build
netlify deploy --dir=out --prod
```

#### Docker

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

## 🔍 Development Tools

### Component Tagging

This template includes **Scalix Component Tagger** which automatically adds data attributes to components:

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

Next.js provides fast HMR for instant updates during development.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jest Testing](https://jestjs.io/docs/getting-started)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

---

Built with ❤️ using Scalix Scaffold
