import type { ReadingPassage } from '@/types';

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'passage-morning-routines',
    title: 'Morning Routines Around the World',
    level: 'A2',
    topic: 'Daily Life',
    wordCount: 180,
    bodyHtml: `
      <p>Every culture has its own <span data-vocab="morning routine" data-def="a set of actions done regularly each morning">morning routine</span>. In Japan, many people start their day with a cup of green tea and a short meditation. They believe that a calm mind leads to a productive day. In contrast, Americans often rush through breakfast, grabbing coffee on the way to work.</p>
      <p>In Brazil, a typical morning includes <span data-vocab="tropical fruits" data-def="fruits that grow in hot, humid climates">tropical fruits</span> and fresh juice. Families often eat together, sharing news and making plans for the day. This <span data-vocab="communal eating" data-def="the practice of sharing meals together">communal eating</span> strengthens family bonds.</p>
      <p>In France, the morning begins with a croissant and café au lait at a local bakery. Many French people believe that breakfast should be enjoyed slowly, as a <span data-vocab="ritual" data-def="a regular practice performed with care and intention">ritual</span> rather than just fuel.</p>
      <p>Understanding different habits around the world can help us appreciate cultural <span data-vocab="diversity" data-def="the variety of differences between people and traditions">diversity</span> and improve our own daily practices.</p>
    `,
    vocab: [
      { word: 'morning routine', definition: 'A set of actions done regularly each morning' },
      { word: 'tropical fruits', definition: 'Fruits that grow in hot, humid climates' },
      { word: 'communal eating', definition: 'The practice of sharing meals together as a group' },
      { word: 'ritual', definition: 'A regular practice performed with care and intention' },
      { word: 'diversity', definition: 'The variety of differences between people, places, and traditions' },
    ],
    questions: [
      { id: 'mr-q1', question: 'What do many Japanese people drink in the morning?', options: ['Coffee', 'Green tea', 'Orange juice', 'Milk'], correctIndex: 1 },
      { id: 'mr-q2', question: 'What makes Brazilian morning meals special?', options: ['They eat alone', 'They rush to work', 'Families eat together', 'They skip breakfast'], correctIndex: 2 },
      { id: 'mr-q3', question: 'Where do French people often have breakfast?', options: ['At home alone', 'At the office', 'At a local bakery', 'In a park'], correctIndex: 2 },
    ],
  },
  {
    id: 'passage-ai-everyday',
    title: 'Artificial Intelligence in Everyday Life',
    level: 'B1',
    topic: 'Technology',
    wordCount: 260,
    bodyHtml: `
      <p><span data-vocab="Artificial Intelligence" data-def="computer systems that simulate human intelligence processes">Artificial Intelligence</span> (AI) has quietly become part of our daily lives. From the moment we wake up and check our phones to the recommendations we receive from streaming services, AI is constantly working behind the scenes.</p>
      <p>One of the most common uses of AI is in virtual <span data-vocab="assistants" data-def="software tools that respond to voice commands">assistants</span> like Siri, Alexa, and Google Assistant. These tools can answer questions, set reminders, and control smart home devices using natural language processing — the ability to understand human speech.</p>
      <p>AI also plays a major role in <span data-vocab="e-commerce" data-def="buying and selling goods over the internet">e-commerce</span>. When you shop online, AI <span data-vocab="algorithms" data-def="sets of rules a computer follows to make recommendations">algorithms</span> study your browsing history to recommend products you are likely to buy.</p>
      <p>In <span data-vocab="healthcare" data-def="the organized provision of medical care">healthcare</span>, AI systems can detect diseases from medical images with remarkable accuracy, sometimes even outperforming experienced doctors.</p>
      <p>Despite these benefits, many people worry about privacy and the ethical implications of letting machines make important decisions. The challenge for society is to use AI responsibly and <span data-vocab="sustainably" data-def="in a way that can be maintained long-term without causing harm">sustainably</span>.</p>
    `,
    vocab: [
      { word: 'Artificial Intelligence', definition: 'Computer systems that simulate human intelligence processes' },
      { word: 'assistants', definition: 'Software tools that respond to voice commands and perform tasks' },
      { word: 'e-commerce', definition: 'Buying and selling goods and services over the internet' },
      { word: 'algorithms', definition: 'Sets of rules a computer follows to solve problems or make recommendations' },
      { word: 'sustainably', definition: 'In a way that can be maintained long-term without causing harm' },
    ],
    questions: [
      { id: 'ai-q1', question: 'What is natural language processing?', options: ['Writing computer code', 'Understanding and responding to human speech', 'Translating between languages', 'Sending automated emails'], correctIndex: 1 },
      { id: 'ai-q2', question: 'How does AI personalize the shopping experience?', options: ['By shipping products faster', 'By recommending items based on your history', 'By manufacturing goods cheaper', 'By designing better websites'], correctIndex: 1 },
      { id: 'ai-q3', question: 'What is one concern about AI mentioned in the passage?', options: ['AI is too expensive', 'AI raises privacy concerns', 'AI causes traffic jams', 'AI is difficult to install'], correctIndex: 1 },
    ],
  },
  {
    id: 'passage-ocean-climate',
    title: "The Ocean: Earth's Forgotten Climate Engine",
    level: 'B2',
    topic: 'Environment',
    wordCount: 310,
    bodyHtml: `
      <p>When scientists discuss <span data-vocab="climate change" data-def="long-term shifts in global temperatures and weather patterns">climate change</span>, conversations often focus on the atmosphere. Yet the world's oceans, covering over 70% of Earth's surface, play an equally <span data-vocab="pivotal" data-def="crucially important; having a decisive influence">pivotal</span> role in regulating our planet's climate.</p>
      <p>Oceans act as the world's largest heat <span data-vocab="reservoir" data-def="a large store of something, especially energy">reservoir</span>, absorbing about 90% of the excess heat generated by greenhouse gas emissions. Without the ocean's moderating influence, coastal temperatures would be far more volatile.</p>
      <p>Furthermore, oceans absorb approximately 25–30% of the CO₂ that humans release annually. This <span data-vocab="sequestration" data-def="the process of capturing and storing carbon dioxide from the atmosphere">sequestration</span> process happens partly through the biological pump — when marine plants <span data-vocab="convert" data-def="to change something from one form into another">convert</span> CO₂ into organic matter during photosynthesis.</p>
      <p>However, increased CO₂ absorption is causing ocean <span data-vocab="acidification" data-def="the process by which oceans become more acidic due to absorbing CO₂">acidification</span>, threatening coral reefs and shellfish populations.</p>
      <p>Protecting the ocean means reducing emissions while minimising <span data-vocab="anthropogenic" data-def="originating from human activity">anthropogenic</span> stressors such as pollution and overfishing. Our oceans are not passive victims — they are complex, <span data-vocab="resilient" data-def="able to recover quickly from difficulties">resilient</span> systems that remain our greatest ally.</p>
    `,
    vocab: [
      { word: 'climate change', definition: 'Long-term shifts in global temperatures and weather patterns' },
      { word: 'pivotal', definition: 'Crucially important; having a decisive influence on outcomes' },
      { word: 'reservoir', definition: 'A large natural store of something' },
      { word: 'sequestration', definition: 'The process of capturing and storing carbon dioxide' },
      { word: 'acidification', definition: 'The process by which oceans become more acidic' },
      { word: 'anthropogenic', definition: 'Originating from or caused by human activity' },
      { word: 'resilient', definition: 'Able to recover quickly from difficulties or damage' },
    ],
    questions: [
      { id: 'oc-q1', question: 'What percentage of excess heat do oceans absorb?', options: ['50%', '70%', '90%', '25%'], correctIndex: 2 },
      { id: 'oc-q2', question: 'What role do marine plants play in carbon sequestration?', options: ['They warm the ocean surface', 'They convert CO₂ into organic matter', 'They filter pollutants from seawater', 'They transport heat between ocean layers'], correctIndex: 1 },
      { id: 'oc-q3', question: 'What does ocean acidification directly threaten?', options: ['Shipping routes', 'Coral reefs and shellfish', 'Storm patterns', 'Polar ice caps'], correctIndex: 1 },
    ],
  },
];
