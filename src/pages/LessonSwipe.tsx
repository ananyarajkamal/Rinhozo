import React, { useState, useEffect } from 'react';
import { SwipeCard } from '../components/SwipeCard';
import { RinAvatar } from '../components/RinAvatar';
import type { RinMood } from '../components/RinAvatar';
import { TOPICS_DATA, getExpandedCards } from '../locales/cardsData';
import { LOCALES } from '../locales/strings';
import type { SupportedLang, UIStrings } from '../locales/strings';
import { db } from '../lib/db';
import { ArrowLeft, Check, X, Volume2, Sparkles } from 'lucide-react';
import { EngagementMonitor } from '../components/EngagementMonitor';

interface LessonSwipeProps {
  topicId: string;
  initialLang: SupportedLang;
  strings: UIStrings;
  onBackToMap: () => void;
  onChangeLanguage: (lang: SupportedLang) => void;
  evolutionLevel: number;
}

export const LessonSwipe: React.FC<LessonSwipeProps> = ({
  topicId,
  initialLang,
  strings: initialStrings,
  onBackToMap,
  onChangeLanguage,
  evolutionLevel
}) => {
  const [lang, setLang] = useState<SupportedLang>(initialLang);
  const [strings, setStrings] = useState<UIStrings>(initialStrings);
  const [cards, setCards] = useState<any[]>(() => getExpandedCards(topicId, lang));
  const [cardIndex, setCardIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [rinMood, setRinMood] = useState<RinMood>('happy');
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [audioMode, setAudioMode] = useState(false);

  // Load cards for topic and language
  const topicData = TOPICS_DATA[topicId]?.[lang] || TOPICS_DATA[topicId]?.['hinglish'];
  const currentCard = cards[cardIndex];

  // Set strings whenever language changes
  useEffect(() => {
    setStrings(LOCALES[lang]);
  }, [lang]);

  // Restart timer on card change
  useEffect(() => {
    setStartTime(Date.now());
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedback(null);
    setRinMood('happy');

    // Auto-read in audio mode
    if (audioMode && currentCard) {
      const timer = setTimeout(() => {
        handleSpeak();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cardIndex, audioMode, currentCard]);

  // Reload cards if topicId or lang changes
  useEffect(() => {
    setCards(getExpandedCards(topicId, lang));
    setCardIndex(0);
  }, [topicId, lang]);

  const handleLanguageChange = (newLang: SupportedLang) => {
    setLang(newLang);
    onChangeLanguage(newLang);
  };

  const handleSwipeRight = async () => {
    if (!currentCard) return;
    // Log view/completed action
    const timeSpent = Date.now() - startTime;
    await db.logInteraction({
      card_id: currentCard.id,
      action: 'swiped',
      time_spent_ms: timeSpent,
      correct: currentCard.type === 'quiz' ? selectedOption === currentCard.answerIdx : undefined
    });

    if (cardIndex < cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      // Completed lesson!
      setCompleted(true);
      setRinMood('excited');
      // Save completion progress
      await db.saveProgress(topicId, {
        topic_id: topicId,
        status: 'completed',
        current_card_index: cardIndex + 1,
        completed_at: new Date().toISOString()
      });
    }
  };

  const handleSwipeLeft = async () => {
    if (!currentCard) return;
    // Explain differently logic: trigger Rin concern, then reset card to show another style
    setRinMood('concerned');
    const timeSpent = Date.now() - startTime;
    await db.logInteraction({
      card_id: currentCard.id,
      action: 'skipped',
      time_spent_ms: timeSpent
    });

    // Provide immediate feedback in a real adaptation engine
    setTimeout(() => {
      // Simulate switching card presentation format (e.g. from Concept to Analogy)
      setRinMood('calm');
      // We skip to next card or offer help
      if (cardIndex < cards.length - 1) {
        setCardIndex(cardIndex + 1);
      } else {
        setCompleted(true);
      }
    }, 800);
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered || !currentCard) return;
    
    setIsAnswered(true);
    const correct = selectedOption === currentCard.answerIdx;
    
    if (correct) {
      setRinMood('excited');
      setFeedback(currentCard.feedbackCorrect || 'Correct! Nice job.');
    } else {
      setRinMood('concerned');
      setFeedback(currentCard.feedbackIncorrect || 'Not quite right. Let us check again!');
    }
  };

  // Speaks the card title and body (Web Speech API)
  const handleSpeak = () => {
    if (!currentCard) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      
      const speechText = `${currentCard.title}. ${currentCard.body.replace(/\$/g, '').replace(/\\implies/g, 'means')}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      
      // Select voice based on language
      if (lang === 'hindi' || lang === 'hinglish') {
        utterance.lang = 'hi-IN'; // Hinglish falls back to Hindi TTS
      } else if (lang === 'tamil') {
        utterance.lang = 'ta-IN';
      } else {
        utterance.lang = 'en-US';
      }
      
      window.speechSynthesis.speak(utterance);
      
      db.logInteraction({
        card_id: currentCard.id,
        action: 'viewed',
        time_spent_ms: 0,
        correct: undefined
      });
    } else {
      alert("Text-to-speech not supported on this browser.");
    }
  };

  const handleSwitchStyle = () => {
    const allCards = getExpandedCards(topicId, lang);
    const storyAnalogies = allCards.filter(c => c.type === 'analogy' || c.type === 'concept');
    const others = allCards.filter(c => c.type !== 'analogy' && c.type !== 'concept');
    setCards([...storyAnalogies, ...others]);
    setCardIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col items-center p-4 md:p-6 overflow-hidden relative">
      
      {/* HEADER BAR */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4 z-20">
        <button 
          onClick={onBackToMap}
          className="p-2.5 rounded-full hover:bg-[#f0ebe3] text-[#78716c] hover:text-[#1e293b] transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Mid-lesson Language Switcher */}
        <div className="flex bg-[#f0ebe3] border border-[#e5dec9]/30 rounded-full p-1 text-xs">
          {(['hinglish', 'english', 'hindi', 'tamil'] as SupportedLang[]).map((l) => (
            <button
              key={l}
              onClick={() => handleLanguageChange(l)}
              className={`px-3 py-1.5 rounded-full font-bold uppercase tracking-wider transition-all cursor-pointer ${
                lang === l ? 'bg-[#1e293b] text-white' : 'text-[#78716c] hover:text-[#1e293b]'
              }`}
            >
              {l === 'hinglish' ? 'Hing' : l === 'hindi' ? 'हिं' : l === 'tamil' ? 'த' : 'Eng'}
            </button>
          ))}
        </div>
      </div>

      {/* LESSON COMPLETE CELEBRATION */}
      {completed ? (
        <div className="flex-1 w-full max-w-md flex flex-col justify-center items-center text-center p-6 bg-white border border-[#e5dec9] rounded-3xl shadow-lg z-10 animate-fade-in my-8">
          <RinAvatar mood="excited" size={160} glowIntensity={0.9} evolutionLevel={evolutionLevel} />
          
          <h2 className="text-2xl font-bold mt-6 mb-2 text-[#1e293b]">
            {strings.lessonCompleted}
          </h2>
          <p className="text-sm font-semibold text-[#78716c] max-w-sm mb-8 leading-relaxed">
            {strings.lessonCompletedDesc}
          </p>

          <div className="w-full bg-[#faf6f0] border border-[#e5dec9] rounded-2xl p-5 mb-8 text-left">
            <span className="text-[10px] font-bold text-[#d4a574] uppercase tracking-widest block mb-1">Unlocks Next Area</span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/20 flex items-center justify-center text-[#7dd3fc]">
                <Sparkles size={20} />
              </div>
              <div>
                <span className="font-bold text-[#1e293b] text-sm block">Algebra Reef Completed!</span>
                <span className="text-xs text-[#78716c] font-semibold">Unlocked: Equations Island</span>
              </div>
            </div>
          </div>

          <button
            onClick={onBackToMap}
            className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-4 rounded-2xl text-base font-bold shadow-md cursor-pointer active:scale-[0.99] transition-all"
          >
            {strings.backToMap}
          </button>
        </div>
      ) : (
        /* CORE SWIPE INTERFACE */
        <div className="flex-1 w-full max-w-md flex flex-col justify-between items-center z-10 py-2">
          
          {/* Top Progress bar and Rin floating */}
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <div className="flex-1 mr-4">
              <div className="flex justify-between text-[11px] font-bold text-[#78716c] mb-1.5">
                <span>{topicData.name}</span>
                <span>{cardIndex + 1} / {cards.length} Cards</span>
              </div>
              <div className="w-full h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#1e293b] transition-all duration-300"
                  style={{ width: `${((cardIndex + 1) / cards.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="relative">
              <RinAvatar mood={rinMood} size={70} interactive={false} glowIntensity={0.5} evolutionLevel={evolutionLevel} />
            </div>
          </div>

          {/* SWIPE CARD DECK */}
          <div className="relative w-full h-[420px] max-w-sm my-4">
            {cards.slice(cardIndex, cardIndex + 2).reverse().map((card, i, arr) => {
              const isActive = i === arr.length - 1;
              return (
                <SwipeCard
                  key={card.id}
                  active={isActive}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  className={isActive ? '' : 'transform scale-95 translate-y-4 opacity-40 pointer-events-none'}
                >
                  {/* Inside Card Layout */}
                  <div className="flex-1 flex flex-col justify-between text-left h-full">
                    {/* Header: Title and TTS button */}
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-bold text-[#d4a574] uppercase tracking-widest leading-none bg-[#f5e6d3]/40 px-2.5 py-1.5 rounded-full">
                        {card.type}
                      </span>
                      <button
                        onClick={handleSpeak}
                        className="p-1.5 rounded-full hover:bg-[#faf6f0] text-[#78716c] hover:text-[#1e293b] transition-all cursor-pointer"
                        title="Read out loud"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>

                    {/* Body contents */}
                    <div className="flex-1 flex flex-col justify-center my-4 overflow-y-auto no-scrollbar">
                      <h3 className="text-xl font-bold text-[#1e293b] mb-3 leading-snug">{card.title}</h3>
                      <p className="text-[14px] font-semibold text-[#78716c] leading-relaxed whitespace-pre-line">
                        {card.body}
                      </p>

                      {/* Render math or icon element */}
                      {card.mediaType === 'math' && card.mediaVal && (
                        <div className="mt-4 bg-[#faf6f0] border border-[#e5dec9]/50 rounded-2xl p-3.5 text-center font-mono font-bold text-[#1e293b] text-base select-all">
                          {card.mediaVal}
                        </div>
                      )}
                      
                      {card.mediaType === 'icon' && card.mediaVal && (
                        <div className="mt-4 flex justify-center text-[#d4a574]">
                          <div className="w-14 h-14 rounded-2xl bg-[#f5e6d3]/40 flex items-center justify-center">
                            {/* Render icon based on name */}
                            {card.mediaVal === 'Scale' ? (
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17M12 3L4 7m8-4l8 4m-8 6h7M5 13h7m-7 0a3 3 0 100 6 3 3 0 000-6zm14 0a3 3 0 100 6 3 3 0 000-6z" />
                              </svg>
                            ) : (
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Quiz Options */}
                      {card.type === 'quiz' && card.options && (
                        <div className="space-y-2 mt-4">
                          {card.options.map((option: string, idx: number) => {
                            const isSelected = selectedOption === idx;
                            let style = 'border-[#e5dec9] hover:bg-[#faf6f0]';
                            if (isAnswered) {
                              if (idx === card.answerIdx) {
                                style = 'border-[#86efac] bg-[#86efac]/10 text-emerald-700';
                              } else if (isSelected) {
                                style = 'border-[#fca5a5] bg-[#fca5a5]/10 text-red-700';
                              } else {
                                style = 'border-[#e5dec9] opacity-50';
                              }
                            } else if (isSelected) {
                              style = 'border-[#1e293b] bg-[#1e293b]/5';
                            }
                            
                            return (
                              <button
                                key={idx}
                                onClick={() => handleOptionClick(idx)}
                                disabled={isAnswered}
                                className={`w-full text-left p-3 border-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${style}`}
                              >
                                <span>{option}</span>
                                {isAnswered && idx === card.answerIdx && <Check size={14} />}
                                {isAnswered && isSelected && idx !== card.answerIdx && <X size={14} />}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action for Quiz */}
                    {card.type === 'quiz' && !isAnswered && (
                      <button
                        onClick={handleCheckAnswer}
                        disabled={selectedOption === null}
                        className={`w-full py-3 rounded-xl text-sm font-bold shadow-sm transition-all cursor-pointer ${
                          selectedOption !== null 
                            ? 'bg-[#1e293b] hover:bg-[#0f172a] text-white' 
                            : 'bg-[#f0ebe3] text-[#78716c] opacity-50 cursor-not-allowed'
                        }`}
                      >
                        Submit Answer
                      </button>
                    )}

                    {/* Quiz Feedback display */}
                    {feedback && (
                      <div className={`mt-2 p-3 rounded-xl text-xs font-semibold leading-relaxed border ${
                        selectedOption === currentCard.answerIdx 
                          ? 'bg-[#86efac]/10 border-[#86efac]/30 text-emerald-800' 
                          : 'bg-[#fca5a5]/10 border-[#fca5a5]/30 text-red-800'
                      }`}>
                        {feedback}
                      </div>
                    )}

                  </div>
                </SwipeCard>
              );
            })}
          </div>

          {/* Swipe tutorial reminder overlay when inactive */}
          <div className="text-[10px] font-bold text-[#78716c] opacity-40 uppercase tracking-widest text-center mt-3">
            Swipe Right to complete card!
          </div>

        </div>
      )}

      <EngagementMonitor
        cardIndex={cardIndex}
        active={!completed && !!currentCard}
        onActivateAudio={() => {
          setAudioMode(true);
          handleSpeak();
        }}
        onSwitchStyle={handleSwitchStyle}
      />
    </div>
  );
};
