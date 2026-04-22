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
import { Search, Filter, MoreHorizontal, Plus, Package, Edit, Trash2, Archive } from "lucide-react"

type ProductStatus = "in_stock" | "low_stock" | "out_of_stock"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  sku: string
  image: string
}

const mockProducts: Product[] = [
  { id: "1", name: "Wireless Bluetooth Headphones", category: "Electronics", price: 79.99, stock: 245, status: "in_stock", sku: "WBH-001", image: "headphones" },
  { id: "2", name: "Ergonomic Office Chair", category: "Furniture", price: 449.00, stock: 12, status: "low_stock", sku: "EOC-042", image: "chair" },
  { id: "3", name: "USB-C Hub Adapter 7-in-1", category: "Electronics", price: 34.99, stock: 532, status: "in_stock", sku: "UCA-103", image: "adapter" },
  { id: "4", name: "Organic Cotton T-Shirt", category: "Apparel", price: 28.50, stock: 0, status: "out_of_stock", sku: "OCT-210", image: "tshirt" },
  { id: "5", name: "Stainless Steel Water Bottle", category: "Accessories", price: 24.99, stock: 189, status: "in_stock", sku: "SSW-055", image: "bottle" },
  { id: "6", name: "Mechanical Keyboard RGB", category: "Electronics", price: 129.99, stock: 8, status: "low_stock", sku: "MKR-078", image: "keyboard" },
  { id: "7", name: "Yoga Mat Premium", category: "Fitness", price: 45.00, stock: 76, status: "in_stock", sku: "YMP-322", image: "mat" },
  { id: "8", name: "Laptop Stand Adjustable", category: "Electronics", price: 59.99, stock: 0, status: "out_of_stock", sku: "LSA-091", image: "stand" },
  { id: "9", name: "Ceramic Coffee Mug Set", category: "Home", price: 32.00, stock: 421, status: "in_stock", sku: "CCM-144", image: "mug" },
  { id: "10", name: "Running Shoes Pro", category: "Fitness", price: 119.99, stock: 5, status: "low_stock", sku: "RSP-267", image: "shoes" },
  { id: "11", name: "Portable Power Bank 20000mAh", category: "Electronics", price: 49.99, stock: 312, status: "in_stock", sku: "PPB-401", image: "powerbank" },
  { id: "12", name: "Canvas Backpack", category: "Accessories", price: 64.99, stock: 0, status: "out_of_stock", sku: "CBP-188", image: "backpack" },
  { id: "13", name: "Smart LED Desk Lamp", category: "Home", price: 39.99, stock: 97, status: "in_stock", sku: "SLD-533", image: "lamp" },
  { id: "14", name: "Wireless Mouse Ergonomic", category: "Electronics", price: 29.99, stock: 3, status: "low_stock", sku: "WME-612", image: "mouse" },
  { id: "15", name: "Bamboo Cutting Board Set", category: "Home", price: 22.50, stock: 158, status: "in_stock", sku: "BCS-745", image: "board" },
]

function getStatusBadge(status: ProductStatus) {
  const config = {
    in_stock: { label: "In Stock", variant: "default" as const },
    low_stock: { label: "Low Stock", variant: "secondary" as const },
    out_of_stock: { label: "Out of Stock", variant: "destructive" as const },
  }
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Electronics: "bg-blue-100 text-blue-800",
    Furniture: "bg-amber-100 text-amber-800",
    Apparel: "bg-pink-100 text-pink-800",
    Accessories: "bg-purple-100 text-purple-800",
    Fitness: "bg-green-100 text-green-800",
    Home: "bg-orange-100 text-orange-800",
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

export function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ProductStatus | "all">("all")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalProducts = mockProducts.length
  const inStock = mockProducts.filter((p) => p.status === "in_stock").length
  const lowStock = mockProducts.filter((p) => p.status === "low_stock").length
  const outOfStock = mockProducts.filter((p) => p.status === "out_of_stock").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory and catalog.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => setStatusFilter("all")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-green-300 transition-colors" onClick={() => setStatusFilter("in_stock")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{inStock}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-yellow-300 transition-colors" onClick={() => setStatusFilter("low_stock")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lowStock}</div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-red-300 transition-colors" onClick={() => setStatusFilter("out_of_stock")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{outOfStock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            {statusFilter !== "all"
              ? `Showing ${statusFilter.replace("_", " ")} products`
              : "A complete list of all products in your catalog"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button
              variant={statusFilter !== "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              <Filter className="mr-2 h-4 w-4" />
              {statusFilter !== "all" ? "Clear Filter" : "Filter"}
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">{product.sku}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getCategoryColor(product.category)}`}>
                        {product.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
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
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
              Showing {filteredProducts.length} of {mockProducts.length} products
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
