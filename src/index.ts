import { getUserInput } from "./services/cli";
import { createCities, simulate } from "./services/simulation";

main();

async function main() {
  const params = await getUserInput()
  for(let i = 0; i < params.length; i++) {
    const cities = createCities(params[i]);
    const results = simulate(cities, Array.from(new Set(cities.map(c => c.country))));
    
    console.log(`Case #${i+1}`);
    for(const res of results) {
      console.log(`${res.name} is done in ${res.daysGone} days`);
    }
    console.log('\n')
  }
}
