import React, { useState, useEffect } from 'react';
import { User, Save, X, Phone, Mail, Building, Shield, Heart } from 'lucide-react';
import { PersonaEquipo } from '../../data/team';

interface EditTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: PersonaEquipo | null;
  onSave: (updated: PersonaEquipo) => void;
}

export const EditTeamMemberModal: React.FC<EditTeamMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onSave,
}) => {
  const [formData, setFormData] = useState<PersonaEquipo | null>(null);

  useEffect(() => {
    if (member) {
      setFormData({ ...member });
    }
  }, [member]);

  if (!isOpen || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Editar Datos de la Persona</h3>
              <p className="text-xs text-slate-500">Actualiza el nombre, cargo o información asociada en la interfaz</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nombre Completo</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-semibold"
              placeholder="Ej: Andrés Felipe Zapata"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Cargo / Puesto de Trabajo</label>
              <input
                type="text"
                required
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ej: Analista Senior"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Área o Departamento</label>
              <input
                type="text"
                required
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ej: Área Jurídica"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="ejemplo@dataintegral.com.co"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teléfono Móvil</label>
              <input
                type="text"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ej: 312 450 9911"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Extensión</label>
              <input
                type="text"
                value={formData.extension}
                onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ej: 104"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Grupo Sanguíneo (RH)</label>
              <input
                type="text"
                value={formData.grupoSanguineo || 'O+'}
                onChange={(e) => setFormData({ ...formData, grupoSanguineo: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none uppercase font-mono"
                placeholder="O+"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Rol en el SG-SST</label>
              <input
                type="text"
                value={formData.rolSST || ''}
                onChange={(e) => setFormData({ ...formData, rolSST: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Ej: Jefe de Brigada"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 font-semibold text-slate-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
