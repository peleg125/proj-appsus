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
    <section className='mail-container main-layout'>
      <button onClick={() => onBack()}>Back</button>
      <article className='mail-details'>
        <h1 className='place-self-center'>{mail.subject}</h1>

        <div className='top'>
          <div className='flex space-between'>
            <h4>{`From <${mail.from}>`}</h4>
            <span>{new Date(mail.sentAt).toLocaleString()}</span>
          </div>
          <h4>{`To <${mail.to}>`}</h4>
        </div>
        <div
          style={{
            borderTop: '2px solid #b7b7b7 ',
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <div className='mail-body'>
          <p>{mail.body}</p>
        </div>

        <section className='links-next-prev flex flex-column'>
          <Link to={`/mail/${mail.nextMailId}`}>Next Mail</Link>
          <Link to={`/mail/${mail.prevMailId}`}>Previous Mail</Link>
        </section>
      </article>
    </section>
  )
}
