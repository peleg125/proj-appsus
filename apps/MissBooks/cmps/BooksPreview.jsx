const { Link } = ReactRouterDOM

export function BookPreview({ book }) {
  return (
    <article>
      <img className='book-image' src={book.thumbnail} alt={book.title} />
      <h2 className='book-title'>{book.title}</h2>
      <h6>By: {book.authors}</h6>
      <span className='sale'>{book.listPrice.isOnSale ? <p>On Sale!</p> : <p></p>}</span>
      <p>
        <span className={book.listPrice.amount < 20 ? "cheap" : book.listPrice.amount > 150 ? "expensive" : "normal"}>{book.listPrice.amount}</span>{" "}
        {book.listPrice.currencyCode}
      </p>
      <Link className='read-btn' to={`/book/${book.id}`}>
        More
      </Link>
      <button className='btn-book'>
        <Link to={`/book/edit/${book.id}`}>Edit</Link>
      </button>
    </article>
  )
}
