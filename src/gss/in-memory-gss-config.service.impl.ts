import {GssConfigService} from "./gss-config.service";
import {JWT} from "google-auth-library/build/src/auth/jwtclient"
import {GssCredentials} from "./gss-credentials";

export class InMemoryGssConfigServiceImpl implements GssConfigService {
  loadCredentials(): Promise<GssCredentials> {
    return Promise.resolve({
      auth: new JWT({
        email: "",
        key: "",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
      }),
      sheetId: ""
    });
  }

}