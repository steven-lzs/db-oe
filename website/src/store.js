import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  page = ''
  scrollUntil = 0
  scrollLock = false

  constructor() {
    makeAutoObservable(this)

    // 'makePersistable' make the value store in localStorage
    // makePersistable(this, {
    //   name: 'SampleStore',
    //   properties: ['scrollLock'],
    //   storage: window.localStorage,
    // })
  }

  setPage(page) {
    this.page = page
  }

  setScrollUntil(pos) {
    this.scrollUntil = pos
  }

  setScrollLock(e) {
    this.scrollLock = e
  }
}

const store = new Store()

export default store
