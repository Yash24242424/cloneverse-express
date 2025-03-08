
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get the redirect path from location state or default to home/admin dashboard
  const from = location.state?.from?.pathname || (isAdmin ? '/admin' : '/');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Log In to Your Account</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Please enter your details.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <div>
              <Button className="w-full py-6" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2">Logging in</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-600">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 underline">
                  Sign Up
                </Link>
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="font-medium">
                  Demo Accounts:
                </p>
                <p className="mt-1">
                  Admin: admin@gadgetflow.com / admin123
                </p>
                <p className="mt-1">
                  User: user@example.com / user123
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
