import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LanguageSelect } from './pages/LanguageSelect';
import { Onboarding } from './pages/Onboarding';
import { LessonSwipe } from './pages/LessonSwipe';
import { LOCALES } from './locales/strings';
import type { SupportedLang, UIStrings } from './locales/strings';
import { db } from './lib/db';
import type { UserProfile } from './lib/db';

type AppRoute = 'landing' | 'language-select' | 'onboarding' | 'learn';

function App() {
  const [route, setRoute] = useState<AppRoute>('landing');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [strings, setStrings] = useState<UIStrings>(LOCALES.hinglish);
  const [loading, setLoading] = useState(true);

  // Initialize profile and set default language strings
  useEffect(() => {
    async function initProfile() {
      try {
        const userProfile = await db.getProfile();
        if (userProfile) {
          setProfile(userProfile);
          setStrings(LOCALES[userProfile.interface_lang]);
        }
      } catch (err) {
        console.error('Failed to initialize profile:', err);
      } finally {
        setLoading(false);
      }
    }
    initProfile();
  }, []);

  const handleSelectLanguage = async (selectedLang: SupportedLang) => {
    if (!profile) return;
    
    const updatedProfile = {
      ...profile,
      interface_lang: selectedLang
    };
    
    setProfile(updatedProfile);
    setStrings(LOCALES[selectedLang]);
    await db.saveProfile(updatedProfile);
    setRoute('onboarding');
  };

  const handleCompleteOnboarding = async (learningStyle: string) => {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      learning_style: learningStyle
    };

    setProfile(updatedProfile);
    await db.saveProfile(updatedProfile);
    setRoute('learn');
  };

  const handleChangeLanguageMidLesson = async (newLang: SupportedLang) => {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      interface_lang: newLang
    };

    setProfile(updatedProfile);
    setStrings(LOCALES[newLang]);
    await db.saveProfile(updatedProfile);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Shimmer loading indicator */}
          <div className="w-12 h-12 rounded-full border-4 border-[#d4a574]/20 border-t-[#d4a574] animate-spin"></div>
          <span className="text-sm font-bold text-[#78716c] uppercase tracking-widest">Rinhozo Loading...</span>
        </div>
      </div>
    );
  }

  // State Router
  switch (route) {
    case 'landing':
      return (
        <LandingPage 
          strings={strings} 
          onGetStarted={() => setRoute('language-select')} 
        />
      );
    case 'language-select':
      return (
        <LanguageSelect 
          onSelectLanguage={handleSelectLanguage} 
        />
      );
    case 'onboarding':
      return (
        <Onboarding 
          strings={strings} 
          onCompleteOnboarding={handleCompleteOnboarding} 
        />
      );
    case 'learn':
      return (
        <LessonSwipe
          topicId="algebra-reef"
          initialLang={profile?.interface_lang || 'hinglish'}
          strings={strings}
          onBackToMap={() => setRoute('landing')}
          onChangeLanguage={handleChangeLanguageMidLesson}
        />
      );
    default:
      return (
        <LandingPage 
          strings={strings} 
          onGetStarted={() => setRoute('language-select')} 
        />
      );
  }
}

export default App;
