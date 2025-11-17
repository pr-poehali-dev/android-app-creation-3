import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { downloadResults, shareResults, downloadPDF } from '@/utils/exportResults';
import { useToast } from '@/hooks/use-toast';

interface RecommendationsSectionProps {
  depressionScore: number;
  stressScore: number;
}

const RecommendationsSection = ({ depressionScore, stressScore }: RecommendationsSectionProps) => {
  const { toast } = useToast();
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6;

  const handleDownload = () => {
    downloadResults(depressionScore, stressScore);
    toast({
      title: 'Файл сохранён',
      description: 'Результаты тестирования загружены на ваше устройство',
    });
  };

  const handleShare = async () => {
    const shared = await shareResults(depressionScore, stressScore);
    if (!shared) {
      downloadResults(depressionScore, stressScore);
      toast({
        title: 'Файл сохранён',
        description: 'Вы можете поделиться сохранённым файлом',
      });
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF(depressionScore, stressScore);
    toast({
      title: 'PDF сохранён',
      description: 'Результаты сохранены в формате PDF',
    });
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
    <div className="max-w-4xl mx-auto space-y-6">
      {needsProfessionalHelp && (
        <Card className="p-8 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-primary">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-primary text-white p-3 rounded-full">
              <Icon name="UserRound" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Обратитесь к специалисту
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                Ваши результаты показывают, что вам может помочь профессиональная поддержка.
                Психолог поможет разобраться в ситуации и найти эффективные решения.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="ExternalLink" size={24} className="text-primary" />
              <h3 className="text-xl font-semibold text-gray-900">
                Рекомендуем обратиться в Кабинет хорошего психолога
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              Профессиональный психолог с опытом работы более 15 лет. Специализируется на работе
              с депрессией, тревожностью, стрессом и другими психологическими проблемами.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild className="gap-2">
                <a
                  href="https://кабинет-хорошего-психолога.рф"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="Globe" size={20} />
                  Перейти на сайт
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <a
                  href="https://wa.me/79602586060"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="MessageCircle" size={20} />
                  WhatsApp: +7 960 258-60-60
                </a>
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Icon name="Lightbulb" size={28} className="text-primary" />
          Рекомендации по улучшению состояния
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {generalRecommendations.map((rec, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 rounded-lg bg-gradient-to-br from-gray-50 to-orange-50 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary text-white p-3 rounded-lg flex-shrink-0 h-fit">
                <Icon name={rec.icon as any} size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                <p className="text-gray-700 text-sm">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {hasModerateSymptoms && !needsProfessionalHelp && (
        <Card className="p-6 shadow-lg bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Следите за своим состоянием</h3>
              <p className="text-blue-800">
                Если симптомы усиливаются или не проходят в течение длительного времени,
                рекомендуется проконсультироваться со специалистом.
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
        <Button size="lg" variant="outline" onClick={handleDownloadPDF} className="gap-2">
          <Icon name="FileText" size={20} />
          Скачать PDF
        </Button>
        <Button size="lg" variant="outline" onClick={handleDownload} className="gap-2">
          <Icon name="Download" size={20} />
          Скачать TXT
        </Button>
        <Button size="lg" variant="outline" onClick={handleShare} className="gap-2">
          <Icon name="Share2" size={20} />
          Поделиться
        </Button>
      </div>
    </div>
  );
};

export default RecommendationsSection;