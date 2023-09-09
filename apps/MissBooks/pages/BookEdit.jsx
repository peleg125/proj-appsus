import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.bookId) loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBookToEdit)
      .catch((err) => console.log("err:", err))
  }

  function handleChange({ target }) {
    console.log(title)
    const field = target.name
    let value = target.value

    switch (target.type) {
      case "number":
      case "range":
        value = +value || ""
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }

    const updatedBookToEdit = { ...bookToEdit }

    setBookToEdit((prevBookToEdit) => ({ ...prevBookToEdit, [field]: value }))
    if (field === "amount" || field === "currencyCode") {
      updatedBookToEdit.listPrice = {
        ...updatedBookToEdit.listPrice,
        [field]: value,
      }
    } else {
      updatedBookToEdit[field] = value
    }

    setBookToEdit(updatedBookToEdit)
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService
      .save(bookToEdit)
      .then(() => navigate("/book"))
      .catch((err) => console.log("err:", err))
      .then(() => {
        showSuccessMsg(`Book Saved!`)
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg("Problem Removing")
      })
  }

  const {
    title,
    authors,
    listPrice: { amount, currencyCode },
  } = bookToEdit

  return (
    <section className='book-edit'>
      <form onSubmit={onSaveBook}>
        <label htmlFor='title'>Title:</label>
        <input className='input-book' required onChange={handleChange} value={title} type='text' name='title' id='title' />

        <label htmlFor='amount'>Price:</label>
        <input className='input-book' required onChange={handleChange} value={amount} min='1' max='200' type='number' name='amount' id='amount' />

        <label htmlFor='authors'>Authors:</label>
        <input className='input-book' required onChange={handleChange} value={authors} type='text' name='authors' id='authors' />

        <label htmlFor='currencyCode'>Currency:</label>
        <select onChange={handleChange} value={currencyCode} type='text' name='currencyCode' id='currencyCode'>
          <option value='EUR'>EUR</option>
          <option value='USD'>USD</option>
          <option value='ILS'>ILS</option>
        </select>

        <button className='btn-book'>Save</button>
      </form>
    </section>
  )
}
