import { NotePreview } from "./NotePreview.jsx"

export function NoteList({ notes }) {
  console.log(notes)
  return (
    <ul>
      {notes &&
        notes.map((note) => (
          <li key={note.id}>
            <div className='note-container'>
              <NotePreview note={note} />
            </div>
          </li>
        ))}
    </ul>
  )
}
