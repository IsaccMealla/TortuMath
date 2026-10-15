import React from "react";
import { motion } from "motion/react";
import { X, Activity, Send, Plus } from "lucide-react";
import { StudentRegistration, AssignedMaterial, QuizLog, TimelineNode } from "../../types";

export interface StudentManagementDrawerProps {
  selectedStudentForManagement: StudentRegistration;
  onClose: () => void;
  getStudentMetrics: (studentId: string, studentName: string) => any;
  drawerTab: "materiales" | "timeline";
  setDrawerTab: (tab: "materiales" | "timeline") => void;
  
  // Assignment Form State & Handlers
  assignmentType: "Guía de Ejercicios (PDF)" | "Mini-Prueba Interactiva" | "Tarea para el Cuaderno" | "Laboratorio Virtual";
  setAssignmentType: (type: "Guía de Ejercicios (PDF)" | "Mini-Prueba Interactiva" | "Tarea para el Cuaderno" | "Laboratorio Virtual") => void;
  assignmentTitle: string;
  setAssignmentTitle: (title: string) => void;
  assignmentInstructions: string;
  setAssignmentInstructions: (instructions: string) => void;
  handleAssignMaterialSubmit: (e: React.FormEvent) => void;
  assignmentStatusMessage: string;
  assignedMaterials: AssignedMaterial[];

  // Timeline State & Handlers
  newTopicTitle: string;
  setNewTopicTitle: (title: string) => void;
  newTopicStatus: "Completado" | "En Repaso" | "Por Evaluar";
  setNewTopicStatus: (status: "Completado" | "En Repaso" | "Por Evaluar") => void;
  handleRegisterTimelineSubmit: (e: React.FormEvent) => void;
  timelineNodes: TimelineNode[];
  activeAssociatedNodeId: string | null;
  toggleAssociatedResources: (nodeId: string) => void;
  quizScores: QuizLog[];
}

export default function StudentManagementDrawer({
  selectedStudentForManagement,
  onClose,
  getStudentMetrics,
  drawerTab,
  setDrawerTab,
  assignmentType,
  setAssignmentType,
  assignmentTitle,
  setAssignmentTitle,
  assignmentInstructions,
  setAssignmentInstructions,
  handleAssignMaterialSubmit,
  assignmentStatusMessage,
  assignedMaterials,
  newTopicTitle,
  setNewTopicTitle,
  newTopicStatus,
  setNewTopicStatus,
  handleRegisterTimelineSubmit,
  timelineNodes,
  activeAssociatedNodeId,
  toggleAssociatedResources,
  quizScores,
}: StudentManagementDrawerProps) {
  const metrics = getStudentMetrics(selectedStudentForManagement.id, selectedStudentForManagement.name);

  return (
    <>
      {/* Overlay background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-40 cursor-pointer"
      />

      {/* Sidebar drawer-style modal */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#081e19] border-l border-emerald-premium/25 p-6 md:p-8 overflow-y-auto z-50 text-left space-y-6 shadow-2xl"
      >
        {/* Header Info */}
        <div className="flex items-start justify-between border-b border-emerald-premium/10 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-premium bg-emerald-premium/10 px-2 py-0.5 rounded">
              Gestión Directa 1 a 1
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">{selectedStudentForManagement.name}</h3>
            <p className="text-xs text-slate-400 font-mono">ID: {selectedStudentForManagement.id} • {selectedStudentForManagement.subject}</p>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-[#051511] border border-emerald-premium/15 rounded-lg hover:bg-[#0c2e26] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RENDIMIENTO Y ESTADÍSTICAS DEL ESTUDIANTE */}
        <div className="bg-black/35 border border-emerald-premium/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-premium/10 pb-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" /> Rendimiento en Tiempo Real
            </h4>
            {metrics.isAtRisk && (
              <span className="animate-pulse bg-rose-500/10 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                ⚠️ Alumno en Riesgo Académico
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Attendance Card */}
            <div className="bg-[#051511] border border-emerald-premium/5 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Asistencia Virtual</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-white">{metrics.attendanceRate}%</span>
                <span className="text-[9.5px] font-mono text-slate-500">{metrics.attended}/{metrics.scheduled} Clases</span>
              </div>
              {/* Attendance visual progress bar */}
              <div className="w-full bg-[#030d0a] h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full transition-all duration-500 ${metrics.attendanceRate >= 80 ? 'bg-emerald-premium' : metrics.attendanceRate >= 60 ? 'bg-amber-450' : 'bg-rose-500'}`} 
                  style={{ width: `${metrics.attendanceRate}%` }} 
                />
              </div>
            </div>

            {/* Quizzes Average Card */}
            <div className="bg-[#051511] border border-emerald-premium/5 p-3 rounded-xl flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Efectividad Quizzes</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-white">{metrics.quizAverage}%</span>
                <span className="text-[9.5px] font-mono text-slate-500">({metrics.quizCount} Tests)</span>
              </div>
              {/* Quizzes visual progress bar */}
              <div className="w-full bg-[#030d0a] h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full transition-all duration-500 ${metrics.quizAverage >= 80 ? 'bg-emerald-premium' : metrics.quizAverage >= 60 ? 'bg-amber-450' : 'bg-rose-500'}`} 
                  style={{ width: `${metrics.quizAverage}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Tabs Selector */}
        <div className="flex border-b border-emerald-premium/15 pb-1 gap-2">
          <button
            type="button"
            onClick={() => setDrawerTab("materiales")}
            className={`flex-1 pb-2 text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer ${
              drawerTab === "materiales"
                ? "text-emerald-premium border-b-2 border-emerald-premium font-black"
                : "text-slate-400 hover:text-slate-200 font-bold"
            }`}
          >
            📁 Enviar Material
          </button>
          <button
            type="button"
            onClick={() => setDrawerTab("timeline")}
            className={`flex-1 pb-2 text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer ${
              drawerTab === "timeline"
                ? "text-emerald-premium border-b-2 border-emerald-premium font-black"
                : "text-slate-400 hover:text-slate-200 font-bold"
            }`}
          >
            📈 Línea de Tiempo ({timelineNodes.filter(n => n.studentId === selectedStudentForManagement.id).length})
          </button>
        </div>

        {/* TAB 1: MATERIALES */}
        {drawerTab === "materiales" && (
          <div className="space-y-6">
            {/* Form to Assign Material */}
            <div className="bg-[#0a211b] border border-emerald-premium/15 rounded-2.5xl p-5 space-y-4 shadow-inner">
              <div className="flex items-center gap-1.5">
                <Send className="w-4 h-4 text-emerald-premium" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">Asignar Nuevo Material y Exámenes</h4>
              </div>

              <form onSubmit={handleAssignMaterialSubmit} className="space-y-3.5 text-xs">
                {/* Selector of Type */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">Tipo de Contenido:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      "Guía de Ejercicios (PDF)",
                      "Mini-Prueba Interactiva",
                      "Tarea para el Cuaderno"
                    ].map((typeOption) => (
                      <button
                        key={typeOption}
                        type="button"
                        onClick={() => setAssignmentType(typeOption as any)}
                        className={`p-2.5 rounded-xl font-black tracking-wide border text-[10px] text-center transition-all cursor-pointer ${
                          assignmentType === typeOption
                            ? "bg-emerald-premium border-emerald-premium text-slate-950 font-black shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                            : "bg-[#051511] border-[#0d342a] text-slate-400 hover:border-emerald-premium/40 hover:text-white"
                        }`}
                      >
                        {typeOption.split(" ")[0]} {typeOption.split(" ").slice(1).join(" ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title of Topic */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">Título del Tema / Recurso:</label>
                  <input
                    type="text"
                    placeholder="Ej: Práctica Guiada de Leyes de Newton"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#051511] border border-emerald-premium/15 text-slate-200 font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600"
                  />
                </div>

                {/* Instructions or Links */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">Instrucciones o Enlaces Complementarios:</label>
                  <textarea
                    rows={3}
                    placeholder="Indica las páginas a resolver, fórmulas críticas, enlaces a simuladores gráficos o sugerencias para el repaso síncrono..."
                    value={assignmentInstructions}
                    onChange={(e) => setAssignmentInstructions(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#051511] border border-emerald-premium/15 text-slate-200 font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600 resize-none"
                  />
                </div>

                {/* Submit button in Emerald */}
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-premium hover:bg-emerald-500 active:scale-98 text-slate-950 font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-emerald-950/25 flex items-center justify-center gap-1.5 cursor-pointer transition-all mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Asignar al Alumno</span>
                </button>

                {/* Status Assignment Feedback message */}
                {assignmentStatusMessage && (
                  <p className="text-center font-bold text-xs text-emerald-400 mt-2 animate-pulse">
                    {assignmentStatusMessage}
                  </p>
                )}
              </form>
            </div>

            {/* List of currently assigned materials to this student */}
            <div className="space-y-3.5 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b border-emerald-premium/10 pb-2">
                Historial de Materiales Asignados
              </span>

              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {assignedMaterials.filter(m => m.studentId === selectedStudentForManagement.id).length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-4">No se ha asignado ningún recurso personalizado a este estudiante todavía.</p>
                ) : (
                  assignedMaterials
                    .filter(m => m.studentId === selectedStudentForManagement.id)
                    .map((material) => (
                      <div key={material.id} className="p-4 bg-[#0a211b] border border-emerald-premium/10 rounded-2xl space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-[#051511] text-emerald-premium font-black text-[9px] uppercase rounded">
                            {material.type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 font-bold">{material.assignedAt}</span>
                        </div>
                        <h5 className="font-extrabold text-white text-sm">{material.title}</h5>
                        {material.instructions && (
                          <p className="text-[11px] text-slate-450 font-medium italic">"{material.instructions}"</p>
                        )}
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TIMELINE / HISTORIAL DE TEMAS AVANZADOS */}
        {drawerTab === "timeline" && (
          <div className="space-y-6">
            {/* Formulario de Registro de Avance */}
            <div className="bg-[#0a211b] border border-emerald-premium/15 rounded-2.5xl p-5 space-y-4 shadow-inner text-left">
              <div className="flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-premium" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">Registrar Avance Académico</h4>
              </div>

              <form onSubmit={handleRegisterTimelineSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">Tema Avanzado Hoy:</label>
                  <input
                    type="text"
                    placeholder="Ej: Introducción a Derivadas, Leyes de Kirchhoff..."
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#051511] border border-emerald-premium/15 text-slate-200 font-semibold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-slate-300 font-bold">Estado del Tema:</label>
                    <select
                      value={newTopicStatus}
                      onChange={(e) => setNewTopicStatus(e.target.value as any)}
                      className="w-full bg-[#051511] border border-emerald-premium/15 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-premium cursor-pointer"
                    >
                      <option value="Completado" className="bg-[#0a211b] text-white">Completado</option>
                      <option value="En Repaso" className="bg-[#0a211b] text-white">En Repaso</option>
                      <option value="Por Evaluar" className="bg-[#0a211b] text-white">Por Evaluar</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-300 font-bold">Fecha de la Sesión:</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      id="timeline-date-input"
                      className="w-full bg-[#051511] border border-emerald-premium/15 rounded-xl px-3 py-2 text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-premium"
                    />
                  </div>
                </div>

                {/* Optional Material association */}
                <div className="space-y-1.5">
                  <label className="block text-slate-300 font-bold">Asociar Recurso Existente (Opcional):</label>
                  <select
                    id="associated-material-select"
                    className="w-full bg-[#051511] border border-emerald-premium/15 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-premium cursor-pointer"
                  >
                    <option value="" className="bg-[#0a211b] text-slate-400">-- Ninguno --</option>
                    {assignedMaterials
                      .filter(m => m.studentId === selectedStudentForManagement.id)
                      .map(m => (
                        <option key={m.id} value={m.title} className="bg-[#0a211b] text-white">
                          [{m.type.split(" ")[0]}] {m.title}
                        </option>
                      ))
                    }
                    {quizScores
                      .filter(q => q.studentName === selectedStudentForManagement.name)
                      .map(q => (
                        <option key={q.id} value={q.quizTitle} className="bg-[#0a211b] text-white">
                          [Quiz] {q.quizTitle}
                        </option>
                      ))
                    }
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-premium hover:bg-emerald-500 active:scale-98 text-slate-950 font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-emerald-950/25 flex items-center justify-center gap-1.5 cursor-pointer transition-all mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Registrar en Historial</span>
                </button>
              </form>
            </div>

            {/* Componente de Línea de Tiempo Vertical (Timeline) */}
            <div className="space-y-4 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block border-b border-emerald-premium/10 pb-2">
                Línea de Tiempo de Avance Académico
              </span>

              <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-emerald-premium/25">
                {timelineNodes.filter(n => n.studentId === selectedStudentForManagement.id).length === 0 ? (
                  <p className="text-xs text-slate-500 italic py-4 pl-2 font-semibold">No se han registrado sesiones o temas avanzados todavía.</p>
                ) : (
                  timelineNodes
                    .filter(n => n.studentId === selectedStudentForManagement.id)
                    .sort((a, b) => b.date.localeCompare(a.date)) // Show newest first
                    .map((node) => {
                      const isAssociatedExpanded = activeAssociatedNodeId === node.id;

                      return (
                        <div key={node.id} className="relative group">
                          {/* Dot Indicator */}
                          <div className={`absolute -left-[20px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 z-10 ${
                            node.status === "Completado"
                              ? "bg-emerald-premium border-emerald-premium shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                              : node.status === "En Repaso"
                              ? "bg-amber-450 border-amber-450 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                              : "bg-rose-500 border-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          }`} />

                          <div className="p-4 bg-[#0a211b] border border-emerald-premium/10 group-hover:border-emerald-premium/25 rounded-2xl space-y-2 transition-all duration-300">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-mono text-emerald-400 font-bold">{node.date}</span>
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                node.status === "Completado"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : node.status === "En Repaso"
                                  ? "bg-amber-500/10 text-amber-450 border border-amber-500/20"
                                  : "bg-rose-500/10 text-rose-450 border border-rose-500/20"
                              }`}>
                                {node.status}
                              </span>
                            </div>

                            <h5 className="font-extrabold text-white text-sm leading-tight">{node.topic}</h5>

                            {/* Associated Materials Micro-enlace/botón */}
                            {node.associatedMaterials && node.associatedMaterials.length > 0 && (
                              <div className="pt-1">
                                <button
                                  type="button"
                                  onClick={() => toggleAssociatedResources(node.id)}
                                  className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-300 hover:text-emerald-400 transition-colors uppercase cursor-pointer"
                                >
                                  <span>🔍 {isAssociatedExpanded ? "Ocultar Recursos" : "Ver Recursos Asociados"} ({node.associatedMaterials.length})</span>
                                </button>

                                {isAssociatedExpanded && (
                                  <div className="mt-2 p-2.5 bg-[#051511] border border-emerald-premium/10 rounded-xl space-y-1.5">
                                    {node.associatedMaterials.map((resource, rIdx) => (
                                      <div key={rIdx} className="text-[10.5px] text-slate-300 font-semibold flex items-center gap-1.5">
                                        <span className="text-[9px] text-emerald-premium">✦</span>
                                        <span>{resource}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
