import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { shareResults } from '@/utils/exportResults';
import { useToast } from '@/hooks/use-toast';

interface RecommendationsSectionProps {
  depressionScore: number;
  stressScore: number;
  anxietyScore: number;
}

const RecommendationsSection = ({ depressionScore, stressScore, anxietyScore }: RecommendationsSectionProps) => {
  const { toast } = useToast();
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

  const generalRecommendations = [
    {
      icon: 'Moon',
      title: 'Здоровый сон',
      description: 'Старайтесь спать 7-9 часов в сутки. Соблюдайте режим сна.',
    },
    {
      icon: 'Dumbbell',
      title: 'Физическая активность',
      description: 'Регулярные упражнения помогают снизить стресс и улучшить настроение.',
    },
    {
      icon: 'Apple',
      title: 'Правильное питание',
      description: 'Сбалансированное питание положительно влияет на психическое состояние.',
    },
    {
      icon: 'Users',
      title: 'Социальные контакты',
      description: 'Общение с близкими людьми помогает справиться с трудностями.',
    },
    {
      icon: 'Heart',
      title: 'Практики осознанности',
      description: 'Медитация и дыхательные упражнения помогают снизить тревожность.',
    },
    {
      icon: 'BookOpen',
      title: 'Хобби и увлечения',
      description: 'Уделяйте время тому, что приносит вам радость и удовольствие.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {needsProfessionalHelp && (
        <Card className="p-4 sm:p-8 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-primary">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-primary text-white p-2 sm:p-3 rounded-full">
              <Icon name="UserRound" size={24} className="sm:w-8 sm:h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">
                Обратитесь к специалисту
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

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Icon name="ExternalLink" size={20} className="text-primary sm:w-6 sm:h-6" />
              <h3 className="text-base sm:text-xl font-semibold text-gray-900">
                Кабинет хорошего психолога
              </h3>
            </div>
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
                  href="https://wa.me/79602586060"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="MessageCircle" size={16} className="sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">WhatsApp: </span>+7 960 258-60-60
                </a>
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4 sm:p-8 shadow-lg">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <Icon name="Lightbulb" size={24} className="text-primary sm:w-7 sm:h-7" />
          Рекомендации
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {generalRecommendations.map((rec, index) => (
            <div
              key={index}
              className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name={rec.icon as any} size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{rec.title}</h3>
                <p className="text-gray-700 text-xs sm:text-sm">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {hasModerateSymptoms && !needsProfessionalHelp && (
        <Card className="p-4 sm:p-6 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
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

      <div className="flex justify-center mt-4 sm:mt-6">
        <Button size="lg" onClick={handleShare} className="gap-2 text-base sm:text-lg w-full sm:w-auto">
          <Icon name="Share2" size={20} />
          Поделиться результатами и рекомендациями
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsSection;