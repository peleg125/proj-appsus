// import {NoteTxt}
import { noteService } from "../services/note.service.js"
const { useNavigate } = ReactRouterDOM

export function NotePreview({ note }) {
  const navigate = useNavigate()
  function handleTitleChange(event) {
    const newTitle = event.target.textContent
    const updatedNote = { ...note, info: { ...note.info, title: newTitle } }
    noteService.update(updatedNote)
  }
  function handleTextChange(event) {
    const newText = event.target.textContent
    const updatedNote = { ...note, info: { ...note.info, txt: newText } }
    noteService.update(updatedNote)
  }

  function handleClick() {
    navigate(`/note/${note.id}`)
  }

  function handleBlur() {
    navigate("/note")
  }

  return (
    <div>
      <section className='txt-container'>
        <p id='title' onClick={handleClick} onBlur={handleBlur} onInput={handleTitleChange} contentEditable='true' className='note-title'>
          {note.info.title}
        </p>
        <p id='txt' onClick={handleClick} onBlur={handleBlur} onInput={handleTextChange} contentEditable='true' className='note-txt'>
          {note.info.txt}
        </p>
      </section>
    </div>
  )
}
