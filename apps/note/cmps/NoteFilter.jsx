const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case "number":
      case "range":
        value = +value || ""
        break

      case "checkbox":
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }
  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt } = filterByToEdit
  return (
    <section className='car-filter'>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor='txt'>Search: </label>
        <input value={txt} onChange={handleChange} type='text' placeholder='Text' id='txt' name='txt' />

        {/* <select>
                <option value='todos'></option>
            </select>  */}

        <button>Set Filter</button>
      </form>
    </section>
  )
}
