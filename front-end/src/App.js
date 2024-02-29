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
    const res = await axios.get('http://localhost:3000/notes')
    setNotes(res.data.notes)
  } catch (error) {
    console.log(error)
  }
  //Set to state
 
}

const updateCreateFormField = (event) => {
  const {name, value} = event.target ; 
  setCreateForm({
    ...setCreateForm,
    [name]: value, 
  });
  console.log({name, value}) ; 
}

const createNote = (event) => {
   event.preventDefault(); 
   console.log("submit")
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
