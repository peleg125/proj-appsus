export function MailPreview({ mail }) {
  return (
    <article className='mail-preview'>
      <h2>{mail.title}</h2>
      <h4>
        Price: {`${mail.listPrice.amount} ${mail.listPrice.currencyCode}`}
      </h4>
      <h4>Published: {mail.publishedDate}</h4>
      <img src={mail.thumbnail} alt={mail.title} />
    </article>
  )
}
