const axios = require("axios");

let stockCode = "2330";
let today = "20211017";
let format = "json";
axios
  .get(
    `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
    { params: {
        response:format,
        data:today,
        stockNo:stockCode,
    } }
  )
  .then((res) => {
    console.log(res.data);
  })
  .catch((e) => {
    console.error("錯誤", e);
  });
