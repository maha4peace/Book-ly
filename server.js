
const express = require("express")


const app = express() ; 

//Routing
app.get("/", (req, res) => {
    res.json({ hello: "world"})
}) ; 

//Start our server
app.listen(3000) ; 