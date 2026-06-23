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
  // Define glow colors and animations based on mood
  const moodConfig = {
    happy: {
      glowColor: 'rgba(212, 165, 116, 0.4)',
      bodyColorStart: '#ffffff',
      bodyColorEnd: '#fde68a',
      tentacleColor: '#fde68a',
      glowClass: 'animate-glow-gold',
      smilePath: 'M 244,222 C 248,228 264,228 268,222',
      eyeOffset: { x: 0, y: 0 },
      tentacleSpeed: 3
    },
    concerned: {
      glowColor: 'rgba(252, 165, 165, 0.45)',
      bodyColorStart: '#faf0e6',
      bodyColorEnd: '#fca5a5',
      tentacleColor: '#fca5a5',
      glowClass: 'animate-glow-rose',
      smilePath: 'M 246,224 C 251,221 261,221 266,224',
      eyeOffset: { x: -2, y: 1 },
      tentacleSpeed: 5
    },
    excited: {
      glowColor: 'rgba(125, 211, 252, 0.5)',
      bodyColorStart: '#ffffff',
      bodyColorEnd: '#7dd3fc',
      tentacleColor: '#7dd3fc',
      glowClass: 'animate-glow-cyan',
      smilePath: 'M 242,220 C 248,232 264,232 270,220',
      eyeOffset: { x: 0, y: -2 },
      tentacleSpeed: 1.8
    },
    calm: {
      glowColor: 'rgba(134, 239, 172, 0.4)',
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

  // Determine cap scale and features based on evolution level
  const showCap = evolutionLevel >= 2;
  const capScale = evolutionLevel === 2 ? 0.75 : evolutionLevel === 5 ? 1.2 : 1.0;
  const showTrails = evolutionLevel >= 4;
  const showHalo = evolutionLevel === 5;

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
          <linearGradient id={`bodyGrad-${mood}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.bodyColorStart} />
            <stop offset="60%" stopColor={config.bodyColorEnd} />
            <stop offset="100%" stopColor="#d4a574" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id={`tentacleGrad-${mood}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.tentacleColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={config.tentacleColor} stopOpacity="0.15" />
          </linearGradient>

          <radialGradient id="specularGlow" cx="30%" cy="30%" r="30%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id="shadowDepth" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1e293b" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Level 5 Pulse Halo Ring */}
        {showHalo && (
          <motion.ellipse
            cx="256"
            cy="270"
            rx="190"
            ry="110"
            stroke="#d4a574"
            strokeWidth="3.5"
            strokeDasharray="6 6"
            fill="none"
            opacity="0.75"
            animate={{
              scale: [0.97, 1.04, 0.97],
              rotate: [0, 360],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            style={{ transformOrigin: '256px 270px' }}
          />
        )}

        {/* TENTACLES */}
        <g filter="url(#shadowDepth)">
          <motion.path 
            variants={leftTentacleVariants}
            animate="animate"
            d="M 216,280 C 190,340 240,400 216,450" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="13" 
            strokeLinecap="round" 
            fill="none" 
          />

          <motion.path 
            variants={rightTentacleVariants}
            animate="animate"
            d="M 296,280 C 322,340 272,400 296,450" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="13" 
            strokeLinecap="round" 
            fill="none" 
          />
          
          <motion.path 
            variants={leftTentacleVariants}
            animate="animate"
            d="M 166,270 C 130,335 190,380 160,435" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="9.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.7"
          />

          <motion.path 
            variants={rightTentacleVariants}
            animate="animate"
            d="M 346,270 C 382,335 322,380 352,435" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="9.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.7"
          />

          <motion.path 
            animate={{
              y: [0, 4, 0],
              transition: { duration: config.tentacleSpeed, repeat: Infinity, ease: 'easeInOut' }
            }}
            d="M 256,290 C 240,360 275,410 256,470" 
            stroke={`url(#tentacleGrad-${mood})`} 
            strokeWidth="15" 
            strokeLinecap="round" 
            fill="none" 
          />
        </g>

        {/* JELLYFISH CAP / BODY (3D Shaded Glass Dome) */}
        <motion.g 
          variants={capVariants}
          animate="animate"
        >
          {/* Main 3D Volume Dome */}
          <path 
            d="M 120,270 
               C 110,180 180,110 256,110 
               C 332,110 402,180 392,270 
               C 340,295 280,265 256,280 
               C 230,265 170,295 120,270 Z" 
            fill={`url(#bodyGrad-${mood})`}
            filter="url(#shadowDepth)"
          />

          {/* 3D Inner Lighting Shadow Overlay */}
          <path 
            d="M 120,270 
               C 110,180 180,110 256,110 
               C 332,110 402,180 392,270
               C 350,260 300,240 256,250
               C 210,240 160,260 120,270 Z"
            fill="#d4a574"
            opacity="0.12"
          />

          {/* Specular Glare/Reflections for 3D glass look */}
          <ellipse cx="200" cy="150" rx="40" ry="25" fill="url(#specularGlow)" transform="rotate(-15, 200, 150)" />
          
          <path 
            d="M 330,150 C 350,165 365,190 360,210" 
            stroke="#ffffff" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.3" 
          />

          {/* Glowing Cheeks */}
          <circle cx="172" cy="225" r="16" fill="#fca5a5" opacity="0.45" filter="blur(3.5px)" />
          <circle cx="340" cy="225" r="16" fill="#fca5a5" opacity="0.45" filter="blur(3.5px)" />

          {/* EYES */}
          <g transform={`translate(${config.eyeOffset.x}, ${config.eyeOffset.y})`}>
            <circle cx="195" cy="210" r="15" fill="#1e293b" />
            <circle cx="189" cy="204" r="5" fill="#ffffff" />
            
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

          {/* EVOLVED GRADUATION CAP */}
          {showCap && (
            <g 
              id="grad-cap" 
              transform={`scale(${capScale}) translate(${(512 - 512 * capScale) / (2 * capScale)}, ${(110 - 110 * capScale) / (2 * capScale)})`}
              style={{ transformOrigin: '256px 95px' }}
            >
              {/* Cap Shadow on Head */}
              <path d="M 180,95 Q 256,120 332,95 Q 256,105 180,95" fill="#000000" opacity="0.25" />
              
              {/* Mortarboard Diamond */}
              <path d="M 256,66 L 334,92 L 256,118 L 178,92 Z" fill="#1e293b" />
              <path d="M 256,69 L 326,92 L 256,114 L 186,92 Z" fill="#2d3748" opacity="0.4" /> {/* Cap highlight */}
              
              {/* Skull Cap base */}
              <path d="M 213,93 C 213,115 299,115 299,93" fill="#1e293b" />
              
              {/* Tassel Band */}
              <path d="M 256,92 L 310,105 L 310,142" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" fill="none" />
              <polygon points="305,142 315,142 318,157 302,157" fill="#d4a574" />
            </g>
          )}
        </motion.g>

        {/* Level 4 and 5 Floating Bioluminescent Sparkle Trails */}
        {showTrails && (
          <g>
            <motion.circle cx="100" cy="300" r="5" fill="#7dd3fc" animate={{ y: [-10, 10, -10], opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 2.2, repeat: Infinity }} />
            <motion.circle cx="420" cy="280" r="6" fill="#d4a574" animate={{ y: [15, -15, 15], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.8, repeat: Infinity }} />
            <motion.circle cx="120" cy="180" r="4" fill="#86efac" animate={{ x: [-8, 8, -8], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 3.1, repeat: Infinity }} />
            <motion.circle cx="390" cy="190" r="5" fill="#fde68a" animate={{ x: [8, -8, 8], opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }} />
          </g>
        )}
      </svg>
    </div>
  );
};
