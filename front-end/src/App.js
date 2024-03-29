import { useState, useEffect } from "react";
import axios from 'axios' ; 
import "./App.css"

function App() {
const [notes, setNotes] = useState(null) ;
const [createForm, setCreateForm] = useState({
  title: "",
  body: ""
})
const [updateForm, setUpdateForm] = useState({
  _id: null,
  title: "",
  body: "",

}) ;

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

const handleUpdateFieldChange = async (event) => {
  const {value, name} = event.target
  setUpdateForm({
    ...updateForm,
    [name]: value, 
  })
}

const toggleUpdate = (note) => {
  //set state on updateForm 
  setUpdateForm({title:note.title, body:note.body, _id: note._id })
}

const updateNote = async (e) => {
  e.preventDefault() ; 
  const {title, body} = updateForm; 
   //send the update
  const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {title, body})
console.log(res)
   //clear the state
 
 //Update the state

}

  return (
    <div className="App">
      <div className="notes">
        <h2>Notes</h2>
         {notes &&
          notes.map((note) => {
            
            return (
              <div key = {note._id}>
                <h3> {note.title} </h3>
                <p>{note.body}</p>
                <button onClick={ () => deleteNote(note._id)}>
                  Delete Note
                </button>
                <button onClick={ () => toggleUpdate(note)} >Update Note</button> 
            
              </div>
            ) ; 
          })}

      </div>
      { updateForm._id && (<div>
        <h2> Update Note</h2>
        <form onSubmit={updateNote}>
            <input style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }} onChange={handleUpdateFieldChange} value={updateForm.title} name="title" />
            <textarea style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center' }} onChange={handleUpdateFieldChange} value={updateForm.body} name="body"/>
            <button type="submit">Update Note</button> 
        </form>
      </div>)}
      { !updateForm._id && (<div>
        
        <form onSubmit={createNote} style={{ display: 'flex', marginBottom: '10px', justifyContent:'center', flexDirection: "column", alignItems: "center", color: "blue"}}>
          <input  onChange={updateCreateFormField} value={createForm.title} name="title"/>
          <textarea  onChange={updateCreateFormField} value={createForm.body} name="body" />
          <button type="submit">Create Note</button>
        </form>
      </div>)}
    </div>

  
  );
}

export default App;
