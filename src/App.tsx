import { useState, useEffect } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LanguageSelect } from './pages/LanguageSelect';
import { Onboarding } from './pages/Onboarding';
import { OceanMap } from './pages/OceanMap';
import { LessonSwipe } from './pages/LessonSwipe';
import { BossBattle } from './pages/BossBattle';
import { ProfileStats } from './pages/ProfileStats';
import { SettingsPage } from './pages/SettingsPage';
import { DownloadManager } from './pages/DownloadManager';
import { LearningReels } from './pages/LearningReels';
import { LOCALES } from './locales/strings';
import type { SupportedLang, UIStrings } from './locales/strings';
import { db } from './lib/db';
import type { UserProfile } from './lib/db';

type AppRoute = 
  | 'landing' 
  | 'language-select' 
  | 'onboarding' 
  | 'map' 
  | 'learn' 
  | 'battle' 
  | 'profile' 
  | 'settings' 
  | 'downloads'
  | 'reels';

function App() {
  const [route, setRoute] = useState<AppRoute>('landing');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [strings, setStrings] = useState<UIStrings>(LOCALES.hinglish);
  const [loading, setLoading] = useState(true);
  const [activeTopicId, setActiveTopicId] = useState<string>('algebra-reef');
  const [evolutionLevel, setEvolutionLevel] = useState(1);

  const updateEvolutionLevel = async () => {
    try {
      const pReef = await db.getProgress('algebra-reef');
      const pVolcano = await db.getProgress('physics-volcano');
      const pIsland = await db.getProgress('history-island');
      
      const count = [pReef, pVolcano, pIsland].filter(p => p.status === 'completed').length;
      const userProfile = await db.getProfile();
      const streak = userProfile?.streak_count || 1;
      
      let level = count + 1;
      if (count === 3 && streak >= 2) {
        level = 5;
      }
      setEvolutionLevel(level);
    } catch (err) {
      console.error('Failed to update evolution level:', err);
    }
  };

  // Initialize profile and set default language strings
  useEffect(() => {
    async function initProfile() {
      try {
        const userProfile = await db.getProfile();
        if (userProfile) {
          setProfile(userProfile);
          setStrings(LOCALES[userProfile.interface_lang]);
          
          // Check if onboarding completed (i.e. learning style set)
          if (userProfile.learning_style) {
            setRoute('map');
          }
        }
        await updateEvolutionLevel();
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
    setRoute('map');
  };

  const handleChangeLanguageMidSession = async (newLang: SupportedLang) => {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      interface_lang: newLang
    };

    setProfile(updatedProfile);
    setStrings(LOCALES[newLang]);
    await db.saveProfile(updatedProfile);
  };

  const handleSelectTopic = async (topicId: string) => {
    setActiveTopicId(topicId);
    
    const progress = await db.getProgress(topicId);
    if (progress.status === 'completed') {
      // If completed, let them play the Boss Battle to test their skills or review
      setRoute('battle');
    } else {
      setRoute('learn');
    }
  };

  const handleBattleEnd = async (passed: boolean, _score: number) => {
    if (passed) {
      // Unlock next nodes logic
      let nextTopic = '';
      if (activeTopicId === 'algebra-reef') {
        nextTopic = 'physics-volcano';
      } else if (activeTopicId === 'physics-volcano') {
        nextTopic = 'history-island';
      }

      if (nextTopic) {
        const nextProgress = await db.getProgress(nextTopic);
        if (nextProgress.status === 'locked') {
          nextProgress.status = 'available';
          await db.saveProgress(nextTopic, nextProgress);
        }
      }
      
      // Update streak
      await db.checkAndUpdateStreak();
    }
    
    await updateEvolutionLevel();
    
    // Always navigate back to map after battle ends
    setRoute('map');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#d4a574]/20 border-t-[#d4a574] animate-spin"></div>
          <span className="text-sm font-bold text-[#78716c] uppercase tracking-widest">Rinhozo Loading...</span>
        </div>
      </div>
    );
  }

  // State-Based Router
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
    case 'map':
      return (
        <OceanMap 
          onSelectTopic={handleSelectTopic} 
          onNavigate={(target) => setRoute(target as AppRoute)}
          evolutionLevel={evolutionLevel}
        />
      );
    case 'learn':
      return (
        <LessonSwipe
          topicId={activeTopicId}
          initialLang={profile?.interface_lang || 'hinglish'}
          strings={strings}
          onBackToMap={async () => {
            await updateEvolutionLevel();
            setRoute('map');
          }}
          onChangeLanguage={handleChangeLanguageMidSession}
          evolutionLevel={evolutionLevel}
        />
      );
    case 'battle':
      return (
        <BossBattle 
          topicId={activeTopicId} 
          onBattleEnd={handleBattleEnd} 
        />
      );
    case 'profile':
      return (
        <ProfileStats 
          onBackToMap={() => setRoute('map')} 
          evolutionLevel={evolutionLevel}
        />
      );
    case 'settings':
      return (
        <SettingsPage 
          onBackToMap={() => setRoute('map')} 
          onLanguageChanged={handleChangeLanguageMidSession}
        />
      );
    case 'downloads':
      return (
        <DownloadManager 
          onBackToMap={() => setRoute('map')} 
        />
      );
    case 'reels':
      return (
        <LearningReels 
          onBackToMap={() => setRoute('map')} 
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
