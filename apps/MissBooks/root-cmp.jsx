const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BooksIndex } from "./pages/BooksIndex.jsx"
import { AppHeader } from "./cmps/App-Header.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { AddReview } from "./cmps/AddReview.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"

export function App() {
  const [page, setPage] = useState("book")

  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <header>
          <nav className='app-nav'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/book/:bookId' element={<BookDetails />} />
              <Route path='book/edit/:bookId' element={<BookEdit />} />
              <Route path='book/edit' element={<BookEdit />} />
              <Route path='book/add' element={<BookAdd />} />
              <Route path='/book' element={<BooksIndex />} />
            </Routes>
          </nav>
        </header>
        <main className='container'></main>
      </section>
    </Router>
  )
}
