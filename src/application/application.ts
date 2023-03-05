import {GssConfigService} from "../gss/gss-config.service";
import {InMemoryGssConfigServiceImpl} from "../gss/in-memory-gss-config.service.impl";
import {CellRange, SheetRange} from "../gss/sheet-range";
import {FirstEmptyRowReader} from "../gss/first-empty-row-reader";
import fs from "fs";
import {cleanMbankData} from "../cleaner/cleanMbankData";
import {CleanData, CleanerService} from "../cleaner/cleaner";
import {CleanDataWriter} from "./clean-data-writer";

const configService: GssConfigService = new InMemoryGssConfigServiceImpl();
const SHEET_NAME = "Arkusz1";
const ROOT_PATH = './src/data';

export const run = async () => {
  const range = await getWriteRange();
  const data = await getLocalData();
  await writeData(range, data);
  console.info("finish");
}

const createSheetIfNotExists = () => {
  // TODO
  //... create sheet if not exists
}

const getLastFilledRowNumber = () => {
  return new FirstEmptyRowReader(configService)
  .read(
      new SheetRange("Arkusz1",
          new CellRange("B", 2),
          new CellRange("B", 100)))
  .then(result => {
    console.info("last filled row number " + result.rowNumber);
    return result;
  });
}

const getLocalData = async () => {
  const clean = (data: string, file: string, cleaningFunction: CleanerService) => cleaningFunction(data, file);
  let dailyData: CleanData[] = [];
  for (let file of fs.readdirSync(ROOT_PATH)) {
    console.info("reading file: " + file);
    const data = fs.readFileSync(ROOT_PATH + "/" + file).toString();
    let dailyValues = clean(data.toString(), file, cleanMbankData);
    dailyData = [...dailyData, ...dailyValues]
  }
  return dailyData;
}

const getWriteRange = () => {
  console.info("getting write range...")
  return getLastFilledRowNumber()
  .then(result => {
    let rowNumber = 2;

    if (result.rowNumber != 0) {
      rowNumber = result.rowNumber++;
    }

    return new SheetRange(SHEET_NAME,
        new CellRange("B", rowNumber), new CellRange("B", 100))
  });
}

const writeData = async (writeRange: SheetRange, data: CleanData[]) => {
  console.info("writing data...")
  return await new CleanDataWriter(configService).write(data, writeRange);
}
//TODO: don't save data if id already exists;