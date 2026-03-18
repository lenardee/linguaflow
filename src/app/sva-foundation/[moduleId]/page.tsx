'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useSVAStore } from '@/store/svaStore';
import { getModuleById, getNextModule } from '@/data/svaModules';
import { getRandomQuestions, SVAQuestion } from '@/data/svaQuestions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen, PenTool } from 'lucide-react';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  
  const {
    startModule,
    completeModule,
    setCurrentQuestion,
    recordAnswer,
    resetSession,
    sessionAnswers,
    currentQuestion,
  } = useSVAStore();

  const [view, setView] = useState<'explanation' | 'exercise'>('explanation');
  const [questions, setQuestions] = useState<SVAQuestion[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());

  const module = getModuleById(moduleId);

  useEffect(() => {
    if (module) {
      startModule(module.id);
      setStartTime(Date.now());
      
      // Generate questions for this module
      const moduleQuestions = getRandomQuestions(module.id, module.exercises.count);
      setQuestions(moduleQuestions);
    }
  }, [module?.id]);

  if (!module) {
    return <div>Module not found</div>;
  }

  const handleStartExercises = () => {
    resetSession();
    setView('exercise');
    setCurrentQuestion(0);
  };

  const handleAnswer = (selectedAnswer: number) => {
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    recordAnswer(currentQuestion, selectedAnswer, isCorrect);
    setShowFeedback(true);
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
      } else {
        // Calculate final score
        const correctAnswers = Object.values(sessionAnswers).filter(a => a.correct).length + (isCorrect ? 1 : 0);
        const score = Math.round((correctAnswers / questions.length) * 100);
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        completeModule(module.id, score, timeSpent);
        
        // Navigate to results
        router.push(`/sva-foundation/${moduleId}/results?score=${score}`);
      }
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/sva-foundation')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>
          
          <Badge variant="secondary">
            Module {module.order} of 5
          </Badge>
        </div>

        {/* Title & Progress */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
          <p className="text-gray-600 mb-4">{module.description}</p>
          
          {view === 'exercise' && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  {Object.values(sessionAnswers).filter(a => a.correct).length} correct
                </span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={view === 'explanation' ? 'default' : 'outline'}
            onClick={() => setView('explanation')}
            className="flex-1"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Explanation
          </Button>
          <Button
            variant={view === 'exercise' ? 'default' : 'outline'}
            onClick={handleStartExercises}
            className="flex-1"
          >
            <PenTool className="w-4 h-4 mr-2" />
            Exercises
          </Button>
        </div>

        {/* Content */}
        <Card className="p-8 bg-white/80 backdrop-blur">
          {view === 'explanation' ? (
            <ExplanationView module={module} onStart={handleStartExercises} />
          ) : (
            <ExerciseView
              question={questions[currentQuestion]}
              onAnswer={handleAnswer}
              showFeedback={showFeedback}
              selectedAnswer={sessionAnswers[currentQuestion]?.selected}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

// Explanation View Component
function ExplanationView({ module, onStart }: any) {
  return (
    <div className="space-y-8">
      {/* Topics */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">📚</span>
          What You'll Learn
        </h2>
        <ul className="space-y-3">
          {module.topics.map((topic: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3 bg-purple-50 rounded-lg p-4">
              <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-800 font-medium">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Examples */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-3xl">💡</span>
          Examples
        </h2>
        <div className="space-y-4">
          {module.examples.map((example: any, idx: number) => (
            <div key={idx} className="border-l-4 border-purple-500 bg-purple-50 p-5 rounded-r-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-100 px-4 py-2 rounded-lg font-mono font-semibold">
                  {example.subject}
                </span>
                <span className="text-3xl text-purple-600">+</span>
                <span className="bg-green-100 px-4 py-2 rounded-lg font-mono font-semibold">
                  {example.verb}
                </span>
              </div>
              <p className="text-sm text-gray-600 italic mb-2">
                Rule: {example.rule}
              </p>
              {example.sentence && (
                <p className="text-gray-800 font-medium">
                  Example: "{example.sentence}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visual Aids */}
      {module.visualAids && module.visualAids.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">📊</span>
            Reference Tables
          </h2>
          {module.visualAids.map((aid: any, idx: number) => (
            <div key={idx} className="mb-6">
              <h3 className="font-semibold text-lg mb-3">{aid.title}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead className="bg-purple-600 text-white">
                    <tr>
                      {aid.data.headers.map((header: string, i: number) => (
                        <th key={i} className="px-6 py-3 text-left font-semibold">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {aid.data.rows.map((row: string[], i: number) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        {row.map((cell: string, j: number) => (
                          <td key={j} className="px-6 py-3 border-t">
                            <span className={j === 1 ? 'font-mono font-semibold text-purple-600' : ''}>
                              {cell}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Common Errors */}
      {module.commonErrors && module.commonErrors.length > 0 && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-800 flex items-center gap-2">
            <span className="text-3xl">⚠️</span>
            Common Mistakes to Avoid
          </h2>
          <ul className="space-y-3">
            {module.commonErrors.map((error: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-gray-800">
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="font-mono text-sm">{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Start Button */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 text-center">
        <h3 className="font-bold text-xl mb-2">Ready to Practice?</h3>
        <p className="text-gray-700 mb-4">
          Complete {module.exercises.count} questions to test your understanding
        </p>
        <Button onClick={onStart} size="lg" className="px-8">
          Start Exercises
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Exercise View Component
function ExerciseView({ question, onAnswer, showFeedback, selectedAnswer }: any) {
  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* Question */}
      <div>
        <h2 className="text-xl font-bold mb-4">{question.prompt}</h2>
        {question.sentence && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-mono leading-relaxed">
              {question.sentence.split('____').map((part: string, idx: number, arr: string[]) => (
                <span key={idx}>
                  {part}
                  {idx < arr.length - 1 && (
                    <span className="inline-block mx-2 px-4 py-1 bg-yellow-200 border-b-2 border-yellow-400 rounded">
                      ___
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option: string, idx: number) => (
          <button
            key={idx}
            onClick={() => !showFeedback && onAnswer(idx)}
            disabled={showFeedback}
            className={`
              p-5 rounded-lg border-2 text-left transition-all text-lg font-medium
              ${showFeedback && idx === question.correctAnswer
                ? 'bg-green-100 border-green-500'
                : showFeedback && idx === selectedAnswer && idx !== question.correctAnswer
                ? 'bg-red-100 border-red-500'
                : 'bg-white border-gray-300 hover:border-purple-500 hover:shadow-md'
              }
              ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono">{option}</span>
              {showFeedback && idx === question.correctAnswer && (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              )}
              {showFeedback && idx === selectedAnswer && idx !== question.correctAnswer && (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`
          rounded-lg p-5 border-2
          ${selectedAnswer === question.correctAnswer
            ? 'bg-green-50 border-green-300'
            : 'bg-red-50 border-red-300'}
        `}>
          <p className="font-bold text-lg mb-2 flex items-center gap-2">
            {selectedAnswer === question.correctAnswer ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Correct!
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600" />
                Incorrect
              </>
            )}
          </p>
          <p className="text-gray-800">{question.explanation}</p>
        </div>
      )}

      {/* Difficulty Badge */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Topic: {question.topic}</span>
        <Badge variant="outline">
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </Badge>
      </div>
    </div>
  );
}
