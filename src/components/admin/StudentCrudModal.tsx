import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  BookOpen, 
  Calendar, 
  Link, 
  Coins, 
  Save, 
  UserPlus, 
  Eye, 
  EyeOff,
  Sparkles,
  Copy,
  Check
} from "lucide-react";
import { StudentRegistration } from "../../types";

const SUBJECTS = [
  "Matemáticas Avanzadas",
  "Física Académica",
  "Programación Inicial",
  "Robótica / Scratch",
  "Electrónica Aplicada"
];

const PLANS = [
  "1 Hora de Tutoría Individual",
  "Plan TortuMath Semanal",
  "Plan TortuMath Quincenal",
  "Plan TortuMath Mensual",
  "Plan TortuPhysics Semanal",
  "Plan TortuPhysics Quincenal",
  "Plan TortuPhysics Mensual",
  "Plan TortuCode Semanal",
  "Plan TortuCode Quincenal",
  "Plan TortuCode Mensual",
  "Plan TortuProject Semanal",
  "Plan TortuProject Quincenal",
  "Plan TortuProject Mensual"
];

interface StudentCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  student?: StudentRegistration | null;
  onSuccess: (message: string) => void;
  onStudentCreated: (student: StudentRegistration) => void;
  onStudentUpdated: (student: StudentRegistration) => void;
}

export default function StudentCrudModal({
  isOpen,
  onClose,
  mode,
  student,
  onSuccess,
  onStudentCreated,
  onStudentUpdated,
}: StudentCrudModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [plan, setPlan] = useState(PLANS[0]);
  const [schedule, setSchedule] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [amount, setAmount] = useState<number>(195);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Populate fields in edit mode
  useEffect(() => {
    if (mode === "edit" && student) {
      setName(student.name);
      setPhone(student.phone);
      setEmail(student.email);
      setPassword(""); // Don't prefill password
      setSubject(student.subject);
      setPlan(student.plan);
      setSchedule(student.schedule);
      setMeetLink(student.meetLink);
      setAmount(student.amount);
    } else if (mode === "create") {
      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setSubject(SUBJECTS[0]);
      setPlan(PLANS[0]);
      setSchedule("");
      setMeetLink("");
      setAmount(195);
    }
    setError("");
    setShowPassword(false);
  }, [mode, student, isOpen]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError("Nombre, email y contraseña son obligatorios.");
          setIsSubmitting(false);
          return;
        }

        const res = await fetch("http://localhost:5000/api/students/create-with-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            password: password.trim(),
            subject,
            plan,
            schedule,
            meetLink: meetLink.trim(),
            amount
          })
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Error al crear el alumno");
          setIsSubmitting(false);
          return;
        }

        const data = await res.json();
        // Map snake_case DB fields to camelCase frontend
        const newStudent: StudentRegistration = {
          id: data.id,
          name: data.name,
          phone: data.phone || "",
          email: data.email,
          subject: data.subject,
          plan: data.plan,
          schedule: data.schedule,
          meetLink: data.meet_link || "",
          paymentVerified: !!data.payment_verified,
          registrationDate: data.registration_date,
          amount: data.amount || 0
        };

        onStudentCreated(newStudent);
        onSuccess(`✅ Alumno "${name}" registrado correctamente. Credenciales: ${email} / ${password}`);
        onClose();

      } else if (mode === "edit" && student) {
        const body: Record<string, any> = {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          subject,
          plan,
          schedule,
          meetLink: meetLink.trim(),
          paymentVerified: student.paymentVerified,
          amount
        };
        // Only send password if changed
        if (password.trim()) {
          body.password = password.trim();
        }

        const res = await fetch(`http://localhost:5000/api/students/${student.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Error al actualizar el alumno");
          setIsSubmitting(false);
          return;
        }

        const data = await res.json();
        const updatedStudent: StudentRegistration = {
          id: data.id,
          name: data.name,
          phone: data.phone || "",
          email: data.email,
          subject: data.subject,
          plan: data.plan,
          schedule: data.schedule,
          meetLink: data.meet_link || "",
          paymentVerified: !!data.payment_verified,
          registrationDate: data.registration_date,
          amount: data.amount || 0
        };

        onStudentUpdated(updatedStudent);
        const pwMsg = password.trim() ? ` Nueva contraseña: ${password}` : "";
        onSuccess(`✅ Alumno "${name}" actualizado correctamente.${pwMsg}`);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isCreate = mode === "create";
  const title = isCreate ? "Registrar Nuevo Alumno" : "Editar Alumno";
  const subtitle = isCreate 
    ? "Crea la cuenta de acceso y el perfil académico del estudiante"
    : `Editando perfil de ${student?.name || "alumno"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a1a14] border border-emerald-500/20 rounded-3xl shadow-2xl shadow-emerald-950/40"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0a1a14]/95 backdrop-blur-md border-b border-emerald-500/15 px-6 py-5 flex items-center justify-between rounded-t-3xl">
          <div className="space-y-1 text-left">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              {isCreate ? (
                <UserPlus className="w-5 h-5 text-emerald-400" />
              ) : (
                <Sparkles className="w-5 h-5 text-amber-400" />
              )}
              {title}
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Error message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold">
              ⚠️ {error}
            </div>
          )}

          {/* Credentials Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] uppercase font-black text-emerald-400 tracking-widest">
                Credenciales de Acceso
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Usuario */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" /> Usuario
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ej: sofia.ramos"
                    className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => handleCopy(email, "email")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {copiedField === "email" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Contraseña {!isCreate && "(dejar vacío = sin cambio)"}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required={isCreate}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isCreate ? "Contraseña segura" : "Nueva contraseña (opcional)"}
                    className="w-full px-3 py-2.5 pr-16 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {password && (
                      <button
                        type="button"
                        onClick={() => handleCopy(password, "password")}
                        className="text-slate-500 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {copiedField === "password" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Data Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="text-[10px] uppercase font-black text-sky-400 tracking-widest">
                Datos Personales
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <User className="w-3 h-3" /> Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y apellidos"
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Teléfono
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="71234567"
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Academic Data Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-[10px] uppercase font-black text-purple-400 tracking-widest">
                Datos Académicos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Materia
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                >
                  {SUBJECTS.map(s => <option key={s} value={s} className="bg-[#0a1a14]">{s}</option>)}
                </select>
              </div>

              {/* Plan */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all appearance-none cursor-pointer"
                >
                  {PLANS.map(p => <option key={p} value={p} className="bg-[#0a1a14]">{p}</option>)}
                </select>
              </div>

              {/* Schedule */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Horario
                </label>
                <input
                  type="text"
                  required
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="Ej: Lun, Mié, Vie - 15:00 a 16:00"
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Extra Data Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="text-[10px] uppercase font-black text-amber-400 tracking-widest">
                Configuración Adicional
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Meet Link */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Link className="w-3 h-3" /> Google Meet Link
                </label>
                <input
                  type="url"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  placeholder="https://meet.google.com/abc-defg-hij"
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                  <Coins className="w-3 h-3" /> Monto de Inscripción (Bs.)
                </label>
                <input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-black/40 border border-emerald-500/20 rounded-xl text-white text-xs font-medium placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer active:scale-[0.97] ${
                isSubmitting
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : isCreate
                    ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25"
                    : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </>
              ) : isCreate ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Crear Alumno y Cuenta
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
