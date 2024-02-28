const Note = require("../models/note")

//fetching all notes
const fetchNotes =  async (req, res) => {
    //find the note
    const notes = await Note.find() ;
    //respond with them
    res.json({notes: notes}) ; 

} ; 

//fetching single notes
const fetchNote = async (req, res) => {
    //get ID off the URL
    const noteId = req.params.id ;
    //find the note using ID
    const note = await Note.findById(noteId)
    //respond with the note
    res.json({note: note})
}

//create note
const createNote = async (req, res) => {
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

}

//update note
const updateNote = async (req, res) => {
    //Get the ID off the url
    const noteId = req.params.id
    //Get the data off the req body
    const title = req.body.title
    const body = req.body.body
    //Find and update the record
     await Note.findByIdAndUpdate(noteId, {
        title: title, 
        body: body,
    }) ;
    //Find updated note
    const note = await Note.findById(noteId)

    //Respond with record 
    res.json({note: note})
}

//delete note 
const deleteNote = async (req, res) => {
    //get ID off url
    const noteId = req.params.id ;
    //delete the record
    await Note.findById(noteId)
    await Note.deleteOne()
    //respond
    res.json({ success: "record deleted" })
}

module.exports = {
    fetchNotes,
    fetchNote,
    createNote,
    updateNote,
    deleteNote
}