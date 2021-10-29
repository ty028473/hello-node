const express = require("express");
let app = express();
app.get("/", (req, res) => {
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res) => {
  res.send("我是會員頁");
});

app.listen(8801, () => {
  console.log("express app啟動了");
});
