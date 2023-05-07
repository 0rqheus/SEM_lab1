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
    this.coinsByCountry.set(countryName, 1000000);
  }

  public addCoins(coins: number, coutry: string) {
    const currCoins = this.coinsByCountry.get(coutry) ?? 0;
    this.coinsByCountry.set(coutry, currCoins + coins);
  }

  public removeCoins(coins: number, coutry: string) {
    const currCoins = this.coinsByCountry.get(coutry) ?? 0;
    this.coinsByCountry.set(coutry, currCoins - coins);
  }

  public checkIfDone(countries: string[], iterationCount: number) {
    if (!this.isDone) {
      const motifCount = countries.filter((country) => (this.coinsByCountry.get(country) ?? 0) > 0).length;
      this.isDone = motifCount === countries.length;

      if (this.isDone) {
        // console.log(`${this.getCoords()} is done in ${iterationCount}`);
      }
    }

    return this.isDone
  }

  public getCoords() {
    return `${this.x}:${this.y}`;
  }
}