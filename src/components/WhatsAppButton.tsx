import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = '79602586060'; // +7 960 258 60 60
  const message = 'Здравствуйте! Прошёл тест на вашем сайте и хотел бы проконсультироваться.';

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px] animate-fade-in">
            <p className="text-sm font-medium text-gray-900 mb-1">
              Есть вопросы?
            </p>
            <p className="text-xs text-gray-600">
              Напишите нам в WhatsApp, мы ответим в течение часа!
            </p>
          </div>
        )}
        
        <Button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          size="lg"
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 p-0"
        >
          <Icon name="MessageCircle" size={28} />
        </Button>

        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </div>
  );
};

export default WhatsAppButton;
