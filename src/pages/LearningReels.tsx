import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, Heart, Volume2 } from 'lucide-react';

interface ReelItem {
  id: string;
  title: string;
  subtitle: string;
  topic: string;
  description: string;
  animationType: 'loop' | 'fall' | 'spin';
}

interface LearningReelsProps {
  onBackToMap: () => void;
}

export const LearningReels: React.FC<LearningReelsProps> = ({ onBackToMap }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [audioActive, setAudioActive] = useState(false);

  const reels: ReelItem[] = [
    {
      id: 'reel-1',
      title: 'Recursion Loops',
      subtitle: 'Repeating systems in Algebra Reef',
      topic: 'Algebra',
      description: 'Recursion happens when a function calls itself inside itself. Think of it like a dream inside another dream, forming a loop.',
      animationType: 'loop'
    },
    {
      id: 'reel-2',
      title: 'Gravitational Fall',
      subtitle: 'Force behaviors in Physics Volcano',
      topic: 'Physics',
      description: 'Objects fall because of Earth gravity. In a vacuum, a feather and stone fall at the exact same rate. Gravity pulls all mass equally.',
      animationType: 'fall'
    },
    {
      id: 'reel-3',
      title: 'Archeology Decoded',
      subtitle: 'Deciphering trade on History Island',
      topic: 'History',
      description: 'Ancient coins found deep in island ruins prove trading routes. Historians act as detectives using physical artifacts as clues.',
      animationType: 'spin'
    }
  ];

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && activeIndex < reels.length - 1) {
      setActiveIndex(prev => prev + 1);
      setIsPlaying(true);
    } else if (direction === 'down' && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!audioActive) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.onend = () => setAudioActive(false);
        window.speechSynthesis.speak(utterance);
        setAudioActive(true);
      } else {
        setAudioActive(false);
      }
    }
  };

  const currentReel = reels[activeIndex];

  return (
    <div className="min-h-screen bg-[#1e293b] text-white flex flex-col justify-between items-center p-4 md:p-6 overflow-hidden select-none relative">
      
      {/* HEADER OVERLAY */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 bg-gradient-to-b from-black/50 to-transparent p-4 rounded-t-3xl">
        <button 
          onClick={() => {
            window.speechSynthesis.cancel();
            onBackToMap();
          }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-xs font-bold uppercase tracking-widest text-[#fde68a]">Learning Reels</span>
        <div className="w-10"></div>
      </div>

      {/* SWIPEABLE CARD WINDOW */}
      <div className="flex-1 w-full max-w-sm flex items-center justify-center relative mt-16 mb-4">
        
        {/* Swipe gestures interceptor */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.4}
          onDragEnd={(_e, info) => {
            if (info.offset.y < -80) {
              handleSwipe('up');
            } else if (info.offset.y > 80) {
              handleSwipe('down');
            }
          }}
          className="relative w-full h-[480px] bg-black/60 rounded-[32px] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReel.id}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -200, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full flex flex-col justify-between"
            >
              {/* ANIMATED CANVAS GRAPHIC BACKGROUND */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#1e293b] to-black flex items-center justify-center overflow-hidden z-0">
                {isPlaying && currentReel.animationType === 'loop' && (
                  /* RECURSION LOOP CANVAS */
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <motion.div 
                      className="absolute border-[6px] border-[#7dd3fc]/30 rounded-full w-40 h-40"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div 
                      className="absolute border-[6px] border-[#d4a574]/40 rounded-full w-28 h-28"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div 
                      className="absolute border-[6px] border-emerald-400/50 rounded-full w-16 h-16"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                )}

                {isPlaying && currentReel.animationType === 'fall' && (
                  /* GRAVITY ACCELERATION CANVAS */
                  <div className="relative w-full h-full flex flex-col items-center justify-between py-12">
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-[#d4a574] shadow-lg shadow-[#d4a574]/30"
                      animate={{ y: [0, 240, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeIn' }}
                    />
                    <div className="w-28 h-2.5 bg-white/20 rounded-full border border-white/10"></div>
                  </div>
                )}

                {isPlaying && currentReel.animationType === 'spin' && (
                  /* ARCHEOLOGY COIN DECODER CANVAS */
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-full border-4 border-[#86efac]/80 bg-[#86efac]/10 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                    >
                      {/* Coins details */}
                      <div className="w-16 h-16 rounded-full border border-[#86efac] flex items-center justify-center font-bold text-xs text-[#86efac]">
                        Trade
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* VIDEO CONTROLS OVERLAY */}
              <div className="absolute top-4 right-4 flex flex-col gap-3.5 z-20">
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(currentReel.id)}
                  className={`p-3 rounded-full transition-all cursor-pointer shadow-md ${
                    liked[currentReel.id] ? 'bg-red-500 text-white' : 'bg-black/45 text-white border border-white/10'
                  }`}
                >
                  <Heart size={20} fill={liked[currentReel.id] ? 'currentColor' : 'none'} />
                </button>

                {/* Speak Button */}
                <button
                  onClick={() => handleSpeak(currentReel.description)}
                  className={`p-3 rounded-full transition-all cursor-pointer shadow-md ${
                    audioActive ? 'bg-[#d4a574] text-white' : 'bg-black/45 text-white border border-white/10'
                  }`}
                >
                  <Volume2 size={20} />
                </button>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 rounded-full bg-black/45 border border-white/10 text-white hover:bg-black/60 transition-all cursor-pointer shadow-md"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                </button>
              </div>

              {/* TEXT SUMMARY BLOCK AT THE BOTTOM */}
              <div className="w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 text-left z-10 mt-auto">
                <span className="text-[10px] font-bold text-[#fde68a] uppercase tracking-wider bg-[#d4a574]/30 px-2 py-0.5 rounded-md border border-[#d4a574]/30">
                  {currentReel.topic}
                </span>
                
                <h3 className="text-lg font-bold text-white mt-2 leading-none">
                  {currentReel.title}
                </h3>
                <span className="text-xs text-white/50 block mt-1">
                  {currentReel.subtitle}
                </span>

                <p className="text-xs text-white/80 font-medium leading-relaxed mt-3 border-t border-white/10 pt-3">
                  {currentReel.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </motion.div>

      </div>

      {/* SWIPE HINTS AT THE BOTTOM */}
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5 mb-2">
        Swipe Up for Next Reel
      </div>

    </div>
  );
};
export default LearningReels;
