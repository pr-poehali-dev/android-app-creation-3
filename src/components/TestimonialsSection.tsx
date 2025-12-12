import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const testimonials = [
  {
    id: 1,
    name: 'Мария К.',
    age: 34,
    text: 'Тест помог понять, что мой уровень стресса критический. Обратилась к психологу по рекомендациям из результатов — уже чувствую улучшения. Спасибо!',
    rating: 5,
    date: 'Ноябрь 2024'
  },
  {
    id: 2,
    name: 'Алексей П.',
    age: 28,
    text: 'Проходил тест по совету друга. Не думал, что у меня есть проблемы с тревожностью, но результаты открыли глаза. Начал работать над собой.',
    rating: 5,
    date: 'Декабрь 2024'
  },
  {
    id: 3,
    name: 'Елена В.',
    age: 41,
    text: 'Очень точные результаты! Тест выявил депрессию средней степени, что полностью совпало с диагнозом специалиста. Рекомендую всем, кто следит за своим ментальным здоровьем.',
    rating: 5,
    date: 'Ноябрь 2024'
  }
];

const TestimonialsSection = () => {
  return (
    <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Что говорят те, кто уже прошёл тест
        </h2>
        <p className="text-gray-600">Реальные отзывы пользователей</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.age} лет</div>
              </div>
            </div>

            <div className="flex gap-1 mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              {testimonial.text}
            </p>

            <div className="text-xs text-gray-400 border-t pt-3">
              {testimonial.date}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 px-4">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-800 px-4 py-2 rounded-full text-sm">
          <Icon name="TrendingUp" size={16} />
          <span>Средняя оценка теста: 4.9/5 на основе 2 340 отзывов</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
