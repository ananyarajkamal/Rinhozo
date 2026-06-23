import React, { useState, useEffect } from 'react';
import { RinAvatar } from '../components/RinAvatar';
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
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 3D rotation styles based on mouse position
  const tiltRin = {
    transform: `rotateY(${mousePos.x * 20}deg) rotateX(${-mousePos.y * 20}deg) translateZ(40px)`,
    transition: 'transform 0.15s ease-out'
  };

  const tiltBadgeFar = (offsetMultiplier: number) => ({
    transform: `rotateY(${mousePos.x * 30 * offsetMultiplier}deg) rotateX(${-mousePos.y * 30 * offsetMultiplier}deg) translateZ(80px)`,
    transition: 'transform 0.15s ease-out'
  });

  const tiltTableProps = {
    transform: `rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) translateZ(15px)`,
    transition: 'transform 0.2s ease-out'
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

  // Background active environment simulation configurations
  const volcanoParticles = Array.from({ length: 15 });
  const reefWaves = Array.from({ length: 4 });

  const handleSelectTopicAction = (topicId: string) => {
    const status = topics[topicId as keyof typeof topics]?.status;
    if (status !== 'locked') {
      onSelectTopic(topicId);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col relative font-sans overflow-x-hidden perspective-3d select-none"
    >
      {/* ENVIRONMENTAL BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700 z-0">
        {activeEnv === 'reef' && (
          <div className="absolute inset-0 bg-[#f4f7f6] transition-opacity duration-700">
            <div className="absolute top-20 left-1/4 w-32 h-32 bg-[#7dd3fc]/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-24 right-1/4 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
            <svg className="absolute bottom-0 w-full h-40 opacity-30 text-[#7dd3fc]" viewBox="0 0 1440 200" fill="none" preserveAspectRatio="none">
              {reefWaves.map((_, i) => (
                <path
                  key={i}
                  d={`M0,${80 + i * 20} Q360,${40 - i * 15} 720,${80 + i * 10} T1440,${80 - i * 10}`}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="animate-sway-left"
                  style={{ animationDuration: `${6 + i * 3}s` }}
                />
              ))}
            </svg>
          </div>
        )}

        {activeEnv === 'volcano' && (
          <div className="absolute inset-0 bg-[#faf4ec] transition-opacity duration-700">
            <div className="absolute top-12 right-1/4 w-40 h-40 bg-[#d4a574]/15 rounded-full blur-3xl animate-float"></div>
            {volcanoParticles.map((_, i) => {
              const size = Math.random() * 8 + 4;
              const left = Math.random() * 100;
              const duration = Math.random() * 8 + 4;
              const delay = Math.random() * 5;
              return (
                <div
                  key={i}
                  className="absolute bottom-[-10px] rounded-full bg-[#d4a574] opacity-35"
                  style={{
                    width: size,
                    height: size,
                    left: `${left}%`,
                    animation: `float ${duration}s linear infinite`,
                    animationDelay: `${delay}s`,
                    filter: 'blur(1px)'
                  }}
                />
              );
            })}
          </div>
        )}

        {activeEnv === 'island' && (
          <div className="absolute inset-0 bg-[#f7f8f4] transition-opacity duration-700">
            <div className="absolute w-[600px] h-[300px] bg-[#e5dec9]/35 rounded-full blur-[80px] -left-20 top-10 transform -rotate-12 animate-float" style={{ animationDuration: '24s' }}></div>
            <div className="absolute w-[500px] h-[250px] bg-[#e5dec9]/20 rounded-full blur-[70px] right-20 bottom-10 transform rotate-12 animate-float" style={{ animationDuration: '18s' }}></div>
          </div>
        )}
      </div>

      {/* HEADER NAVBAR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <RinAvatar mood={activeEnv === 'reef' ? 'happy' : activeEnv === 'volcano' ? 'excited' : 'calm'} size={40} interactive={false} glowIntensity={0.2} evolutionLevel={evolutionLevel} />
          </div>
          <span className="text-xl font-bold tracking-widest text-[#1e293b]">RINHOZO</span>
        </div>

        {/* Dashboard Navigation Menu (Claymorphic Pill) */}
        <nav className="hidden md:flex items-center bg-[#faf6f0] border border-[#e5dec9]/60 rounded-full px-2 py-1.5 shadow-[inset_1px_1px_3px_#ffffff,inset_-1px_-1px_3px_rgba(0,0,0,0.02),0_4px_12px_rgba(30,41,59,0.03)]">
          <button 
            onClick={() => onNavigate('profile')} 
            className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-white hover:shadow-sm rounded-full transition-all cursor-pointer"
          >
            Profile
          </button>
          <button 
            onClick={() => onNavigate('reels')} 
            className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-white hover:shadow-sm rounded-full transition-all cursor-pointer"
          >
            Learning Reels
          </button>
          <button 
            onClick={() => onNavigate('downloads')} 
            className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-white hover:shadow-sm rounded-full transition-all cursor-pointer"
          >
            Downloads
          </button>
          <button 
            onClick={() => onNavigate('settings')} 
            className="px-5 py-2 text-sm font-bold text-[#78716c] hover:text-[#1e293b] hover:bg-white hover:shadow-sm rounded-full transition-all cursor-pointer"
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* LEFT COLUMN: ACTIVE TOPIC DETAILS PANEL */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left">
          
          <span className="text-xs font-bold text-[#d4a574] uppercase tracking-wider mb-2">
            Selected Reef Area
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-[44px] leading-tight font-bold text-[#1e293b] tracking-tight mb-4">
            {activeTopic.name}
          </h1>

          <p className="text-[#78716c] text-base mb-6 leading-relaxed">
            {activeTopic.description}
          </p>

          {/* Expanded detail box */}
          <div className="bg-white border border-[#e5dec9]/60 rounded-3xl p-5 shadow-sm clay-card mb-8">
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
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-bold text-[#1e293b]">
                  Adapting to your learning style: {profile?.learning_style || 'story'} mode
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
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
            
            <div className="flex bg-[#f0ebe3] border border-[#e5dec9]/30 rounded-full p-1 self-center sm:self-start">
              <button 
                onClick={() => { setActiveEnv('reef'); setSelectedTopicId('algebra-reef'); }}
                className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all cursor-pointer ${selectedTopicId === 'algebra-reef' ? 'bg-[#1e293b] text-white' : 'text-[#78716c] hover:text-[#1e293b]'}`}
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
                    ? 'text-stone-400 cursor-not-allowed' 
                    : selectedTopicId === 'physics-volcano' 
                    ? 'bg-[#1e293b] text-white' 
                    : 'text-[#78716c] hover:text-[#1e293b]'
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
                    ? 'text-stone-400 cursor-not-allowed' 
                    : selectedTopicId === 'history-island' 
                    ? 'bg-[#1e293b] text-white' 
                    : 'text-[#78716c] hover:text-[#1e293b]'
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
            
            {/* MAIN GLOWING RIN AVATAR */}
            <div className="animate-float">
              <RinAvatar 
                mood={activeEnv === 'reef' ? 'happy' : activeEnv === 'volcano' ? 'excited' : 'calm'} 
                size={310} 
                interactive={true} 
                glowIntensity={0.8} 
                evolutionLevel={evolutionLevel}
              />
            </div>

            {/* FLOATING CLAYMORPHIC BADGES (Navigation Shortcuts) */}
            {/* Reels Lightbulb Shortcut */}
            <button 
              onClick={() => onNavigate('reels')}
              style={tiltBadgeFar(1.1)}
              className="absolute top-2 left-16 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:1.5s] cursor-pointer group"
              title="Learning Reels"
            >
              <Lightbulb size={20} className="text-[#d4a574] group-hover:scale-110 transition-transform" fill="currentColor" fillOpacity={0.1} />
            </button>

            {/* Downloads Book Shortcut */}
            <button 
              onClick={() => onNavigate('downloads')}
              style={tiltBadgeFar(0.9)}
              className="absolute top-28 left-6 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:0.5s] cursor-pointer group"
              title="Offline Downloads"
            >
              <BookOpen size={20} className="text-[#d4a574] group-hover:scale-110 transition-transform" />
            </button>

            {/* Stats Chart Shortcut */}
            <button 
              onClick={() => onNavigate('profile')}
              style={tiltBadgeFar(1.2)}
              className="absolute top-4 right-16 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:2.2s] cursor-pointer group"
              title="Profile Stats"
            >
              <BarChart3 size={20} className="text-[#7dd3fc] group-hover:scale-110 transition-transform" />
            </button>

            {/* Settings Puzzle Shortcut */}
            <button 
              onClick={() => onNavigate('settings')}
              style={tiltBadgeFar(1.0)}
              className="absolute top-24 right-6 bg-white border border-[#e5dec9]/60 rounded-2xl p-2.5 shadow-md clay-card animate-float [animation-delay:1.1s] cursor-pointer group"
              title="Settings"
            >
              <Puzzle size={20} className="text-[#78716c] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* TABLE TOP SURFACE WITH PROPS */}
          <div 
            style={tiltTableProps}
            className="w-full border-t border-[#e5dec9] mt-2 pt-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 relative"
          >
            
            {/* SVG Glowing Path Connectors between table props */}
            <svg className="absolute inset-x-0 top-[-60px] h-[100px] w-full pointer-events-none z-0" style={{ transformStyle: 'preserve-3d' }}>
              <path
                d="M 120 80 C 200 40, 260 120, 360 80"
                fill="none"
                stroke={volcanoProgress?.status !== 'locked' ? '#d4a574' : '#e5dec9'}
                strokeWidth={volcanoProgress?.status !== 'locked' ? '4' : '2'}
                strokeDasharray={volcanoProgress?.status !== 'locked' ? '0' : '6,6'}
                className="transition-all duration-500 opacity-60"
              />
              <path
                d="M 360 80 C 260 120, 180 120, 100 130"
                fill="none"
                stroke={islandProgress?.status !== 'locked' ? '#86efac' : '#e5dec9'}
                strokeWidth={islandProgress?.status !== 'locked' ? '4' : '2'}
                strokeDasharray={islandProgress?.status !== 'locked' ? '0' : '6,6'}
                className="transition-all duration-500 opacity-60"
              />
            </svg>

            {/* PROP 1: 3D Stacked books (representing HISTORY ISLAND) */}
            <div 
              onClick={() => {
                if (islandProgress?.status !== 'locked') {
                  setSelectedTopicId('history-island');
                  setActiveEnv('island');
                }
              }}
              onMouseEnter={() => setHoveredTopicId('history-island')}
              onMouseLeave={() => setHoveredTopicId(null)}
              className={`flex flex-col -space-y-2.5 transform scale-90 sm:scale-100 origin-bottom-left text-left cursor-pointer transition-all duration-200 relative ${
                selectedTopicId === 'history-island' ? 'scale-105 filter drop-shadow-[0_0_15px_rgba(134,239,172,0.4)]' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Floating Node Status Tag */}
              <div className="absolute top-[-30px] left-4 bg-white border border-[#e5dec9]/60 rounded-xl px-2.5 py-1 shadow-sm text-[9px] font-bold z-10 flex items-center gap-1">
                {islandProgress?.status === 'locked' ? <Lock size={9} className="text-stone-400" /> : islandProgress?.status === 'completed' ? <Award size={9} className="text-emerald-500" /> : <Play size={9} className="text-blue-500" />}
                <span>History Island</span>
              </div>

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
              <div className={`w-44 h-8 text-white border rounded-md px-4 flex items-center justify-between font-bold text-xs shadow-lg transform -rotate-2 book-spine-3d transition-all ${
                islandProgress?.status === 'locked' ? 'bg-[#78716c] border-stone-800' : 'bg-[#1e293b] border-black'
              }`}>
                <span>Curiosity</span>
                <span className="opacity-30">I</span>
              </div>
            </div>

            {/* PROP 2: 3D Folded Notebook and Pen (representing ALGEBRA REEF) */}
            <div 
              onClick={() => {
                setSelectedTopicId('algebra-reef');
                setActiveEnv('reef');
              }}
              onMouseEnter={() => setHoveredTopicId('algebra-reef')}
              onMouseLeave={() => setHoveredTopicId(null)}
              className={`relative bg-white border border-[#e5dec9]/60 rounded-2xl p-5 w-60 shadow-lg text-left transform rotate-1 clay-card cursor-pointer transition-all duration-200 ${
                selectedTopicId === 'algebra-reef' ? 'scale-105 filter drop-shadow-[0_0_15px_rgba(125,211,252,0.4)]' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Floating Node Status Tag */}
              <div className="absolute top-[-16px] left-6 bg-white border border-[#e5dec9]/60 rounded-xl px-2.5 py-1 shadow-sm text-[9px] font-bold z-10 flex items-center gap-1">
                {reefProgress?.status === 'completed' ? <Award size={9} className="text-emerald-500" /> : <Play size={9} className="text-blue-500" />}
                <span>Algebra Reef</span>
              </div>

              {/* Spine shadow for folded book look */}
              <div className="absolute left-28 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/5 via-black/10 to-transparent"></div>
              {/* Lined notebook decoration */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-red-200"></div>
              <div className="space-y-3 font-handwritten text-[#d4a574] text-lg pl-6">
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">x + 3 = 10</p>
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">Solve for x</p>
                <p className="border-b border-[#e5dec9]/40 leading-none pb-1">x = 10 - 3</p>
                <p className="leading-none flex items-center gap-1">x = 7</p>
              </div>
              {/* 3D Cylinder Pen */}
              <div className="absolute right-6 bottom-4 w-28 h-2.5 bg-yellow-600 border border-yellow-700/30 rounded-full transform -rotate-[22deg] origin-bottom-right shadow-md">
                <div className="absolute right-0 top-0 w-3 h-2.5 bg-[#d4a574] rounded-r-full shadow-inner"></div>
              </div>
            </div>

            {/* PROP 3: Coffee Cup and Saucer (representing PHYSICS VOLCANO) */}
            <div 
              onClick={() => {
                if (volcanoProgress?.status !== 'locked') {
                  setSelectedTopicId('physics-volcano');
                  setActiveEnv('volcano');
                }
              }}
              onMouseEnter={() => setHoveredTopicId('physics-volcano')}
              onMouseLeave={() => setHoveredTopicId(null)}
              className={`flex flex-col items-center mr-0 sm:mr-4 cursor-pointer transition-all duration-200 relative ${
                selectedTopicId === 'physics-volcano' ? 'scale-105 filter drop-shadow-[0_0_15px_rgba(212,165,116,0.4)]' : 'hover:scale-[1.02]'
              }`}
            >
              {/* Floating Node Status Tag */}
              <div className="absolute top-[-36px] bg-white border border-[#e5dec9]/60 rounded-xl px-2.5 py-1 shadow-sm text-[9px] font-bold z-10 flex items-center gap-1">
                {volcanoProgress?.status === 'locked' ? <Lock size={9} className="text-stone-400" /> : volcanoProgress?.status === 'completed' ? <Award size={9} className="text-emerald-500" /> : <Play size={9} className="text-blue-500" />}
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

              {/* Cup */}
              <div className="relative w-16 h-12 bg-gradient-to-b from-[#fdfbf7] to-[#f5e6d3] border border-[#e5dec9] rounded-b-2xl shadow-md flex items-center justify-center">
                {/* Lock indicator on cup */}
                {volcanoProgress?.status === 'locked' && (
                  <Lock size={12} className="text-stone-400 opacity-60" />
                )}
                {/* Handle */}
                <div className="absolute -right-3.5 top-2.5 w-4 h-6 border-[3px] border-[#e5dec9] border-l-0 rounded-r-full shadow-sm"></div>
              </div>
              {/* Saucer */}
              <div className="w-20 h-2 bg-gradient-to-b from-[#ffffff] to-[#f0ebe3] border border-[#e5dec9] rounded-full shadow-md -mt-0.5"></div>
            </div>

          </div>

          {/* FLOATING RIN BUBBLE (Claymorphic speech feedback) */}
          <div className="absolute bottom-[-16px] md:bottom-[-24px] right-2 md:right-4 bg-white border border-[#e5dec9]/60 rounded-2xl p-4 shadow-xl flex items-start gap-3.5 max-w-[320px] text-left transform hover:scale-[1.02] transition-transform duration-300 clay-card z-20">
            <div className="w-9 h-9 rounded-full bg-[#fde68a]/30 flex items-center justify-center flex-shrink-0 animate-glow-gold border border-white/50">
              <RinAvatar mood={activeEnv === 'reef' ? 'happy' : activeEnv === 'volcano' ? 'excited' : 'calm'} size={28} interactive={false} glowIntensity={0.3} evolutionLevel={evolutionLevel} />
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
