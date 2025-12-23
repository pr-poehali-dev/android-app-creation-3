import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { shareResults } from '@/utils/exportResults';
import { useToast } from '@/hooks/use-toast';
import BookingForm from '@/components/BookingForm';

interface ResultsSectionProps {
  depressionScore: number;
  stressScore: number;
  anxietyScore: number;
  onViewRecommendations: () => void;
}

const getDepressionLevel = (score: number) => {
  if (score <= 6) return { level: 'Низкий', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score <= 12) return { level: 'Умеренный', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (score <= 18) return { level: 'Средний', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { level: 'Высокий', color: 'text-red-600', bgColor: 'bg-red-100' };
};

const getStressLevel = (score: number) => {
  if (score <= 6) return { level: 'Низкий', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score <= 12) return { level: 'Умеренный', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (score <= 18) return { level: 'Средний', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { level: 'Высокий', color: 'text-red-600', bgColor: 'bg-red-100' };
};

const getAnxietyLevel = (score: number) => {
  if (score <= 6) return { level: 'Низкий', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score <= 12) return { level: 'Умеренный', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (score <= 18) return { level: 'Средний', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { level: 'Высокий', color: 'text-red-600', bgColor: 'bg-red-100' };
};

const ResultsSection = ({ depressionScore, stressScore, anxietyScore, onViewRecommendations }: ResultsSectionProps) => {
  const { toast } = useToast();
  const depressionResult = getDepressionLevel(depressionScore);
  const stressResult = getStressLevel(stressScore);
  const anxietyResult = getAnxietyLevel(anxietyScore);
  const maxScore = 24;

  const overallScore = (depressionScore + stressScore + anxietyScore) / 3;
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12 || anxietyScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6 || anxietyScore > 6;

  const handleShare = async () => {
    const shared = await shareResults(depressionScore, stressScore, anxietyScore);
    if (shared) {
      toast({
        title: 'Успешно поделились',
        description: 'Результаты и рекомендации отправлены',
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Не удалось поделиться результатами',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-8 shadow-lg">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <Icon name="BarChart3" size={24} className="text-primary sm:w-8 sm:h-8" />
          Ваши результаты
        </h2>

        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-primary">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="Activity" size={24} className="text-primary" />
            Общий результат
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{Math.round(overallScore)}</p>
              <p className="text-xs sm:text-sm text-gray-600">Средний балл</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{Math.round((overallScore / 24) * 100)}%</p>
              <p className="text-xs sm:text-sm text-gray-600">Уровень</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">3/3</p>
              <p className="text-xs sm:text-sm text-gray-600">Тестов</p>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-lg border-2 border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Icon name="FileText" size={24} className="text-primary" />
            Анализ вашего состояния
          </h3>
          <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            {depressionScore <= 6 && (
              <p><strong>✅ Депрессия:</strong> Отличные новости! Ваше настроение стабильно, вы сохраняете интерес к жизни и умеете радоваться. Продолжайте заботиться о себе!</p>
            )}
            {depressionScore > 6 && depressionScore <= 12 && (
              <p><strong>💛 Депрессия:</strong> Вы замечаете легкую грусть и снижение интереса к любимым занятиям. Это сигнал — пора позаботиться о себе! Профессиональный психолог поможет вам вернуть радость жизни и энергию.</p>
            )}
            {depressionScore > 12 && depressionScore <= 18 && (
              <p><strong>🧡 Депрессия:</strong> Сейчас вам сложно — настроение на нуле, энергии нет, сон нарушен. Но есть хорошая новость: с профессиональной поддержкой вы сможете выйти из этого состояния. Я помогу вам снова почувствовать вкус к жизни.</p>
            )}
            {depressionScore > 18 && (
              <p><strong>❤️ Депрессия:</strong> Вы переживаете очень сложный период — чувствуете подавленность, беспомощность, потерю смысла. Знайте: вы не одиноки, и выход есть. Я специализируюсь на работе с депрессией и помогу вам шаг за шагом вернуться к полноценной жизни.</p>
            )}
            
            {stressScore <= 6 && (
              <p><strong>✅ Стресс:</strong> Вы прекрасно справляетесь с жизненными вызовами! Умеете сохранять спокойствие и находить баланс. Это большая сила!</p>
            )}
            {stressScore > 6 && stressScore <= 12 && (
              <p><strong>💛 Стресс:</strong> Вы чувствуете перегрузку, раздражаетесь, сложно расслабиться. Стресс накапливается — важно научиться его правильно сбрасывать. Я научу вас техникам, которые работают.</p>
            )}
            {stressScore > 12 && stressScore <= 18 && (
              <p><strong>🧡 Стресс:</strong> Стресс серьезно влияет на вашу жизнь — головные боли, напряжение, сложно сосредоточиться. Ваше тело и разум кричат SOS. Я помогу вам снизить нагрузку и научу управлять стрессом.</p>
            )}
            {stressScore > 18 && (
              <p><strong>❤️ Стресс:</strong> Вы на пределе — хроническое перенапряжение разрушает здоровье и качество жизни. Срочно нужна помощь! Я помогу вам остановить этот цикл и восстановить внутренние ресурсы.</p>
            )}
            
            {anxietyScore <= 6 && (
              <p><strong>✅ Тревожность:</strong> Вы спокойны и уверены в себе! Умеете контролировать беспокойство и чувствуете себя комфортно в разных ситуациях.</p>
            )}
            {anxietyScore > 6 && anxietyScore <= 12 && (
              <p><strong>💛 Тревожность:</strong> Тревожные мысли всё чаще одолевают вас, беспокоитесь о будущем, сложно контролировать волнение. Я помогу вам научиться управлять тревогой и вернуть спокойствие.</p>
            )}
            {anxietyScore > 12 && anxietyScore <= 18 && (
              <p><strong>🧡 Тревожность:</strong> Тревога мешает жить — избегаете ситуаций, учащается пульс, не хватает воздуха. Качество жизни падает. Я специализируюсь на работе с тревожностью и помогу вам преодолеть страхи.</p>
            )}
            {anxietyScore > 18 && (
              <p><strong>❤️ Тревожность:</strong> Панические атаки, сильный страх без причины — это невыносимо тяжело. Но это излечимо! Я помогу вам справиться с паникой и вернуть контроль над своей жизнью.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className={`p-4 sm:p-6 rounded-lg ${depressionResult.bgColor}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Icon name="CloudRain" size={20} className={`${depressionResult.color} sm:w-6 sm:h-6`} />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Депрессия</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-700">Баллов:</span>
                <span className={`text-lg sm:text-xl font-bold ${depressionResult.color}`}>
                  {depressionScore} / {maxScore}
                </span>
              </div>
              <Progress value={(depressionScore / maxScore) * 100} className="h-2" />
              <p className={`text-sm sm:text-base font-semibold ${depressionResult.color}`}>
                {depressionResult.level}
              </p>
            </div>
          </div>

          <div className={`p-4 sm:p-6 rounded-lg ${stressResult.bgColor}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Icon name="Zap" size={20} className={`${stressResult.color} sm:w-6 sm:h-6`} />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Стресс</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-700">Баллов:</span>
                <span className={`text-lg sm:text-xl font-bold ${stressResult.color}`}>
                  {stressScore} / {maxScore}
                </span>
              </div>
              <Progress value={(stressScore / maxScore) * 100} className="h-2" />
              <p className={`text-sm sm:text-base font-semibold ${stressResult.color}`}>
                {stressResult.level}
              </p>
            </div>
          </div>

          <div className={`p-4 sm:p-6 rounded-lg ${anxietyResult.bgColor}`}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Icon name="AlertCircle" size={20} className={`${anxietyResult.color} sm:w-6 sm:h-6`} />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Тревожность</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm text-gray-700">Баллов:</span>
                <span className={`text-lg sm:text-xl font-bold ${anxietyResult.color}`}>
                  {anxietyScore} / {maxScore}
                </span>
              </div>
              <Progress value={(anxietyScore / maxScore) * 100} className="h-2" />
              <p className={`text-sm sm:text-base font-semibold ${anxietyResult.color}`}>
                {anxietyResult.level}
              </p>
            </div>
          </div>
        </div>

        {!needsProfessionalHelp && !hasModerateSymptoms && (
          <Card className="p-4 sm:p-6 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 mb-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon name="CheckCircle" size={24} className="text-green-600 flex-shrink-0 sm:w-7 sm:h-7" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2 text-base sm:text-lg">🌈 Отличная новость!</h3>
                <p className="text-green-800 text-xs sm:text-sm mb-2">
                  Ваши результаты в норме! Но помните: ментальное здоровье нужно поддерживать, как и физическое.
                </p>
                <p className="text-green-800 text-xs sm:text-sm">
                  Если заметите изменения или захотите научиться лучше управлять эмоциями — я всегда готов помочь!
                </p>
              </div>
            </div>
          </Card>
        )}

        {needsProfessionalHelp && (
          <Card className="p-4 sm:p-8 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-primary mb-6">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-full">
                <Icon name="UserRound" size={24} className="sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                  🌟 Я помогу вам!
                </h2>
                <p className="text-gray-700 text-sm sm:text-lg mb-4">
                  Ваши результаты показывают, что вам нужна профессиональная поддержка. И это НЕ слабость — это мудрость и забота о себе!
                </p>
                <div className="bg-gradient-to-r from-primary/10 to-amber-100 p-3 sm:p-4 rounded-lg mb-4">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mb-2">💪 Я помогу вам:</p>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                    <li>• Выйти из депрессии и вернуть радость жизни</li>
                    <li>• Перестать постоянно нервничать и обрести спокойствие</li>
                    <li>• Справиться с тревогой и паническими атаками</li>
                    <li>• Научиться управлять стрессом и эмоциями</li>
                    <li>• Укрепить ментальное здоровье на долгие годы</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm mb-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/0434f2d2-8b63-45cd-835e-3b1d2b34a2ce.png" 
                  alt="Кабинет хорошего психолога"
                  className="h-12 sm:h-16 object-contain"
                />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">
                Кабинет хорошего психолога
              </h3>
              <p className="text-gray-700 mb-2 text-xs sm:text-base">
                Я — профессиональный сертифицированный психолог с большим опытом работы. Специализируюсь именно на том, что вас беспокоит: депрессия, тревожность, стресс, панические атаки.
              </p>
              <p className="text-primary font-semibold mb-4 text-xs sm:text-base">
                Вместе мы пройдем этот путь. Первый шаг — самый важный. Напишите мне прямо сейчас! 💚
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <Button size="default" asChild className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
                  <a
                    href="https://кабинет-хорошего-психолога.рф"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="Globe" size={16} className="sm:w-5 sm:h-5" />
                    Перейти на сайт
                  </a>
                </Button>
                <Button size="default" variant="outline" asChild className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
                  <a
                    href="https://wa.me/79500233838"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="MessageCircle" size={16} className="sm:w-5 sm:h-5" />
                    <span className="hidden xs:inline">WhatsApp: </span>+7 950 023-38-38
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4 sm:p-8 shadow-lg mb-6">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <Icon name="Lightbulb" size={24} className="text-primary sm:w-7 sm:h-7" />
            Рекомендации
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name="Moon" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Здоровый сон</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Старайтесь спать 7-9 часов в сутки. Соблюдайте режим сна.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name="Dumbbell" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Физическая активность</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Регулярные упражнения помогают снизить стресс и улучшить настроение.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name="Apple" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Правильное питание</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Сбалансированное питание положительно влияет на психическое состояние.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name="Users" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Социальные контакты</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Общение с близкими людьми помогает справиться с трудностями.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name="Heart" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Практики осознанности</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Медитация и дыхательные упражнения помогают снизить тревожность.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name="BookOpen" size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Хобби и увлечения</h3>
                <p className="text-gray-700 text-xs sm:text-sm">Уделяйте время тому, что приносит вам радость и удовольствие.</p>
              </div>
            </div>
          </div>
        </Card>

        {hasModerateSymptoms && !needsProfessionalHelp && (
          <Card className="p-4 sm:p-6 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 mb-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon name="Sparkles" size={20} className="text-blue-600 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">💡 Не ждите, пока станет хуже!</h3>
                <p className="text-blue-800 text-xs sm:text-sm mb-3">
                  У вас есть тревожные сигналы. Профилактика и ранняя работа с психологом помогут вам:
                </p>
                <ul className="text-blue-800 text-xs sm:text-sm space-y-1 mb-3">
                  <li>• Не допустить развития серьезных проблем</li>
                  <li>• Укрепить ментальное здоровье</li>
                  <li>• Научиться техникам саморегуляции</li>
                  <li>• Жить спокойнее и счастливее</li>
                </ul>
                <p className="text-blue-900 font-semibold text-xs sm:text-sm">
                  Позаботьтесь о себе сейчас, чтобы завтра было легче! 🌱
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 flex-wrap">
          <Button 
            onClick={onViewRecommendations}
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            <Icon name="FileText" size={20} />
            Получить рекомендации
          </Button>
          <Button 
            onClick={handleShare}
            size="lg"
            variant="outline"
            className="gap-2 w-full sm:w-auto"
          >
            <Icon name="Share2" size={20} />
            Поделиться результатами
          </Button>
        </div>
      </Card>

      {needsProfessionalHelp && (
        <div className="mt-8">
          <BookingForm />
        </div>
      )}
    </div>
  );
};

export default ResultsSection;