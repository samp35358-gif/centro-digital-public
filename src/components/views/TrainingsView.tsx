import React, { useState } from 'react';
import { 
  GraduationCap, 
  Plus, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  Award, 
  Search, 
  Filter,
  CheckCircle2,
  FileText,
  Edit3
} from 'lucide-react';
import { TrainingCourse, CompanySettings, UserProfile } from '../../types';

interface TrainingsViewProps {
  trainings: TrainingCourse[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddTraining: (course: TrainingCourse) => void;
  onUpdateTraining: (course: TrainingCourse) => void;
}

export const TrainingsView: React.FC<TrainingsViewProps> = ({
  trainings,
  company,
  currentUser,
  onAddTraining,
  onUpdateTraining,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<TrainingCourse | null>(null);
  const [editingCourse, setEditingCourse] = useState<TrainingCourse | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // New Training Form State
  const [newCourse, setNewCourse] = useState<Partial<TrainingCourse>>({
    code: '',
    name: '',
    topic: '',
    objective: '',
    date: new Date().toISOString().substring(0, 10),
    time: '09:00 AM',
    durationHours: 2,
    modality: 'Presencial',
    instructor: company.sstLeaderName,
    targetAudience: 'Todos los colaboradores de Data Integral',
    invitedWorkersCount: 28,
    status: 'Programada',
    certificateIssued: false,
    attendedWorkers: []
  });

  const filtered = trainings.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.topic) return;

    const course: TrainingCourse = {
      id: `trn-${Date.now()}`,
      code: `CAP-2026-${Date.now().toString().slice(-2)}`,
      name: newCourse.name || '',
      topic: newCourse.topic || '',
      objective: newCourse.objective || '',
      date: newCourse.date || new Date().toISOString().substring(0, 10),
      time: newCourse.time || '09:00 AM',
      durationHours: Number(newCourse.durationHours) || 2,
      modality: (newCourse.modality as any) || 'Presencial',
      instructor: newCourse.instructor || company.sstLeaderName,
      targetAudience: newCourse.targetAudience || 'Personal de oficina',
      invitedWorkersCount: Number(newCourse.invitedWorkersCount) || 28,
      attendedWorkers: [
        { workerName: 'Santiago Restrepo', workerId: 'CC 71.321.450', area: 'Dirección', attended: true, score: 95 },
        { workerName: 'Valentina Mesa', workerId: 'CC 1.037.654.120', area: 'Jurídica', attended: true, score: 90 },
      ],
      status: (newCourse.status as any) || 'Programada',
      certificateIssued: !!newCourse.certificateIssued
    };

    onAddTraining(course);
    setShowModal(false);
  };

  const canEdit = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <GraduationCap className="w-3.5 h-3.5" />
            Programa de Capacitación y Entrenamiento en SST
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Capacitaciones y Formación en <span className="text-emerald-400">Seguridad</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Formación continua en ergonomía, prevención de incendios, autocuidado y salud mental. Registro de asistencias, evaluaciones de conocimiento y certificados digitales.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Programar Capacitación</span>
          </button>
        )}
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => {
          const isDone = course.status === 'Realizada';
          const attendedCount = course.attendedWorkers?.filter(w => w.attended).length || 0;
          const pct = course.invitedWorkersCount > 0 ? Math.round((attendedCount / course.invitedWorkersCount) * 100) : 0;

          return (
            <div key={course.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border">
                    {course.code}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {course.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 mt-1">{course.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{course.topic}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Fecha & Hora:</span>
                    <strong className="text-slate-800">{course.date} ({course.time})</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Modalidad:</span>
                    <span className="font-semibold text-slate-700">{course.modality} · {course.durationHours}h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Instructor:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-800 font-medium">{course.instructor}</span>
                      <button
                        onClick={() => {
                          setEditingCourse({ ...course });
                          setShowEditModal(true);
                        }}
                        className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-emerald-700 transition-colors"
                        title="Editar instructor"
                      >
                        <Edit3 className="w-3 h-3 text-emerald-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {isDone && (
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Asistencia y Cobertura:</span>
                      <strong className="text-emerald-700">{pct}% ({attendedCount}/{course.invitedWorkersCount})</strong>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                      <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                <span className="text-slate-500 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  {course.certificateIssued ? 'Certificados emitidos' : 'Sin certificar'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">{course.targetAudience}</span>
                  <button
                    onClick={() => {
                      setEditingCourse({ ...course });
                      setShowEditModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-colors"
                    title="Editar datos de la capacitación y personas"
                  >
                    <Edit3 className="w-3 h-3 text-emerald-600" />
                    <span>Editar datos</span>
                  </button>
                </div>
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
              <h3 className="text-lg font-bold text-slate-900">Programar Capacitación de Seguridad y Salud</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre de la Capacitación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Prevención del Riesgo Biomecánico y Manejo de Pantallas"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tema Principal</label>
                  <input
                    type="text"
                    required
                    placeholder="Ergonomía, Extintores, Primeros Auxilios..."
                    value={newCourse.topic}
                    onChange={(e) => setNewCourse({ ...newCourse, topic: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Instructor / Entidad</label>
                  <input
                    type="text"
                    required
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Objetivo de la Formación</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Qué conocimientos o destrezas adquirirán los colaboradores..."
                  value={newCourse.objective}
                  onChange={(e) => setNewCourse({ ...newCourse, objective: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newCourse.date}
                    onChange={(e) => setNewCourse({ ...newCourse, date: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hora</label>
                  <input
                    type="text"
                    value={newCourse.time}
                    onChange={(e) => setNewCourse({ ...newCourse, time: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Modalidad</label>
                  <select
                    value={newCourse.modality}
                    onChange={(e) => setNewCourse({ ...newCourse, modality: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Mixta">Mixta</option>
                  </select>
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
                  Guardar Capacitación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT TRAINING MODAL */}
      {showEditModal && editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Editar Capacitación e Instructor</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              onUpdateTraining(editingCourse);
              setShowEditModal(false);
            }} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre de la Capacitación</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Instructor / Capacitador</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.instructor}
                    onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tema</label>
                  <input
                    type="text"
                    required
                    value={editingCourse.topic}
                    onChange={(e) => setEditingCourse({ ...editingCourse, topic: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Población Objetivo</label>
                  <input
                    type="text"
                    value={editingCourse.targetAudience}
                    onChange={(e) => setEditingCourse({ ...editingCourse, targetAudience: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estado</label>
                  <select
                    value={editingCourse.status}
                    onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="Programada">Programada</option>
                    <option value="Realizada">Realizada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={editingCourse.date}
                    onChange={(e) => setEditingCourse({ ...editingCourse, date: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hora</label>
                  <input
                    type="text"
                    value={editingCourse.time}
                    onChange={(e) => setEditingCourse({ ...editingCourse, time: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duración (Horas)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={editingCourse.durationHours}
                    onChange={(e) => setEditingCourse({ ...editingCourse, durationHours: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Modalidad</label>
                  <select
                    value={editingCourse.modality}
                    onChange={(e) => setEditingCourse({ ...editingCourse, modality: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Virtual">Virtual</option>
                    <option value="Mixta">Mixta</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Trabajadores Convocados</label>
                  <input
                    type="number"
                    min="1"
                    value={editingCourse.invitedWorkersCount}
                    onChange={(e) => setEditingCourse({ ...editingCourse, invitedWorkersCount: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
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
