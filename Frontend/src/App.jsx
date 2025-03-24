import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';

const App = () => {
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
    };
    noteService.create(noteObj).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    console.log('make important : ', id);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(changedNote, id)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(error => {
        alert(`Note "${note.content}" was already deleted from the server`);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Notes</h1>
      <button 
        onClick={() => setShowAll(!showAll)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Show {showAll ? "important" : "all"}
      </button>
      <ul className="w-full max-w-md space-y-3">
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <form onSubmit={addNote} className="mt-4 w-full max-w-md flex">
        <input 
          value={newNote} 
          onChange={handleNoteChange} 
          placeholder='A new note...' 
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <button 
          type="submit" 
          className="px-4 py-2 bg-green-500 text-white rounded-r-lg shadow-md hover:bg-green-600">
          Save
        </button>
      </form>
    </div>
  );
};

export default App;
