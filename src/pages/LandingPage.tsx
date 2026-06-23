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
  Sparkles
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle scroll trigger for navigation background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // 3D Perspective Tilt Values
  const tiltRin = {
    transform: `rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg) translateZ(30px)`,
    transition: 'transform 0.15s ease-out'
  };

  const tiltBadge = (factor: number) => ({
    transform: `rotateY(${mousePos.x * 25 * factor}deg) rotateX(${-mousePos.y * 25 * factor}deg) translateZ(60px)`,
    transition: 'transform 0.15s ease-out'
  });

  // Animation delay profiles
  const animHeading = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' as const } }
  };

  const animSubheading = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: 'easeOut' as const } }
  };

  const animButtons = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' as const } }
  };

  const animJellyfish = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' as const } }
  };

  const animPills = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.5, ease: 'easeOut' as const } }
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'how' },
    { label: 'For Educators', id: 'educators' },
    { label: 'About', id: 'about' }
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#FAF6F0] text-[#1E293B] flex flex-col relative font-sans overflow-x-hidden select-none"
    >
      <span className="sr-only">{strings.landingTitle} {strings.landingSubtitle}</span>

      {/* SECTION 1: NAVIGATION BAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF6F0] shadow-[0_4px_24px_rgba(30,41,59,0.08)] border-b border-[#FAF6F0]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg 
              className="w-6 h-6 text-[#D4A574] fill-none stroke-current" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a7 7 0 0 0-7-7z" />
              <path d="M9 14v3" />
              <path d="M12 14v4" />
              <path d="M15 14v3" />
            </svg>
            <span className="text-[14px] font-semibold tracking-[0.2em] text-[#1E293B]">RINHOZO</span>
          </div>

          {/* Center Links (Desktop only) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-[#F5E6D3] text-[#1E293B] px-4 py-2 rounded-full font-semibold'
                    : 'text-[#1E293B] hover:bg-[#F5E6D3] hover:text-[#1E293B] px-4 py-2 rounded-full'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onGetStarted}
              className="flex items-center gap-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white px-6 py-3 rounded-full text-[14px] font-medium shadow-md hover:shadow-lg transition-all group cursor-pointer"
            >
              Get Started
              <motion.span 
                className="inline-block"
                variants={{
                  hover: { x: 4 }
                }}
                whileHover="hover"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#1E293B] hover:bg-[#F5E6D3] rounded-full transition-all cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 bg-[#FAF6F0] z-40 flex flex-col p-6 gap-6 md:hidden border-t border-[#E7E5E4]"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-lg font-medium py-3 border-b border-[#E7E5E4]/50 cursor-pointer ${
                    activeTab === link.id ? 'text-[#D4A574]' : 'text-[#1E293B]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 2: HERO SECTION */}
      <main id="home" className="flex-1 w-full flex flex-col lg:flex-row items-center justify-between z-10 gap-12 relative min-h-[calc(100vh-80px)] px-6 md:px-12 pt-[120px] pb-16 bg-[url('/assets/cozy_desk_bg.png')] bg-cover bg-center bg-no-repeat">
        
        {/* LEFT ZONE (55% width) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[55%] flex flex-col justify-center text-left gap-6 z-10 lg:pl-16"
        >
          {/* Hero Heading */}
          <motion.div variants={animHeading} className="flex flex-col">
            <h1 className="text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#1E293B] leading-[1.2] tracking-tight">
              Learning
            </h1>
            <h1 className="text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#1E293B] leading-[1.2] tracking-tight">
              that listens
            </h1>
            <div className="flex items-center pl-8 pt-1.5 md:pt-2">
              <span className="font-handwritten text-[#D4A574] text-[36px] md:text-[40px] lg:text-[48px] leading-[1.2] inline-flex items-center gap-2">
                to you
                <svg className="w-6 h-6 text-[#D4A574] fill-none stroke-current animate-pulse" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p 
            variants={animSubheading} 
            className="text-[#78716C] text-[18px] max-w-[480px] leading-[1.6]"
          >
            Rinhozo is a companion that understands your pace, supports your journey, and <span className="font-semibold text-[#1E293B]">grows</span> alongside you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={animButtons} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button 
              onClick={onGetStarted}
              className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#0F172A] text-white px-8 py-4 rounded-full text-[16px] font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              Start Your Journey
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button 
              onClick={onGetStarted}
              className="flex items-center justify-center gap-3 bg-transparent hover:bg-[#F5E6D3] text-[#1E293B] border border-[#E7E5E4] px-8 py-4 rounded-full text-[16px] font-medium shadow-sm transition-all cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full border border-[#1E293B]/20 flex items-center justify-center text-[#1E293B] bg-white">
                <Play size={10} fill="currentColor" className="ml-0.5" />
              </span>
              See How It Works
            </button>
          </motion.div>

          {/* Feature Pills Container Banner */}
          <motion.div 
            variants={animPills}
            className="bg-white border border-[#E7E5E4]/80 rounded-[24px] p-6 shadow-[0_8px_32px_rgba(30,41,59,0.06)] flex flex-col sm:flex-row justify-between items-center gap-8 w-full max-w-[500px]"
          >
            {/* Pill 1 */}
            <div className="flex flex-col items-center gap-2 text-center flex-1">
              <div className="text-[#7DD3FC]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0M3 15c2.5-1.5 5.5-1.5 8 0s5.5 1.5 8 0" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-[#1E293B] leading-tight">Learn at your pace</span>
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-[#E7E5E4]"></div>

            {/* Pill 2 */}
            <div className="flex flex-col items-center gap-2 text-center flex-1">
              <div className="text-[#D4A574]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a7 7 0 0 0-7-7z" />
                  <path d="M9 14v3" />
                  <path d="M12 14v4" />
                  <path d="M15 14v3" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-[#1E293B] leading-tight">Supported by Rin</span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-[#E7E5E4]"></div>

            {/* Pill 3 */}
            <div className="flex flex-col items-center gap-2 text-center flex-1">
              <div className="text-[#86EFAC]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 19V5M12 9a4 4 0 0 0-4-4M12 13a4 4 0 0 1 4-4" />
                </svg>
              </div>
              <span className="text-[13px] font-medium text-[#1E293B] leading-tight">Small steps, big growth</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT ZONE (45% width on desktop) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={animJellyfish}
          className="w-full lg:w-[45%] flex flex-col items-center justify-center z-10 relative lg:min-h-[500px]"
        >
          {/* Centered Glowing Mascot Jellyfish Container */}
          <div 
            style={tiltRin}
            className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] flex items-center justify-center perspective-3d"
          >
            {/* Constellation link lines overlay */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 400">
              <path d="M 70 50 Q 135 125 200 200" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="4 4" />
              <path d="M 330 55 Q 265 125 200 200" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="4 4" />
              <path d="M 30 200 Q 115 200 200 200" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="4 4" />
              <path d="M 370 210 Q 285 205 200 200" fill="none" stroke="#FDE68A" strokeWidth="2.5" strokeDasharray="4 4" />
            </svg>

            {/* Glowing Jellyfish */}
            <div className="relative w-full h-full flex items-center justify-center animate-float">
              {/* Pulsing Aura */}
              <motion.div 
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[#FDE68A] rounded-full blur-3xl opacity-40 w-[80%] h-[80%] mx-auto my-auto shadow-[0_0_60px_rgba(253,230,138,0.4)]"
              />

              {/* 3D Mascot Image */}
              <img 
                src="/assets/rin_mascot_3d_clean.png" 
                alt="Glowing Rin Mascot" 
                className="w-[90%] h-[90%] object-contain select-none filter drop-shadow([0_12px_24px_rgba(30,41,59,0.08)]) z-10"
              />
            </div>

            {/* Floating Shortcut Icons */}
            {/* Icon 1: Lightbulb (Top-Left) */}
            <motion.div 
              style={tiltBadge(1.1)}
              animate={{
                y: [0, -6, 0],
                rotate: [0, 4, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[10px] left-[30px] bg-white border border-[#E7E5E4] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.06)] hover:scale-110 transition-transform duration-200 cursor-pointer z-20"
              title="Lightbulb"
            >
              <Lightbulb size={20} className="text-[#D4A574]" fill="currentColor" fillOpacity={0.1} />
            </motion.div>

            {/* Icon 2: Chart (Top-Right) */}
            <motion.div 
              style={tiltBadge(1.2)}
              animate={{
                y: [0, -8, 0],
                rotate: [0, -4, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[15px] right-[40px] bg-white border border-[#E7E5E4] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.06)] hover:scale-110 transition-transform duration-200 cursor-pointer z-20"
              title="Analytics"
            >
              <BarChart3 size={20} className="text-[#7DD3FC]" />
            </motion.div>

            {/* Icon 3: Book (Mid-Left) */}
            <motion.div 
              style={tiltBadge(0.9)}
              animate={{
                y: [0, -5, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[180px] left-[-10px] bg-white border border-[#E7E5E4] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.06)] hover:scale-110 transition-transform duration-200 cursor-pointer z-20"
              title="Lessons"
            >
              <BookOpen size={20} className="text-[#D4A574]" />
            </motion.div>

            {/* Icon 4: Puzzle (Mid-Right) */}
            <motion.div 
              style={tiltBadge(1.05)}
              animate={{
                y: [0, -7, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[190px] right-[-10px] bg-white border border-[#E7E5E4] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.06)] hover:scale-110 transition-transform duration-200 cursor-pointer z-20"
              title="Mini games"
            >
              <Puzzle size={20} className="text-[#78716C]" />
            </motion.div>
          </div>

          {/* Stack of 3 Books (Curiosity, Focus, Growth) */}
          <div className="hidden lg:block absolute bottom-12 right-28 w-[140px] z-0 select-none">
            <img 
              src="/assets/stacked_books_3d_clean.png" 
              alt="Books stack" 
              className="w-full h-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
            />
          </div>
        </motion.div>

        {/* SECTION 4: NOTEBOOK ELEMENT (Centering bridge) */}
        <div className="hidden lg:block absolute bottom-4 left-[50%] -translate-x-1/2 w-[340px] h-[160px] transform rotate-1 hover:rotate-0 transition-transform duration-300 z-20">
          {/* Notebook 3D Background */}
          <img 
            src="/assets/notebook_3d_clean.png" 
            alt="Notebook background" 
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
          />
          
          {/* Left page text */}
          <div className="absolute left-[30px] top-[24px] w-[120px] text-left text-[13px] font-handwritten text-[#D4A574] leading-relaxed rotate-2 select-none">
            <p className="border-b border-[#e5dec9]/40 pb-0.5">You're doing</p>
            <p className="border-b border-[#e5dec9]/40 pb-0.5">better than</p>
            <p>you think.</p>
          </div>

          {/* Right page text */}
          <div className="absolute left-[170px] top-[24px] w-[120px] text-left text-[13px] font-handwritten text-[#D4A574] leading-relaxed rotate-2 select-none">
            <p className="border-b border-[#e5dec9]/40 pb-0.5">Keep going.</p>
            <p>♡</p>
          </div>
        </div>

        {/* Scattered smooth pebbles */}
        <div className="hidden lg:block absolute bottom-6 left-32 flex gap-4 select-none">
          <div className="w-5 h-3 bg-white/70 rounded-full shadow-sm rotate-12"></div>
          <div className="w-6 h-3.5 bg-white/80 rounded-full shadow-sm -rotate-6"></div>
        </div>
        <div className="hidden lg:block absolute bottom-4 left-[38%] w-5 h-3 bg-white/70 rounded-full shadow-sm rotate-45 select-none"></div>
        <div className="hidden lg:block absolute bottom-8 right-16 w-5 h-3 bg-white/60 rounded-full shadow-sm -rotate-12 select-none"></div>

      </main>

      {/* SECTION: FEATURES */}
      <section id="features" className="w-full bg-white py-16 md:py-24 px-6 md:px-12 z-20 border-t border-[#E7E5E4]/50 relative">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase block mb-3">Core Features</span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1E293B] leading-tight mb-4 tracking-tight">Designed for Multilingual & Diverse Minds</h2>
          <p className="text-[#78716C] text-[16px] max-w-[600px] mx-auto mb-16 leading-relaxed">
            Rinhozo makes learning feel natural, engaging, and stress-free. Every gesture is designed with care to keep your mind focused.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#FAF6F0] p-8 rounded-[24px] border border-[#E7E5E4]/40 hover:translate-y-[-6px] transition-all duration-300 text-left clay-card">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D4A574] mb-6 shadow-sm">
                <Globe size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1E293B] mb-3">Hinglish-First & Localized</h3>
              <p className="text-[#78716c] text-[14px] leading-relaxed">
                Conceptual translation that matches how we naturally speak at home. Supporting Hinglish, English, Hindi, and Tamil.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#FAF6F0] p-8 rounded-[24px] border border-[#E7E5E4]/40 hover:translate-y-[-6px] transition-all duration-300 text-left clay-card">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#7DD3FC] mb-6 shadow-sm">
                <Puzzle size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1E293B] mb-3">Tactile Card Swiping</h3>
              <p className="text-[#78716c] text-[14px] leading-relaxed">
                Swipe-to-learn cards designed to reduce cognitive load and help neurodivergent learners focus on one concept at a time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#FAF6F0] p-8 rounded-[24px] border border-[#E7E5E4]/40 hover:translate-y-[-6px] transition-all duration-300 text-left clay-card">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#D4A574] mb-6 shadow-sm">
                <Sparkles size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1E293B] mb-3">Adaptive Learning</h3>
              <p className="text-[#78716c] text-[14px] leading-relaxed">
                Choose visual models, direct concept cards, stories, or audio-guided reading. Rinhozo adapts dynamically.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#FAF6F0] p-8 rounded-[24px] border border-[#E7E5E4]/40 hover:translate-y-[-6px] transition-all duration-300 text-left clay-card">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#86EFAC] mb-6 shadow-sm">
                <WifiOff size={24} />
              </div>
              <h3 className="text-[18px] font-semibold text-[#1E293B] mb-3">Offline-First Design</h3>
              <p className="text-[#78716c] text-[14px] leading-relaxed">
                Full offline capability. Learning progress is stored in IndexedDB and syncs seamlessly when back online.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section id="how" className="w-full bg-[#FAF6F0] py-16 md:py-24 px-6 md:px-12 z-20 border-t border-[#E7E5E4]/50 relative">
        <div className="max-w-[1200px] mx-auto text-center">
          <span className="text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase block mb-3">Roadmap</span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1E293B] leading-tight mb-4 tracking-tight">Your Path to Mastery in 3 Simple Steps</h2>
          <p className="text-[#78716C] text-[16px] max-w-[600px] mx-auto mb-16 leading-relaxed">
            Rinhozo guides you seamlessly through lessons, adapting to your style as you progress.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#D4A574] flex items-center justify-center text-[20px] font-bold text-[#D4A574] mb-6 shadow-md">
                1
              </div>
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-3">Choose Your Style</h3>
              <p className="text-[#78716c] text-[14px] max-w-[280px] leading-relaxed">
                Pick your preferred learning language (Hinglish/Hindi/Tamil/English) and customized content presentation style.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#7DD3FC] flex items-center justify-center text-[20px] font-bold text-[#7DD3FC] mb-6 shadow-md">
                2
              </div>
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-3">Swipe Through Lessons</h3>
              <p className="text-[#78716c] text-[14px] max-w-[280px] leading-relaxed">
                Review byte-sized visual/story conceptual cards at your own pace. Solve check-in quizzes as you swipe.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#86EFAC] flex items-center justify-center text-[20px] font-bold text-[#86EFAC] mb-6 shadow-md">
                3
              </div>
              <h3 className="text-[20px] font-semibold text-[#1E293B] mb-3">Conquer Boss Battles</h3>
              <p className="text-[#78716c] text-[14px] max-w-[280px] leading-relaxed">
                Test your conceptual knowledge in boss challenges to evolve your jellyfish guide (Rin) and unlock new study rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FOR EDUCATORS */}
      <section id="educators" className="w-full bg-white py-16 md:py-24 px-6 md:px-12 z-20 border-t border-[#E7E5E4]/50 relative">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          <div className="w-full lg:w-[50%] text-left">
            <span className="text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase block mb-3">For Classrooms</span>
            <h2 className="text-[32px] md:text-[36px] font-bold text-[#1E293B] leading-tight mb-6 tracking-tight">Empower Every Student, Bridging Learning Gaps</h2>
            <p className="text-[#78716C] text-[16px] mb-8 leading-relaxed">
              Educators can monitor student learning progress offline, deploy customizable curriculum modules, and address neurodiverse needs with Rinhozo's built-in multi-modal adapters.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#86EFAC]/20 flex items-center justify-center text-[#86EFAC]">✓</span>
                <span className="text-[15px] font-semibold text-[#1E293B]">Individual student progress analytics</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#86EFAC]/20 flex items-center justify-center text-[#86EFAC]">✓</span>
                <span className="text-[15px] font-semibold text-[#1E293B]">Neurodivergent-friendly accessibility guidelines</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#86EFAC]/20 flex items-center justify-center text-[#86EFAC]">✓</span>
                <span className="text-[15px] font-semibold text-[#1E293B]">Full offline classroom compatibility</span>
              </div>
            </div>

            <button 
              onClick={onGetStarted}
              className="flex items-center gap-1.5 bg-[#1E293B] hover:bg-[#0F172A] text-white px-8 py-4 rounded-full text-[15px] font-medium shadow-md transition-all group cursor-pointer"
            >
              Learn More for Schools
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="w-full lg:w-[45%] flex justify-center">
            <div className="bg-[#FAF6F0] p-6 rounded-[28px] border border-[#E7E5E4]/50 shadow-[0_8px_32px_rgba(30,41,59,0.04)] w-full max-w-[440px] text-left clay-card">
              <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-widest block mb-4">Classroom Dashboard</span>
              <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4]/30 shadow-sm mb-4">
                <span className="text-[12px] font-bold text-[#1E293B] block">Average Class Streak</span>
                <span className="text-[28px] font-bold text-[#D4A574]">14 Days 🔥</span>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-[#E7E5E4]/30 shadow-sm">
                <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider block mb-3">Student Style Distribution</span>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1">
                      <span>Story Analogies</span>
                      <span>55%</span>
                    </div>
                    <div className="w-full h-2 bg-[#FAF6F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4A574]" style={{ width: '55%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1">
                      <span>Visual Models</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full h-2 bg-[#FAF6F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#7DD3FC]" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ABOUT */}
      <section id="about" className="w-full bg-[#FAF6F0] py-16 md:py-24 px-6 md:px-12 z-20 border-t border-[#E7E5E4]/50 relative">
        <div className="max-w-[800px] mx-auto text-center">
          <span className="text-[12px] font-bold text-[#D4A574] tracking-[0.2em] uppercase block mb-3">About Us</span>
          <h2 className="text-[32px] md:text-[36px] font-bold text-[#1E293B] leading-tight mb-6 tracking-tight">Our Mission: Education Belongs to Everyone</h2>
          <p className="text-[#78716C] text-[16px] mb-8 leading-relaxed max-w-[640px] mx-auto">
            Rinhozo was born from a simple belief: learning should adapt to the student, not the other way around. By combining language personalization, cognitive scaffolding, and friendly visual support, we help students conquer study barriers one concept at a time.
          </p>

          <div className="relative inline-block bg-white p-6 rounded-2xl border border-[#E7E5E4]/30 shadow-sm max-w-[320px] mb-12 rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
            <span className="font-handwritten text-[#D4A574] text-[24px]">
              Education belongs to everyone. ♡
            </span>
          </div>

          <div>
            <button 
              onClick={onGetStarted}
              className="bg-[#1E293B] hover:bg-[#0F172A] text-white px-8 py-4 rounded-full text-[15px] font-semibold shadow-md transition-all cursor-pointer"
            >
              Join Rinhozo Today
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: RIN CHAT BUBBLE */}
      <div className="fixed z-40 bg-white rounded-[24px] rounded-br-[4px] p-5 shadow-[0_8px_32px_rgba(30,41,59,0.12)] border border-[#E7E5E4]/60 flex items-start gap-3.5 hover:scale-105 transition-transform duration-300 cursor-pointer bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-[280px] md:left-auto md:right-8 md:bottom-8 md:translate-x-0 md:w-auto">
        {/* Tiny avatar */}
        <div className="w-8 h-8 rounded-full bg-[#FDE68A]/30 flex items-center justify-center flex-shrink-0 border border-white/50 overflow-hidden">
          <img src="/assets/rin_mascot_3d_clean.png" alt="Mini Rin" className="w-6 h-6 object-contain" />
        </div>
        
        {/* Text and waving hand custom SVG */}
        <div className="flex flex-col text-left">
          <span className="text-[14px] font-semibold text-[#1E293B] flex items-center gap-1">
            Hi! I'm Rinhozo
            <svg 
              className="w-4 h-4 text-[#D4A574] animate-[wave_1.5s_infinite] origin-[70%_70%] inline-block" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A2.5 2.5 0 0019.5 6a2.5 2.5 0 00-2 1 2.5 2.5 0 00-4.5 1.5V11m-3-1V7.5a2.5 2.5 0 00-5 0V11m3-4V5a2.5 2.5 0 00-5 0v11a6 6 0 006 6h2a6 6 0 006-6v-2" />
            </svg>
          </span>
          <p className="text-[13px] font-normal text-[#78716C] leading-[1.5] mt-1">
            I'm here to guide, encourage, and learn with you — every step of the way.
          </p>
          <span className="text-[10px] text-[#D4A574] self-end mt-1.5">♡</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#f5e6d3]/20 border-t border-[#E7E5E4]/50 py-6 text-center text-xs font-semibold text-[#78716c] tracking-wider uppercase z-20">
        © {new Date().getFullYear()} Rinhozo. Made with care for every student.
      </footer>
    </div>
  );
};

export default LandingPage;
