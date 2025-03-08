
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@gadgetflow.com',
    password: 'admin123', // In a real app, passwords would be hashed
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as const,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('gadgetflow_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('gadgetflow_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate network request
    setLoading(true);
    
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('gadgetflow_user', JSON.stringify(userWithoutPassword));
          toast({
            title: 'Login successful',
            description: `Welcome back, ${userWithoutPassword.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: 'Login failed',
            description: 'Invalid email or password',
            variant: 'destructive',
          });
          resolve(false);
        }
        
        setLoading(false);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gadgetflow_user');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
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
