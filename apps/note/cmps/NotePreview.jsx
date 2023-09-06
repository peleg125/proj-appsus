export function NotePreview({ note }) {
  return (
    <section>
      {note.info.title && <p className='note-title'>{note.info.title}</p>}
      <p className='note-txt'>{note.info.txt}</p>
    </section>
  )
}
