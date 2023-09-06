import { LongTxt } from './LongTxt.jsx'

const { Link } = ReactRouterDOM

export function MailList({ mails }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Star</th>
          <th>Sender</th>
          <th>Subject & Snippet</th>
          {/* <th>Labels</th> */}
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {mails.map((mail) => (
          <tr key={mail.id}>
            <td>
              <input type='checkbox' />
            </td>
            <td>★</td>
            <td>{mail.from}</td>
            <td>
              <Link to={`/mail/${mail.id}`}>
                {mail.subject} - <LongTxt txt={mail.body} />
              </Link>
            </td>
            {/* <td>{mail.labels.join(', ')}</td> */}
            <td>{new Date(mail.sentAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
