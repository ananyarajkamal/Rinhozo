import React, { useState, useEffect } from 'react';
import { RinAvatar } from '../components/RinAvatar';
import { db } from '../lib/db';
import type { UserProfile, UserProgress } from '../lib/db';
import { Play, Lock, User, Settings, Download, Award } from 'lucide-react';

interface OceanMapProps {
  onSelectTopic: (topicId: string) => void;
  onNavigate: (route: 'landing' | 'profile' | 'settings' | 'downloads') => void;
}

export const OceanMap: React.FC<OceanMapProps> = ({ onSelectTopic, onNavigate }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reefProgress, setReefProgress] = useState<UserProgress | null>(null);
  const [volcanoProgress, setVolcanoProgress] = useState<UserProgress | null>(null);
  const [islandProgress, setIslandProgress] = useState<UserProgress | null>(null);
  const [activeEnv, setActiveEnv] = useState<'reef' | 'volcano' | 'island'>('reef');

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
    }
    loadData();
  }, []);

  const nodes = [
    {
      id: 'algebra-reef',
      envId: 'reef' as const,
      name: 'Algebra Reef',
      description: 'Variables and simple linear equations.',
      difficulty: 'Easy',
      x: 150,
      y: 120,
      status: reefProgress?.status || 'available',
      gradient: 'from-[#7dd3fc] to-blue-400'
    },
    {
      id: 'physics-volcano',
      envId: 'volcano' as const,
      name: 'Physics Volcano',
      description: 'Force, mass, and gravitational attraction.',
      difficulty: 'Medium',
      x: 350,
      y: 280,
      status: volcanoProgress?.status || 'locked',
      gradient: 'from-[#d4a574] to-amber-600'
    },
    {
      id: 'history-island',
      envId: 'island' as const,
      name: 'History Island',
      description: 'Literary records and artifacts of empires.',
      difficulty: 'Medium',
      x: 550,
      y: 160,
      status: islandProgress?.status || 'locked',
      gradient: 'from-emerald-400 to-teal-600'
    }
  ];

  // Particle systems for Physics Volcano background
  const volcanoParticles = Array.from({ length: 15 });

  // Floating wave paths for Algebra Reef background
  const reefWaves = Array.from({ length: 4 });

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col relative select-none overflow-hidden">
      
      {/* BACKGROUND ENVIRONMENTS WITH CUSTOM ANIMATIONS */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700 z-0">
        
        {/* ENV 1: ALGEBRA REEF (Active background) */}
        {activeEnv === 'reef' && (
          <div className="absolute inset-0 bg-[#f4f7f6] transition-opacity duration-700">
            {/* Bioluminescent floating lights */}
            <div className="absolute top-20 left-1/4 w-32 h-32 bg-[#7dd3fc]/10 rounded-full blur-2xl animate-float"></div>
            <div className="absolute bottom-24 right-1/4 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl animate-float [animation-delay:2s]"></div>
            
            {/* Wavy floating lines */}
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

        {/* ENV 2: PHYSICS VOLCANO (Active background) */}
        {activeEnv === 'volcano' && (
          <div className="absolute inset-0 bg-[#faf4ec] transition-opacity duration-700">
            <div className="absolute top-12 right-1/4 w-40 h-40 bg-[#d4a574]/15 rounded-full blur-3xl animate-float"></div>
            
            {/* Floating rising lava/ash particle simulation */}
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

        {/* ENV 3: HISTORY ISLAND (Active background) */}
        {activeEnv === 'island' && (
          <div className="absolute inset-0 bg-[#f7f8f4] transition-opacity duration-700">
            {/* Cloud shadow drift */}
            <div className="absolute w-[600px] h-[300px] bg-[#e5dec9]/35 rounded-full blur-[80px] -left-20 top-10 transform -rotate-12 animate-float" style={{ animationDuration: '24s' }}></div>
            <div className="absolute w-[500px] h-[250px] bg-[#e5dec9]/20 rounded-full blur-[70px] right-20 bottom-10 transform rotate-12 animate-float" style={{ animationDuration: '18s' }}></div>
          </div>
        )}

      </div>

      {/* TOP HEADER */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between z-10 border-b border-[#e5dec9]/30 bg-[#faf6f0]/75 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <RinAvatar mood={activeEnv === 'reef' ? 'happy' : activeEnv === 'volcano' ? 'excited' : 'calm'} size={44} interactive={false} glowIntensity={0.4} />
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-[#1e293b] leading-tight">Ocean Map</span>
            <span className="text-[11px] font-semibold text-[#78716c] uppercase tracking-wider">
              {profile?.streak_count || 1} Day Streak
            </span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('profile')}
            className="p-3 bg-white hover:bg-[#f0ebe3] text-[#1e293b] border border-[#e5dec9] rounded-2xl shadow-sm transition-all cursor-pointer"
            title="Profile"
          >
            <User size={18} />
          </button>
          <button 
            onClick={() => onNavigate('downloads')}
            className="p-3 bg-white hover:bg-[#f0ebe3] text-[#1e293b] border border-[#e5dec9] rounded-2xl shadow-sm transition-all cursor-pointer"
            title="Offline Downloads"
          >
            <Download size={18} />
          </button>
          <button 
            onClick={() => onNavigate('settings')}
            className="p-3 bg-white hover:bg-[#f0ebe3] text-[#1e293b] border border-[#e5dec9] rounded-2xl shadow-sm transition-all cursor-pointer"
            title="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* INTERACTIVE MAP CONTAINER */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 flex flex-col justify-center items-center z-10">
        
        {/* Theme tabs to change active environment animation preview */}
        <div className="flex bg-[#f0ebe3] border border-[#e5dec9]/30 rounded-2xl p-1 mb-8 self-center">
          <button 
            onClick={() => setActiveEnv('reef')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeEnv === 'reef' ? 'bg-[#1e293b] text-white' : 'text-[#78716c] hover:text-[#1e293b]'}`}
          >
            Algebra Reef
          </button>
          <button 
            onClick={() => setActiveEnv('volcano')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeEnv === 'volcano' ? 'bg-[#1e293b] text-white' : 'text-[#78716c] hover:text-[#1e293b]'}`}
          >
            Physics Volcano
          </button>
          <button 
            onClick={() => setActiveEnv('island')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeEnv === 'island' ? 'bg-[#1e293b] text-white' : 'text-[#78716c] hover:text-[#1e293b]'}`}
          >
            History Island
          </button>
        </div>

        {/* MAP COORDINATES AREA */}
        <div className="relative w-full max-w-4xl h-[400px] border border-[#e5dec9]/40 rounded-3xl bg-white/40 backdrop-blur-sm p-8 shadow-[0_12px_40px_rgba(30,41,59,0.02)] overflow-hidden">
          
          {/* CONNECTOR LINES (SVGs) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Line 1: Algebra Reef -> Physics Volcano */}
            <path
              d="M 150 120 C 250 120, 250 280, 350 280"
              fill="none"
              stroke={volcanoProgress?.status !== 'locked' ? '#d4a574' : '#e5dec9'}
              strokeWidth={volcanoProgress?.status !== 'locked' ? '4.5' : '3.5'}
              strokeDasharray={volcanoProgress?.status !== 'locked' ? '0' : '8,6'}
              className="transition-all duration-500"
            />
            {/* Line 2: Physics Volcano -> History Island */}
            <path
              d="M 350 280 C 450 280, 450 160, 550 160"
              fill="none"
              stroke={islandProgress?.status !== 'locked' ? 'url(#activeGrad)' : '#e5dec9'}
              strokeWidth={islandProgress?.status !== 'locked' ? '4.5' : '3.5'}
              strokeDasharray={islandProgress?.status !== 'locked' ? '0' : '8,6'}
              className="transition-all duration-500"
            />
            
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a574" />
                <stop offset="100%" stopColor="#86efac" />
              </linearGradient>
            </defs>
          </svg>

          {/* TOPIC MAP NODES */}
          {nodes.map((node) => {
            const isLocked = node.status === 'locked';
            const isCompleted = node.status === 'completed';

            return (
              <div
                key={node.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${(node.x / 800) * 100}%`,
                  top: `${(node.y / 400) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                {/* Node Interactive circle */}
                <button
                  disabled={isLocked}
                  onClick={() => {
                    setActiveEnv(node.envId);
                    onSelectTopic(node.id);
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-md transition-all cursor-pointer ${
                    isLocked 
                      ? 'bg-[#f0ebe3] border-[#e5dec9] text-[#78716c] cursor-not-allowed'
                      : isCompleted
                      ? `bg-white border-emerald-400 text-emerald-500 hover:scale-110`
                      : 'bg-white border-[#1e293b] text-[#1e293b] hover:scale-110 active:scale-95'
                  }`}
                >
                  {isLocked ? (
                    <Lock size={18} />
                  ) : isCompleted ? (
                    <Award size={22} />
                  ) : (
                    <Play size={18} fill="currentColor" className="ml-1" />
                  )}
                </button>

                {/* Node Card Details */}
                <div className={`mt-3 px-4 py-2.5 rounded-2xl border text-center max-w-[170px] shadow-sm bg-white ${
                  isLocked ? 'border-[#e5dec9]/60 opacity-60' : 'border-[#e5dec9]'
                }`}>
                  <span className="text-[10px] font-bold text-[#78716c] uppercase tracking-wider block mb-0.5">
                    {node.difficulty}
                  </span>
                  <span className="text-xs font-bold text-[#1e293b] block mb-1">
                    {node.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#78716c]">
                    {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

      </main>

      {/* FOOTER NAV BAR */}
      <footer className="w-full bg-[#f5e6d3]/30 border-t border-[#e5dec9]/40 py-4 mt-8 text-center text-xs font-bold text-[#78716c] tracking-wider uppercase z-10">
        Click a node to begin learning. You can select environment tabs to switch view animations.
      </footer>
    </div>
  );
};
export default OceanMap;
