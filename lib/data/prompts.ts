import type { WritingPrompt } from '@/types';

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'wp-travel-memory',
    text: 'Describe a place that has had a significant impact on your life. Why is it meaningful to you? Include specific details about what it looks, sounds, and feels like.',
    level: 'B1', type: 'Descriptive', targetWords: 150,
    tips: ['Use all five senses', 'Include one specific memory from this place', 'End with why it still matters to you today'],
  },
  {
    id: 'wp-social-media',
    text: 'Do you think social media has made people more connected or more isolated? Use specific examples from your own experience to support your view.',
    level: 'B2', type: 'Opinion', targetWords: 200,
    tips: ['State your position clearly in the first sentence', 'Give at least two concrete examples', 'Acknowledge the opposing view before concluding'],
  },
  {
    id: 'wp-difficult-decision',
    text: 'Write about a time when you had to make a difficult decision. What were your options? What did you choose, and what was the outcome?',
    level: 'B1', type: 'Narrative', targetWords: 180,
    tips: ['Use past tense consistently', 'Include what you felt at the time', 'Use narrative connectors: first, then, after that, eventually'],
  },
  {
    id: 'wp-education-change',
    text: "If you could change one thing about your country's education system, what would it be and why? How would this change benefit students and society?",
    level: 'B2', type: 'Opinion', targetWords: 200,
    tips: ['Be specific about the change', "Use hedging language: 'This would likely...', 'In many cases...'", 'End with the long-term impact'],
  },
  {
    id: 'wp-ideal-day',
    text: 'Describe your perfect day from morning to night. Where would you go? What would you do? Who would you spend it with?',
    level: 'A2', type: 'Descriptive', targetWords: 120,
    tips: ['Use time expressions: in the morning, at noon, by evening', 'Include at least three different activities', 'Describe how you feel during each part'],
  },
  {
    id: 'wp-creative-story',
    text: 'Write a short story that begins with this sentence: "The morning the power went out forever, she finally learned how to listen."',
    level: 'B2', type: 'Creative', targetWords: 250,
    tips: ['Start in the middle of the action', 'Show character through action and dialogue', 'Every sentence should move the story forward'],
  },
  {
    id: 'wp-healthy-habits',
    text: 'What habits or daily routines do you believe are most important for a healthy and productive life? Explain why you chose these.',
    level: 'A2', type: 'Opinion', targetWords: 130,
    tips: ['Choose 2–3 habits maximum', "Use personal examples: 'I have found that...'", 'Link each habit to a specific benefit'],
  },
];
