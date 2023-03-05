import {GssReader} from "./gss-reader";
import {SheetRange} from "./sheet-range";
import {GssConfigService} from "./gss-config.service";
import {google} from "googleapis";

export class FirstEmptyRowReader implements GssReader<{ rowNumber: number }> {
  constructor(private readonly configService: GssConfigService) {
  }

  read(range: SheetRange): Promise<{ rowNumber: number }> {
    const sheet = google.sheets("v4");
    return this.configService.loadCredentials()
    .then(credentials => sheet.spreadsheets.values.get({
      spreadsheetId: credentials.sheetId,
      auth: credentials.auth,
      range: range.range
    })).then(response => ({rowNumber: response.data.values ? response.data.values.length : 0}));
  }

}