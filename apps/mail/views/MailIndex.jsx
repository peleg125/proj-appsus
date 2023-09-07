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
      console.log('new filter', newFilter)
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
    console.log('New FilterBy', newFilterBy)
    navigate(`/mail/${newFilterBy.status}?txt=${newFilterBy.txt}`)
  }

  function handleDraftSave(draft) {
    // Save the draft and get its ID
    // const draftId = // save the draft and get its ID (e.g., from an API)
    // Update the query parameters to include the draft ID
    // navigate(`/mail/compose?id=${draftId}`)
  }

  function handleSaveEmail(mail) {
    mailService.add(mail).then((data) => console.log('from onSaveEmail', data))
  }

  return (
    <div className='mail-index grid'>
      <MailFilter onFilterChange={handleFilterChange} filterBy={filterBy} />
      <MailFolderList onFolderChange={handleFolderChange} />
      <MailList mails={mails} />
      <button onClick={() => setComposeOpen(true)}>Compose</button>

      <MailCompose
        isOpen={isComposeOpen}
        onClose={() => setComposeOpen(false)}
        onSaveDraft={handleDraftSave}
        onSaveEmail={handleSaveEmail}
      />
    </div>
  )
}
