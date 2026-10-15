import React, { useState } from "react";
// @ts-ignore
import logoImg from "../../public/logo.png";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: number;
}

export default function Logo({ className = "", iconOnly = false, size = 44 }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* <img> element pointing to imported logoImg */}
      {!imgError ? (
        <img
          src={logoImg}
          alt="TortuMath Logo"
          style={{ height: size * 1.4, width: "auto" }}
          className="object-contain max-w-[120px] transform transition-transform duration-300 hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Stunning SVG layout fallback for real-time visualization */
        <svg
          width={size}
          height={size}
          viewBox="0 0 500 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform transition-transform duration-300 hover:scale-105"
        >
        {/* Turtle Body & Head */}
        <g id="turtle-body">
          {/* Back leg left */}
          <path
            d="M170 190 Q160 250 200 250 Q230 250 220 190 Z"
            fill="#0f5132"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Front leg left */}
          <path
            d="M330 190 Q320 250 360 250 Q390 250 380 190 Z"
            fill="#0f5132"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Tail */}
          <path
            d="M160 170 C150 170 120 160 110 165 C125 178 140 185 160 180 Z"
            fill="#419e73"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Back leg right (foreground) */}
          <path
            d="M210 190 Q195 260 240 260 C265 260 260 215 255 190"
            fill="#10b981"
            stroke="#1E293B"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Front leg right (foreground) */}
          <path
            d="M305 190 Q290 260 335 260 C360 260 355 215 350 190"
            fill="#10b981"
            stroke="#1E293B"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Neck & Head */}
          <path
            d="M320 180 C340 180 395 180 415 150 C435 120 440 90 415 90 C390 90 380 115 375 120 C360 135 345 150 320 165 Z"
            fill="#10b981"
            stroke="#1E293B"
            strokeWidth="9"
            strokeLinejoin="round"
          />
          {/* Eye */}
          <circle cx="410" cy="112" r="8" fill="#1E293B" />
          {/* Smile */}
          <path
            d="M414 125 C405 130 395 128 390 122"
            stroke="#1E293B"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Turtle Shell with math polygon cuts */}
        <g id="turtle-shell">
          {/* Main Shell Base */}
          <path
            d="M150 175 C145 150 150 100 210 70 C270 40 330 65 365 100 C380 120 385 150 375 175 C355 190 170 190 150 175 Z"
            fill="#34d399"
            stroke="#1E293B"
            strokeWidth="10"
            strokeLinejoin="round"
          />

          {/* Shell Facets / Ribs */}
          {/* Plate lines */}
          {/* Left top plate wrapper with square root */}
          <path
            d="M210 70 L240 115 L200 145 L150 175 L165 115 Z"
            fill="#059669"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Center top plate wrapper with summation */}
          <path
            d="M210 70 L285 64 L310 110 L240 115 Z"
            fill="#10b981"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Right top plate wrapper with pi */}
          <path
            d="M285 64 L365 100 L345 140 L310 110 Z"
            fill="#059669"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Center-left bottom plate */}
          <path
            d="M200 145 L240 115 L310 110 L280 180 L210 183 Z"
            fill="#047857"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          {/* Center-right bottom plate */}
          <path
            d="M310 110 L345 140 L375 175 L335 180 L280 180 Z"
            fill="#0f766e"
            stroke="#1E293B"
            strokeWidth="8"
            strokeLinejoin="round"
          />

          {/* Math Symbols inside shell facets */}
          {/* Square Root: √ in Left Plate */}
          <path
            d="M172 125 L177 125 L182 135 L190 115 L197 115"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Summation: Σ in Center Top Plate */}
          <path
            d="M250 82 H266 L255 92 L266 102 H250"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Pi: π in Right Plate */}
          <path
            d="M316 78 H330 M320 78 V92 M326 78 Q326 90 330 92"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
      )}

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-baseline font-display leading-none">
            <span className="font-black text-2xl tracking-tighter text-white drop-shadow-sm">
              TORTU
            </span>
            <span className="font-black text-2xl tracking-tighter text-emerald-400 drop-shadow-sm">
              MATH
            </span>
          </div>
          <span className="text-[9px] tracking-widest font-black text-gray-300 uppercase drop-shadow-sm">
            Bolivia
          </span>
        </div>
      )}
    </div>
  );
}
