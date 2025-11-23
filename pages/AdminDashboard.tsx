import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_BUSINESSES } from '../constants';
import { Category } from '../types';
import { PlusCircle, Users, Store, Calendar } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  // Aggregate data for chart
  const data = Object.values(Category).map(cat => ({
    name: cat,
    count: MOCK_BUSINESSES.filter(b => b.category === cat).length
  }));

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Panel Administrativo</h1>
        <button className="bg-pradera-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-pradera-700">
            <PlusCircle size={18} />
            <span className="hidden md:inline">Nuevo Evento</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Store size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">Comercios Activos</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_BUSINESSES.length}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Calendar size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">Eventos del Mes</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Users size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">Usuarios Registrados</p>
                <p className="text-2xl font-bold text-gray-900">1,240</p>
            </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h3 className="text-lg font-bold mb-6 text-gray-800">Distribución de Comercios por Categoría</h3>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} angle={-15} textAnchor="end" height={60}/>
                <YAxis allowDecimals={false}/>
                <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="count" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Activity List Mockup */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Solicitudes Pendientes</h3>
          </div>
          <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                      <div>
                          <p className="font-medium text-gray-900">Nuevo registro: Restaurante La Cabaña</p>
                          <p className="text-sm text-gray-500">Solicitado hace {i} horas</p>
                      </div>
                      <div className="flex gap-2">
                          <button className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded font-medium hover:bg-green-200">Aprobar</button>
                          <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium hover:bg-gray-200">Revisar</button>
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};
