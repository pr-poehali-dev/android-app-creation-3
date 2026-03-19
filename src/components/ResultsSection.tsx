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
  burnoutScore: number;
  neuroScore: number;
  onViewRecommendations: () => void;
}

const getLevel = (score: number) => {
  if (score <= 6) return { level: 'Низкий', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (score <= 12) return { level: 'Умеренный', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (score <= 18) return { level: 'Средний', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { level: 'Высокий', color: 'text-red-600', bgColor: 'bg-red-100' };
};

const ResultsSection = ({ depressionScore, stressScore, anxietyScore, burnoutScore, neuroScore, onViewRecommendations }: ResultsSectionProps) => {
  const { toast } = useToast();
  const maxScore = 24;

  const depressionResult = getLevel(depressionScore);
  const stressResult = getLevel(stressScore);
  const anxietyResult = getLevel(anxietyScore);
  const burnoutResult = getLevel(burnoutScore);
  const neuroResult = getLevel(neuroScore);

  const overallScore = (depressionScore + stressScore + anxietyScore + burnoutScore + neuroScore) / 5;
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12 || anxietyScore > 12 || burnoutScore > 12 || neuroScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6 || anxietyScore > 6 || burnoutScore > 6 || neuroScore > 6;

  const handleShare = async () => {
    const shared = await shareResults(depressionScore, stressScore, anxietyScore, burnoutScore, neuroScore);
    if (shared) {
      toast({ title: 'Успешно поделились', description: 'Результаты и рекомендации отправлены' });
    } else {
      toast({ title: 'Ошибка', description: 'Не удалось поделиться результатами' });
    }
  };

  const metrics = [
    { label: 'Психологическое состояние', icon: 'CloudRain', score: depressionScore, result: depressionResult },
    { label: 'Уровень стресса', icon: 'Zap', score: stressScore, result: stressResult },
    { label: 'Тревожность', icon: 'AlertCircle', score: anxietyScore, result: anxietyResult },
    { label: 'Эмоциональное выгорание', icon: 'Flame', score: burnoutScore, result: burnoutResult },
    { label: 'Нейродиагностика', icon: 'Brain', score: neuroScore, result: neuroResult },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <Card className="p-4 sm:p-8 shadow-lg">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <Icon name="BarChart3" size={24} className="text-primary sm:w-8 sm:h-8" />
          Результаты нейродиагностики
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
              <p className="text-xs sm:text-sm text-gray-600">Уровень нагрузки</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">5/5</p>
              <p className="text-xs sm:text-sm text-gray-600">Блоков</p>
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
              <p><strong>✅ Психологическое состояние:</strong> Отличные новости! Ваше настроение стабильно, вы сохраняете интерес к жизни и умеете радоваться. Продолжайте заботиться о себе!</p>
            )}
            {depressionScore > 6 && depressionScore <= 12 && (
              <p><strong>💛 Психологическое состояние:</strong> Вы замечаете лёгкую грусть и снижение интереса к любимым занятиям. Это сигнал — пора позаботиться о себе! Я помогу вам вернуть радость жизни и энергию.</p>
            )}
            {depressionScore > 12 && depressionScore <= 18 && (
              <p><strong>🧡 Психологическое состояние:</strong> Сейчас вам сложно — настроение на нуле, энергии нет, сон нарушен. С профессиональной поддержкой вы сможете выйти из этого состояния. Я помогу вам снова почувствовать вкус к жизни.</p>
            )}
            {depressionScore > 18 && (
              <p><strong>❤️ Психологическое состояние:</strong> Вы переживаете очень сложный период — чувствуете подавленность, беспомощность, потерю смысла. Знайте: вы не одиноки, и выход есть. Я специализируюсь на работе с депрессией и помогу вам вернуться к полноценной жизни.</p>
            )}

            {stressScore <= 6 && (
              <p><strong>✅ Стресс:</strong> Вы прекрасно справляетесь с жизненными вызовами! Умеете сохранять спокойствие и находить баланс. Это большая сила!</p>
            )}
            {stressScore > 6 && stressScore <= 12 && (
              <p><strong>💛 Стресс:</strong> Вы чувствуете перегрузку, раздражаетесь, сложно расслабиться. Стресс накапливается — важно научиться его правильно сбрасывать. Я научу вас техникам, которые работают.</p>
            )}
            {stressScore > 12 && stressScore <= 18 && (
              <p><strong>🧡 Стресс:</strong> Стресс серьёзно влияет на вашу жизнь — головные боли, напряжение, сложно сосредоточиться. Ваше тело и разум кричат SOS. Я помогу вам снизить нагрузку и управлять стрессом.</p>
            )}
            {stressScore > 18 && (
              <p><strong>❤️ Стресс:</strong> Вы на пределе — хроническое перенапряжение разрушает здоровье и качество жизни. Срочно нужна помощь! Я помогу вам остановить этот цикл и восстановить внутренние ресурсы.</p>
            )}

            {anxietyScore <= 6 && (
              <p><strong>✅ Тревожность:</strong> Вы спокойны и уверены в себе! Умеете контролировать беспокойство и чувствуете себя комфортно в разных ситуациях.</p>
            )}
            {anxietyScore > 6 && anxietyScore <= 12 && (
              <p><strong>💛 Тревожность:</strong> Тревожные мысли всё чаще одолевают вас, беспокоитесь о будущем. Я помогу вам научиться управлять тревогой и вернуть спокойствие.</p>
            )}
            {anxietyScore > 12 && anxietyScore <= 18 && (
              <p><strong>🧡 Тревожность:</strong> Тревога мешает жить — избегаете ситуаций, учащается пульс, не хватает воздуха. Я специализируюсь на работе с тревожностью и помогу вам преодолеть страхи.</p>
            )}
            {anxietyScore > 18 && (
              <p><strong>❤️ Тревожность:</strong> Панические атаки, сильный страх без причины — это невыносимо тяжело. Но это излечимо! Я помогу вам справиться с паникой и вернуть контроль над жизнью.</p>
            )}

            {burnoutScore <= 6 && (
              <p><strong>✅ Эмоциональное выгорание:</strong> У вас хороший энергетический баланс! Вы умеете восстанавливаться и находить смысл в том, что делаете.</p>
            )}
            {burnoutScore > 6 && burnoutScore <= 12 && (
              <p><strong>💛 Эмоциональное выгорание:</strong> Вы начинаете терять запал — усталость накапливается, энтузиазма становится меньше. Важно остановиться и восстановить ресурсы. Я помогу вам найти баланс.</p>
            )}
            {burnoutScore > 12 && burnoutScore <= 18 && (
              <p><strong>🧡 Эмоциональное выгорание:</strong> Выгорание уже серьёзно влияет на вашу жизнь — равнодушие, отчаяние, потеря мотивации. Это не лень — это сигнал SOS от психики. Я помогу вам восстановиться.</p>
            )}
            {burnoutScore > 18 && (
              <p><strong>❤️ Эмоциональное выгорание:</strong> Вы полностью опустошены — нет сил, нет радости, нет смысла. Это критическая стадия выгорания. Необходима профессиональная помощь. Я специализируюсь на восстановлении после выгорания.</p>
            )}

            {neuroScore <= 6 && (
              <p><strong>✅ Нейродиагностика:</strong> Ваши когнитивные функции в норме! Хорошая концентрация, память работает чётко, эмоции под контролем.</p>
            )}
            {neuroScore > 6 && neuroScore <= 12 && (
              <p><strong>💛 Нейродиагностика:</strong> Вы замечаете снижение концентрации и "туман в голове". Это признаки перегрузки нервной системы. Я помогу вам восстановить ясность мышления.</p>
            )}
            {neuroScore > 12 && neuroScore <= 18 && (
              <p><strong>🧡 Нейродиагностика:</strong> Когнитивные функции снижены — проблемы с памятью, вниманием, импульсивные реакции. Нервная система истощена. Я помогу вам восстановить ресурс и стабилизировать состояние.</p>
            )}
            {neuroScore > 18 && (
              <p><strong>❤️ Нейродиагностика:</strong> Выраженные нарушения когнитивных функций и эмоциональной регуляции. Нервная система на пределе. Необходима срочная работа со специалистом. Я помогу вам стабилизироваться.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {metrics.map((m) => (
            <div key={m.label} className={`p-4 sm:p-5 rounded-lg ${m.result.bgColor}`}>
              <div className="flex items-center gap-2 mb-3">
                <Icon name={m.icon} size={18} className={m.result.color} />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900">{m.label}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-700">Баллов:</span>
                  <span className={`text-lg font-bold ${m.result.color}`}>{m.score} / {maxScore}</span>
                </div>
                <Progress value={(m.score / maxScore) * 100} className="h-2" />
                <p className={`text-sm font-semibold ${m.result.color}`}>{m.result.level}</p>
              </div>
            </div>
          ))}
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
                  Если заметите изменения или захотите лучше управлять эмоциями — я всегда готов помочь!
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
                    <li>• Восстановиться после эмоционального выгорания</li>
                    <li>• Улучшить концентрацию, память и ясность мышления</li>
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
                Я — профессиональный сертифицированный психолог с большим опытом работы. Специализируюсь именно на том, что вас беспокоит: депрессия, тревожность, стресс, панические атаки, выгорание.
              </p>
              <p className="text-primary font-semibold mb-4 text-xs sm:text-base">
                Вместе мы пройдем этот путь. Первый шаг — самый важный. Напишите мне прямо сейчас! 💚
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <Button size="default" asChild className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
                  <a href="https://кабинет-хорошего-психолога.рф" target="_blank" rel="noopener noreferrer">
                    <Icon name="Globe" size={16} className="sm:w-5 sm:h-5" />
                    Перейти на сайт
                  </a>
                </Button>
                <Button size="default" variant="outline" asChild className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
                  <a href="https://wa.me/79500233838" target="_blank" rel="noopener noreferrer">
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
            {[
              { icon: 'Moon', title: 'Здоровый сон', desc: 'Старайтесь спать 7-9 часов в сутки. Соблюдайте режим сна — это основа восстановления нервной системы.' },
              { icon: 'Dumbbell', title: 'Физическая активность', desc: 'Регулярные упражнения снижают кортизол, улучшают настроение и когнитивные функции.' },
              { icon: 'Apple', title: 'Правильное питание', desc: 'Омега-3, магний и витамины группы В напрямую влияют на состояние нервной системы и эмоции.' },
              { icon: 'Users', title: 'Социальные контакты', desc: 'Общение с близкими людьми снижает тревогу, укрепляет иммунитет и защищает от выгорания.' },
              { icon: 'Heart', title: 'Практики осознанности', desc: 'Медитация и дыхательные упражнения перестраивают реакцию мозга на стресс за 8 недель практики.' },
              { icon: 'BookOpen', title: 'Цифровой детокс', desc: 'Ограничьте экранное время за 1-2 часа до сна — это критически важно для восстановления нервной системы.' },
            ].map((rec) => (
              <div key={rec.title} className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-primary text-white p-2 sm:p-3 rounded-lg flex-shrink-0 h-fit">
                  <Icon name={rec.icon} size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{rec.title}</h3>
                  <p className="text-gray-700 text-xs sm:text-sm">{rec.desc}</p>
                </div>
              </div>
            ))}
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
                  <li>• Не допустить развития серьёзных проблем</li>
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
          <Button onClick={onViewRecommendations} size="lg" className="gap-2 w-full sm:w-auto">
            <Icon name="FileText" size={20} />
            Получить рекомендации
          </Button>
          <Button onClick={handleShare} size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
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
