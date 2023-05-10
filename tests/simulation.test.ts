import { createCities, simulate } from "../src/services/simulation";

test('France (1:1-2:2), Spain (3:1-4:3)', () => {
  const params = [
    {
      name: 'France',
      xl: 1,
      yl: 1,
      xh: 2,
      yh: 2
    },
    {
      name: 'Spain',
      xl: 3,
      yl: 1,
      xh: 4,
      yh: 3
    }
  ];

  const cities = createCities(params);
  const results = simulate(cities, Array.from(new Set(cities.map(c => c.country))));
  console.log(results);

  expect(results.find((r) => r.name === 'France')?.daysGone).toBe(2);
  expect(results.find((r) => r.name === 'Spain')?.daysGone).toBe(49);
});

test('Luxembourg (1:1-2:2)', () => {
  const params = [
    {
      name: 'Luxembourg',
      xl: 1,
      yl: 1,
      xh: 2,
      yh: 2
    }
  ];

  const cities = createCities(params);
  const results = simulate(cities, Array.from(new Set(cities.map(c => c.country))));

  expect(results.find((r) => r.name === 'Luxembourg')?.daysGone).toBe(0);
});

test('Netherlands (1:3-2:4), Belgium (1:1-2:2)', () => {
  const params = [
    {
      name: 'Belgium',
      xl: 1,
      yl: 1,
      xh: 2,
      yh: 2
    },
    {
      name: 'Netherlands',
      xl: 1,
      yl: 3,
      xh: 2,
      yh: 4
    }
  ];

  const cities = createCities(params);
  const results = simulate(cities, Array.from(new Set(cities.map(c => c.country))));

  expect(results.find((r) => r.name === 'Belgium')?.daysGone).toBe(2)
  expect(results.find((r) => r.name === 'Netherlands')?.daysGone).toBe(2)
});

test('France (1:4-4:6), Spain (3:1-6:3), Portugal (1:1-2:2)', () => {
  const params = [
    {
      name: 'France',
      xl: 1,
      yl: 4,
      xh: 4,
      yh: 6
    },
    {
      name: 'Spain',
      xl: 3,
      yl: 1,
      xh: 6,
      yh: 3
    },
    {
      name: 'Portugal',
      xl: 1,
      yl: 1,
      xh: 2,
      yh: 2
    },
  ];

  const cities = createCities(params);
  const results = simulate(cities, Array.from(new Set(cities.map(c => c.country))));
  console.log(results);

  expect(results.find((r) => r.name === 'France')?.daysGone).toBe(1325)
  expect(results.find((r) => r.name === 'Spain')?.daysGone).toBe(382)
  expect(results.find((r) => r.name === 'Portugal')?.daysGone).toBe(416)
})