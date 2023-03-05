import {GssCredentials} from "./gss-credentials";

export interface GssConfigService {
  loadCredentials(): Promise<GssCredentials>
}