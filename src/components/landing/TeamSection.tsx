import React from "react";
import { motion } from "motion/react";
import { Brain, Cpu, Sparkles, Terminal, Wrench, Code2, GraduationCap, Award } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  highlights: string[];
  skills: string[];
  badgeIcon: React.ComponentType<{ className?: string }>;
}

const TEAM_DATA: TeamMember[] = [
  {
    name: "Isacc Leonardo Mealla Pozo",
    role: "Fundador & Director Académico Integral",
    badgeIcon: Brain,
    highlights: [
      "Estudiante destacado de Ingeniería de Sistemas y desarrollador especializado en Inteligencia Artificial y ciencias de alta complejidad.",
      "Investigador científico y creador del proyecto Robot Submarino ROV (Detección de residuos con Visión Artificial) y Sistemas de Brazos Robóticos de alta precisión.",
      "Tutor senior con dominio absoluto en las 4 materias de la academia: Especialista en traducir conceptos abstractos de Matemáticas, Física, Programación y Electrónica en formatos dinámicos y sencillos."
    ],
    skills: ["Álgebra", "Cálculo", "Física Newtoniana", "Python", "C++", "AI Models", "Robótica"]
  },
  {
    name: "Jhosue Ameth Fariñas Pozo",
    role: "Co-Fundador & Director de Desarrollo e Instrumentación",
    badgeIcon: Cpu,
    highlights: [
      "Estudiante de ingeniería, cerebro técnico y desarrollador de software encargado del diseño interactivo, optimización del Dashboard y la infraestructura digital de TortuMath.",
      "Especialista en desarrollo web moderno, lógica algorítmica y programación competitiva, guiando a los estudiantes desde el pseudocódigo hasta proyectos reales.",
      "Tutor especialista encargado de las áreas de TortuCode (Lógica de Programación) y TortuProject (Electrónica, Automatización y Microcontroladores)."
    ],
    skills: ["React", "Tailwind CSS", "Node.js", "Arduino & IoT", "Lógica de Código", "Hardware Integrado"]
  }
];

export default function TeamSection() {
  return (
    <section id="equipo-tutor" className="py-24 px-4 md:px-8 bg-slate-900 border-t border-slate-850 relative overflow-hidden transition-all duration-300">
      {/* Background abstract radial glows for tech vibe */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#10B981] bg-emerald-950/45 border border-emerald-500/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> El Equipo Detrás del Caparazón
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white mt-4 tracking-tight">
            Creadores, No Solo Profesores
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto mt-4 font-sans leading-relaxed">
            Nuestros tutores son los mismos investigadores e ingenieros de software que diseñaron y programaron esta plataforma desde cero. No te enseñamos a memorizar fórmulas; te enseñamos a construir el futuro con ciencia aplicada y tecnología real.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {TEAM_DATA.map((member, idx) => {
            const IconComponent = member.badgeIcon;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-[#0a211b] border border-emerald-500/20 hover:border-[#10B981]/50 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between transition-all duration-300 relative group"
              >
                {/* Visual hover corner glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-6">
                  {/* Top Header Card Info */}
                  <div className="flex items-start justify-between gap-4 border-b border-emerald-500/10 pb-5">
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-white tracking-wide">
                        {member.name}
                      </h3>
                      <p className="text-xs md:text-sm font-bold text-emerald-400 mt-1 uppercase tracking-wide">
                        {member.role}
                      </p>
                    </div>
                    {/* Floating circular icon container */}
                    <div className="p-3 bg-emerald-950/50 border border-emerald-500/35 text-emerald-400 rounded-2xl shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Highlights Copys */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase text-emerald-500/70 tracking-widest block">
                      🚀 Destacados de Autoridad
                    </span>
                    <ul className="space-y-3">
                      {member.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                          {/* Green bullet square */}
                          <div className="w-1.5 h-1.5 rounded bg-emerald-400 shrink-0 mt-2 shadow-[0_0_6px_#10b981]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Badges Footer Area */}
                <div className="mt-8 pt-5 border-t border-emerald-500/10 space-y-3">
                  <span className="text-[10px] font-black uppercase text-emerald-500/70 tracking-widest block">
                    🛠️ Especialidades Tecnológicas
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 bg-emerald-950/65 text-[#10B981] text-[10px] md:text-xs font-black uppercase rounded-lg border border-emerald-500/20 tracking-wider shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic quote card on bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-slate-950/50 border border-slate-850 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Metodología de Alto Rendimiento
            </h4>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl font-sans leading-relaxed">
              Trabajamos bajo estándares rigurosos que conectan la teoría académica con simulaciones en tiempo real y proyectos reales. ¡Haz click abajo para asegurar tu lugar e iniciar tu plan personalizado hoy!
            </p>
          </div>
          <a
            href="#registro-directo"
            onClick={(e) => {
              e.preventDefault();
              // Trigger enrollment button click
              const btn = document.querySelector('[id^="enroll-btn-"]') as HTMLElement || document.getElementById("enroll-btn-hero") as HTMLElement;
              if (btn) btn.click();
            }}
            className="px-6 py-3 bg-[#10B981] hover:bg-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
          >
            Inscribirme Ahora
          </a>
        </motion.div>

      </div>
    </section>
  );
}
