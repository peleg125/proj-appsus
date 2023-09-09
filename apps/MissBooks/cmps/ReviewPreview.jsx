export function ReviewPreview({ review, onRemoveReview }) {
  const { id, fullName, rating, readAt } = review
  return (
    <section className='review-preview'>
      <li>Fullname: {fullName}</li>
      <li>Rating: {rating}</li>
      <li>Read At: {readAt}</li>
      <button className='btn-book' onClick={() => onRemoveReview(id)}>
        Delete
      </button>
    </section>
  )
}
