import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, MoreHorizontal, Edit, Trash2, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
}

// Mock data - in a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2024-01-14"
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10"
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "pending",
    lastLogin: "Never"
  }
]

function Badge({ children, variant = "default", className = "" }: {
  children: React.ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  }

  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

function Input({ placeholder, className = "", ...props }: {
  placeholder?: string
  className?: string
  [key: string]: any
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {React.cloneElement(children as React.ReactElement, {
        onClick: () => setIsOpen(!isOpen)
      })}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-1 py-1">
            <div className="px-2 py-2 text-sm text-gray-700">Actions</div>
            <div className="border-t border-gray-100"></div>
            <button className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </button>
            <button className="flex w-full items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return <div className="cursor-pointer">{children}</div>
}

function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return <div className="py-1">{children}</div>
}

function DropdownMenuItem({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <button
      className="flex w-full items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-2 text-sm font-medium text-gray-900">{children}</div>
}

function DropdownMenuSeparator() {
  return <div className="border-t border-gray-100"></div>
}

function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full caption-bottom text-sm">{children}</table>
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="[&_tr]:border-b">{children}</thead>
}

function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
}

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">{children}</tr>
}

function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">{children}</th>
}

function TableCell({ children }: { children: React.ReactNode }) {
  return <td className="p-2 align-middle [&:has([role=checkbox])]:pr-0">{children}</td>
}

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [users] = useState<User[]>(mockUsers)

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      pending: "outline"
    } as const

    return (
      <Badge variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage users, roles, and permissions for your application.
            </CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
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
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
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
  )
}
