import { FamilymartData } from "@/types/familymart";

export const familymartData: FamilymartData[] = [
 {
    id: string;
    name: "ファミリーマート 石狩花川北１条店";
    account: ;
    name: string;
    address: string;
    telephone: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };

];


//puppeteerのライブラリをインストール
import  puppeteer  from 'puppeteer'
 
//puppeteerのlaunch関数を使って、puppeteerを起動します。
puppeteer.launch(
    //puppeteerの設定を記載します。
    {   // headlessモードの設定 trueの場合,ヘッドレスで起動
        // 動作確認のため、falseに設定
        headless: false,
        // 動作確認のため、puppeteerの操作を遅延させる設定  
        slowMo: 100,
        // Chromeのビューポート設定  
    //     defaultViewport: {
    //       width: 1320,height: 1080
    //   },
    
    //  自分のChromeプロファイルを利用したい場合は設定。設定しない場合デフォルトのChromeが起動
    //  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    //  userDataDir: 'C:\\Users\\user\\AppData\\Local\\Google\\Chrome\\User Data',
    
    }
//上記設定後にブラウザを起動
).then(async browser => {
    const page = await browser.newPage();
    //Googleのホームページに移動。
    await page.goto('https://google.com');
    //ブラウザを閉じる。
    await browser.close();
});