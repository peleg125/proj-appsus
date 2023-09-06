import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

  useEffect(() => {
    const fetchedNotes = noteService.getNotes()
    setNotes(fetchedNotes)
  }, [])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case "number":
      case "range":
        value = +value || ""
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }
    setNoteToAdd({ ...noteToAdd, [field]: value })
  }

  function addNote() {
    const newNote = noteService.createNote({ title: noteToAdd.title, txt: noteToAdd.txt })
    setNotes((prevNotes) => [...prevNotes, newNote])
  }

  const { title, txt } = noteToAdd
  return (
    <div>
      <form className='form-container'>
        <input className='text-title' value={title} onChange={handleChange} type='text' placeholder='Title' />
        <input className='text-note' value={txt} onChange={handleChange} type='text' placeholder='Take a note...' />
        <button onClick={addNote}>Close</button>
      </form>
      <div>{notes && <NoteList notes={notes} />}</div>
    </div>
  )
}
