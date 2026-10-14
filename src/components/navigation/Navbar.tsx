import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { AccountModal } from './AccountModal';
import { Menu, X, Compass, User, Plane } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Explore Flights', href: '#flight-search' },
    { name: 'Membership', href: '#membership-preview' },
    { name: 'Check-in', href: '#checkin-preview' },
    { name: 'My Boarding Pass', href: '#boardingpass-preview' },
    { name: 'Baggage', href: '#baggage-preview' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });

      // If clicking Explore Flights, focus first input
      if (href === '#flight-search') {
        setTimeout(() => {
          const firstInput = target.querySelector('select, input') as HTMLElement;
          if (firstInput) firstInput.focus();
        }, 500);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Primary Navigation"
            className={`glass-cream rounded-full px-5 sm:px-8 py-3.5 transition-all duration-300 flex items-center justify-between border border-latte-beige/60 ${
              isScrolled ? 'shadow-cocoa-md' : 'shadow-cocoa-sm'
            }`}
          >
            {/* Brand Logo Wordmark */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-brown rounded-full px-1"
            >
              <div className="w-9 h-9 rounded-full bg-cocoa-brown/10 border border-cocoa-brown/20 flex items-center justify-center text-cocoa-brown group-hover:bg-cocoa-brown group-hover:text-vanilla-cream transition-all duration-300">
                <Plane className="w-4 h-4 transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-deep-chocolate leading-none">
                  AÉRO COCOA
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-cocoa-brown/70 font-sans mt-0.5">
                  Haute Aviation &bull; Salon Privé
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs xl:text-sm font-medium text-deep-chocolate/80 hover:text-cocoa-brown transition-colors tracking-wide py-1 px-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-brown"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Action: Sign In / Account & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAccountOpen(true)}
                className="hidden sm:inline-flex items-center gap-2"
                aria-label="Open Guest Concierge and Account Portal"
              >
                <User className="w-3.5 h-3.5 text-cocoa-brown" />
                <span>Sign In / Salon</span>
              </Button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                className="lg:hidden p-2 rounded-full text-deep-chocolate hover:bg-latte-beige/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-brown transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden mt-3 max-w-7xl mx-auto glass-cream rounded-3xl p-6 border border-latte-beige shadow-cocoa-lg animate-fadeIn"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="py-2.5 px-4 rounded-xl text-sm font-medium text-deep-chocolate hover:bg-white/60 hover:text-cocoa-brown transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <Compass className="w-4 h-4 text-cocoa-brown/50" />
                </a>
              ))}
              <div className="pt-3 border-t border-latte-beige/50">
                <Button
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAccountOpen(true);
                  }}
                >
                  <User className="w-4 h-4" />
                  <span>Sign In / Salon Privé</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Account Modal */}
      <AccountModal isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
    </>
  );
};
