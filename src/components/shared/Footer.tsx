import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Phone, Mail, MapPin, Heart, Clock, Send, ShieldCheck, Globe } from "lucide-react";

export default function Footer() {
  const [boliviaTime, setBoliviaTime] = useState("");

  useEffect(() => {
    // Calculate and display Bolivian Time (BOT, typical GMT-4 offset)
    const updateTime = () => {
      const now = new Date();
      // Compute UTC time
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      // Bolivia is UTC-4
      const botOffset = -4;
      const botTime = new Date(utc + 3600000 * botOffset);

      const hours = String(botTime.getHours()).padStart(2, "0");
      const minutes = String(botTime.getMinutes()).padStart(2, "0");
      const seconds = String(botTime.getSeconds()).padStart(2, "0");

      setBoliviaTime(`${hours}:${minutes}:${seconds} BOT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12">
        
        {/* Left Column: Branding, Moto and local time indicator */}
        <div className="md:col-span-5 space-y-6">
          <Logo size={48} className="brightness-110 filter" />
          <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-sm">
            La primera academia boliviana que unifica las Ciencias Exactas con la Programación Básica y la Electrónica Aplicada bajo la premisa de aprender a tu propio ritmo para conquistar las tecnologías del mañana.
          </p>
          
          {/* Bolivian Local Clock (BOT GMT-4) for trust and utility */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-gray-800 text-xs font-mono text-emerald-400">
            <Clock className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Soporte activo — Hora Local en Bolivia:</span>
            <span className="font-extrabold">{boliviaTime || "Cargando..."}</span>
          </div>
        </div>

        {/* Center Column: Virtual Modality Focus */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#059669]">
            Modalidad 100% Virtual
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            Clases en vivo y personalizadas con pizarras interactivas desde la comodidad de tu hogar. Cobertura completa para todos los departamentos de Bolivia (La Paz, Cochabamba, Santa Cruz, Oruro, Potosí, Tarija, Chuquisaca, Beni y Pando).
          </p>
          <ul className="space-y-2.5 text-xs font-semibold text-gray-200">
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Plataforma Online Interactiva Síncrona</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Tutores Expertos en Ciencias e Ingeniería</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Contact details and fast subscription channel */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#059669]">
            Contacto Directo
          </h4>
          <ul className="space-y-3.5 text-xs text-gray-400 font-medium">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>+591 712 34567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>contacto@tortumath.com</span>
            </li>
          </ul>

          <div className="pt-3">
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Boletín de novedades"
                aria-label="Correo para novedades"
                className="bg-slate-900 border border-gray-800 text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#059669] text-white w-full"
              />
              <button
                type="submit"
                aria-label="Suscribirse"
                className="bg-[#059669] hover:bg-emerald-500 p-2 rounded-lg text-white transition-all flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Row credits on bottom */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 mt-8 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Academia Avalada en Bolivia. NIT: 3942004021</span>
        </div>
        
        <p className="flex items-center gap-1">
          <span>© 2026 TortuMath. Creado con</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500 inline mx-0.5" />
          <span>para futuros talentos.</span>
        </p>

        <div className="flex gap-4">
          <a href="#hero-section" className="hover:text-emerald-400 transition-colors">Volver arriba</a>
          <span>·</span>
          <a href="#materias" className="hover:text-emerald-400 transition-colors">Materias</a>
        </div>
      </div>
    </footer>
  );
}
