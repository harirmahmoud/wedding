"use client";
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContex';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, UtensilsCrossed, Palette, Music, Camera, Sparkles, Car, Mail, Plane, Moon, Luggage } from 'lucide-react';
import mosaicBg2 from '@/assets/mosaic-bg-2.jpeg';
import Image from 'next/image';
import { GiAmpleDress } from 'react-icons/gi';

const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    { key: 'venues', icon: MapPin, ...t.services.venues },
    { key: 'catering', icon: UtensilsCrossed, ...t.services.catering },
    { key: 'decoration', icon: Palette, ...t.services.decoration },
    { key: 'entertainment', icon: Music, ...t.services.entertainment },
    { key: 'photography', icon: Camera, ...t.services.photography },
    { key: 'beauty', icon: Sparkles, ...t.services.beauty },
    { key: 'transport', icon: Car, ...t.services.transport },
    { key: 'invitations', icon: Mail, ...t.services.invitations },
    {key:"nuit_de_noce", icon:Moon, ...t.services.nuit_de_noce},
    {key:"Honeymoon", icon:Plane, ...t.services.Honeymoon},
    {key:"location_de_vetement", icon:GiAmpleDress, ...t.services.location_de_vetement},
    {key:"trouse_de_marie", icon:Luggage, ...t.services.trouse_de_marie},

  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background mosaic */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mosaicBg2})` }}
      />
      <div className="absolute inset-0 -z-10">
        <Image
          src={mosaicBg2}
          alt="Mosaic background"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-background/85" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/50" />
            <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9 9H2L7 14L5 22L12 17L19 22L17 14L22 9H15L12 2Z" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.key}
              className="card-elegant group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
              {/* Islamic geometric accent */}
              <div className="absolute top-4 right-4 w-8 h-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                  <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
