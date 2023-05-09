import City from "../interfaces/City";
import { CountryParams } from "../interfaces/CountryParams";
import Country from "../interfaces/Country";


export function createCities(countries: CountryParams[]) {
  const citiesMap = new Map<string, City>();

  // create cities
  for (const country of countries) {
    const { xl, xh, yl, yh } = country;
    for (let i = xl; i <= xh; i++) {
      for (let j = yl; j <= yh; j++) {
        const coords = `${i}:${j}`;
        if (!citiesMap.has(coords)) {
          citiesMap.set(`${i}:${j}`, new City(country.name, i, j));
        } else {
          throw new Error(`City already exists x:${i}; y:${j}`);
        }
      }
    }
  }

  // assign neighbours
  const connectedCountries = new Set<string>();
  for (const city of citiesMap.values()) {
    const { x, y, country } = city;

    const neighbours = [
      citiesMap.get(`${x + 1}:${y}`),
      citiesMap.get(`${x - 1}:${y}`),
      citiesMap.get(`${x}:${y + 1}`),
      citiesMap.get(`${x}:${y - 1}`),
    ].filter((c) => c != undefined) as City[];

    city.neighbours = neighbours;

    if(!connectedCountries.has(country) && neighbours.some((n) => n.country !== country)) {
      connectedCountries.add(country);
    }
  }

  if(connectedCountries.size != countries.length) {
    throw new Error('Not all countries are connected!');
  }

  return Array.from(citiesMap.values());
}

export function simulate(cities: City[], countryNames: string[]) {
  const countries = countryNames.map((name) => new Country(name, cities.filter((city) => city.country === name)));
  let doneCountries = countries.filter((c) => c.checkIfDone(countryNames, 0)).length;
  let i = 1;

  while (doneCountries !== countries.length) {
    const coinsToAdd = [] as [City, number, string][]

    for (const city of cities) {
      for (const [country, coins] of city.coinsByCountry.entries()) {
        const representativePortion = Math.floor(coins / 1000);

        if(representativePortion > 0) {
          for (const neighbour of city.neighbours) {
            coinsToAdd.push([neighbour, representativePortion, country]); // neighbour.addCoins(representativePortion, country);
            city.removeCoins(representativePortion, country);
          }
        }
      }
    }

    coinsToAdd.forEach(([city, coins, country]) => city.addCoins(coins, country))

    doneCountries = countries.filter((c) => c.checkIfDone(countryNames, i)).length;

    i += 1;
  }

  return countries;
}
