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
  {
    id: 'e105',
    subject: 'למה אתה בודק מיילים בשעות האלה',
    body: 'ממש חייב להפסיק לענות, זה נוראי',
    isRead: true,
    sentAt: 1551231930596,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'mom@gmail.com',
  },
  {
    id: 'e106',
    subject: 'Invitation to Our Annual Event',
    body: 'You are cordially invited to our annual event. RSVP by the 5th.',
    isRead: true,
    sentAt: 1650987200000,
    removedAt: 1650987200000,
    from: 'events@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e107',
    subject: 'Survey',
    body: 'Please take a moment to complete our customer satisfaction survey.',
    isRead: false,
    sentAt: 1651129200000,
    removedAt: 1650987204315,
    from: 'feedback@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e108',
    subject: 'Special Offer: 30% Off',
    body: 'Our latest collection is now available with a 30% discount. Use code SPECIAL30.',
    isRead: false,
    sentAt: 1651365600000,
    removedAt: null,
    from: 'marketing@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'e109',
    subject: 'This is a Draft Email',
    body: 'This is a draft email. It has not been sent yet.',
    isRead: false,
    sentAt: null,
    removedAt: null,
    from: 'user@appsus.com',
    to: 'recipient@appsus.com',
  },
  {
    id: 'e110',
    subject: 'Your Subscription is About to End',
    body: 'Your subscription will end in 3 days. Please renew to continue using our services. please consider subscribing to my YT channel',
    isRead: true,
    sentAt: 1651920000000,
    removedAt: null,
    from: 'billing@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'aBcDe',
    subject: 'Re: Dinner Plans for Friday Night?',
    body: "Hey there! How about trying that new Italian place for dinner on Friday? Let me know if you're in!",
    isRead: true,
    isRemoved: false,
    sentAt: 1664531200000,
    from: 'friend@example.com',
    to: 'user@appsus.com',
  },
  {
    id: 'XyZ12',
    subject: 'Urgent: Project Deadline Approaching',
    body: "We're getting closer to the project deadline. Your input is crucial! Please review and share your thoughts ASAP.",
    isRead: false,
    isRemoved: false,
    sentAt: 1659724800000,
    from: 'boss@company.com',
    to: 'user@appsus.com',
  },
  {
    id: 'PqRsT',
    subject: 'Exclusive Travel Deals Await!',
    body: "Discover amazing travel deals to your dream destinations. Don't miss out on this limited-time offer!",
    isRead: true,
    isRemoved: true,
    sentAt: 1665129600000,
    from: 'traveldeals@exploreworld.com',
    to: 'user@appsus.com',
  },
  {
    id: '1aB2C',
    subject: 'Congratulations on Your Promotion!',
    body: "You've earned it! Celebrate your success and take on this new role with confidence.",
    isRead: true,
    isRemoved: false,
    sentAt: 1662844800000,
    from: 'hr@company.com',
    to: 'user@appsus.com',
  },
  {
    id: 'AbC23',
    subject: 'Weekly Newsletter: Tech Trends & Innovations',
    body: 'Stay ahead in the tech world with our latest newsletter. Explore emerging trends and groundbreaking innovations.',
    isRead: false,
    isRemoved: false,
    sentAt: 1663473600000,
    from: 'technews@innovate.com',
    to: 'user@appsus.com',
  },
  {
    id: 'XyZ45',
    subject: 'Payment Received - Thank You!',
    body: 'Your recent payment has been successfully received. We appreciate your business and look forward to serving you again.',
    isRead: true,
    isRemoved: false,
    sentAt: 1658726400000,
    from: 'billing@businessco.com',
    to: 'user@appsus.com',
  },
  {
    id: 'lmNoP',
    subject: 'Invitation to Charity Gala',
    body: "You're cordially invited to our annual charity gala. Your presence can make a difference in the lives of many.",
    isRead: false,
    isRemoved: true,
    sentAt: 1659451200000,
    from: 'charityevents@helpinghands.org',
    to: 'user@appsus.com',
  },
  {
    id: 'QrStU',
    subject: 'Important Tax Documents Attached',
    body: 'Your tax documents for the year are attached. Please review them and file your taxes accordingly.',
    isRead: false,
    isRemoved: false,
    sentAt: 1657478400000,
    from: 'finance@taxfirm.com',
    to: 'user@appsus.com',
  },
  {
    id: 'VwXyZ',
    subject: 'Reminder: Parent-Teacher Conference Tomorrow',
    body: "Don't forget about the parent-teacher conference scheduled for tomorrow. Your child's progress is our priority.",
    isRead: true,
    isRemoved: false,
    sentAt: 1664217600000,
    from: 'schooladmin@example.com',
    to: 'user@appsus.com',
  },
  {
    id: '5AbCd',
    subject: 'Exclusive Discount for You!',
    body: "You're one of our valued customers. Enjoy an exclusive 20% discount on your next purchase as a token of our appreciation.",
    isRead: true,
    isRemoved: true,
    sentAt: 1662403200000,
    from: 'customerloyalty@example.com',
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
  return storageService.query(MAILS_KEY).then((mails) => {
    let filteredMails = mails

    if (filterBy.status) {
      console.log('Filter by before status - ', filterBy)
      console.log('fechedMails by before status - ', filteredMails)
      if (filterBy.status === 'inbox') {
        filteredMails = filteredMails.filter(
          (email) => email.to === loggedinUser.email
        )
        console.log('Filter by after inbox - ', filterBy)
        console.log('fechedMails by after inbox - ', filteredMails)
      } else if (filterBy.status === 'sent') {
        filteredMails = filteredMails.filter(
          (email) => email.from === loggedinUser.email
        )
        console.log('Filter by after sent - ', filterBy)
        console.log('fechedMails by after sent - ', filteredMails)
      } else if (filterBy.status === 'trash') {
        filteredMails = filteredMails.filter(
          (email) => email.removedAt !== null
        )
        console.log('Filter by after trash - ', filterBy)
        console.log('fechedMails by after trash - ', filteredMails)
      } else if (filterBy.status === 'starred') {
        filteredMails = filteredMails.filter((email) => email.isStared === true)
        console.log('Filter by after starred - ', filterBy)
        console.log('fechedMails by after starred - ', filteredMails)
      }
    }

    console.log('Filter by end - ', filterBy)
    console.log('fechedMails by end - ', filteredMails)
    if (filterBy.txt) {
      const txt = new RegExp(filterBy.txt, 'i')
      filteredMails = filteredMails.filter(
        (mail) =>
          txt.test(mail.subject) || txt.test(mail.body) || txt.test(mail.from)
      )

      console.log('from regex', filteredMails)
      console.log('filterby', filterBy)
    }

    if (filterBy.hasOwnProperty('isRead') && filterBy.isRead !== null) {
      filteredMails = filteredMails.filter(
        (mail) => mail.isRead === filterBy.isRead
      )
    }

    if (filterBy.hasOwnProperty('isStared') && filterBy.isStared !== null) {
      filteredMails = filteredMails.filter(
        (mail) => mail.isStared === filterBy.isStared
      )
    }

    if (filterBy.labels && filterBy.labels.length > 0) {
      filteredMails = filteredMails.filter((mail) =>
        filterBy.labels.some((label) => mail.labels.includes(label))
      )

      console.log('filterby', filterBy)
      console.log('from labled', filteredMails)
    }
    console.log('from end', filteredMails)
    console.log('filterby', filterBy)

    return filteredMails
  })
}

function get(emailId) {
  return storageService
    .get(MAILS_KEY, emailId)
    .then((mail) => {
      mail = _setNextPrevMailId(mail)
      return mail
    })
    .catch((err) => console.log(err))
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

function _setNextPrevMailId(mail) {
  return storageService.query(MAILS_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1]
      ? mails[mailIdx - 1]
      : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}
