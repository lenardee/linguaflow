import type { ListeningTrack, SpeakingSentence } from '@/types';

export const LISTENING_TRACKS: ListeningTrack[] = [
  {
    id: 'track-communication',
    title: 'The Art of Communication',
    topic: 'Language & Society',
    level: 'B1',
    estimatedDuration: 90,
    transcript:
      'Communication is the foundation of all human relationships. Whether we are speaking with friends, writing emails to colleagues, or even sending a text message, we are constantly expressing ourselves and interpreting the world around us. Effective communication requires not just the ability to speak or write clearly, but also the critical skill of active listening. Many people focus so much on what they want to say that they forget to truly hear what others are expressing. Research in psychology suggests that most misunderstandings in relationships stem not from lack of information, but from failures in empathetic listening. In professional settings, clear communication can determine whether a project succeeds or fails. Teams that communicate openly tend to solve problems faster, adapt to change more effectively, and build stronger trust among their members. In our increasingly digital world, written communication has become more important than ever. Emails, reports, and even social media posts leave a permanent record and can reach thousands of people instantly. This demands a higher level of care and precision in how we choose our words.',
    questions: [
      { id: 'comm-q1', question: 'What skill does the speaker say is critically important but often overlooked?', options: ['Public speaking', 'Active listening', 'Speed reading', 'Writing clearly'], correctIndex: 1 },
      { id: 'comm-q2', question: 'According to research, what causes most misunderstandings in relationships?', options: ['Wrong information', 'Language barriers', 'Failures in empathetic listening', 'Cultural differences'], correctIndex: 2 },
      { id: 'comm-q3', question: 'Why does digital written communication demand higher precision?', options: ['It is faster than speaking', 'It reaches many people instantly and leaves a permanent record', 'It is cheaper to produce', 'It is easier to understand'], correctIndex: 1 },
    ],
  },
  {
    id: 'track-coffee',
    title: 'A Short History of Coffee',
    topic: 'Culture & History',
    level: 'A2',
    estimatedDuration: 80,
    transcript:
      "Coffee is one of the most popular drinks in the world. But do you know where it came from? According to legend, coffee was first discovered in Ethiopia, in a region called Kaffa. A goat herder named Kaldi noticed that his goats became very energetic after eating red berries from a certain tree. He tried the berries himself and felt more alert and awake. Word spread, and soon monks in nearby monasteries used the berries to stay awake during long evening prayers. The berries were eventually dried and boiled to make a drink. By the fifteenth century, coffee had spread to the Arabian Peninsula. Coffee houses, known as Qahveh Khaneh, became popular social gathering places in cities like Mecca and Cairo. People came together to drink coffee, share news, play music, and discuss ideas. These early coffee houses were sometimes called Schools of the Wise. Coffee eventually reached Europe in the seventeenth century, where it quickly replaced beer and wine as the morning drink of choice. Today, over two billion cups of coffee are consumed every single day around the world.",
    questions: [
      { id: 'cof-q1', question: 'Where was coffee first discovered, according to legend?', options: ['Brazil', 'Arabia', 'Ethiopia', 'Europe'], correctIndex: 2 },
      { id: 'cof-q2', question: 'What were early Arabian coffee houses sometimes called?', options: ['Schools of the Wise', 'Kaffa Houses', 'Tea Rooms', 'Bean Halls'], correctIndex: 0 },
      { id: 'cof-q3', question: 'How many cups of coffee are consumed daily worldwide?', options: ['1 billion', '500 million', '2 billion', '5 billion'], correctIndex: 2 },
    ],
  },
  {
    id: 'track-growth-mindset',
    title: 'The Power of a Growth Mindset',
    topic: 'Psychology & Learning',
    level: 'B2',
    estimatedDuration: 100,
    transcript:
      "Psychologist Carol Dweck spent decades researching one of the most powerful ideas in modern education: the concept of the growth mindset. In her landmark studies, Dweck found that students who believed their intelligence could be developed through hard work and dedication consistently outperformed students who believed their abilities were fixed and unchangeable. A fixed mindset leads people to avoid challenges, give up easily, and see effort as pointless. A growth mindset, on the other hand, leads people to embrace challenges as opportunities to learn, persist in the face of setbacks, and find inspiration in the success of others. The implications of this research extend far beyond the classroom. In workplaces, teams with a growth mindset culture show greater innovation and resilience. Athletes who adopt growth mindset principles recover faster from injury and reach higher performance levels. Perhaps most importantly, the growth mindset can be taught and cultivated. Simple changes in how we praise children or respond to our own failures can shift our relationship with learning itself. The next time you face something difficult, remember: struggle is not a sign of failure. It is the sensation of your brain growing.",
    questions: [
      { id: 'gm-q1', question: "What did Carol Dweck's research primarily study?", options: ['Memory techniques', 'The concept of the growth mindset', 'Reading speed', 'Classroom design'], correctIndex: 1 },
      { id: 'gm-q2', question: 'How does a fixed mindset affect behavior?', options: ['It encourages risk-taking', 'It leads people to embrace challenges', 'It leads people to avoid challenges and give up easily', 'It improves team performance'], correctIndex: 2 },
      { id: 'gm-q3', question: 'What does the speaker say struggle means in terms of learning?', options: ['You are failing', 'You need more rest', 'Your brain is growing', 'You should try something easier'], correctIndex: 2 },
    ],
  },
];

export const SPEAKING_SENTENCES: SpeakingSentence[] = [
  {
    id: 'sp-1',
    text: 'The weather today is surprisingly pleasant for this time of year.',
    difficulty: 'A2',
    tip: 'Stress "surprisingly" — it carries the main meaning. Notice the /ər/ sounds in "weather" and "year."',
    focusAreas: ['vowel sounds', 'word stress', 'natural rhythm'],
  },
  {
    id: 'sp-2',
    text: 'Could you please tell me where the nearest post office is?',
    difficulty: 'A2',
    tip: 'This is a polite request. Your voice should rise slightly at the end to signal a question.',
    focusAreas: ['intonation', 'polite register', 'question structure'],
  },
  {
    id: 'sp-3',
    text: 'I thoroughly enjoy reading novels in the evening before going to sleep.',
    difficulty: 'B1',
    tip: '"Thoroughly" is tricky — the "ough" sounds like /ʌ/. Stress "thoroughly" and "evening" for natural rhythm.',
    focusAreas: ['difficult words', 'word stress', 'sentence rhythm'],
  },
  {
    id: 'sp-4',
    text: 'Technology has dramatically changed the way we communicate with each other.',
    difficulty: 'B1',
    tip: 'Keep a steady pace. Stress "dramatically" and "communicate" — they carry the key ideas.',
    focusAreas: ['pace control', 'content word stress', 'complex vocabulary'],
  },
  {
    id: 'sp-5',
    text: 'She decided to pursue a career in medicine despite the long years of study required.',
    difficulty: 'B1',
    tip: '"Despite" introduces a contrast — pause slightly before it to let the contrast land.',
    focusAreas: ['contrast signals', 'thought grouping', 'sentence structure'],
  },
  {
    id: 'sp-6',
    text: 'The government should invest more resources in public transportation systems.',
    difficulty: 'B2',
    tip: 'This is an opinion statement — give "should" clear weight to signal your position confidently.',
    focusAreas: ['modal verbs', 'persuasive tone', 'confidence'],
  },
  {
    id: 'sp-7',
    text: 'I was completely exhausted after running my first half-marathon last Sunday.',
    difficulty: 'B1',
    tip: 'Let the feeling come through — "completely exhausted" should sound like how exhaustion feels.',
    focusAreas: ['expressive delivery', 'past tense', 'adverbs'],
  },
  {
    id: 'sp-8',
    text: 'Learning a new language requires consistent practice and a great deal of patience.',
    difficulty: 'B2',
    tip: '"Consistent" and "patience" are the key concepts — give them extra prominence.',
    focusAreas: ['key word prominence', 'compound ideas', 'formal register'],
  },
  {
    id: 'sp-9',
    text: 'The documentary we watched last night raised some thought-provoking questions about society.',
    difficulty: 'B2',
    tip: '"Thought-provoking" is a compound adjective — link the two words smoothly rather than separating them.',
    focusAreas: ['compound adjectives', 'linking words', 'complex phrases'],
  },
  {
    id: 'sp-10',
    text: 'If I had more free time, I would definitely travel to Southeast Asia.',
    difficulty: 'B2',
    tip: 'This is a hypothetical — use a slightly softer, reflective tone. The condition and the wish should feel connected.',
    focusAreas: ['conditional structure', 'hypothetical tone', 'wish vs. reality'],
  },
];
