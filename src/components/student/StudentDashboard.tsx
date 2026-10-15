import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../shared/Logo";
import { 
  LogOut, 
  BookOpen, 
  Calendar, 
  Clock, 
  ExternalLink, 
  Award, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  User,
  Zap,
  ChevronRight,
  Bell,
  Home,
  CreditCard,
  Menu,
  X,
  Filter,
  Download,
  PlayCircle,
  FileText,
  Check,
  AlertCircle,
  Settings,
  Flame,
  Layers
} from "lucide-react";

interface StudentDashboardProps {
  userEmail: string;
  onLogout: () => void;
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
  assignedMaterials: any[];
  setAssignedMaterials: React.Dispatch<React.SetStateAction<any[]>>;
  submissions: any[];
  setSubmissions: React.Dispatch<React.SetStateAction<any[]>>;
  quizScores: any[];
  setQuizScores: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function StudentDashboard({
  userEmail,
  onLogout,
  students,
  setStudents,
  assignedMaterials,
  setAssignedMaterials,
  submissions,
  setSubmissions,
  quizScores,
  setQuizScores,
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<"inicio" | "horario" | "materiales" | "laboratorio" | "pagos" | "configuracion">("inicio");
  const [completedLessons, setCompletedLessons] = useState<number>(3);
  const [theme, setTheme] = useState<"tortuga" | "matrix" | "cyber">(() => {
    return (localStorage.getItem("tortumath_student_theme") as any) || "tortuga";
  });

  interface StudentToast {
    id: string;
    message: string;
    type: "info" | "success" | "warning";
  }
  const [toasts, setToasts] = useState<StudentToast[]>([]);

  const addToast = (message: string, type: "info" | "success" | "warning" = "info") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const currentStudent = students.find(s => s.email.toLowerCase() === userEmail.toLowerCase()) || {
    id: "STU-001",
    name: "Sofía Ramos Ortiz",
    phone: "71234567",
    email: "sofia.ramos@gmail.com",
    subject: "Matemáticas Avanzadas",
    plan: "Plan Presencial TortuMath",
    schedule: "Lunes, Miércoles, Viernes - Turno Tarde (14:30 - 17:30)",
    meetLink: "https://meet.google.com/abc-defg-hij",
    paymentVerified: true,
    registrationDate: "2026-05-28",
    amount: 195
  };

  const studentMaterials = assignedMaterials.filter(m => m.studentId === currentStudent.id);

  // Auto detect new material in live feed
  const prevMaterialsCount = useRef(studentMaterials.length);
  useEffect(() => {
    if (studentMaterials.length > prevMaterialsCount.current) {
      const latest = studentMaterials[0];
      if (latest) {
        addToast(`🔔 ¡Tu tutor te ha asignado un nuevo recurso: "${latest.title}"!`, "success");
      }
    }
    prevMaterialsCount.current = studentMaterials.length;
  }, [studentMaterials]);

  // CSS mappings according to the current active theme
  const themeStyles = {
    tortuga: {
      bgMain: "bg-[#0B1512] text-[#F1F5F9]",
      bgCard: "bg-[#0d1e19] border border-emerald-500/15 shadow-[0_4px_24px_rgba(16,185,129,0.03)]",
      bgSidebar: "bg-[#030e0b] border-r border-emerald-500/20",
      accentText: "text-emerald-400",
      accentBg: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]",
      accentBgLight: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      accentBorder: "border-emerald-500/20",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      btnActive: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)] font-extrabold",
      btnHover: "hover:bg-emerald-500/5 hover:text-emerald-400/90",
      indicatorDot: "bg-[#10B981] shadow-[0_0_8px_#10b981]",
      titleGradient: "from-emerald-400 via-[#10B981] to-emerald-600",
      headerText: "text-white"
    },
    matrix: {
      bgMain: "bg-black text-[#00FF66] font-mono",
      bgCard: "bg-black border border-[#00FF66]/30 shadow-[0_0_20px_rgba(0,255,102,0.15)]",
      bgSidebar: "bg-black border-r border-[#00FF66]/30",
      accentText: "text-[#00FF66] font-mono",
      accentBg: "bg-[#00FF66] hover:bg-[#33FF88] text-black font-extrabold shadow-[0_0_15px_rgba(0,255,102,0.3)]",
      accentBgLight: "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30",
      accentBorder: "border-[#00FF66]/30",
      badgeClass: "bg-black text-[#00FF66] border border-[#00FF66]/50 font-mono",
      btnActive: "bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/70 shadow-[inset_0_0_15px_rgba(0,255,102,0.3)] font-black uppercase tracking-wider",
      btnHover: "hover:bg-[#00FF66]/10 hover:text-[#00FF66]",
      indicatorDot: "bg-[#00FF66] shadow-[0_0_12px_#00ff66]",
      titleGradient: "from-[#00FF66] via-green-400 to-[#33FF88]",
      headerText: "text-[#00FF66]"
    },
    cyber: {
      bgMain: "bg-[#030612] text-[#E0E7FF]",
      bgCard: "bg-[#080D26]/90 backdrop-blur-md border border-[#00D2FF]/30 shadow-[0_0_25px_rgba(0,210,255,0.08)]",
      bgSidebar: "bg-[#050818] border-r border-[#00D2FF]/35",
      accentText: "text-[#00D2FF]",
      accentBg: "bg-[#00D2FF] hover:bg-[#33E2FF] text-[#030612] font-black shadow-[0_0_15px_rgba(0,210,255,0.4)]",
      accentBgLight: "bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30",
      accentBorder: "border-[#00D2FF]/30",
      badgeClass: "bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30",
      btnActive: "bg-[#00D2FF]/15 text-[#00D2FF] border border-[#00D2FF]/50 shadow-[inset_0_0_15px_rgba(0,210,255,0.25)] font-extrabold uppercase",
      btnHover: "hover:bg-[#00D2FF]/10 hover:text-[#00D2FF]/90",
      indicatorDot: "bg-[#00D2FF] shadow-[0_0_10px_#00d2ff]",
      titleGradient: "from-[#00D2FF] via-[#9D4EDD] to-[#BD00FF]",
      headerText: "text-white"
    }
  }[theme];
  const [studyStreak, setStudyStreak] = useState<number>(4);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<"todos" | "matematicas" | "fisica">("todos");
  
  // Interactive Mini-Quiz state
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Scheduled classes details state
  const [selectedClassId, setSelectedClassId] = useState<number>(1);

  // Real-time Physics & Electronics Simulator states
  const [rampAngle, setRampAngle] = useState<number>(30); // in degrees
  const [appliedForce, setAppliedForce] = useState<number>(65); // in Newtons
  const [coeffFriction, setCoeffFriction] = useState<number>(0.25); // coefficient μ_k
  const [blockPosition, setBlockPosition] = useState<number>(10); // percentage (10 to 85) along the ramp
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [ledGlowing, setLedGlowing] = useState<boolean>(true);

  // 3D Atom Simulator states
  const [atomRot, setAtomRot] = useState<{ x: 20; y: -30 }>({ x: 20, y: -30 });
  const [orbitSpeed, setOrbitSpeed] = useState<number>(4); // orbit animation duration in seconds

  // Physics dynamic recalculations
  const mass = 10; // kg
  const gravity = 9.81; // m/s^2
  const weightPx = mass * gravity * Math.sin((rampAngle * Math.PI) / 180); // component parallel
  const weightPy = mass * gravity * Math.cos((rampAngle * Math.PI) / 180); // component normal
  const frictionForce = coeffFriction * weightPy;
  const netForce = appliedForce - weightPx - frictionForce;
  const acceleration = netForce / mass;

  // Run simulation interval
  useEffect(() => {
    let timer: any;
    if (isSimulating) {
      timer = setInterval(() => {
        setBlockPosition(prev => {
          // calculate displacement step based on acceleration
          const step = acceleration > 0 ? acceleration * 0.15 : acceleration * 0.15;
          const nextPos = prev + step;
          if (nextPos >= 85) {
            setIsSimulating(false);
            addToast("🏁 ¡El bloque ha alcanzado la cima del plano inclinado!", "success");
            return 85;
          }
          if (nextPos <= 10) {
            setIsSimulating(false);
            addToast("📉 Fuerzas insuficientes. El bloque ha retornado a la base del plano.", "warning");
            return 10;
          }
          return nextPos;
        });
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isSimulating, acceleration]);

  // Mock schedule data
  const weeklySchedule = [
    { id: 1, title: "Álgebra Lineal & Matrices", date: "Lunes, 1 de Junio", time: "14:30 - 15:30", subject: "Matemáticas", tutor: "Prof. Alejandro V.", status: "Completada" },
    { id: 2, title: "Método de Resolución de Ecuaciones", date: "Miércoles, 3 de Junio", time: "14:30 - 15:30", subject: "Matemáticas", tutor: "Prof. Alejandro V.", status: "Próxima" },
    { id: 3, title: "Cinemática y Caída Libre", date: "Viernes, 5 de Junio", time: "14:30 - 15:30", subject: "Física", tutor: "Prof. Alejandro V.", status: "Programada" },
    { id: 4, title: "Sistemas de Ecuaciones 3x3", date: "Lunes, 8 de Junio", time: "14:30 - 15:30", subject: "Matemáticas", tutor: "Prof. Alejandro V.", status: "Programada" },
  ];

  // Resources data structured by category
  const resources = [
    {
      id: "res-1",
      title: "Guía de Matrices de Segundo Grado",
      type: "Ejercicios Prácticos",
      format: "PDF Interactivo",
      subject: "Matemáticas",
      subjectKey: "matematicas",
      color: "emerald",
      badgeText: "Crítico",
      desc: "Problemas prácticos con sistema paso a paso de resolución geométrica y determinantes."
    },
    {
      id: "res-2",
      title: "Práctica Guiada: Leyes de Newton applied",
      type: "Ejercicios Prácticos",
      format: "PDF Integrado",
      subject: "Física",
      subjectKey: "fisica",
      color: "blue",
      badgeText: "Frecuente",
      desc: "Ejercicios de vectores en planos inclinados con fricciones variables."
    },
    {
      id: "res-3",
      title: "Ecuaciones Cuadráticas Básicas",
      type: "Exámenes Rápidos",
      format: "Mini Quiz de 3 minutos",
      subject: "Matemáticas",
      subjectKey: "matematicas",
      color: "emerald",
      badgeText: "Autoevaluación",
      desc: "Resuelve y consolida raíces irracionales de coeficientes enteros y complejos.",
      quiz: {
        title: "Reto Express: Ecuaciones Cuadráticas",
        question: "¿Cuáles son las soluciones reales para la ecuación x² - 5x + 6 = 0?",
        options: ["x = 2 y x = 3", "x = -2 y x = -3", "x = 1 y x = 5", "x = 0 y x = 6"],
        correct: 0,
        explanation: "Correcto. El trinomio x² - 5x + 6 factoriza como (x-2)(x-3) = 0, por lo que las raíces resultan de igualar x-2=0 y x-3=0."
      }
    },
    {
      id: "res-4",
      title: "Movimiento Parabólico y Angulado",
      type: "Exámenes Rápidos",
      format: "Rápido de 4 preguntas",
      subject: "Física",
      subjectKey: "fisica",
      color: "blue",
      badgeText: "Reto",
      desc: "Prueba tu conocimiento en velocidades iniciales con componentes trigonométricos.",
      quiz: {
        title: "Reto Express: Física Movimiento",
        question: "En un lanzamiento de proyectil, ¿en qué punto de la trayectoria la velocidad vertical es exactamente cero?",
        options: ["En el punto de salida", "En la altura máxima h_max", "En el impacto contra el suelo", "Nunca es cero"],
        correct: 1,
        explanation: "Correcto. En el punto de máxima altura, la componente vertical de la velocidad se anula momentáneamente."
      }
    },
    {
      id: "res-5",
      title: "Tabla de Identidades Trigonométricas PDF",
      type: "Material Complementario",
      format: "Diagrama PDF descargable",
      subject: "Matemáticas",
      subjectKey: "matematicas",
      color: "emerald",
      badgeText: "Fórmula",
      desc: "Lámina simplificada excelente para memorizar sumas de ángulos y conversiones en radianes."
    },
    {
      id: "res-6",
      title: "Simulador Gráfico de Vectores Online",
      type: "Material Complementario",
      format: "Enlace Directo",
      subject: "Física",
      subjectKey: "fisica",
      color: "blue",
      badgeText: "Interactiva",
      desc: "Herramienta digital interactividad de adición de vectores concurrentes 2D y 3D."
    }
  ];

  // Payments / Plans logs state
  const paymentsLogs = [
    { id: "TX-2026-034", service: "Plan Semanal TortuMath (Math & Física)", date: "24/05/2026", amount: "Bs. 120", method: "Pago QR Banco", status: "Aprobado" },
    { id: "TX-2026-021", service: "Plan Semanal TortuMath (Math & Física)", date: "17/05/2026", amount: "Bs. 120", method: "Tarjeta de Débito", status: "Aprobado" },
    { id: "TX-2026-015", service: "Plan Semanal TortuMath (Math & Física)", date: "10/05/2026", amount: "Bs. 120", method: "Pago QR Banco", status: "Aprobado" }
  ];

  const handleStartQuiz = (quizData: any) => {
    setActiveQuiz(quizData);
    setSelectedAnswer(null);
    setQuizScore(null);
  };

  const handleSelectAnswer = (index: number) => {
    if (quizScore !== null) return;
    setSelectedAnswer(index);
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === activeQuiz.correct;
    
    if (isCorrect) {
      setQuizScore(1);
      // Boost student success motivation!
      setCompletedLessons(prev => prev + 1);
      setStudyStreak(prev => prev + 1);
    } else {
      setQuizScore(0);
    }

    // Check if this is an assigned quiz from the tutor
    if (activeQuiz.isAssigned) {
      const finalScore = isCorrect ? 100 : 0;
      
      // 1. Update the material status in global assignedMaterials
      setAssignedMaterials((prev: any[]) =>
        prev.map(m => {
          if (m.id === activeQuiz.assignedMaterialId) {
            return {
              ...m,
              status: "calificado",
              score: finalScore,
              maxScore: 100,
              observation: isCorrect 
                ? "¡Excelente trabajo! Has respondido correctamente a la autoevaluación interactiva." 
                : "Se recomienda repasar los conceptos fundamentales sobre este tema con tu tutor."
            };
          }
          return m;
        })
      );

      // 2. Add log entry to global quizScores
      const newLog = {
        id: `Q-${Date.now()}`,
        studentName: currentStudent.name,
        quizTitle: activeQuiz.title,
        score: finalScore,
        maxScore: 100,
        date: new Date().toISOString().split('T')[0],
        status: (isCorrect ? "aprobado" : "repaso") as "aprobado" | "repaso"
      };
      setQuizScores((prev: any[]) => [newLog, ...prev]);

      addToast(`🏆 Quiz terminado: ¡Calificación de ${finalScore}/100 enviada al Administrador con éxito!`, "success");
    }
  };

  const handleUploadNotebookFile = (materialId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const mockContent = [
      `${currentStudent.name} - Cuaderno de Avance`,
      `Práctica de Avance: ${assignedMaterials.find(m => m.id === materialId)?.title || "Tarea"}`,
      `Fecha de Entrega: ${new Date().toISOString().split('T')[0]}`,
      `--------------------------------------------------`,
      `[IMAGEN DE RESOLUCIÓN CARGADA DE FORMA SEGURA]`,
      `Archivo adjunto: ${file.name}`,
      `Tipo de archivo: ${file.type || "image/jpeg"}`,
      `Tamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB`,
      `Sincronizado con el sistema de trazabilidad. Listo para calificación del tutor.`
    ];

    // 1. Update status in assignedMaterials
    setAssignedMaterials((prev: any[]) =>
      prev.map(m => {
        if (m.id === materialId) {
          return {
            ...m,
            status: "entregado",
            notebookContent: mockContent
          };
        }
        return m;
      })
    );

    // 2. Add to submissions
    const newSub = {
      id: `SUB-${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      title: assignedMaterials.find(m => m.id === materialId)?.title || "Tarea",
      subject: currentStudent.subject.split(" ")[0],
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      status: "pendiente",
      notebookContent: mockContent
    };
    setSubmissions((prev: any[]) => [newSub, ...prev]);

    addToast(`🚀 ¡Foto de cuaderno "${file.name}" cargada con éxito! Estado actualizado a "Entregado" para corrección.`, "success");
  };

  const filteredResources = subjectFilter === "todos" 
    ? resources 
    : resources.filter(r => r.subjectKey === subjectFilter);

  // Split resources into content type groupings
  const practicos = filteredResources.filter(r => r.type === "Ejercicios Prácticos");
  const examenes = filteredResources.filter(r => r.type === "Exámenes Rápidos");
  const complementario = filteredResources.filter(r => r.type === "Material Complementario");

  return (
    <div className={`min-h-screen ${themeStyles.bgMain} font-sans flex flex-col md:flex-row relative`}>
      
      {/* 1. SIDEBAR NAVEGACIÓN CONTRASTANTE */}
      {/* Desktop Sidebar (Always visible) */}
      <aside className={`w-64 ${themeStyles.bgSidebar} flex-shrink-0 flex-col justify-between hidden md:flex sticky top-0 h-screen z-20`}>
        <div className="p-5 space-y-6">
          {/* Brand Logo header */}
          <div className="flex items-center gap-2.5 pb-5 border-b border-slate-700/50">
            <Logo size={40} />
            <div>
              <span className="block font-black text-white text-lg tracking-tight font-sans">TortuMath</span>
              <span className={`block text-[10px] ${themeStyles.accentText} uppercase font-extrabold tracking-widest leading-none`}>Portal Alumno</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5" id="sidebar-nav">
            <button
              onClick={() => setActiveTab("inicio")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "inicio"
                  ? themeStyles.btnActive
                  : `text-slate-300 ${themeStyles.btnHover} border border-transparent`
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Inicio</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "inicio" ? "rotate-90 text-emerald-400" : "text-slate-500"}`} />
            </button>

            <button
              onClick={() => setActiveTab("horario")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "horario"
                  ? themeStyles.btnActive
                  : `text-slate-300 ${themeStyles.btnHover} border border-transparent`
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Mi Horario</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "horario" ? "rotate-90 text-emerald-400" : "text-slate-500"}`} />
            </button>

            <button
              onClick={() => setActiveTab("materiales")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "materiales"
                  ? themeStyles.btnActive
                  : `text-slate-300 ${themeStyles.btnHover} border border-transparent`
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Material y Temas</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "materiales" ? "rotate-90 text-emerald-400" : "text-slate-500"}`} />
            </button>

            <button
              onClick={() => setActiveTab("laboratorio")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "laboratorio"
                  ? themeStyles.btnActive
                  : `text-slate-300 ${themeStyles.btnHover} border border-transparent`
              }`}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4" />
                <span>Laboratorio Virtual</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "laboratorio" ? "rotate-90 text-emerald-400" : "text-slate-500"}`} />
            </button>

            <button
              onClick={() => setActiveTab("pagos")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "pagos"
                  ? themeStyles.btnActive
                  : `text-slate-300 ${themeStyles.btnHover} border border-transparent`
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Mi Plan y Pagos</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "pagos" ? "rotate-90 text-emerald-400" : "text-slate-500"}`} />
            </button>

            <button
              onClick={() => setActiveTab("configuracion")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === "configuracion"
                  ? themeStyles.btnActive
                  : `text-slate-300 ${themeStyles.btnHover} border border-transparent`
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Configuración</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === "configuracion" ? "rotate-90 text-emerald-400" : "text-slate-500"}`} />
            </button>
          </nav>
        </div>

        {/* User Card & Logout Bottom info */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-900/40">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white border border-slate-700/50 font-bold ${themeStyles.accentBg}`}>
              {userEmail.substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-black text-white truncate">{userEmail}</span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">Estudiante</span>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="w-full py-2 bg-slate-800 hover:bg-red-950/40 hover:text-rose-400 text-slate-300 text-xs font-bold rounded-lg border border-slate-700/50 hover:border-red-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header and Drawer Navigation for Small Devices */}
      <div className={`md:hidden w-full ${themeStyles.bgSidebar} border-b border-slate-700/50 px-4 py-3 flex items-center justify-between z-30 sticky top-0`}>
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <div>
            <span className="block font-black text-white text-base leading-none">TortuMath</span>
            <span className={`block text-[9px] ${themeStyles.accentText} uppercase font-bold tracking-wider`}>Portal Alumno</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-700 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-20 md:hidden"
            />
            {/* Nav Panel */}
            <motion.div
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className={`fixed top-[57px] bottom-0 left-0 w-64 ${themeStyles.bgSidebar} z-25 border-r border-slate-700/50 p-5 flex flex-col justify-between md:hidden`}
            >
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-extrabold text-slate-450 tracking-widest block px-2">MENÚ PORTAL</span>
                <nav className="space-y-1">
                  <button
                    onClick={() => { setActiveTab("inicio"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
                      activeTab === "inicio" ? themeStyles.btnActive : "text-slate-350"
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Inicio</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("horario"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
                      activeTab === "horario" ? themeStyles.btnActive : "text-slate-350"
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Mi Horario</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("materiales"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
                      activeTab === "materiales" ? themeStyles.btnActive : "text-slate-350"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Material y Temas</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("laboratorio"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
                      activeTab === "laboratorio" ? themeStyles.btnActive : "text-slate-350"
                    }`}
                  >
                    <Zap className="w-4 h-4" />
                    <span>Laboratorio Virtual</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("pagos"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
                      activeTab === "pagos" ? themeStyles.btnActive : "text-slate-350"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Mi Plan y Pagos</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab("configuracion"); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold cursor-pointer ${
                      activeTab === "configuracion" ? themeStyles.btnActive : "text-slate-350"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configuración</span>
                  </button>
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="text-xs text-slate-400 mb-2 font-semibold px-2 truncate">{userEmail}</div>
                <button
                  onClick={onLogout}
                  className="w-full py-2.5 bg-rose-950/20 hover:bg-rose-900/30 text-rose-300 font-bold text-xs rounded-lg flex items-center justify-center gap-2 border border-rose-900/40 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container Area with scroll independence */}
      <div className={`flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto ${themeStyles.bgMain}`}>
        
        {/* 3. REORGANIZACIÓN DEL CONTENIDO PRINCIPAL: HEADER SUPERIOR */}
        <header className={`border-b py-3.5 px-6 md:px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm ${themeStyles.bgCard}`}>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-black uppercase tracking-widest ${themeStyles.accentText} ${themeStyles.accentBgLight} px-2.5 py-1 rounded-full`}>
              {activeTab === "inicio" && "🏠 Dashboard Alumno"}
              {activeTab === "horario" && "📅 Cronograma Semanal"}
              {activeTab === "materiales" && "📚 Repositorio de Temas"}
              {activeTab === "laboratorio" && "⚡ Laboratorio Científico"}
              {activeTab === "pagos" && "💳 Estado de Suscripción"}
              {activeTab === "configuracion" && "🛠️ Ajustes del Sistema"}
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Clock local indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-505 font-bold font-mono text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Bolivia UTC-4</span>
            </div>
            
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-800 hidden lg:block" />

            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-slate-705 text-slate-600 dark:text-slate-300 hidden sm:inline-block">
                Tutor Asignado: <strong className="text-slate-900 dark:text-white">Prof. Alejandro</strong>
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-505 animate-pulse bg-emerald-500" />
            </div>
          </div>
        </header>

        {/* Content Tabs Switcher backed by transition motion */}
        <main className="p-6 md:p-8 space-y-6">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-6"
            >

              {/* TAB 1: INICIO */}
              {activeTab === "inicio" && (
                <>
                  {/* Title Welcome Header Banner with Student Greeting */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1E293B] to-slate-950 border border-slate-800 p-6 md:p-8 shadow-md">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10 text-left">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black uppercase tracking-wide">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Membresía TortuMath Estrella</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                          ¡Hola de nuevo, Alumno! 🐢✨
                        </h2>
                        <p className="text-sm text-slate-300 max-w-2xl font-medium leading-relaxed">
                          Te damos la bienvenida a tu portal de aprendizaje. Aquí encontrarás el enlace a tus clases personalizadas por Google Meet, tus materiales de repaso interactivos y los exámenes de comprobación. ¡Avanza a tu propio ritmo!
                        </p>
                      </div>

                      {/* STATS SMALL CARDS INSIDE REORGANIZATION */}
                      <div className="flex flex-wrap gap-3.5 mt-2 xl:mt-0">
                        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 min-w-[130px] flex-1 sm:flex-none">
                          <div className="flex items-center justify-between mb-1">
                            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
                            <div className="flex gap-1">
                              <button 
                                onClick={() => setStudyStreak(prev => Math.max(0, prev - 1))}
                                className="w-4 h-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded flex items-center justify-center text-[9px] active:scale-95"
                                title="Reducir Racha"
                              >
                                -
                              </button>
                              <button 
                                onClick={() => setStudyStreak(prev => prev + 1)}
                                className="w-4 h-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded flex items-center justify-center text-[9px] active:scale-95"
                                title="Aumentar Racha"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <span className="block text-2xl font-mono font-black text-white">{studyStreak} días</span>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-450 text-slate-400 block mt-0.5">Racha de Estudio</span>
                        </div>

                        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 min-w-[130px] flex-1 sm:flex-none">
                          <div className="flex items-center justify-between mb-1">
                            <Award className="w-5 h-5 text-emerald-400" />
                            <div className="flex gap-1">
                              <button 
                                onClick={() => setCompletedLessons(prev => Math.max(0, prev - 1))}
                                className="w-4 h-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded flex items-center justify-center text-[9px] active:scale-95"
                                title="Reducir clases"
                              >
                                -
                              </button>
                              <button 
                                onClick={() => setCompletedLessons(prev => prev + 1)}
                                className="w-4 h-4 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded flex items-center justify-center text-[9px] active:scale-95"
                                title="Aumentar clases"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <span className="block text-2xl font-mono font-black text-emerald-450 text-emerald-350">{completedLessons}</span>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-450 text-slate-400 block mt-0.5">Sesiones Totales</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. HIGHLIGHT "PRÓXIMA CLASE" & MEET BUTTON */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                    
                    {/* Próxima clase destacada */}
                    <div className="lg:col-span-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-emerald-555 animate-ping bg-emerald-500" />
                          <h3 className="text-base font-black uppercase tracking-wider text-slate-900 dark:text-white">
                            Siguiente Clase Programada
                          </h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 font-extrabold text-xs uppercase border border-emerald-250 dark:border-emerald-700/30 self-start sm:self-auto">
                          Soporte en Vivo habilitado
                        </span>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2.5xl border border-slate-200/80 dark:border-slate-850">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 block tracking-widest">
                            Materia y Tema de la Sesión
                          </span>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                            Resolución de Ecuaciones algebraicas cuadráticas paso a paso
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-450 font-semibold mt-1">
                            Lunes, Miércoles, Viernes • 14:30 a 15:30 (Hora Bolivia)
                          </p>
                        </div>
                        
                        {/* Meet button highlighted in Verde Esmeralda */}
                        <a
                          href="https://meet.google.com/abc-defg-hij"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl transition-all shadow-md shadow-emerald-555/10 flex items-center justify-center gap-2 cursor-pointer text-center whitespace-nowrap"
                        >
                          <span>Entrar a Google Meet</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Details schedule cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-850 flex items-center gap-3">
                          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-xl">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-[11px] text-slate-500 uppercase tracking-widest font-black">Próxima Fecha</span>
                            <span className="text-sm font-bold text-slate-905 text-slate-800 dark:text-slate-200">Miércoles, 3 de Junio (14:30)</span>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-200/50 dark:border-slate-850 flex items-center gap-3">
                          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-xl">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="block text-[11px] text-slate-500 uppercase tracking-widest font-black">Modalidad</span>
                            <span className="text-sm font-bold text-slate-905 text-slate-800 dark:text-slate-200">1 hora vía Aula Virtual Síncrona</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right column in Home - Support advice */}
                    <div className="lg:col-span-4 space-y-6">
                      
                      {/* Contact card */}
                      <div className="bg-gradient-to-br from-emerald-50 dark:from-emerald-950/20 to-white dark:to-slate-950 border border-emerald-200 dark:border-emerald-500/10 rounded-3xl p-6 text-center space-y-4 shadow-sm">
                        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-250 dark:border-emerald-500/30">
                          <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Soporte WhatsApp Escolar
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold px-2">
                            ¿Necesitas coordinar un cambio de horario para tu clase o tienes inconvenientes de internet? Escríbenos directamente.
                          </p>
                        </div>

                        <a
                          href="https://wa.me/59171234567"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        >
                          <span>Chatear en WhatsApp</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                        <span className="text-[10px] text-slate-400 block font-semibold">Atención de Lunes a Sábado de 08:30 a 20:30.</span>
                      </div>

                      {/* Daily Quote / Tip */}
                      <div className="bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-3 shadow-xs">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-500" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#10B981]">Consejo del Tutor</h4>
                        </div>
                        <p className="text-xs italic text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                          "La constancia es la velocidad más alta en el camino del éxito escolar. Resuelve al menos un ejercicio práctico cada día y verás cómo lo complejo se vuelve extremadamente natural."
                        </p>
                        <span className="block text-[10px] font-bold text-slate-400">— Prof. Alejandro V.</span>
                      </div>

                    </div>
                  </div>
                </>
              )}


              {/* TAB 2: MI HORARIO */}
              {activeTab === "horario" && (
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-sm">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white font-sans tracking-tight">
                      Mi Horario de Tutorías
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-405 mt-1 leading-normal">
                      Calendario interactivo y detalles de tus asignaciones programadas. Selecciona una clase para ver el syllabus.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Schedule List */}
                    <div className="lg:col-span-7 space-y-2.5">
                      <span className="text-[10.5px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1">Listado de Sesiones de Junio 2026</span>
                      
                      {weeklySchedule.map((clase) => (
                        <div
                          key={clase.id}
                          onClick={() => setSelectedClassId(clase.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                            selectedClassId === clase.id
                              ? "bg-emerald-500/10 dark:bg-emerald-900/30 border-emerald-500/40 dark:border-emerald-700/50 shadow-xs"
                              : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900/80"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                              clase.status === "Completada"
                                ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
                                : clase.status === "Próxima"
                                ? "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900"
                                : "bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                            }`}>
                              {clase.subject === "Matemáticas" ? "123" : "F=ma"}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="block font-extrabold text-slate-900 dark:text-white text-sm">{clase.title}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                  clase.status === "Completada"
                                    ? "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-400"
                                    : clase.status === "Próxima"
                                    ? "bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-450"
                                    : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400"
                                }`}>
                                  {clase.status}
                                </span>
                              </div>
                              <span className="block text-slate-500 dark:text-slate-450 text-[11px] mt-0.5">
                                {clase.date} • {clase.time}
                              </span>
                            </div>
                          </div>

                          <span className="text-slate-450 dark:text-slate-400 text-xs font-bold font-mono">
                            {clase.subject}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Class Detail panel depending on selection */}
                    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/50 rounded-2.5xl p-5 border border-slate-200 dark:border-slate-850 space-y-4">
                      {(() => {
                        const activeSel = weeklySchedule.find(s => s.id === selectedClassId) || weeklySchedule[0];
                        return (
                          <>
                            <div className="border-b border-slate-200 dark:border-slate-805 pb-3">
                              <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-555 text-xs font-black uppercase rounded dark:text-emerald-400">
                                Syllabus interactivo
                              </span>
                              <h4 className="text-base font-black text-slate-900 dark:text-white mt-2 leading-snug">
                                {activeSel.title}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Tutor asignado: <strong className="text-slate-700 dark:text-slate-250">{activeSel.tutor}</strong>
                              </p>
                            </div>

                            <div className="space-y-3.5 text-xs">
                              <div>
                                <span className="block text-slate-400 uppercase tracking-wider text-[10px] font-black">Objetivos del tema:</span>
                                <ul className="list-disc pl-4 mt-1 text-slate-600 dark:text-slate-300 spacing-y-1 font-medium leading-relaxed">
                                  {activeSel.subject === "Matemáticas" ? (
                                    <>
                                      <li>Establecer condiciones para ecuaciones indeterminadas y sistemas reales.</li>
                                      <li>Aplicación del determinante y regla de Cramer con apoyo gráfico de la tortuga.</li>
                                      <li>Resolución práctica y simulacros de examen de ingreso escolar.</li>
                                    </>
                                  ) : (
                                    <>
                                      <li>Análisis de vectores concurrentes en coordenadas cartesianas.</li>
                                      <li>Ejemplos reales de aceleración gravitatoria y fricciones locales.</li>
                                      <li>Discusión de errores de redondeo en física general de colegio.</li>
                                    </>
                                  )}
                                </ul>
                              </div>

                              <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                                <span className="block text-[10px] uppercase text-emerald-600 dark:text-emerald-400 font-extrabold tracking-wider">Lugar de reunión oficial:</span>
                                <div className="flex items-center justify-between mt-1 text-slate-850 dark:text-slate-200 font-bold">
                                  <span>Google Meet virtual</span>
                                  <a
                                    href="https://meet.google.com/abc-defg-hij"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-500 hover:underline flex items-center gap-1"
                                  >
                                    <span>Ir</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              </div>

                              {activeSel.status === "Próxima" && (
                                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-normal font-semibold">
                                    Conéctate 5 minutos antes con tu material de apuntes listo. ¡Tu profesor estará esperándote!
                                  </p>
                                </div>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 3: MATERIAL Y TEMAS */}
              {activeTab === "materiales" && (
                <div className="space-y-6 text-left">

                  {/* LIVE FEED ASSIGNED MATERIALS FROM THE TUTOR */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/20 rounded-3xl p-6 shadow-xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                        <h4 className="text-sm md:text-base font-black text-white tracking-wide uppercase">
                          📥 Mis Tareas y Quizzes Asignados por mi Tutor
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-450 font-black text-xs uppercase rounded border border-emerald-500/20">
                        {studentMaterials.length} Asignaciones Activas
                      </span>
                    </div>

                    {studentMaterials.length === 0 ? (
                      <div className="p-10 text-center rounded-2xl bg-slate-950/40 border border-slate-900">
                        <p className="text-xs md:text-sm font-semibold text-slate-400">
                          No tienes asignaciones pendientes asignadas por tu tutor en este momento. ✨
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          ¡Buen trabajo! Disfruta de los simuladores interactivos o pídele a tu tutor que te asigne más material.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {studentMaterials.map((mat) => {
                          // Prepare structured mock quiz for Interactive Quiz
                          const quizData = {
                            title: mat.title,
                            question: mat.instructions,
                            options: [
                              "A) Solución correcta óptima",
                              "B) Segunda opción analítica",
                              "C) Ninguna de las anteriores",
                              "D) Revisar con el profesor"
                            ],
                            correct: 0,
                            explanation: "¡Felicidades! Completaste la autoevaluación síncrona.",
                            isAssigned: true,
                            assignedMaterialId: mat.id
                          };

                          return (
                            <div 
                              key={mat.id} 
                              className={`p-5 rounded-2xl border transition-all text-xs flex flex-col justify-between h-48 bg-[#0D1F1A]/95 border-emerald-500/25 shadow-sm hover:border-emerald-500/45`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-wider rounded border border-emerald-500/20">
                                    {mat.type}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                    mat.status === "calificado" 
                                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" 
                                      : mat.status === "entregado" 
                                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" 
                                      : "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                                  }`}>
                                    {mat.status}
                                  </span>
                                </div>

                                <h5 className="font-extrabold text-sm text-white mt-1 leading-snug line-clamp-1">{mat.title}</h5>
                                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-relaxed">{mat.instructions}</p>
                                
                                {mat.status === "calificado" && (
                                  <div className="mt-2 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/5 p-1 px-2 rounded border border-emerald-500/10">
                                    <span>Nota: {mat.score}/{mat.maxScore}</span>
                                    <span>• Obs: {mat.observation}</span>
                                  </div>
                                )}
                              </div>

                              {/* Action button according to material type and status */}
                              <div className="mt-2.5">
                                {mat.status === "calificado" ? (
                                  <div className="w-full text-center py-2 bg-emerald-500/10 text-emerald-400 font-black rounded-lg border border-emerald-500/20 flex items-center justify-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                                    <span>Calificado y Archivado</span>
                                  </div>
                                ) : mat.status === "entregado" ? (
                                  <div className="w-full text-center py-2 bg-blue-500/10 text-blue-400 font-black rounded-lg border border-blue-500/20 flex items-center justify-center gap-1">
                                    <Clock className="w-3.5 h-3.5 animate-spin text-blue-400" />
                                    <span>Pendiente de Calificación</span>
                                  </div>
                                ) : mat.type === "Mini-Prueba Interactiva" ? (
                                  <button
                                    onClick={() => handleStartQuiz(quizData)}
                                    className="w-full text-center py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-black border border-amber-500/30 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <PlayCircle className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Iniciar Mini-Quiz ahora</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => console.log("Abriendo guía...")}
                                    className="w-full text-center py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black border border-slate-700 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-slate-350" />
                                    <span>Ver Guía PDF interactiva</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Subject and materials filters */}
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        Material de Estudio e Indicadores Síncronos
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                        Filtra y accede a tus recursos asignados por categorías de contenido recomendadas.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1.5">
                        <Filter className="w-3.5 h-3.5" /> Filtrar:
                      </span>
                      {[
                        { key: "todos", label: "Todos los recursos" },
                        { key: "matematicas", label: "Matemáticas 📐" },
                        { key: "fisica", label: "Física general ⚛️" },
                      ].map((pill) => (
                        <button
                          key={pill.key}
                          onClick={() => setSubjectFilter(pill.key as any)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                            subjectFilter === pill.key
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                          }`}
                        >
                          {pill.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Groupings by Content Type Containers */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* Container 1: Ejercicios Prácticos (PDFs interactivos) */}
                    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-emerald-500" />
                          <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider">
                            Ejercicios Prácticos
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold text-[10px] uppercase rounded">
                          {practicos.length} PDFs
                        </span>
                      </div>

                      <div className="space-y-3">
                        {practicos.length === 0 ? (
                          <div className="text-xs text-slate-400 py-6 text-center">No hay recursos en esta categoría.</div>
                        ) : (
                          practicos.map((res) => (
                            <div key={res.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs flex flex-col justify-between h-36">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                    res.color === "emerald" 
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                  }`}>
                                    {res.subject}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-semibold">{res.badgeText}</span>
                                </div>
                                <h5 className="font-extrabold text-slate-900 dark:text-white mt-1.5 leading-snug line-clamp-1">{res.title}</h5>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{res.desc}</p>
                              </div>

                              <button
                                onClick={() => alert(`Simulación: Descargando material complementario "${res.title}" en formato PDF interactivo para estudio.`)}
                                className="w-full text-center mt-2.5 py-1.5 bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-black border border-slate-200 dark:border-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1 active:scale-98"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Ver PDF interactivo</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Container 2: Exámenes Rápidos (Mini-quizzes de autoevaluación) */}
                    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-amber-500" />
                          <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider">
                            Exámenes Rápidos
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold text-[10px] uppercase rounded">
                          {examenes.length} Quizzes
                        </span>
                      </div>

                      <div className="space-y-3">
                        {examenes.length === 0 ? (
                          <div className="text-xs text-slate-400 py-6 text-center">No hay recursos en esta categoría.</div>
                        ) : (
                          examenes.map((res) => (
                            <div key={res.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs flex flex-col justify-between h-36">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                    res.color === "emerald" 
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                  }`}>
                                    {res.subject}
                                  </span>
                                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{res.badgeText}</span>
                                </div>
                                <h5 className="font-extrabold text-slate-900 dark:text-white mt-1.5 leading-snug line-clamp-1">{res.title}</h5>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{res.desc}</p>
                              </div>

                              <button
                                onClick={() => handleStartQuiz(res.quiz)}
                                className="w-full text-center mt-2.5 py-1.5 bg-amber-500/10 dark:bg-amber-550/20 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-black border border-amber-300/30 dark:border-amber-700/30 rounded-lg transition-colors flex items-center justify-center gap-1 active:scale-98"
                              >
                                <PlayCircle className="w-3.5 h-3.5" />
                                <span>Iniciar Mini-Quiz hoy</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Container 3: Material Complementario (Links, comprimidos, diagramas) */}
                    <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-500" />
                          <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider">
                            Material Complementario
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-extrabold text-[10px] uppercase rounded">
                          {complementario.length} Links
                        </span>
                      </div>

                      <div className="space-y-3">
                        {complementario.length === 0 ? (
                          <div className="text-xs text-slate-400 py-6 text-center">No hay recursos en esta categoría.</div>
                        ) : (
                          complementario.map((res) => (
                            <div key={res.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all text-xs flex flex-col justify-between h-36">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                    res.color === "emerald" 
                                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                  }`}>
                                    {res.subject}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-semibold">{res.badgeText}</span>
                                </div>
                                <h5 className="font-extrabold text-slate-900 dark:text-white mt-1.5 leading-snug line-clamp-1">{res.title}</h5>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{res.desc}</p>
                              </div>

                              <button
                                onClick={() => alert(`Simulación: Redireccionando a la herramienta didáctica interactiva externa "${res.title}" para reforzar conceptos.`)}
                                className="w-full text-center mt-2.5 py-1.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-black border border-slate-200 dark:border-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1 active:scale-98"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Abrir Simulador 3D</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}


              {/* TAB 4: PLANES Y PAGOS */}
              {activeTab === "pagos" && (
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-sm animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        Mi Estado de Cuenta y Suscripción
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Controla el vencimiento de tus horas de clases particulares, históricos de facturas y estado de tu plan activo.
                      </p>
                    </div>

                    <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-300/30 dark:border-emerald-800 text-emerald-850 dark:text-emerald-450 rounded-2xl flex items-center gap-2">
                      <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600" />
                      <span className="text-xs font-black uppercase tracking-wide">Membresía Al corriente</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Active plan card details */}
                    <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 rounded-2.5xl p-5 border border-slate-200 dark:border-slate-850 space-y-4">
                      <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider block">Plan de Estudio Contratado</span>
                      
                      <div className="space-y-1">
                        <h4 className="text-lg font-black text-slate-900 dark:text-white">Plan TortuMath Semanal</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                          Contiene <strong className="text-slate-700 dark:text-slate-350">3 horas semanales</strong> de tutorías síncronas personalizadas mediante Google Meet, con acceso completo al banco de exámenes y recursos.
                        </p>
                      </div>

                      <div className="p-3.5 bg-white dark:bg-slate-950 rounded-xl space-y-2.5 border border-slate-200 dark:border-slate-800 text-xs">
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                          <span>Monto Mensual Equivalente:</span>
                          <strong className="text-slate-900 dark:text-white font-mono shrink-0">Bs. 480 / mes</strong>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 pt-2.5">
                          <span>Siguiente renovación de carga:</span>
                          <strong className="text-slate-900 dark:text-white font-mono shrink-0">15 de Junio, 2026</strong>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-900 pt-2.5">
                          <span>Método de cobro recurrente:</span>
                          <strong className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">QR Pago Simplificado</strong>
                        </div>
                      </div>

                      <button
                        onClick={() => alert("Modal: Solicitando actualización de plan de tutorías en TortuMath. Te contactará un ejecutivo por WhatsApp.")}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Mejorar Plan Académico</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Historical invoices Table */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <span className="text-[10px] uppercase font-extrabold text-slate-450 text-slate-500 tracking-widest block font-sans">Historial de Clases y Depósitos</span>

                      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-850">
                        <table className="w-full text-xs text-left text-slate-500 dark:text-slate-400 font-medium">
                          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-850">
                            <tr>
                              <th scope="col" className="px-4 py-3">ID Transacción</th>
                              <th scope="col" className="px-4 py-3">Fecha</th>
                              <th scope="col" className="px-4 py-3">Monto</th>
                              <th scope="col" className="px-4 py-3 text-right">Comprobante</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150 dark:divide-slate-850">
                            {paymentsLogs.map((log) => (
                              <tr key={log.id} className="bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/60">
                                <td className="px-4 py-3.5 font-bold font-mono text-slate-800 dark:text-slate-200">{log.id}</td>
                                <td className="px-4 py-3.5">{log.date}</td>
                                <td className="px-4 py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{log.amount}</td>
                                <td className="px-4 py-3.5 text-right">
                                  <button
                                    onClick={() => alert(`Descargando comprobante emitido por TortuMath para la transacción ${log.id}`)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 rounded font-black hover:text-slate-950 inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>Recibo</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 5: LABORATORIO VIRTUAL */}
              {activeTab === "laboratorio" && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      🔬 Laboratorio Científico Virtual de TortuMath
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Manipula variables en tiempo real para visualizar vectores de fuerza, coeficientes de fricción cinemática y leyes físicas dinámicamente.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                    {/* Left Panel: Plano Inclinado 2D */}
                    <div className="xl:col-span-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3 gap-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-emerald-500" />
                          <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider">
                            Simulador 2D: Plano Inclinado con Fricción
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-400">Circuito de Luces:</span>
                          <button
                            onClick={() => {
                              setLedGlowing(!ledGlowing);
                              addToast(ledGlowing ? "💡 Iluminación de trabajo desactivada" : "💡 Iluminación de trabajo activada en verde", "info");
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                              ledGlowing 
                                ? "bg-emerald-500/10 text-emerald-450 border border-emerald-500/20" 
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-transparent"
                            }`}
                          >
                            {ledGlowing ? "Encendido" : "Apagado"}
                          </button>
                        </div>
                      </div>

                      {/* Interactive SVG Stage Container */}
                      <div className="relative w-full h-72 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
                        {/* LED status indicator light */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                            ledGlowing 
                              ? "bg-emerald-500 shadow-[0_0_12px_#10b981] animate-pulse" 
                              : "bg-slate-700 shadow-none"
                          }`} />
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 font-mono">
                            {ledGlowing ? "Luz Auxiliar Activa" : "Luz Auxiliar Inactiva"}
                          </span>
                        </div>

                        {/* Calculations watermark overlay */}
                        <div className="absolute top-4 right-4 bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono space-y-0.5 text-right">
                          <div>Fuerza Neta: {netForce.toFixed(2)} N</div>
                          <div>Aceleración: {acceleration.toFixed(2)} m/s²</div>
                        </div>

                        {/* Interactive physics canvas render */}
                        <svg className="w-full h-full" viewBox="0 0 320 240">
                          {/* Grid backdrop patterns */}
                          <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />

                          {/* Compute Ramp Coordinates dynamically */}
                          {(() => {
                            const rad = (rampAngle * Math.PI) / 180;
                            const x1 = 40;
                            const y1 = 180;
                            const L = 220;
                            const x2 = x1 + L * Math.cos(rad);
                            const y2 = y1 - L * Math.sin(rad);

                            // Block positioning
                            const u = blockPosition / 100;
                            const bx = x1 + u * (x2 - x1);
                            const by = y1 + u * (y2 - y1);

                            return (
                              <>
                                {/* Floor Base */}
                                <line x1="20" y1="180" x2="300" y2="180" stroke="#475569" strokeWidth="3" strokeDasharray="4 2" />

                                {/* Ramp Line */}
                                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                                
                                {/* Inner Ramp Angle arc label */}
                                <path 
                                  d={`M ${x1 + 30} 180 A 30 30 0 0 0 ${x1 + 30 * Math.cos(rad)} ${y1 - 30 * Math.sin(rad)}`} 
                                  fill="none" 
                                  stroke="#F59E0B" 
                                  strokeWidth="2" 
                                />
                                <text x={x1 + 38} y={y1 - 8} fill="#F59E0B" className="text-[10px] font-black font-mono">{rampAngle}°</text>

                                {/* Sliding Wood Block */}
                                <g transform={`translate(${bx}, ${by}) rotate(${-rampAngle})`}>
                                  {/* Block body */}
                                  <rect x="-16" y="-12" width="32" height="24" rx="4" fill="#B45309" stroke="#F59E0B" strokeWidth="2" />
                                  <text x="-10" y="4" fill="#FFFFFF" className="text-[8px] font-black font-mono">10kg</text>

                                  {/* Applied Force Vector (Orange vector arrow pointing up-right) */}
                                  <line x1="0" y1="-4" x2={10 + appliedForce * 0.3} y2="-4" stroke="#FB923C" strokeWidth="2.5" />
                                  <text x={12 + appliedForce * 0.3} y="-4" fill="#FB923C" className="text-[7px] font-bold font-mono">Fa</text>

                                  {/* Friction Force Vector (Rose arrow pointing backward) */}
                                  <line x1="-16" y1="12" x2={-16 - frictionForce * 0.5} y2="12" stroke="#F43F5E" strokeWidth="2" />
                                  <text x={-24 - frictionForce * 0.5} y={15} fill="#F43F5E" className="text-[7px] font-bold font-mono">fk</text>
                                </g>

                                {/* Weight P Vector (Straight down) */}
                                <line x1={bx} y1={by} x2={bx} y2={by + 35} stroke="#38BDF8" strokeWidth="2" />
                                <polygon points={`${bx},${by + 35} ${bx - 3},${by + 30} ${bx + 3},${by + 30}`} fill="#38BDF8" />
                                <text x={bx + 5} y={by + 32} fill="#38BDF8" className="text-[8px] font-mono font-bold">Peso (P)</text>

                                {/* Normal N Vector (Perpendicular to ramp) */}
                                {(() => {
                                  const nx = -30 * Math.sin(rad);
                                  const ny = -30 * Math.cos(rad);
                                  return (
                                    <>
                                      <line x1={bx} y1={by} x2={bx + nx} y2={by + ny} stroke="#A855F7" strokeWidth="2" />
                                      <polygon points={`${bx + nx},${by + ny} ${bx + nx + 3 * Math.cos(rad)},${by + ny + 3 * Math.sin(rad)} ${bx + nx - 3 * Math.cos(rad)},${by + ny - 3 * Math.sin(rad)}`} fill="#A855F7" />
                                      <text x={bx + nx - 12} y={by + ny - 4} fill="#A855F7" className="text-[8px] font-mono font-bold">Normal (N)</text>
                                    </>
                                  );
                                })()}
                              </>
                            );
                          })()}
                        </svg>
                      </div>

                      {/* Simulation Controls Group */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-850">
                        {/* Angle Slider */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Ángulo Rampa: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">{rampAngle}°</span>
                          </label>
                          <input 
                            type="range" 
                            min="15" 
                            max="60" 
                            value={rampAngle}
                            onChange={(e) => {
                              setRampAngle(Number(e.target.value));
                              setIsSimulating(false);
                            }}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                          />
                          <span className="text-[9px] text-slate-400 block">Cambia la inclinación de la rampa</span>
                        </div>

                        {/* Force Slider */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Fuerza Aplicada: <span className="font-mono text-amber-600 dark:text-amber-400 font-black">{appliedForce} N</span>
                          </label>
                          <input 
                            type="range" 
                            min="0" 
                            max="150" 
                            value={appliedForce}
                            onChange={(e) => {
                              setAppliedForce(Number(e.target.value));
                              setIsSimulating(false);
                            }}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                          />
                          <span className="text-[9px] text-slate-400 block">Arrastre del bloque hacia arriba</span>
                        </div>

                        {/* Friction Coefficient */}
                        <div className="space-y-1.5 text-left">
                          <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                            Fricción (μ_k): <span className="font-mono text-rose-600 dark:text-rose-400 font-black">{coeffFriction.toFixed(2)}</span>
                          </label>
                          <input 
                            type="range" 
                            min="0.05" 
                            max="0.80" 
                            step="0.05"
                            value={coeffFriction}
                            onChange={(e) => {
                              setCoeffFriction(Number(e.target.value));
                              setIsSimulating(false);
                            }}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" 
                          />
                          <span className="text-[9px] text-slate-400 block">Rugosidad de contacto del plano</span>
                        </div>
                      </div>

                      {/* Real-time Math Summary Cards */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-850">
                          <span className="block text-[10px] uppercase font-bold text-slate-450 text-slate-400">Peso Paralelo (Px)</span>
                          <span className="text-sm font-black text-slate-800 dark:text-slate-200 font-mono">{weightPx.toFixed(1)} N</span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-850">
                          <span className="block text-[10px] uppercase font-bold text-slate-450 text-slate-400">Fuerza Fricción (fk)</span>
                          <span className="text-sm font-black text-rose-600 dark:text-rose-400 font-mono">{frictionForce.toFixed(1)} N</span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-850">
                          <span className="block text-[10px] uppercase font-bold text-slate-455 text-slate-400">Fuerza Resultante</span>
                          <span className={`text-sm font-black font-mono ${netForce > 0 ? "text-emerald-500" : "text-rose-500"}`}>{netForce.toFixed(1)} N</span>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-850">
                          <span className="block text-[10px] uppercase font-bold text-slate-450 text-slate-400">Aceleración (a)</span>
                          <span className="text-sm font-black text-slate-855 dark:text-slate-100 font-mono">{acceleration.toFixed(2)} m/s²</span>
                        </div>
                      </div>

                      {/* Launch Simulation Trigger */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setIsSimulating(!isSimulating);
                            addToast(isSimulating ? "⏸️ Simulación pausada" : "🚀 Iniciando simulación física...", "info");
                          }}
                          className={`flex-1 py-3 px-4 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            isSimulating 
                              ? "bg-amber-600 hover:bg-amber-500 text-white" 
                              : "bg-emerald-600 hover:bg-emerald-500 text-white"
                          }`}
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>{isSimulating ? "Pausar Movimiento" : "Iniciar Simulación Síncrona 🏃‍♂️"}</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsSimulating(false);
                            setBlockPosition(10);
                            addToast("🔄 Plano inclinado restablecido a la base", "info");
                          }}
                          className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 font-black text-xs uppercase rounded-xl transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                        >
                          Reiniciar
                        </button>
                      </div>
                    </div>

                    {/* Right Panel: Atom 3D Model with User Hover Transformation */}
                    <div className="xl:col-span-4 space-y-6">
                      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm text-left">
                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                          <Sparkles className="w-5 h-5 text-purple-500" />
                          <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider">
                            Simulador Geométrico 3D: Átomo
                          </h4>
                        </div>
                        
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          Pasa el mouse, arrastra sobre la tarjeta o presiona los botones para girar la estructura molecular tridimensional de Bohr en perspectiva espacial real.
                        </p>

                        {/* Interactive Atom stage */}
                        <div 
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left; //x position within the element.
                            const y = e.clientY - rect.top;  //y position within the element.
                            const rotY = ((x / rect.width) - 0.5) * 80;
                            const rotX = -((y / rect.height) - 0.5) * 80;
                            setAtomRot({ x: rotX, y: rotY });
                          }}
                          onMouseLeave={() => {
                            setAtomRot({ x: 20, y: -30 });
                          }}
                          className="w-full h-56 bg-slate-955 bg-slate-950 rounded-2xl border border-slate-850 flex items-center justify-center relative overflow-hidden cursor-move select-none"
                          style={{ perspective: "1000px" }}
                        >
                          <span className="absolute bottom-2 right-2 text-[8px] font-mono text-slate-500">
                            Rotación: X: {atomRot.x.toFixed(0)}° Y: {atomRot.y.toFixed(0)}°
                          </span>

                          {/* Dynamic 3D Transform Node */}
                          <div 
                            className="w-40 h-40 relative flex items-center justify-center transition-transform duration-200 ease-out"
                            style={{ 
                              transformStyle: "preserve-3d",
                              transform: `rotateX(${atomRot.x}deg) rotateY(${atomRot.y}deg)`
                            }}
                          >
                            {/* Inner Nucleus glowing */}
                            <div className="w-8 h-8 rounded-full bg-red-600 border border-amber-400 flex items-center justify-center shadow-[0_0_20px_#ef4444] z-10" style={{ transform: "translateZ(0px)" }}>
                              <span className="text-[8px] font-black text-white font-mono">NUC</span>
                            </div>

                            {/* Orbit 1: X Axis */}
                            <div 
                              className="absolute w-36 h-36 border-2 border-emerald-500/30 rounded-full animate-spin"
                              style={{ 
                                transform: "rotateX(75deg) rotateY(15deg)",
                                animationDuration: `${orbitSpeed}s`
                              }}
                            >
                              {/* Electron */}
                              <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 absolute top-0 left-1/2 -ml-1.5 shadow-[0_0_10px_#34d399]" />
                            </div>

                            {/* Orbit 2: Y Axis */}
                            <div 
                              className="absolute w-36 h-36 border-2 border-purple-500/30 rounded-full animate-spin"
                              style={{ 
                                transform: "rotateX(25deg) rotateY(65deg)",
                                animationDuration: `${orbitSpeed * 1.5}s`
                              }}
                            >
                              {/* Electron */}
                              <div className="w-3 h-3 rounded-full bg-purple-400 absolute bottom-0 left-1/3 shadow-[0_0_10px_#c084fc]" />
                            </div>

                            {/* Orbit 3: Diagonal */}
                            <div 
                              className="absolute w-36 h-36 border-2 border-sky-500/30 rounded-full animate-spin"
                              style={{ 
                                transform: "rotateX(-35deg) rotateY(-45deg)",
                                animationDuration: `${orbitSpeed * 0.7}s`
                              }}
                            >
                              {/* Electron */}
                              <div className="w-3.5 h-3.5 rounded-full bg-sky-400 absolute left-0 top-1/2 -mt-1.5 shadow-[0_0_10px_#38bdf8]" />
                            </div>
                          </div>
                        </div>

                        {/* Orbit speed controller */}
                        <div className="space-y-1.5 text-left">
                          <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-500 uppercase">
                            <span>Velocidad de Órbita:</span>
                            <span className="font-mono text-purple-600 dark:text-purple-400 font-bold">{(10 / orbitSpeed).toFixed(1)}x</span>
                          </div>
                          <input 
                            type="range" 
                            min="1" 
                            max="8" 
                            value={9 - orbitSpeed}
                            onChange={(e) => setOrbitSpeed(9 - Number(e.target.value))}
                            className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500" 
                          />
                        </div>

                        {/* Presets of rotation controls */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "Frente", rx: 0, ry: 0 },
                            { label: "Lateral", rx: 0, ry: 90 },
                            { label: "Persp.", rx: 25, ry: -35 }
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              onClick={() => setAtomRot({ x: preset.rx, y: preset.ry })}
                              className="py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-355 rounded-lg font-black text-[10px] uppercase tracking-wider transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Educational explanation card */}
                      <div className="bg-slate-900 text-slate-300 p-5 rounded-3xl border border-slate-800 text-left text-xs space-y-2">
                        <h5 className="font-black text-white uppercase tracking-wider text-[11px] flex items-center gap-1">
                          💡 Conceptos del Laboratorio
                        </h5>
                        <p className="leading-relaxed text-[11px] text-slate-400">
                          La fricción estática se opone al inicio del movimiento. Una vez superado ese límite, actúa la fricción cinética ($f_k = \mu_k \cdot N$). 
                        </p>
                        <p className="leading-relaxed text-[11px] text-slate-400">
                          Intenta reducir la fricción a <strong className="text-white">0.05</strong> o aumenta el ángulo de la rampa a <strong className="text-white">45°</strong> y presiona el botón iniciar para ver el bloque acelerar rápidamente.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* TAB 6: CONFIGURACIÓN DE TEMAS VISUALES */}
              {activeTab === "configuracion" && (
                <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-sm animate-fade-in">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      🛠️ Configuración y Personalización del Entorno
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Elige la plantilla visual de tu preferencia para optimizar tus horas de estudio nocturno o adaptarlo a tu estilo de preferencia.
                    </p>
                  </div>

                  {/* 3 PRESETS THEMES SELECTION */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Theme 1: Tortuga */}
                    <button
                      onClick={() => {
                        setTheme("tortuga");
                        addToast("🐢 ¡Tema Tortuga (Default Esmeralda) aplicado correctamente!", "success");
                      }}
                      className={`p-5 rounded-2.5xl border text-left flex flex-col justify-between h-48 transition-all relative overflow-hidden cursor-pointer ${
                        theme === "tortuga" 
                          ? "border-emerald-500 bg-slate-900 ring-2 ring-emerald-500/30" 
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-750"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                            T
                          </div>
                          <span className={`font-black text-sm ${theme === "tortuga" ? "text-white" : "text-slate-900 dark:text-white"}`}>
                            Tema Tortuga (Default)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-450 text-slate-400 leading-normal">
                          Color base oscuro elegante con acentos en verde esmeralda ecológico. El balance por defecto para tu portal estudiantil.
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-4 h-4 rounded-full bg-[#1E293B] border border-slate-600" />
                        <span className="w-4 h-4 rounded-full bg-[#10B981]" />
                        <span className="w-4 h-4 rounded-full bg-slate-950" />
                        {theme === "tortuga" && (
                          <span className="ml-auto text-[10px] text-emerald-400 font-extrabold uppercase">Seleccionado</span>
                        )}
                      </div>
                    </button>

                    {/* Theme 2: Matrix */}
                    <button
                      onClick={() => {
                        setTheme("matrix");
                        addToast("📟 ¡Modo Matrix / Hacker activado en terminal puro!", "success");
                      }}
                      className={`p-5 rounded-2.5xl border text-left flex flex-col justify-between h-48 transition-all relative overflow-hidden cursor-pointer ${
                        theme === "matrix" 
                          ? "border-green-500 bg-black ring-2 ring-green-500/30" 
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-750"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl" />

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-black text-[10px] font-mono font-bold">
                            M
                          </div>
                          <span className={`font-black text-sm font-mono ${theme === "matrix" ? "text-green-400" : "text-slate-900 dark:text-white"}`}>
                            Tema Matrix / Hacker
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-450 text-slate-400 leading-normal font-sans">
                          Fondo negro absoluto de bajo consumo, tipografía monoespaciada de consola y acentos neón verde brillante. Estilo terminal.
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-4 h-4 rounded-full bg-black border border-green-800" />
                        <span className="w-4 h-4 rounded-full bg-green-500" />
                        <span className="w-4 h-4 rounded-full bg-neutral-900" />
                        {theme === "matrix" && (
                          <span className="ml-auto text-[10px] text-green-400 font-mono font-extrabold uppercase">Activo</span>
                        )}
                      </div>
                    </button>

                    {/* Theme 3: Cyber */}
                    <button
                      onClick={() => {
                        setTheme("cyber");
                        addToast("🎆 ¡Entorno Universitario Cyber (Eléctrico) activado!", "success");
                      }}
                      className={`p-5 rounded-2.5xl border text-left flex flex-col justify-between h-48 transition-all relative overflow-hidden cursor-pointer ${
                        theme === "cyber" 
                          ? "border-purple-500 bg-[#0F172A] ring-2 ring-purple-500/30" 
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-750"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                            C
                          </div>
                          <span className={`font-black text-sm ${theme === "cyber" ? "text-purple-400" : "text-slate-900 dark:text-white"}`}>
                            Tema Universidad / Cyber
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-450 text-slate-400 leading-normal">
                          Fondo azul espacial profundo con acentos púrpura neón vibrantes y azul eléctrico. Ideal para concentrarte en clases de ingeniería.
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-4 h-4 rounded-full bg-[#0F172A] border border-blue-600" />
                        <span className="w-4 h-4 rounded-full bg-purple-500" />
                        <span className="w-4 h-4 rounded-full bg-indigo-950" />
                        {theme === "cyber" && (
                          <span className="ml-auto text-[10px] text-purple-400 font-extrabold uppercase">Activo</span>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Environment details metrics */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2.5xl border border-slate-200/60 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400 space-y-2">
                    <h4 className="font-extrabold text-slate-800 dark:text-white uppercase tracking-wider text-[11px]">
                      Estado de Integración Local
                    </h4>
                    <p className="leading-relaxed">
                      El tema seleccionado se guarda automáticamente en el almacenamiento local del navegador (<code className="bg-slate-200 dark:bg-slate-850 px-1 py-0.5 rounded text-rose-500 font-mono">localStorage.getItem("theme")</code>) persistiendo de manera indefinida a través de recargas. El estado global sincroniza con el panel de administración.
                    </p>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      {/* RENDER ACTIVE MINI-QUIZ POPUP IF ANY RESOURCE CLICKED */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuiz(null)}
              className="absolute inset-0 bg-black"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative z-10 text-left"
            >
              <button
                onClick={() => setActiveQuiz(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black px-2 py-0.5 rounded border border-amber-500/20">
                  Desafío Autoevaluación TortuMath
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-white pt-1">{activeQuiz.title}</h4>
              </div>

              <div className="space-y-3.5 pt-1.5">
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                  {activeQuiz.question}
                </p>

                <div className="space-y-2">
                  {activeQuiz.options.map((option: string, opIdx: number) => {
                    const isSelected = selectedAnswer === opIdx;
                    return (
                      <button
                        key={opIdx}
                        onClick={() => handleSelectAnswer(opIdx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all ${
                          quizScore !== null
                            ? opIdx === activeQuiz.correct
                              ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-400"
                              : isSelected
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400"
                              : "bg-slate-50 dark:bg-slate-900/20 border-slate-200/50 dark:border-slate-850 opacity-60"
                            : isSelected
                            ? "bg-emerald-500/10 border-[#10B981] text-emerald-700 dark:text-emerald-400"
                            : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black ${
                            isSelected ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-450"
                          }`}>
                            {String.fromCharCode(65 + opIdx)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quiz Submit Actions or Results banner */}
              <div>
                {quizScore === null ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswer === null}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:pointer-events-none text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                  >
                    Enviar Respuesta
                  </button>
                ) : (
                  <div className="space-y-4 font-sans">
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      quizScore === 1
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-450"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        {quizScore === 1 ? (
                          <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <X className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                        )}
                        <strong className="text-sm font-black">
                          {quizScore === 1 ? "¡Excelente! Respuesta Correcta 🐢🏆" : "Respuesta Incorrecta"}
                        </strong>
                      </div>
                      <p className="font-semibold">{activeQuiz.explanation}</p>
                    </div>

                    <button
                      onClick={() => setActiveQuiz(null)}
                      className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Continuar Aprendiendo
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
