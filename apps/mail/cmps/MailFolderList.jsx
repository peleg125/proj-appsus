export function MailFolderList({ unreadCount }) {
  const { Link, useLocation } = ReactRouterDOM

  const location = useLocation()
  const currentPath = location.pathname

  function isActive(path) {
    return currentPath.includes(path) ? 'active-folder' : ''
  }

  return (
    <div className='folder-list'>
      <div title='Inbox' className={`folder-div ${isActive('/inbox')}`}>
        <Link className='space-between' to='/mail/inbox'>
          Inbox {unreadCount > 0 && <span>({unreadCount})</span>}
        </Link>
      </div>

      <div title='Sent' className={`folder-div ${isActive('/sent')}`}>
        <Link to='/mail/sent'>Sent</Link>
      </div>

      <div title='Starred' className={`folder-div ${isActive('/starred')}`}>
        <Link to='/mail/starred'>Starred</Link>
      </div>

      <div title='Trash' className={`folder-div ${isActive('/trash')}`}>
        <Link to='/mail/trash'>Trash</Link>
      </div>

      <div title='Draft' className={`folder-div ${isActive('/draft')}`}>
        <Link to='/mail/draft'>Drafts</Link>
      </div>
    </div>
  )
}
