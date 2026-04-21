import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProductById, getReviewsByProductId, mockProducts } from '../data/mockData'
import { formatPrice, calculateDiscountPercentage, generateStars } from '../lib/utils'
import { useCartStore } from '../store/cartStore'
import { Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react'

export function ProductPage() {
  const { id } = useParams()
  const product = id ? getProductById(id) : mockProducts[0]
  const reviews = product ? getReviewsByProductId(product.id) : []
  const { addItem } = useCartStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>('')

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isFeatured && <Badge>Featured</Badge>}
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {generateStars(product.rating).split('').map((star, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    {star === '★' ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="destructive">-{discountPercentage}%</Badge>
                </>
              )}
            </div>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Variant</label>
                <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.name} (+{formatPrice(variant.priceModifier)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Quantity</label>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
            >
              {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-green-600" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>2 year warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>30-day returns</span>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="font-semibold mb-2">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">SKU:</span>
                <span className="ml-2">{product.sku}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Stock:</span>
                <span className="ml-2">{product.inventory} available</span>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <span className="ml-2 capitalize">{product.category}</span>
              </div>
              {product.weight && (
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="ml-2">{product.weight}g</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium capitalize">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.slice(0, 5).map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {review.customerName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{review.customerName}</div>
                          <div className="flex items-center gap-1">
                            {generateStars(review.rating).split('').map((star, i) => (
                              <span key={i} className="text-yellow-400">
                                {star === '★' ? '★' : '☆'}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {review.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-muted-foreground">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
