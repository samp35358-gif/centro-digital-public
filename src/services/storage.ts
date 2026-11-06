import { 
  CompanySettings, 
  UserProfile, 
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
} from '../types';
import { PersonaEquipo, EQUIPO_DATA_INTEGRAL } from '../data/team';

const STORAGE_KEYS = {
  COMPANY: 'data_integral_company_settings_v2',
  CURRENT_USER: 'data_integral_current_user_v2',
  TEAM: 'data_integral_team_members_v2',
  ACTIVITIES: 'data_integral_pat_activities_v2',
  HAZARDS: 'data_integral_hazards_gtc45_v2',
  INCIDENTS: 'data_integral_incidents_v2',
  TRAININGS: 'data_integral_trainings_v2',
  INSPECTIONS: 'data_integral_inspections_v2',
  DOCUMENTS: 'data_integral_documents_v2',
  EPP: 'data_integral_epp_v2',
  OCCUPATIONAL: 'data_integral_occupational_health_v2',
  CORRECTIVE_ACTIONS: 'data_integral_corrective_actions_v2',
  BRIGADE: 'data_integral_brigade_v2',
  EQUIPMENT: 'data_integral_equipment_v2',
  DRILLS: 'data_integral_drills_v2',
  AUDIT_LOGS: 'data_integral_audit_logs_v2',
};

// Initial Company Data - Conforme al Organigrama Oficial
export const initialCompanySettings: CompanySettings = {
  name: 'Data Integral Soluciones S.A.S.',
  slogan: 'Soluciones Jurídicas y Financieras – Bienestar & Seguridad SG-SST',
  nit: '901.584.219-4',
  city: 'Medellín, Antioquia',
  address: 'Sede Principal Medellín (Sedes Sauces, Almacentro y Rionegro)',
  phone: '(+57) (604) 448-9120 / 310 842 5599',
  email: 'sgsst@dataintegral.com.co',
  arl: 'ARL SURA',
  riskClass: 'Clase I (Riesgo Mínimo - Servicios Jurídicos y Financieros)',
  economicActivity: '6910 - Actividades jurídicas y de asesoría financiera',
  representativeName: 'CEO',
  sstLeaderName: 'Coordinador',
  sstLicenseNumber: 'SST-2023-ANT-00941',
  logoUrl: '',
  totalEmployees: 20,
};

// Available roles for switcher denominated by Cargos
export const availableUsers: UserProfile[] = [
  {
    id: 'usr_ceo',
    name: 'CEO',
    email: 'ceo@dataintegral.com.co',
    role: 'admin',
    position: 'CEO (Alta Dirección / Representante Legal)',
    area: 'Dirección General',
  },
  {
    id: 'usr_coordinador',
    name: 'Coordinador',
    email: 'coordinacion@dataintegral.com.co',
    role: 'responsable_sst',
    position: 'Coordinador (Líder SG-SST)',
    area: 'Coordinación Operativa y SST',
  },
  {
    id: 'usr_gerente_sauces',
    name: 'Gerente Sede Sauces',
    email: 'gerencia.sauces@dataintegral.com.co',
    role: 'jefe_area',
    position: 'Gerente Sede Sauces',
    area: 'Sede Sauces',
  },
  {
    id: 'usr_gerente_almacentro',
    name: 'Gerente Sede Almacentro',
    email: 'gerencia.almacentro@dataintegral.com.co',
    role: 'jefe_area',
    position: 'Gerente Sede Almacentro',
    area: 'Sede Almacentro',
  },
  {
    id: 'usr_gerente_rionegro',
    name: 'Gerente Sede Rionegro',
    email: 'gerencia.rionegro@dataintegral.com.co',
    role: 'jefe_area',
    position: 'Gerente Sede Rionegro',
    area: 'Sede Rionegro',
  },
  {
    id: 'usr_abogado',
    name: 'Abogado',
    email: 'abogados@dataintegral.com.co',
    role: 'jefe_area',
    position: 'Abogado (Área Jurídica)',
    area: 'Área Jurídica',
  },
  {
    id: 'usr_contadora',
    name: 'Contadora (Prestación de servicios)',
    email: 'contabilidad@dataintegral.com.co',
    role: 'trabajador',
    position: 'Contadora (Prestación de servicios)',
    area: 'Área Contable y Financiera',
  },
  {
    id: 'usr_lider',
    name: 'Líder de Sede',
    email: 'lider.operaciones@dataintegral.com.co',
    role: 'trabajador',
    position: 'Líder Operativo de Sede',
    area: 'Operaciones de Sede',
  },
  {
    id: 'usr_asesora',
    name: 'Asesora Almacentro',
    email: 'asesora.almacentro@dataintegral.com.co',
    role: 'trabajador',
    position: 'Asesora Almacentro',
    area: 'Sede Almacentro',
  },
  {
    id: 'usr_auditor',
    name: 'Auditor Externo SG-SST',
    email: 'auditoria@consultoressst.com',
    role: 'auditor',
    position: 'Auditor Externo SG-SST (ISO 45001 / Res 0312)',
    area: 'Auditoría Externa',
  },
];

// Initial Annual Work Plan Activities
export const initialActivities: PlanActivity[] = [
  {
    id: 'act-01',
    code: 'PAT-2026-01',
    name: 'Actualización y Divulgación de la Política de SST',
    description: 'Revisión anual de la política de SST con la Gerencia de Data Integral y publicación física y digital para los 28 colaboradores.',
    objective: 'Garantizar el compromiso de la alta dirección y el conocimiento del 100% del personal.',
    responsible: 'Coordinador (Líder SG-SST)',
    responsibleRole: 'responsable_sst',
    startDate: '2026-01-15',
    deadlineDate: '2026-02-15',
    closeDate: '2026-02-12',
    resources: 'Boletín digital, afiches, cartelera informativa, sedes Sauces, Almacentro y Rionegro.',
    status: 'completada',
    progress: 100,
    area: 'Todas las Sedes',
    evidences: [{ id: 'ev-1', name: 'Acta_Aprobacion_Politica_Gerencia.pdf', uploadDate: '2026-02-12' }],
    observations: 'Aprobada formalmente por el CEO y socializada mediante inducción.',
  },
  {
    id: 'act-02',
    code: 'PAT-2026-02',
    name: 'Inspección Ergonómica de Puestos de Trabajo',
    description: 'Evaluación de posturas, pantallas de visualización de datos, iluminación y sillas ergonómicas en puestos jurídicos y financieros.',
    objective: 'Prevenir trastornos musculoesqueléticos en personal con posturas prolongadas sedentes.',
    responsible: 'Coordinador & Ergónomo ARL SURA',
    responsibleRole: 'responsable_sst',
    startDate: '2026-02-10',
    deadlineDate: '2026-03-20',
    closeDate: '2026-03-18',
    resources: 'Luxómetro, lista de chequeo biomecánica, asesoría ARL Sura.',
    status: 'completada',
    progress: 100,
    area: 'Sedes Sauces, Almacentro y Rionegro',
    evidences: [{ id: 'ev-2', name: 'Informe_Inspeccion_Ergonomia_Oficina.pdf', uploadDate: '2026-03-18' }],
    observations: 'Se recomendaron descansapiés y soportes de pantalla para líderes y asesores.',
  },
  {
    id: 'act-03',
    code: 'PAT-2026-03',
    name: 'Capacitación en Pausas Activas y Manejo del Estrés Laboral',
    description: 'Taller práctico vivencial para prevención de estrés por negociación con entidades financieras y digitación continua.',
    objective: 'Promover hábitos saludables y descansos cognitivos programados.',
    responsible: 'Coordinador & Asesoría Especializada SST',
    responsibleRole: 'responsable_sst',
    startDate: '2026-03-01',
    deadlineDate: '2026-04-10',
    closeDate: '2026-04-08',
    resources: 'Sala audiovisual, material pedagógico, ejercicios interactivos.',
    status: 'completada',
    progress: 100,
    area: 'Todas las Sedes',
    evidences: [{ id: 'ev-3', name: 'Registro_Asistencia_Taller_Pausas.pdf', uploadDate: '2026-04-08' }],
    observations: 'Participaron 20 de los 20 cargos de la organización (100% de cobertura).',
  },
  {
    id: 'act-04',
    code: 'PAT-2026-04',
    name: 'Inspección de Extintores y Equipos Contra Incendio',
    description: 'Verificación trimestral de manómetros, precintos, soporte y vencimiento de carga de extintores Solkaflam y Multipropósito.',
    objective: 'Asegurar la operabilidad de los equipos de primera respuesta de la oficina.',
    responsible: 'Coordinador & Gerentes de Sede',
    responsibleRole: 'responsable_sst',
    startDate: '2026-04-15',
    deadlineDate: '2026-05-15',
    closeDate: '2026-05-10',
    resources: 'Checklist de extintores, etiquetas de inspección.',
    status: 'completada',
    progress: 100,
    area: 'Sedes Sauces, Almacentro y Rionegro',
    evidences: [{ id: 'ev-4', name: 'Checklist_Extintores_Q2.pdf', uploadDate: '2026-05-10' }],
    observations: 'Los extintores de todas las sedes se encuentran en óptimo estado operativo.',
  },
  {
    id: 'act-05',
    code: 'PAT-2026-05',
    name: 'Simulacro de Evacuación por Sismo / Falla Eléctrica',
    description: 'Ejercicio de evacuación hacia el Punto de Encuentro externo de cada sede empresarial.',
    objective: 'Medir tiempo de respuesta y preparación de la Brigada de Emergencias.',
    responsible: 'Coordinador & Brigada de Emergencias',
    responsibleRole: 'responsable_sst',
    startDate: '2026-06-01',
    deadlineDate: '2026-07-15',
    resources: 'Pitos, chalecos reflectivos, cronómetro, megáfono.',
    status: 'en_ejecucion',
    progress: 60,
    area: 'Sede Medellín',
    evidences: [{ id: 'ev-5', name: 'Plan_Guion_Simulacro.pdf', uploadDate: '2026-06-12' }],
    observations: 'Guión formulado, coordinando fecha exacta con la administración del edificio.',
  },
  {
    id: 'act-06',
    code: 'PAT-2026-06',
    name: 'Medición de Clima Laboral y Factores Psicosociales',
    description: 'Aplicación de batería de riesgo psicosocial avalada por el Ministerio de Trabajo.',
    objective: 'Identificar demandas de la jornada, liderazgo y relaciones laborales en la firma.',
    responsible: 'Psicólogo Especialista con Licencia SST',
    responsibleRole: 'responsable_sst',
    startDate: '2026-07-20',
    deadlineDate: '2026-08-30',
    resources: 'Plataforma digital de encuestas psicométricas, informe confidencial.',
    status: 'programada',
    progress: 0,
    area: 'Gestión Humana y Asesores',
    evidences: [],
    observations: 'Programado para el tercer trimestre del año.',
  },
  {
    id: 'act-07',
    code: 'PAT-2026-07',
    name: 'Auditoría Interna de Cumplimiento SG-SST (Res. 0312/2019)',
    description: 'Evaluación sistemática de los estándares mínimos aplicables para Data Integral.',
    objective: 'Verificar la conformidad del sistema antes de la revisión anual por la alta dirección.',
    responsible: 'Auditor Calificado / Consultor SST',
    responsibleRole: 'auditor',
    startDate: '2026-09-01',
    deadlineDate: '2026-10-15',
    resources: 'Matriz legal, carpetas de evidencias digitales, formato de no conformidades.',
    status: 'programada',
    progress: 0,
    area: 'Toda la organización',
    evidences: [],
    observations: 'Se contratará auditor externo con licencia vigente.',
  },
];

// Initial Hazard Matrix (GTC 45) for Data Integral (Office / Financial & Legal)
export const initialHazards: HazardRiskItem[] = [
  {
    id: 'haz-01',
    code: 'PEL-BIO-01',
    area: 'Oficinas Jurídicas y Asesoría',
    process: 'Gestión Legal e Insolvencia',
    activity: 'Redacción de tutelas, derechos de petición y digitación de expedientes de crédito',
    routine: true,
    hazardCategory: 'Biomecánico',
    hazardDescription: 'Postura prolongada mantenida sedente (>6 horas al día) y movimientos repetitivos de miembros superiores al digitar',
    possibleEffects: 'Dolor lumbar, cervicalgia, síndrome del túnel carpiano, fatiga muscular',
    exposedWorkersCount: 16,
    existingControls: {
      source: 'Mobiliario con sillas de oficina estándar',
      medium: 'Espacio de trabajo adecuado y aire acondicionado',
      individual: 'Instrucción en pausas activas'
    },
    evaluation: {
      deficiencyLevel: 6,
      exposureLevel: 3,
      probabilityLevel: 18,
      probabilityInterpretation: 'Alta',
      consequenceLevel: 25,
      riskLevel: 450,
      acceptability: 'Aceptable con Control Específico'
    },
    interventionMeasures: {
      elimination: 'No aplicable por la naturaleza de la labor administrativa',
      substitution: 'Reemplazo paulatino de sillas fijas por sillas ergonómicas con ajuste 3D',
      engineering: 'Soportes de monitor ajustables en altura e inclinación, descansa-pies ergonómicos',
      administrative: 'Software de alerta de pausas activas cada 2 horas, programa de vigilancia epidemiológica biomecánica',
      epp: 'No requerido'
    },
    responsible: 'Ing. Carolina Morales (Líder SST)',
    followUpDate: '2026-11-15',
    status: 'En proceso'
  },
  {
    id: 'haz-02',
    code: 'PEL-PSI-01',
    area: 'Atención al Cliente y Negociación de Cartera',
    process: 'Negociación Bancaria y Servicio al Usuario',
    activity: 'Atención a clientes con apremio financiero, deudas bancarias y llamadas a entidades crediticias',
    routine: true,
    hazardCategory: 'Psicosocial',
    hazardDescription: 'Carga mental, atención a usuarios en situaciones de vulnerabilidad o estrés económico, metas de acuerdos financieros',
    possibleEffects: 'Estrés laboral, síndrome de burnout, ansiedad, cefalea tensional',
    exposedWorkersCount: 12,
    existingControls: {
      source: 'Protocolos de atención al cliente y mediación jurídica clara',
      medium: 'Ambiente de oficina cerrado, cabinas de llamada insonorizadas parciales',
      individual: 'Talleres de resiliencia y comunicación asertiva'
    },
    evaluation: {
      deficiencyLevel: 6,
      exposureLevel: 3,
      probabilityLevel: 18,
      probabilityInterpretation: 'Alta',
      consequenceLevel: 25,
      riskLevel: 450,
      acceptability: 'Aceptable con Control Específico'
    },
    interventionMeasures: {
      elimination: 'No viable',
      substitution: 'Rotación periódica de casos de alta complejidad',
      engineering: 'Acondicionamiento acústico de la sala de negociación',
      administrative: 'Aplicación de batería de riesgo psicosocial, apoyo psicológico preventivo, pausas de desconexión',
      epp: 'No aplicable'
    },
    responsible: 'Gestión Humana y Líder SST',
    followUpDate: '2026-10-30',
    status: 'En proceso'
  },
  {
    id: 'haz-03',
    code: 'PEL-SEG-01',
    area: 'Instalaciones Generales Piso 6',
    process: 'Administrativo y Servicios Locativos',
    activity: 'Desplazamiento por pasillos, escaleras y áreas comunes de la oficina',
    routine: true,
    hazardCategory: 'Condiciones de Seguridad',
    hazardDescription: 'Riesgo locativo: cables sueltos en el piso, superficies resbalosas ocasionales por aseo, obstáculos en pasillos',
    possibleEffects: 'Caídas al mismo nivel, tropiezos, esguinces, contusiones',
    exposedWorkersCount: 28,
    existingControls: {
      source: 'Canaletas plásticas en la mayoría de escritorios',
      medium: 'Pisos cerámicos antideslizantes en pasillo principal',
      individual: 'Uso de calzado cerrado adecuado'
    },
    evaluation: {
      deficiencyLevel: 2,
      exposureLevel: 3,
      probabilityLevel: 6,
      probabilityInterpretation: 'Media',
      consequenceLevel: 25,
      riskLevel: 150,
      acceptability: 'Aceptable con Control Específico'
    },
    interventionMeasures: {
      elimination: 'Retiro de extensiones eléctricas provisionales en el piso',
      substitution: 'No aplica',
      engineering: 'Instalación de pasacables de piso de alta resistencia y canaletas de aluminio',
      administrative: 'Programa 5S de orden y aseo, señalización de piso húmedo durante labores de limpieza',
      epp: 'Calzado ergonómico de suela antideslizante'
    },
    responsible: 'Servicios Generales & Líder SST',
    followUpDate: '2026-09-30',
    status: 'Implementado'
  },
  {
    id: 'haz-04',
    code: 'PEL-FIS-01',
    area: 'Salas de Servidores y Puestos de Cómputo',
    process: 'Tecnología e Infraestructura Digital',
    activity: 'Uso continuo de pantallas de alta resolución y trabajo en rack de servidores',
    routine: true,
    hazardCategory: 'Físico',
    hazardDescription: 'Iluminación no uniforme y brillo excesivo en pantallas de monitores LED',
    possibleEffects: 'Fatiga visual, ojo seco, cefalea, disminución temporal de agudeza visual',
    exposedWorkersCount: 22,
    existingControls: {
      source: 'Luminarias LED de oficina',
      medium: 'Persianas en ventanales orientados al sol de la tarde',
      individual: 'Exámenes médicos osteomusculares y visuales de ingreso'
    },
    evaluation: {
      deficiencyLevel: 2,
      exposureLevel: 3,
      probabilityLevel: 6,
      probabilityInterpretation: 'Media',
      consequenceLevel: 10,
      riskLevel: 60,
      acceptability: 'Aceptable'
    },
    interventionMeasures: {
      elimination: 'No aplica',
      substitution: 'No aplica',
      engineering: 'Ajuste de persianas microperforadas para control de deslumbramiento solar',
      administrative: 'Regla 20-20-20 (mirar a 20 pies cada 20 minutos durante 20 segundos), exámenes de optometría anuales',
      epp: 'Lentes con filtro antirreflejo y luz azul cuando sean formulados'
    },
    responsible: 'Líder SST & Optómetra Ocupacional',
    followUpDate: '2026-11-20',
    status: 'Implementado'
  },
  {
    id: 'haz-05',
    code: 'PEL-NAT-01',
    area: 'Edificio Empresarial Poblado',
    process: 'Continuidad de Operaciones',
    activity: 'Permanencia en edificio de altura durante jornada laboral',
    routine: false,
    hazardCategory: 'Fenómenos Naturales',
    hazardDescription: 'Sismo o movimiento telúrico en zona de amenaza sísmica intermedia (Valle de Aburrá)',
    possibleEffects: 'Traumatismos, pánico colectivo, colapso de estanterías, atrapamiento',
    exposedWorkersCount: 28,
    existingControls: {
      source: 'Edificio con norma sismo-resistente NSR-10',
      medium: 'Escaleras de emergencia presurizadas y señalizadas',
      individual: 'Brigada de emergencias conformada'
    },
    evaluation: {
      deficiencyLevel: 2,
      exposureLevel: 2,
      probabilityLevel: 4,
      probabilityInterpretation: 'Baja',
      consequenceLevel: 60,
      riskLevel: 240,
      acceptability: 'Aceptable con Control Específico'
    },
    interventionMeasures: {
      elimination: 'No posible',
      substitution: 'No aplica',
      engineering: 'Anclaje a muros de archivadores rodantes y bibliotecas de expedientes legales',
      administrative: 'Simulacros periódicos, divulgación de rutas de evacuación y puntos de encuentro seguros',
      epp: 'Chalecos reflectivos y linternas para brigadistas'
    },
    responsible: 'Comité de Emergencias & Gerencia',
    followUpDate: '2026-12-10',
    status: 'En proceso'
  }
];

// Initial Incident & Accident Records
export const initialIncidents: IncidentReport[] = [
  {
    id: 'inc-01',
    code: 'INC-2026-001',
    eventType: 'incidente',
    date: '2026-02-14',
    time: '10:45 AM',
    location: 'Sede Principal - Pasillo Central Área Jurídica',
    area: 'Área Jurídica',
    description: 'Un asesor tropezó con una canaleta de cables suelta al dirigirse a la sala de juntas con expedientes. Logró sostenerse de la pared sin sufrir caída ni lesiones corporales.',
    involvedPerson: {
      name: 'Persona protegida (Colaborador Jurídico)',
      idNumber: 'CC ********',
      position: 'Asistente Legal',
      confidentialNotes: 'No requirió atención médica ni incapacidad laboral.'
    },
    immediateCauses: 'Canaleta desprendida del adhesivo en piso debido a alto tránsito.',
    basicCauses: 'Falta de fijación mecánica permanente en zonas de alto flujo de personas.',
    consequences: 'Ninguna lesión física ni daño a documentos.',
    daysLost: 0,
    evidenceFiles: [{ name: 'Foto_Canaleta_Desprendida.jpg', date: '2026-02-14' }],
    investigationTeam: ['Ing. Carolina Morales (Líder SST)', 'Dra. Valentina Mesa (Jefe Jurídica)'],
    investigationDate: '2026-02-16',
    correctiveMeasures: [
      {
        id: 'cm-1',
        measure: 'Instalación de pasacables de goma industrial atornillado al piso',
        responsible: 'Servicios Generales',
        deadline: '2026-02-20',
        status: 'Completada'
      }
    ],
    followUpDate: '2026-03-01',
    caseStatus: 'Cerrado',
    reporterName: 'Carolina Morales'
  },
  {
    id: 'inc-02',
    code: 'INC-2026-002',
    eventType: 'condicion_insegura',
    date: '2026-03-25',
    time: '03:15 PM',
    location: 'Área de Cafetería y Descanso',
    area: 'Servicios Generales / Cafetería',
    description: 'Se detectó fuga de agua menor bajo el dispensador de agua filtrada, generando piso húmedo y resbaloso sin señalización de advertencia.',
    involvedPerson: {
      name: 'Reporte General',
      idNumber: 'N/A',
      position: 'Reportado por personal administrativo',
    },
    immediateCauses: 'Manguera de drenaje descalibrada y ausencia momentánea de aviso preventivo de suelo húmedo.',
    basicCauses: 'Mantenimiento preventivo periódico pendiente en el dispensador.',
    consequences: 'Riesgo potencial de caída a nivel para los colaboradores.',
    daysLost: 0,
    evidenceFiles: [{ name: 'Reporte_Condicion_Cafeteria.pdf', date: '2026-03-25' }],
    investigationTeam: ['Líder SST'],
    investigationDate: '2026-03-26',
    correctiveMeasures: [
      {
        id: 'cm-2',
        measure: 'Ajuste de acople hidráulico y colocación de cono amarillo permanente de advertencia',
        responsible: 'Técnico de Mantenimiento',
        deadline: '2026-03-26',
        status: 'Completada'
      }
    ],
    followUpDate: '2026-04-05',
    caseStatus: 'Cerrado',
    reporterName: 'Andrés Felipe Zapata'
  }
];

// Initial Training Courses
export const initialTrainings: TrainingCourse[] = [
  {
    id: 'trn-01',
    code: 'CAP-2026-01',
    name: 'Inducción y Reinducción Integral al SG-SST',
    topic: 'Política, objetivos, derechos, deberes, reporte de peligros y emergencias',
    objective: 'Socializar las directrices del SG-SST de Data Integral a todo el equipo de trabajo.',
    date: '2026-01-28',
    time: '08:30 AM',
    durationHours: 2,
    modality: 'Presencial',
    instructor: 'Ing. Carolina Morales Bedoya (Líder SST)',
    targetAudience: 'Todos los colaboradores de Data Integral',
    invitedWorkersCount: 28,
    attendedWorkers: [
      { workerName: 'Santiago Restrepo', workerId: 'CC 71.321.450', area: 'Dirección', attended: true, score: 95 },
      { workerName: 'Valentina Mesa', workerId: 'CC 1.037.654.120', area: 'Jurídica', attended: true, score: 100 },
      { workerName: 'Andrés Felipe Zapata', workerId: 'CC 1.017.892.341', area: 'Financiera', attended: true, score: 90 },
      { workerName: 'Camila Londoño', workerId: 'CC 1.020.456.789', area: 'Jurídica', attended: true, score: 95 },
      { workerName: 'Mateo Osorio', workerId: 'CC 1.036.987.123', area: 'Operaciones', attended: true, score: 85 },
      { workerName: 'Laura Giraldo', workerId: 'CC 1.018.234.567', area: 'Financiera', attended: true, score: 90 },
    ],
    evaluationSummary: {
      totalEvaluated: 26,
      passedCount: 26,
      averageScore: 92.5
    },
    status: 'Realizada',
    certificateIssued: true
  },
  {
    id: 'trn-02',
    code: 'CAP-2026-02',
    name: 'Taller de Ergonomía y Manejo de Pantallas de Datos',
    topic: 'Postura adecuada, ajuste de silla, ejercicios visuales y estiramientos',
    objective: 'Prevenir patologías osteomusculares en trabajo de oficina.',
    date: '2026-03-12',
    time: '02:00 PM',
    durationHours: 1.5,
    modality: 'Mixta',
    instructor: 'Especialista en Ergonomía - ARL Sura',
    targetAudience: 'Personal administrativo, jurídico y de teletrabajo',
    invitedWorkersCount: 28,
    attendedWorkers: [
      { workerName: 'Valentina Mesa', workerId: 'CC 1.037.654.120', area: 'Jurídica', attended: true, score: 95 },
      { workerName: 'Andrés Felipe Zapata', workerId: 'CC 1.017.892.341', area: 'Financiera', attended: true, score: 90 },
      { workerName: 'Laura Giraldo', workerId: 'CC 1.018.234.567', area: 'Financiera', attended: true, score: 100 },
    ],
    evaluationSummary: {
      totalEvaluated: 25,
      passedCount: 25,
      averageScore: 94
    },
    status: 'Realizada',
    certificateIssued: true
  },
  {
    id: 'trn-03',
    code: 'CAP-2026-03',
    name: 'Uso Práctico de Extintores y Respuesta Inicial ante Incendios',
    topic: 'Teoría del fuego, clases de fuego (A, B, C), uso del extintor Solkaflam y evacuación',
    objective: 'Capacitar a los integrantes de la Brigada y líderes de piso.',
    date: '2026-05-18',
    time: '09:00 AM',
    durationHours: 3,
    modality: 'Presencial',
    instructor: 'Cuerpo de Bomberos Voluntarios de Medellín',
    targetAudience: 'Brigada de Emergencias y Jefes de Área',
    invitedWorkersCount: 10,
    attendedWorkers: [],
    status: 'Programada',
    certificateIssued: false
  }
];

// Initial Inspections
export const initialInspections: InspectionRecord[] = [
  {
    id: 'insp-01',
    code: 'INS-2026-01',
    type: 'Extintores y Equipos de Emergencia',
    date: '2026-04-10',
    inspectorName: 'Ing. Carolina Morales',
    inspectorRole: 'Líder SG-SST',
    area: 'Sede Poblado - Piso 6',
    items: [
      { id: 'q1', question: '¿Extintores libres de obstáculos y debidamente señalizados a 1.50m?', result: 'cumple', observation: 'Ubicados correctamente' },
      { id: 'q2', question: '¿Manómetro en franja verde de presión adecuada?', result: 'cumple', observation: '4 extintores con manómetros presurizados' },
      { id: 'q3', question: '¿Pasador y precinto de seguridad intactos?', result: 'cumple', observation: 'Precintos plásticos con código 2026' },
      { id: 'q4', question: '¿Manguera y boquilla en buen estado sin fisuras?', result: 'cumple', observation: 'Sin obstrucciones' },
      { id: 'q5', question: '¿Tarjeta de inspección mensual diligenciada y fechada?', result: 'cumple', observation: 'Diligenciada al día' },
    ],
    findings: [],
    generalObservations: 'Los 4 extintores (2 Solkaflam 3700g para equipos electrónicos y 2 Multipropósito ABC 10 lbs) están 100% operativos.',
    scorePercentage: 100,
    photoAttached: true
  },
  {
    id: 'insp-02',
    code: 'INS-2026-02',
    type: 'Puestos de Trabajo y Ergonomía',
    date: '2026-03-15',
    inspectorName: 'Ing. Carolina Morales',
    inspectorRole: 'Líder SG-SST',
    area: 'Área de Negociación de Cartera',
    items: [
      { id: 'q1', question: '¿Silla con altura regulable y soporte lumbar adecuado?', result: 'cumple', observation: 'Sillas ergonómicas operativas' },
      { id: 'q2', question: '¿Monitor ubicado frente a los ojos a distancia de un brazo?', result: 'no_cumple', observation: '2 monitores requieren soporte elevador' },
      { id: 'q3', question: '¿Teclado y mouse al mismo nivel de los antebrazos?', result: 'cumple', observation: 'Correcto' },
      { id: 'q4', question: '¿Pies apoyados firmemente en el suelo o descansa-pies?', result: 'no_cumple', observation: 'Falta descansa-pies para 1 colaboradora' },
      { id: 'q5', question: '¿Espacio bajo el escritorio libre de cajas u objetos?', result: 'cumple', observation: 'Espacio despejado' },
    ],
    findings: [
      {
        id: 'f-1',
        description: 'Dos monitores en puestos 4 y 7 se encuentran por debajo de la línea visual requerida.',
        priority: 'Media',
        correctiveAction: 'Instalar bases de madera o brazos ergonómicos ajustables.',
        responsible: 'Líder SST / Compras',
        deadline: '2026-03-30',
        status: 'Cerrado'
      }
    ],
    generalObservations: 'Calificación general favorable (60% cumplimiento inicial, corregido posteriormente mediante adquisición de soportes).',
    scorePercentage: 60,
    photoAttached: true
  }
];

// Initial Legal Documents of SG-SST (10 documentos obligatorios)
export const initialDocuments: DocumentRecord[] = [
  {
    id: 'doc-01',
    code: 'DOC-01-POL',
    name: 'Política de Seguridad y Salud en el Trabajo',
    category: 'Política',
    version: '2.0',
    responsible: 'CEO (Alta Dirección / Representante Legal)',
    creationDate: '2022-03-15',
    reviewDate: '2026-01-15',
    expirationDate: '2027-01-15',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Declaración formal y firmada del compromiso de la alta dirección con la prevención de lesiones, accidentes de trabajo y enfermedades laborales, y la mejora continua del SG-SST.',
    fileSize: '245 KB',
    contentSummary: 'Data Integral Soluciones S.A.S., dedicada a la asesoría financiera y jurídica (Sedes Sauces, Almacentro y Rionegro), se compromete a salvaguardar la salud física, mental y social de sus colaboradores, contratistas y visitantes mediante la identificación y control de peligros biomecánicos, psicosociales y de seguridad, cumpliendo con la normatividad colombiana (Decreto 1072 de 2015 y Res. 0312 de 2019) y asignando los recursos financieros, humanos y técnicos requeridos.',
    sections: [
      {
        title: 'Alcance y Cobertura',
        content: 'Aplica a todos los centros de trabajo de Data Integral Soluciones S.A.S. (Sedes Sauces, Almacentro, Rionegro y Dirección), colaboradores dependientes, contratistas independientes y personal en modalidad de teletrabajo o alternancia.'
      },
      {
        title: 'Compromisos de la Alta Dirección',
        content: '1. Identificar, evaluar y valorar los peligros y gestionar los riesgos prioritarios de oficina.\n2. Proteger la seguridad y salud de todos los trabajadores mediante la mejora continua.\n3. Cumplir la normatividad legal colombiana aplicable en materia de riesgos laborales.'
      }
    ],
    versionHistory: [
      { version: '1.0', date: '2022-03-15', changes: 'Emisión inicial tras constitución legal en Medellín.', author: 'CEO' },
      { version: '2.0', date: '2026-01-15', changes: 'Actualización y alineación con nuevos puestos y sedes operativas.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-02',
    code: 'DOC-02-OBJ',
    name: 'Objetivos del Sistema de Gestión de SST',
    category: 'Objetivos',
    version: '2.0',
    responsible: 'Coordinador (Líder SG-SST)',
    creationDate: '2022-03-15',
    reviewDate: '2026-01-20',
    expirationDate: '2027-01-20',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Objetivos medibles, cuantificables y metas trazadas para el año 2026 para evaluar el SG-SST de Data Integral Soluciones S.A.S. conforme a la política.',
    fileSize: '185 KB',
    contentSummary: '1. Lograr un cumplimiento superior al 90% en la ejecución del Plan Anual de Trabajo en SST.\n2. Mantener en cero (0) la tasa de accidentalidad laboral grave y enfermedades laborales diagnosticadas.\n3. Alcanzar un 90% o más de cobertura en las capacitaciones programadas en ergonomía, autocuidado y emergencias.\n4. Cumplir al 100% las inspecciones periódicas locativas y operativas de extintores y botiquines.',
    sections: [
      {
        title: 'Marco Normativo Aplicable',
        content: 'Decreto 1072 de 2015 (Artículos 2.2.4.6.17 y 2.2.4.6.18) y Resolución 0312 de 2019.'
      },
      {
        title: 'Seguimiento y Medición',
        content: 'Los objetivos se evalúan semestralmente a través de los indicadores de estructura, proceso y resultado del SG-SST.'
      }
    ],
    versionHistory: [
      { version: '1.0', date: '2022-03-15', changes: 'Definición de objetivos fundacionales.', author: 'CEO' },
      { version: '2.0', date: '2026-01-20', changes: 'Fijación de metas cuantitativas para el año 2026.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-03',
    code: 'DOC-03-PEL',
    name: 'Matriz de Peligros y Valoración de Riesgos (GTC 45)',
    category: 'Matriz de Peligros',
    version: '3.0',
    responsible: 'Coordinador (Líder SG-SST)',
    creationDate: '2022-03-20',
    reviewDate: '2026-01-25',
    expirationDate: '2027-01-25',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Matriz técnica metodológica GTC 45 adaptada a servicios jurídicos, negociación de cartera, trabajo administrativo y teletrabajo en Medellín.',
    fileSize: '420 KB',
    contentSummary: 'Consolida la valoración de riesgos para los 20 puestos de trabajo de Data Integral Soluciones S.A.S.:\n• Peligros Biomecánicos: Postura prolongada mantenida en digitación y redacción de tutelas.\n• Peligros Psicosociales: Carga mental, manejo de cartera vencida y atención telefónica continua.\n• Peligros de Seguridad: Cortocircuitos en canaletas de cómputo y riesgo locativo.\n• Fenómenos Naturales: Movimientos sísmicos e incendios en edificación de oficinas.',
    sections: [
      {
        title: 'Metodología Técnica',
        content: 'Guía Técnica Colombiana GTC 45 (Segunda Actualización) y Decreto 1072 de 2015 (Artículo 2.2.4.6.15).'
      },
      {
        title: 'Jerarquía de Intervención',
        content: 'Aplicación de controles de ingeniería (soporte de monitores, sillas ergonómicas con graduación neumática), controles administrativos (pausas activas osteomusculares) y dotación individual.'
      }
    ],
    versionHistory: [
      { version: '3.0', date: '2026-01-25', changes: 'Inclusión de riesgos asociados a teletrabajo y fatiga visual.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-04',
    code: 'DOC-04-LEG',
    name: 'Matriz Legal y Requisitos Normativos en SST',
    category: 'Matriz Legal',
    version: '2.1',
    responsible: 'Abogado (Área Jurídica) & Coordinador',
    creationDate: '2022-03-30',
    reviewDate: '2026-02-10',
    expirationDate: '2027-02-10',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Compilación, análisis de aplicabilidad y evidencia de cumplimiento de las normas del Sistema General de Riesgos Laborales aplicables a Data Integral.',
    fileSize: '390 KB',
    contentSummary: 'Compendio normativo aplicable al sector servicios jurídicos y financieros (CIIU 6910):\n• Ley 1562 de 2012 (Sistema de Riesgos Laborales en Colombia).\n• Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6: SG-SST).\n• Resolución 0312 de 2019 (Estándares Mínimos del SG-SST).\n• Resolución 2400 de 1979 (Higiene y Seguridad en los Lugares de Trabajo).\n• Ley 1010 de 2006 y Resoluciones 652/1356 de 2012 (Acoso Laboral y COCOLA).\n• Resolución 1401 de 2007 (Investigación de Accidentes e Incidentes de Trabajo).\n• Resolución 2346 de 2007 (Regulación de Evaluaciones Médicas Ocupacionales).\n• Decreto 1295 de 1994 y normatividad de ARL SURA.',
    sections: [
      {
        title: 'Fundamento Legal Obligatorio',
        content: 'Decreto 1072 de 2015 (Artículo 2.2.4.6.12 numeral 16).'
      },
      {
        title: 'Mecanismo de Actualización',
        content: 'Monitoreo normativo bimestral con evaluación de evidencias de cumplimiento por el área jurídica y líder SST.'
      }
    ],
    versionHistory: [
      { version: '2.1', date: '2026-02-10', changes: 'Actualización y articulación de protocolos de teletrabajo y circular 071.', author: 'Abogado' }
    ]
  },
  {
    id: 'doc-05',
    code: 'DOC-05-PAT',
    name: 'Plan Anual de Trabajo en SST (PAT)',
    category: 'Plan Anual de Trabajo',
    version: '2.0',
    responsible: 'Coordinador (Líder SG-SST) & CEO',
    creationDate: '2022-04-05',
    reviewDate: '2026-01-10',
    expirationDate: '2027-01-10',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Plan de trabajo anual que establece las metas, cronograma, responsabilidades y recursos asignados para la implementación del SG-SST durante el periodo 2026.',
    fileSize: '360 KB',
    contentSummary: 'Cronograma integral de actividades del periodo 2026:\n1. Actualización de matriz de peligros y valoración de riesgos GTC 45.\n2. Ejecución del programa de medicina preventiva y evaluaciones de aptitud.\n3. Inspecciones periódicas a extintores Solkaflam, botiquines y cableado.\n4. Capacitaciones mensuales en ergonomía, autocuidado y emergencias.\n5. Ejecución del simulacro anual de evacuación en el Edificio Poblado.\n6. Medición de batería de riesgo psicosocial y clima laboral.\n7. Auditoría interna anual de estándares mínimos.',
    sections: [
      {
        title: 'Marco Normativo',
        content: 'Decreto 1072 de 2015 (Artículo 2.2.4.6.8 numeral 7) y Resolución 0312 de 2019.'
      },
      {
        title: 'Firma y Asignación de Recursos',
        content: 'Documento aprobado y firmado por el CEO (Representante Legal), con asignación financiera y técnica formalmente aprobada.'
      }
    ],
    versionHistory: [
      { version: '2.0', date: '2026-01-10', changes: 'Plan Anual de Trabajo para el ciclo 2026.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-06',
    code: 'DOC-06-PAC',
    name: 'Plan Anual de Capacitación y Entrenamiento en SST',
    category: 'Plan Anual de Capacitación',
    version: '2.0',
    responsible: 'Coordinador (Líder SG-SST)',
    creationDate: '2022-04-15',
    reviewDate: '2026-01-18',
    expirationDate: '2027-01-18',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Programa formativo anual de inducción, reinducción, entrenamiento y socialización en seguridad y salud para todos los niveles de la organización.',
    fileSize: '290 KB',
    contentSummary: 'Programa estructurado de formación continua:\n• Módulo 1: Inducción y Reinducción al SG-SST, deberes, derechos y reporte de condiciones.\n• Módulo 2: Taller de ergonomía, postura en digitación y pausas activas programadas.\n• Módulo 3: Uso y manejo práctico de extintores y respuesta inicial ante conatos de incendio.\n• Módulo 4: Prevención del riesgo psicosocial, inteligencia emocional y manejo del estrés.\n• Módulo 5: Primeros auxilios básicos y plan de evacuación por sismos.',
    sections: [
      {
        title: 'Requisito Legal',
        content: 'Decreto 1072 de 2015 (Artículo 2.2.4.6.11) y Resolución 0312 de 2019.'
      },
      {
        title: 'Indicador de Cobertura y Evaluación',
        content: 'Meta de cobertura del 90% con evaluación de conocimiento superior a 80 puntos para emisión de certificados digitales.'
      }
    ],
    versionHistory: [
      { version: '2.0', date: '2026-01-18', changes: 'Actualización del plan formativo 2026.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-07',
    code: 'DOC-07-COM',
    name: 'COPASST / COCOLA / Brigada (Comités y Brigada de Emergencias)',
    category: 'COPASST / COCOLA / Brigada',
    version: '2.0',
    responsible: 'CEO, Coordinador y Gerentes de Sede',
    creationDate: '2022-05-10',
    reviewDate: '2026-02-01',
    expirationDate: '2027-02-01',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Expediente oficial de actas de convocatoria, votación democrática, constitución formal, posesión y actas de reuniones del COPASST/Vigía, COCOLA y Brigada.',
    fileSize: '480 KB',
    contentSummary: 'Composición y actas oficiales de los tres organismos participativos de Data Integral:\n\n1. COPASST / Vigía de SST: Convocatoria, elección libre, designación de representantes del empleador y trabajadores, actas de posesión y actas de reunión mensual para inspecciones y seguimiento (Res. 2013/1986).\n\n2. Comité de Convivencia Laboral (COCOLA): Constitución formal conforme a la Ley 1010 de 2006 y Resoluciones 652 y 1356 de 2012. Manual interno de recepción confidencial de solicitudes y prevención del acoso laboral.\n\n3. Brigada de Emergencias: Estructura voluntaria organizada en grupos de Evacuación, Primeros Auxilios y Control de Incendios, dotados de chalecos distintivos y carné de brigadista.',
    sections: [
      {
        title: 'Marco Normativo',
        content: 'Resolución 2013 de 1986, Resolución 652 de 2012, Resolución 1356 de 2012, Ley 1010 de 2006 y Decreto 1072 de 2015.'
      },
      {
        title: 'Periodicidad de Sesiones',
        content: 'Reunión ordinaria mensual del COPASST y trimestral del Comité de Convivencia Laboral, o extraordinaria ante situaciones urgentes.'
      }
    ],
    versionHistory: [
      { version: '2.0', date: '2026-02-01', changes: 'Posesión y actualización de integrantes para el periodo 2026-2028.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-08',
    code: 'DOC-08-PLE',
    name: 'Plan de Prevención, Preparación y Respuesta ante Emergencias',
    category: 'Plan de Emergencias',
    version: '2.0',
    responsible: 'Coordinador & Brigada de Emergencias',
    creationDate: '2022-06-20',
    reviewDate: '2026-02-05',
    expirationDate: '2027-02-05',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Protocolo de actuación frente a sismos, incendios, fallas eléctricas, emergencias médicas y situaciones de orden público en Medellín.',
    fileSize: '650 KB',
    contentSummary: 'Define la estructura organizacional de la Brigada de Emergencias, las funciones del Comité de Crisis, el inventario de recursos de salvamento, la ruta de evacuación por escaleras presurizadas del Edificio Poblado y el Punto de Encuentro externo.',
    sections: [
      {
        title: 'Punto de Encuentro Oficial',
        content: 'Plazoleta exterior del Edificio Empresarial Poblado, zona despejada a más de 30 metros de fachadas de cristal y cableado de media tensión.'
      },
      {
        title: 'Teléfonos de Emergencia Medellín',
        content: '• Línea Única de Emergencias: 123\n• Bomberos Medellín: 119\n• Cruz Roja Antioquia: 132 / (604) 350-5300\n• ARL Sura Línea de Atención: 01 8000 511 414\n• Policía Nacional Cuadrante Poblado: 123'
      }
    ],
    versionHistory: [
      { version: '2.0', date: '2026-02-05', changes: 'Actualización de miembros de brigada y señalización.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-09',
    code: 'DOC-09-IND',
    name: 'Indicadores de Gestión y Desempeño del SG-SST',
    category: 'Indicadores',
    version: '2.0',
    responsible: 'Coordinador (Líder SG-SST)',
    creationDate: '2022-07-15',
    reviewDate: '2026-01-30',
    expirationDate: '2027-01-30',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Ficha técnica y tablero de indicadores del SG-SST clasificados en estructura, proceso y resultado, calculados automáticamente en la plataforma.',
    fileSize: '310 KB',
    contentSummary: 'Estructura técnica de los indicadores obligatorios según el Decreto 1072/2015:\n\n• Indicadores de Estructura: Política de SST firmada y divulgada, objetivos definidos, recursos financieros y humanos asignados, matriz legal actualizada, plan de trabajo anual firmado.\n\n• Indicadores de Proceso: Porcentaje de ejecución del plan de trabajo anual, porcentaje de cobertura de capacitaciones en SST, ejecución de inspecciones locativas y de emergencias, evaluación de condiciones de salud.\n\n• Indicadores de Resultado: Tasa de accidentalidad laboral, tasa de severidad, prevalencia e incidencia de enfermedades laborales, porcentaje de cumplimiento de acciones correctivas y preventivas (CAPA).',
    sections: [
      {
        title: 'Marco Normativo',
        content: 'Decreto 1072 de 2015 (Artículos 2.2.4.6.19, 2.2.4.6.20, 2.2.4.6.21 y 2.2.4.6.22) y Resolución 0312 de 2019.'
      },
      {
        title: 'Periodicidad de Medición',
        content: 'Medición mensual para proceso y accidentalidad, semestral para planes de acción y anual para indicadores de resultado y auditoría.'
      }
    ],
    versionHistory: [
      { version: '2.0', date: '2026-01-30', changes: 'Fijación de metas numéricas para el ciclo 2026.', author: 'Coordinador' }
    ]
  },
  {
    id: 'doc-10',
    code: 'DOC-10-AUD',
    name: 'Auditoría y Plan de Revisión Anual por la Dirección',
    category: 'Auditoría',
    version: '2.0',
    responsible: 'Auditor Externo SG-SST & CEO',
    creationDate: '2022-08-10',
    reviewDate: '2026-02-15',
    expirationDate: '2027-02-15',
    status: 'Vigente',
    isOfficialApproved: true,
    description: 'Programa anual de auditoría interna de cumplimiento de estándares mínimos y procedimiento de revisión formal por la alta dirección de Data Integral.',
    fileSize: '390 KB',
    contentSummary: 'Directrices del proceso de auditoría y revisión gerencial:\n\n• Programa de Auditoría Interna: Alcance, criterios, idoneidad e independencia del auditor para verificar el cumplimiento de los estándares de la Resolución 0312 de 2019.\n\n• Revisión por la Alta Dirección: Examen anual encabezado por la Gerencia General sobre resultados de indicadores, eficacia de las medidas de control, investigaciones de incidentes y suficiencia de los recursos asignados.\n\n• Planes de Mejora Continua: Formulación de acciones correctivas obligatorias frente a cualquier no conformidad evidenciada.',
    sections: [
      {
        title: 'Marco Normativo',
        content: 'Decreto 1072 de 2015 (Artículos 2.2.4.6.29, 2.2.4.6.30 y 2.2.4.6.31) y Resolución 0312 de 2019.'
      },
      {
        title: 'Entrega de Resultados',
        content: 'El informe final de auditoría y el acta de revisión por la dirección se socializan formalmente con el COPASST y los líderes de proceso.'
      }
    ],
    versionHistory: [
      { version: '2.0', date: '2026-02-15', changes: 'Actualización del plan anual de auditoría y revisión gerencial.', author: 'Auditor Externo SG-SST' }
    ]
  }
];

// Initial Emergency Brigade Roster - Denominado por Cargos del Organigrama
export const initialBrigade: BrigadeMember[] = [
  {
    id: 'brg-01',
    name: 'Coordinador',
    position: 'Coordinador',
    area: 'Coordinación y SG-SST',
    brigadeRole: 'Jefe de Brigada',
    phone: '(+57) 300 234 5678',
    extension: '103',
    certifiedUntil: '2026-12-15',
    bloodType: 'O+'
  },
  {
    id: 'brg-02',
    name: 'Abogado',
    position: 'Abogado',
    area: 'Área Jurídica',
    brigadeRole: 'Primeros Auxilios',
    phone: '(+57) 310 882 1245',
    extension: '108',
    certifiedUntil: '2026-12-15',
    bloodType: 'A+'
  },
  {
    id: 'brg-03',
    name: 'Gerente Sede Sauces',
    position: 'Gerente Sede Sauces',
    area: 'Sede Sauces',
    brigadeRole: 'Evacuación y Rescate',
    phone: '(+57) 315 771 9081',
    extension: '201',
    certifiedUntil: '2026-12-15',
    bloodType: 'O+'
  },
  {
    id: 'brg-04',
    name: 'Gerente Sede Almacentro',
    position: 'Gerente Sede Almacentro',
    area: 'Sede Almacentro',
    brigadeRole: 'Control de Incendios',
    phone: '(+57) 312 450 9910',
    extension: '301',
    certifiedUntil: '2027-01-20',
    bloodType: 'B+'
  },
  {
    id: 'brg-05',
    name: 'Gerente Sede Rionegro',
    position: 'Gerente Sede Rionegro',
    area: 'Sede Rionegro',
    brigadeRole: 'Evacuación y Rescate',
    phone: '(+57) 316 442 8810',
    extension: '401',
    certifiedUntil: '2027-01-20',
    bloodType: 'O+'
  }
];

// Initial Emergency Equipment
export const initialEquipment: EmergencyEquipment[] = [
  {
    id: 'eq-01',
    code: 'EXT-SOL-01',
    type: 'Extintor Solkaflam (Oficina)',
    location: 'Sede Principal / Pasillo Central',
    capacity: '3700 gramos',
    lastInspectionDate: '2026-04-10',
    nextInspectionDate: '2026-05-10',
    status: 'Operativo',
    responsible: 'Coordinador'
  },
  {
    id: 'eq-02',
    code: 'EXT-SOL-02',
    type: 'Extintor Solkaflam (Oficina)',
    location: 'Sede Sauces - Área Operativa',
    capacity: '3700 gramos',
    lastInspectionDate: '2026-04-10',
    nextInspectionDate: '2026-05-10',
    status: 'Operativo',
    responsible: 'Gerente Sede Sauces'
  },
  {
    id: 'eq-03',
    code: 'EXT-ABC-01',
    type: 'Extintor ABC Multipropósito',
    location: 'Sede Almacentro - Recepción y Acceso',
    capacity: '10 Libras',
    lastInspectionDate: '2026-04-10',
    nextInspectionDate: '2026-05-10',
    status: 'Operativo',
    responsible: 'Gerente Sede Almacentro'
  },
  {
    id: 'eq-04',
    code: 'BOT-A-01',
    type: 'Botiquín Tipo A',
    location: 'Sede Rionegro - Área de Bienestar',
    capacity: 'Dotación reglamentaria Res. 0705/2007',
    lastInspectionDate: '2026-04-10',
    nextInspectionDate: '2026-05-10',
    status: 'Operativo',
    responsible: 'Gerente Sede Rionegro'
  },
  {
    id: 'eq-05',
    code: 'CAM-RIG-01',
    type: 'Camilla Rígida',
    location: 'Salida de emergencia lateral con inmovilizador de cuello y arnés',
    capacity: '150 kg',
    lastInspectionDate: '2026-04-10',
    nextInspectionDate: '2026-05-10',
    status: 'Operativo',
    responsible: 'Coordinador'
  }
];

// Initial Drills
export const initialDrills: DrillRecord[] = [
  {
    id: 'drl-01',
    code: 'SIM-2025-01',
    name: 'Simulacro Nacional de Respuesta a Emergencias 2025',
    date: '2025-10-22',
    scenario: 'Sismo de magnitud 6.5 con epicentro regional, corte de fluido eléctrico y evacuación total',
    evacuatedPersonnel: 26,
    durationMinutes: 4.2,
    meetingPoint: 'Plazoleta exterior Edificio Poblado',
    findings: 'El 100% del personal evacuó en calma por las escaleras sin usar ascensores. Se detectó demora de 30 segundos en el conteo en punto de encuentro.',
    actionsTaken: 'Se asignó planilla física plastificada con lista actualizada al Jefe de Brigada.',
    complianceRating: 92,
    coordinator: 'Coordinador'
  }
];

// Initial EPP Deliveries
export const initialEpp: EppDelivery[] = [
  {
    id: 'epp-01',
    code: 'EPP-2026-01',
    workerName: 'Coordinador',
    workerId: 'CRG-COOR-01',
    position: 'Coordinador (Jefe de Brigada General)',
    area: 'Coordinación y SG-SST',
    itemDelivered: 'Chaleco reflectivo naranja de brigadista con distintivo de Data Integral + Silbato náutico + Linterna LED recargable',
    quantity: 1,
    deliveryDate: '2026-01-20',
    estimatedReplacementDate: '2027-01-20',
    condition: 'Nuevo',
    signedReceipt: true,
    observations: 'Dotación entregada para rol de brigadista.'
  },
  {
    id: 'epp-02',
    code: 'EPP-2026-02',
    workerName: 'Abogado',
    workerId: 'CRG-ABOG-01',
    position: 'Abogado',
    area: 'Área Jurídica',
    itemDelivered: 'Cojín ergonómico viscoelástico para soporte lumbar y pad-mouse ergonómico en gel',
    quantity: 1,
    deliveryDate: '2026-02-15',
    estimatedReplacementDate: '2027-02-15',
    condition: 'Buen Estado',
    signedReceipt: true,
    observations: 'Control biomecánico administrativo.'
  }
];

// Initial Occupational Health (strictly administrative)
export const initialOccupational: OccupationalHealthRecord[] = [
  {
    id: 'occ-01',
    code: 'EXA-2026-01',
    workerName: 'Persona con ID Interno #108',
    workerId: 'EMP-0108',
    position: 'Asesor de Negociación',
    area: 'Operaciones Financieras',
    examType: 'Periódico',
    examDate: '2026-02-18',
    concept: 'Apto con recomendaciones',
    workRestrictions: 'Realizar pausas visuales cada 50 minutos; mantener uso de lentes formulados para digitación.',
    followUpDate: '2027-02-18',
    complianceStatus: 'Cumpliendo recomendaciones'
  },
  {
    id: 'occ-02',
    code: 'EXA-2026-02',
    workerName: 'Persona con ID Interno #112',
    workerId: 'EMP-0112',
    position: 'Abogado Sustanciador',
    area: 'Área Jurídica',
    examType: 'Ingreso',
    examDate: '2026-03-05',
    concept: 'Apto sin restricciones',
    workRestrictions: 'Ninguna restricción para el cargo administrativo.',
    followUpDate: '2027-03-05',
    complianceStatus: 'Cerrado'
  }
];

// Initial Corrective Actions
export const initialCorrectiveActions: CorrectiveAction[] = [
  {
    id: 'capa-01',
    code: 'ACC-2026-01',
    origin: 'Inspección',
    originRefId: 'INS-2026-02',
    findingDescription: 'Monitores de asesoría jurídica ubicados por debajo del plano visual, propiciando flexión cervical forzada.',
    rootCause: 'Mesas modulares sin soporte elevador regulable incorporado.',
    actionDescription: 'Compra y acondicionamiento de 6 soportes graduables de pantalla en acrílico negro.',
    priority: 'Media',
    responsible: 'Ing. Carolina Morales',
    openDate: '2026-03-16',
    deadlineDate: '2026-03-30',
    closeDate: '2026-03-28',
    evidence: 'Factura y fotografías de soportes instalados en puestos 3, 4, 7 y 8.',
    status: 'Cerrada',
    effectivenessVerified: true,
    verificationNotes: 'En re-inspección del 10 de abril se evidenció correcta alineación visual de los colaboradores.'
  },
  {
    id: 'capa-02',
    code: 'ACC-2026-02',
    origin: 'Investigación Accidente',
    originRefId: 'INC-2026-001',
    findingDescription: 'Cables de red provisionales sobre el pasillo de circulación jurídica sin fijación adecuada.',
    rootCause: 'Instalación de punto de red temporal que no fue canalizado de manera definitiva.',
    actionDescription: 'Instalación de pasacables de piso de alta resistencia y sujeción con tornillería empotrada.',
    priority: 'Alta',
    responsible: 'Servicios Generales & IT',
    openDate: '2026-02-16',
    deadlineDate: '2026-02-28',
    closeDate: '2026-02-22',
    evidence: 'Registro fotográfico del pasillo despejado y canaleta instalada.',
    status: 'Cerrada',
    effectivenessVerified: true,
    verificationNotes: 'Ruta despejada y segura sin tropiezos.'
  }
];

// Initial Audit Logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-01',
    timestamp: '2026-01-15 09:30',
    userId: 'usr_admin',
    userName: 'Dr. Santiago Restrepo',
    role: 'Administrador',
    module: 'Documentación',
    action: 'Aprobación Oficial',
    details: 'Aprobó y firmó formalmente la Política de SST versión 2.0.'
  },
  {
    id: 'log-02',
    timestamp: '2026-03-18 16:45',
    userId: 'usr_sst',
    userName: 'Ing. Carolina Morales',
    role: 'Responsable SST',
    module: 'Plan Anual de Trabajo',
    action: 'Cierre de Actividad',
    details: 'Marcó como completada la actividad PAT-2026-02 (Inspección Ergonómica).'
  },
  {
    id: 'log-03',
    timestamp: '2026-04-10 11:20',
    userId: 'usr_sst',
    userName: 'Ing. Carolina Morales',
    role: 'Responsable SST',
    module: 'Inspecciones',
    action: 'Creación de Registro',
    details: 'Registró la inspección trimestral de extintores y equipos de emergencia (INS-2026-01).'
  }
];

// Storage Helper
class StorageService {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultVal;
      return JSON.parse(data) as T;
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // Company Settings
  getCompany(): CompanySettings {
    return this.get<CompanySettings>(STORAGE_KEYS.COMPANY, initialCompanySettings);
  }
  saveCompany(settings: CompanySettings): void {
    this.set(STORAGE_KEYS.COMPANY, settings);
    this.addAuditLog('Ajustes de Empresa', 'Actualización', 'Se modificaron datos institucionales de Data Integral.');
  }

  // Team Members (Centralized list, editable via code in src/data/team.ts or via UI)
  getTeamMembers(): PersonaEquipo[] {
    return this.get<PersonaEquipo[]>(STORAGE_KEYS.TEAM, EQUIPO_DATA_INTEGRAL);
  }
  saveTeamMembers(team: PersonaEquipo[]): void {
    this.set(STORAGE_KEYS.TEAM, team);
    this.addAuditLog('Equipo', 'Actualización', 'Se actualizaron datos de personas en el equipo de Data Integral.');
  }
  updateTeamMember(member: PersonaEquipo): void {
    const list = this.getTeamMembers().map(m => m.id === member.id ? member : m);
    this.saveTeamMembers(list);
    this.addAuditLog('Equipo', 'Edición de Persona', `Se modificaron los datos de ${member.nombre} (${member.cargo})`);
  }
  addTeamMember(member: PersonaEquipo): void {
    const list = this.getTeamMembers();
    list.push(member);
    this.saveTeamMembers(list);
    this.addAuditLog('Equipo', 'Nueva Persona', `Se registró a ${member.nombre} como ${member.cargo}`);
  }
  deleteTeamMember(id: string): void {
    const list = this.getTeamMembers().filter(m => m.id !== id);
    this.saveTeamMembers(list);
    this.addAuditLog('Equipo', 'Eliminación', `Se retiró una persona con ID ${id}`);
  }

  // Current User / Session
  getCurrentUser(): UserProfile {
    return this.get<UserProfile>(STORAGE_KEYS.CURRENT_USER, availableUsers[1]); // Default to Responsable SST
  }
  setCurrentUser(user: UserProfile): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  // Plan Anual de Trabajo
  getActivities(): PlanActivity[] {
    return this.get<PlanActivity[]>(STORAGE_KEYS.ACTIVITIES, initialActivities);
  }
  saveActivities(activities: PlanActivity[]): void {
    this.set(STORAGE_KEYS.ACTIVITIES, activities);
  }
  addActivity(act: PlanActivity): void {
    const list = this.getActivities();
    list.unshift(act);
    this.saveActivities(list);
    this.addAuditLog('Plan Anual', 'Creación', `Creada actividad ${act.code}: ${act.name}`);
  }
  updateActivity(act: PlanActivity): void {
    const list = this.getActivities().map(item => item.id === act.id ? act : item);
    this.saveActivities(list);
    this.addAuditLog('Plan Anual', 'Modificación', `Actualizada actividad ${act.code}`);
  }
  deleteActivity(id: string): void {
    const list = this.getActivities().filter(item => item.id !== id);
    this.saveActivities(list);
    this.addAuditLog('Plan Anual', 'Eliminación', `Eliminada actividad con ID ${id}`);
  }

  // Hazards
  getHazards(): HazardRiskItem[] {
    return this.get<HazardRiskItem[]>(STORAGE_KEYS.HAZARDS, initialHazards);
  }
  saveHazards(hazards: HazardRiskItem[]): void {
    this.set(STORAGE_KEYS.HAZARDS, hazards);
  }
  addHazard(hazard: HazardRiskItem): void {
    const list = this.getHazards();
    list.unshift(hazard);
    this.saveHazards(list);
    this.addAuditLog('Matriz de Peligros', 'Creación', `Registrado peligro ${hazard.code} (${hazard.hazardCategory})`);
  }
  updateHazard(hazard: HazardRiskItem): void {
    const list = this.getHazards().map(item => item.id === hazard.id ? hazard : item);
    this.saveHazards(list);
    this.addAuditLog('Matriz de Peligros', 'Modificación', `Actualizado peligro ${hazard.code}`);
  }
  deleteHazard(id: string): void {
    const list = this.getHazards().filter(item => item.id !== id);
    this.saveHazards(list);
    this.addAuditLog('Matriz de Peligros', 'Eliminación', `Eliminado peligro ${id}`);
  }

  // Incidents
  getIncidents(): IncidentReport[] {
    return this.get<IncidentReport[]>(STORAGE_KEYS.INCIDENTS, initialIncidents);
  }
  saveIncidents(incidents: IncidentReport[]): void {
    this.set(STORAGE_KEYS.INCIDENTS, incidents);
  }
  addIncident(inc: IncidentReport): void {
    const list = this.getIncidents();
    list.unshift(inc);
    this.saveIncidents(list);
    this.addAuditLog('Accidentes e Incidentes', 'Creación', `Reportado evento ${inc.code} (${inc.eventType})`);
  }
  updateIncident(inc: IncidentReport): void {
    const list = this.getIncidents().map(item => item.id === inc.id ? inc : item);
    this.saveIncidents(list);
    this.addAuditLog('Accidentes e Incidentes', 'Modificación', `Actualizado caso ${inc.code}`);
  }

  // Trainings
  getTrainings(): TrainingCourse[] {
    return this.get<TrainingCourse[]>(STORAGE_KEYS.TRAININGS, initialTrainings);
  }
  saveTrainings(list: TrainingCourse[]): void {
    this.set(STORAGE_KEYS.TRAININGS, list);
  }
  addTraining(course: TrainingCourse): void {
    const list = this.getTrainings();
    list.unshift(course);
    this.saveTrainings(list);
    this.addAuditLog('Capacitaciones', 'Programación', `Programada capacitación ${course.code}`);
  }
  updateTraining(course: TrainingCourse): void {
    const list = this.getTrainings().map(t => t.id === course.id ? course : t);
    this.saveTrainings(list);
    this.addAuditLog('Capacitaciones', 'Actualización', `Actualizada capacitación ${course.code}`);
  }

  // Inspections
  getInspections(): InspectionRecord[] {
    return this.get<InspectionRecord[]>(STORAGE_KEYS.INSPECTIONS, initialInspections);
  }
  saveInspections(list: InspectionRecord[]): void {
    this.set(STORAGE_KEYS.INSPECTIONS, list);
  }
  addInspection(insp: InspectionRecord): void {
    const list = this.getInspections();
    list.unshift(insp);
    this.saveInspections(list);
    this.addAuditLog('Inspecciones', 'Registro', `Registrada inspección ${insp.code}: ${insp.type}`);
  }

  // Documents
  getDocuments(): DocumentRecord[] {
    const docs = this.get<DocumentRecord[]>(STORAGE_KEYS.DOCUMENTS, initialDocuments);
    if (!docs || docs.length !== 10 || !docs.some(d => d.code === 'DOC-01-POL')) {
      this.saveDocuments(initialDocuments);
      return initialDocuments;
    }
    return docs;
  }
  saveDocuments(docs: DocumentRecord[]): void {
    this.set(STORAGE_KEYS.DOCUMENTS, docs);
  }
  addDocument(doc: DocumentRecord): void {
    const list = this.getDocuments();
    list.unshift(doc);
    this.saveDocuments(list);
    this.addAuditLog('Documentación', 'Creación', `Nuevo documento creado ${doc.code} (${doc.name})`);
  }
  updateDocument(doc: DocumentRecord): void {
    const list = this.getDocuments().map(d => d.id === doc.id ? doc : d);
    this.saveDocuments(list);
    this.addAuditLog('Documentación', 'Actualización', `Actualizado documento ${doc.code} v${doc.version}`);
  }
  deleteDocument(id: string): void {
    const list = this.getDocuments().filter(d => d.id !== id);
    this.saveDocuments(list);
    this.addAuditLog('Documentación', 'Eliminación', `Eliminado documento ${id}`);
  }

  // EPP
  getEpp(): EppDelivery[] {
    return this.get<EppDelivery[]>(STORAGE_KEYS.EPP, initialEpp);
  }
  saveEpp(epp: EppDelivery[]): void {
    this.set(STORAGE_KEYS.EPP, epp);
  }
  addEpp(delivery: EppDelivery): void {
    const list = this.getEpp();
    list.unshift(delivery);
    this.set(STORAGE_KEYS.EPP, list);
    this.addAuditLog('EPP', 'Entrega', `Registrada entrega de EPP ${delivery.code} para ${delivery.workerName}`);
  }
  updateEpp(delivery: EppDelivery): void {
    const list = this.getEpp().map(e => e.id === delivery.id ? delivery : e);
    this.saveEpp(list);
    this.addAuditLog('EPP', 'Modificación', `Actualizada entrega de EPP ${delivery.code} (${delivery.workerName})`);
  }

  // Occupational Health
  getOccupational(): OccupationalHealthRecord[] {
    return this.get<OccupationalHealthRecord[]>(STORAGE_KEYS.OCCUPATIONAL, initialOccupational);
  }
  saveOccupational(records: OccupationalHealthRecord[]): void {
    this.set(STORAGE_KEYS.OCCUPATIONAL, records);
  }
  addOccupational(record: OccupationalHealthRecord): void {
    const list = this.getOccupational();
    list.unshift(record);
    this.set(STORAGE_KEYS.OCCUPATIONAL, list);
    this.addAuditLog('Medicina Preventiva', 'Registro', `Registrado seguimiento administrativo ${record.code}`);
  }
  updateOccupational(record: OccupationalHealthRecord): void {
    const list = this.getOccupational().map(r => r.id === record.id ? record : r);
    this.saveOccupational(list);
    this.addAuditLog('Medicina Preventiva', 'Modificación', `Actualizado concepto de ${record.workerName} (${record.code})`);
  }

  // Corrective Actions
  getCorrectiveActions(): CorrectiveAction[] {
    return this.get<CorrectiveAction[]>(STORAGE_KEYS.CORRECTIVE_ACTIONS, initialCorrectiveActions);
  }
  saveCorrectiveActions(actions: CorrectiveAction[]): void {
    this.set(STORAGE_KEYS.CORRECTIVE_ACTIONS, actions);
  }
  addCorrectiveAction(action: CorrectiveAction): void {
    const list = this.getCorrectiveActions();
    list.unshift(action);
    this.saveCorrectiveActions(list);
    this.addAuditLog('Planes de Mejora', 'Apertura', `Abierta acción correctiva ${action.code}`);
  }
  updateCorrectiveAction(action: CorrectiveAction): void {
    const list = this.getCorrectiveActions().map(a => a.id === action.id ? action : a);
    this.saveCorrectiveActions(list);
    this.addAuditLog('Planes de Mejora', 'Actualización', `Actualizada acción ${action.code}`);
  }

  // Brigade & Equipment & Drills
  getBrigade(): BrigadeMember[] {
    return this.get<BrigadeMember[]>(STORAGE_KEYS.BRIGADE, initialBrigade);
  }
  saveBrigade(b: BrigadeMember[]): void {
    this.set(STORAGE_KEYS.BRIGADE, b);
  }
  getEquipment(): EmergencyEquipment[] {
    return this.get<EmergencyEquipment[]>(STORAGE_KEYS.EQUIPMENT, initialEquipment);
  }
  saveEquipment(eq: EmergencyEquipment[]): void {
    this.set(STORAGE_KEYS.EQUIPMENT, eq);
  }
  getDrills(): DrillRecord[] {
    return this.get<DrillRecord[]>(STORAGE_KEYS.DRILLS, initialDrills);
  }
  addDrill(d: DrillRecord): void {
    const list = this.getDrills();
    list.unshift(d);
    this.set(STORAGE_KEYS.DRILLS, list);
    this.addAuditLog('Emergencias', 'Simulacro', `Registrado simulacro ${d.code}`);
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs);
  }
  addAuditLog(module: string, action: string, details: string): void {
    const currentUser = this.getCurrentUser();
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userId: currentUser.id,
      userName: currentUser.name,
      role: currentUser.role,
      module,
      action,
      details,
    };
    const logs = this.getAuditLogs();
    logs.unshift(log);
    this.set(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100)); // Keep last 100
  }

  // Backup & Restore
  exportFullBackup(): string {
    const backup = {
      company: this.getCompany(),
      activities: this.getActivities(),
      hazards: this.getHazards(),
      incidents: this.getIncidents(),
      trainings: this.getTrainings(),
      inspections: this.getInspections(),
      documents: this.getDocuments(),
      epp: this.getEpp(),
      occupational: this.getOccupational(),
      correctiveActions: this.getCorrectiveActions(),
      brigade: this.getBrigade(),
      equipment: this.getEquipment(),
      drills: this.getDrills(),
      auditLogs: this.getAuditLogs(),
      exportedAt: new Date().toISOString(),
      platform: 'Data Integral SGSST Digital',
    };
    return JSON.stringify(backup, null, 2);
  }

  importFullBackup(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.company) this.set(STORAGE_KEYS.COMPANY, data.company);
      if (data.activities) this.set(STORAGE_KEYS.ACTIVITIES, data.activities);
      if (data.hazards) this.set(STORAGE_KEYS.HAZARDS, data.hazards);
      if (data.incidents) this.set(STORAGE_KEYS.INCIDENTS, data.incidents);
      if (data.trainings) this.set(STORAGE_KEYS.TRAININGS, data.trainings);
      if (data.inspections) this.set(STORAGE_KEYS.INSPECTIONS, data.inspections);
      if (data.documents) this.set(STORAGE_KEYS.DOCUMENTS, data.documents);
      if (data.epp) this.set(STORAGE_KEYS.EPP, data.epp);
      if (data.occupational) this.set(STORAGE_KEYS.OCCUPATIONAL, data.occupational);
      if (data.correctiveActions) this.set(STORAGE_KEYS.CORRECTIVE_ACTIONS, data.correctiveActions);
      if (data.brigade) this.set(STORAGE_KEYS.BRIGADE, data.brigade);
      if (data.equipment) this.set(STORAGE_KEYS.EQUIPMENT, data.equipment);
      if (data.drills) this.set(STORAGE_KEYS.DRILLS, data.drills);
      this.addAuditLog('Sistema', 'Restauración', 'Se restauró copia de seguridad del SG-SST.');
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  }

  resetToDefault(): void {
    localStorage.clear();
    window.location.reload();
  }
}

export const storage = new StorageService();
