import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteForm({ onAddNote, isEditing, noteToEdit, onSaveEdit }) {
  const [noteToAdd, setNoteToAdd] = useState({ title: "", txt: "" })

  useEffect(() => {
    if (isEditing) {
      setNoteToAdd({ ...noteToEdit })
    }
  }, [isEditing, noteToEdit])

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

  function handleFormSubmit(ev) {
    ev.preventDefault()

    if (!isEditing) {
      const newNote = noteService.createNote(noteToAdd.title, noteToAdd.txt, "", "NoteTxt")
      onAddNote(newNote)
      setNoteToAdd({ title: "", txt: "" })
    } else {
      onSaveEdit({ ...noteToEdit, ...noteToAdd })
    }
  }

  const { title, txt } = noteToAdd

  return (
    <div>
      <form className='form-container' onSubmit={handleFormSubmit}>
        <input className='text-title' value={title} name='title' onChange={handleChange} type='text' placeholder='Title' />
        <input className='text-note' value={txt} name='txt' onChange={handleChange} type='text' placeholder='Take a note...' />
        {/* <NoteImg noteId={noteToAdd.id} /> */}
        <button className='btn-form' type='submit'>
          {isEditing ? "Save Edit" : "Add Note"}
        </button>
      </form>
    </div>
  )
}
