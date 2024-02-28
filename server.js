require("dotenv").config() ; 


//importing dependencies 
const express = require("express")
const connectToDB = require("./config/databaseDB")


//create an express app 
const app = express() ; 

//connecting to database
connectToDB() ; 

//Routing
app.get("/", (req, res) => {
    res.json({ hello: "world"})
}) ; 

//Start our server
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Express app running on port ${port}`));