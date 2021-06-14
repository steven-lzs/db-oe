import api from './api'

const prefix = '/main'

const main = {
  getMenu() {
    return api().post(`${prefix}/getMenu`, {})
  },
}

export default main
