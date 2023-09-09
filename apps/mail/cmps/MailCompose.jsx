import { mailService } from '../services/mail.service.js'

export function MailCompose({ isOpen, onClose, onSaveDraft, onSendEmail }) {
  const { useParams } = ReactRouterDOM

  const { useState, useEffect, useRef } = React

  const [draft, setDraft] = useState({
    to: '',
    subject: '',
    body: '',
    from: 'user@appsus.com',
  })
  const searchParams = useParams()

  const draftId = searchParams
  const draftRef = useRef(draft)

  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        draftRef.current.to ||
        draftRef.current.subject ||
        draftRef.current.body
      ) {
        console.log('draftRed', draftRef.current)
        // onSaveDraft(draftRef.current)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  useEffect(() => {
    if (draftId) {
      mailService
        .get(draftId)
        .then((fetchedDraft) => {
          if (fetchedDraft) {
            setDraft(fetchedDraft)
          }
        })
        .catch((err) => console.log('Error has accured in getting draft', err))
    }
  }, [draftId])

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setDraft({
      ...draft,
      [name]: value,
    })
  }
  // function handleSendClick(ev) {
  //   ev.preventDefault()
  //   const { target } = ev
  //   const { to, subject, body } = target
  //   const toValue = to.value
  //   const subjectValue = subject.value
  //   const bodyValue = body.value

  //   const emailData = {
  //     to: toValue,
  //     subject: subjectValue,
  //     body: bodyValue,
  //     from: 'user@appsus.com',
  //   }
  //   onSendEmail(emailData)
  // }
  function handleSendClick(ev) {
    ev.preventDefault()
    if (draft.id) {
      onSaveDraft(draft, draft.id)
    } else {
      onSendEmail(draft)
    }

    onClose()
  }

  function handleCloseClick() {
    clearInterval(interval)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={isOpen ? 'modal' : ''}>
      <button onClick={handleCloseClick}>Close</button>
      <form onSubmit={handleSendClick}>
        <input
          name='to'
          value={draft.to}
          onChange={handleChange}
          placeholder='To:'
        />
        <input
          name='subject'
          value={draft.subject}
          onChange={handleChange}
          placeholder='Subject:'
        />
        <textarea
          name='body'
          value={draft.body}
          onChange={handleChange}
        ></textarea>
        <button type='submit'>Send mail</button>
      </form>
    </div>
  )
}
