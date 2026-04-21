import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Users,
  ShoppingCart,
  Settings,
  Home,
  FileText,
  PieChart,
  Database,
  Menu,
  X
} from "lucide-react"

interface SidebarProps {
  className?: string
  isOpen: boolean
  onToggle: () => void
}

const navigation = [
  { name: "Dashboard", href: "#", icon: Home, current: true },
  { name: "Analytics", href: "#", icon: BarChart3, current: false },
  { name: "Users", href: "#", icon: Users, current: false },
  { name: "Products", href: "#", icon: ShoppingCart, current: false },
  { name: "Orders", href: "#", icon: FileText, current: false },
  { name: "Reports", href: "#", icon: PieChart, current: false },
  { name: "Database", href: "#", icon: Database, current: false },
  { name: "Settings", href: "#", icon: Settings, current: false },
]

export function Sidebar({ className, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black bg-opacity-50"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {{project-name}}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onToggle}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    item.current
                      ? "bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      item.current
                        ? "text-indigo-500 dark:text-indigo-300"
                        : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    )}
                  />
                  {item.name}
                  {item.name === "Dashboard" && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      New
                    </Badge>
                  )}
                </a>
              )
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
