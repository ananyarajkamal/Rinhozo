import React, { useState, useEffect, useRef } from 'react';
import { RinAvatar } from './RinAvatar';
import { Volume2, RefreshCw } from 'lucide-react';

interface EngagementMonitorProps {
  cardIndex: number;
  active: boolean;
  onActivateAudio: () => void;
  onSwitchStyle: () => void;
}

export const EngagementMonitor: React.FC<EngagementMonitorProps> = ({
  cardIndex,
  active,
  onActivateAudio,
  onSwitchStyle
}) => {
  const [showIntervention, setShowIntervention] = useState(false);
  const rapidSkipsRef = useRef(0);
  
  const lastCardIndexRef = useRef(cardIndex);
  const lastTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!active) return;

    const currentTime = Date.now();
    const timeSpent = currentTime - lastTimeRef.current;
    
    // Check if user changed cards (advanced or skipped)
    if (cardIndex !== lastCardIndexRef.current) {
      // If they advanced in less than 3 seconds, it is a rapid skip
      if (timeSpent < 3000 && cardIndex > lastCardIndexRef.current) {
        rapidSkipsRef.current += 1;
        if (rapidSkipsRef.current >= 2) {
          // Trigger intervention
          setShowIntervention(true);
          rapidSkipsRef.current = 0; // Reset counter
        }
      } else {
        // Reset skips on normal reading speeds
        rapidSkipsRef.current = 0;
      }

      // Update refs
      lastCardIndexRef.current = cardIndex;
      lastTimeRef.current = currentTime;
    }
  }, [cardIndex, active]);

  const handleDismiss = () => {
    setShowIntervention(false);
    lastTimeRef.current = Date.now(); // Reset time to prevent immediate re-trigger
  };

  const handleAudioAction = () => {
    onActivateAudio();
    setShowIntervention(false);
    lastTimeRef.current = Date.now();
  };

  const handleStyleAction = () => {
    onSwitchStyle();
    setShowIntervention(false);
    lastTimeRef.current = Date.now();
  };

  if (!showIntervention) return null;

  return (
    <div className="absolute inset-0 bg-[#1e293b]/45 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
      
      {/* Intervention Claymorphic Dialogue Card */}
      <div className="w-full max-w-sm bg-white border border-[#e5dec9] rounded-3xl p-6 shadow-2xl clay-card text-center flex flex-col items-center">
        
        {/* Mascot */}
        <RinAvatar mood="concerned" size={110} interactive={false} glowIntensity={0.6} />
        
        <h4 className="text-base font-bold text-[#1e293b] mt-4 mb-2">Need a different pace?</h4>
        
        <p className="text-xs font-semibold text-[#78716c] leading-relaxed mb-6 px-2">
          I noticed you are moving through cards quickly. Let me help you learn comfortably. Would you like to hear the cards read out loud or try another style?
        </p>

        {/* Action Options */}
        <div className="w-full space-y-2.5">
          <button
            onClick={handleAudioAction}
            className="w-full p-4 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer clay-button"
          >
            <Volume2 size={16} />
            Enable Audio Mode
          </button>
          
          <button
            onClick={handleStyleAction}
            className="w-full p-4 bg-white hover:bg-[#faf6f0] text-[#1e293b] border border-[#e5dec9] rounded-2xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer clay-button"
          >
            <RefreshCw size={16} />
            Try Stories and Analogies
          </button>
          
          <button
            onClick={handleDismiss}
            className="w-full py-2.5 text-[#78716c] hover:text-[#1e293b] text-[11px] font-bold tracking-wider uppercase cursor-pointer"
          >
            No thanks, I am skimming
          </button>
        </div>

      </div>

    </div>
  );
};
export default EngagementMonitor;
