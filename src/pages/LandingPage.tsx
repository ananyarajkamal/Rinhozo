import React, { useState } from 'react';
import { ArrowRight, Play, Lightbulb, BookOpen, BarChart3, Puzzle } from 'lucide-react';
import type { UIStrings } from '../locales/strings';

interface LandingPageProps {
  strings: UIStrings;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ strings, onGetStarted }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) - 0.5;
    const y = ((clientY - rect.top) / rect.height) - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 3D rotation styles based on mouse position
  const tiltRin = {
    transform: `rotateY(${mousePos.x * 24}deg) rotateX(${-mousePos.y * 24}deg) translateZ(40px)`,
    transition: 'transform 0.15s ease-out'
  };

  const tiltBadgeFar = (offsetMultiplier: number) => ({
    transform: `rotateY(${mousePos.x * 35 * offsetMultiplier}deg) rotateX(${-mousePos.y * 35 * offsetMultiplier}deg) translateZ(80px)`,
    transition: 'transform 0.15s ease-out'
  });

  const tiltTableProps = {
    transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) translateZ(15px)`,
    transition: 'transform 0.2s ease-out'
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen text-[#1e293b] flex flex-col relative font-sans select-none overflow-x-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(250, 246, 240, 0.15), rgba(250, 246, 240, 0.15)), url('/assets/cozy_desk_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-8 py-5 flex items-center justify-between z-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-[#fde68a]/20 border border-white/50 flex items-center justify-center">
            <img src="/assets/rin_mascot_3d.png" alt={strings.landingTitle || "Rin Logo"} className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#1e293b]">RINHOZO</span>
        </div>

        {/* Floating Menu Pills (Claymorphic) */}
        <nav className="hidden md:flex items-center bg-white/95 border border-[#e5dec9] rounded-full p-1.5 shadow-[0_8px_24px_rgba(30,41,59,0.06)] gap-2">
          <a href="#home" className="px-5 py-2 text-xs font-bold rounded-full bg-[#faf6f0] shadow-sm text-[#1e293b] border border-[#e5dec9] transition-all">
            Home
          </a>
          <a href="#features" className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] rounded-full transition-all">
            Features
          </a>
          <a href="#how" className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] rounded-full transition-all">
            How it works
          </a>
          <a href="#educators" className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] rounded-full transition-all">
            For Educators
          </a>
          <a href="#about" className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] rounded-full transition-all">
            About
          </a>
        </nav>

        {/* CTA Button */}
        <button 
          onClick={onGetStarted}
          className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all group clay-button cursor-pointer"
        >
          Get Started
          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* HERO LEFT COLUMN */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-[#1e293b] leading-[1.1] tracking-tight mb-6">
            Learning <br />
            that listens <br />
            <span className="font-handwritten text-[#d4a574] text-6xl md:text-7xl lg:text-[84px] font-bold inline-block relative mt-2">
              to you
              <svg className="absolute right-[-45px] top-1/2 -translate-y-1/2 w-8 h-8 text-[#d4a574] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </h1>

          {/* Headline description */}
          <p className="text-[#78716c] text-sm max-w-md mb-8 leading-relaxed">
            Rinhozo is a companion that understands your pace, supports your journey, and <span className="font-bold text-[#1e293b]">grows alongside you</span>.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button 
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group clay-button cursor-pointer"
            >
              Start Your Journey
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="flex items-center justify-center gap-3 bg-white hover:bg-[#f0ebe3] text-[#1e293b] border border-[#e5dec9] px-7 py-4 rounded-full text-base font-bold shadow-sm transition-all clay-button cursor-pointer">
              <span className="w-6 h-6 rounded-full bg-[#1e293b]/5 flex items-center justify-center text-[#1e293b]">
                <Play size={12} fill="currentColor" className="ml-0.5" />
              </span>
              See How It Works
            </button>
          </div>

          {/* Features highlight bottom block (Claymorphic) */}
          <div className="bg-white/95 border border-[#e5dec9] rounded-3xl p-5 shadow-[0_8px_24px_rgba(30,41,59,0.04)] max-w-md flex flex-wrap gap-4 items-center justify-between clay-card">
            {/* Learn at your pace */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <div className="w-10 h-10 rounded-2xl bg-[#7dd3fc]/15 flex items-center justify-center text-[#38bdf8] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0M3 15c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#78716c] uppercase tracking-wider leading-none">Pace</span>
                <span className="text-[13px] font-bold text-[#1e293b] leading-tight mt-0.5">Learn at your pace</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-[#e5dec9]/60"></div>

            {/* Supported by Rin */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <div className="w-10 h-10 rounded-2xl bg-[#d4a574]/15 flex items-center justify-center text-[#d4a574] shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4a6 6 0 00-6 6v2c0 .5-.2 1-.5 1.5L5 15h14l-.5-1.5c-.3-.5-.5-1-.5-1.5v-2a6 6 0 00-6-6zM9 15v4a3 3 0 006 0v-4" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#78716c] uppercase tracking-wider leading-none">Companion</span>
                <span className="text-[13px] font-bold text-[#1e293b] leading-tight mt-0.5">Supported by Rin</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-[#e5dec9]/60"></div>

            {/* Small steps */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-[inset_1px_1px_3px_rgba(255,255,255,0.8)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-[#78716c] uppercase tracking-wider leading-none">Growth</span>
                <span className="text-[13px] font-bold text-[#1e293b] leading-tight mt-0.5">Small steps, big growth</span>
              </div>
            </div>
          </div>

        </div>

        {/* HERO RIGHT COLUMN (Perspective 3D scene) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[480px] lg:min-h-[580px] perspective-3d">
          
          {/* FLOATING SCENE CONTAINER */}
          <div 
            style={tiltRin}
            className="relative w-full max-w-[500px] h-[340px] flex items-center justify-center z-10"
          >
            
            {/* MAIN GLOWING RIN AVATAR (3D PNG) */}
            <div className="animate-float">
              <img 
                src="/assets/rin_mascot_3d.png" 
                alt="3D Rin Mascot" 
                className="w-[280px] h-[280px] object-contain transition-transform"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(212, 165, 116, 0.55))'
                }}
              />
            </div>

            {/* FLOATING CLAYMORPHIC BADGES */}
            {/* Idea lightbulb */}
            <div 
              style={tiltBadgeFar(1.15)}
              className="absolute top-4 left-14 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:1.5s]"
            >
              <Lightbulb size={18} className="text-[#d4a574]" fill="currentColor" fillOpacity={0.1} />
            </div>

            {/* Open Book */}
            <div 
              style={tiltBadgeFar(0.95)}
              className="absolute bottom-20 left-4 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:0.5s]"
            >
              <BookOpen size={18} className="text-[#d4a574]" />
            </div>

            {/* Chart */}
            <div 
              style={tiltBadgeFar(1.2)}
              className="absolute top-6 right-14 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:2.2s]"
            >
              <BarChart3 size={18} className="text-[#7dd3fc]" />
            </div>

            {/* Puzzle Piece */}
            <div 
              style={tiltBadgeFar(1.05)}
              className="absolute bottom-22 right-4 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:1.1s]"
            >
              <Puzzle size={18} className="text-[#78716c]" />
            </div>
          </div>

          {/* TABLE TOP INTERACTIVE PROPS */}
          <div 
            style={tiltTableProps}
            className="w-full mt-2 pt-6 flex justify-between items-end relative min-h-[140px] z-10 px-4"
          >
            {/* 3D Stacked books */}
            <div className="w-[25%] flex flex-col items-center">
              <img 
                src="/assets/stacked_books_3d.png" 
                alt="Stacked books Growth Focus Curiosity" 
                className="w-[130px] h-auto object-contain"
              />
            </div>

            {/* 3D Folded Notebook and Pen */}
            <div className="w-[42%] flex flex-col items-center">
              <img 
                src="/assets/notebook_3d.png" 
                alt="Lined notebook and pencil" 
                className="w-[200px] h-auto object-contain"
              />
            </div>

            {/* Coffee Cup and Saucer */}
            <div className="w-[20%] flex flex-col items-center">
              <img 
                src="/assets/coffee_cup_3d.png" 
                alt="Coffee cup and saucer" 
                className="w-[90px] h-auto object-contain"
              />
            </div>
          </div>

          {/* FLOATING RIN BUBBLE */}
          <div className="absolute bottom-[-24px] right-4 bg-white border border-[#e5dec9] rounded-2xl p-4 shadow-[0_8px_24px_rgba(30,41,59,0.08)] flex items-start gap-3 max-w-[320px] text-left transform hover:scale-[1.02] transition-transform duration-300 clay-card z-20">
            <div className="w-8 h-8 rounded-full bg-[#fde68a]/30 flex items-center justify-center flex-shrink-0 animate-glow-gold border border-white/50 overflow-hidden">
              <img src="/assets/rin_mascot_3d.png" alt="Mini Rin" className="w-6 h-6 object-contain" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1e293b] flex items-center gap-1">
                Hi! I am Rinhozo.
              </span>
              <p className="text-[11px] font-semibold text-[#78716c] leading-relaxed mt-1">
                I am here to guide, encourage, and learn with you: every step of the way.
              </p>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#f5e6d3]/30 border-t border-[#e5dec9]/40 py-6 mt-12 text-center text-xs font-bold text-[#78716c] tracking-wider uppercase z-20">
        © {new Date().getFullYear()} Rinhozo. Made with care for every student.
      </footer>
    </div>
  );
};

export default LandingPage;
