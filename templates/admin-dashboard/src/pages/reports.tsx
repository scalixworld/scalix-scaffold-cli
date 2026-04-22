import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Percent } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const categoryRevenueData = [
  { name: "Electronics", value: 42500, color: "#6366f1" },
  { name: "Apparel", value: 18200, color: "#ec4899" },
  { name: "Home & Garden", value: 15800, color: "#f59e0b" },
  { name: "Fitness", value: 12400, color: "#10b981" },
  { name: "Accessories", value: 9800, color: "#8b5cf6" },
  { name: "Furniture", value: 7300, color: "#06b6d4" },
]

const monthlyComparisonData = [
  { month: "Jul", thisYear: 28700, lastYear: 22100 },
  { month: "Aug", thisYear: 29500, lastYear: 24300 },
  { month: "Sep", thisYear: 36800, lastYear: 27800 },
  { month: "Oct", thisYear: 38200, lastYear: 29100 },
  { month: "Nov", thisYear: 41500, lastYear: 35400 },
  { month: "Dec", thisYear: 45200, lastYear: 38900 },
]

const summaryStats = [
  {
    title: "Gross Revenue",
    value: "$106,000",
    change: "+18.2%",
    changeType: "positive" as const,
    icon: <DollarSign className="h-4 w-4" />,
    description: "Total revenue this quarter",
  },
  {
    title: "Net Profit",
    value: "$38,160",
    change: "+12.7%",
    changeType: "positive" as const,
    icon: <TrendingUp className="h-4 w-4" />,
    description: "After expenses and taxes",
  },
  {
    title: "Avg. Order Value",
    value: "$87.42",
    change: "+5.3%",
    changeType: "positive" as const,
    icon: <ShoppingCart className="h-4 w-4" />,
    description: "Per transaction average",
  },
  {
    title: "Customer Retention",
    value: "74.8%",
    change: "-2.1%",
    changeType: "negative" as const,
    icon: <Users className="h-4 w-4" />,
    description: "Repeat purchase rate",
  },
  {
    title: "Conversion Rate",
    value: "3.6%",
    change: "+0.4%",
    changeType: "positive" as const,
    icon: <Percent className="h-4 w-4" />,
    description: "Visitor to customer",
  },
  {
    title: "Refund Rate",
    value: "2.1%",
    change: "-0.3%",
    changeType: "positive" as const,
    icon: <TrendingDown className="h-4 w-4" />,
    description: "Of total transactions",
  },
]

const RADIAN = Math.PI / 180
function renderCustomizedLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function ReportsPage() {
  const totalRevenue = categoryRevenueData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Financial summaries, category breakdowns, and performance comparisons.
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {summaryStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className="text-muted-foreground">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last quarter
                </p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Revenue by Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>
              Breakdown of ${totalRevenue.toLocaleString()} total revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryRevenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    innerRadius={60}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {categoryRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                {categoryRevenueData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium ml-auto">${(item.value / 1000).toFixed(1)}k</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Comparison Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Year-over-Year Comparison</CardTitle>
            <CardDescription>
              Monthly revenue: this year vs last year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb" }}
                />
                <Legend />
                <Bar dataKey="thisYear" name="This Year" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lastYear" name="Last Year" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
