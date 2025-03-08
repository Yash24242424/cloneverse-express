
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 mb-6 inline-block">
              99baazaar
            </Link>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover the latest and most innovative products from around the world. We curate products that make your life better, smarter, and more fun.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Facebook className="w-5 h-5 text-gray-700" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Twitter className="w-5 h-5 text-gray-700" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Instagram className="w-5 h-5 text-gray-700" />
              </a>
              <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Youtube className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
          
          {/* Shop Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/new-arrivals" className="text-gray-600 hover:text-blue-600 transition-colors">New Arrivals</Link></li>
              <li><Link to="/best-sellers" className="text-gray-600 hover:text-blue-600 transition-colors">Best Sellers</Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-blue-600 transition-colors">On Sale</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">All Products</Link></li>
              <li><Link to="/gift-cards" className="text-gray-600 hover:text-blue-600 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          
          {/* About Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              <li><Link to="/our-story" className="text-gray-600 hover:text-blue-600 transition-colors">Our Story</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-blue-600 transition-colors">Press</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</Link></li>
              <li><Link to="/brand-ambassadors" className="text-gray-600 hover:text-blue-600 transition-colors">Brand Ambassadors</Link></li>
              <li><Link to="/sustainability" className="text-gray-600 hover:text-blue-600 transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          
          {/* Customer Service Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping-returns" className="text-gray-600 hover:text-blue-600 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/track-order" className="text-gray-600 hover:text-blue-600 transition-colors">Track Order</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} 99baazaar. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/terms-of-service" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Terms of Service</Link>
              <Link to="/privacy-policy" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/cookie-policy" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
