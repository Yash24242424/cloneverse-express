
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define cart item type
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  brand?: string;
  salePrice?: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  addItem: (product: { id: string; name: string; price: number; image: string; brand?: string; salePrice?: number }, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addToCart: (product: { id: string; name: string; price: number; image: string; brand?: string; salePrice?: number }, quantity?: number) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
  
  // Calculate total items in cart
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price of all items in cart
  const totalPrice = items.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);
  
  // Calculate subtotal (without tax and shipping)
  const subtotal = totalPrice;
  
  // Calculate tax (e.g., 8% of subtotal)
  const tax = subtotal * 0.08;
  
  // Calculate shipping (free for orders over ₹999)
  const shipping = subtotal > 999 ? 0 : 99;
  
  // Calculate total (subtotal + tax + shipping)
  const total = subtotal + tax + shipping;
  
  const addItem = (product: { id: string; name: string; price: number; image: string; brand?: string; salePrice?: number }, quantity = 1) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Item doesn't exist, add it
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
            brand: product.brand,
            salePrice: product.salePrice
          }
        ];
      }
    });
  };
  
  // Alias for addItem for backwards compatibility
  const addToCart = addItem;
  
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Alias for removeItem for backwards compatibility
  const removeFromCart = removeItem;
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => {
      return prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };
  
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        totalItems, 
        totalPrice,
        subtotal,
        tax,
        shipping,
        total,
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart,
        addToCart,
        removeFromCart
      }}
    >
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
