import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Book, Calculator, Zap, Code, Cpu, Award, Users, BookOpen, Layers } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  difficulty: "Básico" | "Intermedio" | "Avanzado" | "Olimpiadas";
  topics: string[];
  projects: string[];
}
const SUBJECTS_DATA: Subject[] = [
  {
    id: "math",
    name: "Matemáticas",
    tagline: "Nivel Colegio (Secundaria) hasta Primeros Años de Universidad.",
    description: "Formación matemática rigurosa que cubre Álgebra, Trigonometría y Geometría Analítica de colegio, ascendiendo a Cálculo Diferencial, Cálculo Integral, Álgebra Lineal y Matrices nivel universitario.",
    longDescription: "Diseñado para superar el miedo a los números. Abarcamos todo el ciclo escolar de Secundaria (Álgebra, Trigonometría, Geometría Analítica) y preparamos con solidez para los primeros años de Universidad (Límites, Derivadas, Integrales, Matrices y Ecuaciones Diferenciales para ciencias e ingeniería).",
    icon: Calculator,
    color: "emerald",
    difficulty: "Olimpiadas",
    topics: [
      "Álgebra y Factorización Avanzada (Colegio)",
      "Trigonometría y Geometría Analítica (Colegio)",
      "Límites e Introducción a Funciones",
      "Cálculo Diferencial e Integral (Primeros Años de Universidad)",
      "Álgebra Lineal y Matrices (Nivel Universitario)"
    ],
    projects: ["Simulaciones Gráficas de Geogebra", "Cálculo de Optimización de Volúmenes"]
  },
  {
    id: "physics",
    name: "Física",
    tagline: "De los conceptos de Secundaria a la física analítica universitaria.",
    description: "Dominio conceptual y analítico de la materia: desde los Vectores y Cinemática del colegio hasta Dinámica Orbital, Ondas, Termodinámica y Electromagnetismo para ingeniería.",
    longDescription: "Desarrollamos la intuición física y la resolución analítica de problemas. Apoyamos a estudiantes de colegio en física básica (Vectores, Cinemática, Caída Libre, Estática) y a universitarios en física general aplicable a ingenierías (Dinámica de Newton, Trabajo y Energía, Electromagnetismo, Circuitos y Termodinámica).",
    icon: Zap,
    color: "teal",
    difficulty: "Avanzado",
    topics: [
      "Vectores, Cinemática y Caída Libre (Colegio)",
      "Dinámica de Partículas y Leyes de Newton (Colegio)",
      "Trabajo, Energía, Potencia y Colisiones",
      "Hidrostática, Presión y Ondas",
      "Campos Eléctricos, Electromagnetismo y Óptica (Universidad)"
    ],
    projects: ["Modelador del Movimiento Parabólico", "Análisis de Péndulos y Resonancia"]
  },
  {
    id: "programming",
    name: "Programación",
    tagline: "Lógica computacional para secundaria y bases sólidas universitarias.",
    description: "Aprende a programar construyendo lógica pura con Diagramas de Flujo, Pseudocódigo y Python, avanzando hacia Programación Orientada a Objetos (POO), herencia y algoritmos universitarios.",
    longDescription: "La informática enseña a pensar. Guiamos a jóvenes de colegio para estructurar su pensamiento lógico con pseudocódigo y Python básico, y acompañamos a universitarios en el aprendizaje de estructuras de datos, recursividad, y Programación Orientada a Objetos (POO) en C++, Java o JavaScript.",
    icon: Code,
    color: "cyan",
    difficulty: "Básico",
    topics: [
      "Lógica Algorítmica y Diagramas de Flujo (Colegio)",
      "Estructuras de Control: Bucles y Condicionales",
      "Funciones, Arreglos y Gestión de Memoria",
      "Programación Orientada a Objetos - POO (Universidad)",
      "Algoritmos de Búsqueda, Ordenamiento y Recursión (Universidad)"
    ],
    projects: ["Primer Videojuego con Canvas HTML", "Estructura de Base de Datos para Escuela"]
  },
  {
    id: "electronics",
    name: "Proyectos de Electrónica",
    tagline: "Electrónica y robótica escolar hasta sistemas embebidos de ingeniería.",
    description: "Entendimiento práctico de circuitos: desde la Ley de Ohm, sensores analógicos y alarmas de colegio, hasta microcontroladores Arduino/ESP32 de nivel universitario.",
    longDescription: "Transformamos la abstracción en realidad tangible mediante laboratorios interactivos y simuladores avanzados. Brindamos conceptos de robótica inicial (Ley de Ohm, sensores, actuadores), expandiéndonos hacia microcontroladores Arduino/ESP32, Internet de las Cosas (IoT) y prototipado de proyectos de domótica de nivel universitario.",
    icon: Cpu,
    color: "green",
    difficulty: "Intermedio",
    topics: [
      "Leyes Eléctricas, Uso de Multímetro y Protoboard (Colegio)",
      "Componentes Activos: Diodos, Transistores y Relés (Colegio)",
      "Robótica con Sensores de Luz, Distancia y Temperatura",
      "Microcontroladores y Programación de Arduino/ESP32 (Universidad)",
      "Terminología de IoT, Señales Wi-Fi y Domótica Integrada (Universidad)"
    ],
    projects: ["Invernadero de Control Autónomo", "Brazo Robótico Programable Interactivo"]
  }
];

export default function SubjectGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="materias" className="py-24 px-4 md:px-8 bg-[#F8F9FA] transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#059669] bg-emerald-100/70 text-emerald-900 px-3.5 py-1.5 rounded-full shadow-sm">
            Materias Académicas
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-[#1E293B] mt-4 tracking-tight">
            Nuestras Especialidades
          </h2>
          <div className="w-16 h-1 bg-[#059669] mx-auto mt-4 rounded-full" />
          <p className="text-slate-700 text-sm md:text-base max-w-xl mx-auto mt-4 font-semibold font-sans">
            Un plan educativo enfocado en el desarrollo lógico y aplicativo. Elige la materia que deseas conquistar y explora su temario oficial.
          </p>
        </div>

        {/* Categories/Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUBJECTS_DATA.map((subject) => {
            const IconComponent = subject.icon;
            const isExpanded = expandedId === subject.id;

            return (
              <motion.div
                key={subject.id}
                layout="position"
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                onClick={() => toggleExpand(subject.id)}
                className={`relative cursor-pointer select-none rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isExpanded
                    ? "border-emerald-600 bg-emerald-100 ring-4 ring-emerald-250/55"
                    : "bg-emerald-50/70 hover:bg-emerald-100 border-emerald-200/80 hover:border-emerald-500 hover:scale-[1.015]"
                }`}
                id={`card-${subject.id}`}
              >
                {/* Visual Glow Layer behind when expanded */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-tr from-transparent opacity-15 transition-opacity duration-300 ${
                    subject.color === "emerald" ? "to-emerald-500" :
                    subject.color === "teal" ? "to-teal-500" :
                    subject.color === "cyan" ? "to-cyan-500" : "to-green-500"
                  }`}
                />

                <div>
                  {/* Top block */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Icon container */}
                      <div className="p-3 bg-white text-[#044E35] group-hover:bg-emerald-600 group-hover:text-white rounded-xl transition-colors duration-300 border border-emerald-200 shadow-sm">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        {/* Title & Badge */}
                        <h3 className="font-display text-xl md:text-2xl font-black text-emerald-950 tracking-tight">
                          {subject.name}
                        </h3>
                        <span className={`inline-block text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md mt-1.5 shadow-sm text-white ${
                          subject.difficulty === "Olimpiadas" ? "bg-red-600" :
                          subject.difficulty === "Avanzado" ? "bg-amber-500" :
                          subject.id === "programming" ? "bg-blue-600" : "bg-emerald-600"
                        }`}>
                          Nivel {subject.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    {/* Expand indicator icon */}
                    <button
                      className="p-1.5 rounded-full bg-white/70 text-emerald-900 group-hover:text-emerald-700 hover:bg-white transition-all shadow-sm"
                      aria-label="Expandir temario"
                    >
                      {isExpanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Summary phrase */}
                  <p className="text-emerald-950 font-extrabold text-sm md:text-base leading-relaxed mb-2.5 font-display">
                    "{subject.tagline}"
                  </p>

                  <p className="text-slate-900 text-xs md:text-sm leading-relaxed mb-4 font-semibold font-sans">
                    {subject.description}
                  </p>

                  {/* Expanded block with smooth height dynamic transition */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-6 pt-6 border-t border-emerald-200/80"
                      >
                        {/* Deep narrative */}
                        <p className="text-slate-900 text-sm leading-relaxed mb-6 bg-white p-4 rounded-xl border border-emerald-200 shadow-sm font-semibold">
                          {subject.longDescription}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Syllabus items list */}
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#044E35] mb-3 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                              Temas Principales
                            </h4>
                            <ul className="space-y-2">
                              {subject.topics.map((t, index) => (
                                <li key={index} className="text-xs text-slate-900 font-bold flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Creative applied projects */}
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#044E35] mb-3 flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-emerald-700" />
                              Proyectos Ejemplares
                            </h4>
                            <ul className="space-y-2">
                              {subject.projects.map((p, index) => (
                                <li key={index} className="text-xs text-emerald-950 font-black bg-white p-2.5 rounded-lg border border-emerald-200 flex items-center gap-2 shadow-sm">
                                  <span className="text-emerald-600">★</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 flex items-center justify-between pointer-events-none">
                  <span className="text-xs text-emerald-950 font-extrabold tracking-wider uppercase flex items-center gap-1.5">
                    <Book className="w-3.5 h-3.5 text-emerald-700" />
                    {isExpanded ? "Haga clic para cerrar temario" : "Ver Temario Completo"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white group-hover:bg-emerald-750 flex items-center justify-center transition-colors duration-300 shadow-md border border-emerald-500">
                    <span className="text-sm font-bold">→</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
