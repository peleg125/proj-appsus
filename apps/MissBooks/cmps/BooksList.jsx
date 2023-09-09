import { BookPreview } from "./BooksPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onSelectBookId, onRemoveBook }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id}>
          <div className='book-card'>
            <BookPreview book={book} />
            <button className='btn-book' onClick={() => onRemoveBook(book.id)}>
              Remove Book
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
