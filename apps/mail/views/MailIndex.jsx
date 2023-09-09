import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const { useState, useEffect } = React
  const { useNavigate, useParams, useLocation } = ReactRouterDOM
  const [filterBy, setFilterBy] = useState(mailService.getDefaultMailFilter())
  const [mails, setMails] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isComposeOpen, setComposeOpen] = useState(false)
  const { status: statusParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    const txt = queryParams.get('txt')
    // const specialStatus = queryParams.get('in')

    const status = statusParam
    // const status = specialStatus ? specialStatus : statusParam

    setFilterBy((prevFilter) => {
      const newFilter = { ...prevFilter }

      newFilter.status = status
      // newFilter.status = status ? status : newFilter.status
      newFilter.txt = txt
      return newFilter
    })
  }, [location.search, statusParam])

  useEffect(() => {
    mailService
      .query(filterBy)
      .then((fetchedMails) => setMails(fetchedMails))
      .catch((err) => console.error(err))
  }, [filterBy])

  useEffect(() => {
    if (filterBy.status === 'inbox') {
      const unreadMails = mails.filter((mail) => !mail.isRead).length
      setUnreadCount(unreadMails)
    }
  }, [mails])

  function handleFilterChange(newFilterBy) {
    navigate(
      `/mail/${newFilterBy.status}${
        newFilterBy.txt ? `?txt=${newFilterBy.txt}` : ''
      }`
    )
    setFilterBy((prevFilter) => {
      const newFilter = { ...prevFilter, ...newFilterBy }
      return newFilter
    })
  }

  function handleDraftSave(draft) {
    mailService
      .addOrUpdateDraft(draft)
      .then((draftId) => {
        navigate(`/mail/compose?${draftId}`)
      })
      .catch((err) => {
        console.error('Error saving draft:', err)
      })
  }

  function handleStarClick(id) {
    mailService
      .get(id)
      .then((mail) => {
        const updatedMail = { ...mail }
        updatedMail.isStarred = !updatedMail.isStarred
        return updatedMail
      })
      .then((updatedMail) => {
        return mailService.update(updatedMail).then(() => {
          const updatedMails = mails.map((mail) =>
            mail.id === id ? updatedMail : mail
          )
          console.log('from handle starred', updatedMail)
          setMails(updatedMails)
          console.log('mails after set mails', mails)
        })
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  function handleDeleteClick(id) {
    mailService.remove(id)
  }
  function handleMarkReadClick(id) {
    mailService
      .get(id)
      .then((mail) => {
        const updatedMail = { ...mail }
        updatedMail.isRead = updatedMail.isRead ? false : true
        return updatedMail
      })
      .then((updatedMail) => {
        return mailService.update(updatedMail).then(() => {
          const updatedMails = mails.map((mail) =>
            mail.id === id ? updatedMail : mail
          )
          console.log('from handle isRead', updatedMail)
          setMails(updatedMails)
          console.log('mails after set mails', mails)
        })
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  function handleSaveEmail(mail) {
    mailService.add(mail).then(console.log)

    // mailService.add(mail).then((data) => console.log('from onSaveEmail', data))
  }

  if (!mails) return <div>Loading...</div>

  return (
    <div className='mail-index'>
      <div className='sidebar'>
        <MailFolderList unreadCount={unreadCount} />
      </div>

      <div className='mail-main-content'>
        <MailFilter onFilterChange={handleFilterChange} filterBy={filterBy} />
        <MailList
          mails={mails}
          onDeleteClick={handleDeleteClick}
          onMarkReadClick={handleMarkReadClick}
          onStarClick={handleStarClick}
        />
      </div>

      <div className='compose-button'>
        <button onClick={() => setComposeOpen(true)}>Compose</button>
      </div>

      {isComposeOpen && (
        <div className='compose-modal'>
          <MailCompose
            isOpen={isComposeOpen}
            onClose={() => setComposeOpen(false)}
            onSaveDraft={handleDraftSave}
            onSendEmail={handleSaveEmail}
          />
        </div>
      )}
    </div>
  )
}
