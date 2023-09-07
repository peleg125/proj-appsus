export function MailCompose({ isOpen, onClose, onSaveDraft, onSendEmail }) {
  const { useState, useEffect, useRef } = React

  const [draft, setDraft] = useState({
    to: '',
    subject: '',
    body: '',
  })

  const draftRef = useRef(draft)

  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  useEffect(() => {
    const interval = setInterval(() => {
      // Auto save every 5 seconds
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setDraft({
      ...draft,
      [name]: value,
    })
  }
  function handleSendClick(ev) {
    ev.preventDefault()
    console.log('ev from handle send click', ev)
    // onSendEmail(emailData)
  }

  if (!isOpen) return null

  return (
    <div className={isOpen ? 'modal' : ''}>
      {/* Modal Content */}
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
