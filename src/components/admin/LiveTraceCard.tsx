import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity } from "lucide-react";
import { AssignedMaterial, StudentRegistration } from "../../types";

export interface LiveTraceCardProps {
  assignedMaterials: AssignedMaterial[];
  students: StudentRegistration[];
  handleUpdateMaterialStatus: (id: string, status: AssignedMaterial["status"]) => void;
  handleSimulateMaterialSubmission: (id: string) => void;
  handleOpenGradingModal: (material: AssignedMaterial) => void;
}

export default function LiveTraceCard({
  assignedMaterials,
  students,
  handleUpdateMaterialStatus,
  handleSimulateMaterialSubmission,
  handleOpenGradingModal,
}: LiveTraceCardProps) {
  return (
    <div className="bg-forest-surface border border-emerald-premium/20 rounded-3xl p-5 md:p-6 space-y-4 shadow-lg text-left flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-emerald-premium/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-premium" />
            <div>
              <h3 className="font-black text-white text-sm uppercase tracking-wider">Tareas en Progreso y Trazabilidad</h3>
              <p className="text-[10px] text-slate-400 font-medium">Control en vivo de las últimas actividades enviadas</p>
            </div>
          </div>
          <span className="text-[9px] uppercase font-black tracking-widest bg-emerald-premium/10 text-emerald-premium border border-emerald-premium/20 px-2.5 py-0.5 rounded-full animate-pulse">
            Canal Activo
          </span>
        </div>

        <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {assignedMaterials.length > 0 ? (
              assignedMaterials.map((mat, idx) => {
                const matchedStudent = students.find(s => s.id === mat.studentId);
                return (
                  <motion.div
                    key={mat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                    className="p-3.5 rounded-2xl bg-deep-forest/40 border border-emerald-premium/10 hover:border-emerald-premium/25 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm"
                  >
                    <div className="space-y-1.5 max-w-[70%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] uppercase font-black tracking-widest text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20">
                          {mat.type}
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-500">Asignado: {mat.assignedAt}</span>
                      </div>
                      <h4 className="font-extrabold text-white text-sm">{mat.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        Estudiante: <span className="font-bold text-slate-200">{matchedStudent?.name || "Desconocido"}</span>
                      </p>
                      {mat.score !== undefined && mat.score !== null && (
                        <div className="text-[10.5px] font-bold text-emerald-450 font-mono">
                          Nota: <span className="font-extrabold text-white text-xs">{mat.score}</span> / {mat.maxScore}
                          {mat.observation && <span className="block text-[9.5px] text-slate-400 font-sans font-medium mt-0.5">Obs: "{mat.observation}"</span>}
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-stretch sm:items-end gap-2 w-full sm:w-auto">
                      {/* Status badges */}
                      <div className="flex justify-center sm:justify-end">
                        {mat.status === "pendiente" && (
                          <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Pendiente
                          </span>
                        )}
                        {mat.status === "realizando" && (
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-450 animate-pulse" />
                            Realizando
                          </span>
                        )}
                        {mat.status === "entregado" && (
                          <span className="px-2 py-1 bg-indigo-500/15 text-indigo-400 border border-indigo-500/35 rounded-full font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-450 animate-ping" />
                            Entregado
                          </span>
                        )}
                        {mat.status === "calificado" && (
                          <span className="px-2 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full font-black text-[9px] uppercase tracking-wider flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450" />
                            Calificado
                          </span>
                        )}
                      </div>

                      {/* Simulation buttons */}
                      <div className="flex gap-1.5 w-full sm:w-auto">
                        {mat.status === "pendiente" && (
                          <button
                            onClick={() => handleUpdateMaterialStatus(mat.id, "realizando")}
                            className="px-2.5 py-1 bg-blue-950/40 hover:bg-blue-900/40 text-blue-300 text-[9.5px] font-black rounded-lg border border-blue-900/30 active:scale-95 transition-all cursor-pointer w-full text-center"
                            title="Simula que el estudiante abrió e inició la actividad"
                          >
                            Iniciar Estudiante
                          </button>
                        )}
                        {mat.status === "realizando" && (
                          <button
                            onClick={() => handleSimulateMaterialSubmission(mat.id)}
                            className="px-2.5 py-1 bg-indigo-950/40 hover:bg-indigo-900/40 text-indigo-300 text-[9.5px] font-black rounded-lg border border-indigo-900/30 active:scale-95 transition-all cursor-pointer w-full text-center"
                            title="Simula la entrega del estudiante para revisión"
                          >
                            Simular Entrega
                          </button>
                        )}
                        {mat.status === "entregado" && (
                          <button
                            onClick={() => handleOpenGradingModal(mat)}
                            className="px-2.5 py-1 bg-[#10b981]/20 hover:bg-[#10b981]/30 text-emerald-300 text-[9.5px] font-black rounded-lg border border-[#10b981]/35 active:scale-95 transition-all cursor-pointer w-full text-center"
                            title="Calificar y retroalimentar esta entrega"
                          >
                            Calificar
                          </button>
                        )}
                        {mat.status === "calificado" && (
                          <span className="text-[9px] text-slate-500 italic block font-bold text-right w-full">Trace Cerrado ✓</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-500 font-bold italic text-xs">
                No hay actividades despachadas en progreso. Utiliza el módulo de asignaciones para enviar una.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
