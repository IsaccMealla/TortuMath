import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  MessageSquare, 
  User, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Smartphone, 
  Mail, 
  CalendarDays, 
  Hash, 
  QrCode, 
  Info, 
  Award, 
  BookOpen, 
  Tv, 
  CheckCircle2, 
  Coins,
  Clock
} from "lucide-react";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "bifurcation" | "data" | "subject" | "pricing" | "schedule" | "payment";

export default function EnrollmentModal({ isOpen, onClose }: EnrollmentModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("bifurcation");
  
  // Student form state
  const [studentPhone, setStudentPhone] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentGrade, setStudentGrade] = useState("Secundaria (Colegio)"); // or "Pre-Universitario / Universitario"
  
  // Subject state
  const [selectedSubject, setSelectedSubject] = useState<string>("math");

  // Pricing states
  const [selectedPricingOption, setSelectedPricingOption] = useState<"individual" | "weekly" | "biweekly" | "monthly">("weekly");
  const [mathPhysicsLevel, setMathPhysicsLevel] = useState<"colegio" | "universitario">("colegio");
  
  // Schedule Selection states
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTurn, setSelectedTurn] = useState<string>("");
  
  // WhatsApp Support details
  const whatsappNumber = "59171234567";

  // Dynamic pricing calculations based on selected subject and level choice
  let priceIndividual = 70;
  let priceWeekly = 195;
  let priceBiweekly = 360;
  let priceMonthly = 660;
  let levelSubtitle = "";
  let weeklyPlanName = "";
  let individualDesc = "";
  let weeklyDesc = "";
  let biweeklyDesc = "";
  let monthlyDesc = "";

  if (selectedSubject === "math" || selectedSubject === "physics") {
    levelSubtitle = mathPhysicsLevel === "colegio" ? "Nivel Colegio" : "Nivel Universitario";
    priceIndividual = mathPhysicsLevel === "colegio" ? 65 : 85;
    priceWeekly = mathPhysicsLevel === "colegio" ? 180 : 235;
    priceBiweekly = mathPhysicsLevel === "colegio" ? 330 : 430;
    priceMonthly = mathPhysicsLevel === "colegio" ? 600 : 790;
    weeklyPlanName = selectedSubject === "math" ? "Plan TortuMath" : "Plan TortuPhysics";
    individualDesc = mathPhysicsLevel === "colegio" 
      ? "Nivelación completa en álgebra, geometría y física de secundaria." 
      : "Resolución de cálculo, álgebra lineal o física analítica para primeros periodos universitarios.";
    weeklyDesc = "3 sesiones personalizadas a la semana (1 hora/día). Avance continuo y sin saturación.";
    biweeklyDesc = "6 sesiones en 2 semanas. Ideal para reforzar temas específicos antes de un examen.";
    monthlyDesc = "12 sesiones al mes. El plan más completo para dominar la materia con seguimiento continuo.";
  } else if (selectedSubject === "programming") {
    levelSubtitle = "Programación Básica";
    priceIndividual = 70;
    priceWeekly = 195;
    priceBiweekly = 360;
    priceMonthly = 660;
    weeklyPlanName = "Plan TortuCode";
    individualDesc = "Introducción a algoritmos, lógica de programación, diagramas de flujo y Python/POO básico.";
    weeklyDesc = "3 sesiones personalizadas a la semana (1 hora/día). Avance continuo y sin saturación.";
    biweeklyDesc = "6 sesiones en 2 semanas. Perfecto para completar un módulo o proyecto práctico.";
    monthlyDesc = "12 sesiones al mes. Dominio completo de fundamentos de programación con práctica guiada.";
  } else {
    // electronics
    levelSubtitle = "Electrónica / Proyectos";
    priceIndividual = 70;
    priceWeekly = 195;
    priceBiweekly = 360;
    priceMonthly = 660;
    weeklyPlanName = "Plan TortuProject";
    individualDesc = "Armado de proyectos prácticos con Arduino, sensores, actuadores y simulaciones interactivas.";
    weeklyDesc = "3 sesiones personalizadas a la semana (1 hora/día). Avance continuo y sin saturación.";
    biweeklyDesc = "6 sesiones en 2 semanas. Suficiente para completar un prototipo funcional.";
    monthlyDesc = "12 sesiones al mes. Desarrollo completo de un proyecto final con documentación.";
  }

  // Helper to safely switch pricing option and clean schedule selections
  const handleSelectPricingOption = (option: "individual" | "weekly" | "biweekly" | "monthly") => {
    setSelectedPricingOption(option);
    setSelectedDays([]);
    setSelectedTurn("");
  };

  // Navigation handlers
  const handleNextFromData = () => {
    if (!studentPhone) {
      alert("Por favor ingresa tu número de Celular.");
      return;
    }
    setCurrentStep("subject");
  };

  const handleNextFromSubject = () => {
    // Sync level option based on studentGrade from step 1
    if (studentGrade === "Secundaria (Colegio)") {
      setMathPhysicsLevel("colegio");
    } else {
      setMathPhysicsLevel("universitario");
    }
    setCurrentStep("pricing");
  };

  const handleNextFromPricing = () => {
    setCurrentStep("schedule");
  };

  const handleNextFromSchedule = () => {
    setCurrentStep("payment");
  };

  // Prepares the simulated confirmation wa link
  const getSimulatedWaLink = () => {
    const subjectNames: Record<string, string> = {
      math: "Matemáticas",
      physics: "Física",
      programming: "Programación",
      electronics: "Proyectos de Electrónica"
    };

    const selectedPlanLabel = selectedPricingOption === "individual" 
      ? `1 Hora Individual (${priceIndividual} Bs)` 
      : selectedPricingOption === "biweekly"
      ? `${weeklyPlanName} Quincenal (${priceBiweekly} Bs)`
      : selectedPricingOption === "monthly"
      ? `${weeklyPlanName} Mensual (${priceMonthly} Bs)`
      : `${weeklyPlanName} Semanal (${priceWeekly} Bs)`;

    const turnLabel = selectedTurn === "morning" 
      ? "Turno Mañana (09:00 - 12:00)" 
      : selectedTurn === "afternoon" 
      ? "Turno Tarde (14:30 - 17:30)" 
      : "Turno Noche (18:30 - 21:30)";

    const scheduleLabel = selectedPricingOption === "individual"
      ? `Día: ${selectedDays.join(", ")} | Torno: ${turnLabel}`
      : `Días elegidos: ${selectedDays.join(", ")} | Turno: ${turnLabel}`;

    const text = `¡Hola TortuMath! He completado mi solicitud de Inscripción Virtual:
• Celular: ${studentPhone}
• Correo: ${studentEmail}
• Edad: ${studentAge} años
• Nivel Académico: ${studentGrade}
• Materia: ${subjectNames[selectedSubject] || selectedSubject}
• Opción de Pago Seleccionada: ${selectedPlanLabel}
• Horario y Días Seleccionados: ${scheduleLabel}
• Modalidad: Virtual Interactiva Síncrona.

Por favor, ayúdenme a verificar el pago mi cuenta de acceso.`;
    
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const resetForm = () => {
    setCurrentStep("bifurcation");
    setStudentPhone("");
    setStudentEmail("");
    setStudentAge("");
    setStudentGrade("Secundaria (Colegio)");
    setSelectedSubject("math");
    setSelectedDays([]);
    setSelectedTurn("");
  };

  const currentStepNumber = () => {
    switch (currentStep) {
      case "data": return 1;
      case "subject": return 2;
      case "pricing": return 3;
      case "schedule": return 4;
      case "payment": return 5;
      default: return 0;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md z-[100]"
        />

        <div className="flex min-h-full items-center justify-center p-4 relative z-[101]">
        {/* Modal body */}
        <motion.div
          id="modal-container"
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Top colored accent indicator bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />

          {/* Close trigger */}
          <button
            type="button"
            id="btn-close-modal"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto p-6 sm:p-8 flex-1">
            {/* Steps Progress Header */}
            {currentStep !== "bifurcation" && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-450 px-2.5 py-1 rounded-md">
                    Inscripción Paso a Paso
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                    Paso {currentStepNumber()} de 4
                  </span>
                </div>
                {/* Visual Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${(currentStepNumber() / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Render Steps */}
            <AnimatePresence mode="wait">
              
              {/* STAGE: Bifurcation Choice */}
              {currentStep === "bifurcation" && (
                <motion.div
                  key="bifurcation"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="text-center max-w-md mx-auto space-y-2">
                    <div className="mx-auto w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl flex items-center justify-center text-emerald-505 dark:text-[#10b981] mb-2 shadow-sm">
                      <Sparkles className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      ¿Cómo deseas iniciar tu tutoría?
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      Elige el camino de tu preferencia. Puedes hablar directamente con un asesor o iniciar tu registro en línea ahora mismo de forma 100% virtual.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Choice 1: Direct WhatsApp */}
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola TortuMath! Deseo solicitar clases virtuales y resolver dudas académicas.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-6 text-left rounded-2xl border border-emerald-200 bg-[#F0FDF4] hover:bg-[#E6FDF0] dark:border-emerald-900/30 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20 transition-all hover:border-emerald-500 shadow-sm flex flex-col justify-between hover:translate-y-[-2px]"
                      id="choice-whatsapp"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                          <MessageSquare className="w-5 h-5 fill-white" />
                        </div>
                        <h4 className="text-base font-extrabold text-[#044E35] dark:text-emerald-300 flex items-center gap-1.5">
                          Asesoría por WhatsApp 
                          <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-1.5 py-0.5 rounded animate-pulse">Rápido</span>
                        </h4>
                        <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-sans font-semibold">
                          Resuelve dudas sobre metodologías, horarios específicos de Bolivia, formas alternativas de pago o solicita atención directa de un asesor.
                        </p>
                      </div>
                      <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                        Chatear por WhatsApp <ArrowRight className="w-4 h-4" />
                      </span>
                    </a>

                    {/* Choice 2: Stepper Assistant */}
                    <button
                      type="button"
                      onClick={() => setCurrentStep("data")}
                      className="group p-6 text-left rounded-2xl border border-emerald-200 bg-[#F0FDF4] hover:bg-[#E6FDF0] dark:border-emerald-900/30 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20 transition-all hover:border-emerald-500 shadow-sm flex flex-col justify-between hover:translate-y-[-2px] cursor-pointer"
                      id="choice-wizard"
                    >
                      <div className="space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center shadow-md">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-extrabold text-[#044E35] dark:text-emerald-300">
                          Inscripción en Línea
                        </h4>
                        <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-sans font-semibold">
                          Completa de manera autónoma nuestro formulario interactivo en 4 pasos para definir materia, simular tarifas y generar tu código QR de pago virtual.
                        </p>
                      </div>
                      <span className="text-xs font-black text-emerald-850 dark:text-emerald-400 flex items-center gap-1 mt-4 group-hover:translate-x-1 transition-transform">
                        Iniciar Registro Virtual <ArrowRight className="w-4 h-4 text-emerald-600" />
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE: Step 1 (Student Data) */}
              {currentStep === "data" && (
                <motion.div
                  key="data"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Paso 1: Datos del Estudiante
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Ingresa los datos para coordinar las clases síncronas virtuales.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Phone Input */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                        Número de Celular (Para WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej. +591 71234567"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-[#E6FDF0]/10 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 placeholder-emerald-600/50 dark:placeholder-emerald-400/50 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                        id="input-phone"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-emerald-600" />
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-[#E6FDF0]/10 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 placeholder-emerald-600/50 dark:placeholder-emerald-400/50 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                        id="input-email"
                      />
                    </div>

                    {/* Age & Level Grade Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Age */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                          <Hash className="w-3.5 h-3.5 text-emerald-600" />
                          Edad del Estudiante (Años)
                        </label>
                        <input
                          type="number"
                          placeholder="Ej. 16"
                          value={studentAge}
                          onChange={(e) => setStudentAge(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-[#E6FDF0]/10 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 placeholder-emerald-600/50 dark:placeholder-emerald-400/50 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                          id="input-age"
                        />
                      </div>

                      {/* Grade Selector */}
                      <div>
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-emerald-400 mb-1.5 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          Nivel de Estudio
                        </label>
                        <select
                          value={studentGrade}
                          onChange={(e) => setStudentGrade(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-[#E6FDF0]/20 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
                          id="select-grade"
                        >
                          <option value="Secundaria (Colegio)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Secundaria (Colegio)</option>
                          <option value="Pre-Universitario (Ingreso)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Pre-Universitario (Ingreso)</option>
                          <option value="Universitario Inicial" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Primeros Semestres de Universidad</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-6 bg-transparent">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("bifurcation")}
                      className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromData}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      id="btn-step1-next"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE: Step 2 (Subject Selector) */}
              {currentStep === "subject" && (
                <motion.div
                  key="subject"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Paso 2: Selección de Materia
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Selecciona la materia básica en la que requieres nivelación interactiva.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {[
                      { id: "math", title: "Matemáticas", desc: "Álgebra, Cálculo Diferencial/Integral, Matrices, Trigonometría." },
                      { id: "physics", title: "Física", desc: "Vectores, Cinemática, Caída Libre, Dinámica Orbital, Electromagnetismo." },
                      { id: "programming", title: "Programación", desc: "Algoritmos, Estructuras de Control, POO en Python, JavaScript o C++." },
                      { id: "electronics", title: "Proyectos de Electrónica", desc: "Ley de Ohm, microcontroladores Arduino/ESP32, Internet de las Cosas (IoT)." }
                    ].map((subj) => (
                      <button
                        key={subj.id}
                        type="button"
                        onClick={() => setSelectedSubject(subj.id)}
                        className={`p-4 text-left rounded-xl border transition-all flex flex-col justify-between ${
                          selectedSubject === subj.id
                            ? "border-emerald-500 bg-[#E6FDF0] dark:bg-emerald-950/30 ring-2 ring-emerald-200 dark:ring-emerald-900/40"
                            : "border-emerald-100 dark:border-emerald-850/40 bg-[#F0FDF4]/70 dark:bg-slate-800/20 hover:border-emerald-300 hover:bg-[#E6FDF0]/50 dark:hover:bg-slate-800/30"
                        } cursor-pointer`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-sm font-black text-[#044E35] dark:text-emerald-300">{subj.title}</span>
                          <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                            selectedSubject === subj.id 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-emerald-300 dark:border-emerald-700 bg-transparent text-transparent"
                          }`}>
                             <Check className="w-3" />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-950 dark:text-emerald-100 leading-normal mt-2.5 font-bold font-sans">
                          {subj.desc}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-emerald-100 mt-6 bg-transparent">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("data")}
                      className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromSubject}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      id="btn-step2-next"
                    >
                      Siguiente <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE: Step 3 (Tariffs & Offers in Bs) */}
              {currentStep === "pricing" && (
                <motion.div
                  key="pricing"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Paso 3: Selección de Tarifa y Plan
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Clases 100% personalizadas y síncronas. Selecciona tu plan preferido para {levelSubtitle}.
                    </p>
                  </div>

                  {/* Level selection segment ONLY for Math and Physics */}
                  {(selectedSubject === "math" || selectedSubject === "physics") && (
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-widest text-[#044E35] dark:text-emerald-400">
                        Nivel Académico para {selectedSubject === "math" ? "Matemáticas" : "Física"}
                      </label>
                      <div className="flex p-1 bg-emerald-100/50 dark:bg-emerald-950/20 rounded-xl max-w-md">
                        <button
                          type="button"
                          onClick={() => setMathPhysicsLevel("colegio")}
                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            mathPhysicsLevel === "colegio"
                              ? "bg-emerald-600 text-white shadow-md scale-[1.01]"
                              : "text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-slate-800/30"
                          }`}
                        >
                          Colegio / Secundaria (65 Bs/hr)
                        </button>
                        <button
                          type="button"
                          onClick={() => setMathPhysicsLevel("universitario")}
                          className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                            mathPhysicsLevel === "universitario"
                              ? "bg-emerald-600 text-white shadow-md scale-[1.01]"
                              : "text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-slate-800/30"
                          }`}
                        >
                          Inicial Universitario (85 Bs/hr)
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2x2 pricing cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {/* Card 1: Sesión Individual */}
                    <button
                      type="button"
                      onClick={() => handleSelectPricingOption("individual")}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer ${
                        selectedPricingOption === "individual"
                          ? "border-emerald-600 border-2 bg-emerald-50/80 dark:bg-emerald-950/30 ring-2 ring-emerald-200/50 dark:ring-emerald-900/40 shadow-lg scale-[1.01]"
                          : "border-slate-200 dark:border-slate-800 bg-[#FBFDFB]/40 dark:bg-slate-800/10 hover:border-emerald-400 dark:hover:border-emerald-800 hover:bg-emerald-50/10"
                      }`}
                    >
                      <div className="w-full flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">Sesión Individual</span>
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                          selectedPricingOption === "individual"
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-emerald-300 dark:border-emerald-700 bg-transparent"
                        }`}>
                          {selectedPricingOption === "individual" && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-700 dark:text-emerald-100 font-semibold leading-relaxed mb-3">{individualDesc}</p>
                      <div className="w-full flex items-baseline gap-1 mt-auto border-t border-dashed border-emerald-200 dark:border-slate-800 pt-2.5">
                        <span className="text-2xl font-black text-[#044E35] dark:text-emerald-300 font-mono">{priceIndividual} Bs</span>
                        <span className="text-emerald-900 dark:text-emerald-400 text-[10px] font-bold">/ Hora</span>
                      </div>
                    </button>

                    {/* Card 2: Plan Semanal */}
                    <button
                      type="button"
                      onClick={() => handleSelectPricingOption("weekly")}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer ${
                        selectedPricingOption === "weekly"
                          ? "border-emerald-600 border-2 bg-emerald-50/80 dark:bg-emerald-950/30 ring-2 ring-emerald-200/50 dark:ring-emerald-900/40 shadow-lg scale-[1.01]"
                          : "border-slate-200 dark:border-slate-800 bg-[#FBFDFB]/40 dark:bg-slate-800/10 hover:border-emerald-400 dark:hover:border-emerald-800 hover:bg-emerald-50/10"
                      }`}
                    >
                      <span className="absolute top-0 right-0 bg-emerald-600 dark:bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider shadow">
                        ~8% Ahorro
                      </span>
                      <div className="w-full flex items-center justify-between mb-3 pr-16">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">{weeklyPlanName} Semanal</span>
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                          selectedPricingOption === "weekly"
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-emerald-300 dark:border-emerald-700 bg-transparent"
                        }`}>
                          {selectedPricingOption === "weekly" && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </div>
                      <span className="inline-block text-[8px] font-extrabold text-[#044E35] dark:text-emerald-200 bg-emerald-100 dark:bg-[#022c22] px-1.5 py-0.5 rounded-md mb-1.5">
                        3 hrs/semana (Síncronas)
                      </span>
                      <p className="text-[10px] text-slate-700 dark:text-emerald-100 font-semibold leading-relaxed mb-3">{weeklyDesc}</p>
                      <div className="w-full flex items-baseline gap-1 mt-auto border-t border-dashed border-emerald-200 dark:border-slate-800 pt-2.5">
                        <span className="text-2xl font-black text-[#044E35] dark:text-emerald-300 font-mono">{priceWeekly} Bs</span>
                        <span className="text-emerald-900 dark:text-emerald-400 text-[10px] font-bold">/ Semana</span>
                      </div>
                    </button>

                    {/* Card 3: Plan Quincenal */}
                    <button
                      type="button"
                      onClick={() => handleSelectPricingOption("biweekly")}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer ${
                        selectedPricingOption === "biweekly"
                          ? "border-emerald-600 border-2 bg-emerald-50/80 dark:bg-emerald-950/30 ring-2 ring-emerald-200/50 dark:ring-emerald-900/40 shadow-lg scale-[1.01]"
                          : "border-slate-200 dark:border-slate-800 bg-[#FBFDFB]/40 dark:bg-slate-800/10 hover:border-emerald-400 dark:hover:border-emerald-800 hover:bg-emerald-50/10"
                      }`}
                    >
                      <span className="absolute top-0 right-0 bg-teal-600 dark:bg-teal-500 text-white text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider shadow">
                        ~8% Ahorro
                      </span>
                      <div className="w-full flex items-center justify-between mb-3 pr-16">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">{weeklyPlanName} Quincenal</span>
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                          selectedPricingOption === "biweekly"
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-emerald-300 dark:border-emerald-700 bg-transparent"
                        }`}>
                          {selectedPricingOption === "biweekly" && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </div>
                      <span className="inline-block text-[8px] font-extrabold text-[#044E35] dark:text-emerald-200 bg-emerald-100 dark:bg-[#022c22] px-1.5 py-0.5 rounded-md mb-1.5">
                        6 hrs en 2 semanas (Síncronas)
                      </span>
                      <p className="text-[10px] text-slate-700 dark:text-emerald-100 font-semibold leading-relaxed mb-3">{biweeklyDesc}</p>
                      <div className="w-full flex items-baseline gap-1 mt-auto border-t border-dashed border-emerald-200 dark:border-slate-800 pt-2.5">
                        <span className="text-2xl font-black text-[#044E35] dark:text-emerald-300 font-mono">{priceBiweekly} Bs</span>
                        <span className="text-emerald-900 dark:text-emerald-400 text-[10px] font-bold">/ Quincenal</span>
                      </div>
                    </button>

                    {/* Card 4: Plan Mensual (Mejor Valor) */}
                    <button
                      type="button"
                      onClick={() => handleSelectPricingOption("monthly")}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-pointer ${
                        selectedPricingOption === "monthly"
                          ? "border-emerald-600 border-2 bg-emerald-50/80 dark:bg-emerald-950/30 ring-2 ring-emerald-200/50 dark:ring-emerald-900/40 shadow-lg scale-[1.01]"
                          : "border-slate-200 dark:border-slate-800 bg-[#FBFDFB]/40 dark:bg-slate-800/10 hover:border-emerald-400 dark:hover:border-emerald-800 hover:bg-emerald-50/10"
                      }`}
                    >
                      <span className="absolute top-0 right-0 bg-amber-500 dark:bg-amber-400 text-slate-900 text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider shadow">
                        ⭐ Mejor Valor ~17%
                      </span>
                      <div className="w-full flex items-center justify-between mb-3 pr-20">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">{weeklyPlanName} Mensual</span>
                        <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                          selectedPricingOption === "monthly"
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-emerald-300 dark:border-emerald-700 bg-transparent"
                        }`}>
                          {selectedPricingOption === "monthly" && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </div>
                      <span className="inline-block text-[8px] font-extrabold text-[#044E35] dark:text-emerald-200 bg-emerald-100 dark:bg-[#022c22] px-1.5 py-0.5 rounded-md mb-1.5">
                        12 hrs al mes (Síncronas)
                      </span>
                      <p className="text-[10px] text-slate-700 dark:text-emerald-100 font-semibold leading-relaxed mb-3">{monthlyDesc}</p>
                      <div className="w-full flex items-baseline gap-1 mt-auto border-t border-dashed border-emerald-200 dark:border-slate-800 pt-2.5">
                        <span className="text-2xl font-black text-[#044E35] dark:text-emerald-300 font-mono">{priceMonthly} Bs</span>
                        <span className="text-emerald-900 dark:text-emerald-400 text-[10px] font-bold">/ Mensual</span>
                      </div>
                    </button>
                  </div>

                  {/* Highlights Week Offer Banner */}
                  <div className="p-5 rounded-2xl border border-emerald-200 bg-[#E6FDF0] dark:bg-emerald-950/20 flex gap-3.5 items-start">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg flex-shrink-0 mt-0.5 shadow-sm shadow-emerald-500/20">
                      <Coins className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#044E35] dark:text-emerald-300 flex items-center gap-1.5_00">
                        ¡Oferta de Inauguración Académica!
                      </h4>
                      <p className="text-xs text-slate-900 dark:text-slate-200 leading-relaxed font-sans mt-1.5 font-semibold">
                        Aprovecha nuestros precios exclusivos por tiempo limitado en Bolivia. Garantizamos tutorías personalizadas hechas a la medida de tus objetivos educativos.
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-emerald-150 mt-6 bg-transparent">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("subject")}
                      className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFromPricing}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      id="btn-step3-next"
                    >
                      Seleccionar Horarios <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE: Step 4 (Schedule Selection UI) */}
              {currentStep === "schedule" && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Paso 4: Selección de Horarios y Disponibilidad
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Elige el día y bloque de clases virtuales síncronas que mejor se adapten a tu agenda.
                    </p>
                  </div>

                  {/* Plan Summary header */}
                  <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm shadow-sm">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-emerald-850 dark:text-emerald-450 block tracking-wider font-sans">
                        Plan Elegido
                      </span>
                      <span className="font-extrabold text-[#044E35] dark:text-emerald-300 text-base">
                        {selectedPricingOption === "individual" ? "Sesión Individual" : weeklyPlanName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-extrabold text-emerald-850 dark:text-emerald-450 block tracking-wider font-sans">
                        Monto
                      </span>
                      <span className="font-mono font-black text-slate-900 dark:text-white text-base">
                        {selectedPricingOption === "individual" ? priceIndividual : priceWeekly} Bs
                      </span>
                    </div>
                  </div>

                  {/* Day Picker */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black uppercase tracking-widest text-[#044E35] dark:text-emerald-400 font-sans">
                        {selectedPricingOption === "individual" 
                          ? "Selecciona 1 día para tu sesión" 
                          : "Selecciona tus 3 días de clase (1 hora por día)"}
                      </label>
                      <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        (selectedPricingOption === "individual" ? selectedDays.length === 1 : selectedDays.length === 3)
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                          : "bg-amber-100 text-amber-900 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}>
                        {selectedPricingOption === "individual" 
                          ? `Días: ${selectedDays.length}/1` 
                          : `Días: ${selectedDays.length}/3`}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day) => {
                        const isSelected = selectedDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              if (selectedPricingOption === "individual") {
                                setSelectedDays([day]);
                              } else {
                                if (isSelected) {
                                  setSelectedDays(selectedDays.filter((d) => d !== day));
                                } else {
                                  if (selectedDays.length < 3) {
                                    setSelectedDays([...selectedDays, day]);
                                  }
                                }
                              }
                            }}
                            className={`py-3.5 px-2 text-center rounded-xl border text-xs font-extrabold transition-all duration-300 flex flex-col items-center justify-center gap-1 cursor-pointer select-none ${
                              isSelected
                                ? "border-emerald-650 bg-emerald-100 text-emerald-950 ring-2 ring-emerald-300 dark:bg-emerald-900 dark:text-white dark:border-emerald-500 dark:ring-emerald-900/50 shadow-md"
                                : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/60 hover:border-emerald-450 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850"
                            }`}
                          >
                            <span>{day}</span>
                            {isSelected ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                            ) : (
                              <span className="w-4 h-4 border border-slate-300 dark:border-slate-600 hover:border-emerald-400 rounded-full mt-0.5 inline-block opacity-40" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Turn Picker */}
                  <div className="space-y-2.5 pt-1">
                    <label className="block text-xs font-black uppercase tracking-widest text-[#044E35] dark:text-emerald-400 font-sans">
                      Selecciona tu Turno de Preferencia (Franja Horaria)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "morning", title: "Turno Mañana", hours: "09:00 - 12:00" },
                        { id: "afternoon", title: "Turno Tarde", hours: "14:30 - 17:30" },
                        { id: "night", title: "Turno Noche", hours: "18:30 - 21:30" }
                      ].map((turn) => {
                        const isSelected = selectedTurn === turn.id;
                        return (
                          <button
                            key={turn.id}
                            type="button"
                            onClick={() => setSelectedTurn(turn.id)}
                            className={`p-4 text-left rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none relative overflow-hidden ${
                              isSelected
                                ? "border-emerald-650 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300 dark:bg-emerald-900 dark:text-white dark:border-emerald-500 dark:ring-emerald-900/50 shadow-md"
                                : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 hover:border-emerald-450 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={`text-xs font-black uppercase tracking-wider ${
                                isSelected 
                                  ? "text-emerald-900 dark:text-emerald-250 animate-pulse" 
                                  : "text-slate-700 dark:text-slate-300"
                              }`}>{turn.title}</span>
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSelected 
                                  ? "bg-emerald-650 border-emerald-600 text-white" 
                                  : "border-slate-350 dark:border-slate-600 bg-transparent"
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                              </div>
                            </div>
                            <div className={`flex items-center gap-1.5 mt-2.5 text-xs font-bold font-mono ${
                              isSelected
                                ? "text-emerald-800 dark:text-emerald-300"
                                : "text-slate-600 dark:text-slate-400"
                            }`}>
                              <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-emerald-700 dark:text-emerald-450" : "text-slate-400 dark:text-slate-550"}`} />
                              {turn.hours}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Informational Guidance Alert */}
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 dark:text-emerald-100 rounded-2xl flex gap-3 text-xs leading-relaxed font-sans max-w-md mx-auto shadow-sm">
                    <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-[#044E35] dark:text-emerald-350 block mb-0.5">Dinámica Virtual síncrona:</span>
                      <p className="text-slate-900 dark:text-slate-200 text-[11px] leading-normal font-semibold">
                        {selectedPricingOption === "individual" 
                          ? "Tendrás 1 sesión exclusiva interactiva en la fecha designada. Coordinarás el inicio exacto por WhatsApp." 
                          : "Tus 3 sesiones personalizadas a la semana se programarán a la misma franja de turno en los días seleccionados."}
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-emerald-100 mt-6 bg-transparent">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("pricing")}
                      className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    
                    {/* Continue button is enabled only when prerequisites are met */}
                    <button
                      type="button"
                      disabled={
                        selectedPricingOption === "individual"
                          ? selectedDays.length !== 1 || !selectedTurn
                          : selectedDays.length !== 3 || !selectedTurn
                      }
                      onClick={handleNextFromSchedule}
                      className={`px-6 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md ${
                        (selectedPricingOption === "individual" ? selectedDays.length === 1 && selectedTurn : selectedDays.length === 3 && selectedTurn)
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60"
                      }`}
                      id="btn-schedule-next"
                    >
                      Continuar al Pago <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STAGE: Step 5 (Payment Code QR Simulation) */}
              {currentStep === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-5"
                >
                  <div className="text-center max-w-md mx-auto space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Paso 5: Simulación de Pago Sencilla
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Escanea el código QR de recaudación académica desde tu aplicación de banca móvil preferida de Bolivia.
                    </p>
                  </div>

                  {/* QR code simulated premium container */}
                  <div className="flex flex-col items-center justify-center p-6 border border-emerald-100 bg-[#F0FDF4] dark:bg-[#1E293B]/20 rounded-2xl max-w-sm mx-auto space-y-4 shadow-sm">
                    
                    {/* Amount breakdown summary */}
                    <div className="text-center bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40 w-full shadow-sm">
                      <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-wider font-sans">
                        Monto Final a Cancelar
                      </span>
                      <p className="text-2xl font-black text-[#044E35] dark:text-emerald-300 font-mono mt-1">
                        {selectedPricingOption === "individual" ? priceIndividual : priceWeekly} Bs
                      </p>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-bold font-sans mt-1">
                        {selectedPricingOption === "individual" ? "1 Hora de Tutoría Virtual" : `${weeklyPlanName}`}
                      </p>
                      
                      {/* Technical Summary Resumen requested by the user */}
                      <div className="mt-2.5 pt-2.5 border-t border-dashed border-emerald-200 dark:border-emerald-950/80 text-[11px] text-[#044E35] dark:text-emerald-300 font-black font-sans leading-relaxed text-center">
                        Resumen: {selectedPricingOption === "individual" ? "Sesión Individual" : weeklyPlanName} - Turno {selectedTurn === "morning" ? "Mañana" : selectedTurn === "afternoon" ? "Tarde" : "Noche"} ({selectedDays.join(", ")})
                      </div>
                    </div>

                    {/* Simulated SVG High-Quality QR Graphic */}
                    <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 flex items-center justify-center relative group">
                      <svg 
                        width="180" 
                        height="180" 
                        viewBox="0 0 100 100" 
                        className="text-slate-900 dark:text-slate-900"
                        id="svg-qr-code"
                      >
                        {/* Outer corners / Position detection patterns */}
                        <path d="M 0 0 L 30 0 L 30 10 L 10 10 L 10 30 L 0 30 Z" fill="currentColor" />
                        <path d="M 10 10 L 20 10 L 20 20 L 10 20 Z" fill="currentColor" />

                        <path d="M 70 0 L 100 0 L 100 30 L 90 30 L 90 10 L 70 10 Z" fill="currentColor" />
                        <path d="M 80 10 L 90 10 L 90 20 L 80 20 Z" fill="currentColor" />

                        <path d="M 0 70 L 30 70 L 30 100 L 0 100 L 0 90 L 10 90 L 10 80 L 0 80 Z" fill="currentColor" />
                        <path d="M 10 80 L 20 80 L 20 90 L 10 90 Z" fill="currentColor" />

                        {/* Dense noise bits simulated */}
                        <rect x="40" y="5" width="8" height="8" fill="currentColor" />
                        <rect x="52" y="15" width="8" height="6" fill="currentColor" />
                        <rect x="35" y="25" width="10" height="8" fill="currentColor" />
                        <rect x="15" y="40" width="15" height="4" fill="currentColor" />
                        <rect x="45" y="45" width="10" height="10" fill="currentColor" />
                        <rect x="65" y="40" width="8" height="15" fill="currentColor" />
                        <rect x="80" y="45" width="12" height="12" fill="currentColor" />
                        <rect x="25" y="60" width="12" height="6" fill="currentColor" />
                        <rect x="55" y="65" width="30" height="4" fill="currentColor" />
                        <rect x="45" y="80" width="15" height="15" fill="currentColor" />
                        <rect x="80" y="80" width="10" height="10" fill="currentColor" />

                        {/* Little Cute Center Turtle Graphic Emblem placeholder */}
                        <circle cx="50" cy="50" r="10" fill="white" />
                        <rect x="46" y="46" width="8" height="8" rx="2" fill="#059669" />
                      </svg>
                      
                      <div className="absolute inset-0 bg-emerald-600/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col items-center justify-center text-white p-3 text-center">
                        <QrCode className="w-8 h-8 mb-1" />
                        <span className="text-xs font-bold leading-normal">Recaudación Académica TortuMath</span>
                        <span className="text-[10px] opacity-80 mt-1">Simple QR Bolivia</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] font-black uppercase font-mono tracking-widest text-emerald-800 dark:text-emerald-400">
                        BANCO UNIÓN / BCP / QR SIMPLE
                      </span>
                      <p className="text-[11px] text-slate-800 dark:text-slate-350 font-semibold font-sans mt-1.5">
                        Puedes descargar este código QR de prueba para finalizar el registro simulado.
                      </p>
                    </div>
                  </div>

                  {/* Helpful verification label */}
                  <div className="p-4 bg-amber-500/10 border border-amber-500/15 text-amber-950 dark:text-amber-300 rounded-2xl flex gap-3 text-xs leading-relaxed font-sans max-w-md mx-auto">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-[#78350F] dark:text-amber-400 block">Mensaje de Control Importante:</span>
                      <p className="text-amber-900/90 dark:text-amber-250 mt-1 text-[11px] leading-normal font-semibold">
                        Una vez realizado y verificado el pago, nuestro equipo te enviará por WhatsApp y correo electrónico tu <strong>Usuario y Contraseña</strong> oficiales junto con el enlace de acceso a tu <strong>Dashboard Estudiantil virtual</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-100 mt-6 bg-transparent">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("schedule")}
                      className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <ArrowLeft className="w-4 h-4" /> Volver
                    </button>
                    
                    <a
                      href={getSimulatedWaLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 w-full sm:w-auto"
                      id="btn-confirm-wa"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                      <span>Completar e Informar por WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
