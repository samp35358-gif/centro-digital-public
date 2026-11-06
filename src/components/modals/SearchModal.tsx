import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Calendar, ShieldAlert, GraduationCap, AlertTriangle, ArrowRight } from 'lucide-react';
import { PlanActivity, HazardRiskItem, DocumentRecord, TrainingCourse, IncidentReport, MainTab, SubModule } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: PlanActivity[];
  hazards: HazardRiskItem[];
  documents: DocumentRecord[];
  trainings: TrainingCourse[];
  incidents: IncidentReport[];
  setTab: (tab: MainTab) => void;
  setSubModule: (mod: SubModule) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  activities,
  hazards,
  documents,
  trainings,
  incidents,
  setTab,
  setSubModule,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDocs = q ? documents.filter(d => d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q)) : [];
  const matchedActs = q ? activities.filter(a => a.name.toLowerCase().includes(q) || a.code.toLowerCase().includes(q)) : [];
  const matchedHaz = q ? hazards.filter(h => h.hazardDescription.toLowerCase().includes(q) || h.code.toLowerCase().includes(q)) : [];
  const matchedTrainings = q ? trainings.filter(t => t.name.toLowerCase().includes(q) || t.topic.toLowerCase().includes(q)) : [];
  const matchedIncidents = q ? incidents.filter(i => i.description.toLowerCase().includes(q) || i.code.toLowerCase().includes(q)) : [];

  const totalResults = matchedDocs.length + matchedActs.length + matchedHaz.length + matchedTrainings.length + matchedIncidents.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 sm:pt-24">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input */}
        <div className="relative border-b border-slate-200 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-600" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar documentos, actividades, riesgos, capacitaciones en Data Integral..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm outline-none text-slate-800 placeholder:text-slate-400"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {!q ? (
            <div className="text-center py-10 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p>Escribe una palabra clave para buscar en todo el Centro Digital SGSST</p>
              <p className="text-[11px] text-slate-400 mt-1">Ej: "Política", "Ergonomía", "Extintor", "Sismo", "Accidente"</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-slate-400">
              No se encontraron coincidencias para "{query}".
            </div>
          ) : (
            <div className="space-y-4">
              
              {matchedDocs.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Documentos ({matchedDocs.length})</span>
                  {matchedDocs.map(d => (
                    <div 
                      key={d.id}
                      onClick={() => {
                        setTab('documentacion');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="font-bold text-slate-900">{d.code}</span> - {d.name}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{d.category}</span>
                    </div>
                  ))}
                </div>
              )}

              {matchedActs.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Plan Anual de Trabajo ({matchedActs.length})</span>
                  {matchedActs.map(a => (
                    <div 
                      key={a.id}
                      onClick={() => {
                        setTab('inicio');
                        setSubModule('plan_anual');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-blue-50/50 hover:border-blue-300 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <span className="font-bold text-slate-900">{a.code}</span> - {a.name}
                        </div>
                      </div>
                      <span className="text-[10px] text-blue-700 font-semibold">{a.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {matchedHaz.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Peligros y Riesgos GTC 45 ({matchedHaz.length})</span>
                  {matchedHaz.map(h => (
                    <div 
                      key={h.id}
                      onClick={() => {
                        setTab('inicio');
                        setSubModule('matriz_peligros');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-amber-50/50 hover:border-amber-300 cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        <div>
                          <span className="font-bold text-slate-900">{h.code}</span> - {h.hazardDescription}
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-700 font-semibold">{h.hazardCategory}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-400">
          <span>Búsqueda universal en tiempo real</span>
          <span>Presiona <kbd className="px-1.5 py-0.5 rounded bg-white border">ESC</kbd> para cerrar</span>
        </div>

      </div>
    </div>
  );
};
