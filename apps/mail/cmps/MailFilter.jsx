export function MailFilter({ onFilterChange }) {
  // filterBy - use this when you want to add to search
  const { useState, useEffect } = React
  const [filterByToEdit, setFilterByToEdit] = useState({
    status: 'inbox',
    txt: '',
    isRead: null,
    isStared: null,
    labels: [],
  })
  // useEffect(() => {
  //   setFilterByToEdit(filterBy)
  // }, [filterBy])

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

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    let specialStatus = null
    const match = filterByToEdit.txt.match(/in:(\w+)/)
    if (match) {
      specialStatus = match[1]
    }

    if (!specialStatus && filterByToEdit.txt) {
      specialStatus = 'search'
    }

    const textWithoutSpecialStatus = filterByToEdit.txt.replace(/in:\w+\s?/, '')
    onFilterChange({
      ...filterByToEdit,
      status: specialStatus || filterByToEdit.status,
      txt: textWithoutSpecialStatus,
    })
  }

  const { status, txt, isRead, isStared } = filterByToEdit

  return (
    <form className='filter-from' onSubmit={onSubmitFilter}>
      <label>
        Status:
        <select name='status' value={status || 'inbox'} onChange={handleChange}>
          <option value='inbox'>Inbox</option>
          <option value='sent'>Sent</option>
          <option value='trash'>Trash</option>
          <option value='draft'>Draft</option>
        </select>
      </label>

      <label>
        Search:
        <input
          className='filter-search'
          type='text'
          name='txt'
          value={txt}
          onChange={handleChange}
        />
      </label>

      <label>
        Read:
        <input
          type='checkbox'
          name='isRead'
          checked={isRead || null}
          onChange={handleChange}
        />
      </label>

      <label>
        Starred:
        <input
          type='checkbox'
          name='isStared'
          checked={isStared || null}
          onChange={handleChange}
        />
      </label>

      <button type='submit'>Apply Filter</button>
    </form>
  )
}
