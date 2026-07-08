/**
 * siteData.js — Complete content migration from ReelenceImmersiveScreen.jsx
 * All section data, leaders, kids cards, footer panels, and nav items
 * extracted from the original Vite/React app.
 */

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navItems = [
  { label: 'Home',           href: '#home' },
  { label: 'Creative Studio',href: '#services' },
  { label: 'Studio OS',      href: '#studio-os' },
  { label: 'Entertainment',  href: '#entertainment' },
  { label: 'Kids + Learning',href: '#kids-world' },
  { label: 'Showcase',       href: '#portfolio' },
  { label: 'About',          href: '#about-us' },
];

// ─── Sections ────────────────────────────────────────────────────────────────
export const sections = [
  {
    id: 'home',
    label: 'Home',
    title: 'The Future of AI Cinema: Learning and Entertainment',
    eyebrow: 'REELENCE DIGITAL STUDIOS',
    accentClass: 'accent-home',
    description:
      'Reelence is a premium AI filmmaking and creative technology ecosystem building cinematic content, Studio OS intelligence, OTT-ready entertainment IP, AI learning experiences and enterprise automation systems for the next era of storytelling.',
    cta: 'Explore Studio OS',
    secondaryCta: 'Start a Premium Collaboration',
    stats: ['AI Cinematic Studio OS', 'OTT-Ready Original IP', 'Enterprise Creative Intelligence'],
    features: [
      { title: 'AI Cinematic Studio OS', detail: 'A proprietary creative intelligence platform for story, screenplay, storyboard, camera planning, audio direction, video generation and production workflows.' },
      { title: 'Premium AI Film Production', detail: 'AI-assisted brand films, commercials, product films, launch campaigns, shorts and cinematic visual assets directed with human taste and production discipline.' },
      { title: 'OTT Entertainment Universe', detail: 'Original movies, music videos, short films, mythology-inspired worlds, kids IP and streaming-ready cinematic concepts built for scalable audience ecosystems.' },
      { title: 'AI Learning & Kids World', detail: 'Safe visual learning, animated stories, chapter explainers, creator training and AI filmmaking education designed for children, institutions and teams.' },
      { title: 'Custom AI Creation Systems', detail: 'Custom AI apps, avatars, LoRA workflows, creative agents, automation tools and enterprise-grade intelligent systems tailored to real production needs.' },
      { title: 'Enterprise Innovation Studio', detail: 'Strategic AI consulting, workflow automation, content operating systems and scalable execution support for organizations moving into intelligent creation.' },
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
    stats: ['Human-Directed AI Workflow', 'Cinematic Brand Systems', 'Multi-Platform Delivery'],
    visualTitle: 'Creative Studio Command View',
    vibe: 'services',
    serviceCards: [
      { title: 'Cinematic Brand Films', summary: 'Shape your brand story with cinematic clarity, premium visual language and leadership-level messaging.', includes: 'Brand films, founder stories, corporate films, investor and internal communication.' },
      { title: 'AI Commercials & Launch Campaigns', summary: 'Create high-impact campaign films and launch assets using AI visuals, cinematic writing and human direction.', includes: 'Digital ads, launch films, campaign cutdowns, social and performance assets.' },
      { title: 'Product Films & Explainers', summary: 'Turn products, platforms and complex ideas into premium visual stories people understand quickly.', includes: 'Product films, explainer films, service videos, platform walkthroughs.' },
      { title: 'Short-Form Cinematic Content', summary: 'Build refined reels, shorts and social films that feel premium instead of generic feed content.', includes: 'Reels, shorts, launch edits, motion content, platform-specific cutdowns.' },
      { title: 'Luxury, Real Estate & Experience Films', summary: 'Create cinematic property, lifestyle, and luxury brand visuals that feel premium and aspirational.', includes: 'Property films, walkthroughs, lifestyle edits, hospitality and luxury campaigns.' },
      { title: 'Event, Testimonial & Leadership Films', summary: 'Transform real moments, leaders and customer stories into polished trust-building cinematic assets.', includes: 'Event films, testimonials, interviews, highlight reels.' },
    ],
    whyChoose: ['AI-powered production speed', 'Human creative direction', 'Premium cinematic finish', 'Multi-platform delivery systems'],
    bottomCta: { title: 'Ready to Build a Cinematic Brand Asset?', text: 'Bring your idea, product, campaign or institution story to Reelence and we will shape it into a premium AI-assisted cinematic production roadmap.', primary: 'Start Creative Project', secondary: 'Talk To Reelence' },
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
    stats: ['Script-to-screen intelligence', 'Storyboard and shot planning', 'Creative workflow automation'],
    visualTitle: 'Studio OS Command Intelligence',
    vibe: 'director',
    features: [
      { title: 'Story Intelligence', detail: 'Develop loglines, characters, scenes, screenplay beats and story logic with AI-assisted creative analysis and human direction.' },
      { title: 'Storyboard & Shot Design', detail: 'Convert narrative intent into storyboard frames, shot lists, camera language, visual references and production-ready creative boards.' },
      { title: 'Audio & Music Direction', detail: 'Plan voice, sound design, song ideas, background scores and emotional audio cues aligned with each cinematic moment.' },
      { title: 'Video Generation Workflow', detail: 'Coordinate AI video tools, prompt systems, shot continuity, iteration cycles and review checkpoints for professional output.' },
      { title: 'Production Knowledge Layer', detail: 'Bring scripts, references, compliance notes, creative assets and production intelligence into one searchable operating layer.' },
      { title: 'Enterprise Studio Automation', detail: 'Design repeatable creative pipelines for brands, agencies, education teams and studios that need scalable AI production systems.' },
    ],
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    title: 'Original Entertainment, Music & OTT-Ready Cinematic Worlds',
    eyebrow: 'MOVIES • MUSIC • STREAMING IP',
    accentClass: 'accent-marketing',
    description:
      'Reelence is developing a cinematic entertainment ecosystem across short films, feature concepts, music videos, albums, mythology-inspired universes, kids entertainment and OTT-ready stories built for modern streaming audiences.',
    cta: 'Explore Entertainment',
    secondaryCta: 'Discuss IP Collaboration',
    stats: ['Movies & Shorts', 'Music Video Ecosystem', 'OTT-Ready IP Worlds'],
    visualTitle: 'Entertainment Universe',
    vibe: 'director',
    features: [
      { title: 'Short Films & Feature Concepts', detail: 'Original cinematic storytelling designed for emotional recall, strong visual worlds and scalable production.' },
      { title: 'Music Videos & Albums', detail: 'Immersive song-led audiovisual experiences with cinematic art direction, performance energy and AI-enhanced worlds.' },
      { title: 'Mythology Cinematic Universe', detail: 'Epic Indian and global mythic ideas reimagined through modern visual technology and premium world-building.' },
      { title: 'Kids Stories & Songs', detail: 'Safe, joyful and memorable children\'s content that can grow into recurring IP across stories, music and learning.' },
      { title: 'Animated Character IP', detail: 'Lovable recurring characters, visual identities and franchise-ready animated worlds built for long-term audience connection.' },
      { title: 'OTT-Ready Concepts', detail: 'Series bibles, pilots, pitch assets and film universes structured for streaming platforms and global collaborators.' },
    ],
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
    stats: ['AI Cinematic Vision', 'Human + AI Collaboration', 'Creative Technology Leadership'],
    visualTitle: 'REELENCE LEADERSHIP',
    vibe: 'about',
    mission: {
      title: 'Our Mission',
      text: 'To democratize cinematic creation using intelligent systems that help businesses, creators, educators, and storytellers move from imagination to impactful experiences faster than ever before.',
      points: ['AI-assisted filmmaking', 'Smarter creative workflows', 'Accessible cinematic production', 'Enterprise-ready innovation', 'Future-ready storytelling'],
    },
    vision: {
      title: 'Our Vision',
      text: 'To build the world\'s most intelligent cinematic ecosystem where AI, creativity, automation, education, and immersive storytelling work together seamlessly.',
      cards: ['AI Director Systems', 'Intelligent Story Worlds', 'Interactive Learning', 'Entertainment Universes', 'AI Avatars & Digital Humans', 'Enterprise AI Creation Tools'],
    },
    collaboration: {
      title: 'Built Through Global Collaboration',
      text: 'Reelence is designed as a collaborative ecosystem bringing together creators, technologists, filmmakers, AI researchers, educators, and enterprise innovators from across industries and regions.',
      chips: ['AI & Robotics', 'Creative Technology', 'Education', 'Enterprise Innovation', 'Cinematic Production', 'Digital Experiences'],
    },
    finalCta: {
      title: 'Let\'s Build the Future of Intelligent Storytelling',
      description: 'Whether you are a creator, brand, educator, startup, or enterprise — Reelence is building the tools, systems, and creative intelligence to shape the next era of digital experiences.',
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
    stats: ['Creative partnership', 'AI strategy session', 'Enterprise solution planning'],
    visualTitle: 'Collaboration Command Deck',
    vibe: 'contact',
  },
];

// ─── Leaders / Founders ───────────────────────────────────────────────────────
export const leaders = [
  {
    name: 'Amit Kumar Pandey',
    role: 'Co-Founder & Architect of Intelligent Creation Systems',
    image: '/assets/founders/amit-kumar-pandey.jpg',
    badge: 'Global AI & Robotics Leadership',
    bio: 'Global AI & Robotics Pioneer driving the future of human-AI collaboration, intelligent systems, and next-generation creative ecosystems.',
  },
  {
    name: 'Ambika Chopra',
    role: 'Head of Sales & Marketing',
    image: '/assets/founders/ambika-chopra.jpg',
    badge: 'Brand Growth & Strategic Partnerships',
    bio: 'Leading brand strategy, partnerships, GTM execution, and business growth initiatives for Reelence.',
  },
  {
    name: 'Sunil Kumar',
    role: 'Co-Founder & Visionary Creative Head',
    image: '/assets/founders/sunil_kumar1.jpg',
    badge: 'AI Cinematic Systems Visionary',
    bio: 'Creator of Reelence Director and the cinematic AI ecosystem vision behind Reelence\'s storytelling and creative intelligence platform.',
  },
  {
    name: 'Navin Kumar',
    role: 'Co-Founder',
    image: '/assets/founders/navin-kumar.jpg',
    badge: 'Business Operations & Strategy',
    bio: 'Focused on business operations, execution systems, and scalable growth infrastructure for the Reelence ecosystem.',
  },
];

// ─── Kids World Cards ─────────────────────────────────────────────────────────
export const kidsWorldCards = [
  {
    title: 'Cinematic Animated Stories',
    summary: 'Premium story worlds with lovable characters, gentle emotions and positive values.',
    details: 'Story-first animated experiences designed with cinematic pacing, memorable characters, playful emotional arcs and kind life lessons that make screen-time feel safe, imaginative and meaningful.',
    benefits: ['Builds imagination, language confidence and emotional awareness', 'Encourages empathy, values and positive behaviour'],
  },
  {
    title: 'Music, Songs & Rhymes',
    summary: 'Catchy cinematic music videos for singing, movement and memory-led learning.',
    details: 'Rhythm-rich songs designed for repeat listening, movement and joyful participation, helping children remember concepts faster through melody, visuals and motion.',
    benefits: ['Improves memory through musical repetition', 'Supports pronunciation, rhythm, movement and expression'],
  },
  {
    title: 'AI Learning Adventures',
    summary: 'Visual chapter explainers, foundational concepts and curiosity-led education.',
    details: 'Compact AI-assisted learning journeys that blend entertainment with smart pedagogy, introducing numbers, colors, animals, science basics, values and school concepts through visual discovery.',
    benefits: ['Makes early learning visual, engaging and less stressful', 'Strengthens focus, curiosity and concept retention'],
  },
  {
    title: 'Festival & Culture Specials',
    summary: 'Content around Indian festivals, traditions and celebrations.',
    details: 'Celebration specials that help children connect with Indian culture through stories, songs and festive moments presented in a warm and modern format.',
    benefits: ['Creates cultural familiarity and pride', 'Helps parents introduce traditions naturally'],
  },
  {
    title: 'Character Universe',
    summary: 'Original recurring characters children can trust, remember and follow.',
    details: 'A premium recurring character ecosystem where children build long-term emotional connection, follow adventures, and return for trusted familiar faces across stories, songs and learning formats.',
    benefits: ['Boosts engagement through continuity', 'Creates healthy, positive role-model attachment'],
  },
  {
    title: 'Safe Premium Screen-Time',
    summary: 'Positive, family-friendly content parents can trust.',
    details: 'Carefully curated content standards ensure age-aware language, positive storytelling and family-safe themes so parents can feel confident in every watch session.',
    benefits: ['Reduces parent concern around screen content', 'Provides trusted quality for regular viewing'],
  },
];

export const kidsWorldHighlights = ['Safe Content', 'Fun Learning', 'Colorful Stories', 'Memorable Songs', 'Trusted By Families'];

// ─── Footer Panels ────────────────────────────────────────────────────────────
export const footerPanels = {
  contact: {
    eyebrow: 'Company Contact',
    title: 'Reelence Digital Studios PVT LTD',
    rows: [
      ['Registered Address', '#195, 6th Cross, Celebrity Paradise, Doddathugur, Electronic City Phase 1, Bangalore - 560100, Karnataka, India', 'MapPin'],
      ['Phone', '+91 9886669814  |  +91 9953793025', 'Phone'],
      ['Business Email', 'sales@reelence.com', 'Mail'],
    ],
  },
  email: {
    eyebrow: 'Email Desk',
    title: 'Reach Reelence',
    rows: [
      ['Business Queries', 'sales@reelence.com', 'Mail'],
      ['Consulting & Partnerships', 'consulting@reelence.com', 'Mail'],
    ],
  },
  paris: {
    eyebrow: 'European Innovation Collaboration',
    title: 'Paris Collaboration',
    rows: [
      ['Collaboration', 'Reelence collaborates with Scientists AI and Robotics, Paris and Shaktinova, Paris for AI, robotics, creative technology, and future-facing innovation initiatives.', 'MapPin'],
      ['Email', 'sales@reelence.com  |  consulting@reelence.com', 'Mail'],
      ['Phone', '+91 9886669814', 'Phone'],
    ],
  },
  social: {
    eyebrow: 'Social Handles',
    title: 'Follow Reelence',
    rows: [
      ['YouTube', 'Placeholder link', 'Youtube'],
      ['Instagram', 'Placeholder link', 'Instagram'],
      ['LinkedIn', 'Placeholder link', 'Linkedin'],
      ['Facebook', 'Placeholder link', 'Facebook'],
    ],
  },
  legal: {
    eyebrow: 'Legal',
    title: 'Policies & Compliance',
    rows: [
      ['Privacy Policy', 'Coming soon', 'FileText'],
      ['Terms of Use', 'Coming soon', 'FileText'],
      ['Cookie Policy', 'Coming soon', 'FileText'],
    ],
  },
  copyright: {
    eyebrow: 'Copyright',
    title: 'Reelence Rights',
    rows: [
      ['Notice', '© 2026 Reelence Digital Studios PVT LTD. All rights reserved.', 'Copyright'],
    ],
  },
};
