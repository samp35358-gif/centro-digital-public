import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Plus, 
  Search, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Clock,
  ShieldCheck,
  FileText,
  Edit3
} from 'lucide-react';
import { OccupationalHealthRecord, CompanySettings, UserProfile } from '../../types';

interface OccupationalHealthViewProps {
  records: OccupationalHealthRecord[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddRecord: (record: OccupationalHealthRecord) => void;
  onUpdateRecord: (record: OccupationalHealthRecord) => void;
}

export const OccupationalHealthView: React.FC<OccupationalHealthViewProps> = ({
  records,
  company,
  currentUser,
  onAddRecord,
  onUpdateRecord,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRec, setEditingRec] = useState<OccupationalHealthRecord | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form State
  const [newRec, setNewRec] = useState<Partial<OccupationalHealthRecord>>({
    workerName: 'Colaborador con ID Protegido',
    workerId: 'EMP-0120',
    position: 'Asistente Jurídico',
    area: 'Área Jurídica',
    examType: 'Periódico',
    examDate: new Date().toISOString().substring(0, 10),
    concept: 'Apto con recomendaciones',
    workRestrictions: 'Ajuste de brillo en pantalla y pausas osteomusculares cada 50 minutos.',
    followUpDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    complianceStatus: 'Cumpliendo recomendaciones'
  });

  const filtered = records.filter(r =>
    r.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.workRestrictions.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const record: OccupationalHealthRecord = {
      id: `occ-${Date.now()}`,
      code: `EXA-2026-${Date.now().toString().slice(-3)}`,
      workerName: newRec.workerName || 'Colaborador',
      workerId: newRec.workerId || 'EMP-0000',
      position: newRec.position || 'Colaborador',
      area: newRec.area || 'Operaciones',
      examType: (newRec.examType as any) || 'Periódico',
      examDate: newRec.examDate || new Date().toISOString().substring(0, 10),
      concept: (newRec.concept as any) || 'Apto sin restricciones',
      workRestrictions: newRec.workRestrictions || 'Ninguna restricción.',
      followUpDate: newRec.followUpDate || '',
      complianceStatus: (newRec.complianceStatus as any) || 'Cumpliendo recomendaciones'
    };

    onAddRecord(record);
    setShowModal(false);
  };

  const isAuthorized = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <HeartHandshake className="w-3.5 h-3.5" />
            Medicina Preventiva y Evaluaciones Ocupacionales (Res. 2346 de 2007)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Control Administrativo de <span className="text-emerald-400">Salud Ocupacional</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Seguimiento a conceptos de aptitud laboral (ingreso, periódico, retiro) y restricciones operativas. Estricto respeto a la reserva legal de historias clínicas (Ley 1581 de 2012).
          </p>
        </div>

        {isAuthorized && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Evaluación Administrativa</span>
          </button>
        )}
      </div>

      {/* Strict Privacy Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-amber-950">
        <Lock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <strong className="block text-sm font-bold text-amber-900">
            Separación de Información Médica Confidencial:
          </strong>
          <p className="leading-relaxed text-amber-800">
            En cumplimiento estricto de la Resolución 2346 de 2007 del Ministerio de la Protección Social y la Ley 1581 de 2012, esta plataforma <strong>NO almacena diagnósticos médicos, historias clínicas ni resultados de paraclínicos</strong>. Únicamente se gestionan los <strong>Certificados de Aptitud Ocupacional</strong> emitidos por el médico especialista y las recomendaciones administrativas aplicables al puesto de trabajo.
          </p>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Seguimiento a Recomendaciones y Vencimientos</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por ID interno o área..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold">
              <tr>
                <th className="px-4 py-3 text-left">CÓDIGO</th>
                <th className="px-4 py-3 text-left">ID TRABAJADOR</th>
                <th className="px-4 py-3 text-left">CARGO Y ÁREA</th>
                <th className="px-4 py-3 text-left">TIPO EVALUACIÓN</th>
                <th className="px-4 py-3 text-left">FECHA EVALUACIÓN</th>
                <th className="px-4 py-3 text-center">CONCEPTO MÉDICO</th>
                <th className="px-4 py-3 text-left">RECOMENDACIONES ADMINISTRATIVAS</th>
                <th className="px-4 py-3 text-left">PRÓX. SEGUIMIENTO</th>
                <th className="px-4 py-3 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-mono font-bold text-slate-700">{item.code}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{item.workerName} ({item.workerId})</td>
                  <td className="px-4 py-3 text-slate-600">{item.position} · {item.area}</td>
                  <td className="px-4 py-3 text-slate-800 font-medium">{item.examType}</td>
                  <td className="px-4 py-3 text-slate-600">{item.examDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {item.concept}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 max-w-xs">{item.workRestrictions}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{item.followUpDate}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setEditingRec({ ...item });
                        setShowEditModal(true);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-colors"
                      title="Editar datos del colaborador y concepto"
                    >
                      <Edit3 className="w-3 h-3 text-emerald-600" />
                      <span>Editar datos</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Registrar Certificado Ocupacional</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ID o Identificador Interno</label>
                  <input
                    type="text"
                    required
                    value={newRec.workerId}
                    onChange={(e) => setNewRec({ ...newRec, workerId: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Evaluación</label>
                  <select
                    value={newRec.examType}
                    onChange={(e) => setNewRec({ ...newRec, examType: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Ingreso">Ingreso</option>
                    <option value="Periódico">Periódico</option>
                    <option value="Retiro">Retiro</option>
                    <option value="Post-incapacidad">Post-incapacidad</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Concepto de Aptitud</label>
                  <select
                    value={newRec.concept}
                    onChange={(e) => setNewRec({ ...newRec, concept: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Apto sin restricciones">Apto sin restricciones</option>
                    <option value="Apto con recomendaciones">Apto con recomendaciones</option>
                    <option value="Aplazado">Aplazado</option>
                    <option value="No Apto temporal">No Apto temporal</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Evaluación</label>
                  <input
                    type="date"
                    required
                    value={newRec.examDate}
                    onChange={(e) => setNewRec({ ...newRec, examDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Recomendaciones Administrativas</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Ej: Mantener pausas de estiramiento visual, uso de filtro, evitar cargar peso superior a 15kg..."
                  value={newRec.workRestrictions}
                  onChange={(e) => setNewRec({ ...newRec, workRestrictions: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Próxima Fecha de Seguimiento</label>
                <input
                  type="date"
                  value={newRec.followUpDate}
                  onChange={(e) => setNewRec({ ...newRec, followUpDate: e.target.value })}
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
                  Guardar Registro Administrativo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && editingRec && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Editar Datos del Colaborador y Concepto Ocupacional</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              onUpdateRecord(editingRec);
              setShowEditModal(false);
            }} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre Completo del Colaborador</label>
                  <input
                    type="text"
                    required
                    value={editingRec.workerName}
                    onChange={(e) => setEditingRec({ ...editingRec, workerName: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cédula / ID Interno</label>
                  <input
                    type="text"
                    required
                    value={editingRec.workerId}
                    onChange={(e) => setEditingRec({ ...editingRec, workerId: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cargo</label>
                  <input
                    type="text"
                    required
                    value={editingRec.position}
                    onChange={(e) => setEditingRec({ ...editingRec, position: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área / Departamento</label>
                  <input
                    type="text"
                    required
                    value={editingRec.area}
                    onChange={(e) => setEditingRec({ ...editingRec, area: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Evaluación</label>
                  <select
                    value={editingRec.examType}
                    onChange={(e) => setEditingRec({ ...editingRec, examType: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Ingreso">Ingreso</option>
                    <option value="Periódico">Periódico</option>
                    <option value="Retiro">Retiro</option>
                    <option value="Post-incapacidad">Post-incapacidad</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Concepto de Aptitud</label>
                  <select
                    value={editingRec.concept}
                    onChange={(e) => setEditingRec({ ...editingRec, concept: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Apto sin restricciones">Apto sin restricciones</option>
                    <option value="Apto con recomendaciones">Apto con recomendaciones</option>
                    <option value="Aplazado">Aplazado</option>
                    <option value="No Apto temporal">No Apto temporal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Evaluación</label>
                  <input
                    type="date"
                    required
                    value={editingRec.examDate}
                    onChange={(e) => setEditingRec({ ...editingRec, examDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Próxima Fecha de Seguimiento</label>
                  <input
                    type="date"
                    value={editingRec.followUpDate}
                    onChange={(e) => setEditingRec({ ...editingRec, followUpDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Recomendaciones Administrativas</label>
                <textarea
                  rows={3}
                  required
                  value={editingRec.workRestrictions}
                  onChange={(e) => setEditingRec({ ...editingRec, workRestrictions: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
