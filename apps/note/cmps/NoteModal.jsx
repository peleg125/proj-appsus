const { useState } = React
import { NoteForm } from "./NoteForm.jsx"

export function NoteModal({ isOpen, onClose, note, onEdit, notes, handleAddNote }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [selectedNote, setSelectedNote] = useState(note)
  const [isEditing, setIsEditing] = useState(false)

  const openModal = (note) => {
    console.log(note.id)
    setSelectedNote(note)
    setIsModalOpen(true)
    setIsEditing(false)
  }

  const closeModal = () => {
    console.log("heyy")
    setIsModalOpen(false)
    setSelectedNote(null)
    setIsEditing(false)
    onClose()
  }

  const Modal = ({ isOpen, onClose, note, onEdit }) => {
    if (!isOpen) return null

    const handleEditClick = () => {
      onEdit(note, true)
    }

    const handleSaveClick = () => {
      onEdit(note, false)
    }

    return (
      <div className='modal-overlay'>
        <div className='modal-content'>
          <button onClick={onClose}>Close</button>
          <h2>
            {isEditing ? <input type='text' value={note.title} onChange={(ev) => onEdit({ ...note, title: ev.target.value }, false)} /> : note.title}
          </h2>
          <p>
            {isEditing ? <textarea value={note.content} onChange={(ev) => onEdit({ ...note, content: ev.target.value }, false)} /> : note.content}
          </p>
          <NoteForm onAddNote={handleAddNote} />
        </div>
      </div>
    )
  }

  return (
    <div className='App'>
      <h1>My Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => openModal(note)}>
            {note.title}
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        x
        note={selectedNote}
        onEdit={(updatedNote, isEditing) => {
          if (!isEditing) {
            console.log("Saving changes...", updatedNote)
          }
          setSelectedNote(updatedNote)
          setIsEditing(isEditing)
        }}
      />
    </div>
  )
}
