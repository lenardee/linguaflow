'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSVAStore } from '@/src/store/svaStore';
import { svaModules, getModuleById, getNextModule } from '@/src/data/svaModules';
import { getQuestionsByModule, getRandomQuestions } from '@/src/data/svaQuestions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Lock, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';

export default function SVAFoundationPage() {
  const router = useRouter();
  const {
    modules,
    currentModuleId,
    startModule,
    getTotalProgress,
    isProficient,
  } = useSVAStore();

  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const totalProgress = getTotalProgress();

  // Auto-select first incomplete module
  useEffect(() => {
    if (!selectedModule) {
      const firstIncomplete = svaModules.find(m => !modules[m.id]?.completed);
      if (firstIncomplete) {
        setSelectedModule(firstIncomplete.id);
      } else {
        // All modules complete, select final test
        setSelectedModule('sva-5');
      }
    }
  }, [modules, selectedModule]);

  const handleStartModule = (moduleId: string) => {
    startModule(moduleId);
    router.push(`/sva-foundation/${moduleId}`);
  };

  const handleContinueToWeek1 = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Subject-Verb Agreement Foundation
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Master the heart of English grammar before starting your 8-week journey
          </p>

          {/* Overall Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-purple-600">{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
            <p className="text-xs text-gray-600 mt-2">
              {isProficient 
                ? '🎉 Proficient! You can start Week 1'
                : `Complete all modules with 85%+ on the final test to unlock Week 1`
              }
            </p>
          </div>
        </div>

        {/* Module Grid */}
        <div className="grid md:grid-2 lg:grid-cols-3 gap-6 mb-12">
          {svaModules.map((module) => {
            const progress = modules[module.id];
            const isCompleted = progress?.completed || false;
            const score = progress?.score || 0;
            const attempts = progress?.attempts || 0;
            const isLocked = module.order > 1 && !modules[svaModules[module.order - 2].id]?.completed;
            const isFinalTest = module.id === 'sva-5';

            return (
              <Card 
                key={module.id}
                className={`p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${
                  selectedModule === module.id 
                    ? 'border-purple-500 shadow-lg' 
                    : isCompleted 
                    ? 'border-green-300' 
                    : 'border-gray-200'
                } ${isLocked ? 'opacity-50' : ''}`}
                onClick={() => !isLocked && setSelectedModule(module.id)}
              >
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={isFinalTest ? 'destructive' : 'secondary'}>
                        Module {module.order}
                      </Badge>
                      {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{module.title}</h3>
                    <p className="text-sm text-gray-600">{module.duration}</p>
                  </div>
                  
                  {/* Status Icon */}
                  <div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    ) : (
                      <Circle className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-4">{module.description}</p>

                {/* Progress Info */}
                {attempts > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Best Score:</span>
                      <span className={`font-bold ${score >= module.passingScore ? 'text-green-600' : 'text-orange-600'}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Attempts:</span>
                      <span className="font-semibold">{attempts}</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                )}

                {/* Action Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartModule(module.id);
                  }}
                  disabled={isLocked}
                  className="w-full mt-4"
                  variant={isCompleted ? 'outline' : 'default'}
                >
                  {isLocked ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Locked
                    </>
                  ) : isCompleted ? (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake
                    </>
                  ) : attempts > 0 ? (
                    <>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Start Module
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Module Preview (Selected) */}
        {selectedModule && (
          <Card className="p-8 border-2 border-purple-500 bg-white/80 backdrop-blur">
            <ModulePreview moduleId={selectedModule} />
          </Card>
        )}

        {/* Proficiency Badge */}
        {isProficient && (
          <div className="fixed bottom-8 right-8 z-50">
            <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-12 h-12" />
                <div>
                  <h3 className="font-bold text-xl mb-1">You're Proficient!</h3>
                  <p className="text-sm mb-3">Ready to start the 8-week program</p>
                  <Button 
                    onClick={handleContinueToWeek1}
                    variant="secondary"
                    className="w-full"
                  >
                    Continue to Week 1
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Module Preview Component
function ModulePreview({ moduleId }: { moduleId: string }) {
  const module = getModuleById(moduleId);
  if (!module) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{module.title}</h2>
      
      {/* Topics Covered */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">📚 Topics Covered:</h3>
        <ul className="grid md:grid-cols-2 gap-2">
          {module.topics.map((topic, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{topic}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Examples */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">💡 Examples:</h3>
        <div className="space-y-3">
          {module.examples.slice(0, 3).map((example, idx) => (
            <div key={idx} className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-1">
                <span className="bg-blue-100 px-3 py-1 rounded font-mono text-sm">
                  {example.subject}
                </span>
                <span className="text-2xl">+</span>
                <span className="bg-green-100 px-3 py-1 rounded font-mono text-sm">
                  {example.verb}
                </span>
              </div>
              <p className="text-sm text-gray-600 italic">
                {example.rule}
              </p>
              {example.sentence && (
                <p className="text-sm text-gray-700 mt-2">
                  "{example.sentence}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          🎯 Requirements:
        </h3>
        <ul className="space-y-1 text-sm text-gray-700">
          <li>• Complete {module.exercises.count} practice questions</li>
          <li>• Score {module.passingScore}% or higher to pass</li>
          <li>• Estimated time: {module.duration}</li>
          {module.id === 'sva-5' && (
            <li className="text-red-600 font-semibold">
              • Must score 85%+ to unlock Week 1 of the main program
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
