import React from 'react';
import { Button } from '../ui/Button';
import { FlightSnapshotCard } from './FlightSnapshotCard';
import { Sparkles, ArrowDown, ShieldCheck, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSearch = () => {
    const el = document.getElementById('flight-search');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = el.querySelector('select, input') as HTMLElement;
        if (input) input.focus();
      }, 500);
    }
  };

  const scrollToMembership = () => {
    const el = document.getElementById('membership-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Welcome to Aéro Cocoa"
      className="relative pt-32 sm:pt-40 pb-16 lg:pb-24 overflow-x-hidden bg-cloud-gradient min-h-[92vh] flex flex-col justify-between"
    >
      {/* Decorative Pastel Ambient Cloud Blobs */}
      <div
        className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-blush-pink/35 blur-3xl pointer-events-none animate-cloud-drift-1"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[30rem] h-[30rem] rounded-full bg-latte-beige/30 blur-3xl pointer-events-none animate-cloud-drift-2"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-sage-mist/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-latte-beige/80 text-xs font-medium uppercase tracking-widest text-deep-chocolate shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cocoa-brown" />
              <span>Cloud Nine, Cocoa &amp; First-Class Dreams</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-medium tracking-tight text-deep-chocolate leading-[1.08]">
              Your next adventure, <br />
              <span className="italic font-normal text-cocoa-brown">
                served with a little sweetness.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-base sm:text-lg text-deep-chocolate/80 leading-relaxed max-w-xl font-normal">
              Discover a softer way to fly. Explore handpicked global destinations,
              indulge in artisanal chocolate tastings above 30,000 feet, and experience
              a seamless, thoughtful journey designed for modern travelers.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToSearch}
                className="w-full sm:w-auto group shadow-cocoa-md"
              >
                <span>Explore Flights</span>
                <ArrowDown className="w-4 h-4 ml-2 group-hover:translate-y-0.5 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={scrollToMembership}
                className="w-full sm:w-auto"
              >
                <span>Discover Membership</span>
              </Button>
            </div>

            {/* Editorial Micro-Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-latte-beige/60 text-xs text-deep-chocolate/70">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-cocoa-brown" />
                <span>Boutique First-Class Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cocoa-brown" />
                <span>Complimentary Salon Privé</span>
              </div>
            </div>
          </div>

          {/* Right Column: Airplane + Snapshot Card in clean stacked flow */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center gap-6 relative">
            {/* Ambient Cloud Halo — decorative only, doesn't affect layout */}
            <div
              className="absolute inset-0 bg-radial from-blush-pink/40 to-transparent rounded-full filter blur-2xl transform scale-110 pointer-events-none"
              aria-hidden="true"
            />

            {/* Airplane Image */}
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <img
                src={`${import.meta.env.BASE_URL}assets/hero-airplane.png`}
                alt="Aéro Cocoa 3D airplane soaring gracefully through soft pastel clouds"
                className="w-full h-auto object-contain drop-shadow-2xl animate-float-gentle select-none pointer-events-none"
                loading="eager"
                width="600"
                height="450"
              />
              {/* Cloud chip — positioned inside the image container, safe from clipping */}
              <div
                className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-latte-beige/50 text-[11px] text-deep-chocolate/75 hidden sm:flex items-center gap-2 shadow-cocoa-sm animate-float-slow"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-blush-pink flex-shrink-0" />
                <span>Pure Vanilla Atmosphere &bull; Zero Turbulence</span>
              </div>
            </div>

            {/* Flight Snapshot Card — placed below airplane in natural flow, no overlap */}
            <div className="w-full flex justify-end pr-2 sm:pr-6 relative z-10">
              <FlightSnapshotCard />
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Scroll Invitation Indicator */}
      <div className="max-w-7xl mx-auto px-4 text-center mt-8 sm:mt-12 hidden md:block">
        <button
          onClick={scrollToSearch}
          aria-label="Scroll to Flight Search Section"
          className="inline-flex flex-col items-center text-xs tracking-widest uppercase text-deep-chocolate/60 hover:text-cocoa-brown transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-brown rounded-full p-2"
        >
          <span className="mb-1 font-serif italic text-sm">Scroll to Search Flights</span>
          <ArrowDown className="w-4 h-4 text-cocoa-brown animate-bounce" />
        </button>
      </div>
    </section>
  );
};
