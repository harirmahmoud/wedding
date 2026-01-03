"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContex';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  onNavigate: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'services', label: t.nav.services },
    { key: 'event-booking', label: t.nav.eventBooking },
    { key: 'meeting-booking', label: t.nav.meetingBooking },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className='flex gap-4'>
              <Image
                      src="/logo2.jpeg"
                      alt="Yasmine Events Logo"
                      width={50}
                      height={50}
                      
                    />
                    <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-bold text-foreground tracking-wide">
            YASMINE EVENTS
          </span>
          <span className="text-xs md:text-sm text-muted-foreground italic">
            La beauté de chaque moment
          </span>
        </div>
          </div>
         

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <div className='flex gap-4'>
              <Image
                      src="/logo2.jpeg"
                      alt="Yasmine Events Logo"
                      width={50}
                      height={50}
                      
                    />
                    <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-bold text-foreground tracking-wide">
            YASMINE EVENTS
          </span>
          <span className="text-xs md:text-sm text-muted-foreground italic">
            La beauté de chaque moment
          </span>
        </div>
          </div>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleNavClick(item.key)}
                        className="text-left text-lg text-foreground/80 hover:text-primary transition-colors font-medium py-2 border-b border-border/30"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
