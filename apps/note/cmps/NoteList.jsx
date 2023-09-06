import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes, onRemoveNote, onEditNote }) {
  return (
    <ul>
      {notes &&
        notes.map((note) => (
          <li onClick={() => onEditNote(note)} className='note-container' key={note.id}>
            <NotePreview note={note} />
            <button className='btn-remove' onClick={() => onRemoveNote(note.id)}>
              Remove
            </button>
          </li>
        ))}
    </ul>
  )
}
