export const getDepressionLevel = (score: number) => {
  if (score <= 6) return 'Низкий';
  if (score <= 12) return 'Умеренный';
  if (score <= 18) return 'Средний';
  return 'Высокий';
};

export const getStressLevel = (score: number) => {
  if (score <= 6) return 'Низкий';
  if (score <= 12) return 'Умеренный';
  if (score <= 18) return 'Средний';
  return 'Высокий';
};

const generalRecommendations = [
  {
    title: 'Здоровый сон',
    description: 'Старайтесь спать 7-9 часов в сутки. Соблюдайте режим сна.',
  },
  {
    title: 'Физическая активность',
    description: 'Регулярные упражнения помогают снизить стресс и улучшить настроение.',
  },
  {
    title: 'Правильное питание',
    description: 'Сбалансированное питание положительно влияет на психическое состояние.',
  },
  {
    title: 'Социальные контакты',
    description: 'Общение с близкими людьми помогает справиться с трудностями.',
  },
  {
    title: 'Практики осознанности',
    description: 'Медитация и дыхательные упражнения помогают снизить тревожность.',
  },
  {
    title: 'Хобби и увлечения',
    description: 'Уделяйте время тому, что приносит вам радость и удовольствие.',
  },
];

export const generateResultsText = (depressionScore: number, stressScore: number): string => {
  const maxScore = 24;
  const depressionLevel = getDepressionLevel(depressionScore);
  const stressLevel = getStressLevel(stressScore);
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6;
  const date = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let text = `РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ МЕНТАЛЬНОГО ЗДОРОВЬЯ\n`;
  text += `Дата прохождения: ${date}\n`;
  text += `\n${'='.repeat(60)}\n\n`;

  text += `📊 ВАШИ РЕЗУЛЬТАТЫ\n\n`;
  text += `Депрессия: ${depressionScore} из ${maxScore} баллов\n`;
  text += `Уровень: ${depressionLevel}\n\n`;
  text += `Стресс: ${stressScore} из ${maxScore} баллов\n`;
  text += `Уровень: ${stressLevel}\n\n`;

  if (needsProfessionalHelp) {
    text += `${'='.repeat(60)}\n\n`;
    text += `⚠️ ВАЖНО: РЕКОМЕНДУЕТСЯ КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА\n\n`;
    text += `Ваши результаты показывают, что вам может помочь\n`;
    text += `профессиональная поддержка. Психолог поможет разобраться\n`;
    text += `в ситуации и найти эффективные решения.\n\n`;
    text += `Рекомендуем обратиться в Кабинет хорошего психолога:\n`;
    text += `Сайт: https://кабинет-хорошего-психолога.рф\n`;
    text += `WhatsApp: +7 960 258-60-60\n\n`;
    text += `Профессиональный психолог с опытом работы более 15 лет.\n`;
    text += `Специализируется на работе с депрессией, тревожностью,\n`;
    text += `стрессом и другими психологическими проблемами.\n\n`;
  }

  text += `${'='.repeat(60)}\n\n`;
  text += `💡 РЕКОМЕНДАЦИИ ПО УЛУЧШЕНИЮ СОСТОЯНИЯ\n\n`;
  
  generalRecommendations.forEach((rec, index) => {
    text += `${index + 1}. ${rec.title}\n`;
    text += `   ${rec.description}\n\n`;
  });

  if (hasModerateSymptoms && !needsProfessionalHelp) {
    text += `${'='.repeat(60)}\n\n`;
    text += `ℹ️ СЛЕДИТЕ ЗА СВОИМ СОСТОЯНИЕМ\n\n`;
    text += `Если симптомы усиливаются или не проходят в течение\n`;
    text += `длительного времени, рекомендуется проконсультироваться\n`;
    text += `со специалистом.\n\n`;
  }

  text += `${'='.repeat(60)}\n\n`;
  text += `Это приложение не заменяет профессиональную медицинскую\n`;
  text += `консультацию. Результаты носят информационный характер.\n`;

  return text;
};

export const downloadResults = (depressionScore: number, stressScore: number) => {
  const text = generateResultsText(depressionScore, stressScore);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
  link.href = url;
  link.download = `результаты-теста-${date}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const shareResults = async (depressionScore: number, stressScore: number) => {
  const text = generateResultsText(depressionScore, stressScore);
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Результаты теста на ментальное здоровье',
        text: text,
      });
      return true;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return false;
      }
      return false;
    }
  }
  
  return false;
};
