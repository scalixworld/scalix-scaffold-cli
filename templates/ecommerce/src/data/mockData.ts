import { faker } from '@faker-js/faker'
import {
  Product,
  Category,
  Customer,
  Order,
  Review,
  ShippingMethod,
  DashboardStats
} from '../types/ecommerce'

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    productCount: 45,
    isActive: true,
    sortOrder: 1,
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        productCount: 12,
        isActive: true,
        sortOrder: 1,
        subcategories: []
      },
      {
        id: 'laptops',
        name: 'Laptops',
        productCount: 8,
        isActive: true,
        sortOrder: 2,
        subcategories: []
      }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Fashion and apparel',
    productCount: 78,
    isActive: true,
    sortOrder: 2,
    subcategories: [
      {
        id: 'mens-clothing',
        name: 'Men\'s Clothing',
        productCount: 35,
        isActive: true,
        sortOrder: 1,
        subcategories: []
      },
      {
        id: 'womens-clothing',
        name: 'Women\'s Clothing',
        productCount: 43,
        isActive: true,
        sortOrder: 2,
        subcategories: []
      }
    ]
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies',
    productCount: 32,
    isActive: true,
    sortOrder: 3,
    subcategories: []
  }
]

// Mock Products
export const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => {
  const category = mockCategories[Math.floor(Math.random() * mockCategories.length)]
  const isOnSale = Math.random() > 0.7
  const basePrice = faker.number.int({ min: 10, max: 1000 })

  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: isOnSale ? Math.round(basePrice * 0.8) : basePrice,
    originalPrice: isOnSale ? basePrice : undefined,
    images: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
      faker.image.url({ width: 400, height: 400 })
    ),
    category: category.id,
    tags: faker.helpers.arrayElements(['bestseller', 'new', 'featured', 'sale'], { min: 0, max: 2 }),
    inventory: faker.number.int({ min: 0, max: 100 }),
    sku: faker.string.alphanumeric(8).toUpperCase(),
    weight: faker.number.int({ min: 100, max: 5000 }),
    attributes: {
      brand: faker.company.name(),
      material: faker.helpers.arrayElement(['Cotton', 'Polyester', 'Leather', 'Plastic', 'Metal']),
      color: faker.color.human()
    },
    isActive: true,
    isFeatured: Math.random() > 0.8,
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    reviewCount: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
})

// Mock Customers
export const mockCustomers: Customer[] = Array.from({ length: 25 }, (_, i) => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  addresses: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, (_, j) => ({
    id: faker.string.uuid(),
    type: j === 0 ? 'shipping' : 'billing',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address1: faker.location.streetAddress(),
    address2: Math.random() > 0.7 ? faker.location.secondaryAddress() : undefined,
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: 'US',
    phone: faker.phone.number(),
    isDefault: j === 0
  })),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent()
}))

// Mock Orders
export const mockOrders: Order[] = Array.from({ length: 100 }, (_, i) => {
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)]
  const itemCount = faker.number.int({ min: 1, max: 5 })
  const items = Array.from({ length: itemCount }, () => {
    const product = mockProducts[Math.floor(Math.random() * mockProducts.length)]
    const quantity = faker.number.int({ min: 1, max: 3 })
    return {
      id: faker.string.uuid(),
      product,
      quantity,
      price: product.price,
      total: product.price * quantity
    }
  })

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const tax = Math.round(subtotal * 0.08)
  const shipping = faker.number.int({ min: 0, max: 25 })
  const total = subtotal + tax + shipping

  return {
    id: faker.string.uuid(),
    customerId: customer.id,
    customer,
    items,
    status: faker.helpers.arrayElement(['pending', 'confirmed', 'processing', 'shipped', 'delivered']),
    subtotal,
    tax,
    shipping,
    discount: 0,
    total,
    currency: 'USD',
    shippingAddress: customer.addresses.find(a => a.type === 'shipping') || customer.addresses[0],
    billingAddress: customer.addresses.find(a => a.type === 'billing') || customer.addresses[0],
    trackingNumber: faker.helpers.maybe(() => faker.string.alphanumeric(12).toUpperCase()),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
})

// Mock Reviews
export const mockReviews: Review[] = Array.from({ length: 200 }, (_, i) => {
  const product = mockProducts[Math.floor(Math.random() * mockProducts.length)]
  const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)]

  return {
    id: faker.string.uuid(),
    productId: product.id,
    customerId: customer.id,
    customerName: `${customer.firstName} ${customer.lastName}`,
    rating: faker.number.int({ min: 1, max: 5 }),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(2),
    isVerified: Math.random() > 0.3,
    helpful: faker.number.int({ min: 0, max: 50 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
})

// Mock Shipping Methods
export const mockShippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 5.99,
    estimatedDays: 7,
    isActive: true
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 12.99,
    estimatedDays: 3,
    isActive: true
  },
  {
    id: 'overnight',
    name: 'Overnight Shipping',
    description: 'Next business day',
    price: 24.99,
    estimatedDays: 1,
    isActive: true
  }
]

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
  totalOrders: mockOrders.length,
  totalCustomers: mockCustomers.length,
  averageOrderValue: Math.round(mockOrders.reduce((sum, order) => sum + order.total, 0) / mockOrders.length),
  conversionRate: 3.2, // Mock conversion rate
  topProducts: mockProducts
    .map(product => ({
      product,
      sales: faker.number.int({ min: 10, max: 100 }),
      revenue: faker.number.int({ min: 500, max: 5000 })
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5),
  recentOrders: mockOrders
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10),
  monthlyRevenue: Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - i))
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      revenue: faker.number.int({ min: 5000, max: 25000 }),
      orders: faker.number.int({ min: 20, max: 100 })
    }
  })
}

// Utility functions
export function getProductsByCategory(categoryId: string): Product[] {
  return mockProducts.filter(product => product.category === categoryId)
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(product => product.id === id)
}

export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find(customer => customer.id === id)
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(order => order.id === id)
}

export function getOrdersByCustomerId(customerId: string): Order[] {
  return mockOrders.filter(order => order.customerId === customerId)
}

export function getReviewsByProductId(productId: string): Review[] {
  return mockReviews.filter(review => review.productId === productId)
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter(product => product.isFeatured)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export function getProductsInPriceRange(min: number, max: number): Product[] {
  return mockProducts.filter(product => product.price >= min && product.price <= max)
}
