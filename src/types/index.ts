export type UserRole = 'admin' | 'responsable_sst' | 'jefe_area' | 'trabajador' | 'auditor';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  position: string;
  area: string;
  avatar?: string;
}

export interface CompanySettings {
  name: string;
  slogan: string;
  nit: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  arl: string;
  riskClass: string;
  economicActivity: string;
  representativeName: string;
  sstLeaderName: string;
  sstLicenseNumber: string;
  logoUrl: string;
  totalEmployees: number;
}

export type ActivityStatus = 'programada' | 'en_ejecucion' | 'completada' | 'retrasada' | 'cancelada';

export interface PlanActivity {
  id: string;
  code: string;
  name: string;
  description: string;
  objective: string;
  responsible: string;
  responsibleRole?: string;
  startDate: string;
  deadlineDate: string;
  closeDate?: string;
  resources: string;
  status: ActivityStatus;
  progress: number;
  area: string;
  evidences: Array<{
    id: string;
    name: string;
    uploadDate: string;
    fileSize?: string;
  }>;
  observations: string;
}

export type HazardCategory = 
  | 'Biomecánico'
  | 'Psicosocial'
  | 'Condiciones de Seguridad'
  | 'Físico'
  | 'Químico'
  | 'Biológico'
  | 'Fenómenos Naturales';

export interface HazardRiskItem {
  id: string;
  code: string;
  area: string;
  process: string;
  activity: string;
  routine: boolean;
  hazardCategory: HazardCategory;
  hazardDescription: string;
  possibleEffects: string;
  exposedWorkersCount: number;
  existingControls: {
    source: string;
    medium: string;
    individual: string;
  };
  evaluation: {
    deficiencyLevel: number; // 2, 6, 10
    exposureLevel: number;   // 1, 2, 3, 4
    probabilityLevel: number; // calculated: def * exp
    probabilityInterpretation: string; // Alta, Media, Baja
    consequenceLevel: number; // 10, 25, 60, 100
    riskLevel: number;       // prob * cons
    acceptability: 'No Aceptable' | 'Aceptable con Control Específico' | 'Aceptable';
  };
  interventionMeasures: {
    elimination: string;
    substitution: string;
    engineering: string;
    administrative: string;
    epp: string;
  };
  responsible: string;
  followUpDate: string;
  status: 'Implementado' | 'En proceso' | 'Pendiente';
}

export type EventType = 'accidente_grave' | 'accidente_leve' | 'incidente' | 'condicion_insegura';

export interface IncidentReport {
  id: string;
  code: string;
  eventType: EventType;
  date: string;
  time: string;
  location: string;
  area: string;
  description: string;
  // Personal data protected under Ley 1581 / Res. 1401
  involvedPerson: {
    name: string;
    idNumber: string;
    position: string;
    confidentialNotes?: string;
  };
  immediateCauses: string;
  basicCauses: string;
  consequences: string;
  daysLost: number;
  evidenceFiles: Array<{ name: string; url?: string; date: string }>;
  investigationTeam: string[];
  investigationDate?: string;
  correctiveMeasures: Array<{
    id: string;
    measure: string;
    responsible: string;
    deadline: string;
    status: 'Pendiente' | 'En Proceso' | 'Completada';
  }>;
  followUpDate: string;
  caseStatus: 'Abierto' | 'En Investigación' | 'En Seguimiento' | 'Cerrado';
  reporterName: string;
}

export interface TrainingCourse {
  id: string;
  code: string;
  name: string;
  topic: string;
  objective: string;
  date: string;
  time: string;
  durationHours: number;
  modality: 'Virtual' | 'Presencial' | 'Mixta';
  instructor: string;
  targetAudience: string;
  invitedWorkersCount: number;
  attendedWorkers: Array<{
    workerName: string;
    workerId: string;
    area: string;
    attended: boolean;
    score?: number;
  }>;
  evaluationSummary?: {
    totalEvaluated: number;
    passedCount: number;
    averageScore: number;
  };
  status: 'Programada' | 'Realizada' | 'Cancelada';
  certificateIssued: boolean;
  materialsUrl?: string;
}

export interface InspectionCheckItem {
  id: string;
  question: string;
  result: 'cumple' | 'no_cumple' | 'no_aplica';
  observation: string;
}

export interface InspectionRecord {
  id: string;
  code: string;
  type: 
    | 'Puestos de Trabajo y Ergonomía'
    | 'Extintores y Equipos de Emergencia'
    | 'Botiquines de Primeros Auxilios'
    | 'Instalaciones Eléctricas y Cableado'
    | 'Orden y Aseo (5S)'
    | 'Señalización y Rutas de Evacuación'
    | 'Elementos de Protección Personal';
  date: string;
  inspectorName: string;
  inspectorRole: string;
  area: string;
  items: InspectionCheckItem[];
  findings: Array<{
    id: string;
    description: string;
    priority: 'Alta' | 'Media' | 'Baja';
    correctiveAction: string;
    responsible: string;
    deadline: string;
    status: 'Pendiente' | 'Cerrado';
  }>;
  generalObservations: string;
  scorePercentage: number;
  photoAttached?: boolean;
}

export interface DocumentRecord {
  id: string;
  code: string;
  name: string;
  category: 
    | 'Política'
    | 'Objetivos'
    | 'Matriz de Peligros'
    | 'Matriz Legal'
    | 'Plan Anual de Trabajo'
    | 'Plan Anual de Capacitación'
    | 'COPASST / COCOLA / Brigada'
    | 'Plan de Emergencias'
    | 'Indicadores'
    | 'Auditoría'
    | 'Política y Objetivos'
    | 'Planificación'
    | 'Identificación de Peligros'
    | 'Procedimientos e Instructivos'
    | 'Emergencias'
    | 'Capacitaciones'
    | 'Inspecciones'
    | 'Investigaciones'
    | 'Auditorías'
    | 'Legal'
    | 'Formatos';
  version: string;
  responsible: string;
  creationDate: string;
  reviewDate: string;
  expirationDate: string;
  status: 'Vigente' | 'Próximo a Vencer' | 'Vencido' | 'En Revisión' | 'Borrador';
  isOfficialApproved: boolean;
  approvalDisclaimer?: string;
  description: string;
  fileSize: string;
  contentSummary: string;
  sections?: Array<{ title: string; content: string }>;
  versionHistory: Array<{
    version: string;
    date: string;
    changes: string;
    author: string;
  }>;
}

export interface EppDelivery {
  id: string;
  code: string;
  workerName: string;
  workerId: string;
  position: string;
  area: string;
  itemDelivered: string;
  quantity: number;
  deliveryDate: string;
  estimatedReplacementDate: string;
  condition: 'Nuevo' | 'Buen Estado' | 'Para Reemplazo';
  signedReceipt: boolean;
  observations: string;
}

export interface OccupationalHealthRecord {
  id: string;
  code: string;
  workerName: string;
  workerId: string; // obfuscated / internal
  position: string;
  area: string;
  examType: 'Ingreso' | 'Periódico' | 'Retiro' | 'Post-incapacidad';
  examDate: string;
  concept: 'Apto sin restricciones' | 'Apto con recomendaciones' | 'Aplazado' | 'No Apto temporal';
  workRestrictions: string; // Administrative recommendations only (ergonomic keyboard, stretch breaks, screen filter)
  followUpDate: string;
  complianceStatus: 'Cumpliendo recomendaciones' | 'Pendiente valoración' | 'Cerrado';
  // Strictly NO medical history or clinical diagnosis per Res. 2346 / Ley 1581
}

export interface CorrectiveAction {
  id: string;
  code: string;
  origin: 'Inspección' | 'Auditoría' | 'Investigación Accidente' | 'Revisión por la Dirección' | 'Reporte Trabajador' | 'Simulacro';
  originRefId?: string;
  findingDescription: string;
  rootCause: string;
  actionDescription: string;
  priority: 'Alta' | 'Media' | 'Baja';
  responsible: string;
  openDate: string;
  deadlineDate: string;
  closeDate?: string;
  evidence: string;
  status: 'Abierta' | 'En Proceso' | 'Cerrada' | 'Retrasada';
  effectivenessVerified: boolean;
  verificationNotes?: string;
}

export interface BrigadeMember {
  id: string;
  name: string;
  position: string;
  area: string;
  brigadeRole: 'Jefe de Brigada' | 'Primeros Auxilios' | 'Evacuación y Rescate' | 'Control de Incendios' | 'Apoyo y Comunicaciones';
  phone: string;
  extension: string;
  certifiedUntil: string;
  bloodType: string;
}

export interface EmergencyEquipment {
  id: string;
  code: string;
  type: 'Extintor Solkaflam (Oficina)' | 'Extintor ABC Multipropósito' | 'Extintor CO2' | 'Botiquín Tipo A' | 'Camilla Rígida' | 'Lámpara de Emergencia' | 'Alarma Sonora / Megáfono';
  location: string;
  capacity?: string;
  lastInspectionDate: string;
  nextInspectionDate: string;
  status: 'Operativo' | 'Requiere Mantenimiento' | 'Vencido';
  responsible: string;
}

export interface DrillRecord {
  id: string;
  code: string;
  name: string;
  date: string;
  scenario: string;
  evacuatedPersonnel: number;
  durationMinutes: number;
  meetingPoint: string;
  findings: string;
  actionsTaken: string;
  complianceRating: number; // 0-100
  coordinator: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  module: string;
  action: string;
  details: string;
}

export type MainTab = 
  | 'inicio'
  | 'historia'
  | 'emergencias'
  | 'documentacion'
  | 'indicadores'
  | 'aprende'
  | 'contacto'
  | 'ayuda';

export type SubModule = 
  | 'dashboard'
  | 'plan_anual'
  | 'matriz_peligros'
  | 'inspecciones'
  | 'accidentes'
  | 'capacitaciones'
  | 'epp'
  | 'medicina_preventiva'
  | 'acciones_mejora'
  | 'documentos'
  | 'normativa_0312';
