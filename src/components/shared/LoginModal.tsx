import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, LogIn, Sparkles, CheckCircle, Info, User } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, role: "student" | "admin") => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const turtleRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (turtleRef.current) {
        const rect = turtleRef.current.getBoundingClientRect();
        const turtleCenterX = rect.left + rect.width / 2;
        const turtleCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - turtleCenterX;
        const dy = e.clientY - turtleCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Maximum displacement inside the sclera (white space)
        const maxDisplacement = 2.4;

        if (distance === 0) {
          setMousePos({ x: 0, y: 0 });
        } else {
          const angle = Math.atan2(dy, dx);
          // Scale proportional to vector distance
          const displacement = Math.min(distance * 0.015, maxDisplacement);
          setMousePos({
            x: Math.cos(angle) * displacement,
            y: Math.sin(angle) * displacement,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword })
      });

      if (response.ok) {
        const data = await response.json();
        onLoginSuccess(data.email, data.role);
        onClose();
      } else {
        const errData = await response.json();
        setError(errData.error || "Credenciales incorrectas.");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con el servidor backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const autoFill = (role: "student" | "admin") => {
    if (role === "student") {
      setEmail("sofia.ramos@gmail.com");
      setPassword("student123");
    } else {
      setEmail("admin@tortumath.com");
      setPassword("admin123");
    }
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur with high contrast */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-md"
            id="login-backdrop"
          />

          {/* Modal Content container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md bg-white dark:bg-[#1E293B] border border-slate-205 dark:border-[#334155] rounded-3xl p-6 shadow-2xl overflow-hidden text-[#1E293B] dark:text-gray-150 z-10"
            id="login-modal-box"
          >
            {/* Elegant Header glow */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />

            {/* Close button with high visible hover contrast */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Minimalist Interactive Turtle Mascot */}
            <div className="flex flex-col items-center text-center mt-2 mb-5">
              <div ref={turtleRef} className="w-36 h-28 flex items-center justify-center relative mb-2 select-none">
                <motion.div
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <svg
                    width="130"
                    height="96"
                    viewBox="0 0 140 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-sm filter"
                  >
                    {/* Shadow Behind (Legs) */}
                    {/* Back-Left Leg (Shadow) */}
                    <path
                      d="M 52,56 C 51,62 49,68 49,74 L 56,74 C 57,68 57,62 58,56 Z"
                      fill="#2C4C3A"
                      stroke="#1C3025"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />
                    {/* Back-Right Leg (Shadow) */}
                    <path
                      d="M 88,52 C 91,59 92,66 92,74 L 99,74 C 100,66 97,59 93,52 Z"
                      fill="#2C4C3A"
                      stroke="#1C3025"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />

                    {/* Cute Tail */}
                    <path
                      d="M 34,53 C 26,52 24,54 22,51 C 25,48 30,50 34,50"
                      fill="#5F9474"
                      stroke="#1C3025"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Leftmost Front Leg */}
                    <path
                      d="M 37,56 C 36,62 33,68 33,74 L 41,74 C 43,68 44,62 45,56 Z"
                      fill="#5F9474"
                      stroke="#1C3025"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />

                    {/* Rightmost Front Leg */}
                    <path
                      d="M 74,53 C 77,59 79,66 79,74 L 87,74 C 89,66 87,59 82,53 Z"
                      fill="#5F9474"
                      stroke="#1C3025"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />

                    {/* Chest & Neck & Head profile sticking out beautifully to the right */}
                    <path
                      d="M 91,45 C 100,36 103,25 113,22 C 120,20 128,22 131,29 C 134,35 129,43 121,44 C 112,44 104,46 94,52 Z"
                      fill="#5F9474"
                      stroke="#1C3025"
                      strokeWidth="2.2"
                      strokeLinejoin="round"
                    />

                    {/* Interactive Eye (White base and pupil following mouse) */}
                    <circle
                      cx="119"
                      cy="31"
                      r="3.2"
                      fill="#FFFFFF"
                      stroke="#1C3025"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx={119 + mousePos.x}
                      cy={31 + mousePos.y}
                      r="1.6"
                      fill="#1C3025"
                    />
                    {/* Sparkle reflect */}
                    <circle
                      cx={119 + mousePos.x - 0.5}
                      cy={31 + mousePos.y - 0.5}
                      r="0.5"
                      fill="#FFFFFF"
                    />

                    {/* Simple encouraging smile */}
                    <path
                      d="M 116,36 Q 119,38.5 122,35.5"
                      fill="none"
                      stroke="#1C3025"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    {/* Shell Carapace dome background */}
                    <path
                      d="M 28,54 C 26,30 42,12 65,12 C 88,12 102,26 102,51 Q 65,55 28,54 Z"
                      fill="#5F9474"
                      stroke="#1C3025"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />

                    {/* Geometric Hexagonal plates tiling inside Carapace */}
                    {/* Left Hex */}
                    <polygon
                      points="41,26 56,24 51,33 56,42 41,42 36,33"
                      fill="#6E9E82"
                      stroke="#1C3025"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    {/* Middle Hex */}
                    <polygon
                      points="56,24 68,24 73,33 68,42 56,42 51,33"
                      fill="#6E9E82"
                      stroke="#1C3025"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    {/* Right Hex */}
                    <polygon
                      points="68,24 83,26 88,33 83,42 68,42 73,33"
                      fill="#6E9E82"
                      stroke="#1C3025"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />

                    {/* Mosaic radiating connection lines to outer shell edge */}
                    <line x1="62" y1="24" x2="65" y2="12" stroke="#1C3025" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="41" y1="26" x2="42" y2="17" stroke="#1C3025" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="83" y1="26" x2="84" y2="17" stroke="#1C3025" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="36" y1="33" x2="28" y2="38" stroke="#1C3025" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="88" y1="33" x2="99" y2="38" stroke="#1C3025" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="41" y1="42" x2="34" y2="53" stroke="#1C3025" strokeWidth="1.8" />
                    <line x1="56" y1="42" x2="54" y2="54" stroke="#1C3025" strokeWidth="1.8" />
                    <line x1="68" y1="42" x2="71" y2="54" stroke="#1C3025" strokeWidth="1.8" />
                    <line x1="83" y1="42" x2="90" y2="53" stroke="#1C3025" strokeWidth="1.8" />

                    {/* Mathematical icons in the hex centers */}
                    {/* √ Symbol (Left Hex) */}
                    <path
                      d="M 43,35 H 45 L 47,38 L 51,31 H 54"
                      fill="none"
                      stroke="#223B2F"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* ∑ Symbol (Middle Hex) */}
                    <path
                      d="M 65,30 H 60 L 63,33 L 60,36 H 65"
                      fill="none"
                      stroke="#223B2F"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* π Symbol (Right Hex) */}
                    <path
                      d="M 73,31 H 81 M 75,31 V 36 Q 75,37 74,37 M 79,31 V 36"
                      fill="none"
                      stroke="#223B2F"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                
                {/* Floating academic tiny hat banner */}
                <span className="absolute -top-1 font-sans text-[11px] font-black uppercase text-white bg-gradient-to-r from-emerald-500 to-emerald-600 px-2 py-0.5 rounded-full shadow-md select-none border border-emerald-300 dark:border-emerald-500 scale-90">
                  🐢 TortuMath
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Iniciar Sesión en TortuMath
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Acceso exclusivo para Alumnos Registrados y Panel de Administración
              </p>
            </div>

            {/* Quick Credentials Helpers for Fast Testing */}
            <div className="mb-5 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
              <span className="font-extrabold text-slate-800 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-450" />
                Acceso Rápido de Prueba (Haz clic para auto-completar):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => autoFill("student")}
                  className="px-2.5 py-2 text-left rounded-xl bg-white dark:bg-slate-850 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-slate-800 font-bold transition-all text-slate-705 dark:text-slate-300 cursor-pointer active:scale-95"
                >
                  <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase">Estudiante</span>
                  <span className="block text-[9.5px] truncate font-mono mt-0.5 opacity-80">sofia.ramos@gmail.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => autoFill("admin")}
                  className="px-2.5 py-2 text-left rounded-xl bg-white dark:bg-slate-850 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-slate-800 font-bold transition-all text-slate-705 dark:text-slate-300 cursor-pointer active:scale-95"
                >
                  <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase">Administrador</span>
                  <span className="block text-[9.5px] truncate font-mono mt-0.5 opacity-80">admin@tortumath.com</span>
                </button>
              </div>
            </div>

            {/* Error alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-900/50 rounded-xl text-xs font-bold text-red-800 dark:text-red-400"
              >
                {error}
              </motion.div>
            )}

            {/* Input Form with high contrast & explicit visible focus states */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Usuario block */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-sans">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ej: sofia.ramos"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm rounded-2xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Password block */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-sans">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Lock className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-sm rounded-2xl border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-slate-400 dark:placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 mt-2 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isLoading
                    ? "bg-slate-600 cursor-not-allowed opacity-80"
                    : "bg-emerald-650 hover:bg-emerald-500 hover:shadow-emerald-900/10 active:scale-98"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Validando...</span>
                  </div>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Ingresar al Sistema</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
