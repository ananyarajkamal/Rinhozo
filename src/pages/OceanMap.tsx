import React, { useState, useEffect } from 'react';
import { db } from '../lib/db';
import type { UserProfile, UserProgress } from '../lib/db';
import { 
  Play, 
  Lock, 
  Award, 
  Lightbulb, 
  BookOpen, 
  BarChart3, 
  Puzzle, 
  ArrowRight
} from 'lucide-react';

interface OceanMapProps {
  onSelectTopic: (topicId: string) => void;
  onNavigate: (route: 'landing' | 'profile' | 'settings' | 'downloads' | 'reels') => void;
  evolutionLevel: number;
}

export const OceanMap: React.FC<OceanMapProps> = ({ onSelectTopic, onNavigate, evolutionLevel }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reefProgress, setReefProgress] = useState<UserProgress | null>(null);
  const [volcanoProgress, setVolcanoProgress] = useState<UserProgress | null>(null);
  const [islandProgress, setIslandProgress] = useState<UserProgress | null>(null);
  
  const [activeEnv, setActiveEnv] = useState<'reef' | 'volcano' | 'island'>('reef');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('algebra-reef');
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    async function loadData() {
      const userProfile = await db.getProfile();
      setProfile(userProfile);

      const pReef = await db.getProgress('algebra-reef');
      const pVolcano = await db.getProgress('physics-volcano');
      const pIsland = await db.getProgress('history-island');

      // Cascade unlocks based on progress
      if (pReef.status === 'completed' && pVolcano.status === 'locked') {
        pVolcano.status = 'available';
        await db.saveProgress('physics-volcano', pVolcano);
      }
      if (pVolcano.status === 'completed' && pIsland.status === 'locked') {
        pIsland.status = 'available';
        await db.saveProgress('history-island', pIsland);
      }

      setReefProgress(pReef);
      setVolcanoProgress(pVolcano);
      setIslandProgress(pIsland);
      
      // Auto-set selected topic based on what is available
      if (pIsland.status === 'available' || pIsland.status === 'completed') {
        setSelectedTopicId('history-island');
        setActiveEnv('island');
      } else if (pVolcano.status === 'available' || pVolcano.status === 'completed') {
        setSelectedTopicId('physics-volcano');
        setActiveEnv('volcano');
      } else {
        setSelectedTopicId('algebra-reef');
        setActiveEnv('reef');
      }
    }
    loadData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Normalized coordinates (-0.5 to 0.5) from the center of the container
    const x = ((clientX - rect.left) / rect.width) - 0.5;
    const y = ((clientY - rect.top) / rect.height) - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 3D rotation styles based on mouse position
  const tiltRin = {
    transform: `rotateY(${mousePos.x * 28}deg) rotateX(${-mousePos.y * 28}deg) translateZ(40px)`,
    transition: 'transform 0.15s ease-out'
  };

  const tiltBadgeFar = (offsetMultiplier: number) => ({
    transform: `rotateY(${mousePos.x * 38 * offsetMultiplier}deg) rotateX(${-mousePos.y * 38 * offsetMultiplier}deg) translateZ(80px)`,
    transition: 'transform 0.15s ease-out'
  });

  const tiltTableProps = {
    transform: `rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg) translateZ(20px)`,
    transition: 'transform 0.25s ease-out'
  };

  // Data mapping for topics
  const topics = {
    'algebra-reef': {
      id: 'algebra-reef',
      envId: 'reef' as const,
      name: 'Algebra Reef',
      difficulty: 'Easy',
      status: reefProgress?.status || 'available',
      description: 'Variables aur basic equations ki mystery ko unlock karo.',
      details: 'Learn how to balance equations, isolate variables, and solve real-world shopping puzzles step by step.'
    },
    'physics-volcano': {
      id: 'physics-volcano',
      envId: 'volcano' as const,
      name: 'Physics Volcano',
      difficulty: 'Medium',
      status: volcanoProgress?.status || 'locked',
      description: 'Force, mass, aur gravitational attraction seekho.',
      details: 'Explore Newton laws of motion, gravity on different planets, and how force scales with mass.'
    },
    'history-island': {
      id: 'history-island',
      envId: 'island' as const,
      name: 'History Island',
      difficulty: 'Medium',
      status: islandProgress?.status || 'locked',
      description: 'Literary records aur ancient empires ke artifacts discover karo.',
      details: 'Unravel historical timelines, decode ancient messages, and map artifacts left by empires.'
    }
  };

  const activeTopic = topics[hoveredTopicId as keyof typeof topics || selectedTopicId as keyof typeof topics] || topics['algebra-reef'];

  // Speech bubble text based on hovered or selected item
  const getRinSpeech = () => {
    const topic = topics[hoveredTopicId as keyof typeof topics] || topics[selectedTopicId as keyof typeof topics];
    if (!topic) return 'Hi! Select a topic on my desk to begin learning.';

    const name = topic.name;
    const status = topic.status;

    if (status === 'locked') {
      return `${name} is currently locked. Complete the previous boss battle to unlock it.`;
    }
    if (status === 'completed') {
      return `You have completed ${name}! You can replay lessons or review formulas anytime.`;
    }
    return `Let us explore ${name}! Click on the desk object to start.`;
  };

  const handleSelectTopicAction = (topicId: string) => {
    const status = topics[topicId as keyof typeof topics]?.status;
    if (status !== 'locked') {
      onSelectTopic(topicId);
    }
  };

  // Determine Rin color tinting based on the active environment
  const getRinFilter = () => {
    let baseGlow = 'drop-shadow(0 0 25px rgba(212, 165, 116, 0.55))';
    if (activeEnv === 'volcano') {
      baseGlow = 'drop-shadow(0 0 30px rgba(212, 165, 116, 0.7)) hue-rotate(-15deg)';
    } else if (activeEnv === 'island') {
      baseGlow = 'drop-shadow(0 0 30px rgba(134, 239, 172, 0.6)) hue-rotate(90deg)';
    } else if (activeEnv === 'reef') {
      baseGlow = 'drop-shadow(0 0 30px rgba(125, 211, 252, 0.65)) hue-rotate(185deg)';
    }
    return baseGlow;
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen text-[#1e293b] flex flex-col relative font-sans select-none overflow-x-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(250, 246, 240, 0.25), rgba(250, 246, 240, 0.25)), url('/assets/cozy_desk_bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-8 py-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full bg-[#fde68a]/20 border border-white/50 flex items-center justify-center">
            <img src="/assets/rin_mascot_3d.png" alt="Rin Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#1e293b]">RINHOZO</span>
        </div>

        {/* Dashboard Navigation Menu (Claymorphic Pill) */}
        <nav className="flex items-center bg-white/95 border border-[#e5dec9] rounded-full p-1.5 shadow-[0_8px_24px_rgba(30,41,59,0.06)] gap-2">
          <button 
            onClick={() => onNavigate('profile')} 
            className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/60 rounded-full transition-all cursor-pointer"
          >
            Profile
          </button>
          <button 
            onClick={() => onNavigate('reels')} 
            className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/60 rounded-full transition-all cursor-pointer"
          >
            Learning Reels
          </button>
          <button 
            onClick={() => onNavigate('downloads')} 
            className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/60 rounded-full transition-all cursor-pointer"
          >
            Downloads
          </button>
          <button 
            onClick={() => onNavigate('settings')} 
            className="px-5 py-2 text-xs font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/60 rounded-full transition-all cursor-pointer"
          >
            Settings
          </button>
        </nav>

        {/* User Stats/Streak Display */}
        <div className="flex items-center gap-2 bg-[#1e293b] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md">
          <span>{profile?.streak_count || 1} Day Streak</span>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* LEFT COLUMN: ACTIVE TOPIC DETAILS PANEL */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          
          <span className="text-xs font-bold text-[#d4a574] uppercase tracking-wider mb-2">
            Selected Reef Area
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-[44px] leading-tight font-bold text-[#1e293b] tracking-tight mb-4">
            {activeTopic.name}
          </h1>

          <p className="text-[#78716c] text-sm mb-6 leading-relaxed">
            {activeTopic.description}
          </p>

          {/* Expanded detail box */}
          <div className="bg-white/95 border border-[#e5dec9] rounded-3xl p-6 shadow-[0_10px_30px_rgba(30,41,59,0.04)] clay-card mb-8">
            <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-wider block mb-1">
              Topic Breakdown
            </span>
            <p className="text-xs font-semibold text-[#1e293b] leading-relaxed mb-4">
              {activeTopic.details}
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="bg-[#faf6f0] p-3 rounded-xl border border-[#e5dec9]/40">
                <span className="text-[9px] text-[#78716c] block uppercase">Difficulty</span>
                <span className="text-[#1e293b]">{activeTopic.difficulty}</span>
              </div>
              <div className="bg-[#faf6f0] p-3 rounded-xl border border-[#e5dec9]/40">
                <span className="text-[9px] text-[#78716c] block uppercase">Status</span>
                <span className="text-[#1e293b] capitalize">{activeTopic.status}</span>
              </div>
            </div>

            {/* Learning Style Adaptation Info */}
            <div className="mt-4 pt-4 border-t border-[#faf6f0]">
              <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-wider block mb-2">
                Rin Custom Adaptation
              </span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[11px] font-bold text-[#1e293b]">
                  Adapting to your learning style: {profile?.learning_style || 'story'} mode
                </span>
              </div>
            </div>
          </div>

          {/* Action Button & Tab Switcher */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button 
              disabled={activeTopic.status === 'locked'}
              onClick={() => handleSelectTopicAction(activeTopic.id)}
              className={`flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold shadow-lg transition-all group clay-button ${
                activeTopic.status === 'locked' 
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none border-stone-200' 
                  : 'bg-[#1e293b] hover:bg-[#0f172a] text-white cursor-pointer hover:-translate-y-0.5'
              }`}
            >
              {activeTopic.status === 'completed' ? 'Play Boss Battle' : activeTopic.status === 'locked' ? 'Locked' : 'Start Reef'}
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex bg-white/95 border border-[#e5dec9] rounded-full p-1 self-center sm:self-start gap-1">
              <button 
                onClick={() => { setActiveEnv('reef'); setSelectedTopicId('algebra-reef'); }}
                className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all cursor-pointer ${selectedTopicId === 'algebra-reef' ? 'bg-[#1e293b] text-white' : 'text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/40'}`}
              >
                Algebra
              </button>
              <button 
                onClick={() => { 
                  if (volcanoProgress?.status !== 'locked') {
                    setActiveEnv('volcano'); 
                    setSelectedTopicId('physics-volcano'); 
                  }
                }}
                className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                  volcanoProgress?.status === 'locked' 
                    ? 'text-stone-400 cursor-not-allowed opacity-50' 
                    : selectedTopicId === 'physics-volcano' 
                    ? 'bg-[#1e293b] text-white' 
                    : 'text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/40'
                }`}
              >
                Physics
              </button>
              <button 
                onClick={() => { 
                  if (islandProgress?.status !== 'locked') {
                    setActiveEnv('island'); 
                    setSelectedTopicId('history-island'); 
                  }
                }}
                className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                  islandProgress?.status === 'locked' 
                    ? 'text-stone-400 cursor-not-allowed opacity-50' 
                    : selectedTopicId === 'history-island' 
                    ? 'bg-[#1e293b] text-white' 
                    : 'text-[#78716c] hover:text-[#1e293b] hover:bg-[#f5e6d3]/40'
                }`}
              >
                History
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 3D PERSPECTIVE DESK SCENE */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[480px] lg:min-h-[580px] perspective-3d">
          
          {/* FLOATING SCENE CONTAINER */}
          <div 
            style={tiltRin}
            className="relative w-full max-w-[500px] h-[340px] flex items-center justify-center z-10"
          >
            
            {/* MAIN GLOWING RIN AVATAR (3D PNG) */}
            <div className="animate-float" style={{ transformStyle: 'preserve-3d' }}>
              <img 
                src="/assets/rin_mascot_3d.png" 
                alt="Rinhozo Mascot" 
                className="w-[280px] h-[280px] object-contain transition-all duration-500"
                style={{
                  filter: getRinFilter(),
                  transform: `scale(${evolutionLevel === 2 ? 0.9 : evolutionLevel === 5 ? 1.25 : 1.0})`
                }}
              />
            </div>

            {/* FLOATING CLAYMORPHIC BADGES (Navigation Shortcuts) */}
            {/* Reels Lightbulb Shortcut */}
            <button 
              onClick={() => onNavigate('reels')}
              style={tiltBadgeFar(1.15)}
              className="absolute top-4 left-14 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:1.5s] cursor-pointer group flex items-center gap-1.5 z-25 hover:scale-105"
            >
              <Lightbulb size={18} className="text-[#d4a574]" fill="currentColor" fillOpacity={0.1} />
              <span className="text-[9px] font-bold text-[#78716c] opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-[80px] overflow-hidden whitespace-nowrap">Reels</span>
            </button>

            {/* Downloads Book Shortcut */}
            <button 
              onClick={() => onNavigate('downloads')}
              style={tiltBadgeFar(0.95)}
              className="absolute bottom-20 left-4 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:0.5s] cursor-pointer group flex items-center gap-1.5 z-25 hover:scale-105"
            >
              <BookOpen size={18} className="text-[#d4a574]" />
              <span className="text-[9px] font-bold text-[#78716c] opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-[80px] overflow-hidden whitespace-nowrap">Downloads</span>
            </button>

            {/* Stats Chart Shortcut */}
            <button 
              onClick={() => onNavigate('profile')}
              style={tiltBadgeFar(1.2)}
              className="absolute top-6 right-14 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:2.2s] cursor-pointer group flex items-center gap-1.5 z-25 hover:scale-105"
            >
              <BarChart3 size={18} className="text-[#7dd3fc]" />
              <span className="text-[9px] font-bold text-[#78716c] opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-[80px] overflow-hidden whitespace-nowrap">Stats</span>
            </button>

            {/* Settings Puzzle Shortcut */}
            <button 
              onClick={() => onNavigate('settings')}
              style={tiltBadgeFar(1.05)}
              className="absolute bottom-22 right-4 bg-white border border-[#e5dec9] rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(30,41,59,0.08)] clay-card animate-float [animation-delay:1.1s] cursor-pointer group flex items-center gap-1.5 z-25 hover:scale-105"
            >
              <Puzzle size={18} className="text-[#78716c]" />
              <span className="text-[9px] font-bold text-[#78716c] opacity-0 group-hover:opacity-100 transition-opacity max-w-0 group-hover:max-w-[80px] overflow-hidden whitespace-nowrap">Settings</span>
            </button>
          </div>

          {/* TABLE TOP INTERACTIVE PROPS */}
          <div 
            style={tiltTableProps}
            className="w-full mt-2 pt-6 flex justify-between items-end relative min-h-[140px] z-10 px-4"
          >
            
            {/* SVG Glowing Path Connectors between table props */}
            <svg className="absolute inset-x-0 top-[-40px] h-[80px] w-full pointer-events-none z-0" style={{ transformStyle: 'preserve-3d' }}>
              <path
                d="M 100 60 Q 200 10, 320 60"
                fill="none"
                stroke={volcanoProgress?.status !== 'locked' ? '#d4a574' : '#e5dec9'}
                strokeWidth={volcanoProgress?.status !== 'locked' ? '4.5' : '2'}
                strokeDasharray={volcanoProgress?.status !== 'locked' ? '0' : '6,6'}
                className="transition-all duration-500 opacity-60"
              />
              <path
                d="M 320 60 Q 240 10, 100 20"
                fill="none"
                stroke={islandProgress?.status !== 'locked' ? '#86efac' : '#e5dec9'}
                strokeWidth={islandProgress?.status !== 'locked' ? '4.5' : '2'}
                strokeDasharray={islandProgress?.status !== 'locked' ? '0' : '6,6'}
                className="transition-all duration-500 opacity-60"
              />
            </svg>

            {/* PROP 1: 3D STACKED BOOKS (HISTORY ISLAND) */}
            <div 
              onClick={() => {
                if (islandProgress?.status !== 'locked') {
                  setSelectedTopicId('history-island');
                  setActiveEnv('island');
                }
              }}
              onMouseEnter={() => setHoveredTopicId('history-island')}
              onMouseLeave={() => setHoveredTopicId(null)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 relative select-none z-10 w-[25%] ${
                selectedTopicId === 'history-island' ? 'scale-110 filter drop-shadow-[0_0_20px_rgba(134,239,172,0.5)]' : 'hover:scale-105'
              }`}
            >
              {/* Floating Node Status Tag */}
              <div className="absolute top-[-34px] bg-white/95 border border-[#e5dec9] rounded-xl px-2 py-0.5 shadow-sm text-[8px] font-bold z-20 flex items-center gap-1">
                {islandProgress?.status === 'locked' ? <Lock size={8} className="text-[#78716c]" /> : islandProgress?.status === 'completed' ? <Award size={8} className="text-emerald-600" /> : <Play size={8} className="text-blue-500" />}
                <span>History Island</span>
              </div>

              {/* 3D Stacked Books Image */}
              <img 
                src="/assets/stacked_books_3d.png" 
                alt="History Island Stack of Books"
                className={`w-[130px] h-auto object-contain transition-all ${islandProgress?.status === 'locked' ? 'grayscale opacity-75' : ''}`}
              />
            </div>

            {/* PROP 2: 3D NOTEBOOK AND PEN (ALGEBRA REEF) */}
            <div 
              onClick={() => {
                setSelectedTopicId('algebra-reef');
                setActiveEnv('reef');
              }}
              onMouseEnter={() => setHoveredTopicId('algebra-reef')}
              onMouseLeave={() => setHoveredTopicId(null)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 relative select-none z-10 w-[42%] ${
                selectedTopicId === 'algebra-reef' ? 'scale-110 filter drop-shadow-[0_0_20px_rgba(125,211,252,0.5)]' : 'hover:scale-105'
              }`}
            >
              {/* Floating Node Status Tag */}
              <div className="absolute top-[-34px] bg-white/95 border border-[#e5dec9] rounded-xl px-2 py-0.5 shadow-sm text-[8px] font-bold z-20 flex items-center gap-1">
                {reefProgress?.status === 'completed' ? <Award size={8} className="text-emerald-600" /> : <Play size={8} className="text-blue-500" />}
                <span>Algebra Reef</span>
              </div>

              {/* 3D Lined Notebook and Pen Image */}
              <img 
                src="/assets/notebook_3d.png" 
                alt="Algebra Reef Lined Notebook"
                className="w-[200px] h-auto object-contain"
              />
            </div>

            {/* PROP 3: 3D COFFEE CUP AND SAUCER (PHYSICS VOLCANO) */}
            <div 
              onClick={() => {
                if (volcanoProgress?.status !== 'locked') {
                  setSelectedTopicId('physics-volcano');
                  setActiveEnv('volcano');
                }
              }}
              onMouseEnter={() => setHoveredTopicId('physics-volcano')}
              onMouseLeave={() => setHoveredTopicId(null)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 relative select-none z-10 w-[20%] ${
                selectedTopicId === 'physics-volcano' ? 'scale-110 filter drop-shadow-[0_0_20px_rgba(212,165,116,0.5)]' : 'hover:scale-105'
              }`}
            >
              {/* Floating Node Status Tag */}
              <div className="absolute top-[-34px] bg-white/95 border border-[#e5dec9] rounded-xl px-2 py-0.5 shadow-sm text-[8px] font-bold z-20 flex items-center gap-1">
                {volcanoProgress?.status === 'locked' ? <Lock size={8} className="text-[#78716c]" /> : volcanoProgress?.status === 'completed' ? <Award size={8} className="text-emerald-600" /> : <Play size={8} className="text-blue-500" />}
                <span>Physics Volcano</span>
              </div>

              {/* Steam rising particles */}
              {selectedTopicId === 'physics-volcano' && (
                <div className="absolute top-[-25px] flex gap-1 justify-center w-full">
                  <div className="w-1 h-3 bg-[#d4a574]/40 rounded-full blur-[1px] animate-bounce"></div>
                  <div className="w-1 h-4 bg-[#d4a574]/30 rounded-full blur-[1px] animate-bounce [animation-delay:0.3s]"></div>
                  <div className="w-1 h-3 bg-[#d4a574]/40 rounded-full blur-[1px] animate-bounce [animation-delay:0.6s]"></div>
                </div>
              )}

              {/* 3D Coffee Cup Image */}
              <img 
                src="/assets/coffee_cup_3d.png" 
                alt="Physics Volcano Coffee Cup"
                className={`w-[90px] h-auto object-contain transition-all ${volcanoProgress?.status === 'locked' ? 'grayscale opacity-75' : ''}`}
              />
            </div>

          </div>

          {/* FLOATING RIN BUBBLE (Speech Feedback) */}
          <div className="absolute bottom-[-24px] right-4 bg-white border border-[#e5dec9] rounded-2xl p-4 shadow-[0_8px_24px_rgba(30,41,59,0.08)] flex items-start gap-3 max-w-[320px] text-left transform hover:scale-[1.02] transition-transform duration-300 clay-card z-20">
            <div className="w-8 h-8 rounded-full bg-[#fde68a]/30 flex items-center justify-center flex-shrink-0 animate-glow-gold border border-white/50 overflow-hidden">
              <img src="/assets/rin_mascot_3d.png" alt="Mini Rin" className="w-6 h-6 object-contain" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#1e293b]">
                Rin
              </span>
              <p className="text-[11px] font-semibold text-[#78716c] leading-relaxed mt-1">
                {getRinSpeech()}
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

export default OceanMap;
