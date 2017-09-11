let express = require('express');
let bodyParser = require('body-parser'); 
let mongoose = require('mongoose');

let weth = require('./routes/weather')

let app = express();
let cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/weather",weth);


app.listen(3000);
console.log('running')


app.get('/', (req, res) => {
  res.send("Hi")
  console.log("Working Fine")
})

module.exports = app;
