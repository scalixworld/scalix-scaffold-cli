# test-debug-app

A comprehensive admin dashboard template built with React, TypeScript, Tailwind CSS, and Shadcn/ui components.

## 🚀 Features

- **📊 Dashboard Overview**: KPI cards, metrics, and recent activity feed
- **👥 User Management**: Complete user CRUD with data tables and filtering
- **📈 Analytics Ready**: Chart placeholders and data visualization setup
- **🎨 Professional UI**: Shadcn/ui components with dark mode support
- **📱 Responsive Design**: Mobile-first approach with sidebar navigation
- **🔍 Component Tagging**: Development tooling for component identification
- **🎯 TypeScript**: Full type safety throughout the application
- **⚡ Vite**: Lightning-fast development and building
- **🧪 Testing Setup**: Jest and Vitest configured for unit testing

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Charts**: Recharts (ready to implement)
- **Development**: Component tagging, ESLint, testing

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   └── dropdown-menu.tsx
│   ├── dashboard/             # Dashboard-specific components
│   │   ├── sidebar.tsx        # Navigation sidebar
│   │   └── overview.tsx       # Main dashboard view
│   └── tables/                # Data table components
│       └── data-table.tsx     # User management table
├── lib/
│   └── utils.ts               # Utility functions (cn function)
└── data/                      # Mock data (ready for API integration)
```

## 🎯 What You Get

### 1. **Complete Admin Interface**
- Sidebar navigation with collapsible mobile menu
- Dashboard overview with key metrics
- User management with data tables
- Professional card-based layouts

### 2. **Production-Ready Components**
- **60+ Shadcn/ui components** pre-configured
- **Consistent design system** with theme support
- **Accessible components** (WCAG compliant)
- **Mobile responsive** by default

### 3. **Developer Experience**
```tsx
// Professional component usage
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Button variant="default" size="lg">
  Click me
</Button>
```

### 4. **Scalix Integration**
- **Component tagging** for development tooling
- **Scalix design system** integration
- **Platform-ready** architecture

## 🚀 Getting Started

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

## 🎨 Customization

### Theme Configuration

Modify `tailwind.config.js` to customize colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#your-brand-color',
        }
      }
    }
  }
}
```

### Adding New Components

1. Use Shadcn/ui CLI to add components:
```bash
npx shadcn-ui@latest add [component-name]
```

2. Or create custom components following the pattern:
```tsx
// src/components/ui/custom-component.tsx
import { cn } from "@/lib/utils"

interface CustomComponentProps {
  className?: string
  children: React.ReactNode
}

export function CustomComponent({ className, children }: CustomComponentProps) {
  return (
    <div className={cn("custom-styles", className)}>
      {children}
    </div>
  )
}
```

## 📊 Dashboard Features

### Metrics Cards
Display key performance indicators with trend indicators:

```tsx
<MetricCard
  title="Total Revenue"
  value="$45,231.89"
  change="+20.1%"
  changeType="positive"
  icon={<DollarSign className="h-4 w-4" />}
/>
```

### Data Tables
Professional data tables with sorting, filtering, and pagination:

```tsx
<DataTable />
```

### Navigation
Responsive sidebar with mobile support:

```tsx
<Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
```

## 🔧 API Integration

### Connecting to Your Backend

1. **Replace mock data** in `src/data/` with API calls
2. **Add API client** in `src/lib/api.ts`
3. **Update components** to use real data

Example API integration:

```typescript
// src/lib/api.ts
export async function fetchUsers() {
  const response = await fetch('/api/users')
  return response.json()
}

// In components:
import { useEffect, useState } from 'react'
import { fetchUsers } from '@/lib/api'

function UserTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <DataTable data={users} />
  )
}
```

## 📈 Analytics & Charts

The template includes Recharts for data visualization. Add charts:

```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
]

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>
```

## 🔐 Authentication & Security

### Adding Authentication

1. **Install auth library** (e.g., NextAuth.js, Supabase Auth)
2. **Create auth context** in `src/contexts/AuthContext.tsx`
3. **Protect routes** with auth guards
4. **Add login/logout UI** components

### Security Best Practices

- **Environment variables** for sensitive data
- **Input validation** on all forms
- **Role-based access control** (RBAC)
- **CSRF protection** for API calls

## 📱 Mobile Responsiveness

The template is built mobile-first:

- **Responsive sidebar** that collapses on mobile
- **Touch-friendly buttons** and interactions
- **Flexible grid layouts** that adapt to screen size
- **Optimized typography** for readability

## 🧪 Testing

### Unit Tests

```tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/components/ui/button'

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Component Tests

```tsx
// __tests__/MetricCard.test.tsx
import { render, screen } from '@testing-library/react'
import { MetricCard } from '../src/components/dashboard/overview'

describe('MetricCard', () => {
  it('displays metric data', () => {
    render(
      <MetricCard
        title="Revenue"
        value="$1000"
        change="+10%"
        changeType="positive"
        icon={<div>icon</div>}
      />
    )

    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$1000')).toBeInTheDocument()
  })
})
```

## 🚀 Deployment

### Build for Production

```bash
# Create production build
npm run build

# Preview locally
npm run preview
```

### Deployment Options

#### Vercel
```bash
npm i -g vercel
vercel
```

#### Netlify
```bash
npm i -g netlify-cli
npm run build
netlify deploy --dir=dist --prod
```

#### Docker
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔍 Development Tools

### Component Tagging

This template includes **Scalix Component Tagger**:

```html
<button data-scalix-id="src/components/Button.tsx:15:10" data-scalix-name="button">
  Click me
</button>
```

Benefits:
- **Testing**: Easy component selection
- **Debugging**: Component identification
- **Analytics**: Track component usage

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Vite](https://vitejs.dev/)

## 🤝 Contributing

1. Follow the established patterns
2. Use Shadcn/ui components when possible
3. Add proper TypeScript types
4. Include tests for new features
5. Update documentation

---

Built with ❤️ using Scalix Scaffold
