import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, ShoppingCart, TrendingUp, Activity, Eye, Calendar, BarChart3 } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}

function MetricCard({ title, value, change, changeType, icon }: MetricCardProps) {
  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor[changeType]}`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}

export function DashboardOverview() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: 'positive' as const,
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      title: "Subscriptions",
      value: "+2350",
      change: "+180.1%",
      changeType: 'positive' as const,
      icon: <Users className="h-4 w-4" />
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19%",
      changeType: 'positive' as const,
      icon: <ShoppingCart className="h-4 w-4" />
    },
    {
      title: "Active Now",
      value: "+573",
      change: "+201",
      changeType: 'positive' as const,
      icon: <Activity className="h-4 w-4" />
    }
  ]

  const recentActivity = [
    {
      user: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "+$1,999.00",
      status: "success"
    },
    {
      user: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "+$39.00",
      status: "success"
    },
    {
      user: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "+$299.00",
      status: "processing"
    },
    {
      user: "William Kim",
      email: "will@email.com",
      amount: "+$99.00",
      status: "success"
    },
    {
      user: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "+$39.00",
      status: "failed"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Chart Placeholder */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue for the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Revenue chart will be implemented here</p>
                <p className="text-sm">Using Recharts library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              Latest transactions from your store
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center">
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium">{activity.amount}</div>
                    <Badge
                      variant={
                        activity.status === 'success' ? 'default' :
                        activity.status === 'processing' ? 'secondary' :
                        'destructive'
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for managing your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ShoppingCart className="h-6 w-6 mb-2" />
              View Orders
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              Analytics
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Eye className="h-6 w-6 mb-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
