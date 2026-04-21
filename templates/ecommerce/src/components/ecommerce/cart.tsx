import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Minus, Plus, Trash2, ShoppingCart, X } from "lucide-react"
import { useCartStore } from "../../store/cartStore"
import { formatPrice } from "../../lib/utils"

interface CartProps {
  trigger?: React.ReactNode
}

export function Cart({ trigger }: CartProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, updateQuantity, removeItem, getTotalItems, clearCart } = useCartStore()

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="relative">
      <ShoppingCart className="w-4 h-4 mr-2" />
      Cart
      {getTotalItems() > 0 && (
        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
          {getTotalItems()}
        </Badge>
      )}
    </Button>
  )

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({getTotalItems()} items)
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Add some products to get started
                  </p>
                </div>
                <Button onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      {/* Product Image */}
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.product.name}
                        </h4>

                        {/* Selected Attributes */}
                        {Object.entries(item.selectedAttributes).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {Object.entries(item.selectedAttributes).map(([key, value]) => (
                              <Badge key={key} variant="outline" className="text-xs">
                                {key}: {value}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-medium">
                              {formatPrice(item.product.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-xs text-muted-foreground">
                                {formatPrice(item.product.price)} each
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Cart Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                  </div>
                  {cart.shipping > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{formatPrice(cart.shipping)}</span>
                    </div>
                  )}
                  {cart.tax > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>{formatPrice(cart.tax)}</span>
                    </div>
                  )}
                  {cart.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(cart.discount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-1"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
