const express = require('express')
const app = express()
// const axios = require('axios')
const mysql = require('mysql')
require('dotenv').config();

// CORSポリシーを無効にする
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

// ファイル名、テキストをDBに保存
app.get('/:name/:text', (req, res) => {
    console.log('from frontend params: name => ' + req.params.name)
    console.log('from frontend params: text => ' + req.params.text)

    connection.query({
        sql: 'INSERT INTO documents (name, text) values (?, ?)',
        values: [req.params.name, req.params.text]
    }, (error, results) => {
        console.log('↓ results from db')
        console.log(results)
    })

    // GAS用
    // const GAS_URL = process.env.GAS_URL
    // axios.get(GAS_URL + '?key=' + req.params.key)
    // .then(res=>{
    //     console.log('success to send to gas')
    // })
})

// DBにあるファイル名を返す
app.get('/filenames', (req, res) => {
    let filenames = []
    connection.query('SELECT name from documents', (error, row, fields) => {
        if (error) {
            console.log('error occured in db: '+ error)
        }
        let files = []
        for (let i = 0; i < row.length; i++) {
            files.push(row[i])
        }
        filenames = JSON.stringify(files)
        res.header('Content-Type', 'application/json; charset=utf-8')
        res.send(filenames)
    })
})

app.get('/create/:key', (req, res) => {
    let { PythonShell } = require('python-shell')
    let pyshell = new PythonShell('test.py')
    console.log('from frontend params is: ' + req.params.key)

    pyshell.send(req.params.key)

    pyshell.on('message', function (data) {
        console.log(data + ' from python');
    });
})

app.listen(3000)
console.log('work server port is 3000')