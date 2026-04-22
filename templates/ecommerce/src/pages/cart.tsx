import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../lib/utils'
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight, Tag, Truck, Shield, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const IMAGE_COLORS = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-emerald-400 to-emerald-600',
  'bg-gradient-to-br from-orange-400 to-orange-600',
  'bg-gradient-to-br from-pink-400 to-pink-600',
  'bg-gradient-to-br from-cyan-400 to-cyan-600',
]

function getColorForItem(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return IMAGE_COLORS[hash % IMAGE_COLORS.length]
}

export function CartPage() {
  const { cart, updateQuantity, removeItem, getTotalItems, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const shippingEstimate = cart.subtotal >= 50 ? 0 : 5.99
  const taxEstimate = Math.round(cart.subtotal * 0.08 * 100) / 100

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setCouponApplied(true)
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you have not added any items to your cart yet. Start shopping to find great products.
          </p>
          <Button size="lg" asChild>
            <Link to="/">
              Start Shopping
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Shopping Cart</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <span className="text-muted-foreground">{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex gap-4 p-4">
                  {/* Product Image Placeholder */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-lg ${getColorForItem(item.product.id)} flex items-center justify-center`}>
                      <span className="text-white text-2xl font-bold">{item.product.name.charAt(0)}</span>
                    </div>
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="hover:text-primary">
                      <h3 className="font-semibold text-base truncate">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground capitalize mt-1">{item.product.category}</p>
                    {Object.keys(item.selectedAttributes).length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {Object.entries(item.selectedAttributes).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(item.product.price * item.quantity)}</div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">{formatPrice(item.product.price)} each</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive h-8 w-8 p-0 flex-shrink-0"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Clear Cart */}
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button variant="ghost" className="text-destructive" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    Shipping
                    {shippingEstimate === 0 && (
                      <Badge variant="secondary" className="text-xs">Free</Badge>
                    )}
                  </span>
                  <span>{shippingEstimate === 0 ? 'Free' : formatPrice(shippingEstimate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(taxEstimate)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount (SAVE10)</span>
                    <span>-{formatPrice(cart.subtotal * 0.1)}</span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>
                      {formatPrice(
                        cart.subtotal + shippingEstimate + taxEstimate - (couponApplied ? cart.subtotal * 0.1 : 0)
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Coupon Code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Coupon Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              {couponApplied ? (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">SAVE10</Badge>
                  <span className="text-sm text-green-800">10% discount applied</span>
                  <Button variant="ghost" size="sm" onClick={() => setCouponApplied(false)} className="ml-auto h-6">
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>Secure checkout with SSL encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Tag className="h-4 w-4 text-purple-600 flex-shrink-0" />
                <span>Try code SAVE10 for 10% off</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
