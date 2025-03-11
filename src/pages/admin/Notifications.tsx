
import { useState, useEffect } from 'react';
import { 
  Bell, 
  ShoppingCart, 
  User, 
  Package, 
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Mock notification data
interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'user' | 'product' | 'system';
  status: 'unread' | 'read';
  timestamp: Date;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Order Received',
    message: 'Order #ORD-12345 has been placed worth $299.57',
    type: 'order',
    status: 'unread',
    timestamp: new Date(Date.now() - 20 * 60 * 1000) // 20 minutes ago
  },
  {
    id: '2',
    title: 'New User Registration',
    message: 'Sarah Johnson has created a new account',
    type: 'user',
    status: 'unread',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '3',
    title: 'Low Stock Alert',
    message: 'AirBeam Pro Earbuds is running low (2 items remaining)',
    type: 'product',
    status: 'unread',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    id: '4',
    title: 'System Update',
    message: 'The system will undergo maintenance on Sunday at 2:00 AM',
    type: 'system',
    status: 'read',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: '5',
    title: 'Order Delivered',
    message: 'Order #ORD-12340 has been delivered successfully',
    type: 'order',
    status: 'read',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
];

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 800);
  }, []);
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({
        ...notification,
        status: 'read'
      }))
    );
    
    toast({
      title: 'All notifications marked as read',
      description: 'All your notifications have been marked as read.',
    });
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, status: 'read' } 
          : notification
      )
    );
  };
  
  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    toast({
      title: 'Notification deleted',
      description: 'The notification has been deleted successfully.',
    });
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setNotifications(mockNotifications);
      setIsLoading(false);
      
      toast({
        title: 'Notifications Refreshed',
        description: 'Your notifications have been refreshed.',
      });
    }, 800);
  };
  
  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : activeFilter === 'unread'
      ? notifications.filter(n => n.status === 'unread')
      : notifications.filter(n => n.type === activeFilter);
  
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-5 w-5 text-blue-500" />;
      case 'user':
        return <User className="h-5 w-5 text-green-500" />;
      case 'product':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'system':
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
    }
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark All as Read
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2">
          {[
            { label: 'All', value: 'all', icon: <Bell className="h-4 w-4" /> },
            { label: 'Unread', value: 'unread', icon: <Bell className="h-4 w-4" /> },
            { label: 'Orders', value: 'order', icon: <ShoppingCart className="h-4 w-4" /> },
            { label: 'Users', value: 'user', icon: <User className="h-4 w-4" /> },
            { label: 'Products', value: 'product', icon: <Package className="h-4 w-4" /> },
            { label: 'System', value: 'system', icon: <AlertTriangle className="h-4 w-4" /> },
          ].map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className="flex items-center"
            >
              {filter.icon}
              <span className="ml-1">{filter.label}</span>
              {filter.value === 'unread' && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                  {notifications.filter(n => n.status === 'unread').length}
                </span>
              )}
            </Button>
          ))}
        </div>
        
        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  notification.status === 'unread' ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <div className="flex items-center space-x-2 ml-2">
                        <span className="text-xs text-gray-500">
                          {formatTime(notification.timestamp)}
                        </span>
                        {notification.status === 'unread' && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Bell className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-gray-500">No notifications found</p>
              <Button variant="outline" className="mt-4" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
