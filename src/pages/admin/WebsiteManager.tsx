
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Search, BarChart2, Globe, ShoppingCart, Settings, BellRing } from 'lucide-react';

const WebsiteManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Website Manager</h1>
        <div className="w-full md:w-64">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              type="text"
              placeholder="Search operations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden md:inline">Products</span>
          </TabsTrigger>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden md:inline">Sales</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span className="hidden md:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6">Product Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                <h3 className="font-medium text-blue-800 mb-2">Add New Products</h3>
                <p className="text-sm text-blue-700 mb-4">Create and publish new products to your store</p>
                <Button size="sm" className="w-full">Create Product</Button>
              </div>
              <div className="p-6 border rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                <h3 className="font-medium text-green-800 mb-2">Manage Inventory</h3>
                <p className="text-sm text-green-700 mb-4">Update stock levels and product availability</p>
                <Button size="sm" variant="outline" className="w-full">View Inventory</Button>
              </div>
              <div className="p-6 border rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                <h3 className="font-medium text-purple-800 mb-2">Product Categories</h3>
                <p className="text-sm text-purple-700 mb-4">Organize your products with categories</p>
                <Button size="sm" variant="outline" className="w-full">Manage Categories</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6">Sales Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
                <h3 className="font-medium text-orange-800 mb-2">Payment Processing</h3>
                <p className="text-sm text-orange-700 mb-4">Manage payment methods and transactions</p>
                <Button size="sm" className="w-full">View Payments</Button>
              </div>
              <div className="p-6 border rounded-lg bg-cyan-50 hover:bg-cyan-100 transition-colors">
                <h3 className="font-medium text-cyan-800 mb-2">Discount Codes</h3>
                <p className="text-sm text-cyan-700 mb-4">Create and manage promotional offers</p>
                <Button size="sm" variant="outline" className="w-full">Manage Discounts</Button>
              </div>
              <div className="p-6 border rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                <h3 className="font-medium text-red-800 mb-2">Order Processing</h3>
                <p className="text-sm text-red-700 mb-4">Track and manage customer orders</p>
                <Button size="sm" variant="outline" className="w-full">View Orders</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6">Data Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors">
                <h3 className="font-medium text-indigo-800 mb-2">Performance Dashboard</h3>
                <p className="text-sm text-indigo-700 mb-4">View key metrics and business performance</p>
                <Button size="sm" className="w-full">View Dashboard</Button>
              </div>
              <div className="p-6 border rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors">
                <h3 className="font-medium text-emerald-800 mb-2">Customer Reports</h3>
                <p className="text-sm text-emerald-700 mb-4">Analyze customer behavior and demographics</p>
                <Button size="sm" variant="outline" className="w-full">View Reports</Button>
              </div>
              <div className="p-6 border rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                <h3 className="font-medium text-amber-800 mb-2">Export Data</h3>
                <p className="text-sm text-amber-700 mb-4">Download analytics data for offline analysis</p>
                <Button size="sm" variant="outline" className="w-full">Export Options</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="seo" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6">SEO Optimization</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors">
                <h3 className="font-medium text-sky-800 mb-2">Keyword Analysis</h3>
                <p className="text-sm text-sky-700 mb-4">Optimize content with targeted keywords</p>
                <Button size="sm" className="w-full">Analyze Keywords</Button>
              </div>
              <div className="p-6 border rounded-lg bg-violet-50 hover:bg-violet-100 transition-colors">
                <h3 className="font-medium text-violet-800 mb-2">Meta Tags</h3>
                <p className="text-sm text-violet-700 mb-4">Manage page titles and meta descriptions</p>
                <Button size="sm" variant="outline" className="w-full">Edit Meta Tags</Button>
              </div>
              <div className="p-6 border rounded-lg bg-pink-50 hover:bg-pink-100 transition-colors">
                <h3 className="font-medium text-pink-800 mb-2">Performance Reports</h3>
                <p className="text-sm text-pink-700 mb-4">Track SEO performance and rankings</p>
                <Button size="sm" variant="outline" className="w-full">View Performance</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-6">Website Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <h3 className="font-medium text-gray-800 mb-2">General Settings</h3>
                <p className="text-sm text-gray-700 mb-4">Configure basic website settings</p>
                <Button size="sm" className="w-full">View Settings</Button>
              </div>
              <div className="p-6 border rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                <h3 className="font-medium text-teal-800 mb-2">User Permissions</h3>
                <p className="text-sm text-teal-700 mb-4">Manage staff access and roles</p>
                <Button size="sm" variant="outline" className="w-full">Manage Users</Button>
              </div>
              <div className="p-6 border rounded-lg bg-lime-50 hover:bg-lime-100 transition-colors">
                <h3 className="font-medium text-lime-800 mb-2">Notifications</h3>
                <p className="text-sm text-lime-700 mb-4">Configure system and user notifications</p>
                <Button size="sm" variant="outline" className="w-full">
                  <BellRing className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteManager;
