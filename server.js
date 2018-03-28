var sq = require('./simpleQuery.js');
var express = require('express');

var app = express();

app.get('/',(req,res)=>{
   sq.queryData(req.query.q,(ret)=>{
       res.send(ret);
   });
});

app.listen(3000);
console.log('Server localhost:3000 Waiting for query...')