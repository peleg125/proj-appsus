import { utilService } from "./util.service.js"

export const addBookService = {
  getData,
}

const API_STORAGE_KEY = "apiKeyDB"
const url = "https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%2520javascript"

function getData(cb) {
  const xhr = new XMLHttpRequest()

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText)
      console.log(res)
      cb(res)
      const savedApiKey = utilService.loadFromStorage(API_STORAGE_KEY)
      if (!savedApiKey) {
        utilService.saveToStorage(API_STORAGE_KEY, url)
      }
    }
  }

  xhr.open("GET", url)
  xhr.send()
}
