const axios = require("axios");
const mysql = require("mysql");
const dotenv = require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

function insertpromise(arr) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock(stock_no ,date,deal,amount,count) VALUES( ?,?,?,?,?);",
      arr,
      (err, results) => {
        if (err) {
          reject;
          console.error("發生錯誤", err);
        } else {
          resolve;
          console.log("OK", results);
        }
      }
    );
  });
}

async function getUser() {
  let stockCode = "0050";
  let today = "20211017";
  let format = "json";

  try {
    const response = await axios.get(
      `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
      {
        params: {
          response: format,
          data: today,
          stockNo: stockCode,
        },
      }
    );
    for (i = 0; i < response.data.data.length; i++) {
      let firstItem = response.data.data[i];

      let arr = [
        stockCode,
        firstItem[0],
        firstItem[1],
        firstItem[2],
        firstItem[8],
      ];

      insertpromise(arr);
    }
  } catch (error) {
    console.error(error);
  } finally {
    connection.end();
  }
}
getUser();
