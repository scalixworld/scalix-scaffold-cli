import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      {/* Newsletter Section */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay in the loop</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">{{project-name}}</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your one-stop destination for quality products at unbeatable prices.
              We offer fast shipping, easy returns, and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-muted-foreground hover:text-foreground transition-colors">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold mb-4">My Account</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/account" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-muted-foreground hover:text-foreground transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Call us</p>
                <p className="text-sm text-muted-foreground">1-800-STORE</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email us</p>
                <p className="text-sm text-muted-foreground">support@{{project-name}}.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Visit us</p>
                <p className="text-sm text-muted-foreground">123 Commerce St, City, ST 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 {{project-name}}. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
