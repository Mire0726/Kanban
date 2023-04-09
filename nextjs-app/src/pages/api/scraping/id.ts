import { NextApiHandler } from "next";
import puppeteer, { ElementHandle } from "puppeteer";
import * as fs from "fs";

/**
 * @param req HTTP request
 * @param res HTTP responce
 */

const handler: NextApiHandler = async (req, res) => {
  try {
   
    const url = `https://wxh.jp/famima/00_all.html`; // <- id取得できるWebサイト

    if (!url) {
      /* このプログラムの場合、urlは必ず存在するからこのif文は実行されないけど、
      urlが存在しないみたいな場合の時のために throw new Error("xxx") でエラーを出すようにする!
      これを例外処理(エラーハンドリング)と言います!*/
      throw new Error("no url");
    }
    
    // pupeteerを使います
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // ここで上記urlのhtmlを取得できるよ!
    const html = await page.content();

    /* でこのhtmlは ./src/libs/html/sample.htmlに格納されているような形のhtmlになってる
    今までは fs.writeFileSync("./src/libs/html/sample/sample.html", html);
    で一旦ファイルに保存してたけど、このファイルの中で操作をしてみよう!
     */

    const tag = `<script type="application/ld+json">`;
    const index = html.indexOf(tag);
    const html2 = html.slice(index + tag.length);
    const index2 = html2.indexOf(`</script>`);
    const json = html2.slice(0, index2);
    
    fs.writeFileSync("./src/data/familymarts/id.json",json);



    await browser.close();
    res.status(200).send("OK");
  } catch (e: any) {
    res.status(400).send(`error:${e.message}`);
  }
};

export default handler;