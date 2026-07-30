import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Cpu, Maximize2, Minimize2, Activity, Layers, ZoomIn, X, Info } from 'lucide-react';

const TOOLTIPS_FAB = {
  ingot: "SILICON INGOT: Click to view crystalline structure and wafer slicing.",
  substrate: "SILICON SUBSTRATE: Click to view physical characteristics and transistor details.",
  oxide: "OXIDE LAYER: Click to explore isolation and dielectric properties.",
  metal: "INTERCONNECTS: Click to learn about metal deposition and wiring.",
  resist: "PHOTORESIST: Click to see lithography stencil details."
};

const TOOLTIPS_PKG = {
  base: "LOGIC DIE: Click to examine computational unit details.",
  interposer: "INTERPOSER: Click to view TSV and 2.5D routing specs.",
  top: "HBM STACK: Click to explore High Bandwidth Memory details."
};

const LAYER_DETAILS: Record<string, { title: string, details: string[], illustration?: React.ReactNode }> = {
  ingot: {
    title: "Silicon Ingot & Wafer Slice",
    details: [
      "Pure monocrystalline silicon (99.9999999% purity).",
      "Grown using the Czochralski process into a cylindrical ingot.",
      "Sliced into extremely flat wafers using diamond wire saws.",
      "Polished to a mirror finish to serve as the foundation for chips."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* Ingot Cylinder */}
        <g stroke="#94a3b8" strokeWidth="1">
          {/* Cylinder body */}
          <path d="M 160 50 L 160 180 A 40 20 0 0 0 240 180 L 240 50 Z" fill="#475569" />
          <ellipse cx="200" cy="180" rx="40" ry="20" fill="#334155" />
          <ellipse cx="200" cy="50" rx="40" ry="20" fill="#64748b" />
          <ellipse cx="200" cy="50" rx="30" ry="15" fill="#94a3b8" />
        </g>
        
        <text x="200" y="215" fill="#e6e3dc" fontSize="12" textAnchor="middle">Silicon Ingot</text>
      </svg>
    )
  },
  substrate: {
    title: "Silicon Substrate & Transistors",
    details: [
      "The foundational 'Ground Floor' of the integrated circuit.",
      "Composed of a 300mm monocrystalline silicon wafer.",
      "Features N-type and P-type doped regions created via ion implantation.",
      "Forms the Active Region where MOSFET transistors operate."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* Base Silicon */}
        <path d="M 50 150 L 300 150 L 350 100 L 100 100 Z" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 50 150 L 50 180 L 300 180 L 300 150 Z" fill="#334155" stroke="#64748b" strokeWidth="1" />
        <path d="M 300 180 L 350 130 L 350 100 L 300 150 Z" fill="#1e293b" stroke="#475569" strokeWidth="1" />
        
        {/* Source / Drain Diffusion */}
        <path d="M 80 145 L 160 145 L 180 125 L 100 125 Z" fill="#ef4444" opacity="0.8" />
        <path d="M 80 145 L 80 155 L 160 155 L 160 145 Z" fill="#dc2626" opacity="0.8" />
        
        <path d="M 220 145 L 280 145 L 300 125 L 240 125 Z" fill="#ef4444" opacity="0.8" />
        <path d="M 220 145 L 220 155 L 280 155 L 280 145 Z" fill="#dc2626" opacity="0.8" />

        {/* Insulating Oxide */}
        <path d="M 150 145 L 230 145 L 250 125 L 170 125 Z" fill="#fde047" opacity="0.9" />
        <path d="M 150 145 L 150 148 L 230 148 L 230 145 Z" fill="#eab308" opacity="0.9" />

        {/* Gate (Poly Silicon) */}
        <path d="M 155 142 L 225 142 L 265 92 L 195 92 Z" fill="#22c55e" opacity="0.9" />
        <path d="M 155 142 L 155 147 L 225 147 L 225 142 Z" fill="#16a34a" opacity="0.9" />
        <path d="M 225 147 L 265 97 L 265 92 L 225 142 Z" fill="#15803d" opacity="0.9" />

        {/* Labels & Lines */}
        <line x1="120" y1="135" x2="80" y2="80" stroke="#e6e3dc" strokeWidth="1" />
        <text x="75" y="75" fill="#e6e3dc" fontSize="12" textAnchor="end">Source (Diffusion)</text>

        <line x1="260" y1="135" x2="300" y2="80" stroke="#e6e3dc" strokeWidth="1" />
        <text x="305" y="75" fill="#e6e3dc" fontSize="12" textAnchor="start">Drain (Diffusion)</text>

        <line x1="210" y1="110" x2="250" y2="50" stroke="#e6e3dc" strokeWidth="1" />
        <text x="255" y="45" fill="#e6e3dc" fontSize="12" textAnchor="start">Gate (Poly silicon)</text>

        <line x1="190" y1="146" x2="190" y2="200" stroke="#e6e3dc" strokeWidth="1" />
        <text x="190" y="215" fill="#e6e3dc" fontSize="12" textAnchor="middle">Insulating oxide / Channel</text>

        <text x="60" y="195" fill="#cbd5e1" fontSize="14" fontWeight="bold">Silicon</text>
      </svg>
    )
  },
  oxide: {
    title: "Oxide Layer (SiO2)",
    details: [
      "Silicon Dioxide (SiO2) film acting as a critical insulator.",
      "Deposited using Chemical Vapor Deposition (CVD) or grown via Oxidation.",
      "Provides electrical isolation between adjacent conductive layers.",
      "Acts as the delicate Gate Insulator in Field-Effect Transistors."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* Silicon Base */}
        <rect x="50" y="150" width="300" height="40" fill="#334155" />
        <text x="60" y="175" fill="#cbd5e1" fontSize="14" fontWeight="bold">Silicon Substrate</text>

        {/* Oxide Layer */}
        <rect x="50" y="110" width="300" height="40" fill="#0284c7" opacity="0.6" stroke="#38bdf8" strokeWidth="2" />
        <text x="60" y="135" fill="#e0f2fe" fontSize="14" fontWeight="bold">Oxide Layer (SiO2)</text>

        {/* Particles/Plasma Deposition */}
        <g fill="#7dd3fc" opacity="0.8">
           <circle cx="100" cy="50" r="3" />
           <circle cx="150" cy="70" r="3" />
           <circle cx="200" cy="40" r="3" />
           <circle cx="250" cy="80" r="3" />
           <circle cx="300" cy="60" r="3" />
           <circle cx="120" cy="90" r="3" />
           <circle cx="270" cy="50" r="3" />
        </g>
        
        {/* Arrows indicating deposition */}
        <g stroke="#38bdf8" strokeWidth="1" opacity="0.5">
           <line x1="100" y1="55" x2="100" y2="105" />
           <line x1="200" y1="45" x2="200" y2="105" />
           <line x1="300" y1="65" x2="300" y2="105" />
           
           <polygon points="98,100 102,100 100,105" fill="#38bdf8" />
           <polygon points="198,100 202,100 200,105" fill="#38bdf8" />
           <polygon points="298,100 302,100 300,105" fill="#38bdf8" />
        </g>

        <line x1="280" y1="120" x2="330" y2="70" stroke="#e6e3dc" strokeWidth="1" />
        <text x="335" y="65" fill="#e6e3dc" fontSize="12">CVD Deposition</text>
      </svg>
    )
  },
  metal: {
    title: "Aluminum/Copper Interconnects",
    details: [
      "Forms the wiring that connects billions of transistors.",
      "Deposited via Physical Vapor Deposition (PVD) or Electroplating.",
      "Sculpted into microscopic patterns using Reactive Ion Etching (RIE).",
      "Multiple metal layers are stacked to create complex routing."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
         {/* Interconnect layers */}
         <rect x="50" y="150" width="300" height="40" fill="#334155" />
         <rect x="50" y="90" width="300" height="40" fill="#475569" />
         <rect x="50" y="30" width="300" height="40" fill="#64748b" />
         
         {/* Vias & Wires */}
         <rect x="100" y="155" width="200" height="10" fill="#fbbf24" /> {/* M1 */}
         <rect x="120" y="130" width="20" height="25" fill="#f59e0b" /> {/* V1 */}
         <rect x="260" y="130" width="20" height="25" fill="#f59e0b" /> {/* V1 */}

         <rect x="80" y="95" width="100" height="15" fill="#fbbf24" /> {/* M2 */}
         <rect x="220" y="95" width="100" height="15" fill="#fbbf24" /> {/* M2 */}

         <rect x="100" y="70" width="20" height="25" fill="#f59e0b" /> {/* V2 */}
         
         <rect x="60" y="40" width="280" height="20" fill="#fbbf24" /> {/* M3 */}

         {/* Labels */}
         <line x1="340" y1="160" x2="360" y2="160" stroke="#e6e3dc" strokeWidth="1" />
         <text x="365" y="164" fill="#e6e3dc" fontSize="12">M1 Layer</text>

         <line x1="130" y1="135" x2="70" y2="135" stroke="#e6e3dc" strokeWidth="1" />
         <text x="65" y="139" fill="#e6e3dc" fontSize="12" textAnchor="end">Via</text>

         <line x1="340" y1="102" x2="360" y2="102" stroke="#e6e3dc" strokeWidth="1" />
         <text x="365" y="106" fill="#e6e3dc" fontSize="12">M2 Layer</text>
         
         <line x1="340" y1="50" x2="360" y2="50" stroke="#e6e3dc" strokeWidth="1" />
         <text x="365" y="54" fill="#e6e3dc" fontSize="12">M3 Layer</text>
      </svg>
    )
  },
  resist: {
    title: "Photoresist (PR)",
    details: [
      "A light-sensitive polymer spin-coated onto the wafer.",
      "Exposed to Extreme Ultraviolet (EUV) light through a photomask.",
      "Developed to leave behind a precise stencil.",
      "Removed (stripped) entirely after the etching process is complete."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* Mask */}
        <rect x="50" y="40" width="300" height="20" fill="#475569" stroke="#94a3b8" />
        <rect x="120" y="40" width="40" height="20" fill="#0f172a" />
        <rect x="240" y="40" width="40" height="20" fill="#0f172a" />
        <text x="360" y="55" fill="#cbd5e1" fontSize="12">Photomask</text>

        {/* UV Light */}
        <g stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" opacity="0.6">
          <line x1="140" y1="60" x2="140" y2="120" />
          <line x1="260" y1="60" x2="260" y2="120" />
        </g>
        <text x="200" y="90" fill="#d8b4fe" fontSize="12" textAnchor="middle">UV Light Exposure</text>

        {/* Layers */}
        <rect x="50" y="160" width="300" height="30" fill="#334155" />
        <text x="60" y="180" fill="#cbd5e1" fontSize="12">Silicon Substrate</text>

        <rect x="50" y="140" width="300" height="20" fill="#64748b" />
        <text x="60" y="155" fill="#cbd5e1" fontSize="12">Target Material</text>

        <rect x="50" y="120" width="300" height="20" fill="#ca8a04" opacity="0.8" />
        {/* Exposed areas */}
        <rect x="120" y="120" width="40" height="20" fill="#eab308" opacity="0.9" />
        <rect x="240" y="120" width="40" height="20" fill="#eab308" opacity="0.9" />
        
        <text x="360" y="135" fill="#fde047" fontSize="12">Photoresist (PR)</text>
      </svg>
    )
  },
  base: {
    title: "Logic Die",
    details: [
      "High-performance logic processor (CPU/GPU/Accelerator).",
      "Manufactured at advanced nodes (e.g., 3nm, 5nm).",
      "Performs the heavy computational workloads for AI and processing.",
      "Generates significant thermal output managed by the package."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* Chip Outline */}
        <rect x="80" y="40" width="240" height="170" fill="#334155" stroke="#94a3b8" strokeWidth="2" rx="10" />
        
        {/* CPU/GPU Cores */}
        <rect x="100" y="60" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />
        <rect x="150" y="60" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />
        <rect x="200" y="60" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />
        <rect x="250" y="60" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />

        <rect x="100" y="110" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />
        <rect x="150" y="110" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />
        <rect x="200" y="110" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />
        <rect x="250" y="110" width="40" height="40" fill="#475569" stroke="#6ce3c6" strokeWidth="1" rx="4" />

        {/* Cache / Shared Memory */}
        <rect x="100" y="160" width="190" height="30" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1" rx="4" />
        <text x="195" y="180" fill="#94a3b8" fontSize="12" textAnchor="middle">Shared L3 Cache / SRAM</text>

        {/* Labels */}
        <line x1="230" y1="100" x2="330" y2="100" stroke="#e6e3dc" strokeWidth="1" />
        <text x="335" y="105" fill="#e6e3dc" fontSize="12">Logic Cores</text>

        <text x="200" y="30" fill="#e6e3dc" fontSize="14" fontWeight="bold" textAnchor="middle">High-Performance Logic Die</text>
      </svg>
    )
  },
  interposer: {
    title: "Silicon Interposer & TSVs",
    details: [
      "Acts as a massive ultra-high-speed communication bridge.",
      "Through-Silicon Vias (TSVs) provide thousands of vertical electrical pathways.",
      "Etched using deep reactive-ion etching (DRIE) and filled with Copper.",
      "Allows different chiplets to communicate with unprecedented bandwidth."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* Substrate */}
        <rect x="70" y="80" width="260" height="100" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
        {/* TSVs */}
        <g fill="#e89945" stroke="#b45309" strokeWidth="1">
          <rect x="110" y="80" width="20" height="100" />
          <rect x="160" y="80" width="20" height="100" />
          <rect x="220" y="80" width="20" height="100" />
          <rect x="270" y="80" width="20" height="100" />
        </g>

        <text x="200" y="135" fill="#e6e3dc" fontSize="14" fontWeight="bold" textAnchor="middle" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.8))">Silicon Interposer</text>

        {/* Microbumps Top */}
        <g fill="#94a3b8">
          <circle cx="120" cy="70" r="10" />
          <circle cx="170" cy="70" r="10" />
          <circle cx="230" cy="70" r="10" />
          <circle cx="280" cy="70" r="10" />
        </g>

        {/* C4 Bumps Bottom */}
        <g fill="#94a3b8">
          <circle cx="120" cy="190" r="15" />
          <circle cx="170" cy="190" r="15" />
          <circle cx="230" cy="190" r="15" />
          <circle cx="280" cy="190" r="15" />
        </g>

        {/* Labels */}
        <line x1="280" y1="130" x2="370" y2="50" stroke="#e6e3dc" strokeWidth="1" />
        <text x="375" y="45" fill="#e6e3dc" fontSize="12" textAnchor="end">Through-Silicon Vias (TSVs)</text>

        <line x1="170" y1="60" x2="170" y2="30" stroke="#e6e3dc" strokeWidth="1" />
        <text x="170" y="25" fill="#e6e3dc" fontSize="12" textAnchor="middle">Micro-Bumps</text>

        <line x1="120" y1="205" x2="120" y2="235" stroke="#e6e3dc" strokeWidth="1" />
        <text x="120" y="248" fill="#e6e3dc" fontSize="12" textAnchor="middle">C4 Bumps</text>
      </svg>
    )
  },
  top: {
    title: "High Bandwidth Memory (HBM)",
    details: [
      "Stacked DRAM dies interconnected vertically.",
      "Provides the massive data bandwidth required by AI accelerators.",
      "Connected to the Logic Die via the Silicon Interposer.",
      "Dramatically reduces latency and power consumption compared to traditional memory."
    ],
    illustration: (
      <svg viewBox="0 0 400 250" className="w-full h-auto drop-shadow-xl mt-4 mb-6 border border-[#6ce3c6]/30 bg-[#1e2330] rounded p-4">
        {/* HBM Dies Stack */}
        <g stroke="#94a3b8" strokeWidth="1">
          <path d="M 100 200 L 300 200 L 320 180 L 120 180 Z" fill="#334155" />
          <path d="M 100 200 L 100 215 L 300 215 L 300 200 Z" fill="#1e293b" />
          <path d="M 300 215 L 320 195 L 320 180 L 300 200 Z" fill="#0f172a" />
          <text x="120" y="195" fill="#cbd5e1" fontSize="10">Base Die</text>
          
          {/* TSVs going up */}
          <rect x="150" y="170" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="200" y="170" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="250" y="170" width="4" height="15" fill="#e89945" stroke="none" />

          {/* Die 1 */}
          <path d="M 100 170 L 300 170 L 320 150 L 120 150 Z" fill="#475569" />
          <path d="M 100 170 L 100 180 L 300 180 L 300 170 Z" fill="#334155" />
          <path d="M 300 180 L 320 160 L 320 150 L 300 170 Z" fill="#1e293b" />
          <text x="120" y="165" fill="#cbd5e1" fontSize="10">Core Die 1</text>

          <rect x="150" y="140" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="200" y="140" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="250" y="140" width="4" height="15" fill="#e89945" stroke="none" />

          {/* Die 2 */}
          <path d="M 100 140 L 300 140 L 320 120 L 120 120 Z" fill="#475569" />
          <path d="M 100 140 L 100 150 L 300 150 L 300 140 Z" fill="#334155" />
          <path d="M 300 150 L 320 130 L 320 120 L 300 140 Z" fill="#1e293b" />
          <text x="120" y="135" fill="#cbd5e1" fontSize="10">Core Die 2</text>
          
          <rect x="150" y="110" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="200" y="110" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="250" y="110" width="4" height="15" fill="#e89945" stroke="none" />

          {/* Die 3 */}
          <path d="M 100 110 L 300 110 L 320 90 L 120 90 Z" fill="#475569" />
          <path d="M 100 110 L 100 120 L 300 120 L 300 110 Z" fill="#334155" />
          <path d="M 300 120 L 320 100 L 320 90 L 300 110 Z" fill="#1e293b" />
          <text x="120" y="105" fill="#cbd5e1" fontSize="10">Core Die 3</text>

          <rect x="150" y="80" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="200" y="80" width="4" height="15" fill="#e89945" stroke="none" />
          <rect x="250" y="80" width="4" height="15" fill="#e89945" stroke="none" />

          {/* Die 4 (Top) */}
          <path d="M 100 80 L 300 80 L 320 60 L 120 60 Z" fill="#64748b" />
          <path d="M 100 80 L 100 90 L 300 90 L 300 80 Z" fill="#475569" />
          <path d="M 300 90 L 320 70 L 320 60 L 300 80 Z" fill="#334155" />
          <text x="120" y="75" fill="#cbd5e1" fontSize="10">Core Die 4</text>
        </g>
        
        {/* Labels */}
        <line x1="260" y1="130" x2="340" y2="40" stroke="#e6e3dc" strokeWidth="1" />
        <text x="345" y="35" fill="#e6e3dc" fontSize="12" textAnchor="start">TSVs</text>
      </svg>
    )
  }
};

const SECTIONS_FAB = [
  {
    id: 1,
    title: "Silicon Ingot & Wafer",
    subtitle: "Phase 00: Raw Material",
    content: "A pure silicon cylinder (ingot) is grown from a seed crystal and then sliced into incredibly thin, flat wafers. This forms the foundational canvas.",
    accent: "text-[#6ce3c6]"
  },
  {
    id: 2,
    title: "Silicon Substrate",
    subtitle: "Phase 01: Foundation",
    content: "The polished wafer is doped with impurities to create semiconducting properties. This forms the active region where billions of microscopic transistors will be built.",
    accent: "text-[#242437]"
  },
  {
    id: 3,
    title: "Deposition (Oxide & Metal)",
    subtitle: "Phase 02: Layering",
    content: "Thin films of insulating silicon dioxide (SiO2) and conductive metals (like Aluminum or Copper) are deposited onto the substrate to wire the transistors together.",
    accent: "text-[#188167]"
  },
  {
    id: 4,
    title: "Photolithography",
    subtitle: "Phase 03: Blueprints",
    content: "A light-sensitive liquid polymer (photoresist) is spin-coated. UV light shines through a 'mask' exposing specific areas to define intricate circuit patterns.",
    accent: "text-[#6a7885]"
  },
  {
    id: 5,
    title: "Etching & Stripping",
    subtitle: "Phase 04: Carving",
    content: "Reactive Ion Etching (RIE) precisely removes unprotected material. Finally, the remaining photoresist is completely stripped away, leaving the finished circuit.",
    accent: "text-[#20a785]"
  }
];

const SECTIONS_PKG = [
  {
    id: 1,
    title: "Advanced Packaging",
    subtitle: "Phase 01: 3D Integration",
    content: "Overcoming traditional scaling limits to enhance processing power, memory, speed, and energy efficiency through 3D integration and chiplet technologies.",
    accent: "text-[#242437]"
  },
  {
    id: 2,
    title: "Large-Format Interconnect",
    subtitle: "Phase 02: WETS & ECD",
    content: "Enabling larger AI packages across wafer and panel platforms. SABRE® 3D utilizes Electrofill™ technology for high-productivity electrochemical deposition.",
    accent: "text-[#188167]"
  },
  {
    id: 3,
    title: "High-Yield D2W Assembly",
    subtitle: "Phase 03: Deposition",
    content: "VECTOR® PECVD and Striker® ALD deliver high-bond-strength dielectrics and inter-die gapfill films. Critical for advanced memory and logic scaling.",
    accent: "text-[#6a7885]"
  },
  {
    id: 4,
    title: "Wafer Stress Management",
    subtitle: "Phase 04: Yield & Control",
    content: "Pioneering solutions for 3D wafer-on-wafer stacking. Coronus® protects the bevel edge, while Metior® provides mass metrology for precise process control.",
    accent: "text-[#20a785]"
  }
];

const CircuitPattern = ({ color, opacity }: { color: string; opacity: number }) => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <defs>
      <pattern id={`die-pattern-${color.replace('#', '')}`} width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="36" height="36" x="2" y="2" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.8" />
        <rect width="20" height="20" x="10" y="10" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
        <circle cx="20" cy="20" r="1.5" fill={color} fillOpacity="0.8" />
        <path d="M 38 20 L 40 20 M 20 38 L 20 40 M 2 20 L 0 20 M 20 2 L 20 0" stroke={color} strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#die-pattern-${color.replace('#', '')})`} />
  </svg>
);

const SceneLabel = ({ title, visible, onClick }: { title: string, visible: boolean, onClick: (e: any) => void }) => (
  <motion.div 
    className="absolute left-[105%] top-1/2 -translate-y-1/2 bg-[#242437]/90 text-[#6ce3c6] px-4 py-2.5 text-xs whitespace-nowrap border border-[#6ce3c6]/50 cursor-pointer   hover:bg-[#6ce3c6] hover:text-[#242437] transition-colors flex items-center gap-3 shadow-[0_0_20px_rgba(108,227,198,0.2)] rounded-sm z-50"
    initial={{ opacity: 0, x: -20 }}
    style={{ pointerEvents: visible ? 'auto' : 'none' }}
    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -20 }}
    onClick={onClick}
  >
    <ZoomIn size={14} className="animate-pulse" />
    <span className="font-bold tracking-wider uppercase">{title}</span>
  </motion.div>
);

export default function App() {
  const [mode, setMode] = useState<'fab' | 'pkg'>('fab');
  const [activeStep, setActiveStep] = useState(1);
  const [exploded, setExploded] = useState(false);
  const [focusedLayer, setFocusedLayer] = useState<string | null>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseRot, setMouseRot] = useState({ x: 60, y: 0, z: -45 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const SECTIONS = mode === 'fab' ? SECTIONS_FAB : SECTIONS_PKG;
  const TOOLTIPS = mode === 'fab' ? TOOLTIPS_FAB : TOOLTIPS_PKG;

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!focusedLayer) {
      const centerX = window.innerWidth * 0.7;
      const centerY = window.innerHeight / 2;
      const rotateY = ((e.clientX - centerX) / centerX) * 5; 
      const rotateX = 60 - ((e.clientY - centerY) / centerY) * 5;
      setMouseRot({ x: rotateX, y: rotateY, z: -45 });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const sections = target.querySelectorAll('[data-step]');
    let closestStep = activeStep;
    let minDistance = Infinity;
    const containerCenter = target.getBoundingClientRect().top + target.clientHeight / 2;
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(containerCenter - sectionCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestStep = parseInt(section.getAttribute('data-step') || '1');
      }
    });
    if (closestStep !== activeStep) setActiveStep(closestStep);
  };

  const scrollToStep = (step: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const section = container.querySelector(`[data-step="${step}"]`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveStep(step);
    }
  };

  const handleModeChange = (newMode: 'fab' | 'pkg') => {
    setMode(newMode);
    setActiveStep(1);
    setExploded(false);
    setFocusedLayer(null);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  // Determine current rotation and scale overrides if a layer is focused
  const currentRot = focusedLayer ? { x: 35, y: 0, z: -15 } : mouseRot;
  const currentScale = focusedLayer ? 1.4 : 1;

  return (
    <div className="flex h-screen w-full bg-[#f3f3f3] font-sans overflow-hidden selection:bg-[#6ce3c6]/30">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Noto+Sans:wght@300;400;600;700&display=swap');
        .font-lam-serif { font-family: 'Noto Serif', serif; }
        .font-lam-sans { font-family: 'Noto Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- Left Column: Narrative --- */}
      <aside className="w-[450px] shrink-0 h-full bg-[#e6e3dc] border-r border-[#ccccca] z-20 shadow-[10px_0_20px_rgba(0,0,0,0.05)] flex flex-col relative font-lam-sans">
        
        {/* Header */}
        <div className="p-12 pb-6 z-10 bg-gradient-to-b from-[#e6e3dc] via-[#e6e3dc] to-transparent">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl text-[#242437] font-lam-serif font-bold tracking-tight flex items-center gap-2">
              <div className="w-4 h-4 bg-[#6ce3c6] rounded-sm"></div>
              Lam Research
            </h1>
          </div>
          
          <div className="flex gap-2 bg-white/60 p-1.5 rounded border border-[#ccccca]">
            <button 
              onClick={() => handleModeChange('fab')}
              className={`flex-1 py-2 px-4 rounded text-[11px] font-bold uppercase tracking-widest transition-all ${mode === 'fab' ? 'bg-[#242437] text-white shadow-md' : 'text-[#6a7885] hover:bg-white'}`}
            >
              Wafer Fab
            </button>
            <button 
              onClick={() => handleModeChange('pkg')}
              className={`flex-1 py-2 px-4 rounded text-[11px] font-bold uppercase tracking-widest transition-all ${mode === 'pkg' ? 'bg-[#242437] text-white shadow-md' : 'text-[#6a7885] hover:bg-white'}`}
            >
              Packaging
            </button>
          </div>
        </div>

        {/* Scrollable Timeline */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto no-scrollbar snap-y snap-mandatory px-12 pb-32 pt-4"
        >
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#ccccca]" />
            
            <div className="flex flex-col gap-16">
              {SECTIONS.map((section) => {
                const isActive = activeStep === section.id;
                const isPast = activeStep > section.id;
                
                return (
                  <div 
                    key={section.id} 
                    data-step={section.id}
                    className="relative snap-center min-h-[40vh] flex flex-col justify-center"
                  >
                    <div 
                      className={`absolute -left-[1px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-4 transition-all duration-500 z-10 bg-[#e6e3dc] ${
                        isActive 
                          ? 'border-[#20a785] scale-125' 
                          : isPast 
                            ? 'border-[#6a7885] bg-[#6a7885]' 
                            : 'border-[#ccccca]'
                      }`} 
                    />
                    
                    {isActive && (
                      <div 
                        className={`absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#20a785] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
                      />
                    )}

                    <div className={`ml-10 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-40 -translate-x-2'}`}>
                      <span className={`text-[11px] font-bold tracking-[0.15em] uppercase mb-2 block ${isActive ? section.accent : 'text-[#6a7885]'}`}>
                        {section.subtitle}
                      </span>
                      <h3 className={`text-2xl font-lam-serif mb-4 ${isActive ? 'text-[#242437]' : 'text-[#6a7885]'}`}>
                        {section.title}
                      </h3>
                      <p className={`text-[15px] leading-relaxed font-light ${isActive ? 'text-[#242437]' : 'text-[#6a7885]'}`}>
                        {section.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Nav Controls */}
        <div className="p-8 bg-white border-t border-[#ccccca] z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <div className="flex justify-between items-center mb-5">
            <div className="text-[10px] text-[#6a7885] font-bold uppercase tracking-widest">Sys_Ref: 2.0.44</div>
            <div className="text-[10px] text-[#188167] font-bold uppercase flex items-center gap-2 tracking-widest">
              <Activity size={12} className="animate-pulse" />
              Status: Active
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => scrollToStep(Math.max(1, activeStep - 1))} 
              disabled={activeStep === 1}
              className="flex-1 py-3.5 bg-transparent border-2 border-[#242437] hover:bg-[#242437] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#242437] disabled:cursor-not-allowed text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-[#242437] cursor-pointer"
            >
              <ChevronUp size={14} /> Prev
            </button>
            <button 
              onClick={() => scrollToStep(Math.min(SECTIONS.length, activeStep + 1))} 
              disabled={activeStep === SECTIONS.length}
              className="flex-1 py-3.5 bg-[#242437] border-2 border-[#242437] hover:bg-[#188167] hover:border-[#188167] disabled:opacity-30 disabled:cursor-not-allowed text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 text-white cursor-pointer"
            >
              Next <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* --- Right Column: The 3D Scene --- */}
      <main 
        className="flex-1 relative bg-[#242437] overflow-hidden cursor-move font-lam-sans"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(108,227,198,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,209,250,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="absolute top-10 right-10 text-right z-10 pointer-events-none">
          <div className="text-[10px] text-[#e6e3dc] opacity-70 uppercase font-bold tracking-[0.2em] mb-1">Process Type</div>
          <div className="text-xl text-[#6ce3c6] font-light uppercase">{mode === 'fab' ? 'Wafer Fabrication' : 'Advanced Packaging'}</div>
          <div className="mt-4 text-[10px] text-[#e6e3dc] opacity-70 uppercase font-bold tracking-[0.2em] mb-1">Metrology Check</div>
          <div className="text-xl text-white font-light">Nominal</div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center perspective-[2000px] pointer-events-none">
          <motion.div
            className="relative w-[480px] h-[480px] pointer-events-auto"
            animate={{ 
              rotateX: currentRot.x, 
              rotateY: currentRot.y, 
              rotateZ: currentRot.z,
              scale: currentScale
            }}
            transition={{ type: "spring", stiffness: 50, damping: 25, mass: 1 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {mode === 'fab' ? (
              <FabScene activeStep={activeStep} exploded={exploded} setHoveredTooltip={setHoveredTooltip} focusedLayer={focusedLayer} setFocusedLayer={setFocusedLayer} />
            ) : (
              <PkgScene activeStep={activeStep} exploded={exploded} setHoveredTooltip={setHoveredTooltip} focusedLayer={focusedLayer} setFocusedLayer={setFocusedLayer} />
            )}
          </motion.div>
        </div>

        {/* Detailed Side Panel overlay when a layer is focused */}
        <AnimatePresence>
          {focusedLayer && LAYER_DETAILS[focusedLayer] && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[420px] bg-[#242437]/95 backdrop-blur-xl border-l border-[#6ce3c6]/30 shadow-2xl z-50 flex flex-col font-lam-sans text-white pointer-events-auto"
            >
              <div className="p-8 border-b border-[#ccccca]/20 flex justify-between items-center bg-gradient-to-r from-[#188167]/20 to-transparent">
                <h2 className="font-lam-serif text-2xl text-[#6ce3c6] leading-tight">{LAYER_DETAILS[focusedLayer].title}</h2>
                <button 
                  onClick={() => setFocusedLayer(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto">
                <div className="mb-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#e6e3dc]/50 uppercase">Layer Specifications</span>
                </div>
                {LAYER_DETAILS[focusedLayer].illustration && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {LAYER_DETAILS[focusedLayer].illustration}
                  </motion.div>
                )}
                <ul className="space-y-6">
                  {LAYER_DETAILS[focusedLayer].details.map((detail, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="mt-1 shrink-0"><Info size={16} className="text-[#20a785]" /></div>
                      <p className="text-[#e6e3dc] leading-relaxed text-sm">{detail}</p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Tooltips for Hover */}
        {!focusedLayer && hoveredTooltip && TOOLTIPS[hoveredTooltip as keyof typeof TOOLTIPS] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed z-[100] w-[320px] p-5 bg-white border border-[#ccccca] shadow-2xl rounded-sm pointer-events-none"
            style={{ left: mousePos.x + 24, top: mousePos.y + 24 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-[#188167] rounded-sm" />
              <div className="text-[10px] font-bold tracking-[0.15em] text-[#6a7885] uppercase">Material Details</div>
            </div>
            <p className="text-sm text-[#242437] leading-relaxed font-lam-sans">
              {TOOLTIPS[hoveredTooltip as keyof typeof TOOLTIPS]}
            </p>
          </motion.div>
        )}

        <div className="absolute bottom-10 right-10 flex gap-4 pointer-events-auto">
          {!focusedLayer && (
            <button
              onClick={() => setExploded(!exploded)}
              className={`flex items-center gap-3 px-6 py-4 rounded-sm transition-all duration-300 font-bold uppercase tracking-widest text-[10px] border-2 shadow-lg cursor-pointer ${
                exploded 
                  ? 'bg-[#6ce3c6] border-[#6ce3c6] text-[#242437]' 
                  : 'bg-[#242437] border-[#6a7885] text-white hover:border-[#6ce3c6]'
              }`}
            >
              {exploded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {exploded ? 'Collapse Stack' : 'Exploded View'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

// --- FABRICATION SCENE COMPONENT ---
function FabScene({ activeStep, exploded, setHoveredTooltip, focusedLayer, setFocusedLayer }: any) {
  const isExp = exploded || focusedLayer !== null;
  const getZ = (normalZ: number, explodedZ: number, id: string) => {
    const baseZ = isExp ? explodedZ : normalZ;
    if (focusedLayer === id) return baseZ + 30;
    if (focusedLayer) return baseZ - 60;
    return baseZ;
  };

  const getOpacity = (id: string, baseOpacity: number) => {
    if (baseOpacity === 0) return 0;
    if (focusedLayer === id) return 1;
    if (focusedLayer) return 0.2;
    return baseOpacity;
  };

  return (
    <>
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] bg-[#6ce3c6]/40"
        style={{ transform: 'rotateX(90deg)', transformOrigin: 'center' }}
        animate={{ height: isExp && !focusedLayer && activeStep > 1 ? 500 : 0, opacity: isExp && !focusedLayer && activeStep > 1 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Layer 0: Silicon Ingot */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}
        animate={{ opacity: getOpacity('ingot', activeStep === 1 ? 1 : 0), scale: activeStep === 1 ? 1 : 0.8, pointerEvents: (!focusedLayer || focusedLayer === 'ingot') && activeStep === 1 ? 'auto' : 'none' }}
        transition={{ duration: 0.5 }}
      >
        <SceneLabel title="Silicon Ingot" visible={!focusedLayer && (exploded || activeStep === 1)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('ingot'); }} />
        
        {/* Ingot Cylinder */}
        <div className="absolute w-[80%] h-[80%] cursor-pointer  " style={{ transformStyle: "preserve-3d" }}
             onMouseEnter={() => !focusedLayer && setHoveredTooltip('ingot')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
             onClick={(e) => { e.stopPropagation(); setFocusedLayer('ingot'); }}
        >
            {Array.from({ length: 40 }).map((_, i) => (
              <div key={i} className="absolute inset-0 rounded-full border border-[#4a5865] bg-[#3F434D] hover:border-[#6ce3c6] transition-colors" style={{ transform: `translateZ(${-i * 6 - 50}px)` }} />
            ))}
        </div>
      </motion.div>

      {/* Layer 1: Substrate */}
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'substrate') && activeStep > 1 ? 'auto' : 'none' }} 
        animate={{ z: getZ(0, 0, 'substrate'), opacity: getOpacity('substrate', activeStep > 1 ? 1 : 0) }} transition={{ type: "spring", stiffness: 45, damping: 15 }}
      >
        <SceneLabel title="Silicon Substrate" visible={!focusedLayer && (exploded || activeStep === 2)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('substrate'); }} />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute inset-0 rounded-full border border-[#4a5865] pointer-events-none" style={{ transform: `translateZ(${-i * 2}px)`, backgroundColor: i === 5 ? '#3F434D' : '#6a7885' }} />
        ))}
        {/* Silicon Top Face */}
        <div 
          className="absolute inset-0 rounded-full bg-[#e6e3dc] border-[2px] border-[#6a7885] shadow-[inset_0_0_60px_rgba(0,0,0,0.1)] cursor-pointer hover:border-[#6ce3c6] transition-colors  "
          onMouseEnter={() => !focusedLayer && setHoveredTooltip('substrate')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
          onClick={(e) => { e.stopPropagation(); setFocusedLayer('substrate'); }}
        >
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#6a7885_1px,transparent_1px),linear-gradient(to_bottom,#6a7885_1px,transparent_1px)] bg-[size:20px_20px] rounded-full pointer-events-none" />
        </div>
      </motion.div>

      {/* Layer 2: Oxide */}
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'oxide') && activeStep > 2 ? 'auto' : 'none' }} 
        animate={{ z: getZ(2, 50, 'oxide'), opacity: getOpacity('oxide', activeStep > 2 ? 1 : 0) }} transition={{ type: "spring", stiffness: 45, damping: 15 }}
      >
        <SceneLabel title="Oxide Layer (SiO2)" visible={!focusedLayer && (exploded || activeStep === 3)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('oxide'); }} />
        <div 
          className="absolute inset-0 rounded-full bg-[#00d1fa]/10 backdrop-blur-sm border-[2px] border-[#00d1fa]/40 shadow-[0_0_20px_rgba(0,209,250,0.1)]   cursor-pointer hover:bg-[#00d1fa]/20 transition-colors"
          onMouseEnter={() => !focusedLayer && setHoveredTooltip('oxide')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
          onClick={(e) => { e.stopPropagation(); setFocusedLayer('oxide'); }}
        />
      </motion.div>

      {/* Layer 3: Metal (Circuit Material) */}
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'metal') && activeStep > 2 ? 'auto' : 'none' }} 
        animate={{ z: getZ(4, 100, 'metal'), opacity: getOpacity('metal', activeStep > 2 ? 1 : 0) }} transition={{ type: "spring", stiffness: 45, damping: 15 }}
      >
         <SceneLabel title="Circuit Material (Metal)" visible={!focusedLayer && (exploded || activeStep === 3)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('metal'); }} />
         <div 
           className="absolute inset-0 rounded-full bg-gradient-to-br from-[#cbd5e1] to-[#94a3b8] border border-[#64748b]   cursor-pointer shadow-lg hover:border-[#6ce3c6] transition-colors"
           style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 30% 30%, 30% 70%, 70% 70%, 70% 30%, 30% 30%)" }}
           onMouseEnter={() => !focusedLayer && setHoveredTooltip('metal')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
           onClick={(e) => { e.stopPropagation(); setFocusedLayer('metal'); }}
         >
           <motion.div 
             className="absolute w-full h-full opacity-0 pointer-events-none"
             animate={{ opacity: activeStep >= 5 ? 1 : 0 }}
             transition={{ duration: 1 }}
           >
             <CircuitPattern color="#1e293b" opacity={0.4} />
           </motion.div>
         </div>
         {/* Etched center hole representation */}
         <motion.div 
           className="absolute left-[30%] top-[30%] w-[40%] h-[40%] bg-gradient-to-br from-[#cbd5e1] to-[#94a3b8]   cursor-pointer"
           animate={{ opacity: activeStep >= 5 ? 0 : 1 }}
           transition={{ duration: 0.5 }}
           onMouseEnter={() => !focusedLayer && setHoveredTooltip('metal')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
           onClick={(e) => { e.stopPropagation(); setFocusedLayer('metal'); }}
         />
      </motion.div>

      {/* Layer 4: Photoresist Layer */}
      <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'resist') && activeStep === 4 ? 'auto' : 'none' }}
        animate={{ 
          z: getZ(6, 150, 'resist'), 
          opacity: getOpacity('resist', activeStep === 4 ? 1 : 0)
        }} 
        transition={{ type: "spring", stiffness: 45, damping: 15 }}
      >
        <SceneLabel title="Photoresist (PR)" visible={!focusedLayer && (exploded || activeStep === 4)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('resist'); }} />
        <div className="absolute inset-0 rounded-full bg-[#e89945]/80 backdrop-blur-sm border-[2px] border-[#e89945] shadow-[0_0_30px_rgba(232,153,69,0.3)] flex items-center justify-center overflow-hidden   cursor-pointer hover:bg-[#e89945]/90 transition-colors"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 30% 30%, 30% 70%, 70% 70%, 70% 30%, 30% 30%)" }}
          onMouseEnter={() => !focusedLayer && setHoveredTooltip('resist')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
          onClick={(e) => { e.stopPropagation(); setFocusedLayer('resist'); }}
        />
      </motion.div>

      {/* Photomask & UV Light (Step 4) */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}
         animate={{ opacity: activeStep === 4 && !focusedLayer ? 1 : 0, z: getZ(200, 220, 'mask') }}
         transition={{ type: "spring", stiffness: 45, damping: 15 }}
      >
          <SceneLabel title="Photomask & UV Light" visible={!focusedLayer && (exploded || activeStep === 4)} onClick={() => {}} />
          
          {/* Mask Plate */}
          <div className="absolute inset-[-10%] rounded-xl bg-[#0f172a] opacity-95 border-[2px] border-[#334155]"
               style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 30% 30%, 30% 70%, 70% 70%, 70% 30%, 30% 30%)" }} 
          />
          
          {/* UV Light Beam */}
          <motion.div 
            className="absolute left-[30%] top-[30%] w-[40%] h-[40%] bg-[#d8b4fe] blur-[15px] shadow-[0_0_40px_#a855f7]"
            style={{ transform: "translateZ(-80px)" }}
            animate={{ opacity: activeStep === 4 && !focusedLayer ? [0.2, 0.9, 0.2] : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
      </motion.div>

      {/* Plasma Etch Beam (Only on step 5) */}
      <motion.div className="absolute left-[30%] top-[30%] w-[40%] h-[40%] pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
          <motion.div
            className="w-full h-full bg-[#6ce3c6] blur-md rounded-sm"
            initial={{ opacity: 0, z: 500 }}
            animate={{
              opacity: activeStep === 5 && !focusedLayer ? [0, 0.8, 0.8, 0] : 0,
              z: activeStep === 5 && !focusedLayer ? [400, 0, 0, 400] : 400
            }}
            transition={{
              duration: 2.5,
              repeat: activeStep === 5 ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
      </motion.div>
    </>
  );
}

// --- PACKAGING SCENE COMPONENT ---
function PkgScene({ activeStep, exploded, setHoveredTooltip, focusedLayer, setFocusedLayer }: any) {
  const isExp = exploded || focusedLayer !== null;
  const getZ = (normalZ: number, explodedZ: number, id: string) => {
    const baseZ = isExp ? explodedZ : normalZ;
    if (focusedLayer === id) return baseZ + 30;
    if (focusedLayer) return baseZ - 60;
    return baseZ;
  };

  const getOpacity = (id: string, baseOpacity: number) => {
    if (baseOpacity === 0) return 0;
    if (focusedLayer === id) return 1;
    if (focusedLayer) return 0.2;
    return baseOpacity;
  };

  const isCompressed = activeStep === 4 && !exploded;
  const zBaseN = isCompressed ? -10 : 0;
  const zMidN = isCompressed ? 0 : (activeStep >= 2 ? 15 : 150);
  const zTopN = isCompressed ? 10 : (activeStep >= 3 ? 30 : 300);

  return (
    <>
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] bg-[#6ce3c6]/40"
        style={{ transform: 'rotateX(90deg)', transformOrigin: 'center' }}
        animate={{ height: exploded && !focusedLayer ? 500 : 0, opacity: exploded && !focusedLayer ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Layer 1: Base Logic Die */}
      <motion.div className="absolute inset-[10%]" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'base') ? 'auto' : 'none' }}
        animate={{ z: getZ(zBaseN, -60, 'base'), opacity: getOpacity('base', 1) }} transition={{ type: "spring", stiffness: 40, damping: 15 }}
      >
        <SceneLabel title="Logic Die" visible={!focusedLayer && (exploded || activeStep === 1)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('base'); }} />
        <div className="absolute inset-0 rounded-xl bg-[#242437] border-2 border-[#6a7885] shadow-2xl flex items-center justify-center cursor-pointer   overflow-hidden hover:border-[#6ce3c6] transition-colors"
          onMouseEnter={() => !focusedLayer && setHoveredTooltip('base')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
          onClick={(e) => { e.stopPropagation(); setFocusedLayer('base'); }}
        >
          <CircuitPattern color="#6ce3c6" opacity={0.15} />
          <Cpu className="text-[#6ce3c6] opacity-30 w-32 h-32 pointer-events-none" />
        </div>
      </motion.div>

      {/* Layer 2: Middle Interposer / TSV Layer */}
      <motion.div className="absolute inset-[15%]" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'interposer') ? 'auto' : 'none' }}
        animate={{ z: getZ(zMidN, 60, 'interposer'), opacity: getOpacity('interposer', activeStep >= 2 ? 1 : 0) }} transition={{ type: "spring", stiffness: 45, damping: 15 }}
      >
        <SceneLabel title="Silicon Interposer & TSVs" visible={!focusedLayer && (exploded || activeStep === 2)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('interposer'); }} />
        <div className="absolute inset-0 rounded-xl bg-[#e6e3dc]/90 backdrop-blur-md border-2 border-[#ccccca] shadow-2xl flex flex-col p-4 cursor-pointer   hover:border-[#20a785] transition-colors overflow-hidden"
          onMouseEnter={() => !focusedLayer && setHoveredTooltip('interposer')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
          onClick={(e) => { e.stopPropagation(); setFocusedLayer('interposer'); }}
        >
           <div className="text-[10px] text-[#242437] font-bold mb-2 tracking-widest text-center pointer-events-none">SILICON INTERPOSER</div>
           <div className="flex-1 grid grid-cols-5 grid-rows-5 gap-2 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-full h-full rounded-full bg-[#242437] flex items-center justify-center overflow-hidden border border-[#6a7885]"
              >
                {/* Copper Fill */}
                <motion.div 
                  className="w-full h-full bg-[#e89945]"
                  initial={{ scale: 0 }}
                  animate={{ scale: activeStep >= 2 ? 1 : 0 }}
                  transition={{ type: "spring", delay: i * 0.02 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Layer 3: Top Memory Stack */}
      <motion.div className="absolute inset-[20%]" style={{ transformStyle: "preserve-3d", pointerEvents: (!focusedLayer || focusedLayer === 'top') ? 'auto' : 'none' }}
        animate={{ z: getZ(zTopN, 180, 'top'), opacity: getOpacity('top', activeStep >= 3 ? 1 : 0) }} transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <SceneLabel title="HBM Stack" visible={!focusedLayer && (exploded || activeStep >= 3)} onClick={(e: any) => { e.stopPropagation(); setFocusedLayer('top'); }} />
        <div className="absolute inset-0 rounded-xl bg-[#242437] border-2 border-[#6a7885] shadow-2xl flex flex-col items-center justify-center cursor-pointer   overflow-hidden hover:border-[#6ce3c6] transition-colors"
          onMouseEnter={() => !focusedLayer && setHoveredTooltip('top')} onMouseLeave={() => !focusedLayer && setHoveredTooltip(null)}
          onClick={(e) => { e.stopPropagation(); setFocusedLayer('top'); }}
        >
          <CircuitPattern color="#e89945" opacity={0.15} />
          <Layers className="text-[#e89945] opacity-50 w-16 h-16 mb-2 pointer-events-none" />
          <div className="text-[10px] text-[#e89945] font-bold tracking-widest text-center pointer-events-none">HBM STACK</div>
        </div>
      </motion.div>

      {/* 4. Bevel Edge / Stress Management (Step 4 Glow) */}
      {activeStep >= 4 && !focusedLayer && (
        <motion.div className="absolute inset-[8%]" style={{ transformStyle: "preserve-3d", pointerEvents: 'none' }}
          animate={{ z: zBaseN }}
        >
          <motion.div className="absolute inset-0 rounded-xl border-4 border-[#00d1fa]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0], boxShadow: ["inset 0 0 0px #00d1fa, 0 0 0px #00d1fa", "inset 0 0 40px #00d1fa, 0 0 40px #00d1fa", "inset 0 0 0px #00d1fa, 0 0 0px #00d1fa"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </>
  );
}
