export function MailFolderList() {
  const { Link } = ReactRouterDOM
  return (
    <div className='folder-list'>
      <Link to='/mail/inbox'>Inbox</Link>
      <Link to='/mail/sent'>Sent</Link>
      <Link to='/mail/trash'>Trash</Link>
      <Link to='/mail/draft'>Drafts</Link>
    </div>
  )
}
