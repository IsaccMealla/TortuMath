import React from "react";
import { 
  TrendingUp, 
  Users, 
  Coins, 
  FileText, 
  Sparkles, 
  MessageSquare
} from "lucide-react";
import { StudentRegistration, AssignedMaterial, QuizLog } from "../../types";

export interface FinanceTabProps {
  students: StudentRegistration[];
  assignedMaterials: AssignedMaterial[];
  quizScores: QuizLog[];
  verifiedIncome: number;
  totalPossibleIncome: number;
  togglePaymentStatus: (id: string) => void;
  addToast: (message: string, type: "success" | "error" | "info") => void;
  
  // Simulated state for Simulator
  simPriceAdjustment: number;
  setSimPriceAdjustment: (val: number) => void;
  simNewStudents: number;
  setSimNewStudents: (val: number) => void;
  simAvgNewStudentFee: number;
  setSimAvgNewStudentFee: (val: number) => void;
  
  // Ledger filters
  selectedFinanceArea: string;
  setSelectedFinanceArea: (val: string) => void;
  financeLedgerFilter: string;
  setFinanceLedgerFilter: (val: string) => void;
  
  // Finance SubTab state
  finSubTab: "tablero" | "simulador" | "conciliacion";
  setFinSubTab: (tab: "tablero" | "simulador" | "conciliacion") => void;
}

export default function FinanceTab({
  students,
  assignedMaterials,
  quizScores,
  verifiedIncome,
  totalPossibleIncome,
  togglePaymentStatus,
  addToast,
  simPriceAdjustment,
  setSimPriceAdjustment,
  simNewStudents,
  setSimNewStudents,
  simAvgNewStudentFee,
  setSimAvgNewStudentFee,
  selectedFinanceArea,
  setSelectedFinanceArea,
  financeLedgerFilter,
  setFinanceLedgerFilter,
  finSubTab,
  setFinSubTab,
}: FinanceTabProps) {
  return (
    <div className="bg-forest-surface border border-emerald-premium/15 rounded-3xl p-6 md:p-8 space-y-8 text-left shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-premium/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-premium/10 pb-5">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-emerald-premium" />
            Centro de Inteligencia Financiera y Caja Académica
          </h3>
          <p className="text-xs text-slate-350 mt-1.5 leading-relaxed max-w-2xl font-medium">
            Auditoría en tiempo real del flujo de caja mensual por concepto de tutorías y pensiones consolidadas. Ejecuta análisis predictivos y planifica el crecimiento de la academia.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase bg-[#07241e] text-[#10B981] border border-[#10B981]/20 px-3 py-1.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
            Cálculos en Tiempo Real
          </span>
        </div>
      </div>

      {/* High fidelity Sub-Tabs Menu */}
      <div className="flex flex-wrap border-b border-emerald-premium/10 pb-1 gap-1.5 relative z-10">
        {[
          { id: "tablero", label: "📊 Tablero y Analíticas", desc: "Métricas consolidadas, distribución e historial" },
          { id: "simulador", label: "🔮 Simulador Predictivo", desc: "Modelado What-If, reajustes y proyecciones" },
          { id: "conciliacion", label: "📒 Libro de Caja y Conciliación", desc: "Validación de transferencias QR en lote" }
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => {
              setFinSubTab(sub.id as any);
              addToast(`Cargando vista: ${sub.label.split(" ").slice(1).join(" ")}`, "info");
            }}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer relative ${
              finSubTab === sub.id
                ? "bg-emerald-premium/15 text-emerald-premium border border-emerald-premium/25 shadow-[inset_0_0_12px_rgba(16,185,129,0.1)] font-black"
                : "text-slate-450 hover:bg-emerald-premium/5 hover:text-white border border-transparent"
            }`}
            title={sub.desc}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* MAIN SUB-VIEW: 1. TABLERO Y METRICAS */}
      {finSubTab === "tablero" && (
        <div className="space-y-6 relative z-10">
          
          {/* Financial KPI Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI 1: Ingreso Cobrado */}
            <div className="p-4 rounded-2xl bg-black/30 border border-emerald-500/15 shadow-sm space-y-2 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-black text-emerald-400 tracking-wider">
                Ingresos Cobrados (QR)
              </span>
              <div>
                <div className="text-3xl font-mono font-black text-emerald-300">
                  {verifiedIncome} Bs.
                </div>
                <p className="text-[10px] text-slate-450 font-semibold mt-1">
                  {students.filter(s => s.paymentVerified).length} transferencias ya validadas.
                </p>
              </div>
              <div className="space-y-1 mt-2">
                <div className="w-full bg-[#051511] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-premium transition-all duration-500" 
                    style={{ width: `${Math.round((verifiedIncome / (totalPossibleIncome || 1)) * 100)}%` }} 
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-500 block text-right">
                  {Math.round((verifiedIncome / (totalPossibleIncome || 1)) * 100)}% de la matrícula total
                </span>
              </div>
            </div>

            {/* KPI 2: Ingreso Pendiente */}
            <div className="p-4 rounded-2xl bg-black/30 border border-amber-500/15 shadow-sm space-y-2 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-black text-amber-400 tracking-wider">
                Ingresos Pendientes
              </span>
              <div>
                <div className="text-3xl font-mono font-black text-amber-300">
                  {totalPossibleIncome - verifiedIncome} Bs.
                </div>
                <p className="text-[10px] text-slate-450 font-semibold mt-1">
                  {students.filter(s => !s.paymentVerified).length} alumnos pendientes de verificación.
                </p>
              </div>
              <div className="space-y-1 mt-2">
                <div className="w-full bg-[#051511] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-450 transition-all duration-500" 
                    style={{ width: `${Math.round(((totalPossibleIncome - verifiedIncome) / (totalPossibleIncome || 1)) * 100)}%` }} 
                  />
                </div>
                <span className="text-[9px] font-mono text-slate-500 block text-right">
                  {Math.round(((totalPossibleIncome - verifiedIncome) / (totalPossibleIncome || 1)) * 100)}% por cobrar
                </span>
              </div>
            </div>

            {/* KPI 3: Matrícula Total */}
            <div className="p-4 rounded-2xl bg-black/30 border border-emerald-premium/10 shadow-sm space-y-2 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-black text-slate-300 tracking-wider">
                Caja Total Esperada
              </span>
              <div>
                <div className="text-3xl font-mono font-black text-white">
                  {totalPossibleIncome} Bs.
                </div>
                <p className="text-[10px] text-slate-450 font-semibold mt-1">
                  Facturación total proyectada para Julio 2026.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold bg-[#07241e] px-2 py-1 rounded-lg w-fit mt-2 border border-emerald-500/10">
                <Users className="w-3.5 h-3.5" />
                {students.length} Alumnos Activos
              </div>
            </div>

            {/* KPI 4: Ticket Promedio */}
            <div className="p-4 rounded-2xl bg-black/30 border border-emerald-premium/10 shadow-sm space-y-2 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-black text-slate-300 tracking-wider">
                Ticket Promedio Mensual
              </span>
              <div>
                <div className="text-3xl font-mono font-black text-[#10B981]">
                  {Math.round(totalPossibleIncome / (students.length || 1))} Bs.
                </div>
                <p className="text-[10px] text-slate-450 font-semibold mt-1">
                  Ingreso promedio que aporta cada alumno matriculado.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-sky-450 font-bold bg-sky-950/20 px-2 py-1 rounded-lg w-fit mt-2 border border-sky-500/10">
                <TrendingUp className="w-3.5 h-3.5" />
                Rentabilidad Estable
              </div>
            </div>
          </div>

          {/* Charts and distributions grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* CHART 1: Historical trend of collections (Custom Responsive SVG) */}
            <div className="lg:col-span-7 p-5 rounded-2.5xl bg-black/15 border border-emerald-premium/10 space-y-4 text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-emerald-premium/10 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Historial de Facturación y Tendencia
                  </h4>
                  <span className="text-[9px] font-bold text-slate-450 font-mono">Últimos 4 Meses (Bs.)</span>
                </div>
                <p className="text-[10.5px] text-slate-450 mt-2 font-medium">
                  Representación visual de la evolución financiera y el volumen total de caja de la academia.
                </p>
              </div>

              {/* Beautiful Interactive SVG Sparkline Chart */}
              <div className="w-full h-44 bg-black/25 rounded-xl border border-emerald-500/5 p-3 flex flex-col justify-between relative mt-3">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
                  <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(16, 185, 129, 0.05)" strokeWidth="1" />
                  
                  {/* Gradient Area under the trend line */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d={`M 20,100 Q 130,85 130,85 T 240,75 T 350,${110 - Math.round(((totalPossibleIncome || 890) / 1200) * 80)} L 350,110 L 20,110 Z`} 
                    fill="url(#chartGrad)" 
                  />

                  {/* Trend lines */}
                  <path 
                    d={`M 20,100 L 130,85 L 240,75 L 350,${110 - Math.round(((totalPossibleIncome || 890) / 1200) * 80)}`} 
                    fill="none" 
                    stroke="#10B981" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />

                  {/* Interactive dot connectors */}
                  <circle cx="20" cy="100" r="4.5" fill="#04120f" stroke="#10B981" strokeWidth="2" />
                  <circle cx="130" cy="85" r="4.5" fill="#04120f" stroke="#10B981" strokeWidth="2" />
                  <circle cx="240" cy="75" r="4.5" fill="#04120f" stroke="#10B981" strokeWidth="2" />
                  <circle cx="350" cy={110 - Math.round(((totalPossibleIncome || 890) / 1200) * 80)} r="5.5" fill="#10B981" stroke="#fff" strokeWidth="1.5" className="animate-pulse" />

                  {/* Chart Texts */}
                  <text x="20" y="115" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">ABR (540 Bs)</text>
                  <text x="130" y="115" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">MAY (720 Bs)</text>
                  <text x="240" y="115" fontSize="8" fill="#64748b" textAnchor="middle" fontWeight="bold">JUN (810 Bs)</text>
                  <text x="350" y="115" fontSize="8" fill="#10B981" textAnchor="middle" fontWeight="black">JUL ({totalPossibleIncome} Bs)</text>

                  {/* Actual Value Tooltip above last node */}
                  <rect x="300" y={110 - Math.round(((totalPossibleIncome || 890) / 1200) * 80) - 22} width="95" height="15" rx="3" fill="#09261f" stroke="#10B981" strokeWidth="0.5" />
                  <text x="347" y={110 - Math.round(((totalPossibleIncome || 890) / 1200) * 80) - 12} fontSize="7" fill="#fff" textAnchor="middle" fontWeight="black">PROYECTADO EN ALZA</text>
                </svg>
              </div>
              
              <div className="flex justify-between items-center bg-[#051511] border border-emerald-premium/5 p-3 rounded-xl mt-3 text-xs">
                <span className="font-semibold text-slate-350">Tasa de Crecimiento (Junio vs Julio)</span>
                <span className="font-mono font-black text-emerald-400">
                  +{Math.round(((totalPossibleIncome - 810) / 810) * 100)}% de incremento mensual
                </span>
              </div>
            </div>

            {/* CHART 2: Revenue distribution by subject (Bar & Contribution) */}
            <div className="lg:col-span-5 p-5 rounded-2.5xl bg-black/15 border border-emerald-premium/10 space-y-4 text-left flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] border-b border-emerald-premium/10 pb-2">
                  Desglose y Contribución de Matrícula
                </h4>
                <p className="text-[10.5px] text-slate-450 mt-2 leading-relaxed">
                  Porcentaje de participación por cada área. Haz clic en las áreas en el menú de conciliación para auditar transacciones.
                </p>
              </div>

              <div className="space-y-3.5 pt-2.5">
                {[
                  { 
                    name: "📐 TortuMath", 
                    color: "bg-emerald-500", 
                    verified: students.filter(s => s.paymentVerified && s.subject.toLowerCase().includes("matemát")).reduce((sum, s) => sum + s.amount, 0),
                    pending: students.filter(s => !s.paymentVerified && s.subject.toLowerCase().includes("matemát")).reduce((sum, s) => sum + s.amount, 0)
                  },
                  { 
                    name: "⚛️ TortuPhysics", 
                    color: "bg-sky-500", 
                    verified: students.filter(s => s.paymentVerified && s.subject.toLowerCase().includes("físic")).reduce((sum, s) => sum + s.amount, 0),
                    pending: students.filter(s => !s.paymentVerified && s.subject.toLowerCase().includes("físic")).reduce((sum, s) => sum + s.amount, 0)
                  },
                  { 
                    name: "💻 TortuCode", 
                    color: "bg-purple-500", 
                    verified: students.filter(s => s.paymentVerified && s.subject.toLowerCase().includes("program")).reduce((sum, s) => sum + s.amount, 0),
                    pending: students.filter(s => !s.paymentVerified && s.subject.toLowerCase().includes("program")).reduce((sum, s) => sum + s.amount, 0)
                  },
                  { 
                    name: "🔌 TortuProject / Electronica", 
                    color: "bg-amber-500", 
                    verified: students.filter(s => s.paymentVerified && (s.subject.toLowerCase().includes("electrón") || s.subject.toLowerCase().includes("robót") || s.subject.toLowerCase().includes("scratch"))).reduce((sum, s) => sum + s.amount, 0),
                    pending: students.filter(s => !s.paymentVerified && (s.subject.toLowerCase().includes("electrón") || s.subject.toLowerCase().includes("robót") || s.subject.toLowerCase().includes("scratch"))).reduce((sum, s) => sum + s.amount, 0)
                  }
                ].map((area, idx) => {
                  const areaTotal = area.verified + area.pending;
                  const percentage = totalPossibleIncome > 0 ? Math.round((areaTotal / totalPossibleIncome) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-extrabold text-white flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${area.color}`} />
                          {area.name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-300">
                          {areaTotal} Bs. <span className="text-slate-500 text-[10px] font-semibold">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-[#030d0a] h-2 rounded-full flex overflow-hidden">
                        <div 
                          className={`${area.color} h-full opacity-100 transition-all duration-500`} 
                          style={{ width: `${totalPossibleIncome > 0 ? (areaTotal / totalPossibleIncome) * 100 : 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                        <span className="text-emerald-400">Cobrado: {area.verified} Bs</span>
                        <span className="text-amber-400">Por Cobrar: {area.pending} Bs</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Smart Audit Alerts / Insights Box */}
          <div className="bg-[#051511]/70 border border-emerald-premium/15 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-premium animate-pulse" />
              Auditor Inteligente de Caja - Diagnósticos
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-1">
              
              <div className="p-3 bg-black/25 border border-emerald-500/5 rounded-xl space-y-1">
                <span className="font-bold text-slate-200 block">⚡ Mayor Foco de Rentabilidad</span>
                <span className="text-slate-450 text-[11px] leading-relaxed block">
                  TortuCode (Programación) ostenta el ticket de pensión individual más elevado con un promedio de 240 Bs. Sugerimos priorizar este plan en tus campaigns.
                </span>
              </div>

              <div className="p-3 bg-black/25 border border-emerald-500/5 rounded-xl space-y-1">
                <span className="font-bold text-slate-200 block">⚠️ Plan de Retención & Riesgos</span>
                <span className="text-slate-450 text-[11px] leading-relaxed block">
                  Tienes {students.filter(s => !s.paymentVerified).length} transferencias por consolidar. Si logras validar el 100% de la caja, expandirás el capital líquido a un total de {totalPossibleIncome} Bs.
                </span>
              </div>

              <div className="p-3 bg-black/25 border border-emerald-500/5 rounded-xl space-y-1">
                <span className="font-bold text-slate-200 block">📈 Oportunidad de Optimización</span>
                <span className="text-slate-450 text-[11px] leading-relaxed block">
                  Un ajuste tarifario de tan solo el 10% incrementará tus ingresos en +{Math.round(totalPossibleIncome * 0.10)} Bs. sin afectar tu volumen de estudiantes activos.
                </span>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* MAIN SUB-VIEW: 2. SIMULADOR PREDICTIVO WHAT-IF */}
      {finSubTab === "simulador" && (
        <div className="space-y-6 relative z-10">
          
          <div className="p-4 rounded-2xl bg-emerald-premium/5 border border-emerald-premium/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1 text-left">
              <span className="text-xs font-black uppercase text-[#10B981] tracking-wider block">Modelador Predictivo Financiero</span>
              <p className="text-[11px] text-slate-350">
                Ajusta las variables de tarifas y captación para simular el impacto en tus finanzas mensuales de forma dinámica.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSimPriceAdjustment(12);
                  setSimNewStudents(4);
                  setSimAvgNewStudentFee(210);
                  addToast("✨ Presupuesto 'Expansión Moderada' cargado en simulación.", "info");
                }}
                className="bg-deep-forest hover:bg-[#0c2e25] border border-emerald-premium/15 px-2.5 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider text-slate-300 transition-all cursor-pointer"
              >
                🚀 Expansión Moderada
              </button>
              <button
                onClick={() => {
                  setSimPriceAdjustment(20);
                  setSimNewStudents(8);
                  setSimAvgNewStudentFee(240);
                  addToast("🔥 Presupuesto 'Optimización Radical' cargado en simulación.", "info");
                }}
                className="bg-deep-forest hover:bg-[#0c2e25] border border-emerald-premium/15 px-2.5 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider text-slate-300 transition-all cursor-pointer"
              >
                ⭐ Escala Agresiva
              </button>
              <button
                onClick={() => {
                  setSimPriceAdjustment(0);
                  setSimNewStudents(0);
                  setSimAvgNewStudentFee(190);
                  addToast("Reiniciado simulador de caja académica.", "info");
                }}
                className="bg-black/35 hover:bg-black/55 border border-slate-700 px-2.5 py-1.5 rounded-lg text-[9.5px] font-black uppercase tracking-wider text-slate-400 transition-all cursor-pointer"
              >
                ✕ Limpiar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Interactive Sliders Panel */}
            <div className="lg:col-span-6 bg-black/20 border border-emerald-500/10 p-5 rounded-2.5xl space-y-5 text-left">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] border-b border-emerald-premium/10 pb-2">
                Ajuste de Variables de Simulación
              </h4>

              {/* Slider 1: Price adjustment percentage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-extrabold text-white">Reajuste Tarifario de Matrícula Actual</span>
                  <span className="font-mono font-black text-emerald-400">
                    {simPriceAdjustment >= 0 ? `+${simPriceAdjustment}` : simPriceAdjustment}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-20" 
                  max="50" 
                  step="2"
                  value={simPriceAdjustment}
                  onChange={(e) => setSimPriceAdjustment(Number(e.target.value))}
                  className="w-full accent-emerald-premium h-2 bg-[#04120f] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>Plan Bajar Precios (-20%)</span>
                  <span>Punto de Equilibrio (0%)</span>
                  <span>Tarifas Premium (+50%)</span>
                </div>
              </div>

              {/* Slider 2: Simulated new students */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-extrabold text-white">Captación de Nuevos Alumnos</span>
                  <span className="font-mono font-black text-emerald-400">
                    +{simNewStudents} Alumnos
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  step="1"
                  value={simNewStudents}
                  onChange={(e) => setSimNewStudents(Number(e.target.value))}
                  className="w-full accent-emerald-premium h-2 bg-[#04120f] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>0 Alumnos Nuevos</span>
                  <span>Meta Conservadora (+5)</span>
                  <span>Expansión Total (+15)</span>
                </div>
              </div>

              {/* Slider 3: Cost average per new student plan */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-extrabold text-white">Costo de Matrícula Nuevos Planes</span>
                  <span className="font-mono font-black text-emerald-400">
                    {simAvgNewStudentFee} Bs. / mes
                  </span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="500" 
                  step="10"
                  value={simAvgNewStudentFee}
                  onChange={(e) => setSimAvgNewStudentFee(Number(e.target.value))}
                  className="w-full accent-emerald-premium h-2 bg-[#04120f] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>50 Bs. (Tutoría Horas)</span>
                  <span>195 Bs. (Plan Base)</span>
                  <span>500 Bs. (Plan Corporativo)</span>
                </div>
              </div>

            </div>

            {/* Projection Result Output Card */}
            <div className="lg:col-span-6 bg-black/35 border border-emerald-premium/15 p-5 rounded-2.5xl flex flex-col justify-between text-left space-y-4">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] border-b border-emerald-premium/10 pb-2">
                  Resultados e Impacto en Caja
                </h4>
                <p className="text-[11px] text-slate-450 mt-2 font-medium">
                  Cálculo consolidado de caja a futuro si se cumplen las metas simuladas.
                </p>
              </div>

              {/* Numerical Breakdown list */}
              <div className="space-y-3 py-2 text-xs">
                <div className="flex justify-between items-center text-slate-350">
                  <span>Caja de Matrículas Base (Actual)</span>
                  <span className="font-mono font-bold text-white">{totalPossibleIncome} Bs.</span>
                </div>
                
                <div className="flex justify-between items-center text-slate-350">
                  <span>Impacto por Reajuste Tarifario ({simPriceAdjustment}%)</span>
                  <span className="font-mono font-bold text-emerald-400">
                    +{Math.round(totalPossibleIncome * (simPriceAdjustment / 100))} Bs.
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-350">
                  <span>Ingreso por Nuevos Alumnos (+{simNewStudents} inscritos)</span>
                  <span className="font-mono font-bold text-emerald-400">
                    +{simNewStudents * simAvgNewStudentFee} Bs.
                  </span>
                </div>

                <div className="border-t border-emerald-premium/10 pt-3 flex justify-between items-baseline">
                  <span className="font-extrabold text-white uppercase text-[10px] tracking-wider">Caja Optimizada Proyectada</span>
                  <span className="text-3xl font-mono font-black text-[#10B981] drop-shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                    {totalPossibleIncome + Math.round(totalPossibleIncome * (simPriceAdjustment / 100)) + (simNewStudents * simAvgNewStudentFee)} Bs.
                  </span>
                </div>
              </div>

              {/* Dynamic visual growth bar compare */}
              <div className="space-y-2 bg-[#04120f] border border-emerald-premium/5 p-3 rounded-xl">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <span>Crecimiento de Caja Logrado</span>
                  <span className="text-emerald-400">
                    +{totalPossibleIncome > 0 ? Math.round(((Math.round(totalPossibleIncome * (simPriceAdjustment / 100)) + (simNewStudents * simAvgNewStudentFee)) / totalPossibleIncome) * 100) : 0}% de Evolución
                  </span>
                </div>
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden relative">
                  <div className="h-full bg-emerald-premium transition-all duration-500" style={{ width: `${Math.min(100, 100 + (totalPossibleIncome > 0 ? Math.round(((Math.round(totalPossibleIncome * (simPriceAdjustment / 100)) + (simNewStudents * simAvgNewStudentFee)) / totalPossibleIncome) * 100) : 0))}%` }} />
                </div>
                <span className="text-[9.5px] font-mono text-slate-500 block leading-tight">
                  Evolución incremental de ingresos directos. Un crecimiento superior al 25% anual se considera óptimo para la sostenibilidad académica.
                </span>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* MAIN SUB-VIEW: 3. CONCILIACION LEDGER & QR ACTION */}
      {finSubTab === "conciliacion" && (
        <div className="space-y-6 relative z-10">
          
          {/* Search and Filters for Ledger */}
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-black/25 p-4 rounded-2xl border border-emerald-premium/10 text-xs">
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              
              <div className="flex items-center gap-1 bg-[#051511] border border-emerald-premium/15 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-300">
                <span className="text-[9.5px] uppercase font-black text-slate-400">Área:</span>
                <select 
                  value={selectedFinanceArea} 
                  onChange={(e) => setSelectedFinanceArea(e.target.value)} 
                  className="bg-transparent border-none text-slate-100 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas las Áreas</option>
                  <option value="math">Matemáticas</option>
                  <option value="physics">Física</option>
                  <option value="code">Programación</option>
                  <option value="projects">Electrónica / Proyectos</option>
                </select>
              </div>

              <div className="flex items-center gap-1 bg-[#051511] border border-emerald-premium/15 rounded-xl px-2.5 py-1 text-[11px] font-bold text-slate-300">
                <span className="text-[9.5px] uppercase font-black text-slate-400">Estado:</span>
                <select 
                  value={financeLedgerFilter} 
                  onChange={(e) => setFinanceLedgerFilter(e.target.value)} 
                  className="bg-transparent border-none text-slate-100 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="all">Ver Todos</option>
                  <option value="verified">Cobrados / Verificados</option>
                  <option value="pending">Pendientes de Cobro</option>
                </select>
              </div>

            </div>

            {/* Total indicator in ledger filter */}
            <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-2">
              <span>Filtrando</span> 
              <span className="text-white font-black font-mono bg-emerald-premium/15 px-2 py-0.5 rounded border border-emerald-premium/25">
                {students.filter(student => {
                  const matchesArea = selectedFinanceArea === "all" ||
                    (selectedFinanceArea === "math" && student.subject.toLowerCase().includes("matemát")) ||
                    (selectedFinanceArea === "physics" && student.subject.toLowerCase().includes("físic")) ||
                    (selectedFinanceArea === "code" && student.subject.toLowerCase().includes("program")) ||
                    (selectedFinanceArea === "projects" && (student.subject.toLowerCase().includes("electrón") || student.subject.toLowerCase().includes("robót") || student.subject.toLowerCase().includes("scratch")));
                  
                  const matchesLedgerStatus = financeLedgerFilter === "all" ||
                    (financeLedgerFilter === "verified" && student.paymentVerified) ||
                    (financeLedgerFilter === "pending" && !student.paymentVerified);
                  
                  return matchesArea && matchesLedgerStatus;
                }).length} alumnos
              </span>
            </div>
          </div>

          {/* Transaction Ledger Table List */}
          <div className="border border-emerald-premium/10 rounded-2xl overflow-hidden bg-black/25">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#051511] border-b border-emerald-premium/15 text-slate-400 uppercase font-black tracking-wider text-[9.5px]">
                    <th className="p-4">Estudiante</th>
                    <th className="p-4">Especialidad y Plan</th>
                    <th className="p-4">Fecha de Registro</th>
                    <th className="p-4 text-right">Monto Mensual</th>
                    <th className="p-4 text-center">Estado QR</th>
                    <th className="p-4 text-center">Acciones Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-premium/5">
                  {students
                    .filter(student => {
                      const matchesArea = selectedFinanceArea === "all" ||
                        (selectedFinanceArea === "math" && student.subject.toLowerCase().includes("matemát")) ||
                        (selectedFinanceArea === "physics" && student.subject.toLowerCase().includes("físic")) ||
                        (selectedFinanceArea === "code" && student.subject.toLowerCase().includes("program")) ||
                        (selectedFinanceArea === "projects" && (student.subject.toLowerCase().includes("electrón") || student.subject.toLowerCase().includes("robót") || student.subject.toLowerCase().includes("scratch")));
                      
                      const matchesLedgerStatus = financeLedgerFilter === "all" ||
                        (financeLedgerFilter === "verified" && student.paymentVerified) ||
                        (financeLedgerFilter === "pending" && !student.paymentVerified);
                      
                      return matchesArea && matchesLedgerStatus;
                    })
                    .map((student) => {
                      return (
                        <tr key={student.id} className="hover:bg-emerald-premium/5 transition-colors">
                          {/* Student Column */}
                          <td className="p-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#051511] border border-emerald-premium/20 flex items-center justify-center font-mono text-[10px] font-black text-emerald-400">
                                {student.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                              </div>
                              <div>
                                <span className="font-extrabold text-white block">{student.name}</span>
                                <span className="text-[10px] text-slate-500 font-mono font-bold block">{student.id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Subject/Plan Column */}
                          <td className="p-4">
                            <span className="font-semibold text-slate-200 block">{student.subject}</span>
                            <span className="text-[10px] text-slate-450 font-medium block">{student.plan}</span>
                          </td>

                          {/* Date column */}
                          <td className="p-4 font-mono font-bold text-slate-400">
                            {student.registrationDate}
                          </td>

                          {/* Amount column */}
                          <td className="p-4 text-right font-mono font-black text-white text-[12px]">
                            {student.amount} Bs.
                          </td>

                          {/* QR Status Column */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                togglePaymentStatus(student.id);
                                addToast(
                                  student.paymentVerified 
                                    ? `Pago pendiente de ${student.name} reestablecido.` 
                                    : `¡Pago de ${student.name} conciliado correctamente!`, 
                                  student.paymentVerified ? "info" : "success"
                                );
                              }}
                              className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider border cursor-pointer transition-all ${
                                student.paymentVerified
                                  ? "bg-[#09261f] border-emerald-500/30 text-emerald-400 hover:bg-rose-950/20 hover:border-rose-500/30 hover:text-rose-400"
                                  : "bg-[#2d1f11] border-amber-500/30 text-amber-400 hover:bg-emerald-950/20 hover:border-emerald-500/30 hover:text-emerald-400"
                              }`}
                              title={student.paymentVerified ? "Pago validado. Haz clic para deshacer." : "Pago pendiente. Haz clic para conciliar."}
                            >
                              {student.paymentVerified ? "✓ Verificado" : "⏳ Pendiente"}
                            </button>
                          </td>

                          {/* Action Column */}
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* WhatsApp reminder trigger */}
                              <button
                                onClick={() => {
                                  const text = `Hola *${student.name}*, te recordamos que tu pago de pensión en TortuMath por un monto de *${student.amount} Bs.* para el área de *${student.subject}* se encuentra pendiente. Puedes enviarnos el comprobante QR por este medio. ¡Muchas gracias!`;
                                  navigator.clipboard.writeText(text);
                                  addToast(`✓ Plantilla de recordatorio copiada al portapapeles para ${student.name}.`, "success");
                                }}
                                disabled={student.paymentVerified}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                  student.paymentVerified
                                    ? "opacity-30 cursor-not-allowed border-slate-800 text-slate-600"
                                    : "bg-[#051511] border-emerald-premium/20 text-[#10B981] hover:border-[#10B981] hover:bg-[#10B981]/5"
                                }`}
                                title={student.paymentVerified ? "Pago conciliado" : "Copiar Recordatorio WhatsApp"}
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => {
                                  addToast(`Detalle de boleta mensual de ${student.name} preparado para envío por correo.`, "info");
                                }}
                                className="p-1.5 bg-[#051511] border border-emerald-premium/20 text-slate-300 rounded-lg hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all cursor-pointer"
                                title="Enviar Recibo Digital"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Export tools */}
          <div className="p-5 rounded-2.5xl bg-black/15 border border-emerald-premium/10 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
            <div className="space-y-1">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Exportación de Datos de Caja Consolidada
              </h4>
              <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                Genera y descarga la planilla ejecutiva con el desglose exacto de pagos verificados, montos de pensión, deudas pendientes e identificadores únicos de cada alumno.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => {
                  addToast("📄 Iniciando descarga de PDF Financiero Ejecutivo consolidado...", "success");
                }}
                className="bg-deep-forest hover:bg-[#0c2e25] border border-emerald-premium/15 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-300 transition-all cursor-pointer flex items-center gap-1.5"
              >
                Descargar PDF
              </button>
              <button
                onClick={() => {
                  addToast("✓ Descarga de planilla de caja XLS consolidada iniciada correctamente.", "success");
                }}
                className="bg-emerald-premium hover:bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                Descargar Excel (XLSX)
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
