import React from 'react';
import { History, X, Shield, Clock } from 'lucide-react';
import { AuditLog } from '../../types';

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AuditLog[];
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({
  isOpen,
  onClose,
  logs,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bitácora de Auditoría y Trazabilidad</h3>
              <p className="text-xs text-slate-500">Registro inmutable de acciones, usuarios responsables y marcas de tiempo</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
        </div>

        <div className="overflow-y-auto space-y-2 flex-1 pr-1 text-xs">
          {logs.map((log) => (
            <div key={log.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{log.userName}</span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[10px]">
                    {log.role}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                  <Clock className="w-3 h-3" />
                  <span>{log.timestamp}</span>
                </div>
              </div>

              <div className="text-slate-700">
                <span className="font-semibold text-emerald-700">[{log.module}]</span>{' '}
                <span className="font-medium text-slate-900">{log.action}:</span> {log.details}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs hover:bg-slate-100 font-semibold"
          >
            Cerrar Bitácora
          </button>
        </div>

      </div>
    </div>
  );
};
