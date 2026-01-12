import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar, Footer, CartDrawer } from './components';
import { Home, ProductDetail, ProductsPage } from './pages';

/**
 * App Component
 * 
 * Main application with routing, cart provider, and layout structure.
 * 
 * Routes:
 * - / : Home page (landing page)
 * - /product/:handle : Product detail page
 */
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          {/* Navigation */}
          <Navbar />
          
          {/* Cart Drawer (slide-out) */}
          <CartDrawer />
          
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
          </Routes>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;