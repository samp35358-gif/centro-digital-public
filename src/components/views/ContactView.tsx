import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  Building2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { CompanySettings } from '../../types';

interface ContactViewProps {
  company: CompanySettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ company }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta SG-SST',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <PhoneCall className="w-3.5 h-3.5" />
            Canales Oficiales y Soporte SG-SST
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Contacto & Canales de <span className="text-emerald-400">Atención</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Comunícate con el área de Seguridad y Salud en el Trabajo, reporta novedades locativas o solicita soporte técnico y legal para Data Integral S.A.S. en Medellín.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Sede Principal Data Integral</h4>
                <p className="text-[11px] text-slate-500">Medellín, Antioquia, Colombia</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Dirección:</span>
                  <span>{company.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Teléfonos Corporativos:</span>
                  <span>{company.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Correo Electrónico SST:</span>
                  <span className="text-emerald-700 font-medium">{company.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Horario de Atención:</span>
                  <span>Lunes a Viernes: 8:00 AM – 5:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Hotlines Medellín */}
          <div className="bg-rose-50/80 rounded-2xl p-6 border border-rose-200 space-y-3">
            <div className="flex items-center gap-2 text-rose-950 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              Líneas Directas de Emergencia en Medellín
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-rose-200">
                <span className="text-[10px] text-slate-400 block font-semibold">LÍNEA ÚNICA</span>
                <span className="font-bold text-rose-700 text-sm">123 Medellín</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-rose-200">
                <span className="text-[10px] text-slate-400 block font-semibold">BOMBEROS</span>
                <span className="font-bold text-rose-700 text-sm">119</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-rose-200">
                <span className="text-[10px] text-slate-400 block font-semibold">ARL SURA LÍNEA ATENCIÓN</span>
                <span className="font-bold text-slate-800 text-xs">01 8000 511 414</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-rose-200">
                <span className="text-[10px] text-slate-400 block font-semibold">CRUZ ROJA ANTIOQUIA</span>
                <span className="font-bold text-slate-800 text-xs">(604) 350-5300</span>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Formulario de Comunicación y Soporte</h3>
              <p className="text-xs text-slate-500 mt-1">
                Diligencia este formulario para solicitar asesoría ergonómica, reportar inquietudes o consultar tus registros del SG-SST.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">¡Mensaje Enviado con Éxito!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Tu comunicación ha sido radicada formalmente ante el área de SG-SST de Data Integral S.A.S. Te daremos respuesta en un plazo no mayor a 24 horas hábiles.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Consulta SG-SST', message: '' });
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow hover:bg-emerald-700"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y apellidos..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="ejemplo@dataintegral.com.co"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Teléfono o Extensión</label>
                    <input
                      type="tel"
                      placeholder="310... o Ext. 102"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Asunto de la Consulta</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  >
                    <option value="Consulta SG-SST">Consulta General sobre el SG-SST</option>
                    <option value="Solicitud Ergonomía">Solicitud de Inspección o Adaptación Ergonómica</option>
                    <option value="Capacitación">Inquietud sobre Capacitaciones o Certificados</option>
                    <option value="Reporte Novedad">Reporte de Novedad Locativa o Falla Eléctrica</option>
                    <option value="Habeas Data">Consulta sobre Protección de Datos (Ley 1581)</option>
                    <option value="Soporte Plataforma">Soporte Técnico de la Plataforma Digital</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mensaje o Detalle de la Solicitud</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe claramente tu solicitud o novedad..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Radicar Consulta en el SG-SST</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
