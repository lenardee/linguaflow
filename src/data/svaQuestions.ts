// Subject-Verb Agreement Question Bank
// 100+ questions across 5 modules with explanations

export interface SVAQuestion {
  id: string;
  moduleId: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'true-false';
  prompt: string;
  sentence?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const svaQuestions: SVAQuestion[] = [
  // ============================================
  // MODULE 1: Basic Subject-Verb Agreement
  // ============================================
  {
    id: 'sva1-001',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'She ____ to school every day.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 1,
    explanation: 'Singular subjects (she) take the -s/-es form in present tense: "goes"',
    difficulty: 'easy',
    topic: 'Third-person singular'
  },
  {
    id: 'sva1-002',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'They ____ basketball on weekends.',
    options: ['plays', 'play', 'playing', 'played'],
    correctAnswer: 1,
    explanation: 'Plural subjects (they) use the base form of the verb: "play"',
    difficulty: 'easy',
    topic: 'Plural subjects'
  },
  {
    id: 'sva1-003',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'He ____ his homework every night.',
    options: ['do', 'does', 'doing', 'did'],
    correctAnswer: 1,
    explanation: 'Singular third-person (he) requires "does" in present tense',
    difficulty: 'easy',
    topic: 'Third-person singular'
  },
  {
    id: 'sva1-004',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The cat ____ on the sofa.',
    options: ['sleep', 'sleeps', 'sleeping', 'slept'],
    correctAnswer: 1,
    explanation: 'Singular subject (cat) takes -s form: "sleeps"',
    difficulty: 'easy',
    topic: 'Singular nouns'
  },
  {
    id: 'sva1-005',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'We ____ English every day.',
    options: ['studies', 'study', 'studying', 'studied'],
    correctAnswer: 1,
    explanation: 'Plural subject (we) uses base form: "study"',
    difficulty: 'easy',
    topic: 'Plural subjects'
  },
  {
    id: 'sva1-006',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'My sister ____ in a hospital.',
    options: ['work', 'works', 'working', 'worked'],
    correctAnswer: 1,
    explanation: 'Singular subject (sister) requires -s form: "works"',
    difficulty: 'easy',
    topic: 'Third-person singular'
  },
  {
    id: 'sva1-007',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The students ____ hard for their exams.',
    options: ['studies', 'study', 'studying', 'studied'],
    correctAnswer: 1,
    explanation: 'Plural subject (students) uses base form: "study"',
    difficulty: 'easy',
    topic: 'Plural subjects'
  },
  {
    id: 'sva1-008',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'It ____ beautiful today.',
    options: ['look', 'looks', 'looking', 'looked'],
    correctAnswer: 1,
    explanation: 'Singular pronoun (it) takes -s form: "looks"',
    difficulty: 'easy',
    topic: 'Third-person singular'
  },
  {
    id: 'sva1-009',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'You ____ a great job!',
    options: ['do', 'does', 'doing', 'did'],
    correctAnswer: 0,
    explanation: 'The pronoun "you" always takes the base form: "do"',
    difficulty: 'easy',
    topic: 'Second person'
  },
  {
    id: 'sva1-010',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The dog ____ loudly at strangers.',
    options: ['bark', 'barks', 'barking', 'barked'],
    correctAnswer: 1,
    explanation: 'Singular subject (dog) requires -s form: "barks"',
    difficulty: 'easy',
    topic: 'Singular nouns'
  },
  {
    id: 'sva1-011',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'My parents ____ in New York.',
    options: ['lives', 'live', 'living', 'lived'],
    correctAnswer: 1,
    explanation: 'Plural subject (parents) uses base form: "live"',
    difficulty: 'easy',
    topic: 'Plural subjects'
  },
  {
    id: 'sva1-012',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The teacher ____ the lesson clearly.',
    options: ['explain', 'explains', 'explaining', 'explained'],
    correctAnswer: 1,
    explanation: 'Singular subject (teacher) takes -s form: "explains"',
    difficulty: 'easy',
    topic: 'Third-person singular'
  },
  {
    id: 'sva1-013',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'I ____ coffee every morning.',
    options: ['drinks', 'drink', 'drinking', 'drank'],
    correctAnswer: 1,
    explanation: 'First person (I) uses base form: "drink"',
    difficulty: 'easy',
    topic: 'First person'
  },
  {
    id: 'sva1-014',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The birds ____ south for winter.',
    options: ['fly', 'flies', 'flying', 'flew'],
    correctAnswer: 0,
    explanation: 'Plural subject (birds) uses base form: "fly"',
    difficulty: 'easy',
    topic: 'Plural subjects'
  },
  {
    id: 'sva1-015',
    moduleId: 'sva-1',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'She ____ three languages fluently.',
    options: ['speak', 'speaks', 'speaking', 'spoke'],
    correctAnswer: 1,
    explanation: 'Singular subject (she) requires -s form: "speaks"',
    difficulty: 'easy',
    topic: 'Third-person singular'
  },

  // ============================================
  // MODULE 2: Be, Have, Do - Irregular Verbs
  // ============================================
  {
    id: 'sva2-001',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be":',
    sentence: 'I ____ happy today.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 0,
    explanation: 'First person singular (I) always uses "am"',
    difficulty: 'easy',
    topic: 'To be - present'
  },
  {
    id: 'sva2-002',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be":',
    sentence: 'She ____ a talented musician.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 1,
    explanation: 'Third person singular (she) uses "is"',
    difficulty: 'easy',
    topic: 'To be - present'
  },
  {
    id: 'sva2-003',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be":',
    sentence: 'They ____ from Canada.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 2,
    explanation: 'Plural subject (they) uses "are"',
    difficulty: 'easy',
    topic: 'To be - present'
  },
  {
    id: 'sva2-004',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be":',
    sentence: 'He ____ tired after work.',
    options: ['am', 'is', 'are', 'was'],
    correctAnswer: 1,
    explanation: 'Third person singular (he) uses "is" in present tense',
    difficulty: 'easy',
    topic: 'To be - present'
  },
  {
    id: 'sva2-005',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be":',
    sentence: 'We ____ ready for the exam.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 2,
    explanation: 'First person plural (we) uses "are"',
    difficulty: 'easy',
    topic: 'To be - present'
  },
  {
    id: 'sva2-006',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be" (past tense):',
    sentence: 'I ____ at the library yesterday.',
    options: ['was', 'were', 'am', 'is'],
    correctAnswer: 0,
    explanation: 'First person singular (I) uses "was" in past tense',
    difficulty: 'medium',
    topic: 'To be - past'
  },
  {
    id: 'sva2-007',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be" (past tense):',
    sentence: 'They ____ late to the meeting.',
    options: ['was', 'were', 'are', 'is'],
    correctAnswer: 1,
    explanation: 'Plural subject (they) uses "were" in past tense',
    difficulty: 'medium',
    topic: 'To be - past'
  },
  {
    id: 'sva2-008',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "have":',
    sentence: 'She ____ a beautiful voice.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: 'Third person singular (she) uses "has" in present tense',
    difficulty: 'easy',
    topic: 'To have - present'
  },
  {
    id: 'sva2-009',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "have":',
    sentence: 'I ____ two brothers.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 0,
    explanation: 'First person (I) uses "have" in present tense',
    difficulty: 'easy',
    topic: 'To have - present'
  },
  {
    id: 'sva2-010',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "have":',
    sentence: 'The company ____ many employees.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: 'Singular subject (company) uses "has"',
    difficulty: 'easy',
    topic: 'To have - present'
  },
  {
    id: 'sva2-011',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "do":',
    sentence: 'He ____ his homework after dinner.',
    options: ['do', 'does', 'doing', 'did'],
    correctAnswer: 1,
    explanation: 'Third person singular (he) uses "does" in present tense',
    difficulty: 'easy',
    topic: 'To do - present'
  },
  {
    id: 'sva2-012',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "do":',
    sentence: 'They ____ not understand the question.',
    options: ['do', 'does', 'doing', 'did'],
    correctAnswer: 0,
    explanation: 'Plural subject (they) uses "do" in present tense',
    difficulty: 'easy',
    topic: 'To do - present'
  },
  {
    id: 'sva2-013',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "do":',
    sentence: '____ she speak French?',
    options: ['Do', 'Does', 'Doing', 'Did'],
    correctAnswer: 1,
    explanation: 'Questions with third person singular use "Does"',
    difficulty: 'medium',
    topic: 'To do - questions'
  },
  {
    id: 'sva2-014',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form:',
    sentence: 'You ____ a great sense of humor.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 0,
    explanation: 'Second person (you) always uses "have"',
    difficulty: 'easy',
    topic: 'To have - present'
  },
  {
    id: 'sva2-015',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be":',
    sentence: 'The book ____ on the table.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 1,
    explanation: 'Singular subject (book) uses "is"',
    difficulty: 'easy',
    topic: 'To be - present'
  },
  {
    id: 'sva2-016',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form:',
    sentence: 'It ____ not matter to me.',
    options: ['do', 'does', 'doing', 'did'],
    correctAnswer: 1,
    explanation: 'Singular pronoun (it) uses "does" in negative form',
    difficulty: 'medium',
    topic: 'To do - negative'
  },
  {
    id: 'sva2-017',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be" (past):',
    sentence: 'She ____ excited about the trip.',
    options: ['was', 'were', 'is', 'are'],
    correctAnswer: 0,
    explanation: 'Third person singular (she) uses "was" in past tense',
    difficulty: 'medium',
    topic: 'To be - past'
  },
  {
    id: 'sva2-018',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form:',
    sentence: 'My friends ____ many hobbies.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 0,
    explanation: 'Plural subject (friends) uses "have"',
    difficulty: 'easy',
    topic: 'To have - present'
  },
  {
    id: 'sva2-019',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form of "be" (past):',
    sentence: 'We ____ happy with the results.',
    options: ['was', 'were', 'are', 'is'],
    correctAnswer: 1,
    explanation: 'First person plural (we) uses "were" in past tense',
    difficulty: 'medium',
    topic: 'To be - past'
  },
  {
    id: 'sva2-020',
    moduleId: 'sva-2',
    type: 'multiple-choice',
    prompt: 'Choose the correct form:',
    sentence: 'The cat ____ a long tail.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: 'Singular subject (cat) uses "has"',
    difficulty: 'easy',
    topic: 'To have - present'
  },

  // ============================================
  // MODULE 3: Compound Subjects
  // ============================================
  {
    id: 'sva3-001',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Tom and Jerry ____ best friends.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Subjects joined by "and" are always plural: "are"',
    difficulty: 'easy',
    topic: 'And - compound'
  },
  {
    id: 'sva3-002',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The teacher and the students ____ in the classroom.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Multiple subjects joined by "and" take plural verb: "are"',
    difficulty: 'easy',
    topic: 'And - compound'
  },
  {
    id: 'sva3-003',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Either you or she ____ responsible.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'With "either/or", the verb agrees with the nearest subject (she): "is"',
    difficulty: 'medium',
    topic: 'Either/or'
  },
  {
    id: 'sva3-004',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Neither the manager nor the employees ____ satisfied.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'With "neither/nor", verb agrees with nearest subject (employees): "are"',
    difficulty: 'medium',
    topic: 'Neither/nor'
  },
  {
    id: 'sva3-005',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'My brother and sister ____ coming to visit.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Subjects joined by "and" are plural: "are"',
    difficulty: 'easy',
    topic: 'And - compound'
  },
  {
    id: 'sva3-006',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Either the students or the teacher ____ wrong.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Verb agrees with nearest subject (teacher = singular): "is"',
    difficulty: 'medium',
    topic: 'Either/or'
  },
  {
    id: 'sva3-007',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Peanut butter and jelly ____ my favorite sandwich.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'When compound subjects form a single unit, use singular: "is"',
    difficulty: 'hard',
    topic: 'And - single unit'
  },
  {
    id: 'sva3-008',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Neither rain nor snow ____ me from exercising.',
    options: ['stop', 'stops', 'stopping', 'stopped'],
    correctAnswer: 1,
    explanation: 'Verb agrees with nearest subject (snow = singular): "stops"',
    difficulty: 'medium',
    topic: 'Neither/nor'
  },
  {
    id: 'sva3-009',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The doctor and scientist ____ arriving soon.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Two different people joined by "and" = plural: "are"',
    difficulty: 'easy',
    topic: 'And - compound'
  },
  {
    id: 'sva3-010',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Either the CEO or the managers ____ making the decision.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Verb agrees with nearest subject (managers = plural): "are"',
    difficulty: 'medium',
    topic: 'Either/or'
  },
  {
    id: 'sva3-011',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Bacon and eggs ____ a classic breakfast.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Traditional combination treated as single dish: "is"',
    difficulty: 'hard',
    topic: 'And - single unit'
  },
  {
    id: 'sva3-012',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Neither the director nor the actors ____ ready.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Verb agrees with nearest subject (actors = plural): "are"',
    difficulty: 'medium',
    topic: 'Neither/nor'
  },
  {
    id: 'sva3-013',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Coffee and donuts ____ available in the break room.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Two separate items: "are"',
    difficulty: 'medium',
    topic: 'And - compound'
  },
  {
    id: 'sva3-014',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Either she or they ____ going to win.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Verb agrees with nearest subject (they = plural): "are"',
    difficulty: 'medium',
    topic: 'Either/or'
  },
  {
    id: 'sva3-015',
    moduleId: 'sva-3',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Reading and writing ____ essential skills.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Two separate skills joined by "and": "are"',
    difficulty: 'easy',
    topic: 'And - compound'
  },

  // ============================================
  // MODULE 4: Collective Nouns & Tricky Cases
  // ============================================
  {
    id: 'sva4-001',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The team ____ practicing for the championship.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective nouns (team) are singular in American English: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-002',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Everyone ____ their own opinion.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: 'Indefinite pronouns (everyone) are singular: "has"',
    difficulty: 'medium',
    topic: 'Indefinite pronouns'
  },
  {
    id: 'sva4-003',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The police ____ investigating the crime.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Police is always plural: "are"',
    difficulty: 'easy',
    topic: 'Always plural'
  },
  {
    id: 'sva4-004',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The committee ____ meeting tomorrow.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective noun (committee) is singular: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-005',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Somebody ____ left their bag here.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: 'Indefinite pronoun (somebody) is singular: "has"',
    difficulty: 'medium',
    topic: 'Indefinite pronouns'
  },
  {
    id: 'sva4-006',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The family ____ going on vacation.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective noun (family) treated as single unit: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-007',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Nobody ____ the answer.',
    options: ['know', 'knows', 'knowing', 'knew'],
    correctAnswer: 1,
    explanation: 'Indefinite pronoun (nobody) is singular: "knows"',
    difficulty: 'easy',
    topic: 'Indefinite pronouns'
  },
  {
    id: 'sva4-008',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The audience ____ enjoying the performance.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective noun (audience) as single group: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-009',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Neither of the options ____ acceptable.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: '"Neither" is singular: "is"',
    difficulty: 'hard',
    topic: 'Neither/either'
  },
  {
    id: 'sva4-010',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Each of the students ____ a textbook.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: '"Each" is always singular: "has"',
    difficulty: 'medium',
    topic: 'Each/every'
  },
  {
    id: 'sva4-011',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The news ____ very disturbing.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'News is singular despite -s ending: "is"',
    difficulty: 'medium',
    topic: 'Uncountable nouns'
  },
  {
    id: 'sva4-012',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The people ____ waiting outside.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'People is always plural: "are"',
    difficulty: 'easy',
    topic: 'Always plural'
  },
  {
    id: 'sva4-013',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The staff ____ working overtime.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective noun (staff) as unit: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-014',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Anyone ____ welcome to join.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Indefinite pronoun (anyone) is singular: "is"',
    difficulty: 'easy',
    topic: 'Indefinite pronouns'
  },
  {
    id: 'sva4-015',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The jury ____ still deliberating.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective noun (jury) as single body: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-016',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Mathematics ____ my favorite subject.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Academic subjects ending in -ics are singular: "is"',
    difficulty: 'medium',
    topic: 'Subject names'
  },
  {
    id: 'sva4-017',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'None of the water ____ contaminated.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'None with uncountable noun is singular: "is"',
    difficulty: 'hard',
    topic: 'None'
  },
  {
    id: 'sva4-018',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The class ____ taking a test.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Collective noun (class) acting as unit: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva4-019',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The scissors ____ on the desk.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Scissors is always plural: "are"',
    difficulty: 'easy',
    topic: 'Always plural'
  },
  {
    id: 'sva4-020',
    moduleId: 'sva-4',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Every student and teacher ____ required to attend.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: '"Every" makes the compound subject singular: "is"',
    difficulty: 'hard',
    topic: 'Every + compound'
  },

  // ============================================
  // MODULE 5: Final Mastery Test (Advanced Mix)
  // ============================================
  {
    id: 'sva5-001',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The number of applicants ____ increasing.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: '"The number" is singular (vs "A number" which is plural): "is"',
    difficulty: 'hard',
    topic: 'The number vs A number'
  },
  {
    id: 'sva5-002',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'A number of students ____ absent today.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: '"A number" emphasizes plurality: "are"',
    difficulty: 'hard',
    topic: 'The number vs A number'
  },
  {
    id: 'sva5-003',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Neither the students nor the teacher ____ aware of the change.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Verb agrees with nearest subject (teacher): "is"',
    difficulty: 'medium',
    topic: 'Neither/nor'
  },
  {
    id: 'sva5-004',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Each of the girls ____ her own room.',
    options: ['have', 'has', 'having', 'had'],
    correctAnswer: 1,
    explanation: '"Each" is always singular: "has"',
    difficulty: 'medium',
    topic: 'Each'
  },
  {
    id: 'sva5-005',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The data ____ conclusive.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: '"Data" is technically plural (datum = singular), but "is" is acceptable in modern usage. Traditional: "are"',
    difficulty: 'hard',
    topic: 'Latin plurals'
  },
  {
    id: 'sva5-006',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Ten dollars ____ too much for that item.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Money amounts as single sum are singular: "is"',
    difficulty: 'medium',
    topic: 'Amounts as units'
  },
  {
    id: 'sva5-007',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'One of the books ____ missing.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: '"One" is the subject (not "books"): "is"',
    difficulty: 'medium',
    topic: 'One of'
  },
  {
    id: 'sva5-008',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The United States ____ a large country.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Country names are singular despite plural form: "is"',
    difficulty: 'medium',
    topic: 'Country names'
  },
  {
    id: 'sva5-009',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'There ____ many reasons for my decision.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'In "there is/are" constructions, verb agrees with what follows (reasons = plural): "are"',
    difficulty: 'medium',
    topic: 'There is/are'
  },
  {
    id: 'sva5-010',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The majority of voters ____ in favor.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: '"Majority of" takes plural when referring to individuals: "are"',
    difficulty: 'hard',
    topic: 'Majority/minority'
  },
  {
    id: 'sva5-011',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Half of the cake ____ gone.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Fractions agree with the noun (cake = singular): "is"',
    difficulty: 'hard',
    topic: 'Fractions'
  },
  {
    id: 'sva5-012',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Half of the students ____ ready.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Fractions agree with the noun (students = plural): "are"',
    difficulty: 'hard',
    topic: 'Fractions'
  },
  {
    id: 'sva5-013',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The criteria for selection ____ very strict.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Criteria is plural (criterion = singular): "are"',
    difficulty: 'hard',
    topic: 'Latin plurals'
  },
  {
    id: 'sva5-014',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Here ____ the documents you requested.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Verb agrees with subject (documents = plural): "are"',
    difficulty: 'medium',
    topic: 'Inverted order'
  },
  {
    id: 'sva5-015',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Measles ____ a contagious disease.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Disease names ending in -s are singular: "is"',
    difficulty: 'medium',
    topic: 'Disease names'
  },
  {
    id: 'sva5-016',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The couple ____ getting married next month.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Couple as single unit: "is"',
    difficulty: 'medium',
    topic: 'Collective nouns'
  },
  {
    id: 'sva5-017',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'None of the answers ____ correct.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'None with countable plural noun can be plural: "are"',
    difficulty: 'hard',
    topic: 'None'
  },
  {
    id: 'sva5-018',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The pants ____ too tight.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Pants (clothing) is always plural: "are"',
    difficulty: 'easy',
    topic: 'Always plural'
  },
  {
    id: 'sva5-019',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Five years ____ a long time to wait.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Time periods as single duration are singular: "is"',
    difficulty: 'medium',
    topic: 'Time periods'
  },
  {
    id: 'sva5-020',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'All of the information ____ confidential.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: '"All" with uncountable noun is singular: "is"',
    difficulty: 'medium',
    topic: 'All of'
  },
  {
    id: 'sva5-021',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The majority ____ voting against the proposal.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Majority without "of" phrase is singular: "is"',
    difficulty: 'hard',
    topic: 'Majority standalone'
  },
  {
    id: 'sva5-022',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Physics ____ not an easy subject.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Academic subjects in -ics are singular: "is"',
    difficulty: 'easy',
    topic: 'Subject names'
  },
  {
    id: 'sva5-023',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Everyone who attended ____ satisfied.',
    options: ['was', 'were', 'is', 'are'],
    correctAnswer: 0,
    explanation: 'Everyone is always singular: "was"',
    difficulty: 'medium',
    topic: 'Indefinite pronouns'
  },
  {
    id: 'sva5-024',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The group of tourists ____ taking photos.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Focus is on the group as unit: "is"',
    difficulty: 'medium',
    topic: 'Group of'
  },
  {
    id: 'sva5-025',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Not only the teacher but also the students ____ excited.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Verb agrees with nearest subject (students): "are"',
    difficulty: 'medium',
    topic: 'Not only...but also'
  },
  {
    id: 'sva5-026',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The media ____ covering the story extensively.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Media is technically plural (medium = singular), but "is" is common. Traditional: "are"',
    difficulty: 'hard',
    topic: 'Media/data'
  },
  {
    id: 'sva5-027',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Two-thirds of the project ____ complete.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Fractions with uncountable nouns are singular: "is"',
    difficulty: 'hard',
    topic: 'Fractions'
  },
  {
    id: 'sva5-028',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'The athletics department ____ hosting the event.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: 'Department (singular entity): "is"',
    difficulty: 'medium',
    topic: 'Organizations'
  },
  {
    id: 'sva5-029',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Where ____ the keys to the office?',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 1,
    explanation: 'Verb agrees with subject (keys = plural): "are"',
    difficulty: 'medium',
    topic: 'Questions'
  },
  {
    id: 'sva5-030',
    moduleId: 'sva-5',
    type: 'multiple-choice',
    prompt: 'Choose the correct verb:',
    sentence: 'Either of the solutions ____ acceptable.',
    options: ['is', 'are', 'was', 'be'],
    correctAnswer: 0,
    explanation: '"Either" is singular: "is"',
    difficulty: 'medium',
    topic: 'Either of'
  },
];

// Helper function to get questions by module
export const getQuestionsByModule = (moduleId: string): SVAQuestion[] => {
  return svaQuestions.filter(q => q.moduleId === moduleId);
};

// Helper function to get random questions
export const getRandomQuestions = (moduleId: string, count: number): SVAQuestion[] => {
  const moduleQuestions = getQuestionsByModule(moduleId);
  const shuffled = [...moduleQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  moduleId: string,
  difficulty: 'easy' | 'medium' | 'hard'
): SVAQuestion[] => {
  return svaQuestions.filter(q => q.moduleId === moduleId && q.difficulty === difficulty);
};
