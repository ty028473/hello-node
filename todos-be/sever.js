const express = require("express");
let app = express();
const mysql = require("mysql");
const Promise = require("bluebird");

require("dotenv").config();


var connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);


app.get("/", (req, res) => {
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res) => {
  res.send("我是會員頁");
});

app.listen(8801, () => {
  connection.connect();
  console.log("express app啟動了");
});
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});
