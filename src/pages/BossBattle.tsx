import React, { useState } from 'react';
import { RinAvatar } from '../components/RinAvatar';
import type { RinMood } from '../components/RinAvatar';
import { db } from '../lib/db';
import { Check, X, ShieldAlert, Award } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  answerIdx: number;
  explanation: string;
}

interface BossBattleProps {
  topicId: string;
  onBattleEnd: (passed: boolean, score: number) => void;
}

export const BossBattle: React.FC<BossBattleProps> = ({ topicId, onBattleEnd }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [rinMood, setRinMood] = useState<RinMood>('happy');
  const [battleCompleted, setBattleCompleted] = useState(false);

  // 5 algebra questions for Algebra Reef
  const questions: Question[] = [
    {
      id: 'bb-1',
      text: 'Solve: x - 3 = 8. What is the value of x?',
      options: ['x = 5', 'x = 11', 'x = 24', 'x = 8'],
      answerIdx: 1,
      explanation: 'Subtracting 3 is reversed by adding 3 to both sides: x = 8 + 3 = 11.'
    },
    {
      id: 'bb-2',
      text: 'Solve: 4x = 24. What is the value of x?',
      options: ['x = 6', 'x = 8', 'x = 20', 'x = 28'],
      answerIdx: 0,
      explanation: 'Multiplication by 4 is reversed by dividing both sides by 4: x = 24 / 4 = 6.'
    },
    {
      id: 'bb-3',
      text: 'Solve: x / 2 = 10. What is the value of x?',
      options: ['x = 5', 'x = 8', 'x = 20', 'x = 12'],
      answerIdx: 2,
      explanation: 'Division by 2 is reversed by multiplying both sides by 2: x = 10 * 2 = 20.'
    },
    {
      id: 'bb-4',
      text: 'Solve: 2x + 3 = 13. What is the value of x?',
      options: ['x = 5', 'x = 8', 'x = 10', 'x = 2'],
      answerIdx: 0,
      explanation: 'First subtract 3 from both sides to get 2x = 10. Then divide both sides by 2: x = 5.'
    },
    {
      id: 'bb-5',
      text: 'Solve: 5x - 4 = 16. What is the value of x?',
      options: ['x = 2', 'x = 4', 'x = 5', 'x = 20'],
      answerIdx: 1,
      explanation: 'First add 4 to both sides to get 5x = 20. Then divide both sides by 5: x = 4.'
    }
  ];

  const currentQuestion = questions[currentIdx];

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    setIsAnswered(true);
    const correct = selectedOption === currentQuestion.answerIdx;

    if (correct) {
      setCorrectCount(prev => prev + 1);
      setRinMood('excited');
    } else {
      setRinMood('concerned');
    }
  };

  const handleNext = async () => {
    // Log battle interaction
    await db.logInteraction({
      card_id: currentQuestion.id,
      action: 'answered',
      time_spent_ms: 0,
      correct: selectedOption === currentQuestion.answerIdx
    });

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setRinMood('happy');
    } else {
      // Completed all questions
      const finalScore = Math.round((correctCount / questions.length) * 100);
      const passed = finalScore >= 60; // 3 out of 5 correct
      
      setBattleCompleted(true);
      if (passed) {
        setRinMood('excited');
        await db.saveProgress(topicId, {
          topic_id: topicId,
          status: 'completed',
          current_card_index: 5,
          completed_at: new Date().toISOString()
        });
      } else {
        setRinMood('concerned');
      }
    }
  };

  const handleFinish = () => {
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= 60;
    onBattleEnd(passed, finalScore);
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col items-center justify-center p-4 md:p-6 select-none overflow-hidden">
      
      <div className="w-full max-w-md bg-white border border-[#e5dec9] rounded-3xl p-6 shadow-lg relative flex flex-col">
        
        {/* BATTLE COMPLETED SCREEN */}
        {battleCompleted ? (
          <div className="text-center py-6 flex flex-col items-center">
            <RinAvatar mood={correctCount >= 3 ? 'excited' : 'concerned'} size={150} glowIntensity={0.8} />
            
            {correctCount >= 3 ? (
              <>
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mt-6 mb-4">
                  <Award size={26} />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Boss Defeated</h3>
                <p className="text-sm font-semibold text-[#78716c] mb-6 px-4">
                  Excellent work. You scored {Math.round((correctCount / questions.length) * 100)} percent. Next area on the map has been unlocked.
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 mt-6 mb-4">
                  <ShieldAlert size={26} />
                </div>
                <h3 className="text-2xl font-bold text-[#1e293b] mb-2">Defeat</h3>
                <p className="text-sm font-semibold text-[#78716c] mb-6 px-4">
                  You scored {Math.round((correctCount / questions.length) * 100)} percent. You need at least 60 percent to advance. Try again.
                </p>
              </>
            )}

            <button
              onClick={handleFinish}
              className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-4 rounded-2xl text-base font-bold shadow-md cursor-pointer transition-all active:scale-[0.99]"
            >
              Continue
            </button>
          </div>
        ) : (
          /* CORE BATTLE QUESTION INTERFACE */
          <>
            {/* Header: Score and Rin Mascot */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1 mr-4 text-left">
                <span className="text-[10px] font-bold text-[#d4a574] uppercase tracking-wider block mb-1">
                  Boss Battle - Question {currentIdx + 1} of {questions.length}
                </span>
                <div className="w-full h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1e293b] transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <RinAvatar mood={rinMood} size={70} interactive={false} glowIntensity={0.5} />
            </div>

            {/* Question Text */}
            <div className="text-left mb-6">
              <h4 className="text-lg font-bold text-[#1e293b] leading-snug">
                {currentQuestion.text}
              </h4>
            </div>

            {/* Options list */}
            <div className="space-y-2.5 mb-6 text-left">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let style = 'border-[#e5dec9] hover:bg-[#faf6f0]';
                
                if (isAnswered) {
                  if (idx === currentQuestion.answerIdx) {
                    style = 'border-emerald-400 bg-emerald-50/10 text-emerald-800';
                  } else if (isSelected) {
                    style = 'border-red-400 bg-red-50/10 text-red-800';
                  } else {
                    style = 'border-[#e5dec9] opacity-40';
                  }
                } else if (isSelected) {
                  style = 'border-[#1e293b] bg-[#1e293b]/5';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full p-4 border-2 rounded-2xl flex items-center justify-between text-sm font-bold transition-all cursor-pointer ${style}`}
                  >
                    <span>{option}</span>
                    {isAnswered && idx === currentQuestion.answerIdx && <Check size={16} />}
                    {isAnswered && isSelected && idx !== currentQuestion.answerIdx && <X size={16} />}
                  </button>
                );
              })}
            </div>

            {/* Answer feedback */}
            {isAnswered && (
              <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed mb-6 border text-left ${
                selectedOption === currentQuestion.answerIdx
                  ? 'bg-emerald-50/10 border-emerald-300/30 text-emerald-800'
                  : 'bg-red-50/10 border-red-300/30 text-red-800'
              }`}>
                <span className="font-bold block mb-1">
                  {selectedOption === currentQuestion.answerIdx ? 'Correct' : 'Incorrect'}
                </span>
                {currentQuestion.explanation}
              </div>
            )}

            {/* Action buttons */}
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                disabled={selectedOption === null}
                className={`w-full py-4 rounded-2xl text-base font-bold shadow-md cursor-pointer transition-all ${
                  selectedOption !== null
                    ? 'bg-[#1e293b] hover:bg-[#0f172a] text-white'
                    : 'bg-[#f0ebe3] text-[#78716c] opacity-50 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white py-4 rounded-2xl text-base font-bold shadow-md cursor-pointer transition-all active:scale-[0.99]"
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Battle'}
              </button>
            )}
          </>
        )}

      </div>

    </div>
  );
};
export default BossBattle;
