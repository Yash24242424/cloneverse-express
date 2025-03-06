
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and info */}
          <div className="lg:col-span-2">
            <a href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 mb-6 inline-block">
              GadgetFlow
            </a>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover the latest and most innovative gadgets from around the world. We curate products that make your life better, smarter, and more fun.
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
          
          {/* Links */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">On Sale</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">All Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Brand Ambassadors</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Sustainability</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} GadgetFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
