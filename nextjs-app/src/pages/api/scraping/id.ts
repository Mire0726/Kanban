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
    let ids: string[] = []
    let isFinish=false;

    while(!isFinish){
    const tag = "店</a></td><td>";
    const index = html.indexOf(tag); //html.indexOf(店</a></td><td>)　＝　①
    const html2 = html.slice(index + tag.length); //②
    const index2 = html2.indexOf("</td>"); //③
    const deta = html2.slice(0, index2); //④

    ids.push(deta);
     
    }

    // for (let i=0;i<deta.)

    
   
    // const familymartID: FamilymartID = {
    //   id: deta.id; 
    // }
    // interface FamilymartID{
      
    //     id: string; 
    // }

console.log(ids);

    fs.writeFileSync("./src/libs/html/familymart/id.html",JSON.stringify(ids));
    

    await browser.close();
    res.status(200).send("OK");

  } catch (e: any) {
    res.status(400).send(`error:${e.message}`);
  }
};

export default handler;