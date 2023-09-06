const { useEffect, useState } = React
import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteForm } from "../cmps/NoteForm.jsx"
import { NoteModal } from "../cmps/NoteModal.jsx"

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNote, setSelectedNote] = useState(null)
  useEffect(() => {
    const fetchedNotes = noteService.getNotes()
    setNotes(fetchedNotes)
  }, [])

  function handleAddNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote])
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
        showSuccessMsg("Note Removed!")
      })
      .catch((err) => {
        console.log("hey")
      })
  }

  function onEditNote(note) {
    setSelectedNote(note)
    setIsModalOpen(true)
  }

  return (
    <div className='main-container'>
      <NoteForm onAddNote={handleAddNote} />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />

      {isModalOpen && (
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          note={selectedNote}
          onEdit={(note, edit) => {
            if (edit) {
              console.log("Saving changes...")
            }
          }}
          notes={notes}
          handleAddNote={handleAddNote}
        />
      )}
    </div>
  )
}
