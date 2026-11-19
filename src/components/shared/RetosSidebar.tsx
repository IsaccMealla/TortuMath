import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles, 
  Binary, 
  Network, 
  TableProperties, 
  Activity,
  Flame,
  Award
} from "lucide-react";

export interface RetoItem {
  capitulo: number;
  titulo: string;
  subtitulo: string;
  tags: string[];
  recompensa: string;
  colorBorder: string;
  colorBg: string;
  colorText: string;
  icon: React.ReactNode;
}

interface RetosSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReto: (capitulo: number) => void;
}

export const RETOS_DATA: RetoItem[] = [
  {
    capitulo: 1,
    titulo: "Capítulo 1: Fundamentos Matemáticos",
    subtitulo: "Lógica Proposicional, Álgebra de Boole y Teoría de Conjuntos en Servidores.",
    tags: ["Lógica Formal", "De Morgan", "Diagrama de Venn"],
    recompensa: "+50 TortuPuntos",
    colorBorder: "border-emerald-500/40",
    colorBg: "from-emerald-500/10 to-transparent",
    colorText: "text-emerald-400",
    icon: <Binary className="w-5 h-5 text-emerald-400" />
  },
  {
    capitulo: 2,
    titulo: "Capítulo 2: Matemática Discreta",
    subtitulo: "Principios de Conteo, Aritmética Modular Cíclica y Topología de Redes.",
    tags: ["Conteo Multiplicativo", "Módulo Circular", "Corte de Enlace"],
    recompensa: "+50 TortuPuntos",
    colorBorder: "border-cyan-500/40",
    colorBg: "from-cyan-500/10 to-transparent",
    colorText: "text-cyan-400",
    icon: <Network className="w-5 h-5 text-cyan-400" />
  },
  {
    capitulo: 3,
    titulo: "Capítulo 3: Álgebra Lineal",
    subtitulo: "Sistemas Ax = b para Clúster de Servidores, Regla de Cramer y Cifrado de Hill.",
    tags: ["Clúster Ax = b", "det(A) = 16", "Cifrado NUBE → IPOR"],
    recompensa: "+50 TortuPuntos",
    colorBorder: "border-amber-500/40",
    colorBg: "from-amber-500/10 to-transparent",
    colorText: "text-amber-400",
    icon: <TableProperties className="w-5 h-5 text-amber-400" />
  },
  {
    capitulo: 4,
    titulo: "Capítulo 4: Cálculo Aplicado",
    subtitulo: "Límites en Saturación, Derivadas para Optimización de Costos y Sumas de Riemann.",
    tags: ["Límites 0/0", "C'(x) = 0", "Integral N = 60"],
    recompensa: "+50 TortuPuntos",
    colorBorder: "border-teal-500/40",
    colorBg: "from-teal-500/10 to-transparent",
    colorText: "text-teal-400",
    icon: <Activity className="w-5 h-5 text-teal-400" />
  }
];

export default function RetosSidebar({ isOpen, onClose, onSelectReto }: RetosSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#090E17] border-l border-slate-800 shadow-2xl z-50 flex flex-col text-white"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white leading-tight">
                    Retos del Libro de Texto
                  </h3>
                  <span className="text-[11px] font-bold text-slate-400">
                    Sincronizados con el código QR impreso
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Cerrar panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of Retos */}
            <div className="p-5 space-y-3.5 overflow-y-auto flex-1">
              <p className="text-xs text-slate-400 leading-relaxed">
                Selecciona cualquier capítulo del libro para entrar a su laboratorio interactivo correspondiente:
              </p>

              {RETOS_DATA.map((reto) => (
                <div
                  key={reto.capitulo}
                  onClick={() => {
                    onSelectReto(reto.capitulo);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl bg-gradient-to-r ${reto.colorBg} bg-black/40 border ${reto.colorBorder} hover:border-white/50 transition-all cursor-pointer group hover:scale-[1.01] shadow-lg space-y-2.5`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-700/80">
                        {reto.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                          {reto.titulo}
                        </h4>
                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                          <Flame className="w-3.5 h-3.5" /> {reto.recompensa}
                        </span>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-amber-400 group-hover:text-black transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {reto.subtitulo}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {reto.tags.map((tg, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/60 border border-slate-700/80 text-slate-300"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-black/30 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-400" /> 4 Módulos Disponibles
              </span>
              <span className="font-mono text-[11px] text-slate-500">TortuMath 2026</span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
