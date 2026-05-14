import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DetailModal from './DetailModal';
import CircularMenu from './CircularMenu';
import CinematicBackgroundVideo from './CinematicBackgroundVideo';
import {
  Building2,
  ChevronRight,
  Clapperboard,
  GraduationCap,
  Megaphone,
  Rocket,
  Users,
  Youtube,
} from 'lucide-react';

const HOME_VIDEO_MANIFEST_URL = '/video/home/manifest.json';
const VIDEO_FILE_REGEX = /\.(mp4|webm|ogg|ogv|mov|m4v|avi|mkv)$/i;
const KIDS_WORLD_MANIFEST_URL = '/kids-world/manifest.json';
const KIDS_WORLD_VIDEO_REGEX = /\.(mp4|webm|mov)$/i;

const kidsWorldCards = [
  {
    title: 'Cinematic Animated Stories',
    summary: 'Premium story worlds with lovable characters, gentle emotions and positive values.',
    details:
      'Story-first animated experiences designed with cinematic pacing, memorable characters, playful emotional arcs and kind life lessons that make screen-time feel safe, imaginative and meaningful.',
    benefits: ['Builds imagination, language confidence and emotional awareness', 'Encourages empathy, values and positive behaviour'],
  },
  {
    title: 'Music, Songs & Rhymes',
    summary: 'Catchy cinematic music videos for singing, movement and memory-led learning.',
    details:
      'Rhythm-rich songs designed for repeat listening, movement and joyful participation, helping children remember concepts faster through melody, visuals and motion.',
    benefits: ['Improves memory through musical repetition', 'Supports pronunciation, rhythm, movement and expression'],
  },
  {
    title: 'AI Learning Adventures',
    summary: 'Visual chapter explainers, foundational concepts and curiosity-led education.',
    details:
      'Compact AI-assisted learning journeys that blend entertainment with smart pedagogy, introducing numbers, colors, animals, science basics, values and school concepts through visual discovery.',
    benefits: ['Makes early learning visual, engaging and less stressful', 'Strengthens focus, curiosity and concept retention'],
  },
  {
    title: 'Festival & Culture Specials',
    summary: 'Content around Indian festivals, traditions and celebrations.',
    details:
      'Celebration specials that help children connect with Indian culture through stories, songs and festive moments presented in a warm and modern format.',
    benefits: ['Creates cultural familiarity and pride', 'Helps parents introduce traditions naturally'],
  },
  {
    title: 'Character Universe',
    summary: 'Original recurring characters children can trust, remember and follow.',
    details:
      'A premium recurring character ecosystem where children build long-term emotional connection, follow adventures, and return for trusted familiar faces across stories, songs and learning formats.',
    benefits: ['Boosts engagement through continuity', 'Creates healthy, positive role-model attachment'],
  },
  {
    title: 'Safe Premium Screen-Time',
    summary: 'Positive, family-friendly content parents can trust.',
    details:
      'Carefully curated content standards ensure age-aware language, positive storytelling and family-safe themes so parents can feel confident in every watch session.',
    benefits: ['Reduces parent concern around screen content', 'Provides trusted quality for regular viewing'],
  },
];

const kidsWorldHighlights = ['Safe Content', 'Fun Learning', 'Colorful Stories', 'Memorable Songs', 'Trusted By Families'];
const kidsWorldCharacters = ['🐇 Rabbit', '🐦 Bird', '🦊 Fox', '🐢 Turtle', '🐍 Snake'];

function getRandomIndex(length, exclude = -1) {
  if (length <= 1) return 0;

  let next = Math.floor(Math.random() * length);
  while (next === exclude) {
    next = Math.floor(Math.random() * length);
  }

  return next;
}

function toTitleFromFilename(fileName) {
  const plainName = fileName.replace(/\.[^.]+$/, '');
  const withSpaces = plainName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getKidsVideoType(file) {
  const ext = file.split('.').pop()?.toLowerCase();
  if (ext === 'mp4') return 'video/mp4';
  if (ext === 'webm') return 'video/webm';
  if (ext === 'mov') return 'video/quicktime';
  return '';
}

const sections = [
  {
    id: 'home',
    label: 'Home',
    title: 'The Future of AI Cinema: Learning and Entertainment',
    eyebrow: 'REELENCE DIGITAL STUDIOS',
    accentClass: 'accent-home',
    description: 'Reelence is a premium AI filmmaking and creative technology ecosystem building cinematic content, Studio OS intelligence, OTT-ready entertainment IP, AI learning experiences and enterprise automation systems for the next era of storytelling.',
    cta: 'Explore Studio OS',
    secondaryCta: 'Start a Premium Collaboration',
    icon: Rocket,
    stats: ['AI Cinematic Studio OS', 'OTT-Ready Original IP', 'Enterprise Creative Intelligence'],
    features: [
      {
        title: 'AI Cinematic Studio OS',
        detail: 'A proprietary creative intelligence platform for story, screenplay, storyboard, camera planning, audio direction, video generation and production workflows.',
      },
      {
        title: 'Premium AI Film Production',
        detail: 'AI-assisted brand films, commercials, product films, launch campaigns, shorts and cinematic visual assets directed with human taste and production discipline.',
      },
      {
        title: 'OTT Entertainment Universe',
        detail: 'Original movies, music videos, short films, mythology-inspired worlds, kids IP and streaming-ready cinematic concepts built for scalable audience ecosystems.',
      },
      {
        title: 'AI Learning & Kids World',
        detail: 'Safe visual learning, animated stories, chapter explainers, creator training and AI filmmaking education designed for children, institutions and teams.',
      },
      {
        title: 'Custom AI Creation Systems',
        detail: 'Custom AI apps, avatars, LoRA workflows, creative agents, automation tools and enterprise-grade intelligent systems tailored to real production needs.',
      },
      {
        title: 'Enterprise Innovation Studio',
        detail: 'Strategic AI consulting, workflow automation, content operating systems and scalable execution support for organizations moving into intelligent creation.',
      },
    ],
    visualTitle: 'REELENCE CINEMATIC INTELLIGENCE ENGINE',
    vibe: 'home',
  },
  {
    id: 'services',
    label: 'Creative Studio',
    title: 'Premium AI Creative Studio for Brands, Films & Launches',
    eyebrow: 'AI CREATIVE STUDIO',
    accentClass: 'accent-ott',
    description:
      'Reelence Creative Studio designs cinematic brand films, AI commercials, product stories, launch assets, social films and corporate communication with the speed of AI and the judgment of human creative direction.',
    cta: 'Start Creative Project',
    icon: Clapperboard,
    stats: ['Human-Directed AI Workflow', 'Cinematic Brand Systems', 'Multi-Platform Delivery'],
    visualTitle: 'Creative Studio Command View',
    vibe: 'services',
    serviceCards: [
      {
        title: 'Cinematic Brand Films',
        summary:
          'Shape your brand story with cinematic clarity, premium visual language and leadership-level messaging.',
        includes: 'Brand films, founder stories, corporate films, investor and internal communication.',
      },
      {
        title: 'AI Commercials & Launch Campaigns',
        summary:
          'Create high-impact campaign films and launch assets using AI visuals, cinematic writing and human direction.',
        includes: 'Digital ads, launch films, campaign cutdowns, social and performance assets.',
      },
      {
        title: 'Product Films & Explainers',
        summary: 'Turn products, platforms and complex ideas into premium visual stories people understand quickly.',
        includes: 'Product films, explainer films, service videos, platform walkthroughs.',
      },
      {
        title: 'Short-Form Cinematic Content',
        summary: 'Build refined reels, shorts and social films that feel premium instead of generic feed content.',
        includes: 'Reels, shorts, launch edits, motion content, platform-specific cutdowns.',
      },
      {
        title: 'Luxury, Real Estate & Experience Films',
        summary: 'Create cinematic property, lifestyle, and luxury brand visuals that feel premium and aspirational.',
        includes: 'Property films, walkthroughs, lifestyle edits, hospitality and luxury campaigns.',
      },
      {
        title: 'Event, Testimonial & Leadership Films',
        summary: 'Transform real moments, leaders and customer stories into polished trust-building cinematic assets.',
        includes: 'Event films, testimonials, interviews, highlight reels.',
      },
    ],
    whyChoose: [
      'AI-powered production speed',
      'Human creative direction',
      'Premium cinematic finish',
      'Multi-platform delivery systems',
    ],
    bottomCta: {
      title: 'Ready to Build a Cinematic Brand Asset?',
      text: 'Bring your idea, product, campaign or institution story to Reelence and we will shape it into a premium AI-assisted cinematic production roadmap.',
      primary: 'Start Creative Project',
      secondary: 'Talk To Reelence',
    },
  },
  {
    id: 'studio-os',
    label: 'Studio OS',
    title: 'Reelence Studio OS for Intelligent Production',
    eyebrow: 'AI PRODUCTION INTELLIGENCE PLATFORM',
    accentClass: 'accent-director',
    description:
      'Studio OS is the Reelence command layer for AI filmmaking: a human-guided system for story intelligence, screenplay planning, visual design, camera logic, audio direction, video workflows and production decision support.',
    cta: 'Explore Studio OS Modules',
    secondaryCta: 'Plan A Workflow',
    icon: Megaphone,
    stats: ['Script-to-screen intelligence', 'Storyboard and shot planning', 'Creative workflow automation'],
    visualTitle: 'Studio OS Command Intelligence',
    vibe: 'director',
    features: [
      {
        title: 'Story Intelligence',
        detail: 'Develop loglines, characters, scenes, screenplay beats and story logic with AI-assisted creative analysis and human direction.',
      },
      {
        title: 'Storyboard & Shot Design',
        detail: 'Convert narrative intent into storyboard frames, shot lists, camera language, visual references and production-ready creative boards.',
      },
      {
        title: 'Audio & Music Direction',
        detail: 'Plan voice, sound design, song ideas, background scores and emotional audio cues aligned with each cinematic moment.',
      },
      {
        title: 'Video Generation Workflow',
        detail: 'Coordinate AI video tools, prompt systems, shot continuity, iteration cycles and review checkpoints for professional output.',
      },
      {
        title: 'Production Knowledge Layer',
        detail: 'Bring scripts, references, compliance notes, creative assets and production intelligence into one searchable operating layer.',
      },
      {
        title: 'Enterprise Studio Automation',
        detail: 'Design repeatable creative pipelines for brands, agencies, education teams and studios that need scalable AI production systems.',
      },
    ],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    title: 'Original Entertainment, Music & OTT-Ready Cinematic Worlds',
    eyebrow: 'MOVIES • MUSIC • STREAMING IP',
    accentClass: 'accent-marketing',
    description: 'Reelence is developing a cinematic entertainment ecosystem across short films, feature concepts, music videos, albums, mythology-inspired universes, kids entertainment and OTT-ready stories built for modern streaming audiences.',
    cta: 'Explore Entertainment',
    secondaryCta: 'Discuss IP Collaboration',
    icon: Youtube,
    stats: ['Movies & Shorts', 'Music Video Ecosystem', 'OTT-Ready IP Worlds'],
    visualTitle: 'Entertainment Universe',
    vibe: 'director',
    features: [
      { title: 'Short Films & Feature Concepts', detail: 'Original cinematic storytelling designed for emotional recall, strong visual worlds and scalable production.' },
      { title: 'Music Videos & Albums', detail: 'Immersive song-led audiovisual experiences with cinematic art direction, performance energy and AI-enhanced worlds.' },
      { title: 'Mythology Cinematic Universe', detail: 'Epic Indian and global mythic ideas reimagined through modern visual technology and premium world-building.' },
      { title: 'Kids Stories & Songs', detail: 'Safe, joyful and memorable children’s content that can grow into recurring IP across stories, music and learning.' },
      { title: 'Animated Character IP', detail: 'Lovable recurring characters, visual identities and franchise-ready animated worlds built for long-term audience connection.' },
      { title: 'OTT-Ready Concepts', detail: 'Series bibles, pilots, pitch assets and film universes structured for streaming platforms and global collaborators.' }
    ]
  },
  {
    id: 'kids-world',
    label: 'Kids World',
    title: 'Kids World & Visual AI Learning',
    eyebrow: 'SAFE • FUN • VISUAL LEARNING',
    accentClass: 'accent-kids',
    description:
      'Reelence Kids World combines safe storytelling, original songs, animated characters and AI-powered visual explainers so children can learn through imagination, music, emotion and memorable cinematic experiences.',
    cta: 'Enter Kids World',
    secondaryCta: 'Explore Learning Systems',
    icon: GraduationCap,
    stats: ['Safe stories and songs', 'AI visual explainers', 'Character-led learning'],
    visualTitle: 'Kids World Experience',
    vibe: 'kids',
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    title: 'Reelence Showcase & Innovation Slate',
    eyebrow: 'REELENCE SHOWCASE',
    accentClass: 'accent-channels',
    description:
      'A premium preview space for Reelence cinematic films, AI advertisements, music-led visuals, kids content, Studio OS experiments, brand campaigns and creative technology prototypes as they move from concept to release.',
    cta: 'View Showcase',
    secondaryCta: 'Discuss Your Project',
    icon: Youtube,
    stats: ['AI Films & Commercials', 'Music & Story Worlds', 'Studio OS Prototypes'],
    visualTitle: 'Portfolio Showcase',
    vibe: 'channels',
    showcaseCards: [
      'AI cinematic brand films',
      'Original shorts and OTT concepts',
      'Music videos and visual albums',
      'Kids stories, songs and learning assets',
      'Studio OS workflow experiments',
      'Enterprise AI creative systems',
    ],
  },
  {
    id: 'about-us',
    label: 'About Us',
    title: 'Building the AI Cinematic Ecosystem of the Future',
    eyebrow: 'WHY REELENCE EXISTS',
    accentClass: 'accent-about',
    description:
      'Reelence exists to merge human imagination, cinematic storytelling, and artificial intelligence into one premium creative ecosystem for brands, creators, education, entertainment, and enterprise innovation.',
    cta: 'Meet The Founders',
    secondaryCta: 'Explore Reelence Vision',
    icon: Users,
    stats: ['AI Cinematic Vision', 'Human + AI Collaboration', 'Creative Technology Leadership'],
    visualTitle: 'REELENCE LEADERSHIP',
    vibe: 'about',
    mission: {
      title: 'Our Mission',
      text: 'To democratize cinematic creation using intelligent systems that help businesses, creators, educators, and storytellers move from imagination to impactful experiences faster than ever before.',
      points: [
        'AI-assisted filmmaking',
        'Smarter creative workflows',
        'Accessible cinematic production',
        'Enterprise-ready innovation',
        'Future-ready storytelling',
      ],
    },
    vision: {
      title: 'Our Vision',
      text: 'To build the world’s most intelligent cinematic ecosystem where AI, creativity, automation, education, and immersive storytelling work together seamlessly.',
      cards: [
        'AI Director Systems',
        'Intelligent Story Worlds',
        'Interactive Learning',
        'Entertainment Universes',
        'AI Avatars & Digital Humans',
        'Enterprise AI Creation Tools',
      ],
    },
    collaboration: {
      title: 'Built Through Global Collaboration',
      text: 'Reelence is designed as a collaborative ecosystem bringing together creators, technologists, filmmakers, AI researchers, educators, and enterprise innovators from across industries and regions.',
      chips: [
        'AI & Robotics',
        'Creative Technology',
        'Education',
        'Enterprise Innovation',
        'Cinematic Production',
        'Digital Experiences',
      ],
    },
    finalCta: {
      title: 'Let’s Build the Future of Intelligent Storytelling',
      description:
        'Whether you are a creator, brand, educator, startup, or enterprise — Reelence is building the tools, systems, and creative intelligence to shape the next era of digital experiences.',
      primary: 'Start A Conversation',
      secondary: 'Collaborate With Reelence',
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Collaborate With Reelence on Cinema, AI & Innovation',
    eyebrow: 'PREMIUM COLLABORATION DESK',
    accentClass: 'accent-contact',
    description:
      'Share your film, brand, OTT concept, kids content idea, AI learning requirement, Studio OS workflow or enterprise innovation challenge. Reelence will help convert it into a clear creative and technology roadmap.',
    cta: 'Start a Conversation',
    secondaryCta: 'View Collaboration Options',
    icon: Building2,
    stats: ['Creative partnership', 'AI strategy session', 'Enterprise solution planning'],
    visualTitle: 'Collaboration Command Deck',
    vibe: 'contact',
  },
];

const leaders = [
  {
    name: 'Amit Kumar Pandey',
    role: 'Co-Founder & Architect of Intelligent Creation Systems',
    image: '/assets/founders/amit-kumar-pandey.jpg',
    badge: 'Global AI & Robotics Leadership',
    bio:
      'Global AI & Robotics Pioneer driving the future of human-AI collaboration, intelligent systems, and next-generation creative ecosystems.',
  },
  {
    name: 'Ambika Chopra',
    role: 'Head of Sales & Marketing',
    image: '/assets/founders/ambika-chopra.jpg',
    badge: 'Brand Growth & Strategic Partnerships',
    bio:
      'Leading brand strategy, partnerships, GTM execution, and business growth initiatives for Reelence.',
  },
  {
    name: 'Sunil Kumar',
    role: 'Co-Founder & Visionary Creative Head',
    image: '/assets/founders/sunil_kumar1.jpg',
    badge: 'AI Cinematic Systems Visionary',
    bio:
      'Creator of Reelence Director and the cinematic AI ecosystem vision behind Reelence’s storytelling and creative intelligence platform.',
  },
  {
    name: 'Navin Kumar',
    role: 'Co-Founder',
    image: '/assets/founders/navin-kumar.jpg',
    badge: 'Business Operations & Strategy',
    bio:
      'Focused on business operations, execution systems, and scalable growth infrastructure for the Reelence ecosystem.',
  },
];

function useWheelSections(count, initialIndex = 0) {
  const [index, setIndex] = useState(initialIndex);
  const lockRef = useRef(false);

  useEffect(() => {
    const onWheel = (e) => {
      if (lockRef.current) return;
      if (Math.abs(e.deltaY) < 24) return;

      lockRef.current = true;
      setIndex((prev) => {
        if (e.deltaY > 0) return Math.min(count - 1, prev + 1);
        return Math.max(0, prev - 1);
      });

      window.setTimeout(() => {
        lockRef.current = false;
      }, 700);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [count]);

  return [index, setIndex];
}

function HomeDepth() {
  return (
    <div className="scene-root">
      <div className="scene-orb" />
      <div className="scene-ring scene-ring-1" />
      <div className="scene-ring scene-ring-2" />
      <div className="scene-ring scene-ring-3" />
      <div className="scene-floor" />
      <div className="scene-towers">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="scene-tower" style={{ left: `${4 + i * 5.6}%`, height: `${80 + (i % 6) * 32}px` }} />
        ))}
      </div>
    </div>
  );
}

function OTTDepth() {
  return (
    <div className="scene-root">
      <div className="cinema-depth">
        <div className="cinema-stage" />
        <div className="cinema-screen cinema-screen-back" />
        <div className="cinema-screen cinema-screen-mid" />
        <div className="cinema-screen cinema-screen-front" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="poster-card" style={{ left: `${10 + i * 9}%`, top: `${16 + (i % 2) * 10}%` }} />
        ))}
      </div>
    </div>
  );
}

function DirectorDepth() {
  return (
    <div className="scene-root">
      <div className="director-core" />
      <div className="director-ring director-ring-1" />
      <div className="director-ring director-ring-2" />
      <div className="director-ring director-ring-3" />
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="director-particle"
          style={{ left: `${18 + ((i * 13) % 62)}%`, top: `${18 + ((i * 19) % 52)}%` }}
        />
      ))}
    </div>
  );
}

function MarketingDepth() {
  return (
    <div className="scene-root">
      <div className="city-road-perspective" />
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="billboard-card"
          style={{
            left: `${8 + (i % 4) * 19}%`,
            top: `${12 + Math.floor(i / 4) * 22}%`,
            transform: `rotate(${(i % 5) * 4 - 6}deg) translateZ(${i * 12}px)`,
          }}
        />
      ))}
    </div>
  );
}

function KidsDepth() {
  return (
    <div className="scene-root">
      <div className="kids-bubble kids-bubble-1" />
      <div className="kids-bubble kids-bubble-2" />
      <div className="kids-bubble kids-bubble-3" />
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="kids-tile"
          style={{
            left: `${8 + ((i * 9) % 76)}%`,
            top: `${10 + ((i * 8) % 68)}%`,
            transform: `translateZ(${i * 8}px) rotate(${i * 8}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function ChatbotDepth() {
  return (
    <div className="scene-root">
      <div className="chatbot-core" />
      <div className="chatbot-grid" />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="chat-node" style={{ left: `${12 + i * 7.4}%`, top: `${24 + (i % 3) * 12}%` }} />
      ))}
    </div>
  );
}

function ChannelsDepth() {
  return (
    <div className="scene-root">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="channel-panel"
          style={{
            left: `${8 + ((i * 10) % 72)}%`,
            top: `${12 + ((i * 9) % 64)}%`,
            transform: `translateZ(${i * 10}px) rotate(${i * 7 - 14}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function ContactDepth() {
  return (
    <div className="scene-root">
      <div className="grid-horizon" />
      <div className="contact-beam contact-beam-1" />
      <div className="contact-beam contact-beam-2" />
      <div className="contact-beam contact-beam-3" />
    </div>
  );
}

function LeadershipDepth() {
  return (
    <div className="scene-root leadership-scene">
      <div className="leadership-halo" />
      <div className="leadership-halo leadership-halo-secondary" />
    </div>
  );
}

function Backdrop({ vibe }) {
  return (
    <div className={`backdrop-shell backdrop-${vibe}`}>
      <div className="ambient-glow ambient-glow-a" />
      <div className="ambient-glow ambient-glow-b" />
      <div className="ambient-grid" />
      {vibe === 'home' && <HomeDepth />}
      {vibe === 'ott' && <OTTDepth />}
      {vibe === 'director' && <DirectorDepth />}
      {vibe === 'marketing' && <MarketingDepth />}
      {vibe === 'kids' && <KidsDepth />}
      {vibe === 'chatbot' && <ChatbotDepth />}
      {vibe === 'channels' && <ChannelsDepth />}
      {vibe === 'about' && <LeadershipDepth />}
      {vibe === 'contact' && <ContactDepth />}
    </div>
  );
}

function HomeMediaPlayer() {
  const [videos, setVideos] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isManifestError, setIsManifestError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadManifest() {
      try {
        const response = await fetch(HOME_VIDEO_MANIFEST_URL, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Unable to load home video manifest');
        }

        const files = await response.json();
        const playableVideos = (Array.isArray(files) ? files : [])
          .filter((file) => typeof file === 'string' && VIDEO_FILE_REGEX.test(file))
          .map((file) => `/video/home/${file}`);

        if (!isMounted) return;

        if (playableVideos.length === 0) {
          setVideos([]);
          setIsManifestError(true);
          return;
        }

        setVideos(playableVideos);
        setActiveVideoIndex(getRandomIndex(playableVideos.length));
        setIsManifestError(false);
        setIsVideoReady(false);
      } catch {
        if (!isMounted) return;
        setVideos([]);
        setIsManifestError(true);
      }
    }

    loadManifest();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeVideo = videos[activeVideoIndex];

  const playNextVideo = () => {
    if (videos.length <= 1) return;
    setIsVideoReady(false);
    setActiveVideoIndex((prevIndex) => getRandomIndex(videos.length, prevIndex));
  };

  return (
    <div className="home-media-shell">
      <div className="home-media-ratio">
        {activeVideo ? (
          <AnimatePresence mode="wait">
            <motion.video
              key={activeVideo}
              className="home-media-video"
              src={activeVideo}
              autoPlay
              muted
              playsInline
              preload="auto"
              loop={videos.length === 1}
              initial={{ opacity: 0 }}
              animate={{ opacity: isVideoReady ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onCanPlay={() => setIsVideoReady(true)}
              onEnded={playNextVideo}
              onError={() => {
                setVideos([]);
                setIsVideoReady(false);
                setIsManifestError(true);
              }}
            />
          </AnimatePresence>
        ) : (
          <div className="home-media-empty" />
        )}

        <div className="home-media-overlay" />

        {!activeVideo && (
          <div className="home-media-status">
            {isManifestError ? 'Cinematic preview is being curated.' : 'Preparing cinematic preview...'}
          </div>
        )}

        {activeVideo && !isVideoReady && <div className="home-media-status">Preparing cinematic preview...</div>}
      </div>
    </div>
  );
}

function KidsWorldMediaPanel() {
  const [videos, setVideos] = useState([]);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function loadKidsManifest() {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch(KIDS_WORLD_MANIFEST_URL, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Unable to load kids world manifest');
        }

        const files = await response.json();
        const playableVideos = (Array.isArray(files) ? files : [])
          .filter(
            (file) =>
              typeof file === 'string' &&
              KIDS_WORLD_VIDEO_REGEX.test(file) &&
              !file.includes('/') &&
              !file.includes('\\')
          )
          .map((file) => ({
            file,
            url: `/kids-world/${file}`,
            type: getKidsVideoType(file),
            title: toTitleFromFilename(file),
          }));

        if (!isMounted) return;

        setVideos(playableVideos);
        setActiveVideoIndex(0);
        setIsVideoReady(false);
      } catch {
        if (!isMounted) return;
        setVideos([]);
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadKidsManifest();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeVideo = videos[activeVideoIndex];

  useEffect(() => {
    setIsVideoReady(false);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeVideoIndex]);

  const handlePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
  };

  return (
    <div className="kids-media-shell">
      <div className="kids-mascot" aria-hidden="true">
        🦁
      </div>
      <div className="kids-media-heading">
        <h3>Watch & Enjoy</h3>
        <p>Stories, Songs & Learning Adventures</p>
      </div>

      <div className="kids-featured-player">
        <div className="kids-featured-ratio">
          {activeVideo ? (
            <>
              <video
                key={activeVideo.url}
                ref={videoRef}
                className="kids-featured-video"
                controls
                playsInline
                preload="metadata"
                onCanPlay={() => setIsVideoReady(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setHasError(true);
                  setVideos([]);
                  setIsVideoReady(false);
                  setIsPlaying(false);
                  setIsLoading(false);
                }}
              >
                <source src={activeVideo.url} type={activeVideo.type} />
              </video>

              {!isPlaying && (
                <button className="kids-play-overlay" onClick={handlePlay} aria-label="Play featured kids video">
                  ▶
                </button>
              )}
            </>
          ) : (
            <div className="kids-empty-state">
              <div className="kids-empty-title">New Adventures Coming Soon</div>
              <div className="kids-empty-subtitle">
                Premium stories, songs and learning films are being prepared for families.
              </div>
            </div>
          )}

          {isLoading && <div className="kids-media-status">Preparing Kids World preview...</div>}
          {activeVideo && !isVideoReady && !isLoading && <div className="kids-media-status">Preparing safe viewing experience...</div>}
        </div>

        {activeVideo && <div className="kids-featured-title">Now Playing: {activeVideo.title}</div>}
      </div>

      {videos.length > 0 && (
        <div className="kids-thumb-strip" role="list" aria-label="Kids video thumbnails">
          {videos.map((item, index) => (
            <button
              key={item.file}
              className={`kids-thumb-card ${activeVideoIndex === index ? 'kids-thumb-card-active' : ''}`}
              onClick={() => setActiveVideoIndex(index)}
              role="listitem"
              aria-label={`Play ${item.title}`}
            >
              <div className="kids-thumb-preview">
                <video src={item.url} muted playsInline preload="metadata" />
              </div>
              <div className="kids-thumb-title">{item.title}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function KidsWorldPanel({ section, onOpenStat, onOpenKidsCard, scrollContainerRef }) {
  const Icon = section.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={scrollContainerRef}
        key={section.id}
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="section-panel kids-world-panel"
      >
        <h1 className={`section-title ${section.accentClass}`}>{section.title}</h1>
        <p className="section-description kids-subtext">{section.description}</p>

        <KidsWorldMediaPanel />

        <div className="kids-cards-grid">
          {kidsWorldCards.map((card) => (
            <button key={card.title} className="kids-premium-card" onClick={() => onOpenKidsCard(card)}>
              <h4>{card.title}</h4>
              <p>{card.summary}</p>
            </button>
          ))}
        </div>

        <div className="kids-highlights-grid">
          {kidsWorldHighlights.map((item) => (
            <div key={item} className="kids-highlight-box">
              {item}
            </div>
          ))}
        </div>

        <div className="kids-character-strip" aria-label="Kids character strip">
          {kidsWorldCharacters.map((item) => (
            <div key={item} className="kids-character-pill">
              {item}
            </div>
          ))}
        </div>

        <div className="kids-bottom-cta">
          <h3>Let’s Build Safe Cinematic Learning For Children</h3>
          <p>Partner with Reelence for premium kids stories, songs, character IP and AI-powered visual explainers.</p>
          <div className="kids-cta-actions">
            <button className="services-action-button services-action-primary" onClick={() => onOpenStat && onOpenStat('Create Kids Content')}>
              Create Kids Content
            </button>
            <button className="services-action-button services-action-secondary" onClick={() => onOpenStat && onOpenStat('Contact Us')}>
              Contact Us
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function AboutPanel({ section, onOpenStat, scrollContainerRef }) {
  const Icon = section.icon;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={scrollContainerRef}
        key={section.id}
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -28, filter: 'blur(10px)' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="section-panel about-panel"
      >
        <h1 className={`section-title ${section.accentClass}`}>{section.title}</h1>
        <p className="section-description about-description">{section.description}</p>

        {/* Minimal glass tiles: Mission, Vision, Collaborative Foundation */}
        <div className="about-intel-grid compact-tiles">
          <button className="about-glass-card glass-tile" onClick={() => onOpenStat && onOpenStat('Our Mission')}>
            <h3>Our Mission</h3>
          </button>

          <button className="about-glass-card glass-tile" onClick={() => onOpenStat && onOpenStat('Our Vision')}>
            <h3>Our Vision</h3>
          </button>

          <button className="about-glass-card glass-tile" onClick={() => onOpenStat && onOpenStat('Collaborative Foundation')}>
            <h3>Collaborative Foundation</h3>
          </button>
        </div>

        {/* Four founders tiles under the mission/vision tiles */}
        <div className="founders-row">
          {leaders.map((leader) => (
            <div key={leader.name} className="founder-card" onClick={() => onOpenStat && onOpenStat(leader.name)}>
              <img src={leader.image} alt={leader.name} className="founder-avatar" />
              <div className="founder-meta">
                <div className="founder-name">{leader.name}</div>
                <div className="founder-role">{leader.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="about-final-cta">
          <div>
            <h3>{section.finalCta.title}</h3>
            <p>{section.finalCta.description}</p>
          </div>
          <div className="about-cta-actions">
            <button className="services-action-button services-action-primary" onClick={() => onOpenStat && onOpenStat(section.finalCta.primary)}>
              {section.finalCta.primary}
            </button>
            <button className="services-action-button services-action-secondary" onClick={() => onOpenStat && onOpenStat(section.finalCta.secondary)}>
              {section.finalCta.secondary}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function SectionPanel({ section, onOpenStat, onOpenKidsCard, scrollContainerRef }) {
  const Icon = section.icon;

  if (section.id === 'kids-world') {
    return <KidsWorldPanel section={section} onOpenStat={onOpenStat} onOpenKidsCard={onOpenKidsCard} scrollContainerRef={scrollContainerRef} />;
  }

  if (section.id === 'about-us') {
    return <AboutPanel section={section} onOpenStat={onOpenStat} scrollContainerRef={scrollContainerRef} />;
  }

  if (section.id === 'services' && section.serviceCards) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={scrollContainerRef}
          key={section.id}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -28, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-panel services-panel"
        >
          <h1 className={`section-title ${section.accentClass}`}>{section.title}</h1>

          <p className="section-description services-subtext">{section.description}</p>

          <div className="services-grid">
            {section.serviceCards.map((card) => (
              <button key={card.title} className="services-card" onClick={() => onOpenStat && onOpenStat(card.title)}>
                <div className="services-card-title">{card.title}</div>
                <div className="services-card-summary">{card.summary}</div>
                <div className="services-card-includes">Includes: {card.includes}</div>
              </button>
            ))}
          </div>

          <div className="services-why-grid">
            {section.whyChoose.map((item) => (
              <div key={item} className="services-why-box">
                {item}
              </div>
            ))}
          </div>

          <div className="services-bottom-cta">
            <h3>{section.bottomCta?.title || 'Ready to Build With Reelence?'}</h3>
            <p>{section.bottomCta?.text || 'Let Reelence shape your creative, cinematic or AI workflow into a premium execution roadmap.'}</p>
            <div className="services-cta-buttons">
              <button className="services-action-button services-action-primary" onClick={() => onOpenStat && onOpenStat(section.bottomCta?.primary || 'Start Premium Collaboration')}>
                {section.bottomCta?.primary || 'Start Premium Collaboration'}
              </button>
              <button className="services-action-button services-action-secondary" onClick={() => onOpenStat && onOpenStat(section.bottomCta?.secondary || 'Start Project')}>
                {section.bottomCta?.secondary || 'Start Project'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Special rendering for home section with feature cards
  if (section.features) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={scrollContainerRef}
          key={section.id}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -28, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`section-panel ${section.id === 'home' ? 'section-panel-home' : ''}`}
        >
          {section.id !== 'home' && <h1 className={`section-title ${section.accentClass}`}>{section.title}</h1>}

          <p className="section-description">{section.description}</p>

          <div className="features-grid">
            {section.features.map((feature) => (
              <button
                key={feature.title}
                className="feature-card"
                onClick={() => onOpenStat && onOpenStat(feature.title, feature.detail, true)}
              >
                <span className="feature-title">{feature.title}</span>
                <span className="feature-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="button-row">
            <button
              type="button"
              className="primary-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onOpenStat) onOpenStat(section.cta);
              }}
            >
              {section.cta}
              <ChevronRight size={16} />
            </button>
            {section.secondaryCta && (
              <button type="button" className="secondary-button" onClick={() => onOpenStat && onOpenStat(section.secondaryCta)}>
                {section.secondaryCta}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (section.id === 'portfolio') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          ref={scrollContainerRef}
          key={section.id}
          initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -28, filter: 'blur(10px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="section-panel portfolio-panel"
        >
          <h1 className={`section-title ${section.accentClass}`}>{section.title}</h1>

          <p className="section-description">{section.description}</p>

          <div className="portfolio-showcase-grid">
            {section.showcaseCards.map((item) => (
              <button key={item} className="portfolio-showcase-card" onClick={() => onOpenStat && onOpenStat(item)}>
                <span>{item}</span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>

          <div className="stats-row">
            {section.stats.map((item) => (
              <button key={item} className="stat-pill" onClick={() => onOpenStat && onOpenStat(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="button-row">
            <button type="button" className="primary-button" onClick={() => onOpenStat && onOpenStat(section.cta)}>
              {section.cta}
              <ChevronRight size={16} />
            </button>
            <button type="button" className="secondary-button" onClick={() => onOpenStat && onOpenStat(section.secondaryCta)}>
              {section.secondaryCta}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={scrollContainerRef}
        key={section.id}
        initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -28, filter: 'blur(10px)' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="section-panel"
      >
        <h1 className={`section-title ${section.accentClass}`}>{section.title}</h1>

        <p className="section-description">{section.description}</p>

        <div className="stats-row">
          {section.stats.map((item) => (
            <button key={item} className="stat-pill" onClick={() => onOpenStat && onOpenStat(item)}>
              {item}
            </button>
          ))}
        </div>

        <div className="button-row">
          <button
            type="button"
            className="primary-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenStat) {
                    onOpenStat(section.cta);
              }
            }}
          >
            {section.cta}
            <ChevronRight size={16} />
          </button>
              {section.secondaryCta && (
                <button type="button" className="secondary-button" onClick={() => onOpenStat && onOpenStat(section.secondaryCta)}>
                  {section.secondaryCta}
                </button>
              )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function VisualPanel({ section }) {
  if (section.id === 'about-us') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, x: 36, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 24, scale: 0.98 }}
          transition={{ duration: 0.55 }}
          className="visual-panel"
        >
          <div className="visual-panel-header">
            <img src="/assets/logo.png" alt="Reelence" className="mini-logo" />
            <span>{section.visualTitle}</span>
          </div>

          <div className="leaders-spotlight">
            {leaders.map((person) => (
              <div key={person.name} className="leaders-spotlight-card">
                <img
                  src={person.image}
                  alt={person.name}
                  className="leaders-spotlight-image"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/founders/founder-placeholder.svg';
                  }}
                />
                <div className="leaders-spotlight-name">{person.name}</div>
                <div className="leaders-spotlight-role">{person.role}</div>
                <div className="leaders-spotlight-badge">{person.badge}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (section.id === 'home') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, x: 36, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 24, scale: 0.98 }}
          transition={{ duration: 0.55 }}
          className="visual-panel visual-panel-home"
        >
          <h1 className={`section-title home-visual-title ${section.accentClass}`}>{section.title}</h1>

          <div className="visual-panel-header">
            <img src="/assets/logo.png" alt="Reelence" className="mini-logo" />
            <span>{section.visualTitle}</span>
          </div>

          <HomeMediaPlayer />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section.id}
        initial={{ opacity: 0, x: 36, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 24, scale: 0.98 }}
        transition={{ duration: 0.55 }}
        className="visual-panel"
      >
        <div className="visual-panel-header">
          <img src="/assets/logo.png" alt="Reelence" className="mini-logo" />
          <span>{section.visualTitle}</span>
        </div>

        <div className={`visual-scene-card visual-scene-${section.vibe}`}>
          <div className="visual-depth-grid" />
          <div className="visual-depth-glow" />
          <div className="visual-depth-plane" />
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="visual-floating-card"
              style={{
                left: `${10 + ((i * 9) % 72)}%`,
                top: `${14 + ((i * 7) % 62)}%`,
                transform: `translateZ(${i * 12}px) rotate(${i * 8 - 10}deg)`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ReelenceImmersiveScreen() {
  const homeDefaultIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === 'home')
  );
  const [activeIndex, setActiveIndex] = useState(homeDefaultIndex);
  const shellRef = useRef(null);
  const wheelLockRef = useRef(false);
  const scrollContainerRef = useRef(null);
  const active = sections[activeIndex];

  useEffect(() => {
    const navigateToSection = (sectionId) => {
      const nextIndex = sections.findIndex((section) => section.id === sectionId);
      if (nextIndex >= 0) {
        setActiveIndex(nextIndex);
      }
    };

    const applyHash = () => {
      const sectionId = window.location.hash.replace("#", "") || "home";
      navigateToSection(sectionId);
    };

    const onCustomNavigate = (event) => {
      navigateToSection(event.detail);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    window.addEventListener("reelence:navigate", onCustomNavigate);

    return () => {
      window.removeEventListener("hashchange", applyHash);
      window.removeEventListener("reelence:navigate", onCustomNavigate);
    };
  }, []);

  useEffect(() => {
    const activeSectionId = sections[activeIndex]?.id;
    if (!activeSectionId) return;

    // Keep URL + header bubble in sync with the currently visible immersive section.
    if (window.location.hash !== `#${activeSectionId}`) {
      window.history.replaceState(null, "", `#${activeSectionId}`);
    }

    window.dispatchEvent(new CustomEvent("reelence:active-section", { detail: activeSectionId }));
  }, [activeIndex]);


  const servicePopupContent = {
    'Cinematic Brand Films': {
      title: 'Cinematic Brand Films',
      description: 'Premium brand storytelling crafted with cinematic writing, AI-assisted visual development and human creative direction.',
      whatYouGet: ['Brand films', 'Founder stories', 'Corporate films', 'Investor narratives', 'Internal communication assets'],
      whyItMatters: 'Your organization feels more credible, memorable and premium across customers, investors, teams and partners.'
    },
    'AI Commercials & Launch Campaigns': {
      title: 'AI Commercials & Launch Campaigns',
      description: 'High-impact commercial films and campaign assets built through AI speed, cinematic direction and brand-safe execution.',
      whatYouGet: ['AI commercials', 'Product launch films', 'Campaign cutdowns', 'Social and performance assets'],
      whyItMatters: 'You get faster campaign production without losing storytelling quality, brand control or cinematic appeal.'
    },
    'Product Films & Explainers': {
      title: 'Product Films & Explainers',
      description: 'Premium product and platform films that make complex ideas clear, desirable and easy to remember.',
      whatYouGet: ['Product films', 'Explainer films', 'Service videos', 'Platform walkthroughs', 'Launch support assets'],
      whyItMatters: 'Audiences understand your product faster, improving trust, sales conversations and launch confidence.'
    },
    'Short-Form Cinematic Content': {
      title: 'Short-Form Cinematic Content',
      description: 'Refined reels, shorts and social-first films designed to feel cinematic instead of disposable.',
      whatYouGet: ['Reels', 'Shorts', 'Launch edits', 'Motion content', 'Platform-specific cutdowns'],
      whyItMatters: 'Your brand stays visible with consistent premium content across Instagram, YouTube, LinkedIn and campaign channels.'
    },
    'Luxury, Real Estate & Experience Films': {
      title: 'Luxury, Real Estate & Experience Films',
      description: 'Aspirational cinematic visuals for properties, hospitality, luxury products and premium experiences.',
      whatYouGet: ['Property films', 'Walkthroughs', 'Lifestyle edits', 'Hospitality visuals', 'Luxury campaign films'],
      whyItMatters: 'High-value offerings become more immersive, desirable and credible to premium audiences.'
    },
    'Event, Testimonial & Leadership Films': {
      title: 'Event, Testimonial & Leadership Films',
      description: 'Polished films that transform real events, customer stories and leadership messages into long-term trust assets.',
      whatYouGet: ['Event films', 'Testimonials', 'Leadership interviews', 'Highlight reels', 'Founder messages'],
      whyItMatters: 'Important moments become cinematic proof points for sales, hiring, PR, investor communication and brand authority.'
    },
    'AI Cinematic Studio OS': {
      title: 'AI Cinematic Studio OS',
      description: 'A proprietary creative intelligence platform for story, screenplay, storyboard, camera planning, audio direction, video workflows and production decision support.',
      whatYouGet: ['Story intelligence', 'Storyboard planning', 'Camera logic', 'Audio and music direction', 'Production workflow automation'],
      whyItMatters: 'Creative teams can move from concept to cinematic execution with a smarter, unified AI production system.'
    },
    'Premium AI Film Production': {
      title: 'Premium AI Film Production',
      description: 'Human-directed AI production for commercials, brand films, product films, cinematic shorts and launch visuals.',
      whatYouGet: ['AI-assisted commercials', 'Brand films', 'Product videos', 'Short films', 'Cinematic launch content'],
      whyItMatters: 'Brands and creators get premium visual storytelling with faster ideation, sharper execution and stronger audience impact.'
    },
    'OTT Entertainment Universe': {
      title: 'OTT Entertainment Universe',
      description: 'Original films, music videos, mythology worlds, kids stories and streaming-ready IP designed as scalable entertainment ecosystems.',
      whatYouGet: ['Movies and shorts', 'Music videos', 'Mythology worlds', 'Kids IP', 'OTT-ready concepts'],
      whyItMatters: 'Reelence helps build cinematic entertainment worlds that can scale across formats, audiences and platforms.'
    },
    'AI Learning & Kids World': {
      title: 'AI Learning & Kids World',
      description: 'Safe visual learning, animated stories, songs, AI chapter explainers and creator education experiences.',
      whatYouGet: ['Kids learning systems', 'Animated stories', 'Visual explainers', 'Creator training', 'AI filmmaking education'],
      whyItMatters: 'Learning becomes more visual, practical, adaptive and emotionally engaging for children, creators and institutions.'
    },
    'Custom AI Creation Systems': {
      title: 'Custom AI Creation Systems',
      description: 'Tailored AI apps, avatars, LoRA workflows, creative agents and automation tools built around real production needs.',
      whatYouGet: ['Custom AI apps', 'AI avatars', 'LoRA workflows', 'Creative agents', 'Enterprise AI systems'],
      whyItMatters: 'Organizations can deploy tailored intelligent systems instead of relying on generic tools that do not fit their workflow.'
    },
    'Enterprise Innovation Studio': {
      title: 'Enterprise Innovation Studio',
      description: 'Strategic AI consulting, creative operating systems, automation workflows and scalable execution support for modern organizations.',
      whatYouGet: ['AI consulting', 'Creative operating systems', 'Workflow design', 'Automation tools', 'Scalable execution support'],
      whyItMatters: 'Teams can modernize operations, accelerate delivery and scale intelligent creative execution with one expert partner.'
    },
    'Short Films & Movies': {
      title: 'Short Films & Movies',
      description: 'Original cinematic storytelling.',
      whatYouGet: ['Original scripts', 'Cinematic direction', 'High-end production', 'Festival-ready films'],
      whyItMatters: 'Create lasting emotional connections with audiences through powerful storytelling.'
    },
    'Music Videos & Albums': {
      title: 'Music Videos & Albums',
      description: 'Immersive audiovisual experiences.',
      whatYouGet: ['Concept development', 'Art direction', 'Choreography integration', 'Visual effects'],
      whyItMatters: 'Elevate musical artistry with unforgettable cinematic visuals.'
    },
    'Mythology Cinematic Universe': {
      title: 'Mythology Cinematic Universe',
      description: 'Epic tales reimagined for modern audiences.',
      whatYouGet: ['World-building', 'Character design', 'Epic narratives', 'VFX-heavy execution'],
      whyItMatters: 'Bring timeless stories to life with cutting-edge visual technology.'
    },
    'Kids Stories & Songs': {
      title: 'Kids Stories & Songs',
      description: 'Joyful and engaging children\'s content.',
      whatYouGet: ['Animated stories', 'Educational songs', 'Character creation', 'Safe screen entertainment'],
      whyItMatters: 'Inspire and educate the next generation with high-quality, positive content.'
    },
    'Animated Characters': {
      title: 'Animated Characters',
      description: 'Lovable characters and premium animation.',
      whatYouGet: ['Character design', 'Rigging and animation', 'Voice acting integration', 'IP development'],
      whyItMatters: 'Build long-term emotional engagement with memorable animated figures.'
    },
    'OTT-Ready Concepts': {
      title: 'OTT-Ready Concepts',
      description: 'Series and film IPs built for streaming platforms.',
      whatYouGet: ['Pilot episodes', 'Series bibles', 'Pitch decks', 'Platform-ready formats'],
      whyItMatters: 'Develop scalable entertainment properties ready for global distribution.'
    },
    'AI Films & Commercials': {
      title: 'AI Films & Commercials',
      description: 'A curated slate of Reelence AI-assisted films, commercials and premium visual experiments.',
      whatYouGet: ['Brand films', 'AI commercials', 'Short film experiments', 'Launch visuals'],
      whyItMatters: 'The showcase demonstrates how Reelence turns intelligent production workflows into premium cinematic output.'
    },
    'Music & Story Worlds': {
      title: 'Music & Story Worlds',
      description: 'Music videos, story universes and character-led visual concepts designed for memorable audience experiences.',
      whatYouGet: ['Music videos', 'Visual albums', 'Narrative worlds', 'Character concepts'],
      whyItMatters: 'Music and storytelling become scalable entertainment IP rather than one-time content pieces.'
    },
    'Studio OS Prototypes': {
      title: 'Studio OS Prototypes',
      description: 'Experimental creative technology workflows from Reelence Studio OS, including story, visual and production intelligence systems.',
      whatYouGet: ['Workflow experiments', 'AI production tests', 'Storyboard systems', 'Creative automation prototypes'],
      whyItMatters: 'These prototypes show how Reelence is building the command layer for future cinematic creation.'
    }
  };

  const [modal, setModal] = useState({
    open: false,
    title: '',
    body: '',
    showDemoButton: false,
    service: null,
  });
  const [kidsCardModal, setKidsCardModal] = useState({
    open: false,
    card: null,
  });

  const openKidsCardModal = (card) => {
    setKidsCardModal({ open: true, card });
  };

  const closeKidsCardModal = () => {
    setKidsCardModal({ open: false, card: null });
  };

  const openModal = (titleOrKey, body, showDemoButton = false) => {
    const service = servicePopupContent[titleOrKey];
    if (service) {
      setModal({ open: true, title: service.title, body: '', showDemoButton: false, service });
      return;
    }

    // Special about-us tiles and leaders
    const aboutSection = sections.find((s) => s.id === 'about-us');
    if (titleOrKey === 'Our Mission' && aboutSection) {
      const mission = aboutSection.mission;
      const bodyText = `${mission.text}\n\n${mission.points.map((p) => `• ${p}`).join('\n')}`;
      setModal({ open: true, title: mission.title, body: bodyText, showDemoButton: false, service: null });
      return;
    }

    if (titleOrKey === 'Our Vision' && aboutSection) {
      const vision = aboutSection.vision;
      const bodyText = `${vision.text}\n\n${vision.cards.map((c) => `• ${c}`).join('\n')}`;
      setModal({ open: true, title: vision.title, body: bodyText, showDemoButton: false, service: null });
      return;
    }

    if (titleOrKey === 'Collaborative Foundation' && aboutSection) {
      const collab = aboutSection.collaboration;
      const bodyText = `${collab.text}\n\n${collab.chips.map((c) => `• ${c}`).join('\n')}`;
      setModal({ open: true, title: collab.title, body: bodyText, showDemoButton: false, service: null });
      return;
    }

    const leader = leaders.find((l) => l.name === titleOrKey);
    if (leader) {
      const bodyText = `${leader.role}\n\n${leader.bio}`;
      setModal({ open: true, title: leader.name, body: bodyText, showDemoButton: false, service: null });
      return;
    }

    const mapping = {
      'Start Creative Project': 'Start a premium creative project with Reelence Creative Studio. We will shape your idea, campaign, product, or brand story into cinematic AI-assisted content designed for attention and trust.',
      'Talk To Reelence': 'Connect with Reelence to discuss your creative goals, target audience, production needs, timeline, and the best cinematic content format for your brand.',
      'Start a Premium Collaboration': 'Collaborate with Reelence on a premium AI cinema, content, education, entertainment or enterprise innovation initiative shaped for high-quality execution.',
      'Explore Studio OS': 'Reelence Studio OS is our proprietary creative intelligence platform for story, storyboard, audio, video, camera planning and AI filmmaking workflows.',
      'Explore Studio OS Modules': 'Explore the Studio OS modules for story intelligence, storyboard design, audio direction, video generation workflows and production knowledge systems.',
      'Plan A Workflow': 'Map your creative or enterprise production workflow with Reelence and identify where AI systems can improve speed, quality and repeatability.',
      'Explore Entertainment': 'Explore Reelence original cinematic worlds across films, music videos, mythology-inspired stories, kids entertainment and OTT-ready creative IP.',
      'Discuss IP Collaboration': 'Discuss co-development, production or partnership opportunities for films, music videos, character universes and OTT-ready entertainment concepts.',
      'Enter Kids World': 'Partner with Reelence Kids World to co-create safe stories, songs, characters and visual learning experiences crafted for children and families.',
      'Explore Learning Systems': 'Explore AI-powered visual explainers, school chapter support, kids learning journeys and creator education systems from Reelence.',
      'Create Kids Content': 'Create safe premium kids content with Reelence, including stories, songs, animated characters, culture specials and AI-powered visual learning films.',
      'View Showcase': 'Explore the Reelence showcase slate across AI films, commercials, music visuals, kids content, Studio OS prototypes and creative technology experiments.',
      'Discuss Your Project': 'Share your film, brand, music, education, OTT or enterprise AI idea and Reelence will help convert it into a premium execution roadmap.',
      'Meet Leadership': 'Meet the leadership team shaping Reelence as a cinematic AI ecosystem across creative technology, entertainment, education and enterprise innovation.',
      'Start a Conversation': 'Share your idea, brand, film, campaign, training requirement or AI solution need. Reelence will help shape it into a clear creative and technology roadmap.',
      'View Collaboration Options': 'Explore collaboration models for brands, studios, OTT concepts, education, kids content, enterprise AI systems and global innovation initiatives.',
      'Contact Us': 'Tell us your creative or technology goals and Reelence will design a premium cinematic, AI or content roadmap around your objective.',
    };

    const title = titleOrKey || 'Details';
    const content = body || mapping[titleOrKey] || mapping[title] || '';
    setModal({ open: true, title, body: content, showDemoButton, service: null });
  };

  useEffect(() => {
    const onWheel = (e) => {
      if (window.innerWidth <= 1180) return;

      if (Math.abs(e.deltaY) < 24) return;

      e.preventDefault();
      if (wheelLockRef.current) return;

      wheelLockRef.current = true;
      setActiveIndex((prev) => {
        if (e.deltaY > 0) return Math.min(sections.length - 1, prev + 1);
        return Math.max(0, prev - 1);
      });

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [activeIndex]);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    const onMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      node.style.setProperty('--mx', `${x}px`);
      node.style.setProperty('--my', `${y}px`);
    };

    node.addEventListener('mousemove', onMouseMove);
    return () => node.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="page-shell" ref={shellRef}>
      <CinematicBackgroundVideo videoName={active.id} />

      <div className="immersive-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="backdrop-layer"
          >
            <Backdrop vibe={active.vibe} />
          </motion.div>
        </AnimatePresence>

        <div className="screen-overlay" />

        <div
          className={`content-grid content-grid-${active.id} ${(active.id === 'services' || active.id === 'kids-world') ? 'content-grid-services' : ''}`}
        >
          <SectionPanel section={active} onOpenStat={openModal} onOpenKidsCard={openKidsCardModal} scrollContainerRef={scrollContainerRef} />
          {(active.id !== 'services' && active.id !== 'kids-world' && active.id !== 'about-us') && (
            <VisualPanel section={active} />
          )}
        </div>

        <DetailModal
          open={modal.open}
          title={modal.title}
          onClose={() => setModal({ open: false, title: '', body: '', showDemoButton: false, service: null })}
        >
        {modal.service ? (
            <div className="service-modal-content">
              <p className="service-modal-description">{modal.service.description}</p>

              <div className="service-modal-block">
                <h4>What You Get</h4>
                <ul>
                  {modal.service.whatYouGet.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="service-modal-block">
                <h4>{modal.service.benefits ? 'Benefits' : 'Why It Matters'}</h4>
                <p>{modal.service.benefits || modal.service.whyItMatters}</p>
              </div>

              <div className="service-modal-actions">
                <button className="btn primary">Contact Us</button>
                <button className="btn secondary" onClick={() => setModal({ open: false, title: '', body: '', showDemoButton: false, service: null })}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{modal.body}</p>
              <div style={{ marginTop: 14 }}>
                {modal.showDemoButton ? (
                  <button className="btn primary">Book Demo</button>
                ) : (
                  <button className="btn primary">Explore More</button>
                )}
              </div>
            </div>
          )}
        </DetailModal>

        <DetailModal
          open={kidsCardModal.open}
          title={kidsCardModal.card?.title}
          onClose={closeKidsCardModal}
          modalClassName="kids-modal-card"
          overlayClassName="kids-modal-overlay"
        >
          {kidsCardModal.card && (
            <div className="kids-modal-content">
              <p className="kids-modal-description">{kidsCardModal.card.details}</p>

              <div className="kids-modal-block">
                <h4>Benefits For Kids & Parents</h4>
                <ul>
                  {kidsCardModal.card.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="kids-modal-actions">
                <button className="btn primary" onClick={() => openModal('Contact Us')}>
                  Contact Us
                </button>
                <button className="btn secondary" onClick={closeKidsCardModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </DetailModal>
      </div>
    </div>
  );
}