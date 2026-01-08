import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Tab = 'home' | 'youtube' | 'tiktok' | 'favorites' | 'profile';

interface Video {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  duration: string;
  platform: 'youtube' | 'tiktok';
  isFavorite: boolean;
  description: string;
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Топ 10 трендов 2026',
    channel: 'TrendWatch',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    views: '1.2M',
    duration: '10:24',
    platform: 'youtube',
    isFavorite: false,
    description: 'Разбираем главные тренды этого года'
  },
  {
    id: '2',
    title: 'Крутой лайфхак дня',
    channel: 'LifeHacks Pro',
    thumbnail: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    views: '850K',
    duration: '0:45',
    platform: 'tiktok',
    isFavorite: true,
    description: 'Полезный совет на каждый день'
  },
  {
    id: '3',
    title: 'Новый вызов принят!',
    channel: 'Challenge Masters',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    views: '2.5M',
    duration: '0:58',
    platform: 'tiktok',
    isFavorite: false,
    description: 'Самый популярный челлендж месяца'
  },
  {
    id: '4',
    title: 'Обзор лучших гаджетов',
    channel: 'Tech Review',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    views: '3.1M',
    duration: '15:32',
    platform: 'youtube',
    isFavorite: true,
    description: 'Подробный обзор новинок техники'
  },
  {
    id: '5',
    title: 'Танцевальный челлендж',
    channel: 'Dance Vibes',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    views: '5.2M',
    duration: '0:30',
    platform: 'tiktok',
    isFavorite: false,
    description: 'Повторяй за нами этот танец'
  },
  {
    id: '6',
    title: 'Как это работает?',
    channel: 'Science Today',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    views: '920K',
    duration: '12:15',
    platform: 'youtube',
    isFavorite: false,
    description: 'Объясняем сложное простым языком'
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const toggleFavorite = (id: string) => {
    setVideos(videos.map(video => 
      video.id === id ? { ...video, isFavorite: !video.isFavorite } : video
    ));
    if (currentVideo?.id === id) {
      setCurrentVideo({ ...currentVideo, isFavorite: !currentVideo.isFavorite });
    }
  };

  const filteredVideos = () => {
    if (activeTab === 'home') return videos;
    if (activeTab === 'youtube') return videos.filter(v => v.platform === 'youtube');
    if (activeTab === 'tiktok') return videos.filter(v => v.platform === 'tiktok');
    if (activeTab === 'favorites') return videos.filter(v => v.isFavorite);
    return [];
  };

  const openVideo = (video: Video) => {
    const filtered = filteredVideos();
    const index = filtered.findIndex(v => v.id === video.id);
    setCurrentVideo(video);
    setCurrentIndex(index);
    incrementViews(video.id);
  };

  const incrementViews = (videoId: string) => {
    setVideos(prevVideos => prevVideos.map(v => {
      if (v.id === videoId) {
        const viewsNum = parseFloat(v.views.replace('M', '').replace('K', ''));
        const multiplier = v.views.includes('M') ? 1000000 : 1000;
        const newViews = viewsNum * multiplier + Math.floor(Math.random() * 50) + 10;
        
        let formatted;
        if (newViews >= 1000000) {
          formatted = (newViews / 1000000).toFixed(1) + 'M';
        } else if (newViews >= 1000) {
          formatted = (newViews / 1000).toFixed(0) + 'K';
        } else {
          formatted = newViews.toString();
        }
        
        return { ...v, views: formatted };
      }
      return v;
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVideos(prevVideos => prevVideos.map(v => {
        if (Math.random() > 0.7) {
          const viewsNum = parseFloat(v.views.replace('M', '').replace('K', ''));
          const multiplier = v.views.includes('M') ? 1000000 : 1000;
          const newViews = viewsNum * multiplier + Math.floor(Math.random() * 100) + 50;
          
          let formatted;
          if (newViews >= 1000000) {
            formatted = (newViews / 1000000).toFixed(1) + 'M';
          } else if (newViews >= 1000) {
            formatted = (newViews / 1000).toFixed(0) + 'K';
          } else {
            formatted = newViews.toString();
          }
          
          return { ...v, views: formatted };
        }
        return v;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const closeVideo = () => {
    setCurrentVideo(null);
  };

  const nextVideo = () => {
    const filtered = filteredVideos();
    const nextIndex = (currentIndex + 1) % filtered.length;
    setCurrentVideo(filtered[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const prevVideo = () => {
    const filtered = filteredVideos();
    const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
    setCurrentVideo(filtered[prevIndex]);
    setCurrentIndex(prevIndex);
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

    const filtered = filteredVideos();

    return (
      <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">
        {filtered.map((video, index) => (
          <div
            key={video.id}
            onClick={() => openVideo(video)}
            className="group relative rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 bg-card border border-border"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative aspect-[9/16] md:aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <Badge 
                variant={video.platform === 'youtube' ? 'destructive' : 'default'}
                className="absolute top-4 left-4"
              >
                {video.platform === 'youtube' ? (
                  <Icon name="Youtube" size={14} className="mr-1" />
                ) : (
                  <span className="mr-1">🎵</span>
                )}
                {video.platform === 'youtube' ? 'YouTube' : 'TikTok'}
              </Badge>

              <div className="absolute top-4 right-4 bg-black/70 px-2 py-1 rounded text-xs">
                {video.duration}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <Icon name="Play" size={32} className="ml-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-1 text-white">
                      {video.title}
                    </h3>
                    <p className="text-sm text-white/80 mb-2">{video.description}</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span className="font-medium">{video.channel}</span>
                      <span className="flex items-center gap-1 transition-all duration-300">
                        <Icon name="Eye" size={14} />
                        {video.views}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(video.id);
                    }}
                    className="bg-black/70 hover:bg-black/90 p-3 rounded-full transition-all shrink-0"
                  >
                    <Icon 
                      name="Heart" 
                      size={20} 
                      className={video.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
          <div className="mb-8 animate-slide-up max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-2">
              {activeTab === 'home' && 'Персональные рекомендации'}
              {activeTab === 'youtube' && 'YouTube'}
              {activeTab === 'tiktok' && 'TikTok'}
              {activeTab === 'favorites' && 'Избранное'}
            </h2>
            <p className="text-muted-foreground">
              {activeTab === 'home' && 'Подобрано специально для вас на основе истории просмотров'}
              {activeTab === 'youtube' && 'Длинные видео и обзоры'}
              {activeTab === 'tiktok' && 'Короткие видео и челленджи'}
              {activeTab === 'favorites' && 'Ваши сохранённые видео'}
            </p>
          </div>
        )}
        
        {renderContent()}
      </main>

      {currentVideo && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center animate-fade-in">
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all"
          >
            <Icon name="X" size={24} />
          </button>

          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-4 rounded-full transition-all hidden md:block"
          >
            <Icon name="ChevronLeft" size={32} />
          </button>

          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-4 rounded-full transition-all hidden md:block"
          >
            <Icon name="ChevronRight" size={32} />
          </button>

          <div className="w-full h-full max-w-4xl max-h-[90vh] flex flex-col p-4">
            <video
              src={currentVideo.videoUrl}
              controls
              autoPlay
              onEnded={nextVideo}
              className="w-full rounded-2xl flex-1 object-contain"
            />
            
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={currentVideo.platform === 'youtube' ? 'destructive' : 'default'}>
                    {currentVideo.platform === 'youtube' ? (
                      <><Icon name="Youtube" size={14} className="mr-1" />YouTube</>
                    ) : (
                      <><span className="mr-1">🎵</span>TikTok</>
                    )}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{currentVideo.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{currentVideo.title}</h3>
                <p className="text-muted-foreground mb-3">{currentVideo.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">{currentVideo.channel}</span>
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    {currentVideo.views}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(currentVideo.id)}
                className="bg-card hover:bg-accent p-3 rounded-full transition-all shrink-0"
              >
                <Icon 
                  name="Heart" 
                  size={24} 
                  className={currentVideo.isFavorite ? 'fill-red-500 text-red-500' : ''}
                />
              </button>
            </div>
          </div>
        </div>
      )}

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