
import { useState, useEffect } from 'react';
import { 
  Search, 
  Mail, 
  User, 
  Shield, 
  MoreVertical,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

const Users = () => {
  const { toast } = useToast();
  const { getAllUsers, updateUserRole, isAdmin } = useAuth();
  const [users, setUsers] = useState<UserWithoutPassword[]>([]);
  const [displayedUsers, setDisplayedUsers] = useState<UserWithoutPassword[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (isAdmin) {
      // Load users
      setUsers(getAllUsers());
      setDisplayedUsers(getAllUsers());
    }
    setIsLoading(false);
  }, [isAdmin, getAllUsers]);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setDisplayedUsers(users);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
      setDisplayedUsers(filtered);
    }
  }, [searchTerm, users]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleAddUser = () => {
    toast({
      title: 'Add User',
      description: 'User creation functionality would open a form here.',
    });
  };
  
  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'user') => {
    const success = await updateUserRole(userId, newRole);
    
    if (success) {
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: 'Role Updated',
        description: `User's role has been updated to ${newRole}.`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update user role.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSendPasswordReset = (email: string) => {
    // In a real app, this would trigger a password reset email
    toast({
      title: 'Password Reset Email Sent',
      description: `A password reset email has been sent to ${email}.`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-600">
          You need administrator privileges to access this page.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-5 border-b border-gray-100 bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600"
                          onClick={() => handleSendPasswordReset(user.email)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Reset Password
                        </Button>
                        
                        <div className="relative group">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-600"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                          
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                            <div className="py-1">
                              {user.role === 'user' ? (
                                <button
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => handleUpdateRole(user.id, 'admin')}
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Make Admin
                                </button>
                              ) : (
                                <button
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                  onClick={() => handleUpdateRole(user.id, 'user')}
                                >
                                  <User className="h-4 w-4 mr-2" />
                                  Make Regular User
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No users found
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

export default Users;
