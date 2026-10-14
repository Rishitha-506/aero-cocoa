import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Crown,
  Fingerprint,
  QrCode,
  Luggage,
  Sparkles,
  Check,
  Plane,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const ModulePreviewSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('Rose Gold');
  const [isVerifyingBiometric, setIsVerifyingBiometric] = useState<boolean>(false);
  const [biometricStatus, setBiometricStatus] = useState<string>('Ready to scan');

  const handleSimulateScan = () => {
    setIsVerifyingBiometric(true);
    setBiometricStatus('Scanning biometric pattern...');
    setTimeout(() => {
      setIsVerifyingBiometric(false);
      setBiometricStatus('Demonstration Match Verified (Sample)');
    }, 1200);
  };

  return (
    <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-8 py-16">
      {/* ---------------- 1. MEMBERSHIP & SUBSCRIPTION TIERS ---------------- */}
      <section
        id="membership-preview"
        aria-label="Membership Tiers"
        className="scroll-mt-24 space-y-12"
      >
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="blush">Privileged Access</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-deep-chocolate">
            Membership in the Salon Privé
          </h2>
          <p className="text-sm sm:text-base text-deep-chocolate/75 leading-relaxed">
            Curated tiers for the discerning traveler. Enjoy unlimited confectionery tastings,
            express biometric boarding, and private suites above the clouds.
          </p>
          <p className="text-xs font-mono text-cocoa-brown/80">
            * Demonstration tiers — Live subscription activation will be connected in Phase 2
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Tier 1: Cocoa Classic */}
          <div className="card-cream rounded-3xl p-8 border border-latte-beige flex flex-col justify-between hover:shadow-cocoa-md transition-shadow">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="latte">Tier 01</Badge>
                <span className="text-xs text-deep-chocolate/60 font-mono">Sample Plan</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-deep-chocolate">
                  Cocoa Classic
                </h3>
                <p className="text-xs text-deep-chocolate/70 mt-1">
                  For the occasional escape seeker
                </p>
              </div>
              <div className="py-2 border-y border-latte-beige/50">
                <span className="font-serif text-4xl font-bold text-deep-chocolate">$149</span>
                <span className="text-xs text-deep-chocolate/60"> / year (demo)</span>
              </div>
              <ul className="space-y-3 text-xs text-deep-chocolate/80">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Complimentary Valrhona chocolate welcome box</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>10% reward bonus on all boutique itineraries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Priority check-in assistance</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Button
                variant={selectedPlan === 'Cocoa Classic' ? 'blush' : 'outline'}
                className="w-full"
                onClick={() => setSelectedPlan('Cocoa Classic')}
              >
                {selectedPlan === 'Cocoa Classic' ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          </div>

          {/* Tier 2: Rose Gold (Featured) */}
          <div className="relative card-cream rounded-3xl p-8 border-2 border-cocoa-brown shadow-cocoa-lg flex flex-col justify-between bg-gradient-to-b from-white/90 to-blush-pink/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cocoa-brown text-cloud-white text-[11px] font-semibold tracking-widest uppercase px-4 py-1 rounded-full shadow-sm">
              Most Beloved Tier
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="blush">Tier 02 &bull; Signature</Badge>
                <Crown className="w-4 h-4 text-cocoa-brown" />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-bold text-deep-chocolate">
                  Rose Gold
                </h3>
                <p className="text-xs text-deep-chocolate/70 mt-1">
                  The quintessential boutique aviation experience
                </p>
              </div>
              <div className="py-2 border-y border-cocoa-brown/20">
                <span className="font-serif text-4xl font-bold text-cocoa-brown">$389</span>
                <span className="text-xs text-deep-chocolate/60"> / year (demo)</span>
              </div>
              <ul className="space-y-3 text-xs text-deep-chocolate/90 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Unlimited access to Paris & Zürich Salons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Artisanal Pâtisserie dessert trolley onboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Express biometric expedited security passage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Complimentary seat selection in Velvet Business</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Button
                variant={selectedPlan === 'Rose Gold' ? 'primary' : 'outline'}
                className="w-full shadow-cocoa-md"
                onClick={() => setSelectedPlan('Rose Gold')}
              >
                {selectedPlan === 'Rose Gold' ? 'Current Selection' : 'Select Plan'}
              </Button>
            </div>
          </div>

          {/* Tier 3: Cloud Elite */}
          <div className="card-cream rounded-3xl p-8 border border-latte-beige flex flex-col justify-between hover:shadow-cocoa-md transition-shadow">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Badge variant="chocolate">Tier 03 &bull; Première</Badge>
                <Sparkles className="w-4 h-4 text-cocoa-brown" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-deep-chocolate">
                  Cloud Elite
                </h3>
                <p className="text-xs text-deep-chocolate/70 mt-1">
                  First-Class dreams without compromise
                </p>
              </div>
              <div className="py-2 border-y border-latte-beige/50">
                <span className="font-serif text-4xl font-bold text-deep-chocolate">$890</span>
                <span className="text-xs text-deep-chocolate/60"> / year (demo)</span>
              </div>
              <ul className="space-y-3 text-xs text-deep-chocolate/80">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Dedicated Private Salon Concierge 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Chauffeured luxury tarmac transfers</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Master Chocolatier private tastings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cocoa-brown" />
                  <span>Guaranteed last-minute First-Class suites</span>
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <Button
                variant={selectedPlan === 'Cloud Elite' ? 'blush' : 'outline'}
                className="w-full"
                onClick={() => setSelectedPlan('Cloud Elite')}
              >
                {selectedPlan === 'Cloud Elite' ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 2. BIOMETRIC CHECK-IN PROTOTYPE ---------------- */}
      <section
        id="checkin-preview"
        aria-label="Biometric Check-In"
        className="scroll-mt-24 card-cream rounded-3xl p-8 sm:p-12 border border-latte-beige shadow-cocoa-md"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <Badge variant="sage">Phase 2 Feature Preview</Badge>
              <span className="text-xs text-deep-chocolate/60 font-mono">Prototype Simulation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-chocolate">
              Biometric Express Check-In
            </h2>
            <p className="text-sm text-deep-chocolate/80 leading-relaxed">
              Arrive at the salon without paper or queueing. Our prototype architecture enables
              passengers to verify their identity with a single touch or glance at the boarding gate.
            </p>
            <div className="p-4 bg-blush-pink/20 rounded-2xl border border-blush-pink/50 text-xs text-deep-chocolate space-y-1">
              <strong className="font-semibold">Privacy & Hardware Integration Note:</strong>
              <p>
                No real biometric data or fingerprints are collected or stored in your browser.
                In Phase 2, this connects to authorized, certified airport biometric gateways.
              </p>
            </div>

            {/* Simulated Booking Reference Input */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="text"
                defaultValue="AC-408-ZRH-CDG"
                aria-label="Booking Reference"
                className="bg-white/80 border border-latte-beige px-4 py-3 rounded-2xl text-xs font-mono text-deep-chocolate outline-none focus:ring-2 focus:ring-cocoa-brown/20 flex-1"
                placeholder="Booking Reference"
              />
              <Button variant="primary" size="md" onClick={handleSimulateScan} isLoading={isVerifyingBiometric}>
                Simulate Touch Scan
              </Button>
            </div>
          </div>

          {/* Right: Fingerprint Decorative Interface */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-vanilla-cream/70 rounded-3xl border border-latte-beige text-center space-y-4">
            <div
              className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-500 cursor-pointer ${
                isVerifyingBiometric
                  ? 'border-cocoa-brown bg-blush-pink/40 animate-pulse scale-105'
                  : 'border-cocoa-brown/40 bg-white/80 hover:border-cocoa-brown'
              }`}
              onClick={handleSimulateScan}
              title="Click to simulate touch scan"
            >
              <Fingerprint className="w-14 h-14 text-cocoa-brown" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-deep-chocolate">
                {biometricStatus}
              </p>
              <p className="text-[11px] text-deep-chocolate/60 mt-0.5">
                Passenger: Ashley & Richard &bull; Gate B24
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. SIGNATURE DIGITAL BOARDING PASS ---------------- */}
      <section
        id="boardingpass-preview"
        aria-label="Digital Boarding Pass"
        className="scroll-mt-24 space-y-8"
      >
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <Badge variant="chocolate">Collectible Travel Ticket</Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-deep-chocolate">
            Your Digital Boarding Pass
          </h2>
          <p className="text-sm text-deep-chocolate/75">
            Crafted like a keepsake from a golden era of travel, with crisp mobile scanning and velvet details.
          </p>
        </div>

        {/* Boarding Pass Luxury Ticket Layout */}
        <div className="max-w-4xl mx-auto bg-latte-beige/30 p-4 sm:p-8 rounded-3xl border border-latte-beige shadow-cocoa-lg">
          <div className="bg-vanilla-cream rounded-2xl border border-latte-beige overflow-hidden shadow-sm flex flex-col md:flex-row">
            {/* Main Ticket Body */}
            <div className="p-6 sm:p-8 flex-1 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-latte-beige/60">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif text-xl font-bold tracking-widest text-deep-chocolate">
                    AÉRO COCOA
                  </span>
                  <Badge variant="blush">First-Class Pass</Badge>
                </div>
                <span className="text-xs font-mono font-semibold text-cocoa-brown">
                  FLIGHT AC-408
                </span>
              </div>

              {/* Passenger & Route */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-deep-chocolate/60 uppercase font-mono">Passenger</p>
                  <p className="text-sm font-serif font-bold text-deep-chocolate">Ashley & Richard</p>
                </div>
                <div>
                  <p className="text-[10px] text-deep-chocolate/60 uppercase font-mono">Class</p>
                  <p className="text-sm font-semibold text-cocoa-brown">Cocoa First Privé</p>
                </div>
                <div>
                  <p className="text-[10px] text-deep-chocolate/60 uppercase font-mono">Seat</p>
                  <p className="text-sm font-serif font-bold text-deep-chocolate">02A Suite</p>
                </div>
                <div>
                  <p className="text-[10px] text-deep-chocolate/60 uppercase font-mono">Gate</p>
                  <p className="text-sm font-serif font-bold text-emerald-800">Gate B24</p>
                </div>
              </div>

              {/* Route Timeline */}
              <div className="flex items-center justify-between py-3 border-y border-latte-beige/50">
                <div>
                  <p className="font-serif text-3xl font-bold text-deep-chocolate">ZRH</p>
                  <p className="text-xs text-deep-chocolate/70">Zürich, Kloten</p>
                  <p className="text-xs font-semibold text-cocoa-brown mt-0.5">09:15 AM</p>
                </div>
                <div className="flex flex-col items-center flex-1 px-4 max-w-[160px]">
                  <span className="text-[10px] text-deep-chocolate/60 font-mono mb-1">Nonstop 1h 20m</span>
                  <div className="w-full relative flex items-center">
                    <div className="w-full h-[1px] border-t border-dashed border-cocoa-brown/40"></div>
                    <Plane className="w-4 h-4 text-cocoa-brown absolute left-1/2 -translate-x-1/2 -rotate-45" />
                  </div>
                  <span className="text-[10px] text-cocoa-brown font-semibold mt-1">Direct Flight</span>
                </div>
                <div className="text-right">
                  <p className="font-serif text-3xl font-bold text-deep-chocolate">CDG</p>
                  <p className="text-xs text-deep-chocolate/70">Paris, Roissy</p>
                  <p className="text-xs font-semibold text-cocoa-brown mt-0.5">10:35 AM</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-deep-chocolate/70 pt-1">
                <span>Boarding: 08:35 AM</span>
                <span className="italic font-serif">Includes Salon Pâtisserie Tasting</span>
              </div>
            </div>

            {/* Perforated Stub Divider */}
            <div className="relative border-t md:border-t-0 md:border-l border-dashed border-cocoa-brown/30 bg-vanilla-cream/90 p-6 sm:p-8 flex flex-col items-center justify-between w-full md:w-56 flex-shrink-0">
              <div className="text-center space-y-1">
                <p className="text-[11px] font-mono uppercase text-deep-chocolate/60">
                  Electronic Verification
                </p>
                <div className="w-28 h-28 bg-white border border-latte-beige rounded-xl p-2 mx-auto flex items-center justify-center shadow-sm">
                  <QrCode className="w-24 h-24 text-deep-chocolate" />
                </div>
                <p className="text-[10px] font-mono text-deep-chocolate/60 mt-1">
                  * SAMPLE PASS — NOT FOR TRAVEL
                </p>
              </div>

              <div className="w-full text-center pt-3 border-t border-latte-beige/50">
                <span className="text-[10px] text-cocoa-brown font-semibold uppercase tracking-widest">
                  Aéro Cocoa Digital Pass
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- 4. BAGGAGE MANAGEMENT DASHBOARD ---------------- */}
      <section
        id="baggage-preview"
        aria-label="Baggage Management"
        className="scroll-mt-24 card-cream rounded-3xl p-8 sm:p-12 border border-latte-beige shadow-cocoa-md space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-latte-beige/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="sage">Phase 2 Tracking Preview</Badge>
              <Luggage className="w-4 h-4 text-cocoa-brown" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-deep-chocolate">
              Smart Baggage Timeline
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-deep-chocolate/60 font-mono">Tag Reference</p>
            <p className="font-mono text-sm font-bold text-cocoa-brown">AC-BAG-7729-CH</p>
          </div>
        </div>

        {/* 4-Stage Visual Progress Tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          {[
            {
              stage: 'Registered',
              desc: 'Tag generated & assigned to suite',
              completed: true,
              active: false,
            },
            {
              stage: 'Checked In',
              desc: 'Processed at Zürich Salon Privé',
              completed: true,
              active: false,
            },
            {
              stage: 'Loaded',
              desc: 'Secured on Airbus A350 hold',
              completed: true,
              active: true,
            },
            {
              stage: 'Arrived',
              desc: 'Delivered to Paris VIP Carousel',
              completed: false,
              active: false,
            },
          ].map((step, idx) => (
            <div
              key={step.stage}
              className={`p-5 rounded-2xl border transition-all ${
                step.active
                  ? 'bg-blush-pink/30 border-cocoa-brown shadow-sm'
                  : step.completed
                  ? 'bg-white/80 border-latte-beige'
                  : 'bg-white/40 border-latte-beige/50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono text-deep-chocolate/60">
                  Step 0{idx + 1}
                </span>
                {step.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Clock className="w-4 h-4 text-deep-chocolate/40" />
                )}
              </div>
              <h4 className="font-serif text-base font-bold text-deep-chocolate">
                {step.stage}
              </h4>
              <p className="text-xs text-deep-chocolate/70 mt-1 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 bg-vanilla-cream/90 rounded-2xl border border-latte-beige text-xs text-deep-chocolate flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p>
            <strong>Biometric Baggage Link:</strong> Bags are tied to passenger biometric profile for automatic claiming with zero tag confusion.
          </p>
          <span className="text-[11px] font-mono text-cocoa-brown font-semibold flex-shrink-0">
            * Sample Live Tracking
          </span>
        </div>
      </section>
    </div>
  );
};
