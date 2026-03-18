'use client';

import { useRouter } from 'next/navigation';
import { useSVAStore } from '@/store/svaStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, ArrowRight, XCircle } from 'lucide-react';

export default function SVARequirementSection() {
  const router = useRouter();
  const { isProficient, getTotalProgress, modules } = useSVAStore();
  
  const totalProgress = getTotalProgress();
  const finalTestScore = modules['sva-5']?.score || 0;

  return (
    <section className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Main Container */}
        <div className="max-w-4xl mx-auto">
          {/* Alert Badge */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex items-center px-6 py-3 rounded-full ${
              isProficient 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isProficient ? (
                <>
                  <CheckCircle2 className="w-6 h-6 mr-3" />
                  <span className="font-bold text-lg">Foundation Complete ✓</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 mr-3" />
                  <span className="font-bold text-lg">Foundation Required</span>
                </>
              )}
            </div>
          </div>

          {/* Main Card */}
          <Card className={`p-8 md:p-12 border-4 ${
            isProficient ? 'border-green-500' : 'border-purple-500'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              {isProficient 
                ? "You're Ready for Week 1! 🎉"
                : "Master Subject-Verb Agreement First"
              }
            </h2>
            
            <p className="text-xl text-gray-700 mb-8 text-center">
              {isProficient ? (
                <>
                  Congratulations! You've mastered the foundation of English grammar. 
                  You can now start your 8-week journey to fluency.
                </>
              ) : (
                <>
                  <strong>Why this matters:</strong> 90% of English grammar errors come from 
                  incorrect subject-verb agreement. You cannot be truly proficient without 
                  mastering this foundation.
                </>
              )}
            </p>

            {/* Progress Section */}
            {!isProficient && (
              <>
                {/* Common Mistakes Examples */}
                <div className="bg-white rounded-lg p-6 mb-8 border-l-4 border-red-500">
                  <h3 className="font-bold text-lg mb-4 text-red-800">
                    ❌ Common Mistakes Non-Proficient Speakers Make
                  </h3>
                  <div className="space-y-3">
                    <ErrorExample 
                      wrong="She go to school every day"
                      right="She goes to school every day"
                    />
                    <ErrorExample 
                      wrong="They was happy"
                      right="They were happy"
                    />
                    <ErrorExample 
                      wrong="The team are playing well"
                      right="The team is playing well"
                    />
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Your Progress</h3>
                    <Badge variant="secondary">
                      {Math.round(totalProgress)}% Complete
                    </Badge>
                  </div>
                  <Progress value={totalProgress} className="h-3 mb-4" />
                  
                  {/* Module Status */}
                  <div className="grid md:grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const moduleProgress = modules[`sva-${num}`];
                      const completed = moduleProgress?.completed || false;
                      const score = moduleProgress?.score || 0;
                      const isFinal = num === 5;
                      
                      return (
                        <div 
                          key={num}
                          className={`p-3 rounded-lg text-center border-2 ${
                            completed 
                              ? 'bg-green-50 border-green-300' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="font-bold text-sm mb-1">M{num}</div>
                          {completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-300 mx-auto mb-1" />
                          )}
                          <div className={`text-xs font-semibold ${
                            completed ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            {score}%
                          </div>
                          {isFinal && (
                            <div className="text-xs text-purple-600 font-bold mt-1">
                              Need 85%
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="w-5 h-5" />
                    Requirements to Unlock Week 1
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className={modules['sva-1']?.completed ? '✅' : '⏳'}>
                        {modules['sva-1']?.completed ? '✅' : '⏳'}
                      </span>
                      <span>Complete Module 1: Basic Subject-Verb Agreement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={modules['sva-2']?.completed ? '✅' : '⏳'}>
                        {modules['sva-2']?.completed ? '✅' : '⏳'}
                      </span>
                      <span>Complete Module 2: Irregular Verbs (Be, Have, Do)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={modules['sva-3']?.completed ? '✅' : '⏳'}>
                        {modules['sva-3']?.completed ? '✅' : '⏳'}
                      </span>
                      <span>Complete Module 3: Compound Subjects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={modules['sva-4']?.completed ? '✅' : '⏳'}>
                        {modules['sva-4']?.completed ? '✅' : '⏳'}
                      </span>
                      <span>Complete Module 4: Collective Nouns & Tricky Cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className={finalTestScore >= 85 ? '✅' : '⏳'}>
                        {finalTestScore >= 85 ? '✅' : '⏳'}
                      </span>
                      <span className="font-bold text-red-600">
                        Score 85%+ on Module 5: Final Mastery Test
                        {finalTestScore > 0 && finalTestScore < 85 && (
                          <span className="ml-2 text-orange-600">
                            (Current: {finalTestScore}%)
                          </span>
                        )}
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {/* CTA Button */}
            <div className="text-center">
              <Button
                onClick={() => router.push(isProficient ? '/dashboard' : '/sva-foundation')}
                size="lg"
                className={`px-12 py-6 text-xl font-bold ${
                  isProficient 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isProficient ? (
                  <>
                    Start Week 1 of Your Journey
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </>
                ) : modules['sva-1'] ? (
                  <>
                    Continue SVA Training
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </>
                ) : (
                  <>
                    Start SVA Foundation (20-30 min)
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </>
                )}
              </Button>
            </div>

            {/* Why It Matters */}
            {!isProficient && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-xl mb-4 text-center">
                  Why SVA is Non-Negotiable
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-semibold mb-2">Foundation of Grammar</h4>
                    <p className="text-sm text-gray-600">
                      SVA is the most fundamental rule in English. Without it, 
                      all other grammar becomes meaningless.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">💼</div>
                    <h4 className="font-semibold mb-2">Professional Credibility</h4>
                    <p className="text-sm text-gray-600">
                      Incorrect SVA immediately signals non-proficiency and can 
                      hurt your career prospects.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <h4 className="font-semibold mb-2">Accelerate Learning</h4>
                    <p className="text-sm text-gray-600">
                      Master SVA now and the rest of the 8-week program will be 
                      dramatically easier.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

// Error Example Component
function ErrorExample({ wrong, right }: { wrong: string; right: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <div className="flex items-center gap-2 flex-1">
        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
        <code className="text-sm bg-red-100 px-3 py-1 rounded text-red-800">
          {wrong}
        </code>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />
      <div className="flex items-center gap-2 flex-1">
        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
        <code className="text-sm bg-green-100 px-3 py-1 rounded text-green-800 font-semibold">
          {right}
        </code>
      </div>
    </div>
  );
}
