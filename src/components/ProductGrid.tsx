
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { products, getProductsByCategory } from "@/data/products";

interface ProductGridProps {
  categoryId: string | null;
}

const ProductGrid = ({ categoryId }: ProductGridProps) => {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for category change
    const timer = setTimeout(() => {
      if (categoryId) {
        setDisplayedProducts(getProductsByCategory(categoryId));
      } else {
        setDisplayedProducts(products);
      }
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [categoryId]);
  
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-100 animate-pulse">
              <div className="aspect-square w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          {displayedProducts.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500">
                We couldn't find any products in this category. Please try another one.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
