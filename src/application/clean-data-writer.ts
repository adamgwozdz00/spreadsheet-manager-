import {GssWriter} from "../gss/gss-writer";
import {CleanData} from "../cleaner/cleaner";
import {google} from "googleapis";
import {SheetRange} from "../gss/sheet-range";
import {GssConfigService} from "../gss/gss-config.service";

export class CleanDataWriter implements GssWriter<CleanData[]> {
  constructor(private readonly configService: GssConfigService) {
  }

  write(data: CleanData[], range: SheetRange): Promise<any> {
    const sheet = google.sheets("v4");
    return this.configService.loadCredentials()
    .then(credentials => sheet.spreadsheets.values.append({
      spreadsheetId: credentials.sheetId,
      auth: credentials.auth,
      range: range.range,
      valueInputOption: "RAW",
      requestBody: {
        values: data.map(value => ([value.title, value.price, value.date.toLocaleDateString("en-GB"), value.id]))
      }
    })).catch(err => console.log(err))
  }

}