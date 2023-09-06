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
  getNotes,
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
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function getEmptyNote(txt = "", title = "") {
  return { info: { txt, title } }
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
      // {
      //   id: "n102",
      //   type: "NoteImg",
      //   isPinned: false,
      //   info: {
      //     url: "http://some-img/me",
      //     title: "Bobi and Me",
      //   },
      //   style: {
      //     backgroundColor: "#00d",
      //   },
      // },
      // {
      //   id: "n103",
      //   type: "NoteTodos",
      //   isPinned: false,
      //   info: {
      //     title: "Get my stuff together",
      //     todos: [
      //       { txt: "Driving license", doneAt: null },
      //       { txt: "Coding power", doneAt: 187111111 },
      // ],
      //   },
      // },
    ]
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(title, txt) {
  const newNote = {
    id: utilService.makeId(),
    type: "NoteTxt",
    isPinned: false,
    style: {
      backgroundColor: "#00d",
    },
    info: {
      title: title || "",
      txt: txt || "",
    },
  }
  let notes = utilService.loadFromStorage(NOTE_KEY)
  notes.push(newNote)
  utilService.saveToStorage(NOTE_KEY, notes)
  return newNote
}
// storageService
//   .post(NOTE_KEY, newNote)
//   .then((savedNote) => {
//     console.log("Note saved:", savedNote)
//   })
//   .catch((error) => {
//     console.error("Error saving note:", error)
//   })
