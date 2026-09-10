export interface MemoryItem {
  id: string;
  src: string;
  caption: string;
  date: string;
  alt: string;
  category: "moments" | "places" | "smiles" | "favorites";
  rotation?: number;
}

export interface StoryItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  message: string;
  image: string;
  icon: string;
}

export interface LoveCardItem {
  id: string;
  title: string;
  shortQuote: string;
  expandedMessage: string;
  tag: string;
  icon: string;
  image: string;
}

export interface BollywoodSongItem {
  id: string;
  title: string;
  artist: string;
  movieOrAlbum: string;
  youtubeId: string;
  cover: string;
  duration: string;
  tag: string;
}

export interface HangingPhotoItem {
  id: string;
  image: string;
  word: string;
  rotation: number;
  stringLength: number; // height in px
}

export interface ShayariItem {
  id: string;
  hindi: string;
  translation: string;
  mood: string;
  photo: string;
}

export interface InteractiveHeartStep {
  text: string;
  subtext: string;
  photo: string;
  word: string;
}

export interface StarWish {
  id: string;
  x: number;
  y: number;
  size: number;
  wish: string;
  glowColor: string;
}

export const SITE_CONFIG = {
  MEGHNA_NAME: "Meghna",
  HERO_HANDWRITTEN: "Hey Meghna…",
  HERO_TITLE: "This little world",
  HERO_TITLE_HIGHLIGHT: "is for you. ❤️",
  HERO_SUBTITLE: "Because some people deserve more than just a message.",
  HERO_SECONDARY: "They deserve an entire little universe.",
  HERO_CTA: "Enter Our Little World ↓",

  // 14 Days Counter configuration (exactly 14 days)
  DAYS_COUNT: 14,
  TIMER_HEADING: "And the story continues…",
  TIMER_SUBTITLE: "14 days of unforgettable smiles and moments worth keeping forever.",

  // Hanging photos in hero with sweet one-word tags
  HANGING_PHOTOS: [
    {
      id: "hp-1",
      image: "/images/meghna/Image-724.jpg",
      word: "Sunshine ☀️",
      rotation: -3,
      stringLength: 70,
    },
    {
      id: "hp-2",
      image: "/images/meghna/Image-30109.jpg",
      word: "Radiant ✨",
      rotation: 2.5,
      stringLength: 95,
    },
    {
      id: "hp-3",
      image: "/images/meghna/Image-16162.jpg",
      word: "Grace 🌸",
      rotation: -2,
      stringLength: 60,
    },
    {
      id: "hp-4",
      image: "/images/meghna/Image-44415.jpg",
      word: "Magic ❤️",
      rotation: 3,
      stringLength: 90,
    },
    {
      id: "hp-5",
      image: "/images/meghna/Image-54970.jpg",
      word: "Joy 🍬",
      rotation: -2.5,
      stringLength: 75,
    },
  ] as HangingPhotoItem[],

  // A Little Message Section
  LOVE_MESSAGE: {
    badge: "A LITTLE MESSAGE",
    heading: "Meghna, this is for you.",
    body: "There are people who make ordinary moments feel a little more special. People whose name can make you smile without warning. This tiny corner of the internet is simply a collection of feelings, memories and little things that deserve to be remembered.",
    signature: "— made with love ❤️",
  },

  // "Our Little Story" timeline
  STORY_ITEMS: [
    {
      id: "story-1",
      title: "The Beginning",
      subtitle: "When our paths first crossed",
      date: "Chapter I",
      message: "And somehow, you became someone special. What started as simple conversations turned into the sweetest part of every single day.",
      image: "/images/meghna/Image-76778.jpg",
      icon: "Sparkles",
    },
    {
      id: "story-2",
      title: "The Smiles",
      subtitle: "Endless laughter and cheerful talks",
      date: "Chapter II",
      message: "The little conversations that stayed longer than expected. That genuine, joyful laughter that has a way of making everything feel soft and bright.",
      image: "/images/meghna/Image-30109.jpg",
      icon: "Heart",
    },
    {
      id: "story-3",
      title: "The Memories",
      subtitle: "Timeless grace and warmth",
      date: "Chapter III",
      message: "The moments that deserve their own little place. Every shared story, every quiet look, every glance that needed no words at all.",
      image: "/images/meghna/Image-16162.jpg",
      icon: "Camera",
    },
    {
      id: "story-4",
      title: "Today & Beyond",
      subtitle: "Still writing our sweetest chapters",
      date: "Always",
      message: "Still writing the story… and with every new sunrise, you give me a hundred more reasons to smile.",
      image: "/images/meghna/Image-44415.jpg",
      icon: "Infinity",
    },
  ] as StoryItem[],

  // Memory Polaroids & Lightbox with all 35 real photos of Meghna
  MEMORIES: [
    { id: "mem-1", src: "/images/meghna/Image-30109.jpg", caption: "That radiant laugh in the rain ❤️", date: "Pure Happiness", alt: "Meghna smiling radiantly in the rain", category: "smiles", rotation: -3 },
    { id: "mem-2", src: "/images/meghna/Image-16162.jpg", caption: "Grace, beauty, and timeless charm ✨", date: "Golden Elegance", alt: "Meghna in beautiful traditional saree", category: "favorites", rotation: 2 },
    { id: "mem-3", src: "/images/meghna/Image-44415.jpg", caption: "Eyes that speak a thousand unspoken words ❤️", date: "Deeply Cherished", alt: "Meghna deep wine portrait", category: "moments", rotation: -2 },
    { id: "mem-4", src: "/images/meghna/Image-54970.jpg", caption: "Holi sweets & colorful smiles 🌸", date: "Festival of Joy", alt: "Meghna celebrating with colors and sweets", category: "smiles", rotation: 3 },
    { id: "mem-5", src: "/images/meghna/Image-76778.jpg", caption: "Sunlit afternoons & effortless cool 😎", date: "Summer Days", alt: "Meghna in sunglasses under golden sunlight", category: "moments", rotation: -2 },
    { id: "mem-6", src: "/images/meghna/Image-39583.jpg", caption: "Lavender dreams & quiet poise 💜", date: "Soft Moments", alt: "Meghna in elegant lavender dress", category: "favorites", rotation: 3 },
    { id: "mem-7", src: "/images/meghna/Image-724.jpg", caption: "An effortless smile that brightens any room ☀️", date: "Sunshine Smile", alt: "Meghna portrait in yellow saree", category: "smiles", rotation: -1 },
    { id: "mem-8", src: "/images/meghna/Image-88907.jpg", caption: "Midnight elegance in classic black 🖤", date: "Evening Magic", alt: "Meghna in gorgeous black drape", category: "favorites", rotation: 2 },
    { id: "mem-9", src: "/images/meghna/Image-4477.jpg", caption: "Innocence and sweetest candid smile 🌸", date: "Gentle Breeze", alt: "Meghna candid sweet look", category: "smiles", rotation: -3 },
    { id: "mem-10", src: "/images/meghna/Image-5767.jpg", caption: "Golden hour glow and serene warmth ✨", date: "Golden Hour", alt: "Meghna basking in warm light", category: "moments", rotation: 2 },
    { id: "mem-11", src: "/images/meghna/Image-8508.jpg", caption: "A glance that makes the heart flutter 💖", date: "Sweet Gaze", alt: "Meghna portrait with gentle expression", category: "favorites", rotation: -2 },
    { id: "mem-12", src: "/images/meghna/Image-15421.jpg", caption: "Playful laughter and unfiltered joy 🥰", date: "Happy Vibes", alt: "Meghna cheerful laughter", category: "smiles", rotation: 3 },
    { id: "mem-13", src: "/images/meghna/Image-15596.jpg", caption: "Classic simplicity and timeless grace 🤍", date: "Timeless", alt: "Meghna classic graceful portrait", category: "favorites", rotation: -1 },
    { id: "mem-14", src: "/images/meghna/Image-19547.jpg", caption: "Eyes sparkling with a thousand dreams 🌟", date: "Dreamer", alt: "Meghna dreamy reflection", category: "moments", rotation: 2 },
    { id: "mem-15", src: "/images/meghna/Image-24182.jpg", caption: "Cherished serenity and peace 🕊️", date: "Tranquil Soul", alt: "Meghna soft peaceful moment", category: "places", rotation: -2 },
    { id: "mem-16", src: "/images/meghna/Image-29341.jpg", caption: "Little conversations that stay forever ☕", date: "Warm Memories", alt: "Meghna smiling candidly", category: "moments", rotation: 1 },
    { id: "mem-17", src: "/images/meghna/Image-33136.jpg", caption: "Royal charm and stunning grace 👑", date: "Royalty", alt: "Meghna in elegant royal attire", category: "favorites", rotation: -3 },
    { id: "mem-18", src: "/images/meghna/Image-33857.jpg", caption: "A smile so bright it outshines the stars ✨", date: "Starlight", alt: "Meghna joyful candid", category: "smiles", rotation: 2 },
    { id: "mem-19", src: "/images/meghna/Image-34837.jpg", caption: "Soft moments of pure calm 🌸", date: "Quiet Serenity", alt: "Meghna gentle reflection", category: "places", rotation: -1 },
    { id: "mem-20", src: "/images/meghna/Image-37023.jpg", caption: "That signature Meghna charm ❤️", date: "Signature Smile", alt: "Meghna charming smile", category: "smiles", rotation: 3 },
    { id: "mem-21", src: "/images/meghna/Image-39753.jpg", caption: "Sweet surprises and happy days 🎁", date: "Special Day", alt: "Meghna sweet portrait", category: "moments", rotation: -2 },
    { id: "mem-22", src: "/images/meghna/Image-40089.jpg", caption: "Elegance woven into every gesture ✨", date: "Poetry in Motion", alt: "Meghna elegant drape portrait", category: "favorites", rotation: 2 },
    { id: "mem-23", src: "/images/meghna/Image-41172.jpg", caption: "Warmth that fills every corner of life ☀️", date: "Warm Light", alt: "Meghna radiant portrait", category: "places", rotation: -3 },
    { id: "mem-24", src: "/images/meghna/Image-41802.jpg", caption: "Captivating eyes that hold a universe 🌌", date: "Deep Cosmos", alt: "Meghna soulful eyes", category: "moments", rotation: 1 },
    { id: "mem-25", src: "/images/meghna/Image-46462.jpg", caption: "That gentle tilt and sweet chuckle 🍬", date: "Sweet Candor", alt: "Meghna charming candid", category: "smiles", rotation: -2 },
    { id: "mem-26", src: "/images/meghna/Image-50550.jpg", caption: "Unmatched grace and quiet brilliance 💫", date: "Brilliance", alt: "Meghna graceful pose", category: "favorites", rotation: 2 },
    { id: "mem-27", src: "/images/meghna/Image-60764.jpg", caption: "A memory etched forever in the heart 💌", date: "Keepsake", alt: "Meghna timeless memory", category: "moments", rotation: -1 },
    { id: "mem-28", src: "/images/meghna/Image-61390.jpg", caption: "When happiness looks like this 💖", date: "Pure Bliss", alt: "Meghna happy smiling picture", category: "smiles", rotation: 3 },
    { id: "mem-29", src: "/images/meghna/Image-62340.jpg", caption: "Dressed in elegance and quiet magic 🌺", date: "Floral Grace", alt: "Meghna stunning portrait", category: "favorites", rotation: -2 },
    { id: "mem-30", src: "/images/meghna/Image-79003.jpg", caption: "Golden memories of cheerful talks 🌼", date: "Golden Talk", alt: "Meghna cheerful memory", category: "places", rotation: 1 },
    { id: "mem-31", src: "/images/meghna/Image-81131.jpg", caption: "The sweetest presence in the whole world 🧸", date: "Precious", alt: "Meghna candid smile", category: "moments", rotation: -3 },
    { id: "mem-32", src: "/images/meghna/Image-81211.jpg", caption: "Mesmerizing beauty that speaks to the soul 🌹", date: "Rose Aura", alt: "Meghna lovely portrait", category: "favorites", rotation: 2 },
    { id: "mem-33", src: "/images/meghna/Image-81882.jpg", caption: "Every glance is a story of its own 📖", date: "Storybook", alt: "Meghna expressive portrait", category: "moments", rotation: -1 },
    { id: "mem-34", src: "/images/meghna/Image-85361.jpg", caption: "The world feels a little softer with your smile ☁️", date: "Soft Cloud", alt: "Meghna tender smile", category: "smiles", rotation: 2 },
    { id: "mem-35", src: "/images/meghna/Image-98366.jpg", caption: "Always and forever, simply irreplaceable ❤️", date: "Forever", alt: "Meghna beautiful closing portrait", category: "favorites", rotation: -2 },
  ] as MemoryItem[],

  // "Things I Love About You" cards
  LOVE_CARDS: [
    {
      id: "card-1",
      title: "Your Smile",
      shortQuote: "It has a way of making everything feel lighter.",
      expandedMessage: "Your smile has this effortless warmth that completely lights up any room you walk into. Even on the heaviest days, just catching a glimpse of your genuine grin makes the whole world feel soft, bright, and calm.",
      tag: "Pure Sunshine",
      icon: "Smile",
      image: "/images/meghna/Image-30109.jpg",
    },
    {
      id: "card-2",
      title: "Your Eyes",
      shortQuote: "Somehow they always manage to say more than words.",
      expandedMessage: "Whenever you look closely, there is this gentle depth and kindness that words can barely capture. They express tenderness, mischief, intelligence, and a whole universe of understanding in a single glance.",
      tag: "Endless Depth",
      icon: "Eye",
      image: "/images/meghna/Image-44415.jpg",
    },
    {
      id: "card-3",
      title: "Your Laugh",
      shortQuote: "Probably one of my favorite sounds in the entire universe.",
      expandedMessage: "When you burst into genuine, unfiltered laughter, it's contagious. It's musical, free, and honest. Hearing you laugh is a reminder of how sweet and simple life can be.",
      tag: "Favorite Melody",
      icon: "Music",
      image: "/images/meghna/Image-54970.jpg",
    },
    {
      id: "card-4",
      title: "Your Presence",
      shortQuote: "Even ordinary days feel different when you're around.",
      expandedMessage: "You turn everyday moments, silent hours, waiting around, and quiet rides into special memories. With you, doing absolutely nothing feels like doing everything.",
      tag: "Comfort & Peace",
      icon: "Sparkle",
      image: "/images/meghna/Image-16162.jpg",
    },
    {
      id: "card-5",
      title: "Your Little Habits",
      shortQuote: "The tiny things you probably don't even notice.",
      expandedMessage: "The way your eyes squint when you're amused, the way you tilt your head when you're curious, how passionate you get when explaining things you love—those unscripted details are completely precious.",
      tag: "Adorable Details",
      icon: "Sparkles",
      image: "/images/meghna/Image-79003.jpg",
    },
    {
      id: "card-6",
      title: "Simply You",
      shortQuote: "No explanation needed. Just you. ❤️",
      expandedMessage: "You don't have to do anything extraordinary to be loved. You don't have to try. Just being Meghna—with all your kindness, quirks, dreams, and gentle heart—is more than enough. You are irreplaceable.",
      tag: "Priceless",
      icon: "Heart",
      image: "/images/meghna/Image-88907.jpg",
    },
  ] as LoveCardItem[],

  // Interactive Tap The Heart with revealed photos of Meghna
  INTERACTIVE_HEART: {
    heading: "Tap the heart ❤️",
    subheading: "Every tap reveals a special photo & secret message!",
    steps: [
      {
        text: "Hey Meghna ❤️",
        subtext: "You clicked it! Tap again to see what unfolds...",
        photo: "/images/meghna/Image-76778.jpg",
        word: "Cute!",
      },
      {
        text: "That Radiant Smile 🥰",
        subtext: "Your laughter lights up everything around you.",
        photo: "/images/meghna/Image-30109.jpg",
        word: "Joy!",
      },
      {
        text: "Timeless Grace ✨",
        subtext: "Effortlessly elegant and mesmerizing in every single way.",
        photo: "/images/meghna/Image-16162.jpg",
        word: "Beauty!",
      },
      {
        text: "Those Beautiful Eyes ❤️",
        subtext: "You are really, really special. Just in case nobody reminded you today.",
        photo: "/images/meghna/Image-44415.jpg",
        word: "Magic!",
      },
      {
        text: "You Have My Whole Heart! 💖",
        subtext: "Thank you for simply existing and making this world so much sweeter.",
        photo: "/images/meghna/Image-724.jpg",
        word: "Forever ❤️",
      },
    ] as InteractiveHeartStep[],
  },

  // Dedicated Shayari Section for Meghna
  SHAYARI_SECTION: {
    badge: "दिल की कलम से 📜",
    title: "Shayari for Meghna",
    subtitle: "चंद अल्फ़ाज़ जो सिर्फ तुम्हारी मुस्कान और सादगी के नाम हैं।",
    shayaris: [
      {
        id: "sh-1",
        hindi: "तेरे मुस्कुराने का असर कुछ ऐसा हुआ मेघना,\nकि हर एक लम्हा तेरी ही यादों में ढल गया...\nना जाने क्या जादू है तुम्हारी इन आँखों में,\nजो भी देखा, बस तुम्हारा ही हो कर रह गया।",
        translation: "Your smile cast such a spell, Meghna, that every single second dissolved into sweet thoughts of you.",
        mood: "मुस्कुराहट (Smile)",
        photo: "/images/meghna/Image-30109.jpg",
      },
      {
        id: "sh-2",
        hindi: "कुछ लोग ज़िन्दगी में ऐसे आते हैं,\nजैसे अंधेरी रात में चाँदनी उतर आए...\nतू वो ख़ूबसूरत अहसास है मेघना,\nजिसे सोच कर ही चेहरे पर मुस्कान खिल जाए।",
        translation: "Some people enter life like tranquil moonlight descending upon the night... you are that serene blessing, Meghna.",
        mood: "सुकून (Peace)",
        photo: "/images/meghna/Image-16162.jpg",
      },
      {
        id: "sh-3",
        hindi: "तेरी आँखों की गहराई में बसी है मासूमियत,\nतेरी हर अदा में बसी है एक प्यारी सी ख़ासियत...\nना कोई तमन्ना है, ना कोई आरज़ू अब,\nबस तुम हमेशा यूँ ही हँसती रहो, यही है दुआ हमारी।",
        translation: "Innocence dwells in your eyes, and sweetness in your every gesture. May your laughter always brighten the world.",
        mood: "मासूमियत (Innocence)",
        photo: "/images/meghna/Image-44415.jpg",
      },
      {
        id: "sh-4",
        hindi: "जब भी तुम्हें देखते हैं, वक्त वहीं ठहर जाता है,\nमेघना, तुम्हारा होना ही हर पल को ख़ास बनाता है...\nहज़ार चेहरे देखे इस ज़माने में हमने,\nमगर दिल को जो सुकून दे, वो सिर्फ तेरा दीदार है।",
        translation: "Whenever I gaze upon you, time gently stops... your presence alone turns ordinary moments into poetry.",
        mood: "दीदार (Presence)",
        photo: "/images/meghna/Image-724.jpg",
      },
      {
        id: "sh-5",
        hindi: "ज़िंदगी की इस किताब में कई रंग और कई पन्ने हैं,\nमगर जिस पन्ने पर तेरा ज़िक्र हो, वही सबसे हसीन है...\nयूँ ही नहीं धड़कता ये दिल इतनी शिद्दत से,\nमेघना, तेरे होने से ही मेरी दुनिया गुलज़ार है।",
        translation: "There are many chapters in life, but the sweetest page is the one inscribed with your name.",
        mood: "इश्क़ (Love)",
        photo: "/images/meghna/Image-39583.jpg",
      },
      {
        id: "sh-6",
        hindi: "एक प्यारी सी हँसी, और सारा जहाँ रोशन,\nकुछ ऐसा ही तिलिस्म है तुम्हारी मासूम सी मुस्कान में...\nखुदा सलामत रखे उस मुस्कुराहट को हमेशा,\nजिसकी चमक से मेरे हर दिन में नूर भर जाता है।",
        translation: "One sweet smile, and the whole universe lights up... such is the captivating charm of your innocence.",
        mood: "दुआ (Blessing)",
        photo: "/images/meghna/Image-54970.jpg",
      },
    ] as ShayariItem[],
  },

  // "If I could give you anything..."
  SUNSET_WISHES: [
    "I'd give you all the beautiful moments you haven't experienced yet.",
    "All the sunsets that paint the sky in pink and gold.",
    "All the laughs until your cheeks ache.",
    "All the peaceful mornings with warm coffee and gentle breezes.",
    "All the adventures waiting down winding roads.",
    "And every reason to smile, every single day.",
  ],

  // Split section
  SPLIT_SECTION: {
    heading: "You make ordinary moments feel special.",
    body: "Maybe that's what makes someone truly special—not the grand, noisy moments, but the quiet way they make the smallest seconds feel worth remembering forever.",
    quote: "For Meghna, always. ❤️",
    image: "/images/meghna/Image-724.jpg",
  },

  // Romantic Bollywood Playlist with YouTube Links & Embedded Playback
  BOLLYWOOD_SONGS: [
    {
      id: "b-song-1",
      title: "Jogi",
      artist: "Yasser Desai & Aakanksha Sharma",
      movieOrAlbum: "Shaadi Mein Zaroor Aana",
      youtubeId: "q5gGKGyQM9Y",
      cover: "/images/meghna/Image-16162.jpg",
      duration: "4:33",
      tag: "Deep Romance",
    },
    {
      id: "b-song-2",
      title: "Gulabi Aankhen",
      artist: "SANAM",
      movieOrAlbum: "SANAM Rendition",
      youtubeId: "hgi2MYAFgE8",
      cover: "/images/meghna/Image-30109.jpg",
      duration: "3:18",
      tag: "Playful & Sweet",
    },
    {
      id: "b-song-3",
      title: "Lag Ja Gale",
      artist: "SANAM",
      movieOrAlbum: "SANAM Classic",
      youtubeId: "pC89vW7f6jA",
      cover: "/images/meghna/Image-44415.jpg",
      duration: "3:58",
      tag: "Timeless Emotion",
    },
    {
      id: "b-song-4",
      title: "Yeh Raaten Yeh Mausam",
      artist: "SANAM ft. Simran Sehgal",
      movieOrAlbum: "SANAM Retro",
      youtubeId: "MvGkYxT8l2o",
      cover: "/images/meghna/Image-724.jpg",
      duration: "3:46",
      tag: "Gentle Night Breeze",
    },
    {
      id: "b-song-5",
      title: "Raataan Lambiyan",
      artist: "Jubin Nautiyal & Asees Kaur",
      movieOrAlbum: "Shershaah",
      youtubeId: "gvyUuxdRdR4",
      cover: "/images/meghna/Image-39583.jpg",
      duration: "3:50",
      tag: "Soulful Love",
    },
    {
      id: "b-song-6",
      title: "Pehla Nasha",
      artist: "SANAM",
      movieOrAlbum: "SANAM Nostalgia",
      youtubeId: "l482T0yNkeo",
      cover: "/images/meghna/Image-76778.jpg",
      duration: "3:34",
      tag: "First Sweet Feeling",
    },
  ] as BollywoodSongItem[],

  // Love Letter
  LETTER: {
    recipient: "To: Meghna ❤️",
    salutation: "Dear Meghna,",
    paragraphs: [
      "I don't know if a website can really capture what someone means to you, but I wanted to try.",
      "So I collected a few little things here—some memories, some words, some smiles, and a lot of feelings.",
      "Maybe it's not perfect.",
      "But neither are the best stories.",
      "They're simply real.",
      "And this one is yours. ❤️",
    ],
    closing: "With all my love,",
    signature: "Forever Yours",
  },

  // Starry Night Wishes (Clickable stars in Dream section)
  STAR_WISHES: [
    { id: "star-1", x: 18, y: 22, size: 5, wish: "More sunsets and golden horizons with you 🌅", glowColor: "#FFD1DC" },
    { id: "star-2", x: 36, y: 15, size: 6, wish: "More spontaneous laughter until we cry 😂", glowColor: "#FFE5B4" },
    { id: "star-3", x: 64, y: 20, size: 5, wish: "More cozy coffee dates on quiet rainy days ☕", glowColor: "#E0BBE4" },
    { id: "star-4", x: 84, y: 32, size: 6, wish: "More peaceful mornings where time slows down ✨", glowColor: "#FFF1C5" },
    { id: "star-5", x: 26, y: 62, size: 5, wish: "More unscripted roadtrips with loud music 🚗🎶", glowColor: "#FFC6D9" },
    { id: "star-6", x: 72, y: 70, size: 6, wish: "More reasons for Meghna to smile every day ❤️", glowColor: "#FFDFBA" },
    { id: "star-7", x: 50, y: 46, size: 7, wish: "Every wish your sweet heart has ever whispered 🌟", glowColor: "#E2F0CB" },
  ] as StarWish[],

  // Video Section with real video of Meghna
  VIDEO_SECTION: {
    title: "A Moving Picture",
    quote: "A perfect mix of Saturday night... and the rest of your life. ❤️",
    poster: "/images/meghna/Image-44415.jpg",
    videoUrl: "/images/video/meghna_cinematic.mp4",
  },

  // Final Surprise
  FINAL_SURPRISE: {
    preText: "Wait… there's one more thing.",
    buttonText: "One last surprise ❤️",
    revealedTitle: "Meghna ❤️",
    subheading: "“You deserve all the beautiful things life has to offer.”",
    body: "Never forget how special, cherished, and truly remarkable you are.",
    finalQuote: "For Meghna,\nbecause some people deserve their own little universe. ❤️",
    portrait: "/images/meghna/Image-724.jpg",
  },

  // Secret Message (Footer 5-click easter egg)
  SECRET_MESSAGE: {
    heading: "Psst… one more thing.",
    body: "If you're reading this, you're officially too cute. ❤️",
    extra: "You found the secret treasure! Sending you the warmest hug in the world.",
  },

  FOOTER: {
    title: "Made especially for Meghna ❤️",
    tagline: "A little website. A lot of feelings.",
  },
};
