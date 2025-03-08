
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { createOrder, OrderItem } from '@/data/orders';
import { useToast } from '@/hooks/use-toast';

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'USA',
  cardName: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvv: '',
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'shipping' | 'payment'>('shipping');
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form (simplified for demo)
    if (!formState.cardNumber || !formState.cardExpiry || !formState.cardCvv) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required payment fields',
        variant: 'destructive',
      });
      setIsProcessing(false);
      return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
      try {
        // Create order items from cart items
        const orderItems: OrderItem[] = items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.salePrice || item.product.price,
          quantity: item.quantity,
          total: (item.product.salePrice || item.product.price) * item.quantity,
        }));
        
        // Create the order
        const order = createOrder(
          user?.id || 'guest',
          orderItems,
          subtotal,
          tax,
          shipping,
          total,
          'Credit Card',
          {
            name: formState.name,
            street: formState.address,
            city: formState.city,
            state: formState.state,
            zipCode: formState.zipCode,
            country: formState.country,
          }
        );
        
        // Clear the cart after successful order
        clearCart();
        
        // Navigate to order confirmation
        navigate(`/order-confirmation/${order.id}`);
      } catch (error) {
        toast({
          title: 'Checkout failed',
          description: 'An error occurred during checkout. Please try again.',
          variant: 'destructive',
        });
        setIsProcessing(false);
      }
    }, 2000);
  };
  
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`flex items-center ${currentStep === 'shipping' ? 'text-blue-600' : 'text-gray-900'}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current">
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div className="h-1 w-20 mx-4 bg-gray-200">
                <div className={`h-full bg-blue-600 ${currentStep === 'shipping' ? 'w-0' : 'w-full'} transition-all duration-300`}></div>
              </div>
              <div className={`flex items-center ${currentStep === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-current">
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {currentStep === 'shipping' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping Information</h2>
                  
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={formState.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input
                          id="city"
                          name="city"
                          value={formState.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State / Province
                        </label>
                        <Input
                          id="state"
                          name="state"
                          value={formState.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP / Postal Code
                        </label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formState.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <Input
                          id="country"
                          name="country"
                          value={formState.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button type="submit" className="w-full py-6">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {currentStep === 'payment' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Information</h2>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">Secure Payment</h3>
                            <p className="mt-1 text-sm text-blue-700">
                              All transactions are secure and encrypted. Your credit card information is never stored.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card
                          </label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={formState.cardName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number
                          </label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formState.cardNumber}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                              Expiration Date
                            </label>
                            <Input
                              id="cardExpiry"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={formState.cardExpiry}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <Input
                              id="cardCvv"
                              name="cardCvv"
                              placeholder="123"
                              value={formState.cardCvv}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button type="submit" className="w-full py-6" disabled={isProcessing}>
                        {isProcessing ? (
                          <>
                            <span className="mr-2">Processing</span>
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                          </>
                        ) : (
                          'Complete Order'
                        )}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => setCurrentStep('shipping')}
                        disabled={isProcessing}
                      >
                        Back to Shipping
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-start py-4 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <span className="text-sm font-medium text-gray-900">
                          ${formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
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
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">${formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
