import React from 'react';
import { motion } from 'framer-motion';

export type RinMood = 'happy' | 'concerned' | 'excited' | 'calm';

interface RinAvatarProps {
  mood?: RinMood;
  glowIntensity?: number; // 0 to 1
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const RinAvatar: React.FC<RinAvatarProps> = ({
  mood = 'happy',
  glowIntensity = 0.5,
  size = 200,
  className = '',
  interactive = true
}) => {
  // Define glow colors and animations based on mood
  const moodConfig = {
    happy: {
      glowColor: 'rgba(212, 165, 116, 0.4)', // Warm gold
      bodyColorStart: '#ffffff',
      bodyColorEnd: '#fde68a', // Soft gold
      tentacleColor: '#fde68a',
      glowClass: 'animate-glow-gold',
      smilePath: 'M 244,222 C 248,228 264,228 268,222',
      eyeOffset: { x: 0, y: 0 },
      tentacleSpeed: 3
    },
    concerned: {
      glowColor: 'rgba(252, 165, 165, 0.45)', // Rose/coral
      bodyColorStart: '#faf0e6',
      bodyColorEnd: '#fca5a5',
      tentacleColor: '#fca5a5',
      glowClass: 'animate-glow-rose',
      smilePath: 'M 246,224 C 251,221 261,221 266,224', // Straight/flat mouth
      eyeOffset: { x: -2, y: 1 },
      tentacleSpeed: 5
    },
    excited: {
      glowColor: 'rgba(125, 211, 252, 0.5)', // Bioluminescent cyan
      bodyColorStart: '#ffffff',
      bodyColorEnd: '#7dd3fc',
      tentacleColor: '#7dd3fc',
      glowClass: 'animate-glow-cyan',
      smilePath: 'M 242,220 C 248,232 264,232 270,220', // Wide smile
      eyeOffset: { x: 0, y: -2 },
      tentacleSpeed: 1.8
    },
    calm: {
      glowColor: 'rgba(134, 239, 172, 0.4)', // Soft emerald
      bodyColorStart: '#f0fdf4',
      bodyColorEnd: '#86efac',
      tentacleColor: '#86efac',
      glowClass: 'animate-glow-emerald',
      smilePath: 'M 245,221 C 248,225 264,225 267,221',
      eyeOffset: { x: 0, y: 0 },
      tentacleSpeed: 4
    }
  };

  const config = moodConfig[mood];

  // Motion variants for breathing effect
  const capVariants: any = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: config.tentacleSpeed,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  };

  // Tentacle sway variants
  const leftTentacleVariants: any = {
    animate: {
      rotate: [-4, 4, -4],
      transition: {
        duration: config.tentacleSpeed * 1.2,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  };

  const rightTentacleVariants: any = {
    animate: {
      rotate: [4, -4, 4],
      transition: {
        duration: config.tentacleSpeed * 1.1,
        ease: 'easeInOut',
        repeat: Infinity
      }
    }
  };

  return (
    <div 
      className={`relative inline-block select-none ${config.glowClass} ${className}`}
      style={{ 
        width: size, 
        height: size,
        filter: `drop-shadow(0 0 ${20 * glowIntensity}px ${config.glowColor})`
      }}
    >
      <svg 
        viewBox="0 0 512 512" 
        width="100%" 
        height="100%"
        className={interactive ? 'transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer' : ''}
      >
        <defs>
          {/* Gradient for main body dome */}
          <linearGradient id={`bodyGrad-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.bodyColorStart} />
            <stop offset="100%" stopColor={config.bodyColorEnd} />
          </linearGradient>

          {/* Gradient for tentacles */}
          <linearGradient id={`tentacleGrad-${mood}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.tentacleColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={config.tentacleColor} stopOpacity="0.15" />
          </linearGradient>

          {/* Shadow filter for 3D depth */}
          <filter id="shadowDepth" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1e293b" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* TENTACLES (Animated) */}
        <g filter="url(#shadowDepth)">
          {/* Inner Left Tentacle */}
          <motion.path 
            variants={leftTentacleVariants}
            animate="animate"
            d="M 216,280 C 190,340 240,400 216,450" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="12" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* Inner Right Tentacle */}
          <motion.path 
            variants={rightTentacleVariants}
            animate="animate"
            d="M 296,280 C 322,340 272,400 296,450" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="12" 
            strokeLinecap="round" 
            fill="none" 
          />
          
          {/* Outer Left Tentacle */}
          <motion.path 
            variants={leftTentacleVariants}
            animate="animate"
            d="M 166,270 C 130,335 190,380 160,435" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="9" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.7"
          />

          {/* Outer Right Tentacle */}
          <motion.path 
            variants={rightTentacleVariants}
            animate="animate"
            d="M 346,270 C 382,335 322,380 352,435" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="9" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.7"
          />

          {/* Center Thick Tentacle */}
          <motion.path 
            animate={{
              y: [0, 4, 0],
              transition: { duration: config.tentacleSpeed, repeat: Infinity, ease: "easeInOut" }
            }}
            d="M 256,290 C 240,360 275,410 256,470" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="14" 
            strokeLinecap="round" 
            fill="none" 
          />
        </g>

        {/* JELLYFISH CAP / BODY (Breathing Animation) */}
        <motion.g 
          variants={capVariants}
          animate="animate"
        >
          {/* Main Dome */}
          <path 
            d="M 120,270 
               C 110,180 180,110 256,110 
               C 332,110 402,180 392,270 
               C 340,295 280,265 256,280 
               C 230,265 170,295 120,270 Z" 
            fill={`url(#bodyGrad-${mood})`}
            filter="url(#shadowDepth)"
          />

          {/* Glowing Cheeks */}
          <circle cx="172" cy="225" r="16" fill="#fca5a5" opacity="0.5" filter="blur(4px)" />
          <circle cx="340" cy="225" r="16" fill="#fca5a5" opacity="0.5" filter="blur(4px)" />

          {/* EYES (With pupil tracking offset depending on mood) */}
          <g transform={`translate(${config.eyeOffset.x}, ${config.eyeOffset.y})`}>
            {/* Left Eye */}
            <circle cx="195" cy="210" r="15" fill="#1e293b" />
            <circle cx="189" cy="204" r="5" fill="#ffffff" />
            
            {/* Right Eye */}
            <circle cx="317" cy="210" r="15" fill="#1e293b" />
            <circle cx="311" cy="204" r="5" fill="#ffffff" />
          </g>

          {/* SMILE */}
          <path 
            d={config.smilePath} 
            stroke="#1e293b" 
            strokeWidth="4" 
            strokeLinecap="round" 
            fill="none" 
          />

          {/* GRADUATION CAP (Pitched/sitting on head) */}
          <g id="grad-cap">
            {/* Mortarboard Diamond */}
            <path d="M 256,66 L 334,92 L 256,118 L 178,92 Z" fill="#1e293b" />
            {/* Inner cap skull dome */}
            <path d="M 213,93 C 213,115 299,115 299,93" fill="#1e293b" />
            {/* Gold Tassel Band */}
            <path d="M 256,92 L 310,105 L 310,142" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" fill="none" />
            {/* Gold Tassel Fringe */}
            <polygon points="305,142 315,142 318,157 302,157" fill="#d4a574" />
          </g>
        </motion.g>

        {/* Floating Sparkles (Static in SVG coordinates, but move with overall hover) */}
        <path d="M 90,130 L 93,138 L 101,141 L 93,144 L 90,152 L 87,144 L 79,141 L 87,138 Z" fill="#d4a574" opacity="0.6" />
        <path d="M 410,140 L 412,146 L 418,148 L 412,150 L 410,156 L 408,150 L 402,148 L 408,146 Z" fill="#7dd3fc" opacity="0.8" />
      </svg>
    </div>
  );
};
