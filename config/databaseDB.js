const mongoose = require('mongoose');

function connectToDB() {
    console.log("hello")
}
mongoose.connect(process.env.DB_URL)

module.exports = connectToDB ; 
