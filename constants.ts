import { Business, Category, Event, UserRole } from './types';

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Alcaldía Municipal de Pradera',
    category: Category.OFFICIAL,
    description: 'Centro administrativo del municipio de Pradera.',
    address: 'Cl. 6 #11-20, Pradera, Valle del Cauca',
    lat: 3.421,
    lng: -76.243,
    phone: '(602) 267 2525',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    rating: 4.5,
    reviewCount: 120,
    isOpen: true,
    hours: '8:00 AM - 12:00 PM, 2:00 PM - 5:00 PM',
    tags: ['gobierno', 'trámites', 'impuestos'],
    highlight: 'Jornada de atención especial este viernes'
  },
  {
    id: '2',
    name: 'Hospital San Roque',
    category: Category.HEALTH,
    description: 'Atención médica de urgencias y consulta externa.',
    address: 'Cra. 11 #7-45',
    lat: 3.423,
    lng: -76.241,
    phone: '123',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    rating: 4.2,
    reviewCount: 85,
    isOpen: true,
    hours: '24 Horas',
    tags: ['salud', 'urgencias', 'medicina'],
  },
  {
    id: '3',
    name: 'Restaurante El Sabor Valluno',
    category: Category.RESTAURANT,
    description: 'Lo mejor de la gastronomía del Valle. Chuleta, sancocho y más.',
    address: 'Parque Principal, Local 4',
    lat: 3.420,
    lng: -76.244,
    phone: '315 555 1234',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    rating: 4.8,
    reviewCount: 340,
    isOpen: true,
    hours: '11:00 AM - 9:00 PM',
    tags: ['comida', 'típica', 'almuerzo'],
    highlight: 'Menú del día: Sancocho de Gallina',
    products: [
      { id: 'p1', name: 'Chuleta Valluna', price: 25000, isPromo: true },
      { id: 'p2', name: 'Sancocho', price: 18000 },
      { id: 'p3', name: 'Lulada', price: 6000 }
    ]
  },
  {
    id: '4',
    name: 'Ferretería La Central',
    category: Category.SHOP,
    description: 'Materiales para construcción y herramientas.',
    address: 'Cl. 5 #10-10',
    lat: 3.419,
    lng: -76.242,
    phone: '310 444 5555',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    rating: 4.0,
    reviewCount: 45,
    isOpen: false,
    hours: '8:00 AM - 6:00 PM',
    tags: ['herramientas', 'construcción'],
  },
  {
    id: '5',
    name: 'Estación de Policía Pradera',
    category: Category.EMERGENCY,
    description: 'Seguridad y convivencia ciudadana.',
    address: 'Cra. 10 #5-20',
    lat: 3.418,
    lng: -76.240,
    phone: '112',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    rating: 3.8,
    reviewCount: 20,
    isOpen: true,
    hours: '24 Horas',
    tags: ['seguridad', 'denuncias'],
  },
   {
    id: '6',
    name: 'Inder Pradera',
    category: Category.SPORTS,
    description: 'Instituto Municipal del Deporte y la Recreación.',
    address: 'Polideportivo Municipal',
    lat: 3.425,
    lng: -76.246,
    phone: '320 999 8888',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    rating: 4.6,
    reviewCount: 60,
    isOpen: true,
    hours: '7:00 AM - 9:00 PM',
    tags: ['deporte', 'futbol', 'gimnasio'],
    highlight: 'Inscripciones abiertas torneo de microfútbol'
  }
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Festival del Dulce',
    date: '2023-11-20T10:00:00',
    location: 'Parque Principal',
    description: 'Gran feria de dulces tradicionales elaborados por nuestras abuelas pradereñas. Música en vivo.',
    type: 'CULTURAL',
    imageUrl: 'https://picsum.photos/800/400?random=10'
  },
  {
    id: 'e2',
    title: 'Corte de Agua Programado',
    date: '2023-10-25T08:00:00',
    location: 'Barrio La Libertad',
    description: 'Acuavalle informa corte por mantenimiento de redes.',
    type: 'URGENT',
    imageUrl: 'https://picsum.photos/800/400?random=11'
  },
  {
    id: 'e3',
    title: 'Becas Universitarias - Alcaldía',
    date: '2023-11-01T08:00:00',
    location: 'Secretaría de Educación',
    description: 'Abierta la convocatoria para el fondo de educación superior del municipio.',
    type: 'OFFICIAL',
    imageUrl: 'https://picsum.photos/800/400?random=12'
  }
];

export const DEFAULT_COORDS = { lat: 3.4206, lng: -76.2443 }; // Pradera Center approx
