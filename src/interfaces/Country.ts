import City from "./City";

export default class Country {
  readonly name: string;
  readonly cities: City[]

  private _isDone = false;
  public get isDone() {
    return this._isDone;
  }
  private set isDone(value) {
    this._isDone = value;
  }

  private _daysGone = 0;
  public get daysGone() {
    return this._daysGone;
  }
  private set daysGone(value) {
    this._daysGone = value;
  }

  constructor(countryName: string, countryCities: City[]) {
    this.name = countryName;
    this.cities = countryCities;
  }

  checkIfDone(countryNames: string[], iterationCount: number) {
    if (!this.isDone && this.cities.filter((c) => c.checkIfDone(countryNames, iterationCount)).length === this.cities.length) {
      this.isDone = true;
      this.daysGone = iterationCount;

      // console.log(`${this.name} is done in ${iterationCount}`);
    }

    return this.isDone;
  }
}