import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { AssignedMaterial } from "../../types";

export interface GradingModalProps {
  gradingMaterial: AssignedMaterial;
  gradingScore: number;
  setGradingScore: (score: number) => void;
  gradingObservation: string;
  setGradingObservation: (obs: string) => void;
  handleSaveGrade: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function GradingModal({
  gradingMaterial,
  gradingScore,
  setGradingScore,
  gradingObservation,
  setGradingObservation,
  handleSaveGrade,
  onClose,
}: GradingModalProps) {
  return (
    <>
      {/* Background dimmer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-40 cursor-pointer"
      />

      {/* Floating window modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-4 md:inset-x-auto md:w-full md:max-w-md top-24 md:top-32 mx-auto bg-[#081e19] border border-emerald-premium/25 rounded-3xl p-6 md:p-8 z-50 text-left space-y-6 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-emerald-premium/10 pb-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
              Revisión y Nota
            </span>
            <h3 className="text-base font-black text-white mt-1 tracking-tight">Calificar Actividad</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white bg-[#051511] border border-emerald-premium/15 rounded-lg hover:bg-[#0c2e26]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSaveGrade} className="space-y-4 text-xs font-semibold">
          <div className="p-3 bg-black/20 border border-emerald-premium/10 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">TEMA:</span>
            <span className="font-extrabold text-white block text-sm">{gradingMaterial.title}</span>
            <span className="text-[10px] text-[#10B981] font-black uppercase tracking-wide inline-block bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 mt-1">
              {gradingMaterial.type}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-300 font-bold">Nota Final (Escala 1 a 100):</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="0"
                max="100"
                value={gradingScore}
                onChange={(e) => setGradingScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-24 px-3 py-2 bg-[#051511] border border-emerald-premium/15 text-slate-200 font-mono font-black text-sm text-center rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
              <span className="text-slate-400 font-bold text-sm">/ 100 puntos</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-300 font-bold">Retroalimentación / Observación:</label>
            <textarea
              rows={3.5}
              placeholder="Indica al estudiante qué puntos debe revisar o felicítalo por su excelente resolución manuscrita..."
              value={gradingObservation}
              onChange={(e) => setGradingObservation(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#051511] border border-emerald-premium/15 text-slate-200 text-xs font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600 resize-none"
            />
          </div>

          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-black/40 border border-slate-700 text-slate-300 rounded-xl hover:bg-black/60 font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-premium hover:bg-emerald-500 text-slate-950 rounded-xl font-black uppercase tracking-wider shadow-md hover:shadow-emerald-950/20 active:scale-98 transition-all"
            >
              Guardar Nota
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}
