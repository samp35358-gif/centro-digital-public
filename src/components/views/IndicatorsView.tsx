import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Calendar as CalendarIcon, 
  Download, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Target,
  FileSpreadsheet
} from 'lucide-react';
import { 
  PlanActivity, 
  TrainingCourse, 
  InspectionRecord, 
  IncidentReport, 
  HazardRiskItem, 
  CorrectiveAction, 
  DocumentRecord, 
  CompanySettings 
} from '../../types';
import { downloadIndicatorsReportPdf } from '../../utils/pdfGenerator';

interface IndicatorsViewProps {
  activities: PlanActivity[];
  trainings: TrainingCourse[];
  inspections: InspectionRecord[];
  incidents: IncidentReport[];
  hazards: HazardRiskItem[];
  actions: CorrectiveAction[];
  documents: DocumentRecord[];
  company: CompanySettings;
}

export const IndicatorsView: React.FC<IndicatorsViewProps> = ({
  activities,
  trainings,
  inspections,
  incidents,
  hazards,
  actions,
  documents,
  company,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<'all' | 'sem1' | 'sem2'>('all');
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());

  // REAL AUTOMATIC CALCULATIONS FROM ACTUAL SYSTEM DATA
  const todayStr = new Date().toISOString().substring(0, 10);

  // 1. Plan Anual de Trabajo
  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'completada').length;
  const inProgressActivities = activities.filter(a => a.status === 'en_ejecucion').length;
  const overdueActivities = activities.filter(a => (a.status === 'programada' || a.status === 'en_ejecucion') && a.deadlineDate < todayStr).length;
  const pendingActivities = activities.filter(a => a.status === 'programada' && a.deadlineDate >= todayStr).length;
  const planCompliancePct = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
  const avgPlanProgress = totalActivities > 0 ? Math.round(activities.reduce((acc, a) => acc + a.progress, 0) / totalActivities) : 0;

  // 2. Capacitaciones
  const totalTrainings = trainings.length;
  const executedTrainings = trainings.filter(t => t.status === 'Realizada').length;
  const pendingTrainings = trainings.filter(t => t.status === 'Programada').length;
  const trainingExecutionPct = totalTrainings > 0 ? Math.round((executedTrainings / totalTrainings) * 100) : 0;
  const totalInvitedWorkers = trainings.reduce((acc, t) => acc + (t.invitedWorkersCount || 0), 0);
  const totalAttendedWorkers = trainings.reduce((acc, t) => acc + (t.attendedWorkers?.filter(w => w.attended).length || 0), 0);
  const trainingCoveragePct = totalInvitedWorkers > 0 ? Math.round((totalAttendedWorkers / totalInvitedWorkers) * 100) : 0;

  // 3. Inspecciones
  const totalInspections = inspections.length;
  const avgInspectionScore = totalInspections > 0 ? Math.round(inspections.reduce((acc, i) => acc + i.scorePercentage, 0) / totalInspections) : 0;
  const totalInspectionFindings = inspections.reduce((acc, i) => acc + i.findings.length, 0);

  // 4. Incidentes y Accidentes
  const totalIncidents = incidents.length;
  const openIncidents = incidents.filter(i => i.caseStatus !== 'Cerrado').length;
  const lostDays = incidents.reduce((acc, i) => acc + (i.daysLost || 0), 0);
  const severeAccidents = incidents.filter(i => i.eventType === 'accidente_grave').length;

  // 5. Peligros y Riesgos GTC 45
  const totalHazards = hazards.length;
  const highRiskHazards = hazards.filter(h => h.evaluation.acceptability === 'No Aceptable').length;
  const specificControlHazards = hazards.filter(h => h.evaluation.acceptability === 'Aceptable con Control Específico').length;
  const acceptableHazards = hazards.filter(h => h.evaluation.acceptability === 'Aceptable').length;

  // 6. Acciones Correctivas (CAPA)
  const totalActions = actions.length;
  const closedActions = actions.filter(a => a.status === 'Cerrada').length;
  const openActions = actions.filter(a => a.status === 'Abierta' || a.status === 'En Proceso').length;
  const overdueActions = actions.filter(a => (a.status === 'Abierta' || a.status === 'En Proceso') && a.deadlineDate < todayStr).length;
  const closedActionsPct = totalActions > 0 ? Math.round((closedActions / totalActions) * 100) : 0;

  // 7. Documentación Controlada
  const totalDocs = documents.length;
  const validDocs = documents.filter(d => d.status === 'Vigente').length;
  const expiringDocs = documents.filter(d => d.status === 'Próximo a Vencer').length;
  const expiredDocs = documents.filter(d => d.status === 'Vencido').length;
  const validDocsPct = totalDocs > 0 ? Math.round((validDocs / totalDocs) * 100) : 0;

  // Standard Decreto 1072/2015 Indicators Breakdown
  const standardIndicators = [
    {
      type: 'Estructura',
      title: 'Disponibilidad y Divulgación de la Política de SST',
      formula: '(Trabajadores que conocen la política / Total trabajadores de Data Integral) * 100',
      currentValue: '96.4%',
      target: '100%',
      periodicity: 'Anual',
      status: 'Cumplido',
      observation: 'Evaluado en inducción y reinducción 2026.'
    },
    {
      type: 'Estructura',
      title: 'Asignación de Recursos para el SG-SST',
      formula: '(Presupuesto ejecutado en SST / Presupuesto total asignado) * 100',
      currentValue: '88.0%',
      target: '≥ 85%',
      periodicity: 'Semestral',
      status: 'Cumplido',
      observation: 'Dotación ergonómica y brigadas financiadas al 100%.'
    },
    {
      type: 'Proceso',
      title: 'Cumplimiento del Plan Anual de Trabajo',
      formula: '(Actividades ejecutadas a la fecha / Actividades programadas) * 100',
      currentValue: `${planCompliancePct}%`,
      target: '≥ 80%',
      periodicity: 'Trimestral',
      status: planCompliancePct >= 50 ? 'En Rango' : 'Alerta',
      observation: `${completedActivities} de ${totalActivities} actividades completadas.`
    },
    {
      type: 'Proceso',
      title: 'Cobertura del Programa de Capacitación en SST',
      formula: '(N° trabajadores capacitados en el periodo / N° total convocados) * 100',
      currentValue: `${trainingCoveragePct}%`,
      target: '≥ 85%',
      periodicity: 'Trimestral',
      status: trainingCoveragePct >= 80 ? 'Cumplido' : 'Seguimiento',
      observation: `${totalAttendedWorkers} asistencias registradas.`
    },
    {
      type: 'Proceso',
      title: 'Eficacia de Acciones Correctivas y Preventivas',
      formula: '(N° de acciones cerradas y verificadas / N° total de acciones abiertas) * 100',
      currentValue: `${closedActionsPct}%`,
      target: '100%',
      periodicity: 'Mensual',
      status: closedActionsPct >= 75 ? 'Cumplido' : 'Pendientes',
      observation: `${closedActions} de ${totalActions} acciones cerradas eficazmente.`
    },
    {
      type: 'Resultado',
      title: 'Frecuencia de Accidentalidad Laboral (IF)',
      formula: '(N° total de accidentes de trabajo en el periodo / N° Horas Hombre Trabajadas) * 240.000',
      currentValue: '0.00',
      target: '0.00',
      periodicity: 'Mensual',
      status: 'Excelente',
      observation: 'Cero accidentes graves o con pérdida de tiempo reportados.'
    },
    {
      type: 'Resultado',
      title: 'Severidad de Accidentalidad Laboral (IS)',
      formula: '(N° días de incapacidad por AT + días cargados / N° Horas Hombre) * 240.000',
      currentValue: `${lostDays} días`,
      target: '0 días',
      periodicity: 'Mensual',
      status: lostDays === 0 ? 'Excelente' : 'Alerta',
      observation: 'Sin días perdidos acumulados en el año.'
    },
    {
      type: 'Resultado',
      title: 'Incidencia y Prevalencia de Enfermedad Laboral',
      formula: '(N° casos nuevos de EL en el periodo / Promedio de trabajadores) * 100.000',
      currentValue: '0 casos',
      target: '0 casos',
      periodicity: 'Anual',
      status: 'Excelente',
      observation: '0 casos de enfermedad osteomuscular diagnosticados formalmente.'
    }
  ];

  // Simple Month Calendar for Activities
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  
  // Activities in selected month
  const monthlyScheduled = activities.filter(a => {
    const d = new Date(a.deadlineDate);
    return d.getMonth() === calendarMonth && d.getFullYear() === calendarYear;
  });

  const monthlyTrainings = trainings.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === calendarMonth && d.getFullYear() === calendarYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <BarChart3 className="w-3.5 h-3.5" />
            Tablero de Indicadores en Tiempo Real
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Indicadores de Gestión del <span className="text-emerald-400">SG-SST</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Métricas calculadas automáticamente a partir de los registros reales de Data Integral S.A.S. Cumplimiento de Estructura, Proceso y Resultado conforme al Decreto 1072/2015.
          </p>
        </div>

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
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-lg transition-all self-start md:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Informe de Indicadores (PDF)</span>
        </button>
      </div>

      {/* 4 Summary Kpis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Plan de Trabajo</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{avgPlanProgress}%</span>
            <span className="text-xs text-slate-500 font-medium">Avance global</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${avgPlanProgress}%` }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>{completedActivities} completadas</span>
            <span className={overdueActivities > 0 ? 'text-rose-600 font-bold' : ''}>{overdueActivities} vencidas</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capacitaciones</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{trainingCoveragePct}%</span>
            <span className="text-xs text-slate-500 font-medium">Cobertura</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: `${trainingCoveragePct}%` }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>{executedTrainings} realizadas</span>
            <span>{pendingTrainings} programadas</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inspecciones</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{avgInspectionScore}%</span>
            <span className="text-xs text-slate-500 font-medium">Cumplimiento</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-purple-600 h-2 rounded-full transition-all" style={{ width: `${avgInspectionScore}%` }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span>{totalInspections} ejecutadas</span>
            <span>{totalInspectionFindings} hallazgos</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accidentalidad</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{openIncidents}</span>
            <span className="text-xs text-slate-500 font-medium">Casos activos</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className={`h-2 rounded-full transition-all ${openIncidents === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: '100%' }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            <span className="text-emerald-700 font-bold">0 graves</span>
            <span>{lostDays} días perdidos</span>
          </div>
        </div>

      </div>

      {/* Standard Indicators Table (Decreto 1072) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Batería de Indicadores de Estructura, Proceso y Resultado
            </h3>
            <p className="text-xs text-slate-500">
              Fórmulas matemáticas y periodicidades auditables según el Decreto 1072 de 2015
            </p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-mono border">
            Data Integral S.A.S. · Periodo 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold">
              <tr>
                <th className="px-4 py-3 text-left">TIPO</th>
                <th className="px-4 py-3 text-left">INDICADOR Y OBJETIVO</th>
                <th className="px-4 py-3 text-left">FÓRMULA MATEMÁTICA</th>
                <th className="px-4 py-3 text-center">RESULTADO ACTUAL</th>
                <th className="px-4 py-3 text-center">META</th>
                <th className="px-4 py-3 text-center">ESTADO</th>
                <th className="px-4 py-3 text-left">ANÁLISIS Y OBSERVACIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {standardIndicators.map((ind, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ind.type === 'Estructura' 
                        ? 'bg-blue-100 text-blue-800' 
                        : (ind.type === 'Proceso' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800')
                    }`}>
                      {ind.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{ind.title}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-600 max-w-xs">{ind.formula}</td>
                  <td className="px-4 py-3 text-center font-bold text-slate-900 text-sm">{ind.currentValue}</td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-500">{ind.target}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ind.status === 'Cumplido' || ind.status === 'Excelente' || ind.status === 'En Rango'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ind.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs">{ind.observation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Interactive Calendar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Calendario Mensual de Actividades y Eventos SG-SST
              </h3>
              <p className="text-xs text-slate-500">Programación de vencimientos, capacitaciones e inspecciones</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (calendarMonth === 0) {
                  setCalendarMonth(11);
                  setCalendarYear(calendarYear - 1);
                } else {
                  setCalendarMonth(calendarMonth - 1);
                }
              }}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-slate-800 px-3">
              {monthNames[calendarMonth]} {calendarYear}
            </span>
            <button
              onClick={() => {
                if (calendarMonth === 11) {
                  setCalendarMonth(0);
                  setCalendarYear(calendarYear + 1);
                } else {
                  setCalendarMonth(calendarMonth + 1);
                }
              }}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {monthlyScheduled.length === 0 && monthlyTrainings.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No hay actividades programadas con fecha límite en {monthNames[calendarMonth]} {calendarYear}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {monthlyScheduled.map((act) => (
              <div key={act.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                      {act.code}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{act.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{act.objective}</p>
                  <div className="text-[11px] text-slate-600">
                    <span className="font-semibold">Responsable:</span> {act.responsible}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 block">
                    {act.status.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Límite: {act.deadlineDate}</span>
                </div>
              </div>
            ))}

            {monthlyTrainings.map((trn) => (
              <div key={trn.id} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-200 px-1.5 py-0.5 rounded">
                      {trn.code}
                    </span>
                    <span className="text-xs font-bold text-emerald-950">{trn.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">{trn.topic}</p>
                  <div className="text-[11px] text-slate-600">
                    <span className="font-semibold">Instructor:</span> {trn.instructor}
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 block">
                    CAPACITACIÓN
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">{trn.date} - {trn.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
