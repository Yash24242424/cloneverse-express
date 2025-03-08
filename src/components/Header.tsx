
import { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

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
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            99baazaar
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {categories.slice(0, 5).map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.slug}`}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {category.name}
            </Link>
          ))}
          <Link 
            to="/collections"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Collections
          </Link>
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
          
          <Link 
            to="/wishlist"
            className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>
          
          {user ? (
            <div className="relative group">
              <button className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <User size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 hidden group-hover:block">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                  {user.name}
                </div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:block p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User size={20} />
            </Link>
          )}
          
          <Link 
            to="/cart"
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          
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
            <Link to="/" className="text-2xl font-bold">99baazaar</Link>
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
              <Link 
                key={category.id}
                to={`/category/${category.slug}`}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link 
              to="/collections"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/wishlist"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            {user ? (
              <>
                <span className="text-lg font-medium text-gray-800">
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            <Link 
              to="/cart"
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
