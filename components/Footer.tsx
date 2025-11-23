import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-pradera-400">Pradera Conectada</h3>
            <p className="text-gray-400 text-sm">
              La plataforma digital para impulsar el comercio, turismo y cultura de nuestro municipio.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Alcaldía Municipal</a></li>
              <li><a href="#" className="hover:text-white">Hospital San Roque</a></li>
              <li><a href="#" className="hover:text-white">Policía Nacional</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <p className="text-sm text-gray-400">
              ¿Eres comerciante y quieres aparecer aquí?
            </p>
            <button className="mt-2 bg-pradera-600 hover:bg-pradera-500 text-white px-4 py-2 rounded text-sm transition-colors">
              Registrar mi Negocio
            </button>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Pradera Conectada. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
