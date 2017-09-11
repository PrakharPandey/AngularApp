let mongoose = require('mongoose')
let Schema = mongoose.Schema


let weather = new Schema({
name: String,
country: String,
date: String,
max: String,
min: String,
img: String,
condition: String
})

module.exports = mongoose.model('Weather', weather)
