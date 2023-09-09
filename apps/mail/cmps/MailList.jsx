const { Link } = ReactRouterDOM

// TODO: ADD CHECKBOX TO FILTER
export function MailList({
  mails,
  onDeleteClick,
  onMarkReadClick,
  onStarClick,
}) {
  function handleDeleteClick(id) {
    onDeleteClick(id)
  }

  function handleMarkReadClick(id, ev) {
    ev.stopPropagation()
    onMarkReadClick(id)
  }

  function handleStarClick(id) {
    onStarClick(id)
  }

  console.log('from mailList', mails)
  return (
    <div className='mail-list'>
      <div className='mail-list-body'>
        {mails.map((mail) => (
          <div
            key={mail.id}
            className={`mail-item mail-grid ${
              mail.isRead ? 'read-mail' : 'unread-mail'
            }`}
          >
            <div>
              <input type='checkbox' />
            </div>
            <button
              className='star-btn'
              onClick={() => {
                handleStarClick(mail.id)
              }}
            >
              <img src='assets/img/star.svg'></img>
            </button>

            <div>{mail.from}</div>

            <div
              onClick={(event) => {
                handleMarkReadClick(mail.id, event)
              }}
              className='desc-div truncate'
            >
              <Link to={`/mail/details/${mail.id}`}>
                {mail.subject} - {mail.body}
              </Link>
            </div>

            <div className='date-col'>
              {new Date(mail.sentAt).toLocaleString()}
            </div>

            <div className='action-icons'>
              <button title='Delete' onClick={() => handleDeleteClick(mail.id)}>
                <img src='assets/img/delete.svg'></img>
              </button>

              <button
                title='Mark as read'
                onClick={(event) => handleMarkReadClick(mail.id, event)}
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
