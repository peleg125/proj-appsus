import { NotePreview } from "./NotePreview.jsx"
const { Link, Outlet } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onEditNote }) {
  return (
    <ul>
      {notes &&
        notes.map((note) => (
          <li className='note-container' key={note.id}>
            <button>
              <Link to={`/note/${note.id}`}>Edit</Link>
            </button>
            <button className='btn-remove' onClick={() => onRemoveNote(note.id)}>
              Remove
            </button>

            <NotePreview note={note} />
          </li>
        ))}
      <section>
        <Outlet />
      </section>
    </ul>
  )
}
