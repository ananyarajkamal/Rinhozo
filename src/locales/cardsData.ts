export interface LessonCard {
  id: string;
  type: 'concept' | 'analogy' | 'quiz' | 'visual';
  title: string;
  body: string;
  mediaType?: 'image' | 'math' | 'icon';
  mediaVal?: string; // Formula or icon name
  options?: string[]; // For quiz cards
  answerIdx?: number; // Index of correct option
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
}

export interface TopicData {
  id: string;
  slug: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cards: LessonCard[];
}

export const TOPICS_DATA: Record<string, Record<string, TopicData>> = {
  'algebra-reef': {
    hinglish: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'Algebra Reef',
      description: 'Variables aur basic equations ki mystery ko unlock karo.',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'Algebra Kya Hai',
          body: 'Algebra basically ek mystery game hai, jahan hum letters (jaise x ya y) ko use karte hain un numbers ki jagah jo hume abhi nahi pata. Hum in letters ko variables kehte hain kyunki inki value badal sakti hai.',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'The Balance Scale',
          body: 'Equation ko ek taraju (balance scale) ki tarah samjho. Dono sides hamesha equal honi chahiye. Agar aap ek side 5 add karte ho, toh balance rakhne ke liye otsri side bhi 5 add karna padega. Jo bhi karo, dono side barabar karo.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'x Ki Value Nikalna',
          body: 'Agar x + 5 = 12 hai, toh hume x ko akela karna hai. Iske liye hum iska opposite action karenge: dono sides se 5 subtract kar denge.\n\nx + 5 - 5 = 12 - 5\nx = 7\n\nSimple calculation, direct answer.',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'Quick Check',
          body: 'Chalo test karte hain. Solve karo: 3x = 15. Yahan x ki kya value hogi?',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'Shabaash, sahi jawaab. 3x = 15 matlab dono side 3 se divide karo: x = 15/3 = 5. Rin is glowing.',
          feedbackIncorrect: 'Oops, thoda dhyan do. Yahan 3 multiplied by x = 15 hai. Toh multiply ka opposite divide hoga. Phir se try karo.'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'Real Life Mein Kahan Use Hoga',
          body: 'Jab aap shopping par jaate ho aur likha hota hai Buy 1 Get 50% Off on 2nd, tab aapke mind mein algebra chal raha hota hai. Aap variable x (price) se total cost compute kar rahe hote ho: x + 0.5x = 1.5x. You are already an Algebra expert.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    english: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'Algebra Reef',
      description: 'Unlock the mysteries of variables and simple equations.',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'What is Algebra',
          body: 'Algebra is like a mystery game where we use letters (like x or y) to stand in for numbers we do not know yet. We call these letters variables because their values can change.',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'The Balance Scale',
          body: 'Think of an equation as a balance scale. Both sides must always remain equal. If you add 5 to one side, you must add 5 to the other side to keep it balanced. Whatever you do, do it to both sides.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'Solving for x',
          body: 'If x + 5 = 12, we want to get x by itself. We do the opposite of adding 5, which is subtracting 5 from both sides.\n\nx + 5 - 5 = 12 - 5\nx = 7\n\nSimple subtraction gives us the solution.',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'Quick Check',
          body: 'Let us test your skills. Solve: 3x = 15. What is the value of x?',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'Great job, correct. 3x = 15 means we divide both sides by 3: x = 15/3 = 5. Rin is glowing.',
          feedbackIncorrect: 'Oops, not quite. Here, 3 times x = 15. The opposite of multiplication is division. Try dividing 15 by 3.'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'Real Life Connection',
          body: 'When you shop and see Buy 1 Get 50% Off on the 2nd, you are using algebra. You are solving an equation in your head to calculate total cost: x + 0.5x = 1.5x. You are already an algebra pro.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    hindi: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'अलजेब्रा रीफ',
      description: 'चर और सरल समीकरणों के रहस्यों को सुलझाएं।',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'बीजगणित क्या है',
          body: 'बीजगणित एक पहेली के खेल की तरह है, जहाँ हम उन संख्याओं की जगह अक्षरों (जैसे x या y) का उपयोग करते हैं जो हमें अभी ज्ञात नहीं हैं। इन अक्षरों को हम चर कहते हैं क्योंकि इनका मान बदल सकता है।',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'संतुलन तराजू',
          body: 'समीकरण को एक तराजू की तरह समझें। दोनों पक्ष हमेशा समान होने चाहिए। यदि आप एक तरफ ५ जोड़ते हैं, तो संतुलन बनाए रखने के लिए आपको दूसरी तरफ भी ५ जोड़ना होगा। जो कुछ भी करें, दोनों तरफ समान रूप से करें.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'x का मान निकालना',
          body: 'यदि x + 5 = 12 है, तो हम x को अकेला करना चाहते हैं। इसके लिए हम ५ जोड़ने का विपरीत कार्य करेंगे यानी दोनों पक्षों से ५ घटाएंगे.\n\nx + 5 - 5 = 12 - 5\nx = 7\n\nसरल घटाव से हमें हमारा उत्तर मिल जाता है.',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'त्वरित जांच',
          body: 'आइए आपकी समझ की परीक्षा लें. हल करें: 3x = 15. यहाँ x का मान क्या होगा.',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'बहुत बढ़िया, सही उत्तर। 3x = 15 का अर्थ है कि हम दोनों पक्षों को ३ से विभाजित करते हैं: x = 15/3 = 5. रिन खुशी से चमक रहा है.',
          feedbackIncorrect: 'ओह, सही नहीं है। यहाँ 3 गुना x = 15 है। गुणा का विपरीत विभाजन होता है। १५ को ३ से विभाजित करके देखें.'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'वास्तविक जीवन में उपयोग',
          body: 'जब आप खरीदारी करते हैं और देखते हैं एक खरीदें, दूसरे पर ५० प्रतिशत की छूट पाएं, तो आप बीजगणित का उपयोग कर रहे होते हैं। आप कुल लागत की गणना करने के लिए अपने दिमाग में एक समीकरण हल कर रहे होते हैं: x + 0.5x = 1.5x.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    tamil: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'இயற்கணித ரீஃப்',
      description: 'மாறிகள் மற்றும் எளிய சமன்பாடுகளின் புதிர்களை அவிழ்க்கவும்.',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'இயற்கணிதம் என்றால் என்ன',
          body: 'இயற்கணிதம் என்பது ஒரு புதிர் விளையாட்டு போன்றது. இன்னும் அறியப்படாத எண்களுக்குப் பதிலாக நாம் ஆங்கில எழுத்துக்களை (x அல்லது y) பயன்படுத்துகிறோம். இந்த எழுத்துக்களை நாம் மாறிகள் என்று அழைக்கிறோம், ஏனெனில் அவற்றின் மதிப்பு மாறக்கூடியது.',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'தராசு சமநிலை',
          body: 'ஒரு சமன்பாட்டை தராசு போல நினையுங்கள். இருபுறமும் எப்போதும் சமமாக இருக்க வேண்டும். ஒரு பக்கத்தில் 5 ஐக் கூட்டினால், தராசைச் சமமாக வைக்க மறுபக்கத்திலும் 5 ஐக் கூட்ட வேண்டும். எதைச் செய்தாலும் இருபுறமும் செய்யுங்கள்.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'x இன் மதிப்பு காணல்',
          body: 'x + 5 = 12 எனில், x ஐத் தனிமைப்படுத்த வேண்டும். 5 ஐக் கூட்டுவதற்கு மாறாக, இருபுறமிருந்தும் 5 ஐக் கழிக்க வேண்டும்.\n\nx + 5 - 5 = 12 - 5\nx = 7\n\nஎளிய கழித்தல் நமக்கு விடையைத் தருகிறது.',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'விரைவு சோதனை',
          body: 'உங்கள் திறனைச் சோதிப்போம். தீர்க்கவும்: 3x = 15. இங்கு x இன் மதிப்பு என்ன.',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'மிக நன்று, சரியான விடை. 3x = 15 என்றால் இருபுறமும் 3 ஆல் வகுக்க வேண்டும்: x = 15/3 = 5. ரின் பிரகாசிக்கிறது.',
          feedbackIncorrect: 'தவறு. இங்கு 3 பெருக்கல் x = 15 என உள்ளது. பெருக்கலின் எதிர்செயல் வகுத்தல் ஆகும். 15 ஐ 3 ஆல் வகுத்துப் பாருங்கள்.'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'நிஜ வாழ்க்கை பயன்பாடு',
          body: 'நீங்கள் கடைக்குச் சென்று ஒன்று வாங்கினால் இரண்டாவதற்கு 50 விழுக்காடு தள்ளுபடி என்று பார்க்கும்போது, நீங்கள் இயற்கணிதத்தையே பயன்படுத்துகிறீர்கள். மொத்தச் செலவைக் கணக்கிட உங்கள் மனதில் ஒரு சமன்பாட்டைத் தீர்க்கிறீர்கள்: x + 0.5x = 1.5x.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    }
  },
  'physics-volcano': {
    hinglish: {
      id: 'physics-volcano',
      slug: 'physics-volcano',
      name: 'Physics Volcano',
      description: 'Gravity aur force ke laws ko seekhein.',
      difficulty: 'medium',
      cards: [
        {
          id: 'phy-c1',
          type: 'concept',
          title: 'Gravity Kya Hai',
          body: 'Gravity ek invisible attraction force hai jo objects ko ek dusre ki taraf khinchti hai. Earth ki gravity sabhi cheezon ko zameen ki taraf khinchti hai.',
          mediaType: 'math',
          mediaVal: 'F = G \\frac{m_1 m_2}{r^2}'
        },
        {
          id: 'phy-c2',
          type: 'analogy',
          title: 'An Invisible Giant Hand',
          body: 'Gravity ko ek giant invisible haath ki tarah samjho jo har cheez ko pakad kar niche khinch raha hai. Jab aap jump karte ho, toh wahi haath aapko wapas niche lata hai.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'phy-c3',
          type: 'quiz',
          title: 'Gravity Challenge',
          body: 'Agar hum ek feather aur ek stone ko vacuum (jahan hawa na ho) mein girayein, toh pehle kaun niche pahunchega.',
          options: ['Stone pehle', 'Feather pehle', 'Dono ek sath', 'Koyi nahi girega'],
          answerIdx: 2,
          feedbackCorrect: 'Ekdum sahi. Vacuum mein hawa ka resistance nahi hota, isliye gravity dono ko ek sath niche khinchti hai. Newton rules.',
          feedbackIncorrect: 'Oops, dhyan rahe vacuum likha hai. Vacuum mein air resistance nahi hota, isliye heavy aur light objects ek sath girti hain.'
        },
        {
          id: 'phy-c4',
          type: 'visual',
          title: 'Volcano Ka Physics',
          body: 'Volcano se jab lava nikalta hai, toh gravity ke karan woh niche behna shuru karta hai. Lava ki viscosity uski speed decide karti hai.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        }
      ]
    },
    english: {
      id: 'physics-volcano',
      slug: 'physics-volcano',
      name: 'Physics Volcano',
      description: 'Learn the principles of gravity and forces.',
      difficulty: 'medium',
      cards: [
        {
          id: 'phy-c1',
          type: 'concept',
          title: 'What is Gravity',
          body: 'Gravity is the invisible force that pulls objects toward each other. Earth gravity keeps your feet on the ground and pulls falling objects down.',
          mediaType: 'math',
          mediaVal: 'F = G \\frac{m_1 m_2}{r^2}'
        },
        {
          id: 'phy-c2',
          type: 'analogy',
          title: 'An Invisible Giant Hand',
          body: 'Think of gravity like a giant invisible hand pulling everything down. When you jump up, that hand gently pulls you back to the ground.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'phy-c3',
          type: 'quiz',
          title: 'Gravity Challenge',
          body: 'If you drop a feather and a stone in a vacuum chamber, which one hits the ground first.',
          options: ['The stone', 'The feather', 'Both at the same time', 'Neither will fall'],
          answerIdx: 2,
          feedbackCorrect: 'Correct. In a vacuum, there is no air resistance, so all objects fall at the same rate regardless of their mass.',
          feedbackIncorrect: 'Oops, not quite. Remember, in a vacuum there is no air resistance. Heavy and light objects fall at the exact same speed.'
        },
        {
          id: 'phy-c4',
          type: 'visual',
          title: 'Volcanic Forces',
          body: 'When volcanoes erupt, lava is thrown high, but gravity forces it back down. The slope and lava viscosity determine how it flows.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        }
      ]
    },
    hindi: {
      id: 'physics-volcano',
      slug: 'physics-volcano',
      name: 'भौतिकी ज्वालामुखी',
      description: 'गुरुत्वाकर्षण और बल के नियमों को समझें।',
      difficulty: 'medium',
      cards: [
        {
          id: 'phy-c1',
          type: 'concept',
          title: 'गुरुत्वाकर्षण क्या है',
          body: 'गुरुत्वाकर्षण एक अदृश्य बल है जो वस्तुओं को एक-दूसरे की ओर खींचता है। पृथ्वी का गुरुत्वाकर्षण हमारे पैरों को जमीन पर टिकाए रखता है।',
          mediaType: 'math',
          mediaVal: 'F = G \\frac{m_1 m_2}{r^2}'
        },
        {
          id: 'phy-c2',
          type: 'analogy',
          title: 'एक अदृश्य विशाल हाथ',
          body: 'गुरुत्वाकर्षण को एक बड़े अदृश्य हाथ की तरह सोचें जो हर चीज़ को नीचे खींचता है। जब आप कूदते हैं, तो वह हाथ आपको वापस नीचे खींच लाता है।',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'phy-c3',
          type: 'quiz',
          title: 'गुरुत्वीय चुनौती',
          body: 'यदि आप एक निर्वात (vacuum) में एक पंख और एक पत्थर को एक साथ गिराते हैं, तो कौन सा पहले जमीन से टकराएगा।',
          options: ['पत्थर पहले', 'पंख पहले', 'दोनों एक साथ', 'कोई नहीं गिरेगा'],
          answerIdx: 2,
          feedbackCorrect: 'बिल्कुल सही. निर्वात में वायु का कोई प्रतिरोध नहीं होता, इसलिए सभी वस्तुएं समान गति से गिरती हैं।',
          feedbackIncorrect: 'ओह, ध्यान दें निर्वात लिखा है। हवा की अनुपस्थिति में गुरुत्वाकर्षण दोनों पर समान रूप से कार्य करेगा।'
        },
        {
          id: 'phy-c4',
          type: 'visual',
          title: 'ज्वालामुखीय बल',
          body: 'जब ज्वालामुखी फटता है, तो लावा ऊपर जाता है लेकिन गुरुत्वाकर्षण उसे नीचे लाता है। ढलान तय करती है कि लावा कितनी तेजी से बहेगा।',
          mediaType: 'icon',
          mediaVal: 'Scale'
        }
      ]
    },
    tamil: {
      id: 'physics-volcano',
      slug: 'physics-volcano',
      name: 'இயற்பியல் எரிமலை',
      description: 'ஈர்ப்பு மற்றும் விசையின் விதிகளைக் கற்றுக் கொள்ளுங்கள்.',
      difficulty: 'medium',
      cards: [
        {
          id: 'phy-c1',
          type: 'concept',
          title: 'ஈர்ப்பு விசை என்றால் என்ன',
          body: 'ஈர்ப்பு விசை என்பது பொருட்களை ஒன்றையொன்று ஈர்க்கும் ஒரு கண்ணுக்குத் தெரியாத விசையாகும். பூமியின் ஈர்ப்பு நமது கால்களைத் தரையில் நிலைநிறுத்துகிறது.',
          mediaType: 'math',
          mediaVal: 'F = G \\frac{m_1 m_2}{r^2}'
        },
        {
          id: 'phy-c2',
          type: 'analogy',
          title: 'ஒரு கண்ணுக்குத் தெரியாத கை',
          body: 'ஈர்ப்பு விசையை எல்லாவற்றையும் கீழே இழுக்கும் ஒரு கண்ணுக்குத் தெரியாத பிரம்மாண்ட கை போல நினையுங்கள். நீங்கள் குதிக்கும் போது அது உங்களைக் கீழே கொண்டுவருகிறது.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'phy-c3',
          type: 'quiz',
          title: 'ஈர்ப்பு விசை சவால்',
          body: 'காற்று இல்லாத ஒரு வெற்று அறையில் ஒரு இறகையும் ஒரு கல்லையும் ஒரே நேரத்தில் கீழே போட்டால் எது முதலில் தரையை அடையும்.',
          options: ['கல் முதலில்', 'இறகு முதலில்', 'இரண்டும் ஒரே நேரத்தில்', 'எதுவும் விழாது'],
          answerIdx: 2,
          feedbackCorrect: 'சரி. காற்று இல்லாத இடத்தில் காற்றின் எதிர்ப்பு இருக்காது, எனவே அனைத்துப் பொருட்களும் ஒரே வேகத்தில் விழும்.',
          feedbackIncorrect: 'தவறு. காற்று இல்லாத அறையில் காற்றின் எதிர்ப்பு இருக்காது என்பதால் இரண்டும் ஒரே நேரத்தில் தரையை அடையும்.'
        },
        {
          id: 'phy-c4',
          type: 'visual',
          title: 'எரிமலை விசை',
          body: 'எரிமலை வெடிக்கும் போது வெளிவரும் லாவா ஈர்ப்பு விசையால் கீழே இழுக்கப்படுகிறது. அதன் வேகம் அதன் அடர்த்தியைப் பொறுத்தது.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        }
      ]
    }
  },
  'history-island': {
    hinglish: {
      id: 'history-island',
      slug: 'history-island',
      name: 'History Island',
      description: 'Ancient empires aur historical resources ko samjhein.',
      difficulty: 'medium',
      cards: [
        {
          id: 'hist-c1',
          type: 'concept',
          title: 'Historical Sources Kya Hain',
          body: 'History ko reconstruction karne ke liye hume sources ki zaroorat hoti hai. Inme artifacts (coins, pots) aur written manuscripts shamil hote hain.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c2',
          type: 'analogy',
          title: 'History Detective',
          body: 'Historians ko ek detective ki tarah samjho. Woh purani building, coins aur kitabon ke clues se pata lagate hain ki purane zamane mein kya hua tha.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c3',
          type: 'quiz',
          title: 'Source Challenge',
          body: 'Inmein se kaun sa ek archeological source hai, written manuscript nahi.',
          options: ['Puranic text', 'Ashoka Pillar', 'Rigveda manuscript', 'Travel accounts'],
          answerIdx: 1,
          feedbackCorrect: 'Shaabash. Ashoka Pillar stone sculpture aur inscription archeological source hai, written book nahi.',
          feedbackIncorrect: 'Not correct. Manuscript likhi hui cheez hoti hai, jabki pillars aur monuments archeological artifacts hote hain.'
        },
        {
          id: 'hist-c4',
          type: 'visual',
          title: 'History Island Archeology',
          body: 'Is island par purane zamane ke coins mile hain. In coins se purane kings ke trade routes ka pata chalta hai.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    english: {
      id: 'history-island',
      slug: 'history-island',
      name: 'History Island',
      description: 'Explore the artifacts of ancient civilizations.',
      difficulty: 'medium',
      cards: [
        {
          id: 'hist-c1',
          type: 'concept',
          title: 'What are Historical Sources',
          body: 'To study history, we rely on sources. These can be physical artifacts (coins, ruins) or written records (manuscripts, letters).',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c2',
          type: 'analogy',
          title: 'History Detectives',
          body: 'Think of historians as detectives. They use pieces of broken pottery, ancient coins, and old books as clues to reconstruct past events.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c3',
          type: 'quiz',
          title: 'Archeology Challenge',
          body: 'Which of the following is considered an archaeological source rather than a literary source.',
          options: ['Ancient scriptures', 'The Ashoka Pillar', 'Palm leaf manuscripts', 'Travel diaries'],
          answerIdx: 1,
          feedbackCorrect: 'Correct. The Ashoka Pillar is a monument and physical inscription, which makes it an archaeological source.',
          feedbackIncorrect: 'Not quite. Literary sources are written texts. Physical structures and pillars are archaeological sources.'
        },
        {
          id: 'hist-c4',
          type: 'visual',
          title: 'Ancient Trade Routes',
          body: 'Coins found on this island prove that ancient civilizations traded with empires across the ocean centuries ago.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    hindi: {
      id: 'history-island',
      slug: 'history-island',
      name: 'इतिहास द्वीप',
      description: 'प्राचीन साम्राज्यों और ऐतिहासिक स्रोतों का अन्वेषण करें।',
      difficulty: 'medium',
      cards: [
        {
          id: 'hist-c1',
          type: 'concept',
          title: 'ऐतिहासिक स्रोत क्या हैं',
          body: 'इतिहास के पुनर्निर्माण के लिए हम स्रोतों पर निर्भर रहते हैं। इनमें भौतिक कलाकृतियाँ (सिक्के, खंडहर) और लिखित रिकॉर्ड शामिल हैं।',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c2',
          type: 'analogy',
          title: 'इतिहास के जासूस',
          body: 'इतिहासकारों को जासूसों की तरह सोचें। वे प्राचीन सिक्कों और पुरानी किताबों को सुराग के रूप में इस्तेमाल करते हैं।',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c3',
          type: 'quiz',
          title: 'स्रोत चुनौती',
          body: 'निम्नलिखित में से किसे साहित्यिक स्रोत के बजाय पुरातात्विक स्रोत माना जाता है।',
          options: ['प्राचीन ग्रंथ', 'अशोक स्तंभ', 'ताड़ के पत्ते की पांडुलिपि', 'यात्रा डायरी'],
          answerIdx: 1,
          feedbackCorrect: 'बिल्कुल सही. अशोक स्तंभ एक भौतिक स्मारक और शिलालेख है, जो इसे एक पुरातात्विक स्रोत बनाता है।',
          feedbackIncorrect: 'सही नहीं है। साहित्यिक स्रोत लिखित ग्रंथ होते हैं, जबकि खंभे और स्मारक पुरातात्विक स्रोत होते हैं।'
        },
        {
          id: 'hist-c4',
          type: 'visual',
          title: 'प्राचीन व्यापार मार्ग',
          body: 'द्वीप पर पाए गए प्राचीन सिक्के दर्शाते हैं कि यहाँ के लोग सदियों पहले समुद्र पार के साम्राज्यों के साथ व्यापार करते थे।',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    tamil: {
      id: 'history-island',
      slug: 'history-island',
      name: 'வரலாற்று தீவு',
      description: 'பண்டைய பேரரசுகள் மற்றும் வரலாற்று சான்றுகளைப் புரிந்து கொள்ளுங்கள்.',
      difficulty: 'medium',
      cards: [
        {
          id: 'hist-c1',
          type: 'concept',
          title: 'வரலாற்று சான்றுகள் யாவை',
          body: 'வரலாற்றை மீண்டும் கட்டமைக்க நாம் சான்றுகளை நம்பியிருக்கிறோம். இதில் தொல்பொருட்கள் மற்றும் எழுதப்பட்ட ஓலைச்சுவடிகள் அடங்கும்.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c2',
          type: 'analogy',
          title: 'வரலாற்று துப்பறியாளர்கள்',
          body: 'வரலாற்றை மீண்டும் கட்டமைக்க நாம் சான்றுகளை நம்பியிருக்கிறோம். இதில் தொல்பொருட்கள் மற்றும் எழுதப்பட்ட ஓலைச்சுவடிகள் அடங்கும்.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        },
        {
          id: 'hist-c3',
          type: 'quiz',
          title: 'சான்று சவால்',
          body: 'இவற்றில் எது எழுதப்பட்ட இலக்கிய சான்று அல்ல, தொல்பொருள் சான்றாகும்.',
          options: ['பண்டைய நூல்கள்', 'அசோகர் தூண்', 'ஓலைச்சுவடிகள்', 'பயணக் குறிப்புகள்'],
          answerIdx: 1,
          feedbackCorrect: 'சரி. அசோகர் தூண் என்பது ஒரு கல் தூண் கல்வெட்டாகும், இது தொல்பொருள் சான்றாகும்.',
          feedbackIncorrect: 'தவறு. இலக்கியச் சான்றுகள் எழுதப்பட்ட நூல்களாகும், கல் தூண்கள் மற்றும் நினைவுச் சின்னங்கள் தொல்பொருள் சான்றுகளாகும்.'
        },
        {
          id: 'hist-c4',
          type: 'visual',
          title: 'பண்டைய வணிக வழிகள்',
          body: 'இந்த தீவில் கண்டெடுக்கப்பட்ட நாணயங்கள் பல நூற்றாண்டுகளுக்கு முன்பு கடல் கடந்து வர்த்தகம் நடந்ததை நிரூபிக்கின்றன.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    }
  }
};

// Generates expanded cards dynamically to guarantee exactly 15 cards per topic/language
export const getExpandedCards = (topicId: string, lang: string): LessonCard[] => {
  const langKey = (lang === 'hindi' || lang === 'tamil' || lang === 'english' || lang === 'hinglish') ? lang : 'hinglish';
  const topicObj = TOPICS_DATA[topicId]?.[langKey] || TOPICS_DATA[topicId]?.['hinglish'];
  const baseCards = [...(topicObj?.cards || [])];

  if (baseCards.length === 0) return [];

  // If already expanded or topic not found, return base
  if (baseCards.length >= 15) return baseCards;

  // Programmatic generator to fill up to 15 cards
  const remainingCount = 15 - baseCards.length;
  
  for (let i = 0; i < remainingCount; i++) {
    const cardIndex = baseCards.length + 1;
    const typeVal = i % 4 === 0 ? 'concept' : i % 4 === 1 ? 'analogy' : i % 4 === 2 ? 'quiz' : 'visual';
    
    let generatedCard: LessonCard = {
      id: `${topicId}-gen-${cardIndex}`,
      type: typeVal,
      title: '',
      body: ''
    };

    if (topicId === 'algebra-reef') {
      if (typeVal === 'concept') {
        generatedCard.title = 'Constants vs Variables';
        generatedCard.body = langKey === 'hinglish' 
          ? 'Algebra mein numbers (jaise 3, 5, -8) ko **constants** kehte hain kyunki inki value fix hoti hai. Lekin letters (jaise x, y) **variables** hote hain jinhe hum badal sakte hain.'
          : langKey === 'hindi'
          ? 'बीजगणित में संख्याओं (जैसे ३, ५, -८) को अचर (constants) कहा जाता है क्योंकि इनका मान निश्चित होता है। लेकिन अक्षरों (जैसे x, y) को चर (variables) कहा जाता है जिनका मान बदला जा सकता है।'
          : langKey === 'tamil'
          ? 'இயற்கணிதத்தில் எண்கள் (3, 5) மாறிலிகள் (constants) எனப்படும், ஏனெனில் அவற்றின் மதிப்பு நிலையானது. ஆனால் மாறிகள் (variables, x, y) மதிப்புகள் மாறக்கூடியவை.'
          : 'In algebra, regular numbers (like 3, 5, -8) are called constants because their value is fixed. Letters (like x, y) are variables because their values can change.';
        generatedCard.mediaType = 'math';
        generatedCard.mediaVal = '5 = \\text{Constant}, \\quad x = \\text{Variable}';
      } else if (typeVal === 'analogy') {
        generatedCard.title = 'Algebra as Box Storage';
        generatedCard.body = langKey === 'hinglish'
          ? 'Variables ko ek khaali box ki tarah samjho jiske upar label laga hai. Aap box ke andar koyi bhi value rakh sakte ho. Agar box par x likha hai, toh x ki value wahi hogi jo us box ke andar rakhi hai.'
          : langKey === 'hindi'
          ? 'चर को एक खाली बक्से की तरह सोचें जिस पर लेबल लगा हो। आप इस बक्से में कोई भी संख्या रख सकते हैं। यदि बक्से पर x लिखा है, तो x का मान उस बक्से में रखी वस्तु के बराबर होगा।'
          : langKey === 'tamil'
          ? 'மாறியை ஒரு வெற்றுப் பெட்டி போல நினைக்கவும். அந்தப் பெட்டியில் எந்த எண்ணையும் நீங்கள் வைக்கலாம். பெட்டியின் மேல் x என்று எழுதப்பட்டால், x இன் மதிப்பு அந்தப் பெட்டியில் உள்ள எண் ஆகும்.'
          : 'Think of a variable as an empty cardboard box with a label on it. You can store any number inside this box. If the box is labeled x, then x equals whatever is inside it.';
        generatedCard.mediaType = 'icon';
        generatedCard.mediaVal = 'ShoppingBag';
      } else if (typeVal === 'quiz') {
        generatedCard.title = 'Solve Expression';
        generatedCard.body = langKey === 'hinglish'
          ? `Chalo practice karte hain. Solve karo: x - 4 = 10. Yahan x ki value kya hogi.`
          : langKey === 'hindi'
          ? `अभ्यास करें। हल करें: x - 4 = 10. यहाँ x का मान क्या होगा.`
          : langKey === 'tamil'
          ? `பயிற்சி செய்வோம். தீர்க்கவும்: x - 4 = 10. இங்கு x இன் மதிப்பு என்ன.`
          : `Let us practice. Solve: x - 4 = 10. What is the value of x?`;
        generatedCard.options = ['x = 6', 'x = 14', 'x = 40', 'x = 10'];
        generatedCard.answerIdx = 1;
        generatedCard.feedbackCorrect = langKey === 'hinglish' ? 'Bahut badhiya. x - 4 = 10 matlab dono side 4 add karo: x = 10 + 4 = 14.' : 'Correct. x = 14.';
        generatedCard.feedbackIncorrect = langKey === 'hinglish' ? 'No, check karo. Opposite of subtraction is addition.' : 'Incorrect. Try adding 4 to both sides.';
      } else {
        generatedCard.title = 'Algebraic Operations';
        generatedCard.body = langKey === 'hinglish'
          ? 'Multiplication ko simple notation mein likhte hain. Jaise 3 multiplied by x ko hum simple 3x likhte hain, multiplication symbol lagane ki zaroorat nahi hoti.'
          : langKey === 'hindi'
          ? 'गुणा को बीजगणित में सरल रूप में लिखा जाता है। जैसे ३ गुना x को हम सीधे ३x लिखते हैं, गुणा का चिह्न लगाने की आवश्यकता नहीं होती है।'
          : langKey === 'tamil'
          ? 'இயற்கணிதத்தில் பெருக்கல் குறியீடு இல்லாமல் எழுதலாம். 3 பெருக்கல் x என்பதை 3x என்றே எழுதலாம்.'
          : 'In algebra, we omit the multiplication sign. For example, 3 times x is simply written as 3x. It means the same thing but looks cleaner.';
        generatedCard.mediaType = 'math';
        generatedCard.mediaVal = '3 \\times x = 3x';
      }
    } else if (topicId === 'physics-volcano') {
      if (typeVal === 'concept') {
        generatedCard.title = 'Mass vs Weight';
        generatedCard.body = langKey === 'hinglish'
          ? 'Mass matlab aapke body mein kitna matter hai, jo universe mein hamesha same rehta hai. Weight gravity par depend karta hai: agar gravity kam hogi, toh aapka weight bhi kam ho jayega.'
          : 'Mass is the actual amount of matter in an object, which stays constant everywhere. Weight is the force of gravity acting on that mass, which changes depending on where you are.';
        generatedCard.mediaType = 'math';
        generatedCard.mediaVal = 'W = m \\times g';
      } else if (typeVal === 'analogy') {
        generatedCard.title = 'Friction is like a Brake';
        generatedCard.body = langKey === 'hinglish'
          ? 'Friction ek resisting force hai jo moving objects ko rokti hai. Isko zameen par rassi khinchne ki tarah samjho jo rough road par mushkil se khinchti hai.'
          : 'Friction acts like an invisible brake. When you slide a book across a wooden table, friction between the surfaces slows it down and eventually stops it.';
        generatedCard.mediaType = 'icon';
        generatedCard.mediaVal = 'Scale';
      } else if (typeVal === 'quiz') {
        generatedCard.title = 'Weight on Moon';
        generatedCard.body = langKey === 'hinglish'
          ? 'Agar moon par gravity earth ki 1/6th hai, toh moon par aapka weight kitna ho jayega.'
          : 'If gravity on the Moon is 1/6th of Earth gravity, what happens to your weight on the Moon?';
        generatedCard.options = ['Increases', 'Decreases by 6 times', 'Stays the same', 'Becomes zero'];
        generatedCard.answerIdx = 1;
        generatedCard.feedbackCorrect = 'Correct. Gravity decreases, so weight decreases by 6 times.';
        generatedCard.feedbackIncorrect = 'Incorrect. Since weight depends directly on gravity, lower gravity means lower weight.';
      } else {
        generatedCard.title = 'Force Balance';
        generatedCard.body = langKey === 'hinglish'
          ? 'Jab dono side barabar force lagta hai, toh object hilta nahi hai. Isko static balance kehte hain.'
          : 'When equal forces act on an object from opposite directions, they cancel each other out. The object remains stationary.';
        generatedCard.mediaType = 'math';
        generatedCard.mediaVal = 'F_{\\text{net}} = 0';
      }
    } else {
      // history-island
      if (typeVal === 'concept') {
        generatedCard.title = 'Timelines in History';
        generatedCard.body = langKey === 'hinglish'
          ? 'History mein events ko set karne ke liye timelines use hote hain. BC matlab Before Christ aur AD/CE matlab Common Era.'
          : 'Historians use timelines to arrange historical events in chronological order. We use BCE (Before Common Era) and CE (Common Era) to mark time.';
        generatedCard.mediaType = 'icon';
        generatedCard.mediaVal = 'ShoppingBag';
      } else if (typeVal === 'analogy') {
        generatedCard.title = 'History as a Time Machine';
        generatedCard.body = langKey === 'hinglish'
          ? 'Historical monuments aur artifacts ko ek time machine ki tarah samjho. Unhe dekh kar hum jaan sakte hain ki hazaron saal pehle log kaise rehte the.'
          : 'Think of monuments as physical time machines. By visiting ruins or looking at old tools, we can visualize how people lived centuries ago.';
        generatedCard.mediaType = 'icon';
        generatedCard.mediaVal = 'ShoppingBag';
      } else if (typeVal === 'quiz') {
        generatedCard.title = 'Chronology Check';
        generatedCard.body = langKey === 'hinglish'
          ? 'Inmein se kaun sa event pehle hua tha: 500 BC ya 200 AD.'
          : 'Which of these historical events occurred first in time: 500 BCE or 200 CE?';
        generatedCard.options = ['500 BC', '200 AD', 'Both together', 'Cannot say'];
        generatedCard.answerIdx = 0;
        generatedCard.feedbackCorrect = 'Correct. BC timeline counts backward, so 500 BC occurred before 200 AD.';
        generatedCard.feedbackIncorrect = 'Incorrect. BC counts backward before year zero, so it is older than AD.';
      } else {
        generatedCard.title = 'Historical Artifacts';
        generatedCard.body = langKey === 'hinglish'
          ? 'Purane pots, ornaments aur weapons se us time ki technology aur life style ka pata chalta hai.'
          : 'Ancient pottery, tools, and weapons are archeological clues that reveal the technology level and craftsmanship of ancient empires.';
        generatedCard.mediaType = 'icon';
        generatedCard.mediaVal = 'ShoppingBag';
      }
    }

    baseCards.push(generatedCard);
  }

  return baseCards;
};
