'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSVAStore } from '@/src/store/svaStore';
import { getModuleById, getNextModule } from '@/src/data/svaModules';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResultsPage({ params }: { params: { moduleId: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const moduleId = params.moduleId;
  const score = parseInt(searchParams.get('score') || '0');

  const { modules, sessionAnswers, isProficient } = useSVAStore();
  const module = getModuleById(moduleId);
  const nextModule = getNextModule(moduleId);

  const [showConfetti, setShowConfetti] = useState(false);

  const passed = module ? score >= module.passingScore : false;
  const isFinalTest = moduleId === 'sva-5';
  const unlockedWeek1 = isFinalTest && score >= 85;

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [passed]);

  if (!module) return <div>Module not found</div>;

  const totalQuestions = Object.keys(sessionAnswers).length;
  const correctAnswers = Object.values(sessionAnswers).filter(a => a.correct).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Results Card */}
        <Card className={`p-8 text-center mb-8 border-4 ${
          passed ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'
        }`}>
          {/* Trophy/Badge */}
          <div className="mb-6">
            {passed ? (
              <Trophy className="w-24 h-24 mx-auto text-yellow-500" />
            ) : (
              <XCircle className="w-24 h-24 mx-auto text-orange-500" />
            )}
          </div>

          {/* Result Message */}
          <h1 className={`text-4xl font-bold mb-4 ${
            passed ? 'text-green-700' : 'text-orange-700'
          }`}>
            {passed ? '🎉 Congratulations!' : '📝 Keep Practicing'}
          </h1>
          
          <p className="text-xl text-gray-700 mb-6">
            {passed 
              ? `You passed ${module.title}!`
              : `You scored ${score}%, need ${module.passingScore}% to pass`
            }
          </p>

          {/* Score Display */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">Your Score</span>
              <span className={`text-3xl font-bold ${
                passed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {score}%
              </span>
            </div>
            <Progress value={score} className="h-4" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Passing Score: {module.passingScore}%</span>
              <span>{correctAnswers}/{totalQuestions} correct</span>
            </div>
          </div>

          {/* Special Message for Final Test */}
          {isFinalTest && (
            <div className={`rounded-lg p-6 ${
              unlockedWeek1 
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-500'
                : 'bg-yellow-100 border-2 border-yellow-500'
            }`}>
              {unlockedWeek1 ? (
                <>
                  <h2 className="text-2xl font-bold text-green-800 mb-2">
                    🎊 You're Proficient in SVA!
                  </h2>
                  <p className="text-green-700 mb-4">
                    You've mastered the foundation of English grammar. 
                    You're ready to start the 8-week program!
                  </p>
                  <Button 
                    onClick={() => router.push('/dashboard')}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Start Week 1
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-yellow-800 mb-2">
                    ⚠️ 85% Required to Unlock Week 1
                  </h2>
                  <p className="text-yellow-700">
                    You scored {score}%. You need at least 85% on the final test 
                    to start the 8-week program. Keep practicing!
                  </p>
                </>
              )}
            </div>
          )}
        </Card>

        {/* Breakdown */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Performance Breakdown</h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-red-600">{incorrectAnswers}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-600">{score}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
          </div>

          {/* Attempts */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Attempts:</span>
              <Badge variant="secondary">{modules[moduleId]?.attempts || 1}</Badge>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/sva-foundation/${moduleId}`)}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Module
          </Button>

          {passed && nextModule ? (
            <Button
              size="lg"
              onClick={() => router.push(`/sva-foundation/${nextModule.id}`)}
            >
              Next Module: {nextModule.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/sva-foundation')}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Modules
            </Button>
          )}
        </div>

        {/* Progress Summary */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-purple-100 to-pink-100">
          <h3 className="font-bold text-lg mb-3">Your SVA Journey</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((order) => {
              const mod = getModuleById(`sva-${order}`);
              const modProgress = modules[`sva-${order}`];
              const completed = modProgress?.completed || false;
              
              return (
                <div key={order} className="flex items-center justify-between">
                  <span className={completed ? 'text-green-700 font-semibold' : 'text-gray-600'}>
                    {completed && <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-600" />}
                    Module {order}: {mod?.title}
                  </span>
                  <span className={`font-mono ${completed ? 'text-green-600' : 'text-gray-400'}`}>
                    {modProgress?.score || 0}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
