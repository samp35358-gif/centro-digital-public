import React, { useState } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  FileQuestion, 
  Scale, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  AlertCircle,
  FileText
} from 'lucide-react';

export const HelpView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo reportar una condición insegura o incidente de trabajo?',
      a: 'Dirígete a la sección "Inicio" y selecciona el botón "Reportar Evento", o accede a la pestaña de gestión de incidentes. Diligencia los campos de fecha, hora, lugar y descripción. Recuerda que no se divulgan diagnósticos clínicos personales conforme a la Ley 1581 de 2012.'
    },
    {
      q: '¿Cómo descargo los documentos oficiales del SG-SST en PDF?',
      a: 'En la pestaña "Documentación" encontrarás el listado completo de documentos controlados. Cada tarjeta cuenta con un botón "Descargar PDF" que genera el archivo interactivo con el membrete institucional de Data Integral, versión, código y firma de la alta dirección.'
    },
    {
      q: '¿Cómo se calculan los indicadores del SG-SST en la plataforma?',
      a: 'Los indicadores se calculan automáticamente en tiempo real tomando como base los registros reales cargados en las actividades del plan de trabajo, las capacitaciones realizadas, las inspecciones ejecutadas y los eventos reportados. La plataforma no utiliza datos simulados.'
    },
    {
      q: '¿Qué estándares mínimos aplican a Data Integral según la Resolución 0312 de 2019?',
      a: 'Data Integral es una empresa de servicios jurídicos y financieros en Medellín clasificada en Riesgo I. Para empresas de 11 a 50 trabajadores en Riesgo I, aplican 21 estándares mínimos obligatorios. En la pestaña correspondiente puedes verificar el estado de cumplimiento de cada uno.'
    },
    {
      q: '¿Cómo realizar una inspección de seguridad desde el celular o tableta?',
      a: 'La interfaz es completamente adaptable. Abre la sección de Inspecciones, selecciona el tipo de chequeo (ergonomía, extintores, 5S o eléctrico) y marca con un solo toque si cada criterio Cumple, No Cumple o No Aplica. Si hay un hallazgo, puedes registrar la medida correctiva de inmediato.'
    },
    {
      q: '¿Quién puede aprobar los documentos del SG-SST?',
      a: 'Únicamente los perfiles con rol de "Administrador General" (Representante Legal) y "Responsable SG-SST" cuentan con la potestad técnica y jurídica de marcar un documento como Oficial Aprobado. Los demás colaboradores acceden a los documentos en modo consulta.'
    }
  ];

  const colombianRegulations = [
    {
      norm: 'Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Capítulo 6)',
      title: 'Decreto Único Reglamentario del Sector Trabajo',
      scope: 'Compila todas las directrices obligatorias para la implementación y auditoría del SG-SST en Colombia. Establece la política, planificación, aplicación, evaluación y mejora continua.'
    },
    {
      norm: 'Resolución 0312 de 2019',
      title: 'Estándares Mínimos del SG-SST',
      scope: 'Fija los estándares mínimos exigibles a empleadores y contratantes según el número de trabajadores y la clase de riesgo (I a V).'
    },
    {
      norm: 'Ley 1562 de 2012',
      title: 'Modificación del Sistema de Riesgos Laborales',
      scope: 'Define formalmente Accidente de Trabajo (AT) y Enfermedad Laboral (EL), ampliando la cobertura y protección en salud y riesgos.'
    },
    {
      norm: 'Resolución 1401 de 2007',
      title: 'Investigación de Incidentes y Accidentes de Trabajo',
      scope: 'Reglamenta la investigación técnica dentro de los 15 días calendario siguientes al suceso, conformación del equipo investigador y reporte ante la ARL.'
    },
    {
      norm: 'Ley 1581 de 2012 y Decreto 1377 de 2013',
      title: 'Régimen General de Protección de Datos Personales (Habeas Data)',
      scope: 'Custodia rigurosa de los datos sensibles y médicos de los trabajadores, prohibiendo su divulgación abierta o uso indebido.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <HelpCircle className="w-3.5 h-3.5" />
            Centro de Ayuda, Guías y Marco Normativo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ayuda y Cumplimiento <span className="text-emerald-400">Normativo en Colombia</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Instrucciones para el diligenciamiento de registros, preguntas frecuentes y compendio de la legislación colombiana aplicable al SG-SST de Data Integral.
          </p>
        </div>
      </div>

      {/* Legal Disclaimers (Required by prompt) */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 flex items-start gap-3.5 text-xs text-slate-800">
        <AlertCircle className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <strong className="block text-sm font-bold text-slate-900">Aviso Legal y Alcance de la Plataforma:</strong>
          <p className="leading-relaxed text-slate-600">
            Esta plataforma constituye una herramienta digital de gestión, registro y control operativo del SG-SST de Data Integral S.A.S. El software por sí mismo <strong>no garantiza el cumplimiento legal automático</strong> ni sustituye la asesoría, validación e intervención directa de un profesional o especialista con Licencia de Salud Ocupacional / SST vigente y el aval de la Administradora de Riesgos Laborales (ARL).
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
          <FileQuestion className="w-5 h-5 text-emerald-600" />
          Preguntas Frecuentes de los Usuarios
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Colombian Regulatory Framework */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
          <Scale className="w-5 h-5 text-blue-600" />
          Marco Normativo Colombiano Aplicable al SG-SST
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colombianRegulations.map((reg, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5 text-xs">
              <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                {reg.norm}
              </span>
              <h4 className="font-bold text-slate-900">{reg.title}</h4>
              <p className="text-slate-600 text-[11px] leading-relaxed">{reg.scope}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and Form Instructions */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
          <Compass className="w-5 h-5 text-purple-600" />
          Guía de Navegación Rápida por Rol
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-purple-800 block text-xs">Trabajador / Asesor</span>
            <p className="text-slate-600 text-[11px]">
              Consulta la política, realiza las pausas activas con el temporizador y reporta condiciones inseguras.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-blue-800 block text-xs">Jefe de Área</span>
            <p className="text-slate-600 text-[11px]">
              Verifica las actividades del PAT asignadas a tu área y promueve la participación en capacitaciones.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-emerald-800 block text-xs">Responsable SG-SST</span>
            <p className="text-slate-600 text-[11px]">
              Administra la matriz GTC 45, ejecuta inspecciones digitales, gestiona el plan de trabajo y exporta informes en PDF.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
            <span className="font-bold text-amber-800 block text-xs">Auditor / Consultor</span>
            <p className="text-slate-600 text-[11px]">
              Accede a las evidencias documentales, registros de inspección, indicadores y bitácora de auditoría.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
