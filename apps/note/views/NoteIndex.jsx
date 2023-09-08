const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteForm } from "../cmps/NoteForm.jsx"
import { NoteModal } from "../cmps/NoteModal.jsx"
import { storageService } from "../../../services/async-storage.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { utilService } from "../../../services/util.service.js"

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [selectedColor, setSelectedColor] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [selectedNote, setSelectedNote] = useState(null)
  const [selectedNoteType, setSelectedNoteType] = useState("NoteTxt")
  const sortedNotes = [...notes].sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1))
  useEffect(() => {
    noteService.query(filterBy).then((filteredNotes) => {
      setNotes(filteredNotes)
    })
    // const fetchedNotes = noteService.getNotes()
    // setNotes(fetchedNotes)
  }, [filterBy])

  function onTogglePin(noteId) {
    const updatedNotes = [...notes]
    const noteIndex = updatedNotes.findIndex((note) => note.id === noteId)

    if (noteIndex !== -1) {
      updatedNotes[noteIndex].isPinned = !updatedNotes[noteIndex].isPinned
      setNotes(updatedNotes)

      noteService.update(updatedNotes[noteIndex])
    }
  }

  function handleAddNote(newNote) {
    console.log("hey")
    setNotes((prevNotes) => [...prevNotes, newNote])
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function toggleNoteType() {
    setSelectedNoteType((prevNoteType) => (prevNoteType === "NoteTxt" ? "NoteTodos" : "NoteTxt"))
  }

  function onRemoveNote(noteId) {
    console.log(noteId)
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

  function onDuplicateNote(noteId) {
    const selectedNote = notes.find((note) => note.id === noteId)

    if (selectedNote) {
      const duplicatedNote = {
        ...selectedNote,
        id: utilService.makeId(),
      }

      noteService
        .save(duplicatedNote)
        .then(() => {
          noteService.query(filterBy).then((filteredNotes) => {
            setNotes(filteredNotes)
          })

          console.log("Duplicated note saved to storage:", duplicatedNote)
        })
        .catch((error) => {
          console.error("Error saving duplicated note to storage:", error)
        })
    }
  }

  // const closeModal = () => {
  //   setIsModalOpen(false)
  //   setSelectedNote(null)
  // }

  function onEditNote(note) {
    console.log(note.id, "modal is open")
    console.log(note)
    setIsModalOpen(true)
    console.log(isModalOpen)
  }

  function onChangeColor(noteId, color) {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        return {
          ...note,
          color: color,
        }
      }
      return note
    })

    setNotes(updatedNotes)
  }

  function editText() {
    noteService.get()
  }

  // function handleNoteUpdated(updatedNote) {
  //   const updatedNoteIndex = notes.findIndex((note) => note.id === updatedNote.id)

  //   if (updatedNoteIndex !== -1) {
  //     const updatedNotes = [...notes]

  //     updatedNotes[updatedNoteIndex] = updatedNote

  //     setNotes(updatedNotes)
  //   }
  // }

  function handleColorChange(note, color) {
    note.style.backgroundColor = color
    console.log(note.style.backgroundColor)
    note.color = color
    onChangeColor(note.id, color)
    storageService
      .get("noteDB", note.id)
      .then((updatedNote) => {
        updatedNote.style.backgroundColor = color
        return storageService.put("noteDB", updatedNote)
      })
      .then(() => {
        console.log("Color updated and saved to storage")
      })
      .catch((error) => {
        console.error("Error updating and saving color:", error)
      })
  }

  return (
    <div className='main-container'>
      <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <NoteForm onAddNote={(newNote) => handleAddNote(newNote, selectedNoteType)} isModalOpen={isModalOpen} />
      <div className='pinned-notes'>
        {notes.some((note) => note.isPinned) && <h4>Pinned Notes</h4>}
        <NoteList
          notes={notes.filter((note) => note.isPinned)}
          handleColorChange={handleColorChange}
          selectedColor={selectedColor}
          onChangeColor={onChangeColor}
          onRemoveNote={onRemoveNote}
          onEditNote={onEditNote}
          onDuplicateNote={onDuplicateNote}
          onTogglePin={onTogglePin}
        />
      </div>
      <div className='unpinned-notes'>
        {notes.some((note) => note.isPinned) && <h4>Other</h4>}
        <NoteList
          notes={notes.filter((note) => !note.isPinned)}
          handleColorChange={handleColorChange}
          selectedColor={selectedColor}
          onChangeColor={onChangeColor}
          onRemoveNote={onRemoveNote}
          onEditNote={onEditNote}
          onDuplicateNote={onDuplicateNote}
          onTogglePin={onTogglePin}
        />
      </div>
    </div>
  )
}
