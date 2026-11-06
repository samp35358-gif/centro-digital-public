import React, { useState, useEffect } from 'react';
import { 
  MainTab, 
  SubModule, 
  UserProfile, 
  CompanySettings, 
  PlanActivity, 
  HazardRiskItem, 
  IncidentReport, 
  TrainingCourse, 
  InspectionRecord, 
  DocumentRecord, 
  EppDelivery, 
  OccupationalHealthRecord, 
  CorrectiveAction, 
  BrigadeMember, 
  EmergencyEquipment, 
  DrillRecord,
  AuditLog
} from './types';
import { storage } from './services/storage';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { HistoryView } from './components/views/HistoryView';
import { EmergenciesView } from './components/views/EmergenciesView';
import { DocumentationView } from './components/views/DocumentationView';
import { IndicatorsView } from './components/views/IndicatorsView';
import { LearnView } from './components/views/LearnView';
import { ContactView } from './components/views/ContactView';
import { HelpView } from './components/views/HelpView';

// Sub-modules views
import { AnnualPlanView } from './components/views/AnnualPlanView';
import { HazardMatrixView } from './components/views/HazardMatrixView';
import { InspectionsView } from './components/views/InspectionsView';
import { IncidentsView } from './components/views/IncidentsView';
import { TrainingsView } from './components/views/TrainingsView';
import { EppView } from './components/views/EppView';
import { OccupationalHealthView } from './components/views/OccupationalHealthView';
import { CorrectiveActionsView } from './components/views/CorrectiveActionsView';

// Modals
import { EditCompanyModal } from './components/modals/EditCompanyModal';
import { SearchModal } from './components/modals/SearchModal';
import { AuditLogModal } from './components/modals/AuditLogModal';
import { EditTeamMemberModal } from './components/modals/EditTeamMemberModal';
import { TeamDirectoryModal } from './components/modals/TeamDirectoryModal';
import { PersonaEquipo } from './data/team';

import { 
  Calendar, 
  ShieldAlert, 
  FileCheck2, 
  AlertTriangle, 
  GraduationCap, 
  Package, 
  HeartHandshake, 
  CheckCircle, 
  LayoutDashboard,
  CheckCircle2,
  Users
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setTab] = useState<MainTab>('inicio');
  const [currentSubModule, setSubModule] = useState<SubModule>('dashboard');

  // Core Data State
  const [company, setCompany] = useState<CompanySettings>(() => storage.getCompany());
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => storage.getCurrentUser());
  const [teamMembers, setTeamMembers] = useState<PersonaEquipo[]>(() => storage.getTeamMembers());
  const [activities, setActivities] = useState<PlanActivity[]>(() => storage.getActivities());
  const [hazards, setHazards] = useState<HazardRiskItem[]>(() => storage.getHazards());
  const [incidents, setIncidents] = useState<IncidentReport[]>(() => storage.getIncidents());
  const [trainings, setTrainings] = useState<TrainingCourse[]>(() => storage.getTrainings());
  const [inspections, setInspections] = useState<InspectionRecord[]>(() => storage.getInspections());
  const [documents, setDocuments] = useState<DocumentRecord[]>(() => storage.getDocuments());
  const [eppList, setEppList] = useState<EppDelivery[]>(() => storage.getEpp());
  const [occupational, setOccupational] = useState<OccupationalHealthRecord[]>(() => storage.getOccupational());
  const [correctiveActions, setCorrectiveActions] = useState<CorrectiveAction[]>(() => storage.getCorrectiveActions());
  const [brigade, setBrigade] = useState<BrigadeMember[]>(() => storage.getBrigade());
  const [equipment, setEquipment] = useState<EmergencyEquipment[]>(() => storage.getEquipment());
  const [drills, setDrills] = useState<DrillRecord[]>(() => storage.getDrills());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => storage.getAuditLogs());

  // Modals Visibility
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAuditLogsModal, setShowAuditLogsModal] = useState(false);
  const [showTeamDirectoryModal, setShowTeamDirectoryModal] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<PersonaEquipo | null>(null);
  const [showEditTeamMemberModal, setShowEditTeamMemberModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync Current User with storage
  const handleSetCurrentUser = (u: UserProfile) => {
    setCurrentUser(u);
    storage.setCurrentUser(u);
    storage.addAuditLog('Sesión', 'Cambio de Rol', `Sesión cambiada a ${u.name} (${u.role})`);
    setAuditLogs(storage.getAuditLogs());
    showToast(`Rol cambiado a: ${u.position}`);
  };

  // Company Settings
  const handleSaveCompany = (settings: CompanySettings) => {
    setCompany(settings);
    storage.saveCompany(settings);
    setAuditLogs(storage.getAuditLogs());
    showToast('Datos de Data Integral actualizados exitosamente.');
  };

  // Handlers for Plan Anual
  const handleAddActivity = (act: PlanActivity) => {
    storage.addActivity(act);
    setActivities(storage.getActivities());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Actividad ${act.code} registrada con éxito.`);
  };
  const handleUpdateActivity = (act: PlanActivity) => {
    storage.updateActivity(act);
    setActivities(storage.getActivities());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Actividad ${act.code} actualizada.`);
  };
  const handleDeleteActivity = (id: string) => {
    storage.deleteActivity(id);
    setActivities(storage.getActivities());
    setAuditLogs(storage.getAuditLogs());
    showToast('Actividad eliminada.');
  };

  // Handlers for Hazards
  const handleAddHazard = (h: HazardRiskItem) => {
    storage.addHazard(h);
    setHazards(storage.getHazards());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Peligro ${h.code} registrado.`);
  };
  const handleUpdateHazard = (h: HazardRiskItem) => {
    storage.updateHazard(h);
    setHazards(storage.getHazards());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Peligro ${h.code} actualizado.`);
  };
  const handleDeleteHazard = (id: string) => {
    storage.deleteHazard(id);
    setHazards(storage.getHazards());
    setAuditLogs(storage.getAuditLogs());
    showToast('Peligro eliminado.');
  };

  // Handlers for Incidents
  const handleAddIncident = (inc: IncidentReport) => {
    storage.addIncident(inc);
    setIncidents(storage.getIncidents());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Evento ${inc.code} radicado.`);
  };
  const handleUpdateIncident = (inc: IncidentReport) => {
    storage.updateIncident(inc);
    setIncidents(storage.getIncidents());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Caso ${inc.code} actualizado.`);
  };

  // Handlers for Trainings
  const handleAddTraining = (course: TrainingCourse) => {
    storage.addTraining(course);
    setTrainings(storage.getTrainings());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Capacitación ${course.code} programada.`);
  };
  const handleUpdateTraining = (course: TrainingCourse) => {
    storage.updateTraining(course);
    setTrainings(storage.getTrainings());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Capacitación ${course.code} actualizada.`);
  };

  // Handlers for Inspections
  const handleAddInspection = (insp: InspectionRecord) => {
    storage.addInspection(insp);
    setInspections(storage.getInspections());
    // Also if there were findings, create corrective actions automatically!
    if (insp.findings && insp.findings.length > 0) {
      insp.findings.forEach(f => {
        storage.addCorrectiveAction({
          id: `capa-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          code: `ACC-${Date.now().toString().slice(-3)}`,
          origin: 'Inspección',
          originRefId: insp.code,
          findingDescription: f.description,
          rootCause: 'Condición subestándar detectada en inspección',
          actionDescription: f.correctiveAction,
          priority: f.priority,
          responsible: f.responsible,
          openDate: insp.date,
          deadlineDate: f.deadline,
          evidence: 'Registro de inspección',
          status: 'Abierta',
          effectivenessVerified: false
        });
      });
      setCorrectiveActions(storage.getCorrectiveActions());
    }
    setAuditLogs(storage.getAuditLogs());
    showToast(`Inspección ${insp.code} registrada con calificación del ${insp.scorePercentage}%.`);
  };

  // Handlers for Documents
  const handleAddDocument = (doc: DocumentRecord) => {
    storage.addDocument(doc);
    setDocuments(storage.getDocuments());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Documento ${doc.code} registrado.`);
  };
  const handleUpdateDocument = (doc: DocumentRecord) => {
    storage.updateDocument(doc);
    setDocuments(storage.getDocuments());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Documento ${doc.code} actualizado.`);
  };
  const handleDeleteDocument = (id: string) => {
    storage.deleteDocument(id);
    setDocuments(storage.getDocuments());
    setAuditLogs(storage.getAuditLogs());
    showToast('Documento eliminado.');
  };

  // Handlers for Team Directory
  const handleUpdateTeamMember = (member: PersonaEquipo) => {
    storage.updateTeamMember(member);
    setTeamMembers(storage.getTeamMembers());
    if (currentUser.email === member.email || currentUser.name === member.nombre) {
      setCurrentUser(prev => ({
        ...prev,
        name: member.nombre,
        position: member.cargo,
        area: member.area,
        phone: member.telefono,
      }));
    }
    setAuditLogs(storage.getAuditLogs());
    showToast(`Datos de ${member.nombre} actualizados con éxito.`);
  };

  const handleAddTeamMember = (member: PersonaEquipo) => {
    storage.addTeamMember(member);
    setTeamMembers(storage.getTeamMembers());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Colaborador ${member.nombre} registrado en el equipo.`);
  };

  const handleDeleteTeamMember = (id: string) => {
    storage.deleteTeamMember(id);
    setTeamMembers(storage.getTeamMembers());
    setAuditLogs(storage.getAuditLogs());
    showToast('Colaborador retirado del directorio.');
  };

  // Handlers for EPP
  const handleAddEpp = (delivery: EppDelivery) => {
    storage.addEpp(delivery);
    setEppList(storage.getEpp());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Entrega de EPP ${delivery.code} guardada.`);
  };
  const handleUpdateEpp = (delivery: EppDelivery) => {
    storage.updateEpp(delivery);
    setEppList(storage.getEpp());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Registro de EPP ${delivery.code} actualizado.`);
  };

  // Handlers for Occupational Health
  const handleAddOccupational = (rec: OccupationalHealthRecord) => {
    storage.addOccupational(rec);
    setOccupational(storage.getOccupational());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Registro de salud ocupacional ${rec.code} guardado.`);
  };
  const handleUpdateOccupational = (rec: OccupationalHealthRecord) => {
    storage.updateOccupational(rec);
    setOccupational(storage.getOccupational());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Registro de salud ocupacional ${rec.code} actualizado.`);
  };

  // Handlers for Corrective Actions
  const handleAddCorrectiveAction = (act: CorrectiveAction) => {
    storage.addCorrectiveAction(act);
    setCorrectiveActions(storage.getCorrectiveActions());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Acción correctiva ${act.code} creada.`);
  };
  const handleUpdateCorrectiveAction = (act: CorrectiveAction) => {
    storage.updateCorrectiveAction(act);
    setCorrectiveActions(storage.getCorrectiveActions());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Acción ${act.code} actualizada.`);
  };

  // Handlers for Emergencies
  const handleAddDrill = (d: DrillRecord) => {
    storage.addDrill(d);
    setDrills(storage.getDrills());
    setAuditLogs(storage.getAuditLogs());
    showToast(`Simulacro ${d.code} registrado.`);
  };
  const handleUpdateEquipment = (eq: EmergencyEquipment[]) => {
    storage.saveEquipment(eq);
    setEquipment(eq);
    setAuditLogs(storage.getAuditLogs());
    showToast('Equipos de emergencia actualizados.');
  };
  const handleUpdateBrigade = (updated: BrigadeMember[]) => {
    storage.saveBrigade(updated);
    setBrigade(updated);
    setAuditLogs(storage.getAuditLogs());
    showToast('Lista de brigadistas actualizada exitosamente.');
  };

  // Backup handlers
  const handleExportBackup = () => {
    const jsonStr = storage.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backup_SGSST_Data_Integral_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Copia de seguridad JSON descargada.');
  };

  const handleImportBackup = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (storage.importFullBackup(content)) {
            // Reload state
            setCompany(storage.getCompany());
            setActivities(storage.getActivities());
            setHazards(storage.getHazards());
            setIncidents(storage.getIncidents());
            setTrainings(storage.getTrainings());
            setInspections(storage.getInspections());
            setDocuments(storage.getDocuments());
            setEppList(storage.getEpp());
            setOccupational(storage.getOccupational());
            setCorrectiveActions(storage.getCorrectiveActions());
            setBrigade(storage.getBrigade());
            setEquipment(storage.getEquipment());
            setDrills(storage.getDrills());
            setAuditLogs(storage.getAuditLogs());
            showToast('Copia de seguridad restaurada exitosamente.');
          } else {
            alert('El archivo no tiene el formato válido del SG-SST de Data Integral.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Sub-modules available under Inicio
  const operationalSubModules = [
    { id: 'dashboard', label: 'Tablero General', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'plan_anual', label: 'Plan Anual (PAT)', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'matriz_peligros', label: 'Matriz Peligros (GTC 45)', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'inspecciones', label: 'Inspecciones', icon: <FileCheck2 className="w-3.5 h-3.5" /> },
    { id: 'accidentes', label: 'Incidentes y AT', icon: <AlertTriangle className="w-3.5 h-3.5" /> },
    { id: 'capacitaciones', label: 'Capacitaciones', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'epp', label: 'Dotación EPP', icon: <Package className="w-3.5 h-3.5" /> },
    { id: 'medicina_preventiva', label: 'Salud Ocupacional', icon: <HeartHandshake className="w-3.5 h-3.5" /> },
    { id: 'acciones_mejora', label: 'Planes de Mejora', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setTab={(tab) => {
          setTab(tab);
          if (tab === 'inicio') setSubModule('dashboard');
        }}
        currentSubModule={currentSubModule}
        setSubModule={setSubModule}
        currentUser={currentUser}
        setCurrentUser={handleSetCurrentUser}
        company={company}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenSearch={() => setShowSearchModal(true)}
        onOpenAuditLogs={() => {
          setAuditLogs(storage.getAuditLogs());
          setShowAuditLogsModal(true);
        }}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onOpenTeamDirectory={() => setShowTeamDirectoryModal(true)}
      />

      {/* Sub-navigation bar when inside Inicio to navigate modules */}
      {currentTab === 'inicio' && (
        <div className="bg-white border-b border-slate-200/90 shadow-xs sticky top-[102px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 sm:gap-2">
              {operationalSubModules.map((sm) => {
                const isActive = currentSubModule === sm.id;
                return (
                  <button
                    key={sm.id}
                    onClick={() => setSubModule(sm.id as SubModule)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/40'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>{sm.icon}</span>
                    <span>{sm.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* TAB 1: INICIO (HUB & OPERATIONAL MODULES) */}
        {currentTab === 'inicio' && (
          <>
            {currentSubModule === 'dashboard' && (
              <HomeView
                activities={activities}
                trainings={trainings}
                inspections={inspections}
                incidents={incidents}
                hazards={hazards}
                actions={correctiveActions}
                documents={documents}
                company={company}
                currentUser={currentUser}
                setTab={setTab}
                setSubModule={setSubModule}
                onOpenReportIncident={() => {
                  setTab('inicio');
                  setSubModule('accidentes');
                }}
                onOpenTeamDirectory={() => setShowTeamDirectoryModal(true)}
              />
            )}
            {currentSubModule === 'plan_anual' && (
              <AnnualPlanView
                activities={activities}
                company={company}
                currentUser={currentUser}
                onAddActivity={handleAddActivity}
                onUpdateActivity={handleUpdateActivity}
                onDeleteActivity={handleDeleteActivity}
              />
            )}
            {currentSubModule === 'matriz_peligros' && (
              <HazardMatrixView
                hazards={hazards}
                company={company}
                currentUser={currentUser}
                onAddHazard={handleAddHazard}
                onUpdateHazard={handleUpdateHazard}
                onDeleteHazard={handleDeleteHazard}
              />
            )}
            {currentSubModule === 'inspecciones' && (
              <InspectionsView
                inspections={inspections}
                company={company}
                currentUser={currentUser}
                onAddInspection={handleAddInspection}
              />
            )}
            {currentSubModule === 'accidentes' && (
              <IncidentsView
                incidents={incidents}
                company={company}
                currentUser={currentUser}
                onAddIncident={handleAddIncident}
                onUpdateIncident={handleUpdateIncident}
              />
            )}
            {currentSubModule === 'capacitaciones' && (
              <TrainingsView
                trainings={trainings}
                company={company}
                currentUser={currentUser}
                onAddTraining={handleAddTraining}
                onUpdateTraining={handleUpdateTraining}
              />
            )}
            {currentSubModule === 'epp' && (
              <EppView
                eppList={eppList}
                company={company}
                currentUser={currentUser}
                onAddEpp={handleAddEpp}
                onUpdateEpp={handleUpdateEpp}
              />
            )}
            {currentSubModule === 'medicina_preventiva' && (
              <OccupationalHealthView
                records={occupational}
                company={company}
                currentUser={currentUser}
                onAddRecord={handleAddOccupational}
                onUpdateRecord={handleUpdateOccupational}
              />
            )}
            {currentSubModule === 'acciones_mejora' && (
              <CorrectiveActionsView
                actions={correctiveActions}
                company={company}
                currentUser={currentUser}
                onAddAction={handleAddCorrectiveAction}
                onUpdateAction={handleUpdateCorrectiveAction}
              />
            )}
          </>
        )}

        {/* TAB 2: HISTORIA */}
        {currentTab === 'historia' && (
          <HistoryView company={company} onNavigateToTab={setTab} />
        )}

        {/* TAB 3: EMERGENCIAS */}
        {currentTab === 'emergencias' && (
          <EmergenciesView
            brigade={brigade}
            equipment={equipment}
            drills={drills}
            company={company}
            onAddDrill={handleAddDrill}
            onUpdateEquipment={handleUpdateEquipment}
            onUpdateBrigade={handleUpdateBrigade}
          />
        )}

        {/* TAB 4: DOCUMENTACIÓN */}
        {currentTab === 'documentacion' && (
          <DocumentationView
            documents={documents}
            company={company}
            currentUser={currentUser}
            onAddDocument={handleAddDocument}
            onUpdateDocument={handleUpdateDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        )}

        {/* TAB 5: INDICADORES */}
        {currentTab === 'indicadores' && (
          <IndicatorsView
            activities={activities}
            trainings={trainings}
            inspections={inspections}
            incidents={incidents}
            hazards={hazards}
            actions={correctiveActions}
            documents={documents}
            company={company}
          />
        )}

        {/* TAB 6: APRENDE */}
        {currentTab === 'aprende' && (
          <LearnView />
        )}

        {/* TAB 7: CONTACTO */}
        {currentTab === 'contacto' && (
          <ContactView company={company} />
        )}

        {/* TAB 8: AYUDA */}
        {currentTab === 'ayuda' && (
          <HelpView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">
              di
            </div>
            <div>
              <p className="font-bold text-white text-sm">{company.name}</p>
              <p className="text-[11px] text-slate-400">NIT: {company.nit} · {company.city} · Sede Poblado</p>
            </div>
          </div>

          <div className="text-center md:text-right text-[11px] space-y-0.5">
            <p className="text-slate-300 font-medium">Centro Digital SGSST · Sistema de Gestión de Seguridad y Salud en el Trabajo</p>
            <p className="text-slate-500">Diseñado conforme al Decreto 1072 de 2015 y Resolución 0312 de 2019 de Colombia.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showSettingsModal && (
        <EditCompanyModal
          company={company}
          onSave={handleSaveCompany}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showSearchModal && (
        <SearchModal
          isOpen={showSearchModal}
          onClose={() => setShowSearchModal(false)}
          activities={activities}
          hazards={hazards}
          documents={documents}
          trainings={trainings}
          incidents={incidents}
          setTab={setTab}
          setSubModule={setSubModule}
        />
      )}

      {showAuditLogsModal && (
        <AuditLogModal
          isOpen={showAuditLogsModal}
          onClose={() => setShowAuditLogsModal(false)}
          logs={auditLogs}
        />
      )}

      {/* Team Directory Modal */}
      {showTeamDirectoryModal && (
        <TeamDirectoryModal
          isOpen={showTeamDirectoryModal}
          onClose={() => setShowTeamDirectoryModal(false)}
          team={teamMembers}
          onEditMember={(member) => {
            setEditingTeamMember(member);
            setShowEditTeamMemberModal(true);
          }}
          onAddNewMember={() => {
            setEditingTeamMember({
              id: `team-${Date.now()}`,
              nombre: '',
              cargo: 'Líder',
              area: 'Operaciones',
              sede: 'Sede Sauces',
              categoria: 'lider',
              email: 'nuevo@dataintegral.com.co',
              telefono: '310 000 0000',
              extension: '109',
              rolSST: 'Colaborador y Reportante SST',
              rolUsuario: 'trabajador',
              grupoSanguineo: 'O+'
            });
            setShowEditTeamMemberModal(true);
          }}
          onDeleteMember={handleDeleteTeamMember}
        />
      )}

      {/* Edit Person Modal */}
      {showEditTeamMemberModal && editingTeamMember && (
        <EditTeamMemberModal
          isOpen={showEditTeamMemberModal}
          onClose={() => {
            setShowEditTeamMemberModal(false);
            setEditingTeamMember(null);
          }}
          member={editingTeamMember}
          onSave={handleUpdateTeamMember}
        />
      )}

    </div>
  );
}
