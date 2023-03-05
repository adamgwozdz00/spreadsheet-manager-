import fs from "fs";
import {cleanMbankData} from "./cleanMbankData";
import {CleanerService} from "./cleaner";

const ROOT_PATH = './src/cleaner/resources';

fs.readdir(ROOT_PATH, (err, files) => {
  for (let file of files) {
    fs.readFile(ROOT_PATH + "/" + file, (err, data) => {
      const dailyData = clean(data.toString(), file, cleanMbankData);
      console.log(dailyData);
      console.log("================")
    });

  }
})

const clean = (data: string, file: string, cleaningFunction: CleanerService) => cleaningFunction(data, file);