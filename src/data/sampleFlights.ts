import type { FlightOption, SearchQuery } from '../types/flight';
import { getAirportByCode } from './airports';

export const SAMPLE_PATISSERIE_OFFERINGS = [
  'Grand Cru Chocolate Fondant with Madagascar Bourbon Vanilla Crème',
  'Rosewater & Raspberry Macaron Carousel with Earl Grey Ganache',
  'Swiss Praline Brioche Feuilletée & Warm Spiced Hot Cocoa',
  'Pistachio Blossom Tartlet & Single-Origin Ecuadorian Truffles',
  'Honeyed Almond Tuile with White Chocolate Champagne Mousse',
];

export const searchMockFlights = (query: SearchQuery): FlightOption[] => {
  const segment = query.segments[0] || {
    origin: 'ZRH',
    destination: 'CDG',
    departureDate: '2026-10-20',
  };

  const originAirport = getAirportByCode(segment.origin);
  const destAirport = getAirportByCode(segment.destination);

  const basePriceMap = {
    economy: 340,
    business: 890,
    first: 1680,
  };

  const basePrice = basePriceMap[query.cabinClass] || 450;
  const passengerMultiplier = query.passengers.adults + query.passengers.children * 0.75;

  return [
    {
      id: 'AC-102',
      flightNumber: 'AC 102',
      airline: 'Aéro Cocoa Première',
      origin: originAirport,
      destination: destAirport,
      departureTime: '08:30 AM',
      arrivalTime: '10:45 AM',
      duration: '2h 15m',
      aircraft: 'Airbus A350-900 Velvet Skies',
      seatsAvailable: 4,
      cabinClass: query.cabinClass,
      price: Math.round(basePrice * passengerMultiplier),
      currency: 'USD',
      amenities: [
        'Artisanal Hot Cocoa Service',
        'Signature Pâtisserie Box',
        'Complimentary Cloud Wi-Fi',
        'Cashmere Travel Blanket',
      ],
      patisserieFeature: SAMPLE_PATISSERIE_OFFERINGS[0],
    },
    {
      id: 'AC-304',
      flightNumber: 'AC 304',
      airline: 'Aéro Cocoa Salon Privé',
      origin: originAirport,
      destination: destAirport,
      departureTime: '01:15 PM',
      arrivalTime: '03:30 PM',
      duration: '2h 15m',
      aircraft: 'Boeing 787-9 Dreamliner Sweet Dream',
      seatsAvailable: 7,
      cabinClass: query.cabinClass,
      price: Math.round((basePrice + 120) * passengerMultiplier),
      currency: 'USD',
      amenities: [
        'Champagne & Macaron Welcome',
        'Master Chocolatier Tasting Flight',
        'Noise-Canceling Acoustic Pods',
        'Priority Salon Boarding',
      ],
      patisserieFeature: SAMPLE_PATISSERIE_OFFERINGS[1],
    },
    {
      id: 'AC-708',
      flightNumber: 'AC 708',
      airline: 'Aéro Cocoa Twilight',
      origin: originAirport,
      destination: destAirport,
      departureTime: '06:45 PM',
      arrivalTime: '09:05 PM',
      duration: '2h 20m',
      aircraft: 'Airbus A321neo Cloud Nine',
      seatsAvailable: 2,
      cabinClass: query.cabinClass,
      price: Math.round((basePrice - 40) * passengerMultiplier),
      currency: 'USD',
      amenities: [
        'Warm Cocoa Nightcap Service',
        'Lavish Bedding & Silk Eye Mask',
        'Aromatherapy Cloud Mist',
      ],
      patisserieFeature: SAMPLE_PATISSERIE_OFFERINGS[2],
    },
  ];
};
