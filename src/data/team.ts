// =========================================================================
// ORGANIGRAMA DATA INTEGRAL SOLUCIONES S.A.S. - DENOMINADO POR CARGOS
// Estructura oficial según organigrama corporativo (20 cargos definidos)
// =========================================================================

export interface PersonaEquipo {
  id: string;
  nombre: string;
  cargo: string;
  area: string;
  sede: string;
  categoria: 'direccion' | 'asesoria' | 'coordinacion' | 'gerencia' | 'lider' | 'asesor';
  cantidad?: number;
  email: string;
  telefono: string;
  extension: string;
  rolSST?: string;
  rolUsuario: 'admin' | 'responsable_sst' | 'jefe_area' | 'trabajador' | 'auditor';
  grupoSanguineo?: string;
}

export const EQUIPO_DATA_INTEGRAL: PersonaEquipo[] = [
  // 1. CEO (Nivel Directivo Superior)
  {
    id: 'crg-ceo',
    nombre: 'CEO',
    cargo: 'CEO',
    area: 'Dirección General',
    sede: 'Sede Principal / Corporativa',
    categoria: 'direccion',
    cantidad: 1,
    email: 'ceo@dataintegral.com.co',
    telefono: '(+57) (604) 448-9120',
    extension: '101',
    rolSST: 'Representante Legal y Aprobador General del SG-SST',
    rolUsuario: 'admin',
    grupoSanguineo: 'O+'
  },

  // 2. CONTADORA (Prestación de servicios) (1)
  {
    id: 'crg-contadora',
    nombre: 'Contadora (Prestación de servicios)',
    cargo: 'Contadora (Prestación de servicios)',
    area: 'Área Contable y Financiera',
    sede: 'Corporativa (Prestación de servicios)',
    categoria: 'asesoria',
    cantidad: 1,
    email: 'contabilidad@dataintegral.com.co',
    telefono: '(+57) 310 842 5599',
    extension: '102',
    rolSST: 'Asignación y Seguimiento Presupuestal de Recursos SST',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'A+'
  },

  // 3-5. ABOGADO (3)
  {
    id: 'crg-abogado-1',
    nombre: 'Abogado (Puesto 1)',
    cargo: 'Abogado',
    area: 'Área Jurídica',
    sede: 'Corporativa / Todas las Sedes',
    categoria: 'asesoria',
    cantidad: 3,
    email: 'abogados@dataintegral.com.co',
    telefono: '(+57) 310 882 1245',
    extension: '108',
    rolSST: 'Comité de Convivencia Laboral (COCOLA) y Matriz Legal',
    rolUsuario: 'jefe_area',
    grupoSanguineo: 'A+'
  },
  {
    id: 'crg-abogado-2',
    nombre: 'Abogado (Puesto 2)',
    cargo: 'Abogado',
    area: 'Área Jurídica',
    sede: 'Corporativa / Todas las Sedes',
    categoria: 'asesoria',
    cantidad: 3,
    email: 'abogados2@dataintegral.com.co',
    telefono: '(+57) 314 556 7890',
    extension: '109',
    rolSST: 'Brigadista de Primeros Auxilios y Tutelas SST',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'O+'
  },
  {
    id: 'crg-abogado-3',
    nombre: 'Abogado (Puesto 3)',
    cargo: 'Abogado',
    area: 'Área Jurídica',
    sede: 'Corporativa / Todas las Sedes',
    categoria: 'asesoria',
    cantidad: 3,
    email: 'abogados3@dataintegral.com.co',
    telefono: '(+57) 310 882 1246',
    extension: '110',
    rolSST: 'Vigía de SST Suplente y Normatividad Laboral',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'B+'
  },

  // 6. COORDINADOR (1)
  {
    id: 'crg-coordinador',
    nombre: 'Coordinador',
    cargo: 'Coordinador',
    area: 'Coordinación Operativa y SG-SST',
    sede: 'Corporativa / Inter-Sedes',
    categoria: 'coordinacion',
    cantidad: 1,
    email: 'coordinacion@dataintegral.com.co',
    telefono: '(+57) 300 234 5678',
    extension: '103',
    rolSST: 'Líder del SG-SST / Jefe de Brigada de Emergencias',
    rolUsuario: 'responsable_sst',
    grupoSanguineo: 'O+'
  },

  // 7. GERENTE SEDE SAUCES (1)
  {
    id: 'crg-gerente-sauces',
    nombre: 'Gerente Sede Sauces',
    cargo: 'Gerente Sede Sauces',
    area: 'Gerencia de Sede Sauces',
    sede: 'Sede Sauces',
    categoria: 'gerencia',
    cantidad: 1,
    email: 'gerencia.sauces@dataintegral.com.co',
    telefono: '(+57) 315 771 9081',
    extension: '201',
    rolSST: 'Comité de Emergencias y Control Locativo Sede Sauces',
    rolUsuario: 'jefe_area',
    grupoSanguineo: 'A+'
  },

  // 8-11. LÍDERES SEDE SAUCES (4)
  {
    id: 'crg-lider-sauces-1',
    nombre: 'Líder 1 (Sede Sauces)',
    cargo: 'Líder',
    area: 'Operaciones Sede Sauces',
    sede: 'Sede Sauces',
    categoria: 'lider',
    cantidad: 4,
    email: 'lider1.sauces@dataintegral.com.co',
    telefono: '(+57) 315 771 9082',
    extension: '202',
    rolSST: 'Brigadista de Evacuación Sede Sauces',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'O+'
  },
  {
    id: 'crg-lider-sauces-2',
    nombre: 'Líder 2 (Sede Sauces)',
    cargo: 'Líder',
    area: 'Operaciones Sede Sauces',
    sede: 'Sede Sauces',
    categoria: 'lider',
    cantidad: 4,
    email: 'lider2.sauces@dataintegral.com.co',
    telefono: '(+57) 315 771 9083',
    extension: '203',
    rolSST: 'Brigadista de Control de Conatos Sede Sauces',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'B+'
  },
  {
    id: 'crg-lider-sauces-3',
    nombre: 'Líder 3 (Sede Sauces)',
    cargo: 'Líder',
    area: 'Operaciones Sede Sauces',
    sede: 'Sede Sauces',
    categoria: 'lider',
    cantidad: 4,
    email: 'lider3.sauces@dataintegral.com.co',
    telefono: '(+57) 315 771 9084',
    extension: '204',
    rolSST: 'Vigía SST Delegado Sede Sauces',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'A+'
  },
  {
    id: 'crg-lider-sauces-4',
    nombre: 'Líder 4 (Sede Sauces)',
    cargo: 'Líder',
    area: 'Operaciones Sede Sauces',
    sede: 'Sede Sauces',
    categoria: 'lider',
    cantidad: 4,
    email: 'lider4.sauces@dataintegral.com.co',
    telefono: '(+57) 315 771 9085',
    extension: '205',
    rolSST: 'Primer Respondiente en Primeros Auxilios Sauces',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'O+'
  },

  // 12. GERENTE SEDE ALMACENTRO (1)
  {
    id: 'crg-gerente-almacentro',
    nombre: 'Gerente Sede Almacentro',
    cargo: 'Gerente Sede Almacentro',
    area: 'Gerencia de Sede Almacentro',
    sede: 'Sede Almacentro',
    categoria: 'gerencia',
    cantidad: 1,
    email: 'gerencia.almacentro@dataintegral.com.co',
    telefono: '(+57) 312 450 9910',
    extension: '301',
    rolSST: 'Comité de Emergencias y Control Locativo Sede Almacentro',
    rolUsuario: 'jefe_area',
    grupoSanguineo: 'O+'
  },

  // 13-15. LÍDERES SEDE ALMACENTRO (3)
  {
    id: 'crg-lider-almacentro-1',
    nombre: 'Líder 1 (Sede Almacentro)',
    cargo: 'Líder',
    area: 'Operaciones Sede Almacentro',
    sede: 'Sede Almacentro',
    categoria: 'lider',
    cantidad: 3,
    email: 'lider1.almacentro@dataintegral.com.co',
    telefono: '(+57) 312 450 9911',
    extension: '302',
    rolSST: 'Brigadista de Evacuación Sede Almacentro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'A+'
  },
  {
    id: 'crg-lider-almacentro-2',
    nombre: 'Líder 2 (Sede Almacentro)',
    cargo: 'Líder',
    area: 'Operaciones Sede Almacentro',
    sede: 'Sede Almacentro',
    categoria: 'lider',
    cantidad: 3,
    email: 'lider2.almacentro@dataintegral.com.co',
    telefono: '(+57) 312 450 9912',
    extension: '303',
    rolSST: 'Brigadista de Primeros Auxilios Sede Almacentro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'O+'
  },
  {
    id: 'crg-lider-almacentro-3',
    nombre: 'Líder 3 (Sede Almacentro)',
    cargo: 'Líder',
    area: 'Operaciones Sede Almacentro',
    sede: 'Sede Almacentro',
    categoria: 'lider',
    cantidad: 3,
    email: 'lider3.almacentro@dataintegral.com.co',
    telefono: '(+57) 312 450 9913',
    extension: '304',
    rolSST: 'Vigía SST Delegado Sede Almacentro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'B+'
  },

  // 16. ASESORA ALMACENTRO (1)
  {
    id: 'crg-asesora-almacentro',
    nombre: 'Asesora Almacentro',
    cargo: 'Asesora Almacentro',
    area: 'Atención y Asesoría Almacentro',
    sede: 'Sede Almacentro',
    categoria: 'asesor',
    cantidad: 1,
    email: 'asesora.almacentro@dataintegral.com.co',
    telefono: '(+57) 318 901 2345',
    extension: '305',
    rolSST: 'Punto Focal de Bienestar y Pausas Activas Almacentro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'O+'
  },

  // 17. GERENTE SEDE RIONEGRO (1)
  {
    id: 'crg-gerente-rionegro',
    nombre: 'Gerente Sede Rionegro',
    cargo: 'Gerente Sede Rionegro',
    area: 'Gerencia de Sede Rionegro',
    sede: 'Sede Rionegro',
    categoria: 'gerencia',
    cantidad: 1,
    email: 'gerencia.rionegro@dataintegral.com.co',
    telefono: '(+57) 316 442 8810',
    extension: '401',
    rolSST: 'Comité de Emergencias y Control Locativo Sede Rionegro',
    rolUsuario: 'jefe_area',
    grupoSanguineo: 'O+'
  },

  // 18-20. LÍDERES SEDE RIONEGRO (3)
  {
    id: 'crg-lider-rionegro-1',
    nombre: 'Líder 1 (Sede Rionegro)',
    cargo: 'Líder',
    area: 'Operaciones Sede Rionegro',
    sede: 'Sede Rionegro',
    categoria: 'lider',
    cantidad: 3,
    email: 'lider1.rionegro@dataintegral.com.co',
    telefono: '(+57) 316 442 8811',
    extension: '402',
    rolSST: 'Brigadista de Evacuación Sede Rionegro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'A+'
  },
  {
    id: 'crg-lider-rionegro-2',
    nombre: 'Líder 2 (Sede Rionegro)',
    cargo: 'Líder',
    area: 'Operaciones Sede Rionegro',
    sede: 'Sede Rionegro',
    categoria: 'lider',
    cantidad: 3,
    email: 'lider2.rionegro@dataintegral.com.co',
    telefono: '(+57) 316 442 8812',
    extension: '403',
    rolSST: 'Brigadista de Primeros Auxilios Sede Rionegro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'O+'
  },
  {
    id: 'crg-lider-rionegro-3',
    nombre: 'Líder 3 (Sede Rionegro)',
    cargo: 'Líder',
    area: 'Operaciones Sede Rionegro',
    sede: 'Sede Rionegro',
    categoria: 'lider',
    cantidad: 3,
    email: 'lider3.rionegro@dataintegral.com.co',
    telefono: '(+57) 316 442 8813',
    extension: '404',
    rolSST: 'Vigía SST Delegado Sede Rionegro',
    rolUsuario: 'trabajador',
    grupoSanguineo: 'B+'
  }
];
