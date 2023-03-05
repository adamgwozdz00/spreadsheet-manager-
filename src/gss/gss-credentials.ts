import {JWT} from "google-auth-library/build/src/auth/jwtclient"

export interface GssCredentials {

  readonly auth: JWT
  readonly sheetId: string;

}