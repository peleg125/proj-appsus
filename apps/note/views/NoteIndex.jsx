const { useEffect, useState } = React

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteForm } from "../cmps/NoteForm.jsx"
import { storageService } from "../../../services/async-storage.service.js"
import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { utilService } from "../../../services/util.service.js"

export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [selectedColor, setSelectedColor] = useState("")
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const [selectedNoteType, setSelectedNoteType] = useState("NoteTxt")
  const [selectedTextNote, setSelectedTextNote] = useState(null)
  const [selectedTodosNote, setSelectedTodosNote] = useState(null)
  useEffect(() => {
    noteService.query(filterBy).then((filteredNotes) => {
      setNotes(filteredNotes)
    })
    // const fetchedNotes = noteService.getNotes()
    // setNotes(fetchedNotes)
  }, [filterBy])

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote])
  }

  const handleNoteTypeChange = (noteType) => {
    setSelectedNoteType(noteType)
  }

  const handleTextNoteSelect = () => {
    setSelectedNoteType("NoteTxt")
    setSelectedTextNote({ title: "", txt: "" })
    setSelectedTodosNote(null)
  }

  const handleTodosNoteSelect = () => {
    setSelectedNoteType("NoteTodos")
    setSelectedTextNote(null)
    setSelectedTodosNote({
      info: {
        title: "",
        todos: [],
      },
    })
  }

  function onTogglePin(noteId) {
    const updatedNotes = [...notes]
    const noteIndex = updatedNotes.findIndex((note) => note.id === noteId)

    if (noteIndex !== -1) {
      updatedNotes[noteIndex].isPinned = !updatedNotes[noteIndex].isPinned
      setNotes(updatedNotes)

      noteService.update(updatedNotes[noteIndex])
    }
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onToggleNoteType() {
    setSelectedNoteType((prevNoteType) => (prevNoteType === "NoteTxt" ? "NoteTodos" : "NoteTxt"))
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))

        showSuccessMsg("Note Removed!")
      })
      .catch((err) => {})
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

  function onEditNote(note) {
    setIsModalOpen(true)
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

  function handleColorChange(note, color) {
    if (note.style && typeof note.style.backgroundColor !== "undefined") {
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
  }

  return (
    <div className='main-container'>
      {/* <NoteCanvas onAddNote={handleAddNote} /> */}
      <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      {/* <NoteTodos /> */}
      {/* <button onClick={handleTextNoteSelect}>Add Text Note</button> */}
      {/* <button onClick={handleTodosNoteSelect}>Add Todos Note</button> */}
      {selectedNoteType === "NoteTxt" && <NoteForm onAddNote={handleAddNote} note={selectedTextNote} />}
      {/* {selectedNoteType === "NoteTodos" && <NoteTodos onAddNote={handleAddNote} note={selectedTodosNote} />} */}
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
