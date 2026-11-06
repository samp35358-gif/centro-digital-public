import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  Clock,
  Package,
  Edit3
} from 'lucide-react';
import { EppDelivery, CompanySettings, UserProfile } from '../../types';

interface EppViewProps {
  eppList: EppDelivery[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddEpp: (delivery: EppDelivery) => void;
  onUpdateEpp: (delivery: EppDelivery) => void;
}

export const EppView: React.FC<EppViewProps> = ({
  eppList,
  company,
  currentUser,
  onAddEpp,
  onUpdateEpp,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEpp, setEditingEpp] = useState<EppDelivery | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // New EPP Form
  const [newEpp, setNewEpp] = useState<Partial<EppDelivery>>({
    workerName: '',
    workerId: 'CC ',
    position: 'Asesor Jurídico',
    area: 'Área Jurídica',
    itemDelivered: 'Soporte lumbar ergonómico y pad mouse en gel',
    quantity: 1,
    deliveryDate: new Date().toISOString().substring(0, 10),
    estimatedReplacementDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    condition: 'Nuevo',
    signedReceipt: true,
    observations: 'Entrega por puesto de trabajo.'
  });

  const filtered = eppList.filter(e =>
    e.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.itemDelivered.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEpp.workerName || !newEpp.itemDelivered) return;

    const item: EppDelivery = {
      id: `epp-${Date.now()}`,
      code: `EPP-2026-${Date.now().toString().slice(-3)}`,
      workerName: newEpp.workerName || '',
      workerId: newEpp.workerId || 'CC **********',
      position: newEpp.position || 'Colaborador',
      area: newEpp.area || 'Operaciones',
      itemDelivered: newEpp.itemDelivered || '',
      quantity: Number(newEpp.quantity) || 1,
      deliveryDate: newEpp.deliveryDate || new Date().toISOString().substring(0, 10),
      estimatedReplacementDate: newEpp.estimatedReplacementDate || '',
      condition: (newEpp.condition as any) || 'Nuevo',
      signedReceipt: !!newEpp.signedReceipt,
      observations: newEpp.observations || ''
    };

    onAddEpp(item);
    setShowModal(false);
  };

  const canEdit = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <Package className="w-3.5 h-3.5" />
            Control y Dotación de EPP & Ergonomía
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Elementos de Protección Personal y <span className="text-emerald-400">Ergonomía</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Administración de entregas, estado de conservación y reposición de dotación para brigadistas y personal de oficina en Data Integral S.A.S.
          </p>
        </div>

        {canEdit && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Entrega de EPP</span>
          </button>
        )}
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Historial Individual de Entregas</h3>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar colaborador o elemento..."
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
                <th className="px-4 py-3 text-left">COLABORADOR</th>
                <th className="px-4 py-3 text-left">CARGO Y ÁREA</th>
                <th className="px-4 py-3 text-left">ELEMENTO ENTREGADO</th>
                <th className="px-4 py-3 text-center">CANT.</th>
                <th className="px-4 py-3 text-left">FECHA ENTREGA</th>
                <th className="px-4 py-3 text-left">PRÓX. REPOSICIÓN</th>
                <th className="px-4 py-3 text-center">ESTADO</th>
                <th className="px-4 py-3 text-center">RECIBIDO</th>
                <th className="px-4 py-3 text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-mono font-bold text-slate-700">{item.code}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{item.workerName}</td>
                  <td className="px-4 py-3 text-slate-600">{item.position} ({item.area})</td>
                  <td className="px-4 py-3 text-slate-800 font-medium max-w-xs">{item.itemDelivered}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-900">{item.quantity}</td>
                  <td className="px-4 py-3 text-slate-600">{item.deliveryDate}</td>
                  <td className="px-4 py-3 text-slate-600">{item.estimatedReplacementDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.signedReceipt ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Firmado
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setEditingEpp({ ...item });
                        setShowEditModal(true);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-colors"
                      title="Editar datos del colaborador y entrega"
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

      {/* EDIT EPP MODAL */}
      {showEditModal && editingEpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Editar Datos del Colaborador / EPP</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              onUpdateEpp(editingEpp);
              setShowEditModal(false);
            }} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre Completo del Trabajador</label>
                <input
                  type="text"
                  required
                  value={editingEpp.workerName}
                  onChange={(e) => setEditingEpp({ ...editingEpp, workerName: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cargo</label>
                  <input
                    type="text"
                    required
                    value={editingEpp.position}
                    onChange={(e) => setEditingEpp({ ...editingEpp, position: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área</label>
                  <input
                    type="text"
                    required
                    value={editingEpp.area}
                    onChange={(e) => setEditingEpp({ ...editingEpp, area: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Elemento Entregado</label>
                <input
                  type="text"
                  required
                  value={editingEpp.itemDelivered}
                  onChange={(e) => setEditingEpp({ ...editingEpp, itemDelivered: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Entrega</label>
                  <input
                    type="date"
                    required
                    value={editingEpp.deliveryDate}
                    onChange={(e) => setEditingEpp({ ...editingEpp, deliveryDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha Reposición</label>
                  <input
                    type="date"
                    required
                    value={editingEpp.estimatedReplacementDate}
                    onChange={(e) => setEditingEpp({ ...editingEpp, estimatedReplacementDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Registrar Entrega de EPP</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre del Trabajador</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Laura Giraldo"
                  value={newEpp.workerName}
                  onChange={(e) => setNewEpp({ ...newEpp, workerName: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Cargo</label>
                  <input
                    type="text"
                    required
                    value={newEpp.position}
                    onChange={(e) => setNewEpp({ ...newEpp, position: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área</label>
                  <input
                    type="text"
                    required
                    value={newEpp.area}
                    onChange={(e) => setNewEpp({ ...newEpp, area: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Elemento Entregado</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Chaleco reflectivo de brigadista, filtro antirreflejo, cojín lumbar"
                  value={newEpp.itemDelivered}
                  onChange={(e) => setNewEpp({ ...newEpp, itemDelivered: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha de Entrega</label>
                  <input
                    type="date"
                    required
                    value={newEpp.deliveryDate}
                    onChange={(e) => setNewEpp({ ...newEpp, deliveryDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha Estimada Reposición</label>
                  <input
                    type="date"
                    required
                    value={newEpp.estimatedReplacementDate}
                    onChange={(e) => setNewEpp({ ...newEpp, estimatedReplacementDate: e.target.value })}
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
                  Guardar Entrega
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
