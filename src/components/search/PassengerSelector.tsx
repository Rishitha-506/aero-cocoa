import React, { useState, useRef, useEffect } from 'react';
import type { CabinClass } from '../../types/flight';
import { Users, ChevronDown, Check } from 'lucide-react';

export interface PassengerSelectorProps {
  adults: number;
  childrenCount: number;
  cabinClass: CabinClass;
  onChange: (adults: number, childrenCount: number, cabinClass: CabinClass) => void;
  error?: string;
}

export const PassengerSelector: React.FC<PassengerSelectorProps> = ({
  adults,
  childrenCount,
  cabinClass,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPassengers = adults + childrenCount;

  const cabinNames: Record<CabinClass, string> = {
    economy: 'Cloud Economy',
    business: 'Velvet Business',
    first: 'Cocoa First',
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdults = (delta: number) => {
    const next = adults + delta;
    if (next >= 1 && next + childrenCount <= 9) {
      onChange(next, childrenCount, cabinClass);
    }
  };

  const handleChildren = (delta: number) => {
    const next = childrenCount + delta;
    if (next >= 0 && adults + next <= 9) {
      onChange(adults, next, cabinClass);
    }
  };

  const handleCabin = (nextCabin: CabinClass) => {
    onChange(adults, childrenCount, nextCabin);
  };

  return (
    <div className="relative w-full flex flex-col gap-1.5" ref={containerRef}>
      <label className="text-xs font-medium uppercase tracking-wider text-deep-chocolate/80">
        Guests & Cabin Class
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`w-full flex items-center justify-between bg-white/70 hover:bg-white/90 focus:bg-white text-deep-chocolate text-sm font-medium rounded-2xl border transition-all duration-200 py-3 px-4 outline-none ${
          error
            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
            : 'border-latte-beige/70 focus:border-cocoa-brown focus:ring-2 focus:ring-cocoa-brown/20'
        }`}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Users className="w-4 h-4 text-cocoa-brown flex-shrink-0" />
          <span className="truncate">
            {totalPassengers} {totalPassengers === 1 ? 'Guest' : 'Guests'} &bull; {cabinNames[cabinClass]}
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-cocoa-brown/60 flex-shrink-0" />
      </button>

      {error && (
        <span role="alert" className="text-xs text-red-700 font-medium pl-1">
          {error}
        </span>
      )}

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-80 mt-2 bg-vanilla-cream border border-latte-beige rounded-3xl p-5 shadow-cocoa-lg z-30 animate-fadeIn max-w-full">
          {/* Passenger Counts */}
          <div className="space-y-4 pb-4 border-b border-latte-beige/60">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-deep-chocolate">Adults</p>
                <p className="text-xs text-deep-chocolate/60">Age 12 and above</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleAdults(-1)}
                  disabled={adults <= 1}
                  className="w-8 h-8 rounded-full border border-latte-beige bg-white text-deep-chocolate hover:bg-latte-beige/30 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold text-sm"
                  aria-label="Decrease adult passengers"
                >
                  -
                </button>
                <span className="w-4 text-center font-semibold text-deep-chocolate text-sm">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => handleAdults(1)}
                  disabled={totalPassengers >= 9}
                  className="w-8 h-8 rounded-full border border-latte-beige bg-white text-deep-chocolate hover:bg-latte-beige/30 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold text-sm"
                  aria-label="Increase adult passengers"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-deep-chocolate">Children</p>
                <p className="text-xs text-deep-chocolate/60">Age 2 to 11</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleChildren(-1)}
                  disabled={childrenCount <= 0}
                  className="w-8 h-8 rounded-full border border-latte-beige bg-white text-deep-chocolate hover:bg-latte-beige/30 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold text-sm"
                  aria-label="Decrease child passengers"
                >
                  -
                </button>
                <span className="w-4 text-center font-semibold text-deep-chocolate text-sm">
                  {childrenCount}
                </span>
                <button
                  type="button"
                  onClick={() => handleChildren(1)}
                  disabled={totalPassengers >= 9}
                  className="w-8 h-8 rounded-full border border-latte-beige bg-white text-deep-chocolate hover:bg-latte-beige/30 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center font-bold text-sm"
                  aria-label="Increase child passengers"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Cabin Class Selection */}
          <div className="pt-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-deep-chocolate/80 mb-2">
              Cabin Service
            </p>
            {(['economy', 'business', 'first'] as CabinClass[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleCabin(c)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  cabinClass === c
                    ? 'bg-cocoa-brown text-cloud-white font-semibold'
                    : 'hover:bg-white/60 text-deep-chocolate'
                }`}
              >
                <span>{cabinNames[c]}</span>
                {cabinClass === c && <Check className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-latte-beige/60 mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-cocoa-brown hover:underline"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
