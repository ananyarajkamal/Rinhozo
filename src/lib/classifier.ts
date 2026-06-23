import { db } from './db';
import type { UserInteraction } from './db';
import { TOPICS_DATA } from '../locales/cardsData';
import type { LessonCard } from '../locales/cardsData';

export interface ClassificationResult {
  dominantStyle: string;
  confidence: number; // 0 to 1
  scores: Record<string, number>;
}

// Client-side adaptation and classification engine
export class StyleClassifier {
  
  // Analyzes user interactions and updates profile learning style preference
  static async classifyUserStyle(): Promise<ClassificationResult> {
    const interactions = await db.getInteractions();
    const profile = await db.getProfile();
    
    const defaultResult: ClassificationResult = {
      dominantStyle: profile?.learning_style || 'story',
      confidence: 0.5,
      scores: { story: 0.25, visual: 0.25, concept: 0.25, auditory: 0.25 }
    };

    if (interactions.length === 0) {
      return defaultResult;
    }

    // Weight counters for each style vector
    let storyWeight = 0;
    let visualWeight = 0;
    let conceptWeight = 0;
    let auditoryWeight = 0;

    // Feature extraction loop
    interactions.forEach((interaction: UserInteraction) => {
      const cardType = this.getCardTypeById(interaction.card_id);
      
      // Feature 1: Time spent on cards
      const timeSec = interaction.time_spent_ms / 1000;
      
      if (interaction.action === 'swiped') {
        // Got it swipe: indicates good comprehension of this style
        if (cardType === 'analogy') storyWeight += 2;
        if (cardType === 'visual') visualWeight += 2;
        if (cardType === 'concept') conceptWeight += 1.5;
      }

      if (interaction.action === 'viewed') {
        // Long views indicate interest/focus
        if (timeSec > 15) {
          if (cardType === 'analogy') storyWeight += 1.5;
          if (cardType === 'visual') visualWeight += 1.5;
          if (cardType === 'concept') conceptWeight += 1;
        }
      }

      if (interaction.action === 'skipped') {
        // Skip/Explain differently: indicates struggle or mismatch
        if (cardType === 'concept') {
          // Skips on heavy concepts suggests they prefer stories/visuals
          storyWeight += 1;
          visualWeight += 1;
          conceptWeight -= 1;
        }
      }

      // Feature 2: Audio/TTS plays indicate Auditory preference
      if (interaction.action === 'viewed' && interaction.time_spent_ms === 0) {
        // In LessonSwipe.tsx, logInteraction is called with time_spent_ms = 0 for TTS
        auditoryWeight += 3;
      }
    });

    // Handle normalization
    const total = Math.max(1, storyWeight + visualWeight + conceptWeight + auditoryWeight);
    const scores = {
      story: Math.max(0, storyWeight / total),
      visual: Math.max(0, visualWeight / total),
      concept: Math.max(0, conceptWeight / total),
      auditory: Math.max(0, auditoryWeight / total)
    };

    // Find dominant style
    let dominantStyle = 'story';
    let maxVal = -1;

    Object.entries(scores).forEach(([style, val]) => {
      if (val > maxVal) {
        maxVal = val;
        dominantStyle = style;
      }
    });

    // Confidence is the margin of the dominant style above the average
    const average = 0.25;
    const confidence = Math.min(1.0, Math.max(0.1, (maxVal - average) / 0.75 + 0.5));

    const result: ClassificationResult = {
      dominantStyle,
      confidence: parseFloat(confidence.toFixed(2)),
      scores
    };

    // Save newly classified style to profile
    if (profile && profile.learning_style !== dominantStyle && result.confidence > 0.6) {
      profile.learning_style = dominantStyle;
      await db.saveProfile(profile);
      console.log(`Learning style reclassified to: ${dominantStyle} (Confidence: ${result.confidence})`);
    }

    return result;
  }

  // Helper to look up card type from seed database
  private static getCardTypeById(cardId: string): string {
    // Check algebra-reef cards
    const algCards = TOPICS_DATA['algebra-reef']?.english?.cards || [];
    const algCard = algCards.find((c: LessonCard) => c.id === cardId);
    if (algCard) return algCard.type;

    // Check physics-volcano cards
    const phyCards = TOPICS_DATA['physics-volcano']?.english?.cards || [];
    const phyCard = phyCards.find((c: LessonCard) => c.id === cardId);
    if (phyCard) return phyCard.type;

    // Check history-island cards
    const histCards = TOPICS_DATA['history-island']?.english?.cards || [];
    const histCard = histCards.find((c: LessonCard) => c.id === cardId);
    if (histCard) return histCard.type;

    return 'concept';
  }
}
export default StyleClassifier;
