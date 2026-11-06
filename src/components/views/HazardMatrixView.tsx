import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  Info, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  Sliders
} from 'lucide-react';
import { HazardRiskItem, HazardCategory, CompanySettings, UserProfile } from '../../types';
import { downloadHazardMatrixPdf } from '../../utils/pdfGenerator';

interface HazardMatrixViewProps {
  hazards: HazardRiskItem[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddHazard: (item: HazardRiskItem) => void;
  onUpdateHazard: (item: HazardRiskItem) => void;
  onDeleteHazard: (id: string) => void;
}

export const HazardMatrixView: React.FC<HazardMatrixViewProps> = ({
  hazards,
  company,
  currentUser,
  onAddHazard,
  onUpdateHazard,
  onDeleteHazard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterAcceptability, setFilterAcceptability] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingHazard, setEditingHazard] = useState<HazardRiskItem | null>(null);

  // Form State
  const [formHazard, setFormHazard] = useState<Partial<HazardRiskItem>>({
    code: '',
    area: 'Área Jurídica y Financiera',
    process: 'Gestión Operativa',
    activity: '',
    routine: true,
    hazardCategory: 'Biomecánico',
    hazardDescription: '',
    possibleEffects: '',
    exposedWorkersCount: 15,
    existingControls: {
      source: '',
      medium: '',
      individual: ''
    },
    evaluation: {
      deficiencyLevel: 6,
      exposureLevel: 3,
      probabilityLevel: 18,
      probabilityInterpretation: 'Alta',
      consequenceLevel: 25,
      riskLevel: 450,
      acceptability: 'Aceptable con Control Específico'
    },
    interventionMeasures: {
      elimination: 'No viable por naturaleza del cargo',
      substitution: '',
      engineering: '',
      administrative: '',
      epp: ''
    },
    responsible: company.sstLeaderName,
    followUpDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    status: 'En proceso'
  });

  const categories: HazardCategory[] = [
    'Biomecánico',
    'Psicosocial',
    'Condiciones de Seguridad',
    'Físico',
    'Químico',
    'Biológico',
    'Fenómenos Naturales'
  ];

  const filtered = hazards.filter((h) => {
    const matchesSearch = 
      h.hazardDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.activity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || h.hazardCategory === filterCategory;
    const matchesAcceptability = filterAcceptability === 'all' || h.evaluation.acceptability === filterAcceptability;
    return matchesSearch && matchesCategory && matchesAcceptability;
  });

  // Calculate GTC 45 Risk Level
  const calculateRisk = (nd: number, ne: number, nc: number) => {
    const np = nd * ne;
    let npText = 'Baja';
    if (np >= 24) npText = 'Muy Alta';
    else if (np >= 10) npText = 'Alta';
    else if (np >= 6) npText = 'Media';

    const nr = np * nc;
    let acceptability: 'No Aceptable' | 'Aceptable con Control Específico' | 'Aceptable' = 'Aceptable';
    if (nr >= 600) acceptability = 'No Aceptable';
    else if (nr >= 120) acceptability = 'Aceptable con Control Específico';

    return { np, npText, nr, acceptability };
  };

  const handleOpenCreate = () => {
    setEditingHazard(null);
    const { np, npText, nr, acceptability } = calculateRisk(6, 3, 25);
    setFormHazard({
      code: `PEL-${Date.now().toString().slice(-4)}`,
      area: 'Operaciones Jurídicas y Negociación',
      process: 'Asesoría al Cliente',
      activity: '',
      routine: true,
      hazardCategory: 'Biomecánico',
      hazardDescription: '',
      possibleEffects: '',
      exposedWorkersCount: 12,
      existingControls: { source: '', medium: '', individual: '' },
      evaluation: {
        deficiencyLevel: 6,
        exposureLevel: 3,
        probabilityLevel: np,
        probabilityInterpretation: npText,
        consequenceLevel: 25,
        riskLevel: nr,
        acceptability
      },
      interventionMeasures: {
        elimination: '',
        substitution: '',
        engineering: '',
        administrative: '',
        epp: ''
      },
      responsible: company.sstLeaderName,
      followUpDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      status: 'En proceso'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (h: HazardRiskItem) => {
    setEditingHazard(h);
    setFormHazard({ ...h });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHazard.hazardDescription || !formHazard.activity) return;

    const nd = Number(formHazard.evaluation?.deficiencyLevel) || 2;
    const ne = Number(formHazard.evaluation?.exposureLevel) || 2;
    const nc = Number(formHazard.evaluation?.consequenceLevel) || 25;
    const { np, npText, nr, acceptability } = calculateRisk(nd, ne, nc);

    const fullEvaluation = {
      deficiencyLevel: nd,
      exposureLevel: ne,
      probabilityLevel: np,
      probabilityInterpretation: npText,
      consequenceLevel: nc,
      riskLevel: nr,
      acceptability
    };

    if (editingHazard) {
      const updated: HazardRiskItem = {
        ...editingHazard,
        ...formHazard as HazardRiskItem,
        evaluation: fullEvaluation,
      };
      onUpdateHazard(updated);
    } else {
      const created: HazardRiskItem = {
        id: `haz-${Date.now()}`,
        code: formHazard.code || `PEL-${Date.now().toString().slice(-4)}`,
        area: formHazard.area || 'Oficinas',
        process: formHazard.process || 'Administrativo',
        activity: formHazard.activity || '',
        routine: !!formHazard.routine,
        hazardCategory: (formHazard.hazardCategory as HazardCategory) || 'Biomecánico',
        hazardDescription: formHazard.hazardDescription || '',
        possibleEffects: formHazard.possibleEffects || '',
        exposedWorkersCount: Number(formHazard.exposedWorkersCount) || 1,
        existingControls: formHazard.existingControls || { source: '', medium: '', individual: '' },
        evaluation: fullEvaluation,
        interventionMeasures: formHazard.interventionMeasures || { elimination: '', substitution: '', engineering: '', administrative: '', epp: '' },
        responsible: formHazard.responsible || company.sstLeaderName,
        followUpDate: formHazard.followUpDate || '',
        status: (formHazard.status as any) || 'En proceso'
      };
      onAddHazard(created);
    }
    setShowModal(false);
  };

  const canEdit = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <ShieldAlert className="w-3.5 h-3.5" />
            Matriz de Peligros y Riesgos (GTC 45)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Identificación de Peligros y Evaluación de <span className="text-emerald-400">Riesgos</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Metodología GTC 45 adaptada a las actividades jurídicas, financieras y de oficina de Data Integral S.A.S. en Medellín. Jerarquía de controles y seguimiento periódico.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 self-start md:self-center">
          <button
            onClick={() => downloadHazardMatrixPdf(hazards, company)}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-600 transition-colors shadow"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar Matriz GTC 45 (PDF)</span>
          </button>

          {canEdit && (
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Peligro</span>
            </button>
          )}
        </div>
      </div>

      {/* Office Hazards Context Banner */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 text-xs text-blue-950">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <strong className="block text-sm font-bold text-blue-900">Enfoque de Riesgos de Oficina en Data Integral:</strong>
          <p className="leading-relaxed text-blue-800">
            Para una firma de asesoría legal y negociación de deudas bancarias, los peligros prioritarios son <strong>Biomecánicos</strong> (posturas prolongadas en pantallas, digitación de expedientes), <strong>Psicosociales</strong> (atención de usuarios en cobros judiciales, metas de acuerdos financieros), <strong>Locativos y Eléctricos</strong> (cableado de equipos informáticos, iluminación y ventilación en Medellín), y <strong>Seguridad de la Información</strong>.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por peligro, actividad o área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none"
          >
            <option value="all">Todas las clasificaciones</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={filterAcceptability}
            onChange={(e) => setFilterAcceptability(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none"
          >
            <option value="all">Toda aceptabilidad</option>
            <option value="Aceptable">Aceptable</option>
            <option value="Aceptable con Control Específico">Aceptable con Control Específico</option>
            <option value="No Aceptable">No Aceptable</option>
          </select>
        </div>
      </div>

      {/* Hazards Cards List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isHigh = item.evaluation.acceptability === 'No Aceptable';
          const isMedium = item.evaluation.acceptability === 'Aceptable con Control Específico';

          return (
            <div 
              key={item.id}
              className={`bg-white rounded-2xl p-6 border transition-all shadow-sm hover:shadow-md ${
                isHigh ? 'border-rose-300 bg-rose-50/15' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {item.code}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.hazardCategory}
                    </span>
                    <span className="text-xs text-slate-500">Área: {item.area} · Proceso: {item.process}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{item.hazardDescription}</h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Nivel de Riesgo (NR)</div>
                    <span className="text-xl font-black text-slate-900">{item.evaluation.riskLevel}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    isHigh ? 'bg-rose-100 text-rose-800 border-rose-300' : (isMedium ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300')
                  }`}>
                    {item.evaluation.acceptability}
                  </span>
                </div>
              </div>

              {/* Grid with GTC 45 Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 text-xs">
                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 font-bold block text-[10px]">ACTIVIDAD Y CONSECUENCIAS</span>
                  <p className="font-semibold text-slate-800">{item.activity}</p>
                  <p className="text-slate-600"><strong>Posibles efectos:</strong> {item.possibleEffects}</p>
                  <p className="text-slate-500"><strong>Expuestos:</strong> {item.exposedWorkersCount} trabajadores</p>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 font-bold block text-[10px]">CONTROLES EXISTENTES</span>
                  <p><strong className="text-slate-700">Fuente:</strong> {item.existingControls.source || 'Sin control específico'}</p>
                  <p><strong className="text-slate-700">Medio:</strong> {item.existingControls.medium || 'Sin control específico'}</p>
                  <p><strong className="text-slate-700">Individuo:</strong> {item.existingControls.individual || 'Capacitación'}</p>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 font-bold block text-[10px]">MEDIDAS DE INTERVENCIÓN PROPUESTAS</span>
                  <p><strong className="text-slate-700">Admin:</strong> {item.interventionMeasures.administrative || 'N/A'}</p>
                  <p><strong className="text-slate-700">Ingeniería:</strong> {item.interventionMeasures.engineering || 'N/A'}</p>
                  <p><strong className="text-slate-700">EPP:</strong> {item.interventionMeasures.epp || 'N/A'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Responsable de seguimiento:</span> {item.responsible} · 
                  <span className="ml-1 font-semibold text-slate-700">Próx. Seguimiento:</span> {item.followUpDate} · 
                  <span className="ml-1 font-semibold text-emerald-700">Estado: {item.status}</span>
                </div>

                {canEdit && (
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded-lg font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Deseas eliminar el registro del peligro ${item.code}?`)) {
                          onDeleteHazard(item.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Eliminar registro"
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

      {/* CREATE / EDIT HAZARD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingHazard ? `Editar Peligro ${editingHazard.code}` : 'Identificar y Valorar Nuevo Peligro (GTC 45)'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código</label>
                  <input
                    type="text"
                    required
                    value={formHazard.code}
                    onChange={(e) => setFormHazard({ ...formHazard, code: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Clasificación</label>
                  <select
                    value={formHazard.hazardCategory}
                    onChange={(e) => setFormHazard({ ...formHazard, hazardCategory: e.target.value as HazardCategory })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Personas Expuestas</label>
                  <input
                    type="number"
                    value={formHazard.exposedWorkersCount}
                    onChange={(e) => setFormHazard({ ...formHazard, exposedWorkersCount: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área o Proceso</label>
                  <input
                    type="text"
                    required
                    value={formHazard.area}
                    onChange={(e) => setFormHazard({ ...formHazard, area: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Actividad Desarrollada</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Digitación de acuerdos de pago y tutelas"
                    value={formHazard.activity}
                    onChange={(e) => setFormHazard({ ...formHazard, activity: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción del Peligro</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Detalle la condición o fuente peligrosa..."
                  value={formHazard.hazardDescription}
                  onChange={(e) => setFormHazard({ ...formHazard, hazardDescription: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Posibles Consecuencias en la Salud</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Síndrome del túnel carpiano, fatiga visual, cefalea..."
                  value={formHazard.possibleEffects}
                  onChange={(e) => setFormHazard({ ...formHazard, possibleEffects: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              {/* GTC 45 Values */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Valoración Metodológica GTC 45:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Nivel de Deficiencia (ND)</label>
                    <select
                      value={formHazard.evaluation?.deficiencyLevel}
                      onChange={(e) => setFormHazard({
                        ...formHazard,
                        evaluation: { ...formHazard.evaluation!, deficiencyLevel: Number(e.target.value) }
                      })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      <option value="2">Bajo (2)</option>
                      <option value="6">Medio (6)</option>
                      <option value="10">Muy Alto (10)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Nivel de Exposición (NE)</label>
                    <select
                      value={formHazard.evaluation?.exposureLevel}
                      onChange={(e) => setFormHazard({
                        ...formHazard,
                        evaluation: { ...formHazard.evaluation!, exposureLevel: Number(e.target.value) }
                      })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      <option value="1">Esporádica (1)</option>
                      <option value="2">Ocasional (2)</option>
                      <option value="3">Frecuente (3)</option>
                      <option value="4">Continua (4)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-600 block mb-1">Nivel de Consecuencia (NC)</label>
                    <select
                      value={formHazard.evaluation?.consequenceLevel}
                      onChange={(e) => setFormHazard({
                        ...formHazard,
                        evaluation: { ...formHazard.evaluation!, consequenceLevel: Number(e.target.value) }
                      })}
                      className="w-full p-2 border border-slate-300 rounded-lg"
                    >
                      <option value="10">Leve (10)</option>
                      <option value="25">Grave (25)</option>
                      <option value="60">Muy Grave (60)</option>
                      <option value="100">Mortal / Catastrófico (100)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Interventions */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Controles de Ingeniería</label>
                  <input
                    type="text"
                    placeholder="Soportes graduables, aislantes..."
                    value={formHazard.interventionMeasures?.engineering}
                    onChange={(e) => setFormHazard({
                      ...formHazard,
                      interventionMeasures: { ...formHazard.interventionMeasures!, engineering: e.target.value }
                    })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Controles Administrativos</label>
                  <input
                    type="text"
                    placeholder="Pausas activas, capacitaciones..."
                    value={formHazard.interventionMeasures?.administrative}
                    onChange={(e) => setFormHazard({
                      ...formHazard,
                      interventionMeasures: { ...formHazard.interventionMeasures!, administrative: e.target.value }
                    })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsable</label>
                  <input
                    type="text"
                    required
                    value={formHazard.responsible}
                    onChange={(e) => setFormHazard({ ...formHazard, responsible: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Seguimiento</label>
                  <input
                    type="date"
                    required
                    value={formHazard.followUpDate}
                    onChange={(e) => setFormHazard({ ...formHazard, followUpDate: e.target.value })}
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
                  {editingHazard ? 'Guardar Cambios' : 'Registrar Peligro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
