import { mailService } from '../services/mail.service.js'

export function MailFilter({ onFilterChange, filterBy }) {
  const { useState, useEffect } = React
  const [filterByToEdit, setFilterByToEdit] = useState(
    mailService.getDefaultMailFilter()
  )
  useEffect(() => {
    setFilterByToEdit(filterBy)
  }, [filterBy])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }
    if (field === 'isRead') {
      value = target.checked ? false : null
    }
    if (field === 'isStarred') {
      value = target.checked ? true : null
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onFilterChange({
      ...filterByToEdit,
      status: filterByToEdit.status,
    })
  }

  const { txt, isRead, isStarred } = filterByToEdit

  return (
    <form className='filter-from' onSubmit={onSubmitFilter}>
      <label className='filter-label' title='Search'>
        Search:
        <input
          className='filter-search'
          type='text'
          name='txt'
          value={txt || ''}
          onChange={handleChange}
        />
      </label>

      <label className='filter-label' title='Filter by read/unread'>
        Filter by unread:
        <input
          type='checkbox'
          name='isRead'
          checked={isRead === false}
          onChange={handleChange}
        />
      </label>

      <label className='filter-label' title='Show only stared'>
        Starred:
        <input
          type='checkbox'
          name='isStarred'
          checked={isStarred === true}
          onChange={handleChange}
        />
      </label>

      <button type='submit'>Apply Filter</button>
    </form>
  )
}
