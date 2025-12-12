import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const LiveCounter = () => {
  const baseCount = 50243; // Базовое количество прошедших тест
  const [count, setCount] = useState(baseCount);
  const [recentUsers, setRecentUsers] = useState(0);

  useEffect(() => {
    // Увеличиваем счётчик каждые 30-90 секунд на 1-3
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1;
      setCount(prev => prev + increment);
      setRecentUsers(increment);
      
      // Сброс индикатора новых пользователей через 3 секунды
      setTimeout(() => setRecentUsers(0), 3000);
    }, (Math.random() * 60000) + 30000); // 30-90 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Icon name="Users" size={24} />
            {recentUsers > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
            )}
          </div>
          <div>
            <div className="text-xs opacity-90">Тест прошли</div>
            <div className="text-xl font-bold">{count.toLocaleString('ru-RU')}</div>
          </div>
        </div>
        
        {recentUsers > 0 && (
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm animate-fade-in">
            <Icon name="TrendingUp" size={16} />
            <span>+{recentUsers} сейчас</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Icon name="Clock" size={16} />
          <span>Онлайн: {Math.floor(Math.random() * 8) + 12} чел.</span>
        </div>
      </div>
    </div>
  );
};

export default LiveCounter;
