const axios = require("axios");

let stockCode = "2330";
let today = "20211017";
let format = "json";

  async function getUser() {
    try {
      const response = await axios.get(
        `https://www.twse.com.tw/exchangeReport/STOCK_DAY`,
        { params: {
            response:format,
            data:today,
            stockNo:stockCode,
        } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
 getUser() 
