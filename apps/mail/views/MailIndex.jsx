import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const { useState, useEffect } = React
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState(mailService.getDefaultMailFilter())
  const { useNavigate, useParams, useLocation } = ReactRouterDOM
  const { status } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const search = query.get('search')

  useEffect(() => {
    const filterByFromParams = {
      ...filterBy,
      status: status || 'inbox',
      txt: search || '',
    }
    setFilterBy(filterByFromParams)
  }, [status, search])

  useEffect(() => {
    mailService
      .query(filterBy)
      .then((fetchedMails) => {
        setMails(fetchedMails)
      })
      .catch((err) => console.log(err))
  }, [filterBy])

  const handleFilterChange = (newFilterBy) => {
    navigate(`/mail?status=${newFilterBy.status}&txt=${newFilterBy.txt}`)
  }

  return (
    <div className='mail-index grid'>
      <MailFilter onFilterChange={handleFilterChange} />
      <MailFolderList
        onFolderChange={(folder) =>
          setFilterBy({ ...filterBy, status: folder })
        }
      />
      <MailList mails={mails} />
    </div>
  )
}
