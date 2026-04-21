import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../lib/utils'
import { ShoppingBag } from 'lucide-react'

export function CartPage() {
  const { cart, updateQuantity, removeItem, getTotalItems } = useCartStore()

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to get started</p>
          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-muted-foreground">{formatPrice(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(cart.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(cart.tax)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>
              <Button className="w-full mt-4" asChild>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
