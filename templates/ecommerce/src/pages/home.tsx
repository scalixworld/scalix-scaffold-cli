import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from '../components/ecommerce/productCard'
import { mockProducts, mockCategories, mockDashboardStats } from '../data/mockData'
import { formatPrice } from '../lib/utils'
import { ArrowRight, Star, Truck, Shield, RotateCcw, Award } from 'lucide-react'

export function HomePage() {
  const [featuredProducts] = useState(mockProducts.filter(p => p.isFeatured).slice(0, 8))
  const [newArrivals] = useState(mockProducts.slice(0, 8))
  const [onSaleProducts] = useState(mockProducts.filter(p => p.originalPrice).slice(0, 4))
  const categories = mockCategories.slice(0, 6)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to {{project-name}}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Discover amazing products at unbeatable prices. Quality you can trust,
              service you can count on.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Categories
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                256-bit SSL encryption for all transactions
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <RotateCcw className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                30-day return policy with free return shipping
              </p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Premium quality products you can trust
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground">
            Explore our wide range of product categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl">{category.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.productCount} products
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">
              Handpicked products just for you
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/featured">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sale Banner */}
      {onSaleProducts.length > 0 && (
        <section className="bg-red-50 border-y">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-8">
              <Badge variant="destructive" className="mb-4">
                Limited Time Offer
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Special Deals</h2>
              <p className="text-muted-foreground">
                Don't miss out on these amazing deals
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">
              Check out the latest products in our store
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/new-arrivals">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockDashboardStats.totalCustomers.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockDashboardStats.totalProducts?.toLocaleString() || '1000+'}
              </div>
              <div className="text-muted-foreground">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockDashboardStats.totalOrders.toLocaleString()}
              </div>
              <div className="text-muted-foreground">Orders Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                4.8
              </div>
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <span>Customer Rating</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter and be the first to know about new products,
              exclusive deals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-foreground"
              />
              <Button variant="secondary">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
