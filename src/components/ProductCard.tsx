
import { useState, useEffect } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + index * 100); // Staggered animation

    return () => clearTimeout(timer);
  }, [index]);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
      duration: 3000,
    });
  };

  return (
    <div 
      className={`group relative rounded-2xl bg-white shadow-sm card-hover border border-gray-100 overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-square relative overflow-hidden">
        {product.salePrice && (
          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Sale
          </div>
        )}
        
        <button
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm transition-all duration-300 hover:shadow-md"
          aria-label="Add to wishlist"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
        
        <a href={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            } ${isImageLoaded ? "blur-none" : "blur-sm"}`}
            onLoad={() => setIsImageLoaded(true)}
          />
        </a>
        
        {/* Quick add button - appears on hover */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 transition-transform duration-300 ${
            isHovered ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4" /> Quick Add
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <a href={`/product/${product.slug}`} className="block">
          <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </a>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-baseline gap-2">
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
      
      {/* Badges */}
      {product.badges && product.badges.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badges.slice(0, 1).map((badge, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
              {badge}
            </span>
          ))}
        </div>
      )}
      
      {product.isNew && (
        <div className="absolute bottom-3 left-3 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
          New Arrival
        </div>
      )}
    </div>
  );
};

export default ProductCard;
