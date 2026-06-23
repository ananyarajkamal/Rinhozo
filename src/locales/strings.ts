export interface UIStrings {
  landingTitle: string;
  landingSubtitle: string;
  landingCtaStart: string;
  landingCtaHow: string;
  landingPillPace: string;
  landingPillRin: string;
  landingPillGrowth: string;
  landingRinBubble: string;
  langSelectTitle: string;
  langSelectSubtitle: string;
  navHome: string;
  navFeatures: string;
  navHowItWorks: string;
  navForEducators: string;
  navAbout: string;
  navGetStarted: string;
  onboardingWelcome: string;
  onboardingSwipeHint: string;
  onboardingStyleTitle: string;
  onboardingStyleSubtitle: string;
  styleVisual: string;
  styleConcept: string;
  styleStory: string;
  styleAuditory: string;
  next: string;
  startLearning: string;
  lessonCompleted: string;
  lessonCompletedDesc: string;
  bossBattleTitle: string;
  bossBattleDesc: string;
  backToMap: string;
  audioToggle: string;
  audioToggleDesc: string;
  settingsTitle: string;
  settingsLanguage: string;
  settingsAudio: string;
  settingsContrast: string;
  settingsMotion: string;
  downloadPacks: string;
}

export type SupportedLang = 'hinglish' | 'hindi' | 'tamil' | 'english';

export const LOCALES: Record<SupportedLang, UIStrings> = {
  hinglish: {
    landingTitle: "Learning that listens",
    landingSubtitle: "Rinhozo is a companion jo aapki speed samajhta hai, aapki journey ko support karta hai, aur aapke saath grow karta hai.",
    landingCtaStart: "Journey Start Karo",
    landingCtaHow: "Kaise Kaam Karta Hai",
    landingPillPace: "Apne pace par seekho",
    landingPillRin: "Rin ka support",
    landingPillGrowth: "Choti steps, badi growth",
    landingRinBubble: "Hi, Main Rinhozo hoon. Main yahan aapko guide karne, encourage karne, aur aapke saath seekhne ke liye hoon, har step par.",
    langSelectTitle: "Apni language select karo",
    langSelectSubtitle: "Uss language mein seekho jismein aap friends se baat karte ho.",
    navHome: "Home",
    navFeatures: "Features",
    navHowItWorks: "Kaise chale",
    navForEducators: "Teachers ke liye",
    navAbout: "About",
    navGetStarted: "Start karein",
    onboardingWelcome: "Rinhozo mein welcome. Chalo thoda intro ho jaye.",
    onboardingSwipeHint: "Concept samajh aaya toh Swipe Right, aur explanation chahiye toh Swipe Left.",
    onboardingStyleTitle: "Aap kaise seekhna pasand karte ho?",
    onboardingStyleSubtitle: "Rin aapke style ke hisab se cards ko adapt karega.",
    styleVisual: "Visuals (Charts aur diagrams se)",
    styleConcept: "Direct Concept (Clear definitions se)",
    styleStory: "Stories and Analogies (Real-life examples se)",
    styleAuditory: "Auditory (Sunkar samjhein)",
    next: "Aage badhein",
    startLearning: "Seekhna shuru karein",
    lessonCompleted: "Nice work.",
    lessonCompletedDesc: "Reef completed. Rin is glowing brighter.",
    bossBattleTitle: "Boss Battle",
    bossBattleDesc: "Next area unlock karne ke liye simple quiz pass karo.",
    backToMap: "Ocean Map par chalein",
    audioToggle: "Audio Mode",
    audioToggleDesc: "Concepts ko sunne ke liye audio mode toggle karein",
    settingsTitle: "Settings",
    settingsLanguage: "Language badlein",
    settingsAudio: "Audio mode enable karein",
    settingsContrast: "High contrast mode",
    settingsMotion: "Reduced motion animations",
    downloadPacks: "Offline packs manage karein"
  },
  hindi: {
    landingTitle: "सीखना जो आपकी सुने",
    landingSubtitle: "रिनहोज़ो एक ऐसा साथी है जो आपकी गति को समझता है, आपकी यात्रा का समर्थन करता है, और आपके साथ आगे बढ़ता है।",
    landingCtaStart: "अपनी यात्रा शुरू करें",
    landingCtaHow: "देखें यह कैसे काम करता है",
    landingPillPace: "अपनी गति से सीखें",
    landingPillRin: "रिन का समर्थन",
    landingPillGrowth: "छोटे कदम, बड़ा विकास",
    landingRinBubble: "नमस्ते, मैं रिनहोज़ो हूँ। मैं यहाँ आपका मार्गदर्शन करने, आपको प्रोत्साहित करने और हर कदम पर आपके साथ सीखने के लिए हूँ।",
    langSelectTitle: "अपनी भाषा चुनें",
    langSelectSubtitle: "उस भाषा में सीखें जिसमें आप घर पर सहज महसूस करते हैं।",
    navHome: "मुख्य पृष्ठ",
    navFeatures: "विशेषताएं",
    navHowItWorks: "यह कैसे काम करता है",
    navForEducators: "शिक्षकों के लिए",
    navAbout: "हमारे बारे में",
    navGetStarted: "शुरू करें",
    onboardingWelcome: "रिनहोज़ो में आपका स्वागत है। आइए एक दूसरे को जानें।",
    onboardingSwipeHint: "समझ आ गया तो दाएं स्वाइप करें, दूसरी व्याख्या के लिए बाएं स्वाइप करें।",
    onboardingStyleTitle: "आप किस तरह से सीखना पसंद करते हैं?",
    onboardingStyleSubtitle: "रिन आपकी पसंद के अनुसार कार्ड्स को अनुकूलित करेगा।",
    styleVisual: "दृश्य (चार्ट और रेखाचित्र)",
    styleConcept: "सीधा सिद्धांत (स्पष्ट परिभाषाएं)",
    styleStory: "कहानियां और उपमाएं (वास्तविक जीवन के उदाहरण)",
    styleAuditory: "श्रव्य (सुनकर समझें)",
    next: "आगे बढ़ें",
    startLearning: "सीखना शुरू करें",
    lessonCompleted: "शानदार काम।",
    lessonCompletedDesc: "पाठ पूरा हुआ। रिन की चमक और बढ़ गई है।",
    bossBattleTitle: "बॉस बैटल",
    bossBattleDesc: "अगले क्षेत्र को अनलॉक करने के लिए पांच प्रश्नों के उत्तर दें।",
    backToMap: "महासागर मानचित्र",
    audioToggle: "ऑडियो मोड",
    audioToggleDesc: "अवधारणाओं को जोर से सुनने के लिए ऑडियो चालू करें",
    settingsTitle: "सेटिंग्स",
    settingsLanguage: "भाषा बदलें",
    settingsAudio: "ऑडियो सक्षम करें",
    settingsContrast: "उच्च कंट्रास्ट",
    settingsMotion: "कम एनिमेशन",
    downloadPacks: "ऑफ़लाइन पैक प्रबंधित करें"
  },
  tamil: {
    landingTitle: "உங்களுக்கு செவிசாய்க்கும் கற்றல்",
    landingSubtitle: "ரின்ஹோசோ உங்கள் வேகத்தைப் புரிந்துகொண்டு, உங்கள் கற்றல் பயணத்தை ஆதரித்து, உங்களுடன் சேர்ந்து வளரும் ஒரு சிறந்த துணை.",
    landingCtaStart: "பயணத்தைத் தொடங்குங்கள்",
    landingCtaHow: "செயல்முறையை அறிக",
    landingPillPace: "சொந்த வேகத்தில் கற்கவும்",
    landingPillRin: "ரின் துணை",
    landingPillGrowth: "சிறு படிகள், பெரு வளர்ச்சி",
    landingRinBubble: "வணக்கம், நான் ரின்ஹோசோ. உங்கள் கற்றல் பயணத்தில் வழிகாட்டவும், ஊக்குவிக்கவும், ஒவ்வொரு அடியிலும் உங்களுடன் இணைந்து கற்கவும் நான் இருக்கிறேன்.",
    langSelectTitle: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
    langSelectSubtitle: "நீங்கள் வீட்டில் பேசும் மொழியில் எளிதாகக் கற்றுக்கொள்ளுங்கள்.",
    navHome: "முகப்பு",
    navFeatures: "அம்சங்கள்",
    navHowItWorks: "செயல்முறை",
    navForEducators: "கல்வியாளர்களுக்கு",
    navAbout: "எங்களைப் பற்றி",
    navGetStarted: "தொடங்கவும்",
    onboardingWelcome: "ரின்ஹோசோவிற்கு உங்களை வரவேற்கிறோம். உங்களைப் பற்றி கூறுங்கள்.",
    onboardingSwipeHint: "புரிந்தால் வலப்பக்கம் ஸ்வைப் செய்யவும், கூடுதல் விளக்கம் தேவையெனில் இடப்பக்கம் ஸ்வைப் செய்யவும்.",
    onboardingStyleTitle: "நீங்கள் எவ்வழியில் கற்க விரும்புகிறீர்கள்?",
    onboardingStyleSubtitle: "ரின் உங்கள் விருப்பத்திற்கு ஏற்ப பாடங்களை அமைக்கும்.",
    styleVisual: "காட்சி வழிக் கற்றல் (வரைபடங்கள், படங்கள்)",
    styleConcept: "நேரடி கருத்துகள் (தெளிவான விளக்கங்கள்)",
    styleStory: "கதைகள் மற்றும் உதாரணங்கள் (நிஜ வாழ்க்கையோடு ஒப்பிட்டு)",
    styleAuditory: "கேட்டல் வழிக் கற்றல் (கேட்டுப் புரிந்துகொள்வது)",
    next: "அடுத்து",
    startLearning: "கற்கத் தொடங்குங்கள்",
    lessonCompleted: "அருமையான வேலை.",
    lessonCompletedDesc: "பாடம் முடிந்தது. ரின் இன்னும் பிரகாசிக்கிறது.",
    bossBattleTitle: "பாஸ் போர்",
    bossBattleDesc: "அடுத்த பகுதியைத் திறக்க 5 கேள்விகளுக்குப் பதிலளிக்கவும்.",
    backToMap: "பெருங்கடல் வரைபடம்",
    audioToggle: "ஒலி பயன்முறை",
    audioToggleDesc: "கருத்துக்களைக் கேட்க ஒலியை இயக்கவும்",
    settingsTitle: "அமைப்புகள்",
    settingsLanguage: "மொழியை மாற்றவும்",
    settingsAudio: "ஒலியை இயக்கவும்",
    settingsContrast: "அதிக மாறுபாடு (High Contrast)",
    settingsMotion: "குறைந்த அனிமேஷன் (Reduced Motion)",
    downloadPacks: "பதிவிறக்கங்களை நிர்வகி"
  },
  english: {
    landingTitle: "Learning that listens",
    landingSubtitle: "Rinhozo is a companion that understands your pace, supports your journey, and grows alongside you.",
    landingCtaStart: "Start Your Journey",
    landingCtaHow: "See How It Works",
    landingPillPace: "Learn at your pace",
    landingPillRin: "Supported by Rin",
    landingPillGrowth: "Small steps, big growth",
    landingRinBubble: "Hi, I am Rinhozo. I am here to guide, encourage, and learn with you, every step of the way.",
    langSelectTitle: "Choose your language",
    langSelectSubtitle: "Learn in the language you speak at home.",
    navHome: "Home",
    navFeatures: "Features",
    navHowItWorks: "How it works",
    navForEducators: "For Educators",
    navAbout: "About",
    navGetStarted: "Get Started",
    onboardingWelcome: "Welcome to Rinhozo. Let us get to know you.",
    onboardingSwipeHint: "Swipe Right if you understand, and Swipe Left if you want a different explanation.",
    onboardingStyleTitle: "How do you prefer to learn?",
    onboardingStyleSubtitle: "Rin will adapt the cards to match your learning style.",
    styleVisual: "Visuals (Charts, diagrams, and illustrations)",
    styleConcept: "Direct Concepts (Clear formulas and definitions)",
    styleStory: "Stories and Analogies (Real-world examples and movies)",
    styleAuditory: "Auditory (Listen to voice explanations)",
    next: "Next",
    startLearning: "Start Learning",
    lessonCompleted: "Nice work.",
    lessonCompletedDesc: "Reef completed. Rin is glowing brighter.",
    bossBattleTitle: "Boss Battle",
    bossBattleDesc: "Pass a 5-question adaptive quiz to unlock the next Reef.",
    backToMap: "Back to Ocean Map",
    audioToggle: "Audio Mode",
    audioToggleDesc: "Enable to hear concepts read aloud",
    settingsTitle: "Settings",
    settingsLanguage: "Change Language",
    settingsAudio: "Enable Audio Mode",
    settingsContrast: "High Contrast Mode",
    settingsMotion: "Reduced Motion",
    downloadPacks: "Manage Offline Packs"
  }
};
