export interface ContentDetail {
  item: string;
  detail: string;
}
export interface Plan {
  id: string;
  name: string;
  price: number;
  itemsCount: number;
  description: string;
  contents: ContentDetail[];
  imageUrl: string;
  color: string;
  isComingSoon: boolean;
}

export interface MenuItem {
  day: string;
  items: string[];
}

export interface CartItem {
  id: number;
  plan: Plan;
  type: 'subscription' | 'single';
}

// FIX: Add User interface for login and profile management.
export interface User {
  name: string;
  phone: string;
  picture: string;
}

// FIX: Add Order interface for order history.
export interface Order {
  id: number;
  date: string;
  total: number;
  items: CartItem[];
}

export enum Page {
  HOME = 'HOME',
  MENU = 'MENU',
  CART = 'CART',
  ORDER_SUCCESS = 'ORDER_SUCCESS',
}