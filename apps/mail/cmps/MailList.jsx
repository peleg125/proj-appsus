const { Link } = ReactRouterDOM
import { MailStar } from './MailStar.jsx'

export function MailList({
  mails,
  onDeleteClick,
  onMarkReadClick,
  onStarClick,
  onMailClick,
}) {
  return (
    <div className='mail-list'>
      <div className='mail-list-body'>
        {mails.map((mail) => (
          <div
            key={mail.id}
            className={`mail-item mail-grid ${
              mail.isRead ? 'read-mail' : 'unread-mail'
            }`}
            onClick={(event) => {
              event.stopPropagation()
              onMailClick(mail.id)
            }}
          >
            <div>
              <input type='checkbox' />
            </div>
            <button
              className='star-btn'
              onClick={(event) => {
                event.stopPropagation()
                onStarClick(mail.id)
              }}
            >
              <MailStar isFilled={mail.isStarred} />
            </button>

            <div>{mail.from}</div>

            <div className='desc-div truncate'>
              <Link to={`/mail/details/${mail.id}`}>
                {mail.subject} - {mail.body}
              </Link>
            </div>

            <div className='date-col'>
              {new Date(mail.sentAt).toLocaleString()}
            </div>

            <div className='action-icons'>
              <button
                title='Delete'
                onClick={(event) => {
                  event.stopPropagation()
                  onDeleteClick(mail.id)
                }}
              >
                <img src='assets/img/delete.svg'></img>
              </button>

              <button
                title='Mark as read'
                onClick={(event) => {
                  event.stopPropagation()
                  onMarkReadClick(mail.id)
                }}
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
