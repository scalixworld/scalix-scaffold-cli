import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Product } from "../../types/ecommerce"
import { formatPrice, calculateDiscountPercentage, generateStars } from "../../lib/utils"
import { useCartStore } from "../../store/cartStore"

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}

const IMAGE_COLORS = [
  'bg-gradient-to-br from-blue-400 to-blue-600',
  'bg-gradient-to-br from-purple-400 to-purple-600',
  'bg-gradient-to-br from-emerald-400 to-emerald-600',
  'bg-gradient-to-br from-orange-400 to-orange-600',
  'bg-gradient-to-br from-pink-400 to-pink-600',
  'bg-gradient-to-br from-cyan-400 to-cyan-600',
  'bg-gradient-to-br from-rose-400 to-rose-600',
  'bg-gradient-to-br from-teal-400 to-teal-600',
]

function getColorForProduct(id: string): string {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return IMAGE_COLORS[hash % IMAGE_COLORS.length]
}

export function ProductCard({ product, onQuickView, onAddToWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onQuickView?.(product)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToWishlist?.(product)
  }

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0

  return (
    <Link to={`/product/${product.id}`}>
      <Card
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Placeholder */}
        <div className={`relative aspect-square overflow-hidden ${getColorForProduct(product.id)} flex items-center justify-center`}>
          <div className="text-white text-center p-4">
            <div className="text-4xl font-bold mb-2 transition-transform duration-300 group-hover:scale-110">
              {product.name.charAt(0)}
            </div>
            <div className="text-sm font-medium opacity-80 line-clamp-2">
              {product.name}
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPercentage}%
              </Badge>
            )}
            {product.inventory === 0 && (
              <Badge variant="outline" className="text-xs bg-gray-100">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleQuickView}
              className="rounded-full"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleWishlist}
              className="rounded-full"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Product Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-1">
                {generateStars(product.rating).split('').map((star, i) => (
                  <span key={i} className="text-yellow-400 text-sm">
                    {star === '\u2605' ? '\u2605' : '\u2606'}
                  </span>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>

            <p className="text-xs text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full mt-4"
            onClick={handleAddToCart}
            disabled={product.inventory === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
