import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, BookOpen, Clock, Calendar, MessageCircle, PhoneCall, LogIn, Laptop, Users } from "lucide-react";
import EnrollmentModal from "./EnrollmentModal";

interface NavbarProps {
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenLogin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
    <header
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/90 backdrop-blur-md shadow-lg border-b border-white/10 py-3"
          : "bg-[#0F172A]/30 backdrop-blur-sm shadow-sm border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Responsive Logo wrapper targeting static fallback or custom inline */}
        <a href="#hero-section" className="flex items-center" aria-label="Ir al inicio de TortuMath">
          {/* We support pointing to a static source but prefer rendering the crisp interactive component */}
          <Logo size={50} className={scrolled ? "scale-95" : "scale-100"} />
        </a>

        {/* Desktop Navigation list */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold transition-colors duration-200">
          <a
            href="#materias"
            className="text-white hover:text-emerald-400 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            Materias
          </a>
          <a
            href="#laboratorio-preview"
            className="text-white hover:text-emerald-400 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            Laboratorio Virtual
          </a>
          <a
            href="#equipo-tutor"
            className="text-white hover:text-emerald-400 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            Nuestro Equipo
          </a>
          <a
            href="#faqs"
            className="text-white hover:text-emerald-400 transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
          >
            Preguntas Frecuentes
          </a>
        </nav>

        {/* Action Button Block */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick link for QR Textbook Challenge */}
          <a
            href="#/retos/capitulo-1"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border border-amber-500/40 hover:border-amber-300 hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            title="Escaneo QR del Libro Impreso"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Reto Libro QR</span>
          </a>

          {/* Secondary phone link */}
          <a
            href="https://wa.me/59170000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:text-emerald-300 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>+591 WhatsApp</span>
          </a>
          
          <button
            type="button"
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 border border-emerald-500/40 bg-slate-900/60 hover:bg-slate-900 text-emerald-300 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer active:scale-98"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Iniciar Sesión</span>
          </button>


          <button
            type="button"
            onClick={() => setEnrollmentOpen(true)}
            className="bg-[#059669] hover:bg-emerald-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer font-sans"
          >
            Agendar Tutoría
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors border ${
              scrolled
                ? "text-gray-200 border-white/10 hover:bg-white/5"
                : "text-white border-white/20 hover:bg-white/10"
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label="Alternar menú móvil"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full inset-x-0 bg-[#1E293B] border-b border-white/10 py-6 px-4 space-y-4 shadow-xl flex flex-col z-40 backdrop-blur-lg">
          <a
            href="#materias"
            onClick={closeMobileMenu}
            className="text-gray-200 hover:text-emerald-400 font-bold text-sm py-2 px-3 hover:bg-white/5 rounded-lg flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Materias Académicas
          </a>
          <a
            href="#laboratorio-preview"
            onClick={closeMobileMenu}
            className="text-gray-200 hover:text-emerald-400 font-bold text-sm py-2 px-3 hover:bg-white/5 rounded-lg flex items-center gap-2"
          >
            <Laptop className="w-4 h-4 text-emerald-400" />
            Laboratorio Virtual
          </a>
          <a
            href="#equipo-tutor"
            onClick={closeMobileMenu}
            className="text-gray-200 hover:text-emerald-400 font-bold text-sm py-2 px-3 hover:bg-white/5 rounded-lg flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            Nuestro Equipo
          </a>
          <a
            href="#faqs"
            onClick={closeMobileMenu}
            className="text-gray-200 hover:text-emerald-400 font-bold text-sm py-2 px-3 hover:bg-white/5 rounded-lg flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            Preguntas Frecuentes
          </a>
          <hr className="border-white/5 my-2" />
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="https://wa.me/59170000000"
              target="_blank"
              onClick={closeMobileMenu}
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#111827] text-emerald-400 rounded-xl font-bold border border-emerald-500/20 text-xs"
            >
              <PhoneCall className="w-4 h-4" />
              Contacto WhatsApp
            </a>

            <button
              onClick={() => {
                closeMobileMenu();
                onOpenLogin();
              }}
              className="border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-center font-bold py-3.5 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </button>

            <button
              onClick={() => {
                closeMobileMenu();
                setEnrollmentOpen(true);
              }}
              className="bg-[#059669] hover:bg-emerald-500 text-white text-center font-bold py-3.5 rounded-xl text-xs cursor-pointer"
            >
              Agendar Tutoría de Regalo
            </button>
          </div>
        </div>
      )}

      {/* Render the global Enrollment interactive Modal */}
    </header>
    <EnrollmentModal 
      isOpen={enrollmentOpen} 
      onClose={() => setEnrollmentOpen(false)} 
    />
    </>
  );
}
