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
import { Database, CheckCircle2, HardDrive, Clock, Zap, Server, TableIcon } from "lucide-react"

const connectionInfo = {
  status: "connected" as const,
  host: "db-primary.{{project-name}}.internal",
  port: 5432,
  database: "{{project-name}}_production",
  engine: "PostgreSQL 16.1",
  uptime: "45 days, 12 hours",
  ssl: true,
  poolSize: 20,
  activeConnections: 7,
  maxConnections: 100,
  responseTime: "2.4ms",
  storageUsed: "2.8 GB",
  storageTotal: "50 GB",
}

const databaseTables = [
  { name: "users", rows: 14832, size: "245 MB", lastModified: "2024-01-15 14:32:10", indexes: 4 },
  { name: "orders", rows: 89241, size: "512 MB", lastModified: "2024-01-15 14:31:58", indexes: 6 },
  { name: "products", rows: 3421, size: "89 MB", lastModified: "2024-01-15 12:15:33", indexes: 3 },
  { name: "order_items", rows: 234102, size: "678 MB", lastModified: "2024-01-15 14:31:58", indexes: 5 },
  { name: "categories", rows: 48, size: "1.2 MB", lastModified: "2024-01-10 09:22:01", indexes: 2 },
  { name: "reviews", rows: 42891, size: "312 MB", lastModified: "2024-01-15 13:45:22", indexes: 3 },
  { name: "sessions", rows: 5210, size: "45 MB", lastModified: "2024-01-15 14:32:15", indexes: 2 },
  { name: "audit_logs", rows: 1284021, size: "890 MB", lastModified: "2024-01-15 14:32:18", indexes: 4 },
  { name: "notifications", rows: 67432, size: "78 MB", lastModified: "2024-01-15 14:30:05", indexes: 3 },
  { name: "settings", rows: 156, size: "0.5 MB", lastModified: "2024-01-14 16:10:42", indexes: 1 },
]

const recentQueries = [
  { query: "SELECT * FROM orders WHERE status = 'pending' ORDER BY created_at DESC LIMIT 50", duration: "12ms", rows: 23, timestamp: "14:32:18", status: "success" },
  { query: "UPDATE products SET stock = stock - 1 WHERE id = 1247", duration: "3ms", rows: 1, timestamp: "14:31:58", status: "success" },
  { query: "INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3)", duration: "2ms", rows: 1, timestamp: "14:31:55", status: "success" },
  { query: "SELECT u.*, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id ORDER BY order_count DESC LIMIT 10", duration: "145ms", rows: 10, timestamp: "14:30:22", status: "slow" },
  { query: "DELETE FROM sessions WHERE expires_at < NOW()", duration: "8ms", rows: 342, timestamp: "14:30:00", status: "success" },
  { query: "SELECT category, SUM(amount) as total FROM orders GROUP BY category", duration: "89ms", rows: 6, timestamp: "14:28:15", status: "success" },
  { query: "ALTER TABLE users ADD COLUMN last_activity_at TIMESTAMP", duration: "234ms", rows: 0, timestamp: "14:25:00", status: "slow" },
  { query: "SELECT COUNT(*) FROM notifications WHERE read = false AND user_id = $1", duration: "4ms", rows: 1, timestamp: "14:24:30", status: "success" },
]

export function DatabasePage() {
  const totalRows = databaseTables.reduce((sum, t) => sum + t.rows, 0)
  const storagePercent = (parseFloat(connectionInfo.storageUsed) / parseFloat(connectionInfo.storageTotal)) * 100

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Database</h1>
        <p className="text-muted-foreground">
          Monitor database connections, tables, and query performance.
        </p>
      </div>

      {/* Connection Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold text-green-600">Connected</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Uptime: {connectionInfo.uptime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionInfo.responseTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Average query latency</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connections</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionInfo.activeConnections} / {connectionInfo.maxConnections}</div>
            <p className="text-xs text-muted-foreground mt-1">Pool size: {connectionInfo.poolSize}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionInfo.storageUsed}</div>
            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${storagePercent}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">of {connectionInfo.storageTotal} total</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection Details */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Details</CardTitle>
          <CardDescription>Primary database connection information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Host</p>
              <p className="text-sm font-mono font-medium">{connectionInfo.host}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Port</p>
              <p className="text-sm font-mono font-medium">{connectionInfo.port}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Database</p>
              <p className="text-sm font-mono font-medium">{connectionInfo.database}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Engine</p>
              <p className="text-sm font-medium flex items-center gap-2">
                {connectionInfo.engine}
                {connectionInfo.ssl && <Badge variant="outline" className="text-xs">SSL</Badge>}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tables List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tables</CardTitle>
              <CardDescription>
                {databaseTables.length} tables with {totalRows.toLocaleString()} total rows
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">
              <TableIcon className="h-3 w-3 mr-1" />
              {databaseTables.length} tables
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead className="text-right">Rows</TableHead>
                  <TableHead className="text-right">Size</TableHead>
                  <TableHead className="text-center">Indexes</TableHead>
                  <TableHead>Last Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {databaseTables.map((table) => (
                  <TableRow key={table.name}>
                    <TableCell className="font-mono text-sm font-medium">{table.name}</TableCell>
                    <TableCell className="text-right">{table.rows.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{table.size}</TableCell>
                    <TableCell className="text-center">{table.indexes}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{table.lastModified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Queries</CardTitle>
          <CardDescription>Latest database queries and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Query</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead className="text-right">Rows</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentQueries.map((q, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <code className="text-xs bg-gray-50 px-2 py-1 rounded font-mono block truncate max-w-[400px]">
                        {q.query}
                      </code>
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">{q.duration}</TableCell>
                    <TableCell className="text-right">{q.rows}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{q.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant={q.status === "success" ? "default" : "secondary"}>
                        {q.status === "slow" ? (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Slow
                          </span>
                        ) : (
                          "OK"
                        )}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
