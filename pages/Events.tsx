import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { EventCard } from '../components/EventCard';
import { Bell } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pizarra Municipal</h1>
          <p className="text-gray-500">Eventos, convocatorias y noticias de Pradera</p>
        </div>
        <button className="bg-white border border-gray-200 p-2 rounded-full shadow-sm hover:bg-gray-50 text-pradera-600">
          <Bell size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {MOCK_EVENTS.length > 0 ? (
          MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
            <p className="text-center text-gray-500">No hay eventos próximos.</p>
        )}
      </div>

      <div className="mt-12 bg-pradera-50 rounded-2xl p-8 text-center border border-pradera-100">
        <h3 className="text-xl font-bold text-pradera-800 mb-2">¿Organizas un evento cultural?</h3>
        <p className="text-pradera-600 mb-4">Comunícate con la Secretaría de Cultura para publicarlo aquí.</p>
        <button className="text-pradera-700 font-bold hover:underline">
          Ver información de contacto
        </button>
      </div>
    </div>
  );
};
