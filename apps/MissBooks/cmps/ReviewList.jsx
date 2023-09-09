import { ReviewPreview } from "./ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id}>
          <ReviewPreview review={review} onRemoveReview={onRemoveReview} />
        </li>
      ))}
    </ul>
  )
}
