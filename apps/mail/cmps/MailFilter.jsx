import { mailService } from '../services/mail.service.js'

export function MailFilter({ onFilterChange, filterBy }) {
  // filterBy - use this when you want to add to search - add to props
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
    // let specialStatus = null
    // const match = filterByToEdit.txt.match(/in:(\w+)/)
    // if (match) {
    //   specialStatus = match[1]
    // }

    // if (!specialStatus && filterByToEdit.txt) {
    //   specialStatus = 'search'
    // }

    // const textWithoutSpecialStatus = filterByToEdit.txt.replace(/in:\w+\s?/, '')
    // onFilterChange({
    //   ...filterByToEdit,
    //   status: specialStatus || filterByToEdit.status,
    //   txt: textWithoutSpecialStatus,
    // })
    onFilterChange({
      ...filterByToEdit,
      status: filterByToEdit.status,
    })
  }

  const { status, txt, isRead, isStarred } = filterByToEdit
  console.log(`status: ${status}, 
  txt: ${txt}, 
  isRead: ${isRead}, 
  isStarred:${isStarred}`)

  return (
    <form className='filter-from' onSubmit={onSubmitFilter}>
      {/* <label>
        Status:
        <select name='status' value={status || ''} onChange={handleChange}>
          <option value='inbox'>Inbox</option>
          <option value='sent'>Sent</option>
          <option value='trash'>Trash</option>
          <option value='draft'>Draft</option>
        </select>
      </label> */}

      <label title='Search'>
        Search:
        <input
          className='filter-search'
          type='text'
          name='txt'
          value={txt || ''}
          onChange={handleChange}
        />
      </label>

      <label title='Filter by read/unread'>
        Filter by unread:
        <input
          type='checkbox'
          name='isRead'
          checked={isRead === false}
          onChange={handleChange}
        />
      </label>

      <label title='Show only stared'>
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
