
import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown,
  Eye,
  CheckCircle,
  TruckIcon,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAllOrders, updateOrderStatus, Order } from '@/data/orders';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const { toast } = useToast();
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [displayedOrders, setDisplayedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const orders = getAllOrders();
      setAllOrders(orders);
      setDisplayedOrders(orders);
      setIsLoading(false);
    }, 800);
  }, []);
  
  useEffect(() => {
    let filtered = [...allOrders];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(term) || 
        order.shippingAddress.name.toLowerCase().includes(term)
      );
    }
    
    setDisplayedOrders(filtered);
  }, [searchTerm, statusFilter, allOrders]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  const handleViewOrder = (orderId: string) => {
    // In a real app, this would open a modal or navigate to order details
    toast({
      title: 'View Order',
      description: `Viewing details for order ${orderId}`,
    });
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    // Update order status
    const updatedOrder = updateOrderStatus(orderId, newStatus);
    
    if (updatedOrder) {
      // Update state to reflect the change
      setAllOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      toast({
        title: 'Order Updated',
        description: `Order ${orderId} status changed to ${newStatus}`,
      });
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Orders</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <select
                className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedOrders.length > 0 ? (
                displayedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.shippingAddress.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.shippingAddress.city}, {order.shippingAddress.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600"
                          onClick={() => handleViewOrder(order.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        
                        <div className="relative group">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600"
                          >
                            <span>Update</span>
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                          
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                            <div className="py-1">
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleUpdateStatus(order.id, 'processing')}
                              >
                                <CheckCircle className="h-4 w-4 mr-2 text-yellow-500" />
                                Mark as Processing
                              </button>
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleUpdateStatus(order.id, 'shipped')}
                              >
                                <TruckIcon className="h-4 w-4 mr-2 text-blue-500" />
                                Mark as Shipped
                              </button>
                              <button
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleUpdateStatus(order.id, 'delivered')}
                              >
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                Mark as Delivered
                              </button>
                              <button
                                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              >
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Cancel Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
