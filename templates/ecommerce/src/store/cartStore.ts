import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product, ProductVariant } from '../types/ecommerce'

interface CartStore {
  cart: Cart
  addItem: (product: Product, quantity?: number, variant?: ProductVariant, attributes?: Record<string, string>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  applyDiscount: (discount: number) => void
  setShipping: (shipping: number) => void
  setTax: (tax: number) => void
}

const initialCart: Cart = {
  id: 'guest-cart',
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  currency: 'USD'
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: initialCart,

      addItem: (product, quantity = 1, variant, attributes = {}) => {
        const { cart } = get()
        const itemId = `${product.id}-${variant?.id || 'default'}-${JSON.stringify(attributes)}`

        const existingItemIndex = cart.items.findIndex(item => item.id === itemId)

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          const updatedItems = [...cart.items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ cart: { ...cart, items: updatedItems } })
        } else {
          // Add new item
          const newItem: CartItem = {
            id: itemId,
            product,
            variant,
            quantity,
            selectedAttributes: attributes,
            addedAt: new Date()
          }
          set({ cart: { ...cart, items: [...cart.items, newItem] } })
        }

        // Recalculate totals
        get().updateTotals()
      },

      removeItem: (itemId) => {
        const { cart } = get()
        const updatedItems = cart.items.filter(item => item.id !== itemId)
        set({ cart: { ...cart, items: updatedItems } })
        get().updateTotals()
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        const { cart } = get()
        const updatedItems = cart.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
        set({ cart: { ...cart, items: updatedItems } })
        get().updateTotals()
      },

      clearCart: () => {
        set({ cart: { ...initialCart, id: get().cart.id } })
      },

      getTotalItems: () => {
        return get().cart.items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().cart.items.reduce((total, item) => {
          const price = item.variant?.priceModifier
            ? item.product.price + item.variant.priceModifier
            : item.product.price
          return total + (price * item.quantity)
        }, 0)
      },

      applyDiscount: (discount) => {
        const { cart } = get()
        set({ cart: { ...cart, discount } })
        get().updateTotals()
      },

      setShipping: (shipping) => {
        const { cart } = get()
        set({ cart: { ...cart, shipping } })
        get().updateTotals()
      },

      setTax: (tax) => {
        const { cart } = get()
        set({ cart: { ...cart, tax } })
        get().updateTotals()
      },

      // Helper method to recalculate totals
      updateTotals: () => {
        const { cart } = get()
        const subtotal = get().getSubtotal()
        const total = subtotal + cart.tax + cart.shipping - cart.discount

        set({
          cart: {
            ...cart,
            subtotal,
            total: Math.max(0, total) // Ensure total is not negative
          }
        })
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: {
          ...state.cart,
          // Don't persist calculated fields
          subtotal: 0,
          total: 0
        }
      })
    }
  )
)
