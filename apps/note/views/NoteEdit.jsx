const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
import { noteService } from "../services/note.service.js"

export function NoteEdit() {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.noteId) loadNote()
  }, [])

  function loadNote() {
    noteService
      .get(params.noteId)
      .then(setNoteToEdit)
      .catch((err) => console.log("err:", err))
  }

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

    const updatedNoteToEdit = { ...noteToEdit }
    setNoteToEdit((prevNoteToEdit) => ({ ...prevNoteToEdit, [field]: value }))
    if (field === "title" || field === "txt") {
      updatedNoteToEdit.info = {
        ...updatedNoteToEdit.info,
        [field]: value,
      }
    } else {
      updatedNoteToEdit[field] = value
    }
    setNoteToEdit(updatedNoteToEdit)
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    noteService
      .update(noteToEdit)
      .then(() => navigate("/note"))
      .catch((err) => console.log("err", err))
  }

  const {
    info: { title, txt },
  } = noteToEdit

  return (
    <form onSubmit={onSaveNote} className='edit-container'>
      <textarea
        placeholder='Title'
        className='textarea-edit textarea-edit-title'
        onChange={handleChange}
        name='title'
        type='text'
        value={title}
        id='edited-title'
      />
      <textarea
        placeholder='Note'
        className='textarea-edit textarea-edit-text'
        onChange={handleChange}
        name='txt'
        type='text'
        value={txt}
        id='edited-text'
      />
      <button>Close</button>
    </form>
  )
}
