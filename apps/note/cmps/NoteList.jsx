import { NotePreview } from "./NotePreview.jsx"
const { Link, Outlet } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote, onEditNote }) {
  return (
    <ul className='note-container'>
      {notes &&
        notes.map((note) => (
          <li className='note' key={note.id}>
            <button>
              <Link to={`/note/${note.id}`}>Edit</Link>
            </button>

            <NotePreview note={note} />
            <button className='btn-remove' onClick={() => onRemoveNote(note.id)}>
              <img className='remove-icon' src='assets/img/delete.svg'></img>
            </button>
          </li>
        ))}
      <section>
        <Outlet />
      </section>
    </ul>
  )
}
