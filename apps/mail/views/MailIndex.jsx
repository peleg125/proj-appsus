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
  const [isComposeOpen, setComposeOpen] = useState(false)
  const { status: statusParam } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    const txt = queryParams.get('txt')
    const specialStatus = queryParams.get('in')

    const status = specialStatus ? specialStatus : statusParam

    setFilterBy((prevFilter) => {
      const newFilter = { ...prevFilter }

      newFilter.status = status ? status : newFilter.status
      newFilter.txt = txt
      return newFilter
    })
  }, [location.search, statusParam])

  useEffect(() => {
    mailService
      .query(filterBy)
      .then((fetchedMails) => {
        setMails(fetchedMails)
      })
      .catch((err) => console.error(err))
  }, [filterBy])

  function handleFolderChange(folder) {
    setFilterBy((prevFilter) => {
      const newFilter = { ...prevFilter, txt: `in:${folder}` }
      return newFilter
    })
  }

  const handleFilterChange = (newFilterBy) => {
    navigate(
      `/mail/${newFilterBy.status}${
        newFilterBy.txt ? `?txt=${newFilterBy.txt}` : ''
      }`
    )
    setFilterBy(newFilterBy)
  }

  function handleDraftSave(draft) {
    // Save the draft and get its ID
    // const draftId = // save the draft and get its ID (e.g., from an API)
    // Update the query parameters to include the draft ID
    // navigate(`/mail/compose?id=${draftId}`)
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
        updatedMail.isRead = !updatedMail.isRead
        return updatedMail
      })
      .then((updatedMail) => {
        return mailService.update(updatedMail).then(() => {
          const updatedMails = mails.map((mail) =>
            mail.id === id ? updatedMail : mail
          )
          console.log('from handle read', updatedMail)
          setMails(updatedMails)
        })
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  function handleSaveEmail(mail) {
    mailService.add(mail).then((data) => console.log('from onSaveEmail', data))
  }

  return (
    <div className='mail-index'>
      <div className='sidebar'>
        <MailFolderList onFolderChange={handleFolderChange} />
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
