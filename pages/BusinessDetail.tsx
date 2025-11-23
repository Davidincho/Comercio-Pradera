import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Share2, Navigation, MessageCircle } from 'lucide-react';
import { MOCK_BUSINESSES } from '../constants';
import { StarRating } from '../components/StarRating';

export const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const business = MOCK_BUSINESSES.find(b => b.id === id);

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4">Comercio no encontrado</h2>
        <Link to="/explore" className="text-pradera-600 hover:underline">Volver a explorar</Link>
      </div>
    );
  }

  const handleOpenMap = () => {
    // Open Google Maps search
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.name + ' ' + business.address)}`, '_blank');
  };

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* Image Header */}
      <div className="relative h-64 md:h-80 w-full">
        <img src={business.imageUrl} alt={business.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <Link to="/explore" className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="container mx-auto">
            <span className="bg-pradera-600 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">
                {business.category}
            </span>
            <h1 className="text-3xl font-bold text-white mb-1">{business.name}</h1>
            <div className="flex items-center text-white/90 text-sm">
                <StarRating rating={business.rating} count={business.reviewCount} />
                <span className="mx-2">•</span>
                <span className={business.isOpen ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
                    {business.isOpen ? 'Abierto Ahora' : 'Cerrado'}
                </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Actions */}
          <div className="flex gap-4">
            <button onClick={handleOpenMap} className="flex-1 bg-pradera-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-pradera-200 hover:bg-pradera-700 transition-colors">
              <Navigation size={20} />
              Cómo llegar
            </button>
            <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <Phone size={20} />
              Llamar
            </button>
             <button className="w-12 bg-white border border-gray-200 text-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-50">
              <Share2 size={20} />
            </button>
          </div>

          {/* Highlights/Menu */}
          {business.highlight && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                    <MessageCircle size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-amber-800">Novedad de hoy</h4>
                    <p className="text-amber-900">{business.highlight}</p>
                </div>
            </div>
          )}

          {/* Description */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Información</h3>
            <p className="text-gray-600 leading-relaxed">{business.description}</p>
            <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                    <MapPin size={20} className="mr-3 text-gray-400" />
                    {business.address}
                </div>
                <div className="flex items-center text-gray-600">
                    <Clock size={20} className="mr-3 text-gray-400" />
                    {business.hours}
                </div>
            </div>
          </section>

          {/* Products/Services */}
          {business.products && business.products.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Menú / Productos</h3>
              <div className="space-y-3">
                {business.products.map(p => (
                    <div key={p.id} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
                        <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                                {p.name}
                                {p.isPromo && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">OFERTA</span>}
                            </div>
                        </div>
                        <div className="font-bold text-gray-700">
                            ${p.price.toLocaleString('es-CO')}
                        </div>
                    </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Static Map Placeholder */}
        <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-xl p-1 h-64 sticky top-24">
                 <div className="w-full h-full bg-slate-200 rounded-lg flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer" onClick={handleOpenMap}>
                     {/* Fake Map Background */}
                     <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                     <MapPin size={48} className="text-red-500 mb-2 drop-shadow-lg z-10" />
                     <p className="text-gray-500 font-medium z-10">Ver en Google Maps</p>
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};
