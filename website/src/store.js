import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class Store {
  page = ''
  scrollUntil = 0
  cardClick = ''
  isIOS = ['iPhone', 'iPad', 'iPod'].indexOf(window.navigator.platform) !== -1

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

  setCardClick(card) {
    this.cardClick = card
  }
}

const store = new Store()

export default store
