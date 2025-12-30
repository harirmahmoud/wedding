"use client";
import React, { useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import EventBookingForm from '@/components/EventBookingForm';
import MeetingBookingForm from '@/components/MeetingBookingForm';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';

const Home= () => {
  const sectionsRef = {
    home: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    'event-booking': useRef<HTMLDivElement>(null),
    'meeting-booking': useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: string) => {
    const ref = sectionsRef[section as keyof typeof sectionsRef];
    if (ref?.current) {
      const headerOffset = 80;
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingElements />
      <Header onNavigate={scrollToSection} />
      
      <main className="relative z-10">
        <div ref={sectionsRef.home}>
          <HeroSection onNavigate={scrollToSection} />
        </div>
        
        <div ref={sectionsRef.services}>
          <ServicesSection />
        </div>
        
        <div ref={sectionsRef['event-booking']}>
          <EventBookingForm />
        </div>
        
        <div ref={sectionsRef['meeting-booking']}>
          <MeetingBookingForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
