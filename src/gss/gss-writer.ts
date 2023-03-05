import {SheetRange} from "./sheet-range";

export interface GssWriter<T> {
  write(data: T, range: SheetRange): Promise<any>
}