const { Link } = ReactRouterDOM

// TODO: ADD CHECKBOX TO FILTER
export function MailList({ mails }) {
  return (
    <div className='mail-list'>
      <div className='mail-list-body'>
        {mails.map((mail) => (
          <div key={mail.id} className='mail-item mail-grid'>
            <div>
              <input type='checkbox' />
            </div>
            <div>★</div>
            <div>{mail.from}</div>
            <div className='desc-div truncate'>
              <Link to={`/mail/${mail.id}`}>
                {mail.subject} - {mail.body}
              </Link>
            </div>
            <div>{new Date(mail.sentAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
