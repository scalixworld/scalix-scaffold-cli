import { useState } from "react"
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

export function ProductCard({ product, onQuickView, onAddToWishlist }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation()
    onQuickView?.(product)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToWishlist?.(product)
  }

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : 0

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

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
                  {star === '★' ? '★' : '☆'}
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
  )
}
