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
    const compose = queryParams.get('compose') === 'true'
    const draftId = queryParams.get('draftId')

    setComposeOpen(compose)
    const status = statusParam

    setFilterBy((prevFilter) => {
      const newFilter = { ...prevFilter }
      newFilter.status = status
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

  function handleDraftSave(draft, id = null) {
    mailService
      .addOrUpdateDraft(draft, id)
      .then((draftId) => {
        if (draftId) {
          navigate(`/mail/compose?draftId=${draftId}`)
        }
      })
      .catch((err) => {
        console.error('Error saving draft:', err)
      })
  }
  function handleMarkReadClick(id) {
    handleEntityUpdate(id, (mail) => {
      mail.isRead = !mail.isRead
      return mail
    })
  }
  function handleStarClick(id) {
    handleEntityUpdate(id, (mail) => {
      mail.isStarred = !mail.isStarred
      return mail
    })
  }

  function handleClick(id) {
    handleEntityUpdate(id, (mail) => {
      if (!mail.isRead) {
        mail.isRead = true
      }
      return mail
    })
  }

  function handleDeleteClick(id) {
    mailService.remove(id)
  }

  function handleSaveEmail(mail) {
    mail.sentAt = new Date().toISOString()

    mailService
      .update(mail)
      .then(() => {
        console.log('Email sent successfully')
      })
      .catch((err) => {
        console.error('Error while sending email:', err)
      })
  }

  function handleEntityUpdate(id, updateFunction) {
    mailService
      .get(id)
      .then((entity) => {
        const updatedEntity = { ...entity }
        return updateFunction(updatedEntity)
      })
      .then((updatedEntity) => {
        return mailService.update(updatedEntity).then(() => {
          const updatedMails = mails.map((mail) =>
            mail.id === id ? updatedEntity : mail
          )
          setMails(updatedMails)
        })
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  if (!mails) return <div>Loading...</div>

  return (
    <main className='main-container'>
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
            onMailClick={handleClick}
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
    </main>
  )
}
