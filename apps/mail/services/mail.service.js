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
  addOrUpdateDraft,
  getEmptyDraft,
  updateDraft,
}
const MAILS_KEY = 'emailsDB'
const demoMails = [
  {
    id: 'e101',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt: 1551133930594,
    isStarred: false,
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
    isStarred: false,
    removedAt: null,
    from: 'boss@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: 'Weekly Newsletter',
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
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
    isStarred: true,
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
    isStarred: false,
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
    isStarred: false,
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
    isStarred: false,
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
    isStarred: false,
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
    isStarred: false,
    from: 'user@appsus.com',
    to: 'recipient@appsus.com',
  },
  {
    id: 'e110',
    subject: 'Your Subscription is About to End',
    body: 'Your subscription will end in 3 days. Please renew to continue using our services. please consider subscribing to my YT channel',
    isRead: true,
    sentAt: 1651920000000,
    isStarred: false,
    removedAt: null,
    from: 'billing@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: 'aBcDe',
    subject: 'Re: Dinner Plans for Friday Night?',
    body: "Hey there! How about trying that new Italian place for dinner on Friday? Let me know if you're in!",
    isRead: true,
    isRemoved: null,
    sentAt: 1664531200000,
    isStarred: false,
    from: 'friend@example.com',
    to: 'user@appsus.com',
  },
  {
    id: 'XyZ12',
    subject: 'Urgent: Project Deadline Approaching',
    body: "We're getting closer to the project deadline. Your input is crucial! Please review and share your thoughts ASAP.",
    isRead: false,
    isRemoved: null,
    sentAt: 1659724800000,
    isStarred: false,
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
    isStarred: false,
    from: 'traveldeals@exploreworld.com',
    to: 'user@appsus.com',
  },
  {
    id: '1aB2C',
    subject: 'Congratulations on Your Promotion!',
    body: "You've earned it! Celebrate your success and take on this new role with confidence.",
    isRead: true,
    isRemoved: null,
    sentAt: 1662844800000,
    isStarred: true,
    from: 'hr@company.com',
    to: 'user@appsus.com',
  },
  {
    id: 'AbC23',
    subject: 'Weekly Newsletter: Tech Trends & Innovations',
    body: 'Stay ahead in the tech world with our latest newsletter. Explore emerging trends and groundbreaking innovations.',
    isRead: false,
    isRemoved: null,
    sentAt: 1663473600000,
    isStarred: false,
    from: 'technews@innovate.com',
    to: 'user@appsus.com',
  },
  {
    id: 'XyZ45',
    subject: 'Payment Received - Thank You!',
    body: 'Your recent payment has been successfully received. We appreciate your business and look forward to serving you again.',
    isRead: true,
    isRemoved: null,
    sentAt: 1658726400000,
    isStarred: false,
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
    isStarred: false,
    from: 'charityevents@helpinghands.org',
    to: 'user@appsus.com',
  },
  {
    id: 'QrStU',
    subject: 'Important Tax Documents Attached',
    body: 'Your tax documents for the year are attached. Please review them and file your taxes accordingly.',
    isRead: false,
    isRemoved: null,
    sentAt: 1657478400000,
    isStarred: false,
    from: 'finance@taxfirm.com',
    to: 'user@appsus.com',
  },
  {
    id: 'VwXyZ',
    subject: 'Reminder: Parent-Teacher Conference Tomorrow',
    body: "Don't forget about the parent-teacher conference scheduled for tomorrow. Your child's progress is our priority.",
    isRead: true,
    isRemoved: null,
    sentAt: 1664217600000,
    isStarred: false,
    from: 'schooladmin@example.com',
    to: 'user@appsus.com',
  },
  {
    id: '5AbCd',
    subject: 'Exclusive Discount for You!',
    body: "You're one of our valued customers. Enjoy an exclusive 20% discount on your next purchase as a token of our appreciation.",
    isRead: true,
    isRemoved: 1662403200000,
    sentAt: 1662403200000,
    isStarred: false,
    from: 'customerloyalty@example.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: `${utilService.makeLorem(5)}`,
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: `${utilService.makeLorem(5)}`,
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: `${utilService.makeLorem(5)}`,
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: `${utilService.makeLorem(5)}`,
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: `${utilService.makeLorem(5)}`,
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: `${utilService.makeLorem(5)}`,
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
  {
    id: `${utilService.makeId()}`,
    subject: 'Weekly Newsletter',
    body: `${utilService.makeLorem(45)}`,
    isRead: Math.random() >= 0.5,
    sentAt: 1551231930595,
    isStarred: Math.random() >= 0.5,
    removedAt: null,
    from: 'newsletter@appsus.com',
    to: 'user@appsus.com',
  },
]

_createMails()

const loggedinUser = {
  mail: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

function filterByStatus(mails, status, user) {
  switch (status) {
    case 'starred':
      return mails.filter((mail) => mail.isStarred === true)
    case 'inbox':
      return mails.filter(
        (mail) => mail.to === user.mail && mail.removedAt === null
      )
    case 'sent':
      return mails.filter(
        (mail) =>
          mail.from === user.mail &&
          mail.removedAt === null &&
          mail.sentAt !== null
      )
    case 'trash':
      return mails.filter((mail) => mail.removedAt !== null)
    case 'draft':
      return mails.filter(
        (mail) => mail.sentAt === null && mail.from === user.mail
      )
    default:
      return mails
  }
}

function filterByText(mails, txt) {
  const regex = new RegExp(txt, 'i')
  return mails.filter(
    (mail) =>
      regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from)
  )
}

function filterByRead(mails, isRead) {
  return mails.filter((mail) => mail.isRead === isRead)
}

function filterByStarred(mails, isStarred) {
  return mails.filter((mail) => mail.isStarred === isStarred)
}

function query(filterBy = {}) {
  return storageService.query(MAILS_KEY).then((mails) => {
    let filteredMails = mails

    if (filterBy.status) {
      filteredMails = filterByStatus(
        filteredMails,
        filterBy.status,
        loggedinUser
      )
    }

    if (filterBy.txt) {
      filteredMails = filterByText(filteredMails, filterBy.txt)
    }

    if (filterBy.hasOwnProperty('isRead') && filterBy.isRead !== null) {
      filteredMails = filterByRead(filteredMails, filterBy.isRead)
    }

    if (filterBy.hasOwnProperty('isStarred') && filterBy.isStarred !== null) {
      filteredMails = filterByStarred(filteredMails, filterBy.isStarred)
    }

    return filteredMails
  })
}

function get(mailId) {
  return storageService
    .get(MAILS_KEY, mailId)
    .then((mail) => {
      mail = _setNextPrevMailId(mail)
      return mail
    })
    .catch((err) => console.log(err))
}

function add(mail) {
  const mailTemplate = _createMail()
  const tempMail = {
    ...mailTemplate,
    ...mail,
    sentAt: Date.now(),
    isRead: true,
  }
  return storageService.post(MAILS_KEY, tempMail)
}

function update(mail) {
  return storageService.put(MAILS_KEY, mail)
}

function remove(mailId) {
  return storageService.remove(MAILS_KEY, mailId)
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

function addOrUpdateDraft(mail, id = null) {
  if (id) {
    return updateDraft(mail, id)
  } else {
    return addDraft(mail)
  }
}
function addDraft(draft) {
  const draftMail = {
    ..._createMail(),
    ...draft,
    from: loggedinUser.mail,
    sentAt: null,
    isRead: true,
  }
  return storageService.post(MAILS_KEY, draftMail).catch((err) => {
    throw new Error('Error adding draft:', err)
  })
}

function updateDraft(mail, id) {
  const updatedMail = { ...mail, id }
  return update(updatedMail)
}

function getEmptyDraft() {
  return {
    id: '',
    subject: '',
    body: '',
    isRead: null,
    sentAt: null,
    isStarred: null,
    removedAt: null,
    from: 'user@appsus.com',
    to: '',
  }
}

function _createMail(id = null) {
  return {
    id: id || utilService.makeId(),
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
