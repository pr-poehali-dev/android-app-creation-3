import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import TestSection from '@/components/TestSection';
import ResultsSection from '@/components/ResultsSection';
import RecommendationsSection from '@/components/RecommendationsSection';

type Section = 'tests' | 'results' | 'recommendations';

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('tests');
  const [testResults, setTestResults] = useState<{
    depressionScore: number | null;
    stressScore: number | null;
    completed: boolean;
  }>({
    depressionScore: null,
    stressScore: null,
    completed: false,
  });

  const handleTestComplete = (depressionScore: number, stressScore: number) => {
    setTestResults({
      depressionScore,
      stressScore,
      completed: true,
    });
    setActiveSection('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Brain" size={40} className="text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">Ментальное здоровье</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Пройдите тестирование и получите персональные рекомендации
          </p>
        </header>

        <nav className="flex justify-center gap-4 mb-12 flex-wrap">
          <Button
            variant={activeSection === 'tests' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveSection('tests')}
            className="gap-2"
          >
            <Icon name="ClipboardList" size={20} />
            Тесты
          </Button>
          <Button
            variant={activeSection === 'results' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveSection('results')}
            disabled={!testResults.completed}
            className="gap-2"
          >
            <Icon name="BarChart3" size={20} />
            Результаты
          </Button>
          <Button
            variant={activeSection === 'recommendations' ? 'default' : 'outline'}
            size="lg"
            onClick={() => setActiveSection('recommendations')}
            disabled={!testResults.completed}
            className="gap-2"
          >
            <Icon name="Lightbulb" size={20} />
            Рекомендации
          </Button>
        </nav>

        <main>
          {activeSection === 'tests' && <TestSection onComplete={handleTestComplete} />}
          {activeSection === 'results' && testResults.completed && (
            <ResultsSection
              depressionScore={testResults.depressionScore!}
              stressScore={testResults.stressScore!}
              onViewRecommendations={() => setActiveSection('recommendations')}
            />
          )}
          {activeSection === 'recommendations' && testResults.completed && (
            <RecommendationsSection
              depressionScore={testResults.depressionScore!}
              stressScore={testResults.stressScore!}
            />
          )}
        </main>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Это приложение не заменяет профессиональную медицинскую консультацию
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
