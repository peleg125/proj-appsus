import { NotePreview } from "./NotePreview.jsx"
const { Link, Outlet } = ReactRouterDOM

export function NoteList({ notes, handleColorChange, onRemoveNote, onEditNote, onDuplicateNote }) {
  return (
    <ul className='note-container'>
      {notes &&
        notes.map((note) => (
          <li className={`note ${note.style.backgroundColor}`} key={note.id}>
            <button>
              <Link to={`/note/${note.id}`}>Edit</Link>
            </button>

            <NotePreview note={note} />

            <button onClick={() => onDuplicateNote(note.id)}>Duplicate</button>
            <button className='btn-remove' onClick={() => onRemoveNote(note.id)}>
              <img title='Remove Note' className='remove-icon' src='assets/img/delete.svg' alt='Remove' />
            </button>
            <select className='custom-select' onChange={(ev) => handleColorChange(note, ev.target.value)}>
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
          </li>
        ))}
      <section>
        <Outlet />
      </section>
    </ul>
  )
}
