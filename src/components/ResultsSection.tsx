import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { downloadResults, shareResults, downloadPDF } from '@/utils/exportResults';
import { useToast } from '@/hooks/use-toast';

interface ResultsSectionProps {
  depressionScore: number;
  stressScore: number;
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

const ResultsSection = ({ depressionScore, stressScore, onViewRecommendations }: ResultsSectionProps) => {
  const { toast } = useToast();
  const depressionResult = getDepressionLevel(depressionScore);
  const stressResult = getStressLevel(stressScore);
  const maxScore = 24;

  const overallScore = (depressionScore + stressScore) / 2;
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12;

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Icon name="BarChart3" size={32} className="text-primary" />
          Ваши результаты
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-lg ${depressionResult.bgColor}`}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="CloudRain" size={24} className={depressionResult.color} />
              <h3 className="text-xl font-semibold text-gray-900">Депрессия</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Баллов:</span>
                <span className={`text-2xl font-bold ${depressionResult.color}`}>
                  {depressionScore} / {maxScore}
                </span>
              </div>
              <Progress value={(depressionScore / maxScore) * 100} className="h-3" />
              <p className={`text-lg font-semibold ${depressionResult.color}`}>
                {depressionResult.level} уровень
              </p>
            </div>
          </div>

          <div className={`p-6 rounded-lg ${stressResult.bgColor}`}>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Zap" size={24} className={stressResult.color} />
              <h3 className="text-xl font-semibold text-gray-900">Стресс</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Баллов:</span>
                <span className={`text-2xl font-bold ${stressResult.color}`}>
                  {stressScore} / {maxScore}
                </span>
              </div>
              <Progress value={(stressScore / maxScore) * 100} className="h-3" />
              <p className={`text-lg font-semibold ${stressResult.color}`}>
                {stressResult.level} уровень
              </p>
            </div>
          </div>
        </div>

        {needsProfessionalHelp && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" size={24} className="text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-2">
                  Рекомендуется консультация специалиста
                </h4>
                <p className="text-amber-800">
                  Ваши результаты указывают на то, что профессиональная помощь может быть полезной.
                  Обратитесь к психологу для получения поддержки.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button size="lg" onClick={onViewRecommendations} className="gap-2">
            <Icon name="Lightbulb" size={20} />
            Посмотреть рекомендации
          </Button>
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
      </Card>
    </div>
  );
};

export default ResultsSection;