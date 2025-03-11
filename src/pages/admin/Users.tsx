
import { useState, useEffect } from 'react';
import { 
  Search, 
  Shield, 
  UserCheck, 
  UserX,
  Mail,
  Phone,
  Edit,
  User,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Users = () => {
  const { getAllUsers, updateUserRole, isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<ReturnType<typeof getAllUsers>>([]);
  const [filteredUsers, setFilteredUsers] = useState<ReturnType<typeof getAllUsers>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  useEffect(() => {
    if (!isAdmin) return;
    
    // Simulate loading data
    setTimeout(() => {
      const allUsers = getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
      setIsLoading(false);
    }, 800);
  }, [getAllUsers, isAdmin]);
  
  useEffect(() => {
    let filtered = [...users];
    
    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };
  
  const handleUpdateRole = async (userId: string, newRole: 'admin' | 'user') => {
    try {
      const success = await updateUserRole(userId, newRole);
      
      if (success) {
        // Update local state
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        
        toast({
          title: 'Role Updated',
          description: `User role has been updated to ${newRole}.`,
        });
      } else {
        toast({
          title: 'Update Failed',
          description: 'Failed to update user role. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while updating the role.',
        variant: 'destructive',
      });
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
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="w-full md:w-64">
            <div className="relative">
              <select
                className="w-full h-10 pl-3 pr-10 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={roleFilter}
                onChange={handleRoleFilterChange}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-600"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        
                        {user.role === 'user' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600"
                            onClick={() => handleUpdateRole(user.id, 'admin')}
                          >
                            <Shield className="h-4 w-4 mr-1" />
                            Make Admin
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-600"
                            onClick={() => handleUpdateRole(user.id, 'user')}
                          >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Make User
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          <UserX className="h-4 w-4 mr-1" />
                          Disable
                        </Button>
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
