export function MailPreview({ mail }) {
  return (
    <article className='mail-preview'>
      <h2>{mail.from}</h2>
      <h4>to: {mail.to}</h4>
      <h3>subject: {mail.subject}</h3>
      <p> description - {mail.body}</p>
    </article>
  )
}
