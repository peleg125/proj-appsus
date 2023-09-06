// mail service
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
export const mailService = {
  query,
  get,
  add,
  update,
  remove,
  getDefaultMailFilter,
}
const MAILS_KEY = 'emailsDB'
const demoMails = [
  {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e102',
    subject: 'Important Meeting',
    body: "Don't forget we have an important meeting scheduled for Monday.",
    isRead: true,
    sentAt: 1551231930594,
    removedAt: null,
    from: 'boss@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e103',
    subject: 'Weekly Newsletter',
    body: "Here is our weekly newsletter. Don't miss our top stories!",
    isRead: false,
    sentAt: 1551231930595,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e104',
    subject: 'Invoice Due',
    body: 'Your invoice is due in 5 days. Please make a payment.',
    isRead: true,
    sentAt: 1551231930596,
    removedAt: null,
    from: 'billing@appsus.com',
    to: 'user@appsus.com',
  },
]

_createMails()

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

const criteria = {
  status: 'inbox',
  txt: '',
  isRead: null,
  isStared: null,
  labels: [],
}

function query(filterBy = {}) {
  return storageService.query(MAILS_KEY).then((emails) => {
    let filteredEmails = emails

    if (filterBy.status) {
      if (filterBy.status === 'inbox') {
        filteredEmails = filteredEmails.filter(
          (email) => email.to === loggedinUser.email
        )
      } else if (filterBy.status === 'sent') {
        filteredEmails = filteredEmails.filter(
          (email) => email.from === loggedinUser.email
        )
      }
    }

    if (filterBy.txt) {
      const txt = new RegExp(filterBy.txt, 'i')
      filteredEmails = filteredEmails.filter(
        (email) => txt.test(email.subject) || txt.test(email.body)
      )
    }

    if (filterBy.isRead !== null) {
      filteredEmails = filteredEmails.filter(
        (email) => email.isRead === filterBy.isRead
      )
    }

    if (filterBy.isStared !== null) {
      filteredEmails = filteredEmails.filter(
        (email) => email.isStared === filterBy.isStared
      )
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      filteredEmails = filteredEmails.filter((email) =>
        filterBy.labels.some((label) => email.labels.includes(label))
      )
    }

    return filteredEmails
  })
}

function get(emailId) {
  return storageService.get(MAILS_KEY, emailId)
}

function add(email) {
  return storageService.post(MAILS_KEY, email)
}

function update(email) {
  return storageService.put(MAILS_KEY, email)
}

function remove(emailId) {
  return storageService.remove(MAILS_KEY, emailId)
}

function getDefaultMailFilter() {
  return {
    status: 'inbox',
    txt: '',
    isRead: null,
    isStared: null,
    labels: [],
  }
}

function _createMail() {
  return {
    id: '',
    subject: '',
    body: '',
    isRead: false,
    sentAt: null,
    removedAt: null,
    from: '',
    to: '',
  }
}

function _createMails() {
  let mails = utilService.loadFromStorage(MAILS_KEY)
  if (!mails || !mails.length) {
    mails = demoMails
    utilService.saveToStorage(MAILS_KEY, mails)
  }
}
