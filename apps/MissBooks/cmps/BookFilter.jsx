const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
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
        getMaxPriceValue()
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

  function getMaxPriceValue() {
    let elMaxPrice = document.getElementById("maxPrice").value
    document.getElementById("priceValue").innerHTML = elMaxPrice
  }

  const { txt, maxPrice, pageCount, isOnSale } = filterByToEdit
  return (
    <div>
      <h2 className='filter-text'>Filter Our Books By:</h2>
      <section className='book-filter'>
        <form onSubmit={onSubmitFilter} className='filter-form'>
          <div className='filter'>
            <label htmlFor='txt'></label>
            <input className='input-book' value={txt} onChange={handleChange} type='text' placeholder='Name:' id='txt' name='txt' />
          </div>
          <div className='filter'>
            <label htmlFor='pageCount'></label>
            <input
              className='input-book'
              value={pageCount}
              onChange={handleChange}
              type='number'
              placeholder='Pages:'
              id='pageCount'
              name='pageCount'
            />
          </div>
          <div className='filter'>
            <label htmlFor='maxPrice'>
              Maximum Price: <span id='priceValue'></span>
            </label>
            <input className='input-book' min='1' max='200' value={maxPrice} onChange={handleChange} type='range' id='maxPrice' name='maxPrice' />
          </div>
          <div className='filter'>
            <label className='sale' htmlFor='isOnSale'>
              On Sale:
            </label>
            <input
              className='input-book'
              value={isOnSale}
              onChange={handleChange}
              type='checkbox'
              placeholder='By Min Price:'
              id='isOnSale'
              name='isOnSale'
            />
          </div>
        </form>
      </section>
    </div>
  )
}
