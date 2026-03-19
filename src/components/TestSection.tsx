import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface TestSectionProps {
  onComplete: (depressionScore: number, stressScore: number, anxietyScore: number, burnoutScore: number, neuroScore: number) => void;
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
  'У меня бывают мысли о том, что жизнь не имеет смысла',
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

const burnoutQuestions = [
  'Я чувствую эмоциональное истощение от своей работы или повседневных обязанностей',
  'К концу дня я чувствую себя полностью выжатым(ой), без сил',
  'Я стал(а) более циничным(ой) и равнодушным(ой) к людям вокруг меня',
  'Меня ничего не радует — ни работа, ни хобби, ни общение с близкими',
  'Я чувствую, что моя деятельность теряет смысл и ценность',
  'У меня снизилась продуктивность, хотя я стараюсь работать как прежде',
  'Я откладываю дела и избегаю ответственности, которую раньше принимал(а) легко',
  'Я чувствую, что отдаю всё, а взамен не получаю ничего — ни признания, ни сил',
];

const neuroQuestions = [
  'Мне трудно удерживать внимание на одном деле дольше 15-20 минут',
  'У меня бывают провалы в памяти — забываю важные вещи или разговоры',
  'Я замечаю, что реагирую слишком остро на звуки, свет или прикосновения',
  'Мне сложно переключаться между задачами — нужно время, чтобы перестроиться',
  'Я часто чувствую "туман в голове" — мысли путаются, сложно думать чётко',
  'У меня бывают резкие перепады настроения без видимой причины',
  'Мне трудно заснуть или я просыпаюсь ночью с беспокойными мыслями',
  'Я замечаю, что стал(а) более импульсивным(ой) — говорю или делаю, не подумав',
];

type TestType = 'depression' | 'stress' | 'anxiety' | 'burnout' | 'neuro';

const testConfig: Record<TestType, { label: string; icon: string; color: string; description: string }> = {
  depression: {
    label: 'Психологическое состояние',
    icon: 'CloudRain',
    color: 'text-blue-600',
    description: 'Оцениваем уровень депрессии и общее эмоциональное самочувствие'
  },
  stress: {
    label: 'Уровень стресса',
    icon: 'Zap',
    color: 'text-orange-600',
    description: 'Измеряем хроническое напряжение и способность справляться с нагрузкой'
  },
  anxiety: {
    label: 'Тревожность',
    icon: 'AlertCircle',
    color: 'text-yellow-600',
    description: 'Выявляем тревожные паттерны и склонность к паническим реакциям'
  },
  burnout: {
    label: 'Эмоциональное выгорание',
    icon: 'Flame',
    color: 'text-red-600',
    description: 'Диагностируем степень профессионального и личностного выгорания'
  },
  neuro: {
    label: 'Нейродиагностика',
    icon: 'Brain',
    color: 'text-purple-600',
    description: 'Оцениваем когнитивные функции: внимание, память, регуляцию эмоций'
  },
};

const testOrder: TestType[] = ['depression', 'stress', 'anxiety', 'burnout', 'neuro'];

const allQuestions: Record<TestType, string[]> = {
  depression: depressionQuestions,
  stress: stressQuestions,
  anxiety: anxietyQuestions,
  burnout: burnoutQuestions,
  neuro: neuroQuestions,
};

const shortLabels: Record<TestType, string> = {
  depression: 'Психо',
  stress: 'Стресс',
  anxiety: 'Тревога',
  burnout: 'Выгор.',
  neuro: 'Нейро',
};

const TestSection = ({ onComplete, onProgressUpdate }: TestSectionProps) => {
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<TestType, Record<number, number>>>({
    depression: {},
    stress: {},
    anxiety: {},
    burnout: {},
    neuro: {},
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const currentTest = testOrder[currentTestIndex];
  const questions = allQuestions[currentTest];
  const answers = allAnswers[currentTest];
  const config = testConfig[currentTest];

  const totalQuestions = testOrder.reduce((sum, t) => sum + allQuestions[t].length, 0);
  const completedBefore = testOrder.slice(0, currentTestIndex).reduce((sum, t) => sum + allQuestions[t].length, 0);
  const localProgress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const numValue = parseInt(value);
    setAllAnswers(prev => ({
      ...prev,
      [currentTest]: { ...prev[currentTest], [currentQuestion]: numValue }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQ = currentQuestion + 1;
      setCurrentQuestion(nextQ);
      onProgressUpdate(((completedBefore + nextQ) / totalQuestions) * 100);
    } else {
      if (currentTestIndex < testOrder.length - 1) {
        const nextIndex = currentTestIndex + 1;
        setCurrentTestIndex(nextIndex);
        setCurrentQuestion(0);
        const nextCompleted = completedBefore + questions.length;
        onProgressUpdate((nextCompleted / totalQuestions) * 100);
      } else {
        const finalAnswers = { ...allAnswers, [currentTest]: { ...allAnswers[currentTest], [currentQuestion]: allAnswers[currentTest][currentQuestion] } };
        const scores = testOrder.map(t =>
          Object.values(finalAnswers[t]).reduce((a, b) => a + b, 0)
        );
        onComplete(scores[0], scores[1], scores[2], scores[3], scores[4]);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentTestIndex > 0) {
      const prevIndex = currentTestIndex - 1;
      const prevTest = testOrder[prevIndex];
      setCurrentTestIndex(prevIndex);
      setCurrentQuestion(allQuestions[prevTest].length - 1);
    }
  };

  const canProceed = answers[currentQuestion] !== undefined;
  const isLastQuestion = currentTestIndex === testOrder.length - 1 && currentQuestion === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
          🧠 Комплексная психологическая диагностика
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          С элементами нейропсихологической диагностики · 5 блоков · Стресс · Тревожность · Выгорание · Когнитивные функции
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {testOrder.map((t, i) => {
            const cfg = testConfig[t];
            const isDone = i < currentTestIndex;
            const isCurrent = i === currentTestIndex;
            return (
              <div
                key={t}
                className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isDone ? 'bg-green-100 text-green-700' :
                  isCurrent ? 'bg-primary text-white shadow-md scale-105' :
                  'bg-gray-100 text-gray-400'
                }`}
              >
                {isDone ? <span>✓</span> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{cfg.label}</span>
                <span className="sm:hidden">{shortLabels[t]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Card className="p-4 sm:p-8 shadow-lg">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-1 gap-2">
            <div className="flex items-center gap-2">
              <Icon name={config.icon} size={20} className={config.color} />
              <h3 className="text-base sm:text-xl font-bold text-gray-900">{config.label}</h3>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
              {currentQuestion + 1} из {questions.length}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3 ml-7">{config.description}</p>
          <Progress value={localProgress} className="h-2" />
        </div>

        <div className="mb-6 sm:mb-8">
          <p className="text-base sm:text-lg mb-4 sm:mb-6 text-gray-700 leading-relaxed font-medium">
            {questions[currentQuestion]}
          </p>

          <RadioGroup
            value={answers[currentQuestion]?.toString()}
            onValueChange={handleAnswer}
          >
            <div className="space-y-3 sm:space-y-4">
              {[
                { value: '0', label: 'Совсем не согласен / Никогда' },
                { value: '1', label: 'Скорее не согласен / Редко' },
                { value: '2', label: 'Скорее согласен / Иногда' },
                { value: '3', label: 'Полностью согласен / Часто' },
              ].map(opt => (
                <div
                  key={opt.value}
                  className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    answers[currentQuestion]?.toString() === opt.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={opt.value} id={`option-${opt.value}`} />
                  <Label htmlFor={`option-${opt.value}`} className="cursor-pointer flex-1 text-sm sm:text-base">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentTestIndex === 0 && currentQuestion === 0}
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
            {isLastQuestion ? 'Получить результаты' : 'Далее'}
            <Icon name={isLastQuestion ? 'BarChart3' : 'ChevronRight'} size={16} className="sm:w-5 sm:h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestSection;