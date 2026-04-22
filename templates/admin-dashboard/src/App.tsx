import { useState } from 'react'
import { Sidebar } from './components/dashboard/sidebar'
import { DashboardOverview } from './components/dashboard/overview'
import { DataTable } from './components/tables/data-table'
import { AnalyticsPage } from './pages/analytics'
import { ProductsPage } from './pages/products'
import { OrdersPage } from './pages/orders'
import { ReportsPage } from './pages/reports'
import { DatabasePage } from './pages/database'
import { SettingsPage } from './pages/settings'
import { Button } from './components/ui/button'
import { Menu } from 'lucide-react'

type View = 'dashboard' | 'analytics' | 'users' | 'products' | 'orders' | 'reports' | 'database' | 'settings'

const viewLabels: Record<View, string> = {
  dashboard: 'Dashboard',
  analytics: 'Analytics',
  users: 'Users',
  products: 'Products',
  orders: 'Orders',
  reports: 'Reports',
  database: 'Database',
  settings: 'Settings',
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<View>('dashboard')

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardOverview />
      case 'analytics':
        return <AnalyticsPage />
      case 'users':
        return <DataTable />
      case 'products':
        return <ProductsPage />
      case 'orders':
        return <OrdersPage />
      case 'reports':
        return <ReportsPage />
      case 'database':
        return <DatabasePage />
      case 'settings':
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view as View)
          setSidebarOpen(false)
        }}
      />

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Navigation tabs */}
            <div className="mb-6">
              <nav className="flex space-x-1 overflow-x-auto">
                {(Object.keys(viewLabels) as View[]).map((view) => (
                  <button
                    key={view}
                    onClick={() => setCurrentView(view)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                      currentView === view
                        ? 'bg-white text-indigo-700 border border-gray-200 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {viewLabels[view]}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
