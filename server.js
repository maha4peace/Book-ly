require("dotenv").config() ; 


//importing dependencies 
const express = require("express")
require("./config/databaseDB")
const Note = require('./models/note')


//create an express app 
const app = express() ; 

//configure express app to read json
app.use(express.json()) ; 

//Routing
app.get("/", (req, res) => {
    res.json({ hello: "world"})
}) ; 

app.post('/notes', async (req, res) => {
    //Get the sent in data off request body
    const title = req.body.title; 
    const body = req.body.body;

    //Create a note with it
    const note = await Note.create({
       title: title,
       body: body, 
    })

    //respond with the new note 
    res.json({note:note})

})

//Start our server
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Express app running on port ${port}`));