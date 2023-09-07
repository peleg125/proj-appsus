export function MailFolderList({ onFolderChange }) {
  const { Link } = ReactRouterDOM

  function handleClick(folder) {
    onFolderChange(folder)
  }

  return (
    <div className='folder-list'>
      <Link to='/mail/inbox' onClick={() => handleClick('inbox')}>
        Inbox
      </Link>
      <Link to='/mail/sent' onClick={() => handleClick('sent')}>
        Sent
      </Link>
      <Link to='/mail/trash' onClick={() => handleClick('trash')}>
        Trash
      </Link>
      <Link to='/mail/draft' onClick={() => handleClick('draft')}>
        Drafts
      </Link>
    </div>
  )
}
