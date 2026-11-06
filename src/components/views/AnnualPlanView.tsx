import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Trash2, 
  Paperclip, 
  FileText,
  User,
  Sliders
} from 'lucide-react';
import { PlanActivity, ActivityStatus, CompanySettings, UserProfile } from '../../types';
import { downloadWorkPlanPdf } from '../../utils/pdfGenerator';

interface AnnualPlanViewProps {
  activities: PlanActivity[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddActivity: (act: PlanActivity) => void;
  onUpdateActivity: (act: PlanActivity) => void;
  onDeleteActivity: (id: string) => void;
}

export const AnnualPlanView: React.FC<AnnualPlanViewProps> = ({
  activities,
  company,
  currentUser,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterArea, setFilterArea] = useState<string>('all');
  const [filterResponsible, setFilterResponsible] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<PlanActivity | null>(null);

  const todayStr = new Date().toISOString().substring(0, 10);

  // Form State
  const [formActivity, setFormActivity] = useState<Partial<PlanActivity>>({
    code: '',
    name: '',
    description: '',
    objective: '',
    responsible: currentUser.name,
    startDate: todayStr,
    deadlineDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    resources: '',
    status: 'programada',
    progress: 0,
    area: 'Operaciones Jurídicas y Financieras',
    observations: '',
    evidences: [],
  });

  const areas = [
    'Toda la empresa',
    'Operaciones Jurídicas y Financieras',
    'Área Jurídica',
    'Gestión Humana y Asesores',
    'Dirección General',
    'Edificio Poblado Piso 6',
  ];

  const responsibles = Array.from(new Set(activities.map(a => a.responsible)));

  // Filter activities
  const filtered = activities.filter((act) => {
    const matchesSearch = 
      act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.responsible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || act.status === filterStatus;
    const matchesArea = filterArea === 'all' || act.area === filterArea;
    const matchesResponsible = filterResponsible === 'all' || act.responsible === filterResponsible;
    return matchesSearch && matchesStatus && matchesArea && matchesResponsible;
  });

  const handleOpenCreate = () => {
    setEditingActivity(null);
    setFormActivity({
      code: `PAT-2026-0${activities.length + 1}`,
      name: '',
      description: '',
      objective: '',
      responsible: currentUser.name,
      startDate: todayStr,
      deadlineDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      resources: '',
      status: 'programada',
      progress: 0,
      area: 'Toda la empresa',
      observations: '',
      evidences: [],
    });
    setShowModal(true);
  };

  const handleOpenEdit = (act: PlanActivity) => {
    setEditingActivity(act);
    setFormActivity({ ...act });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formActivity.name || !formActivity.objective) return;

    if (editingActivity) {
      const updated: PlanActivity = {
        ...editingActivity,
        ...formActivity as PlanActivity,
        closeDate: formActivity.status === 'completada' ? (formActivity.closeDate || todayStr) : undefined,
      };
      onUpdateActivity(updated);
    } else {
      const created: PlanActivity = {
        id: `act-${Date.now()}`,
        code: formActivity.code || `PAT-${Date.now().toString().slice(-4)}`,
        name: formActivity.name || '',
        description: formActivity.description || '',
        objective: formActivity.objective || '',
        responsible: formActivity.responsible || currentUser.name,
        startDate: formActivity.startDate || todayStr,
        deadlineDate: formActivity.deadlineDate || todayStr,
        resources: formActivity.resources || 'Recursos ordinarios',
        status: (formActivity.status as ActivityStatus) || 'programada',
        progress: Number(formActivity.progress) || 0,
        area: formActivity.area || 'Toda la empresa',
        evidences: formActivity.evidences || [],
        observations: formActivity.observations || '',
        closeDate: formActivity.status === 'completada' ? todayStr : undefined,
      };
      onAddActivity(created);
    }
    setShowModal(false);
  };

  const statusColors: Record<ActivityStatus, { bg: string; text: string; border: string }> = {
    programada: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
    en_ejecucion: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    completada: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' },
    retrasada: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' },
    cancelada: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  };

  const canEdit = ['admin', 'responsable_sst', 'jefe_area'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <Calendar className="w-3.5 h-3.5" />
            Plan Anual de Trabajo (PAT 2026)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Plan Anual de Trabajo del <span className="text-emerald-400">SG-SST</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Programación y control de actividades conforme al Decreto 1072 de 2015 art. 2.2.4.6.8 numeral 7. Alertas tempranas por vencimiento y seguimiento continuo a responsables.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 self-start md:self-center">
          <button
            onClick={() => downloadWorkPlanPdf(activities, company)}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-600 transition-colors shadow"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar PAT (PDF)</span>
          </button>

          {canEdit && (
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Actividad</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row gap-3 items-center justify-between">
        
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar actividad o responsable..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros:</span>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="programada">Programada</option>
            <option value="en_ejecucion">En ejecución</option>
            <option value="completada">Completada</option>
            <option value="retrasada">Retrasada</option>
            <option value="cancelada">Cancelada</option>
          </select>

          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none"
          >
            <option value="all">Todas las áreas</option>
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>

          <select
            value={filterResponsible}
            onChange={(e) => setFilterResponsible(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none"
          >
            <option value="all">Todos los responsables</option>
            {responsibles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Activities Cards / Table */}
      <div className="space-y-4">
        {filtered.map((act) => {
          const isOverdue = (act.status === 'programada' || act.status === 'en_ejecucion') && act.deadlineDate < todayStr;
          const statusStyle = statusColors[act.status];

          return (
            <div 
              key={act.id} 
              className={`bg-white rounded-2xl p-5 border transition-all shadow-sm hover:shadow-md ${
                isOverdue ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {act.code}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{act.area}</span>
                    {isOverdue && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300 animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> ¡ACTIVIDAD RETRASADA!
                      </span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{act.name}</h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                    {act.status.toUpperCase().replace('_', ' ')}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-800">{act.progress}%</span>
                    <div className="text-[10px] text-slate-400">Avance</div>
                  </div>
                </div>
              </div>

              {/* Details Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 text-xs text-slate-600">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block text-[10px]">OBJETIVO</span>
                  <p className="text-slate-700 leading-relaxed">{act.objective}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block text-[10px]">RESPONSABLE Y RECURSOS</span>
                  <p className="font-semibold text-slate-800">{act.responsible}</p>
                  <p className="text-[11px] text-slate-500">{act.resources}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block text-[10px]">CRONOGRAMA</span>
                  <p><span className="text-slate-500">Inicio:</span> {act.startDate}</p>
                  <p><span className="text-slate-500">Límite:</span> <strong className={isOverdue ? 'text-rose-600' : 'text-slate-800'}>{act.deadlineDate}</strong></p>
                  {act.closeDate && <p><span className="text-emerald-600 font-semibold">Cerrada el:</span> {act.closeDate}</p>}
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden my-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    act.progress === 100 ? 'bg-emerald-500' : (act.progress > 0 ? 'bg-blue-600' : 'bg-slate-300')
                  }`}
                  style={{ width: `${act.progress}%` }}
                />
              </div>

              {/* Observations & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="text-slate-500 text-[11px]">
                  <strong>Observaciones:</strong> {act.observations || 'Sin observaciones adicionales.'}
                </div>

                {canEdit && (
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenEdit(act)}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Deseas eliminar la actividad ${act.code}?`)) {
                          onDeleteActivity(act.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Eliminar actividad"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingActivity ? `Editar Actividad ${editingActivity.code}` : 'Crear Nueva Actividad del PAT'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código de Actividad</label>
                  <input
                    type="text"
                    required
                    value={formActivity.code}
                    onChange={(e) => setFormActivity({ ...formActivity, code: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área o Proceso</label>
                  <select
                    value={formActivity.area}
                    onChange={(e) => setFormActivity({ ...formActivity, area: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre de la Actividad</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Medición de Ruido e Iluminación en Salas Jurídicas"
                  value={formActivity.name}
                  onChange={(e) => setFormActivity({ ...formActivity, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Objetivo de la Actividad</label>
                <textarea
                  rows={2}
                  required
                  placeholder="¿Qué meta o resultado busca alcanzar esta actividad en el SG-SST?..."
                  value={formActivity.objective}
                  onChange={(e) => setFormActivity({ ...formActivity, objective: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsable</label>
                  <input
                    type="text"
                    required
                    value={formActivity.responsible}
                    onChange={(e) => setFormActivity({ ...formActivity, responsible: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Recursos Necesarios</label>
                  <input
                    type="text"
                    placeholder="Equipos, asesoría ARL, presupuesto..."
                    value={formActivity.resources}
                    onChange={(e) => setFormActivity({ ...formActivity, resources: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Inicio</label>
                  <input
                    type="date"
                    required
                    value={formActivity.startDate}
                    onChange={(e) => setFormActivity({ ...formActivity, startDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha Límite</label>
                  <input
                    type="date"
                    required
                    value={formActivity.deadlineDate}
                    onChange={(e) => setFormActivity({ ...formActivity, deadlineDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estado de Ejecución</label>
                  <select
                    value={formActivity.status}
                    onChange={(e) => setFormActivity({ ...formActivity, status: e.target.value as ActivityStatus })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="programada">Programada</option>
                    <option value="en_ejecucion">En ejecución</option>
                    <option value="completada">Completada</option>
                    <option value="retrasada">Retrasada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Porcentaje de Avance: {formActivity.progress}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={formActivity.progress}
                    onChange={(e) => setFormActivity({ ...formActivity, progress: Number(e.target.value) })}
                    className="w-full mt-2 accent-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Observaciones / Evidencias</label>
                <textarea
                  rows={2}
                  placeholder="Detalles sobre actas de reunión, avances, dificultades..."
                  value={formActivity.observations}
                  onChange={(e) => setFormActivity({ ...formActivity, observations: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
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
                  {editingActivity ? 'Guardar Cambios' : 'Registrar Actividad'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
