
import { useState } from 'react';
import { 
  Save, 
  Globe, 
  CreditCard, 
  Mail, 
  MessageSquare, 
  Bell,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // General settings
  const [siteName, setSiteName] = useState('99baazaar');
  const [siteDescription, setSiteDescription] = useState('Your one-stop shop for gadgets and electronics');
  const [supportEmail, setSupportEmail] = useState('support@99baazaar.com');
  
  // Payment settings
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState('7.5');
  
  // Notification settings
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [inventoryNotifications, setInventoryNotifications] = useState(true);
  const [userNotifications, setUserNotifications] = useState(false);
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      });
    }, 1000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="space-y-8">
        {/* General Settings */}
        <form onSubmit={handleSaveSettings} className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center mb-4">
              <Globe className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">General Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <Input
                  id="siteDescription"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Support Email
                </label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
          
          {/* Payment Settings */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Payment Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="taxRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <Input
                  id="taxRate"
                  type="number"
                  min="0"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-orange-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Notification Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="orderNotifications"
                  type="checkbox"
                  checked={orderNotifications}
                  onChange={() => setOrderNotifications(!orderNotifications)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="orderNotifications" className="ml-2 block text-sm text-gray-700">
                  Receive notifications for new orders
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="inventoryNotifications"
                  type="checkbox"
                  checked={inventoryNotifications}
                  onChange={() => setInventoryNotifications(!inventoryNotifications)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="inventoryNotifications" className="ml-2 block text-sm text-gray-700">
                  Receive notifications for low inventory
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="userNotifications"
                  type="checkbox"
                  checked={userNotifications}
                  onChange={() => setUserNotifications(!userNotifications)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="userNotifications" className="ml-2 block text-sm text-gray-700">
                  Receive notifications for new user registrations
                </label>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Settings
            </Button>
          </div>
        </form>
        
        {/* Security Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="h-5 w-5 text-red-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Configure security settings for your store. These settings help protect your store from unauthorized access and potential threats.
            </p>
            
            <Button variant="outline" className="mr-2">
              Configure Password Policy
            </Button>
            <Button variant="outline">
              Manage API Keys
            </Button>
          </div>
        </div>
        
        {/* Communication Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Communication Settings</h2>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Configure email templates and communication settings for your store's automated messages.
            </p>
            
            <Button variant="outline" className="mr-2">
              <Mail className="h-4 w-4 mr-2" />
              Email Templates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
