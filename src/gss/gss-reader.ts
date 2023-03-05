import {SheetRange} from "./sheet-range";

export interface GssReader<T> {
  read(range: SheetRange): Promise<T>
}