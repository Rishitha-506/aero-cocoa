import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { FlightOption, CabinClass, SearchQuery } from '../../types/flight';
import { Plane, Coffee, Sparkles, Check, Clock, HeartHandshake } from 'lucide-react';

export interface FlightResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flights: FlightOption[];
  query: SearchQuery;
  onSelectFlight: (flight: FlightOption) => void;
}

export const FlightResultsModal: React.FC<FlightResultsModalProps> = ({
  isOpen,
  onClose,
  flights,
  query,
  onSelectFlight,
}) => {
  const [selectedCabinFilter, setSelectedCabinFilter] = useState<CabinClass>(query.cabinClass);
  const [bookedFlightId, setBookedFlightId] = useState<string | null>(null);

  const filteredFlights = flights.filter((f) => f.cabinClass === selectedCabinFilter);

  const handleBooking = (flight: FlightOption) => {
    setBookedFlightId(flight.id);
    onSelectFlight(flight);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curated Itineraries"
      subtitle={`${query.segments[0]?.origin} to ${query.segments[0]?.destination} • ${query.passengers.adults + query.passengers.children} Guest(s)`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Prototype Honesty Banner */}
        <div className="p-4 bg-blush-pink/30 border border-blush-pink rounded-2xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-cocoa-brown mt-0.5 flex-shrink-0" />
          <div className="text-xs text-deep-chocolate space-y-1">
            <p className="font-semibold text-deep-chocolate">
              Demonstration Prototype Notice:
            </p>
            <p className="text-deep-chocolate/80 leading-relaxed">
              Flight schedules, seat allocations, and fares shown below are realistic sample data generated for demonstration purposes. Live GDS/airline booking engines are not connected in Phase 1.
            </p>
          </div>
        </div>

        {/* Cabin Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-latte-beige/50">
          <div className="flex items-center gap-2">
            {(['economy', 'business', 'first'] as CabinClass[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCabinFilter(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCabinFilter === c
                    ? 'bg-cocoa-brown text-cloud-white shadow-cocoa-sm'
                    : 'bg-white/70 text-deep-chocolate hover:bg-latte-beige/40'
                }`}
              >
                {c === 'economy' && 'Cloud Economy'}
                {c === 'business' && 'Velvet Business'}
                {c === 'first' && 'Cocoa First'}
              </button>
            ))}
          </div>

          <span className="text-xs text-deep-chocolate/70 font-medium">
            Showing {filteredFlights.length} boutique flights
          </span>
        </div>

        {/* Flights List */}
        {filteredFlights.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <Plane className="w-8 h-8 text-cocoa-brown/40 mx-auto" />
            <p className="text-sm font-semibold text-deep-chocolate">
              No flights found for this cabin class filter
            </p>
            <p className="text-xs text-deep-chocolate/60">
              Try switching back to another cabin class or modifying your dates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFlights.map((flight) => {
              const isSelected = bookedFlightId === flight.id;
              return (
                <div
                  key={flight.id}
                  className={`card-cream rounded-2xl p-5 sm:p-6 transition-all border ${
                    isSelected
                      ? 'border-cocoa-brown bg-blush-pink/10 shadow-cocoa-md'
                      : 'border-latte-beige/70 hover:border-cocoa-brown/50'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Flight Details */}
                    <div className="space-y-4 flex-1">
                      {/* Carrier & Aircraft Header */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <Badge variant="chocolate">{flight.flightNumber}</Badge>
                        <span className="text-xs font-semibold text-deep-chocolate font-serif text-sm">
                          {flight.airline}
                        </span>
                        <span className="text-[11px] text-deep-chocolate/60 font-mono">
                          &bull; {flight.aircraft}
                        </span>
                        <Badge variant="sage" className="ml-auto lg:ml-0">
                          {flight.seatsAvailable} seats left
                        </Badge>
                      </div>

                      {/* Route Timeline */}
                      <div className="flex items-center gap-4 sm:gap-8">
                        <div>
                          <p className="font-serif text-2xl font-bold text-deep-chocolate leading-none">
                            {flight.departureTime}
                          </p>
                          <p className="text-xs font-bold text-cocoa-brown mt-1">
                            {flight.origin.code}
                          </p>
                          <p className="text-[11px] text-deep-chocolate/60">
                            {flight.origin.city}
                          </p>
                        </div>

                        <div className="flex-1 flex flex-col items-center max-w-[140px]">
                          <span className="text-[11px] text-deep-chocolate/60 font-mono flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3 text-cocoa-brown" />
                            {flight.duration}
                          </span>
                          <div className="w-full relative flex items-center">
                            <div className="w-full h-[1px] bg-cocoa-brown/30"></div>
                            <Plane className="w-3.5 h-3.5 text-cocoa-brown absolute left-1/2 -translate-x-1/2 -rotate-45" />
                          </div>
                          <span className="text-[10px] text-emerald-700 font-medium mt-1">
                            Nonstop &bull; Pure Comfort
                          </span>
                        </div>

                        <div>
                          <p className="font-serif text-2xl font-bold text-deep-chocolate leading-none">
                            {flight.arrivalTime}
                          </p>
                          <p className="text-xs font-bold text-cocoa-brown mt-1">
                            {flight.destination.code}
                          </p>
                          <p className="text-[11px] text-deep-chocolate/60">
                            {flight.destination.city}
                          </p>
                        </div>
                      </div>

                      {/* Artisanal Culinary Perk Feature */}
                      <div className="p-3 bg-vanilla-cream/70 rounded-xl border border-latte-beige/50 flex items-start gap-2.5">
                        <Coffee className="w-4 h-4 text-cocoa-brown mt-0.5 flex-shrink-0" />
                        <div className="text-xs">
                          <strong className="text-deep-chocolate font-medium">
                            Artisanal Pâtisserie Service:
                          </strong>{' '}
                          <span className="text-deep-chocolate/80 italic font-serif">
                            "{flight.patisserieFeature}"
                          </span>
                        </div>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-2">
                        {flight.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-white/80 border border-latte-beige px-2.5 py-1 rounded-full text-deep-chocolate/70 font-medium"
                          >
                            &bull; {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Pricing & CTA */}
                    <div className="lg:border-l lg:border-latte-beige/60 lg:pl-6 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4">
                      <div className="text-left lg:text-right">
                        <p className="text-xs text-deep-chocolate/60 uppercase tracking-wider font-mono">
                          Total Journey
                        </p>
                        <p className="font-serif text-3xl font-bold text-deep-chocolate">
                          ${flight.price}
                        </p>
                        <p className="text-[11px] text-deep-chocolate/60">
                          {flight.currency} &bull; Taxes & Sweets incl.
                        </p>
                      </div>

                      <Button
                        variant={isSelected ? 'blush' : 'primary'}
                        size="md"
                        onClick={() => handleBooking(flight)}
                        className="min-w-[130px]"
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1.5 font-semibold">
                            <Check className="w-4 h-4 text-emerald-800" />
                            Selected
                          </span>
                        ) : (
                          'Select Flight'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Booking toast confirmation if selected */}
        {bookedFlightId && (
          <div className="p-4 bg-sage-mist/40 border border-sage-mist rounded-2xl flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-2.5 text-xs text-deep-chocolate">
              <HeartHandshake className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <span>
                <strong>Sample Flight Selected:</strong> You have selected an itinerary. In Phase 2, this links directly to passenger seat selection and digital boarding pass generation.
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setBookedFlightId(null)}>
              Change
            </Button>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex items-center justify-between pt-4 border-t border-latte-beige/50">
          <p className="text-xs text-deep-chocolate/60">
            Aéro Cocoa &bull; Salon Privé Passenger Concierge
          </p>
          <Button variant="primary" onClick={onClose}>
            Done Exploring
          </Button>
        </div>
      </div>
    </Modal>
  );
};
