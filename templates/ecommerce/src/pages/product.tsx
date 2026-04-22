import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getProductById, getReviewsByProductId, getProductsByCategory, mockProducts } from '../data/mockData'
import { formatPrice, calculateDiscountPercentage, generateStars, getRandomItems } from '../lib/utils'
import { useCartStore } from '../store/cartStore'
import { ProductCard } from '../components/ecommerce/productCard'
import { Heart, Share2, Star, Truck, Shield, RotateCcw, ChevronRight, ThumbsUp, CheckCircle } from 'lucide-react'

const IMAGE_COLORS = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-emerald-400 to-emerald-600',
  'bg-gradient-to-br from-orange-400 to-orange-600',
  'bg-gradient-to-br from-pink-400 to-pink-600',
  'bg-gradient-to-br from-cyan-400 to-cyan-600',
]

function getColorForProduct(id: string, index: number): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return IMAGE_COLORS[(hash + index) % IMAGE_COLORS.length]
}

export function ProductPage() {
  const { id } = useParams()
  const product = id ? getProductById(id) : mockProducts[0]
  const reviews = product ? getReviewsByProductId(product.id) : []
  const { addItem } = useCartStore()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    const attributes: Record<string, string> = {}
    if (selectedColor) attributes.color = selectedColor
    if (selectedSize) attributes.size = selectedSize
    addItem(product, quantity, undefined, attributes)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4)

  const backfillProducts = relatedProducts.length < 4
    ? getRandomItems(mockProducts.filter(p => p.id !== product.id && !relatedProducts.find(r => r.id === p.id)), 4 - relatedProducts.length)
    : []

  const allRelated = [...relatedProducts, ...backfillProducts].slice(0, 4)

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : product.rating

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0,
  }))

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = ['Red', 'Blue', 'Black', 'White', 'Green']

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to={`/category/${product.category}`} className="hover:text-foreground capitalize">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className={`aspect-square overflow-hidden rounded-lg ${getColorForProduct(product.id, selectedImage)} flex items-center justify-center`}>
            <div className="text-white text-center p-8">
              <div className="text-6xl font-bold mb-4">{product.name.charAt(0)}</div>
              <div className="text-xl font-medium">{product.name}</div>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${getColorForProduct(product.id, index)} flex items-center justify-center ${
                  selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                }`}
              >
                <span className="text-white text-lg font-bold">{index + 1}</span>
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
                    {star === '\u2605' ? '\u2605' : '\u2606'}
                  </span>
                ))}
              </div>
              <span className="text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
              <span className="text-muted-foreground">|</span>
              <span className={product.inventory > 0 ? 'text-green-600' : 'text-red-600'}>
                {product.inventory > 0 ? `${product.inventory} in stock` : 'Out of stock'}
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
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          <div>
            <label className="text-sm font-medium mb-3 block">
              Color {selectedColor && <span className="text-muted-foreground">- {selectedColor}</span>}
            </label>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    selectedColor === color ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{
                    backgroundColor: color.toLowerCase() === 'white' ? '#f5f5f5' : color.toLowerCase(),
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <label className="text-sm font-medium mb-3 block">Size</label>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 rounded-md border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Variant Selector */}
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

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium mb-2 block">Quantity</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                +
              </Button>
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
              {addedToCart ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Added to Cart
                </>
              ) : product.inventory === 0 ? (
                'Out of Stock'
              ) : (
                'Add to Cart'
              )}
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Shipping & Returns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Free shipping over $50</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>2 year warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span>30-day returns</span>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="font-semibold mb-3">Product Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">SKU</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium">{product.inventory} available</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Category</span>
                <Link to={`/category/${product.category}`} className="font-medium capitalize text-primary hover:underline">
                  {product.category}
                </Link>
              </div>
              {product.weight && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">{product.weight}g</span>
                </div>
              )}
              {Object.entries(product.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground capitalize">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
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
                  {product.weight && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Weight</span>
                      <span className="text-muted-foreground">{product.weight}g</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Dimensions</span>
                      <span className="text-muted-foreground">
                        {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height} cm
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Review Summary */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {generateStars(averageRating).split('').map((star, i) => (
                        <span key={i} className="text-yellow-400 text-xl">
                          {star === '\u2605' ? '\u2605' : '\u2606'}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground">{reviews.length} reviews</p>
                  </div>
                  <div className="space-y-2">
                    {ratingDistribution.map(({ star, count, percentage }) => (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-8">{star} <Star className="inline h-3 w-3 text-yellow-400" /></span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review List */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No reviews yet</h3>
                      <p className="text-muted-foreground">Be the first to review this product.</p>
                    </CardContent>
                  </Card>
                ) : (
                  reviews.slice(0, 5).map((review) => (
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
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{review.customerName}</span>
                                {review.isVerified && (
                                  <Badge variant="secondary" className="text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                {generateStars(review.rating).split('').map((star, i) => (
                                  <span key={i} className="text-yellow-400 text-sm">
                                    {star === '\u2605' ? '\u2605' : '\u2606'}
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
                        <p className="text-muted-foreground mb-4">{review.content}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {allRelated.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Related Products</h2>
              <p className="text-muted-foreground">You might also like these</p>
            </div>
            <Button variant="outline" asChild>
              <Link to={`/category/${product.category}`}>View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allRelated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
