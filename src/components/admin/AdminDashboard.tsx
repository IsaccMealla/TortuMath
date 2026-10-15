import React, { useState } from "react";
import DespachoTab from "./DespachoTab";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  Coins,
  Calendar, 
  TrendingUp,
  Sparkles,
  RefreshCw,
  Award,
  BookOpenCheck,
  Image,
  Plus
} from "lucide-react";

import { 
  StudentRegistration, 
  AssignedMaterial, 
  HomeworkSubmission, 
  QuizLog, 
  TimelineNode 
} from "../../types";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import LiveTraceCard from "./LiveTraceCard";
import StudentsTable from "./StudentsTable";
import FinanceTab from "./FinanceTab";
import GradingModal from "./GradingModal";
import StudentManagementDrawer from "./StudentManagementDrawer";
import HomeworkCorrectionModal from "./HomeworkCorrectionModal";
import StudentCrudModal from "./StudentCrudModal";

interface AdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
  students: StudentRegistration[];
  setStudents: React.Dispatch<React.SetStateAction<StudentRegistration[]>>;
  assignedMaterials: AssignedMaterial[];
  setAssignedMaterials: React.Dispatch<React.SetStateAction<AssignedMaterial[]>>;
  submissions: HomeworkSubmission[];
  setSubmissions: React.Dispatch<React.SetStateAction<HomeworkSubmission[]>>;
  quizScores: QuizLog[];
  setQuizScores: React.Dispatch<React.SetStateAction<QuizLog[]>>;
}

export default function AdminDashboard({
  userEmail,
  onLogout,
  students,
  setStudents,
  assignedMaterials,
  setAssignedMaterials,
  submissions,
  setSubmissions,
  quizScores,
  setQuizScores,
}: AdminDashboardProps) {
  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<"alumnos" | "tareas" | "quizzes" | "finanzas" | "despacho">("alumnos");

  // Search and Filter controls
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");

  // Finance Module interactive simulation state
  const [simPriceAdjustment, setSimPriceAdjustment] = useState<number>(0); 
  const [simNewStudents, setSimNewStudents] = useState<number>(0); 
  const [simAvgNewStudentFee, setSimAvgNewStudentFee] = useState<number>(190); 
  const [financeLedgerFilter, setFinanceLedgerFilter] = useState<string>("all"); 
  const [selectedFinanceArea, setSelectedFinanceArea] = useState<string>("all"); 
  const [finSubTab, setFinSubTab] = useState<"tablero" | "simulador" | "conciliacion">("tablero"); 

  // Toast notifications state
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "error" | "info" }[]>([]);

  const addToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Modal / Drawer Selection state
  const [selectedStudentForManagement, setSelectedStudentForManagement] = useState<StudentRegistration | null>(null);
  const [viewingSubmission, setViewingSubmission] = useState<HomeworkSubmission | null>(null);

  // CRUD Modal state
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [crudModalMode, setCrudModalMode] = useState<"create" | "edit">("create");
  const [studentToEdit, setStudentToEdit] = useState<StudentRegistration | null>(null);

  // Assignment Form State
  const [assignmentType, setAssignmentType] = useState<"Guía de Ejercicios (PDF)" | "Mini-Prueba Interactiva" | "Tarea para el Cuaderno" | "Laboratorio Virtual">("Guía de Ejercicios (PDF)");
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentInstructions, setAssignmentInstructions] = useState("");
  const [assignmentStatusMessage, setAssignmentStatusMessage] = useState("");

  // Correction Action Form State
  const [correctionObservation, setCorrectionObservation] = useState("");
  const [correctionMode, setCorrectionMode] = useState<"idle" | "write">("idle");

  // Expandable row tracking for direct student traceability
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  // New grading modal state
  const [gradingMaterial, setGradingMaterial] = useState<AssignedMaterial | null>(null);
  const [gradingScore, setGradingScore] = useState<number>(100);
  const [gradingObservation, setGradingObservation] = useState("");

  // Timeline/Avance Historial State
  const [timelineNodes, setTimelineNodes] = useState<TimelineNode[]>([
    {
      id: "TL-1",
      studentId: "STU-001",
      date: "2026-06-25",
      topic: "Concepto de Matrices y Determinantes",
      status: "Completado",
      associatedMaterials: ["Guía de Matrices y Determinantes Grado 2"]
    },
    {
      id: "TL-2",
      studentId: "STU-001",
      date: "2026-06-28",
      topic: "Método de Cofactores y Cramer",
      status: "En Repaso",
      associatedMaterials: ["Mini Reto de Álgebra Lineal", "Práctica de Despejes algebraicos"]
    },
    {
      id: "TL-3",
      studentId: "STU-002",
      date: "2026-06-29",
      topic: "Ecuaciones de MRUV en una Dimensión",
      status: "Completado",
      associatedMaterials: ["Problemas de MRUV y Caída Libre", "Diagrama de Caída Libre con Rozamiento"]
    },
    {
      id: "TL-4",
      studentId: "STU-002",
      date: "2026-07-01",
      topic: "Caída Libre y Lanzamiento Vertical",
      status: "Por Evaluar",
      associatedMaterials: ["Problemas de MRUV y Caída Libre"]
    },
    {
      id: "TL-5",
      studentId: "STU-003",
      date: "2026-06-30",
      topic: "Estructuras de Control Repetitivas (Loops Python)",
      status: "Completado",
      associatedMaterials: ["Autoevaluación de Bucles Python"]
    },
    {
      id: "TL-6",
      studentId: "STU-004",
      date: "2026-06-28",
      topic: "Introducción a Bloques Lógicos en Scratch",
      status: "Completado",
      associatedMaterials: []
    }
  ]);

  // Drawer Tabs Tracking for academic management
  const [drawerTab, setDrawerTab] = useState<"materiales" | "timeline">("materiales");

  // Registration Form for timeline nodes state
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicStatus, setNewTopicStatus] = useState<"Completado" | "En Repaso" | "Por Evaluar">("Completado");
  const [activeAssociatedNodeId, setActiveAssociatedNodeId] = useState<string | null>(null);

  const handleRegisterTimelineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !selectedStudentForManagement) return;

    const dateInput = document.getElementById("timeline-date-input") as HTMLInputElement;
    const selectedDate = dateInput ? dateInput.value : new Date().toISOString().split("T")[0];

    const associatedSelect = document.getElementById("associated-material-select") as HTMLSelectElement;
    const associatedValue = associatedSelect ? associatedSelect.value : "";
    const associatedMaterials = associatedValue ? [associatedValue] : [];

    const newNode: TimelineNode = {
      id: `TL-${Date.now()}`,
      studentId: selectedStudentForManagement.id,
      date: selectedDate,
      topic: newTopicTitle.trim(),
      status: newTopicStatus,
      associatedMaterials: associatedMaterials
    };

    setTimelineNodes(prev => [newNode, ...prev]);
    setNewTopicTitle("");
    setNewTopicStatus("Completado");
    if (associatedSelect) associatedSelect.value = "";
  };

  const toggleAssociatedResources = (nodeId: string) => {
    setActiveAssociatedNodeId(prev => prev === nodeId ? null : nodeId);
  };

  // Interaction handlers for main students table
  const togglePaymentStatus = (id: string) => {
    setStudents(prev => 
      prev.map(student => {
        if (student.id === id) {
          return {
            ...student,
            paymentVerified: !student.paymentVerified
          };
        }
        return student;
      })
    );
  };

  const updateMeetLink = (id: string, currentLink: string) => {
    const newLink = prompt("Ingresa el nuevo enlace de Google Meet para este alumno:", currentLink);
    if (newLink !== null) {
      setStudents(prev =>
        prev.map(student => {
          if (student.id === id) {
            return {
              ...student,
              meetLink: newLink.trim() || "https://meet.google.com/new-link"
            };
          }
          return student;
        })
      );
    }
  };

  // CRUD Handlers
  const handleOpenCreateModal = () => {
    setCrudModalMode("create");
    setStudentToEdit(null);
    setCrudModalOpen(true);
  };

  const handleOpenEditModal = (student: StudentRegistration) => {
    setCrudModalMode("edit");
    setStudentToEdit(student);
    setCrudModalOpen(true);
  };

  const handleStudentCreated = (newStudent: StudentRegistration) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleStudentUpdated = (updatedStudent: StudentRegistration) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = async (student: StudentRegistration) => {
    if (!confirm(`¿Estás seguro de eliminar al alumno "${student.name}"? Esta acción eliminará su cuenta de usuario y todos sus datos académicos.`)) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/students/${student.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        addToast(data.error || "Error al eliminar alumno", "error");
        return;
      }
      setStudents(prev => prev.filter(s => s.id !== student.id));
      setAssignedMaterials(prev => prev.filter(m => m.studentId !== student.id));
      setSubmissions(prev => prev.filter(s => s.studentId !== student.id));
      addToast(`Alumno "${student.name}" eliminado correctamente`, "success");
    } catch (err) {
      addToast("Error de conexión al eliminar alumno", "error");
    }
  };

  // Assign Material Action Handler
  const handleAssignMaterialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForManagement) return;
    if (!assignmentTitle.trim()) {
      setAssignmentStatusMessage("Por favor ingresa un título para el tema.");
      return;
    }

    const newMaterial: AssignedMaterial = {
      id: `MAT-${Date.now()}`,
      studentId: selectedStudentForManagement.id,
      title: assignmentTitle.trim(),
      type: assignmentType,
      instructions: assignmentInstructions.trim() || "Seguir las instrucciones provistas en clase síncrona.",
      assignedAt: new Date().toISOString().split('T')[0],
      status: "pendiente"
    };

    setAssignedMaterials([newMaterial, ...assignedMaterials]);
    setAssignmentTitle("");
    setAssignmentInstructions("");
    setAssignmentStatusMessage("✅ ¡Material académico asignado con éxito!");

    setTimeout(() => {
      setAssignmentStatusMessage("");
    }, 4000);
  };

  const handleUpdateMaterialStatus = (id: string, status: AssignedMaterial["status"]) => {
    setAssignedMaterials(prev =>
      prev.map(item => {
        if (item.id === id) {
          return { ...item, status };
        }
        return item;
      })
    );
  };

  const handleSimulateMaterialSubmission = (id: string) => {
    setAssignedMaterials(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.type === "Mini-Prueba Interactiva") {
            const randomScore = [70, 80, 85, 90, 95, 100][Math.floor(Math.random() * 6)];
            const student = students.find(s => s.id === item.studentId);
            if (student) {
              const newQuizLog: QuizLog = {
                id: `Q-${Date.now()}`,
                studentName: student.name,
                quizTitle: item.title,
                score: randomScore,
                maxScore: 100,
                date: new Date().toISOString().split('T')[0],
                status: randomScore >= 70 ? "aprobado" : "repaso"
              };
              setQuizScores(prevQuizzes => [newQuizLog, ...prevQuizzes]);
            }
            return {
              ...item,
              status: "calificado",
              score: randomScore,
              maxScore: 100,
              observation: "Calificación automática calculada por la plataforma en tiempo real."
            };
          } else {
            const student = students.find(s => s.id === item.studentId);
            const mockContent = item.type === "Tarea para el Cuaderno" ? [
              `${student?.name || "Estudiante"} - TortuMath`,
              `Práctica de Avance: ${item.title}`,
              `Fecha: ${new Date().toISOString().split('T')[0]}`,
              `--------------------------------------------------`,
              `[RESOLUCIÓN DE EJERCICIOS EN CUADERNO]`,
              `  Fórmula clave: a² + b² = c²`,
              `  Sustitución de datos del enunciado:`,
              `    x = (15 * cos(45)) / sin(30) = 21.21`,
              `  (Se ha subido la fotografía en alta definición)`,
              `  Listo para revisión y calificación del tutor.`
            ] : [
              `Guía de Ejercicios: ${item.title}`,
              `Estudiante: ${student?.name || "Estudiante"}`,
              `--------------------------------------------------`,
              `Ejercicios 1 a 5 resueltos y adjuntados en PDF.`,
              `Tutor puede proceder con la corrección.`
            ];

            return {
              ...item,
              status: "entregado",
              notebookContent: mockContent
            };
          }
        }
        return item;
      })
    );
  };

  const handleOpenGradingModal = (material: AssignedMaterial) => {
    setGradingMaterial(material);
    setGradingScore(material.score || 100);
    setGradingObservation(material.observation || "");
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingMaterial) return;

    setAssignedMaterials(prev =>
      prev.map(item => {
        if (item.id === gradingMaterial.id) {
          return {
            ...item,
            status: "calificado",
            score: gradingScore,
            maxScore: 100,
            observation: gradingObservation.trim() || "Revisión finalizada con éxito."
          };
        }
        return item;
      })
    );

    const student = students.find(s => s.id === gradingMaterial.studentId);
    if (student) {
      const isNotebook = gradingMaterial.type === "Tarea para el Cuaderno";
      if (isNotebook) {
        const matchedSubmission = submissions.find(sub => sub.studentId === student.id && sub.title === gradingMaterial.title);
        if (matchedSubmission) {
          setSubmissions(prev =>
            prev.map(sub => {
              if (sub.id === matchedSubmission.id) {
                return {
                  ...sub,
                  status: gradingScore >= 70 ? "aprobado" : "observado",
                  observation: gradingObservation.trim()
                };
              }
              return sub;
            })
          );
        } else {
          const newSub: HomeworkSubmission = {
            id: `SUB-${Date.now()}`,
            studentId: student.id,
            studentName: student.name,
            title: gradingMaterial.title,
            subject: student.subject.split(" ")[0],
            submittedAt: new Date().toISOString().split('T')[0] + " 12:00",
            status: gradingScore >= 70 ? "aprobado" : "observado",
            observation: gradingObservation.trim(),
            notebookContent: gradingMaterial.notebookContent || ["Resolución manuscrita revisada en el cuaderno."]
          };
          setSubmissions(prev => [newSub, ...prev]);
        }
      }
    }

    setGradingMaterial(null);
    setGradingObservation("");
    setGradingScore(100);
  };

  // Notebook Correction Action Handlers
  const handleApproveHomework = (submissionId: string) => {
    setSubmissions(prev => 
      prev.map(sub => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            status: "aprobado",
            observation: "Aprobado por el Administrador. Resolución correcta en el cuaderno."
          };
        }
        return sub;
      })
    );
    setViewingSubmission(prev => prev && prev.id === submissionId ? {
      ...prev,
      status: "aprobado",
      observation: "Aprobado por el Administrador. Resolución correcta en el cuaderno."
    } : prev);
  };

  const handleSendObservation = (submissionId: string, observationText: string) => {
    if (!observationText.trim()) return;
    setSubmissions(prev => 
      prev.map(sub => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            status: "observado",
            observation: observationText.trim()
          };
        }
        return sub;
      })
    );
    setViewingSubmission(prev => prev && prev.id === submissionId ? {
      ...prev,
      status: "observado",
      observation: observationText.trim()
    } : prev);
    setCorrectionMode("idle");
    setCorrectionObservation("");
  };

  // Simulator for Student completing quizzes automatically
  const handleSimulateQuizResult = () => {
    const studentNames = students.map(s => s.name);
    const quizes = [
      "Vectores en el Espacio 3D",
      "Leyes de Newton Avanzado",
      "Sistemas de Ecuaciones 3x3",
      "Condicionales y Bifurcaciones Python",
      "Leyes de Termodinámica Básica"
    ];

    const randomStudent = studentNames[Math.floor(Math.random() * studentNames.length)] || "Sofía Ramos Ortiz";
    const randomQuiz = quizes[Math.floor(Math.random() * quizes.length)];
    const score = [60, 70, 80, 90, 100][Math.floor(Math.random() * 5)];
    const status = score >= 70 ? "aprobado" : "repaso";

    const newLog: QuizLog = {
      id: `Q-${Date.now()}`,
      studentName: randomStudent,
      quizTitle: randomQuiz,
      score: score,
      maxScore: 100,
      date: new Date().toISOString().split('T')[0],
      status: status as "aprobado" | "repaso"
    };

    setQuizScores([newLog, ...quizScores]);
  };

  // Metric Computations
  const activeStudentsCount = students.length;
  const verifiedIncome = students.filter(s => s.paymentVerified).reduce((sum, s) => sum + s.amount, 0);
  const totalPossibleIncome = students.reduce((sum, s) => sum + s.amount, 0);
  const sessionsScheduledCount = students.length;
  const pendingCorrectionsCount = submissions.filter(s => s.status === "pendiente").length;

  // Dynamic Warning Notifications (Critical Alerts)
  const criticalQuizFailures = quizScores.filter(q => q.status === "repaso").length;
  const pendingDeliveries = assignedMaterials.filter(m => m.status === "entregado").length;

  // Real performance metrics per student
  const getStudentMetrics = (studentId: string, studentName: string) => {
    let attended = 18;
    let scheduled = 20;
    if (studentId === "STU-001") { attended = 19; scheduled = 20; }
    else if (studentId === "STU-002") { attended = 15; scheduled = 18; }
    else if (studentId === "STU-003") { attended = 17; scheduled = 18; }
    else if (studentId === "STU-004") { attended = 5; scheduled = 10; }
    else if (studentId === "STU-005") { attended = 9; scheduled = 10; }

    const attendanceRate = Math.round((attended / scheduled) * 100);

    const studentQuizzes = quizScores.filter(q => q.studentName === studentName);
    const quizAverage = studentQuizzes.length > 0
      ? Math.round(studentQuizzes.reduce((sum, q) => sum + q.score, 0) / studentQuizzes.length)
      : 80;

    const isAtRisk = quizAverage < 60 || attendanceRate < 60;

    return {
      attended,
      scheduled,
      attendanceRate,
      quizAverage,
      isAtRisk,
      quizCount: studentQuizzes.length
    };
  };

  // Search filter implementation
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.phone.includes(searchTerm) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = filterSubject === "all" || 
                           (filterSubject === "math" && student.subject.toLowerCase().includes("matemát")) ||
                           (filterSubject === "physics" && student.subject.toLowerCase().includes("físic")) ||
                           (filterSubject === "code" && student.subject.toLowerCase().includes("program")) ||
                           (filterSubject === "electronica" && student.subject.toLowerCase().includes("electrón")) ||
                           (filterSubject === "project" && (student.subject.toLowerCase().includes("robót") || student.subject.toLowerCase().includes("scratch")));
    
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-deep-forest text-[#F1F5F9] font-sans antialiased flex flex-col md:flex-row">
      
      {/* 1. SIDEBAR NAVEGACIÓN (Premium Emerald Forest Sidebar) */}
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCorrectionsCount={pendingCorrectionsCount}
        criticalQuizFailures={criticalQuizFailures}
        pendingDeliveries={pendingDeliveries}
        userEmail={userEmail}
        onLogout={onLogout}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 min-w-0 md:h-screen md:overflow-y-auto flex flex-col">
        {/* Top Header Information bar */}
        <DashboardHeader activeTab={activeTab} />

        {/* Primary Screen Area wrapped in Framer Motion */}
        <main className="p-6 md:p-8 space-y-8 flex-1">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >

              {/* TAB 1: ALUMNOS Y MATRÍCULAS */}
              {activeTab === "alumnos" && (
                <>
                  {/* Overview Hero Card */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-black/60 to-[#0a211b] border border-emerald-premium/20 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-premium/5 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-1 relative z-10 text-left">
                      <h1 className="text-xl md:text-2xl font-black text-white flex items-center gap-2">
                        <Sparkles className="w-5.5 h-5.5 text-emerald-premium animate-pulse" />
                        Módulo de Control Académico TortuMath
                      </h1>
                      <p className="text-xs text-slate-350 font-medium leading-relaxed max-w-xl">
                        Asigna guías PDF, exámenes interactivos o tareas para el cuaderno a cada estudiante. Monitorea y valida sus transferencias bancarias de Bs. de manera síncrona.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenCreateModal}
                      className="flex items-center gap-2 px-5 py-3 bg-emerald-premium hover:bg-emerald-500 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-emerald-950/25 active:scale-95 cursor-pointer transition-all self-stretch md:self-auto justify-center"
                    >
                      <Plus className="w-4 h-4" />
                      Registrar Nuevo Alumno
                    </button>
                  </div>

                  {/* Top Numeric Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Metric 1 */}
                    <div className="p-5 rounded-2.5xl bg-forest-surface border border-emerald-premium/15 flex items-center justify-between shadow-sm relative overflow-hidden text-left">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                          Total Alumnos Activos
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-mono font-black text-white">{activeStudentsCount}</span>
                          <span className="text-[10px] font-bold text-emerald-450 flex items-center gap-0.5">
                            <TrendingUp className="w-3 h-3 text-emerald-450" /> Activos
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-450 font-semibold leading-normal">Coordinación en vivo 1 a 1</p>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-emerald-premium/10 border border-emerald-premium/15 flex items-center justify-center text-emerald-premium shadow-[0_0_8px_rgba(16,185,129,0.1)]">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="p-5 rounded-2.5xl bg-forest-surface border border-emerald-premium/15 flex items-center justify-between shadow-sm relative overflow-hidden text-left">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                          Ingresos Verificados
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl font-mono font-black text-emerald-premium">{verifiedIncome} Bs</span>
                          <span className="text-xs text-slate-405 text-slate-400">/ {totalPossibleIncome} total</span>
                        </div>
                        <p className="text-[10px] text-[#8eab9f] font-semibold leading-normal text-slate-400">Transferencias validadas QR</p>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-400">
                        <Coins className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="p-5 rounded-2.5xl bg-forest-surface border border-emerald-premium/15 flex items-center justify-between shadow-sm relative overflow-hidden text-left">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                          Tutorías de Hoy
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-mono font-black text-white">{sessionsScheduledCount} Clases</span>
                          <span className="text-xs text-slate-405 text-slate-400">Aulas Activas</span>
                        </div>
                        <p className="text-[10px] text-[#8eab9f] font-semibold leading-normal text-slate-400">Soporte síncrono habilitado</p>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-450 text-blue-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* 2. CENTRO DE TRAZABILIDAD ACADÉMICA EN VIVO */}
                  <LiveTraceCard
                    assignedMaterials={assignedMaterials}
                    students={students}
                    handleUpdateMaterialStatus={handleUpdateMaterialStatus}
                    handleSimulateMaterialSubmission={handleSimulateMaterialSubmission}
                    handleOpenGradingModal={handleOpenGradingModal}
                  />

                  {/* Student Administration Table List & Toolbars */}
                  <StudentsTable
                    students={students}
                    filteredStudents={filteredStudents}
                    filterSubject={filterSubject}
                    setFilterSubject={setFilterSubject}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    togglePaymentStatus={togglePaymentStatus}
                    updateMeetLink={updateMeetLink}
                    expandedStudentId={expandedStudentId}
                    setExpandedStudentId={setExpandedStudentId}
                    quizScores={quizScores}
                    assignedMaterials={assignedMaterials}
                    handleSimulateMaterialSubmission={handleSimulateMaterialSubmission}
                    setSelectedStudentForManagement={setSelectedStudentForManagement}
                    setAssignmentStatusMessage={setAssignmentStatusMessage}
                    onEditStudent={handleOpenEditModal}
                    onDeleteStudent={handleDeleteStudent}
                  />
                </>
              )}


              {/* TAB 2: REVISIÓN DE TAREAS EN CUADERNO */}
              {activeTab === "tareas" && (
                <div className="bg-forest-surface border border-emerald-premium/15 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-premium/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white flex items-center gap-2">
                      <BookOpenCheck className="w-6 h-6 text-emerald-premium" />
                      Bandeja de Tareas por Corregir (Cuaderno Físico)
                    </h3>
                    <p className="text-xs text-slate-350 mt-1.5 leading-relaxed max-w-2xl font-medium">
                      Los estudiantes resuelven los ejercicios prácticos de matemáticas y física en sus cuadernos de avance y suben capturas fotográficas en tiempo real. Utiliza el simulador de pizarra para aprobar o mandar observaciones con correcciones específicas.
                    </p>
                  </div>

                  {/* Submissions list */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                    {submissions.map((sub) => (
                      <div 
                        key={sub.id} 
                        className={`p-5 rounded-2.5xl border transition-all duration-300 flex flex-col justify-between ${
                          sub.status === "pendiente"
                            ? "bg-gradient-to-br from-[#0c2a22] to-[#081b16] border-amber-500/20 hover:border-amber-500/45 shadow-[0_0_12px_rgba(245,158,11,0.03)]"
                            : sub.status === "aprobado"
                            ? "bg-[#071d18]/80 border-emerald-premium/20 hover:border-emerald-premium/35 opacity-95"
                            : "bg-[#0b1a16]/80 border-rose-500/20 hover:border-rose-500/35 opacity-95"
                        }`}
                      >
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-black text-emerald-premium bg-emerald-premium/10 px-2 py-0.5 rounded uppercase tracking-wider">
                              {sub.subject}
                            </span>
                            
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ${
                              sub.status === "pendiente"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                : sub.status === "aprobado"
                                ? "bg-emerald-500/10 text-emerald-450 border border-emerald-500/30"
                                : "bg-rose-500/10 text-rose-450 border border-rose-500/30"
                            }`}>
                              {sub.status === "pendiente" && "⚠️ Pendiente de Revisión"}
                              {sub.status === "aprobado" && "✅ Completado con Éxito"}
                              {sub.status === "observado" && "❌ Con Observaciones"}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-black text-white tracking-tight">{sub.title}</h4>
                            <p className="text-xs text-slate-300 font-semibold mt-1">
                              Alumno: <span className="text-emerald-premium font-extrabold">{sub.studentName}</span>
                            </p>
                            <p className="text-[10.5px] text-slate-450 font-mono mt-0.5">Enviado: {sub.submittedAt}</p>
                          </div>

                          {sub.observation && (
                            <div className={`p-3 rounded-xl border text-xs leading-relaxed font-semibold ${
                              sub.status === "aprobado"
                                ? "bg-emerald-950/30 border-emerald-500/20 text-emerald-300"
                                : "bg-rose-950/30 border-rose-500/20 text-rose-300"
                            }`}>
                              <span className="block text-[9.5px] uppercase font-black text-slate-405 text-slate-400 mb-1 tracking-wider">Comentario del Tutor:</span>
                              "{sub.observation}"
                            </div>
                          )}
                        </div>

                        {/* Actions for submission */}
                        <div className="mt-5 pt-4 border-t border-emerald-premium/10 flex items-center gap-3">
                          <button
                            onClick={() => {
                              setViewingSubmission(sub);
                              setCorrectionObservation(sub.observation || "");
                              setCorrectionMode("idle");
                            }}
                            className="flex-1 py-2 bg-emerald-premium/10 hover:bg-emerald-premium/20 active:scale-98 text-emerald-300 text-xs font-black uppercase tracking-wider rounded-xl border border-emerald-premium/15 hover:border-emerald-premium/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Image className="w-4 h-4 text-emerald-premium" />
                            <span>Ver Captura de Cuaderno</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* TAB 3: MONITOREO DE MINI-PRUEBAS */}
              {activeTab === "quizzes" && (
                <div className="bg-forest-surface border border-emerald-premium/15 rounded-3xl p-6 md:p-8 space-y-6 text-left shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-premium/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                    <div>
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Award className="w-6 h-6 text-emerald-premium" />
                        Monitoreo de Calificaciones de Mini-Pruebas
                      </h3>
                      <p className="text-xs text-slate-350 mt-1.5 leading-relaxed max-w-2xl font-medium">
                        Registro automático de las notas que los alumnos obtienen en los mini-quizzes integrados en su portal. Esto ayuda a medir la retención inmediata de fórmulas.
                      </p>
                    </div>

                    <button
                      onClick={handleSimulateQuizResult}
                      className="px-4 py-2.5 bg-emerald-premium/10 hover:bg-emerald-premium/20 active:scale-95 text-emerald-300 text-xs font-black uppercase tracking-wider rounded-xl border border-emerald-premium/15 hover:border-emerald-premium/25 flex items-center gap-2 transition-all cursor-pointer justify-center"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-emerald-premium animate-spin-slow" />
                      Simular nueva resolución automática
                    </button>
                  </div>

                  {/* Quiz score table logs */}
                  <div className="overflow-x-auto rounded-2xl border border-emerald-premium/10 bg-black/20 relative z-10">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-black/40 text-slate-300 font-black border-b border-emerald-premium/10 uppercase tracking-widest text-[10px]">
                          <th className="py-3 px-4">Estudiante</th>
                          <th className="py-3 px-4">Mini-Quiz / Prueba de Autoevaluación</th>
                          <th className="py-3 px-4">Calificación</th>
                          <th className="py-3 px-4">Fecha Completado</th>
                          <th className="py-3 px-4 text-right">Resultado Académico</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-emerald-premium/5">
                        {quizScores.map((log) => (
                          <tr key={log.id} className="hover:bg-[#07241e]/30 transition-colors font-semibold">
                            <td className="py-3.5 px-4 font-black text-white">{log.studentName}</td>
                            <td className="py-3.5 px-4 text-slate-300">{log.quizTitle}</td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className={`text-sm font-black ${log.score >= 80 ? "text-emerald-400" : log.score >= 70 ? "text-amber-400" : "text-rose-400"}`}>
                                {log.score}
                              </span>
                              <span className="text-slate-500 font-bold text-xs"> / {log.maxScore} pts</span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-450 font-mono text-[11px]">{log.date}</td>
                            <td className="py-3.5 px-4 text-right">
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                log.status === "aprobado"
                                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                  : "bg-amber-500/10 text-amber-450 border border-amber-500/20"
                              }`}>
                                {log.status === "aprobado" ? "✓ Aprobado" : "⏳ Requiere Repaso"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


              {/* TAB 4: FINANZAS Y REPORTES */}
              {activeTab === "finanzas" && (
                <FinanceTab
                  students={students}
                  assignedMaterials={assignedMaterials}
                  quizScores={quizScores}
                  verifiedIncome={verifiedIncome}
                  totalPossibleIncome={totalPossibleIncome}
                  togglePaymentStatus={togglePaymentStatus}
                  addToast={addToast}
                  simPriceAdjustment={simPriceAdjustment}
                  setSimPriceAdjustment={setSimPriceAdjustment}
                  simNewStudents={simNewStudents}
                  setSimNewStudents={setSimNewStudents}
                  simAvgNewStudentFee={simAvgNewStudentFee}
                  setSimAvgNewStudentFee={setSimAvgNewStudentFee}
                  selectedFinanceArea={selectedFinanceArea}
                  setSelectedFinanceArea={setSelectedFinanceArea}
                  financeLedgerFilter={financeLedgerFilter}
                  setFinanceLedgerFilter={setFinanceLedgerFilter}
                  finSubTab={finSubTab}
                  setFinSubTab={setFinSubTab}
                />
              )}

              {/* TAB 5: ASIGNAR ACTIVIDADES */}
              {activeTab === "despacho" && (
                <DespachoTab
                  students={students}
                  assignedMaterials={assignedMaterials}
                  setAssignedMaterials={setAssignedMaterials}
                  addToast={addToast}
                />
              )}

            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      {/* 2. VENTANA/DRAWER DE GESTIÓN ACADÉMICA POR ALUMNO (Modal Drawer Lateral) */}
      <AnimatePresence>
        {selectedStudentForManagement && (
          <StudentManagementDrawer
            selectedStudentForManagement={selectedStudentForManagement}
            onClose={() => setSelectedStudentForManagement(null)}
            getStudentMetrics={getStudentMetrics}
            drawerTab={drawerTab}
            setDrawerTab={setDrawerTab}
            assignmentType={assignmentType}
            setAssignmentType={setAssignmentType}
            assignmentTitle={assignmentTitle}
            setAssignmentTitle={setAssignmentTitle}
            assignmentInstructions={assignmentInstructions}
            setAssignmentInstructions={setAssignmentInstructions}
            handleAssignMaterialSubmit={handleAssignMaterialSubmit}
            assignmentStatusMessage={assignmentStatusMessage}
            assignedMaterials={assignedMaterials}
            newTopicTitle={newTopicTitle}
            setNewTopicTitle={setNewTopicTitle}
            newTopicStatus={newTopicStatus}
            setNewTopicStatus={setNewTopicStatus}
            handleRegisterTimelineSubmit={handleRegisterTimelineSubmit}
            timelineNodes={timelineNodes}
            activeAssociatedNodeId={activeAssociatedNodeId}
            toggleAssociatedResources={toggleAssociatedResources}
            quizScores={quizScores}
          />
        )}
      </AnimatePresence>

      {/* DETALLE Y FLUJO DE CORRECCIÓN DE TAREAS (Notebook Capture Modal Simulator) */}
      <AnimatePresence>
        {viewingSubmission && (
          <HomeworkCorrectionModal
            viewingSubmission={viewingSubmission}
            onClose={() => {
              setViewingSubmission(null);
              setCorrectionMode("idle");
            }}
            handleApproveHomework={handleApproveHomework}
            correctionMode={correctionMode}
            setCorrectionMode={setCorrectionMode}
            correctionObservation={correctionObservation}
            setCorrectionObservation={setCorrectionObservation}
            handleSendObservation={handleSendObservation}
          />
        )}
      </AnimatePresence>

      {/* ASIGNACIONES / CALIFICACIÓN MODAL SIMULATOR */}
      <AnimatePresence>
        {gradingMaterial && (
          <GradingModal
            gradingMaterial={gradingMaterial}
            gradingScore={gradingScore}
            setGradingScore={setGradingScore}
            gradingObservation={gradingObservation}
            setGradingObservation={setGradingObservation}
            handleSaveGrade={handleSaveGrade}
            onClose={() => setGradingMaterial(null)}
          />
        )}
      </AnimatePresence>

      {/* 4. STUDENT CRUD MODAL */}
      <AnimatePresence>
        {crudModalOpen && (
          <StudentCrudModal
            isOpen={crudModalOpen}
            onClose={() => setCrudModalOpen(false)}
            mode={crudModalMode}
            student={studentToEdit}
            onSuccess={(msg) => addToast(msg, "success")}
            onStudentCreated={handleStudentCreated}
            onStudentUpdated={handleStudentUpdated}
          />
        )}
      </AnimatePresence>

      {/* 5. TOAST NOTIFICATIONS OVERLAY */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`p-4 rounded-xl border shadow-xl flex items-center gap-3 text-xs font-black uppercase tracking-wider text-left pointer-events-auto ${
                toast.type === "success"
                  ? "bg-[#09261f]/95 border-emerald-500/35 text-emerald-300"
                  : toast.type === "error"
                  ? "bg-rose-950/95 border-rose-500/35 text-rose-300"
                  : "bg-[#0b201d]/95 border-blue-500/35 text-blue-300"
              }`}
            >
              <div className="flex-1 font-sans font-extrabold normal-case text-slate-100">
                {toast.message}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
