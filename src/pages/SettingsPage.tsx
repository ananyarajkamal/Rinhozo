import React, { useState, useEffect } from 'react';
import { db } from '../lib/db';
import type { UserProfile } from '../lib/db';
import { ArrowLeft, Globe, Volume2, Eye, Activity } from 'lucide-react';
import type { SupportedLang } from '../locales/strings';

interface SettingsPageProps {
  onBackToMap: () => void;
  onLanguageChanged: (lang: SupportedLang) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBackToMap, onLanguageChanged }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const userProfile = await db.getProfile();
      if (userProfile) {
        setProfile(userProfile);
        // Load default properties or local states
        setAudioEnabled(localStorage.getItem('rinhozo_audio_mode') === 'true');
        setHighContrast(localStorage.getItem('rinhozo_high_contrast') === 'true');
        setReducedMotion(localStorage.getItem('rinhozo_reduced_motion') === 'true');
      }
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleLanguageSelect = async (selectedLang: SupportedLang) => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      interface_lang: selectedLang
    };
    
    setProfile(updatedProfile);
    await db.saveProfile(updatedProfile);
    onLanguageChanged(selectedLang);
  };

  const toggleAudioMode = (val: boolean) => {
    setAudioEnabled(val);
    localStorage.setItem('rinhozo_audio_mode', String(val));
  };

  const toggleHighContrast = (val: boolean) => {
    setHighContrast(val);
    localStorage.setItem('rinhozo_high_contrast', String(val));
    // Apply visual contrast toggles on root document
    if (val) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleReducedMotion = (val: boolean) => {
    setReducedMotion(val);
    localStorage.setItem('rinhozo_reduced_motion', String(val));
    if (val) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#D6A15F]/20 border-t-[#D6A15F] animate-spin"></div>
      </div>
    );
  }

  const languages: { code: SupportedLang; label: string }[] = [
    { code: 'hinglish', label: 'Hinglish' },
    { code: 'english', label: 'English' },
    { code: 'hindi', label: 'Hindi' },
    { code: 'tamil', label: 'Tamil' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#16233A] flex flex-col p-4 md:p-6 select-none">
      
      {/* HEADER */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between mb-6 mt-4">
        <button 
          onClick={onBackToMap}
          className="p-2.5 rounded-full border border-[#16233A]/8 hover:bg-[#FBF3E8] text-[#6B6560] hover:text-[#16233A] transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-sm font-bold uppercase tracking-wider text-[#6B6560]">Settings</span>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* SETTINGS FORM CARD */}
      <div className="w-full max-w-md mx-auto bg-white border border-[#16233A]/6 rounded-3xl p-6 shadow-[0_8px_32px_rgba(22,35,58,0.02)] flex flex-col gap-6 text-left">
        
        {/* SECTION 1: LANGUAGE SWITCHER */}
        <div>
          <div className="flex items-center gap-2 mb-3.5 text-[#16233A]">
            <Globe size={16} className="text-[#D6A15F]" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Interface Language</h4>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {languages.map((lang) => {
              const isActive = profile?.interface_lang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`p-3.5 border-2 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer active:scale-[0.98] ${
                    isActive 
                      ? 'border-[#16233A] bg-[#16233A] text-white shadow-sm' 
                      : 'border-[#16233A]/8 bg-[#FAF6F0]/50 hover:bg-[#FBF3E8] text-[#6B6560]'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: AUDIO MODE */}
        <div className="border-t border-[#16233A]/6 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#6B6560]">
                <Volume2 size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#16233A] uppercase tracking-wider">Audio Mode</span>
                <span className="text-[11px] font-semibold text-[#6B6560] leading-normal mt-0.5">
                  Read aloud concept descriptions automatically.
                </span>
              </div>
            </div>
            
            {/* Toggle switch */}
            <button
              onClick={() => toggleAudioMode(!audioEnabled)}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer relative flex items-center ${
                audioEnabled ? 'bg-[#D6A15F]' : 'bg-[#16233A]/10'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                audioEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>

        {/* SECTION 3: ACCESSIBILITY OPTIONS */}
        <div className="border-t border-[#16233A]/6 pt-5 space-y-5">
          <span className="text-[10px] font-bold text-[#6B6560] uppercase tracking-widest block">Accessibility</span>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#6B6560]">
                <Eye size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#16233A] uppercase tracking-wider">High Contrast</span>
                <span className="text-[11px] font-semibold text-[#6B6560] leading-normal mt-0.5">
                  Increase text readability and card outlines.
                </span>
              </div>
            </div>
            
            <button
              onClick={() => toggleHighContrast(!highContrast)}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer relative flex items-center ${
                highContrast ? 'bg-[#D6A15F]' : 'bg-[#16233A]/10'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                highContrast ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#6B6560]">
                <Activity size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-[#16233A] uppercase tracking-wider">Reduced Motion</span>
                <span className="text-[11px] font-semibold text-[#6B6560] leading-normal mt-0.5">
                  Disable jellyfish sway and card slide transitions.
                </span>
              </div>
            </div>
            
            <button
              onClick={() => toggleReducedMotion(!reducedMotion)}
              className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 cursor-pointer relative flex items-center ${
                reducedMotion ? 'bg-[#D6A15F]' : 'bg-[#16233A]/10'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                reducedMotion ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
export default SettingsPage;
