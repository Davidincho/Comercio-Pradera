import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Coffee, ShoppingBag, ShieldAlert, GraduationCap, ChevronRight } from 'lucide-react';
import { Category, Business } from '../types';
import { BusinessCard } from '../components/BusinessCard';
import { MOCK_BUSINESSES } from '../constants';

export const Home: React.FC = () => {
  const featuredBusinesses = MOCK_BUSINESSES.filter(b => b.highlight).slice(0, 3);
  
  const categories = [
    { id: Category.RESTAURANT, icon: Coffee, color: 'bg-orange-100 text-orange-600', label: 'Restaurantes' },
    { id: Category.SHOP, icon: ShoppingBag, color: 'bg-blue-100 text-blue-600', label: 'Comercios' },
    { id: Category.OFFICIAL, icon: MapPin, color: 'bg-green-100 text-green-600', label: 'Oficial' },
    { id: Category.EMERGENCY, icon: ShieldAlert, color: 'bg-red-100 text-red-600', label: 'Emergencia' },
    { id: Category.EDUCATION, icon: GraduationCap, color: 'bg-purple-100 text-purple-600', label: 'Educación' },
  ];

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="relative bg-pradera-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/1920/1080?random=99')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Descubre <span className="text-pradera-300">Pradera</span>
          </h1>
          <p className="text-pradera-100 max-w-xl mb-8 text-lg">
            Encuentra los mejores comercios, servicios y lugares de nuestro municipio en un solo lugar.
          </p>
          
          <div className="w-full max-w-lg relative group">
            <input
              type="text"
              placeholder="¿Qué estás buscando hoy?"
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-pradera-500/30 transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pradera-600" />
            <Link to="/explore" className="absolute right-2 top-1/2 -translate-y-1/2 bg-pradera-600 hover:bg-pradera-500 text-white p-2 rounded-full transition-colors">
                <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Categories */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Categorías Populares</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                to={`/explore?category=${cat.id}`}
                className="flex-shrink-0 flex flex-col items-center space-y-2 min-w-[5rem] group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:-translate-y-1 ${cat.color}`}>
                  <cat.icon size={24} />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-12">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Destacados del Día</h2>
              <p className="text-sm text-gray-500">Promociones y menús de hoy</p>
            </div>
            <Link to="/explore" className="text-sm text-pradera-600 font-medium hover:underline">Ver todos</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((b) => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>
        </section>

        {/* Official Info Banner */}
        <section className="bg-slate-900 rounded-2xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="mb-6 md:mb-0 md:pr-8">
            <h3 className="text-2xl font-bold mb-2">Pizarra Municipal</h3>
            <p className="text-slate-300 mb-4">Mantente informado sobre cortes de agua, convocatorias, becas y eventos culturales oficiales.</p>
            <Link to="/events" className="inline-block bg-white text-slate-900 font-bold px-6 py-2 rounded-lg hover:bg-slate-100 transition-colors">
              Ver Pizarra
            </Link>
          </div>
          <div className="w-full md:w-1/3 h-32 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
             <div className="text-center">
                 <div className="text-3xl font-bold text-pradera-400 mb-1">{MOCK_BUSINESSES.filter(b => b.category === Category.OFFICIAL).length}</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wider">Sitios Oficiales</div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};
