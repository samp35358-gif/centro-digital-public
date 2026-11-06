import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  Eye, 
  Heart, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  AlertTriangle,
  Smile,
  Sparkles,
  Clock,
  Trophy,
  Activity,
  Calendar,
  XCircle,
  HelpCircle,
  Check,
  RefreshCw,
  Info
} from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LearningModule {
  id: number;
  title: string;
  category: string;
  icon: React.ReactNode;
  summary: string;
  keyTakeaways: string[];
  quiz: QuizQuestion;
}

interface DailyExercise {
  title: string;
  focusArea: string;
  duration: string;
  instructions: string;
  postureTip: string;
}

interface DailyRoutine {
  id: string;
  dayIndex: number; // 1 = Lunes, 2 = Martes, etc.
  dayName: string;
  shortName: string;
  focusTitle: string;
  targetArea: string;
  colorClass: string;
  bgLightClass: string;
  borderClass: string;
  description: string;
  exercises: DailyExercise[];
}

export const LearnView: React.FC = () => {
  // Navigation State
  const [selectedTopic, setSelectedTopic] = useState<number>(0);
  
  // Quiz State per module: key is module index (0 to 9)
  const [quizStates, setQuizStates] = useState<Record<number, { selectedIndex: number | null; isSubmitted: boolean }>>({
    0: { selectedIndex: null, isSubmitted: false },
    1: { selectedIndex: null, isSubmitted: false },
    2: { selectedIndex: null, isSubmitted: false },
    3: { selectedIndex: null, isSubmitted: false },
    4: { selectedIndex: null, isSubmitted: false },
    5: { selectedIndex: null, isSubmitted: false },
    6: { selectedIndex: null, isSubmitted: false },
    7: { selectedIndex: null, isSubmitted: false },
    8: { selectedIndex: null, isSubmitted: false },
    9: { selectedIndex: null, isSubmitted: false },
  });

  // Daily Active Break State
  const currentDayOfWeek = new Date().getDay(); // 0 = Dom, 1 = Lun, 2 = Mar, 3 = Mie, 4 = Jue, 5 = Vie, 6 = Sab
  const defaultDayIndex = currentDayOfWeek === 0 || currentDayOfWeek === 6 ? 1 : currentDayOfWeek;
  const [selectedDayId, setSelectedDayId] = useState<string>(() => {
    switch (defaultDayIndex) {
      case 1: return 'lunes';
      case 2: return 'martes';
      case 3: return 'miercoles';
      case 4: return 'jueves';
      case 5: return 'viernes';
      default: return 'lunes';
    }
  });

  const [activeBreakViewMode, setActiveBreakViewMode] = useState<'stepper' | 'list'>('stepper');
  const [currentExerciseStep, setCurrentExerciseStep] = useState<number>(0);
  const [completedBreaksCount, setCompletedBreaksCount] = useState<number>(() => {
    const saved = localStorage.getItem('di_completed_breaks');
    return saved ? parseInt(saved, 10) : 3;
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // Timer State
  const [timerPreset, setTimerPreset] = useState<number>(300); // 300 sec = 5 mins default
  const [timerSeconds, setTimerSeconds] = useState<number>(300);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const handleSetTimerPreset = (secs: number) => {
    setTimerPreset(secs);
    setTimerSeconds(secs);
    setTimerRunning(false);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectQuizOption = (optionIndex: number) => {
    setQuizStates(prev => ({
      ...prev,
      [selectedTopic]: {
        selectedIndex: optionIndex,
        isSubmitted: false
      }
    }));
  };

  const handleSubmitQuiz = () => {
    if (quizStates[selectedTopic]?.selectedIndex === null) return;
    setQuizStates(prev => ({
      ...prev,
      [selectedTopic]: {
        ...prev[selectedTopic],
        isSubmitted: true
      }
    }));
  };

  const handleResetQuiz = () => {
    setQuizStates(prev => ({
      ...prev,
      [selectedTopic]: {
        selectedIndex: null,
        isSubmitted: false
      }
    }));
  };

  const handleCompleteActiveBreak = () => {
    const newCount = completedBreaksCount + 1;
    setCompletedBreaksCount(newCount);
    localStorage.setItem('di_completed_breaks', newCount.toString());
    setShowCelebration(true);
    setTimerRunning(false);
    setTimeout(() => setShowCelebration(false), 4500);
  };

  // 10 Comprehensive Learning Modules with individualized questions
  const learningModules: LearningModule[] = [
    {
      id: 1,
      title: 'Seguridad y Salud en el Trabajo (SG-SST)',
      category: 'Marco Normativo',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      summary: 'El SG-SST es un proceso lógico y por etapas basado en el ciclo PHVA (Planear, Hacer, Verificar y Actuar) para anticipar, reconocer y controlar los riesgos en Data Integral.',
      keyTakeaways: [
        'Aplica a todos los trabajadores dependientes, contratistas, teletrabajadores y directivos de Data Integral.',
        'Se fundamenta legalmente en el Decreto 1072 de 2015 y los estándares mínimos de la Resolución 0312 de 2019.',
        'La seguridad es una corresponsabilidad activa entre la Gerencia General, el Líder SST y cada uno de los colaboradores.'
      ],
      quiz: {
        question: '¿A quiénes aplica y protege el Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST) de Data Integral?',
        options: [
          'Únicamente a los empleados contratados a término indefinido en la sede principal.',
          'A todos los trabajadores dependientes, contratistas, teletrabajadores, pasantes y directivos sin excepción.',
          'Exclusivamente a los miembros de la Brigada de Emergencia y al Líder de SST.',
          'Solo a quienes realizan labores físicas o manipulación de cargas pesadas.'
        ],
        correctIndex: 1,
        explanation: 'Conforme al Artículo 2.2.4.6.1 del Decreto 1072 de 2015, el SG-SST tiene cobertura total para todas las personas vinculadas laboral o contractualmente en la organización.'
      }
    },
    {
      id: 2,
      title: 'Prevención de Accidentes en Oficinas',
      category: 'Seguridad Locativa',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      summary: 'En entornos de oficina jurídica y financiera, los accidentes más frecuentes provienen de caídas a nivel, tropiezos con cables, cajones abiertos y cortes con papelería.',
      keyTakeaways: [
        'Mantén siempre despejados los pasillos y no acumules cajas de expedientes en las zonas de paso.',
        'Cierra siempre los archivadores y cajones inmediatamente después de utilizarlos para evitar tropiezos.',
        'Reporta de inmediato cualquier derrame de café, agua o piso resbaloso para su señalización y secado.'
      ],
      quiz: {
        question: '¿Cuál es la causa más común de accidentes laborales en oficinas administrativas como Data Integral?',
        options: [
          'Caídas al mismo nivel originadas por cables sueltos, cajones abiertos o líquidos derramados.',
          'Atrapamiento severo por maquinaria industrial de alta potencia.',
          'Exposición continua a radiaciones ionizantes y químicos tóxicos industriales.',
          'Derrumbes estructurales o fallas de cimentación.'
        ],
        correctIndex: 0,
        explanation: 'En empresas de oficina y servicios financieros (Riesgo I), más del 65% de los incidentes corresponden a caídas a nivel y tropiezos por desorden locativo o cables en el suelo.'
      }
    },
    {
      id: 3,
      title: 'Identificación de Peligros en Mi Puesto',
      category: 'Gestión de Riesgos',
      icon: <Eye className="w-5 h-5 text-blue-600" />,
      summary: 'Aprende a diferenciar claramente entre una fuente de peligro y el nivel de riesgo conforme a la metodología oficial colombiana GTC 45.',
      keyTakeaways: [
        'Peligro es la fuente, situación o acto con potencial de causar daño (ej: regleta rota, silla descalibrada).',
        'Riesgo es la combinación de la probabilidad de que ocurra y la severidad de las lesiones generadas.',
        'Si identificas una condición subestándar en tu puesto, regístrala oportunamente en el módulo de reportes.'
      ],
      quiz: {
        question: 'Según la Guía Técnica Colombiana GTC 45, ¿cuál es la diferencia exacta entre "Peligro" y "Riesgo"?',
        options: [
          'Son conceptos idénticos que pueden usarse indistintamente en cualquier matriz técnica.',
          'El peligro es la fuente o situación con potencial de daño; el riesgo es la probabilidad y gravedad de que dicho daño ocurra.',
          'El peligro se refiere únicamente a incendios, mientras que el riesgo aplica solo a la salud mental.',
          'El riesgo es el evento que ya causó la muerte y el peligro es una simple sospecha.'
        ],
        correctIndex: 1,
        explanation: 'La GTC 45 define el peligro como la condición intrínseca con potencial de generar lesión, mientras que el riesgo evalúa la probabilidad y consecuencia del evento peligroso.'
      }
    },
    {
      id: 4,
      title: 'Uso de Elementos de Protección Personal',
      category: 'Protección y Dotación',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      summary: 'En Data Integral la protección se centra en ayudas ergonómicas personalizadas y dotación técnica especializada para brigadistas y personal de servicios generales.',
      keyTakeaways: [
        'Utiliza el apoyapiés regulable y el cojín lumbar según la evaluación de tu puesto de trabajo.',
        'Los brigadistas deben conservar en perfecto estado su chaleco reflectivo, silbato, linterna y carnet.',
        'El personal de mantenimiento y aseo debe utilizar guantes de nitrilo y calzado con suela antideslizante certificada.'
      ],
      quiz: {
        question: 'En un entorno de oficina y asesoría financiera, ¿cuáles son los elementos prioritarios de protección ergonómica y biomecánica?',
        options: [
          'Casco de obra pesada con barbuquejo y arnés para trabajos en alturas.',
          'Apoyapiés ergonómico graduable, cojín o soporte lumbar, pad mouse con gel y calibración de silla ergonómica.',
          'Gafas para soldadura autógena y guantes de carnaza de 18 pulgadas.',
          'No se requiere ningún elemento porque el trabajo de oficina no genera desgaste físico.'
        ],
        correctIndex: 1,
        explanation: 'Las ayudas biomecánicas (reposapiés, soporte lumbar, pad mouse con soporte para túnel carpiano) previenen desórdenes músculo-esqueléticos crónicos en labores de oficina.'
      }
    },
    {
      id: 5,
      title: 'Prevención y Atención de Emergencias',
      category: 'Respuesta ante Contingencias',
      icon: <Zap className="w-5 h-5 text-rose-600" />,
      summary: 'Protocolos de actuación inmediata ante sismos, conatos de incendio o emergencias médicas repentinas en las oficinas de Medellín.',
      keyTakeaways: [
        'Conoce la ruta de evacuación hacia la plazoleta exterior del Edificio Poblado.',
        'Durante un sismo: ¡Protégete y agáchate junto a columnas estructurales! Nunca utilices los ascensores.',
        'Usa el extintor de Solkaflam (agente limpio) únicamente para conatos incipientes sobre equipos de cómputo y servidores.'
      ],
      quiz: {
        question: 'En caso de presentarse un sismo de fuerte intensidad mientras estás en la oficina, ¿cuál es la conducta inmediata correcta?',
        options: [
          'Salir corriendo de inmediato hacia las escaleras empujando a los demás para llegar primero.',
          'Tomar el ascensor principal para bajar más rápido a la planta baja.',
          'Agacharse, cubrirse bajo un escritorio resistente o junto a columnas estructurales, esperar a que cese el temblor y luego evacuar por las escaleras hacia el punto de encuentro.',
          'Gritar por la ventana y permanecer de pie junto a ventanales de vidrio.'
        ],
        correctIndex: 2,
        explanation: 'El protocolo oficial de sismo indica autoprotección inicial lejos de vidrios y cables, no usar ascensores, y evacuar calmadamente por escaleras una vez finalizado el movimiento telúrico.'
      }
    },
    {
      id: 6,
      title: 'Reporte de Condiciones Inseguras',
      category: 'Cultura Preventiva',
      icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
      summary: 'Tu reporte a tiempo evita accidentes, incapacidades y daños en los equipos de trabajo de Data Integral.',
      keyTakeaways: [
        'No esperes a que ocurra un accidente o tropiezo para notificar una situación irregular.',
        'Puedes reportar cables desgastados, lámparas parpadeantes, filtraciones de agua o sillas dañadas.',
        'Cada reporte genera un registro trazable con plazo de solución asignado al área encargada.'
      ],
      quiz: {
        question: 'Si observas una toma de corriente que emite chispas o una alfombra levantada en el pasillo central, ¿qué debes hacer según la norma?',
        options: [
          'Esperar a que otra persona lo arregle o hasta que alguien se electrocute para confirmar el problema.',
          'Tratar de desarmar la toma de corriente con tijeras de oficina sin cortar la energía eléctrica.',
          'Reportarlo inmediatamente a través del sistema o al Líder SST para gestionar el mantenimiento correctivo oportuno.',
          'Pegarle cinta adhesiva transparente y no comentarlo a nadie para no interrumpir la jornada.'
        ],
        correctIndex: 2,
        explanation: 'El Decreto 1072/2015 establece la obligación legal del trabajador de informar oportunamente al empleador sobre los peligros y riesgos latentes en su sitio de trabajo.'
      }
    },
    {
      id: 7,
      title: 'Ergonomía en Puestos de Trabajo',
      category: 'Salud Biomecánica',
      icon: <Smile className="w-5 h-5 text-teal-600" />,
      summary: 'Reglas fundamentales de postura corporal para evitar dolores cervicales, contracturas en el trapecio y fatiga física durante la jornada laboral.',
      keyTakeaways: [
        'El borde superior de la pantalla debe situarse exactamente a la altura de tus ojos, a una distancia de 50 a 60 cm.',
        'Los codos deben formar un ángulo de 90° con los antebrazos apoyados suavemente sobre la superficie o descansabrazos.',
        'La espalda debe permanecer completamente adosada al espaldar de la silla, apoyando la curvatura lumbar.'
      ],
      quiz: {
        question: '¿A qué altura exacta debe calibrarse el borde superior de la pantalla del computador para evitar dolores cervicales?',
        options: [
          'A la altura del ombligo para mirar cómodamente hacia abajo todo el día.',
          'Alineado exactamente con el nivel de los ojos horizontales del usuario (posición neutral del cuello).',
          'A 30 centímetros por encima de la cabeza obligando a mantener el mentón elevado.',
          'No tiene importancia, cualquier altura es ergonómicamente válida.'
        ],
        correctIndex: 1,
        explanation: 'Tener el borde superior del monitor a la altura de la vista garantiza que la columna cervical permanezca en posición neutra, previniendo sobrecargas musculares en nuca y hombros.'
      }
    },
    {
      id: 8,
      title: 'Pausas Activas y Descansos Cognitivos',
      category: 'Higiene Postural',
      icon: <Heart className="w-5 h-5 text-pink-600" />,
      summary: 'Breves sesiones de movimiento articular, elongación y desconexión mental cada 2 horas de trabajo frente a pantallas y negociaciones financieras.',
      keyTakeaways: [
        'Reactiva la circulación venosa y oxigena el cerebro para mejorar la toma de decisiones jurídicas.',
        'Reduce la fatiga ocular aplicando la regla 20-20-20 (mirar a 6 metros durante 20 segundos).',
        'Dedica 5 minutos dos veces al día utilizando el temporizador interactivo de esta plataforma.'
      ],
      quiz: {
        question: '¿Con qué frecuencia mínima y duración se recomienda realizar pausas activas en jornadas continuas frente a computador?',
        options: [
          'Una sola vez al mes durante 2 horas seguidas.',
          'Cada 2 horas continuas de labor estática, con una duración de entre 5 y 10 minutos.',
          'Solo los viernes en la tarde antes de salir de la oficina.',
          'Únicamente cuando el médico emite una incapacidad laboral prolongada.'
        ],
        correctIndex: 1,
        explanation: 'La medicina preventiva del trabajo recomienda realizar pausas activas breves de 5 a 10 minutos cada 2 horas de labor estática para romper el sedentarismo y favorecer el retorno venoso.'
      }
    },
    {
      id: 9,
      title: 'Seguridad Digital y Habeas Data (Ley 1581)',
      category: 'Confidencialidad',
      icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
      summary: 'Data Integral custodia expedientes de crédito e historial financiero sensible de miles de colombianos bajo estrictas normas de confidencialidad y reserva legal.',
      keyTakeaways: [
        'Bloquea siempre tu pantalla (atajo Windows + L o Control + Cmd + Q) cada vez que te ausentes de tu puesto.',
        'Nunca anotes contraseñas en notas adhesivas pegadas al monitor o debajo del teclado.',
        'La Ley 1581 de 2012 y la SIC imponen sanciones severas por filtraciones no autorizadas de historiales crediticios.'
      ],
      quiz: {
        question: '¿Qué procedimiento de seguridad física y digital debes aplicar cada vez que te levantas de tu escritorio para ir al baño o a una reunión?',
        options: [
          'Dejar las carpetas de clientes abiertas y el computador desbloqueado para no perder tiempo al regresar.',
          'Bloquear de inmediato la sesión del computador (Windows + L) y aplicar la política de escritorio limpio para documentos físicos.',
          'Desconectar el cable de internet de toda la oficina.',
          'Pedirle a un compañero que use tu clave personal para continuar tus trámites mientras regresas.'
        ],
        correctIndex: 1,
        explanation: 'El bloqueo de sesión (Windows + L) y la custodia física de documentos sensibles garantizan el cumplimiento de la Ley de Protección de Datos Personales (Ley 1581/2012).'
      }
    },
    {
      id: 10,
      title: 'Hábitos Saludables y Salud Mental',
      category: 'Bienestar Psicosocial',
      icon: <Heart className="w-5 h-5 text-emerald-600" />,
      summary: 'Estrategias de equilibrio emocional, respiración diafragmática, adecuada hidratación y desconexión laboral efectiva para prevenir el síndrome de burnout.',
      keyTakeaways: [
        'Mantén un termo de agua fresca en tu escritorio y consume al menos 2 litros diarios para evitar dolores de cabeza.',
        'Aplica la técnica de respiración diafragmática 4-7-8 tras llamadas de alta tensión con entidades bancarias.',
        'Respeta los horarios de descanso y desconexión digital para compartir con tu familia y recargar energía.'
      ],
      quiz: {
        question: 'Ante un momento de alta tensión o sobrecarga emocional por negociaciones complejas de cartera, ¿cuál es una técnica saludable inmediata?',
        options: [
          'Aumentar el consumo de café en exceso y saltarse el almuerzo para terminar antes.',
          'Pausar un momento, realizar respiración diafragmática pausada (inhalar en 4 seg, sostener en 7 y exhalar en 8) e hidratarse.',
          'Descargar la frustración gritando a los clientes o compañeros de equipo.',
          'Trabajar 14 horas continuas sin levantarse de la silla.'
        ],
        correctIndex: 1,
        explanation: 'La respiración diafragmática pausada activa el sistema nervioso parasimpático, reduce la frecuencia cardíaca y los niveles de cortisol, permitiendo recuperar la serenidad y la claridad mental.'
      }
    }
  ];

  // Daily Active Break Routines for ALL Days of the Week
  const dailyRoutines: DailyRoutine[] = [
    {
      id: 'lunes',
      dayIndex: 1,
      dayName: 'Lunes',
      shortName: 'Lun',
      focusTitle: 'Movilidad Cervical, Cuello y Hombros',
      targetArea: 'Zona Cervical y Trapecio',
      colorClass: 'text-emerald-700 bg-emerald-100 border-emerald-300',
      bgLightClass: 'bg-emerald-50/70',
      borderClass: 'border-emerald-300',
      description: 'Ideal para comenzar la semana liberando la rigidez del cuello y la tensión acumulada en la cintura escapular.',
      exercises: [
        {
          title: '1. Inclinación Lateral de Cuello',
          focusArea: 'Músculo esternocleidomastoideo y trapecio superior',
          duration: '15 segundos por cada lado',
          instructions: 'Siéntate erguido, lleva suavemente la oreja derecha hacia el hombro derecho sin levantar el hombro. Con la mano derecha haz una ligera presión suave. Respira profundo y repite hacia el lado izquierdo.',
          postureTip: 'Mantén los hombros relajados hacia abajo, no los subas hacia las orejas.'
        },
        {
          title: '2. Giros Circulares de Hombros',
          focusArea: 'Articulación glenohumeral y deltoides',
          duration: '10 giros hacia atrás y 10 hacia adelante',
          instructions: 'Con los brazos sueltos a los costados, dibuja círculos amplios y lentos con ambos hombros hacia atrás. Siente cómo se juntan los omóplatos. Luego cambia el sentido hacia adelante.',
          postureTip: 'Inhala al subir los hombros y exhala al bajarlos con control.'
        },
        {
          title: '3. Flexión Cervical Mentón al Pecho',
          focusArea: 'Músculos extensores de la nuca y fascia dorsal',
          duration: '20 segundos mantenidos',
          instructions: 'Entrelaza los dedos detrás de la cabeza a la altura de la nuca. Con la espalda recta, baja suavemente la cabeza llevando el mentón al pecho con el propio peso de los brazos.',
          postureTip: 'No encorves la espalda baja; la flexión debe ocurrir únicamente en el cuello.'
        },
        {
          title: '4. Estiramiento de Trapecio con Brazo Cruzado',
          focusArea: 'Zona posterior de hombros y escápulas',
          duration: '15 segundos por brazo',
          instructions: 'Cruza el brazo derecho horizontalmente frente al pecho. Con la mano izquierda presiona el codo suavemente hacia ti. Repite con el brazo izquierdo.',
          postureTip: 'Mantén el torso mirando al frente sin rotar el cuerpo.'
        },
        {
          title: '5. Retracción Escapular ("Sacar Pecho")',
          focusArea: 'Romboides y musculatura postural dorsal',
          duration: '12 repeticiones sosteniendo 2 seg',
          instructions: 'Con los codos flexionados a 90° junto a las costillas, empuja los codos y omóplatos hacia atrás como si quisieras atrapar un lápiz entre ellos.',
          postureTip: 'Abre el pecho y respira hondo para corregir la postura encorvada frente a la pantalla.'
        }
      ]
    },
    {
      id: 'martes',
      dayIndex: 2,
      dayName: 'Martes',
      shortName: 'Mar',
      focusTitle: 'Manos, Muñecas y Antebrazos (Anti-Túnel Carpiano)',
      targetArea: 'Músculos Flexores y Extensores de Dedos',
      colorClass: 'text-blue-700 bg-blue-100 border-blue-300',
      bgLightClass: 'bg-blue-50/70',
      borderClass: 'border-blue-300',
      description: 'Especialmente diseñado para redactar memoriales jurídicos y digitación prolongada de datos crediticios.',
      exercises: [
        {
          title: '1. Extensión Dorsal de Muñeca ("El Alto")',
          focusArea: 'Tendones flexores de dedos y túnel carpiano',
          duration: '15 segundos por cada mano',
          instructions: 'Extiende el brazo derecho al frente con el codo recto. Con la palma hacia el frente y dedos apuntando al techo, usa la otra mano para empujar suavemente los dedos hacia atrás.',
          postureTip: 'Asegúrate de incluir el dedo pulgar en el estiramiento si es posible sin dolor.'
        },
        {
          title: '2. Flexión Palmar de Muñeca',
          focusArea: 'Músculos extensores del antebrazo y dorso de la muñeca',
          duration: '15 segundos por cada mano',
          instructions: 'Con el mismo brazo extendido, gira la palma hacia ti con los dedos apuntando al piso. Presiona suavemente el dorso de la mano con la otra mano.',
          postureTip: 'No dobles el codo; mantén el brazo a la altura de los hombros.'
        },
        {
          title: '3. Bombeo Sanguíneo: Puño y Abanico',
          focusArea: 'Circulación periférica de falanges y palmas',
          duration: '20 repeticiones rítmicas',
          instructions: 'Cierra las manos apretando en puño firme durante 1 segundo, luego ábrelas extendiendo los dedos al máximo como un abanico. Repite a ritmo constante.',
          postureTip: 'Ayuda a drenar líquidos acumulados por posturas sostenidas con el mouse.'
        },
        {
          title: '4. Rotación Suave en Infinito con Muñecas',
          focusArea: 'Articulación radiocarpiana y ligamentos',
          duration: '15 repeticiones fluidas',
          instructions: 'Entrelaza los dedos de ambas manos y dibuja la figura de un 8 o infinito en el aire, moviendo las muñecas con suavidad y soltura.',
          postureTip: 'Movimiento fluido y sin tirones bruscos.'
        },
        {
          title: '5. Separación y Masaje en Zona Tenar',
          focusArea: 'Eminencia tenar (músculo base del pulgar)',
          duration: '15 segundos por mano',
          instructions: 'Con el pulgar de la mano opuesta, realiza un suave masaje circular en la zona carnosa ubicada debajo del dedo pulgar, la cual se fatiga con el uso del mouse.',
          postureTip: 'Aplica una presión agradable que libere la tensión del clic continuo.'
        }
      ]
    },
    {
      id: 'miercoles',
      dayIndex: 3,
      dayName: 'Miércoles',
      shortName: 'Mié',
      focusTitle: 'Salud Visual y Descanso Cognitivo',
      targetArea: 'Músculos Oculares y Relajación Mental',
      colorClass: 'text-indigo-700 bg-indigo-100 border-indigo-300',
      bgLightClass: 'bg-indigo-50/70',
      borderClass: 'border-indigo-300',
      description: 'Mitad de semana: descongestiona la vista del brillo del monitor y alivia la saturación mental por negociaciones.',
      exercises: [
        {
          title: '1. Regla 20-20-20 Visual',
          focusArea: 'Músculo ciliar del ojo y enfoque lejano',
          duration: '20 segundos continuos',
          instructions: 'Aparta por completo la vista de pantallas y celulares. Busca un punto lejano u objeto a través de la ventana a más de 6 metros (20 pies) y mantén la mirada relajada en él.',
          postureTip: 'Parpadea de forma natural mientras contemplas el horizonte.'
        },
        {
          title: '2. Palming Visual (Baño de Oscuridad)',
          focusArea: 'Retina, nervio óptico y relajación ocular',
          duration: '30 segundos en completa calma',
          instructions: 'Frota enérgicamente las palmas de tus manos hasta que estén tibias. Luego colócalas en forma de cuenco sobre tus ojos cerrados, sin presionar los globos oculares.',
          postureTip: 'Disfruta de la oscuridad absoluta y la calidez transmitida por las manos.'
        },
        {
          title: '3. Parpadeo Consciente Rehidratante',
          focusArea: 'Película lagrimal y superficie de la córnea',
          duration: '20 repeticiones suaves',
          instructions: 'Frente a computadores parpadeamos 60% menos. Abre y cierra los ojos lentamente apretando suavemente los párpados para rehidratar la superficie ocular.',
          postureTip: 'Evita frotarte los ojos con las manos para prevenir infecciones.'
        },
        {
          title: '4. Movilidad Ocular en Cruz y Círculo',
          focusArea: '6 músculos extraoculares (rectos y oblicuos)',
          duration: '10 repeticiones completas',
          instructions: 'Sin mover la cabeza, mira hacia arriba al techo, luego abajo al piso, a la derecha y a la izquierda. Luego dibuja un círculo lento con la mirada.',
          postureTip: 'Mantén la respiración tranquila y la mandíbula relajada.'
        },
        {
          title: '5. Respiración 4-7-8 Antiestrés',
          focusArea: 'Sistema nervioso autónomo (tono parasimpático)',
          duration: '4 ciclos completos de respiración',
          instructions: 'Inhala lentamente por la nariz en 4 segundos, retén el aire en los pulmones durante 7 segundos y exhala suavemente por la boca durante 8 segundos.',
          postureTip: 'Siente cómo se desinfla el abdomen y cae el estrés acumulado.'
        }
      ]
    },
    {
      id: 'jueves',
      dayIndex: 4,
      dayName: 'Jueves',
      shortName: 'Jue',
      focusTitle: 'Columna, Espalda y Descompresión Lumbar',
      targetArea: 'Zona Lumbar, Dorsal y Pélvica',
      colorClass: 'text-amber-800 bg-amber-100 border-amber-300',
      bgLightClass: 'bg-amber-50/70',
      borderClass: 'border-amber-300',
      description: 'Alivia la carga y presión acumulada en los discos vertebrales L4-L5 tras varias horas en posición sedente.',
      exercises: [
        {
          title: '1. Descompresión Lumbar de Pie',
          focusArea: 'Discos intervertebrales y músculos paravertebrales',
          duration: '15 segundos x 3 repeticiones',
          instructions: 'Ponte de pie con los pies separados al ancho de caderas. Coloca las palmas de las manos sobre la parte baja de la espalda (zona lumbar) y arquea suavemente el tronco hacia atrás.',
          postureTip: 'Inhala al arquear y mira hacia la unión de la pared con el techo, sin forzar el cuello.'
        },
        {
          title: '2. Torsión Suave de Columna en la Silla',
          focusArea: 'Músculos rotadores y oblicuos del tronco',
          duration: '15 segundos por cada lado',
          instructions: 'Siéntate erguido con los pies apoyados en el piso. Gira el torso hacia la derecha tomando el apoyabrazos o el espaldar con ambas manos. Respira hondo y cambia hacia la izquierda.',
          postureTip: 'La rotación debe nacer desde el ombligo, manteniendo los hombros a nivel.'
        },
        {
          title: '3. El "Abrazo de Oso" para Espalda Alta',
          focusArea: 'Romboides, trapecio medio y zona interescapular',
          duration: '20 segundos sostenidos',
          instructions: 'Cruza ambos brazos sobre tu pecho rodeándote fuertemente como si te dieras un gran abrazo, buscando alcanzar los omóplatos con la yema de tus dedos.',
          postureTip: 'Baja ligeramente el mentón y siente la apertura agradable entre los omóplatos.'
        },
        {
          title: '4. Estiramiento Lateral con Brazo Elevado',
          focusArea: 'Músculo cuadrado lumbar y dorsal ancho',
          duration: '15 segundos por lado',
          instructions: 'Eleva el brazo derecho por encima de la cabeza e inclina el torso suavemente hacia la izquierda, sintiendo el estiramiento en todo el costado lateral.',
          postureTip: 'No dejes que el torso se incline hacia adelante; mantén el plano vertical.'
        },
        {
          title: '5. Flexión Relajada hacia los Tobillos',
          focusArea: 'Isquiotibiales y elongación completa de la cadena posterior',
          duration: '20 segundos de descompresión total',
          instructions: 'Sentado en el borde de la silla con piernas separadas, deja caer lentamente el torso, los brazos y la cabeza hacia el suelo entre las rodillas.',
          postureTip: 'Sube muy despacio vértebra por vértebra, siendo la cabeza lo último en elevarse.'
        }
      ]
    },
    {
      id: 'viernes',
      dayIndex: 5,
      dayName: 'Viernes',
      shortName: 'Vie',
      focusTitle: 'Piernas, Caderas y Retorno Venoso',
      targetArea: 'Extremidades Inferiores y Sistema Circulatorio',
      colorClass: 'text-rose-700 bg-rose-100 border-rose-300',
      bgLightClass: 'bg-rose-50/70',
      borderClass: 'border-rose-300',
      description: 'Activa la bomba muscular de las pantorrillas para prevenir varices, pesadez en piernas y retención de líquidos.',
      exercises: [
        {
          title: '1. Elevación de Talones y Puntas (Bomba Sóleo)',
          focusArea: 'Gemelos, sóleo y válvulas del retorno venoso',
          duration: '20 repeticiones rítmicas',
          instructions: 'De pie o sentado, eleva los talones apoyándote en las puntas de los pies durante 1 segundo, luego baja los talones y levanta las puntas de los pies apoyándote en los talones.',
          postureTip: 'Siente la contracción en las pantorrillas que bombea sangre de vuelta al corazón.'
        },
        {
          title: '2. Estiramiento de Cuádriceps de Pie',
          focusArea: 'Músculo cuádriceps y flexores de cadera',
          duration: '15 segundos por cada pierna',
          instructions: 'Apóyate con una mano en el respaldo de la silla o en la pared. Con la otra mano toma el empeine del pie derecho y lleva el talón hacia el glúteo.',
          postureTip: 'Mantén ambas rodillas juntas y la pelvis en retroversión sin arquear la espalda.'
        },
        {
          title: '3. Elongación de Glúteos y Piriforme ("Figura 4")',
          focusArea: 'Músculo piramidal y alivio del nervio ciático',
          duration: '20 segundos por pierna',
          instructions: 'Sentado en la silla, cruza el tobillo derecho sobre la rodilla izquierda (formando un número 4). Con la espalda recta, inclina suavemente el torso hacia adelante.',
          postureTip: 'Excelente ejercicio para evitar el síndrome del falso ciático por sentarse mucho tiempo.'
        },
        {
          title: '4. Marcha Suave en el Sitio',
          focusArea: 'Articulación de cadera y activación cardiorrespiratoria',
          duration: '30 segundos constantes',
          instructions: 'Ponte de pie detrás de tu silla y marcha suavemente en tu puesto levantando las rodillas de forma alterna y balanceando los brazos con energía.',
          postureTip: 'Respira con fluidez para reactivar la energía de cara al cierre de semana.'
        },
        {
          title: '5. Sacudida Descargante de Piernas y Pies',
          focusArea: 'Liberación miofascial y relajación global',
          duration: '10 segundos por cada pierna',
          instructions: 'Levanta un pie a pocos centímetros del suelo y sacúdelo suavemente como si tuvieras agua en el zapato y quisieras salpicarla. Repite con el otro pie.',
          postureTip: 'Termina sintiendo ligereza y frescura en tus extremidades inferiores.'
        }
      ]
    },
    {
      id: 'sabado',
      dayIndex: 6,
      dayName: 'Sábado / Express',
      shortName: 'Sáb',
      focusTitle: 'Activación Integral Rápida y Anti-Estrés (3 Min)',
      targetArea: 'Cuerpo Completo y Reanimación Energética',
      colorClass: 'text-purple-700 bg-purple-100 border-purple-300',
      bgLightClass: 'bg-purple-50/70',
      borderClass: 'border-purple-300',
      description: 'Una secuencia rápida y completa de 5 movimientos clave para reiniciar mente y cuerpo en días de guardia o alta demanda.',
      exercises: [
        {
          title: '1. Gran Estiramiento de Cuerpo Entero ("Buenos Días")',
          focusArea: 'Cadena muscular anterior y columna completa',
          duration: '20 segundos estirando al máximo',
          instructions: 'De pie, entrelaza los dedos, voltea las palmas hacia arriba y estira los brazos hacia el techo lo más alto que puedas, como si quisieras tocar el cielo mientras te paras en puntas de pie.',
          postureTip: 'Inhala profundamente llenando todo el pecho de aire fresco.'
        },
        {
          title: '2. Giros de Cintura y Pelvis',
          focusArea: 'Articulaciones lumbosacra y caderas',
          duration: '10 círculos en cada sentido',
          instructions: 'Coloca las manos en la cintura con pies separados y haz círculos amplios con la pelvis como si estuvieras usando un ula-ula.',
          postureTip: 'Mueve fluidamente la cadera liberando la pelvis.'
        },
        {
          title: '3. Apretón y Soltada de Mandíbula y Rostro',
          focusArea: 'Músculos maseteros y expresión facial',
          duration: '3 repeticiones de 5 segundos',
          instructions: 'Abre la boca como bostezando grande y luego sonríe de oreja a oreja, relajando la mandíbula y las sienes.',
          postureTip: 'Muchas personas aprietan los dientes inconscientemente por el estrés.'
        },
        {
          title: '4. Sacudida Total de Brazos y Hombros',
          focusArea: 'Descarga de tensión y circulación terminal',
          duration: '15 segundos continuos',
          instructions: 'Suelta los brazos a los costados y sacúdelos con vigor, rebotando suavemente sobre los talones para dejar ir el cansancio.',
          postureTip: 'Exhala sonoramente por la boca liberando cualquier tensión restante.'
        },
        {
          title: '5. Respiración de Victoria y Centramiento',
          focusArea: 'Concentración y bienestar emocional',
          duration: '3 respiraciones lentas con postura erguida',
          instructions: 'Coloca una mano sobre el pecho y otra sobre el abdomen. Inhala sintiendo cómo se expande el abdomen, retén 2 segundos y exhala agradeciendo tu esfuerzo y cuidado personal.',
          postureTip: '¡Felicidades por dedicar este momento a tu salud y bienestar en Data Integral!'
        }
      ]
    }
  ];

  // Current active daily routine
  const activeRoutine = dailyRoutines.find(r => r.id === selectedDayId) || dailyRoutines[0];

  // Calculate user's quiz completion metrics
  const completedQuestionsCount = Object.values(quizStates).filter(q => q.isSubmitted).length;
  const correctQuestionsCount = Object.entries(quizStates).filter(([modIdx, state]) => {
    if (!state.isSubmitted || state.selectedIndex === null) return false;
    const mod = learningModules[parseInt(modIdx, 10)];
    return mod && state.selectedIndex === mod.quiz.correctIndex;
  }).length;

  const currentModule = learningModules[selectedTopic];
  const currentQuizState = quizStates[selectedTopic] || { selectedIndex: null, isSubmitted: false };
  const isCurrentQuizCorrect = currentQuizState.isSubmitted && currentQuizState.selectedIndex === currentModule.quiz.correctIndex;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40">
            <GraduationCap className="w-3.5 h-3.5" />
            Centro de Aprendizaje y Pausas Activas Diarias · Data Integral
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Aprende sobre <span className="text-emerald-400">Seguridad, Salud y Bienestar</span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Explora los 10 módulos interactivos de SG-SST con autoevaluación obligatoria y practica rutinas de pausas activas personalizadas para cada día de la semana.
          </p>
        </div>

        {/* Global Progress Widget */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 self-start md:self-center shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Tu Avance Evaluativo</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                {Math.round((completedQuestionsCount / 10) * 100)}%
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mt-0.5">
              {completedQuestionsCount} de 10 módulos respondidos ({correctQuestionsCount} correctos)
            </p>
            <div className="w-36 sm:w-44 bg-slate-700 h-2 rounded-full overflow-hidden mt-1.5">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${(completedQuestionsCount / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Popup Alert */}
      {showCelebration && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-4 shadow-xl border border-emerald-400/40 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold text-lg shadow">
              🎉
            </div>
            <div>
              <h4 className="font-bold text-sm">¡Excelente trabajo! Has completado tu pausa activa</h4>
              <p className="text-xs text-emerald-100">Cuidar tu cuerpo y tu mente optimiza tu rendimiento profesional en Data Integral.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCelebration(false)} 
            className="text-white hover:text-emerald-200 text-sm font-bold px-3 py-1 rounded-lg bg-black/10"
          >
            ✕
          </button>
        </div>
      )}

      {/* SECTION 1: SECCIÓN DE PAUSAS ACTIVAS PARA TODOS LOS DÍAS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-bold border border-pink-200">
              <Heart className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              Guías Diarias de Pausas Activas · Opciones para Toda la Semana
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Pausas Activas: <span className="text-emerald-600">Rutinas Especializadas por Día</span>
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Cada día de la semana aborda un grupo muscular y articular específico para prevenir la fatiga postural y el estrés.
            </p>
          </div>

          {/* Stats on completed breaks */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2.5 rounded-xl self-start md:self-auto">
            <Activity className="w-5 h-5 text-emerald-600" />
            <div className="text-xs">
              <span className="text-slate-500 block text-[10px]">Pausas realizadas</span>
              <strong className="text-slate-900 font-bold">{completedBreaksCount} sesiones</strong>
            </div>
            <button
              onClick={handleCompleteActiveBreak}
              className="ml-2 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95"
              title="Registrar que realizaste tu pausa activa de hoy"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Marcar Realizada</span>
            </button>
          </div>
        </div>

        {/* Day Selector Pills with "Sugerido para hoy" */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Selecciona el Día o Rutina:
            </span>
            <span className="text-[11px] text-slate-500">
              Hoy es {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][currentDayOfWeek]}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {dailyRoutines.map((routine) => {
              const isSelected = selectedDayId === routine.id;
              const isToday = (currentDayOfWeek === 0 && routine.id === 'lunes') ||
                              (currentDayOfWeek === routine.dayIndex);

              return (
                <button
                  key={routine.id}
                  onClick={() => {
                    setSelectedDayId(routine.id);
                    setCurrentExerciseStep(0);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/30'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="text-xs font-bold text-slate-900">{routine.dayName}</span>
                    {isToday && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-600 text-white">
                        Hoy
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-600 line-clamp-1 font-medium">
                    {routine.targetArea}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Routine Details + Interactive Timer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Side: Exercises Details (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Routine Title Banner */}
            <div className={`p-4 rounded-2xl border ${activeRoutine.borderClass} ${activeRoutine.bgLightClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${activeRoutine.colorClass}`}>
                    Rutina de {activeRoutine.dayName}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {activeRoutine.exercises.length} ejercicios guiados
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {activeRoutine.focusTitle}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {activeRoutine.description}
                </p>
              </div>

              {/* View Mode Toggle: Stepper vs List */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start sm:self-auto shadow-xs">
                <button
                  onClick={() => setActiveBreakViewMode('stepper')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeBreakViewMode === 'stepper' 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Paso a Paso
                </button>
                <button
                  onClick={() => setActiveBreakViewMode('list')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeBreakViewMode === 'list' 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Ver Todos
                </button>
              </div>
            </div>

            {/* Stepper View Mode */}
            {activeBreakViewMode === 'stepper' ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
                {/* Stepper Progress Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">
                      Ejercicio {currentExerciseStep + 1} de {activeRoutine.exercises.length}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                      {activeRoutine.exercises[currentExerciseStep].duration}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Enfoque: {activeRoutine.exercises[currentExerciseStep].focusArea}
                  </span>
                </div>

                {/* Step Content */}
                <div className="space-y-3">
                  <h5 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                      {currentExerciseStep + 1}
                    </span>
                    {activeRoutine.exercises[currentExerciseStep].title}
                  </h5>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                    <strong className="text-xs text-slate-800 block uppercase tracking-wider">
                      Instrucciones de Ejecución:
                    </strong>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {activeRoutine.exercises[currentExerciseStep].instructions}
                    </p>
                  </div>

                  <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                    <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="font-bold">Consejo Postural:</strong>{' '}
                      <span>{activeRoutine.exercises[currentExerciseStep].postureTip}</span>
                    </div>
                  </div>
                </div>

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                  <button
                    onClick={() => setCurrentExerciseStep(s => Math.max(0, s - 1))}
                    disabled={currentExerciseStep === 0}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-all"
                  >
                    ← Ejercicio Anterior
                  </button>

                  <div className="flex items-center gap-1.5">
                    {activeRoutine.exercises.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentExerciseStep(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          currentExerciseStep === i ? 'bg-emerald-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        title={`Ir al ejercicio ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentExerciseStep(s => Math.min(activeRoutine.exercises.length - 1, s + 1))}
                    disabled={currentExerciseStep === activeRoutine.exercises.length - 1}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 transition-all shadow-sm"
                  >
                    Siguiente Ejercicio →
                  </button>
                </div>
              </div>
            ) : (
              /* List View Mode: Show all exercises for the selected day */
              <div className="space-y-3">
                {activeRoutine.exercises.map((ex, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 hover:bg-white transition-colors">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                          {i + 1}
                        </span>
                        {ex.title}
                      </h5>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {ex.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ex.instructions}
                    </p>
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                      💡 <strong>Tip postural:</strong> {ex.postureTip}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Interactive Timer Widget (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-500/30 space-y-5 text-center">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <Clock className="w-3.5 h-3.5" />
                Temporizador de Pausa Activa
              </div>

              {/* Presets: 3 min, 5 min, 10 min */}
              <div className="flex justify-center gap-1.5">
                {[
                  { label: '3 min', sec: 180 },
                  { label: '5 min', sec: 300 },
                  { label: '7 min', sec: 420 },
                ].map(p => (
                  <button
                    key={p.sec}
                    onClick={() => handleSetTimerPreset(p.sec)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      timerPreset === p.sec && !timerRunning
                        ? 'bg-emerald-500 text-slate-950 shadow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Digital Countdown Display */}
              <div className="text-5xl font-black font-mono tracking-wider text-emerald-400 py-1 drop-shadow-md">
                {formatTimer(timerSeconds)}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-1000"
                  style={{ width: `${((timerPreset - timerSeconds) / timerPreset) * 100}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg active:scale-95 ${
                    timerRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                  }`}
                >
                  {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{timerRunning ? 'Pausar Reloj' : 'Iniciar Sesión'}</span>
                </button>

                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(timerPreset);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Reiniciar temporizador"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1 text-left">
                <span className="font-bold text-emerald-300 block text-[11px] uppercase tracking-wider">
                  Beneficios Médicos Comprobados:
                </span>
                <p className="text-[11px] text-slate-400">• Disminuye un 45% el riesgo de contracturas en cuello y hombros.</p>
                <p className="text-[11px] text-slate-400">• Estimula el retorno venoso y previene fatiga mental en asesores.</p>
              </div>
            </div>

            {/* Quick reminder card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950 space-y-1">
              <strong className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Compromiso Corporativo SG-SST:
              </strong>
              <p className="text-[11px] text-emerald-800">
                La Resolución 0312 de 2019 recomienda realizar al menos 2 pausas activas al día (mañana y tarde) de 5 a 10 minutos cada una.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: MÓDULOS EDUCATIVOS CON PREGUNTA INDIVIDUAL EN CADA UNO */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              Módulos Educativos con Autoevaluación
            </h3>
            <p className="text-xs text-slate-600">
              Cada módulo contiene directrices clave del SG-SST y una pregunta interactiva con retroalimentación inmediata.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border">
            10 Módulos Disponibles
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Col: Modules List (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Selecciona un Módulo:
            </h4>
            <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
              {learningModules.map((mod, idx) => {
                const isSelected = selectedTopic === idx;
                const modQuiz = quizStates[idx];
                const hasAnswered = modQuiz?.isSubmitted;
                const isCorrect = hasAnswered && modQuiz.selectedIndex === mod.quiz.correctIndex;

                return (
                  <button
                    key={mod.id}
                    onClick={() => setSelectedTopic(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0">
                        {mod.icon}
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 block font-semibold">
                          Módulo {idx + 1}
                        </span>
                        <span className="font-bold text-slate-800 text-xs block truncate">
                          {mod.title}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {hasAnswered ? (
                        isCorrect ? (
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold" title="Evaluación Aprobada">
                            ✓
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold" title="Respuesta Incorrecta">
                            ✕
                          </span>
                        )
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px]" title="Pendiente de evaluación">
                          ?
                        </span>
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Col: Deep Dive Module Content + Individual Quiz (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {currentModule && (
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
                
                {/* Module Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200">
                      {currentModule.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          Módulo {selectedTopic + 1} de 10 · {currentModule.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mt-1">
                        {currentModule.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Module Summary */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Resumen Ejecutivo:
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {currentModule.summary}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-2.5">
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Puntos Clave para la Operación de Data Integral:
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {currentModule.keyTakeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* INDIVIDUAL QUIZ COMPONENT FOR THIS SPECIFIC MODULE */}
                <div className="border-t border-slate-200 pt-5 space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                      <h5 className="text-sm font-bold text-slate-900">
                        Autoevaluación del Módulo {selectedTopic + 1}:
                      </h5>
                    </div>
                    {currentQuizState.isSubmitted && (
                      <button
                        onClick={handleResetQuiz}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reintentar Pregunta</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-800 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
                    {currentModule.quiz.question}
                  </p>

                  {/* Multiple Choice Options */}
                  <div className="space-y-2 text-xs">
                    {currentModule.quiz.options.map((opt, optIdx) => {
                      const isSelected = currentQuizState.selectedIndex === optIdx;
                      const isCorrectOption = optIdx === currentModule.quiz.correctIndex;
                      
                      let optionStyle = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';

                      if (currentQuizState.isSubmitted) {
                        if (isCorrectOption) {
                          optionStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                        } else if (isSelected && !isCorrectOption) {
                          optionStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                        } else {
                          optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400';
                        }
                      } else if (isSelected) {
                        optionStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold ring-1 ring-blue-500';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={currentQuizState.isSubmitted}
                          onClick={() => handleSelectQuizOption(optIdx)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${optionStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt}</span>
                          {currentQuizState.isSubmitted && isCorrectOption && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          )}
                          {currentQuizState.isSubmitted && isSelected && !isCorrectOption && (
                            <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit Button or Immediate Technical Feedback */}
                  {!currentQuizState.isSubmitted ? (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={currentQuizState.selectedIndex === null}
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all active:scale-95"
                      >
                        <Check className="w-4 h-4" />
                        <span>Comprobar Respuesta</span>
                      </button>
                    </div>
                  ) : (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-300 ${
                      isCurrentQuizCorrect 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-sm">
                        {isCurrentQuizCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-800">¡Respuesta Correcta!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span className="text-rose-800">Respuesta Incorrecta</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-700">
                        <strong>Sustento Normativo y Técnico:</strong> {currentModule.quiz.explanation}
                      </p>
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
