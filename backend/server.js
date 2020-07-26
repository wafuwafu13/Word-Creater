const express = require('express')
const app = express()
// const axios = require('axios')
const mysql = require('mysql')
require('dotenv').config();

// CORSポリシーを無効にしている。
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
        console.log('error connecting db: ' + err.stack)
        return
    }
    console.log('success to connect db')
})

app.get('/api/:key', (req, res) => {
    console.log('from frontend params is: ' + req.params.key)

    connection.query({
        sql: 'INSERT INTO documents (text) values (?)',
        values: [req.params.key]
    }, (error, results) => {
        console.log(results)
    })

    // GAS用
    // const GAS_URL = process.env.GAS_URL
    // axios.get(GAS_URL + '?key=' + req.params.key)
    // .then(res=>{
    //     console.log('success to send to gas')
    // })
})

app.listen(3000)
console.log('work server port is 3000')