import React from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/hero/Hero';
import { FlightSearch } from './components/search/FlightSearch';
import { ModulePreviewSection } from './components/previews/ModulePreviewSection';
import { PaperPlaneDoodles } from './components/hero/PaperPlaneDoodles';
import { Plane } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-vanilla-cream text-deep-chocolate flex flex-col font-sans selection:bg-blush-pink selection:text-deep-chocolate">
      {/* ░░ Paper airplane doodle background layer ░░ */}
      <PaperPlaneDoodles />

      {/* 1. Responsive Floating Navigation */}
      <Navbar />

      {/* 2. Main Page Content */}
      <main className="flex-1">
        {/* Dreamy Aircraft & Cloud Hero Section */}
        <Hero />

        {/* Interactive Flight Search Panel */}
        <FlightSearch />

        {/* Modular Future Roadmap Previews (Membership, Check-in, Boarding Pass, Baggage) */}
        <ModulePreviewSection />
      </main>

      {/* 3. Luxury Editorial Footer */}
      <footer className="bg-gradient-to-b from-vanilla-cream to-latte-beige/40 border-t border-latte-beige/80 py-16 px-4 sm:px-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-latte-beige/60">
            {/* Col 1: Brand Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cocoa-brown/10 border border-cocoa-brown/20 flex items-center justify-center text-cocoa-brown">
                  <Plane className="w-4 h-4 transform -rotate-45" />
                </div>
                <span className="font-serif text-2xl font-bold tracking-widest text-deep-chocolate">
                  AÉRO COCOA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-deep-chocolate/75 leading-relaxed max-w-sm">
                Cloud Nine, Cocoa & First-Class Dreams. A private boutique airline where creamy vanilla skies, artisanal confectionery, and seamless digital travel converge.
              </p>
              <div className="flex items-center gap-4 text-xs text-cocoa-brown font-mono pt-1">
                <span>ZRH &bull; CDG &bull; JFK &bull; HND &bull; LHR</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-deep-chocolate font-mono">
                Boutique Salons
              </h4>
              <ul className="space-y-2 text-xs text-deep-chocolate/80">
                <li>
                  <a href="#hero" className="hover:text-cocoa-brown transition-colors">
                    Home Horizon
                  </a>
                </li>
                <li>
                  <a href="#flight-search" className="hover:text-cocoa-brown transition-colors">
                    Search Flights
                  </a>
                </li>
                <li>
                  <a href="#membership-preview" className="hover:text-cocoa-brown transition-colors">
                    Membership Tiers
                  </a>
                </li>
                <li>
                  <a href="#checkin-preview" className="hover:text-cocoa-brown transition-colors">
                    Biometric Check-In
                  </a>
                </li>
                <li>
                  <a href="#boardingpass-preview" className="hover:text-cocoa-brown transition-colors">
                    Digital Boarding Pass
                  </a>
                </li>
                <li>
                  <a href="#baggage-preview" className="hover:text-cocoa-brown transition-colors">
                    Smart Baggage Tracker
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Newsletter Sign-up */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-deep-chocolate font-mono">
                The Confectionery Dispatch
              </h4>
              <p className="text-xs text-deep-chocolate/75 leading-relaxed">
                Receive invitation-only announcements for seasonal tasting flights and new transatlantic routes.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you for subscribing to The Confectionery Dispatch (Demonstration).');
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  placeholder="concierge@aerococoa.luxe"
                  aria-label="Email Address"
                  className="bg-white/80 border border-latte-beige rounded-2xl px-3.5 py-2 text-xs text-deep-chocolate outline-none focus:ring-2 focus:ring-cocoa-brown/20 flex-1"
                />
                <button
                  type="submit"
                  className="bg-cocoa-brown text-cloud-white hover:bg-deep-chocolate text-xs font-semibold px-4 py-2 rounded-2xl transition-all shadow-sm"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-deep-chocolate/60 gap-4">
            <p>
              &copy; {CURRENT_YEAR} Aéro Cocoa Airways Ltd. All rights reserved.
            </p>
            <p className="font-mono text-[11px] text-center sm:text-right">
              Phase 1 Design System & Airline Management Prototype &bull; Sample Demonstration Data
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
