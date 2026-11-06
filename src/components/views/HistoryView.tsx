import React from 'react';
import { Building2, Award, CheckCircle, Scale, Shield, Users, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { CompanySettings } from '../../types';
import { OrganigramaView } from '../OrganigramaView';

interface HistoryViewProps {
  company: CompanySettings;
  onNavigateToTab: (tab: any) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ company, onNavigateToTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-8 sm:p-12 shadow-2xl overflow-hidden border border-slate-700/60">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 skew-x-12 pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <Building2 className="w-3.5 h-3.5" />
            Trayectoria Empresarial & Compromiso Humano
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Historia de <span className="text-emerald-400">Data Integral</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Data Integral nació en 2018 con el propósito de brindar soluciones jurídicas y financieras a colombianos con dificultades en su vida crediticia. Constituida legalmente en 2022 en Medellín, Antioquia, la empresa se especializa en la eliminación de reportes negativos, negociación de cartera y asesoría financiera.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-sm font-semibold">
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>+2.000 Casos Exitosos</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>+700 Negociaciones de Cartera</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Medellín, Antioquia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trajectory Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 hover:border-emerald-500/40 transition-all hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 font-bold text-lg">
            2018
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">El Nacimiento</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Iniciamos como una iniciativa de profesionales apasionados por el derecho y las finanzas que entendieron el impacto del sobreendeudamiento en la tranquilidad y dignidad de las familias colombianas.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 hover:border-emerald-500/40 transition-all hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 font-bold text-lg">
            2022
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Constitución Legal en Medellín</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Nos constituimos formalmente como Data Integral S.A.S. en Medellín, Antioquia. Establecemos nuestra sede física, incorporamos un equipo jurídico interdisciplinario y adoptamos los estándares normativos de seguridad empresarial.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 hover:border-emerald-500/40 transition-all hover:shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 font-bold text-lg">
            Hoy
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Liderazgo & Respaldo</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Hoy contamos con más de 2.000 casos exitosos y 700 negociaciones de cartera, respaldando nuestro compromiso con el bienestar financiero de nuestros clientes y la seguridad integral de nuestro equipo.
          </p>
        </div>
      </div>

      {/* "¿Dónde estamos hoy?" Section */}
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-2xl p-8 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">¿Dónde estamos hoy?</h3>
            <p className="text-slate-500 text-sm">Nuestro alcance, impacto y proyección actual</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-base">
          <p className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm font-medium text-slate-800">
            Hoy nos enfocamos en sanear el historial crediticio de cientos de clientes mediante la eliminación efectiva de reportes negativos en centrales de riesgo. Asimismo, el equipo legal ha protegido con éxito el patrimonio de familias y mipymes a través de múltiples procesos de insolvencia y negociaciones directas con la banca, logrando condonaciones de deudas, deteniendo cobros judiciales y restableciendo el acceso a créditos para nuestros usuarios.
          </p>

          <p className="text-slate-600 text-sm">
            Este trabajo de alto impacto requiere un equipo multidisciplinario enfocado y saludable. Por ello, Data Integral concibe el <strong>Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST)</strong> no como un requisito legal pasivo, sino como la garantía activa de que quienes defienden el patrimonio y la tranquilidad de los clientes cuenten con un entorno ergonómico, seguro, libre de acoso y enfocado en la prevención.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Misión Legal</div>
            <div className="font-bold text-slate-900 text-sm mt-1">Protección Patrimonial</div>
            <div className="text-xs text-slate-500 mt-1">Defensa de deudores de buena fe mediante leyes de insolvencia y hábeas data.</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Negociación</div>
            <div className="font-bold text-slate-900 text-sm mt-1">Acuerdos Bancarios</div>
            <div className="text-xs text-slate-500 mt-1">Condonaciones y reestructuraciones directas con entidades financieras.</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider">SST Oficina</div>
            <div className="font-bold text-slate-900 text-sm mt-1">Ergonomía & Bienestar</div>
            <div className="text-xs text-slate-500 mt-1">Prevención de fatiga postural y salud visual para nuestros 20 cargos y colaboradores.</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Cumplimiento</div>
            <div className="font-bold text-slate-900 text-sm mt-1">Decreto 1072 & Res. 0312</div>
            <div className="text-xs text-slate-500 mt-1">Estándares mínimos implementados y auditados de forma continua.</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-200/60">
          <div className="text-xs text-slate-600">
            ¿Deseas consultar cómo articulamos la prevención laboral con nuestras operaciones diarias?
          </div>
          <button
            onClick={() => onNavigateToTab('documentacion')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition-colors"
          >
            <span>Ver Documentación Oficial SG-SST</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SECCIÓN DEL ORGANIGRAMA OFICIAL DENOMINADO POR CARGOS */}
      <div className="space-y-4">
        <OrganigramaView />
      </div>

    </div>
  );
};
