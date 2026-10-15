import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    question: "¿Cómo se coordinan los horarios y clases?",
    answer: "Se eligen dinámicamente al inscribirte y se accede de forma síncrona desde tu Dashboard de estudiante mediante enlaces directos automatizados a Google Meet junto a tu tutor acreditado."
  },
  {
    question: "¿Qué métodos de pago aceptan en Bolivia?",
    answer: "Aceptamos transferencias bancarias directas y pago simple mediante código QR de manera instantánea desde cualquier entidad bancaria de Bolivia (Banco Unión, BCP, Mercantil Santa Cruz, BNB, Banco Sol, etc.)."
  },
  {
    question: "¿Qué pasa si el estudiante no puede asistir a una sesión?",
    answer: "No te preocupes. La clase se puede reprogramar sin costo adicional con 24 horas de anticipación gestionando la solicitud directamente con el administrador académico de la plataforma."
  },
  {
    question: "¿Qué nivel de materias y ayuda escolar imparten?",
    answer: "Abarcamos nivelación completa de Secundaria (Colegios), preparación de simulacros para admisiones pre-universitarias, y asesoramiento en materias avanzadas de ingeniería para alumnos de primeros semestres."
  },
  {
    question: "¿Tienen preparación especial para olimpiadas de ciencias?",
    answer: "Sí, contamos con entrenamientos de alto rendimiento orientados a las Olimpiadas Científicas de Matemáticas, Física y Programación, dictados por entrenadores con amplia experiencia competitiva nacional."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 px-4 md:px-8 bg-[#0F172A] border-t border-slate-900 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-950/40 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            Ayuda y Soporte Rápido
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
            Preguntas Frecuentes
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 font-sans">
            ¿Dudas sobre cómo funciona TortuMath? Aquí resolvemos las preguntas esenciales para padres y estudiantes de toda Bolivia.
          </p>
        </div>

        {/* FAQs Accordion layout */}
        <div className="space-y-4">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-slate-900/40 border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "border-[#10B981] bg-slate-900/95 ring-2 ring-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
                    : "border-slate-850 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
                id={`faq-accordion-${index}`}
              >
                {/* Accordion trigger line */}
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className={`p-2 rounded-xl flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-850 text-slate-500"
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className={`text-xs sm:text-sm md:text-base font-bold tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-slate-300"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>

                {/* Animated sub-panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-slate-850/40 font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
