import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Business } from '../types';
import { StarRating } from './StarRating';
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Link to={`/business/${business.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <div className="relative h-40 overflow-hidden">
          <img
            src={business.imageUrl}
            alt={business.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-pradera-800 shadow-sm">
            {business.category}
          </div>
          {business.highlight && (
            <div className="absolute bottom-2 left-2 bg-amber-400 text-amber-950 px-2 py-1 rounded-md text-xs font-bold shadow-sm animate-pulse">
              ★ Hoy: {business.highlight}
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 group-hover:text-pradera-600 transition-colors line-clamp-1">
              {business.name}
            </h3>
          </div>
          
          <div className="mb-2">
            <StarRating rating={business.rating} count={business.reviewCount} />
          </div>

          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">
            {business.description}
          </p>

          <div className="space-y-1 text-xs text-gray-500 mt-auto">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1 text-pradera-500" />
              <span className="truncate">{business.address}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1 text-pradera-500" />
              <span className="truncate">{business.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
