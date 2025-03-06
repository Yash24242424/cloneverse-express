
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import { getNewProducts } from "@/data/products";
import { Badge } from "lucide-react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    // Scroll to product grid with smooth animation
    document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const newProducts = getNewProducts();
  
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* New Arrivals Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
              <a href="/new-arrivals" className="text-blue-600 hover:text-blue-800 font-medium">
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newProducts.slice(0, 4).map((product, index) => (
                <div 
                  key={product.id}
                  className={`group relative rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <span className="absolute top-3 left-3 z-10 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      New Arrival
                    </span>
                    
                    <a href={`/product/${product.slug}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </a>
                  </div>
                  
                  <div className="p-4">
                    <a href={`/product/${product.slug}`}>
                      <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </a>
                    
                    <div className="flex items-baseline gap-2 mt-1">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">${product.salePrice}</span>
                          <span className="text-sm text-gray-500 line-through">${product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Main Product Grid */}
        <section id="product-grid" className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            <ProductGrid categoryId={selectedCategory} />
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-blue-50 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Curated Selection</h3>
                <p className="text-gray-600">
                  Handpicked products from the most innovative brands around the world.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-blue-50 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Free shipping on orders over $50 and easy returns within 30 days.
                </p>
              </div>
              
              <div className="p-6 rounded-2xl bg-blue-50 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">
                  Our team is always available to help with any questions or issues.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
