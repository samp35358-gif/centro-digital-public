import React, { useState } from 'react';
import { 
  HeartPulse, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Clock, 
  FileText,
  Camera
} from 'lucide-react';
import { IncidentReport, EventType, CompanySettings, UserProfile } from '../../types';
import { downloadIncidentReportPdf } from '../../utils/pdfGenerator';

interface IncidentsViewProps {
  incidents: IncidentReport[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddIncident: (inc: IncidentReport) => void;
  onUpdateIncident: (inc: IncidentReport) => void;
}

export const IncidentsView: React.FC<IncidentsViewProps> = ({
  incidents,
  company,
  currentUser,
  onAddIncident,
  onUpdateIncident,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null);

  // New Report Form
  const [newIncident, setNewIncident] = useState<Partial<IncidentReport>>({
    code: '',
    eventType: 'incidente',
    date: new Date().toISOString().substring(0, 10),
    time: '10:00 AM',
    location: 'Sede Principal Poblado - Piso 6',
    area: 'Área Jurídica',
    description: '',
    involvedPerson: {
      name: 'Colaborador Administrativo',
      idNumber: 'CC **********',
      position: 'Asesor',
    },
    immediateCauses: '',
    basicCauses: '',
    consequences: 'Sin consecuencias físicas graves',
    daysLost: 0,
    caseStatus: 'Abierto',
    reporterName: currentUser.name,
    evidenceFiles: [],
    correctiveMeasures: []
  });

  const filtered = incidents.filter((i) => {
    const matchesSearch = 
      i.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.reporterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || i.eventType === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.description || !newIncident.area) return;

    const incident: IncidentReport = {
      id: `inc-${Date.now()}`,
      code: `INC-2026-${Date.now().toString().slice(-3)}`,
      eventType: (newIncident.eventType as EventType) || 'incidente',
      date: newIncident.date || new Date().toISOString().substring(0, 10),
      time: newIncident.time || '10:00 AM',
      location: newIncident.location || 'Sede Principal',
      area: newIncident.area || 'Oficinas',
      description: newIncident.description || '',
      involvedPerson: {
        name: newIncident.involvedPerson?.name || 'Persona con reserva de datos',
        idNumber: newIncident.involvedPerson?.idNumber || 'CC Protegida',
        position: newIncident.involvedPerson?.position || 'Colaborador',
      },
      immediateCauses: newIncident.immediateCauses || 'En proceso de valoración técnica',
      basicCauses: newIncident.basicCauses || 'En proceso de investigación',
      consequences: newIncident.consequences || 'Sin lesiones incapacitantes',
      daysLost: Number(newIncident.daysLost) || 0,
      evidenceFiles: [],
      investigationTeam: [currentUser.name, company.sstLeaderName],
      correctiveMeasures: [
        {
          id: `cm-${Date.now()}`,
          measure: 'Medida preventiva de contención inmediata',
          responsible: company.sstLeaderName,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
          status: 'Pendiente'
        }
      ],
      followUpDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      caseStatus: 'Abierto',
      reporterName: currentUser.name
    };

    onAddIncident(incident);
    setShowModal(false);
  };

  const eventTypeNames: Record<EventType, { label: string; bg: string; text: string; border: string }> = {
    accidente_grave: { label: 'Accidente Grave', bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300' },
    accidente_leve: { label: 'Accidente Leve', bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' },
    incidente: { label: 'Incidente de Trabajo', bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' },
    condicion_insegura: { label: 'Condición Insegura', bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' },
  };

  const canViewPersonalHealthData = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <HeartPulse className="w-3.5 h-3.5" />
            Resolución 1401 de 2007 (Investigación de Accidentes e Incidentes)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Accidentes, Incidentes y <span className="text-emerald-400">Condiciones Inseguras</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Reporte oportuno y árbol de causas para la prevención de recurrencias. Custodia estricta de datos personales de salud según la Ley 1581 de 2012.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Reportar Evento o Condición</span>
        </button>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-slate-500" />
          <span>
            <strong>Protección de Datos Personales (Habeas Data): </strong>
            La información médica o de lesiones personales se mantiene bajo reserva exclusiva del Responsable SST y el Comité Investigador.
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border text-slate-600">
          Rol actual: {currentUser.role}
        </span>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por código, descripción o área..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none w-full md:w-auto"
        >
          <option value="all">Todos los tipos de eventos</option>
          <option value="accidente_grave">Accidente Grave</option>
          <option value="accidente_leve">Accidente Leve</option>
          <option value="incidente">Incidente de Trabajo</option>
          <option value="condicion_insegura">Condición Insegura</option>
        </select>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const typeStyle = eventTypeNames[item.eventType];

          return (
            <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border">
                    {item.code}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${typeStyle.bg} ${typeStyle.text} ${typeStyle.border}`}>
                    {typeStyle.label}
                  </span>
                  <span className="text-xs text-slate-400">{item.date} a las {item.time}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    item.caseStatus === 'Cerrado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.caseStatus.toUpperCase()}
                  </span>
                  <button
                    onClick={() => downloadIncidentReportPdf(item, company)}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Informe PDF (Res. 1401)</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs">
                <span className="text-slate-400 font-bold block text-[10px]">DESCRIPCIÓN DEL EVENTO</span>
                <p className="text-slate-800 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {item.description}
                </p>
              </div>

              {/* Person Involved with Privacy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">LUGAR Y ÁREA</span>
                  <span className="text-slate-700">{item.location} ({item.area})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">PERSONA INVOLUCRADA</span>
                  {canViewPersonalHealthData ? (
                    <span className="text-slate-800 font-semibold">{item.involvedPerson.name} ({item.involvedPerson.position})</span>
                  ) : (
                    <span className="text-slate-400 italic flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Datos personales protegidos (Ley 1581)
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">INCAPACIDAD ESTIMADA</span>
                  <span className="text-slate-700">{item.daysLost} días perdidos</span>
                </div>
              </div>

              {/* Corrective measures */}
              {item.correctiveMeasures && item.correctiveMeasures.length > 0 && (
                <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                  <span className="text-slate-400 font-bold block text-[10px]">PLAN DE ACCIÓN Y MEDIDAS CORRECTIVAS:</span>
                  {item.correctiveMeasures.map((cm) => (
                    <div key={cm.id} className="flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/50">
                      <span className="text-slate-700">• {cm.measure} (Resp: {cm.responsible})</span>
                      <span className="font-bold text-emerald-700">{cm.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Reportar Incidente, Accidente o Condición Insegura</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Evento</label>
                  <select
                    value={newIncident.eventType}
                    onChange={(e) => setNewIncident({ ...newIncident, eventType: e.target.value as EventType })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="incidente">Incidente de Trabajo (Casi-accidente)</option>
                    <option value="condicion_insegura">Condición Insegura Locativa</option>
                    <option value="accidente_leve">Accidente Leve</option>
                    <option value="accidente_grave">Accidente Grave</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área de Trabajo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Pasillo Jurídico, Cafetería, Archivo"
                    value={newIncident.area}
                    onChange={(e) => setNewIncident({ ...newIncident, area: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newIncident.date}
                    onChange={(e) => setNewIncident({ ...newIncident, date: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hora</label>
                  <input
                    type="text"
                    placeholder="10:30 AM"
                    value={newIncident.time}
                    onChange={(e) => setNewIncident({ ...newIncident, time: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lugar Exacto</label>
                  <input
                    type="text"
                    value={newIncident.location}
                    onChange={(e) => setNewIncident({ ...newIncident, location: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción Detallada del Suceso</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Relate con precisión qué ocurrió, cómo ocurrió y qué elementos estaban presentes..."
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Posibles Causas Inmediatas</label>
                  <input
                    type="text"
                    placeholder="Piso resbaloso, cable suelto..."
                    value={newIncident.immediateCauses}
                    onChange={(e) => setNewIncident({ ...newIncident, immediateCauses: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Días de Incapacidad (si hubo)</label>
                  <input
                    type="number"
                    min="0"
                    value={newIncident.daysLost}
                    onChange={(e) => setNewIncident({ ...newIncident, daysLost: Number(e.target.value) })}
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
                  Registrar Reporte Oficial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
