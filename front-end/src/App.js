import { useState, useEffect } from "react";
import axios from 'axios' ; 

function App() {
const [notes, setNotes] = useState(null) ;
const [createForm, setCreateForm] = useState({
  title: "",
  body: ""
})

useEffect(() => {
  fetchNotes() ;
}, []) ; 

const fetchNotes = async () => {
  //Fetch the notes
  try {
    const res = await axios.get('http://localhost:3001/notes')
    setNotes(res.data.notes)
  } catch (error) {
    console.log(error)
  }
  //Set to state
 
}

const updateCreateFormField = (event) => {
  const {name, value} = event.target ; 
  setCreateForm({
    ...createForm, 
    [name]: value, 
  }); 
}

console.log(createForm.title, createForm.body)

const createNote = async (event) => {
   event.preventDefault(); 
   //create the note
   try {
      const res = await axios.post("http://localhost:3001/notes", createForm) ;
   
   //Update the state
   setNotes([...notes, res.data.note]);
  
   //clear form state
   setCreateForm({ title: "", body: ""})
   } catch(error) {
    console.error("Error creating note:", error)
   }
};

const deleteNote = async (_id) => {
  //delete the note
  const res = await axios.delete(`http://localhost:3001/notes/${_id}`)
  console.log(res) ; 
  //update the state
  const newNotes = [...notes].filter((note) => {
    return note._id !== _id ; 
  })
  setNotes(newNotes) ; 
}

  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
         {notes &&
          notes.map((note) => {
            
            return (
              <div key = {note._id}>
                <h3> {note.title} </h3>
                <p>{note.body}</p>
                <button onClick={ () => deleteNote(note._id)}>
                  Delete Note
                </button>
              </div>
            ) ; 
          })}

      </div>
      <div>
        <h2> Create Note</h2>
        <form onSubmit={createNote}>
          <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
          <textarea onChange={updateCreateFormField} value={createForm.body} name="body" />
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>

  
  );
}

export default App;
