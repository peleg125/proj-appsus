const { Link } = ReactRouterDOM

// TODO: ADD CHECKBOX TO FILTER
export function MailList({ mails, onDeleteClick, onMarkReadClick }) {
  const handleDeleteClick = (id) => {
    onDeleteClick(id)
  }

  const handleMarkReadClick = (id) => {
    onMarkReadClick(id)
  }
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
              <Link to={`/mail/details/${mail.id}`}>
                {mail.subject} - {mail.body}
              </Link>
            </div>
            <div>{new Date(mail.sentAt).toLocaleString()}</div>
            <div className='action-icons'>
              <button title='Delete' onClick={() => handleDeleteClick(mail.id)}>
                <img src='assets/img/delete.svg'></img>
              </button>
              <button
                title='Mark as read'
                onClick={() => handleMarkReadClick(mail.id)}
              >
                <img src='assets/img/markasread.svg' alt='Mark As Read'></img>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
