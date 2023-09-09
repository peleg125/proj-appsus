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
    return mailService
      .addOrUpdateDraft(draft, id)
      .then((modDraft) => {
        if (modDraft) {
          navigate(
            `/mail/${filterBy.status}/?compose=true&draftId=${modDraft.id}`
          )
        }
        return modDraft.id
      })
      .catch((err) => {
        console.error('Error saving draft:', err)
        throw err
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

  function handleDeleteClick(mailId) {
    mailService
      .remove(mailId)
      .then(() =>
        setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
      )
      .catch((err) => console.log('err:', err))
  }

  function handleSaveEmail(mail) {
    handleEntityUpdate(mail.id, (entity) => {
      entity.sentAt = new Date().toISOString()
      return entity
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
          <button
            onClick={() => {
              navigate(`/mail/${filterBy.status}/?compose=true`)
              setComposeOpen(true)
            }}
          >
            Compose
          </button>
        </div>

        {isComposeOpen && (
          <div className='compose-modal'>
            <MailCompose
              isOpen={isComposeOpen}
              onClose={() => {
                navigate(`/mail/${filterBy.status}`)
                setComposeOpen(false)
              }}
              onSaveDraft={handleDraftSave}
              onSendEmail={handleSaveEmail}
            />
          </div>
        )}
      </div>
    </main>
  )
}
