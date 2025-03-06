
import { useState, useEffect } from "react";
import { ArrowRight, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";

const HeroSection = () => {
  const featuredProducts = getFeaturedProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredProducts.length]);
  
  const currentProduct = featuredProducts[currentIndex];
  
  if (!currentProduct) return null;
  
  return (
    <section className="pt-20 md:pt-28 overflow-hidden">
      <div className="container mx-auto px-4 min-h-[calc(100vh-8rem)] flex flex-col justify-center">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Text Content */}
          <div className="order-2 lg:order-1 staggered-animation">
            <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 mb-4">
              Featured Product
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {currentProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {currentProduct.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-gray-100 rounded-lg px-4 py-3">
                <p className="text-sm text-gray-500">Starting at</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${currentProduct.salePrice || currentProduct.price}
                </p>
              </div>
              
              {currentProduct.badges.map((badge, index) => (
                <div key={index} className="bg-gray-100 rounded-lg px-4 py-3 flex items-center">
                  <span className="text-gray-800 font-medium">{badge}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                Shop Now 
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-80 blur-3xl"></div>
            
            <div className="relative">
              <div className="aspect-square relative overflow-hidden rounded-2xl group">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Product dots indicators */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                  {featuredProducts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-blue-600 w-8"
                          : "bg-white/60 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Brand badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full shadow-lg p-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
                  <span className="font-bold text-gray-800 text-sm">{currentProduct.brand}</span>
                </div>
              </div>
              
              {/* View details button */}
              <a 
                href={`/product/${currentProduct.slug}`}
                className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-md transition-all duration-300 hover:shadow-lg group"
              >
                <ArrowRightCircle className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
              </a>
              
              {currentProduct.salePrice && (
                <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  Save ${(currentProduct.price - currentProduct.salePrice).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
