const { Link, NavLink } = ReactRouterDOM
import { UserMsg } from './UserMsg.jsx'

export function AppHeader() {
  return (
    <header className='app-header'>
      <Link to='/'>
        <h3>Apsus!</h3>
      </Link>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/mail/inbox'>Mail</NavLink>
        <NavLink to='/note'>Note</NavLink>
        <NavLink to='/book'>Book</NavLink>
      </nav>
      <UserMsg />
    </header>
  )
}
