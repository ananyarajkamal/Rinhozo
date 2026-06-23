import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Menu, X, Globe, WifiOff, Sparkles, Puzzle, BarChart3, BookOpen, Lightbulb } from 'lucide-react';
import type { UIStrings } from '../locales/strings';

interface LandingPageProps {
  strings: UIStrings;
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ strings, onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'how' },
    { label: 'For Educators', id: 'educators' },
    { label: 'About', id: 'about' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E293B] flex flex-col font-sans overflow-x-hidden">
      <span className="sr-only">{strings.landingTitle}</span>

      {/* ════════════════════════════
          NAVBAR
      ════════════════════════════ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#faf6f0]/90 backdrop-blur-sm shadow-[0_1px_0_rgba(30,41,59,0.07)]' : 'bg-transparent'
      }`}>
        <div className="max-w-[1280px] mx-auto px-8 md:px-12 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 cursor-pointer flex-shrink-0">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F5E6D3] border border-[#E8D5BB] flex-shrink-0">
              <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" className="w-full h-full object-cover" />
            </div>
            <span className="text-[15px] font-bold tracking-[0.15em] text-[#1E293B]">RINHOZO</span>
          </button>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-5 py-2 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-150 ${
                  activeTab === link.id
                    ? 'border border-[#1E293B]/20 text-[#1E293B] bg-white/50'
                    : 'text-[#4A5568] hover:text-[#1E293B]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Get Started */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="hidden md:flex items-center gap-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all cursor-pointer group"
            >
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#1E293B] cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#FAF6F0]/98 border-b border-[#E7E5E4] px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-1 mb-5">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => handleNavClick(link.id)}
                  className={`text-left text-[15px] font-medium py-2.5 px-3 rounded-xl cursor-pointer ${activeTab === link.id ? 'bg-[#F5E6D3]' : 'text-[#78716C]'}`}>
                  {link.label}
                </button>
              ))}
            </div>
            <button onClick={onGetStarted} className="w-full bg-[#1E293B] text-white py-3 rounded-full text-[15px] font-semibold cursor-pointer">
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════
          HERO — full viewport, bg image
      ════════════════════════════ */}
      <section
        id="home"
        className="relative w-full"
        style={{
          minHeight: '100vh',
          backgroundImage: "url('/assets/cozy_desk_bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        {/* Subtle warm tint so text pops */}
        <div className="absolute inset-0 bg-[#FAF6F0]/20 pointer-events-none" />

        {/* ── MAIN CONTENT ROW ── */}
        <div
          className="relative z-10 max-w-[1280px] mx-auto px-8 md:px-12 w-full"
          style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
        >
          {/* LEFT TEXT COLUMN */}
          <div className="w-full lg:w-[44%] flex flex-col pt-20 pb-10 lg:py-0">

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="flex flex-col leading-none mb-4"
            >
              <span
                className="text-[52px] md:text-[62px] lg:text-[70px] font-black text-[#1E293B] tracking-[-0.025em]"
                style={{ lineHeight: 1.05 }}
              >
                Learning
              </span>
              <span
                className="text-[52px] md:text-[62px] lg:text-[70px] font-black text-[#1E293B] tracking-[-0.025em]"
                style={{ lineHeight: 1.05 }}
              >
                that listens
              </span>
              <span
                className="font-handwritten text-[#C49A6C] flex items-center gap-2"
                style={{ fontSize: 'clamp(40px, 7vw, 66px)', lineHeight: 1.15, marginTop: 4 }}
              >
                to you
                <svg style={{ width: 28, height: 28, flexShrink: 0 }} viewBox="0 0 24 24" fill="#C49A6C">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-[#4A5568] text-[15px] leading-[1.75] mb-7 max-w-[310px]"
            >
              Rinhozo is a companion that understands your pace, supports your journey, and{' '}
              <strong className="text-[#1E293B] font-bold">grows alongside you.</strong>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-6 py-3.5 rounded-full text-[14px] font-semibold shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
              >
                Start Your Journey
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center gap-2 bg-white/70 hover:bg-white border border-[#1E293B]/12 text-[#1E293B] px-6 py-3.5 rounded-full text-[14px] font-semibold transition-all cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-[#1E293B]/20 flex items-center justify-center">
                  <Play size={8} fill="currentColor" className="ml-0.5" />
                </span>
                See How It Works
              </button>
            </motion.div>

            {/* Feature pills strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex gap-2.5"
            >
              {[
                {
                  icon: <svg className="w-5 h-5" fill="none" stroke="#7DD3FC" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0M3 15c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" /></svg>,
                  text: 'Learn at\nyour pace',
                },
                {
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2"><path d="M12 2a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a7 7 0 0 0-7-7z" /><path d="M9 14v3" /><path d="M12 14v4" /><path d="M15 14v3" /></svg>,
                  text: 'Supported\nby Rin',
                },
                {
                  icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#86EFAC" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M12 9a4 4 0 0 0-4-4M12 13a4 4 0 0 1 4-4" /></svg>,
                  text: 'Small steps,\nbig growth',
                },
              ].map((pill, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/60 backdrop-blur-sm border border-white/70 rounded-2xl px-3 py-3 flex flex-col items-center gap-2 shadow-sm"
                >
                  {pill.icon}
                  <span className="text-[11px] font-semibold text-[#1E293B] text-center leading-tight whitespace-pre-line">{pill.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Jellyfish — absolutely positioned to fill the right half */}
          <div className="hidden lg:flex w-[56%] absolute right-0 top-0 bottom-0 items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative flex items-center justify-center"
              style={{ width: 560, height: 560 }}
            >
              {/* Warm amber glow */}
              <motion.div
                animate={{ opacity: [0.3, 0.55, 0.3], scale: [0.92, 1.06, 0.92] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(253,230,138,0.5) 0%, transparent 70%)' }}
              />

              {/* The jellyfish — floating */}
              <div className="animate-float relative z-10 w-full h-full flex items-center justify-center">
                <img
                  src="/assets/rin_mascot_3d_clean.png"
                  alt="Rin jellyfish mascot"
                  className="w-[88%] h-[88%] object-contain select-none"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(30,41,59,0.12))' }}
                />
              </div>

              {/* BADGE: Lightbulb — top left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute pointer-events-auto"
                style={{ top: '5%', left: '5%' }}
              >
                <div className="w-[58px] h-[58px] rounded-[18px] bg-white/65 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-center">
                  <Lightbulb size={26} color="#D4A574" fill="#D4A574" fillOpacity={0.2} />
                </div>
              </motion.div>

              {/* BADGE: Chart — top right */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute pointer-events-auto"
                style={{ top: '8%', right: '6%' }}
              >
                <div className="w-[58px] h-[58px] rounded-[18px] bg-white/65 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-center">
                  <BarChart3 size={26} color="#7DD3FC" />
                </div>
              </motion.div>

              {/* BADGE: Book — mid left */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute pointer-events-auto"
                style={{ top: '40%', left: '0%' }}
              >
                <div className="w-[58px] h-[58px] rounded-[18px] bg-white/65 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-center">
                  <BookOpen size={26} color="#D4A574" />
                </div>
              </motion.div>

              {/* BADGE: Puzzle — mid right */}
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute pointer-events-auto"
                style={{ top: '43%', right: '2%' }}
              >
                <div className="w-[58px] h-[58px] rounded-[18px] bg-white/65 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-center">
                  <Puzzle size={26} color="#78716C" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── CHAT BUBBLE fixed bottom-right ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          onClick={onGetStarted}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-white rounded-2xl rounded-br-[6px] px-4 py-3.5 shadow-[0_8px_32px_rgba(30,41,59,0.13)] border border-[#F0EBE3] flex items-start gap-3 cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(30,41,59,0.16)] transition-all duration-200 max-w-[220px]"
        >
          <div className="w-8 h-8 rounded-full bg-[#FDE68A]/30 border border-[#FDE68A]/50 overflow-hidden flex-shrink-0">
            <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-[#1E293B] mb-0.5 flex items-center gap-1">
              Hi! I'm Rinhozo <span>👋</span>
            </div>
            <p className="text-[11.5px] text-[#78716C] leading-[1.55]">
              I'm here to guide, encourage, and learn with you — every step of the way.
            </p>
            <span className="text-[#D4A574] text-[11px] float-right mt-1">♡</span>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════
          FEATURES
      ════════════════════════════ */}
      <section id="features" className="w-full bg-white py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-[1280px] mx-auto px-8 md:px-12">
          <div className="max-w-xl mb-14">
            <span className="text-[11px] font-bold text-[#D4A574] tracking-[0.22em] uppercase block mb-3">Core Features</span>
            <h2 className="text-[36px] md:text-[44px] font-black text-[#1E293B] leading-[1.12] tracking-tight mb-4">
              Designed for multilingual<br />& diverse minds
            </h2>
            <p className="text-[15px] text-[#78716C] leading-[1.75]">
              Rinhozo makes learning feel natural, engaging, and stress-free. Every interaction is designed with care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Globe size={22} />, color: '#D4A574', bg: '#FFF8F0', title: 'Hinglish-First & Localized', desc: 'Conceptual translation that matches how we naturally speak — Hinglish, English, Hindi, and Tamil.' },
              { icon: <Puzzle size={22} />, color: '#7DD3FC', bg: '#F0F9FF', title: 'Tactile Card Swiping', desc: 'Swipe-to-learn cards to reduce cognitive load and help learners focus on one concept at a time.' },
              { icon: <Sparkles size={22} />, color: '#D4A574', bg: '#FFF8F0', title: 'Adaptive Learning', desc: 'Choose visual models, story analogies, or audio-guided reading. Rinhozo adapts to your style.' },
              { icon: <WifiOff size={22} />, color: '#86EFAC', bg: '#F0FDF4', title: 'Offline-First Design', desc: 'Full offline capability. Progress is stored locally and syncs when you are back online.' },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#FAFAF9] hover:bg-white border border-[#F0EBE3] hover:border-[#E7E5E4] hover:shadow-[0_8px_32px_rgba(30,41,59,0.07)] rounded-[20px] p-7 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-[#1E293B] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-[#78716C] leading-[1.65]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          HOW IT WORKS
      ════════════════════════════ */}
      <section id="how" className="w-full bg-[#FAF6F0] py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-[1280px] mx-auto px-8 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-[#D4A574] tracking-[0.22em] uppercase block mb-3">Roadmap</span>
            <h2 className="text-[36px] md:text-[44px] font-black text-[#1E293B] leading-[1.12] tracking-tight mb-4">
              Your path to mastery in<br />3 simple steps
            </h2>
            <p className="text-[15px] text-[#78716C] leading-[1.75]">
              Rinhozo guides you seamlessly through lessons, adapting to your style as you progress.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { num: '01', color: '#D4A574', title: 'Choose Your Style', desc: 'Pick your preferred learning language — Hinglish, Hindi, Tamil, or English — and your content style.' },
              { num: '02', color: '#7DD3FC', title: 'Swipe Through Lessons', desc: 'Review byte-sized visual cards at your own pace. Solve check-in quizzes as you swipe through concepts.' },
              { num: '03', color: '#86EFAC', title: 'Conquer Boss Battles', desc: 'Test your knowledge in boss challenges to evolve your jellyfish guide Rin and unlock new study rooms.' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-[#F0EBE3] rounded-[20px] p-8 hover:shadow-[0_8px_32px_rgba(30,41,59,0.06)] transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[17px] font-black border-2" style={{ borderColor: s.color, color: s.color, backgroundColor: `${s.color}15` }}>{s.num}</div>
                <h3 className="text-[18px] font-bold text-[#1E293B] mb-3">{s.title}</h3>
                <p className="text-[14px] text-[#78716C] leading-[1.65]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          EDUCATORS
      ════════════════════════════ */}
      <section id="educators" className="w-full bg-white py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-[1280px] mx-auto px-8 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="w-full lg:w-[50%]">
              <span className="text-[11px] font-bold text-[#D4A574] tracking-[0.22em] uppercase block mb-4">For Classrooms</span>
              <h2 className="text-[34px] md:text-[40px] font-black text-[#1E293B] leading-[1.15] tracking-tight mb-5">Empower every student.<br />Bridge every gap.</h2>
              <p className="text-[15px] text-[#78716C] leading-[1.75] mb-8">Educators can monitor student progress offline, deploy customizable curriculum modules, and address neurodiverse needs with Rinhozo's multi-modal adapters.</p>
              <div className="flex flex-col gap-3.5 mb-10">
                {['Individual student progress analytics', 'Neurodivergent-friendly accessibility guidelines', 'Full offline classroom compatibility'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#86EFAC]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-[14px] font-medium text-[#1E293B]">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={onGetStarted} className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-7 py-3.5 rounded-full text-[14px] font-semibold shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
                Learn More for Schools <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="w-full lg:w-[46%]">
              <div className="bg-[#FAF6F0] border border-[#F0EBE3] rounded-[24px] p-6 shadow-[0_4px_32px_rgba(30,41,59,0.05)]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest">Classroom Dashboard</span>
                  <span className="text-[11px] font-semibold text-[#D4A574] bg-[#F5E6D3] px-2.5 py-1 rounded-full">Live</span>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3] mb-4">
                  <div className="text-[12px] font-semibold text-[#78716C] mb-1">Average Class Streak</div>
                  <div className="text-[30px] font-black text-[#D4A574]">14 Days 🔥</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3]">
                  <div className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider mb-4">Student Style Distribution</div>
                  {[{ label: 'Story Analogies', pct: 55, color: '#D4A574' }, { label: 'Visual Models', pct: 30, color: '#7DD3FC' }, { label: 'Direct Cards', pct: 15, color: '#86EFAC' }].map((bar, i) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <div className="flex justify-between text-[12px] font-semibold text-[#1E293B] mb-1.5"><span>{bar.label}</span><span style={{ color: bar.color }}>{bar.pct}%</span></div>
                      <div className="w-full h-1.5 bg-[#F0EBE3] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${bar.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12 }} className="h-full rounded-full" style={{ backgroundColor: bar.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          ABOUT
      ════════════════════════════ */}
      <section id="about" className="w-full bg-[#FAF6F0] py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-3xl mx-auto px-8 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <span className="text-[11px] font-bold text-[#D4A574] tracking-[0.22em] uppercase block mb-4">About Us</span>
            <h2 className="text-[36px] md:text-[44px] font-black text-[#1E293B] leading-[1.12] tracking-tight mb-5">Education belongs<br />to everyone</h2>
            <p className="text-[16px] text-[#78716C] leading-[1.8] max-w-[580px] mx-auto mb-10">
              Rinhozo was born from a simple belief: learning should adapt to the student, not the other way around. By combining language personalization, cognitive scaffolding, and friendly visual support, we help students conquer study barriers one concept at a time.
            </p>
            <div className="inline-block bg-white border border-[#F0EBE3] shadow-sm rounded-2xl px-8 py-5 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300 mb-10">
              <span className="font-handwritten text-[#C49A6C] text-[24px]">"Education belongs to everyone." ♡</span>
            </div>
            <div>
              <button onClick={onGetStarted} className="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-8 py-4 rounded-full text-[15px] font-semibold shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer">
                Join Rinhozo Today <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════
          FOOTER
      ════════════════════════════ */}
      <footer className="w-full bg-[#1E293B] py-8">
        <div className="max-w-[1280px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-[#D4A574]/15 border border-[#D4A574]/20">
              <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" className="w-full h-full object-cover" />
            </div>
            <span className="text-[12px] font-bold tracking-[0.18em] text-white/70">RINHOZO</span>
          </div>
          <p className="text-[12px] text-white/35 font-medium">© {new Date().getFullYear()} Rinhozo. Made with care for every student.</p>
          <div className="flex gap-5 text-[12px] text-white/35">
            <button onClick={onGetStarted} className="hover:text-white/60 transition-colors cursor-pointer">Privacy</button>
            <button onClick={onGetStarted} className="hover:text-white/60 transition-colors cursor-pointer">Terms</button>
            <button onClick={onGetStarted} className="hover:text-white/60 transition-colors cursor-pointer">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
