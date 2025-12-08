import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, User, Mail, Lock, Phone, Store, MapPin, Clock, X } from 'lucide-react';

export default function BusinessRegistrationWithDocs() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessName: '',
    category: 'Gastronomía',
    description: '',
    address: '',
    businessPhone: '',
    hours: '',
    imageUrl: '',
    rutFile: null,
    rutPreview: null,
    cedulaFile: null,
    cedulaPreview: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CATEGORIES = [
    'Gastronomía', 'Comercios', 'Servicios', 'Salud', 
    'Educación', 'Deportes', 'Turismo'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('❌ El archivo no debe superar 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('❌ Solo se permiten imágenes (JPG, PNG) o PDF');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'rut') {
        setFormData(prev => ({
          ...prev,
          rutFile: file,
          rutPreview: reader.result
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          cedulaFile: file,
          cedulaPreview: reader.result
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type) => {
    if (type === 'rut') {
      setFormData(prev => ({ ...prev, rutFile: null, rutPreview: null }));
    } else {
      setFormData(prev => ({ ...prev, cedulaFile: null, cedulaPreview: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.email.trim()) newErrors.email = 'Email requerido';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password) newErrors.password = 'Contraseña requerida';
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Teléfono requerido';
    if (!formData.businessName.trim()) newErrors.businessName = 'Nombre del negocio requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Descripción requerida';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';
    if (!formData.businessPhone.trim()) newErrors.businessPhone = 'Teléfono del negocio requerido';
    if (!formData.hours.trim()) newErrors.hours = 'Horario requerido';
    if (!formData.rutFile) newErrors.rut = 'RUT es obligatorio';
    if (!formData.cedulaFile) newErrors.cedula = 'Cédula es obligatoria';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);

    try {
      const registration = {
        ...formData,
        rutFile: formData.rutPreview,
        cedulaFile: formData.cedulaPreview,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      const pendingRegistrations = JSON.parse(
        localStorage.getItem('pending_business_registrations') || '[]'
      );
      pendingRegistrations.push(registration);
      localStorage.setItem('pending_business_registrations', JSON.stringify(pendingRegistrations));

      setStep(3);
    } catch (error) {
      alert('❌ Error al enviar solicitud: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                      step > s ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 font-medium">
            <span>Información</span>
            <span>Documentos</span>
            <span>Confirmación</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Registro de Comercio
              </h2>
              <p className="text-gray-600 mb-6">
                Completa tus datos personales y de tu negocio
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <User size={20} className="text-emerald-600" />
                    Datos Personales
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Juan Pérez"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="tu@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Mínimo 6 caracteres"
                      />
                      {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar Contraseña *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Repite la contraseña"
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono Personal *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="310 555 1234"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Store size={20} className="text-emerald-600" />
                    Datos del Negocio
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Negocio *
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.businessName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Restaurante El Sabor"
                      />
                      {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoría *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition-colors"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Detalles y Documentación
              </h2>
              <p className="text-gray-600 mb-6">
                Completa la información de tu negocio y sube los documentos requeridos
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-emerald-600" />
                    Información del Local
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Describe tu negocio"
                      />
                      {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Calle 5 #10-20"
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="businessPhone"
                          value={formData.businessPhone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                            errors.businessPhone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="315 444 5555"
                        />
                        {errors.businessPhone && <p className="text-red-500 text-xs mt-1">{errors.businessPhone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Horario *
                        </label>
                        <input
                          type="text"
                          name="hours"
                          value={formData.hours}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 ${
                            errors.hours ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="8:00 AM - 6:00 PM"
                        />
                        {errors.hours && <p className="text-red-500 text-xs mt-1">{errors.hours}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText size={20} className="text-emerald-600" />
                    Documentos Requeridos
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* RUT */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        RUT *
                      </label>
                      {!formData.rutFile ? (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <Upload className="text-gray-400 mb-2" size={32} />
                          <span className="text-sm text-gray-500">Subir RUT</span>
                          <span className="text-xs text-gray-400">JPG, PNG o PDF</span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleFileUpload(e, 'rut')}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="relative border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50">
                          <button
                            onClick={() => removeFile('rut')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                          <CheckCircle className="text-emerald-600 mb-2" size={32} />
                          <p className="text-sm font-medium text-emerald-800">RUT cargado</p>
                          <p className="text-xs text-emerald-600">{formData.rutFile.name}</p>
                        </div>
                      )}
                      {errors.rut && <p className="text-red-500 text-xs mt-1">{errors.rut}</p>}
                    </div>

                    {/* Cédula */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cédula *
                      </label>
                      {!formData.cedulaFile ? (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <Upload className="text-gray-400 mb-2" size={32} />
                          <span className="text-sm text-gray-500">Subir Cédula</span>
                          <span className="text-xs text-gray-400">JPG, PNG o PDF</span>
                          <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={(e) => handleFileUpload(e, 'cedula')}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="relative border-2 border-emerald-500 rounded-lg p-4 bg-emerald-50">
                          <button
                            onClick={() => removeFile('cedula')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X size={16} />
                          </button>
                          <CheckCircle className="text-emerald-600 mb-2" size={32} />
                          <p className="text-sm font-medium text-emerald-800">Cédula cargada</p>
                          <p className="text-xs text-emerald-600">{formData.cedulaFile.name}</p>
                        </div>
                      )}
                      {errors.cedula && <p className="text-red-500 text-xs mt-1">{errors.cedula}</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-bold"
                >
                  ← Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} className="text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¡Solicitud Enviada!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Tu solicitud de registro ha sido recibida. Revisaremos tu información y documentos en las próximas 24-48 horas.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  📧 Te enviaremos un email a <strong>{formData.email}</strong> con el estado de tu solicitud.
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/#/'}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
              >
                Volver al Inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
