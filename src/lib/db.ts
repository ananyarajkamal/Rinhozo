import { get, set } from 'idb-keyval';

// Types for progress and profile
export interface UserProfile {
  name: string;
  avatar_url?: string;
  interface_lang: 'hinglish' | 'hindi' | 'tamil' | 'english';
  learning_style: string;
  streak_count: number;
  last_active: string;
}

export interface UserProgress {
  topic_id: string;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  current_card_index: number;
  quiz_score?: number;
  completed_at?: string;
}

export interface UserInteraction {
  card_id: string;
  action: 'viewed' | 'swiped' | 'answered' | 'skipped';
  time_spent_ms: number;
  correct?: boolean;
  timestamp: string;
}

// Check if Firebase configs are provided
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isFirebaseConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

// Local DB layer using idb-keyval & localStorage
class DatabaseService {
  private useFirebase: boolean = false;

  constructor() {
    this.useFirebase = isFirebaseConfigured;
    if (this.useFirebase) {
      console.log('Firebase credentials detected. Initializing Firebase...');
      // Firebase initialization logic can go here if needed.
      // For Phase 1 (foundation), we focus on a robust local DB with seamless firebase hookup
    } else {
      console.log('Running in local-offline mode. Progress is saved locally in IndexedDB.');
    }
  }

  // --- Profile Methods ---
  async getProfile(): Promise<UserProfile | null> {
    const cached = localStorage.getItem('rinhozo_user_profile');
    if (cached) {
      return JSON.parse(cached);
    }
    // Return a default profile if not exists
    const defaultProfile: UserProfile = {
      name: 'Rinhozo Learner',
      interface_lang: 'hinglish',
      learning_style: 'story',
      streak_count: 1,
      last_active: new Date().toISOString()
    };
    await this.saveProfile(defaultProfile);
    return defaultProfile;
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    localStorage.setItem('rinhozo_user_profile', JSON.stringify(profile));
  }

  // --- Progress Methods ---
  async getProgress(topicId: string): Promise<UserProgress> {
    const key = `progress_${topicId}`;
    const localProgress = await get<UserProgress>(key);
    
    if (localProgress) {
      return localProgress;
    }

    // Default progress state for new topic
    const defaultProgress: UserProgress = {
      topic_id: topicId,
      status: topicId === 'algebra-reef' ? 'available' : 'locked',
      current_card_index: 0
    };
    await this.saveProgress(topicId, defaultProgress);
    return defaultProgress;
  }

  async saveProgress(topicId: string, progress: UserProgress): Promise<void> {
    const key = `progress_${topicId}`;
    await set(key, progress);
    
    // Also update last active in profile
    const profile = await this.getProfile();
    if (profile) {
      profile.last_active = new Date().toISOString();
      await this.saveProfile(profile);
    }
  }

  // --- Interaction Tracking (For local rule-based difficulty classifier) ---
  async logInteraction(interaction: Omit<UserInteraction, 'timestamp'>): Promise<void> {
    const key = 'user_interactions';
    const existing = await get<UserInteraction[]>(key) || [];
    
    const newInteraction: UserInteraction = {
      ...interaction,
      timestamp: new Date().toISOString()
    };
    
    existing.push(newInteraction);
    await set(key, existing);
    console.log(`Interaction logged: ${interaction.card_id} - ${interaction.action}`);
  }

  async getInteractions(): Promise<UserInteraction[]> {
    return (await get<UserInteraction[]>('user_interactions')) || [];
  }

  // --- Streak calculations ---
  async checkAndUpdateStreak(): Promise<number> {
    const profile = await this.getProfile();
    if (!profile) return 1;

    const lastActiveDate = new Date(profile.last_active);
    const today = new Date();
    
    // Clear hours to compare dates only
    lastActiveDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Consecutive day! Increment streak
      profile.streak_count += 1;
      profile.last_active = new Date().toISOString();
      await this.saveProfile(profile);
    } else if (diffDays > 1) {
      // Streak broken. Reset to 1
      profile.streak_count = 1;
      profile.last_active = new Date().toISOString();
      await this.saveProfile(profile);
    }

    return profile.streak_count;
  }
}

export const db = new DatabaseService();
export default db;
