import React from "react";

export interface DashboardHeaderProps {
  activeTab: "alumnos" | "tareas" | "quizzes" | "finanzas" | "despacho";
}

export default function DashboardHeader({ activeTab }: DashboardHeaderProps) {
  return (
    <header className="bg-[#0B0F19]/90 border-b border-slate-800/80 py-4 px-6 md:px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full">
          {activeTab === "alumnos" && "Gestión Académica y Matrículas"}
          {activeTab === "tareas" && "Corrección de Cuadernos"}
          {activeTab === "quizzes" && "Desempeño de Mini-Quizzes"}
          {activeTab === "finanzas" && "Finanzas y Reportes"}
          {activeTab === "despacho" && "Asignación de Actividades Académicas"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-xs text-slate-450 font-mono hidden sm:block">
          Región: <span className="font-bold text-white">La Paz, Bolivia</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </header>
  );
}
