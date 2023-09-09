import { addBookService } from "../services/add.book.service.js"
import { utilService } from "../services/util.service.js"
import { bookService } from "../services/book.service.js"

const API_URL = "https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%2520javascript"

const { useState, useEffect } = React

export function BookAdd() {
  const [searchTerm, setSearchTerm] = useState("")
  const [titles, setTitles] = useState([])
  const [data, setData] = useState(null)
  const [bookData, setBookData] = useState(null)
  const [addedBookTitles, setAddedBookTitles] = useState([])

  const debouncedSearch = utilService.debounce(searchGoogleBooks)

  useEffect(() => {
    addBookService.getData((data) => {
      setBookData(data)
    })
  }, [])

  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm])

  function searchGoogleBooks(query) {
    const url = `${API_URL}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const bookTitles = data.items
          .filter((item) => item.volumeInfo.title.toLowerCase().startsWith(query.toLowerCase()))
          .map((item) => item.volumeInfo.title)
        setTitles(bookTitles)
        setData(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }

  //   function onAddReview(reviewToAdd) {
  //     console.log("review to add", reviewToAdd)
  //     bookService
  //       .addReview(bookId, reviewToAdd)
  //       .then((updatedBook) => {
  //         setBook(updatedBook)
  //         setIsReview(false)
  //         showSuccessMsg("Review saved successfully")
  //       })
  //       .catch((err) => {
  //         console.log("err:", err)
  //         showErrorMsg("Error saving review")
  //       })
  //   }

  const handleAddBook = (title) => {
    const googleBook = data.items.find((item) => item.volumeInfo.title.toLowerCase() === title.toLowerCase())
    if (googleBook && !addedBookTitles.includes(title)) {
      bookService.addGoogleBook(googleBook)
      setAddedBookTitles([...addedBookTitles, title])
    }
  }

  return (
    <div>
      <h2>Book Search:</h2>
      <input className='input-book' type='text' placeholder='Search for books' value={searchTerm} onChange={(ev) => setSearchTerm(ev.target.value)} />
      {searchTerm && (
        <ul className='title-list'>
          {titles.map((title, index) => (
            <div key={index++}>
              <li>{title}</li>
              <button className='btn-book' onClick={() => handleAddBook(title)}>
                +
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  )
}
