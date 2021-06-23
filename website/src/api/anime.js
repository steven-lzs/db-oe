import api from './api'

const anime = {
  getImage(folder, imgName) {
    let baseUrl = ''
    if (
      window.location.href.includes('localhost') ||
      window.location.href.includes('127.0.0.1')
    ) {
      // url = "http://chope2-api.localhost/api";
      baseUrl = 'http://127.0.0.1:8000/anime'
    } else {
      baseUrl = 'http://api.db-oe.com/anime'
    }
    return `${baseUrl}/${folder}/${imgName}`
  },
}

export default anime
