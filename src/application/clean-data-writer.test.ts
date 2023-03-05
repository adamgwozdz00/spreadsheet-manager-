import {CleanDataWriter} from "./clean-data-writer";
import {InMemoryGssConfigServiceImpl} from "../gss/in-memory-gss-config.service.impl";
import {CellRange, SheetRange} from "../gss/sheet-range";

const test = async () => {
  await new CleanDataWriter(new InMemoryGssConfigServiceImpl()).write([
    {id: "12", title: "Example", date: new Date(), price: -25},
    {id: "322", title: "Example2", date: new Date(), price: -55},
  ], new SheetRange("Arkusz1",
      new CellRange("B", 2),
      new CellRange("B", 100)))
}

(async () => await test())();