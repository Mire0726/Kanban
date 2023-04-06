const express = require('express')
const app = express()
const port = 3000

// http://localhost:3000/ でresponce.jsonの中身を返す。
app.get("/", (req, res, next) => {
    // アクセスログ
    console.log(req.method, req.url) 
    // jsonを返す
    res.json(require('./responce.json'))
});

// ポート3000でサーバ起動
app.listen(port, () => console.log(`click http://localhost:${port}/ !`))