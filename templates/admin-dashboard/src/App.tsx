import { useState } from 'react'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
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

const navTabs = [
  { label: 'Dashboard', path: '/' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Users', path: '/users' },
  { label: 'Products', path: '/products' },
  { label: 'Orders', path: '/orders' },
  { label: 'Reports', path: '/reports' },
  { label: 'Database', path: '/database' },
  { label: 'Settings', path: '/settings' },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        onNavigate={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Navigation tabs */}
            <div className="mb-6">
              <nav className="flex space-x-1 overflow-x-auto">
                {navTabs.map((tab) => (
                  <NavLink
                    key={tab.path}
                    to={tab.path}
                    end={tab.path === '/'}
                    className={({ isActive }) =>
                      `px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-indigo-700 border border-gray-200 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {tab.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Content */}
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/users" element={<DataTable />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/database" element={<DatabasePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
