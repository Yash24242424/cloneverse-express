
import { Product } from './products';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Mock orders for demo
export const orders: Order[] = [
  {
    id: 'ORD-12345',
    userId: '2',
    items: [
      {
        productId: '1',
        productName: 'AirBeam Pro Earbuds',
        price: 199.99,
        quantity: 1,
        total: 199.99
      },
      {
        productId: '5',
        productName: 'EcoFlask Insulated Bottle',
        price: 39.99,
        quantity: 2,
        total: 79.98
      }
    ],
    subtotal: 279.97,
    tax: 19.60,
    shipping: 0,
    total: 299.57,
    status: 'shipped',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA'
    },
    createdAt: new Date('2023-01-15T10:30:00'),
    updatedAt: new Date('2023-01-15T11:45:00')
  }
];

// Mock function to create a new order
export const createOrder = (
  userId: string, 
  items: OrderItem[], 
  subtotal: number,
  tax: number,
  shipping: number,
  total: number,
  paymentMethod: string,
  shippingAddress: Order['shippingAddress']
): Order => {
  const newOrder: Order = {
    id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    userId,
    items,
    subtotal,
    tax,
    shipping,
    total,
    status: 'pending',
    paymentMethod,
    paymentStatus: 'pending',
    shippingAddress,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  // In a real application, this would save to a database
  orders.push(newOrder);
  return newOrder;
};

export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

export const updateOrderStatus = (orderId: string, status: Order['status'], paymentStatus?: Order['paymentStatus']): Order | undefined => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return undefined;
  
  const updatedOrder = {
    ...orders[orderIndex],
    status,
    ...(paymentStatus && { paymentStatus }),
    updatedAt: new Date()
  };
  
  orders[orderIndex] = updatedOrder;
  return updatedOrder;
};

export const getUserOrders = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

export const getAllOrders = (): Order[] => {
  return [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
