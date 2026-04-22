import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TrendingUp, TrendingDown, Eye, MousePointerClick, Clock, Target } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const trafficData = [
  { date: "Mon", visitors: 2400, pageViews: 4200, sessions: 1800 },
  { date: "Tue", visitors: 1398, pageViews: 3100, sessions: 1200 },
  { date: "Wed", visitors: 3800, pageViews: 6400, sessions: 2900 },
  { date: "Thu", visitors: 3908, pageViews: 6800, sessions: 3100 },
  { date: "Fri", visitors: 4800, pageViews: 7900, sessions: 3600 },
  { date: "Sat", visitors: 3200, pageViews: 5200, sessions: 2400 },
  { date: "Sun", visitors: 2100, pageViews: 3800, sessions: 1600 },
]

const topPages = [
  { path: "/", title: "Homepage", views: 12847, uniqueVisitors: 9231, bounceRate: "32.4%", avgTime: "2m 45s" },
  { path: "/products", title: "Products", views: 8932, uniqueVisitors: 6714, bounceRate: "28.1%", avgTime: "3m 12s" },
  { path: "/pricing", title: "Pricing", views: 6218, uniqueVisitors: 5102, bounceRate: "41.7%", avgTime: "1m 58s" },
  { path: "/blog", title: "Blog", views: 5491, uniqueVisitors: 4320, bounceRate: "35.2%", avgTime: "4m 30s" },
  { path: "/about", title: "About Us", views: 4103, uniqueVisitors: 3412, bounceRate: "45.3%", avgTime: "1m 22s" },
  { path: "/contact", title: "Contact", views: 3287, uniqueVisitors: 2890, bounceRate: "38.9%", avgTime: "2m 10s" },
  { path: "/docs", title: "Documentation", views: 2941, uniqueVisitors: 2103, bounceRate: "22.6%", avgTime: "5m 48s" },
  { path: "/signup", title: "Sign Up", views: 2654, uniqueVisitors: 2410, bounceRate: "52.1%", avgTime: "1m 05s" },
]

const funnelMetrics = [
  { stage: "Page Views", count: 48200, percentage: 100, color: "bg-indigo-500" },
  { stage: "Engaged Visitors", count: 28920, percentage: 60, color: "bg-indigo-400" },
  { stage: "Sign Up Started", count: 8670, percentage: 18, color: "bg-indigo-300" },
  { stage: "Sign Up Completed", count: 4335, percentage: 9, color: "bg-violet-400" },
  { stage: "First Purchase", count: 1734, percentage: 3.6, color: "bg-violet-500" },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Traffic insights, engagement metrics, and conversion data.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21,706</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37,400</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +8.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 24s</div>
            <p className="text-xs text-red-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" /> -2.1% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36.2%</div>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" /> -4.3% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Visitors, page views, and sessions this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }} />
              <Line type="monotone" dataKey="pageViews" name="Page Views" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="visitors" name="Visitors" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-5">
        {/* Top Pages Table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Unique</TableHead>
                    <TableHead className="text-right">Bounce</TableHead>
                    <TableHead className="text-right">Avg. Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPages.map((page) => (
                    <TableRow key={page.path}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{page.title}</p>
                          <p className="text-xs text-muted-foreground">{page.path}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{page.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{page.uniqueVisitors.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{page.bounceRate}</TableCell>
                      <TableCell className="text-right">{page.avgTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visit to purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelMetrics.map((metric, index) => (
                <div key={metric.stage} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{metric.stage}</span>
                    <span className="text-muted-foreground">
                      {metric.count.toLocaleString()} ({metric.percentage}%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${metric.color} rounded-full transition-all`}
                      style={{ width: `${metric.percentage}%` }}
                    />
                  </div>
                  {index < funnelMetrics.length - 1 && (
                    <div className="flex justify-center">
                      <Badge variant="outline" className="text-xs">
                        {index < funnelMetrics.length - 1
                          ? `${((funnelMetrics[index + 1].count / metric.count) * 100).toFixed(1)}% conversion`
                          : ""}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
