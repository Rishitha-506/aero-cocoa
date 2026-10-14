import React, { useState } from 'react';
import type { TripType, CabinClass, FlightSegment, SearchQuery, FlightOption } from '../../types/flight';
import { BOUTIQUE_AIRPORTS } from '../../data/airports';
import { searchMockFlights } from '../../data/sampleFlights';
import { PassengerSelector } from './PassengerSelector';
import { FlightResultsModal } from './FlightResultsModal';
import { Button } from '../ui/Button';
import {
  ArrowRightLeft,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

// Date helper functions in module scope
const getTodayString = () => {
  const d = new Date();
  return d.toISOString().split('T')[0];
};

const getFutureDateString = (daysAhead: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

let segmentCounter = 100;
const getNextSegmentId = () => {
  segmentCounter += 1;
  return `seg-${segmentCounter}`;
};

export const FlightSearch: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>('roundtrip');
  const [segments, setSegments] = useState<FlightSegment[]>([
    {
      id: 'seg-1',
      origin: 'ZRH',
      destination: 'CDG',
      departureDate: getFutureDateString(7),
    },
  ]);
  const [returnDate, setReturnDate] = useState<string>(getFutureDateString(14));
  const [adults, setAdults] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>('first');

  // Validation errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FlightOption[]>([]);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  // When switching trip type, adapt segments
  const handleTripTypeChange = (type: TripType) => {
    setTripType(type);
    setErrors({});
    if (type === 'multicity' && segments.length === 1) {
      setSegments([
        segments[0],
        {
          id: 'seg-2',
          origin: segments[0].destination || 'CDG',
          destination: 'JFK',
          departureDate: getFutureDateString(10),
        },
      ]);
    } else if (type !== 'multicity' && segments.length > 1) {
      setSegments([segments[0]]);
    }
  };

  // Add multi-city segment
  const handleAddSegment = () => {
    if (segments.length >= 4) return;
    const lastSeg = segments[segments.length - 1];
    const newSeg: FlightSegment = {
      id: getNextSegmentId(),
      origin: lastSeg.destination || 'JFK',
      destination: 'HND',
      departureDate: getFutureDateString(14 + segments.length * 3),
    };
    setSegments([...segments, newSeg]);
  };

  // Remove multi-city segment
  const handleRemoveSegment = (id: string) => {
    if (segments.length <= 2) return;
    setSegments(segments.filter((s) => s.id !== id));
  };

  // Update a specific segment field
  const handleSegmentChange = (index: number, field: keyof FlightSegment, value: string) => {
    const updated = [...segments];
    updated[index] = { ...updated[index], [field]: value };
    setSegments(updated);

    // Clear related error
    const errKey = `segment-${index}-${field}`;
    if (errors[errKey]) {
      const nextErrors = { ...errors };
      delete nextErrors[errKey];
      setErrors(nextErrors);
    }
  };

  // Swap origin and destination for single segment
  const handleSwapAirports = (index: number) => {
    const updated = [...segments];
    const currentOrigin = updated[index].origin;
    const currentDest = updated[index].destination;
    updated[index].origin = currentDest;
    updated[index].destination = currentOrigin;
    setSegments(updated);
  };

  // Validate Search Query
  const validateSearch = (): boolean => {
    const newErrors: Record<string, string> = {};
    const today = getTodayString();

    segments.forEach((seg, idx) => {
      if (!seg.origin) {
        newErrors[`segment-${idx}-origin`] = 'Departure hub is required.';
      }
      if (!seg.destination) {
        newErrors[`segment-${idx}-destination`] = 'Destination hub is required.';
      }
      if (seg.origin && seg.destination && seg.origin === seg.destination) {
        newErrors[`segment-${idx}-destination`] =
          'Departure and destination airports cannot be identical.';
      }
      if (!seg.departureDate) {
        newErrors[`segment-${idx}-departureDate`] = 'Departure date is required.';
      } else if (seg.departureDate < today) {
        newErrors[`segment-${idx}-departureDate`] = 'Departure date cannot be in the past.';
      }

      // In multi-city, check chronological sequence
      if (idx > 0) {
        const prevSeg = segments[idx - 1];
        if (seg.departureDate && prevSeg.departureDate && seg.departureDate < prevSeg.departureDate) {
          newErrors[`segment-${idx}-departureDate`] =
            'Segment departure must be on or after previous segment.';
        }
      }
    });

    // Round-trip return date validation
    if (tripType === 'roundtrip') {
      const firstDep = segments[0]?.departureDate;
      if (!returnDate) {
        newErrors['returnDate'] = 'Return date is required for round trips.';
      } else if (returnDate < today) {
        newErrors['returnDate'] = 'Return date cannot be in the past.';
      } else if (firstDep && returnDate < firstDep) {
        newErrors['returnDate'] = 'Return date must be on or after departure date.';
      }
    }

    // Passengers validation
    if (adults < 1) {
      newErrors['passengers'] = 'At least 1 adult guest is required.';
    }
    if (adults + childrenCount > 9) {
      newErrors['passengers'] = 'Maximum 9 guests allowed per reservation.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSearch()) return;

    setIsSearching(true);
    const query: SearchQuery = {
      tripType,
      segments,
      returnDate: tripType === 'roundtrip' ? returnDate : undefined,
      passengers: { adults, children: childrenCount },
      cabinClass,
    };

    // Simulate luxury booking query latency (600ms)
    setTimeout(() => {
      const results = searchMockFlights(query);
      setSearchResults(results);
      setIsSearching(false);
      setIsResultsOpen(true);
    }, 600);
  };

  const airportOptions = BOUTIQUE_AIRPORTS.map((a) => ({
    value: a.code,
    label: `${a.code} — ${a.city}`,
    sublabel: a.country,
  }));

  return (
    <section
      id="flight-search"
      aria-label="Search Flights"
      className="relative max-w-7xl mx-auto px-4 sm:px-8 mt-8 sm:mt-12 z-30 pb-20"
    >
      <div className="card-cream rounded-3xl p-6 sm:p-10 shadow-cocoa-lg border border-latte-beige">
        {/* Header Title & Trip Type Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-latte-beige/60">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-cocoa-brown font-mono">
              Salon Privé Itinerary
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-deep-chocolate mt-0.5">
              Book Your Velvet Flight
            </h2>
          </div>

          {/* Trip Type Tabs */}
          <div
            role="tablist"
            aria-label="Trip Type"
            className="flex items-center gap-1.5 p-1 bg-vanilla-cream/90 rounded-full border border-latte-beige/80 self-start sm:self-auto"
          >
            {(
              [
                { id: 'roundtrip', label: 'Round Trip' },
                { id: 'oneway', label: 'One Way' },
                { id: 'multicity', label: 'Multi-City' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tripType === tab.id}
                onClick={() => handleTripTypeChange(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  tripType === tab.id
                    ? 'bg-cocoa-brown text-cloud-white shadow-cocoa-sm'
                    : 'text-deep-chocolate/80 hover:text-deep-chocolate hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Global Error Summary Banner */}
        {Object.keys(errors).length > 0 && (
          <div
            role="alert"
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 text-red-800 text-xs animate-fadeIn"
          >
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Please review the following requirements:</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {Object.values(errors).map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="mt-8 space-y-6">
          {/* Segments Loop */}
          {segments.map((segment, index) => {
            const originError = errors[`segment-${index}-origin`];
            const destError = errors[`segment-${index}-destination`];
            const depDateError = errors[`segment-${index}-departureDate`];

            return (
              <div
                key={segment.id}
                className={`p-4 sm:p-6 rounded-2xl bg-white/40 border transition-all ${
                  tripType === 'multicity' ? 'border-latte-beige relative' : 'border-transparent'
                }`}
              >
                {tripType === 'multicity' && (
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-latte-beige/40">
                    <span className="font-serif text-sm font-semibold text-cocoa-brown">
                      Flight Segment {index + 1}
                    </span>
                    {segments.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSegment(segment.id)}
                        className="text-xs text-red-700 hover:text-red-900 flex items-center gap-1 font-medium"
                        aria-label={`Remove Flight Segment ${index + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Leg</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Airport row: origin + swap + destination on same line; date below */}
                <div className="flex flex-col gap-4">
                  {/* Origin + Swap + Destination row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">
                    {/* Departure Airport */}
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`origin-${index}`}
                        className="text-xs font-medium uppercase tracking-wider text-deep-chocolate/80 block mb-1.5"
                      >
                        Departure Hub
                      </label>
                      <div className="relative">
                        <select
                          id={`origin-${index}`}
                          value={segment.origin}
                          onChange={(e) => handleSegmentChange(index, 'origin', e.target.value)}
                          aria-invalid={!!originError}
                          className={`w-full bg-white/80 focus:bg-white text-deep-chocolate text-sm font-medium rounded-2xl border transition-all py-3 pl-4 pr-10 outline-none ${
                            originError
                              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                              : 'border-latte-beige/80 focus:border-cocoa-brown focus:ring-2 focus:ring-cocoa-brown/20'
                          }`}
                        >
                          {airportOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {originError && (
                        <span role="alert" className="text-xs text-red-700 font-medium pl-1 mt-1 block">
                          {originError}
                        </span>
                      )}
                    </div>

                    {/* Swap Button */}
                    <div className="hidden sm:flex flex-shrink-0 items-center justify-center pt-6">
                      <button
                        type="button"
                        onClick={() => handleSwapAirports(index)}
                        className="p-2.5 rounded-full bg-vanilla-cream hover:bg-latte-beige/40 text-cocoa-brown border border-latte-beige transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cocoa-brown"
                        title="Swap departure and arrival hubs"
                        aria-label="Swap departure and arrival hubs"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Destination Airport */}
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={`dest-${index}`}
                        className="text-xs font-medium uppercase tracking-wider text-deep-chocolate/80 block mb-1.5"
                      >
                        Destination Hub
                      </label>
                      <div className="relative">
                        <select
                          id={`dest-${index}`}
                          value={segment.destination}
                          onChange={(e) => handleSegmentChange(index, 'destination', e.target.value)}
                          aria-invalid={!!destError}
                          className={`w-full bg-white/80 focus:bg-white text-deep-chocolate text-sm font-medium rounded-2xl border transition-all py-3 pl-4 pr-10 outline-none ${
                            destError
                              ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                              : 'border-latte-beige/80 focus:border-cocoa-brown focus:ring-2 focus:ring-cocoa-brown/20'
                          }`}
                        >
                          {airportOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {destError && (
                        <span role="alert" className="text-xs text-red-700 font-medium pl-1 mt-1 block">
                          {destError}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Departure Date — full width below airports */}
                  <div className="w-full sm:w-1/2 lg:w-72">
                    <label
                      htmlFor={`dep-date-${index}`}
                      className="text-xs font-medium uppercase tracking-wider text-deep-chocolate/80 block mb-1.5"
                    >
                      Departure Date
                    </label>
                    <div className="relative">
                      <input
                        id={`dep-date-${index}`}
                        type="date"
                        min={getTodayString()}
                        value={segment.departureDate}
                        onChange={(e) =>
                          handleSegmentChange(index, 'departureDate', e.target.value)
                        }
                        aria-invalid={!!depDateError}
                        className={`w-full bg-white/80 focus:bg-white text-deep-chocolate text-sm font-medium rounded-2xl border transition-all py-3 px-4 outline-none ${
                          depDateError
                            ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                            : 'border-latte-beige/80 focus:border-cocoa-brown focus:ring-2 focus:ring-cocoa-brown/20'
                        }`}
                      />
                    </div>
                    {depDateError && (
                      <span role="alert" className="text-xs text-red-700 font-medium pl-1 mt-1 block">
                        {depDateError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Multi-City Add Segment Button */}
          {tripType === 'multicity' && segments.length < 4 && (
            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleAddSegment}
                className="inline-flex items-center gap-2 text-xs font-semibold text-cocoa-brown hover:text-deep-chocolate py-2 px-4 rounded-full border border-dashed border-cocoa-brown/50 hover:bg-latte-beige/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Flight Leg ({segments.length}/4)</span>
              </button>
            </div>
          )}

          {/* Secondary Controls: Return Date + Passengers + Search CTA */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:grid lg:grid-cols-12 gap-4 items-end pt-2">
            {/* Return Date (only for Round Trip) */}
            {tripType === 'roundtrip' && (
              <div className="w-full sm:flex-1 lg:col-span-4">
                <label
                  htmlFor="return-date"
                  className="text-xs font-medium uppercase tracking-wider text-deep-chocolate/80 block mb-1.5"
                >
                  Return Date
                </label>
                <div className="relative">
                  <input
                    id="return-date"
                    type="date"
                    min={segments[0]?.departureDate || getTodayString()}
                    value={returnDate}
                    onChange={(e) => {
                      setReturnDate(e.target.value);
                      if (errors['returnDate']) {
                        const copy = { ...errors };
                        delete copy['returnDate'];
                        setErrors(copy);
                      }
                    }}
                    aria-invalid={!!errors['returnDate']}
                    className={`w-full bg-white/80 focus:bg-white text-deep-chocolate text-sm font-medium rounded-2xl border transition-all py-3 px-4 outline-none ${
                      errors['returnDate']
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-latte-beige/80 focus:border-cocoa-brown focus:ring-2 focus:ring-cocoa-brown/20'
                    }`}
                  />
                </div>
                {errors['returnDate'] && (
                  <span role="alert" className="text-xs text-red-700 font-medium pl-1 mt-1 block">
                    {errors['returnDate']}
                  </span>
                )}
              </div>
            )}

            {/* Passenger & Cabin Selector */}
            <div className={`w-full sm:flex-1 ${tripType === 'roundtrip' ? 'lg:col-span-4' : 'lg:col-span-7'}`}>
              <PassengerSelector
                adults={adults}
                childrenCount={childrenCount}
                cabinClass={cabinClass}
                onChange={(a, c, cb) => {
                  setAdults(a);
                  setChildrenCount(c);
                  setCabinClass(cb);
                }}
                error={errors['passengers']}
              />
            </div>

            {/* Search Flights CTA Button */}
            <div className={`w-full sm:w-auto sm:flex-shrink-0 ${tripType === 'roundtrip' ? 'lg:col-span-4' : 'lg:col-span-5'}`}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSearching}
                className="w-full flex items-center justify-center gap-2.5 h-[50px] shadow-cocoa-md"
              >
                <Search className="w-4 h-4" />
                <span>Search Flights</span>
              </Button>
            </div>
          </div>
        </form>

        {/* Prototype Transparency Micro-note */}
        <div className="mt-6 pt-4 border-t border-latte-beige/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-deep-chocolate/70 gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cocoa-brown" />
            <span>Demonstration Search: Powered by boutique flight schedule fixtures</span>
          </div>
          <span className="font-mono text-[11px] text-cocoa-brown">
            Complimentary Cocoa Pâtisserie on all itineraries
          </span>
        </div>
      </div>

      {/* Flight Results Drawer */}
      <FlightResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        flights={searchResults}
        query={{
          tripType,
          segments,
          returnDate: tripType === 'roundtrip' ? returnDate : undefined,
          passengers: { adults, children: childrenCount },
          cabinClass,
        }}
        onSelectFlight={(_flight) => {
          // Flight selected callback for prototype
        }}
      />
    </section>
  );
};
