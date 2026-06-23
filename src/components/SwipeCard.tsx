import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';

interface SwipeCardProps {
  onSwipeLeft?: () => void;  // e.g., "Show another style" / "Need help"
  onSwipeRight?: () => void; // e.g., "Got it!" / "Next"
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  onSwipeLeft,
  onSwipeRight,
  children,
  active = true,
  className = ''
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Rotate based on horizontal drag distance (max 18 degrees)
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  
  // Fade out slightly when swiping far
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0.5, 1, 1, 1, 0.5]);

  // Color overlays or indicators based on swipe direction
  const rightIndicatorOpacity = useTransform(x, [0, 120], [0, 1]);
  const leftIndicatorOpacity = useTransform(x, [-120, 0], [1, 0]);

  const handleDragEnd = async (_event: any, info: any) => {
    if (!active) return;

    const swipeThreshold = 130; // Min px distance to trigger swipe
    const velocityThreshold = 500; // Min px/sec velocity to trigger swipe
    
    const dragX = info.offset.x;
    const velocityX = info.velocity.x;

    if (dragX > swipeThreshold || velocityX > velocityThreshold) {
      // Swipe Right (Got it!)
      await controls.start({
        x: 400,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      if (onSwipeRight) onSwipeRight();
    } else if (dragX < -swipeThreshold || velocityX < -velocityThreshold) {
      // Swipe Left (Explain differently)
      await controls.start({
        x: -400,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      if (onSwipeLeft) onSwipeLeft();
    } else {
      // Snap back to center
      controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        touchAction: 'none',
        zIndex: active ? 10 : 1
      }}
      animate={controls}
      drag={active}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-bg-card border border-bg-elevated shadow-[0_8px_32px_rgba(30,41,59,0.06)] overflow-hidden select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {/* Swipe Direction Indicators */}
      <motion.div 
        style={{ opacity: rightIndicatorOpacity }}
        className="absolute top-3 right-3 bg-success/15 border border-success/35 text-success font-semibold px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase pointer-events-none z-30"
      >
        Got it
      </motion.div>
      <motion.div 
        style={{ opacity: leftIndicatorOpacity }}
        className="absolute top-3 left-3 bg-secondary/15 border border-secondary/35 text-secondary font-semibold px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase pointer-events-none z-30"
      >
        Explain Differently
      </motion.div>

      {/* Card Content Wrapper */}
      <div className="flex-1 flex flex-col justify-between pt-4 overflow-hidden">
        {children}
      </div>

      {/* Swipe hints visual aid */}
      {active && (
        <div className="flex justify-between items-center text-text-muted/40 text-[9px] uppercase tracking-widest mt-2 font-semibold select-none border-t border-bg-elevated/50 pt-2 flex-shrink-0">
          <span>Swipe Left to Adapt</span>
          <span>Swipe Right to Next</span>
        </div>
      )}
    </motion.div>
  );
};

