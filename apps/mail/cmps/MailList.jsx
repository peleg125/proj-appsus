const { Link } = ReactRouterDOM

// TODO: ADD CHECKBOX TO FILTER
export function MailList({ mails }) {
  const handleDeleteClick = (id) => {
    console.log(`Delete clicked for mail ID: ${id}`)
  }

  const handleMarkReadClick = (id) => {
    console.log(`Mark as read clicked for mail ID: ${id}`)
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
              <Link to={`/mail/${mail.id}`}>
                {mail.subject} - {mail.body}
              </Link>
            </div>
            <div>{new Date(mail.sentAt).toLocaleString()}</div>
            <div className='action-icons'>
              <button onClick={() => handleDeleteClick(mail.id)}>
                <img src='assets/img/delete.svg'></img>
              </button>
              <button onClick={() => handleMarkReadClick(mail.id)}>
                <img src='assets/img/markasread.svg'></img>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
