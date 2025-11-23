import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, User, CalendarDays, BarChart3, Search, Menu } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentUserRole: UserRole;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUserRole }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/explore', label: 'Explorar', icon: Compass },
    { path: '/events', label: 'Eventos', icon: CalendarDays },
    { path: '/login', label: 'Mi Cuenta', icon: User },
  ];

  if (currentUserRole === UserRole.ADMIN) {
    navItems.splice(3, 0, { path: '/admin', label: 'Admin', icon: BarChart3 });
  }

  return (
    <>
      {/* Top Navbar (Desktop) */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 hidden md:block">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pradera-500 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="text-xl font-bold text-gray-800">Pradera<span className="text-pradera-600">Conectada</span></span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-pradera-700 bg-pradera-50'
                    : 'text-gray-600 hover:text-pradera-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-9 pr-4 py-1.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pradera-300 w-48 transition-all"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive(item.path) ? 'text-pradera-600' : 'text-gray-400'
              }`}
            >
              <item.icon size={20} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
