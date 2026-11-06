import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Scale, 
  FileSpreadsheet, 
  HardHat, 
  Briefcase, 
  UserCheck, 
  ShieldCheck, 
  ExternalLink, 
  Maximize2, 
  Info,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Eye,
  FileText
} from 'lucide-react';
import { EQUIPO_DATA_INTEGRAL, PersonaEquipo } from '../data/team';

interface OrganigramaViewProps {
  onSelectCargo?: (cargo: PersonaEquipo) => void;
  compact?: boolean;
}

export const OrganigramaView: React.FC<OrganigramaViewProps> = ({ 
  onSelectCargo,
  compact = false 
}) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'imagen' | 'resumen'>('visual');
  const [zoomImage, setZoomImage] = useState(false);

  // Group positions
  const ceo = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-ceo');
  const contadora = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-contadora');
  const abogados = EQUIPO_DATA_INTEGRAL.filter(c => c.cargo === 'Abogado');
  const coordinador = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-coordinador');
  
  // Sede Sauces
  const gerenteSauces = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-gerente-sauces');
  const lideresSauces = EQUIPO_DATA_INTEGRAL.filter(c => c.id.startsWith('crg-lider-sauces'));
  
  // Sede Almacentro
  const gerenteAlmacentro = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-gerente-almacentro');
  const lideresAlmacentro = EQUIPO_DATA_INTEGRAL.filter(c => c.id.startsWith('crg-lider-almacentro'));
  const asesoraAlmacentro = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-asesora-almacentro');

  // Sede Rionegro
  const gerenteRionegro = EQUIPO_DATA_INTEGRAL.find(c => c.id === 'crg-gerente-rionegro');
  const lideresRionegro = EQUIPO_DATA_INTEGRAL.filter(c => c.id.startsWith('crg-lider-rionegro'));

  const activeCargoData = selectedNode 
    ? EQUIPO_DATA_INTEGRAL.find(c => c.id === selectedNode) 
    : null;

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      {!compact && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-700/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/40">
              <Building2 className="w-3.5 h-3.5" />
              Estructura Institucional · Denominado por Cargos
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              ORGANIGRAMA <span className="text-amber-400">DATA INTEGRAL SOLUCIONES S.A.S.</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Estructura oficial por puestos de trabajo y responsabilidades jerárquicas del SG-SST (20 cargos definidos).
            </p>
          </div>

          {/* View Mode Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'visual'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Organigrama Visual
            </button>
            <button
              onClick={() => setActiveTab('imagen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'imagen'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Gráfico Original</span>
            </button>
            <button
              onClick={() => setActiveTab('resumen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'resumen'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              20 Cargos (Lista)
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: VISUAL INTERACTIVE FLOWCHART MATCHING THE IMAGE */}
      {activeTab === 'visual' && (
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-2xl overflow-x-auto text-white">
          <div className="min-w-[850px] mx-auto space-y-8">
            
            {/* Title inside the diagram */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-400/90 font-bold uppercase block">
                  ORGANIGRAMA
                </span>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  DATA INTEGRAL SOLUCIONES S.A.S.
                </h3>
                <span className="text-xs text-slate-400 font-medium">
                  DENOMINADO POR CARGOS
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  Total: 20 Puestos Oficiales
                </span>
              </div>
            </div>

            {/* TOP ROW: CEO & STAFF (CONTADORA / ABOGADOS) */}
            <div className="grid grid-cols-12 gap-4 items-center">
              
              {/* Left Spacer (4 cols) */}
              <div className="col-span-3"></div>

              {/* CEO Center Box (5 cols) */}
              <div className="col-span-5 flex flex-col items-center">
                <button
                  onClick={() => setSelectedNode('crg-ceo')}
                  className={`w-48 sm:w-56 p-4 rounded-2xl bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 border-2 transition-all transform hover:scale-105 shadow-2xl relative group ${
                    selectedNode === 'crg-ceo' ? 'border-amber-400 ring-4 ring-amber-400/30' : 'border-amber-500/70 hover:border-amber-400'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-lg">
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-300 font-bold">
                        <Briefcase className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-amber-300/80 font-mono tracking-wider block">ALTA DIRECCIÓN</span>
                      <h4 className="text-xl font-black text-white tracking-wider">CEO</h4>
                      <span className="text-[10px] text-slate-300 font-semibold block">(1 Cargo)</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Right Side: Staff / Asesoría (Contadora & Abogado) (4 cols) */}
              <div className="col-span-4 flex flex-col space-y-3 pl-4 border-l border-dashed border-slate-700 relative">
                
                {/* Horizontal connection line */}
                <div className="absolute -left-4 top-8 w-4 h-0.5 border-t border-dashed border-slate-600" />
                
                {/* Contadora Box (Copper/Rose) */}
                <button
                  onClick={() => setSelectedNode('crg-contadora')}
                  className={`p-3 rounded-xl bg-gradient-to-r from-rose-950/90 to-amber-950/80 border text-left transition-all hover:scale-102 flex items-center gap-3 shadow-lg ${
                    selectedNode === 'crg-contadora' ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-rose-400/50 hover:border-rose-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 flex-shrink-0">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-rose-200">CONTADORA</div>
                    <div className="text-[10px] text-slate-400 truncate">(Prestación de servicios)</div>
                    <span className="text-[9px] font-bold text-amber-300 block">(1)</span>
                  </div>
                </button>

                {/* Abogado Box (Purple) */}
                <button
                  onClick={() => setSelectedNode('crg-abogado-1')}
                  className={`p-3 rounded-xl bg-gradient-to-r from-purple-950/90 to-indigo-950/80 border text-left transition-all hover:scale-102 flex items-center gap-3 shadow-lg ${
                    selectedNode?.startsWith('crg-abogado') ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-purple-400/50 hover:border-purple-300'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-purple-200">ABOGADO</div>
                    <div className="text-[10px] text-slate-400">Área Jurídica</div>
                    <span className="text-[9px] font-bold text-amber-300 block">(3)</span>
                  </div>
                </button>

              </div>

            </div>

            {/* Connecting Vertical & Horizontal Trunk */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-amber-500/70" />
              <div className="w-full max-w-4xl h-0.5 bg-amber-500/70 relative">
                <div className="absolute left-[8%] top-0 w-0.5 h-6 bg-amber-500/70" />
                <div className="absolute left-[33%] top-0 w-0.5 h-6 bg-amber-500/70" />
                <div className="absolute left-[62%] top-0 w-0.5 h-6 bg-amber-500/70" />
                <div className="absolute left-[92%] top-0 w-0.5 h-6 bg-amber-500/70" />
              </div>
            </div>

            {/* OPERATIONAL LEVEL: COORDINADOR + 3 GERENCIAS DE SEDE */}
            <div className="grid grid-cols-4 gap-4 items-start pt-4">
              
              {/* Branch 1: COORDINADOR (1) (Green Box) */}
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => setSelectedNode('crg-coordinador')}
                  className={`w-full p-4 rounded-2xl bg-gradient-to-b from-emerald-950 to-teal-950 border-2 transition-all hover:scale-102 shadow-xl flex items-center gap-3 ${
                    selectedNode === 'crg-coordinador' ? 'border-emerald-300 ring-4 ring-emerald-400/30' : 'border-emerald-500/80 hover:border-emerald-400'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-400 flex items-center justify-center text-emerald-300 flex-shrink-0">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h5 className="font-extrabold text-xs sm:text-sm text-white uppercase">COORDINADOR</h5>
                    <span className="text-[10px] text-emerald-300 font-bold block">(1 Cargo)</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">SST y Operativo</span>
                  </div>
                </button>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 text-left w-full space-y-1">
                  <span className="text-emerald-400 font-bold block text-[10px] uppercase">Funciones Clave:</span>
                  <p>• Liderazgo del SG-SST</p>
                  <p>• Coordinación Inter-Sedes</p>
                  <p>• Jefe de Brigada General</p>
                </div>
              </div>

              {/* Branch 2: GERENTE SEDE SAUCES (1) + 4 LÍDERES */}
              <div className="flex flex-col items-center space-y-3">
                <button
                  onClick={() => setSelectedNode('crg-gerente-sauces')}
                  className={`w-full p-3.5 rounded-2xl bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-2 transition-all hover:scale-102 shadow-xl flex items-center gap-2.5 ${
                    selectedNode === 'crg-gerente-sauces' ? 'border-purple-300 ring-4 ring-purple-400/30' : 'border-purple-500/70 hover:border-purple-400'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/30 border border-purple-400 flex items-center justify-center text-purple-300 flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-purple-300 font-semibold block uppercase">GERENTE</span>
                    <h5 className="font-black text-xs text-white">SEDE SAUCES</h5>
                    <span className="text-[9px] text-purple-300 font-bold block">(1)</span>
                  </div>
                </button>

                {/* Vertical stem */}
                <div className="w-0.5 h-3 bg-slate-700" />

                {/* 4 Líderes Sauces (Blue boxes) */}
                <div className="w-full space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                    4 LÍDERES (SAUCES):
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {lideresSauces.map((lider, i) => (
                      <button
                        key={lider.id}
                        onClick={() => setSelectedNode(lider.id)}
                        className={`p-2 rounded-xl bg-gradient-to-b from-blue-950 to-slate-900 border text-center transition-all hover:scale-105 flex flex-col items-center justify-center shadow ${
                          selectedNode === lider.id ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-blue-500/50 hover:border-blue-400'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5 text-blue-300 mb-0.5" />
                        <span className="font-extrabold text-[10px] text-blue-200">LÍDER {i + 1}</span>
                        <span className="text-[8px] text-slate-400">Sauces</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Branch 3: GERENTE SEDE ALMACENTRO (1) + 3 LÍDERES + ASESORA ALMACENTRO */}
              <div className="flex flex-col items-center space-y-3">
                <button
                  onClick={() => setSelectedNode('crg-gerente-almacentro')}
                  className={`w-full p-3.5 rounded-2xl bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-2 transition-all hover:scale-102 shadow-xl flex items-center gap-2.5 ${
                    selectedNode === 'crg-gerente-almacentro' ? 'border-purple-300 ring-4 ring-purple-400/30' : 'border-purple-500/70 hover:border-purple-400'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/30 border border-purple-400 flex items-center justify-center text-purple-300 flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-purple-300 font-semibold block uppercase">GERENTE</span>
                    <h5 className="font-black text-xs text-white">SEDE ALMACENTRO</h5>
                    <span className="text-[9px] text-purple-300 font-bold block">(1)</span>
                  </div>
                </button>

                {/* Vertical stem */}
                <div className="w-0.5 h-3 bg-slate-700" />

                {/* 3 Líderes Almacentro */}
                <div className="w-full space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                    3 LÍDERES (ALMACENTRO):
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {lideresAlmacentro.map((lider, i) => (
                      <button
                        key={lider.id}
                        onClick={() => setSelectedNode(lider.id)}
                        className={`p-1.5 rounded-xl bg-gradient-to-b from-blue-950 to-slate-900 border text-center transition-all hover:scale-105 flex flex-col items-center justify-center shadow ${
                          selectedNode === lider.id ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-blue-500/50 hover:border-blue-400'
                        }`}
                      >
                        <UserCheck className="w-3 h-3 text-blue-300 mb-0.5" />
                        <span className="font-extrabold text-[9px] text-blue-200">LÍDER {i + 1}</span>
                      </button>
                    ))}
                  </div>

                  {/* Asesora Almacentro (Bronze Box) */}
                  <div className="pt-1">
                    <button
                      onClick={() => setSelectedNode('crg-asesora-almacentro')}
                      className={`w-full p-2.5 rounded-xl bg-gradient-to-r from-amber-950 to-orange-950 border text-left transition-all hover:scale-102 flex items-center gap-2.5 shadow ${
                        selectedNode === 'crg-asesora-almacentro' ? 'border-amber-300 ring-2 ring-amber-400/30' : 'border-amber-600/70 hover:border-amber-400'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-500/30 border border-amber-400 flex items-center justify-center text-amber-300 flex-shrink-0">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-black text-[10px] text-amber-200 block">ASESORA ALMACENTRO</span>
                        <span className="text-[8px] text-amber-300 font-semibold block">(1 Cargo)</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Branch 4: GERENTE SEDE RIONEGRO (1) + 3 LÍDERES */}
              <div className="flex flex-col items-center space-y-3">
                <button
                  onClick={() => setSelectedNode('crg-gerente-rionegro')}
                  className={`w-full p-3.5 rounded-2xl bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 border-2 transition-all hover:scale-102 shadow-xl flex items-center gap-2.5 ${
                    selectedNode === 'crg-gerente-rionegro' ? 'border-purple-300 ring-4 ring-purple-400/30' : 'border-purple-500/70 hover:border-purple-400'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/30 border border-purple-400 flex items-center justify-center text-purple-300 flex-shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-purple-300 font-semibold block uppercase">GERENTE</span>
                    <h5 className="font-black text-xs text-white">SEDE RIONEGRO</h5>
                    <span className="text-[9px] text-purple-300 font-bold block">(1)</span>
                  </div>
                </button>

                {/* Vertical stem */}
                <div className="w-0.5 h-3 bg-slate-700" />

                {/* 3 Líderes Rionegro */}
                <div className="w-full space-y-1.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                    3 LÍDERES (RIONEGRO):
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {lideresRionegro.map((lider, i) => (
                      <button
                        key={lider.id}
                        onClick={() => setSelectedNode(lider.id)}
                        className={`p-1.5 rounded-xl bg-gradient-to-b from-blue-950 to-slate-900 border text-center transition-all hover:scale-105 flex flex-col items-center justify-center shadow ${
                          selectedNode === lider.id ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-blue-500/50 hover:border-blue-400'
                        }`}
                      >
                        <UserCheck className="w-3 h-3 text-blue-300 mb-0.5" />
                        <span className="font-extrabold text-[9px] text-blue-200">LÍDER {i + 1}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 2: ORIGINAL ATTACHED IMAGE VIEW */}
      {activeTab === 'imagen' && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span className="font-bold text-slate-200">
              Gráfico Original Oficial: Organigrama Data Integral Soluciones S.A.S.
            </span>
            <button
              onClick={() => setZoomImage(!zoomImage)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700 text-xs font-semibold"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{zoomImage ? 'Tamaño Normal' : 'Ampliar'}</span>
            </button>
          </div>

          <div className={`overflow-hidden rounded-xl border border-slate-800 flex justify-center bg-black ${zoomImage ? 'p-2' : 'max-h-[600px]'}`}>
            <img 
              src="/assets/aistudio/image_fcdc01cf.png" 
              alt="Organigrama Oficial Data Integral Soluciones S.A.S." 
              className={`object-contain transition-all duration-300 ${zoomImage ? 'w-full max-h-none' : 'max-h-[580px]'}`}
            />
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Fuente oficial: Organigrama corporativo denominado por cargos sin nombres individuales.
          </p>
        </div>
      )}

      {/* TAB 3: RESUMEN Y LISTADO COMPLETO DE LOS 20 CARGOS */}
      {activeTab === 'resumen' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h4 className="text-base font-bold text-slate-900">Listado Maestro de los 20 Cargos Oficiales</h4>
              <p className="text-xs text-slate-500">Denominación formal conforme al organigrama de Data Integral Soluciones S.A.S.</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold text-xs">
              20 Cargos Registrados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EQUIPO_DATA_INTEGRAL.map((cargo) => (
              <div
                key={cargo.id}
                onClick={() => setSelectedNode(cargo.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedNode === cargo.id
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 font-bold block">{cargo.id}</span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm">{cargo.nombre}</h5>
                    <p className="text-[11px] text-slate-600 font-medium">{cargo.cargo} · {cargo.sede}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-200 text-slate-700">
                    {cargo.categoria.toUpperCase()}
                  </span>
                </div>
                {cargo.rolSST && (
                  <div className="mt-2 text-[10px] text-emerald-800 bg-emerald-100/60 px-2 py-1 rounded-md border border-emerald-200">
                    <strong>Rol SST:</strong> {cargo.rolSST}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELECTED CARGO DETAIL MODAL / DRAWER */}
      {activeCargoData && (
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-slate-700 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-amber-300">
                  {activeCargoData.categoria.toUpperCase()}
                </span>
                <span className="text-xs text-slate-300 font-medium">{activeCargoData.area}</span>
              </div>
              <h4 className="text-lg font-black text-white mt-0.5">
                {activeCargoData.nombre}
              </h4>
              <p className="text-xs text-slate-300">
                <strong>Sede:</strong> {activeCargoData.sede} · <strong>Responsabilidad SG-SST:</strong> {activeCargoData.rolSST}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            {onSelectCargo && (
              <button
                onClick={() => onSelectCargo(activeCargoData)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-transform active:scale-95"
              >
                Ver Ficha del Cargo
              </button>
            )}
            <button
              onClick={() => setSelectedNode(null)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
