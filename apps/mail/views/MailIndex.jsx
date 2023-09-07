import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const { useState, useEffect } = React
  const { useNavigate, useParams, useLocation } = ReactRouterDOM
  const [filterBy, setFilterBy] = useState(mailService.getDefaultMailFilter())
  const [mails, setMails] = useState([])
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

  return (
    <div className='mail-index grid'>
      <MailFilter onFilterChange={handleFilterChange} filterBy={filterBy} />
      <MailFolderList onFolderChange={handleFolderChange} />
      <MailList mails={mails} />
    </div>
  )
}
