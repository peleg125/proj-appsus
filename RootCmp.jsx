const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
//Mail App
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { MailDetails } from './apps/mail/views/MailDetails.jsx'

//Note app
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { NoteModal } from './apps/note/cmps/NoteModal.jsx'
import { NoteEdit } from './apps/note/views/NoteEdit.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* Mail App  */}
          <Route path='/mail' element={<MailIndex />} />
          <Route path='/mail/:status' element={<MailIndex />} />
          <Route path='/mail/details/:mailId' element={<MailDetails />} />

          <Route path='/note' element={<NoteIndex />}>
            <Route path='/note/:noteId' element={<NoteModal />} />
          </Route>
        </Routes>
      </section>
    </Router>
  )
}
