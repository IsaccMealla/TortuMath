import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, RotateCcw, Search, Download, CheckCircle, 
  XCircle, FileText, ChevronRight, Sparkles, BookOpen, 
  HelpCircle, Laptop, ArrowRight 
} from "lucide-react";

// Types for Library Section
interface PDFFile {
  title: string;
  category: "Matemáticas" | "Física" | "Programación" | "Electrónica";
  size: string;
}

const PDF_DATA: PDFFile[] = [
  { title: "Matemáticas - Formulario Completo de Derivadas", category: "Matemáticas", size: "1.2 MB" },
  { title: "Física - 50 Problemas Resueltos de Cinemática", category: "Física", size: "3.5 MB" },
  { title: "Programación - Algoritmos de Búsqueda en Python", category: "Programación", size: "950 KB" },
  { title: "Electrónica - Guía de Prototipado con Arduino", category: "Electrónica", size: "4.1 MB" },
  { title: "Matemáticas - Álgebra Lineal y Matrices", category: "Matemáticas", size: "2.1 MB" },
  { title: "Física - Dinámica de Partículas y Fuerzas", category: "Física", size: "1.8 MB" }
];

export default function DashboardPreview() {
  // 1. STATE FOR MINI-QUIZ
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // 2. STATE FOR PDF LIBRARY
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState<string | null>(null);

  // 3. STATE FOR PROJECTILE SIMULATOR
  const [launchAngle, setLaunchAngle] = useState(45);
  const [isLaunching, setIsLaunching] = useState(false);
  const [projectilePos, setProjectilePos] = useState({ x: 30, y: 190 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  
  // Animation loop ref
  const animationRef = useRef<number | null>(null);

  // Reset Quiz
  const handleResetQuiz = () => {
    setSelectedQuizOption(null);
    setQuizAnswered(false);
  };

  // Handle PDF Download Simulation
  const startDownload = (title: string) => {
    if (downloadingFile) return;
    setDownloadingFile(title);
    setDownloadProgress(0);
    setDownloadCompleted(null);
  };

  useEffect(() => {
    if (downloadingFile !== null) {
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setDownloadCompleted(downloadingFile);
              setDownloadingFile(null);
            }, 300);
            return 100;
          }
          return prev + 10;
        });
      }, 120);
      return () => clearInterval(interval);
    }
  }, [downloadingFile]);

  // Projectile Motion physics path calculation
  // Canvas represents 320x220 coordinate system
  // Bottom ground at y=190, Launch starting at (30, 190)
  const getTrajectoryPoints = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const v0 = 70; // initial velocity
    const g = 18;  // custom gravity scale for rendering
    const points: { x: number; y: number }[] = [];
    
    // Simulate flight points
    for (let t = 0; t < 10; t += 0.2) {
      const x = 30 + v0 * Math.cos(rad) * t;
      const y = 190 - (v0 * Math.sin(rad) * t - 0.5 * g * t * t);
      
      if (y > 190 || x > 300) {
        // hit the ground or border
        points.push({ x: Math.min(x, 300), y: 190 });
        break;
      }
      points.push({ x, y });
    }
    return points;
  };

  // Run projectile launch animation
  const runLaunchAnimation = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setTrail([]);
    
    const points = getTrajectoryPoints(launchAngle);
    let index = 0;

    const animate = () => {
      if (index < points.length) {
        const nextPoint = points[index];
        setProjectilePos(nextPoint);
        setTrail((prev) => [...prev, nextPoint]);
        index++;
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsLaunching(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Reset ball position when launch angle changes and not launching
    if (!isLaunching) {
      setProjectilePos({ x: 30, y: 190 });
      setTrail([]);
    }
  }, [launchAngle, isLaunching]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Filter PDFs
  const filteredPDFs = PDF_DATA.filter((file) => {
    const matchesCategory = selectedCategory === "Todos" || file.category === selectedCategory;
    const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="laboratorio-preview" className="py-24 px-4 md:px-8 bg-[#0F172A] text-slate-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-950/50 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            Plataforma Virtual Estudiantil
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
            Nuestro Laboratorio Interactivo
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full animate-pulse" />
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mt-4">
            Te damos un vistazo exclusivo a la tecnología educativa de TortuMath. Manipula nuestros simuladores, realiza quizzes de práctica y explora la biblioteca que usan nuestros estudiantes a diario.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* CARD 1: MINI-QUIZ INTERACTIVO (4 Columns or 5 Columns depending on viewport) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-xl" id="preview-mini-quiz">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Mini-Quiz de Demostración</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Autoevaluación síncrona en tiempo real</p>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pregunta de Álgebra</span>
                <p className="text-xs md:text-sm font-bold text-slate-200 leading-relaxed font-sans">
                  Resuelve la ecuación de segundo grado:
                  <br />
                  <span className="text-emerald-400 font-mono font-extrabold text-sm block my-1 bg-slate-900/80 p-2 rounded border border-slate-850 text-center">x² - 5x + 6 = 0</span>
                  ¿Cuáles son las soluciones reales de x?
                </p>
              </div>

              {/* Answers Option Selection */}
              <div className="space-y-2 pt-2">
                {[
                  { key: "A", text: "x₁ = 1,  x₂ = 6" },
                  { key: "B", text: "x₁ = 2,  x₂ = 3" },
                  { key: "C", text: "x₁ = -2,  x₂ = -3" },
                  { key: "D", text: "No tiene soluciones reales" }
                ].map((option) => {
                  const isSelected = selectedQuizOption === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => {
                        if (!quizAnswered) {
                          setSelectedQuizOption(option.key);
                        }
                      }}
                      disabled={quizAnswered}
                      className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all duration-200 ${
                        quizAnswered
                          ? option.key === "B"
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 cursor-not-allowed"
                            : isSelected
                              ? "bg-rose-500/10 border-rose-500 text-rose-400 cursor-not-allowed"
                              : "bg-slate-950/20 border-slate-900 text-slate-600 cursor-not-allowed"
                          : isSelected
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                            : "bg-slate-950/40 border-slate-850 text-slate-300 hover:border-slate-700 hover:bg-slate-950/80"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black ${
                          isSelected ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                        }`}>{option.key}</span>
                        <span>{option.text}</span>
                      </span>
                      {quizAnswered && option.key === "B" && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                      {quizAnswered && isSelected && option.key !== "B" && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              <AnimatePresence mode="wait">
                {quizAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-3.5 rounded-xl border text-[11px] leading-relaxed font-medium font-sans ${
                      selectedQuizOption === "B"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                    }`}
                  >
                    {selectedQuizOption === "B" ? (
                      <p>
                        <span className="font-bold">🎉 ¡Excelente!</span> Al factorizar la ecuación obtenemos <code className="bg-emerald-950 px-1 rounded font-mono">(x-2)(x-3) = 0</code>, lo cual nos da <code className="bg-emerald-950 px-1 rounded font-mono">x=2</code> y <code className="bg-emerald-950 px-1 rounded font-mono">x=3</code>. En el Dashboard resolverás retos dinámicos de este tipo y ganarás <strong>TortuPuntos</strong>.
                      </p>
                    ) : (
                      <p>
                        <span className="font-bold">❌ Respuesta incorrecta.</span> Pista: busca dos números que multiplicados den el término independiente (+6) y sumados den el opuesto del coeficiente lineal (+5). ¡Inténtalo de nuevo!
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions group */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {!quizAnswered ? (
                <button
                  onClick={() => {
                    if (selectedQuizOption) {
                      setQuizAnswered(true);
                    }
                  }}
                  disabled={!selectedQuizOption}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all ${
                    selectedQuizOption
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  Verificar Respuesta
                </button>
              ) : (
                <button
                  onClick={handleResetQuiz}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar</span>
                </button>
              )}
            </div>
          </div>

          {/* CARD 2: BIBLIOTECA DE PDFS Y EJERCICIOS (4 Columns or 5 Columns depending on viewport) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-md shadow-xl" id="preview-library">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Biblioteca Académica</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Formularios y guías de ejercicios resueltos</p>
                </div>
              </div>

              {/* Search bar + Categorization */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar formularios, guías..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
                  {["Todos", "Matemáticas", "Física", "Programación", "Electrónica"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all shrink-0 cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-950/50 text-slate-400 border border-slate-850 hover:bg-slate-950"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* PDF Item lists */}
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                {filteredPDFs.length > 0 ? (
                  filteredPDFs.map((file, idx) => {
                    const isDownloading = downloadingFile === file.title;
                    const isCompleted = downloadCompleted === file.title;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-950/40 border border-slate-850 hover:border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-3 transition-colors text-left"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-slate-200 truncate leading-snug">{file.title}</p>
                            <span className="text-[9px] text-slate-500 font-medium font-mono uppercase">
                              {file.category} • {file.size}
                            </span>
                          </div>
                        </div>

                        {/* Interactive download states */}
                        <button
                          onClick={() => startDownload(file.title)}
                          disabled={downloadingFile !== null}
                          className={`p-1.5 rounded-lg border transition-all shrink-0 cursor-pointer ${
                            isCompleted
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                              : isDownloading
                                ? "bg-slate-850 border-slate-750 text-emerald-400"
                                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : isDownloading ? (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-slate-500 text-[11px] font-medium leading-relaxed font-sans">
                    Ningún material coincide con la búsqueda.
                  </div>
                )}
              </div>

              {/* Active Download Progress Bar simulation */}
              {downloadingFile && (
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1.5 animate-pulse">
                  <div className="flex justify-between items-center text-[9px] font-extrabold uppercase text-slate-400">
                    <span className="truncate max-w-[70%]">Descargando: {downloadingFile}</span>
                    <span className="font-mono text-emerald-400">{downloadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-850">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-100 ease-out"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Successful download prompt */}
              {downloadCompleted && (
                <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold leading-normal font-sans flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    Guía simulada con éxito. Inscríbete en nuestros cursos para acceder a más de 200 PDFs reales clasificados por niveles.
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Acceso Ilimitado con tu cuenta estudiantil
              </span>
            </div>
          </div>

          {/* CARD 3: SIMULADOR DE FÍSICA / EXPERIMENTACIÓN (4 Columns or 12 Columns depending on layout) */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-md shadow-xl" id="preview-simulator">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Laboratorio Científico</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Interactúa con leyes físicas reales</p>
                </div>
              </div>

              {/* Physics simulator canvas */}
              <div className="relative w-full h-[140px] bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden flex items-center justify-center">
                
                {/* SVG Stage */}
                <svg className="w-full h-full" viewBox="0 0 320 220">
                  {/* Grid backdrop */}
                  <defs>
                    <pattern id="grid-demo" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-demo)" />

                  {/* Ground base */}
                  <line x1="10" y1="190" x2="310" y2="190" stroke="#475569" strokeWidth="2.5" strokeDasharray="3 2" />

                  {/* Trajectory Guide (Dotted curve) */}
                  {(() => {
                    const points = getTrajectoryPoints(launchAngle);
                    let d = "";
                    points.forEach((p, idx) => {
                      if (idx === 0) d += `M ${p.x} ${p.y}`;
                      else d += ` L ${p.x} ${p.y}`;
                    });
                    return <path d={d} fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />;
                  })()}

                  {/* Little launch pad / cannon */}
                  <g transform={`translate(30, 190) rotate(${-launchAngle})`}>
                    <rect x="-8" y="-14" width="16" height="14" fill="#334155" stroke="#475569" strokeWidth="1" rx="1.5" />
                    <line x1="0" y1="-14" x2="16" y2="-14" stroke="#10B981" strokeWidth="2" />
                  </g>
                  <circle cx="30" cy="190" r="4.5" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />

                  {/* Simulated trail */}
                  {trail.map((p, idx) => (
                    <circle key={idx} cx={p.x} cy={p.y} r="1.5" fill="#10B981" opacity={0.35 + (idx / trail.length) * 0.65} />
                  ))}

                  {/* Projectile ball (flashing emerald green) */}
                  <circle 
                    cx={projectilePos.x} 
                    cy={projectilePos.y} 
                    r="5" 
                    fill="#10B981" 
                    className="shadow-[0_0_8px_#10b981]" 
                    style={{ filter: "drop-shadow(0px 0px 4px #10b981)" }}
                  />

                  {/* Calculation telemetry overlay watermarks */}
                  <g transform="translate(180, 25)" className="font-mono text-[9px] fill-slate-500">
                    <text x="0" y="10">Ángulo: {launchAngle}°</text>
                    <text x="0" y="22">Gravedad: 9.81 m/s²</text>
                    <text x="0" y="34">V0: 15.0 m/s</text>
                  </g>
                </svg>

                {/* Cannon angle indicator watermark */}
                <div className="absolute top-2.5 left-3 bg-slate-900/90 py-1 px-2 rounded border border-slate-800 text-[9px] font-mono font-bold text-slate-400">
                  Alcance Máx: <span className="text-emerald-400">{((15 * 15 * Math.sin((2 * launchAngle * Math.PI) / 180)) / 9.81).toFixed(2)} m</span>
                </div>
              </div>

              {/* Slider for launch angle */}
              <div className="space-y-1.5 text-left bg-slate-950/40 p-3 rounded-xl border border-slate-850">
                <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-slate-400">
                  <span>Ángulo de Lanzamiento:</span>
                  <span className="font-mono text-emerald-400 font-black">{launchAngle}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="75"
                  value={launchAngle}
                  disabled={isLaunching}
                  onChange={(e) => setLaunchAngle(Number(e.target.value))}
                  className="w-full h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-50"
                />
              </div>
            </div>

            {/* Launch action */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={runLaunchAnimation}
                disabled={isLaunching}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
                  isLaunching
                    ? "bg-emerald-950 text-emerald-500 cursor-not-allowed border border-emerald-900/50"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer hover:shadow-lg hover:shadow-emerald-900/20"
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isLaunching ? "Simulando..." : "Lanzar Proyectil 🚀"}</span>
              </button>
              <p className="text-[9px] text-center text-slate-500 font-sans font-medium leading-relaxed mt-0.5">
                Desbloquea simuladores 3D completos de física de rampa, electricidad e instrumentación registrándote hoy.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
