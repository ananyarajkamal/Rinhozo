import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Lightbulb,
  BookOpen,
  BarChart3,
  Puzzle,
  Menu,
  X,
  Globe,
  WifiOff,
  Sparkles,
  ChevronRight
} from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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

  const features = [
    {
      icon: <Globe size={22} />,
      color: '#D4A574',
      bg: '#FFF8F0',
      title: 'Hinglish-First & Localized',
      desc: 'Conceptual translation that matches how we naturally speak at home — supporting Hinglish, English, Hindi, and Tamil.',
    },
    {
      icon: <Puzzle size={22} />,
      color: '#7DD3FC',
      bg: '#F0F9FF',
      title: 'Tactile Card Swiping',
      desc: 'Swipe-to-learn cards designed to reduce cognitive load and help neurodivergent learners focus on one concept at a time.',
    },
    {
      icon: <Sparkles size={22} />,
      color: '#D4A574',
      bg: '#FFF8F0',
      title: 'Adaptive Learning',
      desc: 'Choose visual models, story analogies, or audio-guided reading. Rinhozo adapts dynamically to your style.',
    },
    {
      icon: <WifiOff size={22} />,
      color: '#86EFAC',
      bg: '#F0FDF4',
      title: 'Offline-First Design',
      desc: 'Full offline capability. Progress is stored locally and syncs seamlessly whenever you are back online.',
    },
  ];

  const steps = [
    {
      num: '01',
      color: '#D4A574',
      title: 'Choose Your Style',
      desc: 'Pick your preferred learning language — Hinglish, Hindi, Tamil, or English — and your content presentation style.',
    },
    {
      num: '02',
      color: '#7DD3FC',
      title: 'Swipe Through Lessons',
      desc: 'Review byte-sized visual cards at your own pace. Solve check-in quizzes as you swipe through each concept.',
    },
    {
      num: '03',
      color: '#86EFAC',
      title: 'Conquer Boss Battles',
      desc: 'Test your knowledge in boss challenges to evolve your jellyfish guide Rin and unlock new study rooms.',
    },
  ];

  /* ─── fade-up variant ─── */
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: 'easeOut' as const } },
  });

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E293B] flex flex-col font-sans overflow-x-hidden">
      <span className="sr-only">{strings.landingTitle} {strings.landingSubtitle}</span>

      {/* ══════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(30,41,59,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-xl bg-[#1E293B] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[#D4A574] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a7 7 0 0 0-7-7z" />
                <path d="M9 14v3" /><path d="M12 14v4" /><path d="M15 14v3" />
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-[0.18em] text-[#1E293B]">RINHOZO</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-[#1E293B] text-white'
                    : 'text-[#78716C] hover:text-[#1E293B] hover:bg-[#1E293B]/6'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="hidden md:flex items-center gap-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 cursor-pointer group"
            >
              Get Started
              <ArrowRight size={15} className="transform group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-[#1E293B]/8 transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#FAF6F0]/98 backdrop-blur-md border-b border-[#E7E5E4] px-6 py-5 md:hidden"
          >
            <div className="flex flex-col gap-1 mb-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-[15px] font-medium py-2.5 px-3 rounded-xl cursor-pointer transition-all ${
                    activeTab === link.id ? 'bg-[#F5E6D3] text-[#1E293B]' : 'text-[#78716C]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button
              onClick={onGetStarted}
              className="w-full bg-[#1E293B] text-white py-3 rounded-full text-[15px] font-semibold cursor-pointer"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        id="home"
        className="w-full min-h-screen flex items-center pt-[68px] bg-[#FAF6F0] relative overflow-hidden"
      >
        {/* subtle decorative blob */}
        <div className="absolute top-[-120px] right-[-80px] w-[520px] h-[520px] bg-[#F5E6D3] rounded-full blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] bg-[#E0F2FE] rounded-full blur-[80px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20 lg:py-0 lg:min-h-[calc(100vh-68px)] flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* LEFT: Text content */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7 w-full lg:w-[52%] text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeUp(0.05)}>
              <span className="inline-flex items-center gap-2 bg-[#F5E6D3] text-[#D4A574] text-[12px] font-bold tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-[#D4A574]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574] animate-pulse" />
                AI-Powered Learning Companion
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeUp(0.12)} className="flex flex-col gap-1">
              <h1 className="text-[44px] md:text-[54px] lg:text-[60px] font-bold text-[#1E293B] leading-[1.1] tracking-[-0.02em]">
                Learning that
              </h1>
              <h1 className="text-[44px] md:text-[54px] lg:text-[60px] font-bold text-[#1E293B] leading-[1.1] tracking-[-0.02em]">
                listens{' '}
                <span className="font-handwritten text-[#D4A574] tracking-normal">to you</span>
                <span className="inline-block ml-2 text-[#D4A574]">
                  <svg className="inline w-8 h-8 md:w-10 md:h-10 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={fadeUp(0.2)}
              className="text-[17px] text-[#78716C] leading-[1.7] max-w-[480px]"
            >
              Rinhozo is a companion that understands your pace, supports your journey, and{' '}
              <span className="text-[#1E293B] font-semibold">grows alongside you</span> — in the language you think in.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp(0.28)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
              >
                Start Your Journey
                <ArrowRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onGetStarted}
                className="flex items-center justify-center gap-2.5 bg-white hover:bg-[#F5E6D3] text-[#1E293B] border border-[#E7E5E4] px-7 py-3.5 rounded-full text-[15px] font-semibold transition-all duration-200 cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-[#F5E6D3] flex items-center justify-center flex-shrink-0">
                  <Play size={9} fill="currentColor" className="ml-0.5 text-[#D4A574]" />
                </span>
                See How It Works
              </button>
            </motion.div>

            {/* Social proof strip */}
            <motion.div variants={fadeUp(0.36)} className="flex items-center gap-5 pt-2">
              <div className="flex -space-x-2.5">
                {['#FDE68A', '#FCA5A5', '#86EFAC', '#7DD3FC'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex-shrink-0" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#1E293B]">Trusted by 500+ students</div>
                <div className="text-[12px] text-[#78716C]">across schools & homes</div>
              </div>
              <div className="h-7 w-[1px] bg-[#E7E5E4]" />
              <div className="text-[#D4A574] text-[13px] font-semibold">★★★★★</div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Jellyfish mascot */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.2)}
            className="w-full lg:w-[44%] flex items-center justify-center relative"
          >
            {/* Mascot glow backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[340px] h-[340px] rounded-full bg-[#FDE68A]/25 blur-[60px]" />
            </div>

            {/* Floating icon badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 left-4 lg:top-8 lg:left-0 bg-white border border-[#E7E5E4] rounded-2xl px-3 py-2.5 shadow-md flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFF8F0] flex items-center justify-center text-[#D4A574]">
                <Lightbulb size={16} fill="currentColor" fillOpacity={0.2} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#1E293B]">Adaptive AI</div>
                <div className="text-[10px] text-[#78716C]">learns your pace</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-4 right-4 lg:top-12 lg:right-0 bg-white border border-[#E7E5E4] rounded-2xl px-3 py-2.5 shadow-md flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F0F9FF] flex items-center justify-center text-[#7DD3FC]">
                <BarChart3 size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#1E293B]">Progress</div>
                <div className="text-[10px] text-[#78716C]">12 day streak 🔥</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-4 left-4 lg:bottom-8 lg:left-2 bg-white border border-[#E7E5E4] rounded-2xl px-3 py-2.5 shadow-md flex items-center gap-2.5 z-20"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#86EFAC]">
                <BookOpen size={16} />
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#1E293B]">3 languages</div>
                <div className="text-[10px] text-[#78716C]">Hindi · Eng · Tamil</div>
              </div>
            </motion.div>

            {/* Main mascot image */}
            <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] flex items-center justify-center animate-float">
              <motion.div
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-[#FDE68A]/30 blur-2xl"
              />
              <img
                src="/assets/rin_mascot_3d_clean.png"
                alt="Rin — Rinhozo's jellyfish mascot"
                className="w-full h-full object-contain select-none relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section id="features" className="w-full bg-white py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="max-w-2xl mb-16">
            <span className="inline-block text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase mb-4">
              Core Features
            </span>
            <h2 className="text-[34px] md:text-[42px] font-bold text-[#1E293B] leading-[1.15] tracking-tight mb-4">
              Designed for multilingual<br />& diverse minds
            </h2>
            <p className="text-[16px] text-[#78716C] leading-[1.7]">
              Rinhozo makes learning feel natural, engaging, and stress-free. Every gesture is designed with care to keep your mind focused and motivated.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-[#FAFAF9] hover:bg-white border border-[#F0EBE3] hover:border-[#E7E5E4] hover:shadow-[0_8px_30px_rgba(30,41,59,0.07)] rounded-[20px] p-7 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="text-[16px] font-bold text-[#1E293B] mb-2.5 leading-snug">{f.title}</h3>
                <p className="text-[14px] text-[#78716C] leading-[1.65]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how" className="w-full bg-[#FAF6F0] py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-block text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase mb-4">
              Roadmap
            </span>
            <h2 className="text-[34px] md:text-[42px] font-bold text-[#1E293B] leading-[1.15] tracking-tight mb-4">
              Your path to mastery<br />in 3 simple steps
            </h2>
            <p className="text-[16px] text-[#78716C] leading-[1.7]">
              Rinhozo guides you seamlessly through lessons, adapting to your style as you progress.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connector lines on desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[33.33%] right-[33.33%] h-[1px] bg-gradient-to-r from-[#D4A574]/30 via-[#7DD3FC]/40 to-[#86EFAC]/30 z-0" />

            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative z-10 bg-white border border-[#F0EBE3] rounded-[20px] p-8 hover:shadow-[0_8px_30px_rgba(30,41,59,0.06)] transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-[18px] font-black border-2"
                  style={{ borderColor: s.color, color: s.color, backgroundColor: `${s.color}12` }}
                >
                  {s.num}
                </div>
                <h3 className="text-[18px] font-bold text-[#1E293B] mb-3">{s.title}</h3>
                <p className="text-[14px] text-[#78716C] leading-[1.65]">{s.desc}</p>
                <div className="mt-5 flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: s.color }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOR EDUCATORS
      ══════════════════════════════════════ */}
      <section id="educators" className="w-full bg-white py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="w-full lg:w-[50%]"
            >
              <span className="inline-block text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase mb-5">
                For Classrooms
              </span>
              <h2 className="text-[34px] md:text-[40px] font-bold text-[#1E293B] leading-[1.15] tracking-tight mb-5">
                Empower every student.<br />Bridge every gap.
              </h2>
              <p className="text-[16px] text-[#78716C] leading-[1.75] mb-8">
                Educators can monitor student learning progress offline, deploy customizable curriculum modules, and address neurodiverse needs with Rinhozo's built-in multi-modal adapters.
              </p>

              <div className="flex flex-col gap-4 mb-10">
                {[
                  'Individual student progress analytics',
                  'Neurodivergent-friendly accessibility guidelines',
                  'Full offline classroom compatibility',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#86EFAC]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#4ADE80]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#1E293B] font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onGetStarted}
                className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-7 py-3.5 rounded-full text-[15px] font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
              >
                Learn More for Schools
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Right dashboard card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="w-full lg:w-[46%]"
            >
              <div className="bg-[#FAF6F0] border border-[#F0EBE3] rounded-[24px] p-6 shadow-[0_8px_40px_rgba(30,41,59,0.05)]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-widest">Classroom Dashboard</span>
                  <span className="text-[11px] font-medium text-[#D4A574] bg-[#F5E6D3] px-2.5 py-1 rounded-full">Live</span>
                </div>

                {/* Streak stat */}
                <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3] mb-4">
                  <div className="text-[12px] font-semibold text-[#78716C] mb-1">Average Class Streak</div>
                  <div className="text-[32px] font-black text-[#D4A574] leading-none">14 Days 🔥</div>
                </div>

                {/* Style distribution */}
                <div className="bg-white rounded-2xl p-5 border border-[#F0EBE3]">
                  <div className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider mb-4">Student Style Distribution</div>
                  <div className="flex flex-col gap-3.5">
                    {[
                      { label: 'Story Analogies', pct: 55, color: '#D4A574' },
                      { label: 'Visual Models', pct: 30, color: '#7DD3FC' },
                      { label: 'Direct Concept Cards', pct: 15, color: '#86EFAC' },
                    ].map((bar, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[13px] font-semibold text-[#1E293B] mb-1.5">
                          <span>{bar.label}</span>
                          <span style={{ color: bar.color }}>{bar.pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#F0EBE3] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: bar.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" className="w-full bg-[#FAF6F0] py-24 md:py-32 border-t border-[#F0EBE3]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-block text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase mb-5">
              About Us
            </span>
            <h2 className="text-[34px] md:text-[44px] font-bold text-[#1E293B] leading-[1.15] tracking-tight mb-6">
              Education belongs<br />to everyone
            </h2>
            <p className="text-[17px] text-[#78716C] leading-[1.8] max-w-[640px] mx-auto mb-12">
              Rinhozo was born from a simple belief: learning should adapt to the student, not the other way around. By combining language personalization, cognitive scaffolding, and friendly visual support, we help students conquer study barriers one concept at a time.
            </p>

            {/* Handwritten note card */}
            <div className="relative inline-block mb-14">
              <div className="bg-white border border-[#F0EBE3] shadow-md rounded-2xl px-8 py-6 rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
                <span className="font-handwritten text-[#D4A574] text-[26px] leading-relaxed">
                  "Education belongs to everyone." ♡
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-9 py-4 rounded-full text-[16px] font-semibold shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
              >
                Join Rinhozo Today
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="w-full bg-[#1E293B] py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D4A574]/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#D4A574] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                <path d="M12 2a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a7 7 0 0 0-7-7z" />
                <path d="M9 14v3" /><path d="M12 14v4" /><path d="M15 14v3" />
              </svg>
            </div>
            <span className="text-[13px] font-bold tracking-[0.18em] text-white/80">RINHOZO</span>
          </div>
          <p className="text-[13px] text-white/40 font-medium">
            © {new Date().getFullYear()} Rinhozo. Made with care for every student.
          </p>
          <div className="flex items-center gap-5 text-[13px] text-white/40 font-medium">
            <button onClick={onGetStarted} className="hover:text-white/70 transition-colors cursor-pointer">Privacy</button>
            <button onClick={onGetStarted} className="hover:text-white/70 transition-colors cursor-pointer">Terms</button>
            <button onClick={onGetStarted} className="hover:text-white/70 transition-colors cursor-pointer">Contact</button>
          </div>
        </div>
      </footer>

      {/* ── Rin floating chat bubble ── */}
      <div className="fixed z-40 bottom-6 right-6 md:bottom-8 md:right-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4, ease: 'easeOut' }}
          className="bg-white rounded-2xl rounded-br-md p-4 shadow-[0_8px_32px_rgba(30,41,59,0.14)] border border-[#F0EBE3] flex items-start gap-3 hover:shadow-[0_12px_40px_rgba(30,41,59,0.16)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer max-w-[240px]"
        >
          <div className="w-8 h-8 rounded-full bg-[#FDE68A]/30 border border-[#FDE68A]/40 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src="/assets/rin_mascot_3d_clean.png" alt="Mini Rin" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#1E293B] flex items-center gap-1 mb-0.5">
              Hi, I'm Rin!
              <svg className="w-3.5 h-3.5 text-[#D4A574]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A2.5 2.5 0 0019.5 6a2.5 2.5 0 00-2 1 2.5 2.5 0 00-4.5 1.5V11m-3-1V7.5a2.5 2.5 0 00-5 0V11m3-4V5a2.5 2.5 0 00-5 0v11a6 6 0 006 6h2a6 6 0 006-6v-2" />
              </svg>
            </div>
            <p className="text-[12px] text-[#78716C] leading-[1.5]">Here to guide you — every step of the way ♡</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
