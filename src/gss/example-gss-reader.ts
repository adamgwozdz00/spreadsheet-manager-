import {GssReader} from "./gss-reader";
import {SheetRange} from "./sheet-range";
import {google} from "googleapis";
import {GssConfigService} from "./gss-config.service";

export class ExampleGssReader implements GssReader<string> {

  constructor(private readonly configService: GssConfigService) {
  }

  read(range: SheetRange): Promise<string> {
    const sheet = google.sheets("v4");
    return this.configService.loadCredentials()
    .then(credentials => sheet.spreadsheets.values.get({
      spreadsheetId: credentials.sheetId,
      auth: credentials.auth,
      range: range.range
    })).then(response => response.data.values.join(" "))
  }

}