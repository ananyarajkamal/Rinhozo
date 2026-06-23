import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import type { UIStrings } from '../locales/strings';

interface LandingPageProps {
  strings: UIStrings;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ strings, onGetStarted }) => {
  return (
    <div 
      className="min-h-screen w-screen relative select-none overflow-x-hidden flex flex-col justify-between"
      style={{
        backgroundImage: "url('/assets/hero_page.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* SEAMLESS GRADIENT OVERLAY TO MASK BACKGROUND TEXT */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-[50%] z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #ebdcc3 0%, #ebdcc3 60%, #ebd9c0 80%, rgba(235, 216, 190, 0) 100%)',
          mixBlendMode: 'normal'
        }}
      />

      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-8 py-5 flex items-center justify-between z-20 relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-[#fde68a]/20 border border-white/50 flex items-center justify-center">
            <img src="/assets/rin_mascot_3d.png" alt={strings.landingTitle || "Rin Logo"} className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#1e293b]">RINHOZO</span>
        </div>

        {/* Floating Menu Pills */}
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 relative">
        
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

        {/* HERO RIGHT COLUMN (Empty container letting the exact background image graphics show through) */}
        <div className="lg:col-span-7 h-full pointer-events-none" />

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#f5e6d3]/30 border-t border-[#e5dec9]/40 py-6 text-center text-xs font-bold text-[#78716c] tracking-wider uppercase z-20 relative">
        © {new Date().getFullYear()} Rinhozo. Made with care for every student.
      </footer>
    </div>
  );
};

export default LandingPage;
