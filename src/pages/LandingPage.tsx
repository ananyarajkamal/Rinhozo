import React, { useState } from 'react';
import { RinAvatar } from '../components/RinAvatar';
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
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Normalized coordinates (-0.5 to 0.5) from the center
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;
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
    transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg) translateZ(10px)`,
    transition: 'transform 0.2s ease-out'
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col font-sans overflow-x-hidden perspective-3d"
    >
      
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <RinAvatar mood="happy" size={40} interactive={false} glowIntensity={0.2} />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#1e293b]">RINHOZO</span>
        </div>

        {/* Floating Menu Pills (Claymorphic) */}
        <nav className="hidden md:flex items-center bg-[#faf6f0] border border-[#e5dec9]/60 rounded-full px-2 py-1.5 shadow-[inset_1px_1px_3px_#ffffff,inset_-1px_-1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(30,41,59,0.03)]">
          <a href="#home" className="px-5 py-2 text-sm font-bold rounded-full bg-white shadow-sm text-[#1e293b] border border-[#e5dec9]/40 transition-all">
            {strings.navHome}
          </a>
          <a href="#features" className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navFeatures}
          </a>
          <a href="#how" className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navHowItWorks}
          </a>
          <a href="#educators" className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navForEducators}
          </a>
          <a href="#about" className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navAbout}
          </a>
        </nav>

        {/* CTA Button */}
        <button 
          onClick={onGetStarted}
          className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all group clay-button"
        >
          {strings.navGetStarted}
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* HERO LEFT COLUMN */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-bold text-[#1e293b] tracking-tight mb-6">
            {strings.landingTitle.split("listens")[0]}listens
            <br />
            <span className="font-handwritten text-[#d4a574] text-5xl md:text-6xl lg:text-[72px] font-bold inline-block mt-2 relative">
              to you
            </span>
          </h1>

          {/* Headline description */}
          <p className="text-[#78716c] text-lg max-w-md mb-8 leading-relaxed">
            Rinhozo is a companion that understands your pace, supports your journey, and <span className="font-bold text-[#1e293b]">grows alongside you</span>.
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button 
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group clay-button"
            >
              {strings.landingCtaStart}
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="flex items-center justify-center gap-3 bg-white hover:bg-[#f0ebe3] text-[#1e293b] border border-[#e5dec9] px-7 py-4 rounded-full text-base font-bold shadow-sm transition-all clay-button">
              <span className="w-6 h-6 rounded-full bg-[#1e293b]/5 flex items-center justify-center text-[#1e293b]">
                <Play size={12} fill="currentColor" className="ml-0.5" />
              </span>
              {strings.landingCtaHow}
            </button>
          </div>

          {/* Features highlight bottom block (Claymorphic) */}
          <div className="bg-white border border-[#e5dec9]/60 rounded-3xl p-5 shadow-md max-w-md flex flex-wrap gap-4 items-center justify-between clay-card">
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
            
            {/* MAIN GLOWING RIN AVATAR */}
            <div className="animate-float">
              <RinAvatar mood="happy" size={310} interactive={true} glowIntensity={0.8} />
            </div>

            {/* FLOATING CLAYMORPHIC BADGES */}
            {/* Idea lightbulb */}
            <div 
              style={tiltBadgeFar(1.1)}
              className="absolute top-2 left-16 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:1.5s]"
            >
              <Lightbulb size={20} className="text-[#d4a574]" fill="currentColor" fillOpacity={0.1} />
            </div>

            {/* Open Book */}
            <div 
              style={tiltBadgeFar(0.9)}
              className="absolute top-28 left-6 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:0.5s]"
            >
              <BookOpen size={20} className="text-[#d4a574]" />
            </div>

            {/* Chart */}
            <div 
              style={tiltBadgeFar(1.2)}
              className="absolute top-4 right-16 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:2.2s]"
            >
              <BarChart3 size={20} className="text-[#7dd3fc]" />
            </div>

            {/* Puzzle Piece */}
            <div 
              style={tiltBadgeFar(1.0)}
              className="absolute top-24 right-6 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:1.1s]"
            >
              <Puzzle size={20} className="text-[#78716c]" />
            </div>
          </div>

          {/* TABLE TOP SURFACE WITH PROPS */}
          <div 
            style={tiltTableProps}
            className="w-full border-t border-[#e5dec9] mt-2 pt-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6"
          >
            
            {/* 3D Stacked books (Curiosity, Focus, Growth) */}
            <div className="flex flex-col -space-y-2.5 transform scale-90 sm:scale-100 origin-bottom-left text-left">
              {/* Growth Book */}
              <div className="w-44 h-8 bg-[#d4a574]/90 text-[#faf6f0] border border-[#d4a574] rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-md transform -rotate-1 book-spine-3d">
                <span>Growth</span>
                <span className="opacity-40">III</span>
              </div>
              {/* Focus Book */}
              <div className="w-44 h-8 bg-white text-[#1e293b] border border-[#e5dec9] rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-md transform rotate-1 book-spine-3d">
                <span>Focus</span>
                <span className="opacity-20">II</span>
              </div>
              {/* Curiosity Book */}
              <div className="w-44 h-8 bg-[#1e293b] text-white border border-black rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-lg transform -rotate-2 book-spine-3d">
                <span>Curiosity</span>
                <span className="opacity-30">I</span>
              </div>
            </div>

            {/* 3D Folded Notebook and Pen */}
            <div className="relative bg-white border border-[#e5dec9]/60 rounded-2xl p-5 w-60 shadow-lg text-left transform rotate-1 clay-card">
              {/* Spine shadow for folded book look */}
              <div className="absolute left-28 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/5 via-black/10 to-transparent"></div>
              {/* Lined notebook decoration */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-red-200"></div>
              <div className="space-y-3 font-handwritten text-[#d4a574] text-lg pl-6">
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">You are doing</p>
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">better than</p>
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">you think.</p>
                <p className="leading-none flex items-center gap-1">Keep going.</p>
              </div>
              {/* 3D Cylinder Pen */}
              <div className="absolute right-6 bottom-4 w-28 h-2.5 bg-yellow-600 border border-yellow-700/30 rounded-full transform -rotate-[22deg] origin-bottom-right shadow-md">
                <div className="absolute right-0 top-0 w-3 h-2.5 bg-[#d4a574] rounded-r-full shadow-inner"></div>
              </div>
            </div>

            {/* Coffee Cup and Saucer (Shaded Cylinder) */}
            <div className="flex flex-col items-center mr-0 sm:mr-4 transform hover:scale-105 transition-all">
              {/* Cup */}
              <div className="relative w-16 h-12 bg-gradient-to-b from-[#fdfbf7] to-[#f5e6d3] border border-[#e5dec9] rounded-b-2xl shadow-md flex items-center justify-center">
                {/* Handle */}
                <div className="absolute -right-3.5 top-2.5 w-4 h-6 border-[3px] border-[#e5dec9] border-l-0 rounded-r-full shadow-sm"></div>
              </div>
              {/* Saucer */}
              <div className="w-20 h-2 bg-gradient-to-b from-[#ffffff] to-[#f0ebe3] border border-[#e5dec9] rounded-full shadow-md -mt-0.5"></div>
            </div>

          </div>

          {/* FLOATING RIN BUBBLE (Claymorphic) */}
          <div className="absolute bottom-[-16px] md:bottom-[-24px] right-2 md:right-4 bg-white border border-[#e5dec9]/60 rounded-2xl p-4 shadow-xl flex items-start gap-3.5 max-w-[320px] text-left transform hover:scale-[1.02] transition-transform duration-300 clay-card z-20">
            {/* Small glowing Rin circle */}
            <div className="w-9 h-9 rounded-full bg-[#fde68a]/30 flex items-center justify-center flex-shrink-0 animate-glow-gold border border-white/50">
              <RinAvatar mood="happy" size={28} interactive={false} glowIntensity={0.3} />
            </div>
            
            {/* Speech copy */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1e293b] flex items-center gap-1">
                Hi, I am Rinhozo.
              </span>
              <p className="text-[11px] font-semibold text-[#78716c] leading-relaxed mt-1">
                I am here to guide, encourage, and learn with you, every step of the way.
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
