
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from '@/hooks/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('gadgetflow_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart:', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gadgetflow_cart', JSON.stringify(items));
  }, [items]);
  
  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If the product already exists in the cart, update the quantity
        const updatedItems = prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
        
        toast({
          title: 'Cart updated',
          description: `${product.name} quantity updated in your cart.`,
        });
        
        return updatedItems;
      } else {
        // If the product isn't in the cart yet, add it
        toast({
          title: 'Added to cart',
          description: `${product.name} has been added to your cart.`,
        });
        
        return [...prevItems, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({
          title: 'Removed from cart',
          description: `${itemToRemove.product.name} has been removed from your cart.`,
        });
      }
      
      return prevItems.filter(item => item.product.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    });
  };
  
  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);
  
  // For demo purposes, we'll use fixed rates
  const tax = subtotal * 0.07; // 7% tax rate
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const total = subtotal + tax + shipping;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      tax,
      shipping,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
