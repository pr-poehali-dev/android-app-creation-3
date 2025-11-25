import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { downloadResults, shareResults, downloadPDF } from '@/utils/exportResults';
import { useToast } from '@/hooks/use-toast';

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

  const handleDownload = () => {
    downloadResults(depressionScore, stressScore, anxietyScore);
    toast({
      title: 'Файл сохранён',
      description: 'Результаты тестирования загружены на ваше устройство',
    });
  };

  const handleShare = async () => {
    const shared = await shareResults(depressionScore, stressScore, anxietyScore);
    if (!shared) {
      downloadResults(depressionScore, stressScore, anxietyScore);
      toast({
        title: 'Файл сохранён',
        description: 'Вы можете поделиться сохранённым файлом',
      });
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF(depressionScore, stressScore, anxietyScore);
    toast({
      title: 'PDF сохранён',
      description: 'Результаты сохранены в формате PDF',
    });
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

        {needsProfessionalHelp && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <Icon name="AlertTriangle" size={20} className="text-amber-600 flex-shrink-0 mt-1 sm:w-6 sm:h-6" />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1 sm:mb-2 text-sm sm:text-base">
                  Рекомендуется консультация специалиста
                </h4>
                <p className="text-amber-800 text-xs sm:text-sm">
                  Ваши результаты указывают на то, что профессиональная помощь может быть полезной.
                  Обратитесь к психологу для получения поддержки.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 flex-wrap">
          <Button size="default" onClick={onViewRecommendations} className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
            <Icon name="Lightbulb" size={16} className="sm:w-5 sm:h-5" />
            Рекомендации
          </Button>
          <Button size="default" variant="outline" onClick={handleDownloadPDF} className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
            <Icon name="FileText" size={16} className="sm:w-5 sm:h-5" />
            PDF
          </Button>
          <Button size="default" variant="outline" onClick={handleDownload} className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
            <Icon name="Download" size={16} className="sm:w-5 sm:h-5" />
            TXT
          </Button>
          <Button size="default" variant="outline" onClick={handleShare} className="gap-1 sm:gap-2 text-sm sm:text-base w-full sm:w-auto">
            <Icon name="Share2" size={16} className="sm:w-5 sm:h-5" />
            Поделиться
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ResultsSection;