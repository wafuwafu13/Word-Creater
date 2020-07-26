const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config();

// CORSポリシーを無効にしている。
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.get('/api/:key', (req, res) => {
    console.log('from frontend params is: ' + req.params.key)
    const GAS_URL = process.env.GAS_URL
    axios.get(GAS_URL + '?key=' + req.params.key)
    .then(res=>{
        console.log('success to send to gas')
    })
})

app.listen(3000)
console.log('work server port is 3000')