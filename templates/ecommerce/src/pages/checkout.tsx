import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from '../store/cartStore'
import { mockShippingMethods } from '../data/mockData'
import { formatPrice } from '../lib/utils'
import {
  ChevronRight,
  CreditCard,
  Truck,
  Shield,
  Lock,
  CheckCircle,
  ArrowLeft,
  Package
} from 'lucide-react'

interface ShippingForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentForm {
  cardNumber: string
  cardName: string
  expiry: string
  cvv: string
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, getTotalItems, clearCart } = useCartStore()
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping')
  const [selectedShipping, setSelectedShipping] = useState(mockShippingMethods[0].id)
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  })
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  })

  const shippingMethod = mockShippingMethods.find(m => m.id === selectedShipping) || mockShippingMethods[0]
  const shippingCost = cart.subtotal >= 50 && shippingMethod.id === 'standard' ? 0 : shippingMethod.price
  const taxEstimate = Math.round(cart.subtotal * 0.08 * 100) / 100
  const orderTotal = cart.subtotal + shippingCost + taxEstimate

  const updateShipping = (field: keyof ShippingForm, value: string) => {
    setShippingForm(prev => ({ ...prev, [field]: value }))
  }

  const updatePayment = (field: keyof PaymentForm, value: string) => {
    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
    }
    if (field === 'expiry') {
      value = value.replace(/\D/g, '')
      if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    if (field === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }
    setPaymentForm(prev => ({ ...prev, [field]: value }))
  }

  const isShippingValid = shippingForm.firstName && shippingForm.lastName && shippingForm.email &&
    shippingForm.address1 && shippingForm.city && shippingForm.state && shippingForm.zipCode

  const isPaymentValid = paymentForm.cardNumber.replace(/\s/g, '').length >= 15 &&
    paymentForm.cardName && paymentForm.expiry.length === 5 && paymentForm.cvv.length >= 3

  const handlePlaceOrder = () => {
    clearCart()
    setStep('success')
  }

  if (cart.items.length === 0 && step !== 'success') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
        <Button asChild>
          <Link to="/">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  if (step === 'success') {
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground mb-2">
            Thank you for your order. We have received your payment and will process your order shortly.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            Order ID: <span className="font-mono font-semibold text-foreground">{orderId}</span>
          </p>
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <p className="text-muted-foreground mb-1">Shipping to</p>
                  <p className="font-medium">{shippingForm.firstName} {shippingForm.lastName}</p>
                  <p>{shippingForm.address1}</p>
                  <p>{shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}</p>
                </div>
                <div className="text-left">
                  <p className="text-muted-foreground mb-1">Delivery</p>
                  <p className="font-medium">{shippingMethod.name}</p>
                  <p>{shippingMethod.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/account">View Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
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
        <Link to="/cart" className="hover:text-foreground">Cart</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-green-600 text-white'
          }`}>
            {step === 'payment' ? <CheckCircle className="h-4 w-4" /> : '1'}
          </div>
          <span className="text-sm font-medium">Shipping</span>
        </div>
        <div className="w-16 h-px bg-border" />
        <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            2
          </div>
          <span className="text-sm font-medium">Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={shippingForm.firstName}
                      onChange={(e) => updateShipping('firstName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={shippingForm.lastName}
                      onChange={(e) => updateShipping('lastName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={shippingForm.email}
                      onChange={(e) => updateShipping('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 555-5555"
                      value={shippingForm.phone}
                      onChange={(e) => updateShipping('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address1">Address *</Label>
                  <Input
                    id="address1"
                    placeholder="123 Main St"
                    value={shippingForm.address1}
                    onChange={(e) => updateShipping('address1', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address2">Apartment, suite, etc.</Label>
                  <Input
                    id="address2"
                    placeholder="Apt 4B"
                    value={shippingForm.address2}
                    onChange={(e) => updateShipping('address2', e.target.value)}
                  />
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      value={shippingForm.city}
                      onChange={(e) => updateShipping('city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      value={shippingForm.state}
                      onChange={(e) => updateShipping('state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      placeholder="10001"
                      value={shippingForm.zipCode}
                      onChange={(e) => updateShipping('zipCode', e.target.value)}
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label>Country *</Label>
                  <Select value={shippingForm.country} onValueChange={(v) => updateShipping('country', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="IN">India</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Shipping Method */}
                <div className="space-y-3">
                  <Label>Shipping Method</Label>
                  <div className="space-y-2">
                    {mockShippingMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedShipping(method.id)}
                        className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedShipping === method.id ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedShipping === method.id ? 'border-primary bg-primary' : 'border-gray-300'
                          }`}>
                            {selectedShipping === method.id && (
                              <div className="w-full h-full rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">{method.description}</div>
                          </div>
                        </div>
                        <div className="font-medium">
                          {cart.subtotal >= 50 && method.id === 'standard' ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            formatPrice(method.price)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setStep('payment')}
                  disabled={!isShippingValid}
                >
                  Continue to Payment
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shipping Summary */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Shipping to</p>
                      <p className="font-medium">{shippingForm.firstName} {shippingForm.lastName}</p>
                      <p className="text-sm">{shippingForm.address1}, {shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setStep('shipping')}>
                      Edit
                    </Button>
                  </div>
                </div>

                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentForm.cardNumber}
                      onChange={(e) => updatePayment('cardNumber', e.target.value)}
                    />
                    <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Name on Card */}
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card *</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={paymentForm.cardName}
                    onChange={(e) => updatePayment('cardName', e.target.value)}
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date *</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={paymentForm.expiry}
                      onChange={(e) => updatePayment('expiry', e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        type="password"
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChange={(e) => updatePayment('cvv', e.target.value)}
                        maxLength={4}
                      />
                      <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-green-50 rounded-lg border border-green-200">
                  <Shield className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>Your payment information is encrypted and secure. This is a demo - no real payment will be processed.</span>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep('shipping')} className="flex-1">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={!isPaymentValid}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Place Order - {formatPrice(orderTotal)}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{item.product.name.charAt(0)}</span>
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(item.product.price)} each</p>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping ({shippingMethod.name})</span>
                  <span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(taxEstimate)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(orderTotal)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
