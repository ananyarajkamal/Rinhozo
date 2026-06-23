import React from 'react';
import { RinAvatar } from '../components/RinAvatar';
import { ArrowRight, Play, Lightbulb, BookOpen, BarChart3, Puzzle } from 'lucide-react';
import type { UIStrings } from '../locales/strings';

interface LandingPageProps {
  strings: UIStrings;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ strings, onGetStarted }) => {
  return (
    <div className="relative min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col font-sans overflow-x-hidden">
      
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <RinAvatar mood="happy" size={40} interactive={false} glowIntensity={0.2} />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#1e293b]">RINHOZO</span>
        </div>

        {/* Floating Menu Pills */}
        <nav className="hidden md:flex items-center bg-[#f0ebe3]/80 backdrop-blur-sm border border-[#e5dec9]/30 rounded-full px-2 py-1.5 shadow-[0_2px_12px_rgba(30,41,59,0.02)]">
          <a href="#home" className="px-5 py-2 text-sm font-semibold rounded-full bg-[#faf6f0] shadow-sm text-[#1e293b] transition-all">
            {strings.navHome}
          </a>
          <a href="#features" className="px-5 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navFeatures}
          </a>
          <a href="#how" className="px-5 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navHowItWorks}
          </a>
          <a href="#educators" className="px-5 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navForEducators}
          </a>
          <a href="#about" className="px-5 py-2 text-sm font-semibold text-[#78716c] hover:text-[#1e293b] transition-all">
            {strings.navAbout}
          </a>
        </nav>

        {/* CTA Button */}
        <button 
          onClick={onGetStarted}
          className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white px-6 py-3 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all group"
        >
          {strings.navGetStarted}
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* HERO LEFT COLUMN */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left z-10">
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-bold text-[#1e293b] tracking-tight mb-6">
            {strings.landingTitle.split("listens")[0]}listens
            <br />
            <span className="font-handwritten text-[#d4a574] text-5xl md:text-6xl lg:text-[72px] font-bold inline-block mt-2 relative">
              to you
              {/* Cursive heart next to "to you" */}
              <svg className="absolute -right-14 bottom-2 w-10 h-10 fill-none stroke-[#d4a574] stroke-2" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
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
              className="flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#0f172a] text-white px-8 py-4 rounded-full text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group"
            >
              {strings.landingCtaStart}
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="flex items-center justify-center gap-3 bg-white hover:bg-[#f0ebe3] text-[#1e293b] border border-[#e5dec9] px-7 py-4 rounded-full text-base font-bold shadow-sm transition-all">
              <span className="w-6 h-6 rounded-full bg-[#1e293b]/5 flex items-center justify-center text-[#1e293b]">
                <Play size={12} fill="currentColor" className="ml-0.5" />
              </span>
              {strings.landingCtaHow}
            </button>
          </div>

          {/* Features highlight bottom block */}
          <div className="bg-[#faf6f0] border border-[#e5dec9]/60 rounded-3xl p-5 shadow-sm max-w-md flex flex-wrap gap-4 items-center justify-between">
            {/* Learn at your pace */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <div className="w-10 h-10 rounded-2xl bg-[#7dd3fc]/15 flex items-center justify-center text-[#38bdf8]">
                {/* Wave SVG */}
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
            <div className="hidden sm:block w-px h-8 bg-[#e5dec9]"></div>

            {/* Supported by Rin */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <div className="w-10 h-10 rounded-2xl bg-[#d4a574]/15 flex items-center justify-center text-[#d4a574]">
                {/* Jellyfish outline SVG */}
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
            <div className="hidden sm:block w-px h-8 bg-[#e5dec9]"></div>

            {/* Small steps */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                {/* Sprout SVG */}
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

        {/* HERO RIGHT COLUMN (Cute Jellyfish Scene) */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[480px] lg:min-h-[580px]">
          
          {/* FLOATING SCENE CONTAINER */}
          <div className="relative w-full max-w-[500px] h-[340px] flex items-center justify-center z-10">
            
            {/* MAIN GLOWING RIN AVATAR */}
            <div className="animate-float relative">
              <RinAvatar mood="happy" size={310} interactive={true} glowIntensity={0.8} />
            </div>

            {/* FLOATING BADGES (Floating icons around Rin) */}
            {/* Idea lightbulb */}
            <div className="absolute top-2 left-16 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-md animate-float [animation-delay:1.5s]">
              <Lightbulb size={20} className="text-[#d4a574]" fill="currentColor" fillOpacity={0.1} />
            </div>

            {/* Open Book */}
            <div className="absolute top-28 left-6 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-md animate-float [animation-delay:0.5s]">
              <BookOpen size={20} className="text-[#d4a574]" />
            </div>

            {/* Chart */}
            <div className="absolute top-4 right-16 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-md animate-float [animation-delay:2.2s]">
              <BarChart3 size={20} className="text-[#7dd3fc]" />
            </div>

            {/* Puzzle Piece */}
            <div className="absolute top-24 right-6 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-md animate-float [animation-delay:1.1s]">
              <Puzzle size={20} className="text-[#78716c]" />
            </div>
          </div>

          {/* TABLE TOP SURFACE WITH PROPS */}
          <div className="w-full border-t border-[#e5dec9] mt-2 pt-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
            
            {/* Stacked books (Curiosity, Focus, Growth) */}
            <div className="flex flex-col -space-y-2.5 transform scale-90 sm:scale-100 origin-bottom-left text-left">
              {/* Growth Book */}
              <div className="w-44 h-8 bg-[#d4a574]/80 text-[#faf6f0] border border-[#d4a574] rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-sm transform -rotate-1">
                <span>Growth</span>
                <span className="opacity-40">III</span>
              </div>
              {/* Focus Book */}
              <div className="w-44 h-8 bg-[#faf6f0] text-[#1e293b] border border-[#e5dec9] rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-sm transform rotate-1">
                <span>Focus</span>
                <span className="opacity-20">II</span>
              </div>
              {/* Curiosity Book */}
              <div className="w-44 h-8 bg-[#1e293b] text-white border border-black rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-md transform -rotate-2">
                <span>Curiosity</span>
                <span className="opacity-30">I</span>
              </div>
            </div>

            {/* Handwritten Notebook and Pen */}
            <div className="relative bg-white border border-[#e5dec9] rounded-xl p-5 w-60 shadow-[0_6px_18px_rgba(30,41,59,0.04)] text-left transform rotate-1">
              {/* Blue lined notebook simulation */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-red-200"></div>
              <div className="space-y-3 font-handwritten text-[#d4a574] text-lg pl-6">
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">You're doing</p>
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">better than</p>
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">you think.</p>
                <p className="leading-none flex items-center gap-1">Keep going. 💛</p>
              </div>
              {/* Gold Pen */}
              <div className="absolute right-6 bottom-4 w-28 h-2 bg-yellow-600/70 border border-yellow-700/30 rounded-full transform -rotate-[22deg] origin-bottom-right shadow-sm">
                <div className="absolute right-0 top-0 w-3 h-2 bg-[#d4a574] rounded-r-full"></div>
              </div>
            </div>

            {/* Coffee Cup and Saucer */}
            <div className="flex flex-col items-center mr-0 sm:mr-4">
              {/* Cup */}
              <div className="relative w-16 h-12 bg-[#f5e6d3] border border-[#e5dec9] rounded-b-2xl shadow-sm flex items-center justify-center">
                {/* Heart outline inside/on cup */}
                <svg className="w-4 h-4 fill-none stroke-[#d4a574] stroke-2 opacity-50" viewBox="0 0 24 24">
                  <path d="M12 21l-1-1C5 14 2 11 2 7c0-3 2-5 5-5 2 0 4 1 5 3 1-2 3-3 5-3 3 0 5 2 5 5 0 4-3 7-9 13l-1 1z" />
                </svg>
                {/* Handle */}
                <div className="absolute -right-3 top-3 w-4 h-6 border-2 border-[#e5dec9] border-l-0 rounded-r-full"></div>
              </div>
              {/* Saucer */}
              <div className="w-20 h-2 bg-[#faf6f0] border border-[#e5dec9] rounded-full shadow-sm -mt-0.5"></div>
            </div>

          </div>

          {/* FLOATING RIN BUBBLE (Bottom Right chat box) */}
          <div className="absolute bottom-[-16px] md:bottom-[-24px] right-2 md:right-4 bg-white border border-[#e5dec9] rounded-2xl p-4 shadow-lg flex items-start gap-3.5 max-w-[320px] text-left transform hover:scale-[1.02] transition-transform duration-300">
            {/* Small glowing Rin circle */}
            <div className="w-9 h-9 rounded-full bg-[#fde68a]/30 flex items-center justify-center flex-shrink-0 animate-glow-gold">
              <RinAvatar mood="happy" size={28} interactive={false} glowIntensity={0.3} />
            </div>
            
            {/* Speech copy */}
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1e293b] flex items-center gap-1">
                Hi! I'm Rinhozo <span className="animate-bounce">👋</span>
              </span>
              <p className="text-[11px] font-semibold text-[#78716c] leading-relaxed mt-1">
                I'm here to guide, encourage, and learn with you — every step of the way.
              </p>
            </div>
            {/* Mini heart decoration in the corner */}
            <div className="absolute bottom-2 right-2.5 text-[#d4a574] opacity-40">
              <svg className="w-3 h-3 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#f5e6d3]/30 border-t border-[#e5dec9]/40 py-6 mt-12 text-center text-xs font-bold text-[#78716c] tracking-wider uppercase">
        © {new Date().getFullYear()} Rinhozo. Made with 💛 for every student.
      </footer>
    </div>
  );
};
