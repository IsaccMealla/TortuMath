import React, { useState } from "react";
import { Send, X, Plus } from "lucide-react";

import { StudentRegistration, AssignedMaterial } from "../../types";


interface DespachoTabProps {
  students: StudentRegistration[];
  assignedMaterials: AssignedMaterial[];
  setAssignedMaterials: React.Dispatch<React.SetStateAction<AssignedMaterial[]>>;
  addToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function DespachoTab({
  students,
  assignedMaterials,
  setAssignedMaterials,
  addToast
}: DespachoTabProps) {
  // Local Form States
  const [dispatchStudentId, setDispatchStudentId] = useState("all");
  const [dispatchSubject, setDispatchSubject] = useState("math");
  const [dispatchType, setDispatchType] = useState<"Guía de Ejercicios (PDF)" | "Mini-Prueba Interactiva" | "Tarea para el Cuaderno" | "Laboratorio Virtual">("Guía de Ejercicios (PDF)");
  const [dispatchTitle, setDispatchTitle] = useState("");
  const [dispatchInstructions, setDispatchInstructions] = useState("");
  const [dispatchStatus, setDispatchStatus] = useState("");

  const handleQuickDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchStudentId) {
      setDispatchStatus("❌ Por favor, selecciona un alumno.");
      return;
    }
    if (!dispatchTitle.trim()) {
      setDispatchStatus("❌ Por favor, ingresa un título para la actividad.");
      return;
    }

    if (dispatchStudentId === "all") {
      if (students.length === 0) {
        setDispatchStatus("❌ No hay estudiantes matriculados para asignar.");
        return;
      }
      const newMaterials: AssignedMaterial[] = students.map((student, idx) => ({
        id: `MAT-${Date.now()}-${idx}`,
        studentId: student.id,
        title: dispatchTitle.trim(),
        type: dispatchType,
        instructions: dispatchInstructions.trim() || "Instrucciones de revisión provistas en la sesión síncrona.",
        assignedAt: new Date().toISOString().split('T')[0],
        status: "pendiente"
      }));

      setAssignedMaterials(prev => [...newMaterials, ...prev]);
      setDispatchTitle("");
      setDispatchInstructions("");
      setDispatchStatus("🚀 ¡Actividad asignada grupalmente con éxito!");
      addToast("🚀 ¡Actividad asignada grupalmente con éxito!", "success");
    } else {
      const newMaterial: AssignedMaterial = {
        id: `MAT-${Date.now()}`,
        studentId: dispatchStudentId,
        title: dispatchTitle.trim(),
        type: dispatchType,
        instructions: dispatchInstructions.trim() || "Instrucciones de revisión provistas en la sesión síncrona.",
        assignedAt: new Date().toISOString().split('T')[0],
        status: "pendiente"
      };

      setAssignedMaterials(prev => [newMaterial, ...prev]);
      setDispatchTitle("");
      setDispatchInstructions("");
      setDispatchStatus("🚀 ¡Actividad despachada con éxito en tiempo real!");
      addToast("🚀 ¡Actividad despachada con éxito en tiempo real!", "success");
    }

    setTimeout(() => {
      setDispatchStatus("");
    }, 4000);
  };

  return (
    <div className="bg-[#0b1713]/90 border border-emerald-500/15 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-premium/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Title and description */}
      <div className="relative z-10">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Plus className="w-6 h-6 text-emerald-premium" />
          Módulo de Asignación y Despacho de Actividades
        </h3>
        <p className="text-xs text-slate-350 mt-1.5 leading-relaxed max-w-2xl font-medium">
          Asigna guías en PDF, mini-quizzes interactivos, tareas para resolver en el cuaderno o laboratorios virtuales. Puedes enviarlas a un estudiante individual o a todo el grupo a la vez.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Panel: Activity Assignment Form */}
        <div className="lg:col-span-1 bg-black/35 border border-emerald-500/20 rounded-2.5xl p-6 space-y-5">
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-premium border-b border-emerald-premium/15 pb-2">
            Nueva Asignación
          </h4>
          
          <form onSubmit={handleQuickDispatchSubmit} className="space-y-4">
            {/* Target student selection */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Estudiante Destinatario</label>
              <select
                value={dispatchStudentId}
                onChange={(e) => setDispatchStudentId(e.target.value)}
                className="w-full bg-[#030e0b] border border-emerald-premium/15 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-premium cursor-pointer"
              >
                <option value="all" className="bg-[#0a211b] text-emerald-450 font-black">👥 [Todos los estudiantes]</option>
                {students.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#0a211b] text-slate-200">
                    {s.name} ({s.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Materia / Especialidad</label>
              <select
                value={dispatchSubject}
                onChange={(e) => setDispatchSubject(e.target.value)}
                className="w-full bg-[#030e0b] border border-emerald-premium/15 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-premium cursor-pointer"
              >
                <option value="math" className="bg-[#0a211b]">📐 Matemáticas (TortuMath)</option>
                <option value="physics" className="bg-[#0a211b]">⚛️ Física (TortuPhysics)</option>
                <option value="code" className="bg-[#0a211b]">💻 Programación (TortuCode)</option>
                <option value="electronica" className="bg-[#0a211b]">🤖 Electrónica / Robótica</option>
              </select>
            </div>

            {/* Type of Activity */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Tipo de Actividad</label>
              <select
                value={dispatchType}
                onChange={(e) => setDispatchType(e.target.value as any)}
                className="w-full bg-[#030e0b] border border-emerald-premium/15 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-premium cursor-pointer"
              >
                <option value="Guía de Ejercicios (PDF)" className="bg-[#0a211b] text-slate-200">Guía de Ejercicios (PDF)</option>
                <option value="Mini-Prueba Interactiva" className="bg-[#0a211b] text-slate-200">Mini-Prueba Interactiva</option>
                <option value="Tarea para el Cuaderno" className="bg-[#0a211b] text-slate-200">Tarea para el Cuaderno</option>
                <option value="Laboratorio Virtual" className="bg-[#0a211b] text-slate-200">Laboratorio Virtual 🧪</option>
              </select>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Título de la Actividad</label>
              <input
                type="text"
                placeholder="Ej: Análisis de Matrices e Inversión"
                value={dispatchTitle}
                onChange={(e) => setDispatchTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#030e0b] border border-emerald-premium/15 text-slate-200 text-xs font-bold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600"
              />
            </div>

            {/* Instructions */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-black tracking-wider text-slate-400">Instrucciones o Enlace PDF</label>
              <textarea
                rows={3}
                placeholder="Ej: Completar el Laboratorio 3 en Tinkercad o descargar el archivo PDF..."
                value={dispatchInstructions}
                onChange={(e) => setDispatchInstructions(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#030e0b] border border-emerald-premium/15 text-slate-200 text-xs font-bold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-premium placeholder-slate-600 resize-none"
              />
            </div>

            {dispatchStatus && (
              <div className="p-3 text-[10.5px] font-black rounded-xl text-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-350">
                {dispatchStatus}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-premium hover:bg-emerald-500 text-slate-950 font-black uppercase text-xs tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-950/25 active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Asignar Actividad</span>
            </button>
          </form>
        </div>

        {/* Right Panel: List and management of all assignments */}
        <div className="lg:col-span-2 bg-black/20 border border-emerald-premium/15 rounded-2.5xl p-6 space-y-4">
          
          {/* Search and summary counts */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-emerald-premium/15 pb-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-premium">
              Registro de Actividades Asignadas
            </h4>
            
            <div className="text-[10px] font-mono text-slate-400 bg-emerald-premium/5 border border-emerald-premium/15 px-3 py-1 rounded-full">
              Total: <span className="font-extrabold text-white">{assignedMaterials.length}</span> asignaciones
            </div>
          </div>

          {/* Assignments Table */}
          <div className="overflow-x-auto border border-emerald-premium/10 rounded-xl bg-black/25">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#051511] border-b border-emerald-premium/15 text-slate-400 uppercase font-black tracking-wider text-[9px]">
                  <th className="p-3">Destinatario</th>
                  <th className="p-3">Tipo y Título</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3 text-center">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-premium/5">
                {assignedMaterials.length > 0 ? (
                  assignedMaterials.map((mat) => {
                    const matchedStudent = students.find(s => s.id === mat.studentId);
                    return (
                      <tr key={mat.id} className="hover:bg-emerald-premium/5 transition-colors">
                        {/* Student Column */}
                        <td className="p-3">
                          <span className="font-extrabold text-white block">
                            {matchedStudent ? matchedStudent.name : "Todos (Grupal)"}
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">
                            {matchedStudent ? `ID: ${matchedStudent.id}` : "Multicast"}
                          </span>
                        </td>

                        {/* Type and Title Column */}
                        <td className="p-3">
                          <span className="inline-flex items-center px-1.5 py-0.2 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25 text-[8.5px] uppercase font-black tracking-wider rounded mb-1">
                            {mat.type}
                          </span>
                          <span className="font-bold text-slate-200 block text-xs truncate max-w-[200px]" title={mat.title}>
                            {mat.title}
                          </span>
                        </td>

                        {/* Assigned Date Column */}
                        <td className="p-3 font-mono font-medium text-slate-400">
                          {mat.assignedAt}
                        </td>

                        {/* Status Badge Column */}
                        <td className="p-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider ${
                            mat.status === "pendiente"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : mat.status === "realizando"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : mat.status === "entregado"
                              ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                              : "bg-emerald-500/10 text-emerald-450 border border-emerald-500/20"
                          }`}>
                            {mat.status}
                          </span>
                        </td>

                        {/* Action Column */}
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`¿Estás seguro de que deseas eliminar la asignación "${mat.title}"? Esta acción no se puede deshacer.`)) {
                                setAssignedMaterials(prev => prev.filter(m => m.id !== mat.id));
                                addToast("✓ Asignación eliminada correctamente.", "success");
                              }
                            }}
                            className="p-1.5 bg-rose-950/20 hover:bg-rose-900/40 text-rose-300 hover:text-rose-450 border border-rose-900/30 hover:border-rose-500/45 rounded-lg active:scale-95 transition-all cursor-pointer"
                            title="Eliminar Asignación"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-slate-500 font-bold italic">
                      No hay actividades registradas en la base de datos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
