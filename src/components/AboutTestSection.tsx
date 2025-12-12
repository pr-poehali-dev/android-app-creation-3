import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AboutTestSection = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <Card className="p-6 sm:p-8 bg-white shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <Icon name="BookOpen" size={24} className="text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">О тесте DASS-21</h2>
        </div>

        <div className="space-y-6 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Info" size={20} className="text-primary" />
              Что такое DASS-21?
            </h3>
            <p className="leading-relaxed">
              DASS-21 (Depression, Anxiety and Stress Scale) — это научно обоснованный психологический инструмент, 
              разработанный учёными Университета Нового Южного Уэльса в Австралии. Тест состоит из 21 вопроса 
              и измеряет три ключевых аспекта психологического состояния: депрессию, тревожность и стресс.
            </p>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Award" size={20} className="text-primary" />
              Научная валидность
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Используется в клинической практике по всему миру более 30 лет</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Валидирован в более чем 1000 научных исследований</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Переведён на 40+ языков и адаптирован для разных культур</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="CheckCircle" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span>Высокая точность диагностики (надёжность α > 0.87)</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Target" size={20} className="text-primary" />
              Что измеряет тест?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CloudRain" size={20} className="text-red-600" />
                  <h4 className="font-semibold text-gray-900">Депрессия</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Подавленность, потеря интереса к жизни, низкая самооценка, безнадёжность
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Zap" size={20} className="text-yellow-600" />
                  <h4 className="font-semibold text-gray-900">Стресс</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Напряжение, раздражительность, перегрузка, трудности с расслаблением
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="AlertTriangle" size={20} className="text-orange-600" />
                  <h4 className="font-semibold text-gray-900">Тревожность</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Беспокойство, паника, страхи, физические симптомы тревоги
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="HelpCircle" size={20} className="text-primary" />
              Как интерпретировать результаты?
            </h3>
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 font-semibold text-gray-900">Уровень</th>
                    <th className="text-center py-2 font-semibold text-gray-900">Депрессия</th>
                    <th className="text-center py-2 font-semibold text-gray-900">Стресс</th>
                    <th className="text-center py-2 font-semibold text-gray-900">Тревожность</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Норма</td>
                    <td className="text-center">0-6</td>
                    <td className="text-center">0-6</td>
                    <td className="text-center">0-6</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Лёгкая степень</td>
                    <td className="text-center">7-12</td>
                    <td className="text-center">7-12</td>
                    <td className="text-center">7-12</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Средняя степень</td>
                    <td className="text-center">13-18</td>
                    <td className="text-center">13-18</td>
                    <td className="text-center">13-18</td>
                  </tr>
                  <tr>
                    <td className="py-2">Высокая степень</td>
                    <td className="text-center">19-24</td>
                    <td className="text-center">19-24</td>
                    <td className="text-center">19-24</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={24} className="text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Важно помнить</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Тест не заменяет консультацию специалиста — это инструмент самооценки</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Для точного диагноза обратитесь к квалифицированному психологу или психиатру</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Результаты отражают ваше состояние за последнюю неделю</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600">•</span>
                    <span>При высоких показателях рекомендуется профессиональная помощь</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Users" size={20} className="text-primary" />
              Кому подходит тест?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <Icon name="Check" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span className="text-sm">Людям, испытывающим эмоциональные трудности</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <Icon name="Check" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span className="text-sm">Тем, кто хочет следить за своим ментальным здоровьем</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <Icon name="Check" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span className="text-sm">Людям в период стрессовых жизненных событий</span>
              </div>
              <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                <Icon name="Check" size={18} className="text-green-600 flex-shrink-0 mt-1" />
                <span className="text-sm">Тем, кто проходит психотерапию (для отслеживания прогресса)</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-primary" />
              Преимущества DASS-21
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon name="Clock" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Быстро</h4>
                  <p className="text-sm text-gray-600">Занимает всего 5 минут</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon name="Shield" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Надёжно</h4>
                  <p className="text-sm text-gray-600">Научно проверенная методика</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon name="Eye" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Анонимно</h4>
                  <p className="text-sm text-gray-600">Данные не сохраняются</p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                <Icon name="BarChart3" size={20} className="text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Подробно</h4>
                  <p className="text-sm text-gray-600">Оценка по трём шкалам</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Card>

      <Card className="p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-primary">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Источники и литература</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Lovibond, S.H. & Lovibond, P.F. (1995). Manual for the Depression Anxiety Stress Scales. 
              Sydney: Psychology Foundation.
            </p>
            <p>
              Henry, J.D. & Crawford, J.R. (2005). The short-form version of the Depression Anxiety Stress Scales (DASS-21): 
              Construct validity and normative data in a large non-clinical sample. British Journal of Clinical Psychology, 44, 227-239.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutTestSection;
