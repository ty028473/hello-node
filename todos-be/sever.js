const express = require('express')
let app = express()
const mysql = require('mysql')
const Promise = require('bluebird')
const cors = require('cors')

require('dotenv').config()

var connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
})

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection)

app.use(cors())
app.get('/', (req, res) => {
  res.send('我是 Express 首頁')
})

app.get('/member', (req, res) => {
  res.send('我是會員頁')
})

app.get('/api/todos', async (req, res) => {
  console.log("YA")
  let data = await connection.queryAsync('SELECT * FROM todos')
  res.json(data)
})
app.get('/api/todos/:todoId', async (req, res) => {
  try{
    
    let data = await connection.queryAsync("SELECT * FROM todos WHERE id = ?;", [
      req.params.todoId,
     
    ])
    if(data.length>0){
      res.json(data[0])
    }else{
      res.status(404).json("沒有資料")
    }
  }catch(err){
    res.status(404).json(err)
  }
})
app.listen(8801, () => {
  // connection.connect()
  console.log('express app啟動了')
})
