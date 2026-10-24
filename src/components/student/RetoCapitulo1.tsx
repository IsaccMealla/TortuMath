import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Shield,
  Cpu, 
  Key, 
  UserCheck, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Send, 
  Flame, 
  Zap, 
  BookOpen, 
  Binary, 
  RotateCcw,
  Check,
  Terminal,
  Layers,
  KeyRound,
  User,
  GraduationCap,
  Calculator,
  Compass,
  FileCode2,
  TableProperties,
  Sliders,
  HelpCircle,
  Lightbulb,
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  Target,
  ListChecks,
  Eye
} from "lucide-react";
import Logo from "../shared/Logo";

export interface RetoCapitulo1Props {
  onBack?: () => void;
  userEmail?: string;
  studentId?: string;
  studentName?: string;
  initialTheme?: "tortuga" | "matrix" | "cyber";
  onSuccessCompletion?: (points: number) => void;
}

// User model for Venn diagram representation with clean icons
interface SystemUser {
  id: string;
  name: string;
  isAdmin: boolean;
  hasValidKey: boolean;
  role: string;
  iconType: "root" | "admin" | "dev" | "qa" | "guest" | "bot";
}

const SAMPLE_USERS: SystemUser[] = [
  { id: "usr-1", name: "Carlos Arce", isAdmin: true, hasValidKey: true, role: "SuperAdmin / Root", iconType: "root" },
  { id: "usr-2", name: "Valeria Ríos", isAdmin: true, hasValidKey: false, role: "Admin Auxiliar", iconType: "admin" },
  { id: "usr-3", name: "Pedro Mamani", isAdmin: false, hasValidKey: true, role: "Desarrollador Backend", iconType: "dev" },
  { id: "usr-4", name: "Lucía Morales", isAdmin: false, hasValidKey: true, role: "Analista de Seguridad", iconType: "qa" },
  { id: "usr-5", name: "Visitante Anónimo", isAdmin: false, hasValidKey: false, role: "Tráfico Externo", iconType: "guest" },
  { id: "usr-6", name: "Servicio Automatizado", isAdmin: false, hasValidKey: false, role: "Bot Crawler", iconType: "bot" },
];

export default function RetoCapitulo1({
  onBack,
  userEmail = "sofia.ramos@gmail.com",
  studentId = "STU-001",
  studentName = "Sofía Ramos Ortiz",
  initialTheme = "tortuga",
  onSuccessCompletion
}: RetoCapitulo1Props) {
  // 1. Theme Configuration
  const [theme, setTheme] = useState<"tortuga" | "matrix" | "cyber">(() => {
    return (localStorage.getItem("tortumath_student_theme") as any) || initialTheme;
  });

  // Guided Tour Mode State (1: Risk, 2: Logic/DeMorgan, 3: Venn, 4: Submit)
  const [guidedTourStep, setGuidedTourStep] = useState<number | null>(1);

  // Refs for smooth auto-scroll to highlighted section
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (guidedTourStep === 1 && section1Ref.current) {
      section1Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (guidedTourStep === 2 && section2Ref.current) {
      section2Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (guidedTourStep === 3 && section3Ref.current) {
      section3Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (guidedTourStep === 4 && section4Ref.current) {
      section4Ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [guidedTourStep]);

  const themeStyles = {
    tortuga: {
      bgMain: "bg-[#0B1512] text-[#F1F5F9]",
      bgCard: "bg-[#0d1e19] border border-emerald-500/20 shadow-[0_4px_24px_rgba(16,185,129,0.05)]",
      bgCardSubtle: "bg-[#071310] border border-emerald-500/15",
      accentText: "text-emerald-400",
      accentBg: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      accentBgLight: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      badgeClass: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
      glowRing: "focus:ring-emerald-500/40",
      accentBorder: "border-emerald-500/30",
      buttonActive: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]",
      sliderAccent: "accent-emerald-500",
      titleGradient: "from-emerald-300 via-emerald-400 to-teal-500",
      spotlightBorder: "ring-4 ring-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.45)]",
    },
    matrix: {
      bgMain: "bg-black text-[#00FF66] font-mono",
      bgCard: "bg-black border border-[#00FF66]/40 shadow-[0_0_25px_rgba(0,255,102,0.15)]",
      bgCardSubtle: "bg-neutral-950 border border-[#00FF66]/25",
      accentText: "text-[#00FF66]",
      accentBg: "bg-[#00FF66] hover:bg-[#33FF88] text-black font-extrabold shadow-[0_0_20px_rgba(0,255,102,0.4)]",
      accentBgLight: "bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/30",
      badgeClass: "bg-black text-[#00FF66] border border-[#00FF66]/60 font-mono",
      glowRing: "focus:ring-[#00FF66]/50",
      accentBorder: "border-[#00FF66]/40",
      buttonActive: "bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/80 shadow-[inset_0_0_15px_rgba(0,255,102,0.3)]",
      sliderAccent: "accent-[#00FF66]",
      titleGradient: "from-[#00FF66] via-green-300 to-[#33FF88]",
      spotlightBorder: "ring-4 ring-[#00FF66] shadow-[0_0_35px_rgba(0,255,102,0.5)]",
    },
    cyber: {
      bgMain: "bg-[#030612] text-[#E0E7FF]",
      bgCard: "bg-[#080D26]/90 backdrop-blur-md border border-[#00D2FF]/30 shadow-[0_0_30px_rgba(0,210,255,0.12)]",
      bgCardSubtle: "bg-[#05081c] border border-[#00D2FF]/20",
      accentText: "text-[#00D2FF]",
      accentBg: "bg-[#00D2FF] hover:bg-[#33E2FF] text-[#030612] font-black shadow-[0_0_25px_rgba(0,210,255,0.5)]",
      accentBgLight: "bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/30",
      badgeClass: "bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/40",
      glowRing: "focus:ring-[#00D2FF]/50",
      accentBorder: "border-[#00D2FF]/35",
      buttonActive: "bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/60 shadow-[inset_0_0_15px_rgba(0,210,255,0.3)]",
      sliderAccent: "accent-[#00D2FF]",
      titleGradient: "from-[#00D2FF] via-[#9D4EDD] to-[#BD00FF]",
      spotlightBorder: "ring-4 ring-[#00D2FF] shadow-[0_0_35px_rgba(0,210,255,0.55)]",
    }
  }[theme];

  // 2. Simulator State (Risk and Logic)
  const [cpuUsage, setCpuUsage] = useState<number>(45); // 0 to 100%
  const [failedAttempts, setFailedAttempts] = useState<number>(3); // 0 to 10
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [hasValidKey, setHasValidKey] = useState<boolean>(true);

  // Multivariable Risk Function: R(c, i) = 0.5 * c + 10 * i
  const riskScore = useMemo(() => {
    return Number((0.5 * cpuUsage + 10 * failedAttempts).toFixed(1));
  }, [cpuUsage, failedAttempts]);

  const isSafeModeActive = riskScore > 50;

  // Formal Logic: De Morgan's Law Verification
  const blockedNormal = !(isAdmin || hasValidKey);
  const blockedDeMorgan = !isAdmin && !hasValidKey;

  // Server Access Status (Clean indicators, no emojis)
  const serverStatus = useMemo(() => {
    if (isSafeModeActive) {
      return {
        level: "danger",
        title: "Servidor Bloqueado por Riesgo Elevado",
        color: "text-red-400 border-red-500/40 bg-red-500/10",
        badgeText: "MODO SEGURO ACTIVO (R > 50)",
        dotColor: "bg-red-400",
        description: "El sistema ha activado el aislamiento preventivo debido a sobrecarga computacional o posible ataque de fuerza bruta."
      };
    }
    if (blockedNormal) {
      return {
        level: "warning",
        title: "Acceso Bloqueado por Lógica",
        color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
        badgeText: "ACCESO DENEGADO (¬A ∧ ¬B)",
        dotColor: "bg-amber-400",
        description: "El usuario no cuenta con privilegios administrativos ni posee una clave criptográfica válida."
      };
    }
    return {
      level: "success",
      title: "Acceso Concedido",
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      badgeText: "ACCESO AUTORIZADO (A ∨ B)",
      dotColor: "bg-emerald-400",
      description: "El nivel de riesgo operacional es seguro y las credenciales superaron la regla de acceso lógico."
    };
  }, [isSafeModeActive, blockedNormal]);

  // 3. Venn Diagram Set Visualizer State
  type VennOperation = "union" | "intersection" | "diffA" | "complement";
  const [selectedOperation, setSelectedOperation] = useState<VennOperation>("union");

  // Filtering users based on set operation
  const filteredVennUsers = useMemo(() => {
    return SAMPLE_USERS.filter((user) => {
      const A = user.isAdmin;
      const B = user.hasValidKey;
      switch (selectedOperation) {
        case "union":
          return A || B;
        case "intersection":
          return A && B;
        case "diffA":
          return A && !B;
        case "complement":
          return !(A || B);
        default:
          return true;
      }
    });
  }, [selectedOperation]);

  // Helper for rendering user role icons cleanly
  const renderUserIcon = (iconType: string) => {
    switch (iconType) {
      case "root":
        return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case "admin":
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case "dev":
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case "qa":
        return <KeyRound className="w-4 h-4 text-cyan-400" />;
      case "guest":
        return <User className="w-4 h-4 text-slate-400" />;
      case "bot":
        return <Cpu className="w-4 h-4 text-slate-400" />;
      default:
        return <User className="w-4 h-4 text-slate-400" />;
    }
  };

  // 4. Measurable Challenge Objectives (Checklist)
  // Mission 1: Calibrate server to safe risk zone: R(c, i) <= 30
  const mission1Completed = riskScore <= 30;

  // Mission 2: Prove complete logic block condition: !isAdmin && !hasValidKey
  const mission2Completed = !isAdmin && !hasValidKey;

  // Mission 3: Execute Venn Intersection to find maximum-trust root admins
  const mission3Completed = selectedOperation === "intersection";

  const completedMissionsCount = (mission1Completed ? 1 : 0) + (mission2Completed ? 1 : 0) + (mission3Completed ? 1 : 0);
  const allMissionsCompleted = completedMissionsCount === 3;

  // 5. Submission & Backend State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Play triumph chord with Web Audio API (cross-platform)
  const playAchievementSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.09 + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + idx * 0.09);
        osc.stop(ctx.currentTime + idx * 0.09 + 0.5);
      });
    } catch {
      // Audio fallback
    }
  };

  const showToast = (text: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  };

  const handleSubmitSolution = async () => {
    if (!allMissionsCompleted) {
      showToast("Completa primero las 3 misiones del reto para poder enviar tu solución.", "error");
      return;
    }

    setIsSubmitting(true);
    const quizPayload = {
      id: `QR-CAP1-${Date.now()}`,
      studentId: studentId,
      quizTitle: "Reto Libro Cap. 1: Fundamentos Matemáticos (Lógica & Conjuntos)",
      score: 100,
      maxScore: 100,
      date: new Date().toISOString().split("T")[0],
      status: "aprobado"
    };

    try {
      await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizPayload)
      }).catch(() => null);

      playAchievementSound();
      setIsCompleted(true);
      showToast("¡Reto del Capítulo 1 verificado y completado! +50 TortuPuntos otorgados y racha de estudio incrementada.", "success");

      if (onSuccessCompletion) {
        onSuccessCompletion(50);
      }

      const existingPoints = parseInt(localStorage.getItem("tortumath_tortupuntos") || "150", 10);
      localStorage.setItem("tortumath_tortupuntos", (existingPoints + 50).toString());

      const currentStreak = parseInt(localStorage.getItem("tortumath_streak") || "4", 10);
      localStorage.setItem("tortumath_streak", (currentStreak + 1).toString());
    } catch {
      showToast("Reto verificado localmente. Puntos acreditados con éxito.", "success");
      playAchievementSound();
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles.bgMain} transition-colors duration-300 font-sans pb-28`}>
      {/* Toast Notification Float */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 right-5 z-50 max-w-md p-4 rounded-xl shadow-2xl backdrop-blur-xl border border-emerald-500/40 bg-neutral-900/95 text-white flex items-start gap-3"
          >
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-emerald-300">Notificación del Reto</h4>
              <p className="text-xs text-slate-300 mt-0.5">{toastMessage.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar with Theme Switcher and Guided Tour Trigger */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 backdrop-blur-md bg-neutral-950/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Volver"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Logo size={36} />
          <div className="hidden sm:block">
            <h1 className="font-black text-lg tracking-tight text-white leading-none">
              Tortu<span className={themeStyles.accentText}>Math</span>
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              Plataforma Interactiva
            </span>
          </div>
        </div>

        {/* Central Badges & Guided Mode Button */}
        <div className="flex items-center gap-2.5">
          <span className={`hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${themeStyles.badgeClass} shadow-sm`}>
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Reto del Libro — Capítulo 1</span>
          </span>

          <button
            onClick={() => setGuidedTourStep(prev => prev === null ? 1 : null)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer ${
              guidedTourStep !== null
                ? "bg-amber-400 text-black border border-amber-300 ring-2 ring-amber-400/50"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
            }`}
            title="Activar o desactivar el resaltado guiado paso a paso"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{guidedTourStep !== null ? "Modo Guiado Activo" : "Iniciar Modo Guiado"}</span>
          </button>
        </div>

        {/* Theme Picker with Logos/Icons */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              setTheme("tortuga");
              localStorage.setItem("tortumath_student_theme", "tortuga");
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              theme === "tortuga" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Tortuga</span>
          </button>
          <button
            onClick={() => {
              setTheme("matrix");
              localStorage.setItem("tortumath_student_theme", "matrix");
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-mono ${
              theme === "matrix" ? "bg-[#00FF66] text-black shadow-sm font-extrabold" : "text-slate-400 hover:text-[#00FF66]"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Matrix</span>
          </button>
          <button
            onClick={() => {
              setTheme("cyber");
              localStorage.setItem("tortumath_student_theme", "cyber");
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              theme === "cyber" ? "bg-[#00D2FF] text-[#030612] shadow-sm font-extrabold" : "text-slate-400 hover:text-[#00D2FF]"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cyber</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        
        {/* Hero Banner for Chapter 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} relative overflow-hidden`}
        >
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${themeStyles.badgeClass}`}>
                <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                Ingeniería de Sistemas • Laboratorio de Campo
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Recompensa: +50 TortuPuntos
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Capítulo 1: <span className={`bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>Fundamentos Matemáticos</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Laboratorio interactivo sincronizado con el libro impreso. Sigue las instrucciones directas en cada recuadro 
              para completar las <strong>3 misiones matemáticas</strong> y validar la solución de tu reto.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Estudiante: <strong>{studentName}</strong> ({studentId})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <Binary className="w-4 h-4 text-cyan-400" />
                <span>Lógica Proposicional & Álgebra de Boole</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Binary className="w-80 h-80 text-white" />
          </div>
        </motion.div>

        {/* Missions Checklist Panel (Consola de Progreso del Estudiante) */}
        <section className={`p-5 sm:p-6 rounded-2xl ${themeStyles.bgCard} border border-slate-700/80 space-y-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Consola de Misiones del Reto</h3>
                <p className="text-xs text-slate-400">Completa las siguientes 3 tareas en vivo para desbloquear el envío:</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-300">
                Progreso: <strong className={allMissionsCompleted ? "text-emerald-400 text-sm" : "text-amber-400 text-sm"}>{completedMissionsCount} / 3 Misiones</strong>
              </span>
              <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${allMissionsCompleted ? "bg-emerald-400" : "bg-amber-400"}`} 
                  style={{ width: `${(completedMissionsCount / 3) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Mission 1 Card */}
            <div 
              onClick={() => setGuidedTourStep(1)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                mission1Completed 
                  ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200" 
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Misión 1: Zona Segura
                </span>
                {mission1Completed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Cumplida
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px]">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Ajusta los sliders para lograr un riesgo $R(c, i) \le 30$ pts.
              </p>
            </div>

            {/* Mission 2 Card */}
            <div 
              onClick={() => setGuidedTourStep(2)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                mission2Completed 
                  ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200" 
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-amber-400" /> Misión 2: Bloqueo De Morgan
                </span>
                {mission2Completed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Cumplida
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px]">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Desmarca ambos switches para verificar el caso $(\neg A \land \neg B)$.
              </p>
            </div>

            {/* Mission 3 Card */}
            <div 
              onClick={() => setGuidedTourStep(3)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                mission3Completed 
                  ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200" 
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-teal-400" /> Misión 3: Intersección Venn
                </span>
                {mission3Completed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Cumplida
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px]">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Selecciona la operación "Intersección ($A \cap B$)" en el diagrama.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 1: Sliders & Multivariable Risk Simulator */}
        <section 
          ref={section1Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 1 ? themeStyles.spotlightBorder : ""
          } space-y-6`}
        >
          {/* Prominent Instruction Box for Section 1 */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border-2 border-cyan-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-400" />
                Instrucciones Claras para este Recuadro (Misión 1):
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                mission1Completed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}>
                {mission1Completed ? "Objetivo Cumplido" : "Objetivo Pendiente"}
              </span>
            </div>

            <ol className="list-decimal list-inside text-xs text-slate-200 space-y-1">
              <li>Mueve el deslizador de <strong>Carga de Procesador ($c$)</strong> por debajo de 40%.</li>
              <li>Ajusta los <strong>Intentos Fallidos ($i$)</strong> a 0 o 1 intento.</li>
              <li>Comprueba que el medidor de riesgo calcule un valor <strong>$R(c, i) \le 30$ pts</strong> (Zona Segura verde).</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sliders className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 1: Panel de Control de Carga y Función de Riesgo
              </h3>
              <p className="text-xs text-slate-400">
                La función matemática $R(c, i) = 0.5c + 10i$ evalúa la estabilidad operacional del servidor en tiempo real.
              </p>
            </div>
            
            <button
              onClick={() => {
                setCpuUsage(20);
                setFailedAttempts(1);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30 self-start sm:self-auto"
            >
              <Check className="w-3.5 h-3.5" /> Calibrar en Zona Segura Automáticamente
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Slider 1: CPU Usage */}
              <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" /> Carga de Procesador ($c$):
                  </span>
                  <span className="font-mono font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    {cpuUsage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={cpuUsage}
                  onChange={(e) => setCpuUsage(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0% (Carga Mínima)</span>
                  <span>50% (Régimen Normal)</span>
                  <span>100% (Saturación)</span>
                </div>
              </div>

              {/* Slider 2: Failed Login Attempts */}
              <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Intentos Fallidos ($i$):
                  </span>
                  <span className="font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {failedAttempts} intentos
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={failedAttempts * 10}
                  onChange={(e) => setFailedAttempts(Math.round(Number(e.target.value) / 10))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 (Limpio)</span>
                  <span>5 (Sospechoso)</span>
                  <span>10 (Ataque de Fuerza Bruta)</span>
                </div>
              </div>

              {/* Function Math Formula Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1 tracking-wider">
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Cálculo Multivariable Activo:
                </span>
                <p className="text-white font-bold text-sm">
                  R(c, i) = 0.5 \cdot c + 10 \cdot i = 0.5({cpuUsage}) + 10({failedAttempts}) = <span className="text-emerald-400 text-base">{riskScore} pts</span>
                </p>
                <p className="text-[11px] text-slate-400 font-sans">
                  Regla de Seguridad: Si el riesgo supera los <strong>50 pts</strong>, el servidor bloquea todo acceso y entra en <strong>Modo Seguro</strong>.
                </p>
              </div>
            </div>

            {/* Gauge & Operational Status Column */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              {/* Server Status Header Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Estado Operativo Actual
                  </h4>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${serverStatus.color}`}>
                    <span className={`w-2 h-2 rounded-full ${serverStatus.dotColor} animate-pulse`}></span>
                    {serverStatus.badgeText}
                  </span>
                </div>

                <div className={`p-4 rounded-xl border ${serverStatus.color} transition-all`}>
                  <div className="flex items-start gap-3">
                    {serverStatus.level === "danger" ? (
                      <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0 animate-pulse" />
                    ) : serverStatus.level === "warning" ? (
                      <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    )}
                    <div>
                      <h5 className="font-extrabold text-white text-base">{serverStatus.title}</h5>
                      <p className="text-xs text-slate-300 mt-1">{serverStatus.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Level Gauge Bar */}
              <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Medidor de Nivel de Riesgo:</span>
                  <span className={`font-mono font-black text-sm ${riskScore > 50 ? "text-red-400" : riskScore > 30 ? "text-amber-400" : "text-emerald-400"}`}>
                    {riskScore} / 150 pts
                  </span>
                </div>

                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/80 relative">
                  {/* Safe Zone line at 50 points */}
                  <div 
                    className="absolute top-0 bottom-0 border-r-2 border-red-500 z-10" 
                    style={{ left: `${Math.min(100, (50 / 150) * 100)}%` }}
                    title="Umbral de Alerta Crítica (50 pts)"
                  />
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      riskScore > 50 
                        ? "bg-gradient-to-r from-amber-500 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
                        : "bg-gradient-to-r from-emerald-500 to-teal-400"
                    }`}
                    style={{ width: `${Math.min(100, (riskScore / 150) * 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span className="text-emerald-400 font-bold">0 - 30 (Zona Segura: Misión 1)</span>
                  <span className="text-amber-400 font-bold">30 - 50 (Alerta)</span>
                  <span className="text-red-400 font-bold">&gt; 50 (Modo Seguro)</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: Logic Evaluator & De Morgan's Law */}
        <section 
          ref={section2Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 2 ? themeStyles.spotlightBorder : ""
          } space-y-6`}
        >
          {/* Prominent Instruction Box for Section 2 */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900 border-2 border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                Instrucciones Claras para este Recuadro (Misión 2):
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                mission2Completed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}>
                {mission2Completed ? "Objetivo Cumplido" : "Objetivo Pendiente"}
              </span>
            </div>

            <ol className="list-decimal list-inside text-xs text-slate-200 space-y-1">
              <li>Desmarca la casilla <strong>Es Administrador ($A$)</strong>.</li>
              <li>Desmarca la casilla <strong>Clave Válida ($B$)</strong>.</li>
              <li>Comprueba cómo ambas expresiones lógicas entregan <strong>VERDADERO (Bloquea)</strong> y la tabla de verdad resalta la fila $(0, 0)$.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Binary className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 2: Evaluador de Lógica Formal y Leyes de De Morgan
              </h3>
              <p className="text-xs text-slate-400">
                Demostración empírica de la equivalencia fundamental del álgebra booleana: $\neg(A \lor B) \equiv (\neg A \land \neg B)$.
              </p>
            </div>
            
            <button
              onClick={() => {
                setIsAdmin(false);
                setHasValidKey(false);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer border border-amber-500/30 self-start sm:self-auto"
            >
              <Check className="w-3.5 h-3.5" /> Simular Caso Bloqueo (0, 0)
            </button>
          </div>

          <div className="space-y-6">
            {/* Switches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className={`flex items-center justify-between p-4 rounded-xl ${themeStyles.bgCardSubtle} cursor-pointer hover:border-slate-500 transition-all border border-slate-800`}>
                <div className="flex items-center gap-3">
                  <ShieldCheck className={`w-5 h-5 ${isAdmin ? "text-emerald-400" : "text-slate-500"}`} />
                  <div>
                    <span className="text-sm font-bold text-white block">Es Administrador</span>
                    <span className="text-xs text-slate-400 font-mono">Proposición $A$ ({isAdmin ? "Verdadero = 1" : "Falso = 0"})</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="w-5 h-5 accent-emerald-500 cursor-pointer"
                />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl ${themeStyles.bgCardSubtle} cursor-pointer hover:border-slate-500 transition-all border border-slate-800`}>
                <div className="flex items-center gap-3">
                  <Key className={`w-5 h-5 ${hasValidKey ? "text-cyan-400" : "text-slate-500"}`} />
                  <div>
                    <span className="text-sm font-bold text-white block">Posee Clave Válida</span>
                    <span className="text-xs text-slate-400 font-mono">Proposición $B$ ({hasValidKey ? "Verdadero = 1" : "Falso = 0"})</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={hasValidKey}
                  onChange={(e) => setHasValidKey(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
              </label>
            </div>

            {/* Expressions Evaluator Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-1.5">
                <span className="text-xs text-slate-400 block font-sans font-bold">1. Forma Normal (Negación de Disyunción):</span>
                <p className="text-white font-bold text-sm">¬(A ∨ B)</p>
                <p className="text-xs text-slate-300">
                  !({isAdmin ? "1" : "0"} || {hasValidKey ? "1" : "0"}) = <strong className={blockedNormal ? "text-amber-400 font-black" : "text-emerald-400 font-black"}>{blockedNormal ? "VERDADERO (1: Bloquea)" : "FALSO (0: Autoriza)"}</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-1.5">
                <span className="text-xs text-slate-400 block font-sans font-bold">2. Forma De Morgan (Conjunción de Negaciones):</span>
                <p className="text-white font-bold text-sm">(¬A ∧ ¬B)</p>
                <p className="text-xs text-slate-300">
                  (!{isAdmin ? "1" : "0"} && !{hasValidKey ? "1" : "0"}) = <strong className={blockedDeMorgan ? "text-amber-400 font-black" : "text-emerald-400 font-black"}>{blockedDeMorgan ? "VERDADERO (1: Bloquea)" : "FALSO (0: Autoriza)"}</strong>
                </p>
              </div>
            </div>

            {/* Dynamic Truth Table */}
            <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-slate-800">
              <span className="text-xs text-slate-300 uppercase font-bold tracking-wider flex items-center gap-1.5">
                <TableProperties className="w-4 h-4 text-emerald-400" /> Tabla de Verdad Dinámica (Caso Actual Resaltado):
              </span>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-center font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2 px-3">A</th>
                      <th className="py-2 px-3">B</th>
                      <th className="py-2 px-3">A ∨ B</th>
                      <th className="py-2 px-3 font-bold text-white">¬(A ∨ B)</th>
                      <th className="py-2 px-3 font-bold text-white">(¬A ∧ ¬B)</th>
                      <th className="py-2 px-3 font-sans">Condición de Acceso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { a: false, b: false, label: "Sin admin ni clave (Bloqueo Total: Misión 2)" },
                      { a: false, b: true, label: "Usuario regular con clave (Autorizado)" },
                      { a: true, b: false, label: "Admin sin clave activa (Autorizado)" },
                      { a: true, b: true, label: "Admin con clave completa (Autorizado)" },
                    ].map((row, idx) => {
                      const aOrB = row.a || row.b;
                      const notAorB = !aOrB;
                      const notAandNotB = (!row.a) && (!row.b);
                      const isCurrent = (row.a === isAdmin) && (row.b === hasValidKey);

                      return (
                        <tr
                          key={idx}
                          className={`border-b border-slate-900 transition-colors ${
                            isCurrent 
                              ? "bg-emerald-500/20 text-emerald-300 font-bold border-emerald-500/40" 
                              : "text-slate-400"
                          }`}
                        >
                          <td className="py-2 px-3">{row.a ? "1" : "0"}</td>
                          <td className="py-2 px-3">{row.b ? "1" : "0"}</td>
                          <td className="py-2 px-3">{aOrB ? "1" : "0"}</td>
                          <td className="py-2 px-3 font-black">{notAorB ? "1" : "0"}</td>
                          <td className="py-2 px-3 font-black">{notAandNotB ? "1" : "0"}</td>
                          <td className="py-2 px-3 font-sans text-[11px]">
                            {isCurrent ? `← Caso Actual: ${row.label}` : row.label}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Set Theory & Venn Diagram */}
        <section 
          ref={section3Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 3 ? themeStyles.spotlightBorder : ""
          } space-y-6`}
        >
          {/* Prominent Instruction Box for Section 3 */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 to-slate-900 border-2 border-teal-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-teal-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-400" />
                Instrucciones Claras para este Recuadro (Misión 3):
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                mission3Completed ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
              }`}>
                {mission3Completed ? "Objetivo Cumplido" : "Objetivo Pendiente"}
              </span>
            </div>

            <ol className="list-decimal list-inside text-xs text-slate-200 space-y-1">
              <li>Haz clic en el botón <strong>Intersección ($A \cap B$)</strong> en el selector de operaciones.</li>
              <li>Observa cómo en el diagrama de Venn solo se ilumina la región central de superposición.</li>
              <li>Verifica que en la tabla de elementos filtrados únicamente figure <strong>Carlos Arce (Root Admin)</strong>.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Users className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 3: Visualizador Interactivo de Teoría de Conjuntos
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Representación del Conjunto Universal $U$ (Usuarios del Sistema), $A$ (Administradores) y $B$ (Usuarios con Clave Válida).
              </p>
            </div>

            {/* Operation Selector Buttons with Icons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedOperation("union")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedOperation === "union" ? themeStyles.buttonActive : "bg-white/5 hover:bg-white/10 text-slate-300"
                }`}
              >
                Unión ($A \cup B$)
              </button>
              <button
                onClick={() => setSelectedOperation("intersection")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedOperation === "intersection" ? themeStyles.buttonActive : "bg-white/5 hover:bg-white/10 text-slate-300"
                }`}
              >
                Intersección ($A \cap B$)
              </button>
              <button
                onClick={() => setSelectedOperation("diffA")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedOperation === "diffA" ? themeStyles.buttonActive : "bg-white/5 hover:bg-white/10 text-slate-300"
                }`}
              >
                Diferencia ($A \setminus B$)
              </button>
              <button
                onClick={() => setSelectedOperation("complement")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedOperation === "complement" ? themeStyles.buttonActive : "bg-white/5 hover:bg-white/10 text-slate-300"
                }`}
              >
                Complemento ($(A \cup B)^c$)
              </button>
            </div>
          </div>

          {/* Venn Diagram Visualizer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* SVG Interactive Venn Canvas with Vector Glyphs */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-black/50 rounded-2xl border border-slate-800">
              <svg
                viewBox="0 0 540 320"
                className="w-full max-w-[500px] h-auto select-none"
              >
                <defs>
                  {/* Clip Path for Intersection A and B */}
                  <clipPath id="clipA">
                    <circle cx="210" cy="160" r="110" />
                  </clipPath>

                  {/* Gradient for Active Regions */}
                  <linearGradient id="vennGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.45" />
                  </linearGradient>
                </defs>

                {/* Universal Set Rectangle U */}
                <rect
                  x="15"
                  y="15"
                  width="510"
                  height="290"
                  rx="16"
                  className={`fill-neutral-950/80 stroke-slate-800 ${selectedOperation === "complement" ? "stroke-cyan-400 stroke-2" : "stroke-1"}`}
                />
                <text x="35" y="42" fill="#94A3B8" fontSize="13" fontWeight="bold" fontFamily="sans-serif">
                  U (Universo: Infraestructura Completa de Usuarios)
                </text>

                {/* Complement Highlight when selected */}
                {selectedOperation === "complement" && (
                  <rect
                    x="15"
                    y="15"
                    width="510"
                    height="290"
                    rx="16"
                    fill="rgba(6, 182, 212, 0.12)"
                  />
                )}

                {/* Set A Base Circle (Administradores) */}
                <circle
                  cx="210"
                  cy="160"
                  r="110"
                  className={`transition-all duration-300 ${
                    selectedOperation === "union" || selectedOperation === "diffA"
                      ? "fill-emerald-500/25 stroke-emerald-400 stroke-[2.5]"
                      : "fill-emerald-950/20 stroke-emerald-600/60 stroke-1"
                  }`}
                />

                {/* Set B Base Circle (Clave Válida) */}
                <circle
                  cx="330"
                  cy="160"
                  r="110"
                  className={`transition-all duration-300 ${
                    selectedOperation === "union"
                      ? "fill-cyan-500/25 stroke-cyan-400 stroke-[2.5]"
                      : "fill-cyan-950/20 stroke-cyan-600/60 stroke-1"
                  }`}
                />

                {/* Special Intersection Overlay */}
                <circle
                  cx="330"
                  cy="160"
                  r="110"
                  clipPath="url(#clipA)"
                  className={`transition-all duration-300 ${
                    selectedOperation === "intersection"
                      ? "fill-emerald-400/50 stroke-emerald-300 stroke-2"
                      : selectedOperation === "diffA"
                      ? "fill-neutral-950 stroke-transparent"
                      : selectedOperation === "union"
                      ? "fill-teal-400/35"
                      : "fill-transparent"
                  }`}
                />

                {/* Set Labels */}
                <text x="145" y="85" fill="#34D399" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                  Conjunto A: Admins
                </text>
                <text x="310" y="85" fill="#38BDF8" fontSize="13" fontWeight="900" fontFamily="sans-serif">
                  Conjunto B: Con Clave
                </text>

                {/* Vector User Nodes */}
                {/* 1. Only A (Valeria Ríos - Admin sin clave) */}
                <g className="cursor-pointer">
                  <circle cx="170" cy="155" r="16" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M165 149 L170 146 L175 149 L175 156 Q170 162 165 156 Z" fill="none" stroke="#34D399" strokeWidth="1.5" />
                  <text x="170" y="185" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontWeight="bold">Valeria (Admin)</text>
                </g>

                {/* 2. Intersection A ∩ B (Carlos Arce - Root Admin con clave) */}
                <g className="cursor-pointer">
                  <circle cx="270" cy="155" r="18" fill="#083344" stroke="#22D3EE" strokeWidth="2" />
                  <path d="M264 148 L270 145 L276 148 L276 156 Q270 162 264 156 Z" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="270" cy="152" r="2" fill="#38BDF8" />
                  <text x="270" y="187" fill="#67E8F9" fontSize="9" textAnchor="middle" fontWeight="bold">Carlos (Root)</text>
                </g>

                {/* 3. Only B (Pedro Mamani & Lucía Morales) */}
                <g className="cursor-pointer">
                  <circle cx="360" cy="135" r="15" fill="#164E63" stroke="#06B6D4" strokeWidth="1.5" />
                  <rect x="354" y="130" width="12" height="9" rx="2" fill="none" stroke="#67E8F9" strokeWidth="1.2" />
                  <line x1="357" y1="133" x2="359" y2="135" stroke="#67E8F9" strokeWidth="1.2" />
                  <text x="360" y="160" fill="#BAE6FD" fontSize="9" textAnchor="middle" fontWeight="bold">Pedro (Dev)</text>
                </g>

                <g className="cursor-pointer">
                  <circle cx="375" cy="190" r="15" fill="#164E63" stroke="#06B6D4" strokeWidth="1.5" />
                  <circle cx="372" cy="188" r="3" fill="none" stroke="#67E8F9" strokeWidth="1.2" />
                  <line x1="375" y1="188" x2="380" y2="188" stroke="#67E8F9" strokeWidth="1.2" />
                  <line x1="378" y1="188" x2="378" y2="191" stroke="#67E8F9" strokeWidth="1.2" />
                  <text x="375" y="215" fill="#BAE6FD" fontSize="9" textAnchor="middle" fontWeight="bold">Lucía (QA)</text>
                </g>

                {/* 4. Outside A and B: U \ (A ∪ B) (Invitado y Bot Crawler) */}
                <g className="cursor-pointer">
                  <circle cx="65" cy="250" r="15" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                  <circle cx="65" cy="246" r="3" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
                  <path d="M60 255 C60 252 70 252 70 255" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
                  <text x="65" y="275" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="bold">Invitado</text>
                </g>

                <g className="cursor-pointer">
                  <circle cx="470" cy="250" r="15" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                  <rect x="465" y="244" width="10" height="9" rx="2" fill="none" stroke="#94A3B8" strokeWidth="1.2" />
                  <circle cx="468" cy="247" r="1" fill="#94A3B8" />
                  <circle cx="472" cy="247" r="1" fill="#94A3B8" />
                  <text x="470" y="275" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="bold">Bot</text>
                </g>
              </svg>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Conjunto $A$: Admins ({SAMPLE_USERS.filter(u => u.isAdmin).length})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span> Conjunto $B$: Con Clave ({SAMPLE_USERS.filter(u => u.hasValidKey).length})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block"></span> Universo $U$ ({SAMPLE_USERS.length})
                </span>
              </div>
            </div>

            {/* Right Side: Set Operation Formula & Filtered User List */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Notación Formal del Conjunto Resultante:
                </span>
                
                {selectedOperation === "union" && (
                  <div>
                    <h5 className="font-mono text-sm font-bold text-emerald-400">{"A ∪ B = { x ∈ U | x ∈ A ∨ x ∈ B }"}</h5>
                    <p className="text-xs text-slate-300 mt-1">
                      Usuarios con al menos un factor de autorización: son administradores o poseen clave.
                    </p>
                  </div>
                )}

                {selectedOperation === "intersection" && (
                  <div>
                    <h5 className="font-mono text-sm font-bold text-cyan-400">{"A ∩ B = { x ∈ U | x ∈ A ∧ x ∈ B }"}</h5>
                    <p className="text-xs text-slate-300 mt-1">
                      Usuarios de máxima confianza: administradores que cuentan con credenciales criptográficas validadas.
                    </p>
                  </div>
                )}

                {selectedOperation === "diffA" && (
                  <div>
                    <h5 className="font-mono text-sm font-bold text-amber-400">{"A ∖ B = { x ∈ U | x ∈ A ∧ x ∉ B }"}</h5>
                    <p className="text-xs text-slate-300 mt-1">
                      Administradores sin clave activa (en espera de renovación o en contingencia).
                    </p>
                  </div>
                )}

                {selectedOperation === "complement" && (
                  <div>
                    <h5 className="font-mono text-sm font-bold text-red-400">{"(A ∪ B)ᶜ = { x ∈ U | ¬(x ∈ A ∨ x ∈ B) }"}</h5>
                    <p className="text-xs text-slate-300 mt-1">
                      Visitantes anónimos y tráfico no autorizado en el sistema (conectado con De Morgan).
                    </p>
                  </div>
                )}
              </div>

              {/* Elements Table / Badges with Vector Icons */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Elementos Filtrados ({filteredVennUsers.length}):</span>
                  <span className="text-slate-400 font-mono text-[11px]">{Math.round((filteredVennUsers.length / SAMPLE_USERS.length) * 100)}% del Universo $U$</span>
                </div>

                <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                  {filteredVennUsers.map((u) => (
                    <div
                      key={u.id}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-black/40 border border-slate-800">
                          {renderUserIcon(u.iconType)}
                        </div>
                        <div>
                          <span className="font-bold text-white block">{u.name}</span>
                          <span className="text-[10px] text-slate-400">{u.role}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        {u.isAdmin && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Admin (A)
                          </span>
                        )}
                        {u.hasValidKey && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            Clave (B)
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: Submission & Backend Sync */}
        <section 
          ref={section4Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 4 ? themeStyles.spotlightBorder : ""
          } flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden`}
        >
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white">
                Validación y Registro de Progreso Académico
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {allMissionsCompleted ? (
                <span className="text-emerald-300 font-bold block">
                  Has completado las 3 misiones con éxito. Presiona el botón para certificar tu nota en el servidor y acreditar tus 50 TortuPuntos.
                </span>
              ) : (
                <span className="text-slate-300 block">
                  Debes completar las 3 misiones marcadas en la consola superior antes de enviar tu solución (Progreso actual: {completedMissionsCount}/3).
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            {isCompleted ? (
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                <Check className="w-5 h-5" />
                <div className="text-left">
                  <span className="font-black text-sm block">Reto Completado con Éxito</span>
                  <span className="text-[10px] opacity-80">+50 TortuPuntos Registrados en SQLite</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSubmitSolution}
                disabled={isSubmitting || !allMissionsCompleted}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-sm transition-all cursor-pointer ${
                  allMissionsCompleted 
                    ? themeStyles.accentBg 
                    : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" /> Registrando en Servidor...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Enviar Solución del Reto
                  </>
                )}
              </button>
            )}
          </div>
        </section>

      </main>

      {/* Floating Guided Tour Spotlight Controller (Bottom Dock) */}
      <AnimatePresence>
        {guidedTourStep !== null && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-4 inset-x-4 max-w-3xl mx-auto z-40 p-4 rounded-2xl bg-neutral-950/95 border-2 border-emerald-500/50 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white"
          >
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Paso {guidedTourStep} de 4
                  </span>
                  <h4 className="font-extrabold text-sm text-white">
                    {guidedTourStep === 1 && "Estación 1: Calibrar Riesgo en Zona Segura"}
                    {guidedTourStep === 2 && "Estación 2: Simular Bloqueo Lógico (¬A ∧ ¬B)"}
                    {guidedTourStep === 3 && "Estación 3: Filtrar Intersección en Diagrama de Venn"}
                    {guidedTourStep === 4 && "Estación 4: Enviar Solución y Recibir Puntos"}
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  {guidedTourStep === 1 && "El recuadro resaltado te indica qué mover para lograr R(c, i) <= 30."}
                  {guidedTourStep === 2 && "Desmarca los switches para activar la equivalencia de De Morgan."}
                  {guidedTourStep === 3 && "Selecciona Intersección (A ∩ B) para aislar administradores con clave."}
                  {guidedTourStep === 4 && "Presiona 'Enviar Solución' para validar tus +50 TortuPuntos."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 flex-shrink-0">
              {guidedTourStep > 1 && (
                <button
                  onClick={() => setGuidedTourStep(prev => prev ? prev - 1 : 1)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
              )}

              {guidedTourStep < 4 ? (
                <button
                  onClick={() => setGuidedTourStep(prev => prev ? prev + 1 : 2)}
                  className="px-4 py-1.5 rounded-xl text-xs font-black bg-emerald-400 text-black hover:bg-emerald-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Siguiente <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => setGuidedTourStep(null)}
                  className="px-4 py-1.5 rounded-xl text-xs font-black bg-amber-400 text-black hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Finalizar Tour
                </button>
              )}

              <button
                onClick={() => setGuidedTourStep(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar barra guiada"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
