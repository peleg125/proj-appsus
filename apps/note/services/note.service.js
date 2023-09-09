import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = "noteDB"
_createNotes()

export const noteService = {
  getEmptyNote,
  createNote,
  save,
  remove,
  get,
  update,
  getNotes,
  query,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i")
      notes = notes.filter((note) => regExp.test(note.info.title) || regExp.test(note.info.txt))
    }
    if (filterBy.type) {
      notes = notes.filter((note) => note.type === filterBy.type)
    }
    return notes
  })
}

function getNotes() {
  const notes = utilService.loadFromStorage(NOTE_KEY) || []
  return notes
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  return storageService.post(NOTE_KEY, note)
}

function update(note) {
  return storageService.put(NOTE_KEY, note)
}

function getEmptyNote(txt = "", title = "") {
  return { info: { txt, title } }
}

function getDefaultFilter() {
  return { txt: "", title: "", type: "" }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: "n101",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: false,
        style: {
          backgroundColor: "#00d",
        },
        info: {
          txt: "Fullstack Me Baby!",
        },
      },
      {
        id: "n102",
        createdAt: 1112222,
        type: "NoteTxt",
        isPinned: false,
        style: {
          backgroundColor: "#00d",
        },
        info: {
          txt: "hey",
          title: "MEeeeeeeeeeee",
        },
      },
      {
        id: "n103",
        type: "NoteImg",
        isPinned: true,
        info: {
          url: "http://some-img/me",
          title: "Bobi and Me",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n104",
        type: "NoteTodos",
        isPinned: false,
        style: {
          backgroundColor: "#00d",
        },
        info: {
          title: "Get my stuff together",
          todos: [
            { txt: "Driving license", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 },
          ],
        },
      },
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(title, txt, url, noteType) {
  const newNote = {
    id: utilService.makeId(),
    type: noteType,
    isPinned: false,
    style: {
      backgroundColor: "#00d",
    },
    info: {
      title: title || "",
      txt: txt || "",
      url: url || "",
    },
  }
  let notes = utilService.loadFromStorage(NOTE_KEY)
  notes.push(newNote)
  utilService.saveToStorage(NOTE_KEY, notes)
  return newNote
}
