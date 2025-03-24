import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notification';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notificationMsg, setNotificationMsg] = useState('')
  const [notificationType, setNotificationType] = useState('')

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
      important: false
    };
    noteService.create(noteObj).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
      console.log("New Note Added")
      setNotificationMsg("Note added successfully!")
      setNotificationType("success")
      setTimeout(() => {
        setNotificationMsg('');
        setNotificationType('')
      }, 5000);
    })
      .catch(error => {
        setNotificationMsg(error.response.data.error)
        setNotificationType("error")
        setNewNote("")
        setTimeout(() => {
          setNotificationMsg('');
          setNotificationType('')
        }, 5000);
      })

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

  const deleteNote = (id) => {
    if (window.confirm("Delete note ?")) {
      noteService.remove(id).then(result => {
        console.log("Note deleted successfully!")
        setNotes(notes.filter(note => note.id !== id))
        setNotificationMsg("Note deleted successfully!")
        setNotificationType("success")
        setTimeout(() => {
          setNotificationMsg('');
          setNotificationType('')
        }, 5000);
      })
        .catch(error => {
          console.log(error)
          setNotificationMsg(error.response.data.error)
          setNotificationType("error")
          setNewNote("")
          setTimeout(() => {
            setNotificationMsg('');
            setNotificationType('')
          }, 5000);
        })
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Fixed header section */}
      <div className="sticky top-0 bg-gray-100 p-6 z-10 w-full flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Notes</h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Show {showAll ? "important" : "all"}
        </button>

        <form onSubmit={addNote} className="mt-4 mb-8 w-full max-w-md flex">
          <input
            value={newNote}
            onChange={handleNoteChange}
            placeholder='A new note...'
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-r-lg shadow-md hover:bg-green-600">
            Save
          </button>
        </form>
        <div className='w-full max-w-md'>
          <Notification msg={notificationMsg} type={notificationType} />
        </div>
      </div>



      {/* Scrollable content section */}
      <div className="flex-1 overflow-y-auto p-6 pt-0 flex justify-center">
        <ul className="w-full max-w-xl space-y-3">
          {notesToShow.map((note) => (
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} deleteNote={() => deleteNote(note.id)} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
