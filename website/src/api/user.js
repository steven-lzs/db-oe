import api from './api'

const user = {
  login(param) {
    return api().post(`/login`, param)
  },
  logout() {
    return api().post(`/logout`, {})
  },
}

export default user
