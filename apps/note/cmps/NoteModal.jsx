const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteForm } from "./NoteForm.jsx"

export function NoteModal({ isOpen, onClose }) {
  const params = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [selectedNote, setSelectedNote] = useState(null)
  const [editedTitle, setEditedTitle] = useState("")
  const [editedText, setEditedText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(isOpen)
  const [editedNote, setEditedNote] = useState(null)

  useEffect(() => {
    if (params.noteId) {
      noteService.get(params.noteId).then((selectedNote) => {
        setSelectedNote(selectedNote)
        setEditedTitle(selectedNote.info.title || "")
        setEditedText(selectedNote.info.txt || "")
        setIsEditing(true)
        setIsModalOpen(true)

        setEditedNote(selectedNote)
      })
    }
  }, [params.noteId])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    const updatedEditedNote = { ...editedNote }
    updatedEditedNote.info[field] = value

    setEditedNote(updatedEditedNote)

    if (field === "title") {
      setEditedTitle(value)
    } else if (field === "txt") {
      setEditedText(value)
    }
  }

  function handleEditNote(ev) {
    ev.preventDefault()
    noteService.save(editedNote).then(() => {
      setIsModalOpen(false)
      onClose && onClose()
      closeModal()
    })
    onNoteUpdated(editedNote)
  }

  function closeModal() {
    setIsModalOpen(false)
    setSelectedNote(null)
    setIsEditing(false)
    onClose && onClose()
    navigate("/note")
  }

  return (
    <div className={`modal-overlay ${isModalOpen ? "show" : ""}`}>
      <div className='modal-content'>
        <form className='edit-container'>
          <textarea
            className='textarea-edit textarea-edit-title'
            onChange={handleChange}
            name='title'
            type='text'
            value={editedTitle}
            id='edited-title'
          />
          <textarea className='textarea-edit textarea-edit-text' onChange={handleChange} name='txt' type='text' value={editedText} id='edited-text' />
          <button onClick={handleEditNote}>Close</button>
        </form>
      </div>
    </div>
  )
}
