import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  UserCheck, 
  FileText, 
  AlertTriangle, 
  BarChart3, 
  GraduationCap, 
  PhoneCall, 
  HelpCircle, 
  Home, 
  History, 
  Settings, 
  History as LogIcon, 
  Download, 
  Upload, 
  CheckCircle2,
  ChevronDown,
  Users,
  Building2
} from 'lucide-react';
import { MainTab, SubModule, UserProfile, CompanySettings } from '../types';
import { availableUsers } from '../services/storage';

interface NavbarProps {
  currentTab: MainTab;
  setTab: (tab: MainTab) => void;
  currentSubModule: SubModule;
  setSubModule: (mod: SubModule) => void;
  currentUser: UserProfile;
  setCurrentUser: (u: UserProfile) => void;
  company: CompanySettings;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
  onOpenAuditLogs: () => void;
  onExportBackup: () => void;
  onImportBackup: () => void;
  onOpenTeamDirectory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setTab,
  currentSubModule,
  setSubModule,
  currentUser,
  setCurrentUser,
  company,
  onOpenSettings,
  onOpenSearch,
  onOpenAuditLogs,
  onExportBackup,
  onImportBackup,
  onOpenTeamDirectory,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [backupMenuOpen, setBackupMenuOpen] = useState(false);

  const roleLabels: Record<string, { label: string; color: string; badge: string }> = {
    admin: { label: 'Administrador General', color: 'bg-purple-100 text-purple-800 border-purple-300', badge: 'Acceso Total' },
    responsable_sst: { label: 'Responsable SG-SST', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', badge: 'Gestión Completa' },
    jefe_area: { label: 'Jefe de Área', color: 'bg-blue-100 text-blue-800 border-blue-300', badge: 'Gestión Tareas' },
    trabajador: { label: 'Trabajador / Asesor', color: 'bg-slate-100 text-slate-800 border-slate-300', badge: 'Consulta y Reporte' },
    auditor: { label: 'Auditor Externo', color: 'bg-amber-100 text-amber-800 border-amber-300', badge: 'Solo Lectura' },
  };

  const navTabs: Array<{ id: MainTab; label: string; icon: React.ReactNode }> = [
    { id: 'inicio', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'historia', label: 'Historia', icon: <History className="w-4 h-4" /> },
    { id: 'emergencias', label: 'Emergencias', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'documentacion', label: 'Documentación', icon: <FileText className="w-4 h-4" /> },
    { id: 'indicadores', label: 'Indicadores', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'aprende', label: 'Aprende', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'contacto', label: 'Contacto', icon: <PhoneCall className="w-4 h-4" /> },
    { id: 'ayuda', label: 'Ayuda', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Bar with Company Branding & Session Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Company Title */}
          <div className="flex items-center space-x-3.5">
            <div 
              onClick={onOpenSettings} 
              className="relative group cursor-pointer flex-shrink-0"
              title="Haz clic para personalizar el logo y datos de Data Integral"
            >
              {company.logoUrl ? (
                <img 
                  src={company.logoUrl} 
                  alt="Data Integral" 
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg bg-white p-1 shadow border border-emerald-500/30" 
                />
              ) : (
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-700 flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-105 transition-transform">
                  <span className="font-extrabold text-white text-lg tracking-wider">di</span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-slate-900 text-white text-[9px]">
                <Settings className="w-2.5 h-2.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">Data</span>
                  <span>Integral</span>
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold tracking-wide">
                  SG-SST Digital
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium hidden sm:block">
                Centro Digital SGSST · Sistema de Gestión de Seguridad y Salud en el Trabajo
              </p>
            </div>
          </div>

          {/* Right Action Tools: Search, Backup, Role Switcher */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Organigrama & Estructura por Cargos */}
            <button
              onClick={onOpenTeamDirectory}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs px-2.5 py-1.5 rounded-lg border border-amber-400/60 transition-all shadow-sm font-bold active:scale-95"
              title="Organigrama Institucional: Estructura por cargos oficiales"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Organigrama</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors shadow-inner"
              title="Buscar en todo el sistema (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Buscar...</span>
              <kbd className="hidden md:inline-block bg-slate-900 px-1.5 py-0.5 rounded text-[10px] text-slate-400 font-mono border border-slate-700">⌘K</kbd>
            </button>

            {/* Audit Logs button */}
            <button
              onClick={onOpenAuditLogs}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
              title="Auditoría de Cambios"
            >
              <LogIcon className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden lg:inline">Auditoría</span>
            </button>

            {/* Backup / Export dropdown */}
            <div className="relative">
              <button
                onClick={() => setBackupMenuOpen(!backupMenuOpen)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
                title="Copias de Seguridad (Base de Datos Real)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Respaldo</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {backupMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-1 z-50 text-xs"
                  onMouseLeave={() => setBackupMenuOpen(false)}
                >
                  <button
                    onClick={() => {
                      onExportBackup();
                      setBackupMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    Descargar Copia JSON
                  </button>
                  <button
                    onClick={() => {
                      onImportBackup();
                      setBackupMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-700 text-slate-200 flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5 text-blue-400" />
                    Restaurar Copia de Seguridad
                  </button>
                </div>
              )}
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-850 hover:from-slate-750 hover:to-slate-800 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 shadow transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-400 flex items-center justify-center font-bold text-emerald-300 text-[11px]">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white leading-tight max-w-[120px] sm:max-w-[150px] truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    {roleLabels[currentUser.role]?.label || currentUser.role}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-800 border border-slate-700 shadow-2xl py-2 z-50"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-700">
                    <p className="text-xs font-bold text-slate-200">Cambiar Rol / Perfil de Usuario</p>
                    <p className="text-[11px] text-slate-400">Verifica los permisos según la función en Data Integral</p>
                  </div>
                  <div className="py-1">
                    {availableUsers.map((u) => {
                      const isSelected = u.id === currentUser.id;
                      const info = roleLabels[u.role];
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUser(u);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-start gap-2.5 ${
                            isSelected ? 'bg-emerald-950/60 text-emerald-300' : 'text-slate-200 hover:bg-slate-750'
                          }`}
                        >
                          <div className={`mt-0.5 w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400 ring-2 ring-emerald-400/30' : 'bg-slate-600'}`} />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold">{u.name}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                                {info.badge}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400">{u.position}</div>
                            <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{info.label}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-slate-700 bg-slate-850">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenTeamDirectory();
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Directorio / Editar Personas</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-slate-950/90 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1">
          <nav className="flex space-x-1 sm:space-x-2 py-1">
            {navTabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-850'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-emerald-400'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center text-[11px] text-slate-400 gap-1 pl-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Medellín, Col · Res. 0312</span>
          </div>
        </div>
      </div>
    </header>
  );
};
