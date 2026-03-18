// SVA Module Configuration
// Defines the structure, content, and requirements for each module

export interface SVAExample {
  subject: string;
  verb: string;
  rule: string;
  sentence?: string;
}

export interface SVAModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  examples: SVAExample[];
  commonErrors?: string[];
  visualAids?: {
    title: string;
    type: 'table' | 'chart' | 'diagram';
    data: any;
  }[];
  exercises: {
    count: number;
    difficulty: 'mixed' | 'easy' | 'medium' | 'hard';
  };
  passingScore: number; // Minimum percentage to pass
  order: number;
}

export const svaModules: SVAModule[] = [
  {
    id: 'sva-1',
    title: 'Basic Subject-Verb Agreement',
    duration: '5 min',
    description: 'Master the fundamentals of matching subjects with the correct verb forms in present tense.',
    order: 1,
    topics: [
      'Singular vs Plural subjects',
      'Third-person singular (-s/-es rule)',
      'Present tense agreement',
      'Base form vs inflected form'
    ],
    examples: [
      { subject: 'He', verb: 'works', rule: 'singular → add -s', sentence: 'He works at a bank.' },
      { subject: 'They', verb: 'work', rule: 'plural → base form', sentence: 'They work together.' },
      { subject: 'She', verb: 'studies', rule: 'consonant + y → -ies', sentence: 'She studies hard.' },
      { subject: 'The cat', verb: 'sleeps', rule: 'singular noun → -s', sentence: 'The cat sleeps all day.' },
    ],
    commonErrors: [
      '❌ "She go to school" → ✅ "She goes to school"',
      '❌ "They goes shopping" → ✅ "They go shopping"',
      '❌ "He study English" → ✅ "He studies English"',
    ],
    visualAids: [
      {
        title: 'Subject-Verb Agreement Chart',
        type: 'table',
        data: {
          headers: ['Subject', 'Verb Form', 'Example'],
          rows: [
            ['I', 'work', 'I work hard'],
            ['You', 'work', 'You work hard'],
            ['He/She/It', 'works', 'He works hard'],
            ['We', 'work', 'We work hard'],
            ['They', 'work', 'They work hard'],
          ]
        }
      }
    ],
    exercises: {
      count: 15,
      difficulty: 'easy'
    },
    passingScore: 70
  },

  {
    id: 'sva-2',
    title: 'Irregular Verbs: Be, Have, Do',
    duration: '5 min',
    description: 'Learn the three most important irregular verbs and their agreement patterns.',
    order: 2,
    topics: [
      'To be: am/is/are, was/were',
      'To have: has/have, had',
      'To do: does/do, did',
      'Present and past tense forms'
    ],
    examples: [
      { subject: 'I', verb: 'am', rule: 'I → am (always)', sentence: 'I am happy.' },
      { subject: 'He', verb: 'is', rule: 'he/she/it → is', sentence: 'He is a doctor.' },
      { subject: 'They', verb: 'are', rule: 'plural → are', sentence: 'They are students.' },
      { subject: 'She', verb: 'has', rule: 'he/she/it → has', sentence: 'She has a car.' },
      { subject: 'We', verb: 'have', rule: 'plural → have', sentence: 'We have plans.' },
      { subject: 'He', verb: 'does', rule: 'he/she/it → does', sentence: 'He does his homework.' },
    ],
    commonErrors: [
      '❌ "I is happy" → ✅ "I am happy"',
      '❌ "She have a book" → ✅ "She has a book"',
      '❌ "He do not know" → ✅ "He does not know"',
      '❌ "They was there" → ✅ "They were there"',
    ],
    visualAids: [
      {
        title: 'To Be - Present & Past',
        type: 'table',
        data: {
          headers: ['Subject', 'Present', 'Past'],
          rows: [
            ['I', 'am', 'was'],
            ['You', 'are', 'were'],
            ['He/She/It', 'is', 'was'],
            ['We', 'are', 'were'],
            ['They', 'are', 'were'],
          ]
        }
      },
      {
        title: 'To Have & To Do',
        type: 'table',
        data: {
          headers: ['Subject', 'Have', 'Do'],
          rows: [
            ['I/You/We/They', 'have', 'do'],
            ['He/She/It', 'has', 'does'],
          ]
        }
      }
    ],
    exercises: {
      count: 20,
      difficulty: 'easy'
    },
    passingScore: 70
  },

  {
    id: 'sva-3',
    title: 'Compound Subjects',
    duration: '4 min',
    description: 'Handle subjects joined by "and", "or", "neither/nor", and "either/or".',
    order: 3,
    topics: [
      'And (always plural): Tom and Jerry are...',
      'Or/Nor (nearest subject): Neither she nor they are...',
      'Either/Or: Either you or he is...',
      'Special cases: single-unit compounds'
    ],
    examples: [
      { subject: 'Tom and Jerry', verb: 'are', rule: 'and → plural', sentence: 'Tom and Jerry are friends.' },
      { subject: 'Either you or she', verb: 'is', rule: 'nearest = she', sentence: 'Either you or she is right.' },
      { subject: 'Neither he nor they', verb: 'are', rule: 'nearest = they', sentence: 'Neither he nor they are coming.' },
      { subject: 'Peanut butter and jelly', verb: 'is', rule: 'single unit', sentence: 'Peanut butter and jelly is tasty.' },
    ],
    commonErrors: [
      '❌ "Tom and Jerry is here" → ✅ "Tom and Jerry are here"',
      '❌ "Either she or they is" → ✅ "Either she or they are"',
      '❌ "Neither you nor he are" → ✅ "Neither you nor he is"',
    ],
    visualAids: [
      {
        title: 'Compound Subject Rules',
        type: 'table',
        data: {
          headers: ['Conjunction', 'Rule', 'Example'],
          rows: [
            ['and', 'Always plural', 'Tom and Mary are happy'],
            ['or', 'Match nearest', 'You or she is correct'],
            ['nor', 'Match nearest', 'Neither he nor they are ready'],
            ['either/or', 'Match nearest', 'Either they or he is going'],
          ]
        }
      }
    ],
    exercises: {
      count: 15,
      difficulty: 'medium'
    },
    passingScore: 70
  },

  {
    id: 'sva-4',
    title: 'Collective Nouns & Tricky Cases',
    duration: '6 min',
    description: 'Navigate challenging cases like collective nouns, indefinite pronouns, and special plurals.',
    order: 4,
    topics: [
      'Collective nouns (team, family, group) → singular in US English',
      'Always plural (police, people, scissors)',
      'Indefinite pronouns (everyone, somebody, nobody) → singular',
      'Special cases (none, data, media, criteria)'
    ],
    examples: [
      { subject: 'The team', verb: 'is', rule: 'collective → singular', sentence: 'The team is winning.' },
      { subject: 'Everyone', verb: 'has', rule: 'indefinite → singular', sentence: 'Everyone has a ticket.' },
      { subject: 'The police', verb: 'are', rule: 'always plural', sentence: 'The police are investigating.' },
      { subject: 'People', verb: 'are', rule: 'always plural', sentence: 'People are waiting.' },
    ],
    commonErrors: [
      '❌ "The team are playing" → ✅ "The team is playing" (US English)',
      '❌ "Everyone have finished" → ✅ "Everyone has finished"',
      '❌ "The police is coming" → ✅ "The police are coming"',
      '❌ "People is waiting" → ✅ "People are waiting"',
    ],
    visualAids: [
      {
        title: 'Collective Nouns (Singular in US)',
        type: 'table',
        data: {
          headers: ['Collective Noun', 'Verb', 'Example'],
          rows: [
            ['team', 'is', 'The team is practicing'],
            ['family', 'is', 'The family is eating'],
            ['committee', 'is', 'The committee is meeting'],
            ['audience', 'is', 'The audience is clapping'],
          ]
        }
      },
      {
        title: 'Always Plural',
        type: 'table',
        data: {
          headers: ['Word', 'Verb', 'Example'],
          rows: [
            ['police', 'are', 'The police are here'],
            ['people', 'are', 'People are talking'],
            ['scissors', 'are', 'The scissors are sharp'],
            ['pants', 'are', 'The pants are new'],
          ]
        }
      }
    ],
    exercises: {
      count: 20,
      difficulty: 'medium'
    },
    passingScore: 75
  },

  {
    id: 'sva-5',
    title: 'Final Mastery Test',
    duration: '10 min',
    description: 'Comprehensive assessment covering all SVA rules. You must score 85% to unlock the 8-week program.',
    order: 5,
    topics: [
      'All previous topics combined',
      'Advanced cases: the number vs a number',
      'Inverted sentences (there is/are, here is/are)',
      'Fractions and percentages',
      'Latin plurals (criteria, data, media)',
      'Tricky singular forms (news, mathematics, measles)'
    ],
    examples: [
      { subject: 'The number of students', verb: 'is', rule: '"the number" is singular', sentence: 'The number is increasing.' },
      { subject: 'A number of students', verb: 'are', rule: '"a number" is plural', sentence: 'A number are absent.' },
      { subject: 'There', verb: 'are many options', rule: 'verb matches "options"', sentence: 'There are many options.' },
      { subject: 'Half of the cake', verb: 'is', rule: 'fraction + singular', sentence: 'Half of the cake is gone.' },
    ],
    commonErrors: [
      '❌ "The number of people are" → ✅ "The number of people is"',
      '❌ "There is many problems" → ✅ "There are many problems"',
      '❌ "The data is conclusive" → ✅ "The data are conclusive" (formal)',
      '❌ "Ten dollars are enough" → ✅ "Ten dollars is enough"',
    ],
    visualAids: [
      {
        title: 'Advanced Tricky Cases',
        type: 'table',
        data: {
          headers: ['Expression', 'Verb', 'Why?'],
          rows: [
            ['The number', 'is', 'Focuses on "number" (singular)'],
            ['A number', 'are', 'Focuses on quantity (plural)'],
            ['The majority', 'is', 'When standalone'],
            ['The majority of X', 'matches X', 'Depends on noun after "of"'],
            ['Ten dollars', 'is', 'Amount as single sum'],
            ['Criteria', 'are', 'Plural form (criterion = singular)'],
          ]
        }
      }
    ],
    exercises: {
      count: 30,
      difficulty: 'mixed'
    },
    passingScore: 85 // MUST PASS to unlock Week 1
  },
];

// Helper functions
export const getModuleById = (id: string): SVAModule | undefined => {
  return svaModules.find(m => m.id === id);
};

export const getModuleByOrder = (order: number): SVAModule | undefined => {
  return svaModules.find(m => m.order === order);
};

export const getTotalModules = (): number => {
  return svaModules.length;
};

export const getNextModule = (currentId: string): SVAModule | null => {
  const current = svaModules.find(m => m.id === currentId);
  if (!current || current.order >= svaModules.length) return null;
  return getModuleByOrder(current.order + 1) || null;
};

export const isProficient = (moduleScores: Record<string, number>): boolean => {
  const finalModule = svaModules.find(m => m.order === 5);
  if (!finalModule) return false;
  return (moduleScores[finalModule.id] || 0) >= finalModule.passingScore;
};
