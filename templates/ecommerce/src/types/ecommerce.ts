export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  tags: string[]
  inventory: number
  sku: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  variants?: ProductVariant[]
  attributes: Record<string, string>
  isActive: boolean
  isFeatured: boolean
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceModifier: number
  inventory: number
  sku: string
}

export interface Category {
  id: string
  name: string
  description?: string
  image?: string
  parentId?: string
  subcategories: Category[]
  productCount: number
  isActive: boolean
  sortOrder: number
}

export interface CartItem {
  id: string
  product: Product
  variant?: ProductVariant
  quantity: number
  selectedAttributes: Record<string, string>
  addedAt: Date
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
}

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  addresses: Address[]
  defaultAddressId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  type: 'billing' | 'shipping'
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface Order {
  id: string
  customerId: string
  customer?: Customer
  items: OrderItem[]
  status: OrderStatus
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  shippingAddress: Address
  billingAddress: Address
  paymentMethod?: PaymentMethod
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  shippedAt?: Date
  deliveredAt?: Date
}

export interface OrderItem {
  id: string
  product: Product
  variant?: ProductVariant
  quantity: number
  price: number
  total: number
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface PaymentMethod {
  id: string
  type: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery'
  provider: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Review {
  id: string
  productId: string
  customerId: string
  customerName: string
  rating: number
  title: string
  content: string
  images?: string[]
  isVerified: boolean
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface WishlistItem {
  id: string
  productId: string
  customerId: string
  addedAt: Date
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minOrderValue?: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  expiresAt?: Date
  isActive: boolean
  applicableCategories?: string[]
  applicableProducts?: string[]
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDays: number
  isActive: boolean
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  conversionRate: number
  topProducts: Array<{
    product: Product
    sales: number
    revenue: number
  }>
  recentOrders: Order[]
  monthlyRevenue: Array<{
    month: string
    revenue: number
    orders: number
  }>
}

// Utility types
export type ProductStatus = 'active' | 'inactive' | 'draft'
export type CustomerStatus = 'active' | 'inactive' | 'suspended'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type ShippingStatus = 'pending' | 'shipped' | 'delivered' | 'returned'
