import { mailService } from '../services/mail.service.js'

export function MailCompose({ isOpen, onClose, onSaveDraft, onSendEmail }) {
  const { useParams, useLocation } = ReactRouterDOM

  const { useState, useEffect, useRef } = React

  const [draft, setDraft] = useState(mailService.getEmptyDraft())
  const draftRef = useRef(draft)
  const intervalRef = useRef(null)

  const { status } = useParams()
  const location = useLocation()

  useEffect(() => {
    const query = new URLSearchParams(location.search)

    const draftId = query.get('draftId')
    if (draftId) {
      mailService
        .get(draftId)
        .then((fetchedDraft) => {
          if (fetchedDraft) {
            setDraft(fetchedDraft)
          }
        })
        .catch((err) => console.log('Error has occurred in getting draft', err))
    }
  }, [location.search])
  useEffect(() => {
    draftRef.current = draft
  }, [draft])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const currentDraft = draftRef.current
      if (currentDraft.to || currentDraft.subject || currentDraft.body) {
        const { id, ...restOfDraft } = currentDraft

        onSaveDraft(restOfDraft, id)
          .then((newId) => {
            if (newId !== id) {
              return setDraft({
                ...currentDraft,
                id: newId,
              })
            }
          })
          .catch((err) => {
            console.error('Error in onSaveDraft:', err)
          })
      }
    }, 5000)

    return () => clearInterval(intervalRef.current)
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
    if (draft.id) {
      onSaveDraft(draft, draft.id)
    } else {
      onSendEmail(draft)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    onClose()
  }

  function handleCloseClick() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={isOpen ? 'modal' : ''}>
      <button onClick={handleCloseClick}>Close</button>
      <form onSubmit={handleSendClick}>
        <label className='compose-label'>To:</label>
        <input
          className='compose-input'
          name='to'
          value={draft.to}
          onChange={handleChange}
          placeholder='To:'
        />

        <label className='compose-label'>Subject:</label>
        <input
          className='compose-input'
          name='subject'
          value={draft.subject}
          onChange={handleChange}
          placeholder='Subject:'
        />

        <label className='compose-label'>Body:</label>
        <textarea
          className='compose-input compose-body'
          name='body'
          value={draft.body}
          onChange={handleChange}
        ></textarea>

        <button type='submit'>Send mail</button>
      </form>
    </div>
  )
}
