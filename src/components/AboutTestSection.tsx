import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutTestSection = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <Card className="p-6 sm:p-8 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Icon name="Brain" size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">О диагностике</h2>
            <p className="text-sm text-gray-500">Комплексная нейродиагностика ментального здоровья</p>
          </div>
        </div>

        <div className="space-y-6 text-gray-700">

          <section className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Layers" size={20} className="text-primary" />
              Что включает комплексная диагностика?
            </h3>
            <p className="leading-relaxed mb-4">
              Этот тест — не просто опросник. Это комплексный инструмент из 5 научно обоснованных блоков, 
              который позволяет получить полную картину вашего психологического и нейропсихологического состояния. 
              Я разработал эту диагностику, объединив проверенные методики в один удобный формат.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { icon: 'CloudRain', color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Психологическое состояние', desc: 'На основе DASS-21' },
                { icon: 'Zap', color: 'bg-orange-100 text-orange-700 border-orange-200', label: 'Уровень стресса', desc: 'Шкала стресса PSS' },
                { icon: 'AlertCircle', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Тревожность', desc: 'GAD-адаптация' },
                { icon: 'Flame', color: 'bg-red-100 text-red-700 border-red-200', label: 'Эмоциональное выгорание', desc: 'По модели Маслач' },
                { icon: 'Brain', color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Нейродиагностика', desc: 'Когнитивные функции' },
              ].map((block) => (
                <div key={block.label} className={`p-3 rounded-lg border ${block.color}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={block.icon} size={16} />
                    <span className="font-semibold text-sm">{block.label}</span>
                  </div>
                  <p className="text-xs opacity-75">{block.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon name="Target" size={20} className="text-primary" />
              Что диагностирует каждый блок?
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CloudRain" size={20} className="text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Психологическое состояние</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Выявляет признаки депрессии: подавленность, потерю интереса к жизни, снижение энергии, нарушения сна и аппетита, чувство вины и безнадёжности. Основан на международной шкале DASS-21.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-orange-200 bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Zap" size={20} className="text-orange-600" />
                  <h4 className="font-semibold text-gray-900">Уровень стресса</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Оценивает хроническое напряжение: перегрузку обязанностями, раздражительность, трудности с расслаблением, физические симптомы стресса (головные боли, бессонница), склонность к вредным привычкам.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertCircle" size={20} className="text-yellow-600" />
                  <h4 className="font-semibold text-gray-900">Тревожность</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Диагностирует тревожные расстройства: беспочвенное беспокойство, панические атаки, избегающее поведение, физические проявления тревоги (сердцебиение, одышка, мышечное напряжение).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Flame" size={20} className="text-red-600" />
                  <h4 className="font-semibold text-gray-900">Эмоциональное выгорание</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Основан на модели выгорания Кристины Маслач. Выявляет эмоциональное истощение, деперсонализацию (цинизм, равнодушие), снижение профессиональной эффективности и потерю смысла деятельности.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Brain" size={20} className="text-purple-600" />
                  <h4 className="font-semibold text-gray-900">Нейродиагностика</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Оценивает когнитивные функции и состояние нервной системы: концентрацию внимания, кратковременную память, сенсорную чувствительность, когнитивную гибкость, эмоциональную регуляцию и импульсный контроль.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Award" size={20} className="text-primary" />
              Научная основа
            </h3>
            <ul className="space-y-2">
              {[
                'DASS-21 используется в клинической практике более 30 лет и валидирован в 1000+ исследованиях',
                'Модель выгорания Маслач — золотой стандарт диагностики профессионального выгорания',
                'Нейропсихологические методики адаптированы из клинической практики оценки когнитивных функций',
                'Комплексный подход позволяет выявить взаимосвязи между разными аспектами ментального здоровья',
                'Методики переведены и адаптированы для русскоязычной аудитории',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="CheckCircle" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="HelpCircle" size={20} className="text-primary" />
              Шкала интерпретации результатов
            </h3>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 font-semibold text-gray-900">Уровень</th>
                    <th className="text-center py-2 font-semibold text-gray-900">Баллы</th>
                    <th className="text-left py-2 font-semibold text-gray-900 pl-4">Что означает</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-green-700 font-medium">🟢 Норма (Низкий)</td>
                    <td className="text-center">0–6</td>
                    <td className="pl-4 text-xs">Всё в порядке, состояние стабильное</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-yellow-700 font-medium">🟡 Умеренный</td>
                    <td className="text-center">7–12</td>
                    <td className="pl-4 text-xs">Есть тревожные сигналы, стоит обратить внимание</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 text-orange-700 font-medium">🟠 Средний</td>
                    <td className="text-center">13–18</td>
                    <td className="pl-4 text-xs">Рекомендована консультация специалиста</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-red-700 font-medium">🔴 Высокий</td>
                    <td className="text-center">19–24</td>
                    <td className="pl-4 text-xs">Необходима профессиональная помощь</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Users" size={20} className="text-primary" />
              Кому подходит эта диагностика?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Тем, кто чувствует хроническую усталость и не понимает причину',
                'Людям, испытывающим тревогу или панические атаки',
                'Тем, кто подозревает у себя выгорание на работе',
                'Тем, кто хочет понять своё психологическое состояние',
                'Людям, замечающим снижение концентрации и памяти',
                'Всем, кто заботится о своём ментальном здоровье',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Icon name="Check" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={24} className="text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Важно помнить</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    'Тест не заменяет консультацию специалиста — это инструмент самооценки и первичной диагностики',
                    'Результаты отражают ваше состояние за последние 1-2 недели',
                    'При высоких показателях обратитесь к квалифицированному психологу — это важно для вашего здоровья',
                    'Диагностика полностью конфиденциальна — ваши результаты нигде не сохраняются',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border-2 border-primary">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-white p-2 rounded-full flex-shrink-0">
                <Icon name="UserRound" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">От психолога</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  Я создал эту диагностику, чтобы вы могли быстро и точно понять своё состояние. 
                  Часто люди годами живут с тревогой, выгоранием или депрессией, не понимая, что с ними происходит. 
                  Эта диагностика — первый шаг к ясности и изменениям.
                </p>
                <p className="text-sm text-primary font-semibold">
                  Если результаты вас насторожили — напишите мне. Вместе мы разберёмся и найдём путь к лучшему состоянию 💚
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <a
                    href="https://кабинет-хорошего-психолога.рф"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline hover:text-primary/80"
                  >
                    кабинет-хорошего-психолога.рф
                  </a>
                  <span className="hidden sm:inline text-gray-400">·</span>
                  <a
                    href="https://wa.me/79602586060"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 underline hover:text-green-700"
                  >
                    WhatsApp: +7 960 258-60-60
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </Card>
    </div>
  );
};

export default AboutTestSection;
