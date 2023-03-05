import {CleanData, CleanerService} from "./cleaner";

export const cleanMbankData: CleanerService = function (data: string, fileName: string) {
  const calendarDate = extractDate(fileName);
  const results: CleanData[] = [];
  const cleanData = cleanMbankHTM(data.toString());
  for (let i = 0; i < cleanData.length; i = i + 2) {
    const hourAndMinute = cleanData[i].split(":");

    const hours = Number.parseInt(hourAndMinute[0]);
    const minutes = Number.parseInt(hourAndMinute[1]);
    calendarDate.setHours(hours, minutes);

    let priceAndTitle = cleanData[i + 1];

    const multiplier = priceAndTitle.toLowerCase().includes("autoryzacja karty") ? -1 : 1;
    let title = priceAndTitle.toLowerCase().split('kwota')[0];
    let price = priceAndTitle.toLowerCase().split('kwota')[1];

    if (price && title) {
      title = replaceAll(title, 'mbank:', "");
      title = replaceAll(title, ":", "");
      title = replaceAll(title, 'autoryzacja karty 77216659', "").trim();

      price = replaceAll(price, ": ", "");
      price = replaceAll(price, ",", ".");

      results.push({
        id: replaceAll(fileName + hourAndMinute, " ", ""),
        date: calendarDate,
        price: Number.parseFloat(price) * multiplier,
        title: title
      })
    }

  }
  return results;
}

const cleanMbankHTM = (htmData: string) => htmData.split("\n")
.slice(54)
.slice(0, -18)
.map(line => replaceHTMLSigns(line.trim()))
.filter(line => line.trim() !== "");

const extractDate = (str: string) => new Date(str.split('z')[1].split('.')[0]);

const replaceHTMLSigns = (text: string) => {

  let result = text.replace(/[&\/\\#+()$~%.'"*?<>{}]/g, '_');
  result = replaceAll(result, "\r", "");
  result = replaceAll(result, "_center_", "");
  result = replaceAll(result, "_nobr_", "");
  result = replaceAll(result, "_nobr_", "");
  result = replaceAll(result, "_tr_", "");
  result = replaceAll(result, "_td_", "");
  result = replaceAll(result, "_td_", "");
  result = replaceAll(result, '_td class=_data_ align=_center__>', "");
  result = replaceAll(result, '_td class=_data_', "");
  result = replaceAll(result, '_', "");
  result = replaceAll(result, 'align=', "");

  return result;
}
const replaceAll = (str: string, search: string, replace: string) => str.split(search).join(replace);