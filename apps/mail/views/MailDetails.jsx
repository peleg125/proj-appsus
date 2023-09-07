import { mailService } from '../services/mail.service.js'

const { useState, useEffect } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {
  const [mail, setmail] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [params.mailId])

  function loadMail() {
    mailService
      .get(params.mailId)
      .then(setmail)
      .catch((err) => {
        console.log('err', err)
      })
  }
  function onBack() {
    navigate('/mail/inbox')
  }

  if (!mail) return <div>Loading...</div>

  return (
    <section className='mail-details'>
      <h1>Subject: {mail.subject}</h1>
      <h4>{`From <${mail.from}>`}</h4>
      <h4>{`To <${mail.to}>`}</h4>
      <p>{mail.body}</p>

      <button onClick={onBack}>Back</button>

      <section className='links-next-prev flex flex-column'>
        <Link to={`/mail/${mail.nextMailId}`}>Next Mail</Link>
        <Link to={`/mail/${mail.prevMailId}`}>Previous Mail</Link>
      </section>
    </section>
  )
}
