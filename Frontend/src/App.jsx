
import { useState, useEffect } from 'react';
import Note from './components/Note'
import noteService from './services/notes'
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    noteService.getAll()
      .then(initialNotes => {
        console.log("promise fulfilled");
        setNotes(initialNotes);
      });
    console.log('render', notes.length, 'notes');
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    console.log("Submit Button clicked", event.target);
    const noteObj = {
      content: newNote,
      important: Math.random() > 0.5
    }
    noteService.create(noteObj)
      .then(returnedNote => {
        console.log(returnedNote);
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      })

  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    console.log('make important : ', id);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(changedNote, id).then((returnedNote) => {
      setNotes(notes.map((note) =>
        note.id !== id ? note : returnedNote
      ))
    })
    .catch(error =>{
      alert(`note "${note.content}" was already deleted from the server`);
      setNotes(notes.filter(n => n.id !== id));
    })

  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} placeholder='a new note...' />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default App;
