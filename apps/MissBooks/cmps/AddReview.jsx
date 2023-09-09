import { bookService } from '../services/book.service.js'
const { useState } = React
const { useParams } = ReactRouterDOM

export function AddReview({ onAddReview }) {
  const [bookToReview, setBookToReview] = useState(bookService.getEmptyReview())

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setBookToReview((prevBookToReview) => ({
      ...prevBookToReview,
      [field]: value,
    }))
  }

  function onSaveReview(ev) {
    ev.preventDefault()
    onAddReview(bookToReview)
  }

  const { fullName, readAt, rating } = bookToReview
  return (
    <section className='review-container'>
      <form onSubmit={onSaveReview}>
        <label htmlFor='fullName'>Full Name:</label>
        <input
          className='input-book'
          required
          onChange={handleChange}
          value={fullName}
          type='text'
          name='fullName'
          id='fullName'
        />

        <label htmlFor='rating'>Rating:</label>
        <select
          required
          onChange={handleChange}
          value={rating}
          type='number'
          name='rating'
          id='rating'
        >
          <option value=''></option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>

        <label htmlFor='readAt'>Read At:</label>
        <input
          className='input-book'
          required
          onChange={handleChange}
          value={readAt}
          type='date'
          name='readAt'
          id='readAt'
        />

        <button className='btn-book'>Submit</button>
      </form>
    </section>
  )
}
