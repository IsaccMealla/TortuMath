export interface StudentRegistration {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  plan: string;
  schedule: string;
  meetLink: string;
  paymentVerified: boolean;
  registrationDate: string;
  amount: number;
}

export interface AssignedMaterial {
  id: string;
  studentId: string;
  title: string;
  type: "Guía de Ejercicios (PDF)" | "Mini-Prueba Interactiva" | "Tarea para el Cuaderno" | "Laboratorio Virtual";
  instructions: string;
  assignedAt: string;
  status: "pendiente" | "realizando" | "entregado" | "calificado";
  score?: number;
  maxScore?: number;
  observation?: string;
  notebookContent?: string[];
}

export interface HomeworkSubmission {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  subject: string;
  submittedAt: string;
  status: "pendiente" | "aprobado" | "observado";
  observation?: string;
  notebookContent: string[];
}

export interface QuizLog {
  id: string;
  studentName: string;
  quizTitle: string;
  score: number;
  maxScore: number;
  date: string;
  status: "aprobado" | "repaso";
}

export interface TimelineNode {
  id: string;
  studentId: string;
  date: string;
  topic: string;
  status: "Completado" | "En Repaso" | "Por Evaluar";
  associatedMaterials?: string[];
}
