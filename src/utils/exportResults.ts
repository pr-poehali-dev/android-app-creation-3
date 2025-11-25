import { jsPDF } from 'jspdf';

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

export const generateResultsText = (depressionScore: number, stressScore: number, anxietyScore: number): string => {
  const maxScore = 24;
  const depressionLevel = getDepressionLevel(depressionScore);
  const stressLevel = getStressLevel(stressScore);
  const anxietyLevel = getAnxietyLevel(anxietyScore);
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12 || anxietyScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6 || anxietyScore > 6;
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

export const downloadResults = (depressionScore: number, stressScore: number, anxietyScore: number) => {
  const text = generateResultsText(depressionScore, stressScore, anxietyScore);
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

export const shareResults = async (depressionScore: number, stressScore: number, anxietyScore: number) => {
  const text = generateResultsText(depressionScore, stressScore, anxietyScore);
  
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

export const downloadPDF = (depressionScore: number, stressScore: number, anxietyScore: number) => {
  const doc = new jsPDF();
  const maxScore = 24;
  const depressionLevel = getDepressionLevel(depressionScore);
  const stressLevel = getStressLevel(stressScore);
  const anxietyLevel = getAnxietyLevel(anxietyScore);
  const needsProfessionalHelp = depressionScore > 12 || stressScore > 12 || anxietyScore > 12;
  const hasModerateSymptoms = depressionScore > 6 || stressScore > 6 || anxietyScore > 6;
  const date = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let yPos = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('REZULTATY TESTIROVANIYA', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;
  doc.text('MENTALNOGO ZDOROVYA', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text(`Data prohozhdeniya: ${date}`, pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  doc.setDrawColor(255, 160, 0);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('VASHI REZULTATY', margin, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Depressiya:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${depressionScore} iz ${maxScore} ballov`, margin + 50, yPos);
  yPos += 7;
  doc.text(`Uroven: ${depressionLevel}`, margin, yPos);
  yPos += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Stress:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${stressScore} iz ${maxScore} ballov`, margin + 50, yPos);
  yPos += 7;
  doc.text(`Uroven: ${stressLevel}`, margin, yPos);
  yPos += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Trevozhnost:', margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${anxietyScore} iz ${maxScore} ballov`, margin + 50, yPos);
  yPos += 7;
  doc.text(`Uroven: ${anxietyLevel}`, margin, yPos);
  yPos += 15;

  if (needsProfessionalHelp) {
    doc.setDrawColor(255, 193, 7);
    doc.setFillColor(255, 248, 225);
    doc.rect(margin, yPos, contentWidth, 45, 'FD');
    yPos += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('VAZHNO: REKOMENDUETSYA KONSULTACIYA SPECIALISTA', margin + 5, yPos);
    yPos += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const warningText = [
      'Vashi rezultaty pokazyvayut, chto vam mozhet pomoch',
      'professionalnaya podderzhka. Psiholog pomozhet razobratsya',
      'v situacii i najti effektivnye resheniya.',
    ];
    warningText.forEach((line) => {
      doc.text(line, margin + 5, yPos);
      yPos += 6;
    });

    yPos += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('Rekomenduemsya obratitsya v Kabinet horoshego psihologa:', margin + 5, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 255);
    doc.text('Sajt: https://kabinet-horoshego-psihologa.rf', margin + 5, yPos);
    yPos += 6;
    doc.setTextColor(0, 0, 0);
    doc.text('WhatsApp: +7 960 258-60-60', margin + 5, yPos);
    yPos += 15;
  }

  doc.setDrawColor(255, 160, 0);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('REKOMENDACII PO ULUCHSHENIYU SOSTOYANIYA', margin, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  const recommendations = [
    { title: 'Zdorovyj son', desc: 'Starajtes spat 7-9 chasov v sutki. Soblyudajte rezhim sna.' },
    { title: 'Fizicheskaya aktivnost', desc: 'Regulyarnye uprazhneniya pomogayut snizit stress i uluchshit nastroenie.' },
    { title: 'Pravilnoe pitanie', desc: 'Sbalansirovannoe pitanie polozhitelno vliyaet na psihicheskoe sostoyanie.' },
    { title: 'Socialnye kontakty', desc: 'Obshenie s blizkimi lyudmi pomogaet spravitsya s trudnostyami.' },
    { title: 'Praktiki osoznannosti', desc: 'Meditaciya i dyhatelnye uprazhneniya pomogayut snizit trevozhnost.' },
    { title: 'Hobbi i uvlecheniya', desc: 'Udelyajte vremya tomu, chto prinosit vam radost i udovolstvie.' },
  ];

  recommendations.forEach((rec, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${rec.title}`, margin, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(rec.desc, contentWidth - 10);
    lines.forEach((line: string) => {
      doc.text(line, margin + 5, yPos);
      yPos += 5;
    });
    yPos += 3;
  });

  if (hasModerateSymptoms && !needsProfessionalHelp) {
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    yPos += 5;
    doc.setDrawColor(33, 150, 243);
    doc.setFillColor(227, 242, 253);
    doc.rect(margin, yPos, contentWidth, 25, 'FD');
    yPos += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SLEDITE ZA SVOIM SOSTOYANIEM', margin + 5, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const infoLines = doc.splitTextToSize(
      'Esli simptomy usilivayutsya ili ne prohodyat v techenie dlitelnogo vremeni, rekomenduetsya prokonsulirovatsya so specialistom.',
      contentWidth - 10
    );
    infoLines.forEach((line: string) => {
      doc.text(line, margin + 5, yPos);
      yPos += 5;
    });
  }

  if (yPos > 260) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos = doc.internal.pageSize.height - 20;
  }

  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(128, 128, 128);
  const disclaimerLines = doc.splitTextToSize(
    'Eto prilozhenie ne zamenyaet professionalnuyu medicinskuyu konsultaciyu. Rezultaty nosyat informacionnyj harakter.',
    contentWidth
  );
  disclaimerLines.forEach((line: string) => {
    doc.text(line, margin, yPos);
    yPos += 4;
  });

  const dateStr = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
  doc.save(`rezultaty-testa-${dateStr}.pdf`);
};