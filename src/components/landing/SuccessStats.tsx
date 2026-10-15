import React from "react";
import { motion } from "motion/react";
import { Award, Clock, Users, ShieldCheck } from "lucide-react";

interface StatItem {
  number: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS_DATA: StatItem[] = [
  {
    number: "+500",
    label: "Horas de Tutoría Dictadas",
    sublabel: "Física, Cálculo, Álgebra y Algoritmos",
    icon: Clock
  },
  {
    number: "98%",
    label: "Estudiantes Aprobados",
    sublabel: "Colegio de convenio y primeros ciclos universitarios",
    icon: Award
  },
  {
    number: "100%",
    label: "Clases Personalizadas",
    sublabel: "Estilo síncrono con docente asignado",
    icon: ShieldCheck
  }
];

export default function SuccessStats() {
  return (
    <section id="metricas-exito" className="py-16 px-4 md:px-8 bg-slate-950 border-y border-slate-850 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Metric Cards Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {STATS_DATA.map((stat, index) => {
            const IconComp = stat.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center text-center p-6 bg-slate-900/45 hover:bg-slate-900/80 border border-slate-850 hover:border-emerald-500/40 rounded-3xl transition-all duration-300 relative group cursor-default shadow-lg"
              >
                {/* Floating ambient glow in hover */}
                <div className="absolute inset-0 rounded-3xl bg-emerald-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 pointer-events-none" />

                {/* Micro-indicator icon wrapper */}
                <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-900/40 text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComp className="w-6 h-6" />
                </div>

                {/* Metric Giant Number */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-emerald-400 tracking-tight font-sans select-none drop-shadow-md">
                  {stat.number}
                </h3>

                {/* Descriptive labels */}
                <h4 className="text-base font-bold text-white mt-3 font-display tracking-wide">
                  {stat.label}
                </h4>
                
                <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed max-w-[240px]">
                  {stat.sublabel}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
