import React, { useState, useEffect } from 'react';
import { RinAvatar } from '../components/RinAvatar';
import { db } from '../lib/db';
import type { UserProfile, UserProgress } from '../lib/db';
import { ArrowLeft, Award, Flame, BookOpen } from 'lucide-react';
import { StyleClassifier } from '../lib/classifier';

interface ProfileStatsProps {
  onBackToMap: () => void;
  evolutionLevel: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ onBackToMap, evolutionLevel }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progressList, setProgressList] = useState<UserProgress[]>([]);
  const [classification, setClassification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const userProfile = await db.getProfile();
        setProfile(userProfile);

        const pReef = await db.getProgress('algebra-reef');
        const pVolcano = await db.getProgress('physics-volcano');
        const pIsland = await db.getProgress('history-island');
        
        setProgressList([pReef, pVolcano, pIsland]);

        const classResult = await StyleClassifier.classifyUserStyle();
        setClassification(classResult);
      } catch (err) {
        console.error('Failed to load profile data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[#d4a574]/20 border-t-[#d4a574] animate-spin"></div>
      </div>
    );
  }

  const completedCount = progressList.filter(p => p.status === 'completed').length;

  // Render style description
  const getStyleLabel = (style: string) => {
    switch (style) {
      case 'visual': return 'Visual Learner (Diagrams and charts)';
      case 'concept': return 'Concept Learner (Direct definitions)';
      case 'story': return 'Story Learner (Analogies and real examples)';
      case 'auditory': return 'Auditory Learner (Voice explanations)';
      default: return 'Adaptive Learner';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#1e293b] flex flex-col p-4 md:p-6 select-none">
      
      {/* HEADER */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between mb-6">
        <button 
          onClick={onBackToMap}
          className="p-2.5 rounded-full hover:bg-[#f0ebe3] text-[#78716c] hover:text-[#1e293b] transition-all cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-bold uppercase tracking-wider text-[#78716c]">Profile and Stats</span>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* PROFILE CONTENT CARD */}
      <div className="w-full max-w-md mx-auto bg-white border border-[#e5dec9] rounded-3xl p-6 shadow-md flex flex-col gap-6">
        
        {/* User Mascot Banner */}
        <div className="flex items-center gap-4 border-b border-[#e5dec9]/40 pb-5">
          <div className="relative">
            <RinAvatar mood="excited" size={80} interactive={false} glowIntensity={0.5} evolutionLevel={evolutionLevel} />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-[#1e293b]">{profile?.name}</h3>
            <span className="text-xs font-semibold text-[#78716c] block mt-0.5">
              Active Language: <span className="capitalize font-bold text-[#1e293b]">{profile?.interface_lang}</span>
            </span>
          </div>
        </div>

        {/* STATS TILES */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Streak */}
          <div className="bg-[#faf6f0] border border-[#e5dec9]/60 rounded-2xl p-4 text-left flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Flame size={20} fill="currentColor" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#78716c] uppercase block">Streak</span>
              <span className="text-lg font-bold text-[#1e293b]">{profile?.streak_count || 1} Days</span>
            </div>
          </div>

          {/* Completed Lessons */}
          <div className="bg-[#faf6f0] border border-[#e5dec9]/60 rounded-2xl p-4 text-left flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Award size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#78716c] uppercase block">Completed</span>
              <span className="text-lg font-bold text-[#1e293b]">{completedCount} Reefs</span>
            </div>
          </div>
        </div>

        {/* LEARNING STYLE SUMMARY */}
        <div className="bg-[#faf6f0] border border-[#e5dec9]/60 rounded-2xl p-4 text-left">
          <span className="text-[10px] font-bold text-[#78716c] uppercase block mb-1.5">Dominant Learning Style</span>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#7dd3fc]/20 flex items-center justify-center text-[#7dd3fc]">
              <BookOpen size={20} />
            </div>
            <div>
              <span className="text-sm font-bold text-[#1e293b] block">
                {profile ? getStyleLabel(classification?.dominantStyle || profile.learning_style) : 'Adaptive Style'}
              </span>
              <span className="text-[11px] font-semibold text-[#78716c] mt-0.5 block">
                Rin adapts explanations to match this preference.
              </span>
            </div>
          </div>
          {classification && classification.scores && (
            <div className="border-t border-[#e5dec9]/40 pt-3 mt-2 space-y-2">
              <span className="text-[9px] font-bold text-[#78716c] uppercase block mb-1">Style Vector Breakdown</span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-[#78716c]">
                <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-lg border border-[#e5dec9]/40">
                  <span>Story</span>
                  <span className="text-[#1e293b]">{Math.round(classification.scores.story * 100)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-lg border border-[#e5dec9]/40">
                  <span>Visual</span>
                  <span className="text-[#1e293b]">{Math.round(classification.scores.visual * 100)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-lg border border-[#e5dec9]/40">
                  <span>Concept</span>
                  <span className="text-[#1e293b]">{Math.round(classification.scores.concept * 100)}%</span>
                </div>
                <div className="flex justify-between items-center bg-white px-2 py-1.5 rounded-lg border border-[#e5dec9]/40">
                  <span>Auditory</span>
                  <span className="text-[#1e293b]">{Math.round(classification.scores.auditory * 100)}%</span>
                </div>
              </div>
              <div className="text-[9px] font-semibold text-[#78716c] text-right mt-1.5">
                Classifier Confidence: <span className="font-bold text-[#1e293b]">{Math.round(classification.confidence * 100)}%</span>
              </div>
            </div>
          )}
        </div>

        {/* COMPLETED BADGES */}
        <div className="text-left">
          <span className="text-[10px] font-bold text-[#78716c] uppercase block mb-3">Earned Badges</span>
          
          {completedCount === 0 ? (
            <div className="border border-dashed border-[#e5dec9] rounded-2xl p-5 text-center text-xs font-semibold text-[#78716c]">
              No badges earned yet. Complete lessons to unlock achievements.
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {progressList.map((p) => {
                if (p.status !== 'completed') return null;
                
                let badgeName = 'Algebra Novice';
                let style = 'bg-[#7dd3fc]/15 border-[#7dd3fc]/45 text-blue-800';
                
                if (p.topic_id === 'physics-volcano') {
                  badgeName = 'Forces Master';
                  style = 'bg-amber-100 border-amber-300 text-amber-800';
                } else if (p.topic_id === 'history-island') {
                  badgeName = 'History Scholar';
                  style = 'bg-emerald-100 border-emerald-300 text-emerald-800';
                }

                return (
                  <div 
                    key={p.topic_id}
                    className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold ${style}`}
                  >
                    <Award size={14} />
                    <span>{badgeName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* PROGRESS LIST */}
        <div className="text-left">
          <span className="text-[10px] font-bold text-[#78716c] uppercase block mb-3">Topic Progress</span>
          <div className="space-y-2.5">
            {progressList.map((p) => {
              const name = p.topic_id === 'algebra-reef' ? 'Algebra Reef' : p.topic_id === 'physics-volcano' ? 'Physics Volcano' : 'History Island';
              return (
                <div key={p.topic_id} className="flex justify-between items-center p-3 border border-[#e5dec9]/60 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e293b]/20"></span>
                    <span className="text-xs font-bold text-[#1e293b]">{name}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716c]">
                    {p.status.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
export default ProfileStats;
