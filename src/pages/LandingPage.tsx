import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Menu, X,
  BookOpen, Lightbulb, Puzzle, BarChart3, GraduationCap, Sprout,
  Mail, Phone, MapPin, Heart, Star, Send,
  Brain, Eye, TrendingUp
} from 'lucide-react';
import type { UIStrings } from '../locales/strings';

interface LandingPageProps {
  strings: UIStrings;
  onGetStarted: () => void;
}

/* ─── tiny helpers ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

function Section({ id, className, style, children }: { id?: string; className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

/* ─── floating mascot card ──────────────────────── */
function FloatCard({
  icon, label, sub, delay, style,
}: { icon: React.ReactNode; label: string; sub?: string; delay: number; style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3 + delay * 0.4, repeat: Infinity, ease: 'easeInOut', delay }}
      className="absolute z-20 bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(22,35,58,0.10)] flex items-center gap-3 select-none"
      style={style}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#FBF3E8]">
        {icon}
      </div>
      <div>
        <div className="text-[13px] font-bold text-[#16233A] leading-tight">{label}</div>
        {sub && <div className="text-[11px] text-[#6B6560] leading-tight">{sub}</div>}
      </div>
    </motion.div>
  );
}

/* ─── feature card ──────────────────────────────── */
function FeatureCard({
  icon, color, bg, title, desc, delay,
}: { icon: React.ReactNode; color: string; bg: string; title: string; desc: string; delay: number }) {
  return (
    <motion.div 
      variants={fadeUp(delay)} 
      className="bg-white border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_32px_rgba(22,35,58,0.01)] flex flex-col gap-6 text-left transition-all hover:translate-y-[-6px] hover:shadow-[0_16px_40px_rgba(22,35,58,0.06)]"
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: bg, color }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-[18px] font-bold text-[#17263F] mb-2 leading-snug">{title}</h3>
        <p className="text-[14px] text-[#6B6560] leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export const LandingPage: React.FC<LandingPageProps> = ({ strings, onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'how' },
    { label: 'For Educators', id: 'educators' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const features = [
    { icon: <BookOpen size={24} />, color: '#D4A373', bg: '#FBF3E8', title: 'Adaptive Learning', desc: 'Personalized content that adapts to your attention, pace, and learning preferences.' },
    { icon: <Lightbulb size={24} />, color: '#7DD3FC', bg: '#EFF9FF', title: 'Attention Insights', desc: 'Detects focus levels in real-time and recommends the right support when you need it.' },
    { icon: <Puzzle size={24} />, color: '#C084FC', bg: '#FAF0FF', title: 'Neurodiverse Friendly', desc: 'Designed for ADHD and diverse learning styles with inclusive experiences.' },
    { icon: <BarChart3 size={24} />, color: '#86EFAC', bg: '#F0FDF4', title: 'Learning Analytics', desc: 'Track progress, patterns, and behaviors with easy-to-understand visual insights.' },
    { icon: <GraduationCap size={24} />, color: '#D4A373', bg: '#FBF3E8', title: 'Educator Dashboard', desc: 'Actionable insights and tools for educators to support every learner better.' },
    { icon: <Sprout size={24} />, color: '#F87171', bg: '#FFF1F1', title: 'Growth Journey', desc: 'Celebrate milestones and see growth through your personalized learning journey.' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      style={{ background: '#FAF6F0', color: '#16233A', fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif" }}
    >
      <span className="sr-only">{strings.landingTitle}</span>

      {/* ════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════ */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(250,246,240,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(22,35,58,0.07)' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>

          {/* Logo */}
          <button onClick={() => goto('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#FBF3E8', border: '1.5px solid #F0D4A8', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" style={{ width: 28, height: 28, objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.14em', color: '#16233A' }}>RINHOZO</span>
          </button>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => goto(link.id)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                  background: activeTab === link.id ? 'rgba(22,35,58,0.07)' : 'transparent',
                  border: activeTab === link.id ? '1px solid rgba(22,35,58,0.12)' : '1px solid transparent',
                  color: activeTab === link.id ? '#16233A' : '#6B6560',
                  fontFamily: 'inherit',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={onGetStarted}
              className="hidden md:flex"
              style={{
                alignItems: 'center', gap: 6,
                background: '#16233A', color: '#fff',
                padding: '10px 24px', borderRadius: 9999,
                fontSize: 14, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'inherit',
                boxShadow: '0 2px 12px rgba(22,35,58,0.18)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1E2E4A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#16233A')}
            >
              Get Started <ArrowRight size={14} />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              style={{ width: 40, height: 40, borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16233A' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            style={{ position: 'fixed', top: 72, left: 0, right: 0, zIndex: 40, background: 'rgba(250,246,240,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(22,35,58,0.08)', padding: '20px 24px' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
              {navLinks.map(link => (
                <button key={link.id} onClick={() => goto(link.id)}
                  style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: 'pointer', background: activeTab === link.id ? '#FBF3E8' : 'transparent', border: 'none', color: '#16233A', fontFamily: 'inherit' }}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <button onClick={onGetStarted} style={{ width: '100%', background: '#16233A', color: '#fff', padding: '14px', borderRadius: 9999, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        id="home"
        style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        {/* Ambient glow blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,161,95,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(125,211,252,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', left: '38%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,161,95,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', width: '100%', paddingTop: 120, paddingBottom: 80, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 64 }} className="flex-col lg:flex-row" >

          {/* ── LEFT TEXT ── */}
          <motion.div
            initial="hidden" animate="visible"
            style={{ flex: '0 0 auto', width: '100%', maxWidth: 540 }}
            className="lg:max-w-[540px] w-full"
          >
            {/* Badge */}
            <motion.div variants={fadeUp(0.0)}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#FBF3E8', color: '#D6A15F',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '8px 16px', borderRadius: 9999, border: '1px solid rgba(214,161,95,0.25)',
                marginBottom: 32,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D6A15F', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                AI-Powered Learning Companion
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp(0.08)} style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 800, color: '#16233A', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
                Learning that<br />
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  adapts
                  <svg style={{ position: 'absolute', bottom: -4, left: 0, right: 0, width: '100%' }} height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                    <path d="M0 5 Q50 0 100 4 Q150 8 200 3" fill="none" stroke="#D6A15F" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>{' '}to you
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p variants={fadeUp(0.16)} style={{ fontSize: 18, fontWeight: 400, color: '#6B6560', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              An AI learning companion designed for neurodiverse minds. Personalized support, adaptive attention guidance, and learning experiences that <strong style={{ color: '#16233A', fontWeight: 600 }}>grow with you.</strong>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp(0.24)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
              <button
                onClick={onGetStarted}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#16233A', color: '#fff',
                  padding: '18px 32px', borderRadius: 9999,
                  fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(22,35,58,0.22)',
                  transition: 'all 0.22s ease', fontFamily: 'inherit',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(22,35,58,0.28)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(22,35,58,0.22)'; }}
              >
                Start Your Journey <ArrowRight size={18} />
              </button>

              <button
                onClick={onGetStarted}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#fff', color: '#16233A',
                  padding: '18px 32px', borderRadius: 9999,
                  fontSize: 16, fontWeight: 600,
                  border: '1.5px solid rgba(22,35,58,0.12)', cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(22,35,58,0.06)',
                  transition: 'all 0.22s ease', fontFamily: 'inherit',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FBF3E8'; e.currentTarget.style.borderColor = 'rgba(214,161,95,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(22,35,58,0.12)'; }}
              >
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#FBF3E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Play size={10} fill="#D6A15F" color="#D6A15F" style={{ marginLeft: 1 }} />
                </span>
                See How It Works
              </button>
            </motion.div>

            {/* Trust strip */}
            <motion.div variants={fadeUp(0.32)} style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', marginLeft: -8 }}>
                {['#FDE68A', '#FBCFE8', '#BBF7D0', '#BAE6FD'].map((c, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #FAF6F0', background: c, marginLeft: -8, flexShrink: 0 }} />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#16233A' }}>Trusted by 500+ students</div>
                <div style={{ fontSize: 12, color: '#6B6560' }}>across schools & homes</div>
              </div>
              <div style={{ width: 1, height: 28, background: 'rgba(22,35,58,0.12)' }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: '#D6A15F' }}>★★★★★</div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: MASCOT + FLOATING CARDS ── */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 520, minWidth: 0 }} className="hidden lg:flex">

            {/* Soft ring behind jellyfish */}
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(253,230,138,0.35) 0%, transparent 65%)', pointerEvents: 'none' }}
            />

            {/* Jellyfish */}
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 10, width: 380, height: 380 }}
            >
              <img
                src="/assets/rin_mascot_3d_clean.png"
                alt="Rin — your AI learning companion"
                style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 24px 48px rgba(22,35,58,0.12))' }}
              />
            </motion.div>

            {/* Floating cards */}
            <FloatCard
              icon={<Brain size={18} color="#D6A15F" />}
              label="Personalized Learning"
              sub="Adapts to you"
              delay={0}
              style={{ top: '8%', left: '-2%' }}
            />
            <FloatCard
              icon={<Eye size={18} color="#7DD3FC" />}
              label="Focus Support"
              sub="Always attentive"
              delay={0.6}
              style={{ top: '6%', right: '2%' }}
            />
            <FloatCard
              icon={<BarChart3 size={18} color="#86EFAC" />}
              label="Attention Insights"
              sub="Real-time data"
              delay={1.1}
              style={{ bottom: '20%', left: '-6%' }}
            />
            <FloatCard
              icon={<TrendingUp size={18} color="#F87171" />}
              label="Progress Growth"
              sub="Every milestone"
              delay={1.6}
              style={{ bottom: '24%', right: '-2%' }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════ */}
      <Section
        id="features"
        className=""
        style={{ background: '#FFFDF9', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 mb-16">
            <motion.div variants={fadeUp(0)} className="max-w-[640px] w-full text-left">
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#D4A373] uppercase block mb-3">
                Core Features
              </span>
              <h2 className="text-[36px] lg:text-[48px] font-extrabold text-[#17263F] leading-tight mb-4 tracking-tight">
                Features <span className="font-handwritten text-[#D4A373] text-[36px] lg:text-[44px] block lg:inline ml-0 lg:ml-2">made for every learner ♡</span>
              </h2>
              <p className="text-[16px] lg:text-[17px] text-[#6B6560] leading-relaxed max-w-[520px]">
                Rinhozo adapts to different learning styles, attention needs, and growth journeys.
              </p>
            </motion.div>
            
            {/* Mascot on Right */}
            <motion.div 
              variants={fadeUp(0.12)} 
              className="hidden lg:flex flex-1 justify-end pr-16 relative"
            >
              {/* Backglow */}
              <div className="absolute top-[20%] right-[10%] w-72 h-72 rounded-full bg-radial from-[#D4A373]/12 to-transparent blur-2xl pointer-events-none" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-48 h-48 relative z-10"
              >
                <img 
                  src="/assets/rin_mascot_3d_clean.png" 
                  alt="Rin Mascot" 
                  className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(22,35,58,0.08)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 0.07} />
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <motion.div 
            variants={fadeUp(0.35)}
            className="mt-16 bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(22,35,58,0.02)] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#FBF3E8] border border-[#D4A373]/20 flex items-center justify-center flex-shrink-0">
                <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" className="w-10 h-10 object-contain" />
              </div>
              <p className="text-[15px] lg:text-[16px] font-bold text-[#17263F] max-w-[480px] leading-snug">
                "Every feature is built with one goal — helping you learn better, your way."
              </p>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-[#17263F] hover:bg-[#1E2E4A] text-white font-bold text-sm tracking-wide px-8 py-4.5 rounded-full transition-all active:scale-[0.98] shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              Start Your Journey <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <Section
        id="how"
        style={{ background: '#FAF6F0', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

          {/* Header */}
          <div className="max-w-[640px] w-full text-left mb-16">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#D4A373] uppercase block mb-3">
              Process
            </span>
            <h2 className="text-[36px] lg:text-[48px] font-extrabold text-[#17263F] leading-tight mb-4 tracking-tight">
              How it <span className="font-handwritten text-[#D4A373] text-[36px] lg:text-[44px] block lg:inline ml-0 lg:ml-2">works ♡</span>
            </h2>
            <p className="text-[16px] lg:text-[17px] text-[#6B6560] leading-relaxed max-w-[520px]">
              Rinhozo makes learning simple, supportive, and personalized in four easy steps.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Timeline */}
            <div className="flex-1 flex flex-col gap-6 relative w-full">
              {/* Timeline Connector Line */}
              <div className="absolute left-8 top-10 bottom-10 w-[2px] bg-[#D4A373]/20 z-0" />
              
              {[
                { num: '1', title: 'Create Profile', desc: 'Tell us a bit about yourself so Rin can understand your learning style.' },
                { num: '2', title: 'AI Understands You', desc: 'Rin analyzes your attention patterns, preferences, and learning needs.' },
                { num: '3', title: 'Personalized Learning', desc: 'Get lessons and support that adapt in real-time to you.' },
                { num: '4', title: 'Grow & Achieve', desc: 'Track progress, celebrate milestones, and keep growing every day.' },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUp(0.1 + i * 0.08)}
                  className="flex gap-6 items-start relative z-10 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FFFDF9] border border-[#17263F]/6 shadow-sm flex items-center justify-center flex-shrink-0 text-[18px] font-bold text-[#D4A373] group-hover:border-[#D4A373]/30 transition-colors">
                    {step.num}
                  </div>
                  <div className="flex-1 bg-[#FFFDF9] border border-[#17263F]/6 rounded-[20px] p-5 shadow-[0_4px_24px_rgba(22,35,58,0.01)] text-left hover:border-[#D4A373]/25 transition-all duration-200">
                    <h4 className="text-[16px] font-bold text-[#17263F] mb-1">{step.title}</h4>
                    <p className="text-[14px] text-[#6B6560] leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right side desk/workspace visual collage */}
            <div className="flex-1 relative flex items-center justify-center min-h-[500px] w-full">
              
              {/* Soft ambient backglows */}
              <div className="absolute top-[20%] left-[20%] w-80 h-80 rounded-full bg-radial from-[#D4A373]/12 to-transparent blur-3xl pointer-events-none" />
              <div className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-radial from-[#7DD3FC]/8 to-transparent blur-3xl pointer-events-none" />

              {/* Stacked books (bottom left) */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[10%] left-[10%] w-48 z-10"
              >
                <img 
                  src="/assets/stacked_books_3d_clean.png" 
                  alt="Stacked Books" 
                  className="w-full object-contain filter drop-shadow-[0_12px_24px_rgba(22,35,58,0.06)]"
                />
              </motion.div>

              {/* Coffee Cup (bottom right) */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-[8%] right-[12%] w-40 z-20"
              >
                <img 
                  src="/assets/coffee_cup_3d_clean.png" 
                  alt="Coffee Cup" 
                  className="w-full object-contain filter drop-shadow-[0_12px_24px_rgba(22,35,58,0.06)]"
                />
              </motion.div>

              {/* Open Notebook (center background/base) */}
              <motion.div
                className="w-[85%] max-w-[420px] relative z-10"
                style={{ transform: 'rotate(-2deg)' }}
              >
                <img 
                  src="/assets/notebook_3d_clean.png" 
                  alt="Notebook" 
                  className="w-full object-contain filter drop-shadow-[0_20px_40px_rgba(22,35,58,0.07)]"
                />
                
                {/* Overlay text on open notebook to make it feel premium & alive */}
                <div 
                  className="absolute inset-0 flex items-center justify-center p-8 select-none pointer-events-none"
                  style={{ transform: 'rotate(2deg)' }}
                >
                  <p className="font-handwritten text-[#6B6560] text-[20px] lg:text-[24px] max-w-[200px] text-center leading-snug mt-[-10px]">
                    "Small steps every day lead to big changes." ♡
                  </p>
                </div>
              </motion.div>

              {/* Floating mascot Rin (top right of notebook) */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [1, -2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-[8%] right-[18%] w-44 z-30"
              >
                <img 
                  src="/assets/rin_mascot_3d_clean.png" 
                  alt="Rin Mascot" 
                  className="w-full object-contain filter drop-shadow-[0_24px_48px_rgba(22,35,58,0.14)]"
                />
              </motion.div>

              {/* Sparkle details */}
              <div className="absolute top-[18%] left-[20%] text-[#D4A373] opacity-30 animate-pulse">
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
              </div>
              <div className="absolute bottom-[35%] right-[15%] text-[#7DD3FC] opacity-35 animate-pulse delay-700">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
          FOR EDUCATORS
      ════════════════════════════════════════════ */}
      <Section
        id="educators"
        style={{ background: '#FFFDF9', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left side benefits */}
            <motion.div variants={fadeUp(0)} className="w-full lg:w-[45%] text-left">
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#D4A373] uppercase block mb-3">For Classrooms</span>
              <h2 className="text-[36px] lg:text-[48px] font-extrabold text-[#17263F] leading-tight mb-4 tracking-tight">
                For <span className="font-handwritten text-[#D4A373] text-[36px] lg:text-[44px] block lg:inline ml-0 lg:ml-2">Educators ♡</span>
              </h2>
              <p className="text-[16px] lg:text-[17px] text-[#6B6560] leading-relaxed mb-8">
                Rinhozo empowers educators with insights and tools to support every learner better.
              </p>

              <div className="space-y-4">
                {[
                  'Real-time attention and engagement insights',
                  'Personalized recommendations for each student',
                  'Track progress and learning patterns',
                  'Create supportive, inclusive classrooms'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-[#FBF3E8] border border-[#D4A373]/20 flex items-center justify-center flex-shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4A373" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="text-[15px] font-bold text-[#17263F]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right side dashboard mockup */}
            <motion.div variants={fadeUp(0.12)} className="w-full lg:w-[55%] min-w-0">
              {/* Dashboard Browser Frame Mockup */}
              <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] shadow-[0_16px_48px_rgba(22,35,58,0.02)] overflow-hidden">
                {/* Browser Topbar */}
                <div className="bg-[#FAF6F0]/60 border-b border-[#17263F]/6 px-6 py-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F87171]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#6B6560] tracking-wider uppercase">Educator Dashboard</span>
                  <div className="w-6 h-6 rounded-full bg-[#FBF3E8] border border-[#D4A373]/25 flex items-center justify-center overflow-hidden">
                    <img src="/assets/rin_mascot_3d_clean.png" alt="Profile" className="w-4.5 h-4.5 object-contain" />
                  </div>
                </div>
                
                {/* Mockup Dashboard Content */}
                <div className="p-6 text-left">
                  <h3 className="text-[16px] font-bold text-[#17263F] mb-0.5">Welcome back, Teacher! 💛</h3>
                  <p className="text-[11px] text-[#6B6560] mb-5 leading-none">Here's what's happening in your class today.</p>
                  
                  {/* Four Metric Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                    {[
                      { val: '28', label: 'Students' },
                      { val: '18', label: 'Focused Now' },
                      { val: '5', label: 'Needs Support' },
                      { val: '76%', label: 'Avg. Progress' }
                    ].map((card, i) => (
                      <div key={i} className="bg-[#FAF6F0]/30 border border-[#17263F]/6 rounded-2xl p-4 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-[#6B6560] tracking-wider uppercase leading-none">{card.label}</span>
                        <span className="text-[24px] font-black text-[#17263F] mt-2.5 leading-none">{card.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Focus & Top Activities Side-by-Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Focus Overview (SVG Line Chart) */}
                    <div className="bg-[#FAF6F0]/30 border border-[#17263F]/6 rounded-2xl p-4 flex flex-col justify-between">
                      <span className="text-[10px] font-bold text-[#6B6560] tracking-wider uppercase mb-3 block">Focus Overview</span>
                      <div className="w-full h-24 relative">
                        <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#D4A373" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#D4A373" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M 0,35 Q 15,25 30,15 T 60,30 T 90,10 T 100,5 L 100,40 L 0,40 Z" fill="url(#chartGrad)" />
                          <path d="M 0,35 Q 15,25 30,15 T 60,30 T 90,10 T 100,5" fill="none" stroke="#D4A373" strokeWidth="2.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-[8px] text-[#A09790] font-bold mt-2 leading-none">
                        <span>9 AM</span><span>11 AM</span><span>1 PM</span><span>3 PM</span><span>5 PM</span>
                      </div>
                    </div>

                    {/* Top Activities (Progress Bars) */}
                    <div className="bg-[#FAF6F0]/30 border border-[#17263F]/6 rounded-2xl p-4 text-left">
                      <span className="text-[10px] font-bold text-[#6B6560] tracking-wider uppercase mb-3 block">Top Activities</span>
                      <div className="space-y-3">
                        {[
                          { label: 'Reading', val: 85, color: '#D4A373' },
                          { label: 'Math', val: 70, color: '#7DD3FC' },
                          { label: 'Science', val: 62, color: '#C084FC' },
                          { label: 'Writing', val: 45, color: '#86EFAC' }
                        ].map((act, i) => (
                          <div key={i} className="flex flex-col gap-1">
                            <div className="flex justify-between text-[10px] font-bold text-[#17263F] leading-none">
                              <span>{act.label}</span>
                              <span style={{ color: act.color }}>{act.val}%</span>
                            </div>
                            <div className="h-1.5 bg-[#FAF6F0] rounded-full overflow-hidden border border-[#17263F]/4">
                              <div className="h-full rounded-full" style={{ width: `${act.val}%`, backgroundColor: act.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Educators Bottom CTA Banner */}
          <motion.div 
            variants={fadeUp(0.25)}
            className="mt-16 bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(22,35,58,0.01)] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#FBF3E8] border border-[#D4A373]/20 flex items-center justify-center flex-shrink-0">
                <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" className="w-10 h-10 object-contain" />
              </div>
              <p className="text-[15px] lg:text-[16px] font-bold text-[#17263F] max-w-[540px] leading-snug">
                "Together, we can create classrooms where every child feels seen and supported."
              </p>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-[#17263F] hover:bg-[#1E2E4A] text-white font-bold text-sm tracking-wide px-8 py-4.5 rounded-full transition-all active:scale-[0.98] shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              Get Started for Free <ArrowRight size={16} />
            </button>
          </motion.div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════ */}
      <Section
        id="about"
        style={{ background: '#FAF6F0', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

          {/* About Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 mb-16">
            <motion.div variants={fadeUp(0)} className="max-w-[600px] w-full text-left">
              <span className="text-[12px] font-bold tracking-[0.2em] text-[#D4A373] uppercase block mb-3">About us</span>
              <h2 className="text-[36px] lg:text-[48px] font-extrabold text-[#17263F] leading-tight mb-6 tracking-tight">
                About <span className="font-handwritten text-[#D4A373] text-[36px] lg:text-[44px] block lg:inline ml-0 lg:ml-2">Rinhozo ♡</span>
              </h2>
              <p className="text-[16px] lg:text-[17px] text-[#6B6560] leading-[1.75] mb-4">
                Rinhozo was created with a simple belief — every learner deserves to feel understood, supported, and empowered.
              </p>
              <p className="text-[16px] lg:text-[17px] text-[#6B6560] leading-[1.75]">
                We combine AI, neuroscience, and empathy to build a learning companion that adapts to neurodiverse minds and helps them shine in their own way.
              </p>
            </motion.div>
            
            {/* Mascot on Right */}
            <motion.div 
              variants={fadeUp(0.12)} 
              className="flex-1 flex justify-center lg:justify-end pr-16 relative"
            >
              <div className="absolute top-[20%] right-[10%] w-72 h-72 rounded-full bg-radial from-[#D4A373]/10 to-transparent blur-2xl pointer-events-none" />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-56 h-56 relative z-10"
              >
                <img 
                  src="/assets/rin_mascot_3d_clean.png" 
                  alt="Rin Mascot" 
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(22,35,58,0.10)]"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Three Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { num: '1000+', label: 'Happy Learners', icon: <Heart size={20} className="text-[#F87171] fill-[#F87171]/25" /> },
              { num: '500+', label: 'Educators Trust Us', icon: <GraduationCap size={20} className="text-[#D4A373]" /> },
              { num: '98%', label: 'Positive Feedback', icon: <Star size={20} className="text-[#D4A373] fill-[#D4A373]/25" /> }
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp(0.2 + i * 0.08)}
                className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_32px_rgba(22,35,58,0.01)] flex flex-col items-center justify-center text-center transition-all hover:translate-y-[-4px] hover:shadow-[0_12px_40px_rgba(22,35,58,0.04)]"
              >
                <span className="text-[36px] font-black text-[#17263F] mb-2">{stat.num}</span>
                <span className="text-[13px] font-bold text-[#6B6560] uppercase tracking-wider mb-4">{stat.label}</span>
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center border border-[#17263F]/4">
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission Card */}
          <motion.div
            variants={fadeUp(0.4)}
            className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_32px_rgba(22,35,58,0.01)] flex flex-col md:flex-row items-center justify-between gap-8 text-left transition-all hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(22,35,58,0.03)]"
          >
            <div className="flex-1">
              <h3 className="text-[18px] font-bold text-[#17263F] mb-3 uppercase tracking-wider">Our Mission</h3>
              <p className="text-[15px] lg:text-[16px] text-[#6B6560] leading-relaxed max-w-[620px]">
                To create a world where every learner, regardless of their challenges, has access to personalized, empathetic, and effective learning experiences.
              </p>
            </div>
            
            {/* Plant & Stones visual element on right */}
            <div className="w-36 h-28 relative flex items-end justify-center bg-[#FAF6F0] border border-[#17263F]/4 rounded-2xl p-4 overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-radial from-[#D4A373]/8 to-transparent blur-md pointer-events-none" />
              {/* Stylized SVG potted plant */}
              <svg className="w-16 h-16 z-10" viewBox="0 0 64 64" fill="none">
                <path d="M24 44L20 60H44L40 44H24Z" fill="#D4A373" opacity="0.85" />
                <ellipse cx="32" cy="44" rx="10" ry="2" fill="#6B6560" />
                <path d="M32 44V22" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M32 32Q22 28 20 20" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
                <path d="M32 26Q42 22 44 14" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
                <path d="M32 22C32 22 29 14 32 8C35 14 32 22 32 22Z" fill="#86EFAC" opacity="0.9" />
                <path d="M20 20C20 20 12 21 8 16C13 13 20 20 20 20Z" fill="#86EFAC" opacity="0.8" />
                <path d="M44 14C44 14 52 13 56 8C52 6 44 14 44 14Z" fill="#86EFAC" opacity="0.85" />
              </svg>
              {/* Stones */}
              <div className="absolute bottom-2 left-4 w-7 h-4 bg-[#6B6560]/10 rounded-full border border-[#17263F]/4" style={{ transform: 'rotate(-5deg)' }} />
              <div className="absolute bottom-2 right-4 w-5 h-3.5 bg-[#6B6560]/15 rounded-full border border-[#17263F]/4" style={{ transform: 'rotate(10deg)' }} />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════ */}
      <Section
        id="contact"
        style={{ background: '#FFFDF9', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          
          {/* Header */}
          <motion.div variants={fadeUp(0)} className="max-w-[600px] w-full text-left mb-16">
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#D4A373] uppercase block mb-3">Get in Touch</span>
            <h2 className="text-[36px] lg:text-[48px] font-extrabold text-[#17263F] leading-tight mb-2 tracking-tight">
              We'd love to <span className="font-handwritten text-[#D4A373] text-[36px] lg:text-[44px] block lg:inline ml-0 lg:ml-2">hear from you ♡</span>
            </h2>
            <p className="text-[16px] lg:text-[17px] text-[#6B6560] leading-relaxed max-w-[480px]">
              Have questions or want to learn more? We're here to help!
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-start relative pb-32">
            
            {/* Left side details */}
            <div className="w-full lg:w-[40%] flex flex-col gap-4 text-left">
              {[
                { icon: <Mail size={18} className="text-[#D4A373]" />, label: 'Email', value: 'hello@rinhozo.com', desc: 'Reach out anytime' },
                { icon: <Phone size={18} className="text-[#D4A373]" />, label: 'Phone', value: '+1 (555) 123-4567', desc: 'Mon-Fri from 9am to 6pm' },
                { icon: <MapPin size={18} className="text-[#D4A373]" />, label: 'Address', value: '123 Learning Lane', desc: 'San Francisco, CA 94110' }
              ].map((info, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp(0.1 + i * 0.08)}
                  className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-2xl p-5 flex items-start gap-4 shadow-[0_4px_20px_rgba(22,35,58,0.01)] hover:border-[#D4A373]/25 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] flex items-center justify-center border border-[#17263F]/4 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#6B6560] uppercase tracking-wider block mb-0.5">{info.label}</span>
                    <span className="text-[14px] font-bold text-[#17263F] block leading-tight">{info.value}</span>
                    <span className="text-[12px] text-[#6B6560] block mt-0.5">{info.desc}</span>
                  </div>
                </motion.div>
              ))}

              {/* Social Icons */}
              <motion.div variants={fadeUp(0.35)} className="flex items-center gap-3 mt-4 pl-1">
                <span className="text-[12px] font-bold text-[#6B6560] uppercase tracking-wider mr-2">Follow Us</span>
                {['instagram', 'twitter', 'linkedin'].map((social, i) => (
                  <button 
                    key={i}
                    className="w-10 h-10 rounded-full bg-[#FFFDF9] border border-[#17263F]/6 flex items-center justify-center text-[#6B6560] hover:text-[#17263F] hover:border-[#D4A373]/30 transition-all hover:translate-y-[-2px] active:scale-95 cursor-pointer shadow-sm"
                  >
                    {social === 'instagram' && (
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    )}
                    {social === 'twitter' && (
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    )}
                    {social === 'linkedin' && (
                      <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    )}
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Right side form */}
            <motion.div 
              variants={fadeUp(0.18)}
              className="w-full lg:w-[60%] bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-6 lg:p-8 shadow-[0_8px_32px_rgba(22,35,58,0.02)] text-left relative z-10"
            >
              <h3 className="text-[18px] font-bold text-[#17263F] mb-6">Send us a message</h3>
              <form onSubmit={e => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#6B6560] uppercase tracking-wider pl-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-[#FAF6F0]/40 border border-[#17263F]/6 rounded-2xl px-5 py-3.5 text-sm text-[#17263F] placeholder-[#A09790] focus:outline-none focus:border-[#D4A373]/50 transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-[#6B6560] uppercase tracking-wider pl-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. jane@example.com"
                      className="w-full bg-[#FAF6F0]/40 border border-[#17263F]/6 rounded-2xl px-5 py-3.5 text-sm text-[#17263F] placeholder-[#A09790] focus:outline-none focus:border-[#D4A373]/50 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#6B6560] uppercase tracking-wider pl-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    className="w-full bg-[#FAF6F0]/40 border border-[#17263F]/6 rounded-2xl px-5 py-3.5 text-sm text-[#17263F] placeholder-[#A09790] focus:outline-none focus:border-[#D4A373]/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[#6B6560] uppercase tracking-wider pl-1">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us more about your needs..."
                    className="w-full bg-[#FAF6F0]/40 border border-[#17263F]/6 rounded-2xl px-5 py-3.5 text-sm text-[#17263F] placeholder-[#A09790] focus:outline-none focus:border-[#D4A373]/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#17263F] hover:bg-[#1E2E4A] text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto"
                >
                  Send Message <Send size={14} />
                </button>
              </form>
            </motion.div>

            {/* Bottom Right Decoration: Mascot + stacked books labeled Curiosity, Focus, Growth */}
            <div className="absolute right-0 bottom-0 z-20 hidden lg:flex items-end justify-end">
              <div className="relative w-72 h-56 flex items-end justify-center select-none pointer-events-none">
                
                {/* Stacked books (lower right) */}
                <motion.div
                  className="absolute bottom-[-16px] right-24 w-48 z-10"
                  style={{ transform: 'rotate(-4deg)' }}
                >
                  <img 
                    src="/assets/stacked_books_3d_clean.png" 
                    alt="Stacked Books" 
                    className="w-full object-contain filter drop-shadow-[0_8px_16px_rgba(22,35,58,0.06)]"
                  />
                  {/* Labels on book spines */}
                  <span className="absolute top-[28%] left-[28%] text-[8px] font-extrabold text-[#6B6560] tracking-wider uppercase opacity-85" style={{ transform: 'rotate(2deg)' }}>Curiosity</span>
                  <span className="absolute top-[48%] left-[34%] text-[9px] font-extrabold text-[#17263F] tracking-wider uppercase opacity-85" style={{ transform: 'rotate(1deg)' }}>Focus</span>
                  <span className="absolute top-[68%] left-[30%] text-[8px] font-extrabold text-[#6B6560] tracking-wider uppercase opacity-85" style={{ transform: 'rotate(0deg)' }}>Growth</span>
                </motion.div>

                {/* Mascot Rin next to books holding coffee cup */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-[-24px] right-[-16px] w-36 z-20"
                >
                  <img 
                    src="/assets/rin_mascot_3d_clean.png" 
                    alt="Rin Mascot" 
                    className="w-full object-contain filter drop-shadow-[0_16px_32px_rgba(22,35,58,0.12)]"
                  />
                  {/* Overlay small coffee cup */}
                  <motion.div 
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-[10%] left-[-12px] w-12 z-30"
                  >
                    <img src="/assets/coffee_cup_3d_clean.png" alt="Cup" className="w-full object-contain" />
                  </motion.div>
                </motion.div>

              </div>
            </div>

          </div>

          {/* Bottom CTA Banner */}
          <motion.div 
            variants={fadeUp(0.45)}
            className="mt-16 bg-[#FFFDF9] border border-[#17263F]/6 rounded-full px-8 py-4 shadow-[0_4px_20px_rgba(22,35,58,0.01)] inline-flex items-center gap-3.5 mx-auto"
          >
            <Sprout size={16} className="text-[#D4A373] animate-bounce" />
            <span className="text-[13px] font-bold text-[#17263F] tracking-wide">
              Thank you for being part of the Rinhozo journey. 💛
            </span>
          </motion.div>

        </div>
      </Section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer style={{ background: '#17263F', padding: '48px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }} className="justify-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: 'rgba(212,165,116,0.15)', border: '1px solid rgba(212,165,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.7)' }}>RINHOZO</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', margin: 0 }}>
            © {new Date().getFullYear()} Rinhozo. Made with care for every student.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(label => (
              <button key={label} onClick={() => goto(label.toLowerCase() === 'contact' ? 'contact' : 'home')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Rin chat bubble ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        onClick={onGetStarted}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 50,
          background: '#FFFDF9', borderRadius: '20px 20px 6px 20px',
          padding: '14px 18px', maxWidth: 220,
          boxShadow: '0 8px 32px rgba(22,35,58,0.12)',
          border: '1px solid rgba(22,35,58,0.06)',
          display: 'flex', alignItems: 'flex-start', gap: 12,
          cursor: 'pointer', transition: 'all 0.22s ease',
        }}
        whileHover={{ y: -3, boxShadow: '0 14px 40px rgba(22,35,58,0.16)' }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#FBF3E8', border: '1.5px solid #F0D4A8', flexShrink: 0 }}>
          <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#17263F', marginBottom: 3 }}>Hi! I'm Rinhozo 👋</div>
          <p style={{ fontSize: 11.5, color: '#6B6560', lineHeight: 1.55, margin: 0 }}>
            I'm here to guide, encourage, and learn with you — every step of the way.
          </p>
          <span style={{ fontSize: 11, color: '#D4A373', display: 'block', textAlign: 'right', marginTop: 4 }}>♡</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
