import { bookService } from "../services/book.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"
import { ReviewList } from "../cmps/ReviewList.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isReview, setIsReview] = useState(false)
  const { bookId } = useParams()
  const params = useParams()
  const navigate = useNavigate()
  let currYear = new Date().getFullYear()

  useEffect(() => {
    loadBooks()
  }, [])

  useEffect(() => {
    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => {
        console.log("err:", err)
        navigate("/book")
      })
  }, [bookId])

  function loadBooks() {
    console.log("Hey")
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        console.log("err:", err)
        navigate("/book")
      })
  }

  function onAddReview(reviewToAdd) {
    console.log("review to add", reviewToAdd)
    bookService
      .addReview(bookId, reviewToAdd)
      .then((updatedBook) => {
        setBook(updatedBook)
        setIsReview(false)
        showSuccessMsg("Review saved successfully")
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg("Error saving review")
      })
  }

  function onRemoveReview(reviewId) {
    bookService
      .deleteReview(bookId, reviewId)
      .then((savedBook) => {
        setBook(savedBook)
        showSuccessMsg("Review deleted successfully")
      })
      .catch((err) => {
        console.log("err:", err)
        showErrorMsg("Error deleting review")
        navigate("/book")
      })
  }

  function onBack() {
    navigate("/book")
  }

  if (!book) return <div>Loading...</div>
  return (
    <section>
      <h1>{book.title}</h1>
      <h5>By: {book.authors}</h5>
      <h5>Published: {book.publishedDate}</h5>
      <h5>Genres: {book.categories.join(",")}</h5>
      {book.pageCount > 500 ? <p>Serious Reading</p> : book.pageCount > 200 ? <p>Decent Reading</p> : <p>Light Reading</p>}
      {currYear - book.publishedDate >= 10 ? <p>Vintage</p> : <p>New</p>}
      <span className='sale'>{book.listPrice.isOnSale ? <p>On Sale!</p> : <p></p>}</span>
      <h6>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </h6>
      <h6>Pages: {book.pageCount}</h6>
      <div>
        Description: <LongTxt txt={book.description} />
      </div>

      <section className='reviews'>
        <h3>Reviews</h3>
        {(book.reviews && book.reviews.length && <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />) || "No Reviews"}
      </section>
      <img className='book-image' src={book.thumbnail} alt='' />
      <button className='btn-book' onClick={onBack}>
        Back
      </button>
      {<AddReview onAddReview={onAddReview} />}
      <div>
        <Link to={`/book/${book.prevBookId}`}>Previous Book</Link>| <Link to={`/book/${book.nextBookId}`}>Next Book</Link>
      </div>
    </section>
  )
}
