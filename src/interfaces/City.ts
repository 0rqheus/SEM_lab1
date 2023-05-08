const START_COINS_AMOUNT = 1000000;

export default class City {
  public readonly country: string;
  public readonly x: number;
  public readonly y: number;
  public readonly coinsByCountry = new Map<string, number>();

  public neighbours: City[];

  private _isDone = false;

  public get isDone() {
    return this._isDone;
  }

  private set isDone(value) {
    this._isDone = value;
  }

  constructor(countryName: string, xCoord: number, yCoord: number) {
    this.country = countryName;
    this.x = xCoord;
    this.y = yCoord;
    this.coinsByCountry.set(countryName, START_COINS_AMOUNT);
  }

  public addCoins(coins: number, country: string) {
    const currCoins = this.coinsByCountry.get(country) ?? 0;
    this.coinsByCountry.set(country, currCoins + coins);
  }

  public removeCoins(coins: number, country: string) {
    const currCoins = this.coinsByCountry.get(country) ?? 0;
    this.coinsByCountry.set(country, currCoins - coins);
  }

  public checkIfDone(countries: string[]) {
    if (this.isDone) {
      return true;
    }

    const motifCount = countries.filter((country) => (this.coinsByCountry.get(country) ?? 0) > 0).length;
    this.isDone = motifCount === countries.length;

    return this.isDone
  }

  public getCoords() {
    return `${this.x}:${this.y}`;
  }
}