import React, { useState } from 'react';
import { Settings, Upload, Image, Save, X, Building2, Shield } from 'lucide-react';
import { CompanySettings } from '../../types';

interface EditCompanyModalProps {
  company: CompanySettings;
  onSave: (settings: CompanySettings) => void;
  onClose: () => void;
}

export const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  company,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<CompanySettings>({ ...company });
  const [logoPreview, setLogoPreview] = useState<string>(company.logoUrl);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        setFormData({ ...formData, logoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      logoUrl: logoPreview,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Configuración Institucional de Data Integral</h3>
              <p className="text-xs text-slate-500">Personaliza el logo, datos jurídicos y líderes del SG-SST</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Logo Editor */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
              Logo de Data Integral (Editable)
            </span>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white border border-slate-300 flex items-center justify-center overflow-hidden p-1 shadow-xs flex-shrink-0">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xl">
                    di
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold text-xs shadow hover:bg-emerald-700 transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Imagen de Logo</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                  </label>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview('');
                        setFormData({ ...formData, logoUrl: '' });
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-200 text-xs"
                    >
                      Restablecer por defecto
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="O ingresa la URL directa de la imagen..."
                  value={formData.logoUrl}
                  onChange={(e) => {
                    setFormData({ ...formData, logoUrl: e.target.value });
                    setLogoPreview(e.target.value);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Razón Social</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">NIT</label>
              <input
                type="text"
                required
                value={formData.nit}
                onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Ciudad / Departamento</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Total de Colaboradores</label>
              <input
                type="number"
                required
                value={formData.totalEmployees}
                onChange={(e) => setFormData({ ...formData, totalEmployees: Number(e.target.value) })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Dirección Sede Principal</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teléfonos de Contacto</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Correo Electrónico SST</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Representante Legal</label>
              <input
                type="text"
                required
                value={formData.representativeName}
                onChange={(e) => setFormData({ ...formData, representativeName: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Líder Especialista SG-SST</label>
              <input
                type="text"
                required
                value={formData.sstLeaderName}
                onChange={(e) => setFormData({ ...formData, sstLeaderName: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Configuración</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
