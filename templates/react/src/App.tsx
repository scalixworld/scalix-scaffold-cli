import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'

function App() {
  const [count, setCount] = useState(0)

  const features = [
    { name: 'React 18', description: 'Latest React with concurrent features' },
    { name: 'TypeScript', description: 'Full type safety and better DX' },
    { name: 'Vite', description: 'Lightning fast build tool' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
    { name: 'Shadcn/ui', description: 'Beautiful component library' },
    { name: 'Component Tagging', description: 'Development tooling included' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary">Scalix</Badge>
            <Badge variant="outline">React + TypeScript</Badge>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {{project-name}}
          </h1>
          <p className="text-xl text-slate-600">
            A modern React application with Shadcn/ui, Tailwind CSS, and TypeScript
          </p>
        </div>

        {/* Interactive Counter */}
        <Card className="mb-8 max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Interactive Demo</CardTitle>
            <CardDescription>
              Click the button to see the component tagging in action
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4">
              <Button
                onClick={() => setCount((count) => count + 1)}
                size="lg"
                className="text-lg px-8"
              >
                Count: {count}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Edit <code className="bg-muted px-1 py-0.5 rounded text-xs">src/App.tsx</code> and save to test HMR
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {feature.name}
                  <Badge variant="secondary" className="text-xs">
                    {index + 1}
                  </Badge>
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Ready to use
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Getting Started */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>
              Your new Scalix React app is ready to go!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Development</h4>
                <code className="text-xs bg-muted p-2 rounded block">
                  npm run dev
                </code>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Build</h4>
                <code className="text-xs bg-muted p-2 rounded block">
                  npm run build
                </code>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                This template includes everything you need to build modern React applications.
                Check out the documentation in the README for more details.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
