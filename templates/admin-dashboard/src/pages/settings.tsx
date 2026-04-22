import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Bell, Palette, Shield, Save } from "lucide-react"

interface NotificationSetting {
  id: string
  label: string
  description: string
  enabled: boolean
}

export function SettingsPage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: "{{project-name}}",
    role: "Administrator",
    timezone: "UTC-5 (Eastern)",
  })

  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    { id: "email_orders", label: "New Orders", description: "Receive email notifications for new orders", enabled: true },
    { id: "email_users", label: "User Sign-ups", description: "Get notified when new users register", enabled: true },
    { id: "email_reports", label: "Weekly Reports", description: "Receive weekly performance summary via email", enabled: false },
    { id: "email_alerts", label: "System Alerts", description: "Critical system alerts and downtime notifications", enabled: true },
    { id: "email_marketing", label: "Marketing Updates", description: "Product updates and feature announcements", enabled: false },
    { id: "push_orders", label: "Push Notifications", description: "Browser push notifications for urgent items", enabled: true },
  ])

  const [activeTheme, setActiveTheme] = useState<"light" | "dark" | "system">("light")

  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    )
  }

  const themes = [
    { id: "light" as const, label: "Light", description: "Default light appearance", colors: ["bg-white", "bg-gray-100", "bg-indigo-500"] },
    { id: "dark" as const, label: "Dark", description: "Dark mode for low-light environments", colors: ["bg-gray-900", "bg-gray-800", "bg-indigo-400"] },
    { id: "system" as const, label: "System", description: "Match your OS preference", colors: ["bg-gray-200", "bg-gray-700", "bg-indigo-500"] },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information and account details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-indigo-600">
                  {profile.firstName[0]}{profile.lastName[0]}
                </span>
              </div>
              <div>
                <p className="font-medium">{profile.firstName} {profile.lastName}</p>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Admin Access
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input value={profile.role} disabled className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <Input value={profile.timezone} disabled className="bg-gray-50" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between py-3 border-b last:border-b-0"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{notification.label}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <button
                  onClick={() => toggleNotification(notification.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    notification.enabled ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the dashboard looks</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`relative rounded-lg border-2 p-4 text-left transition-all hover:border-indigo-300 ${
                  activeTheme === theme.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                }`}
              >
                {activeTheme === theme.id && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  {theme.colors.map((color, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${color} border border-gray-300`} />
                  ))}
                </div>
                <p className="font-medium text-sm">{theme.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
