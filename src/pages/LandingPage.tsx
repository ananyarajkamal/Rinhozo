import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Play, Pause, Volume2, Clock,
  Sparkles, BookOpen, Star, Bell, Mail,
  RotateCcw, Lock,
  FileText, Award, LayoutDashboard, Timer,
  BarChart3, Lightbulb, Users, HeartHandshake, Settings,
  Trophy, Compass
} from 'lucide-react';

interface LandingPageProps {
  strings?: any;
  onGetStarted?: () => void;
}

/* ─── FADE UP ANIMATION FOR FIGMA SHOTS ─── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
});

export const LandingPage: React.FC<LandingPageProps> = ({ strings: _strings, onGetStarted: _onGetStarted }) => {
  /* SCREEN STATE: 1 to 12 */
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [, setIsMobileNavOpen] = useState(false);

  /* SHARED DATA STATES (BINDING PROTOTYPE DYNAMICS) */
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGrade, setUserGrade] = useState('');
  const [learningGoal, setLearningGoal] = useState('');
  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>([]);
  const [preferredStudyTime, setPreferredStudyTime] = useState('Evening (6 PM - 9 PM)');

  /* AUTH STATE */
  const [isGuest, setIsGuest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  /* ASSESSMENT STATE */
  const [assessmentVal, setAssessmentVal] = useState<number>(3); // 1 to 5 (Never, Rarely, Sometimes, Often, Always)

  /* PREFERENCES STATE */
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(['visual', 'interactive', 'bursts']);

  /* FOCUS TIMER STATE */
  const [timerSeconds, setTimerSeconds] = useState(1493); // 24:53
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerProgress] = useState(2); // 2/10 cards
  const [focusStreak] = useState(7);
  const [focusScore] = useState(82);

  /* MOOD TRACKER */
  const [userMood, setUserMood] = useState<'happy' | 'concerned' | 'excited' | 'calm'>('calm');

  /* ACCESSIBILITY & SETTINGS STATES */
  const [reduceDistractions, setReduceDistractions] = useState(false);
  const [softColors, setSoftColors] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const [notifStudy, setNotifStudy] = useState(true);
  const [notifBreak, setNotifBreak] = useState(true);
  const [notifGoal, setNotifGoal] = useState(true);
  const [notifMascot, setNotifMascot] = useState(true);

  const [sessionLength, setSessionLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(20);
  const [bgMusic, setBgMusic] = useState('Lo-Fi beats');

  /* COUNTDOWN TIMER EFFECT */
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /* SUBJECT TOOGLE HELPER */
  const toggleSubject = (subj: string) => {
    if (favoriteSubjects.includes(subj)) {
      setFavoriteSubjects(favoriteSubjects.filter(s => s !== subj));
    } else {
      setFavoriteSubjects([...favoriteSubjects, subj]);
    }
  };

  /* PREFERENCE TOGGLE HELPER */
  const togglePref = (prefId: string) => {
    if (selectedPrefs.includes(prefId)) {
      setSelectedPrefs(selectedPrefs.filter(p => p !== prefId));
    } else {
      setSelectedPrefs([...selectedPrefs, prefId]);
    }
  };

  /* RENDER 3D JELLYFISH MASCOT (RIN) WITH BIOLUMINESCENT MOOD GLOW */
  const renderMascot = (size = 180, isFloating = true, isTilted = true) => {
    const glowColors = {
      happy: 'rgba(214, 161, 95, 0.45)', // gold
      concerned: 'rgba(248, 113, 113, 0.45)', // rose
      excited: 'rgba(125, 211, 252, 0.55)', // cyan
      calm: 'rgba(183, 216, 143, 0.45)' // soft green
    };

    return (
      <div 
        className="relative inline-flex items-center justify-center select-none"
        style={{ width: size, height: size }}
      >
        {/* Soft internal light emission */}
        <motion.div
          animate={{ 
            scale: [0.94, 1.06, 0.94],
            opacity: [0.6, 0.9, 0.6]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColors[userMood]} 0%, transparent 65%)`,
            filter: 'blur(16px)',
            zIndex: 1
          }}
        />

        {/* Mascot PNG with Apple-style floating float motion */}
        <motion.div
          animate={isFloating ? { y: [0, -12, 0] } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full flex items-center justify-center relative z-10"
          style={{ transform: isTilted ? 'rotate(-6deg)' : 'none' }}
        >
          <img 
            src="/assets/rin_mascot_3d_clean.png" 
            alt="Rin Mascot" 
            className="w-[90%] h-[90%] object-contain filter drop-shadow-[0_16px_32px_rgba(22,35,58,0.12)]"
          />
        </motion.div>

        {/* Magical floating sparkles */}
        <div className="absolute top-[10%] left-[20%] text-[#D4A373] opacity-35 animate-pulse">
          <Sparkles size={16} />
        </div>
        <div className="absolute bottom-[25%] right-[15%] text-[#8AB6D6] opacity-30 animate-pulse delay-500">
          <Sparkles size={14} />
        </div>
      </div>
    );
  };

  /* SHARED SIDEBAR FOR SCREENS 5 to 12 */
  const renderSidebar = () => {
    const menuItems = [
      { id: 5, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { id: 6, label: 'Focus Mode', icon: <Timer size={20} /> },
      { id: 7, label: 'Insights', icon: <BarChart3 size={20} /> },
      { id: 8, label: 'AI Tips', icon: <Lightbulb size={20} /> },
      { id: 9, label: 'Growth Journey', icon: <Trophy size={20} /> },
      { id: 10, label: 'Educators', icon: <Users size={20} /> },
      { id: 11, label: 'Parents', icon: <HeartHandshake size={20} /> },
      { id: 12, label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
      <aside className="w-20 lg:w-24 bg-white border-r border-[#17263F]/6 flex flex-col items-center py-8 justify-between shrink-0 select-none">
        {/* Brand Logo */}
        <button 
          onClick={() => setCurrentScreen(1)} 
          className="w-12 h-12 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          <img src="/assets/rin_mascot_3d_clean.png" alt="Rin logo" className="w-10 h-10 object-contain transform rotate-[-8deg]" />
        </button>

        {/* Navigation Grid */}
        <nav className="flex flex-col gap-3.5">
          {menuItems.map(item => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative group cursor-pointer ${
                  isActive 
                    ? 'bg-[#17263F] text-white shadow-md' 
                    : 'text-[#8C847B] hover:text-[#17263F] hover:bg-[#FAF6F0]'
                }`}
              >
                {item.icon}
                {/* Tooltip */}
                <span className="absolute left-16 bg-[#17263F] text-white text-[11px] font-bold tracking-wide py-1 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Small Rin mascot head marker at the bottom */}
        <div className="flex flex-col items-center gap-1 opacity-70">
          <span className="text-[10px] font-bold text-[#8C847B] tracking-wider uppercase">Rin</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-pulse" />
        </div>
      </aside>
    );
  };

  return (
    <div 
      className={`min-h-screen flex flex-col bg-[#FAF6F0] text-[#17263F] font-sans selection:bg-[#D4A373]/20 transition-all duration-300 ${
        dyslexiaFont ? 'dyslexia-font' : ''
      } ${highContrast ? 'high-contrast-mode' : ''}`}
      style={{ 
        fontFamily: dyslexiaFont ? "'Comic Sans MS', cursive, sans-serif" : "'Plus Jakarta Sans', Inter, sans-serif" 
      }}
    >
      
      {/* ════════════════════════════════════════════
          APP WRAPPER OR MAIN GRID
      ════════════════════════════════════════════ */}
      <div className="flex-1 flex min-h-screen">
        
        {/* Render sidebar for dashboard screens (5 to 12) */}
        {currentScreen >= 5 && currentScreen <= 12 && renderSidebar()}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto px-6 py-8 lg:p-12">
          
          {/* SCREEN 1: Welcome to Rin */}
          {currentScreen === 1 && (
            <div className="max-w-[900px] mx-auto w-full px-4 py-8 flex flex-col justify-center items-center min-h-[90vh]">
              {/* Outer Card Wrapper */}
              <div className="relative w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#EFEBE4] border border-[#17263F]/8 rounded-[32px] px-6 py-12 md:p-16 flex flex-col items-center justify-between shadow-[0_16px_40px_rgba(22,36,63,0.05)] overflow-hidden min-h-[640px]">
                
                {/* 1. Welcome to Rin Badge */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-[#17263F]/6 rounded-full px-6 py-2 shadow-[0_4px_12px_rgba(22,36,63,0.03)] text-xs md:text-sm font-extrabold text-[#17263F] z-30 select-none whitespace-nowrap">
                  1. Welcome to Rin
                </div>

                {/* Top-left Brand Logo */}
                <div className="absolute top-6 left-8 flex items-center gap-2 select-none z-20">
                  <img src="/assets/rin_mascot_3d_clean.png" alt="Rin mascot" className="w-6 h-6 object-contain transform rotate-[-8deg]" />
                  <span className="text-[11px] font-black tracking-[0.2em] text-[#17263F]">RINHOZO</span>
                </div>

                {/* Ambient props in card background (desktop only for clean spacing) */}
                {/* Left Side: Leafy Plant Pot */}
                <div className="hidden md:flex absolute left-[6%] bottom-[8%] z-10 flex-col items-center pointer-events-none select-none">
                  {/* Leaves */}
                  <div className="flex gap-1.5 mb-[-4px] relative z-10">
                    <div className="w-4 h-9 bg-[#A8C686] rounded-full rotate-[-25deg] origin-bottom-right shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />
                    <div className="w-5 h-11 bg-[#96B873] rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />
                    <div className="w-4 h-9 bg-[#A8C686] rounded-full rotate-[25deg] origin-bottom-left shadow-[0_2px_4px_rgba(0,0,0,0.05)]" />
                  </div>
                  {/* Pot */}
                  <div className="w-16 h-14 bg-[#E5D5C5] border border-[#17263F]/8 rounded-b-2xl rounded-t-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)]" />
                </div>

                {/* Right Side: Plant in background */}
                <div className="hidden md:block absolute right-[6%] top-[8%] z-10 opacity-60 pointer-events-none select-none">
                  <div className="flex gap-1 mb-[-4px] relative z-10">
                    <div className="w-3 h-7 bg-[#A8C686] rounded-full rotate-[-20deg] origin-bottom-right" />
                    <div className="w-4 h-8 bg-[#96B873] rounded-full" />
                    <div className="w-3 h-7 bg-[#A8C686] rounded-full rotate-[20deg] origin-bottom-left" />
                  </div>
                  <div className="w-12 h-10 bg-[#E5D5C5]/85 border border-[#17263F]/6 rounded-b-xl rounded-t-sm shadow-sm" />
                </div>

                {/* Right Side: Stacked books (Curiosity, Focus, Growth) */}
                <div className="hidden md:block absolute right-[5%] bottom-[16%] w-[160px] z-10 rotate-[-2deg] filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.05)] pointer-events-none select-none">
                  <img src="/assets/stacked_books_3d_clean.png" alt="Stacked Books" className="w-full object-contain" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-[8px] font-black text-[#17263F]/75 tracking-wider gap-3.5 select-none">
                    <span className="uppercase mt-[8px]">Curiosity</span>
                    <span className="uppercase ml-2">Focus</span>
                    <span className="uppercase mr-1 mb-1">Growth</span>
                  </div>
                </div>

                {/* Right Side: Coffee cup */}
                <div className="hidden md:block absolute bottom-[3%] right-[11%] w-[96px] z-20 rotate-[6deg] filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.04)] pointer-events-none select-none">
                  <img src="/assets/coffee_cup_3d_clean.png" alt="Coffee Cup" className="w-full object-contain" />
                </div>

                {/* Center Mascot & Floating Cards Section */}
                <div className="relative w-full max-w-[480px] h-[280px] flex items-center justify-center mt-6 z-20">
                  {/* Floating particles background glow */}
                  <div className="absolute w-[280px] h-[280px] rounded-full bg-radial from-[#D4A373]/12 via-[#D4A373]/3 to-transparent blur-2xl pointer-events-none" />
                  
                  {/* Mascot */}
                  <div className="absolute z-20">
                    {renderMascot(260, true, false)}
                  </div>

                  {/* Floating cards with icons */}
                  {/* 1. Lightbulb (Top-Left) */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute left-[12%] top-[15%] z-30 bg-[#FFFDF9] border border-[#17263F]/6 rounded-2xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center hover:scale-105 transition-all select-none"
                  >
                    <Lightbulb size={24} className="text-[#D4A373]" />
                  </motion.div>

                  {/* 2. Book (Bottom-Left) */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute left-[6%] bottom-[18%] z-30 bg-[#FFFDF9] border border-[#17263F]/6 rounded-2xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center hover:scale-105 transition-all select-none"
                  >
                    <BookOpen size={24} className="text-[#D4A373]" />
                  </motion.div>

                  {/* 3. Puzzle Piece (Top-Right) */}
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                    className="absolute right-[12%] top-[12%] z-30 bg-[#FFFDF9] border border-[#17263F]/6 rounded-2xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center hover:scale-105 transition-all rotate-[6deg] select-none"
                  >
                    <Compass size={24} className="text-[#8AB6D6]" />
                  </motion.div>

                  {/* 4. Growth/Bar Chart (Bottom-Right) */}
                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                    className="absolute right-[6%] bottom-[22%] z-30 bg-[#FFFDF9] border border-[#17263F]/6 rounded-2xl p-3 shadow-[0_8px_20px_rgba(0,0,0,0.04)] flex items-center justify-center hover:scale-105 transition-all rotate-[-6deg] select-none"
                  >
                    <BarChart3 size={24} className="text-[#8AB6D6]" />
                  </motion.div>
                </div>

                {/* Welcome Title and Subtitle */}
                <div className="text-center mt-6 z-20">
                  <h1 className="text-[32px] md:text-[38px] font-black text-[#17263F] leading-tight tracking-tight mb-2.5 flex items-center justify-center gap-2">
                    Welcome to Rinhozo
                    <span className="text-[#D4A373] text-[26px] font-normal leading-none inline-block transform translate-y-[2px]">♡</span>
                  </h1>
                  <p className="text-[14px] md:text-[15px] text-[#6E665E] font-medium max-w-[420px] mx-auto mb-8 leading-relaxed">
                    Let's create a learning experience<br />that understands you.
                  </p>
                </div>

                {/* Primary Actions Group */}
                <div className="w-full max-w-[340px] flex flex-col gap-3.5 z-20">
                  <button
                    onClick={() => setCurrentScreen(14)}
                    className="w-full bg-[#17263F] hover:bg-[#253958] text-white font-bold text-[15px] py-4.5 rounded-[18px] transition-all active:scale-[0.98] shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    Start Journey <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => setCurrentScreen(13)}
                    className="w-full bg-[#FFFDF9] hover:bg-[#FAF6F0] border border-[#17263F]/8 text-[#17263F] font-bold text-[15px] py-4.5 rounded-[18px] transition-all active:scale-[0.98] cursor-pointer shadow-sm"
                  >
                    I already have an account
                  </button>
                </div>

                {/* Cozy Bottom Footnote */}
                <p className="text-[11px] text-[#8C847B] font-bold mt-8 z-20 select-none tracking-wide text-center">
                  Rinhozo is here to support you every step of the way.
                </p>

              </div>
            </div>
          )}

          {/* SCREEN 2: Profile Setup (wizard) */}
          {currentScreen === 2 && (
            <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-between h-full">
              {/* Wizard Nav */}
              <div className="flex items-center justify-between mb-12">
                <button 
                  onClick={() => setCurrentScreen(1)}
                  className="flex items-center gap-2 text-sm font-bold text-[#8C847B] hover:text-[#17263F]"
                >
                  <ArrowLeft size={16} /> Back to welcome
                </button>
                <span className="text-xs font-bold text-[#8C847B] uppercase tracking-wider">Step 1 of 4</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-stretch">
                {/* Left indicators */}
                <div className="lg:col-span-3 flex flex-col justify-center gap-4 text-left border-r border-[#17263F]/6 pr-8">
                  {[
                    { num: '1', label: 'Profile', active: true },
                    { num: '2', label: 'Assessment', active: false },
                    { num: '3', label: 'Preferences', active: false },
                    { num: '4', label: 'Finish', active: false }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 py-2 opacity-90">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
                        step.active ? 'bg-[#17263F] text-white border-[#17263F]' : 'border-[#17263F]/20 text-[#8C847B]'
                      }`}>
                        {step.num}
                      </div>
                      <span className={`text-sm font-bold ${step.active ? 'text-[#17263F]' : 'text-[#8C847B]'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Form Card */}
                <div className="lg:col-span-6 flex flex-col justify-center text-left">
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                    <h2 className="text-[32px] font-extrabold text-[#17263F] tracking-tight mb-1">
                      Let's get to know you <span className="font-handwritten text-[#D4A373] text-[28px] inline-block ml-1">♡</span>
                    </h2>
                    <p className="text-[14px] text-[#6E665E] font-medium mb-6">This helps Rin personalize your learning journey.</p>
                    
                    <div className="space-y-4">
                      {/* Name & Age */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">First Name</label>
                          <input 
                            type="text" 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Ananya"
                            className="bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] px-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Age</label>
                          <input 
                            type="text" 
                            value={userAge}
                            onChange={(e) => setUserAge(e.target.value)}
                            placeholder="13"
                            className="bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] px-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50"
                          />
                        </div>
                      </div>

                      {/* Grade & Goal */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Grade</label>
                          <input 
                            type="text" 
                            value={userGrade}
                            onChange={(e) => setUserGrade(e.target.value)}
                            placeholder="8th Grade"
                            className="bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] px-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Learning Goal</label>
                          <input 
                            type="text" 
                            value={learningGoal}
                            onChange={(e) => setLearningGoal(e.target.value)}
                            placeholder="Improve focus and grades"
                            className="bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] px-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50"
                          />
                        </div>
                      </div>

                      {/* Favorite Subjects */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Favorite Subjects</label>
                        <div className="flex flex-wrap gap-2 py-1">
                          {['Mathematics', 'Science', 'Art', 'History', 'Geography'].map(subj => {
                            const isFav = favoriteSubjects.includes(subj);
                            return (
                              <button
                                key={subj}
                                onClick={() => toggleSubject(subj)}
                                className={`text-[12px] font-bold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                                  isFav 
                                    ? 'bg-[#17263F] border-[#17263F] text-white shadow-sm' 
                                    : 'border-[#17263F]/8 bg-[#FAF6F0]/50 hover:bg-[#F6F0E8] text-[#6E665E]'
                                }`}
                              >
                                {subj}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Study Time */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Preferred Study Time</label>
                        <select
                          value={preferredStudyTime}
                          onChange={(e) => setPreferredStudyTime(e.target.value)}
                          className="bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] px-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50 appearance-none cursor-pointer"
                        >
                          <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                          <option value="Evening (6 PM - 9 PM)">Evening (6 PM - 9 PM)</option>
                          <option value="Night (9 PM - 12 AM)">Night (9 PM - 12 AM)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side mascot */}
                <div className="lg:col-span-3 flex flex-col justify-center items-center">
                  {renderMascot(220, true, true)}
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-2xl px-5 py-3 mt-4 text-[12px] font-bold text-[#6E665E] leading-snug max-w-[200px] text-center shadow-sm">
                    "Hi {userName || 'there'}! Let's fill out your profile details so we can get started." 💛
                  </div>
                </div>
              </div>

              {/* Wizard Footer Buttons */}
              <div className="flex justify-between items-center mt-12 border-t border-[#17263F]/6 pt-6">
                <button
                  onClick={() => setCurrentScreen(1)}
                  className="bg-white hover:bg-[#F6F0E8] border border-[#17263F]/12 text-[#17263F] font-bold text-sm px-6 py-3 rounded-full transition-all active:scale-[0.98] cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentScreen(3)}
                  className="bg-[#17263F] hover:bg-[#253958] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all active:scale-[0.98] shadow-md cursor-pointer flex items-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 3: Neurodiverse Assessment */}
          {currentScreen === 3 && (
            <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-between h-full">
              {/* Wizard Nav */}
              <div className="flex items-center justify-between mb-12">
                <button 
                  onClick={() => setCurrentScreen(2)}
                  className="flex items-center gap-2 text-sm font-bold text-[#8C847B] hover:text-[#17263F]"
                >
                  <ArrowLeft size={16} /> Back to profile setup
                </button>
                <span className="text-xs font-bold text-[#8C847B] uppercase tracking-wider">Step 2 of 4</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-stretch">
                {/* Left indicators */}
                <div className="lg:col-span-3 flex flex-col justify-center gap-4 text-left border-r border-[#17263F]/6 pr-8">
                  {[
                    { num: '1', label: 'Profile', active: false },
                    { num: '2', label: 'Assessment', active: true },
                    { num: '3', label: 'Preferences', active: false },
                    { num: '4', label: 'Finish', active: false }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 py-2 opacity-90">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
                        step.active ? 'bg-[#17263F] text-white border-[#17263F]' : 'border-[#17263F]/20 text-[#8C847B]'
                      }`}>
                        {step.num}
                      </div>
                      <span className={`text-sm font-bold ${step.active ? 'text-[#17263F]' : 'text-[#8C847B]'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Form Card */}
                <div className="lg:col-span-6 flex flex-col justify-center text-left">
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                    <h2 className="text-[32px] font-extrabold text-[#17263F] tracking-tight mb-1">
                      Help us understand you better <span className="font-handwritten text-[#D4A373] text-[28px] inline-block ml-1">♡</span>
                    </h2>
                    <p className="text-[14px] text-[#6E665E] font-medium mb-8">There are no right or wrong answers.</p>
                    
                    <div className="bg-[#F6F0E8]/50 border border-[#17263F]/6 rounded-[20px] p-6 mb-8 text-center">
                      <p className="text-[17px] font-bold text-[#17263F] leading-relaxed">
                        "I find it difficult to maintain attention during long study sessions."
                      </p>
                    </div>

                    {/* Interactive Slider Track */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center text-xs font-bold text-[#8C847B] px-1 uppercase tracking-wider">
                        <span>Never</span>
                        <span>Always</span>
                      </div>
                      
                      {/* Slider Input */}
                      <div className="relative px-2">
                        <input 
                          type="range" 
                          min="1" 
                          max="5" 
                          step="1"
                          value={assessmentVal}
                          onChange={(e) => setAssessmentVal(Number(e.target.value))}
                          className="w-full accent-[#D4A373] h-2 bg-[#F6F0E8] rounded-lg appearance-none cursor-pointer focus:outline-none"
                        />
                        {/* Interactive labels under slider track */}
                        <div className="flex justify-between text-[11px] font-extrabold text-[#6E665E] mt-3">
                          <span className={assessmentVal === 1 ? 'text-[#D4A373]' : ''}>Never</span>
                          <span className={assessmentVal === 2 ? 'text-[#D4A373]' : ''}>Rarely</span>
                          <span className={assessmentVal === 3 ? 'text-[#D4A373]' : ''}>Sometimes</span>
                          <span className={assessmentVal === 4 ? 'text-[#D4A373]' : ''}>Often</span>
                          <span className={assessmentVal === 5 ? 'text-[#D4A373]' : ''}>Always</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom encouragement notification */}
                    <div className="mt-8 border-t border-[#17263F]/6 pt-6 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-[#FBF3E8] flex items-center justify-center border border-[#D4A373]/25 flex-shrink-0">
                        <img src="/assets/rin_mascot_3d_clean.png" alt="Rin" className="w-7 h-7 object-contain" />
                      </div>
                      <p className="text-[12px] font-bold text-[#6E665E]">
                        "There are no wrong answers. We're here to support you." 💛
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side mascot */}
                <div className="lg:col-span-3 flex flex-col justify-center items-center">
                  {renderMascot(220, true, true)}
                </div>
              </div>

              {/* Wizard Footer Buttons */}
              <div className="flex justify-between items-center mt-12 border-t border-[#17263F]/6 pt-6">
                <button
                  onClick={() => setCurrentScreen(2)}
                  className="bg-white hover:bg-[#F6F0E8] border border-[#17263F]/12 text-[#17263F] font-bold text-sm px-6 py-3 rounded-full transition-all active:scale-[0.98] cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentScreen(4)}
                  className="bg-[#17263F] hover:bg-[#253958] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all active:scale-[0.98] shadow-md cursor-pointer flex items-center gap-2"
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4: Learning Preferences */}
          {currentScreen === 4 && (
            <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-between h-full">
              {/* Wizard Nav */}
              <div className="flex items-center justify-between mb-12">
                <button 
                  onClick={() => setCurrentScreen(3)}
                  className="flex items-center gap-2 text-sm font-bold text-[#8C847B] hover:text-[#17263F]"
                >
                  <ArrowLeft size={16} /> Back to assessment
                </button>
                <span className="text-xs font-bold text-[#8C847B] uppercase tracking-wider">Step 3 of 4</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto items-stretch">
                {/* Left indicators */}
                <div className="lg:col-span-3 flex flex-col justify-center gap-4 text-left border-r border-[#17263F]/6 pr-8">
                  {[
                    { num: '1', label: 'Profile', active: false },
                    { num: '2', label: 'Assessment', active: false },
                    { num: '3', label: 'Preferences', active: true },
                    { num: '4', label: 'Finish', active: false }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4 py-2 opacity-90">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border ${
                        step.active ? 'bg-[#17263F] text-white border-[#17263F]' : 'border-[#17263F]/20 text-[#8C847B]'
                      }`}>
                        {step.num}
                      </div>
                      <span className={`text-sm font-bold ${step.active ? 'text-[#17263F]' : 'text-[#8C847B]'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Form Card */}
                <div className="lg:col-span-6 flex flex-col justify-center text-left">
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
                    <h2 className="text-[32px] font-extrabold text-[#17263F] tracking-tight mb-1">
                      How do you learn best? <span className="font-handwritten text-[#D4A373] text-[28px] inline-block ml-1">♡</span>
                    </h2>
                    <p className="text-[14px] text-[#6E665E] font-medium mb-6">Select all that apply.</p>
                    
                    {/* Grid of 6 selectable cards */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { id: 'visual', label: 'Visual Learner', icon: <BookOpen size={20} /> },
                        { id: 'audio', label: 'Audio Learner', icon: <Volume2 size={20} /> },
                        { id: 'reading', label: 'Reading Learner', icon: <FileText size={20} /> },
                        { id: 'interactive', label: 'Interactive Learner', icon: <Compass size={20} /> },
                        { id: 'bursts', label: 'Short Study Bursts', icon: <Clock size={20} /> },
                        { id: 'pomodoro', label: 'Pomodoro Sessions', icon: <Timer size={20} /> }
                      ].map(pref => {
                        const isSel = selectedPrefs.includes(pref.id);
                        return (
                          <button
                            key={pref.id}
                            onClick={() => togglePref(pref.id)}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center justify-center text-center gap-3.5 transition-all select-none cursor-pointer relative overflow-hidden ${
                              isSel 
                                ? 'border-[#D4A373] bg-[#F6F0E8]/40 shadow-[0_4px_20px_rgba(212,163,115,0.15)] scale-[1.02]' 
                                : 'border-[#17263F]/6 hover:bg-[#FAF6F0] text-[#6E665E]'
                            }`}
                          >
                            {/* Inner gold glow when active */}
                            {isSel && (
                              <div className="absolute inset-0 bg-radial from-[#D4A373]/8 to-transparent pointer-events-none" />
                            )}
                            <div className={`p-2.5 rounded-xl ${isSel ? 'bg-[#17263F] text-white' : 'bg-[#FAF6F0] text-[#17263F]'}`}>
                              {pref.icon}
                            </div>
                            <span className="text-[13px] font-bold leading-tight text-[#17263F]">{pref.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right side mascot */}
                <div className="lg:col-span-3 flex flex-col justify-center items-center">
                  {renderMascot(220, true, true)}
                </div>
              </div>

              {/* Wizard Footer Buttons */}
              <div className="flex justify-between items-center mt-12 border-t border-[#17263F]/6 pt-6">
                <button
                  onClick={() => setCurrentScreen(3)}
                  className="bg-white hover:bg-[#F6F0E8] border border-[#17263F]/12 text-[#17263F] font-bold text-sm px-6 py-3 rounded-full transition-all active:scale-[0.98] cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentScreen(5)}
                  className="bg-[#17263F] hover:bg-[#253958] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all active:scale-[0.98] shadow-md cursor-pointer flex items-center gap-2"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: Dashboard */}
          {currentScreen === 5 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header block */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">
                    Good Evening, {userName || 'Learner'}! 🌸
                  </h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">
                    {isGuest && <span className="inline-flex items-center bg-[#F6F0E8] text-[#D4A373] text-[11px] font-bold px-3 py-1 rounded-full mr-2 uppercase tracking-wider">Guest Mode</span>}
                    {isLoggedIn && <span className="inline-flex items-center bg-[#E8F5E9] text-[#4CAF50] text-[11px] font-bold px-3 py-1 rounded-full mr-2 uppercase tracking-wider">✓ Signed In</span>}
                    Rin says: "You're doing better than you think." 💛
                  </p>
                </div>
                
                {/* Right profile widgets */}
                <div className="flex items-center gap-4">
                  {/* Alert notification bell */}
                  <button className="p-2.5 rounded-full border border-[#17263F]/8 hover:bg-[#FAF6F0] text-[#6E665E] relative cursor-pointer active:scale-95 transition-all">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E8B07A] animate-ping" />
                  </button>
                  {/* User Profile Face container */}
                  <button 
                    onClick={() => setCurrentScreen(12)}
                    className="w-10 h-10 rounded-full border-2 border-[#D4A373]/30 overflow-hidden bg-[#FAF6F0] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                  >
                    <img src="/assets/rin_mascot_3d_clean.png" alt="Profile" className="w-8 h-8 object-contain" />
                  </button>
                </div>
              </div>

              {/* Main dashboard widgets grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Widget 1: Focus Score */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:translate-y-[-2px] transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider">Today's Focus Score</span>
                    <Clock size={16} className="text-[#8AB6D6]" />
                  </div>
                  <div className="my-4">
                    <span className="text-[44px] font-black text-[#17263F] leading-none">{focusScore}</span>
                    <span className="text-[14px] text-[#8C847B] font-bold ml-1">/100</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#8AB6D6]">Great focus today!</span>
                </div>

                {/* Widget 2: Study Streak */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:translate-y-[-2px] transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider">Study Streak</span>
                    <Award size={16} className="text-[#D4A373]" />
                  </div>
                  <div className="my-4">
                    <span className="text-[44px] font-black text-[#17263F] leading-none">{focusStreak}</span>
                    <span className="text-[14px] text-[#8C847B] font-bold ml-1">days</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#D4A373]">Keep it up! 🔥</span>
                </div>

                {/* Widget 3: Recommended Session */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between hover:translate-y-[-2px] transition-all lg:col-span-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider">Recommended Session</span>
                    <span className="text-[10px] font-bold text-[#D4A373] bg-[#F6F0E8] px-2.5 py-1 rounded-full uppercase tracking-wider">Mathematics</span>
                  </div>
                  <div className="my-3">
                    <h3 className="text-[17px] font-bold text-[#17263F]">Math Practice</h3>
                    <p className="text-[12px] text-[#6E665E] mt-0.5">Algebra Basics • Review Linear Equations</p>
                  </div>
                  <button 
                    onClick={() => setCurrentScreen(6)}
                    className="bg-[#17263F] hover:bg-[#253958] text-white text-xs font-bold py-3 px-6 rounded-2xl w-full transition-all active:scale-[0.98] cursor-pointer shadow-sm text-center"
                  >
                    Start Session
                  </button>
                </div>

              </div>

              {/* Middle Row: Mood tracker & Weekly Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Mood Check-in Card */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <div>
                    <h4 className="text-[14px] font-bold text-[#17263F] mb-1">Mood Check-in</h4>
                    <p className="text-[12px] text-[#8C847B] font-semibold">How are you feeling right now?</p>
                  </div>
                  
                  {/* 5 click mood faces */}
                  <div className="flex justify-between items-center gap-1.5 my-6">
                    {[
                      { mood: 'concerned', emoji: '😢' },
                      { mood: 'concerned', emoji: '😐' },
                      { mood: 'calm', emoji: '😊' },
                      { mood: 'happy', emoji: '😄' },
                      { mood: 'excited', emoji: '🥳' }
                    ].map((face, i) => (
                      <button
                        key={i}
                        onClick={() => setUserMood(face.mood as any)}
                        className="w-11 h-11 text-2xl bg-[#FAF6F0] rounded-full border border-[#17263F]/6 hover:border-[#D4A373] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                      >
                        {face.emoji}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider text-center">
                    Active Mascot state: <span className="text-[#D4A373]">{userMood}</span>
                  </p>
                </div>

                {/* Progress Ring Card */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex items-center gap-6">
                  {/* SVG progress ring */}
                  <div className="w-24 h-24 relative flex-shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-[#FAF6F0]" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-[#D4A373]" strokeDasharray="68, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-[18px] font-black text-[#17263F] leading-none">68%</span>
                      <span className="text-[8px] font-bold text-[#8C847B] uppercase tracking-wider mt-0.5">Done</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#17263F] mb-1">Weekly Progress</h4>
                    <p className="text-[12px] text-[#6E665E] leading-relaxed">
                      You are close to hitting your goal! Completed 12 out of 18 lessons this week.
                    </p>
                  </div>
                </div>

                {/* Upcoming Goals Card */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between">
                  <h4 className="text-[14px] font-bold text-[#17263F] mb-3">Upcoming Goals</h4>
                  
                  <div className="space-y-2">
                    {[
                      { goal: 'Complete Science Quiz', date: 'Due Tomorrow', type: 'warn' },
                      { goal: 'Read 20 mins', date: 'Daily Goal', type: 'success' },
                      { goal: 'Finish Art Project', date: 'Due in 2 days', type: 'info' }
                    ].map((g, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-[#17263F]/4 last:border-0 text-left">
                        <span className="text-[12px] font-bold text-[#17263F] truncate max-w-[140px]">{g.goal}</span>
                        <span className="text-[9px] font-extrabold text-[#6E665E] uppercase tracking-wider">{g.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Mascot cheering floating area */}
              <div className="flex justify-end pr-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white border border-[#17263F]/6 rounded-2xl p-4 text-[12px] font-bold text-[#6E665E] max-w-[260px] shadow-sm relative">
                    "Awesome work today, {userName || 'friend'}! Let's check out our Focus Mode timer or look at our Attention Insights." 💛
                    <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-[#17263F]/6 rotate-45" />
                  </div>
                  {renderMascot(160, true, true)}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 6: Focus Mode */}
          {currentScreen === 6 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Focus Mode</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Minimize distractions and learn comfortably.</p>
                </div>
                {/* Back button */}
                <button 
                  onClick={() => setCurrentScreen(5)}
                  className="p-2.5 rounded-full border border-[#17263F]/8 hover:bg-[#FAF6F0] text-[#6E665E] cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Notebook illustration card */}
                <div className="lg:col-span-3 flex flex-col justify-center items-center">
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm relative text-center w-full max-w-[280px]">
                    <img src="/assets/notebook_3d_clean.png" alt="Notebook" className="w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]" />
                    <p className="font-handwritten text-[#6E665E] text-[18px] lg:text-[22px] max-w-[180px] mx-auto mt-4 leading-snug">
                      "Small steps every day lead to big changes." ♡
                    </p>
                  </div>
                </div>

                {/* Center: Timer ring card */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center">
                  <div className="relative w-72 h-72 rounded-full border border-[#17263F]/6 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center select-none">
                    
                    {/* Breathing circle indicator wrapper */}
                    <motion.div
                      animate={isTimerRunning ? { 
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3]
                      } : {}}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-2.5 rounded-full border-2 border-dashed border-[#D4A373]/30 pointer-events-none"
                    />

                    <span className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider mb-2">Focus Session</span>
                    <span className="text-[64px] font-black text-[#17263F] leading-none tracking-tight font-mono">{formatTime(timerSeconds)}</span>
                    <span className="text-[11px] font-bold text-[#D4A373] mt-3">Stay focused, you've got this! 💛</span>

                    {/* Timer controls */}
                    <div className="flex items-center gap-3.5 mt-6">
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="w-12 h-12 rounded-full bg-[#17263F] hover:bg-[#253958] text-white flex items-center justify-center cursor-pointer shadow-md active:scale-95 transition-all"
                      >
                        {isTimerRunning ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
                      </button>
                      <button
                        onClick={() => { setIsTimerRunning(false); setTimerSeconds(1500); }}
                        className="w-10 h-10 rounded-full border border-[#17263F]/12 hover:bg-[#FAF6F0] text-[#17263F] flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Up next alert */}
                  <span className="text-xs font-bold text-[#8C847B] uppercase tracking-wider mt-6">
                    Up next: Short Break ({shortBreakLength} min)
                  </span>
                </div>

                {/* Right: Current Lesson Card */}
                <div className="lg:col-span-3 flex flex-col gap-4 text-left w-full">
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm">
                    <span className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider block mb-1">Current Lesson</span>
                    <h3 className="text-[18px] font-extrabold text-[#17263F] leading-tight">Algebra Basics</h3>
                    <p className="text-[12px] text-[#6E665E] mt-1.5">Solving linear equations with one variable.</p>
                    
                    <div className="border-t border-[#17263F]/6 pt-4 mt-4 space-y-3">
                      <div className="flex justify-between text-[11px] font-bold text-[#17263F]">
                        <span>Card Progress</span>
                        <span>{timerProgress}/10</span>
                      </div>
                      <div className="h-2 bg-[#FAF6F0] rounded-full overflow-hidden border border-[#17263F]/4">
                        <div className="h-full bg-[#D4A373] rounded-full" style={{ width: `${(timerProgress / 10) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Coffee mug */}
                  <div className="bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-5 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src="/assets/coffee_cup_3d_clean.png" alt="Cup" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Mug Check</span>
                      <span className="text-[11px] text-[#6E665E] block mt-0.5">Keep a warm drink nearby.</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Floating mascot at the bottom */}
              <div className="flex items-center gap-4 mt-6">
                {renderMascot(120, true, true)}
                <div className="bg-white border border-[#17263F]/6 rounded-2xl p-4 text-[12px] font-bold text-[#6E665E] max-w-[280px] shadow-sm">
                  "Need a break? Just pause the timer. Pomodoro helps manage study anxiety!" 💛
                </div>
              </div>

            </div>
          )}

          {/* SCREEN 7: Attention Insights */}
          {currentScreen === 7 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Your Attention Insights ♡</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Understanding your attention patterns helps you learn better.</p>
                </div>
                {/* Timeframe selector tabs */}
                <div className="flex border border-[#17263F]/8 rounded-full p-1 bg-[#FFFDF9] shadow-sm">
                  {['Week', 'Month', 'Quarter'].map(t => (
                    <button 
                      key={t}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                        t === 'Week' ? 'bg-[#17263F] text-white shadow-sm' : 'text-[#8C847B] hover:text-[#17263F]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Focus Trend (SVG Line Chart) */}
                <div className="lg:col-span-8 bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-6">Focus Trend</h3>
                  <div className="w-full h-56 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4A373" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#D4A373" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 0,35 Q 15,22 30,12 T 60,25 T 90,8 T 100,5 L 100,40 L 0,40 Z" fill="url(#chartGradTrend)" />
                      <path d="M 0,35 Q 15,22 30,12 T 60,25 T 90,8 T 100,5" fill="none" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#A09790] font-extrabold mt-3 uppercase tracking-wider px-1">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* Peak Focus Hours (SVG Bar Chart) */}
                <div className="lg:col-span-4 bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-2">Peak Focus Hours</h3>
                  <p className="text-[11px] text-[#6E665E] font-bold mb-6">Best focus periods are between <span className="text-[#D4A373]">6 PM - 8 PM</span>.</p>
                  
                  <div className="w-full h-44 flex items-end justify-between gap-1.5 px-2">
                    {[30, 45, 60, 85, 95, 75, 40].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full rounded-t-lg bg-[#FAF6F0] hover:bg-[#D4A373] transition-colors border border-[#17263F]/4 cursor-pointer"
                          style={{ height: `${val * 1.2}px` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-[#A09790] font-extrabold mt-3 uppercase tracking-wider px-1">
                    <span>12 AM</span><span>4 AM</span><span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span><span>12 AM</span>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Heatmap & Insight Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Heatmap Grid */}
                <div className="lg:col-span-7 bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Attention Heatmap</h3>
                  
                  {/* Heatmap layout dots */}
                  <div className="flex flex-col gap-2">
                    {['Morning', 'Afternoon', 'Evening'].map((period, index) => (
                      <div key={period} className="flex items-center justify-between text-[11px] font-bold text-[#6E665E]">
                        <span className="w-16 text-left">{period}</span>
                        <div className="flex-1 flex justify-around pl-4">
                          {[1, 2, 3, 4, 5, 6, 7].map(dot => {
                            const opacity = (index + dot) % 3 === 0 ? 'bg-[#D4A373]' : (index + dot) % 2 === 0 ? 'bg-[#FAF6F0] border border-[#17263F]/4' : 'bg-[#E8B07A]';
                            return (
                              <div key={dot} className={`w-3.5 h-3.5 rounded-full ${opacity}`} />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-[#A09790] font-extrabold uppercase tracking-wider mt-4 pl-20 pr-1">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* Insights Cards List */}
                <div className="lg:col-span-5 bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm flex flex-col justify-between text-left">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Insights for you</h3>
                  
                  <div className="space-y-3.5">
                    {[
                      { icon: <Clock size={16} className="text-[#8AB6D6]" />, text: 'Your focus improves with short breaks.' },
                      { icon: <Timer size={16} className="text-[#D4A373]" />, text: 'You retain more when studying in the evening.' },
                      { icon: <Sparkles size={16} className="text-[#A8C686]" />, text: 'Visual learning boosts your retention.' }
                    ].map((ins, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="p-1.5 rounded-lg bg-[#FAF6F0] border border-[#17263F]/4 mt-0.5">
                          {ins.icon}
                        </div>
                        <p className="text-[13px] font-bold text-[#17263F] leading-tight mt-1">{ins.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCREEN 8: AI Recommendations */}
          {currentScreen === 8 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Rin Recommends ♡</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Personalized tips to help you learn and grow.</p>
                </div>
                <button 
                  onClick={() => setCurrentScreen(5)}
                  className="p-2.5 rounded-full border border-[#17263F]/8 hover:bg-[#FAF6F0] text-[#6E665E] cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
                
                {/* Left mascot */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  {renderMascot(260, true, true)}
                </div>

                {/* Right recommendations */}
                <div className="lg:col-span-8 space-y-4 text-left w-full">
                  {[
                    { label: 'Try 25-minute study sessions', desc: 'Based on your focus patterns.', btn: 'Try Now', action: () => setCurrentScreen(6) },
                    { label: 'Add visual diagrams to your notes', desc: 'Helps you understand better.', btn: 'Explore', action: () => {} },
                    { label: 'Schedule breaks every 20 minutes', desc: 'Short breaks improve attention.', btn: 'Set Reminder', action: () => {} },
                    { label: 'Study Mathematics in the evening', desc: 'You focus best during this time.', btn: 'Adjust', action: () => {} }
                  ].map((tip, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp(i * 0.08)}
                      className="bg-white border border-[#17263F]/6 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#D4A373]/25 transition-all duration-200"
                    >
                      <div>
                        <h4 className="text-[15px] font-bold text-[#17263F] leading-tight mb-1">{tip.label}</h4>
                        <p className="text-[12px] text-[#6E665E] leading-normal">{tip.desc}</p>
                      </div>
                      <button
                        onClick={tip.action}
                        className="bg-[#17263F] hover:bg-[#253958] text-white text-[11px] font-bold uppercase tracking-wider py-2.5 px-5 rounded-full transition-all active:scale-[0.98] cursor-pointer shadow-sm text-center flex-shrink-0"
                      >
                        {tip.btn}
                      </button>
                    </motion.div>
                  ))}
                  
                  {/* Bottom tagline */}
                  <div className="pt-4 text-center">
                    <span className="text-[11px] font-extrabold text-[#D4A373] uppercase tracking-widest bg-[#F6F0E8]/50 px-4 py-2 rounded-full">
                      These recommendations update as you learn! 💛
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCREEN 9: Growth Journey */}
          {currentScreen === 9 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Your Growth Journey ♡</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Celebrate small wins. You're grinding every day!</p>
                </div>
                <button 
                  onClick={() => setCurrentScreen(5)}
                  className="p-2.5 rounded-full border border-[#17263F]/8 hover:bg-[#FAF6F0] text-[#6E665E] cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              {/* Journey Tree Visual Illustration */}
              <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-8 shadow-sm flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-[#D4A373]/5 to-transparent blur-2xl pointer-events-none" />
                
                {/* Milestone nodes horizontal tree stack */}
                <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8 relative z-10">
                  {[
                    { node: 'First Step', date: 'Completed May 1', color: '#D4A373', active: true },
                    { node: '7-Day Streak', date: 'Completed May 7', color: '#A8C686', active: true },
                    { node: 'Focus Master', date: 'Completed May 10', color: '#8AB6D6', active: true },
                    { node: 'Goal Achieved', date: 'Locked', color: '#8C847B', active: false }
                  ].map((milestone, i) => (
                    <div key={i} className="flex flex-col items-center text-center relative group">
                      {/* Node circle wrapper */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-200"
                        style={{ 
                          borderColor: milestone.active ? milestone.color : '#17263F/10',
                          backgroundColor: milestone.active ? `${milestone.color}15` : '#FAF6F0'
                        }}
                      >
                        {milestone.active ? (
                          <Star size={24} style={{ color: milestone.color, fill: `${milestone.color}40` }} className="animate-spin-slow" />
                        ) : (
                          <Lock size={20} className="text-[#8C847B]" />
                        )}
                      </div>
                      <h4 className="text-[14px] font-bold text-[#17263F] mt-3 mb-0.5">{milestone.node}</h4>
                      <span className="text-[10px] font-extrabold text-[#8C847B] uppercase tracking-wider">{milestone.date}</span>
                    </div>
                  ))}
                </div>

                {/* Connecting branch background details using absolute SVG lines */}
                <svg className="absolute w-[80%] h-4 top-1/2 left-[10%] opacity-20 pointer-events-none hidden md:block" fill="none">
                  <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#D4A373" strokeWidth="3" strokeDasharray="6 6" />
                </svg>
              </div>

              {/* Profile stats and badges footer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* Level badge */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm flex items-center gap-6 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[#F6F0E8] border border-[#D4A373]/20 flex items-center justify-center flex-shrink-0">
                    <Trophy size={32} className="text-[#D4A373]" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-end leading-none">
                      <span className="text-xs font-black text-[#8C847B] uppercase tracking-wider">Level 4</span>
                      <span className="text-[13px] font-black text-[#17263F]">Curious Learner</span>
                    </div>
                    <div className="h-2 bg-[#FAF6F0] rounded-full overflow-hidden border border-[#17263F]/4">
                      <div className="h-full bg-[#D4A373] rounded-full" style={{ width: '45%' }} />
                    </div>
                    <span className="text-[10px] text-[#8C847B] font-extrabold block">450 / 1000 XP</span>
                  </div>
                </div>

                {/* Badges count */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm flex items-center gap-6 text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[#F6F0E8] border border-[#D4A373]/20 flex items-center justify-center flex-shrink-0">
                    <Award size={32} className="text-[#A8C686]" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#8C847B] uppercase tracking-wider block mb-1">Badges</span>
                    <span className="text-[24px] font-black text-[#17263F] block leading-none">12 Earned</span>
                    <span className="text-[11px] text-[#6E665E] block mt-1.5">You unlocked "Streak Master" badge yesterday!</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCREEN 10: Educator Dashboard */}
          {currentScreen === 10 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Classroom Overview ♡</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Grade 8 - Mathematics • Supporting student pathways</p>
                </div>
                <button 
                  className="bg-white hover:bg-[#F6F0E8] border border-[#17263F]/12 text-[#17263F] font-bold text-xs px-6 py-3 rounded-full transition-all active:scale-[0.98] shadow-sm cursor-pointer"
                >
                  Export Report
                </button>
              </div>

              {/* Stats blocks grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { val: '28', label: 'Total Students', color: 'border-[#17263F]/6' },
                  { val: '18', label: 'On Track', pct: '64%', color: 'border-[#A8C686]' },
                  { val: '7', label: 'Need Support', pct: '25%', color: 'border-[#E8B07A]' },
                  { val: '3', label: 'At Risk', pct: '11%', color: 'border-[#F87171]' }
                ].map((card, i) => (
                  <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm flex flex-col justify-between ${card.color}`}>
                    <div className="flex justify-between items-start leading-none">
                      <span className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider">{card.label}</span>
                      {card.pct && <span className="text-[9px] font-extrabold bg-[#FAF6F0] px-2 py-0.5 rounded-full text-[#6E665E]">{card.pct}</span>}
                    </div>
                    <span className="text-[32px] font-black text-[#17263F] mt-3.5 leading-none">{card.val}</span>
                  </div>
                ))}
              </div>

              {/* Main content split */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Attention Overview donut chart mockup */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm flex flex-col justify-between">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Attention Overview</h3>
                  
                  {/* SVG Donut */}
                  <div className="w-36 h-36 mx-auto relative flex items-center justify-center my-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#FAF6F0" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#A8C686" strokeWidth="4" strokeDasharray="64 100" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#E8B07A" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-64" />
                    </svg>
                    <div className="absolute flex flex-col items-center leading-none">
                      <span className="text-[12px] font-extrabold text-[#8C847B] uppercase tracking-wider">Class</span>
                      <span className="text-[20px] font-black text-[#17263F] mt-1">Focused</span>
                    </div>
                  </div>

                  <div className="flex justify-around text-[10px] font-bold text-[#6E665E] pt-2">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#A8C686]" /> Focused 64%</span>
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E8B07A]" /> Distracted 25%</span>
                  </div>
                </div>

                {/* Classroom Insights list */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm text-left">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Top Insights</h3>
                  
                  <div className="space-y-4">
                    {[
                      'Most students focus best between 6-8 PM.',
                      'Interactive lessons improve completion rate.',
                      'Visual content helps 70% of the class.'
                    ].map((insight, i) => (
                      <div key={i} className="flex items-start gap-3 text-left">
                        <div className="w-5 h-5 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[10px] font-bold text-[#D4A373] border border-[#17263F]/4 flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className="text-[13px] font-bold text-[#17263F] leading-snug">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Students Meeting Support list */}
                <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm text-left">
                  <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Students Meeting Support</h3>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Rohan S.', style: 'Needs attention support' },
                      { name: 'Meera K.', style: 'Needs modular breaks' },
                      { name: 'Arjun P.', style: 'Needs study structure' }
                    ].map((student, i) => (
                      <div key={i} className="flex items-center gap-3.5 py-1 border-b border-[#17263F]/4 last:border-0">
                        <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#17263F]/8 flex items-center justify-center flex-shrink-0">
                          <img src="/assets/rin_mascot_3d_clean.png" alt="Student" className="w-7 h-7 object-contain" />
                        </div>
                        <div>
                          <span className="text-[13px] font-bold text-[#17263F] block leading-tight">{student.name}</span>
                          <span className="text-[11px] text-[#6E665E] block mt-0.5">{student.style}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SCREEN 11: Parent Dashboard */}
          {currentScreen === 11 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Welcome, Mom! 🌸</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Here's how {userName || 'your child'} is doing.</p>
                </div>
                <button 
                  onClick={() => setCurrentScreen(5)}
                  className="p-2.5 rounded-full border border-[#17263F]/8 hover:bg-[#FAF6F0] text-[#6E665E] cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              {/* Row grid stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { num: `${focusScore}/100`, label: 'Focus Score', sub: 'Great!' },
                  { num: '10h 35m', label: 'Study Time', sub: '+1h 20m' },
                  { num: '12 /15', label: 'Tasks Completed', sub: 'Keep it up!' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm text-left flex flex-col justify-between hover:translate-y-[-2px] transition-all">
                    <span className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider">{stat.label}</span>
                    <span className="text-[32px] font-black text-[#17263F] my-3 leading-none">{stat.num}</span>
                    <span className="text-[11px] font-bold text-[#A8C686]">{stat.sub}</span>
                  </div>
                ))}
              </div>

              {/* Visual Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-4">
                
                {/* Insights and suggested activities */}
                <div className="lg:col-span-8 space-y-6 text-left">
                  
                  {/* Insights list */}
                  <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm">
                    <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Insights</h3>
                    <div className="space-y-3.5">
                      {[
                        `${userName || 'Your child'} focuses best in the evening.`,
                        'Short breaks help maintain consistency.',
                        `${userName ? userName + ' enjoys' : 'They enjoy'} learning Math and Art.`
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#D4A373]" />
                          <span className="text-[13px] font-bold text-[#17263F]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suggested Activities */}
                  <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm">
                    <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Suggested Activities</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Mindful Breathing (3 min)', desc: 'Improves focus' },
                        { title: 'Visual Note-making', desc: 'Enhances understanding' },
                        { title: 'Short quizzes', desc: 'Boosts retention' }
                      ].map((act, i) => (
                        <div key={i} className="flex justify-between items-center py-0.5 border-b border-[#17263F]/4 last:border-0">
                          <div>
                            <span className="text-[13px] font-bold text-[#17263F] block leading-tight">{act.title}</span>
                            <span className="text-[11px] text-[#6E665E] block mt-0.5">{act.desc}</span>
                          </div>
                          <button className="bg-[#FAF6F0] border border-[#17263F]/8 text-[#17263F] hover:bg-[#F6F0E8] text-[10px] font-bold uppercase tracking-wider py-1.5 px-4.5 rounded-full cursor-pointer transition-colors">
                            Assign
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right side mascot visual decoration */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  {renderMascot(260, true, true)}
                </div>

              </div>
            </div>
          )}

          {/* SCREEN 12: Profile & Settings */}
          {currentScreen === 12 && (
            <div className="max-w-[1280px] w-full mx-auto flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#17263F]/6 pb-6">
                <div>
                  <h1 className="text-[28px] lg:text-[36px] font-extrabold text-[#17263F] tracking-tight">Profile & Settings</h1>
                  <p className="text-[14px] text-[#6E665E] font-semibold mt-0.5">Customize preferences, toggles, and study variables.</p>
                </div>
                <button 
                  onClick={() => setCurrentScreen(5)}
                  className="p-2.5 rounded-full border border-[#17263F]/8 hover:bg-[#FAF6F0] text-[#6E665E] cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
              </div>

              {/* Main settings options panels */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left profile form card */}
                <div className="lg:col-span-4 bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm text-center">
                  <div className="mb-6 flex flex-col items-center">
                    {/* Cute 3D profile avatar mockup (Mascot with book) */}
                    <div className="w-24 h-24 rounded-full border-2 border-[#D4A373]/30 overflow-hidden bg-[#FAF6F0] flex items-center justify-center p-2 mb-3 relative">
                      <img src="/assets/rin_mascot_3d_clean.png" alt="Profile avatar" className="w-full h-full object-contain" />
                    </div>
                    <button className="text-[11px] font-extrabold text-[#D4A373] uppercase tracking-wider hover:underline cursor-pointer">
                      Change Photo
                    </button>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider pl-0.5">Name</label>
                      <input 
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#17263F]/6 rounded-2xl px-4 py-3 text-xs font-bold text-[#17263F]"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider pl-0.5">Age</label>
                      <input 
                        type="text" 
                        value={userAge}
                        onChange={(e) => setUserAge(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#17263F]/6 rounded-2xl px-4 py-3 text-xs font-bold text-[#17263F]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider pl-0.5">Grade</label>
                      <input 
                        type="text" 
                        value={userGrade}
                        onChange={(e) => setUserGrade(e.target.value)}
                        className="w-full bg-[#FAF6F0] border border-[#17263F]/6 rounded-2xl px-4 py-3 text-xs font-bold text-[#17263F]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#8C847B] uppercase tracking-wider pl-0.5">Bio</label>
                      <textarea 
                        rows={2}
                        value="I love art, science and learning new things!"
                        readOnly
                        className="w-full bg-[#FAF6F0] border border-[#17263F]/6 rounded-2xl px-4 py-3 text-xs font-bold text-[#17263F] resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right settings parameters cards (Grid of accessibility, notifications, and study) */}
                <div className="lg:col-span-8 space-y-6 text-left w-full">
                  
                  {/* Row 1: Accessibility & Notifications side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Accessibility switches */}
                    <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm space-y-4">
                      <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-2">Accessibility ♡</h3>
                      
                      {/* Distractions toggle */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Reduce distractions</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Minimize visual clutter</span>
                        </div>
                        <button 
                          onClick={() => setReduceDistractions(!reduceDistractions)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            reduceDistractions ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            reduceDistractions ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Soft Colors toggle */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Soft colors</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Sway interface colors</span>
                        </div>
                        <button 
                          onClick={() => setSoftColors(!softColors)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            softColors ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            softColors ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Dyslexia-friendly font toggle */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Dyslexia-friendly font</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Improves readability</span>
                        </div>
                        <button 
                          onClick={() => setDyslexiaFont(!dyslexiaFont)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            dyslexiaFont ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            dyslexiaFont ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* High Contrast toggle */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">High contrast</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Increase outline weights</span>
                        </div>
                        <button 
                          onClick={() => setHighContrast(!highContrast)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            highContrast ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            highContrast ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>

                    {/* Notifications toggles */}
                    <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm space-y-4">
                      <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-2">Notifications ♡</h3>
                      
                      {/* Study reminders */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Study reminders</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Daily study alerts</span>
                        </div>
                        <button 
                          onClick={() => setNotifStudy(!notifStudy)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            notifStudy ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            notifStudy ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Break reminders */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Break reminders</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Remind me to take breaks</span>
                        </div>
                        <button 
                          onClick={() => setNotifBreak(!notifBreak)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            notifBreak ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            notifBreak ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Goal updates */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Goal updates</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Notify about progress</span>
                        </div>
                        <button 
                          onClick={() => setNotifGoal(!notifGoal)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            notifGoal ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            notifGoal ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      {/* Motivational messages */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[12px] font-bold text-[#17263F] block leading-tight">Motivational messages</span>
                          <span className="text-[10px] text-[#8C847B] block mt-0.5">Encouragement from Rin</span>
                        </div>
                        <button 
                          onClick={() => setNotifMascot(!notifMascot)}
                          className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer relative flex items-center ${
                            notifMascot ? 'bg-[#A8C686]' : 'bg-[#17263F]/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                            notifMascot ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Row 2: Study Parameters */}
                  <div className="bg-white border border-[#17263F]/6 rounded-[24px] p-6 shadow-sm text-left">
                    <h3 className="text-[13px] font-bold text-[#8C847B] uppercase tracking-wider mb-4">Study Settings ♡</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Session duration */}
                      <div className="flex justify-between items-center py-2 border-b border-[#17263F]/4">
                        <span className="text-[12px] font-bold text-[#17263F]">Default session time</span>
                        <select 
                          value={sessionLength}
                          onChange={(e) => { setSessionLength(Number(e.target.value)); setTimerSeconds(Number(e.target.value) * 60); }}
                          className="bg-[#FAF6F0] border border-[#17263F]/6 rounded-xl px-3 py-1.5 text-xs font-bold text-[#17263F]"
                        >
                          <option value="15">15 minutes</option>
                          <option value="25">25 minutes</option>
                          <option value="45">45 minutes</option>
                        </select>
                      </div>

                      {/* Short break duration */}
                      <div className="flex justify-between items-center py-2 border-b border-[#17263F]/4">
                        <span className="text-[12px] font-bold text-[#17263F]">Short break duration</span>
                        <select 
                          value={shortBreakLength}
                          onChange={(e) => setShortBreakLength(Number(e.target.value))}
                          className="bg-[#FAF6F0] border border-[#17263F]/6 rounded-xl px-3 py-1.5 text-xs font-bold text-[#17263F]"
                        >
                          <option value="3">3 minutes</option>
                          <option value="5">5 minutes</option>
                          <option value="10">10 minutes</option>
                        </select>
                      </div>

                      {/* Long break duration */}
                      <div className="flex justify-between items-center py-2 border-b border-[#17263F]/4">
                        <span className="text-[12px] font-bold text-[#17263F]">Long break duration</span>
                        <select 
                          value={longBreakLength}
                          onChange={(e) => setLongBreakLength(Number(e.target.value))}
                          className="bg-[#FAF6F0] border border-[#17263F]/6 rounded-xl px-3 py-1.5 text-xs font-bold text-[#17263F]"
                        >
                          <option value="15">15 minutes</option>
                          <option value="20">20 minutes</option>
                          <option value="30">30 minutes</option>
                        </select>
                      </div>

                      {/* Background music */}
                      <div className="flex justify-between items-center py-2 border-b border-[#17263F]/4">
                        <span className="text-[12px] font-bold text-[#17263F]">Background music</span>
                        <select 
                          value={bgMusic}
                          onChange={(e) => setBgMusic(e.target.value)}
                          className="bg-[#FAF6F0] border border-[#17263F]/6 rounded-xl px-3 py-1.5 text-xs font-bold text-[#17263F]"
                        >
                          <option value="Lo-Fi beats">Lo-Fi beats</option>
                          <option value="Ocean waves">Ocean waves</option>
                          <option value="Binaural tones">Binaural tones</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Footer decoration */}
              <div className="flex justify-end mt-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white border border-[#17263F]/6 rounded-2xl p-4 text-[12px] font-bold text-[#6E665E] max-w-[240px] shadow-sm">
                    "Settings are updated instantly! Your dyslexia font is active." 💛
                  </div>
                  {renderMascot(120, true, true)}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 13: Sign In */}
          {currentScreen === 13 && (
            <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-center items-center min-h-[80vh]">
              <div className="w-full max-w-[440px] mb-8">
                <button onClick={() => setCurrentScreen(1)} className="flex items-center gap-2 text-sm font-bold text-[#8C847B] hover:text-[#17263F] transition-colors cursor-pointer">
                  <ArrowLeft size={16} /> Back to home
                </button>
              </div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp(0)} className="w-full max-w-[440px] bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center">
                <div className="flex justify-center mb-6">{renderMascot(120, true, false)}</div>
                <h2 className="text-[28px] font-extrabold text-[#17263F] tracking-tight mb-1">
                  Welcome back <span className="font-handwritten text-[#D4A373] text-[24px]">♡</span>
                </h2>
                <p className="text-[14px] text-[#6E665E] font-medium mb-8">Sign in to continue your learning journey.</p>
                <div className="space-y-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C847B]" />
                      <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] pl-11 pr-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50 transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C847B]" />
                      <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] pl-11 pr-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50 transition-colors" />
                    </div>
                  </div>
                </div>
                <button onClick={() => { setIsLoggedIn(true); setIsGuest(false); setUserName(loginEmail.split('@')[0] || 'User'); setCurrentScreen(5); }} className="w-full bg-[#17263F] hover:bg-[#253958] text-white font-bold text-[15px] py-4 rounded-[18px] shadow-[0_4px_15px_rgba(212,163,115,0.15)] transition-all active:scale-[0.98] cursor-pointer mt-6 flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={16} />
                </button>
                <div className="mt-6 space-y-3">
                  <p className="text-[13px] text-[#6E665E] font-medium">
                    Don't have an account?{' '}
                    <button onClick={() => setCurrentScreen(14)} className="text-[#D4A373] font-bold hover:underline cursor-pointer">Sign up</button>
                  </p>
                  <button onClick={() => { setIsGuest(true); setIsLoggedIn(false); setUserName('Learner'); setCurrentScreen(5); }} className="text-[12px] text-[#8C847B] font-bold hover:text-[#17263F] cursor-pointer transition-colors">
                    Continue as Guest →
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* SCREEN 14: Sign Up */}
          {currentScreen === 14 && (
            <div className="max-w-[1280px] mx-auto w-full flex flex-col justify-center items-center min-h-[80vh]">
              <div className="w-full max-w-[440px] mb-8">
                <button onClick={() => setCurrentScreen(1)} className="flex items-center gap-2 text-sm font-bold text-[#8C847B] hover:text-[#17263F] transition-colors cursor-pointer">
                  <ArrowLeft size={16} /> Back to home
                </button>
              </div>
              <motion.div initial="hidden" animate="visible" variants={fadeUp(0)} className="w-full max-w-[440px] bg-[#FFFDF9] border border-[#17263F]/6 rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] text-center">
                <div className="flex justify-center mb-6">{renderMascot(120, true, false)}</div>
                <h2 className="text-[28px] font-extrabold text-[#17263F] tracking-tight mb-1">
                  Create your account <span className="font-handwritten text-[#D4A373] text-[24px]">✦</span>
                </h2>
                <p className="text-[14px] text-[#6E665E] font-medium mb-8">Start your personalized learning journey.</p>
                <div className="space-y-4 text-left">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Full Name</label>
                    <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="What should we call you?" className="w-full bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] px-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C847B]" />
                      <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] pl-11 pr-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50 transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#8C847B] uppercase tracking-wider pl-1">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C847B]" />
                      <input type="password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Create a password" className="w-full bg-[#FAF6F0] border border-[#17263F]/8 rounded-[18px] pl-11 pr-5 py-3.5 text-sm text-[#17263F] focus:outline-none focus:border-[#D4A373]/50 transition-colors" />
                    </div>
                  </div>
                </div>
                <button onClick={() => { setIsLoggedIn(true); setIsGuest(false); setUserName(signupName || 'Learner'); setCurrentScreen(2); }} className="w-full bg-[#17263F] hover:bg-[#253958] text-white font-bold text-[15px] py-4 rounded-[18px] shadow-[0_4px_15px_rgba(212,163,115,0.15)] transition-all active:scale-[0.98] cursor-pointer mt-6 flex items-center justify-center gap-2">
                  Create Account <ArrowRight size={16} />
                </button>
                <div className="mt-6 space-y-3">
                  <p className="text-[13px] text-[#6E665E] font-medium">
                    Already have an account?{' '}
                    <button onClick={() => setCurrentScreen(13)} className="text-[#D4A373] font-bold hover:underline cursor-pointer">Sign in</button>
                  </p>
                  <button onClick={() => { setIsGuest(true); setIsLoggedIn(false); setUserName('Learner'); setCurrentScreen(5); }} className="text-[12px] text-[#8C847B] font-bold hover:text-[#17263F] cursor-pointer transition-colors">
                    Continue as Guest →
                  </button>
                </div>
              </motion.div>
            </div>
          )}

        </main>
      </div>

      {/* ════════════════════════════════════════════
          FLOATING INTERACTIVE PROTOTYPE JUMP PANEL
          (ENABLING IMMEDIATE INSPECTION OF ALL 12 MOCKUPS)
      ════════════════════════════════════════════ */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#17263F]/90 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl flex items-center gap-2 z-[9999] select-none text-white max-w-[90vw] overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-[#E8B07A] uppercase tracking-widest shrink-0 mr-2 flex items-center gap-1.5">
          <Sparkles size={12} className="animate-spin-slow" />
          Figma Shot Jump
        </span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => {
            const isActive = currentScreen === num;
            return (
              <button
                key={num}
                onClick={() => { setCurrentScreen(num); setIsMobileNavOpen(false); }}
                className={`w-8 h-8 rounded-full text-xs font-black transition-all shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-[#D4A373] text-[#17263F] font-black' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
