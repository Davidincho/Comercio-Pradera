import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const date = new Date(event.date);
  
  const typeColors = {
    CULTURAL: 'bg-purple-100 text-purple-700',
    OFFICIAL: 'bg-blue-100 text-blue-700',
    SPORTS: 'bg-green-100 text-green-700',
    URGENT: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
      <div className="md:w-1/3 h-48 md:h-auto relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur rounded px-2 py-1 text-center min-w-[3rem]">
          <div className="text-xs font-bold text-gray-500 uppercase">{date.toLocaleString('es-CO', { month: 'short' })}</div>
          <div className="text-xl font-bold text-gray-900">{date.getDate()}</div>
        </div>
      </div>
      <div className="p-4 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${typeColors[event.type]}`}>
            {event.type === 'URGENT' ? '🚨 IMPORTANTE' : event.type}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-auto">
            <MapPin size={14} className="mr-1" />
            {event.location}
            <span className="mx-2">•</span>
            <Calendar size={14} className="mr-1" />
            {date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};
