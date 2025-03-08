
import { useEffect, useState } from 'react';
import { 
  ShoppingCart, 
  Package, 
  Users, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { getAllOrders, Order } from '@/data/orders';
import { categories } from '@/data/categories';
import { products } from '@/data/products';

// Generate mock data for the charts
const generateRevenueData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map(month => ({
    name: month,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    orders: Math.floor(Math.random() * 200) + 50,
  }));
};

const generateCategoryData = () => {
  return categories.map(category => ({
    name: category.name,
    products: category.count,
    sales: Math.floor(Math.random() * 200) + 20,
  }));
};

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revenueData] = useState(generateRevenueData());
  const [categoryData] = useState(generateCategoryData());
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setOrders(getAllOrders());
      setIsLoading(false);
    }, 800);
  }, []);
  
  const stats = [
    {
      title: "Total Revenue",
      value: "$149,856.00",
      icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
      change: 12.5,
      changeType: "positive" as const,
    },
    {
      title: "Total Orders",
      value: "1,432",
      icon: <Package className="h-6 w-6 text-purple-600" />,
      change: 8.2,
      changeType: "positive" as const,
    },
    {
      title: "Total Products",
      value: String(products.length),
      icon: <Package className="h-6 w-6 text-green-600" />,
      change: 0,
      changeType: "neutral" as const,
    },
    {
      title: "Total Users",
      value: "246",
      icon: <Users className="h-6 w-6 text-orange-600" />,
      change: 3.1,
      changeType: "negative" as const,
    },
  ];
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-600">{stat.title}</h2>
              <div className="p-2 rounded-lg bg-gray-50">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.changeType !== "neutral" && (
                <div className={`flex items-center text-sm ${
                  stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.changeType === "positive" ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Revenue Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Category Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#8884d8" />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Orders</h2>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.shippingAddress.name}
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
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
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

export default Dashboard;
