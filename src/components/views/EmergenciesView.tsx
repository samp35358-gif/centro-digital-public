import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Flame, 
  Activity, 
  Zap, 
  Droplets, 
  UserX, 
  HeartPulse, 
  ShieldAlert, 
  Radio, 
  MapPin, 
  Users, 
  FileCheck, 
  Download, 
  Plus, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Eye,
  Camera,
  Edit3
} from 'lucide-react';
import { BrigadeMember, EmergencyEquipment, DrillRecord, CompanySettings } from '../../types';
import { downloadEmergencyPlanPdf } from '../../utils/pdfGenerator';
import emergencyImage from '../../assets/images/emergency_brigade_1792798659935.jpg';

interface EmergenciesViewProps {
  brigade: BrigadeMember[];
  equipment: EmergencyEquipment[];
  drills: DrillRecord[];
  company: CompanySettings;
  onAddDrill: (drill: DrillRecord) => void;
  onUpdateEquipment: (equipment: EmergencyEquipment[]) => void;
  onUpdateBrigade: (brigade: BrigadeMember[]) => void;
}

export const EmergenciesView: React.FC<EmergenciesViewProps> = ({
  brigade,
  equipment,
  drills,
  company,
  onAddDrill,
  onUpdateEquipment,
  onUpdateBrigade,
}) => {
  const [activeTab, setActiveTab] = useState<'riesgos' | 'brigada' | 'recursos' | 'evacuacion' | 'simulacros'>('riesgos');
  const [selectedEmergency, setSelectedEmergency] = useState<number>(0);
  const [showSimulacroModal, setShowSimulacroModal] = useState(false);
  const [editingMember, setEditingMember] = useState<BrigadeMember | null>(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  // New drill form state
  const [newDrill, setNewDrill] = useState<Partial<DrillRecord>>({
    name: '',
    date: new Date().toISOString().substring(0, 10),
    scenario: '',
    evacuatedPersonnel: 25,
    durationMinutes: 4.5,
    meetingPoint: 'Plazoleta exterior Edificio Poblado',
    findings: '',
    actionsTaken: '',
    complianceRating: 90,
    coordinator: 'Ing. Carolina Morales',
  });

  // The 12 Office Emergencies specified in prompt
  const officeEmergencies = [
    {
      id: 1,
      name: 'Incendios',
      icon: <Flame className="w-5 h-5 text-red-500" />,
      color: 'border-red-200 bg-red-50/50 text-red-900',
      description: 'Generados por recalentamiento de cableado eléctrico, tomas sobrecargadas en estaciones de cómputo, cafetería o fallas en fuentes de energía.',
      before: 'Inspeccionar periódicamente extintores Solkaflam y multipropósito; no sobrecargar multitomas ni bloquear salidas.',
      during: 'Activar alarma sonora; si es conato, usar extintor adecuado; si no es controlable, evacuar inmediatamente agachado.',
      after: 'Reportar en Punto de Encuentro al brigadista de conteo; esperar autorización de Bomberos para reingreso.'
    },
    {
      id: 2,
      name: 'Sismos y Movimientos Telúricos',
      icon: <Activity className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-200 bg-amber-50/50 text-amber-900',
      description: 'Medellín se ubica en zona de amenaza sísmica intermedia. En edificio de oficinas pueden colapsar vidrios, luminarias y estanterías.',
      before: 'Anclar archivadores rodantes a la pared; ubicar zonas seguras (columnas y muros estructurales).',
      during: '¡Protéjase! No corra, no use ascensores, aléjese de ventanales exteriores y lámparas. Espere a que cese el movimiento.',
      after: 'Evacuar por escaleras de emergencia hacia la plazoleta exterior. Reportar novedades estructurales.'
    },
    {
      id: 3,
      name: 'Cortocircuitos',
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      color: 'border-yellow-200 bg-yellow-50/50 text-yellow-900',
      description: 'Chispas o recalentamiento de equipos informáticos, impresoras industriales de expedientes o cableado estructurado.',
      before: 'Mantenimiento preventivo de breakers eléctricos y tableros identificados en la oficina.',
      during: 'Bajar interruptor del tablero eléctrico más cercano; no tocar con las manos húmedas; usar extintor Solkaflam/CO2 (Tipo C).',
      after: 'Revisión por personal técnico certificado antes de energizar nuevamente el circuito.'
    },
    {
      id: 4,
      name: 'Fallas Eléctricas / Apagón Repentino',
      icon: <Zap className="w-5 h-5 text-indigo-500" />,
      color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900',
      description: 'Corte de energía en la red de Medellín que deja a oscuras áreas internas, bloquea cerraduras magnéticas o apaga servidores.',
      before: 'Verificar baterías de lámparas de emergencia LED y señalización fotoluminiscente en pasillos.',
      during: 'Permanecer en su puesto 2 minutos mientras arrancan las luces de emergencia; encender linternas de brigadistas.',
      after: 'Guardar respaldos informáticos y desconectar equipos sensibles hasta restablecimiento de voltaje estable.'
    },
    {
      id: 5,
      name: 'Inundaciones y Fugas Hidráulicas',
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      color: 'border-blue-200 bg-blue-50/50 text-blue-900',
      description: 'Ruptura de tuberías en sanitarios, dispensadores de agua o filtraciones de techos tras aguaceros torrenciales en el Valle de Aburrá.',
      before: 'Inspección de empaques y acoples de cafetería y baños del piso 6.',
      during: 'Cerrar la llave de paso general; desconectar cables a ras de suelo para evitar electrocución; poner aviso de suelo húmedo.',
      after: 'Secado inmediato para evitar daños a expedientes físicos y deslizamientos de colaboradores.'
    },
    {
      id: 6,
      name: 'Derrames de Sustancias',
      icon: <Droplets className="w-5 h-5 text-purple-500" />,
      color: 'border-purple-200 bg-purple-50/50 text-purple-900',
      description: 'Derrame de productos químicos de aseo concentrados (cloro, desinfectantes industriales) o tóner de impresoras.',
      before: 'Mantener fichas de datos de seguridad (FDS) de productos de aseo; envases originales rotulados.',
      during: 'Ventilar el área; no inhalar vapores; usar guantes de nitrilo del botiquín para absorber con paños.',
      after: 'Disposición segura de residuos y lavado con agua abundante.'
    },
    {
      id: 7,
      name: 'Accidentes Laborales',
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
      color: 'border-rose-200 bg-rose-50/50 text-rose-900',
      description: 'Caídas en escaleras, atrapamiento de dedos en puertas o cortaduras graves con guillotina de papel o vidrio roto.',
      before: 'Cumplir normas de orden y aseo; mantener cinta antideslizante en escaleras.',
      during: 'Llamar al brigadista de primeros auxilios; no mover a la persona si hay sospecha de fractura o golpe en cabeza.',
      after: 'Diligenciar reporte interno, comunicar a ARL SURA (Línea 01 8000 511 414) y convocar comité investigador.'
    },
    {
      id: 8,
      name: 'Emergencias Médicas Repentinas',
      icon: <HeartPulse className="w-5 h-5 text-emerald-500" />,
      color: 'border-emerald-200 bg-emerald-50/50 text-emerald-900',
      description: 'Desmayos, crisis hipertensivas, dolores torácicos, paros cardiorrespiratorios o crisis de ansiedad en oficinas.',
      before: 'Brigadistas certificados en Soporte Vital Básico y botiquín dotado con tensiómetro y elementos Tipo A.',
      during: 'Llamar inmediatamente al 123 Medellín; iniciar valoración de signos vitales; despejar el área de curiosos.',
      after: 'Entrega formal al personal médico de la ambulancia y registro en bitácora de emergencias.'
    },
    {
      id: 9,
      name: 'Evacuaciones de Emergencia',
      icon: <Users className="w-5 h-5 text-teal-500" />,
      color: 'border-teal-200 bg-teal-50/50 text-teal-900',
      description: 'Salida rápida y ordenada de los 28 colaboradores ante amenaza inminente hacia el Punto de Encuentro seguro.',
      before: 'Conocer las rutas de evacuación señalizadas y asignación de líderes de fila.',
      during: 'Conservar la calma, caminar con paso rápido sin correr, bajar por el costado derecho de la escalera agarrado del pasamanos.',
      after: 'Llegar al Punto de Encuentro (Plazoleta exterior), pasar lista y no devolverse por ningún objeto personal.'
    },
    {
      id: 10,
      name: 'Amenazas de Seguridad y Asaltos',
      icon: <ShieldAlert className="w-5 h-5 text-slate-600" />,
      color: 'border-slate-200 bg-slate-50/50 text-slate-900',
      description: 'Ingreso no autorizado de personas armadas, amenazas de bomba o intento de hurto de equipos con datos financieros confidenciales.',
      before: 'Control estricto de recepción con registro de visitantes y puertas con cerradura electrónica.',
      during: 'No poner resistencia física; mantener las manos visibles; observar discretamente rasgos físicos de los asaltantes.',
      after: 'Activar botón de pánico / llamar al 123 y a la Policía del Cuadrante; preservar la escena para los investigadores.'
    },
    {
      id: 11,
      name: 'Situaciones de Orden Público y Protestas',
      icon: <Radio className="w-5 h-5 text-orange-500" />,
      color: 'border-orange-200 bg-orange-50/50 text-orange-900',
      description: 'Disturbios, marchas violentas o gases lacrimógenos en las inmediaciones de la Avenida El Poblado o calle 10.',
      before: 'Monitoreo de noticias locales y canales de seguridad de la administración del edificio.',
      during: 'Cerrar puertas y ventanas exteriores; no asomarse a ventanales; apagar extractores de aire si hay gases.',
      after: 'Esperar comunicación de la Gerencia para ordenar salida escalonada o teletrabajo transitorio.'
    },
    {
      id: 12,
      name: 'Riesgos en Desplazamientos y Misiones Externas',
      icon: <MapPin className="w-5 h-5 text-cyan-500" />,
      color: 'border-cyan-200 bg-cyan-50/50 text-cyan-900',
      description: 'Accidentes de tránsito o incidentes durante desplazamientos a juzgados, notarías, bancos o visitas a clientes en Medellín.',
      before: 'Planificar rutas seguras, verificar estado del clima (alertas de lluvias o inundaciones viales del SIATA).',
      during: 'Usar siempre cinturón de seguridad; en motos, casco reglamentario certificado y chaleco reflectivo.',
      after: 'Reportar cualquier siniestro inmediatamente a la coordinación administrativa para activación de pólizas.'
    }
  ];

  const handleCreateDrill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrill.name || !newDrill.scenario) return;

    const drill: DrillRecord = {
      id: `drl-${Date.now()}`,
      code: `SIM-2026-0${drills.length + 1}`,
      name: newDrill.name || 'Simulacro de Evacuación',
      date: newDrill.date || new Date().toISOString().substring(0, 10),
      scenario: newDrill.scenario || '',
      evacuatedPersonnel: Number(newDrill.evacuatedPersonnel) || 20,
      durationMinutes: Number(newDrill.durationMinutes) || 4.0,
      meetingPoint: newDrill.meetingPoint || 'Plazoleta exterior',
      findings: newDrill.findings || '',
      actionsTaken: newDrill.actionsTaken || '',
      complianceRating: Number(newDrill.complianceRating) || 90,
      coordinator: newDrill.coordinator || 'Líder SST',
    };

    onAddDrill(drill);
    setShowSimulacroModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Banner with Real Photo */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img 
            src={emergencyImage} 
            alt="Brigada de Emergencias Data Integral" 
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <AlertTriangle className="w-3.5 h-3.5" />
            Plan de Prevención, Preparación y Respuesta ante Emergencias
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Gestión Integral de Emergencias en <span className="text-emerald-400">Oficina</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Protocolos de salvaguarda humana, Brigada de Emergencias capacitada, inventario de extintores y botiquines, rutas de evacuación y simulacros para la sede de Data Integral en Medellín.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => downloadEmergencyPlanPdf(brigade, equipment, company)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Plan de Emergencias Oficial (PDF)</span>
            </button>
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Punto de Encuentro: Plazoleta Exterior Edificio Poblado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2">
        <button
          onClick={() => setActiveTab('riesgos')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'riesgos'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>12 Emergencias de Oficina</span>
        </button>
        <button
          onClick={() => setActiveTab('brigada')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'brigada'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Brigada de Emergencias ({brigade.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('recursos')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'recursos'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Equipos & Extintores ({equipment.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('evacuacion')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'evacuacion'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Rutas de Evacuación & Planos</span>
        </button>
        <button
          onClick={() => setActiveTab('simulacros')}
          className={`flex items-center gap-2 px-4 py-3 font-semibold text-xs border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'simulacros'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Simulacros & Acciones de Mejora ({drills.length})</span>
        </button>
      </div>

      {/* TAB 1: 12 OFFICE EMERGENCIES */}
      {activeTab === 'riesgos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Emergency list */}
          <div className="lg:col-span-5 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Eventos Contemplados para Data Integral
            </h3>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {officeEmergencies.map((em, idx) => {
                const isSelected = selectedEmergency === idx;
                return (
                  <button
                    key={em.id}
                    onClick={() => setSelectedEmergency(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-xs">
                        {em.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">{em.name}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{em.description}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-600 translate-x-1' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emergency Details Drilldown */}
          <div className="lg:col-span-7">
            {officeEmergencies[selectedEmergency] && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-6 sticky top-24">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                      {officeEmergencies[selectedEmergency].icon}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Protocolo Operativo Normalizado (PON)</span>
                      <h4 className="text-xl font-extrabold text-slate-900">{officeEmergencies[selectedEmergency].name}</h4>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Contexto en Data Integral: </strong>
                  {officeEmergencies[selectedEmergency].description}
                </div>

                {/* Steps Before, During, After */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
                      ANTES (Prevención y Mitigación):
                    </div>
                    <p className="text-xs text-slate-700 pl-7 leading-relaxed">
                      {officeEmergencies[selectedEmergency].before}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                      <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">2</span>
                      DURANTE (Respuesta Inmediata):
                    </div>
                    <p className="text-xs text-slate-700 pl-7 leading-relaxed">
                      {officeEmergencies[selectedEmergency].during}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
                      DESPUÉS (Recuperación y Evaluación):
                    </div>
                    <p className="text-xs text-slate-700 pl-7 leading-relaxed">
                      {officeEmergencies[selectedEmergency].after}
                    </p>
                  </div>
                </div>

                {/* Local emergency numbers */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Líneas de socorro activas:</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-red-700 font-bold">123 (Emergencias Medellín)</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-amber-700 font-bold">119 (Bomberos)</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-blue-700 font-bold">01 8000 511 414 (ARL Sura)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BRIGADE MEMBERS */}
      {activeTab === 'brigada' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">Brigada de Emergencias Data Integral</h3>
              <p className="text-xs text-slate-500">Equipo voluntario de primera respuesta debidamente capacitado y certificado</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingMember({
                    id: `brg-${Date.now()}`,
                    name: '',
                    position: 'Colaborador',
                    area: 'Área Jurídica',
                    brigadeRole: 'Evacuación y Rescate',
                    phone: '310 000 0000',
                    extension: '100',
                    certifiedUntil: '2027-12-31',
                    bloodType: 'O+'
                  });
                  setShowMemberModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Brigadista</span>
              </button>
              <div className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg font-semibold hidden sm:block">
                ✓ Cobertura completa en jornada de oficina
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brigade.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 hover:border-emerald-400 transition-all space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-base shadow">
                    {member.name.charAt(0) || 'D'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{member.name || 'Sin nombre'}</h4>
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {member.brigadeRole}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div><span className="font-semibold text-slate-800">Cargo:</span> {member.position}</div>
                  <div><span className="font-semibold text-slate-800">Área:</span> {member.area}</div>
                  <div><span className="font-semibold text-slate-800">Celular / Ext:</span> {member.phone} (Ext. {member.extension})</div>
                  <div><span className="font-semibold text-slate-800">Grupo Sanguíneo:</span> <span className="font-mono font-bold text-red-600">{member.bloodType}</span></div>
                  <div><span className="font-semibold text-slate-800">Certificación:</span> Válida hasta {member.certifiedUntil}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Acreditado
                  </span>
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setShowMemberModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold transition-colors"
                    title="Editar nombre y datos de esta persona"
                  >
                    <Edit3 className="w-3 h-3 text-emerald-600" />
                    <span>Editar datos</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EDIT BRIGADE MEMBER MODAL */}
          {showMemberModal && editingMember && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-base font-bold text-slate-900">Editar Datos del Brigadista</h3>
                  <button onClick={() => setShowMemberModal(false)} className="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const exists = brigade.some(b => b.id === editingMember.id);
                  const updated = exists 
                    ? brigade.map(b => b.id === editingMember.id ? editingMember : b)
                    : [...brigade, editingMember];
                  onUpdateBrigade(updated);
                  setShowMemberModal(false);
                }} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nombre Completo de la Persona</label>
                    <input
                      type="text"
                      required
                      value={editingMember.name}
                      onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-slate-900 text-sm"
                      placeholder="Ej: Andrés Felipe Zapata Cadavid"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Cargo Laboral</label>
                      <input
                        type="text"
                        required
                        value={editingMember.position}
                        onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                        placeholder="Ej: Analista Senior"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Área o Departamento</label>
                      <input
                        type="text"
                        required
                        value={editingMember.area}
                        onChange={(e) => setEditingMember({ ...editingMember, area: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                        placeholder="Ej: Operaciones Financieras"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Rol en Brigada</label>
                      <select
                        value={editingMember.brigadeRole}
                        onChange={(e) => setEditingMember({ ...editingMember, brigadeRole: e.target.value as any })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl font-semibold text-slate-800"
                      >
                        <option value="Jefe de Brigada">Jefe de Brigada</option>
                        <option value="Primeros Auxilios">Primeros Auxilios</option>
                        <option value="Evacuación y Rescate">Evacuación y Rescate</option>
                        <option value="Control de Incendios">Control de Incendios</option>
                        <option value="Apoyo y Comunicaciones">Apoyo y Comunicaciones</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Grupo Sanguíneo (RH)</label>
                      <input
                        type="text"
                        value={editingMember.bloodType}
                        onChange={(e) => setEditingMember({ ...editingMember, bloodType: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl font-mono uppercase font-bold"
                        placeholder="O+"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Celular de Contacto</label>
                      <input
                        type="text"
                        value={editingMember.phone}
                        onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                        placeholder="Ej: 312 450 9911"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Extensión Telefónica</label>
                      <input
                        type="text"
                        value={editingMember.extension}
                        onChange={(e) => setEditingMember({ ...editingMember, extension: e.target.value })}
                        className="w-full p-2.5 border border-slate-300 rounded-xl"
                        placeholder="Ej: 104"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Fecha Vigencia Certificación</label>
                    <input
                      type="date"
                      value={editingMember.certifiedUntil}
                      onChange={(e) => setEditingMember({ ...editingMember, certifiedUntil: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t">
                    <button
                      type="button"
                      onClick={() => setShowMemberModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                    >
                      Guardar Datos Directamente
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Responsabilidades Principales de la Brigada:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Inspección mensual preventiva de extintores, detectores de humo y botiquines.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Coordinación del desalojo ordenado y control de tiempos en escaleras presurizadas.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Primeros auxilios básicos a colaboradores en el punto de encuentro hasta llegada de ambulancia.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">•</span>
                Paso de lista nominal de los 28 integrantes para verificar que nadie quede atrapado en el piso.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: EQUIPMENT & INSPECTION */}
      {activeTab === 'recursos' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Inventario y Estado de Equipos de Emergencia</h3>
              <p className="text-xs text-slate-500">Extintores, botiquines y camilla rígida de la sede Medellín</p>
            </div>
            <div className="flex gap-2">
              <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg font-bold">
                100% Operativos
              </span>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold">
                <tr>
                  <th className="px-4 py-3 text-left">CÓDIGO</th>
                  <th className="px-4 py-3 text-left">TIPO DE EQUIPO</th>
                  <th className="px-4 py-3 text-left">UBICACIÓN EXACTA</th>
                  <th className="px-4 py-3 text-left">CAPACIDAD</th>
                  <th className="px-4 py-3 text-left">ÚLTIMA INSPECCIÓN</th>
                  <th className="px-4 py-3 text-left">PRÓX. INSPECCIÓN</th>
                  <th className="px-4 py-3 text-left">ESTADO</th>
                  <th className="px-4 py-3 text-left">RESPONSABLE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {equipment.map((eq) => (
                  <tr key={eq.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{eq.code}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{eq.type}</td>
                    <td className="px-4 py-3 text-slate-600">{eq.location}</td>
                    <td className="px-4 py-3 text-slate-600">{eq.capacity || 'N/A'}</td>
                    <td className="px-4 py-3 text-slate-600">{eq.lastInspectionDate}</td>
                    <td className="px-4 py-3 text-slate-600 font-semibold">{eq.nextInspectionDate}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {eq.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{eq.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Extinguisher Tip for Office */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Directriz Técnica para Oficinas de Asesoría Financiera y Servidores:
            </div>
            <p className="leading-relaxed">
              En las oficinas jurídicas y estaciones de cómputo de Data Integral se prioriza el uso de <strong>Extintores Solkaflam (Agente Limpio)</strong> para evitar daños corrosivos por polvo químico en servidores, computadores y expedientes digitales en caso de conato de incendio. Los extintores Multipropósito ABC se ubican en áreas comunes de recepción y cafetería.
            </p>
          </div>
        </div>
      )}

      {/* TAB 4: EVACUATION ROUTES & MAP */}
      {activeTab === 'evacuacion' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Interactive schematic plan */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Plano Esquemático de Evacuación - Piso 6</h3>
                  <p className="text-xs text-slate-500">Sede Principal Poblado, Medellín (Oficinas Data Integral)</p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Ruta Señalizada
                </span>
              </div>

              {/* Graphic Schema Floorplan */}
              <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-xl p-4 text-white overflow-hidden border border-slate-800 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                  <span>ZONA OCCIDENTE (Fachada Calle 10)</span>
                  <span className="font-bold text-emerald-400">PISO 6 - DATA INTEGRAL S.A.S.</span>
                  <span>ZONA ORIENTE</span>
                </div>

                {/* Rooms Schematic */}
                <div className="grid grid-cols-3 gap-3 my-auto py-2 text-center text-xs">
                  <div className="border border-slate-700 bg-slate-900/90 rounded-lg p-3 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">ZONA A</span>
                    <div className="font-bold text-slate-200 text-xs">Área Jurídica & Tutelas</div>
                    <div className="text-[10px] text-emerald-400">Extintor Solkaflam #2</div>
                  </div>

                  <div className="border border-emerald-500/50 bg-emerald-950/20 rounded-lg p-3 space-y-1 relative">
                    <div className="absolute top-1 right-2 text-[9px] text-emerald-400 animate-pulse">PASILLO CENTRAL</div>
                    <span className="text-[10px] text-slate-400 font-mono">ZONA B</span>
                    <div className="font-bold text-slate-200 text-xs">Operaciones Financieras</div>
                    <div className="text-[10px] text-amber-400">Ruta de Evacuación Principal</div>
                  </div>

                  <div className="border border-slate-700 bg-slate-900/90 rounded-lg p-3 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono">ZONA C</span>
                    <div className="font-bold text-slate-200 text-xs">Gerencia & Juntas</div>
                    <div className="text-[10px] text-blue-400">Botiquín Tipo A</div>
                  </div>
                </div>

                {/* Exit Door Arrow */}
                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px]">SALIDA</span>
                    <span>→ Escaleras Presurizadas de Emergencia (Sin uso de ascensores)</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Distancia al punto: 95 metros</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600 pt-2">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="block font-bold text-slate-800">Tiempo Estimado</span>
                  <span>2.5 a 3.5 minutos</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="block font-bold text-slate-800">Capacidad Evacuación</span>
                  <span>28 colaboradores + visitantes</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="block font-bold text-slate-800">Escaleras</span>
                  <span>Puertas cortafuego presurizadas</span>
                </div>
              </div>
            </div>

            {/* Meeting Point Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Punto de Encuentro Oficial
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900 text-sm">Plazoleta Exterior Edificio Poblado</div>
                <p>
                  Ubicado a más de 30 metros de la fachada vidriada del edificio, libre de tendido eléctrico de media tensión y despejado de flujo vehicular.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Procedimiento en el Punto:</div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[9px] flex-shrink-0">1</span>
                  <span>El Jefe de Brigada (Andrés Zapata) toma lista física y digital de los 28 colaboradores.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[9px] flex-shrink-0">2</span>
                  <span>La brigadista de primeros auxilios (Camila Londoño) atiende posibles mareos o contusiones leves.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center text-[9px] flex-shrink-0">3</span>
                  <span>Nadie reingresa a las instalaciones hasta el parte oficial de Bomberos de Medellín.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: DRILLS / SIMULACROS */}
      {activeTab === 'simulacros' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">Historial de Simulacros y Evaluación de Respuesta</h3>
              <p className="text-xs text-slate-500">Ejercicios prácticos conforme al Decreto 1072/2015 art. 2.2.4.6.25</p>
            </div>
            <button
              onClick={() => setShowSimulacroModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Nuevo Simulacro</span>
            </button>
          </div>

          <div className="space-y-4">
            {drills.map((d) => (
              <div key={d.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {d.code}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{d.name}</h4>
                    <span className="text-xs text-slate-500">Fecha de ejecución: {d.date} | Coordinador: {d.coordinator}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-600">{d.complianceRating}%</span>
                    <div className="text-[10px] text-slate-400 font-semibold">Calificación Global</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px]">PERSONAL EVACUADO</span>
                    <span className="font-bold text-slate-900 text-sm">{d.evacuatedPersonnel} personas</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                    <span className="text-slate-400 block text-[10px]">TIEMPO TOTAL</span>
                    <span className="font-bold text-slate-900 text-sm">{d.durationMinutes} minutos</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 col-span-2">
                    <span className="text-slate-400 block text-[10px]">PUNTO DE ENCUENTRO</span>
                    <span className="font-bold text-slate-900 text-sm">{d.meetingPoint}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-800">Escenario recreado: </strong>
                    <span className="text-slate-600">{d.scenario}</span>
                  </div>
                  <div>
                    <strong className="text-amber-800">Hallazgos y Oportunidades de Mejora: </strong>
                    <span className="text-slate-600">{d.findings}</span>
                  </div>
                  <div>
                    <strong className="text-emerald-800">Acciones Correctivas Implementadas: </strong>
                    <span className="text-slate-600">{d.actionsTaken}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW DRILL MODAL */}
      {showSimulacroModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Registrar Nuevo Simulacro de Emergencia</h3>
              <button onClick={() => setShowSimulacroModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateDrill} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre del Simulacro</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Simulacro de Evacuación por Conato de Incendio Eléctrico"
                  value={newDrill.name}
                  onChange={(e) => setNewDrill({ ...newDrill, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newDrill.date}
                    onChange={(e) => setNewDrill({ ...newDrill, date: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Coordinador del Ejercicio</label>
                  <input
                    type="text"
                    required
                    value={newDrill.coordinator}
                    onChange={(e) => setNewDrill({ ...newDrill, coordinator: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Escenario / Hipótesis</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Describa la hipótesis de emergencia (ej. Falla eléctrica en rack de servidores con humo visible)..."
                  value={newDrill.scenario}
                  onChange={(e) => setNewDrill({ ...newDrill, scenario: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Personas Evacuadas</label>
                  <input
                    type="number"
                    value={newDrill.evacuatedPersonnel}
                    onChange={(e) => setNewDrill({ ...newDrill, evacuatedPersonnel: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tiempo (Minutos)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newDrill.durationMinutes}
                    onChange={(e) => setNewDrill({ ...newDrill, durationMinutes: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Calificación (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newDrill.complianceRating}
                    onChange={(e) => setNewDrill({ ...newDrill, complianceRating: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hallazgos Observados</label>
                <textarea
                  rows={2}
                  placeholder="Aspectos que generaron demora o confusión..."
                  value={newDrill.findings}
                  onChange={(e) => setNewDrill({ ...newDrill, findings: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Acciones de Mejora Acordadas</label>
                <textarea
                  rows={2}
                  placeholder="Medidas correctivas para el próximo ejercicio..."
                  value={newDrill.actionsTaken}
                  onChange={(e) => setNewDrill({ ...newDrill, actionsTaken: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowSimulacroModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                >
                  Guardar Registro de Simulacro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
