const { useState } = React
import { noteService } from "../services/note.service.js"
export function NoteImg({ onImageChange, noteId, selectedImage }) {
  const [imageUrl, setImageUrl] = useState(selectedImage)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const newImageUrl = e.target.result

        setImageUrl(newImageUrl)

        if (typeof onImageChange === "function") {
          onImageChange(noteId, newImageUrl)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <label title='Upload image' className='file-label' htmlFor={`file-input-${noteId}`}>
        <img className='file-icon' src='assets/img/upload.svg' alt='Upload' />
      </label>
      <input id={`file-input-${noteId}`} className='file-input' type='file' accept='image/*' onChange={handleImageChange} />
      {imageUrl && <img src={imageUrl} alt='Selected' />}
    </div>
  )
}
