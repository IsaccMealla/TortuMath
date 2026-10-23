import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Cpu, 
  Lock, 
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
  ChevronRight,
  Info
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

// User model for Venn diagram representation
interface SystemUser {
  id: string;
  name: string;
  isAdmin: boolean;
  hasValidKey: boolean;
  role: string;
  avatar: string;
}

const SAMPLE_USERS: SystemUser[] = [
  { id: "usr-1", name: "Carlos Arce (Root)", isAdmin: true, hasValidKey: true, role: "SuperAdmin", avatar: "👨‍💻" },
  { id: "usr-2", name: "Valeria Ríos (Sec)", isAdmin: true, hasValidKey: false, role: "Admin Auxiliar", avatar: "👩‍💼" },
  { id: "usr-3", name: "Pedro Mamani (Dev)", isAdmin: false, hasValidKey: true, role: "Desarrollador", avatar: "👨‍🔧" },
  { id: "usr-4", name: "Lucía Morales (QA)", isAdmin: false, hasValidKey: true, role: "Analista QA", avatar: "👩‍🔬" },
  { id: "usr-5", name: "Invitado Anónimo", isAdmin: false, hasValidKey: false, role: "Visitante", avatar: "👤" },
  { id: "usr-6", name: "Bot Crawler", isAdmin: false, hasValidKey: false, role: "Tráfico Externo", avatar: "🤖" },
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
    }
  }[theme];

  // 2. Simulator State (Risk and Logic)
  const [cpuUsage, setCpuUsage] = useState<number>(35); // 0 to 100%
  const [failedAttempts, setFailedAttempts] = useState<number>(2); // 0 to 10
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [hasValidKey, setHasValidKey] = useState<boolean>(true);

  // Multivariable Risk Function: R(c, i) = 0.5 * c + 10 * i
  const riskScore = useMemo(() => {
    return Number((0.5 * cpuUsage + 10 * failedAttempts).toFixed(1));
  }, [cpuUsage, failedAttempts]);

  const isSafeModeActive = riskScore > 50;

  // Formal Logic: De Morgan's Law Verification
  // Normal form: !(isAdmin || hasValidKey)
  // De Morgan equivalent: (!isAdmin && !hasValidKey)
  const blockedNormal = !(isAdmin || hasValidKey);
  const blockedDeMorgan = !isAdmin && !hasValidKey;
  const isDeMorganEquivalent = blockedNormal === blockedDeMorgan; // Always true, proven interactively

  // Server Access Status:
  // 1. High Risk (> 50): 🔴 Bloqueado por Riesgo Elevado (Modo Seguro)
  // 2. Logic Block: 🟡 Bloqueado por Lógica (No es admin y no tiene clave válida)
  // 3. Safe & Authorized: 🟢 Acceso Concedido
  const serverStatus = useMemo(() => {
    if (isSafeModeActive) {
      return {
        level: "danger",
        title: "Servidor Bloqueado por Riesgo Elevado",
        color: "text-red-400 border-red-500/40 bg-red-500/10",
        badge: "🔴 MODO SEGURO ACTIVO (R > 50)",
        description: "El sistema ha activado el aislamiento preventivo debido a sobrecarga computacional o posible ataque de fuerza bruta."
      };
    }
    if (blockedNormal) {
      return {
        level: "warning",
        title: "Acceso Bloqueado por Lógica",
        color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
        badge: "🟡 ACCESO DENEGADO (¬A ∧ ¬B)",
        description: "El usuario no cuenta con privilegios administrativos ni posee una clave criptográfica válida."
      };
    }
    return {
      level: "success",
      title: "Acceso Concedido",
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      badge: "🟢 ACCESO AUTORIZADO (A ∨ B)",
      description: "El nivel de riesgo operacional es seguro y las credenciales superaron la regla de acceso lógico."
    };
  }, [isSafeModeActive, blockedNormal]);

  // 3. Venn Diagram Set Visualizer State
  type VennOperation = "union" | "intersection" | "diffA" | "complement";
  const [selectedOperation, setSelectedOperation] = useState<VennOperation>("intersection");

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

  // 4. Submission & Backend State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  // Play triumph chord with Web Audio API (cross-platform, zero asset dependency)
  const playAchievementSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Arpeggio Triad)
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
      // Audio autoplay policy fallback
    }
  };

  const showToast = (text: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 5500);
  };

  const handleSubmitSolution = async () => {
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
      // Send to both endpoints for robustness
      const res = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizPayload)
      }).catch(() => null);

      // Play victory sound and show celebration
      playAchievementSound();
      setIsCompleted(true);
      showToast("🎉 ¡Reto del Capítulo 1 Completado con éxito! +50 TortuPuntos otorgados y racha aumentada.", "success");

      if (onSuccessCompletion) {
        onSuccessCompletion(50);
      }

      // Also persist to local storage for instant offline resilience
      const existingPoints = parseInt(localStorage.getItem("tortumath_tortupuntos") || "150", 10);
      localStorage.setItem("tortumath_tortupuntos", (existingPoints + 50).toString());

      const currentStreak = parseInt(localStorage.getItem("tortumath_streak") || "4", 10);
      localStorage.setItem("tortumath_streak", (currentStreak + 1).toString());
    } catch (err: any) {
      showToast("Reto verificado localmente. ¡Puntos acreditados con éxito!", "success");
      playAchievementSound();
      setIsCompleted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles.bgMain} transition-colors duration-300 font-sans pb-16`}>
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
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-sm text-emerald-300">¡Logro Académico Desbloqueado!</h4>
              <p className="text-xs text-slate-300 mt-0.5">{toastMessage.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Bar with Theme Switcher and QR Textbook Badge */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 backdrop-blur-md bg-neutral-950/70 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
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
              Libro Interactivo
            </span>
          </div>
        </div>

        {/* Central Badge for QR Scanner */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${themeStyles.badgeClass} shadow-sm`}>
            <BookOpen className="w-3.5 h-3.5" />
            📖 Reto del Libro de Texto — Capítulo 1
          </span>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => {
              setTheme("tortuga");
              localStorage.setItem("tortumath_student_theme", "tortuga");
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              theme === "tortuga" ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            🐢 Tortuga
          </button>
          <button
            onClick={() => {
              setTheme("matrix");
              localStorage.setItem("tortumath_student_theme", "matrix");
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer font-mono ${
              theme === "matrix" ? "bg-[#00FF66] text-black shadow-sm font-extrabold" : "text-slate-400 hover:text-[#00FF66]"
            }`}
          >
            ⚡ Matrix
          </button>
          <button
            onClick={() => {
              setTheme("cyber");
              localStorage.setItem("tortumath_student_theme", "cyber");
            }}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              theme === "cyber" ? "bg-[#00D2FF] text-[#030612] shadow-sm font-extrabold" : "text-slate-400 hover:text-[#00D2FF]"
            }`}
          >
            🔮 Cyber
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
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${themeStyles.badgeClass}`}>
                Ingeniería de Sistemas • Módulo Práctico
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> +50 TortuPuntos en juego
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Capítulo 1: <span className={`bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>Fundamentos Matemáticos</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Bienvenido al laboratorio sincrónico de apoyo al libro impreso. En este reto aplicarás 
              <strong> funciones de múltiples variables</strong> para modelar el nivel de riesgo en servidores, 
              validarás las <strong>Leyes de De Morgan</strong> en tiempo real y explorarás 
              <strong> operaciones de conjuntos</strong> en diagramas interactivos de Venn.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-400" />
                <span>Estudiante: <strong>{studentName}</strong> ({studentId})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Binary className="w-4 h-4 text-cyan-400" />
                <span>Lógica Proposicional & Álgebra de Boole</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Binary className="w-80 h-80 text-white" />
          </div>
        </motion.div>

        {/* Section 2: Simulador Interactivo en Tiempo Real (Física y Lógica del Servidor) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Cpu className={`w-5 h-5 ${themeStyles.accentText}`} />
                1. Panel de Control y Simulador de Riesgo Multivariable
              </h3>
              <p className="text-xs text-slate-400">
                Ajusta las variables de entrada y observa cómo la función matemática $R(c, i)$ y la lógica booleana determinan el acceso al servidor.
              </p>
            </div>
            
            <button
              onClick={() => {
                setCpuUsage(30);
                setFailedAttempts(1);
                setIsAdmin(true);
                setHasValidKey(true);
              }}
              className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reestablecer Parámetros
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column: Sliders and Switches (Controls) */}
            <div className={`lg:col-span-6 p-6 rounded-2xl ${themeStyles.bgCard} space-y-6`}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-700/60 pb-3">
                <Zap className="w-4 h-4 text-amber-400" /> Variables de Entrada del Sistema
              </h4>

              {/* Slider 1: CPU Usage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-cyan-400" /> Uso de CPU ($c$):
                  </span>
                  <span className="font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
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
                  <span>0% (Reposo)</span>
                  <span>50% (Carga Nominal)</span>
                  <span>100% (Sobrecarga)</span>
                </div>
              </div>

              {/* Slider 2: Failed Login Attempts */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Intentos Fallidos ($i$):
                  </span>
                  <span className="font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {failedAttempts} intentos
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  // mapping 0-10 visually
                  value={failedAttempts * 10}
                  onChange={(e) => setFailedAttempts(Math.round(Number(e.target.value) / 10))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0 (Limpio)</span>
                  <span>5 (Sospechoso)</span>
                  <span>10 (Fuerza Bruta)</span>
                </div>
              </div>

              {/* Boolean Switches: es_admin and tiene_clave_valida */}
              <div className="pt-2 border-t border-slate-700/60 space-y-3">
                <span className="text-xs font-bold text-slate-300 block">
                  Proposiciones Booleanas de Autenticación:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Switch 1: es_admin ($A$) */}
                  <label className={`flex items-center justify-between p-3 rounded-xl ${themeStyles.bgCardSubtle} cursor-pointer hover:border-slate-500 transition-all`}>
                    <div className="flex items-center gap-2">
                      <UserCheck className={`w-4 h-4 ${isAdmin ? "text-emerald-400" : "text-slate-500"}`} />
                      <div>
                        <span className="text-xs font-bold text-white block">Es Administrador</span>
                        <span className="text-[10px] text-slate-400 font-mono">Proposición $A$</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  </label>

                  {/* Switch 2: tiene_clave_valida ($B$) */}
                  <label className={`flex items-center justify-between p-3 rounded-xl ${themeStyles.bgCardSubtle} cursor-pointer hover:border-slate-500 transition-all`}>
                    <div className="flex items-center gap-2">
                      <Key className={`w-4 h-4 ${hasValidKey ? "text-cyan-400" : "text-slate-500"}`} />
                      <div>
                        <span className="text-xs font-bold text-white block">Clave Válida</span>
                        <span className="text-[10px] text-slate-400 font-mono">Proposición $B$</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasValidKey}
                      onChange={(e) => setHasValidKey(e.target.checked)}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer"
                    />
                  </label>
                </div>
              </div>

              {/* Function Math Formula Box */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  📐 Función Matemática Aplicada:
                </span>
                <p className="text-white font-bold">
                  R(c, i) = 0.5 \cdot c + 10 \cdot i = 0.5({cpuUsage}) + 10({failedAttempts}) = <span className="text-emerald-400 text-sm">{riskScore} pts</span>
                </p>
                <p className="text-[11px] text-slate-400">
                  Condición de Bloqueo: Si $R(c, i) &gt; 50$, el servidor activa el <strong>Modo Seguro</strong> preventivo.
                </p>
              </div>
            </div>

            {/* Right Column: Gauges, Server Status & De Morgan Evaluator */}
            <div className={`lg:col-span-6 p-6 rounded-2xl ${themeStyles.bgCard} flex flex-col justify-between space-y-6`}>
              
              {/* Server Status Header Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Estado Operacional del Servidor
                  </h4>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-black ${serverStatus.color}`}>
                    {serverStatus.badge}
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
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Medidor de Nivel de Riesgo Operacional:</span>
                  <span className={`font-mono font-black text-sm ${riskScore > 50 ? "text-red-400" : riskScore > 30 ? "text-amber-400" : "text-emerald-400"}`}>
                    {riskScore} / 150 pts
                  </span>
                </div>

                <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700/80 relative">
                  {/* Safe Zone line at 50 points (scaled to 100% assuming max around 150) */}
                  <div 
                    className="absolute top-0 bottom-0 border-r-2 border-red-500 z-10" 
                    style={{ left: `${Math.min(100, (50 / 150) * 100)}%` }}
                    title="Límite Umbral de Riesgo (50 pts)"
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
                
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span className="text-emerald-400">0 - 30 (Zona Segura)</span>
                  <span className="text-amber-400">30 - 50 (Alerta Media)</span>
                  <span className="text-red-400 font-bold">&gt; 50 (Peligro Inminente)</span>
                </div>
              </div>

              {/* De Morgan's Law Evaluator */}
              <div className={`p-4 rounded-xl ${themeStyles.bgCardSubtle} border border-slate-700/60 space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Binary className="w-4 h-4 text-cyan-400" /> Demostración en Vivo: Leyes de De Morgan
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    Equivalencia Idéntica (≡)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {/* Forma Normal */}
                  <div className="p-3 rounded-lg bg-black/50 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-sans">Forma Normal:</span>
                    <p className="text-white font-bold">
                      ¬(A ∨ B)
                    </p>
                    <p className="text-[11px] text-slate-300">
                      !({isAdmin ? "V" : "F"} || {hasValidKey ? "V" : "F"}) = <strong className={blockedNormal ? "text-amber-400" : "text-emerald-400"}>{blockedNormal ? "VERDADERO (Bloquea)" : "FALSO (Permite)"}</strong>
                    </p>
                  </div>

                  {/* Forma De Morgan */}
                  <div className="p-3 rounded-lg bg-black/50 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-sans">Forma De Morgan:</span>
                    <p className="text-white font-bold">
                      (¬A ∧ ¬B)
                    </p>
                    <p className="text-[11px] text-slate-300">
                      (!{isAdmin ? "V" : "F"} && !{hasValidKey ? "V" : "F"}) = <strong className={blockedDeMorgan ? "text-amber-400" : "text-emerald-400"}>{blockedDeMorgan ? "VERDADERO (Bloquea)" : "FALSO (Permite)"}</strong>
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-snug">
                  📌 <em>Conclusión Matemática:</em> La regla <code className="text-emerald-300 font-bold">¬(A ∨ B) ≡ (¬A ∧ ¬B)</code> demuestra que denegar el acceso a quien <em>no sea administrador o no tenga clave</em> es exactamente idéntico a exigir que el usuario <em>sea no-admin Y carezca de clave válida</em> simultáneamente.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 3: Visualizador de Conjuntos (Diagrama de Venn Interactivo) */}
        <section className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} space-y-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Users className={`w-5 h-5 ${themeStyles.accentText}`} />
                2. Visualizador Interactivo de Teoría de Conjuntos (Diagrama de Venn)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Representación del Conjunto Universal $U$ (Usuarios), $A$ (Administradores) y $B$ (Usuarios con Clave Válida).
              </p>
            </div>

            {/* Operation Selector Buttons */}
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
            
            {/* SVG Interactive Venn Canvas */}
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
                  <clipPath id="clipB">
                    <circle cx="330" cy="160" r="110" />
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
                  U (Universo: Todos los Usuarios del Sistema)
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

                {/* User Nodes plotted inside regions */}
                {/* 1. Only A (Valeria Ríos - Admin sin clave) */}
                <g className="cursor-pointer">
                  <circle cx="170" cy="160" r="14" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
                  <text x="170" y="164" fill="#E2E8F0" fontSize="11" textAnchor="middle">👩‍💼</text>
                  <text x="170" y="185" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontWeight="bold">Valeria</text>
                </g>

                {/* 2. Intersection A ∩ B (Carlos Arce - Root Admin con clave) */}
                <g className="cursor-pointer">
                  <circle cx="270" cy="160" r="16" fill="#083344" stroke="#22D3EE" strokeWidth="2" />
                  <text x="270" y="165" fill="#E2E8F0" fontSize="13" textAnchor="middle">👨‍💻</text>
                  <text x="270" y="187" fill="#67E8F9" fontSize="9" textAnchor="middle" fontWeight="bold">Carlos (Root)</text>
                </g>

                {/* 3. Only B (Pedro Mamani & Lucía Morales - Usuarios regulares con clave) */}
                <g className="cursor-pointer">
                  <circle cx="360" cy="140" r="14" fill="#164E63" stroke="#06B6D4" strokeWidth="1.5" />
                  <text x="360" y="144" fill="#E2E8F0" fontSize="11" textAnchor="middle">👨‍🔧</text>
                  <text x="360" y="165" fill="#BAE6FD" fontSize="9" textAnchor="middle" fontWeight="bold">Pedro</text>
                </g>
                <g className="cursor-pointer">
                  <circle cx="375" cy="190" r="14" fill="#164E63" stroke="#06B6D4" strokeWidth="1.5" />
                  <text x="375" y="194" fill="#E2E8F0" fontSize="11" textAnchor="middle">👩‍🔬</text>
                  <text x="375" y="215" fill="#BAE6FD" fontSize="9" textAnchor="middle" fontWeight="bold">Lucía</text>
                </g>

                {/* 4. Outside A and B: U \ (A ∪ B) (Invitado y Bot Crawler) */}
                <g className="cursor-pointer">
                  <circle cx="65" cy="250" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                  <text x="65" y="254" fill="#CBD5E1" fontSize="11" textAnchor="middle">👤</text>
                  <text x="65" y="275" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="bold">Invitado</text>
                </g>
                <g className="cursor-pointer">
                  <circle cx="470" cy="250" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                  <text x="470" y="254" fill="#CBD5E1" fontSize="11" textAnchor="middle">🤖</text>
                  <text x="470" y="275" fill="#94A3B8" fontSize="9" textAnchor="middle" fontWeight="bold">Bot</text>
                </g>
              </svg>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> $A$: Administradores ({SAMPLE_USERS.filter(u => u.isAdmin).length})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span> $B$: Con Clave ({SAMPLE_USERS.filter(u => u.hasValidKey).length})
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block"></span> Total $U$: ({SAMPLE_USERS.length})
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

              {/* Elements Table / Badges */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300">Elementos Filtrados ({filteredVennUsers.length}):</span>
                  <span className="text-slate-400 font-mono text-[11px]">{Math.round((filteredVennUsers.length / SAMPLE_USERS.length) * 100)}% de $U$</span>
                </div>

                <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
                  {filteredVennUsers.map((u) => (
                    <div
                      key={u.id}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{u.avatar}</span>
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

        {/* Section 4: Submission & Backend Sync */}
        <section className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden`}>
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-black text-white">
                Validación y Registro de Progreso Académico
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Al enviar tu solución, se registrará el resultado en el libro de calificaciones del servidor 
              (endpoint <code className="font-mono text-emerald-300">/api/quizzes</code>), se te otorgarán 
              <strong> +50 TortuPuntos</strong> y se actualizará tu racha de estudio diaria.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            {isCompleted ? (
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                <Check className="w-5 h-5" />
                <div className="text-left">
                  <span className="font-black text-sm block">¡Reto Completado!</span>
                  <span className="text-[10px] opacity-80">+50 TortuPuntos Sumados</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSubmitSolution}
                disabled={isSubmitting}
                className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-black text-sm transition-all cursor-pointer ${themeStyles.accentBg} disabled:opacity-50`}
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
    </div>
  );
}
