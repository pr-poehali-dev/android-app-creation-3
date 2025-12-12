import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const phoneNumber = '79602586060'; // +7 960 258 60 60

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Здравствуйте! Прошёл тест на вашем сайте.%0A%0AИмя: ${formData.name}%0AКонтакт: ${formData.contact}%0A%0A${formData.message || 'Хочу записаться на консультацию'}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const handleTelegramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Здравствуйте! Прошёл тест на вашем сайте.%0A%0AИмя: ${formData.name}%0AКонтакт: ${formData.contact}%0A%0A${formData.message || 'Хочу записаться на консультацию'}`;
    window.open(`https://t.me/${phoneNumber}?text=${text}`, '_blank');
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:+${phoneNumber}`;
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 sm:p-8 shadow-xl bg-white border-2 border-primary">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full mb-4">
          <Icon name="Calendar" size={28} />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Записаться на консультацию
        </h3>
        <p className="text-gray-600">
          Заполните форму, и мы свяжемся с вами в удобном мессенджере
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="Иван"
          />
        </div>

        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
            Телефон или Telegram *
          </label>
          <input
            type="text"
            id="contact"
            required
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            placeholder="+7 900 123-45-67 или @username"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Сообщение (необязательно)
          </label>
          <textarea
            id="message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            placeholder="Расскажите о вашем запросе..."
          />
        </div>

        <div className="pt-4 space-y-3">
          <Button
            type="button"
            onClick={handleWhatsAppSubmit}
            size="lg"
            className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white"
            disabled={!formData.name || !formData.contact}
          >
            <Icon name="MessageCircle" size={20} />
            Отправить в WhatsApp
          </Button>

          <Button
            type="button"
            onClick={handleTelegramSubmit}
            size="lg"
            variant="outline"
            className="w-full gap-2 bg-sky-500 hover:bg-sky-600 text-white border-sky-500"
            disabled={!formData.name || !formData.contact}
          >
            <Icon name="Send" size={20} />
            Отправить в Telegram
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">или</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handlePhoneCall}
            size="lg"
            variant="outline"
            className="w-full gap-2"
          >
            <Icon name="Phone" size={20} />
            Позвонить: +7 960 258-60-60
          </Button>
        </div>

        <div className="pt-4 text-xs text-gray-500 text-center">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="flex items-center justify-center mb-2">
              <Icon name="Clock" size={20} className="text-primary" />
            </div>
            <p className="text-gray-600">Ответим в течение часа</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <p className="text-gray-600">100% конфиденциально</p>
          </div>
          <div>
            <div className="flex items-center justify-center mb-2">
              <Icon name="Heart" size={20} className="text-primary" />
            </div>
            <p className="text-gray-600">Предварительная консультация бесплатно</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingForm;