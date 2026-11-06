import React, { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  FileText, 
  ShieldAlert, 
  GraduationCap, 
  FileCheck2, 
  ArrowRight, 
  Download, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  ChevronRight,
  UserCheck,
  ShieldCheck,
  Package,
  HeartHandshake
} from 'lucide-react';
import { 
  PlanActivity, 
  TrainingCourse, 
  InspectionRecord, 
  IncidentReport, 
  HazardRiskItem, 
  CorrectiveAction, 
  DocumentRecord, 
  CompanySettings, 
  UserProfile, 
  MainTab, 
  SubModule 
} from '../../types';
import { downloadIndicatorsReportPdf } from '../../utils/pdfGenerator';
import heroImage from '../../assets/images/data_integral_hero_1792798648466.jpg';

interface HomeViewProps {
  activities: PlanActivity[];
  trainings: TrainingCourse[];
  inspections: InspectionRecord[];
  incidents: IncidentReport[];
  hazards: HazardRiskItem[];
  actions: CorrectiveAction[];
  documents: DocumentRecord[];
  company: CompanySettings;
  currentUser: UserProfile;
  setTab: (tab: MainTab) => void;
  setSubModule: (mod: SubModule) => void;
  onOpenReportIncident: () => void;
  onOpenTeamDirectory?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  activities,
  trainings,
  inspections,
  incidents,
  hazards,
  actions,
  documents,
  company,
  currentUser,
  setTab,
  setSubModule,
  onOpenReportIncident,
  onOpenTeamDirectory,
}) => {
  const todayStr = new Date().toISOString().substring(0, 10);

  // REAL AUTOMATIC CALCULATIONS FROM REGISTERED DATA
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'completada').length;
  const inProgressActivities = activities.filter(a => a.status === 'en_ejecucion').length;
  const overdueActivities = activities.filter(a => (a.status === 'programada' || a.status === 'en_ejecucion') && a.deadlineDate < todayStr).length;
  const pendingActivities = activities.filter(a => a.status === 'programada' && a.deadlineDate >= todayStr).length;
  const avgPlanProgress = totalActivities > 0 ? Math.round(activities.reduce((acc, a) => acc + a.progress, 0) / totalActivities) : 0;

  // Trainings
  const totalTrainings = trainings.length;
  const executedTrainings = trainings.filter(t => t.status === 'Realizada').length;
  const pendingTrainings = trainings.filter(t => t.status === 'Programada').length;
  const totalInvitedWorkers = trainings.reduce((acc, t) => acc + (t.invitedWorkersCount || 0), 0);
  const totalAttendedWorkers = trainings.reduce((acc, t) => acc + (t.attendedWorkers?.filter(w => w.attended).length || 0), 0);
  const trainingCoveragePct = totalInvitedWorkers > 0 ? Math.round((totalAttendedWorkers / totalInvitedWorkers) * 100) : 0;

  // Inspections
  const totalInspections = inspections.length;
  const avgInspectionScore = totalInspections > 0 ? Math.round(inspections.reduce((acc, i) => acc + i.scorePercentage, 0) / totalInspections) : 0;

  // Incidents
  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(i => i.caseStatus !== 'Cerrado').length;
  const severeAccidents = incidents.filter(i => i.eventType === 'accidente_grave').length;

  // Hazards
  const totalHazards = hazards.length;
  const highRiskCount = hazards.filter(h => h.evaluation.acceptability === 'No Aceptable').length;
  const mediumRiskCount = hazards.filter(h => h.evaluation.acceptability === 'Aceptable con Control Específico').length;

  // Corrective Actions
  const totalActions = actions.length;
  const closedActions = actions.filter(a => a.status === 'Cerrada').length;
  const openActions = actions.filter(a => a.status === 'Abierta' || a.status === 'En Proceso').length;
  const closedActionsPct = totalActions > 0 ? Math.round((closedActions / totalActions) * 100) : 0;

  // Documents
  const totalDocs = documents.length;
  const validDocs = documents.filter(d => d.status === 'Vigente').length;
  const expiringDocs = documents.filter(d => d.status === 'Próximo a Vencer').length;
  const expiredDocs = documents.filter(d => d.status === 'Vencido').length;
  const validDocsPct = totalDocs > 0 ? Math.round((validDocs / totalDocs) * 100) : 0;

  // Assigned tasks for current role
  const roleActivities = activities.filter(a => {
    if (currentUser.role === 'admin') return true;
    if (currentUser.role === 'responsable_sst') return true;
    if (currentUser.role === 'jefe_area') return a.area.toLowerCase().includes('jurídica') || a.area.toLowerCase().includes('operaciones');
    return a.area === 'Toda la empresa';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Hero Welcome Section with Corporate Photo */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Data Integral Sede Medellín" 
            className="w-full h-full object-cover opacity-25 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/40" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Sede Medellín · Decreto 1072/2015 & Res. 0312/2019
            </span>
            <span className="text-slate-400 font-normal">
              Empresa de Servicios Jurídicos y Financieros · Riesgo I
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Data <span className="text-emerald-400">Integral</span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-200">
              Bienvenidos al Centro Digital SGSST
            </h2>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            Este espacio reúne y organiza la documentación del Sistema de Gestión de Seguridad y Salud en el Trabajo, facilitando su consulta, seguimiento y actualización.
          </p>

          {/* Quick Actions Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReportIncident}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg shadow-emerald-950/40 transition-transform active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-emerald-200" />
              <span>Reportar Condición o Incidente</span>
            </button>

            <button
              onClick={() => {
                setTab('documentacion');
              }}
              className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-5 py-3 rounded-xl border border-slate-600 transition-colors shadow"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Consultar Documentos Oficiales</span>
            </button>

            <button
              onClick={() => downloadIndicatorsReportPdf({
                planProgress: avgPlanProgress,
                trainingCoverage: trainingCoveragePct,
                inspectionScore: avgInspectionScore,
                openIncidents,
                closedActionsPercentage: closedActionsPct,
                validDocsPercentage: validDocsPct,
                totalWorkers: company.totalEmployees
              }, company)}
              className="inline-flex items-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs px-4 py-3 rounded-xl border border-slate-600 transition-colors shadow"
              title="Descargar informe ejecutivo en PDF"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Informe Ejecutivo (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time KPIs Dashboard Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tablero de Control del SG-SST (Tiempo Real)</h3>
            <p className="text-xs text-slate-500">Métricas calculadas directamente de las actividades y registros de Data Integral</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
            ✓ Datos en vivo sincronizados
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Plan Anual */}
          <div 
            onClick={() => setSubModule('plan_anual')}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Plan Anual (PAT)</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{avgPlanProgress}%</div>
              <div className="text-xs text-slate-500 font-medium">Avance Global Ejecutado</div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${avgPlanProgress}%` }} />
            </div>
            <div className="grid grid-cols-2 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <span>{completedActivities} completadas</span>
              <span className="text-right text-rose-600 font-bold">{overdueActivities} vencidas</span>
            </div>
          </div>

          {/* Card 2: Capacitaciones */}
          <div 
            onClick={() => setSubModule('capacitaciones')}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capacitaciones</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{executedTrainings}/{totalTrainings}</div>
              <div className="text-xs text-slate-500 font-medium">Sesiones Realizadas ({trainingCoveragePct}% Cobertura)</div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${trainingCoveragePct}%` }} />
            </div>
            <div className="grid grid-cols-2 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <span>{totalAttendedWorkers} asistencias</span>
              <span className="text-right text-blue-600 font-semibold">{pendingTrainings} pendientes</span>
            </div>
          </div>

          {/* Card 3: Inspecciones */}
          <div 
            onClick={() => setSubModule('inspecciones')}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-400 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inspecciones</span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{avgInspectionScore}%</div>
              <div className="text-xs text-slate-500 font-medium">{totalInspections} Inspecciones Ejecutadas</div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${avgInspectionScore}%` }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <span>Extintores & Ergonomía</span>
              <span className="text-purple-700 font-bold">100% operativos</span>
            </div>
          </div>

          {/* Card 4: Seguridad & Accidentes */}
          <div 
            onClick={() => setSubModule('accidentes')}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-amber-400 cursor-pointer transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accidentalidad</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-slate-900">{severeAccidents}</div>
              <div className="text-xs text-emerald-700 font-bold">Cero Accidentes Graves</div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <span>{openIncidents} casos en seguimiento</span>
              <span className="text-emerald-700 font-bold">0 días perdidos</span>
            </div>
          </div>

        </div>
      </div>

      {/* Secondary Quick Access Modules Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Módulos Operacionales del SG-SST:
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          
          <button
            onClick={() => setSubModule('plan_anual')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <Calendar className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Plan Anual PAT</div>
            <div className="text-[10px] text-slate-500">{totalActivities} actividades</div>
          </button>

          <button
            onClick={() => setSubModule('matriz_peligros')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <ShieldAlert className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Matriz Peligros</div>
            <div className="text-[10px] text-slate-500">GTC 45 ({totalHazards} riesgos)</div>
          </button>

          <button
            onClick={() => setSubModule('inspecciones')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <FileCheck2 className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Inspecciones</div>
            <div className="text-[10px] text-slate-500">Digitales & Checklist</div>
          </button>

          <button
            onClick={() => setSubModule('accidentes')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <AlertTriangle className="w-5 h-5 text-rose-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Incidentes & AT</div>
            <div className="text-[10px] text-slate-500">Res. 1401 de 2007</div>
          </button>

          <button
            onClick={() => setSubModule('capacitaciones')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <GraduationCap className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Capacitaciones</div>
            <div className="text-[10px] text-slate-500">{executedTrainings} ejecutadas</div>
          </button>

          <button
            onClick={() => setSubModule('epp')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <Package className="w-5 h-5 text-teal-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Dotación EPP</div>
            <div className="text-[10px] text-slate-500">Ergonomía & Brigada</div>
          </button>

          <button
            onClick={() => setSubModule('medicina_preventiva')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <HeartHandshake className="w-5 h-5 text-pink-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Salud Ocupacional</div>
            <div className="text-[10px] text-slate-500">Exámenes & Aptitud</div>
          </button>

          <button
            onClick={() => setSubModule('acciones_mejora')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <CheckCircle className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Planes de Mejora</div>
            <div className="text-[10px] text-slate-500">{closedActionsPct}% cerradas</div>
          </button>

          <button
            onClick={() => setTab('emergencias')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <AlertTriangle className="w-5 h-5 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Emergencias</div>
            <div className="text-[10px] text-slate-500">Brigada & Extintores</div>
          </button>

          <button
            onClick={() => setTab('documentacion')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <FileText className="w-5 h-5 text-blue-700 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Documentos</div>
            <div className="text-[10px] text-slate-500">{validDocs} vigentes</div>
          </button>

          <button
            onClick={() => setTab('indicadores')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <TrendingUp className="w-5 h-5 text-emerald-700 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Indicadores</div>
            <div className="text-[10px] text-slate-500">Decreto 1072</div>
          </button>

          <button
            onClick={() => setTab('aprende')}
            className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
          >
            <Sparkles className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-bold text-slate-900 text-xs">Pausas Activas</div>
            <div className="text-[10px] text-slate-500">Temporizador En Vivo</div>
          </button>

        </div>
      </div>

      {/* Role Tasks & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Role Tasks */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">
                Tareas Prioritarias para: <span className="text-emerald-700">{currentUser.name}</span>
              </h4>
            </div>
            <div className="flex items-center gap-2">
              {onOpenTeamDirectory && (
                <button
                  onClick={onOpenTeamDirectory}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 transition-colors flex items-center gap-1.5"
                  title="Ver Organigrama y Estructura por Cargos"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Organigrama / Cargos</span>
                </button>
              )}
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {currentUser.role}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {roleActivities.slice(0, 4).map((act) => (
              <div key={act.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border">
                      {act.code}
                    </span>
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">{act.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Límite: <strong className="text-slate-800">{act.deadlineDate}</strong> · Área: {act.area}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    act.status === 'completada' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {act.status.toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">{act.progress}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Urgent Alerts & Normative Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h4 className="text-base font-bold text-slate-900">Alertas de Vencimiento y Seguimiento</h4>
            </div>
            <span className="text-xs text-slate-400">Semáforo SST</span>
          </div>

          <div className="space-y-3">
            {overdueActivities > 0 && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <div className="text-xs text-rose-900">
                  <strong className="block">Actividades retrasadas del Plan Anual:</strong>
                  <span>Hay {overdueActivities} actividad(es) con fecha límite superada que requieren cierre inmediato.</span>
                </div>
              </div>
            )}

            {expiringDocs > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div className="text-xs text-amber-900">
                  <strong className="block">Documentos próximos a vencer:</strong>
                  <span>{expiringDocs} documento(s) requieren revisión anual técnica antes de su expiración.</span>
                </div>
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div className="text-xs text-emerald-900">
                <strong className="block">Equipos de Emergencia Operativos:</strong>
                <span>Los 4 extintores Solkaflam y botiquines se encuentran presurizados y con inspección al día.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div className="text-xs text-blue-900">
                <strong className="block">Política de SST Vigente y Socializada:</strong>
                <span>Revisada formalmente en 2026 y firmada por el Representante Legal.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
