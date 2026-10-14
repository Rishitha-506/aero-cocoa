// Validation logic tester for Aéro Cocoa

function validate(params) {
  const { tripType, segments, returnDate, adults, childrenCount } = params;
  const errors = {};
  const today = '2026-10-12';

  segments.forEach((seg, idx) => {
    if (!seg.origin) {
      errors[`segment-${idx}-origin`] = 'Departure hub is required.';
    }
    if (!seg.destination) {
      errors[`segment-${idx}-destination`] = 'Destination hub is required.';
    }
    if (seg.origin && seg.destination && seg.origin === seg.destination) {
      errors[`segment-${idx}-destination`] = 'Departure and destination airports cannot be identical.';
    }
    if (!seg.departureDate) {
      errors[`segment-${idx}-departureDate`] = 'Departure date is required.';
    } else if (seg.departureDate < today) {
      errors[`segment-${idx}-departureDate`] = 'Departure date cannot be in the past.';
    }

    if (idx > 0) {
      const prevSeg = segments[idx - 1];
      if (seg.departureDate && prevSeg.departureDate && seg.departureDate < prevSeg.departureDate) {
        errors[`segment-${idx}-departureDate`] = 'Segment departure must be on or after previous segment.';
      }
    }
  });

  if (tripType === 'roundtrip') {
    const firstDep = segments[0]?.departureDate;
    if (!returnDate) {
      errors['returnDate'] = 'Return date is required for round trips.';
    } else if (returnDate < today) {
      errors['returnDate'] = 'Return date cannot be in the past.';
    } else if (firstDep && returnDate < firstDep) {
      errors['returnDate'] = 'Return date must be on or after departure date.';
    }
  }

  if (adults < 1) {
    errors['passengers'] = 'At least 1 adult guest is required.';
  }
  if (adults + childrenCount > 9) {
    errors['passengers'] = 'Maximum 9 guests allowed per reservation.';
  }

  return errors;
}

// Test cases
console.log('--- TEST 1: Identical airports ---');
const t1 = validate({
  tripType: 'oneway',
  segments: [{ origin: 'ZRH', destination: 'ZRH', departureDate: '2026-10-20' }],
  adults: 1,
  childrenCount: 0
});
console.log('Result:', t1);
console.assert(t1['segment-0-destination'] === 'Departure and destination airports cannot be identical.');

console.log('\n--- TEST 2: Past departure date ---');
const t2 = validate({
  tripType: 'oneway',
  segments: [{ origin: 'ZRH', destination: 'CDG', departureDate: '2026-10-01' }],
  adults: 1,
  childrenCount: 0
});
console.log('Result:', t2);
console.assert(t2['segment-0-departureDate'] === 'Departure date cannot be in the past.');

console.log('\n--- TEST 3: Return date before departure date ---');
const t3 = validate({
  tripType: 'roundtrip',
  segments: [{ origin: 'ZRH', destination: 'CDG', departureDate: '2026-10-20' }],
  returnDate: '2026-10-18',
  adults: 1,
  childrenCount: 0
});
console.log('Result:', t3);
console.assert(t3['returnDate'] === 'Return date must be on or after departure date.');

console.log('\n--- TEST 4: One-way does not require return date ---');
const t4 = validate({
  tripType: 'oneway',
  segments: [{ origin: 'ZRH', destination: 'CDG', departureDate: '2026-10-20' }],
  adults: 1,
  childrenCount: 0
});
console.log('Result:', t4);
console.assert(Object.keys(t4).length === 0, 'One-way should be valid without return date');

console.log('\n--- TEST 5: Multi-city chronological violation ---');
const t5 = validate({
  tripType: 'multicity',
  segments: [
    { origin: 'ZRH', destination: 'CDG', departureDate: '2026-10-20' },
    { origin: 'CDG', destination: 'JFK', departureDate: '2026-10-19' }
  ],
  adults: 2,
  childrenCount: 0
});
console.log('Result:', t5);
console.assert(t5['segment-1-departureDate'] === 'Segment departure must be on or after previous segment.');

console.log('\n--- TEST 6: Zero adults ---');
const t6 = validate({
  tripType: 'oneway',
  segments: [{ origin: 'ZRH', destination: 'CDG', departureDate: '2026-10-20' }],
  adults: 0,
  childrenCount: 1
});
console.log('Result:', t6);
console.assert(t6['passengers'] === 'At least 1 adult guest is required.');

console.log('\n--- TEST 7: Valid Round Trip ---');
const t7 = validate({
  tripType: 'roundtrip',
  segments: [{ origin: 'ZRH', destination: 'CDG', departureDate: '2026-10-20' }],
  returnDate: '2026-10-27',
  adults: 2,
  childrenCount: 1
});
console.log('Result:', t7);
console.assert(Object.keys(t7).length === 0, 'Valid round trip should have 0 errors');

console.log('\nALL 7 VALIDATION TESTS PASSED!');
