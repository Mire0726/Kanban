import { FamilymartData } from "@/types/familymart";

export const familymartData: FamilymartData[] = [];

const puppeteer = require('puppeteer')
// const path = require('path')

// const testItem = async page => {
//   console.log(')
  
// }

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('nextjs-app/src/libs/html/sample/sample.html');

  await browser.close();
})();