export function MailFolderList() {
  // { onFolderChange }
  const { Link } = ReactRouterDOM

  // function handleClick(folder) {
  //   onFolderChange(folder)
  // }

  return (
    <div className='folder-list'>
      <Link title='Inbox' to='/mail/inbox'>
        Inbox
      </Link>
      <Link title='Sent' to='/mail/sent'>
        Sent
      </Link>
      <Link title='Starred' to='/mail/starred'>
        Starred
      </Link>
      <Link title='Trash' to='/mail/trash'>
        Trash
      </Link>
      <Link title='Draft' to='/mail/draft'>
        Drafts
      </Link>
    </div>
  )
}
// onClick={() => handleClick('inbox')}
// onClick={() => handleClick('sent')}
// onClick={() => handleClick('starred')}
// onClick={() => handleClick('trash')}
// onClick={() => handleClick('draft')}
