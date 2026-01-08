import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Tab = 'home' | 'youtube' | 'tiktok' | 'favorites' | 'profile';

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  views: string;
  duration: string;
  platform: 'youtube' | 'tiktok';
  isFavorite: boolean;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Топ 10 трендов 2026',
    channel: 'TrendWatch',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    views: '1.2M',
    duration: '10:24',
    platform: 'youtube',
    isFavorite: false
  },
  {
    id: '2',
    title: 'Крутой лайфхак дня',
    channel: 'LifeHacks Pro',
    thumbnail: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    views: '850K',
    duration: '0:45',
    platform: 'tiktok',
    isFavorite: true
  },
  {
    id: '3',
    title: 'Новый вызов принят!',
    channel: 'Challenge Masters',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    views: '2.5M',
    duration: '0:58',
    platform: 'tiktok',
    isFavorite: false
  },
  {
    id: '4',
    title: 'Обзор лучших гаджетов',
    channel: 'Tech Review',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    views: '3.1M',
    duration: '15:32',
    platform: 'youtube',
    isFavorite: true
  },
  {
    id: '5',
    title: 'Танцевальный челлендж',
    channel: 'Dance Vibes',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    views: '5.2M',
    duration: '0:30',
    platform: 'tiktok',
    isFavorite: false
  },
  {
    id: '6',
    title: 'Как это работает?',
    channel: 'Science Today',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    views: '920K',
    duration: '12:15',
    platform: 'youtube',
    isFavorite: false
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [videos, setVideos] = useState<Video[]>(mockVideos);

  const toggleFavorite = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, isFavorite: !video.isFavorite } : video
    ));
  };

  const filteredVideos = () => {
    if (activeTab === 'home') return videos;
    if (activeTab === 'youtube') return videos.filter(v => v.platform === 'youtube');
    if (activeTab === 'tiktok') return videos.filter(v => v.platform === 'tiktok');
    if (activeTab === 'favorites') return videos.filter(v => v.isFavorite);
    return [];
  };

  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] animate-fade-in">
          <Avatar className="w-32 h-32 mb-6 ring-4 ring-primary">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-bold mb-2">Ваш профиль</h2>
          <p className="text-muted-foreground mb-6">user@example.com</p>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold gradient-text">{videos.filter(v => v.isFavorite).length}</p>
              <p className="text-sm text-muted-foreground">Избранное</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">{videos.length}</p>
              <p className="text-sm text-muted-foreground">Просмотрено</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">24</p>
              <p className="text-sm text-muted-foreground">Часов</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        {filteredVideos().map((video, index) => (
          <Card 
            key={video.id} 
            className="group overflow-hidden hover:scale-[1.02] transition-all duration-300 bg-card border-border cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <Badge 
                variant={video.platform === 'youtube' ? 'destructive' : 'default'}
                className="absolute top-2 left-2"
              >
                {video.platform === 'youtube' ? (
                  <Icon name="Youtube" size={14} className="mr-1" />
                ) : (
                  <span className="mr-1">🎵</span>
                )}
                {video.platform === 'youtube' ? 'YouTube' : 'TikTok'}
              </Badge>
              <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                {video.duration}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(video.id);
                }}
                className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-all"
              >
                <Icon 
                  name="Heart" 
                  size={20} 
                  className={video.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:gradient-text transition-all">
                {video.title}
              </h3>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{video.channel}</span>
                <span className="flex items-center gap-1">
                  <Icon name="Eye" size={14} />
                  {video.views}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold gradient-text">VideoHub</h1>
            <div className="flex items-center gap-2">
              <Icon name="Search" size={24} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Icon name="Bell" size={24} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab !== 'profile' && (
          <div className="mb-8 animate-slide-up">
            <h2 className="text-2xl font-bold mb-2">
              {activeTab === 'home' && 'Персональные рекомендации'}
              {activeTab === 'youtube' && 'YouTube видео'}
              {activeTab === 'tiktok' && 'TikTok видео'}
              {activeTab === 'favorites' && 'Избранное'}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === 'home' && 'Подобрано специально для вас на основе истории просмотров'}
              {activeTab === 'youtube' && 'Лучшие видео с YouTube'}
              {activeTab === 'tiktok' && 'Популярные видео из TikTok'}
              {activeTab === 'favorites' && 'Ваши сохранённые видео'}
            </p>
          </div>
        )}
        
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 border-t border-border backdrop-blur-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-4">
            {[
              { id: 'home' as Tab, icon: 'Home', label: 'Главная' },
              { id: 'youtube' as Tab, icon: 'Youtube', label: 'YouTube' },
              { id: 'tiktok' as Tab, icon: 'Music', label: 'TikTok' },
              { id: 'favorites' as Tab, icon: 'Heart', label: 'Избранное' },
              { id: 'profile' as Tab, icon: 'User', label: 'Профиль' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === tab.id 
                    ? 'text-primary scale-110' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={24} />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
