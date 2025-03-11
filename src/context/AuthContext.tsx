
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateUserRole: (userId: string, role: 'admin' | 'user') => Promise<boolean>;
  getAllUsers: () => User[];
};

// Mock users for demo
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@99baazaar.com',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as const,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'sarah123',
    role: 'user' as const,
  },
  {
    id: '4',
    name: 'Mike Williams',
    email: 'mike@example.com',
    password: 'mike123',
    role: 'user' as const,
  },
  {
    id: '5',
    name: 'Karen Smith',
    email: 'karen@example.com',
    password: 'karen123',
    role: 'user' as const,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const isAdmin = user?.role === 'admin';
  
  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(
      user => user.email === email && user.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Check if email already exists
    if (MOCK_USERS.some(user => user.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user (in a real app, this would be an API call)
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role: 'user' as const
    };
    
    // Add to mock users in memory (would be DB in real app)
    MOCK_USERS.push({ ...newUser, password });
    
    // Set current user
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setIsLoading(false);
    return true;
  };

  // Admin functions
  const updateUserRole = async (userId: string, role: 'admin' | 'user'): Promise<boolean> => {
    // Only admins can update roles
    if (!isAdmin) return false;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userIndex = MOCK_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) return false;
    
    MOCK_USERS[userIndex].role = role;
    
    return true;
  };
  
  const getAllUsers = (): User[] => {
    if (!isAdmin) return [];
    
    return MOCK_USERS.map(({ password, ...user }) => user);
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAdmin, 
      login, 
      logout, 
      signup, 
      updateUserRole, 
      getAllUsers 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
