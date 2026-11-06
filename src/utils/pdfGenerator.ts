import { jsPDF } from 'jspdf';
import { 
  CompanySettings, 
  DocumentRecord, 
  PlanActivity, 
  HazardRiskItem, 
  IncidentReport, 
  InspectionRecord, 
  BrigadeMember, 
  EmergencyEquipment 
} from '../types';

// Helper function to add corporate header
function addCorporateHeader(doc: jsPDF, title: string, subtitle: string, company: CompanySettings): number {
  // Corporate top banner in Navy Blue
  doc.setFillColor(15, 41, 66); // #0f2942
  doc.rect(0, 0, 210, 24, 'F');

  // Accent bar in Emerald Green
  doc.setFillColor(16, 185, 129); // #10b981
  doc.rect(0, 24, 210, 3, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(company.name.toUpperCase(), 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`NIT: ${company.nit} | ${company.city} | Sede Principal`, 14, 18);
  doc.text(`SISTEMA DE GESTIÓN DE SEGURIDAD Y SALUD EN EL TRABAJO`, 200, 11, { align: 'right' });
  doc.text(`Decreto 1072/2015 - Res. 0312/2019`, 200, 18, { align: 'right' });

  // Document Title box
  doc.setFillColor(248, 250, 252);
  doc.rect(14, 32, 182, 16, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, 32, 182, 16, 'S');

  doc.setTextColor(15, 41, 66);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(title.toUpperCase(), 20, 40);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, 20, 45);
  doc.text(`Fecha Emisión: ${new Date().toLocaleDateString('es-CO')}`, 190, 43, { align: 'right' });

  return 54;
}

// Helper to add corporate footer
function addCorporateFooter(doc: jsPDF, pageNum: number, totalPages: number, company: CompanySettings) {
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 282, 196, 282);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(`Data Integral S.A.S. - Centro Digital SGSST | Documento digital controlado`, 14, 287);
  doc.text(`Página ${pageNum} de ${totalPages}`, 196, 287, { align: 'right' });
  doc.text(`Este documento hace parte integral del SG-SST de Data Integral. Prohibida su alteración no autorizada.`, 14, 291);
}

// 1. Export any DocumentRecord
export function downloadDocumentPdf(docRecord: DocumentRecord, company: CompanySettings) {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  let y = addCorporateHeader(doc, docRecord.name, `Código: ${docRecord.code} | Versión: ${docRecord.version} | Estado: ${docRecord.status}`, company);

  // Status & approval banner
  if (docRecord.isOfficialApproved) {
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(16, 185, 129);
    doc.rect(14, y, 182, 10, 'FD');
    doc.setTextColor(6, 95, 70);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`✓ DOCUMENTO OFICIAL APROBADO POR LA ALTA DIRECCIÓN DE DATA INTEGRAL`, 18, y + 6.5);
  } else {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.rect(14, y, 182, 10, 'FD');
    doc.setTextColor(153, 27, 27);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`! BORRADOR / EN REVISIÓN TÉCNICA - NO CONSTITUYE VERSIÓN OFICIAL DEFINITIVA`, 18, y + 6.5);
  }
  y += 15;

  // Metadata Table
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 20, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, y, 182, 20, 'S');

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Categoría:', 18, y + 6);
  doc.text('Responsable:', 18, y + 12);
  doc.text('Fecha Creación:', 18, y + 17);

  doc.text('Versión Actual:', 110, y + 6);
  doc.text('Última Revisión:', 110, y + 12);
  doc.text('Próxima Revisión:', 110, y + 17);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(docRecord.category, 42, y + 6);
  doc.text(docRecord.responsible, 42, y + 12);
  doc.text(docRecord.creationDate, 42, y + 17);

  doc.text(docRecord.version, 140, y + 6);
  doc.text(docRecord.reviewDate, 140, y + 12);
  doc.text(docRecord.expirationDate, 140, y + 17);

  y += 26;

  // Description block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 41, 66);
  doc.text('1. OBJETIVO Y ALCANCE DEL DOCUMENTO', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitDesc = doc.splitTextToSize(docRecord.description, 182);
  doc.text(splitDesc, 14, y);
  y += splitDesc.length * 4.5 + 4;

  // Summary / Content
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 41, 66);
  doc.text('2. CONTENIDO TÉCNICO Y DIRECTRICES', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const splitContent = doc.splitTextToSize(docRecord.contentSummary, 182);
  doc.text(splitContent, 14, y);
  y += splitContent.length * 4.5 + 6;

  // Render sub-sections if provided
  if (docRecord.sections && docRecord.sections.length > 0) {
    docRecord.sections.forEach((sec, idx) => {
      if (y > 240) {
        doc.addPage();
        y = addCorporateHeader(doc, docRecord.name, `Continuación - Sección ${idx + 3}`, company);
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 41, 66);
      doc.text(`${idx + 3}. ${sec.title.toUpperCase()}`, 14, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const splitSec = doc.splitTextToSize(sec.content, 182);
      doc.text(splitSec, 14, y);
      y += splitSec.length * 4.5 + 6;
    });
  }

  // Signatures section
  if (y > 225) {
    doc.addPage();
    y = addCorporateHeader(doc, docRecord.name, 'Aprobación y Firmas', company);
  }
  y = Math.max(y, 220);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);

  // Box 1: Elaboró
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, 56, 32);
  doc.line(18, y + 20, 66, y + 20);
  doc.text('Elaboró:', 18, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(company.sstLeaderName, 18, y + 24);
  doc.text(`Líder SST - Lic. ${company.sstLicenseNumber}`, 18, y + 28);

  // Box 2: Revisó
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.rect(77, y, 56, 32);
  doc.line(81, y + 20, 129, y + 20);
  doc.text('Revisó:', 81, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Comité Paritario SST / Vigía', 81, y + 24);
  doc.text('Representante de Trabajadores', 81, y + 28);

  // Box 3: Aprobó
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.rect(140, y, 56, 32);
  doc.line(144, y + 20, 192, y + 20);
  doc.text('Aprobó:', 144, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(company.representativeName, 144, y + 24);
  doc.text('Representante Legal Data Integral', 144, y + 28);

  addCorporateFooter(doc, 1, 1, company);
  doc.save(`${docRecord.code}_Data_Integral_${docRecord.name.replace(/\s+/g, '_')}.pdf`);
}

// 2. Export Annual Work Plan (PAT)
export function downloadWorkPlanPdf(activities: PlanActivity[], company: CompanySettings) {
  const doc = new jsPDF({ format: 'a4', orientation: 'landscape', unit: 'mm' });
  const totalCompleted = activities.filter(a => a.status === 'completada').length;
  const avgProgress = Math.round(activities.reduce((acc, a) => acc + a.progress, 0) / (activities.length || 1));

  // Landscape dimensions: 297mm x 210mm
  doc.setFillColor(15, 41, 66);
  doc.rect(0, 0, 297, 20, 'F');
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 20, 297, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`${company.name.toUpperCase()} - PLAN ANUAL DE TRABAJO SG-SST`, 14, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cumplimiento Decreto 1072 de 2015 art. 2.2.4.6.8 | Avance Global: ${avgProgress}% | Finalizadas: ${totalCompleted}/${activities.length}`, 14, 16);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 280, 14, { align: 'right' });

  let y = 30;

  // Table Header
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 269, 8, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, 269, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 41, 66);
  doc.text('CÓDIGO', 16, y + 5.5);
  doc.text('ACTIVIDAD / OBJETIVO', 36, y + 5.5);
  doc.text('RESPONSABLE', 120, y + 5.5);
  doc.text('ÁREA', 160, y + 5.5);
  doc.text('FECHAS', 195, y + 5.5);
  doc.text('ESTADO', 235, y + 5.5);
  doc.text('AVANCE', 265, y + 5.5);

  y += 8;

  activities.forEach((act) => {
    if (y > 185) {
      doc.addPage();
      y = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(30, 41, 59);
    doc.text(act.code, 16, y + 4.5);

    doc.setFont('helvetica', 'normal');
    const actTitle = doc.splitTextToSize(`${act.name} - ${act.objective}`, 80);
    doc.text(actTitle, 36, y + 4.5);

    doc.text(act.responsible, 120, y + 4.5);
    doc.text(act.area, 160, y + 4.5);
    doc.text(`${act.startDate} al ${act.deadlineDate}`, 195, y + 4.5);

    // Status pill text
    doc.setFont('helvetica', 'bold');
    doc.text(act.status.toUpperCase(), 235, y + 4.5);
    doc.text(`${act.progress}%`, 265, y + 4.5);

    const rowHeight = Math.max(8, actTitle.length * 3.5 + 4);
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + rowHeight, 283, y + rowHeight);
    y += rowHeight;
  });

  doc.save(`Plan_Anual_Trabajo_Data_Integral_${new Date().getFullYear()}.pdf`);
}

// 3. Export Hazard Matrix (GTC 45)
export function downloadHazardMatrixPdf(hazards: HazardRiskItem[], company: CompanySettings) {
  const doc = new jsPDF({ format: 'a4', orientation: 'landscape', unit: 'mm' });

  doc.setFillColor(15, 41, 66);
  doc.rect(0, 0, 297, 20, 'F');
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 20, 297, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(`${company.name.toUpperCase()} - MATRIZ DE IDENTIFICACIÓN DE PELIGROS Y RIESGOS (GTC 45)`, 14, 11);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Enfoque en Oficinas Administrativas, Asesoría Jurídica y Financiera | Decreto 1072 de 2015`, 14, 16);
  doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 280, 14, { align: 'right' });

  let y = 30;

  hazards.forEach((h, index) => {
    if (y > 175) {
      doc.addPage();
      y = 25;
    }

    doc.setFillColor(index % 2 === 0 ? 255 : 248, 250, 252);
    doc.rect(14, y, 269, 22, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, y, 269, 22, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 41, 66);
    doc.text(`${h.code} | Área: ${h.area} | Proceso: ${h.process} | Clasificación: ${h.hazardCategory}`, 18, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`Peligro: ${h.hazardDescription}`, 18, y + 10);
    doc.text(`Consecuencias: ${h.possibleEffects} | Expuestos: ${h.exposedWorkersCount} pers.`, 18, y + 15);
    doc.text(`Nivel de Riesgo (NR): ${h.evaluation.riskLevel} | Interpretación: ${h.evaluation.acceptability}`, 18, y + 20);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`Medidas de Intervención:`, 160, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(`Admin: ${h.interventionMeasures.administrative.substring(0, 70)}...`, 160, y + 10);
    doc.text(`Ingeniería/EPP: ${h.interventionMeasures.engineering || h.interventionMeasures.epp || 'N/A'}`, 160, y + 15);
    doc.text(`Responsable: ${h.responsible} | Estado: ${h.status}`, 160, y + 20);

    y += 25;
  });

  doc.save(`Matriz_Peligros_GTC45_Data_Integral_${new Date().getFullYear()}.pdf`);
}

// 4. Export Incident / Accident Report (Resolución 1401 de 2007)
export function downloadIncidentReportPdf(incident: IncidentReport, company: CompanySettings) {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  let y = addCorporateHeader(doc, `INFORME Y REGISTRO DE EVENTO LABORAL`, `Resolución 1401 de 2007 | Código: ${incident.code}`, company);

  // Type badge
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 41, 66);
  doc.text(`TIPO DE EVENTO: ${incident.eventType.replace('_', ' ').toUpperCase()}`, 18, y + 8);
  doc.text(`ESTADO: ${incident.caseStatus.toUpperCase()}`, 150, y + 8);
  y += 16;

  // General Details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('1. INFORMACIÓN GENERAL DEL SUCESO', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(`Fecha y Hora: ${incident.date} a las ${incident.time}`, 18, y);
  doc.text(`Lugar / Sede: ${incident.location} - Área: ${incident.area}`, 18, y + 5);
  doc.text(`Reportado por: ${incident.reporterName}`, 18, y + 10);
  doc.text(`Días de Incapacidad Estimados: ${incident.daysLost}`, 110, y + 10);
  y += 18;

  // Description
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 41, 66);
  doc.text('2. DESCRIPCIÓN DETALLADA DE LO OCURRIDO', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const descSplit = doc.splitTextToSize(incident.description, 182);
  doc.text(descSplit, 14, y);
  y += descSplit.length * 4.5 + 6;

  // Causes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 41, 66);
  doc.text('3. ANÁLISIS DE CAUSAS (RESOLUCIÓN 1401/2007)', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Causas Inmediatas (Actos / Condiciones Subestándar):`, 18, y);
  y += 4;
  doc.text(doc.splitTextToSize(incident.immediateCauses || 'En proceso de valoración', 174), 22, y);
  y += 8;

  doc.text(`Causas Básicas (Factores de Trabajo / Personales):`, 18, y);
  y += 4;
  doc.text(doc.splitTextToSize(incident.basicCauses || 'En proceso de valoración', 22), 22, y);
  y += 10;

  // Corrective measures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 41, 66);
  doc.text('4. PLAN DE ACCIÓN Y MEDIDAS CORRECTIVAS', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  if (incident.correctiveMeasures.length === 0) {
    doc.text('No se han registrado medidas correctivas adicionales.', 18, y);
    y += 8;
  } else {
    incident.correctiveMeasures.forEach((m, idx) => {
      doc.text(`${idx + 1}. ${m.measure} | Resp: ${m.responsible} | Límite: ${m.deadline} | [${m.status}]`, 18, y);
      y += 5;
    });
  }

  // Disclaimer Ley 1581
  y = Math.max(y, 240);
  doc.setFillColor(248, 250, 252);
  doc.rect(14, y, 182, 16, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(14, y, 182, 16, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('PROTECCIÓN DE DATOS PERSONALES - LEY 1581 DE 2012:', 18, y + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Los datos relativos a la salud e integridad física de los trabajadores son de reserva legal y se custodian bajo estricta confidencialidad por el Responsable SST de Data Integral S.A.S.', 18, y + 10);

  addCorporateFooter(doc, 1, 1, company);
  doc.save(`Informe_Investigacion_${incident.code}_Data_Integral.pdf`);
}

// 5. Export Inspection Record
export function downloadInspectionPdf(inspection: InspectionRecord, company: CompanySettings) {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  let y = addCorporateHeader(doc, `FORMATO DE INSPECCIÓN DE SEGURIDAD`, `${inspection.type} | Código: ${inspection.code}`, company);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 41, 66);
  doc.text(`Fecha: ${inspection.date} | Inspector: ${inspection.inspectorName} (${inspection.inspectorRole}) | Área: ${inspection.area}`, 14, y);
  doc.text(`Calificación de Cumplimiento: ${inspection.scorePercentage}%`, 14, y + 6);
  y += 14;

  // Items table
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, 182, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 41, 66);
  doc.text('CRITERIO DE SEGURIDAD EVALUADO', 18, y + 5);
  doc.text('ESTADO', 130, y + 5);
  doc.text('OBSERVACIONES', 155, y + 5);
  y += 8;

  inspection.items.forEach((it) => {
    if (y > 250) {
      doc.addPage();
      y = 25;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const qSplit = doc.splitTextToSize(it.question, 110);
    doc.text(qSplit, 18, y + 3.5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(it.result === 'cumple' ? 6 : (it.result === 'no_cumple' ? 185 : 100), it.result === 'cumple' ? 95 : 28, it.result === 'cumple' ? 70 : 28);
    doc.text(it.result.toUpperCase().replace('_', ' '), 130, y + 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(it.observation ? it.observation.substring(0, 35) : '-', 155, y + 3.5);

    const itemHeight = Math.max(6, qSplit.length * 3.5 + 2);
    doc.setDrawColor(241, 245, 249);
    doc.line(14, y + itemHeight, 196, y + itemHeight);
    y += itemHeight;
  });

  // Findings if any
  if (inspection.findings.length > 0) {
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(185, 28, 28);
    doc.text('HALLAZGOS Y ACCIONES DERIVADAS:', 14, y);
    y += 5;

    inspection.findings.forEach((f, idx) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      doc.text(`${idx + 1}. [Prioridad: ${f.priority}] ${f.description} -> Acción: ${f.correctiveAction} (Resp: ${f.responsible}, Plazo: ${f.deadline})`, 18, y);
      y += 5;
    });
  }

  addCorporateFooter(doc, 1, 1, company);
  doc.save(`Inspeccion_${inspection.code}_Data_Integral.pdf`);
}

// 6. Export Executive Indicators Report
export function downloadIndicatorsReportPdf(
  stats: {
    planProgress: number;
    trainingCoverage: number;
    inspectionScore: number;
    openIncidents: number;
    closedActionsPercentage: number;
    validDocsPercentage: number;
    totalWorkers: number;
  },
  company: CompanySettings
) {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  let y = addCorporateHeader(doc, 'INFORME EJECUTIVO DE INDICADORES SG-SST', 'Seguimiento a Estructura, Proceso y Resultado | Decreto 1072/2015', company);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 41, 66);
  doc.text('TABLERO DE CONTROL - GESTIÓN INTEGRAL', 14, y);
  y += 8;

  const metrics = [
    { label: 'Avance Plan Anual de Trabajo', value: `${stats.planProgress}%`, goal: '100% anual', status: stats.planProgress >= 70 ? 'Satisfactorio' : 'En seguimiento' },
    { label: 'Cobertura de Capacitaciones SST', value: `${stats.trainingCoverage}%`, goal: '> 85%', status: stats.trainingCoverage >= 80 ? 'Satisfactorio' : 'Atención requerida' },
    { label: 'Cumplimiento Inspecciones de Seguridad', value: `${stats.inspectionScore}%`, goal: '> 90%', status: stats.inspectionScore >= 90 ? 'Excelente' : 'En mejora' },
    { label: 'Accidentes e Incidentes Activos', value: `${stats.openIncidents}`, goal: '0 casos', status: stats.openIncidents === 0 ? 'Sin novedad' : 'En investigación' },
    { label: 'Cierre de Acciones Correctivas', value: `${stats.closedActionsPercentage}%`, goal: '100%', status: stats.closedActionsPercentage >= 75 ? 'Controlado' : 'Pendientes' },
    { label: 'Vigencia de Documentación Controlada', value: `${stats.validDocsPercentage}%`, goal: '100%', status: stats.validDocsPercentage >= 90 ? 'Vigente' : 'Por revisar' },
  ];

  metrics.forEach(m => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, 182, 14, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, y, 182, 14, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 41, 66);
    doc.text(m.label, 18, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Meta: ${m.goal} | Estado: ${m.status}`, 18, y + 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(16, 185, 129);
    doc.text(m.value, 185, y + 9, { align: 'right' });

    y += 17;
  });

  addCorporateFooter(doc, 1, 1, company);
  doc.save(`Informe_Indicadores_SGSST_Data_Integral_${new Date().getFullYear()}.pdf`);
}

// 7. Export Emergency Plan & Brigade Roster
export function downloadEmergencyPlanPdf(brigade: BrigadeMember[], equipment: EmergencyEquipment[], company: CompanySettings) {
  const doc = new jsPDF({ format: 'a4', unit: 'mm' });
  let y = addCorporateHeader(doc, 'PLAN DE PREVENCIÓN, PREPARACIÓN Y RESPUESTA ANTE EMERGENCIAS', 'Brigada de Emergencias y Recursos de Respuesta | Sede Medellín', company);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 41, 66);
  doc.text('1. INTEGRANTES DE LA BRIGADA DE EMERGENCIAS', 14, y);
  y += 6;

  brigade.forEach(b => {
    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 12, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 41, 66);
    doc.text(`${b.name} - ${b.brigadeRole.toUpperCase()}`, 18, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(`Cargo: ${b.position} | Área: ${b.area} | Tel/Ext: ${b.phone} (Ext. ${b.extension}) | RH: ${b.bloodType}`, 18, y + 9.5);
    y += 14;
  });

  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 41, 66);
  doc.text('2. EQUIPAMIENTO Y RECURSOS PARA EMERGENCIAS', 14, y);
  y += 6;

  equipment.forEach(e => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(`• [${e.code}] ${e.type} | Ubicación: ${e.location} | Estado: ${e.status} | Próx. Inspección: ${e.nextInspectionDate}`, 18, y);
    y += 5.5;
  });

  addCorporateFooter(doc, 1, 1, company);
  doc.save(`Plan_Emergencias_Data_Integral_${new Date().getFullYear()}.pdf`);
}
