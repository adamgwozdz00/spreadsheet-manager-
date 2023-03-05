import {GssReader} from "./gss-reader";
import {SheetRange} from "./sheet-range";
import {GssCredentials} from "./gss-credentials";
import {sheets_v4} from "googleapis";
import Sheets = sheets_v4.Sheets;

export class SimpleGssReader implements GssReader<string[][]> {

  constructor(private readonly credentials: GssCredentials,
              private readonly sheet: Sheets) {
  }

  read(range: SheetRange): Promise<string[][]> {
    return this.sheet.spreadsheets.values.get({
      spreadsheetId: this.credentials.sheetId,
      auth: this.credentials.auth,
      range: range.range
    }).then(response => response.data.values);
  }

}