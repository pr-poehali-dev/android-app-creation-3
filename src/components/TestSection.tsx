import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface TestSectionProps {
  onComplete: (depressionScore: number, stressScore: number, anxietyScore: number) => void;
  onProgressUpdate: (progress: number) => void;
}

const depressionQuestions = [
  'Я чувствую себя подавленным или грустным большую часть времени',
  'Я потерял интерес к вещам, которые раньше приносили мне радость',
  'У меня часто бывают проблемы со сном (бессонница или избыточный сон)',
  'Я чувствую усталость и нехватку энергии почти каждый день',
  'У меня изменился аппетит (значительно снизился или увеличился)',
  'Мне трудно концентрироваться на работе или других задачах',
  'Я чувствую себя никчемным или испытываю чрезмерное чувство вины',
  'У меня бывают мысли о смерти или самоповреждении',
];

const stressQuestions = [
  'Я часто чувствую себя перегруженным обязанностями',
  'Мне трудно расслабиться или отключиться от проблем',
  'Я раздражаюсь или злюсь по мелочам',
  'У меня часто болит голова или есть другие физические симптомы напряжения',
  'Я плохо сплю из-за беспокойства о делах',
  'Мне трудно принимать решения',
  'Я чувствую, что не справляюсь с повседневными задачами',
  'У меня появились вредные привычки (переедание, курение, алкоголь)',
];

const anxietyQuestions = [
  'Я часто испытываю беспокойство или волнение без видимой причины',
  'Мне трудно контролировать свои тревожные мысли',
  'Я избегаю определенных ситуаций, потому что они вызывают у меня беспокойство',
  'У меня бывают внезапные приступы сильного страха или паники',
  'Я часто чувствую напряжение в мышцах или дрожь',
  'У меня учащается сердцебиение или возникает одышка в стрессовых ситуациях',
  'Я постоянно беспокоюсь о будущем и возможных проблемах',
  'Мне трудно находиться в толпе или замкнутых пространствах',
];

const TestSection = ({ onComplete, onProgressUpdate }: TestSectionProps) => {
  const [currentTest, setCurrentTest] = useState<'depression' | 'stress' | 'anxiety'>('depression');
  const [depressionAnswers, setDepressionAnswers] = useState<Record<number, number>>({});
  const [stressAnswers, setStressAnswers] = useState<Record<number, number>>({});
  const [anxietyAnswers, setAnxietyAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = currentTest === 'depression' ? depressionQuestions : currentTest === 'stress' ? stressQuestions : anxietyQuestions;
  const answers = currentTest === 'depression' ? depressionAnswers : currentTest === 'stress' ? stressAnswers : anxietyAnswers;
  const setAnswers = currentTest === 'depression' ? setDepressionAnswers : currentTest === 'stress' ? setStressAnswers : setAnxietyAnswers;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const numValue = parseInt(value);
    setAnswers({ ...answers, [currentQuestion]: numValue });
    
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const calculateOverallProgress = (test: 'depression' | 'stress' | 'anxiety', questionIndex: number) => {
    const totalQuestions = depressionQuestions.length + stressQuestions.length + anxietyQuestions.length;
    let completedQuestions = 0;
    
    if (test === 'depression') {
      completedQuestions = questionIndex + 1;
    } else if (test === 'stress') {
      completedQuestions = depressionQuestions.length + questionIndex + 1;
    } else {
      completedQuestions = depressionQuestions.length + stressQuestions.length + questionIndex + 1;
    }
    
    return (completedQuestions / totalQuestions) * 100;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const newQuestionIndex = currentQuestion + 1;
      setCurrentQuestion(newQuestionIndex);
      onProgressUpdate(calculateOverallProgress(currentTest, newQuestionIndex));
    } else {
      if (currentTest === 'depression') {
        setCurrentTest('stress');
        setCurrentQuestion(0);
        onProgressUpdate(calculateOverallProgress('stress', 0));
      } else if (currentTest === 'stress') {
        setCurrentTest('anxiety');
        setCurrentQuestion(0);
        onProgressUpdate(calculateOverallProgress('anxiety', 0));
      } else {
        const depScore = Object.values(depressionAnswers).reduce((a, b) => a + b, 0);
        const stressScore = Object.values(stressAnswers).reduce((a, b) => a + b, 0);
        const anxScore = Object.values(anxietyAnswers).reduce((a, b) => a + b, 0);
        onComplete(depScore, stressScore, anxScore);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentTest === 'stress') {
      setCurrentTest('depression');
      setCurrentQuestion(depressionQuestions.length - 1);
    } else if (currentTest === 'anxiety') {
      setCurrentTest('stress');
      setCurrentQuestion(stressQuestions.length - 1);
    }
  };

  const canProceed = answers[currentQuestion] !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-4 sm:p-8 shadow-lg">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 gap-2">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              {currentTest === 'depression' ? 'Тест на депрессию' : currentTest === 'stress' ? 'Тест на стресс' : 'Тест на тревожность'}
            </h2>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {currentQuestion + 1} из {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-6 sm:mb-8">
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-700 leading-relaxed">{questions[currentQuestion]}</p>

          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswer}
          >
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="0" id="option-0" />
                <Label htmlFor="option-0" className="cursor-pointer flex-1 text-sm sm:text-base">
                  Совсем не согласен
                </Label>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="1" id="option-1" />
                <Label htmlFor="option-1" className="cursor-pointer flex-1 text-sm sm:text-base">
                  Скорее не согласен
                </Label>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="2" id="option-2" />
                <Label htmlFor="option-2" className="cursor-pointer flex-1 text-sm sm:text-base">
                  Скорее согласен
                </Label>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="3" id="option-3" />
                <Label htmlFor="option-3" className="cursor-pointer flex-1 text-sm sm:text-base">
                  Полностью согласен
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentTest === 'depression' && currentQuestion === 0}
            className="gap-1 sm:gap-2 text-sm sm:text-base"
            size="default"
          >
            <Icon name="ChevronLeft" size={16} className="sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Назад</span>
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-1 sm:gap-2 text-sm sm:text-base"
            size="default"
          >
            {currentQuestion === questions.length - 1 && currentTest === 'anxiety'
              ? 'Завершить'
              : 'Далее'}
            <Icon name="ChevronRight" size={16} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestSection;