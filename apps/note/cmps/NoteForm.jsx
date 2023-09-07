import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteForm({ onAddNote, isEditing, isModalOpen, onEdit }) {
  const [noteToAdd, setNoteToAdd] = useState({ title: "", txt: "" })

  useEffect(() => {
    if (isEditing) {
      setNoteToAdd()
    }
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

  function addNote(ev) {
    ev.preventDefault()
    console.log("modal", isModalOpen)
    console.log("isedit", isEditing)
    if (!isModalOpen) {
      const newNote = noteService.createNote(noteToAdd.title, noteToAdd.txt)
      onAddNote(newNote)
      setNoteToAdd(noteService.getEmptyNote())
    } else {
      console.log("editing is true")
      editNote()
    }
  }

  function editNote() {
    selectedNote.id
  }

  const { title, txt } = noteToAdd

  return (
    <div>
      <form className='form-container'>
        <input className='text-title' value={title} name='title' onChange={handleChange} type='text' placeholder='Title' />
        <input className='text-note' value={txt} name='txt' onChange={handleChange} type='text' placeholder='Take a note...' />
        <button onClick={addNote}>Close</button>
      </form>
    </div>
  )
}
