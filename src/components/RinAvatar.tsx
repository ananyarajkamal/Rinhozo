import React from 'react';
import { motion } from 'framer-motion';

export type RinMood = 'happy' | 'concerned' | 'excited' | 'calm';

interface RinAvatarProps {
  mood?: RinMood;
  evolutionLevel?: number; // 1 to 5
  glowIntensity?: number; // 0 to 1
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const RinAvatar: React.FC<RinAvatarProps> = ({
  mood = 'happy',
  evolutionLevel = 1,
  glowIntensity = 0.5,
  size = 200,
  className = '',
  interactive = true
}) => {
  // Define backglow colors based on mood
  const moodConfig = {
    happy: {
      glowColor: 'rgba(214, 161, 95, 0.45)', // warm gold
      glowClass: 'animate-glow-gold'
    },
    concerned: {
      glowColor: 'rgba(248, 113, 113, 0.45)', // rose/concern
      glowClass: 'animate-glow-rose'
    },
    excited: {
      glowColor: 'rgba(125, 211, 252, 0.55)', // bright cyan
      glowClass: 'animate-glow-cyan'
    },
    calm: {
      glowColor: 'rgba(134, 239, 172, 0.45)', // soft green/emerald
      glowClass: 'animate-glow-emerald'
    }
  };

  const config = moodConfig[mood];

  // Floating animation settings
  const floatDuration = mood === 'concerned' ? 4 : mood === 'excited' ? 2.5 : 5;

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      {/* Background bioluminescent glow ring */}
      <motion.div
        animate={{ 
          scale: [0.92, 1.08, 0.92],
          opacity: [0.55, 0.85, 0.55]
        }}
        transition={{ 
          duration: floatDuration, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          filter: `blur(${12 * glowIntensity}px)`,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Rotating outer dash halo for Level 5 */}
      {evolutionLevel === 5 && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-[#D6A15F]/40"
          style={{ zIndex: 2, pointerEvents: 'none', margin: '-8px' }}
        />
      )}

      {/* Main Mascot image with floating motion */}
      <motion.div
        animate={{ 
          y: [0, -10, 0] 
        }}
        transition={{ 
          duration: floatDuration, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        whileHover={interactive ? { scale: 1.06, rotate: 1 } : {}}
        whileTap={interactive ? { scale: 0.96 } : {}}
        className={`w-full h-full flex items-center justify-center relative ${interactive ? 'cursor-pointer' : ''}`}
        style={{ zIndex: 3 }}
      >
        <img
          src="/assets/rin_mascot_3d_clean.png"
          alt="Rin — your AI learning companion"
          style={{ 
            width: '90%', 
            height: '90%', 
            objectFit: 'contain',
            filter: `drop-shadow(0 12px 24px rgba(22,35,58,0.12))`
          }}
        />
      </motion.div>
    </div>
  );
};

export default RinAvatar;
