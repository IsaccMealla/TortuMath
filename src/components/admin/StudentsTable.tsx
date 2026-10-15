import React from "react";
import { 
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  Link,
  Edit3,
  Activity,
  BookOpen,
  Sparkles,
  Award,
  ClipboardCheck,
  Trash2,
  Pencil
} from "lucide-react";
import { StudentRegistration, AssignedMaterial, QuizLog } from "../../types";

export interface StudentsTableProps {
  students: StudentRegistration[];
  filteredStudents: StudentRegistration[];
  filterSubject: string;
  setFilterSubject: (subject: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  togglePaymentStatus: (id: string) => void;
  updateMeetLink: (id: string, currentLink: string) => void;
  expandedStudentId: string | null;
  setExpandedStudentId: (id: string | null) => void;
  quizScores: QuizLog[];
  assignedMaterials: AssignedMaterial[];
  handleSimulateMaterialSubmission: (id: string) => void;
  setSelectedStudentForManagement: (student: StudentRegistration | null) => void;
  setAssignmentStatusMessage: (msg: string) => void;
  onEditStudent: (student: StudentRegistration) => void;
  onDeleteStudent: (student: StudentRegistration) => void;
}

const getSubjectBadge = (subject: string) => {
  const norm = subject.toLowerCase();
  if (norm.includes("matemát") || norm.includes("math")) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
        📐 TortuMath
      </span>
    );
  }
  if (norm.includes("físic") || norm.includes("physic")) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/15 text-sky-400 border border-sky-500/30">
        ⚛️ TortuPhysics
      </span>
    );
  }
  if (norm.includes("program") || norm.includes("code")) {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/15 text-purple-400 border border-purple-500/30">
        💻 TortuCode
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
      🤖 TortuProject
    </span>
  );
};

export default function StudentsTable({
  students,
  filteredStudents,
  filterSubject,
  setFilterSubject,
  searchTerm,
  setSearchTerm,
  togglePaymentStatus,
  updateMeetLink,
  expandedStudentId,
  setExpandedStudentId,
  quizScores,
  assignedMaterials,
  handleSimulateMaterialSubmission,
  setSelectedStudentForManagement,
  setAssignmentStatusMessage,
  onEditStudent,
  onDeleteStudent,
}: StudentsTableProps) {
  return (
    <div className="bg-forest-surface border border-emerald-premium/20 rounded-3xl p-5 md:p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-emerald-premium/15 pb-4 text-left">
        <div className="space-y-1">
          <h2 className="text-base font-black text-white font-sans uppercase tracking-wider">
            Panel de Inscritos y Acciones Académicas
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Haz clic en el badge de pago para verificar montos. Usa "Gestionar Académico" para asignar guías o el radar de "Progreso" para ver su trazabilidad.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#10B981]" /> Filtro Rápido:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "all", label: "✨ Todos" },
              { id: "math", label: "📐 Matemáticas" },
              { id: "physics", label: "⚛️ Física" },
              { id: "code", label: "💻 Programación" },
              { id: "electronica", label: "🔌 Electrónica" }
            ].map((sub) => (
              <button
                key={sub.id}
                type="button"
                onClick={() => setFilterSubject(sub.id)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
                  filterSubject === sub.id
                    ? "bg-emerald-premium border-emerald-premium text-slate-950 font-black shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                    : "bg-[#051511] border-[#0d342a] text-[#8eab9f] hover:border-emerald-premium/40 hover:text-white"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Field */}
      <div className="relative max-w-sm text-left">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre, celular o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-deep-forest/60 border border-emerald-premium/15 text-slate-200 text-xs font-bold rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-slate-500"
        />
      </div>

      {/* Students List Table */}
      <div className="overflow-x-auto rounded-2xl border border-emerald-premium/15">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-black/40 text-slate-300 font-black border-b border-emerald-premium/15 uppercase tracking-widest text-[9.5px]">
              <th className="py-3.5 px-4">Alumno / Datos de Contacto</th>
              <th className="py-3.5 px-4">Materia / Plan semanal</th>
              <th className="py-3.5 px-4">Horario Acordado</th>
              <th className="py-3.5 px-4">Estado del Pago</th>
              <th className="py-3.5 px-4 text-center">Enlace de Aula</th>
              <th className="py-3.5 px-4 text-right">Herramientas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-premium/10 bg-forest-surface/20">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <React.Fragment key={student.id}>
                  <tr className="hover:bg-emerald-premium/5 text-slate-100 transition-colors">
                    {/* Alumno cell */}
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-extrabold text-[#F1F5F9] text-sm">{student.name}</div>
                        {getSubjectBadge(student.subject)}
                      </div>
                      <div className="flex flex-col gap-0.5 text-[10.5px] text-slate-400 font-mono">
                        <span className="font-bold text-[#10B981]">ID: {student.id}</span>
                        <span>Cel: +591 {student.phone}</span>
                        <span className="truncate max-w-[180px] block opacity-80">{student.email}</span>
                      </div>
                    </td>

                    {/* Materia cell */}
                    <td className="py-4 px-4 space-y-1">
                      <span className="font-black text-[#10B981] bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20 inline-block text-[11px]">
                        {student.subject}
                      </span>
                      <div className="text-slate-300 font-bold text-[11px]">{student.plan}</div>
                      <div className="font-mono text-slate-450 text-[10px]">
                        Monto: <span className="font-bold text-white">{student.amount} Bs</span>
                      </div>
                    </td>

                    {/* Horario cell */}
                    <td className="py-4 px-4">
                      <p className="text-slate-200 font-semibold max-w-xs leading-normal">
                        {student.schedule}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">Registro: {student.registrationDate}</span>
                    </td>

                    {/* Pago Status cell */}
                    <td className="py-4 px-4">
                      <button
                        type="button"
                        onClick={() => togglePaymentStatus(student.id)}
                        className="focus:outline-none transition-transform active:scale-95 cursor-pointer block text-left"
                        title="Haz clic para alternar verificación de transferencia"
                      >
                        {student.paymentVerified ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-[10.5px] font-black tracking-wide shadow-sm hover:brightness-110">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            VERIFICADO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-950/80 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-full text-[10.5px] font-black tracking-wide shadow-sm hover:brightness-110">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                            PENDIENTE
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Meet Link cell */}
                    <td className="py-4 px-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <a
                          href={student.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-450 hover:text-blue-300 transition-colors underline"
                        >
                          <Link className="w-3.5 h-3.5" />
                          Google Meet
                        </a>
                        
                        <button
                          type="button"
                          onClick={() => updateMeetLink(student.id, student.meetLink)}
                          className="px-2.5 py-1 bg-slate-800/80 hover:bg-[#0a211b] text-slate-300 hover:text-emerald-300 text-[9.5px] font-black rounded border border-slate-750 hover:border-emerald-500/30 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-2.5 h-2.5" />
                          Enlace
                        </button>
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center gap-1.5 justify-end flex-wrap">
                        <button
                          onClick={() => setExpandedStudentId(expandedStudentId === student.id ? null : student.id)}
                          className={`p-2 rounded-xl transition-all border ${
                            expandedStudentId === student.id
                              ? "bg-emerald-premium/20 border-emerald-premium/40 text-emerald-premium shadow-md"
                              : "bg-[#061612]/80 border-emerald-premium/10 text-slate-400 hover:text-emerald-300 hover:border-emerald-premium/25"
                          }`}
                          title="Ver progreso y traza"
                        >
                          <Activity className="w-4 h-4 animate-pulse" />
                        </button>

                        <button
                          onClick={() => onEditStudent(student)}
                          className="p-2 rounded-xl transition-all border bg-[#061612]/80 border-sky-500/15 text-slate-400 hover:text-sky-300 hover:border-sky-500/30 cursor-pointer"
                          title="Editar alumno"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteStudent(student)}
                          className="p-2 rounded-xl transition-all border bg-[#061612]/80 border-red-500/15 text-slate-400 hover:text-red-400 hover:border-red-500/30 cursor-pointer"
                          title="Eliminar alumno"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedStudentForManagement(student);
                            setAssignmentStatusMessage("");
                          }}
                          className="px-3.5 py-2 bg-gradient-to-r from-emerald-650 to-emerald-700 hover:from-emerald-550 hover:to-emerald-650 active:scale-95 text-[#061612] font-black uppercase text-xs tracking-wider rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Gestionar</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expandable trace sub-row */}
                  {expandedStudentId === student.id && (
                    <tr className="bg-[#030d0a]/60">
                      <td colSpan={6} className="py-4 px-6 border-b border-emerald-premium/10">
                        <div className="space-y-3.5 text-left">
                          <div className="flex items-center justify-between border-b border-emerald-premium/10 pb-2">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-emerald-premium" />
                              <span className="font-extrabold text-[#F1F5F9] text-xs uppercase tracking-wider">Historial y Trazabilidad de Avance: {student.name}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">ID Estudiante: {student.id}</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Sub-block 1: Quizzes list for this student */}
                            <div className="p-3 bg-black/15 rounded-xl border border-emerald-premium/5 space-y-2">
                              <h5 className="text-[10.5px] uppercase font-black text-emerald-premium tracking-wider flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-emerald-premium" /> Quizzes Evaluados
                              </h5>
                              <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                                {quizScores.filter(q => q.studentName === student.name).length > 0 ? (
                                  quizScores.filter(q => q.studentName === student.name).map(quiz => (
                                    <div key={quiz.id} className="flex justify-between items-center text-[11px] p-2 bg-[#051511]/30 rounded-lg">
                                      <div>
                                        <span className="font-bold text-slate-200">{quiz.quizTitle}</span>
                                        <span className="block text-[9px] text-slate-500 font-mono">{quiz.date}</span>
                                      </div>
                                      <span className={`font-mono font-black px-1.5 py-0.5 rounded text-[10px] ${
                                        quiz.status === "aprobado" ? "text-emerald-400 bg-emerald-950/40" : "text-rose-400 bg-rose-950/40"
                                      }`}>
                                        {quiz.score}/{quiz.maxScore}
                                      </span>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-[10px] text-slate-500 italic py-2">No se registran quizzes completados.</p>
                                )}
                              </div>
                            </div>

                            {/* Sub-block 2: Assigned materials trace */}
                            <div className="p-3 bg-black/15 rounded-xl border border-emerald-premium/5 space-y-2">
                              <h5 className="text-[10.5px] uppercase font-black text-emerald-premium tracking-wider flex items-center gap-1">
                                <ClipboardCheck className="w-3.5 h-3.5 text-emerald-premium" /> Avance de Tareas y PDF
                              </h5>
                              <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1">
                                {assignedMaterials.filter(m => m.studentId === student.id).length > 0 ? (
                                  assignedMaterials.filter(m => m.studentId === student.id).map(material => (
                                    <div key={material.id} className="flex justify-between items-center text-[11px] p-2 bg-[#051511]/30 rounded-lg">
                                      <div className="space-y-0.5">
                                        <span className="font-bold text-slate-200 block">{material.title}</span>
                                        <div className="flex items-center gap-1.5 text-[9px] text-slate-450">
                                          <span>{material.type}</span>
                                          <span>•</span>
                                          <span>Asignado: {material.assignedAt}</span>
                                        </div>
                                      </div>
                                      <div className="text-right flex flex-col items-end gap-1">
                                        {material.status === "pendiente" && <span className="text-amber-400 text-[9.5px] font-bold">[ Pendiente ]</span>}
                                        {material.status === "realizando" && <span className="text-blue-400 text-[9.5px] font-bold">[ Realizando ]</span>}
                                        {material.status === "entregado" && <span className="text-indigo-400 text-[9.5px] font-bold animate-pulse">[ Entregado ]</span>}
                                        {material.status === "calificado" && (
                                          <span className="text-emerald-400 text-[9.5px] font-bold">
                                            [ Nota: {material.score}/100 ]
                                          </span>
                                        )}
                                        {material.status !== "calificado" && (
                                          <button
                                            onClick={() => handleSimulateMaterialSubmission(material.id)}
                                            className="px-1.5 py-0.5 bg-emerald-premium/15 hover:bg-emerald-premium/25 border border-emerald-premium/20 text-emerald-300 text-[8.5px] font-black uppercase rounded transition-all cursor-pointer"
                                          >
                                            Simular Entrega
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-[10px] text-slate-500 italic py-2">No hay material asignado actualmente.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 font-bold">
                  No se encontraron alumnos con los criterios ingresados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
