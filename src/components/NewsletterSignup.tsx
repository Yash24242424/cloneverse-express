
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        duration: 3000,
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 staggered-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay updated with the latest gadgets
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new product launches, exclusive deals, and tech tips.
          </p>
          
          <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email"
                className="pl-10 h-12 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="h-12 px-6 group"
              disabled={isSubmitting}
            >
              Subscribe
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-gray-200 text-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">10k+</h3>
            <p className="text-gray-500">Products</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">5M+</h3>
            <p className="text-gray-500">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">500+</h3>
            <p className="text-gray-500">Brands</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
            <p className="text-gray-500">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
