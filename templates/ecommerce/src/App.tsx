import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { HomePage } from './pages/home'
import { ProductPage } from './pages/product'
import { CategoryPage } from './pages/category'
import { CartPage } from './pages/cart'
import { CheckoutPage } from './pages/checkout'
import { AccountPage } from './pages/account'
import { AdminPage } from './pages/admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
