import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Edit3, 
  Plus, 
  Search, 
  Shield, 
  Phone, 
  Mail, 
  Building, 
  Trash2,
  Eye,
  GitBranch,
  Layers,
  MapPin,
  Maximize2
} from 'lucide-react';
import { PersonaEquipo } from '../../data/team';
import { OrganigramaView } from '../OrganigramaView';

interface TeamDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: PersonaEquipo[];
  onEditMember: (member: PersonaEquipo) => void;
  onAddNewMember: () => void;
  onDeleteMember: (id: string) => void;
}

export const TeamDirectoryModal: React.FC<TeamDirectoryModalProps> = ({
  isOpen,
  onClose,
  team,
  onEditMember,
  onAddNewMember,
  onDeleteMember,
}) => {
  const [modalTab, setModalTab] = useState<'organigrama' | 'directorio' | 'grafico'>('organigrama');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSede, setFilterSede] = useState<string>('all');
  const [zoomOriginal, setZoomOriginal] = useState(false);

  if (!isOpen) return null;

  const filtered = team.filter(m => {
    const matchesSearch = 
      m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.sede && m.sede.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSede = filterSede === 'all' || (m.sede && m.sede.toLowerCase().includes(filterSede.toLowerCase()));
    return matchesSearch && matchesSede;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-6xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-amber-400 border border-slate-700 shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Denominado por Cargos
                </span>
                <span className="text-xs text-slate-500 font-medium">20 Puestos Oficiales</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Organigrama y Estructura por Cargos · Data Integral Soluciones S.A.S.
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Selector */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setModalTab('organigrama')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  modalTab === 'organigrama' 
                    ? 'bg-indigo-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Organigrama</span>
              </button>
              <button
                onClick={() => setModalTab('directorio')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  modalTab === 'directorio' 
                    ? 'bg-indigo-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Cargos ({team.length})</span>
              </button>
              <button
                onClick={() => setModalTab('grafico')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  modalTab === 'grafico' 
                    ? 'bg-indigo-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Gráfico Original</span>
              </button>
            </div>

            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* TAB 1: VISUAL ORGANIGRAMA FLOWCHART */}
        {modalTab === 'organigrama' && (
          <div className="flex-1 overflow-y-auto pr-1">
            <OrganigramaView compact={true} onSelectCargo={(cargo) => onEditMember(cargo)} />
          </div>
        )}

        {/* TAB 2: DIRECTORY OF 20 CARGOS */}
        {modalTab === 'directorio' && (
          <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between flex-shrink-0">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar cargo, área o sede..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={filterSede}
                  onChange={(e) => setFilterSede(e.target.value)}
                  className="p-2 border border-slate-300 rounded-xl text-xs bg-white text-slate-700 font-semibold"
                >
                  <option value="all">Todas las Sedes</option>
                  <option value="Sauces">Sede Sauces</option>
                  <option value="Almacentro">Sede Almacentro</option>
                  <option value="Rionegro">Sede Rionegro</option>
                  <option value="Corporativa">Dirección / Corporativa</option>
                </select>

                <button
                  onClick={onAddNewMember}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs whitespace-nowrap"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Cargo</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto space-y-2.5 flex-1 pr-1 text-xs">
              {filtered.map((person) => (
                <div 
                  key={person.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/70 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-900 to-slate-900 text-amber-300 font-extrabold flex items-center justify-center text-xs shadow-xs flex-shrink-0 border border-slate-700">
                      {person.cargo.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm">{person.nombre}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                          {person.cargo}
                        </span>
                        {person.rolSST && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {person.rolSST}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 font-medium text-xs mt-0.5">
                        <span className="font-semibold text-slate-800">{person.area}</span> · <span>{person.sede}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {person.email} · Tel: {person.telefono} (Ext: {person.extension})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => onEditMember(person)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Deseas eliminar el cargo "${person.nombre}"?`)) {
                          onDeleteMember(person.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Eliminar cargo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: ORIGINAL CHART ATTACHMENT */}
        {modalTab === 'grafico' && (
          <div className="flex-1 overflow-y-auto space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
            <div className="flex justify-between items-center text-xs text-slate-300 px-2 pb-2 border-b border-slate-800">
              <span className="font-bold">Imagen Oficial del Organigrama Denominado por Cargos</span>
              <button
                onClick={() => setZoomOriginal(!zoomOriginal)}
                className="inline-flex items-center gap-1.5 bg-slate-800 text-amber-300 px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-700"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{zoomOriginal ? 'Vista Normal' : 'Maximizar'}</span>
              </button>
            </div>
            <div className={`overflow-auto flex justify-center ${zoomOriginal ? 'p-2' : 'max-h-[520px]'}`}>
              <img 
                src="/assets/aistudio/image_fcdc01cf.png" 
                alt="Organigrama Oficial Data Integral Soluciones S.A.S." 
                className={`rounded-xl object-contain ${zoomOriginal ? 'w-full' : 'max-h-[500px]'}`}
              />
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Data Integral Soluciones S.A.S.</span>
            <span>· 3 Sedes Operativas (Sauces, Almacentro, Rionegro)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              Aceptar y Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
