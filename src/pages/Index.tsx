import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import TestSection from '@/components/TestSection';
import ResultsSection from '@/components/ResultsSection';
import RecommendationsSection from '@/components/RecommendationsSection';
import ArticlesSection from '@/components/ArticlesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LiveCounter from '@/components/LiveCounter';

type Section = 'tests' | 'results' | 'recommendations' | 'articles';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('tests');
  const [testResults, setTestResults] = useState<{
    depressionScore: number | null;
    stressScore: number | null;
    anxietyScore: number | null;
    completed: boolean;
  }>({
    depressionScore: null,
    stressScore: null,
    anxietyScore: null,
    completed: false,
  });
  const [overallProgress, setOverallProgress] = useState(0);

  const handleTestComplete = (depressionScore: number, stressScore: number, anxietyScore: number) => {
    setTestResults({
      depressionScore,
      stressScore,
      anxietyScore,
      completed: true,
    });
    setOverallProgress(100);
    setActiveSection('results');
  };

  const handleProgressUpdate = (progress: number) => {
    setOverallProgress(progress);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl">
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col items-center mb-6">
            <img 
              src="https://cdn.poehali.dev/files/0434f2d2-8b63-45cd-835e-3b1d2b34a2ce.png" 
              alt="Кабинет хорошего психолога"
              className="h-20 sm:h-24 mb-4 object-contain"
            />
            <div className="text-center">
              <a 
                href="https://кабинет-хорошего-психолога.рф" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
              >
                кабинет-хорошего-психолога.рф
              </a>
              <a 
                href="tel:+79602586060"
                className="flex items-center justify-center gap-2 text-base sm:text-lg text-gray-700 hover:text-primary transition-colors mt-2"
              >
                <Icon name="Phone" size={18} className="sm:w-5 sm:h-5" />
                +7 960 258-60-60
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Icon name="Brain" size={32} className="text-primary sm:w-10 sm:h-10" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Узнайте уровень стресса за 5 минут</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-lg px-4 mb-4">
            ⚡ Научно обоснованный тест DASS-21 на депрессию, стресс и тревожность
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={16} />
              <span>5 минут</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="CheckCircle" size={16} />
              <span>Бесплатно</span>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto px-4 mb-6">
            <LiveCounter />
          </div>
        </header>

        {activeSection === 'tests' && !testResults.completed && (
          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm sm:text-base font-medium text-gray-700">
                  Общий прогресс
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <Progress value={overallProgress} className="h-2 sm:h-3" />
            </div>
          </div>
        )}

        <nav className="flex justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 flex-wrap px-2">
          {testResults.completed && (
            <Button
              variant={activeSection === 'tests' ? 'default' : 'outline'}
              size="default"
              onClick={() => setActiveSection('tests')}
              className="gap-1 sm:gap-2 text-xs sm:text-base px-3 sm:px-4 py-2 sm:py-3"
            >
              <Icon name="ClipboardList" size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden xs:inline">Пройти заново</span>
            </Button>
          )}
          <Button
            variant={activeSection === 'articles' ? 'default' : 'outline'}
            size="default"
            onClick={() => setActiveSection('articles')}
            className="gap-1 sm:gap-2 text-xs sm:text-base px-3 sm:px-4 py-2 sm:py-3"
          >
            <Icon name="BookOpen" size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Полезная информация</span>
            <span className="xs:hidden">Статьи</span>
          </Button>
        </nav>

        <main>
          {activeSection === 'tests' && (
            <>
              <TestSection 
                onComplete={handleTestComplete} 
                onProgressUpdate={handleProgressUpdate}
              />
              <TestimonialsSection />
            </>
          )}
          {activeSection === 'results' && testResults.completed && (
            <ResultsSection
              depressionScore={testResults.depressionScore!}
              stressScore={testResults.stressScore!}
              anxietyScore={testResults.anxietyScore!}
              onViewRecommendations={() => setActiveSection('recommendations')}
            />
          )}
          {activeSection === 'recommendations' && testResults.completed && (
            <RecommendationsSection
              depressionScore={testResults.depressionScore!}
              stressScore={testResults.stressScore!}
              anxietyScore={testResults.anxietyScore!}
            />
          )}
          {activeSection === 'articles' && <ArticlesSection />}
        </main>

        <footer className="mt-12 sm:mt-16 text-center text-gray-500 text-xs sm:text-sm px-4">
          <p className="mb-3">
            Это приложение не заменяет профессиональную медицинскую консультацию
          </p>
          <a 
            href="https://кабинет-хорошего-психолога.рф" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 underline transition-colors"
          >
            кабинет-хорошего-психолога.рф
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;