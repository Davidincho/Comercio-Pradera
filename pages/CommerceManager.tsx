import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Store, Package } from 'lucide-react';

// Simulación de categorías (usa las mismas de tu app)
const CATEGORIES = [
  'Gastronomía', 'Comercios', 'Servicios', 'Sitios Oficiales',
  'Salud', 'Educación', 'Deportes', 'Turismo', 'Emergencia'
];

export default function CommerceManager() {
  const [businesses, setBusinesses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0],
    description: '',
    address: '',
    phone: '',
    imageUrl: '',
    hours: '',
    lat: 3.4206,
    lng: -76.2443,
    tags: '',
    highlight: '',
    products: []
  });

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    isPromo: false
  });

  const [selectedBusinessForProduct, setSelectedBusinessForProduct] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('pradera_businesses');
    if (stored) {
      setBusinesses(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem('pradera_businesses', JSON.stringify(data));
    setBusinesses(data);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload (convert to base64 or use URL)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit business
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBusiness = {
      ...formData,
      id: editingId || Date.now().toString(),
      rating: 4.5,
      reviewCount: 0,
      isOpen: true,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      products: formData.products || []
    };

    let updated;
    if (editingId) {
      updated = businesses.map(b => b.id === editingId ? newBusiness : b);
    } else {
      updated = [...businesses, newBusiness];
    }

    saveToStorage(updated);
    resetForm();
    setShowForm(false);
  };

  // Delete business
  const handleDelete = (id) => {
    if (confirm('¿Seguro que deseas eliminar este comercio?')) {
      const updated = businesses.filter(b => b.id !== id);
      saveToStorage(updated);
    }
  };

  // Edit business
  const handleEdit = (business) => {
    setFormData({
      ...business,
      tags: business.tags.join(', ')
    });
    setEditingId(business.id);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      category: CATEGORIES[0],
      description: '',
      address: '',
      phone: '',
      imageUrl: '',
      hours: '',
      lat: 3.4206,
      lng: -76.2443,
      tags: '',
      highlight: '',
      products: []
    });
    setEditingId(null);
  };

  // Add product to business
  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price) {
      alert('Completa nombre y precio del producto');
      return;
    }

    const newProduct = {
      id: `p${Date.now()}`,
      name: productForm.name,
      price: parseFloat(productForm.price),
      description: productForm.description,
      isPromo: productForm.isPromo
    };

    const updated = businesses.map(b => {
      if (b.id === selectedBusinessForProduct) {
        return {
          ...b,
          products: [...(b.products || []), newProduct]
        };
      }
      return b;
    });

    saveToStorage(updated);
    setProductForm({ name: '', price: '', description: '', isPromo: false });
    setSelectedBusinessForProduct(null);
  };

  // Export data as JSON
  const handleExport = () => {
    const dataStr = JSON.stringify(businesses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pradera_comercios.json';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                🏪 Gestión de Comercios
              </h1>
              <p className="text-gray-600">
                {businesses.length} comercios registrados
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-2"
              >
                <Upload size={18} />
                Exportar JSON
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 flex items-center gap-2"
              >
                <Plus size={18} />
                Nuevo Comercio
              </button>
            </div>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {editingId ? 'Editar Comercio' : 'Nuevo Comercio'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Comercio *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Ej: Restaurante El Sabor"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Describe el negocio..."
                  />
                </div>

                {/* Address & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Calle 5 #10-20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="310 555 1234"
                    />
                  </div>
                </div>

                {/* Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horario *
                  </label>
                  <input
                    type="text"
                    name="hours"
                    value={formData.hours}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="8:00 AM - 6:00 PM"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL de Imagen
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="mt-2 w-full h-40 object-cover rounded-lg border border-gray-200"
                    />
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Usa servicios gratuitos como Imgur, ImgBB o sube a Google Drive (compartido públicamente)
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Etiquetas (separadas por coma)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="comida, típica, almuerzo"
                  />
                </div>

                {/* Highlight */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destacado del día (opcional)
                  </label>
                  <input
                    type="text"
                    name="highlight"
                    value={formData.highlight}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Menú especial: Sancocho"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    {editingId ? 'Guardar Cambios' : 'Crear Comercio'}
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Business List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map(business => (
            <div key={business.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <img
                  src={business.imageUrl || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {business.category}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{business.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{business.description}</p>
                
                <div className="text-xs text-gray-500 mb-4 space-y-1">
                  <p>📍 {business.address}</p>
                  <p>📞 {business.phone}</p>
                  <p>🕐 {business.hours}</p>
                  {business.products && business.products.length > 0 && (
                    <p className="text-emerald-600 font-medium">
                      🛒 {business.products.length} productos
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(business)}
                    className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-100 flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Editar
                  </button>
                  <button
                    onClick={() => setSelectedBusinessForProduct(business.id)}
                    className="flex-1 bg-emerald-50 text-emerald-700 py-2 rounded-lg font-medium hover:bg-emerald-100 flex items-center justify-center gap-2"
                  >
                    <Package size={16} />
                    Productos
                  </button>
                  <button
                    onClick={() => handleDelete(business.id)}
                    className="bg-red-50 text-red-700 p-2 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {businesses.length === 0 && (
            <div className="col-span-full text-center py-20">
              <Store size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">
                No hay comercios registrados
              </h3>
              <p className="text-gray-500 mb-6">
                Comienza añadiendo tu primer comercio
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700"
              >
                Crear Primer Comercio
              </button>
            </div>
          )}
        </div>

        {/* Product Management Modal */}
        {selectedBusinessForProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Productos - {businesses.find(b => b.id === selectedBusinessForProduct)?.name}
                  </h2>
                  <button
                    onClick={() => setSelectedBusinessForProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Add Product Section */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-4">Añadir Producto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      placeholder="Nombre del producto"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      placeholder="Precio"
                      className="px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    placeholder="Descripción (opcional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
                  />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={productForm.isPromo}
                        onChange={(e) => setProductForm({...productForm, isPromo: e.target.checked})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Es promoción</span>
                    </label>
                    <button
                      onClick={handleAddProduct}
                      className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
                    >
                      Añadir
                    </button>
                  </div>
                </div>

                {/* Products List */}
                <div className="space-y-3">
                  {businesses.find(b => b.id === selectedBusinessForProduct)?.products?.map(product => (
                    <div key={product.id} className="flex justify-between items-center p-3 bg-white border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {product.name}
                          {product.isPromo && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">OFERTA</span>
                          )}
                        </div>
                        {product.description && (
                          <p className="text-sm text-gray-500">{product.description}</p>
                        )}
                      </div>
                      <div className="font-bold text-emerald-700">
                        ${product.price.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {(!businesses.find(b => b.id === selectedBusinessForProduct)?.products || 
                    businesses.find(b => b.id === selectedBusinessForProduct)?.products?.length === 0) && (
                    <p className="text-center text-gray-500 py-8">No hay productos añadidos</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}