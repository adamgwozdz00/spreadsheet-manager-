import {GssWriter} from "./gss-writer";
import {GssConfigService} from "./gss-config.service";
import {google} from "googleapis";
import {SheetRange} from "./sheet-range";

export class ExampleGssWriter implements GssWriter<string[][]> {

  constructor(private readonly configService: GssConfigService) {
  }

  write(data: string[][], range: SheetRange): Promise<any> {
    const sheet = google.sheets("v4");
    return this.configService.loadCredentials()
    .then(credentials => sheet.spreadsheets.values.append({
      spreadsheetId: credentials.sheetId,
      auth: credentials.auth,
      range: range.range,
      valueInputOption: "RAW",
      requestBody: {
        values: data
      }
    })).catch(err => console.log(err))
  }


}