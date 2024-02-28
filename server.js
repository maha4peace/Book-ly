require("dotenv").config() ; 


//importing dependencies 
const express = require("express")
require("./config/databaseDB")
const notesController = require("./controllers/notesController")

//create an express app 
const app = express() ; 

//configure express app to read json
app.use(express.json()) ; 

//Routing

//fetch all notes 
app.get('/notes', notesController.fetchNotes )

//fetching single note 
app.get('/notes/:id', notesController.fetchNote )

//Creating a note 
app.post('/notes', notesController.createNote )

//Update note
app.put('/notes/:id', notesController.updateNote )

//Delete note
app.delete('/notes/:id', notesController.deleteNote )

//Start our server
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Express app running on port ${port}`));