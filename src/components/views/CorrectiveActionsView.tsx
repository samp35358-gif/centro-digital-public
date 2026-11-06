import React, { useState } from 'react';
import { 
  CheckCircle, 
  Plus, 
  Search, 
  AlertTriangle, 
  Clock, 
  Filter, 
  ShieldCheck,
  Edit3,
  CheckCircle2
} from 'lucide-react';
import { CorrectiveAction, CompanySettings, UserProfile } from '../../types';

interface CorrectiveActionsViewProps {
  actions: CorrectiveAction[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddAction: (action: CorrectiveAction) => void;
  onUpdateAction: (action: CorrectiveAction) => void;
}

export const CorrectiveActionsView: React.FC<CorrectiveActionsViewProps> = ({
  actions,
  company,
  currentUser,
  onAddAction,
  onUpdateAction,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  // New Action Form
  const [newAction, setNewAction] = useState<Partial<CorrectiveAction>>({
    origin: 'Inspección',
    findingDescription: '',
    rootCause: '',
    actionDescription: '',
    priority: 'Media',
    responsible: company.sstLeaderName,
    openDate: new Date().toISOString().substring(0, 10),
    deadlineDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    evidence: '',
    status: 'Abierta',
    effectivenessVerified: false
  });

  const filtered = actions.filter(a => {
    const matchesSearch = 
      a.findingDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.actionDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAction.findingDescription || !newAction.actionDescription) return;

    const action: CorrectiveAction = {
      id: `capa-${Date.now()}`,
      code: `ACC-2026-${Date.now().toString().slice(-2)}`,
      origin: (newAction.origin as any) || 'Inspección',
      findingDescription: newAction.findingDescription || '',
      rootCause: newAction.rootCause || 'En análisis de causa raíz (5 Porqués)',
      actionDescription: newAction.actionDescription || '',
      priority: (newAction.priority as any) || 'Media',
      responsible: newAction.responsible || company.sstLeaderName,
      openDate: newAction.openDate || new Date().toISOString().substring(0, 10),
      deadlineDate: newAction.deadlineDate || '',
      evidence: newAction.evidence || 'Evidencia fotográfica y documental en archivo digital',
      status: (newAction.status as any) || 'Abierta',
      effectivenessVerified: !!newAction.effectivenessVerified
    };

    onAddAction(action);
    setShowModal(false);
  };

  const handleToggleClose = (action: CorrectiveAction) => {
    const updated: CorrectiveAction = {
      ...action,
      status: action.status === 'Cerrada' ? 'En Proceso' : 'Cerrada',
      closeDate: action.status === 'Cerrada' ? undefined : new Date().toISOString().substring(0, 10),
      effectivenessVerified: action.status !== 'Cerrada',
      verificationNotes: action.status !== 'Cerrada' ? 'Verificación de eficacia efectuada satisfactoriamente.' : undefined
    };
    onUpdateAction(updated);
  };

  const canEdit = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <CheckCircle className="w-3.5 h-3.5" />
            Mejora Continua (Decreto 1072/2015 Art. 2.2.4.6.33)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Acciones Correctivas y <span className="text-emerald-400">Planes de Mejora</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Gestión de no conformidades derivadas de auditorías, inspecciones, investigaciones de incidentes y revisiones por la dirección de Data Integral.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Abrir Acción de Mejora</span>
          </button>
        )}
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {filtered.map((action) => {
          const isClosed = action.status === 'Cerrada';

          return (
            <div key={action.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border">
                    {action.code}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    Origen: {action.origin}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    action.priority === 'Alta' ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    Prioridad {action.priority}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isClosed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {action.status.toUpperCase()}
                  </span>

                  {canEdit && (
                    <button
                      onClick={() => handleToggleClose(action)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-colors ${
                        isClosed 
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow'
                      }`}
                    >
                      {isClosed ? 'Reabrir' : 'Verificar y Cerrar'}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <strong className="text-slate-800">Hallazgo detectado: </strong>
                <span className="text-slate-600">{action.findingDescription}</span>
              </div>

              <div className="space-y-1 text-xs">
                <strong className="text-slate-800">Causa Raíz Identificada: </strong>
                <span className="text-slate-600 italic">{action.rootCause}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                <strong className="text-slate-900 block mb-1">Plan de Acción / Medida Correctiva:</strong>
                <p className="text-slate-700">{action.actionDescription}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Responsable:</span> {action.responsible} · 
                  <span className="ml-1 font-semibold text-slate-700">Apertura:</span> {action.openDate} · 
                  <span className="ml-1 font-semibold text-slate-700">Límite:</span> {action.deadlineDate}
                  {action.closeDate && <span className="ml-1 font-semibold text-emerald-700">· Cierre: {action.closeDate}</span>}
                </div>

                {action.effectivenessVerified && (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Eficacia Verificada
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Registrar Acción Correctiva o Preventiva</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Origen del Hallazgo</label>
                  <select
                    value={newAction.origin}
                    onChange={(e) => setNewAction({ ...newAction, origin: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Inspección">Inspección de Seguridad</option>
                    <option value="Auditoría">Auditoría Interna / Externa</option>
                    <option value="Investigación Accidente">Investigación de Accidente</option>
                    <option value="Revisión por la Dirección">Revisión por la Alta Dirección</option>
                    <option value="Reporte Trabajador">Reporte de Colaborador</option>
                    <option value="Simulacro">Simulacro de Emergencia</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Prioridad</label>
                  <select
                    value={newAction.priority}
                    onChange={(e) => setNewAction({ ...newAction, priority: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción del Hallazgo / Oportunidad</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detalle la no conformidad observada..."
                  value={newAction.findingDescription}
                  onChange={(e) => setNewAction({ ...newAction, findingDescription: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Causa Raíz Identificada</label>
                <input
                  type="text"
                  required
                  placeholder="¿Por qué ocurrió? (Método de los 5 Porqués)..."
                  value={newAction.rootCause}
                  onChange={(e) => setNewAction({ ...newAction, rootCause: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Acción Correctiva Propuesta</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Qué acción definitiva se implementará para eliminar la causa..."
                  value={newAction.actionDescription}
                  onChange={(e) => setNewAction({ ...newAction, actionDescription: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsable</label>
                  <input
                    type="text"
                    required
                    value={newAction.responsible}
                    onChange={(e) => setNewAction({ ...newAction, responsible: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha Límite</label>
                  <input
                    type="date"
                    required
                    value={newAction.deadlineDate}
                    onChange={(e) => setNewAction({ ...newAction, deadlineDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                >
                  Registrar Acción de Mejora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
