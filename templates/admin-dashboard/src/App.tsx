import { useState } from 'react'
import { Sidebar } from './components/dashboard/sidebar'
import { DashboardOverview } from './components/dashboard/overview'
import { DataTable } from './components/tables/data-table'
import { Button } from './components/ui/button'
import { Menu } from 'lucide-react'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'dashboard' | 'users'>('dashboard')

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
      />

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Navigation tabs */}
            <div className="mb-6">
              <nav className="flex space-x-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-white text-indigo-700 border border-gray-200 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('users')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'users'
                      ? 'bg-white text-indigo-700 border border-gray-200 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Users
                </button>
              </nav>
            </div>

            {/* Content */}
            {currentView === 'dashboard' ? (
              <DashboardOverview />
            ) : (
              <DataTable />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
