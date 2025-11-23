import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Map } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_EVENTS } from '../constants';
import { BusinessCard } from '../components/BusinessCard';
import { Category, Business } from '../types';
import { getGeminiRecommendations } from '../services/geminiService';

export const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  
  // Gemini AI State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showAi, setShowAi] = useState(false);

  useEffect(() => {
    let results = MOCK_BUSINESSES;

    if (selectedCategory !== 'ALL') {
      results = results.filter(b => b.category === selectedCategory);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      results = results.filter(b => 
        b.name.toLowerCase().includes(lower) || 
        b.description.toLowerCase().includes(lower) ||
        b.tags.some(tag => tag.toLowerCase().includes(lower))
      );
    }

    setFilteredBusinesses(results);
  }, [searchTerm, selectedCategory]);

  const handleAiSearch = async () => {
    if (!aiQuery.trim()) return;
    setIsThinking(true);
    setAiResponse('');
    
    const response = await getGeminiRecommendations(aiQuery, MOCK_BUSINESSES, MOCK_EVENTS);
    setAiResponse(response);
    setIsThinking(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-24 md:pb-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explorar Pradera</h1>
          <p className="text-gray-500">Encuentra todo lo que buscas</p>
        </div>

        <button 
          onClick={() => setShowAi(!showAi)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full shadow hover:shadow-lg transition-all text-sm font-medium"
        >
          <Sparkles size={16} />
          {showAi ? 'Cerrar Asistente' : 'Asistente IA'}
        </button>
      </div>

      {/* AI Assistant Panel */}
      {showAi && (
        <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-2xl p-6 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-600"/>
            Pregúntale a Pradera-Bot
          </h3>
          <p className="text-sm text-indigo-700 mb-4">
            ¿Buscas algo específico? Pregúntame cosas como "Dónde comer sancocho" o "¿Qué farmacia está abierta?".
          </p>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-1 border border-indigo-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-300 outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
            />
            <button 
              onClick={handleAiSearch}
              disabled={isThinking}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {isThinking ? 'Pensando...' : 'Enviar'}
            </button>
          </div>
          {aiResponse && (
            <div className="bg-white p-4 rounded-lg border border-indigo-100 text-gray-700 text-sm leading-relaxed">
              {aiResponse}
            </div>
          )}
        </div>
      )}

      {/* Search & Filters */}
      <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur py-4 mb-6 border-b border-gray-200 -mx-4 px-4 md:mx-0 md:px-0 md:bg-transparent md:border-none md:static">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar lugares, productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-pradera-300 focus:border-transparent outline-none shadow-sm"
            />
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'ALL' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-pradera-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Results */}
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBusinesses.map((b) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No encontramos resultados</h3>
          <p className="text-gray-500">Intenta con otra búsqueda o categoría.</p>
        </div>
      )}
      
      {/* Floating Map Button (Visual Cue) */}
      <button className="fixed bottom-20 md:bottom-8 right-6 bg-gray-900 text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-transform hover:scale-105 z-40 flex items-center gap-2">
         <Map size={20} />
         <span className="hidden md:inline font-bold">Ver Mapa</span>
      </button>

    </div>
  );
};
