import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Plus, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Filter, 
  Calendar, 
  CheckCircle2, 
  History, 
  Edit3, 
  Trash2, 
  FileCheck2,
  FolderOpen,
  LayoutGrid,
  Table as TableIcon,
  Scale,
  ExternalLink
} from 'lucide-react';
import { DocumentRecord, CompanySettings, UserProfile } from '../../types';
import { downloadDocumentPdf } from '../../utils/pdfGenerator';

interface DocumentationViewProps {
  documents: DocumentRecord[];
  company: CompanySettings;
  currentUser: UserProfile;
  onAddDocument: (doc: DocumentRecord) => void;
  onUpdateDocument: (doc: DocumentRecord) => void;
  onDeleteDocument: (id: string) => void;
}

// Exact list of 10 Legal / SG-SST documents specified
export const LEGAL_DOCUMENTS_ORDER = [
  'Política',
  'Objetivos',
  'Matriz de Peligros',
  'Matriz Legal',
  'Plan Anual de Trabajo',
  'Plan Anual de Capacitación',
  'COPASST / COCOLA / Brigada',
  'Plan de Emergencias',
  'Indicadores',
  'Auditoría',
];

export const DocumentationView: React.FC<DocumentationViewProps> = ({
  documents,
  company,
  currentUser,
  onAddDocument,
  onUpdateDocument,
  onDeleteDocument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeDocument, setActiveDocument] = useState<DocumentRecord | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // New Document Form State
  const [newDoc, setNewDoc] = useState<Partial<DocumentRecord>>({
    code: '',
    name: '',
    category: 'Política',
    version: '1.0',
    responsible: company.sstLeaderName,
    creationDate: new Date().toISOString().substring(0, 10),
    reviewDate: new Date().toISOString().substring(0, 10),
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
    status: 'Vigente',
    isOfficialApproved: true,
    approvalDisclaimer: 'Borrador en proceso de revisión técnica por la Alta Dirección.',
    description: '',
    fileSize: '150 KB',
    contentSummary: '',
  });

  const getDocIndex = (cat: string, name: string): number => {
    const idx = LEGAL_DOCUMENTS_ORDER.findIndex(
      (c) => cat.toLowerCase().includes(c.toLowerCase()) || name.toLowerCase().includes(c.toLowerCase())
    );
    return idx !== -1 ? idx + 1 : 99;
  };

  // Order documents strictly 1 to 10 according to legal sequence
  const orderedDocuments = [...documents].sort((a, b) => {
    const idxA = getDocIndex(a.category, a.name);
    const idxB = getDocIndex(b.category, b.name);
    return idxA - idxB;
  });

  const filteredDocuments = orderedDocuments.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.code) return;

    const doc: DocumentRecord = {
      id: `doc-${Date.now()}`,
      code: newDoc.code || `DOC-${Date.now().toString().slice(-4)}`,
      name: newDoc.name || '',
      category: (newDoc.category as any) || 'Política',
      version: newDoc.version || '1.0',
      responsible: newDoc.responsible || currentUser.name,
      creationDate: newDoc.creationDate || new Date().toISOString().substring(0, 10),
      reviewDate: newDoc.reviewDate || new Date().toISOString().substring(0, 10),
      expirationDate: newDoc.expirationDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().substring(0, 10),
      status: (newDoc.status as any) || 'Vigente',
      isOfficialApproved: !!newDoc.isOfficialApproved,
      approvalDisclaimer: newDoc.approvalDisclaimer,
      description: newDoc.description || '',
      fileSize: newDoc.fileSize || '120 KB',
      contentSummary: newDoc.contentSummary || 'Contenido técnico oficial del documento del SG-SST.',
      versionHistory: [
        {
          version: newDoc.version || '1.0',
          date: new Date().toISOString().substring(0, 10),
          changes: 'Creación y registro en el repositorio oficial de documentos legales del SG-SST.',
          author: currentUser.name,
        }
      ]
    };

    onAddDocument(doc);
    setShowNewModal(false);
  };

  const canEditDocs = ['admin', 'responsable_sst'].includes(currentUser.role);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <Scale className="w-3.5 h-3.5" />
            Sección de Documentos Legales (SG-SST) · Decreto 1072 de 2015
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Documentos Legales del <span className="text-emerald-400">SG-SST</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Listado oficial de los 10 documentos obligatorios que conforman el Sistema de Gestión de Seguridad y Salud en el Trabajo de Data Integral S.A.S., ordenados y estructurados para auditorías, inspecciones de ARL y requerimientos del Ministerio del Trabajo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
          <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'cards' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Tarjetas"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Tarjetas</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'table' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Vista Índice Legal (1-10)"
            >
              <TableIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Índice 1-10</span>
            </button>
          </div>

          <a
            href="https://drive.google.com/drive/folders/17cPvE2HG0U6ER9JRfWiPVSxgXmsobWwZ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-lg transition-all border border-blue-400/40 hover:scale-[1.02] active:scale-95"
            title="Abrir carpeta compartida de documentos en Google Drive"
          >
            <FolderOpen className="w-4 h-4 text-blue-200" />
            <span className="hidden sm:inline">Carpeta Google Drive</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
          </a>

          {canEditDocs && (
            <button
              onClick={() => setShowNewModal(true)}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Registrar Documento</span>
            </button>
          )}
        </div>
      </div>

      {/* Google Drive Shared Documents Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-blue-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-start sm:items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center flex-shrink-0 shadow-md">
            <svg className="w-7 h-7" viewBox="0 0 87.3 78" fill="none">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
              <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
              <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
              <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
            </svg>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Repositorio de Documentos en Google Drive
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40">
                Carpeta en la Nube
              </span>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">
              Accede a la carpeta compartida en Google Drive con los soportes escaneados, plantillas editables, anexos complementarios y registros históricos del SG-SST de Data Integral.
            </p>
          </div>
        </div>

        <a
          href="https://drive.google.com/drive/folders/17cPvE2HG0U6ER9JRfWiPVSxgXmsobWwZ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 border border-blue-300/30 w-full md:w-auto flex-shrink-0 relative z-10"
        >
          <FolderOpen className="w-4 h-4 text-blue-100" />
          <span>Abrir Carpeta en Google Drive</span>
          <ExternalLink className="w-4 h-4 text-blue-200" />
        </a>
      </div>

      {/* Disclaimers Bar on Official vs Draft status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-emerald-950 block">Documentos Obligatorios Aprobados (10 de 10):</span>
            <span className="text-emerald-800">
              Expediente legal completo con firmas del Representante Legal y Líder SST con licencia vigente, disponible para consulta y descarga en PDF.
            </span>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
          <FolderOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-bold text-blue-950 block">Conformidad Normativa y Control de Versiones:</span>
            <span className="text-blue-800">
              Cumplimiento del Artículo 2.2.4.6.12 del Decreto 1072/2015: conservación documental por 20 años y revisión anual técnica.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Pills for the 10 Legal Documents */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2 px-1">
          <Scale className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Listado Oficial de los 10 Documentos Legales:
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos ({documents.length})
          </button>
          {LEGAL_DOCUMENTS_ORDER.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? 'all' : cat)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-transparent'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isSelected ? 'bg-white text-emerald-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {idx + 1}
                </span>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Bar & Status Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar en los 10 documentos legales (nombre, código, norma)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Estado:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 text-slate-700 outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="Vigente">Vigente</option>
            <option value="Próximo a Vencer">Próximo a Vencer</option>
            <option value="Vencido">Vencido</option>
          </select>
        </div>
      </div>

      {/* Documents View: Grid or Table */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            const isExpiring = doc.status === 'Próximo a Vencer' || doc.status === 'Vencido';
            const docNum = getDocIndex(doc.category, doc.name);
            return (
              <div 
                key={doc.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Badges Bar with Document Index */}
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-extrabold text-[10px] shadow-xs">
                        {docNum}
                      </span>
                      <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {doc.code}
                      </span>
                    </div>
                    
                    {doc.isOfficialApproved ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Oficial Aprobado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-amber-600" /> En Revisión
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      {doc.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mt-0.5">
                      {doc.name}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {doc.description}
                  </p>

                  {/* Metadata List */}
                  <div className="bg-slate-50 rounded-xl p-3 text-[11px] text-slate-600 space-y-1 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Versión:</span>
                      <span className="font-bold text-slate-800">v{doc.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Responsable:</span>
                      <span className="text-slate-700 truncate max-w-[150px]">{doc.responsible}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vencimiento:</span>
                      <span className={`font-semibold ${isExpiring ? 'text-rose-600' : 'text-slate-700'}`}>
                        {doc.expirationDate}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveDocument(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-3 rounded-xl transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Ver Contenido</span>
                  </button>

                  <button
                    onClick={() => downloadDocumentPdf(doc, company)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-3 rounded-xl shadow transition-colors"
                    title="Descargar documento en formato PDF interactivo con membrete oficial"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                  </button>

                  {canEditDocs && (
                    <button
                      onClick={() => {
                        if (confirm(`¿Deseas eliminar el registro del documento ${doc.code}?`)) {
                          onDeleteDocument(doc.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Table / Checklist View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600" />
              Índice Legal y Matriz de Control Documental (1 a 10)
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {filteredDocuments.length} documento(s) listados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-xs">
              <thead className="bg-slate-100/80 text-slate-700 font-bold">
                <tr>
                  <th className="px-3 py-3 text-center w-12">Nº</th>
                  <th className="px-3 py-3 text-left w-28">CÓDIGO</th>
                  <th className="px-4 py-3 text-left">DOCUMENTO OBLIGATORIO</th>
                  <th className="px-3 py-3 text-left">CATEGORÍA</th>
                  <th className="px-3 py-3 text-left">RESPONSABLE</th>
                  <th className="px-2 py-3 text-center">VERSIÓN</th>
                  <th className="px-3 py-3 text-center">ESTADO</th>
                  <th className="px-3 py-3 text-left">PRÓX. REVISIÓN</th>
                  <th className="px-4 py-3 text-center">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDocuments.map((doc) => {
                  const docNum = getDocIndex(doc.category, doc.name);
                  return (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-3 py-3 text-center font-bold">
                        <span className="w-6 h-6 mx-auto rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-[11px] border border-emerald-300">
                          {docNum}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono font-bold text-slate-800 whitespace-nowrap">
                        {doc.code}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-900 max-w-xs">
                        <div className="line-clamp-1">{doc.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal line-clamp-1">{doc.description}</div>
                      </td>
                      <td className="px-3 py-3 font-medium text-emerald-700">
                        {doc.category}
                      </td>
                      <td className="px-3 py-3 text-slate-600 max-w-[140px] truncate">
                        {doc.responsible}
                      </td>
                      <td className="px-2 py-3 text-center font-mono font-bold text-slate-700">
                        v{doc.version}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {doc.isOfficialApproved ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full whitespace-nowrap">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Aprobado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full whitespace-nowrap">
                            <Clock className="w-3 h-3 text-amber-600" /> En Revisión
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-slate-600 font-medium whitespace-nowrap">
                        {doc.expirationDate}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setActiveDocument(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                            title="Ver detalles del documento"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Ver</span>
                          </button>
                          <button
                            onClick={() => downloadDocumentPdf(doc, company)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] shadow transition-colors"
                            title="Descargar PDF interactivo"
                          >
                            <Download className="w-3 h-3" />
                            <span>PDF</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW MODAL */}
      {activeDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded border">
                    {activeDocument.code}
                  </span>
                  <span className="text-xs text-emerald-600 font-bold uppercase">{activeDocument.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{activeDocument.name}</h3>
                <p className="text-xs text-slate-500">Versión {activeDocument.version} · Emitido por {company.name}</p>
              </div>

              <button 
                onClick={() => setActiveDocument(null)} 
                className="text-slate-400 hover:text-slate-600 p-1 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Approval Banner in Modal */}
            {activeDocument.isOfficialApproved ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <strong className="block">Documento Oficial Aprobado</strong>
                  <span>Este documento cuenta con aval formal de la Gerencia General y rige las operaciones de Data Integral.</span>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <strong className="block">Versión Borrador / En Revisión Técnica</strong>
                  <span>{activeDocument.approvalDisclaimer || 'No constituye aún un documento oficial definitivo.'}</span>
                </div>
              </div>
            )}

            {/* Metadata Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">RESPONSABLE</span>
                <span className="font-semibold text-slate-800">{activeDocument.responsible}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">CREACIÓN</span>
                <span className="font-semibold text-slate-800">{activeDocument.creationDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ÚLTIMA REVISIÓN</span>
                <span className="font-semibold text-slate-800">{activeDocument.reviewDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">PRÓXIMA REVISIÓN</span>
                <span className="font-semibold text-slate-800">{activeDocument.expirationDate}</span>
              </div>
            </div>

            {/* Description & Content */}
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <h5 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Objetivo del Documento:</h5>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">{activeDocument.description}</p>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Contenido y Directrices Técnicas:</h5>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 whitespace-pre-line">{activeDocument.contentSummary}</p>
              </div>

              {activeDocument.sections && activeDocument.sections.map((sec, idx) => (
                <div key={idx}>
                  <h5 className="font-bold text-slate-900 uppercase text-[11px] mb-1">{sec.title}:</h5>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 whitespace-pre-line">
                    {sec.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Version History */}
            {activeDocument.versionHistory && activeDocument.versionHistory.length > 0 && (
              <div className="space-y-2 border-t pt-4">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-slate-500" /> Control de Cambios y Revisiones
                </h5>
                <div className="space-y-1.5 text-[11px]">
                  {activeDocument.versionHistory.map((vh, i) => (
                    <div key={i} className="flex justify-between p-2 rounded-lg bg-slate-100">
                      <div>
                        <span className="font-bold text-slate-800">Versión {vh.version}:</span> {vh.changes}
                      </div>
                      <div className="text-slate-500">{vh.date} · {vh.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t pt-4">
              <span className="text-[11px] text-slate-500">
                Data Integral S.A.S. · Documento del SG-SST
              </span>

              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <a
                  href="https://drive.google.com/drive/folders/17cPvE2HG0U6ER9JRfWiPVSxgXmsobWwZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
                  title="Abrir carpeta Google Drive con soportes y anexos"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ver en Google Drive</span>
                  <ExternalLink className="w-3 h-3 text-blue-500" />
                </a>

                <button
                  onClick={() => downloadDocumentPdf(activeDocument, company)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar en PDF Interactivo</span>
                </button>
                <button
                  onClick={() => setActiveDocument(null)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs hover:bg-slate-100"
                >
                  Cerrar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CREATE NEW DOCUMENT MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-slate-900">Registrar Nuevo Documento SG-SST</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-600 text-lg">✕</button>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Código del Documento</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: POL-SST-002 o PRO-ERG-001"
                    value={newDoc.code}
                    onChange={(e) => setNewDoc({ ...newDoc, code: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Versión</label>
                  <input
                    type="text"
                    required
                    value={newDoc.version}
                    onChange={(e) => setNewDoc({ ...newDoc, version: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nombre Oficial del Documento</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Procedimiento de Desconexión Laboral y Pausas Activas"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Categoría</label>
                  <select
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    {LEGAL_DOCUMENTS_ORDER.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Responsable del Control</label>
                  <input
                    type="text"
                    required
                    value={newDoc.responsible}
                    onChange={(e) => setNewDoc({ ...newDoc, responsible: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha Creación</label>
                  <input
                    type="date"
                    value={newDoc.creationDate}
                    onChange={(e) => setNewDoc({ ...newDoc, creationDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Última Revisión</label>
                  <input
                    type="date"
                    value={newDoc.reviewDate}
                    onChange={(e) => setNewDoc({ ...newDoc, reviewDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Próx. Vencimiento</label>
                  <input
                    type="date"
                    value={newDoc.expirationDate}
                    onChange={(e) => setNewDoc({ ...newDoc, expirationDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descripción / Objetivo</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Objetivo y alcance de este documento en Data Integral..."
                  value={newDoc.description}
                  onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Contenido / Directrices</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Resumen técnico y directrices aprobadas..."
                  value={newDoc.contentSummary}
                  onChange={(e) => setNewDoc({ ...newDoc, contentSummary: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="chkApproval"
                  checked={newDoc.isOfficialApproved}
                  onChange={(e) => setNewDoc({ ...newDoc, isOfficialApproved: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="chkApproval" className="text-xs text-slate-700">
                  <strong>Aprobación Oficial por la Alta Dirección</strong> (Si se desmarca, se marcará como borrador en revisión).
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
                >
                  Registrar Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
