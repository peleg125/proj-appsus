export function MailFolderList({ onFolderChange }) {
  const { Link } = ReactRouterDOM

  function handleClick(folder) {
    onFolderChange(folder)
  }

  return (
    <div className='folder-list'>
      <Link title='Inbox' to='/mail/inbox' onClick={() => handleClick('inbox')}>
        Inbox
      </Link>
      <Link title='Sent' to='/mail/sent' onClick={() => handleClick('sent')}>
        Sent
      </Link>
      <Link
        title='Starred'
        to='/mail/starred'
        onClick={() => handleClick('starred')}
      >
        Starred
      </Link>
      <Link title='Trash' to='/mail/trash' onClick={() => handleClick('trash')}>
        Trash
      </Link>
      <Link title='Draft' to='/mail/draft' onClick={() => handleClick('draft')}>
        Drafts
      </Link>
    </div>
  )
}
