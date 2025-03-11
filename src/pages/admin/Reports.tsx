
import { useState } from 'react';
import { 
  BarChart as BarChartIcon, 
  Download, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Sample data for charts
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
  { name: 'Aug', value: 8000 },
  { name: 'Sep', value: 7500 },
  { name: 'Oct', value: 9000 },
  { name: 'Nov', value: 10000 },
  { name: 'Dec', value: 12000 },
];

const categoryData = [
  { name: 'Tech & Gadgets', value: 35 },
  { name: 'Audio', value: 25 },
  { name: 'Home', value: 20 },
  { name: 'Wearables', value: 15 },
  { name: 'Outdoor', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9c27b0'];

const customerData = [
  { name: 'Jan', new: 400, returning: 240 },
  { name: 'Feb', new: 300, returning: 198 },
  { name: 'Mar', new: 520, returning: 280 },
  { name: 'Apr', new: 450, returning: 300 },
  { name: 'May', new: 600, returning: 380 },
  { name: 'Jun', new: 550, returning: 400 },
];

const Reports = () => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState('year');
  
  const handleExportReport = (reportType: string) => {
    toast({
      title: 'Report Export Started',
      description: `Your ${reportType} report is being generated and will download shortly.`,
    });
    
    // In a real app, this would trigger an API call to generate and download the report
    setTimeout(() => {
      toast({
        title: 'Report Ready',
        description: 'Your report has been generated and downloaded.',
      });
    }, 2000);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        
        <div className="flex space-x-2">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last 12 Months</option>
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          
          <Button>
            <BarChartIcon className="mr-2 h-4 w-4" />
            Custom Report
          </Button>
        </div>
      </div>
      
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Revenue Overview</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('Revenue')}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sales by Category</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('Category')}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
          
          <div className="h-72 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Customer Acquisition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Customer Acquisition</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('Customer')}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={customerData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" name="New Customers" fill="#82ca9d" />
                <Bar dataKey="returning" name="Returning Customers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Product Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Order Trend</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('Orders')}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" name="Orders" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Available Reports</h2>
          <p className="text-sm text-gray-600 mt-1">
            Download detailed reports for specific aspects of your business
          </p>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            { name: 'Sales Summary', description: 'Detailed breakdown of sales by time period', type: 'Sales' },
            { name: 'Inventory Status', description: 'Current stock levels and product performance', type: 'Inventory' },
            { name: 'Customer Analytics', description: 'Customer demographics and purchasing patterns', type: 'Customer' },
            { name: 'Marketing Performance', description: 'Effectiveness of marketing campaigns and promotions', type: 'Marketing' },
          ].map((report, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.description}</p>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => handleExportReport(report.type)}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
