export function MailCompose({ isOpen, onClose, onSaveDraft, onSendEmail }) {
  const { useState, useEffect, useRef } = React

  const [draft, setDraft] = useState({
    to: '',
    subject: '',
    body: '',
    from: 'user@appsus.com',
  })

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
        onSaveDraft(draftRef.current)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (ev) => {
    const { name, value } = ev.target
    setDraft({
      ...draft,
      [name]: value,
    })
  }
  function handleSendClick(ev) {
    ev.preventDefault()
    const { target } = ev
    const { to, subject, body } = target
    const toValue = to.value
    const subjectValue = subject.value
    const bodyValue = body.value

    const emailData = {
      to: toValue,
      subject: subjectValue,
      body: bodyValue,
      from: 'user@appsus.com',
    }
    onSendEmail(emailData)
  }

  if (!isOpen) return null

  return (
    <div className={isOpen ? 'modal' : ''}>
      <button onClick={onClose}>Close</button>
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
