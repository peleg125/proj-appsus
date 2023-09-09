import { NoteImg } from "./NoteImg.jsx"
import { NotePreview } from "./NotePreview.jsx"
import { noteService } from "../services/note.service.js"
const { Link, Outlet } = ReactRouterDOM
const { useState } = React

export function NoteList({ notes, handleColorChange, onRemoveNote, onTogglePin, onDuplicateNote }) {
  const [selectedImages, setSelectedImages] = useState({})

  const handleImageChange = (noteId, image) => {
    setSelectedImages((prevImages) => ({
      ...prevImages,
      [noteId]: image,
    }))

    noteService.update(noteId)
  }
  return (
    <ul className='note-container'>
      {notes &&
        notes.map((note) => (
          <li className={`note ${note.style.backgroundColor}`} key={note.id}>
            <NotePreview note={note} />
            <NoteImg noteId={note.id} onImageChange={(image) => handleImageChange(note.id, image)} selectedImage={selectedImages[note.id]} />
            <div className='btn-note-container'>
              <button className='btn-note btn-pin' onClick={() => onTogglePin(note.id)}>
                <img title='Pin note' className='pin-icon' src='assets/img/pin.svg'></img>
              </button>
              <button className='btn-note btn-duplicate' onClick={() => onDuplicateNote(note.id)}>
                <img title='Duplicate note' className='duplicate-icon' src='assets/img/clone-regular.svg'></img>
              </button>
              <button className='btn-note btn-remove' onClick={() => onRemoveNote(note.id)}>
                <img title='Remove note' className='remove-icon' src='assets/img/delete.svg' alt='Remove' />
              </button>
              <select title='Change background' className='custom-select' onChange={(ev) => handleColorChange(note, ev.target.value)}>
                <option value=''>Default</option>
                <option value='coral'>Coral</option>
                <option value='sand'>Sand</option>
                <option value='peach'>Peach</option>
                <option value='spring'>Spring</option>
                <option value='sea'>Sea</option>
                <option value='storm'>Storm</option>
                <option value='fog'>Fog</option>
                <option value='blossom'>Blossom</option>
                <option value='dusk'>Dusk</option>
                <option value='turquoise'>Turquoise</option>
              </select>
            </div>
          </li>
        ))}
      <section>
        <Outlet />
      </section>
    </ul>
  )
}
