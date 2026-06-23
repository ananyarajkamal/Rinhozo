import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, Menu, X,
  Brain, Eye, Puzzle, BarChart3, GraduationCap, TrendingUp,
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
    <motion.div variants={fadeUp(delay)} className="premium-card p-8 flex flex-col gap-5">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: bg, color }}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-[18px] font-bold text-[#16233A] mb-2 leading-snug">{title}</h3>
        <p className="text-[15px] text-[#6B6560] leading-[1.65]">{desc}</p>
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
  ];

  const features = [
    { icon: <Brain size={24} />, color: '#D6A15F', bg: '#FBF3E8', title: 'Adaptive Learning', desc: 'Personalized content that adjusts based on your attention patterns and learning style.' },
    { icon: <Eye size={24} />, color: '#7DD3FC', bg: '#EFF9FF', title: 'Attention Insights', desc: 'Detects focus levels in real time and recommends gentle, helpful interventions.' },
    { icon: <Puzzle size={24} />, color: '#C084FC', bg: '#FAF0FF', title: 'Neurodiverse Friendly', desc: 'Designed specifically for ADHD, dyslexia, and a wide spectrum of learning differences.' },
    { icon: <BarChart3 size={24} />, color: '#86EFAC', bg: '#F0FDF4', title: 'Learning Analytics', desc: 'Track progress, visualize learning behaviors, and celebrate every milestone along the way.' },
    { icon: <GraduationCap size={24} />, color: '#D6A15F', bg: '#FBF3E8', title: 'Educator Dashboard', desc: 'Actionable insights and class-wide trends to help teachers support every unique learner.' },
    { icon: <TrendingUp size={24} />, color: '#F87171', bg: '#FFF1F1', title: 'Growth Journey', desc: 'Visual learning milestones and personal achievements that keep motivation high.' },
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
        style={{ background: '#fff', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>

          {/* Header */}
          <motion.div variants={fadeUp(0)} style={{ maxWidth: 640, marginBottom: 64 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D6A15F', display: 'block', marginBottom: 16 }}>
              Core Features
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#16233A', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              Everything a learner needs,<br />thoughtfully designed
            </h2>
            <p style={{ fontSize: 17, color: '#6B6560', lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
              Rinhozo is built from the ground up for how real learners actually learn — with compassion, flexibility, and intelligence baked in.
            </p>
          </motion.div>

          {/* 3-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 0.07} />
            ))}
          </div>
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

          <motion.div variants={fadeUp(0)} style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 72px' }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D6A15F', display: 'block', marginBottom: 16 }}>
              Roadmap
            </span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#16233A', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              Your path to mastery in<br />3 simple steps
            </h2>
            <p style={{ fontSize: 17, color: '#6B6560', lineHeight: 1.7, margin: 0 }}>
              Rinhozo guides you seamlessly through lessons, adapting to your style as you grow.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { num: '01', color: '#D6A15F', bg: 'rgba(214,161,95,0.1)', title: 'Choose Your Style', desc: 'Pick your preferred learning language — Hinglish, Hindi, Tamil, or English — and your content presentation style.' },
              { num: '02', color: '#7DD3FC', bg: 'rgba(125,211,252,0.12)', title: 'Swipe Through Lessons', desc: 'Review byte-sized visual cards at your own pace. Solve check-in quizzes as you swipe through each concept.' },
              { num: '03', color: '#86EFAC', bg: 'rgba(134,239,172,0.12)', title: 'Conquer Boss Battles', desc: 'Test your knowledge in boss challenges to evolve your jellyfish guide Rin and unlock new study rooms.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp(i * 0.1)}
                style={{
                  background: '#fff', borderRadius: 24, padding: 40,
                  border: '1px solid rgba(22,35,58,0.06)',
                  boxShadow: '0 4px 24px rgba(22,35,58,0.05)',
                  transition: 'all 0.28s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(22,35,58,0.10)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(22,35,58,0.05)'; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 16, background: s.bg, border: `2px solid ${s.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: s.color, marginBottom: 24 }}>
                  {s.num}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#16233A', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
          FOR EDUCATORS
      ════════════════════════════════════════════ */}
      <Section
        id="educators"
        style={{ background: '#fff', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 80 }} className="flex-col lg:flex-row">

            <motion.div variants={fadeUp(0)} style={{ flex: '0 0 auto', maxWidth: 520, width: '100%' }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D6A15F', display: 'block', marginBottom: 16 }}>For Classrooms</span>
              <h2 style={{ fontSize: 'clamp(30px, 3.5vw, 44px)', fontWeight: 800, color: '#16233A', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
                Empower every student.<br />Bridge every gap.
              </h2>
              <p style={{ fontSize: 17, color: '#6B6560', lineHeight: 1.75, margin: '0 0 36px' }}>
                Educators can monitor student learning progress offline, deploy customizable curriculum modules, and address neurodiverse needs with Rinhozo's built-in multi-modal adapters.
              </p>

              {['Individual student progress analytics', 'Neurodivergent-friendly accessibility guidelines', 'Full offline classroom compatibility'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(134,239,172,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#16233A' }}>{item}</span>
                </div>
              ))}

              <button
                onClick={onGetStarted}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#16233A', color: '#fff', padding: '18px 32px', borderRadius: 9999, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: 40, boxShadow: '0 4px 20px rgba(22,35,58,0.22)', transition: 'all 0.22s ease', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#1E2E4A'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#16233A'; }}
              >
                Learn More for Schools <ArrowRight size={16} />
              </button>
            </motion.div>

            <motion.div variants={fadeUp(0.12)} style={{ flex: 1, minWidth: 0 }}>
              <div style={{ background: '#FAF6F0', borderRadius: 24, padding: 28, border: '1px solid rgba(22,35,58,0.07)', boxShadow: '0 4px 32px rgba(22,35,58,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Classroom Dashboard</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#D6A15F', background: '#FBF3E8', padding: '4px 12px', borderRadius: 9999 }}>Live</span>
                </div>
                <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid rgba(22,35,58,0.06)', marginBottom: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6560', marginBottom: 6 }}>Average Class Streak</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: '#D6A15F', lineHeight: 1 }}>14 Days 🔥</div>
                </div>
                <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid rgba(22,35,58,0.06)' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#6B6560', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>Student Style Distribution</div>
                  {[
                    { label: 'Story Analogies', pct: 55, color: '#D6A15F' },
                    { label: 'Visual Models', pct: 30, color: '#7DD3FC' },
                    { label: 'Direct Cards', pct: 15, color: '#86EFAC' },
                  ].map((bar, i) => (
                    <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, color: '#16233A', marginBottom: 6 }}>
                        <span>{bar.label}</span><span style={{ color: bar.color }}>{bar.pct}%</span>
                      </div>
                      <div style={{ height: 6, background: '#F5EFE8', borderRadius: 9999, overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${bar.pct}%` }}
                          viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.15 }}
                          style={{ height: '100%', borderRadius: 9999, background: bar.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════ */}
      <Section
        id="about"
        style={{ background: '#FAF6F0', padding: '120px 0', borderTop: '1px solid rgba(22,35,58,0.06)' } as React.CSSProperties}
      >
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
          <motion.div variants={fadeUp(0)}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D6A15F', display: 'block', marginBottom: 16 }}>About Us</span>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#16233A', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
              Education belongs<br />to everyone
            </h2>
            <p style={{ fontSize: 18, color: '#6B6560', lineHeight: 1.8, margin: '0 0 56px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
              Rinhozo was born from a simple belief: learning should adapt to the student, not the other way around. By combining language personalization, cognitive scaffolding, and friendly visual support, we help every learner conquer barriers — one concept at a time.
            </p>

            <div style={{ display: 'inline-block', marginBottom: 56 }}>
              <div
                style={{ background: '#fff', border: '1px solid rgba(22,35,58,0.08)', boxShadow: '0 4px 24px rgba(22,35,58,0.07)', borderRadius: 20, padding: '24px 36px', transform: 'rotate(-1.2deg)', transition: 'transform 0.3s ease', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'rotate(-1.2deg)'; }}
              >
                <span className="font-handwritten" style={{ fontSize: 26, color: '#C49A6C', lineHeight: 1.4 }}>
                  "Education belongs to everyone." ♡
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={onGetStarted}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#16233A', color: '#fff', padding: '18px 40px', borderRadius: 9999, fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(22,35,58,0.22)', transition: 'all 0.22s ease', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#1E2E4A'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#16233A'; }}
              >
                Join Rinhozo Today <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer style={{ background: '#16233A', padding: '48px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: 'rgba(214,161,95,0.15)', border: '1px solid rgba(214,161,95,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" style={{ width: 24, height: 24, objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.7)' }}>RINHOZO</span>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.32)', margin: 0 }}>
            © {new Date().getFullYear()} Rinhozo. Made with care for every student.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(label => (
              <button key={label} onClick={onGetStarted} style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'inherit' }}
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
          background: '#fff', borderRadius: '20px 20px 6px 20px',
          padding: '14px 18px', maxWidth: 220,
          boxShadow: '0 8px 32px rgba(22,35,58,0.14)',
          border: '1px solid rgba(22,35,58,0.08)',
          display: 'flex', alignItems: 'flex-start', gap: 12,
          cursor: 'pointer', transition: 'all 0.22s ease',
        }}
        whileHover={{ y: -3, boxShadow: '0 14px 40px rgba(22,35,58,0.18)' }}
      >
        <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: '#FBF3E8', border: '1.5px solid #F0D4A8', flexShrink: 0 }}>
          <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#16233A', marginBottom: 3 }}>Hi! I'm Rinhozo 👋</div>
          <p style={{ fontSize: 11.5, color: '#6B6560', lineHeight: 1.55, margin: 0 }}>
            I'm here to guide, encourage, and learn with you — every step of the way.
          </p>
          <span style={{ fontSize: 11, color: '#D6A15F', display: 'block', textAlign: 'right', marginTop: 4 }}>♡</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
