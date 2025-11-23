import React from 'react';
import { UserRole } from '../types';
import { User, Briefcase, Shield } from 'lucide-react';

interface LoginProps {
  setRole: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ setRole }) => {
  const roles = [
    { id: UserRole.USER, label: 'Ciudadano / Visitante', icon: User, desc: 'Explora, comenta y guarda favoritos' },
    { id: UserRole.BUSINESS, label: 'Comerciante', icon: Briefcase, desc: 'Administra tu negocio y promociones' },
    { id: UserRole.ADMIN, label: 'Administrador Municipal', icon: Shield, desc: 'Gestiona eventos y alertas' },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
        <p className="text-gray-500">Selecciona un perfil para probar la aplicación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => setRole(role.id)}
            className="flex flex-col items-center text-center p-8 bg-white border border-gray-200 rounded-2xl hover:shadow-xl hover:border-pradera-300 transition-all group"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-pradera-50 group-hover:text-pradera-600 transition-colors">
              <role.icon size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{role.label}</h3>
            <p className="text-sm text-gray-500">{role.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
