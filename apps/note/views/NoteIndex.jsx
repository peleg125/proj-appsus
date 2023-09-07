const { useEffect, useState } = React
const { Link } = ReactRouterDOM

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
    console.log("hey")
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

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedNote(null)
  }

  function onEditNote(note) {
    console.log(note.id, "modal is open")
    // setSelectedNote(note)
    console.log(note)
    setIsModalOpen(true)
    console.log(isModalOpen)
  }

  function handleNoteUpdated(updatedNote) {
    // Find the index of the updated note in the notes array
    const updatedNoteIndex = notes.findIndex((note) => note.id === updatedNote.id)

    if (updatedNoteIndex !== -1) {
      // Create a copy of the current notes array
      const updatedNotes = [...notes]

      // Replace the old note with the updated note
      updatedNotes[updatedNoteIndex] = updatedNote

      // Update the notes state with the updated array
      setNotes(updatedNotes)
    }
  }

  return (
    <div className='main-container'>
      <NoteForm isModalOpen={isModalOpen} onAddNote={handleAddNote} />
      <NoteList notes={notes} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
    </div>
  )
}
