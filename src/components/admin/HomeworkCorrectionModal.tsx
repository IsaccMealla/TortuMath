import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { HomeworkSubmission } from "../../types";

export interface HomeworkCorrectionModalProps {
  viewingSubmission: HomeworkSubmission;
  onClose: () => void;
  handleApproveHomework: (submissionId: string) => void;
  correctionMode: "idle" | "write";
  setCorrectionMode: (mode: "idle" | "write") => void;
  correctionObservation: string;
  setCorrectionObservation: (obs: string) => void;
  handleSendObservation: (submissionId: string, observationText: string) => void;
}

export default function HomeworkCorrectionModal({
  viewingSubmission,
  onClose,
  handleApproveHomework,
  correctionMode,
  setCorrectionMode,
  correctionObservation,
  setCorrectionObservation,
  handleSendObservation,
}: HomeworkCorrectionModalProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 z-40 cursor-pointer"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-x-4 md:inset-x-auto md:w-full md:max-w-3xl top-12 md:top-20 mx-auto bg-[#081e19] border border-emerald-premium/25 rounded-3xl p-6 md:p-8 max-h-[85vh] overflow-y-auto z-50 text-left space-y-6 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-emerald-premium/10 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-405 bg-amber-500/10 px-2 py-0.5 rounded text-amber-400">
              Revisión de Evidencia de Aprendizaje
            </span>
            <h3 className="text-xl font-black text-white mt-1 tracking-tight">{viewingSubmission.title}</h3>
            <p className="text-xs text-slate-450">
              Enviado por: <strong className="text-emerald-premium">{viewingSubmission.studentName}</strong> • {viewingSubmission.submittedAt}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-[#051511] border border-emerald-premium/15 rounded-lg hover:bg-[#0c2e26]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Handwritten Notebook Sheet Simulator with grid design */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">Fotografía del Cuaderno de Avance (Simulada)</span>
          
          <div className="relative bg-[#FAF6EE] text-slate-800 p-6 rounded-2xl border-l-[6px] border-red-400 shadow-md font-mono text-xs leading-relaxed overflow-hidden">
            {/* Notebook Grid rule line simulation */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-transparent bg-[size:100%_24px] bg-[linear-gradient(#E2E8F0_1px,transparent_1px)] pointer-events-none opacity-50" />
            
            <div className="relative z-10 space-y-1 select-none text-slate-800 font-medium">
              {viewingSubmission.notebookContent.map((row, index) => (
                <p key={index} className={row.startsWith("  ") ? "pl-4 text-blue-800 font-semibold" : "font-extrabold text-slate-900"}>
                  {row}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Status and Action Buttons */}
        <div className="bg-[#0a211b] border border-emerald-premium/15 p-5 rounded-2xl space-y-4 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="block text-[10px] uppercase font-black text-slate-400">Estado de la Entrega</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase mt-1 ${
                viewingSubmission.status === "pendiente"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                  : viewingSubmission.status === "aprobado"
                  ? "bg-emerald-500/10 text-emerald-450 border border-emerald-500/30"
                  : "bg-rose-500/10 text-rose-450 border border-rose-500/30"
              }`}>
                {viewingSubmission.status === "pendiente" && "⚠️ Pendiente de Corrección"}
                {viewingSubmission.status === "aprobado" && "✅ Completado y Aprobado"}
                {viewingSubmission.status === "observado" && "❌ Con Observación"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {viewingSubmission.status === "pendiente" && (
                <>
                  <button
                    onClick={() => handleApproveHomework(viewingSubmission.id)}
                    className="px-4 py-2.5 bg-emerald-premium hover:bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    ✓ Aprobar Tarea
                  </button>
                  
                  <button
                    onClick={() => setCorrectionMode("write")}
                    className="px-4 py-2.5 bg-rose-650 hover:bg-rose-600 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-sm transition-colors cursor-pointer"
                  >
                    ⚠ Enviar Observación
                  </button>
                </>
              )}

              {viewingSubmission.status !== "pendiente" && (
                <span className="text-xs font-bold text-slate-405 italic font-medium">Calificación y feedback registrados con éxito.</span>
              )}
            </div>
          </div>

          {/* Send Observation input form panel */}
          {correctionMode === "write" && (
            <div className="pt-4 border-t border-emerald-premium/10 space-y-3">
              <label className="block text-xs font-bold text-slate-300">Detalla el error o la corrección del cuaderno:</label>
              <textarea
                rows={2.5}
                placeholder="Ej: Revisa el signo negativo en la fórmula del ejercicio 2. El despeje debe incluir ambas soluciones reales (x = ±2)."
                value={correctionObservation}
                onChange={(e) => setCorrectionObservation(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#051511] border border-emerald-premium/15 text-slate-200 text-xs font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600 resize-none"
              />

              <div className="flex justify-end gap-2 text-xs">
                <button
                  onClick={() => {
                    setCorrectionMode("idle");
                    setCorrectionObservation("");
                  }}
                  className="px-3.5 py-2 bg-[#051511] border border-emerald-premium/10 text-slate-300 font-bold rounded-lg hover:bg-[#0c2e26] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleSendObservation(viewingSubmission.id, correctionObservation)}
                  className="px-4 py-2 bg-rose-650 hover:bg-rose-600 text-white font-black uppercase tracking-wider rounded-lg cursor-pointer transition-colors"
                >
                  Enviar Corrección
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
