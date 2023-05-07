import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { z } from 'zod';
import { CountryParams, CountryParamsSchema } from '../interfaces/CountryParams';

export async function getUserInput() {
  const inputData: CountryParams[][] = [];

  const rl = readline.createInterface({ input, output });
  let userInput = '';

  while (userInput !== '0') {
    userInput = await rl.question('Enter number of countries:\n');
    const countriesCount = z.number().parse(Number(userInput));
    const arr: CountryParams[] = []

    for (let i = 0; i < countriesCount; i++) {
      userInput = await rl.question('Enter country name and its coords:\n');
      const [name, xl, yl, xh, yh] = userInput.split(/\s/);

      const countryParams: CountryParams = {
        name,
        xl: Number(xl),
        yl: Number(yl),
        xh: Number(xh),
        yh: Number(yh),
      };
      assertCountryParams(countryParams);
      arr.push(countryParams)
    }

    if (arr.length) {
      inputData.push(arr);
    }
    console.log()
  }
  rl.close();

  return inputData;
}

function assertCountryParams(data: CountryParams) {
  CountryParamsSchema.parse(data)
  if (data.xl > data.xh || data.yl > data.yh) {
    throw new Error('bottom left coordinates cannot be larger then top right');
  }
}