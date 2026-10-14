import type { Airport } from '../types/flight';

export const BOUTIQUE_AIRPORTS: Airport[] = [
  {
    code: 'ZRH',
    name: 'Zürich Kloten',
    city: 'Zürich',
    country: 'Switzerland',
  },
  {
    code: 'CDG',
    name: 'Charles de Gaulle',
    city: 'Paris',
    country: 'France',
  },
  {
    code: 'JFK',
    name: 'John F. Kennedy',
    city: 'New York',
    country: 'United States',
  },
  {
    code: 'HND',
    name: 'Tokyo Haneda',
    city: 'Tokyo',
    country: 'Japan',
  },
  {
    code: 'LHR',
    name: 'London Heathrow',
    city: 'London',
    country: 'United Kingdom',
  },
  {
    code: 'MXP',
    name: 'Milan Malpensa',
    city: 'Milan',
    country: 'Italy',
  },
  {
    code: 'VIE',
    name: 'Vienna Schwechat',
    city: 'Vienna',
    country: 'Austria',
  },
  {
    code: 'GVA',
    name: 'Geneva Cointrin',
    city: 'Geneva',
    country: 'Switzerland',
  },
  {
    code: 'DXB',
    name: 'Dubai International',
    city: 'Dubai',
    country: 'United Arab Emirates',
  },
  {
    code: 'SIN',
    name: 'Singapore Changi',
    city: 'Singapore',
    country: 'Singapore',
  },
];

export const getAirportByCode = (code: string): Airport => {
  return BOUTIQUE_AIRPORTS.find((a) => a.code === code) || {
    code: code || 'UNKNOWN',
    name: 'International Airport',
    city: code || 'Selected Hub',
    country: 'Worldwide',
  };
};
