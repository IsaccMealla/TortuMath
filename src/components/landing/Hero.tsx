import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Play, BookOpen, Layers, Laptop, Cpu, GraduationCap } from "lucide-react";
// @ts-ignore
import heroVideo from "../../public/heroTortuMath.mp4";

// Standard notifications for Bolivia academy
const ALERTS = [
  { id: 1, text: "✓ +Clase completada: Física (Cinemática)", type: "physics" },
  { id: 2, text: "✓ Progreso guardado de @limberth_cb", type: "success" },
  { id: 3, text: "✓ Nuevo reto de Programación: Recursividad", type: "code" },
  { id: 4, text: "✓ Proyecto Electrónica: Circuito Arduino listo", type: "electron" },
  { id: 5, text: "✓ +15 TortuPuntos ganados por menyelesaikan reto", type: "points" },
  { id: 6, text: "✓ Clase activa ahora: Álgebra Lineal en Vivo", type: "math" },
];

// Interactive items floating in background (equations and symbols)
const FLOATING_MATH_SYMBOLS = [
  { text: "E = mc²", x: "15%", y: "20%", size: "text-lg md:text-xl", speed: 0.15 },
  { text: "∫ x² dx = x³/3", x: "80%", y: "15%", size: "text-base md:text-lg", speed: 0.2 },
  { text: "V = I · R", x: "75%", y: "45%", size: "text-lg md:text-2xl", speed: 0.1 },
  { text: "a² + b² = c²", x: "10%", y: "60%", size: "text-sm md:text-base", speed: 0.25 },
  { text: "lim (x→∞) (1/x) = 0", x: "85%", y: "75%", size: "text-xs md:text-sm", speed: 0.12 },
  { text: "λ · f = c", x: "20%", y: "80%", size: "text-base md:text-lg", speed: 0.18 },
  { text: "01101001", x: "45%", y: "12%", size: "text-xs font-mono opacity-40", speed: 0.08 },
];

export default function Hero() {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cycle notifications every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % ALERTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Track cursor movement for mouse interactive parallax/float effects
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate normalized mouse positions (-30 to 30 pixels offset)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60;
      setMousePos({ x, y });
    }
  };

  return (
    <div
      id="hero-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1E293B] text-[#F8F9FA] px-4 md:px-8 py-20 select-none"
    >
      {/* BACKGROUND GRAPHICS: Video or swaying pixel park landscape fallback */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {!videoError ? (
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-100"
          />
        ) : null}

        {/* Custom High-Fidelity Swaying Pixel/Animated Park Fallback */}
        {videoError && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#111827] via-[#1E293B] to-[#0F172A] opacity-90 overflow-hidden">
            {/* Background Minimalist Bolivia City Line Silhouette */}
            <svg
              className="absolute bottom-16 right-0 left-0 w-full h-40 opacity-20 text-emerald-950"
              viewBox="0 0 1200 200"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0 200 L0 120 L40 120 L40 100 L70 100 L70 120 L120 120 L120 80 L160 80 L160 120 L220 120 L220 140 L280 140 L280 90 L320 90 L320 120 L400 120 L400 60 L450 60 L450 120 L520 120 L520 100 L560 100 L560 120 L620 120 L620 70 L680 70 L680 120 L750 120 L750 95 L800 95 L800 120 L880 120 L880 50 L940 50 L940 120 L1020 120 L1020 85 L1080 85 L1080 120 L1200 120 L1200 200 Z" />
            </svg>

            {/* Glowing moon/sun in background */}
            <div className="absolute top-20 right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/0 blur-2xl pointer-events-none" />

            {/* Animated SVG Park Scenery (The Tree, Turtle with Laptop on Grass) */}
            <div className="absolute bottom-0 inset-x-0 h-44 pointer-events-none">
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 150"
                preserveAspectRatio="none"
              >
                {/* Rolling hill ground */}
                <path
                  d="M0 110 Q250 80 500 110 T1000 110 L1000 150 L0 150 Z"
                  fill="#064e3b"
                  opacity="0.85"
                />
                <path
                  d="M0 125 Q350 100 700 125 T1000 120 L1000 150 L0 150 Z"
                  fill="#022c22"
                />

                {/* Left side swaying tree in the wind */}
                <g className="origin-bottom transform transition-transform duration-1000 animate-pulse" style={{ animationDuration: "6s" }}>
                  {/* Tree Trunk */}
                  <path d="M120 130 L125 70 L115 70 Z" fill="#78350f" />
                  {/* Foliage swaying */}
                  <circle cx="120" cy="55" r="30" fill="#047857" opacity="0.9" />
                  <circle cx="140" cy="50" r="22" fill="#059669" opacity="0.8" />
                  <circle cx="100" cy="50" r="22" fill="#065f46" opacity="0.8" />
                  {/* Little apple/flowers */}
                  <circle cx="115" cy="45" r="2" fill="#10b981" />
                  <circle cx="130" cy="58" r="2.5" fill="#f59e0b" />
                  <circle cx="105" cy="55" r="2" fill="#10b981" />
                </g>

                {/* Right side swaying tree */}
                <g className="origin-bottom transform transition-transform duration-1000 animate-pulse" style={{ animationDuration: "8s" }}>
                  {/* Tree Trunk */}
                  <path d="M850 130 L853 85 L847 85 Z" fill="#78350f" />
                  {/* Foliage */}
                  <ellipse cx="850" cy="70" rx="20" ry="25" fill="#047857" opacity="0.95" />
                  <ellipse cx="862" cy="75" rx="15" ry="18" fill="#10b981" opacity="0.8" />
                </g>
              </svg>

              {/* The Cute Mini Turtle with its Glowing Laptop on the pasture */}
              <div className="absolute bottom-3 left-[22%] md:left-[35%] flex items-end gap-3 translate-y-1">
                {/* Simple stylized SVG of turtle reading laptop */}
                {/* Cute green turtle */}
                <svg className="w-14 h-9 animate-bounce" style={{ animationDuration: "4s" }} viewBox="0 0 100 70">
                  {/* Legs */}
                  <rect x="25" y="45" width="10" height="15" rx="4" fill="#047857" />
                  <rect x="55" y="45" width="10" height="15" rx="4" fill="#047857" />
                  <rect x="35" y="45" width="8" height="12" rx="3" fill="#065f46" />
                  <rect x="65" y="45" width="8" height="12" rx="3" fill="#065f46" />
                  {/* Head */}
                  <path d="M70 30 Q85 30 85 45 Q85 52 70 48 Z" fill="#10b981" />
                  {/* Tiny Red Cap */}
                  <path d="M72 26 H82 V30 H72 Z" fill="#ef4444" />
                  {/* Eye */}
                  <circle cx="78" cy="36" r="2" fill="black" />
                  {/* Shell */}
                  <path d="M20 44 C20 20 70 20 70 44 Z" fill="#059669" stroke="#022c22" strokeWidth="2" />
                  <path d="M30 32 L40 44 M45 28 L50 44 M58 32 L60 44" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
                </svg>

                {/* Glowing Laptop */}
                <div className="relative flex items-end">
                  {/* Glow effect */}
                  <div className="absolute -top-6 -left-3 w-8 h-8 rounded-full bg-emerald-400/50 blur-md animate-pulse" />
                  {/* Laptop body */}
                  <svg className="w-7 h-5" viewBox="0 0 40 30">
                    {/* Screen panel */}
                    <rect x="15" y="4" width="20" height="14" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                    <rect x="17" y="6" width="16" height="10" fill="#34d399" opacity="0.9" />
                    {/* Keyboard panel */}
                    <path d="M5 18 L35 18 L38 24 L2 24 Z" fill="#475569" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CURSOR PROXIMITY MATH SYMBOLS */}
      {FLOATING_MATH_SYMBOLS.map((symbol, idx) => (
        <motion.div
          key={idx}
          className={`absolute text-emerald-400/25 font-mono select-none pointer-events-none hidden sm:block ${symbol.size}`}
          style={{
            left: symbol.x,
            top: symbol.y,
          }}
          animate={{
            x: mousePos.x * symbol.speed,
            y: mousePos.y * symbol.speed,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 15 }}
        >
          {symbol.text}
        </motion.div>
      ))}

      {/* HERO CONTENT PANEL */}
      <div className="relative max-w-7xl w-full z-10 flex flex-col items-end text-right mt-12 md:mt-0 md:pr-12 md:pl-0">
        
        {/* Floating live status - Bolivia Academy */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-6 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Matrículas Abiertas Gestión 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </motion.div>

        {/* Catchy headline with high typography control */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-2xl text-white mb-6 leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-right"
        >
          Aprende a tu <span className="text-emerald-400 relative">ritmo</span>.
        </motion.h1>

        {/* Polished description paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-slate-100 text-base sm:text-lg md:text-lg max-w-xl font-sans mb-10 leading-relaxed font-normal text-right drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
        >
          Clases virtuales de Matemáticas, Física, Programación y Robótica en Bolivia. Aprende en vivo desde la comodidad de tu hogar.
        </motion.p>

        {/* Double Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-end w-full sm:w-auto"
        >
          <a
            href="#materias"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-lg shadow-emerald-900/25 transform transition-all duration-300 hover:translate-y-[-2px]"
          >
            Explorar Materias
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
          </a>
          <a
            href="#laboratorio-preview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900/80 hover:bg-slate-900 border border-gray-600 hover:border-emerald-500/80 text-white font-medium rounded-xl backdrop-blur-md transition-all duration-300 shadow-lg"
          >
            Probar Laboratorio 🔬
          </a>
        </motion.div>

        {/* Features badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full mt-16 pt-8 border-t border-gray-800/40 text-xs sm:text-sm font-medium text-gray-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        >
          <div className="flex items-center gap-2 justify-end py-2 px-3 bg-slate-950/20 backdrop-blur-[2px] rounded-lg border border-white/5">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Docencia Especializada</span>
          </div>
          <div className="flex items-center gap-2 justify-end py-2 px-3 bg-slate-950/20 backdrop-blur-[2px] rounded-lg border border-white/5">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Electrónica Interactiva</span>
          </div>
          <div className="flex items-center gap-2 justify-end py-2 px-3 bg-slate-950/20 backdrop-blur-[2px] rounded-lg border border-white/5">
            <Laptop className="w-4 h-4 text-emerald-400" />
            <span>Plataforma Online 24/7</span>
          </div>
          <div className="flex items-center gap-2 justify-end py-2 px-3 bg-slate-950/20 backdrop-blur-[2px] rounded-lg border border-white/5">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Clases Personalizadas</span>
          </div>
        </motion.div>
      </div>

      {/* FLOAT ALERTS PANEL (Cíclico de Notificaciones Flotantes en la esquina baja-izquierda) */}
      <div className="absolute bottom-6 left-6 z-20 max-w-xs md:max-w-sm pointer-events-none hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAlertIndex}
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex items-center gap-3 px-4 py-3 bg-[#111827]/90 hover:bg-[#111827] border-l-4 border-emerald-500 text-[#F8F9FA] rounded-r-xl shadow-2xl backdrop-blur-lg border border-white/5"
          >
            {/* Displaying some icons dynamically based on type */}
            <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <p className="text-xs font-semibold font-sans leading-tight">
              {ALERTS[currentAlertIndex].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
