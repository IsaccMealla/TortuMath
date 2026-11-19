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
  Server,
  Database,
  Cpu,
  HardDrive,
  KeyRound,
  Lock,
  Unlock,
  Hash,
  Binary,
  Layers2,
  TableProperties,
  ArrowRightLeft
} from "lucide-react";
import Logo from "../shared/Logo";

export interface RetoCapitulo3Props {
  onBack?: () => void;
  userEmail?: string;
  studentId?: string;
  studentName?: string;
  initialTheme?: "tortuga" | "matrix" | "cyber";
  onSuccessCompletion?: (points: number) => void;
}

export default function RetoCapitulo3({
  onBack,
  userEmail = "sofia.ramos@gmail.com",
  studentId = "STU-001",
  studentName = "Sofía Ramos Ortiz",
  initialTheme = "tortuga",
  onSuccessCompletion
}: RetoCapitulo3Props) {
  // 1. Theme Configuration
  const [theme, setTheme] = useState<"tortuga" | "matrix" | "cyber">(() => {
    return (localStorage.getItem("tortumath_student_theme") as any) || initialTheme;
  });

  // Guided Tour Mode State (1: Recurso/Sistema, 2: Cramer/Det, 3: Cifrado Hill, 4: Enviar)
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
  // STATION 1: Dimensionamiento del Clúster (Sistema de Ecuaciones Ax = b)
  // Matriz de consumo:
  // CPU:   2x + 1y + 1z = 17
  // RAM:   1x + 3y + 2z = 23
  // DISCO: 1x + 1y + 4z = 21
  // -------------------------------------------------------------
  const [instanciasWeb, setInstanciasWeb] = useState<number>(3); // x
  const [instanciasDB, setInstanciasDB] = useState<number>(2);  // y
  const [instanciasCache, setInstanciasCache] = useState<number>(1); // z

  // Resource consumption totals
  const consumedCPU = useMemo(() => 2 * instanciasWeb + 1 * instanciasDB + 1 * instanciasCache, [instanciasWeb, instanciasDB, instanciasCache]);
  const consumedRAM = useMemo(() => 1 * instanciasWeb + 3 * instanciasDB + 2 * instanciasCache, [instanciasWeb, instanciasDB, instanciasCache]);
  const consumedDisk = useMemo(() => 1 * instanciasWeb + 1 * instanciasDB + 4 * instanciasCache, [instanciasWeb, instanciasDB, instanciasCache]);

  const targetCPU = 17;
  const targetRAM = 23;
  const targetDisk = 21;

  // Exact match condition for solution: (5, 4, 3)
  const isClusterBalanced = consumedCPU === targetCPU && consumedRAM === targetRAM && consumedDisk === targetDisk;

  // -------------------------------------------------------------
  // STATION 2: Determinantes & Regla de Cramer (Verificación Formal)
  // Matriz A = [ [2, 1, 1], [1, 3, 2], [1, 1, 4] ]
  // det(A) = 2(12 - 2) - 1(4 - 2) + 1(1 - 3) = 2(10) - 2 - 2 = 16
  // det(A_x) = det([ [17, 1, 1], [23, 3, 2], [21, 1, 4] ]) = 80 -> x = 80 / 16 = 5
  // det(A_y) = det([ [2, 17, 1], [1, 23, 2], [1, 21, 4] ]) = 64 -> y = 64 / 16 = 4
  // det(A_z) = det([ [2, 1, 17], [1, 3, 23], [1, 1, 21] ]) = 48 -> z = 48 / 16 = 3
  // -------------------------------------------------------------
  const [cramerSelectedVar, setCramerSelectedVar] = useState<"all" | "x" | "y" | "z">("all");

  const detA = 16;
  const detAx = 80;
  const detAy = 64;
  const detAz = 48;

  const solX = detAx / detA; // 5
  const solY = detAy / detA; // 4
  const solZ = detAz / detA; // 3

  // -------------------------------------------------------------
  // STATION 3: Cifrado de Hill con Matriz Clave K = [ [2, 3], [1, 4] ]
  // det(K) = 2*4 - 3*1 = 5 (coprimo con 26)
  // Inverso de 5 mod 26: 5 * 21 = 105 = 4*26 + 1 -> 21
  // K^-1 = 21 * [ [4, -3], [-1, 2] ] = [ [84, -63], [-21, 42] ] = [ [6, 15], [5, 16] ] mod 26
  // Mensaje del reto: "NUBE" -> N=13, U=20, B=1, E=4
  // Bloque 1: [13, 20] -> K * [13, 20] = [2*13+3*20, 1*13+4*20] = [86, 93] mod 26 = [8, 15] -> I, P
  // Bloque 2: [1, 4]   -> K * [1, 4]   = [2*1+3*4, 1*1+4*4]     = [14, 17] mod 26 = [14, 17] -> O, R
  // Texto Cifrado: "IPOR"
  // -------------------------------------------------------------
  const [inputTextHill, setInputTextHill] = useState<string>("NUBE");
  const [cipherDirection, setCipherDirection] = useState<"encrypt" | "decrypt">("encrypt");

  const keyK = [
    [2, 3],
    [1, 4]
  ];

  const keyKInv = [
    [6, 15],
    [5, 16]
  ];

  const detK = 2 * 4 - 3 * 1; // 5
  const isKInvertibleMod26 = true; // 5 is coprime with 26

  // Hill Cipher Computation
  const hillResult = useMemo(() => {
    const cleanStr = inputTextHill.toUpperCase().replace(/[^A-Z]/g, "");
    if (cleanStr.length === 0) return { output: "", steps: [] };

    // Pad with 'X' if odd length
    const padded = cleanStr.length % 2 !== 0 ? cleanStr + "X" : cleanStr;
    const activeMatrix = cipherDirection === "encrypt" ? keyK : keyKInv;
    let res = "";
    const steps: { inputBlock: string; inNums: number[]; outNums: number[]; outputBlock: string }[] = [];

    for (let i = 0; i < padded.length; i += 2) {
      const c1 = padded.charCodeAt(i) - 65;
      const c2 = padded.charCodeAt(i + 1) - 65;

      const o1 = (activeMatrix[0][0] * c1 + activeMatrix[0][1] * c2) % 26;
      const o2 = (activeMatrix[1][0] * c1 + activeMatrix[1][1] * c2) % 26;

      const normO1 = (o1 + 26) % 26;
      const normO2 = (o2 + 26) % 26;

      const outChars = String.fromCharCode(normO1 + 65) + String.fromCharCode(normO2 + 65);
      res += outChars;

      steps.push({
        inputBlock: padded.substring(i, i + 2),
        inNums: [c1, c2],
        outNums: [normO1, normO2],
        outputBlock: outChars
      });
    }

    return { output: res, steps };
  }, [inputTextHill, cipherDirection]);

  // -------------------------------------------------------------
  // 4. MEASURABLE CHALLENGE MISSIONS (3 Tasks)
  // -------------------------------------------------------------
  // Misión 1: Balancear el clúster a consumo exacto de recursos: x = 5 (Web), y = 4 (DB), z = 3 (Caché)
  const mission1Completed = instanciasWeb === 5 && instanciasDB === 4 && instanciasCache === 3 && isClusterBalanced;

  // Misión 2: Validar el determinante det(A) = 16 y comprobar la solución teórica mediante Cramer
  const mission2Completed = detA === 16 && solX === 5 && solY === 4 && solZ === 3;

  // Misión 3: Cifrar la palabra clave "NUBE" con la matriz K obteniendo "IPOR" (o descifrar "IPOR" obteniendo "NUBE")
  const mission3Completed = 
    (inputTextHill.trim().toUpperCase() === "NUBE" && cipherDirection === "encrypt" && hillResult.output === "IPOR") ||
    (inputTextHill.trim().toUpperCase() === "IPOR" && cipherDirection === "decrypt" && hillResult.output === "NUBE");

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
      const notes = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
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
      showToast("Completa primero las 3 misiones matemáticas del reto para enviar tu solución.", "error");
      return;
    }

    setIsSubmitting(true);
    const quizPayload = {
      id: `QR-CAP3-${Date.now()}`,
      studentId: studentId,
      quizTitle: "Reto Libro Cap. 3: Álgebra Lineal (Sistemas, Determinantes & Cifrado de Hill)",
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
      showToast("¡Reto del Capítulo 3 verificado y completado! +50 TortuPuntos otorgados y racha de estudio incrementada.", "success");

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
            <span>Reto del Libro — Capítulo 3</span>
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

        {/* Hero Banner for Chapter 3 */}
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
              Capítulo 3: <span className={`bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>Álgebra Lineal & Cifrado</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Laboratorio interactivo sincronizado con el libro impreso: <em>"Infraestructura y mensajes cifrados"</em>. 
              Resuelve el dimensionamiento de servidores en un clúster de alta disponibilidad y cifra transmisiones de seguridad mediante matrices y el algoritmo de Hill.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Estudiante: <strong>{studentName}</strong> ({studentId})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <TableProperties className="w-4 h-4 text-cyan-400" />
                <span>Sistemas Ax = b • Regla de Cramer • Cifrado de Hill</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Layers2 className="w-80 h-80 text-white" />
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
                <p className="text-xs text-slate-400">Completa las 3 tareas del reto de ingeniería para certificar tu solución:</p>
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
                  <Server className="w-3.5 h-3.5 text-cyan-400" /> Misión 1: Balancear Clúster
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
                Asigna instancias exactas para consumir los 17 CPU, 23 GB RAM y 21 centenas de disco.
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
                  <TableProperties className="w-3.5 h-3.5 text-amber-400" /> Misión 2: Cramer & det(A)
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
                Verifica que det(A) = 16 ≠ 0 confirmando la solución única (x, y, z) = (5, 4, 3).
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
                  <KeyRound className="w-3.5 h-3.5 text-teal-400" /> Misión 3: Cifrado Hill
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
                Cifra el término de seguridad "NUBE" con la clave K obteniendo el criptograma "IPOR".
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 1: Dimensionamiento de Servidores (Sistema Ax = b)    */}
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
              <li>Mueve los deslizadores para calibrar: <strong>Instancias Web (x) = 5</strong>, <strong>Base de Datos (y) = 4</strong> y <strong>Caché (z) = 3</strong>.</li>
              <li>Observa cómo las barras de consumo de <strong>CPU (17 núcleos)</strong>, <strong>RAM (23 GB)</strong> y <strong>Disco (2100 GB)</strong> alcanzan exactamente el 100% de uso.</li>
              <li>Si te pasas o te quedas corto, el clúster reportará desbalance de recursos.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Server className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 1: Asignación de Recursos de Cómputo (Sistema 3 × 3)
              </h3>
              <p className="text-xs text-slate-400">
                Modelo lineal de requerimientos: 2x + y + z = 17, x + 3y + 2z = 23, x + y + 4z = 21.
              </p>
            </div>

            <button
              onClick={() => {
                setInstanciasWeb(5);
                setInstanciasDB(4);
                setInstanciasCache(3);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Calibrar Solución Óptima (5, 4, 3)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Sliders */}
            <div className="lg:col-span-6 space-y-4">
              {/* Slider 1: Web */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-cyan-400" /> Instancias Servidor Web (x):
                  </span>
                  <span className="font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    x = {instanciasWeb} servidores
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={instanciasWeb}
                  onChange={(e) => setInstanciasWeb(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 instancias</span>
                  <span>Consumo: 2 CPU, 1 RAM, 1 Disco c/u</span>
                  <span>10 máx</span>
                </div>
              </div>

              {/* Slider 2: DB */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-400" /> Instancias Base de Datos (y):
                  </span>
                  <span className="font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    y = {instanciasDB} servidores
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={instanciasDB}
                  onChange={(e) => setInstanciasDB(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 instancias</span>
                  <span>Consumo: 1 CPU, 3 RAM, 1 Disco c/u</span>
                  <span>10 máx</span>
                </div>
              </div>

              {/* Slider 3: Cache */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-amber-400" /> Instancias Memoria Caché (z):
                  </span>
                  <span className="font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    z = {instanciasCache} servidores
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={instanciasCache}
                  onChange={(e) => setInstanciasCache(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0 instancias</span>
                  <span>Consumo: 1 CPU, 2 RAM, 4 Disco c/u</span>
                  <span>10 máx</span>
                </div>
              </div>
            </div>

            {/* Gauges & Resource Consumption Status */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-xl bg-black/50 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                    Balance de Recursos del Clúster
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-black ${
                    isClusterBalanced ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-red-500/20 text-red-300 border border-red-500/30"
                  }`}>
                    {isClusterBalanced ? "100% de Capacidad Asignada" : "Desbalance Detectado"}
                  </span>
                </div>

                {/* Progress 1: CPU */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU: 2({instanciasWeb}) + 1({instanciasDB}) + 1({instanciasCache})
                    </span>
                    <span className={consumedCPU === targetCPU ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                      {consumedCPU} / {targetCPU} núcleos ({Math.round((consumedCPU / targetCPU) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${consumedCPU === targetCPU ? "bg-emerald-400" : consumedCPU > targetCPU ? "bg-red-500" : "bg-cyan-400"}`}
                      style={{ width: `${Math.min(100, (consumedCPU / targetCPU) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Progress 2: RAM */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" /> RAM: 1({instanciasWeb}) + 3({instanciasDB}) + 2({instanciasCache})
                    </span>
                    <span className={consumedRAM === targetRAM ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                      {consumedRAM} / {targetRAM} GB ({Math.round((consumedRAM / targetRAM) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${consumedRAM === targetRAM ? "bg-emerald-400" : consumedRAM > targetRAM ? "bg-red-500" : "bg-emerald-400"}`}
                      style={{ width: `${Math.min(100, (consumedRAM / targetRAM) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Progress 3: Disk */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-amber-400" /> Disco: 1({instanciasWeb}) + 1({instanciasDB}) + 4({instanciasCache})
                    </span>
                    <span className={consumedDisk === targetDisk ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                      {consumedDisk} / {targetDisk} centenas GB ({Math.round((consumedDisk / targetDisk) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-300 ${consumedDisk === targetDisk ? "bg-emerald-400" : consumedDisk > targetDisk ? "bg-red-500" : "bg-amber-400"}`}
                      style={{ width: `${Math.min(100, (consumedDisk / targetDisk) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono text-center">
                  <span className="text-slate-400 block mb-1">Estado de la Solución (x, y, z):</span>
                  <span className="text-base font-bold text-white">
                    ({instanciasWeb}, {instanciasDB}, {instanciasCache}){" "}
                    {isClusterBalanced ? (
                      <span className="text-emerald-400">✓ Solución Válida del Libro</span>
                    ) : (
                      <span className="text-amber-400">✗ Ajusta a (5, 4, 3)</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 2: Determinantes & Regla de Cramer                    */}
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
              <li>Revisa la matriz de coeficientes A del sistema de clúster.</li>
              <li>Comprueba el cálculo del determinante principal: <strong>det(A) = 16 ≠ 0</strong> (demuestra que la matriz es invertible y el sistema es compatible determinado).</li>
              <li>Examina la Regla de Cramer: x = det(A_x) / det(A) = 80 / 16 = 5, y = det(A_y) / det(A) = 64 / 16 = 4, z = det(A_z) / det(A) = 48 / 16 = 3.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <TableProperties className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 2: Evaluación Matricial y Demostración por Cramer
              </h3>
              <p className="text-xs text-slate-400">
                La Regla de Cramer calcula cada incógnita mediante el cociente $x_i = \det(A_i) / \det(A)$.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 font-bold">
                det(A) = 16 (Invertible)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Matrices Representation Card */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/40 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Binary className="w-4 h-4 text-cyan-400" />
                Matriz de Coeficientes A y Vector de Términos b
              </h4>

              <div className="flex items-center justify-center gap-4 py-2 text-sm font-mono text-center">
                {/* Matrix A */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block font-bold">Matriz A (3 × 3)</span>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 inline-block">
                    <div className="grid grid-cols-3 gap-3 text-cyan-300 font-bold">
                      <span>2</span><span>1</span><span>1</span>
                      <span>1</span><span>3</span><span>2</span>
                      <span>1</span><span>1</span><span>4</span>
                    </div>
                  </div>
                </div>

                <span className="text-slate-400 text-lg font-bold">·</span>

                {/* Vector x */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block font-bold">Incógnitas x</span>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 inline-block">
                    <div className="grid grid-cols-1 gap-1 text-white font-bold">
                      <span>x</span>
                      <span>y</span>
                      <span>z</span>
                    </div>
                  </div>
                </div>

                <span className="text-slate-400 text-lg font-bold">=</span>

                {/* Vector b */}
                <div className="space-y-1">
                  <span className="text-[11px] text-slate-400 block font-bold">Disponibles b</span>
                  <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/40 inline-block">
                    <div className="grid grid-cols-1 gap-1 text-emerald-400 font-bold">
                      <span>17</span>
                      <span>23</span>
                      <span>21</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sarrus / Laplace Expansion Breakdown */}
              <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Desarrollo por Cofactores de la Primera Fila:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  det(A) = 2 · (3 · 4 - 2 · 1) - 1 · (1 · 4 - 2 · 1) + 1 · (1 · 1 - 3 · 1)
                </p>
                <p className="text-emerald-400 font-bold">
                  det(A) = 2 · (10) - 1 · (2) + 1 · (-2) = 20 - 2 - 2 = 16
                </p>
              </div>
            </div>

            {/* Cramer Detailed Solutions */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/40 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Cálculo de Incógnitas por Regla de Cramer</span>
                <span className="text-[10px] text-cyan-400 font-mono">x_i = det(A_i) / det(A)</span>
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {/* Var X */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 block">det(A_x) = 80</span>
                  <span className="text-xs text-slate-300 font-mono">x = 80 / 16</span>
                  <strong className="text-cyan-400 text-xl font-mono block">5</strong>
                  <span className="text-[10px] text-slate-400 block">Servidores Web</span>
                </div>

                {/* Var Y */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 block">det(A_y) = 64</span>
                  <span className="text-xs text-slate-300 font-mono">y = 64 / 16</span>
                  <strong className="text-emerald-400 text-xl font-mono block">4</strong>
                  <span className="text-[10px] text-slate-400 block">Bases de Datos</span>
                </div>

                {/* Var Z */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] text-slate-400 block">det(A_z) = 48</span>
                  <span className="text-xs text-slate-300 font-mono">z = 48 / 16</span>
                  <strong className="text-amber-400 text-xl font-mono block">3</strong>
                  <span className="text-[10px] text-slate-400 block">Nodos Caché</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                Al ser det(A) = 16 ≠ 0, el teorema de Rouché–Frobenius garantiza que el sistema de asignación de recursos tiene una <strong>única solución óptima posible</strong>.
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 3: Cifrado y Descifrado de Hill                       */}
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
              <li>El equipo de seguridad transmite la palabra de configuración del clúster: <strong>NUBE</strong>.</li>
              <li>Asegúrate de que la dirección esté en <strong>Cifrar (K)</strong> y el texto sea <strong>NUBE</strong>.</li>
              <li>Comprueba cómo la multiplicación matricial en bloques de 2 letras produce el criptograma <strong>IPOR</strong>:
                <br />
                K · [13, 20] ≡ [8, 15] (mod 26) → IP
                <br />
                K · [1, 4] ≡ [14, 17] (mod 26) → OR
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <KeyRound className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 3: Criptografía Matricial (Cifrado de Hill)
              </h3>
              <p className="text-xs text-slate-400">
                Transformación lineal en el anillo Z_26: c = K · p (mod 26). Clave K = [[2, 3], [1, 4]] con det(K) = 5 (coprimo con 26).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setInputTextHill("NUBE");
                  setCipherDirection("encrypt");
                }}
                className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 transition-colors cursor-pointer border border-teal-500/30 self-start sm:self-auto font-bold"
              >
                <Check className="w-3.5 h-3.5" /> Cifrar Caso del Libro (NUBE → IPOR)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Cipher Interactive Console */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/40 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Consola de Transmisión
                </span>

                {/* Direction Toggle */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  <button
                    onClick={() => setCipherDirection("encrypt")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      cipherDirection === "encrypt" ? "bg-teal-500 text-black shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Lock className="w-3 h-3 inline mr-1" /> Cifrar (K)
                  </button>
                  <button
                    onClick={() => setCipherDirection("decrypt")}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      cipherDirection === "decrypt" ? "bg-amber-400 text-black shadow-sm" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Unlock className="w-3 h-3 inline mr-1" /> Descifrar (K⁻¹)
                  </button>
                </div>
              </div>

              {/* Text Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-mono block">
                  {cipherDirection === "encrypt" ? "Texto Plano (letras A-Z):" : "Criptograma Recibido (letras A-Z):"}
                </label>
                <input
                  type="text"
                  value={inputTextHill}
                  onChange={(e) => setInputTextHill(e.target.value.toUpperCase())}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-lg font-mono font-bold text-white uppercase tracking-widest focus:outline-none focus:border-teal-400"
                  placeholder="EJ. NUBE"
                />
              </div>

              {/* Result Output Display */}
              <div className="p-4 rounded-xl bg-black/60 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  {cipherDirection === "encrypt" ? "Mensaje Cifrado Saliente (IPOR):" : "Mensaje Descifrado Original (NUBE):"}
                </span>
                <span className="text-3xl font-black font-mono tracking-widest text-teal-400 block">
                  {hillResult.output || "---"}
                </span>
                {hillResult.output === "IPOR" && cipherDirection === "encrypt" && (
                  <span className="text-xs text-emerald-400 font-bold block pt-1">
                    ✓ Criptograma correcto según el solucionario del libro
                  </span>
                )}
              </div>
            </div>

            {/* Hill Matrix Keys & Steps Explanation */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/40 border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Parámetros de Clave & Inversa Modular</span>
                <span className="text-[10px] text-emerald-400 font-mono">det(K) = 5 ⊥ 26</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                {/* Matrix K */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold">Clave Cifrado K:</span>
                  <div className="grid grid-cols-2 gap-2 text-cyan-300 font-bold text-center">
                    <span>2</span><span>3</span>
                    <span>1</span><span>4</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block pt-1">det(K) = 8 - 3 = 5</span>
                </div>

                {/* Matrix K Inv */}
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block font-bold">Clave Descifrado K⁻¹ mod 26:</span>
                  <div className="grid grid-cols-2 gap-2 text-amber-300 font-bold text-center">
                    <span>6</span><span>15</span>
                    <span>5</span><span>16</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block pt-1">5 · 21 ≡ 1 (mod 26)</span>
                </div>
              </div>

              {/* Block Steps List */}
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 font-mono text-[11px]">
                {hillResult.steps.map((st, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900/90 border border-slate-800 flex justify-between items-center text-slate-300">
                    <span>Bloque {idx + 1}: [{st.inputBlock}] ({st.inNums.join(", ")})</span>
                    <span className="text-teal-400 font-bold">→ [{st.outputBlock}] ({st.outNums.join(", ")})</span>
                  </div>
                ))}
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
            <h3 className="text-xl font-black text-white">Validación de Solución del Capítulo 3</h3>
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
                    {guidedTourStep === 1 && "Estación 1: Balancear Clúster (5, 4, 3)"}
                    {guidedTourStep === 2 && "Estación 2: Regla de Cramer y det(A) = 16"}
                    {guidedTourStep === 3 && "Estación 3: Cifrado de Hill (NUBE → IPOR)"}
                    {guidedTourStep === 4 && "Estación 4: Enviar Solución y Recibir Puntos"}
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  {guidedTourStep === 1 && "Ajusta las instancias Web (5), DB (4) y Caché (3) para consumir el 100% de CPU, RAM y Disco."}
                  {guidedTourStep === 2 && "Revisa la formulación matricial Ax = b y el determinante det(A) = 16 que valida la solución única."}
                  {guidedTourStep === 3 && "Cifra la clave NUBE con la matriz K = [[2, 3], [1, 4]] para generar el criptograma IPOR."}
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
