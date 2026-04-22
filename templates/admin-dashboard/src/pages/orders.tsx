import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Eye,
  Truck,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  DollarSign,
  ShoppingBag,
} from "lucide-react"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

interface Order {
  id: string
  customer: string
  email: string
  amount: number
  items: number
  status: OrderStatus
  date: string
  paymentMethod: string
}

const mockOrders: Order[] = [
  { id: "ORD-7821", customer: "Emma Watson", email: "emma@example.com", amount: 234.50, items: 3, status: "delivered", date: "2024-01-15", paymentMethod: "Credit Card" },
  { id: "ORD-7822", customer: "Liam Johnson", email: "liam@example.com", amount: 89.99, items: 1, status: "shipped", date: "2024-01-15", paymentMethod: "PayPal" },
  { id: "ORD-7823", customer: "Sophia Brown", email: "sophia@example.com", amount: 549.00, items: 2, status: "processing", date: "2024-01-14", paymentMethod: "Credit Card" },
  { id: "ORD-7824", customer: "Noah Davis", email: "noah@example.com", amount: 127.50, items: 4, status: "pending", date: "2024-01-14", paymentMethod: "Debit Card" },
  { id: "ORD-7825", customer: "Ava Wilson", email: "ava@example.com", amount: 64.99, items: 1, status: "delivered", date: "2024-01-13", paymentMethod: "Credit Card" },
  { id: "ORD-7826", customer: "Mason Taylor", email: "mason@example.com", amount: 312.00, items: 5, status: "cancelled", date: "2024-01-13", paymentMethod: "PayPal" },
  { id: "ORD-7827", customer: "Isabella Martinez", email: "isabella@example.com", amount: 199.99, items: 2, status: "shipped", date: "2024-01-12", paymentMethod: "Credit Card" },
  { id: "ORD-7828", customer: "James Anderson", email: "james@example.com", amount: 78.50, items: 1, status: "delivered", date: "2024-01-12", paymentMethod: "Apple Pay" },
  { id: "ORD-7829", customer: "Mia Thomas", email: "mia@example.com", amount: 445.00, items: 3, status: "processing", date: "2024-01-11", paymentMethod: "Credit Card" },
  { id: "ORD-7830", customer: "Benjamin Lee", email: "ben@example.com", amount: 29.99, items: 1, status: "pending", date: "2024-01-11", paymentMethod: "Debit Card" },
  { id: "ORD-7831", customer: "Charlotte Harris", email: "charlotte@example.com", amount: 189.99, items: 2, status: "shipped", date: "2024-01-10", paymentMethod: "PayPal" },
  { id: "ORD-7832", customer: "Elijah Clark", email: "elijah@example.com", amount: 672.00, items: 6, status: "delivered", date: "2024-01-10", paymentMethod: "Credit Card" },
]

function getStatusBadge(status: OrderStatus) {
  const config: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ReactNode }> = {
    pending: { label: "Pending", variant: "outline", icon: <Clock className="h-3 w-3 mr-1" /> },
    processing: { label: "Processing", variant: "secondary", icon: <Package className="h-3 w-3 mr-1" /> },
    shipped: { label: "Shipped", variant: "default", icon: <Truck className="h-3 w-3 mr-1" /> },
    delivered: { label: "Delivered", variant: "default", icon: <CheckCircle2 className="h-3 w-3 mr-1" /> },
    cancelled: { label: "Cancelled", variant: "destructive", icon: <XCircle className="h-3 w-3 mr-1" /> },
  }
  const { label, variant, icon } = config[status]
  return (
    <Badge variant={variant} className="flex items-center w-fit">
      {icon}
      {label}
    </Badge>
  )
}

export function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.amount, 0)
  const pendingCount = mockOrders.filter((o) => o.status === "pending").length
  const shippedCount = mockOrders.filter((o) => o.status === "shipped").length
  const deliveredCount = mockOrders.filter((o) => o.status === "delivered").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">Track and manage customer orders.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">{mockOrders.length} total orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Truck className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shippedCount}</div>
            <p className="text-xs text-muted-foreground">In transit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredCount}</div>
            <p className="text-xs text-muted-foreground">Successfully completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            View and manage all customer orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Status Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID, customer, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="text-xs"
                >
                  {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">${order.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-center">{order.items}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                    <TableCell className="text-sm">{order.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredOrders.length} of {mockOrders.length} orders
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
