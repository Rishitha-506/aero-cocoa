export type CabinClass = 'economy' | 'business' | 'first';

export type TripType = 'roundtrip' | 'oneway' | 'multicity';

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface FlightSegment {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
}

export interface SearchQuery {
  tripType: TripType;
  segments: FlightSegment[];
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
  };
  cabinClass: CabinClass;
}

export interface FlightOption {
  id: string;
  flightNumber: string;
  airline: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  aircraft: string;
  seatsAvailable: number;
  cabinClass: CabinClass;
  price: number;
  currency: string;
  amenities: string[];
  patisserieFeature: string;
}

export interface ValidationErrors {
  [key: string]: string | undefined;
}
