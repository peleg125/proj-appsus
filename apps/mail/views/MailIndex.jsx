import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const { useState, useEffect } = React
  const [mails, setMails] = useState([])
  const [filterBy, setFilterBy] = useState(mailService.getDefaultMailFilter())

  useEffect(() => {
    mailService
      .query(filterBy)
      .then((fetchedMails) => {
        setMails(fetchedMails)
      })
      .catch((err) => console.log(err))
  }, [filterBy])

  const handleFilterChange = (newFilterBy) => {
    setFilterBy(newFilterBy)
  }

  return (
    <div className='mail-index'>
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
