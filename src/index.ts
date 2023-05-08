import { getUserInput } from "./services/cli";
import { createCities, simulate } from "./services/simulation";
import { logResults } from "./utils/utils";

main();

async function main() {
  const params = await getUserInput()
  for (let i = 0; i < params.length; i++) {
    const cities = createCities(params[i]);
    const results = simulate(cities, Array.from(new Set(cities.map(c => c.country))));
    logResults(results, i);
  }
}

