
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getOrderById, Order } from '@/data/orders';

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      if (orderId) {
        const foundOrder = getOrderById(orderId);
        setOrder(foundOrder || null);
      }
      setIsLoading(false);
    }, 1000);
  }, [orderId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn't find the order you're looking for.</p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
              <p className="text-gray-600">Your order has been placed successfully.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="text-lg font-bold text-gray-900">{order.id}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="text-gray-900">{formatDate(order.createdAt)}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
                
                <div className="divide-y divide-gray-100">
                  {order.items.map((item) => (
                    <div key={item.productId} className="py-4 flex items-start">
                      <div className="flex-grow">
                        <h3 className="text-gray-900 font-medium">{item.productName}</h3>
                        <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${formatPrice(item.total)}</p>
                        <p className="text-gray-500 text-sm">${formatPrice(item.price)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${formatPrice(order.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {order.shipping > 0 ? `$${formatPrice(order.shipping)}` : 'Free'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-xl font-bold">${formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                  <address className="not-italic text-gray-600">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </address>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h2>
                  <p className="text-gray-600">
                    <span className="block">Payment Method: {order.paymentMethod}</span>
                    <span className="block">Payment Status: {order.paymentStatus}</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button onClick={() => navigate('/')}>Continue Shopping</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
