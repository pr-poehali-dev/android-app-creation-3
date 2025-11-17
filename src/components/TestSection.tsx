import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface TestSectionProps {
  onComplete: (depressionScore: number, stressScore: number) => void;
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

const TestSection = ({ onComplete }: TestSectionProps) => {
  const [currentTest, setCurrentTest] = useState<'depression' | 'stress'>('depression');
  const [depressionAnswers, setDepressionAnswers] = useState<Record<number, number>>({});
  const [stressAnswers, setStressAnswers] = useState<Record<number, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = currentTest === 'depression' ? depressionQuestions : stressQuestions;
  const answers = currentTest === 'depression' ? depressionAnswers : stressAnswers;
  const setAnswers = currentTest === 'depression' ? setDepressionAnswers : setStressAnswers;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const numValue = parseInt(value);
    setAnswers({ ...answers, [currentQuestion]: numValue });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (currentTest === 'depression') {
        setCurrentTest('stress');
        setCurrentQuestion(0);
      } else {
        const depScore = Object.values(depressionAnswers).reduce((a, b) => a + b, 0);
        const stressScore = Object.values(stressAnswers).reduce((a, b) => a + b, 0);
        onComplete(depScore, stressScore);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentTest === 'stress') {
      setCurrentTest('depression');
      setCurrentQuestion(depressionQuestions.length - 1);
    }
  };

  const canProceed = answers[currentQuestion] !== undefined;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8 shadow-lg">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentTest === 'depression' ? 'Тест на депрессию' : 'Тест на стресс'}
            </h2>
            <span className="text-sm text-gray-500">
              {currentQuestion + 1} из {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="mb-8">
          <p className="text-lg mb-6 text-gray-700">{questions[currentQuestion]}</p>

          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswer}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="0" id="option-0" />
                <Label htmlFor="option-0" className="cursor-pointer flex-1">
                  Совсем не согласен
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="1" id="option-1" />
                <Label htmlFor="option-1" className="cursor-pointer flex-1">
                  Скорее не согласен
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="2" id="option-2" />
                <Label htmlFor="option-2" className="cursor-pointer flex-1">
                  Скорее согласен
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="3" id="option-3" />
                <Label htmlFor="option-3" className="cursor-pointer flex-1">
                  Полностью согласен
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentTest === 'depression' && currentQuestion === 0}
            className="gap-2"
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="gap-2"
          >
            {currentQuestion === questions.length - 1 && currentTest === 'stress'
              ? 'Завершить'
              : 'Далее'}
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestSection;
