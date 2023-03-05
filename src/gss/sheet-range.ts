export class SheetRange {

  private readonly _range: string;

  constructor(sheetName: string, start: CellRange, stop: CellRange) {
    this._range = sheetName + "!" + start.range + ":" + stop.range;
  }


  get range(): string {
    return this._range;
  }
}

export class CellRange {

  private readonly _range: string;

  constructor(collName: string, rowNumber: number) {
    if (rowNumber < 1) {
      throw new Error("Illegal row number.")
    }

    this._range = collName + rowNumber;
  }


  get range(): string {
    return this._range;
  }
}
