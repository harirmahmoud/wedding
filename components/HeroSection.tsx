import React from 'react';
import { useLanguage } from '@/contexts/LanguageContex';
import { Button } from '@/components/ui/button';
import { Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import mosaicBg1 from '@/assets/photo1.jpeg';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background mosaic */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosaicBg1})` }}
      />
      <div className="absolute inset-0 -z-10">
  <Image
    src={mosaicBg1}
    alt="Mosaic background"
    fill
    className="object-cover"
  />
</div>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-background/65" />
      
      {/* Decorative Islamic geometric patterns */}
      <div className="absolute top-20 left-10 w-40 h-40 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-accent"
          />
          <polygon 
            points="50,15 82,32.5 82,67.5 50,85 18,67.5 18,32.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-primary"
          />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 w-60 h-60 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M50 0 L61.8 38.2 L100 50 L61.8 61.8 L50 100 L38.2 61.8 L0 50 L38.2 38.2 Z" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-primary"
          />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo SVG */}
          <div className="mb-8 flex justify-center animate-fade-in">
           {/* <Image
            src="/logo2.jpeg"
            alt="Yasmine Events Logo"
            width={120}
            height={120}
            
          /> */}

          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-4 animate-fade-in mt-70" style={{ animationDelay: '0.1s' }}>
            YASMINE EVENTS
          </h1>

          <p className="text-2xl md:text-3xl text-primary italic mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The Beauty of Every Moment
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="btn-primary text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate('event-booking')}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t.hero.bookEvent}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate('meeting-booking')}
            >
              <Users className="mr-2 h-5 w-5" />
              {t.hero.bookMeeting}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
