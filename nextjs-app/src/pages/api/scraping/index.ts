import { NextApiHandler } from "next";
import puppeteer, { ElementHandle } from "puppeteer"; //yarn add --dev @types/puppeteer
import * as fs from "fs";
import { famimaIds } from "../../../libs/html/familymart/id";

/**
 * @param req HTTP requesst
 * @param res HTTP responce
 */

const handler: NextApiHandler = async (req, res) => {
  try {
    for (let i = 12634; i < famimaIds.length; i++) {
      const famimaId = famimaIds[i]; // <- 七戸中野店
      const url = `https://as.chizumaru.com/famima/detailMap?account=famima&bid=${famimaId}`; // <- 七戸中野店のurl

      if (!url) {
        /* このプログラムの場合、urlは必ず存在するからこのif文は実行されないけど、
        urlが存在しないみたいな場合の時のために throw new Error("xxx") でエラーを出すようにする!
        これを例外処理(エラーハンドリング)と言います!*/
        throw new Error("no url");
      }
      console.log(i);

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
      if (index > -1) {
        const html2 = html.slice(index + tag.length);
        const index2 = html2.indexOf(`</script>`);
        const json = html2.slice(0, index2);

        const deta = JSON.parse(json);

        const familymartData: FamilymartData = {
          id: famimaId,
          account: "famima",
          name: deta.name,
          address: deta.address.address,
          telephone: deta.telephone,
          postalCode: deta.address.postalCode,
          latitude: deta.geo.latitude,
          longitude: deta.geo.latitude,
        };

        interface FamilymartData {
          id: string; // "https://as.chizumaru.com/famima/detailMap?account=famima&bid=73361 のbidの部分(73361)",
          account: string; // "https://as.chizumaru.com/famima/detailMap?account=famima&bid=73361 のaccountの部分(famima)",
          name: string;
          address: string;
          telephone: string;
          postalCode: string;
          latitude: number;
          longitude: number;
        }

        const str = JSON.stringify(familymartData);

        // fs.writeFileSync(`./src/data/familymarts/${famimaId}.ts`, str);
        fs.writeFileSync(`./src/data/familymarts/${famimaId}.json`, json);
      }
      await browser.close();
    }

    res.status(200).send("OK");
  } catch (e: any) {
    res.status(400).send(`error:${e.message}`);
  }
};

export default handler;
