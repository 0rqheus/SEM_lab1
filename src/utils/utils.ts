import Country from "../interfaces/Country";

export function logResults(results: Country[], caseNumber: number) {
  results
    .sort((a, b) => (a.name as any) - (b.name as any))
    .sort((a, b) => a.daysGone - b.daysGone);

  console.log(`Case #${caseNumber + 1}`);
  for (const res of results) {
    console.log(`${res.name} is done in ${res.daysGone} days`);
  }
  console.log('\n')
}