import { useParams } from 'react-router-dom'
import { ProductCard } from '../components/ecommerce/productCard'
import { getProductsByCategory } from '../data/mockData'

export function CategoryPage() {
  const { id } = useParams()
  const products = id ? getProductsByCategory(id) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize">{id} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
