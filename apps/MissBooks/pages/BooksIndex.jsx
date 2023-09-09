import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BooksList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookPreview } from "../cmps/BooksPreview.jsx"
const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BooksIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  useEffect(() => {
    bookService.query(filterBy).then((books) => {
      setBooks(books)
    })
  }, [filterBy])

  function onRemoveBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book Removed! ${bookId}`)
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg("Problem Removing " + bookId)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  function onSelectBookId(bookId) {
    console.log(bookId)
    setSelectedBookId(bookId)
  }

  if (!books) return <div>Loading...</div>
  return (
    <section className='Books'>
      {!selectedBookId && (
        <React.Fragment>
          <div className='book-link-container'>
            <Link className='add-book' to='/book/edit'>
              Add Book
            </Link>
            <Link className='add-google-book' to='/book/add'>
              Add Google Book
            </Link>
          </div>
          <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
          <BookList books={books} onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} />
        </React.Fragment>
      )}
      {/* {selectedBookId && <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />} */}
    </section>
  )
}
