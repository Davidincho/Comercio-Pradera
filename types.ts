export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  BUSINESS = 'BUSINESS',
  ADMIN = 'ADMIN'
}

export enum Category {
  RESTAURANT = 'Gastronomía',
  SHOP = 'Comercios',
  SERVICE = 'Servicios',
  OFFICIAL = 'Sitios Oficiales',
  HEALTH = 'Salud',
  EDUCATION = 'Educación',
  SPORTS = 'Deportes',
  TOURISM = 'Turismo',
  EMERGENCY = 'Emergencia'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  isPromo?: boolean;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  hours: string;
  products?: Product[];
  highlight?: string; // "Destacado del día" e.g., "Menu: Sancocho Valluno"
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  description: string;
  type: 'CULTURAL' | 'OFFICIAL' | 'SPORTS' | 'URGENT';
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}
