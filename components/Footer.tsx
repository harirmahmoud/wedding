"use client";
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContex';
import Logo from './Logo';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import mosaicBg1 from '@/assets/mosaic-bg-1.jpeg';
import Image from 'next/image';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="pt-16 pb-8 relative overflow-hidden">
      {/* Background mosaic */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosaicBg1})` }}
      />
      <div className="absolute inset-0 bg-background/90" />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className='flex gap-4'>
                          <Image
                                  src="/logo2.jpeg"
                                  alt="Yasmine Events Logo"
                                  width={50}
                                  height={50}
                                  
                                />
                                <div className="flex flex-col">
                      <span className="text-xl md:text-2xl font-bold text-foreground tracking-wide">
                        Yasmine Events
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground italic">
                        La beauté de chaque moment
                      </span>
                    </div>
                      </div>
            <p className="text-muted-foreground leading-relaxed">
              Yasmine Events - La beauté de chaque moment. Votre partenaire pour des événements inoubliables.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+213 XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@yasmineevents.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Algérie</span>
              </div>
            </div>
          </div>

          {/* Decorative */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="w-32 h-32 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                <polygon 
                  points="50,5 93.3,27.5 93.3,72.5 50,95 6.7,72.5 6.7,27.5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  className="text-primary"
                />
                <polygon 
                  points="50,20 78,35 78,65 50,80 22,65 22,35" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                  className="text-accent"
                />
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Yasmine Events. {t.footer.rights}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> in Algeria
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
