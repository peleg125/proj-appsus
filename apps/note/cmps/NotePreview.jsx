// import {NoteTxt}

export function NotePreview({ note }) {
  return (
    <section className='txt-container'>
      {note.info.title && (
        <p id='title' contentEditable='true' className='note-title'>
          {note.info.title}
        </p>
      )}
      <p id='txt' contentEditable='true' className='note-txt'>
        {note.info.txt}
      </p>
    </section>
  )
}

function DynamicCmp({ note }) {
  switch (note.type) {
    case "TextBox":
      return <NoteTxt {...props} />
    case "SelectBox":
      return <NoteImg {...props} />
  }
}
