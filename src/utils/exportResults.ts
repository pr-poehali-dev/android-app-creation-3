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

export const getAnxietyLevel = (score: number) => {
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

export const generateResultsText = (depressionScore: number, stressScore: number, anxietyScore: number, burnoutScore = 0, neuroScore = 0): string => {
  const maxScore = 24;
  const depressionLevel = getDepressionLevel(depressionScore);
  const stressLevel = getStressLevel(stressScore);
  const anxietyLevel = getAnxietyLevel(anxietyScore);
  const burnoutLevel = burnoutScore <= 6 ? 'Низкий' : burnoutScore <= 12 ? 'Умеренный' : burnoutScore <= 18 ? 'Средний' : 'Высокий';
  const neuroLevel = neuroScore <= 6 ? 'Низкий' : neuroScore <= 12 ? 'Умеренный' : neuroScore <= 18 ? 'Средний' : 'Высокий';
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12 || anxietyScore > 12 || burnoutScore > 12 || neuroScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6 || anxietyScore > 6 || burnoutScore > 6 || neuroScore > 6;
  const date = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let text = `🧠 РЕЗУЛЬТАТЫ НЕЙРОДИАГНОСТИКИ МЕНТАЛЬНОГО ЗДОРОВЬЯ 🧠\n`;
  text += `Дата: ${date}\n`;
  text += `\n${'━'.repeat(60)}\n\n`;

  text += `📊 ВАШИ ПОКАЗАТЕЛИ:\n\n`;
  text += `🧠 Психологическое состояние: ${depressionScore} из ${maxScore} — ${depressionLevel} уровень\n`;
  text += `⚡ Стресс: ${stressScore} из ${maxScore} — ${stressLevel} уровень\n`;
  text += `💭 Тревожность: ${anxietyScore} из ${maxScore} — ${anxietyLevel} уровень\n`;
  text += `🔥 Эмоциональное выгорание: ${burnoutScore} из ${maxScore} — ${burnoutLevel} уровень\n`;
  text += `🔬 Нейродиагностика: ${neuroScore} из ${maxScore} — ${neuroLevel} уровень\n\n`;

  text += `${'━'.repeat(60)}\n\n`;
  text += `🔍 ЧТО ЭТО ЗНАЧИТ ДЛЯ ВАС:\n\n`;
  
  if (depressionScore <= 6) {
    text += `✅ Депрессия: Отличные новости! Ваше настроение стабильно, вы сохраняете интерес к жизни и умеете радоваться. Продолжайте заботиться о себе!\n\n`;
  } else if (depressionScore <= 12) {
    text += `💛 Депрессия: Вы замечаете легкую грусть и снижение интереса к любимым занятиям. Это сигнал — пора позаботиться о себе! Я помогу вам вернуть радость жизни и энергию.\n\n`;
  } else if (depressionScore <= 18) {
    text += `🧡 Депрессия: Сейчас вам сложно — настроение на нуле, энергии нет, сон нарушен. Но есть хорошая новость: с профессиональной поддержкой вы сможете выйти из этого состояния. Я помогу вам снова почувствовать вкус к жизни.\n\n`;
  } else {
    text += `❤️ Депрессия: Вы переживаете очень сложный период — чувствуете подавленность, беспомощность, потерю смысла. Знайте: вы не одиноки, и выход есть. Я специализируюсь на работе с депрессией и помогу вам шаг за шагом вернуться к полноценной жизни.\n\n`;
  }

  if (stressScore <= 6) {
    text += `✅ Стресс: Вы прекрасно справляетесь с жизненными вызовами! Умеете сохранять спокойствие и находить баланс. Это большая сила!\n\n`;
  } else if (stressScore <= 12) {
    text += `💛 Стресс: Вы чувствуете перегрузку, раздражаетесь, сложно расслабиться. Стресс накапливается — важно научиться его правильно сбрасывать. Я научу вас техникам, которые работают.\n\n`;
  } else if (stressScore <= 18) {
    text += `🧡 Стресс: Стресс серьезно влияет на вашу жизнь — головные боли, напряжение, сложно сосредоточиться. Ваше тело и разум кричат SOS. Я помогу вам снизить нагрузку и научу управлять стрессом.\n\n`;
  } else {
    text += `❤️ Стресс: Вы на пределе — хроническое перенапряжение разрушает здоровье и качество жизни. Срочно нужна помощь! Я помогу вам остановить этот цикл и восстановить внутренние ресурсы.\n\n`;
  }

  if (anxietyScore <= 6) {
    text += `✅ Тревожность: Вы спокойны и уверены в себе! Умеете контролировать беспокойство и чувствуете себя комфортно в разных ситуациях.\n\n`;
  } else if (anxietyScore <= 12) {
    text += `💛 Тревожность: Тревожные мысли всё чаще одолевают вас, беспокоитесь о будущем, сложно контролировать волнение. Я помогу вам научиться управлять тревогой и вернуть спокойствие.\n\n`;
  } else if (anxietyScore <= 18) {
    text += `🧡 Тревожность: Тревога мешает жить — избегаете ситуаций, учащается пульс, не хватает воздуха. Качество жизни падает. Я специализируюсь на работе с тревожностью и помогу вам преодолеть страхи.\n\n`;
  } else {
    text += `❤️ Тревожность: Панические атаки, сильный страх без причины — это невыносимо тяжело. Но это излечимо! Я помогу вам справиться с паникой и вернуть контроль над своей жизнью.\n\n`;
  }

  if (needsProfessionalHelp) {
    text += `${'━'.repeat(60)}\n\n`;
    text += `🌟 ВАЖНОЕ СООБЩЕНИЕ ДЛЯ ВАС:\n\n`;
    text += `Ваши результаты показывают, что вам нужна профессиональная поддержка. И это НЕ слабость — это мудрость и забота о себе!\n\n`;
    text += `💪 Я помогу вам:\n`;
    text += `• Выйти из депрессии и вернуть радость жизни\n`;
    text += `• Перестать постоянно нервничать и обрести спокойствие\n`;
    text += `• Справиться с тревогой и паническими атаками\n`;
    text += `• Научиться управлять стрессом и эмоциями\n`;
    text += `• Укрепить и сохранить ментальное здоровье на долгие годы\n\n`;
    text += `📞 Кабинет хорошего психолога\n`;
    text += `Сайт: https://кабинет-хорошего-психолога.рф\n`;
    text += `WhatsApp: +7 960 258-60-60\n\n`;
    text += `Я — профессиональный сертифицированный психолог с большим опытом работы. Специализируюсь именно на том, что вас беспокоит: депрессия, тревожность, стресс, панические атаки.\n\n`;
    text += `Вместе мы пройдем этот путь. Первый шаг — самый важный. Напишите мне прямо сейчас! 💚\n\n`;
  } else if (hasModerateSymptoms) {
    text += `${'━'.repeat(60)}\n\n`;
    text += `💡 РЕКОМЕНДАЦИЯ:\n\n`;
    text += `У вас есть тревожные сигналы. Не ждите, пока станет хуже! Профилактика и ранняя работа с психологом помогут вам:\n`;
    text += `• Не допустить развития серьезных проблем\n`;
    text += `• Укрепить ментальное здоровье\n`;
    text += `• Научиться техникам саморегуляции\n`;
    text += `• Жить спокойнее и счастливее\n\n`;
    text += `📞 Кабинет хорошего психолога\n`;
    text += `Сайт: https://кабинет-хорошего-психолога.рф\n`;
    text += `WhatsApp: +7 960 258-60-60\n\n`;
    text += `Позаботьтесь о себе сейчас, чтобы завтра было легче! 🌱\n\n`;
  } else {
    text += `${'━'.repeat(60)}\n\n`;
    text += `🌈 ОТЛИЧНАЯ НОВОСТЬ!\n\n`;
    text += `Ваши результаты в норме! Но помните: ментальное здоровье нужно поддерживать, как и физическое.\n\n`;
    text += `Если заметите изменения или захотите научиться лучше управлять эмоциями — я всегда готов помочь!\n\n`;
    text += `📞 Кабинет хорошего психолога\n`;
    text += `Сайт: https://кабинет-хорошего-психолога.рф\n`;
    text += `WhatsApp: +7 960 258-60-60\n\n`;
  }

  text += `${'━'.repeat(60)}\n\n`;
  text += `🎯 БАЗОВЫЕ РЕКОМЕНДАЦИИ:\n\n`;
  
  generalRecommendations.forEach((rec, index) => {
    text += `${index + 1}. ${rec.title}\n`;
    text += `   ${rec.description}\n\n`;
  });

  text += `${'━'.repeat(60)}\n\n`;
  text += `⚠️ Дисклеймер: Это тестирование не заменяет профессиональную консультацию. Для точной диагностики обратитесь к специалисту.\n`;

  return text;
};

export const shareResults = async (depressionScore: number, stressScore: number, anxietyScore: number, burnoutScore = 0, neuroScore = 0) => {
  const text = generateResultsText(depressionScore, stressScore, anxietyScore, burnoutScore, neuroScore);
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Результаты нейродиагностики ментального здоровья',
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