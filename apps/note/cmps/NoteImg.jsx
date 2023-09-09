const { useState } = React
import { noteService } from "../services/note.service.js"
export function NoteImg({ onImageChange, noteId }) {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      console.log(noteId)
      setSelectedImage(file)
      onImageChange()

      const imageUrl = URL.createObjectURL(file)
      noteService.update(noteId, imageUrl)
    }
  }

  return (
    <div>
      <label title='Upload image' className='file-label' htmlFor='file-input'>
        <img className='file-icon' src='assets/img/upload.svg'></img>
      </label>
      <input id='file-input' className='file-input' type='file' accept='image/*' onChange={handleImageChange} />
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt='Selected' />}
    </div>
  )
}
