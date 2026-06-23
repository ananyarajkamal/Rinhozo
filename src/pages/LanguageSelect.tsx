import React from 'react';
import { RinAvatar } from '../components/RinAvatar';
import type { SupportedLang } from '../locales/strings';

interface LanguageSelectProps {
  onSelectLanguage: (lang: SupportedLang) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ onSelectLanguage }) => {
  const languages: { code: SupportedLang; label: string; subLabel: string; style: string }[] = [
    { 
      code: 'hinglish', 
      label: 'Hinglish', 
      subLabel: '"Recursion matlab ek dream ke andar dream"',
      style: 'border-[#d4a574] hover:bg-[#f5e6d3]/40'
    },
    { 
      code: 'english', 
      label: 'English', 
      subLabel: '"Recursion is when a function calls itself"',
      style: 'border-[#7dd3fc] hover:bg-[#7dd3fc]/10'
    },
    { 
      code: 'hindi', 
      label: 'हिंदी (Hindi)', 
      subLabel: '"पुनरावृत्ति का अर्थ है एक सपने के भीतर सपना"',
      style: 'border-[#e5dec9] hover:bg-[#f0ebe3]'
    },
    { 
      code: 'tamil', 
      label: 'தமிழ் (Tamil)', 
      subLabel: '"மீள்செய்கை என்றால் கனவுக்குள் கனவு"',
      style: 'border-[#e5dec9] hover:bg-[#f0ebe3]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col justify-center items-center p-6 select-none">
      
      {/* Container */}
      <div className="w-full max-w-lg bg-white border border-[#e5dec9] rounded-3xl p-8 shadow-[0_8px_32px_rgba(30,41,59,0.04)] text-center relative overflow-hidden">
        
        {/* Sparkle details */}
        <div className="absolute top-4 left-6 text-[#d4a574] opacity-20">
          <svg className="w-6 h-6 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h10v10l10-10H12V2z"/></svg>
        </div>

        {/* Jellyfish Mascot Welcome */}
        <div className="mb-6 flex flex-col items-center">
          <RinAvatar mood="happy" size={140} glowIntensity={0.6} interactive={true} />
          <div className="mt-3 bg-[#f5e6d3]/60 px-4 py-2 rounded-2xl inline-block max-w-[280px]">
            <p className="text-xs font-bold text-[#78716c] leading-snug">
              "Apni favorite language select karo aur Rin ke saath seekhna shuru karo."
            </p>
          </div>
        </div>

        {/* Header Titles */}
        <h2 className="text-2xl font-bold text-[#1e293b] mb-1">अपनी भाषा चुनें</h2>
        <h3 className="text-lg font-semibold text-[#d4a574] mb-2">Choose Your Language</h3>
        <p className="text-xs font-semibold text-[#78716c] mb-6">
          Learn in the language you think in. You can switch this anytime in settings.
        </p>

        {/* Languages Options List */}
        <div className="space-y-3.5">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className={`w-full text-left p-4 rounded-2xl border-2 bg-[#faf6f0]/50 transition-all active:scale-[0.99] flex flex-col justify-center gap-1 cursor-pointer ${lang.style}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-base text-[#1e293b]">{lang.label}</span>
                {lang.code === 'hinglish' && (
                  <span className="bg-[#d4a574] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <span className="text-xs text-[#78716c] font-medium italic">{lang.subLabel}</span>
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
