import React, { useState } from 'react';
import { SwipeCard } from '../components/SwipeCard';
import { RinAvatar } from '../components/RinAvatar';
import type { RinMood } from '../components/RinAvatar';
import type { UIStrings } from '../locales/strings';
import { Sparkles, Eye, BookOpen, Quote, Volume2 } from 'lucide-react';

interface OnboardingProps {
  strings: UIStrings;
  onCompleteOnboarding: (learningStyle: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ strings, onCompleteOnboarding }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [rinMood, setRinMood] = useState<RinMood>('happy');
  const [selectedStyle, setSelectedStyle] = useState<string>('story');

  const learningStyles = [
    {
      id: 'visual',
      label: strings.styleVisual,
      icon: <Eye size={18} />,
      color: 'border-cyan-200 hover:bg-cyan-50/30 text-cyan-600',
      activeColor: 'border-cyan-400 bg-cyan-50/60'
    },
    {
      id: 'concept',
      label: strings.styleConcept,
      icon: <BookOpen size={18} />,
      color: 'border-[#D6A15F]/30 hover:bg-[#FBF3E8] text-[#D6A15F]',
      activeColor: 'border-[#D6A15F] bg-[#FBF3E8]'
    },
    {
      id: 'story',
      label: strings.styleStory,
      icon: <Quote size={18} />,
      color: 'border-emerald-200 hover:bg-emerald-50/30 text-emerald-600',
      activeColor: 'border-emerald-400 bg-emerald-50/50'
    },
    {
      id: 'auditory',
      label: strings.styleAuditory,
      icon: <Volume2 size={18} />,
      color: 'border-purple-200 hover:bg-purple-50/30 text-purple-600',
      activeColor: 'border-purple-400 bg-purple-50/50'
    }
  ];

  const handleTutorialSwipeRight = () => {
    setRinMood('excited');
    setTimeout(() => {
      setStep(2);
      setRinMood('happy');
    }, 400);
  };

  const handleTutorialSwipeLeft = () => {
    setRinMood('concerned');
    setTimeout(() => {
      setStep(2);
      setRinMood('happy');
    }, 600);
  };

  const handleSubmit = () => {
    onCompleteOnboarding(selectedStyle);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#16233A] flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      
      {/* Container */}
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Rin Avatar Floating above card */}
        <div className="mb-6 flex flex-col items-center">
          <RinAvatar mood={rinMood} size={130} glowIntensity={0.6} interactive={false} />
          {step === 1 && (
            <div className="mt-3 bg-[#FBF3E8] border border-[#FAF6F0] px-4 py-2 rounded-2xl inline-block max-w-[280px] text-center shadow-sm">
              <p className="text-xs font-bold text-[#6B6560] leading-snug">
                "Swipe right to say got it, or left to get another explanation."
              </p>
            </div>
          )}
          {step === 2 && (
            <div className="mt-3 bg-[#FBF3E8] border border-[#FAF6F0] px-4 py-2 rounded-2xl inline-block max-w-[280px] text-center shadow-sm">
              <p className="text-xs font-bold text-[#6B6560] leading-snug">
                "Rin is customizing your cards. Aap kis tarah seekhna chahte ho."
              </p>
            </div>
          )}
        </div>

        {/* STEP 1: INTERACTIVE SWIPE TUTORIAL */}
        {step === 1 && (
          <div className="relative w-full h-[360px] max-w-sm flex items-center justify-center">
            <SwipeCard 
              onSwipeRight={handleTutorialSwipeRight}
              onSwipeLeft={handleTutorialSwipeLeft}
              active={true}
            >
              <div className="flex-1 flex flex-col justify-between items-center text-center py-4">
                <div className="w-12 h-12 rounded-full bg-[#16233A]/4 flex items-center justify-center text-[#D6A15F]">
                  <Sparkles size={24} />
                </div>
                <div className="flex-1 flex flex-col justify-center my-6">
                  <h3 className="text-xl font-bold text-[#16233A] mb-2">Practice Swiping</h3>
                  <p className="text-sm font-semibold text-[#6B6560] px-4 leading-relaxed">
                    Swipe this card Right to say I got it.
                    <br />
                    Swipe Left to see it explained differently.
                  </p>
                </div>
                <div className="w-full bg-[#FAF6F0] border border-[#16233A]/6 rounded-2xl p-3 text-xs font-bold text-[#6B6560]">
                  Drag me left or right to test.
                </div>
              </div>
            </SwipeCard>
          </div>
        )}

        {/* STEP 2: PREFERENCE PICKER */}
        {step === 2 && (
          <div className="w-full bg-white border border-[#16233A]/6 rounded-3xl p-6 shadow-[0_8px_32px_rgba(22,35,58,0.02)] text-center">
            <h3 className="text-lg font-bold text-[#16233A] mb-1">{strings.onboardingStyleTitle}</h3>
            <p className="text-xs font-semibold text-[#6B6560] mb-5">{strings.onboardingStyleSubtitle}</p>
            
            <div className="space-y-2.5 mb-6 text-left">
              {learningStyles.map((style) => {
                const isActive = selectedStyle === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`w-full p-4 border-2 rounded-2xl flex items-center gap-4 transition-all duration-200 cursor-pointer ${
                      isActive ? style.activeColor : style.color
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isActive ? 'bg-[#16233A] text-white' : 'bg-[#FAF6F0]'}`}>
                      {style.icon}
                    </div>
                    <span className="text-sm font-bold text-[#16233A]">{style.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#16233A] hover:bg-[#1E2E4A] text-white py-4 rounded-2xl text-base font-bold shadow-md active:scale-[0.99] transition-all cursor-pointer"
            >
              {strings.startLearning}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
