const { Link } = ReactRouterDOM

export function MailList({ mails }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Select</th>
          <th>Star</th>
          <th>Sender</th>
          <th>Subject & description</th>
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
                <span className='truncate'>
                  {mail.subject} - {mail.body}
                </span>
              </Link>
            </td>
            <td>{new Date(mail.sentAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
