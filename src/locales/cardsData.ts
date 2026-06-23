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
      name: 'Algebra Reef 🪼',
      description: 'Variables aur basic equations ki mystery ko unlock karo!',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'Algebra Kya Hai? 🤔',
          body: 'Algebra basically ek mystery game hai, jahan hum letters (jaise x ya y) ko use karte hain un numbers ki jagah jo hume abhi nahi pata! Hum in letters ko **variables** kehte hain kyunki inki value badal sakti hai.',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'The Balance Scale ⚖️',
          body: 'Equation ko ek **तराजू (balance scale)** ki tarah samjho. Dono sides hamesha equal honi chahiye. Agar aap ek side 5 add karte ho, toh balance rakhne ke liye dusri side bhi 5 add karna padega! Jo bhi karo, dono side barabar karo.',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'x Ki Value Nikalna 🔍',
          body: 'Agar $x + 5 = 12$ hai, toh hume $x$ ko akela karna hai. Iske liye hum iska opposite action karenge: dono sides se 5 subtract kar denge!\n\n$x + 5 - 5 = 12 - 5$\n$x = 7$\n\nSimple calculation, direct answer!',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'Quick Check! 🧠',
          body: 'Chalo test karte hain! Solve karo: $3x = 15$. Yahan $x$ ki kya value hogi?',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'Shabaash! Sahi jawaab. $3x = 15$ matlab dono side 3 se divide karo: $x = 15/3 = 5$. Rin is glowing! ✨',
          feedbackIncorrect: 'Oops! Thoda dhyan do. Yahan $3 \\times x = 15$ hai. Toh multiply ka opposite divide hoga. Phir se try karo!'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'Real Life Mein Kahan Use Hoga? 🛍️',
          body: 'Jab aap shopping par jaate ho aur likha hota hai "Buy 1 Get 50% Off on 2nd", tab aapke mind mein algebra chal raha hota hai! Aap variable $x$ (price) se total cost compute kar rahe hote ho: $x + 0.5x = 1.5x$. You are already an Algebra expert!',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    english: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'Algebra Reef 🪼',
      description: 'Unlock the mysteries of variables and simple equations!',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'What is Algebra? 🤔',
          body: 'Algebra is like a mystery game where we use letters (like x or y) to stand in for numbers we do not know yet. We call these letters **variables** because their values can change.',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'The Balance Scale ⚖️',
          body: 'Think of an equation as a **balance scale**. Both sides must always remain equal. If you add 5 to one side, you must add 5 to the other side to keep it balanced. Whatever you do, do it to both sides!',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'Solving for x 🔍',
          body: 'If $x + 5 = 12$, we want to get $x$ by itself. We do the opposite of adding 5, which is subtracting 5 from both sides:\n\n$x + 5 - 5 = 12 - 5$\n$x = 7$\n\nSimple subtraction gives us the solution!',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'Quick Check! 🧠',
          body: 'Let us test your skills! Solve: $3x = 15$. What is the value of $x$?',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'Great job! Correct. $3x = 15$ means we divide both sides by 3: $x = 15/3 = 5$. Rin is glowing! ✨',
          feedbackIncorrect: 'Oops! Not quite. Here, $3 \\times x = 15$. The opposite of multiplication is division. Try dividing 15 by 3!'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'Real Life Connection 🛍️',
          body: 'When you shop and see "Buy 1 Get 50% Off on the 2nd", you are using algebra! You are solving an equation in your head to calculate total cost: $x + 0.5x = 1.5x$. You are already an algebra pro!',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    hindi: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'अलजेब्रा रीफ (बीजगणित) 🪼',
      description: 'चर (variables) और सरल समीकरणों के रहस्यों को सुलझाएं!',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'बीजगणित क्या है? 🤔',
          body: 'बीजगणित एक पहेली के खेल की तरह है, जहाँ हम उन संख्याओं की जगह अक्षरों (जैसे x या y) का उपयोग करते हैं जो हमें अभी ज्ञात नहीं हैं। इन अक्षरों को हम **चर (variables)** कहते हैं क्योंकि इनका मान बदल सकता है।',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'संतुलन तराजू ⚖️',
          body: 'समीकरण को एक **तराजू** की तरह समझें। दोनों पक्ष हमेशा समान होने चाहिए। यदि आप एक तरफ ५ जोड़ते हैं, तो संतुलन बनाए रखने के लिए आपको दूसरी तरफ भी ५ जोड़ना होगा। जो कुछ भी करें, दोनों तरफ समान रूप से करें!',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'x का मान निकालना 🔍',
          body: 'यदि $x + 5 = 12$ है, तो हम $x$ को अकेला करना चाहते हैं। इसके लिए हम ५ जोड़ने का विपरीत कार्य करेंगे यानी दोनों पक्षों से ५ घटाएंगे:\n\n$x + 5 - 5 = 12 - 5$\n$x = 7$\n\nसरल घटाव से हमें हमारा उत्तर मिल जाता है!',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'त्वरित जांच! 🧠',
          body: 'आइए आपकी समझ की परीक्षा लें! हल करें: $3x = 15$। यहाँ $x$ का मान क्या होगा?',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'बहुत बढ़िया! सही उत्तर। $3x = 15$ का अर्थ है कि हम दोनों पक्षों को ३ से विभाजित करते हैं: $x = 15/3 = 5$। रिन खुशी से चमक रहा है! ✨',
          feedbackIncorrect: 'ओह! सही नहीं है। यहाँ $3 \\times x = 15$ है। गुणा का विपरीत विभाजन होता है। १५ को ३ से विभाजित करके देखें!'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'वास्तविक जीवन में उपयोग 🛍️',
          body: 'जब आप खरीदारी करते हैं और देखते हैं "एक खरीदें, दूसरे पर ५०% की छूट पाएं", तो आप अनजाने में बीजगणित का उपयोग कर रहे होते हैं! आप कुल लागत की गणना करने के लिए अपने दिमाग में एक समीकरण हल कर रहे होते हैं: $x + 0.5x = 1.5x$।',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    },
    tamil: {
      id: 'algebra-reef',
      slug: 'algebra-reef',
      name: 'இயற்கணித ரீஃப் 🪼',
      description: 'மாறிகள் (variables) மற்றும் எளிய சமன்பாடுகளின் புதிர்களை அவிழ்க்கவும்!',
      difficulty: 'easy',
      cards: [
        {
          id: 'alg-c1',
          type: 'concept',
          title: 'இயற்கணிதம் என்றால் என்ன? 🤔',
          body: 'இயற்கணிதம் என்பது ஒரு புதிர் விளையாட்டு போன்றது. இன்னும் அறியப்படாத எண்களுக்குப் பதிலாக நாம் ஆங்கில எழுத்துக்களை (x அல்லது y) பயன்படுத்துகிறோம். இந்த எழுத்துக்களை நாம் **மாறிகள் (variables)** என்று அழைக்கிறோம், ஏனெனில் அவற்றின் மதிப்பு மாறக்கூடியது.',
          mediaType: 'math',
          mediaVal: 'x + 3 = 10'
        },
        {
          id: 'alg-c2',
          type: 'analogy',
          title: 'தராசு சமநிலை ⚖️',
          body: 'ஒரு சமன்பாட்டை **தராசு** போல நினையுங்கள். இருபுறமும் எப்போதும் சமமாக இருக்க வேண்டும். ஒரு பக்கத்தில் 5 ஐக் கூட்டினால், தராசைச் சமமாக வைக்க மறுபக்கத்திலும் 5 ஐக் கூட்ட வேண்டும். எதைச் செய்தாலும் இருபுறமும் செய்யுங்கள்!',
          mediaType: 'icon',
          mediaVal: 'Scale'
        },
        {
          id: 'alg-c3',
          type: 'concept',
          title: 'x இன் மதிப்பு காணல் 🔍',
          body: '$x + 5 = 12$ எனில், $x$ ஐத் தனிமைப்படுத்த வேண்டும். 5 ஐக் கூட்டுவதற்கு மாறாக, இருபுறமிருந்தும் 5 ஐக் கழிக்க வேண்டும்:\n\n$x + 5 - 5 = 12 - 5$\n$x = 7$\n\nஎளிய கழித்தல் நமக்கு விடையைத் தருகிறது!',
          mediaType: 'math',
          mediaVal: 'x + 5 = 12 \\implies x = 7'
        },
        {
          id: 'alg-c4',
          type: 'quiz',
          title: 'விரைவு சோதனை! 🧠',
          body: 'உங்கள் திறனைச் சோதிப்போம்! தீர்க்கவும்: $3x = 15$. இங்கு $x$ இன் மதிப்பு என்ன?',
          options: ['x = 12', 'x = 5', 'x = 18', 'x = 45'],
          answerIdx: 1,
          feedbackCorrect: 'மிக நன்று! சரியான விடை. $3x = 15$ என்றால் இருபுறமும் 3 ஆல் வகுக்க வேண்டும்: $x = 15/3 = 5$. ரின் பிரகாசிக்கிறது! ✨',
          feedbackIncorrect: 'ஐயோ! தவறு. இங்கு $3 \\times x = 15$ என உள்ளது. பெருக்கலின் எதிர்செயல் வகுத்தல் ஆகும். 15 ஐ 3 ஆல் வகுத்துப் பாருங்கள்!'
        },
        {
          id: 'alg-c5',
          type: 'visual',
          title: 'நிஜ வாழ்க்கை பயன்பாடு 🛍️',
          body: 'நீங்கள் கடைக்குச் சென்று "ஒன்று வாங்கினால் இரண்டாவதற்கு 50% தள்ளுபடி" என்று பார்க்கும்போது, நீங்கள் இயற்கணிதத்தையே பயன்படுத்துகிறீர்கள்! மொத்தச் செலவைக் கணக்கிட உங்கள் மனதில் ஒரு சமன்பாட்டைத் தீர்க்கிறீர்கள்: $x + 0.5x = 1.5x$.',
          mediaType: 'icon',
          mediaVal: 'ShoppingBag'
        }
      ]
    }
  }
};
