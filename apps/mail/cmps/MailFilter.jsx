export function MailFilter({ onFilterChange }) {
  const { useState } = React
  const [filterByToEdit, setFilterByToEdit] = useState({
    status: 'inbox',
    txt: '',
    isRead: null,
    isStared: null,
    labels: [],
  })

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
    onFilterChange(filterByToEdit)
  }

  const { status, txt, isRead, isStared } = filterByToEdit

  return (
    <form onSubmit={onSubmitFilter}>
      <label>
        Status:
        <select name='status' value={status} onChange={handleChange}>
          <option value='inbox'>Inbox</option>
          <option value='sent'>Sent</option>
          <option value='trash'>Trash</option>
          <option value='draft'>Draft</option>
        </select>
      </label>

      <label>
        Search:
        <input type='text' name='txt' value={txt} onChange={handleChange} />
      </label>

      <label>
        Read:
        <input
          type='checkbox'
          name='isRead'
          checked={isRead}
          onChange={handleChange}
        />
      </label>

      <label>
        Starred:
        <input
          type='checkbox'
          name='isStared'
          checked={isStared}
          onChange={handleChange}
        />
      </label>

      <button type='submit'>Apply Filter</button>
    </form>
  )
}
