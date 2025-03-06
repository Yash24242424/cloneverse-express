
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            GadgetFlow
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {categories.slice(0, 5).map((category) => (
            <a 
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {category.name}
            </a>
          ))}
          <a 
            href="/collections"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Collections
          </a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <a 
            href="/wishlist"
            className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </a>
          
          <a 
            href="/account"
            className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Account"
          >
            <User size={20} />
          </a>
          
          <a 
            href="/cart"
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </a>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div 
        className={`absolute left-0 right-0 bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isSearchOpen ? "h-16 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <Input 
              type="search" 
              placeholder="Search for products..." 
              className="flex-1 h-10"
            />
            <Button className="ml-2 h-10">Search</Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container mx-auto py-5 px-4">
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="text-2xl font-bold">GadgetFlow</a>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-600"
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            {categories.map((category) => (
              <a 
                key={category.id}
                href={`/category/${category.slug}`}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </a>
            ))}
            <a 
              href="/collections"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </a>
            <a 
              href="/wishlist"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist
            </a>
            <a 
              href="/account"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Account
            </a>
            <a 
              href="/cart"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
