import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Notification {
  id: number;
  name: string;
  city: string;
  action: string;
}

const names = ['Мария', 'Алексей', 'Елена', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Иван', 'Наталья', 'Андрей', 'Татьяна', 'Михаил'];
const cities = ['Москвы', 'Санкт-Петербурга', 'Новосибирска', 'Екатеринбурга', 'Казани', 'Нижнего Новгорода', 'Челябинска', 'Самары', 'Омска', 'Ростова-на-Дону', 'Уфы', 'Красноярска'];
const actions = ['только что прошла тест', 'только что прошёл тест', 'завершила тестирование', 'завершил тестирование', 'получила результаты', 'получил результаты'];

const LiveNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];

      const newNotification: Notification = {
        id: nextId,
        name,
        city,
        action
      };

      setNotifications(prev => [...prev, newNotification]);
      setNextId(prev => prev + 1);

      // Удаляем уведомление через 5 секунд
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    };

    // Показываем первое уведомление через 5 секунд после загрузки
    const initialTimeout = setTimeout(showNotification, 5000);

    // Затем показываем уведомления каждые 15-30 секунд
    const interval = setInterval(() => {
      showNotification();
    }, (Math.random() * 15000) + 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [nextId]);

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white border-2 border-primary shadow-xl rounded-lg p-4 min-w-[280px] max-w-[350px] animate-slide-in-left"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              {notification.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 truncate">
                  {notification.name}
                </span>
                <span className="text-xs text-gray-500">из {notification.city}</span>
              </div>
              <p className="text-sm text-gray-600">{notification.action}</p>
            </div>
            <div className="flex-shrink-0">
              <Icon name="CheckCircle" size={16} className="text-green-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveNotifications;
