
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    tax, 
    shipping, 
    total 
  } = useCart();
  
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Button onClick={() => navigate('/')}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">Brand: {item.product.brand}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  ${formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                                </div>
                                {item.product.salePrice && (
                                  <div className="text-sm text-gray-500 line-through">
                                    ${formatPrice(item.product.price * item.quantity)}
                                  </div>
                                )}
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-gray-400 hover:text-red-500"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping > 0 ? `$${formatPrice(shipping)}` : 'Free'}
                      </span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-xl font-bold text-gray-900">${formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full py-6" 
                    onClick={() => navigate('/checkout')}
                    disabled={items.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
