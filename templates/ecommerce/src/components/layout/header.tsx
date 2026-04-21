import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Cart } from '../ecommerce/cart'
import { Search, Menu, User, ShoppingBag, Heart, Package, Settings } from 'lucide-react'
import { mockCategories } from '../../data/mockData'
import { cn } from '../../lib/utils'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const mainCategories = mockCategories.filter(cat => !cat.parentId)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="hidden md:flex items-center space-x-4">
              <span>Free shipping on orders over $50</span>
              <span>•</span>
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/help" className="hover:text-primary">
                Help
              </Link>
              <Link to="/track" className="hover:text-primary">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">{{project-name}}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Home
                </Link>
              </NavigationMenuItem>

              {mainCategories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            to={`/category/${category.id}`}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {category.name}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              {category.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      {category.subcategories.map((subcategory) => (
                        <NavigationMenuLink key={subcategory.id} asChild>
                          <Link
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            to={`/category/${subcategory.id}`}
                          >
                            <div className="text-sm font-medium leading-none">
                              {subcategory.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {subcategory.productCount} products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <Link to="/deals" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                  Deals
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-0 top-0 h-full px-3"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Account */}
            <Button variant="ghost" size="sm" asChild>
              <Link to="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Cart />

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through our store
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="space-y-4">
                    <Link
                      to="/"
                      className="block px-2 py-1 text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>

                    {mainCategories.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <Link
                          to={`/category/${category.id}`}
                          className="block px-2 py-1 text-lg font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                        <div className="ml-4 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              to={`/category/${subcategory.id}`}
                              className="block px-2 py-1 text-sm text-muted-foreground"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <Link
                      to="/deals"
                      className="block px-2 py-1 text-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Deals
                    </Link>

                    <div className="border-t pt-4 space-y-2">
                      <Link
                        to="/account"
                        className="flex items-center px-2 py-1 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-2 py-1 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center px-2 py-1 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Wishlist
                      </Link>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
