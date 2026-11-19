import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Sparkles,
  Shield,
  Check,
  RotateCcw,
  BookOpen,
  Award,
  Send,
  Flame,
  Zap,
  Terminal,
  Layers,
  GraduationCap,
  Calculator,
  Compass,
  Sliders,
  ChevronRight,
  ChevronLeft,
  X,
  Target,
  Activity,
  Maximize2,
  TrendingUp,
  Cpu,
  Server,
  AreaChart,
  Gauge,
  Clock,
  Layers2
} from "lucide-react";
import Logo from "../shared/Logo";

export interface RetoCapitulo4Props {
  onBack?: () => void;
  userEmail?: string;
  studentId?: string;
  studentName?: string;
  initialTheme?: "tortuga" | "matrix" | "cyber";
  onSuccessCompletion?: (points: number) => void;
}

export default function RetoCapitulo4({
  onBack,
  userEmail = "sofia.ramos@gmail.com",
  studentId = "STU-001",
  studentName = "Sofía Ramos Ortiz",
  initialTheme = "tortuga",
  onSuccessCompletion
}: RetoCapitulo4Props) {
  // 1. Theme Configuration
  const [theme, setTheme] = useState<"tortuga" | "matrix" | "cyber">(() => {
    return (localStorage.getItem("tortumath_student_theme") as any) || initialTheme;
  });

  // Guided Tour Mode State (1: Límites, 2: Derivada/Optimización, 3: Integral/Acumulación, 4: Enviar)
  const [guidedTourStep, setGuidedTourStep] = useState<number | null>(1);

  // Section references for auto-scroll
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

  // -------------------------------------------------------------
  // ESTACIÓN 1: Análisis de Límites & Tiempo de Respuesta Crítico
  // Función: f(x) = (x^2 - 16) / (x - 4) cuando x -> 4
  // Indeterminación 0/0 -> factoriza a (x + 4) -> Límite = 8 ms
  // -------------------------------------------------------------
  const [limitProbeX, setLimitProbeX] = useState<number>(3.99);

  // Table points approaching x = 4 from left and right
  const limitTableRows = useMemo(() => {
    const points = [3.9, 3.99, 3.999, 4.001, 4.01, 4.1];
    return points.map((p) => {
      const val = (Math.pow(p, 2) - 16) / (p - 4);
      return { x: p, fx: val.toFixed(4) };
    });
  }, []);

  // Calculated probe value
  const evaluatedProbeFx = useMemo(() => {
    if (Math.abs(limitProbeX - 4) < 0.0001) return "Indeterminado 0/0";
    const val = (Math.pow(limitProbeX, 2) - 16) / (limitProbeX - 4);
    return val.toFixed(4);
  }, [limitProbeX]);

  // Is probe close enough to reveal limit L = 8?
  const isLimitSolved = Math.abs(limitProbeX - 4) <= 0.01 && limitProbeX !== 4;

  // -------------------------------------------------------------
  // ESTACIÓN 2: Derivadas & Optimización de Rendimiento
  // Función de Tiempo de Respuesta / Costo de Algoritmo:
  // T(n) = 0.02 * n^2 - 4 * n + 250 (o C(x) = x^2 - 8x + 20)
  // Utilizaremos el modelo del libro:
  // C(x) = x^2 - 8x + 20 -> C'(x) = 2x - 8 -> Punto crítico x = 4 -> Mínimo C(4) = 4
  // -------------------------------------------------------------
  const [optVariableX, setOptVariableX] = useState<number>(1);

  const costValue = useMemo(() => {
    return Math.pow(optVariableX, 2) - 8 * optVariableX + 20;
  }, [optVariableX]);

  const costDerivative = useMemo(() => {
    return 2 * optVariableX - 8;
  }, [optVariableX]);

  // Optimal point condition: x = 4, derivative = 0, cost = 4
  const isOptimumReached = optVariableX === 4 && costDerivative === 0;

  // -------------------------------------------------------------
  // ESTACIÓN 3: Integrales & Acumulación de Solicitudes
  // Tasa de llegada: r(t) = 4t + 2 solicitudes/minuto en [0, t_fin]
  // Acumulación: N(t) = int_0^t (4t + 2) dt = 2t^2 + 2t
  // Para t = 5 minutos: N(5) = 2(25) + 2(5) = 50 + 10 = 60 solicitudes
  // Riemann sums slider: subintervalos n = 10, 100, 1000
  // -------------------------------------------------------------
  const [integralTimeInterval, setIntegralTimeInterval] = useState<number>(5); // t = 0 a 5 min
  const [riemannRectangles, setRiemannRectangles] = useState<number>(100);

  // Exact integral: int_0^t (4x + 2) dx = 2t^2 + 2t
  const exactAccumulatedRequests = useMemo(() => {
    return 2 * Math.pow(integralTimeInterval, 2) + 2 * integralTimeInterval;
  }, [integralTimeInterval]);

  // Riemann Left Sum approximation
  const riemannApproximation = useMemo(() => {
    const a = 0;
    const b = integralTimeInterval;
    const n = riemannRectangles;
    const dt = (b - a) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const t_i = a + i * dt;
      const rate = 4 * t_i + 2;
      sum += rate * dt;
    }
    return sum.toFixed(2);
  }, [integralTimeInterval, riemannRectangles]);

  // -------------------------------------------------------------
  // 4. MEASURABLE CHALLENGE MISSIONS (3 Tasks)
  // -------------------------------------------------------------
  // Misión 1: Acercar la sonda x a 3.99 o 4.01 para comprobar el límite L = 8 ms
  const mission1Completed = Math.abs(limitProbeX - 4) <= 0.01 && limitProbeX !== 4;

  // Misión 2: Encontrar el punto crítico x = 4 con derivada C'(4) = 0 y costo mínimo = 4
  const mission2Completed = isOptimumReached;

  // Misión 3: Calibrar la acumulación para t = 5 min logrando exactamente N = 60 solicitudes
  const mission3Completed = integralTimeInterval === 5 && exactAccumulatedRequests === 60;

  const completedMissionsCount = (mission1Completed ? 1 : 0) + (mission2Completed ? 1 : 0) + (mission3Completed ? 1 : 0);
  const allMissionsCompleted = completedMissionsCount === 3;

  // -------------------------------------------------------------
  // 5. SUBMISSION & AUDIO FEEDBACK
  // -------------------------------------------------------------
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);

  const playAchievementSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
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
      showToast("Completa primero las 3 misiones matemáticas del reto para enviar tu solución.", "error");
      return;
    }

    setIsSubmitting(true);
    const quizPayload = {
      id: `QR-CAP4-${Date.now()}`,
      studentId: studentId,
      quizTitle: "Reto Libro Cap. 4: Cálculo Aplicado (Límites, Optimización & Integrales)",
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
      showToast("¡Reto del Capítulo 4 verificado y completado! +50 TortuPuntos otorgados y racha de estudio incrementada.", "success");

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

      {/* Top Header Bar */}
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
            <span>Reto del Libro — Capítulo 4</span>
          </span>

          <button
            onClick={() => setGuidedTourStep((prev) => (prev === null ? 1 : null))}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer ${
              guidedTourStep !== null
                ? "bg-amber-400 text-black border border-amber-300 ring-2 ring-amber-400/50"
                : "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
            }`}
            title="Activar o desactivar el modo guiado paso a paso"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{guidedTourStep !== null ? "Modo Guiado Activo" : "Iniciar Modo Guiado"}</span>
          </button>
        </div>

        {/* Theme Picker */}
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

        {/* Hero Banner for Chapter 4 */}
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
              Capítulo 4: <span className={`bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>Cálculo Aplicado a Sistemas</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Laboratorio interactivo sincronizado con el libro impreso: <em>"Monitoreo de un servicio: límites, optimización y acumulación"</em>.
              Modela el comportamiento crítico de un servidor, encuentra el punto de costo mínimo y acumula las solicitudes recibidas mediante integrales definidas.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Estudiante: <strong>{studentName}</strong> ({studentId})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Límites • Derivadas & Puntos Críticos • Sumas de Riemann</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <TrendingUp className="w-80 h-80 text-white" />
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
                <p className="text-xs text-slate-400">Completa las 3 tareas del capítulo para validar tu solución y ganar tus puntos:</p>
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
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> Misión 1: Resolver Límite 0/0
                </span>
                {mission1Completed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1 font-bold">
                    <Check className="w-3 h-3" /> Cumplida
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-bold">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Aproxima la sonda a x = 3.99 para comprobar el límite de tiempo de respuesta L = 8 ms.
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
                  <Sliders className="w-3.5 h-3.5 text-amber-400" /> Misión 2: Optimización C'(x)=0
                </span>
                {mission2Completed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1 font-bold">
                    <Check className="w-3 h-3" /> Cumplida
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-bold">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Ajusta x = 4 para anular la derivada C'(4) = 0 y obtener el costo mínimo de 4 unidades.
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
                  <AreaChart className="w-3.5 h-3.5 text-teal-400" /> Misión 3: Integral Acumulada
                </span>
                {mission3Completed ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] flex items-center gap-1 font-bold">
                    <Check className="w-3 h-3" /> Cumplida
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-bold">
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Calibra el intervalo en t = 5 min para calcular exactamente N = 60 solicitudes acumuladas.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 1: Análisis de Límites & Tiempo de Respuesta Crítico  */}
        {/* ============================================================== */}
        <section
          ref={section1Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 1 ? themeStyles.spotlightBorder : ""
          } space-y-6`}
        >
          {/* Prominent Instruction Box */}
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
              <li>El tiempo de respuesta de la API está modelado por: <strong>f(x) = (x² - 16) / (x - 4)</strong>.</li>
              <li>En x = 4 ocurre una indeterminación del tipo 0/0 (el servidor colapsa si se evalúa directo).</li>
              <li>Mueve el control deslizante a <strong>x = 3.99</strong> o <strong>x = 4.01</strong> y comprueba cómo el límite lateral converge a <strong>L = 8.00 ms</strong> mediante la factorización (x-4)(x+4)/(x-4).</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Activity className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 1: Aproximación y Límites de Capacidad Crítica
              </h3>
              <p className="text-xs text-slate-400">
                Resolución de indeterminaciones del tipo 0/0 mediante factorización algebraica: lim_(x→4) (x² - 16)/(x - 4) = 8.
              </p>
            </div>

            <button
              onClick={() => setLimitProbeX(3.99)}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Aproximar Sonda a x = 3.99
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Slider & Gauge */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" /> Sonda de Carga Concurrente (x):
                  </span>
                  <span className="font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    x = {limitProbeX}
                  </span>
                </div>

                <input
                  type="range"
                  min="3.5"
                  max="4.5"
                  step="0.01"
                  value={limitProbeX}
                  onChange={(e) => setLimitProbeX(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>3.5 (Izquierda)</span>
                  <span className="text-amber-400 font-bold">4.0 (Punto Crítico 0/0)</span>
                  <span>4.5 (Derecha)</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 text-center font-mono">
                  <span className="text-xs text-slate-400 block mb-0.5">Evaluación en tiempo real f(x):</span>
                  <span className="text-2xl font-black text-white">
                    f({limitProbeX}) ={" "}
                    <strong className={mission1Completed ? "text-emerald-400" : "text-cyan-400"}>
                      {evaluatedProbeFx}
                    </strong>{" "}
                    <span className="text-xs text-slate-400">ms</span>
                  </span>
                </div>
              </div>

              {/* Algebraic Factorization Display */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Demostración por Factorización (Diferencia de Cuadrados):
                </span>
                <p className="text-slate-300">
                  (x² - 16) / (x - 4) = [(x - 4)(x + 4)] / (x - 4) = x + 4 (para x ≠ 4)
                </p>
                <p className="text-emerald-400 font-bold">
                  lim_(x→4) (x + 4) = 4 + 4 = 8 ms
                </p>
              </div>
            </div>

            {/* Approach Table */}
            <div className="lg:col-span-6 p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
              <span className="text-xs uppercase font-extrabold text-slate-300 block">
                Tabla de Valores de Aproximación Lateral
              </span>

              <div className="overflow-hidden rounded-lg border border-slate-800">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="p-2 border-b border-slate-800">x (Aproximación)</th>
                      <th className="p-2 border-b border-slate-800">f(x) = (x²-16)/(x-4)</th>
                      <th className="p-2 border-b border-slate-800">Tendencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-black/40 text-slate-300">
                    {limitTableRows.map((row, idx) => (
                      <tr key={idx} className={row.x === 3.99 || row.x === 4.01 ? "bg-cyan-500/10 text-cyan-300 font-bold" : ""}>
                        <td className="p-2">{row.x}</td>
                        <td className="p-2">{row.fx} ms</td>
                        <td className="p-2 text-slate-400">
                          {row.x < 4 ? "Por la izquierda → 8" : "Por la derecha → 8"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                El límite describe con exactitud el comportamiento operacional en el entorno de saturación sin provocar desbordamiento aritmético en la CPU.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 2: Derivadas & Optimización de Costos                */}
        {/* ============================================================== */}
        <section
          ref={section2Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 2 ? themeStyles.spotlightBorder : ""
          } space-y-6`}
        >
          {/* Prominent Instruction Box */}
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
              <li>El costo operativo del servicio sigue la función cuadrática del libro: <strong>C(x) = x² - 8x + 20</strong>.</li>
              <li>La razón de cambio instantánea está dada por su derivada: <strong>C'(x) = 2x - 8</strong>.</li>
              <li>Ajusta la variable de asignación de recursos a <strong>x = 4</strong> para anular la derivada (C'(4) = 0) y alcanzar el <strong>costo mínimo absoluto de C(4) = 4</strong>.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sliders className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 2: Razón de Cambio y Optimización de Recursos
              </h3>
              <p className="text-xs text-slate-400">
                Criterio de la primera y segunda derivada: C'(x) = 2x - 8 = 0 y C''(x) = 2 {">"} 0 (Mínimo local confirmado).
              </p>
            </div>

            <button
              onClick={() => setOptVariableX(4)}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer border border-amber-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Calibrar Mínimo Teórico (x = 4)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Slider */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-400" /> Parámetro Operativo (x):
                  </span>
                  <span className="font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    x = {optVariableX}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={optVariableX}
                  onChange={(e) => setOptVariableX(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>x = 0</span>
                  <span className="text-emerald-400 font-bold">x = 4 (Óptimo)</span>
                  <span>x = 8</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Costo C(x)</span>
                    <strong className={`text-xl font-mono ${optVariableX === 4 ? "text-emerald-400" : "text-white"}`}>
                      {costValue}
                    </strong>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Derivada C'(x)</span>
                    <strong className={`text-xl font-mono ${costDerivative === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                      {costDerivative}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Parabola Card */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/40 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Comportamiento de la Curva C(x) = x² - 8x + 20</span>
                <span className="text-[10px] text-emerald-400 font-mono">C''(x) = 2 {">"} 0</span>
              </h4>

              {/* Mini SVG Curve */}
              <div className="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-800 relative flex items-center justify-center p-2">
                <svg className="w-full h-full" viewBox="0 0 200 100">
                  {/* Axis */}
                  <line x1="10" y1="90" x2="190" y2="90" stroke="#334155" strokeWidth="1" />
                  <line x1="20" y1="10" x2="20" y2="90" stroke="#334155" strokeWidth="1" />

                  {/* Parabola path */}
                  <path
                    d="M 20 20 Q 100 120 180 20"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />

                  {/* Current Operating Point marker */}
                  {/* Map optVariableX (0 to 8) to x coord (20 to 180) */}
                  <circle
                    cx={20 + (optVariableX / 8) * 160}
                    cy={80 - ((20 - costValue) / 16) * 60}
                    r="5"
                    fill={optVariableX === 4 ? "#10b981" : "#f59e0b"}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300">
                {optVariableX === 4 ? (
                  <span>✓ <strong>Punto crítico alcanzado:</strong> Pendiente de la tangente es exactamente 0. Costo mínimo = 4 unidades.</span>
                ) : (
                  <span>La pendiente actual de la tangente es {costDerivative}. Mueve el control a x = 4 para anularla.</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 3: Integrales & Acumulación de Solicitudes            */}
        {/* ============================================================== */}
        <section
          ref={section3Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 3 ? themeStyles.spotlightBorder : ""
          } space-y-6`}
        >
          {/* Prominent Instruction Box */}
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
              <li>La tasa de solicitudes recibidas por minuto en la API es: <strong>r(t) = 4t + 2</strong>.</li>
              <li>Para calcular el total de peticiones procesadas se integra la tasa: <strong>N = ∫ (4t + 2) dt = 2t² + 2t</strong>.</li>
              <li>Ajusta el tiempo de monitoreo en <strong>t = 5 minutos</strong> para comprobar que la acumulación total asciende a <strong>N = 60 solicitudes</strong> (2·5² + 2·5 = 50 + 10 = 60).</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <AreaChart className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 3: Acumulación de Tráfico & Sumas de Riemann
              </h3>
              <p className="text-xs text-slate-400">
                Teorema Fundamental del Cálculo aplicado a flujos de datos en tiempo continuo: N = ∫₀⁵ (4t + 2) dt = 60.
              </p>
            </div>

            <button
              onClick={() => {
                setIntegralTimeInterval(5);
                setRiemannRectangles(100);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 transition-colors cursor-pointer border border-teal-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Calibrar Ejercicio del Libro (t = 5 min → 60 solicitudes)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-400" /> Intervalo de Tiempo [0, t]:
                  </span>
                  <span className="font-mono font-black text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                    t = {integralTimeInterval} minutos
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={integralTimeInterval}
                  onChange={(e) => setIntegralTimeInterval(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 min</span>
                  <span className="text-teal-400 font-bold">5 min (Caso Libro)</span>
                  <span>10 min</span>
                </div>

                {/* Riemann Rectangles Slider */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-bold">Subintervalos de Riemann (n):</span>
                    <span className="text-slate-400 font-mono">{riemannRectangles} rectángulos</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={riemannRectangles}
                    onChange={(e) => setRiemannRectangles(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-slate-800 accent-teal-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Accumulation Comparison Card */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/40 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Resultados de Acumulación N(t)</span>
                <span className="text-[10px] text-teal-400 font-mono">Área bajo la curva</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Valor Exacto (Analítico)</span>
                  <strong className={`text-2xl font-mono block ${mission3Completed ? "text-emerald-400" : "text-white"}`}>
                    {exactAccumulatedRequests}
                  </strong>
                  <span className="text-[10px] text-slate-400 block">solicitudes</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Aprox. Riemann (n={riemannRectangles})</span>
                  <strong className="text-2xl font-mono text-cyan-400 block">
                    {riemannApproximation}
                  </strong>
                  <span className="text-[10px] text-slate-400 block">solicitudes</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                <p>N = [2t² + 2t]₀^{integralTimeInterval} = (2·{integralTimeInterval}² + 2·{integralTimeInterval}) - 0 = <strong className="text-teal-400">{exactAccumulatedRequests} peticiones</strong></p>
                <p className="text-[11px] text-slate-400">
                  A medida que n → ∞, la suma numérica converge de forma continua al valor analítico exacto de la integral.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 4: Certificación y Envío de Solución                 */}
        {/* ============================================================== */}
        <section
          ref={section4Ref}
          className={`p-6 sm:p-8 rounded-2xl ${themeStyles.bgCard} transition-all duration-300 ${
            guidedTourStep === 4 ? themeStyles.spotlightBorder : ""
          } flex flex-col md:flex-row items-center justify-between gap-6`}
        >
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider ${themeStyles.badgeClass}`}>
                Estación 4: Certificación de Reto
              </span>
              <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> +50 TortuPuntos & Racha de Estudio
              </span>
            </div>
            <h3 className="text-xl font-black text-white">Validación de Solución del Capítulo 4</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
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
                    {guidedTourStep === 1 && "Estación 1: Límites Críticos (lim f(x) = 8 ms)"}
                    {guidedTourStep === 2 && "Estación 2: Optimización con Derivadas (x = 4)"}
                    {guidedTourStep === 3 && "Estación 3: Acumulación con Integrales (N = 60)"}
                    {guidedTourStep === 4 && "Estación 4: Enviar Solución y Recibir Puntos"}
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  {guidedTourStep === 1 && "Aproxima la sonda a x = 3.99 para comprobar la convergencia del tiempo de respuesta L = 8 ms."}
                  {guidedTourStep === 2 && "Ajusta x = 4 para anular la derivada C'(4) = 0 y obtener el costo mínimo."}
                  {guidedTourStep === 3 && "Establece el tiempo de monitoreo en 5 min para calcular N = 60 solicitudes acumuladas."}
                  {guidedTourStep === 4 && "Presiona 'Enviar Solución' para validar tus +50 TortuPuntos."}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 flex-shrink-0">
              {guidedTourStep > 1 && (
                <button
                  onClick={() => setGuidedTourStep((prev) => (prev ? prev - 1 : 1))}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
              )}

              {guidedTourStep < 4 ? (
                <button
                  onClick={() => setGuidedTourStep((prev) => (prev ? prev + 1 : 2))}
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
