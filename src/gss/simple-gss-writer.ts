import {GssWriter} from "./gss-writer";
import {SheetRange} from "./sheet-range";
import {GssCredentials} from "./gss-credentials";
import {sheets_v4} from "googleapis";
import Sheets = sheets_v4.Sheets;

export class SimpleGssWriter implements GssWriter<string[][]> {
  constructor(private readonly credentials: GssCredentials,
              private readonly sheet: Sheets) {
  }

  write(data: string[][], range: SheetRange): Promise<any> {
    return this.sheet.spreadsheets.values.append({
      spreadsheetId: this.credentials.sheetId,
      auth: this.credentials.auth,
      range: range.range,
      valueInputOption: "RAW",
      requestBody: {
        values: data
      }
    }).catch(err => console.error(err))
  }

}