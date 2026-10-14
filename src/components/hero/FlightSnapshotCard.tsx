import React from 'react';
import { Badge } from '../ui/Badge';
import { Plane, Coffee } from 'lucide-react';

export const FlightSnapshotCard: React.FC = () => {
  return (
    <div className="glass-cream p-4 sm:p-5 rounded-2xl border border-latte-beige shadow-cocoa-md max-w-xs sm:max-w-sm animate-float-slow transition-transform hover:scale-[1.02]">
      {/* Flight status header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-deep-chocolate/70">
            Live Itinerary
          </span>
        </div>
        <Badge variant="sage">On Schedule</Badge>
      </div>

      {/* Flight Route Diagram */}
      <div className="flex items-center justify-between gap-2 py-2 border-y border-latte-beige/50 my-2">
        <div className="text-left">
          <p className="font-serif text-xl sm:text-2xl font-bold text-deep-chocolate">ZRH</p>
          <p className="text-[11px] text-deep-chocolate/60">Zürich, CH</p>
          <p className="text-[10px] font-medium text-cocoa-brown mt-0.5">09:15 AM</p>
        </div>

        <div className="flex flex-col items-center flex-1 px-3">
          <span className="text-[10px] text-deep-chocolate/50 font-mono mb-1">1h 20m</span>
          <div className="w-full flex items-center relative">
            <div className="w-full h-[1px] border-t border-dashed border-cocoa-brown/40"></div>
            <Plane className="w-3.5 h-3.5 text-cocoa-brown absolute left-1/2 transform -translate-x-1/2 -rotate-45" />
          </div>
          <span className="text-[10px] text-cocoa-brown font-semibold mt-1">AC-408</span>
        </div>

        <div className="text-right">
          <p className="font-serif text-xl sm:text-2xl font-bold text-deep-chocolate">CDG</p>
          <p className="text-[11px] text-deep-chocolate/60">Paris, FR</p>
          <p className="text-[10px] font-medium text-cocoa-brown mt-0.5">10:35 AM</p>
        </div>
      </div>

      {/* Pâtisserie Salon Perk */}
      <div className="flex items-center gap-2 pt-2 text-deep-chocolate/80">
        <Coffee className="w-3.5 h-3.5 text-cocoa-brown flex-shrink-0" />
        <p className="text-[11px] leading-tight">
          <strong className="text-deep-chocolate font-medium">Onboard Perk:</strong> Single-Origin Cocoa & Rose Macaron Tasting
        </p>
      </div>
    </div>
  );
};
