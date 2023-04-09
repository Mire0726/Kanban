import { FamilymartData } from "@/types/familymart";

export const familymartData: FamilymartData[] = [];

import puppeteer, { ElementHandle } from "puppeteer";
import * as fs from "fs";

/**
 * @param req HTTP request
 * @param res HTTP responce
 */

const handler: NextApiHandler = async (req, res) => {
  try {
    const url =
      "nextjs-app/src/libs/html/sample/sample.html";

    if (!url) {
      throw new Error("no url");
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    const h1 = await page.$("h1");
    const td = await page.$("td");

    fs.writeFileSync("./src/libs/html/sample/sample2.html", content);

    await browser.close();
    res.status(200).send("OK");
  } catch (e: any) {
    res.status(400).send(`error:${e.message}`);
  }
};

export default handler;

const getProperty = async (element: ElementHandle<HTMLHeadingElement> | null) => {
  if (!element) {
    return "";
  }
  const content = await element.getProperty("textContent");
  const value = await content.jsonValue();
  return value;
};

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('nextjs-app/src/libs/html/sample/sample.html');

//   await browser.close();
// })();