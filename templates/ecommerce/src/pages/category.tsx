import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from '../components/ecommerce/productCard'
import { getProductsByCategory, mockCategories, mockProducts } from '../data/mockData'
import { ChevronRight, SlidersHorizontal, Grid3X3, LayoutList, Package } from 'lucide-react'

type SortOption = 'price-low' | 'price-high' | 'rating' | 'newest' | 'name-az'
type ViewMode = 'grid' | 'list'

export function CategoryPage() {
  const { id } = useParams()
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [priceRange, setPriceRange] = useState<string>('all')

  const category = mockCategories.find(c => c.id === id)
  const subcategory = mockCategories.flatMap(c => c.subcategories).find(s => s.id === id)
  const currentCategory = category || subcategory
  const parentCategory = subcategory
    ? mockCategories.find(c => c.subcategories.some(s => s.id === id))
    : null

  const rawProducts = id ? getProductsByCategory(id) : mockProducts

  const filteredProducts = useMemo(() => {
    let products = [...rawProducts]

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      products = products.filter(p => {
        if (max) return p.price >= min && p.price <= max
        return p.price >= min
      })
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        products.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'name-az':
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    return products
  }, [rawProducts, sortBy, priceRange])

  const categoryName = currentCategory?.name || (id ? id.replace(/-/g, ' ') : 'All Products')
  const categoryDescription = currentCategory?.description || `Browse our collection of ${categoryName.toLowerCase()} products.`

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        {parentCategory && (
          <>
            <Link to={`/category/${parentCategory.id}`} className="hover:text-foreground">
              {parentCategory.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
          </>
        )}
        <span className="text-foreground capitalize">{categoryName}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white mb-6">
          <h1 className="text-4xl font-bold mb-3 capitalize">{categoryName}</h1>
          <p className="text-blue-100 text-lg max-w-2xl">{categoryDescription}</p>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-none">
              {filteredProducts.length} products
            </Badge>
          </div>
        </div>

        {/* Subcategories */}
        {category && category.subcategories.length > 0 && (
          <div className="flex gap-3 mb-6 flex-wrap">
            <Button
              variant={!subcategory ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link to={`/category/${category.id}`}>All {category.name}</Link>
            </Button>
            {category.subcategories.map((sub) => (
              <Button
                key={sub.id}
                variant={id === sub.id ? "default" : "outline"}
                size="sm"
                asChild
              >
                <Link to={`/category/${sub.id}`}>
                  {sub.name}
                  <span className="ml-1 text-xs opacity-70">({sub.productCount})</span>
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </span>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {/* Price Range Filter */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-25">Under $25</SelectItem>
              <SelectItem value="25-50">$25 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-250">$100 - $250</SelectItem>
              <SelectItem value="250-500">$250 - $500</SelectItem>
              <SelectItem value="500-99999">$500+</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name-az">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid / List */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or browse other categories.
            </p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link to={`/product/${product.id}`} className="flex gap-6">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-3xl font-bold">{product.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 py-4 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                      {product.isFeatured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
                      {product.originalPrice && (
                        <Badge variant="destructive" className="text-xs">Sale</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1 hover:text-primary">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                          {'\u2605'}
                        </span>
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className={`text-xs ${product.inventory > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
