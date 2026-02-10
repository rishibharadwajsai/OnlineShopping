export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export interface Order {
  id: string;
  date: Date;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  imageUrl: string;
}
