const { Link } = ReactRouterDOM

export function MailList({ mails }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Sender</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {mails.map((mail) => (
          <tr key={mail.id}>
            <td>
              <Link to={`/mail/${mail.id}`}>{mail.subject}</Link>
            </td>
            <td>{mail.from}</td>
            <td>{new Date(mail.sentAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
