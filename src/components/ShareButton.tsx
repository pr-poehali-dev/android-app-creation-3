import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

const ShareButton = ({ 
  title = 'Тест на депрессию, стресс и тревожность', 
  text = 'Прошёл научно обоснованный тест DASS-21. Узнай свой уровень стресса за 5 минут!',
  url = window.location.href
}: ShareButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const shareData = {
    title,
    text,
    url
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const socialLinks = [
    {
      name: 'VK',
      icon: 'Share2',
      url: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Telegram',
      icon: 'Send',
      url: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Ссылка скопирована в буфер обмена!');
      setShowMenu(false);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="default"
        className="gap-2"
      >
        <Icon name="Share2" size={18} />
        Поделиться результатами
      </Button>

      {showMenu && !navigator.share && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50 min-w-[200px]">
          <div className="text-sm font-medium text-gray-700 mb-3">Поделиться в:</div>
          <div className="flex flex-col gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors`}
                onClick={() => setShowMenu(false)}
              >
                <Icon name={social.icon as any} size={16} />
                {social.name}
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <Icon name="Copy" size={16} />
              Скопировать ссылку
            </button>
          </div>
          <button
            onClick={() => setShowMenu(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 w-full text-center"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
