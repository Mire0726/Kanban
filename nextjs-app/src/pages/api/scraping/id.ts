import { NextApiHandler } from "next";
import puppeteer, { ElementHandle } from "puppeteer";
import * as fs from "fs";

/**
 * @param req HTTP request
 * @param res HTTP responce
 */

const handler_id: NextApiHandler = async (req, res) => {
  try {
    const url = "https://wxh.jp/famima/00_all.html";

    if (!url) {
      throw new Error("no url");
    }
    // pupeteerを使います
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // ここで上記urlのhtmlを取得できるよ!
    let html = await page.content();

    const tag = `店</a></td><td>`;

    var famimaIds = [];
    let continueFlag = true;

    while (continueFlag) {
      const index = html.indexOf(tag);
      const html2 = html.slice(index + tag.length);
      const index2 = html2.indexOf(`</td>`);
      const id = html2.slice(0, index2);

      famimaIds.push(id);

      if (index2 === -1) {
        continueFlag = false;
      }
      html = html2.slice(index2 + tag.length);
    }

    await browser.close();
    res.status(200).send(famimaIds);
  } catch (e: any) {
    res.status(400).send(`error:${e.message}`);
  }
};


export default handler_id;