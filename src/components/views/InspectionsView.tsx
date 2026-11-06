import React, { useState } from 'react';
import { 
  FileCheck2, 
  Plus, 
  Download, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  MinusCircle, 
  AlertTriangle, 
  Calendar,
  Building,
  User,
  Eye
} from 'lucide-react';
import { InspectionRecord, InspectionCheckItem, CompanySettings, UserProfile } from '../../types';
import { downloadInspectionPdf } from '../../utils/pdfGenerator';

interface InspectionsViewProps {
  inspections: InspectionRecord[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddInspection: (insp: InspectionRecord) => void;
}

export const InspectionsView: React.FC<InspectionsViewProps> = ({
  inspections,
  company,
  currentUser,
  onAddInspection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<InspectionRecord | null>(null);

  // New Inspection Form
  const [inspectionType, setInspectionType] = useState<InspectionRecord['type']>('Puestos de Trabajo y Ergonomía');
  const [area, setArea] = useState('Área Jurídica y Financiera');
  const [inspectorName, setInspectorName] = useState(currentUser.name);

  // Dynamic checklists according to inspection type
  const checklistTemplates: Record<string, string[]> = {
    'Puestos de Trabajo y Ergonomía': [
      '¿La silla cuenta con regulación de altura neumática y apoyo lumbar ajustable?',
      '¿La pantalla del computador se encuentra alineada con el borde superior a la altura de los ojos?',
      '¿Los pies descansan planos sobre el piso o disponen de reposapiés ergonómico?',
      '¿El teclado y mouse se encuentran a la misma altura permitiendo reposo de muñecas?',
      '¿El espacio bajo el escritorio se encuentra totalmente despejado de cajas o cables?',
    ],
    'Extintores y Equipos de Emergencia': [
      '¿Los extintores Solkaflam y Multipropósito están despejados y señalizados a 1.50m?',
      '¿El manómetro de presión se encuentra dentro de la franja verde operativa?',
      '¿El pasador y precinto de seguridad se encuentran intactos y sin adulteración?',
      '¿La manguera y boquilla están libres de grietas, obstrucciones o deformaciones?',
      '¿La tarjeta de control mensual está debidamente firmada con fecha vigente?',
    ],
    'Botiquines de Primeros Auxilios': [
      '¿El botiquín Tipo A cuenta con los elementos reglamentarios de la Res. 0705 de 2007?',
      '¿Los apósitos, gasas estériles y vendas se encuentran dentro de su fecha de vencimiento?',
      '¿El tensiómetro y fonendoscopio se encuentran limpios y en correcto funcionamiento?',
      '¿El botiquín se encuentra cerrado pero de fácil apertura sin candados que impidan el socorro?',
    ],
    'Instalaciones Eléctricas y Cableado': [
      '¿Los cables de computadores e impresoras están protegidos por canaletas fijas al piso o pared?',
      '¿No existen multitomas conectadas en cascada ni sobrecarga de enchufes en puestos de trabajo?',
      '¿El tablero de breakers principal está debidamente rotulado y sin tapas faltantes?',
      '¿Las tomas eléctricas se encuentran libres de quemaduras, chispas o tornillos flojos?',
    ],
    'Orden y Aseo (5S)': [
      '¿Los pasillos de circulación principal están completamente libres de cajas de expedientes?',
      '¿Los archivadores metálicos se mantienen cerrados cuando no se están consultando?',
      '¿El área de cafetería se mantiene seca, limpia y con canecas de basura rotuladas?',
      '¿Los puestos de trabajo quedan despejados y limpios al terminar la jornada laboral?',
    ],
    'Señalización y Rutas de Evacuación': [
      '¿Las salidas hacia las escaleras de emergencia cuentan con aviso fotoluminiscente visible?',
      '¿Las puertas de evacuación abren fácilmente hacia afuera en el sentido de salida?',
      '¿Las lámparas de emergencia LED encienden inmediatamente al simular corte eléctrico?',
      '¿El plano esquemático de evacuación del piso 6 se encuentra visible en recepción?',
    ],
    'Elementos de Protección Personal': [
      '¿Los brigadistas disponen de su chaleco reflectivo, linterna y silbato en el puesto asignado?',
      '¿El personal de servicios generales utiliza guantes de nitrilo y calzado antideslizante?',
      '¿Los cojines lumbares y descansapiés de oficina se encuentran en buen estado de soporte?',
    ]
  };

  const [activeItems, setActiveItems] = useState<InspectionCheckItem[]>(
    checklistTemplates['Puestos de Trabajo y Ergonomía'].map((q, i) => ({
      id: `q-${i}`,
      question: q,
      result: 'cumple',
      observation: ''
    }))
  );

  const [findingsList, setFindingsList] = useState<InspectionRecord['findings']>([]);
  const [findingDesc, setFindingDesc] = useState('');
  const [findingPriority, setFindingPriority] = useState<'Alta' | 'Media' | 'Baja'>('Media');
  const [findingAction, setFindingAction] = useState('');
  const [findingResp, setFindingResp] = useState(company.sstLeaderName);
  const [findingDeadline, setFindingDeadline] = useState(
    new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10)
  );

  const handleTypeChange = (type: InspectionRecord['type']) => {
    setInspectionType(type);
    const questions = checklistTemplates[type] || checklistTemplates['Puestos de Trabajo y Ergonomía'];
    setActiveItems(
      questions.map((q, i) => ({
        id: `q-${i}`,
        question: q,
        result: 'cumple',
        observation: ''
      }))
    );
  };

  const handleAddFinding = () => {
    if (!findingDesc || !findingAction) return;
    setFindingsList([
      ...findingsList,
      {
        id: `f-${Date.now()}`,
        description: findingDesc,
        priority: findingPriority,
        correctiveAction: findingAction,
        responsible: findingResp,
        deadline: findingDeadline,
        status: 'Pendiente'
      }
    ]);
    setFindingDesc('');
    setFindingAction('');
  };

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const compliantCount = activeItems.filter(i => i.result === 'cumple').length;
    const applicableCount = activeItems.filter(i => i.result !== 'no_aplica').length;
    const score = applicableCount > 0 ? Math.round((compliantCount / applicableCount) * 100) : 100;

    const newInsp: InspectionRecord = {
      id: `insp-${Date.now()}`,
      code: `INS-2026-${Date.now().toString().slice(-3)}`,
      type: inspectionType,
      date: new Date().toISOString().substring(0, 10),
      inspectorName,
      inspectorRole: currentUser.position,
      area,
      items: activeItems,
      findings: findingsList,
      generalObservations: `Inspección digital de seguridad realizada con calificación del ${score}%.`,
      scorePercentage: score,
      photoAttached: true
    };

    onAddInspection(newInsp);
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <FileCheck2 className="w-3.5 h-3.5" />
            Inspecciones de Seguridad Digitales
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Inspecciones Periódicas de <span className="text-emerald-400">Seguridad</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Listas de chequeo para ergonomía, extintores, instalaciones eléctricas, orden y aseo. Calificación automática y generación de acciones correctivas de cierre.
          </p>
        </div>

        <button
          onClick={() => {
            handleTypeChange('Puestos de Trabajo y Ergonomía');
            setFindingsList([]);
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Ejecutar Nueva Inspección</span>
        </button>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inspections.map((insp) => (
          <div key={insp.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border">
                  {insp.code}
                </span>
                <span className="text-xs font-bold text-slate-400">{insp.date}</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Área: {insp.area}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5">{insp.type}</h4>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Inspector:</span>
                  <span className="text-xs font-semibold text-slate-800">{insp.inspectorName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Cumplimiento:</span>
                  <span className={`text-base font-black ${insp.scorePercentage >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {insp.scorePercentage}%
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                <span>{insp.items.length} criterios evaluados · </span>
                <strong className={insp.findings.length > 0 ? 'text-amber-600' : 'text-emerald-600'}>
                  {insp.findings.length} hallazgos
                </strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => downloadInspectionPdf(insp, company)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-3 rounded-xl shadow transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Formato (PDF)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE INSPECTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Formulario Digital de Inspección de Seguridad</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateInspection} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tipo de Inspección</label>
                  <select
                    value={inspectionType}
                    onChange={(e) => handleTypeChange(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Puestos de Trabajo y Ergonomía">Puestos de Trabajo y Ergonomía</option>
                    <option value="Extintores y Equipos de Emergencia">Extintores y Equipos de Emergencia</option>
                    <option value="Botiquines de Primeros Auxilios">Botiquines de Primeros Auxilios</option>
                    <option value="Instalaciones Eléctricas y Cableado">Instalaciones Eléctricas y Cableado</option>
                    <option value="Orden y Aseo (5S)">Orden y Aseo (5S)</option>
                    <option value="Señalización y Rutas de Evacuación">Señalización y Rutas de Evacuación</option>
                    <option value="Elementos de Protección Personal">Elementos de Protección Personal</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Área o Zona Inspeccionada</label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 text-xs block">
                  Lista de Verificación - Criterios Técnicos:
                </span>
                {activeItems.map((item, idx) => (
                  <div key={item.id} className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs text-slate-800 font-medium">
                        {idx + 1}. {item.question}
                      </span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...activeItems];
                            copy[idx].result = 'cumple';
                            setActiveItems(copy);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            item.result === 'cumple' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          Cumple
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...activeItems];
                            copy[idx].result = 'no_cumple';
                            setActiveItems(copy);
                          }}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                            item.result === 'no_cumple' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          No Cumple
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...activeItems];
                            copy[idx].result = 'no_aplica';
                            setActiveItems(copy);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-bold ${
                            item.result === 'no_aplica' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          N/A
                        </button>
                      </div>
                    </div>
                    {item.result === 'no_cumple' && (
                      <input
                        type="text"
                        placeholder="Observación específica de no conformidad..."
                        value={item.observation}
                        onChange={(e) => {
                          const copy = [...activeItems];
                          copy[idx].observation = e.target.value;
                          setActiveItems(copy);
                        }}
                        className="w-full p-1.5 border border-amber-300 rounded text-xs bg-amber-50/50"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Findings section */}
              <div className="space-y-3 p-4 bg-amber-50/40 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-950 text-xs block">
                  Registrar Hallazgo o Oportunidad de Mejora:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Descripción del hallazgo..."
                    value={findingDesc}
                    onChange={(e) => setFindingDesc(e.target.value)}
                    className="p-2 border border-slate-300 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Acción correctiva propuesta..."
                    value={findingAction}
                    onChange={(e) => setFindingAction(e.target.value)}
                    className="p-2 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <select
                    value={findingPriority}
                    onChange={(e) => setFindingPriority(e.target.value as any)}
                    className="p-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Baja">Prioridad Baja</option>
                    <option value="Media">Prioridad Media</option>
                    <option value="Alta">Prioridad Alta</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddFinding}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg"
                  >
                    + Agregar Hallazgo
                  </button>
                </div>

                {findingsList.length > 0 && (
                  <div className="space-y-1 pt-2">
                    {findingsList.map((f, i) => (
                      <div key={i} className="text-slate-800 bg-white p-2 rounded border border-amber-200 flex justify-between">
                        <span>• [{f.priority}] {f.description} → {f.correctiveAction}</span>
                        <span className="font-mono text-slate-500">{f.deadline}</span>
                      </div>
                    ))}
                  </div>
                )}
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
                  Guardar Inspección y Hallazgos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
