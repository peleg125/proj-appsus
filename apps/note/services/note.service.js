import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = "noteDB"
_createNotes()

export const noteService = {
  getEmptyNote,
  getNotes,
  createNote,
}

function getNotes() {
  const notes = storageService.loadFromStorage(NOTE_KEY)
  return notes
}

function getEmptyNote(txt = "", title = "") {
  return { info: { txt }, title }
}

function _createNotes() {
  let notes = storageService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    const notes = [
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
    storageService.saveToStorage(NOTE_KEY, notes)
  }
}

function createNote(title, txt) {
  const note = {
    id: utilService.makeId(),
    info: {
      title: title || "",
      txt: txt || "",
    },
  }
  return note
}
