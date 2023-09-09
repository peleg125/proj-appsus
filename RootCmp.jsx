const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { NoteModal } from './apps/note/cmps/NoteModal.jsx'
import { MailDetails } from './apps/mail/views/MailDetails.jsx'
import { NoteEdit } from './apps/note/views/NoteEdit.jsx'

// import { BookIndex } from "./apps/book/views/BookIndex.jsx"

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/mail' element={<MailIndex />} />
          <Route path='/mail/:status' element={<MailIndex />} />
          <Route path='/mail/compose?/:draftId' element={<MailIndex />} />
          <Route path='/mail/details/:mailId' element={<MailDetails />} />
          <Route path='/note' element={<NoteIndex />}>
            <Route path='/note/:noteId' element={<NoteModal />} />
          </Route>

          {/* <Route path='/book' element={<BookIndex />} /> */}
        </Routes>
      </section>
    </Router>
  )
}
