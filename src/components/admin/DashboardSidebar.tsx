import React from "react";
import Logo from "../shared/Logo";
import { 
  LogOut,
  Users,
  Coins,
  AlertCircle, 
  ChevronRight,
  ClipboardCheck,
  Award,
  Plus
} from "lucide-react";

export interface DashboardSidebarProps {
  activeTab: "alumnos" | "tareas" | "quizzes" | "finanzas" | "despacho";
  setActiveTab: (tab: "alumnos" | "tareas" | "quizzes" | "finanzas" | "despacho") => void;
  pendingCorrectionsCount: number;
  criticalQuizFailures: number;
  pendingDeliveries: number;
  userEmail: string;
  onLogout: () => void;
}

export default function DashboardSidebar({
  activeTab,
  setActiveTab,
  pendingCorrectionsCount,
  criticalQuizFailures,
  pendingDeliveries,
  userEmail,
  onLogout,
}: DashboardSidebarProps) {
  return (
    <aside className="w-full md:w-64 bg-[#030e0b] border-r border-emerald-premium/20 flex-shrink-0 flex flex-col justify-between sticky top-0 md:h-screen z-30 shadow-[4px_0_24px_rgba(16,185,129,0.05)]">
      <div>
        {/* Brand header */}
        <div className="p-5 flex items-center gap-2.5 border-b border-emerald-premium/15 bg-black/20">
          <Logo size={36} />
          <div className="text-left">
            <span className="block font-black text-white text-lg tracking-tight">TortuMath</span>
            <span className="block text-[9px] text-[#10B981] uppercase font-extrabold tracking-widest leading-none">Administración</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-2" id="admin-sidebar-nav">
          <button
            onClick={() => setActiveTab("alumnos")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === "alumnos"
                ? "bg-emerald-premium/10 text-emerald-premium border border-emerald-premium/30 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]"
                : "text-slate-400 hover:bg-emerald-premium/5 hover:text-emerald-premium/90 border border-transparent"
            }`}
          >
            {activeTab === "alumnos" && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-premium rounded-r shadow-[0_0_8px_#10b981]" />
            )}
            <div className="flex items-center gap-3">
              <Users className={`w-4 h-4 ${activeTab === "alumnos" ? "text-emerald-premium" : "text-slate-400"}`} />
              <span>Alumnos actuales</span>
            </div>
            <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === "alumnos" ? "rotate-90 text-[#10B981]" : "text-slate-500"}`} />
          </button>

          <button
            onClick={() => setActiveTab("despacho")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === "despacho"
                ? "bg-emerald-premium/10 text-emerald-premium border border-emerald-premium/30 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]"
                : "text-slate-400 hover:bg-emerald-premium/5 hover:text-emerald-premium/90 border border-transparent"
            }`}
          >
            {activeTab === "despacho" && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-premium rounded-r shadow-[0_0_8px_#10b981]" />
            )}
            <div className="flex items-center gap-3">
              <Plus className={`w-4 h-4 ${activeTab === "despacho" ? "text-emerald-premium" : "text-slate-400"}`} />
              <span>Asignar Actividades</span>
            </div>
            <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === "despacho" ? "rotate-90 text-[#10B981]" : "text-slate-500"}`} />
          </button>

          <button
            onClick={() => setActiveTab("tareas")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === "tareas"
                ? "bg-emerald-premium/10 text-emerald-premium border border-emerald-premium/30 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]"
                : "text-slate-400 hover:bg-emerald-premium/5 hover:text-emerald-premium/90 border border-transparent"
            }`}
          >
            {activeTab === "tareas" && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-premium rounded-r shadow-[0_0_8px_#10b981]" />
            )}
            <div className="flex items-center gap-3">
              <ClipboardCheck className={`w-4 h-4 ${activeTab === "tareas" ? "text-emerald-premium" : "text-slate-400"}`} />
              <span>Tareas por corregir</span>
            </div>
            {pendingCorrectionsCount > 0 && (
              <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black font-mono text-[9px] rounded-full">
                {pendingCorrectionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("quizzes")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === "quizzes"
                ? "bg-emerald-premium/10 text-emerald-premium border border-emerald-premium/30 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]"
                : "text-slate-400 hover:bg-emerald-premium/5 hover:text-emerald-premium/90 border border-transparent"
            }`}
          >
            {activeTab === "quizzes" && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-premium rounded-r shadow-[0_0_8px_#10b981]" />
            )}
            <div className="flex items-center gap-3">
              <Award className={`w-4 h-4 ${activeTab === "quizzes" ? "text-emerald-premium" : "text-slate-400"}`} />
              <span>Monitoreo Quizzes</span>
            </div>
            <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === "quizzes" ? "rotate-90 text-[#10B981]" : "text-slate-500"}`} />
          </button>

          <button
            onClick={() => setActiveTab("finanzas")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              activeTab === "finanzas"
                ? "bg-emerald-premium/10 text-emerald-premium border border-emerald-premium/30 shadow-[inset_0_0_12px_rgba(16,185,129,0.15)]"
                : "text-slate-400 hover:bg-emerald-premium/5 hover:text-emerald-premium/90 border border-transparent"
            }`}
          >
            {activeTab === "finanzas" && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-emerald-premium rounded-r shadow-[0_0_8px_#10b981]" />
            )}
            <div className="flex items-center gap-3">
              <Coins className={`w-4 h-4 ${activeTab === "finanzas" ? "text-emerald-premium" : "text-slate-400"}`} />
              <span>Finanzas y Reportes</span>
            </div>
            <ChevronRight className={`w-3 h-3 transition-transform ${activeTab === "finanzas" ? "rotate-90 text-[#10B981]" : "text-slate-500"}`} />
          </button>
        </nav>

        {/* Dynamic Critical Notifications Section */}
        <div className="mx-4 my-2 p-3.5 bg-rose-950/20 border border-rose-500/20 rounded-2xl text-left space-y-2.5">
          <div className="flex items-center gap-1.5 text-rose-400 font-black text-[10px] uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <span>Notificaciones Críticas</span>
          </div>
          <div className="space-y-2 text-[10.5px] leading-relaxed">
            {criticalQuizFailures > 0 && (
              <div className="flex items-start gap-1.5 text-rose-350">
                <span className="text-rose-500 font-extrabold">•</span>
                <span>{criticalQuizFailures} alumnos han reprobado el último Quiz. Requieren apoyo.</span>
              </div>
            )}
            {pendingDeliveries > 0 && (
              <div className="flex items-start gap-1.5 text-amber-300">
                <span className="text-amber-500 font-extrabold">•</span>
                <span>{pendingDeliveries} tareas de cuaderno listas para calificar.</span>
              </div>
            )}
            {criticalQuizFailures === 0 && pendingDeliveries === 0 && (
              <div className="text-slate-500 text-[10px] italic py-1">
                ✓ Alumnos con progreso estable. No hay alertas críticas de atención.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User context & logout */}
      <div className="p-4 border-t border-emerald-premium/15 bg-forest-surface/80">
        <div className="flex items-center gap-3 mb-4 px-1">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald-premium flex items-center justify-center text-[#061612] border border-emerald-premium shadow-[0_0_12px_rgba(16,185,129,0.2)] font-black text-xs">
              AD
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-deep-forest rounded-full" />
          </div>
          <div className="overflow-hidden text-left">
            <span className="block text-xs font-black text-white truncate">{userEmail}</span>
            <span className="block text-[8px] text-[#10B981] uppercase tracking-widest font-black">Coordinador Principal</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-rose-950/20 hover:bg-rose-900/40 hover:text-rose-400 text-rose-300 text-[11px] font-black uppercase tracking-widest rounded-xl border border-rose-900/30 hover:border-rose-700/50 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
