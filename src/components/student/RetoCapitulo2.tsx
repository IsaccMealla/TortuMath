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
  Network,
  Binary,
  KeyRound,
  Hash,
  Share2,
  Workflow,
  Lock,
  Unlock,
  AlertCircle,
  Clock,
  Server,
  Activity,
  Maximize2
} from "lucide-react";
import Logo from "../shared/Logo";

export interface RetoCapitulo2Props {
  onBack?: () => void;
  userEmail?: string;
  studentId?: string;
  studentName?: string;
  initialTheme?: "tortuga" | "matrix" | "cyber";
  onSuccessCompletion?: (points: number) => void;
}

// Nodes for the network graph simulator
interface NetworkNode {
  id: string;
  label: string;
  type: "router" | "switch" | "server" | "database" | "firewall";
  x: number;
  y: number;
}

interface NetworkEdge {
  id: string;
  from: string;
  to: string;
  latency: number; // weight in ms
  active: boolean;
}

const INITIAL_NODES: NetworkNode[] = [
  { id: "A", label: "Servidor Web A", type: "server", x: 60, y: 150 },
  { id: "B", label: "Router B", type: "router", x: 190, y: 70 },
  { id: "C", label: "Switch C (Core)", type: "switch", x: 200, y: 230 },
  { id: "D", label: "Base de Datos D", type: "database", x: 340, y: 150 },
];

const INITIAL_EDGES: NetworkEdge[] = [
  { id: "AB", from: "A", to: "B", latency: 5, active: true },
  { id: "AC", from: "A", to: "C", latency: 3, active: true },
  { id: "BC", from: "B", to: "C", latency: 4, active: true },
  { id: "CD", from: "C", to: "D", latency: 6, active: true },
];

export default function RetoCapitulo2({
  onBack,
  userEmail = "sofia.ramos@gmail.com",
  studentId = "STU-001",
  studentName = "Sofía Ramos Ortiz",
  initialTheme = "tortuga",
  onSuccessCompletion
}: RetoCapitulo2Props) {
  // 1. Theme Configuration
  const [theme, setTheme] = useState<"tortuga" | "matrix" | "cyber">(() => {
    return (localStorage.getItem("tortumath_student_theme") as any) || initialTheme;
  });

  // Guided Tour Mode State (1: Conteo, 2: Cripto/Modular, 3: Grafos, 4: Enviar)
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
  // STATION 1: Principios de Conteo & Espacio de Búsqueda
  // -------------------------------------------------------------
  const [numNavs, setNumNavs] = useState<number>(4); // Navegadores (ej. 4)
  const [numSO, setNumSO] = useState<number>(2);     // Sistemas Operativos (ej. 2)
  const [numPerfiles, setNumPerfiles] = useState<number>(3); // Perfiles de usuario (ej. 3)

  // Password / Security space search
  const [pwdLength, setPwdLength] = useState<number>(4); // Digits length
  const [charSetSize, setCharSetSize] = useState<number>(10); // 10 decimal digits

  // Test combinations: N = navs · SO · perfiles
  const totalTestConfigs = useMemo(() => {
    return numNavs * numSO * numPerfiles;
  }, [numNavs, numSO, numPerfiles]);

  // Keyspace size: N = |Sigma|^L
  const searchSpaceSize = useMemo(() => {
    return Math.pow(charSetSize, pwdLength);
  }, [charSetSize, pwdLength]);

  // Combinatorics nCr and nPr
  const [combinatoricsN, setCombinatoricsN] = useState<number>(5);
  const [combinatoricsR, setCombinatoricsR] = useState<number>(3);

  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const permutationsCount = useMemo(() => {
    if (combinatoricsR > combinatoricsN) return 0;
    return factorial(combinatoricsN) / factorial(combinatoricsN - combinatoricsR);
  }, [combinatoricsN, combinatoricsR]);

  const combinationsCount = useMemo(() => {
    if (combinatoricsR > combinatoricsN) return 0;
    return factorial(combinatoricsN) / (factorial(combinatoricsR) * factorial(combinatoricsN - combinatoricsR));
  }, [combinatoricsN, combinatoricsR]);

  // -------------------------------------------------------------
  // STATION 2: Aritmética Modular & Criptografía (RSA Toy Key + Circular Counter)
  // -------------------------------------------------------------
  // Prime numbers p and q
  const [primeP, setPrimeP] = useState<number>(5);
  const [primeQ, setPrimeQ] = useState<number>(11);

  const modulusN = useMemo(() => primeP * primeQ, [primeP, primeQ]); // n = p · q
  const eulerTotient = useMemo(() => (primeP - 1) * (primeQ - 1), [primeP, primeQ]); // phi(n) = (p-1)(q-1)

  // Circular modulo counter: state x_new = (x + step) mod m
  const [counterModulus, setCounterModulus] = useState<number>(16);
  const [counterInitial, setCounterInitial] = useState<number>(13);
  const [counterSteps, setCounterSteps] = useState<number>(7);

  const counterFinalState = useMemo(() => {
    return (counterInitial + counterSteps) % counterModulus;
  }, [counterInitial, counterSteps, counterModulus]);

  // Greatest Common Divisor (Euclidean algorithm step by step)
  const [gcdA, setGcdA] = useState<number>(48);
  const [gcdB, setGcdB] = useState<number>(18);

  const euclideanSteps = useMemo(() => {
    let a = Math.max(gcdA, gcdB);
    let b = Math.min(gcdA, gcdB);
    const steps: { dividend: number; divisor: number; quotient: number; remainder: number }[] = [];
    
    if (b <= 0) return { result: a, steps };

    while (b > 0) {
      const q = Math.floor(a / b);
      const r = a % b;
      steps.push({ dividend: a, divisor: b, quotient: q, remainder: r });
      a = b;
      b = r;
    }
    return { result: a, steps };
  }, [gcdA, gcdB]);

  // -------------------------------------------------------------
  // STATION 3: Topología de Redes & Teoría de Grafos
  // -------------------------------------------------------------
  const [networkEdges, setNetworkEdges] = useState<NetworkEdge[]>(INITIAL_EDGES);
  const [selectedRouteTarget, setSelectedRouteTarget] = useState<"D" | "B" | "C">("D");

  // Toggle link status (simulate link failure)
  const toggleEdge = (edgeId: string) => {
    setNetworkEdges((prev) =>
      prev.map((edge) => (edge.id === edgeId ? { ...edge, active: !edge.active } : edge))
    );
  };

  // Node degrees calculation
  const nodeDegrees = useMemo(() => {
    const degrees: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    networkEdges.forEach((edge) => {
      if (edge.active) {
        degrees[edge.from] = (degrees[edge.from] || 0) + 1;
        degrees[edge.to] = (degrees[edge.to] || 0) + 1;
      }
    });
    return degrees;
  }, [networkEdges]);

  // Reachability analysis from A to D using BFS
  const reachabilityFromA = useMemo(() => {
    const visited = new Set<string>(["A"]);
    const queue = ["A"];

    while (queue.length > 0) {
      const current = queue.shift()!;
      networkEdges.forEach((edge) => {
        if (!edge.active) return;
        let neighbor: string | null = null;
        if (edge.from === current) neighbor = edge.to;
        if (edge.to === current) neighbor = edge.from;

        if (neighbor && !visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return {
      canReachD: visited.has("D"),
      canReachB: visited.has("B"),
      canReachC: visited.has("C"),
      visitedNodes: Array.from(visited),
    };
  }, [networkEdges]);

  // Is node D isolated? (Case integrador: failure of CD)
  const isDIsolated = !reachabilityFromA.canReachD;

  // -------------------------------------------------------------
  // 4. MEASURABLE CHALLENGE MISSIONS (3 Tasks)
  // -------------------------------------------------------------
  // Misión 1: Configurar el espacio de pruebas a exactamente 24 combinaciones (N = 3 · 2 · 4 o 4 · 2 · 3)
  const mission1Completed = totalTestConfigs === 24;

  // Misión 2: Calcular el módulo cíclico con estado inicial 13, salto de 7 en módulo 16 -> resultado = 4
  const mission2Completed = counterModulus === 16 && counterInitial === 13 && counterSteps === 7 && counterFinalState === 4;

  // Misión 3: En el grafo de red, simular el aislamiento del nodo crítico D desactivando el enlace C-D
  const edgeCD = networkEdges.find((e) => e.id === "CD");
  const mission3Completed = edgeCD !== undefined && !edgeCD.active && isDIsolated;

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
      const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
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
      id: `QR-CAP2-${Date.now()}`,
      studentId: studentId,
      quizTitle: "Reto Libro Cap. 2: Matemática Discreta (Conteo, Modular & Grafos)",
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
      showToast("¡Reto del Capítulo 2 verificado y completado! +50 TortuPuntos otorgados y racha de estudio incrementada.", "success");

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
            <span>Reto del Libro — Capítulo 2</span>
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

        {/* Hero Banner for Chapter 2 */}
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
              Capítulo 2: <span className={`bg-gradient-to-r ${themeStyles.titleGradient} bg-clip-text text-transparent`}>Matemática Discreta</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Laboratorio interactivo sincronizado con el libro impreso. Aplica los principios de conteo, 
              aritmética modular y teoría de grafos en escenarios reales de ciberseguridad, pruebas de software y topología de redes.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Estudiante: <strong>{studentName}</strong> ({studentId})</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/5">
                <Network className="w-4 h-4 text-cyan-400" />
                <span>Conteo • Aritmética Modular • Grafos de Servidores</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
            <Network className="w-80 h-80 text-white" />
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
                <p className="text-xs text-slate-400">Completa las 3 tareas del libro para desbloquear la validación y obtener tus puntos:</p>
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
                  <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Misión 1: Espacio de Pruebas
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
                Ajusta las variables de prueba para obtener un total de N = 24 configuraciones posibles.
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
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Misión 2: Contador Modular
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
                Configura el contador m = 16 en estado 13 con 7 saltos: (13 + 7) mod 16 = 4.
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
                  <Network className="w-3.5 h-3.5 text-teal-400" /> Misión 3: Enlace Crítico
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
                Desactiva el enlace C-D para aislar el nodo de Base de Datos D y verificar la vulnerabilidad.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 1: Principios de Conteo & Espacio de Búsqueda         */}
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
              <li>Configura los controles del <strong>Principio Multiplicativo</strong>: Navegadores = 4, Sistemas Operativos = 2, Perfiles de Usuario = 3 (o la combinación 3 · 2 · 4).</li>
              <li>Observa cómo se calcula automáticamente el espacio total de combinaciones: <strong>N = 4 · 2 · 3 = 24</strong>.</li>
              <li>Comprueba el espacio de búsqueda criptográfico y cómo varía según la longitud de caracteres.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Calculator className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 1: Principios de Conteo y Espacios de Prueba
              </h3>
              <p className="text-xs text-slate-400">
                Cálculo del número total de casos de prueba mediante el Principio Multiplicativo: N = n₁ · n₂ · ··· · nₖ
              </p>
            </div>

            <button
              onClick={() => {
                setNumNavs(4);
                setNumSO(2);
                setNumPerfiles(3);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Calibrar N = 24 Automáticamente
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-4">
              {/* Slider 1: Browsers */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-cyan-400" /> Navegadores Compatibles (n₁):
                  </span>
                  <span className="font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    {numNavs} navegadores
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={numNavs}
                  onChange={(e) => setNumNavs(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 (Chrome)</span>
                  <span>4 (Chrome, Firefox, Safari, Edge)</span>
                  <span>6 opciones</span>
                </div>
              </div>

              {/* Slider 2: OS */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-emerald-400" /> Sistemas Operativos (n₂):
                  </span>
                  <span className="font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {numSO} SOs
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={numSO}
                  onChange={(e) => setNumSO(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 (Linux)</span>
                  <span>2 (Linux, Windows)</span>
                  <span>4 plataformas</span>
                </div>
              </div>

              {/* Slider 3: Profiles */}
              <div className="p-4 rounded-xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-amber-400" /> Perfiles de Usuario (n₃):
                  </span>
                  <span className="font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {numPerfiles} perfiles
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={numPerfiles}
                  onChange={(e) => setNumPerfiles(Number(e.target.value))}
                  className={`w-full h-2 rounded-lg bg-slate-800 ${themeStyles.sliderAccent} cursor-pointer`}
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 (Admin)</span>
                  <span>3 (Admin, Operador, Auditor)</span>
                  <span>5 perfiles</span>
                </div>
              </div>
            </div>

            {/* Calculations & Results Display */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-xl bg-black/50 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                    Fórmula de Conteo Aplicada
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-black ${
                    totalTestConfigs === 24 ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-slate-800 text-slate-400"
                  }`}>
                    {totalTestConfigs === 24 ? "Misión 1 Completada (N = 24)" : "Ajusta a 24"}
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-center">
                  <span className="text-xs text-slate-400 block mb-1">N = n₁ · n₂ · n₃</span>
                  <span className="text-2xl font-black text-white">
                    {numNavs} · {numSO} · {numPerfiles} ={" "}
                    <strong className={totalTestConfigs === 24 ? "text-emerald-400" : "text-cyan-400"}>
                      {totalTestConfigs}
                    </strong>{" "}
                    <span className="text-sm font-normal text-slate-300">casos posibles</span>
                  </span>
                </div>

                {/* Search Space in Cybersecurity */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300 flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      Espacio de Búsqueda Clave (N = 10ᴸ):
                    </span>
                    <span className="font-mono text-amber-300 font-bold">
                      L = {pwdLength} dígitos → {searchSpaceSize.toLocaleString()} claves
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    step="1"
                    value={pwdLength}
                    onChange={(e) => setPwdLength(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-slate-800 accent-amber-400 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Un PIN de 4 dígitos admite 10⁴ = 10,000 combinaciones posibles sin bloqueo.
                  </p>
                </div>

                {/* Combinations vs Permutations Preview */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Permutaciones P(5,3) [Importa el orden]:</span>
                    <span className="font-mono text-emerald-400 font-bold">{permutationsCount} órdenes</span>
                  </div>
                  <div className="flex justify-between text-slate-300 font-semibold">
                    <span>Combinaciones C(5,3) [Sin importar orden]:</span>
                    <span className="font-mono text-cyan-400 font-bold">{combinationsCount} grupos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 2: Aritmética Modular & Teoría de Números (Euclides)  */}
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
              <li>En el <strong>Contador Modular Digital</strong>, establece el módulo: <strong>m = 16</strong>.</li>
              <li>Ajusta el <strong>Estado Inicial</strong> en <strong>13</strong> y los <strong>Pasos / Incrementos</strong> en <strong>7</strong>.</li>
              <li>Comprueba que la fórmula cíclica resuelva: <strong>(13 + 7) mod 16 = 20 mod 16 = 4</strong> (el estado final marcado debe ser 4).</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Clock className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 2: Aritmética Modular, Algoritmo de Euclides & Criptografía
              </h3>
              <p className="text-xs text-slate-400">
                La congruencia a ≡ b (mod m) modela contadores cíclicos de hardware, buffers circulares y operaciones criptográficas tipo RSA.
              </p>
            </div>

            <button
              onClick={() => {
                setCounterModulus(16);
                setCounterInitial(13);
                setCounterSteps(7);
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors cursor-pointer border border-amber-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Calibrar Ejercicio del Libro (13 + 7 mod 16)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Circular Counter Interactive Widget */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-cyan-400" />
                  Simulador de Contador Cíclico: x_nuevo = (x + incremento) mod m
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Módulo (m):</label>
                    <select
                      value={counterModulus}
                      onChange={(e) => setCounterModulus(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value={8}>m = 8 (Octal / 3 bits)</option>
                      <option value={10}>m = 10 (Decimal)</option>
                      <option value={12}>m = 12 (Horario)</option>
                      <option value={16}>m = 16 (Hexadecimal / 4 bits)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Estado Inicial (x):</label>
                    <input
                      type="number"
                      min="0"
                      max={counterModulus - 1}
                      value={counterInitial}
                      onChange={(e) => setCounterInitial(Math.min(counterModulus - 1, Math.max(0, Number(e.target.value))))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Saltos / Pasos:</label>
                    <input
                      type="number"
                      min="1"
                      max="32"
                      value={counterSteps}
                      onChange={(e) => setCounterSteps(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                {/* Circular Dial Visual Representation */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5 justify-center py-3 px-2 rounded-xl bg-black/60 border border-slate-800">
                    {Array.from({ length: counterModulus }).map((_, idx) => {
                      const isCurrent = idx === counterFinalState;
                      const isStart = idx === counterInitial;
                      return (
                        <div
                          key={idx}
                          className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-mono font-bold transition-all ${
                            isCurrent
                              ? "bg-amber-400 text-black ring-2 ring-amber-300 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                              : isStart
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400"
                              : "bg-slate-900 text-slate-400 border border-slate-800"
                          }`}
                        >
                          <span>{idx}</span>
                          <span className="text-[8px] opacity-70">
                            {isCurrent ? "FIN" : isStart ? "INI" : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Formula breakdown */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center text-xs">
                  <span className="text-slate-400">Cálculo en vivo: </span>
                  <span className="text-white font-bold">
                    ({counterInitial} + {counterSteps}) mod {counterModulus} = {counterInitial + counterSteps} mod {counterModulus} ={" "}
                  </span>
                  <strong className="text-amber-400 text-sm">{counterFinalState}</strong>
                </div>
              </div>
            </div>

            {/* Euclidean GCD Algorithm & RSA Toy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Binary className="w-4 h-4 text-emerald-400" />
                  Algoritmo de Euclides: MCD({gcdA}, {gcdB})
                </h4>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block">Número A:</label>
                    <input
                      type="number"
                      value={gcdA}
                      onChange={(e) => setGcdA(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs font-mono text-white"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-slate-400 block">Número B:</label>
                    <input
                      type="number"
                      value={gcdB}
                      onChange={(e) => setGcdB(Math.max(1, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs font-mono text-white"
                    />
                  </div>
                </div>

                {/* Euclidean Division Steps List */}
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1 font-mono text-[11px]">
                  {euclideanSteps.steps.map((step, idx) => (
                    <div key={idx} className="p-1.5 rounded bg-slate-900/90 border border-slate-800 flex justify-between text-slate-300">
                      <span>
                        {step.dividend} = {step.quotient} · ({step.divisor}) + <strong className="text-emerald-400">{step.remainder}</strong>
                      </span>
                      <span className="text-slate-500 text-[10px]">Paso {idx + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-xs flex justify-between items-center">
                  <span className="text-emerald-300 font-bold">Máximo Común Divisor:</span>
                  <span className="font-mono text-emerald-400 font-black text-sm">
                    MCD({gcdA}, {gcdB}) = {euclideanSteps.result}
                  </span>
                </div>

                {/* Toy RSA Key Generation */}
                <div className="pt-2 border-t border-slate-800/80 text-[11px] space-y-1">
                  <span className="text-slate-400 block font-bold">Parámetros Criptográficos Didácticos (RSA):</span>
                  <div className="flex justify-between font-mono text-slate-300">
                    <span>Primos p = 5, q = 11</span>
                    <span className="text-cyan-400">n = p · q = {modulusN}</span>
                  </div>
                  <div className="flex justify-between font-mono text-slate-300">
                    <span>Función de Euler φ(n) = (5-1)(11-1)</span>
                    <span className="text-cyan-400">φ(n) = {eulerTotient}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* ESTACIÓN 3: Topología de Redes & Grafos (Caso Integrador)       */}
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
              <li>Observa el grafo de 4 servidores: <strong>A</strong> (Web), <strong>B</strong> (Router), <strong>C</strong> (Switch Core) y <strong>D</strong> (Base de Datos).</li>
              <li>Haz clic en el enlace <strong>C — D</strong> en la lista de conexiones para desactivarlo (simulando corte de fibra o caída de enlace).</li>
              <li>Verifica que el <strong>Servidor D quede en estado AISLADO</strong>, demostrando el punto de falla único analizado en el libro.</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
            <div className="space-y-0.5">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Network className={`w-5 h-5 ${themeStyles.accentText}`} />
                Estación 3: Análisis de Topología de Redes & Grafos G = (V, E)
              </h3>
              <p className="text-xs text-slate-400">
                Caso integrador del libro: cuatro servidores conectados mediante aristas bidireccionales con grado y análisis de conectividad.
              </p>
            </div>

            <button
              onClick={() => {
                setNetworkEdges(
                  INITIAL_EDGES.map((edge) => (edge.id === "CD" ? { ...edge, active: false } : { ...edge, active: true }))
                );
              }}
              className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 transition-colors cursor-pointer border border-teal-500/30 self-start sm:self-auto font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Simular Caída Enlace C-D (Aislar D)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Interactive Graph Canvas / SVG Visualizer */}
            <div className="lg:col-span-7 p-5 rounded-xl bg-black/50 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-400" />
                  Topología de Servidores G = (V, E)
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  reachabilityFromA.canReachD
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/40"
                }`}>
                  {reachabilityFromA.canReachD ? "Ruta A → D Operativa" : "Alerta: Servidor D Inaccesible"}
                </span>
              </div>

              {/* SVG Canvas for nodes and edges */}
              <div className="relative w-full h-64 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  {/* Edges */}
                  {networkEdges.map((edge) => {
                    const fromNode = INITIAL_NODES.find((n) => n.id === edge.from)!;
                    const toNode = INITIAL_NODES.find((n) => n.id === edge.to)!;
                    return (
                      <g key={edge.id} className="cursor-pointer" onClick={() => toggleEdge(edge.id)}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke={edge.active ? (edge.id === "CD" ? "#14B8A6" : "#0EA5E9") : "#ef4444"}
                          strokeWidth={edge.active ? 3 : 2}
                          strokeDasharray={edge.active ? "none" : "5,5"}
                          className="transition-all"
                        />
                        {/* Edge Latency Label Pill */}
                        <rect
                          x={(fromNode.x + toNode.x) / 2 - 14}
                          y={(fromNode.y + toNode.y) / 2 - 9}
                          width={28}
                          height={18}
                          rx={4}
                          fill={edge.active ? "#0f172a" : "#450a0a"}
                          stroke={edge.active ? "#38bdf8" : "#f87171"}
                          strokeWidth={1}
                        />
                        <text
                          x={(fromNode.x + toNode.x) / 2}
                          y={(fromNode.y + toNode.y) / 2 + 4}
                          textAnchor="middle"
                          fill={edge.active ? "#e2e8f0" : "#fca5a5"}
                          fontSize={10}
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {edge.latency}ms
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {INITIAL_NODES.map((node) => {
                    const isReachable = node.id === "A" || reachabilityFromA.visitedNodes.includes(node.id);
                    return (
                      <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <circle
                          r={22}
                          fill={isReachable ? "#042f2e" : "#450a0a"}
                          stroke={isReachable ? "#10b981" : "#ef4444"}
                          strokeWidth={3}
                          className="transition-all"
                        />
                        <text
                          y={4}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={13}
                          fontWeight="900"
                          fontFamily="monospace"
                        >
                          {node.id}
                        </text>
                        {/* Node Label Below */}
                        <text
                          y={34}
                          textAnchor="middle"
                          fill={isReachable ? "#94a3b8" : "#f87171"}
                          fontSize={9}
                          fontWeight="bold"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
                <span>Haz clic sobre cualquier arista para conectar o desconectar el enlace.</span>
                <button
                  onClick={() => setNetworkEdges(INITIAL_EDGES)}
                  className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Restaurar enlaces
                </button>
              </div>
            </div>

            {/* Nodes Degrees and Path Analysis Table */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-xl bg-black/40 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Grados de los Vértices deg(v)</span>
                  <span className="text-emerald-400 font-mono">Servidor C = Core</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Servidor Web A:</span>
                    <strong className="text-white text-sm">deg(A) = {nodeDegrees.A}</strong>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Router B:</span>
                    <strong className="text-white text-sm">deg(B) = {nodeDegrees.B}</strong>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 border border-cyan-500/30">
                    <span className="text-cyan-400 block text-[10px]">Switch Central C:</span>
                    <strong className="text-cyan-300 text-sm">deg(C) = {nodeDegrees.C} (Máximo)</strong>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    nodeDegrees.D === 0 ? "bg-red-950/40 border-red-500/50 text-red-300" : "bg-slate-900 border-slate-800 text-white"
                  }`}>
                    <span className="text-slate-400 block text-[10px]">Base de Datos D:</span>
                    <strong className="text-sm">deg(D) = {nodeDegrees.D} {nodeDegrees.D === 0 ? "(Aislado)" : ""}</strong>
                  </div>
                </div>

                {/* Connectivity Questions from textbook */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
                  <span className="font-bold text-slate-300 block">Preguntas de Validación del Caso:</span>
                  
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">¿Existe camino entre A y D?</span>
                    <span className={`font-bold ${reachabilityFromA.canReachD ? "text-emerald-400" : "text-red-400"}`}>
                      {reachabilityFromA.canReachD ? "Sí: A → C → D (o A → B → C → D)" : "No existe camino (D está aislado)"}
                    </span>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">¿Qué sucede si falla el enlace (C, D)?</span>
                    <span className="text-slate-200">
                      El servidor D queda completamente incomunicado porque su única conexión depende de C.
                    </span>
                  </div>
                </div>
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
            <h3 className="text-xl font-black text-white">Validación de Solución del Capítulo 2</h3>
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
                    {guidedTourStep === 1 && "Estación 1: Principio Multiplicativo (N = 24)"}
                    {guidedTourStep === 2 && "Estación 2: Contador Modular (13 + 7 mod 16 = 4)"}
                    {guidedTourStep === 3 && "Estación 3: Corte de Enlace Crítico C-D y Aislamiento"}
                    {guidedTourStep === 4 && "Estación 4: Enviar Solución y Recibir Puntos"}
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  {guidedTourStep === 1 && "El recuadro resaltado te indica ajustar Navegadores (4), SO (2) y Perfiles (3) para lograr N = 24."}
                  {guidedTourStep === 2 && "Ajusta el contador a m = 16, estado 13 con 7 saltos para obtener residuo 4."}
                  {guidedTourStep === 3 && "Haz clic en el enlace C-D para aislar el nodo de Base de Datos D."}
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

