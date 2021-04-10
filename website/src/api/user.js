import api from './api'

export default {
  login() {
    return api().post(`/sayHi`, {})
  },
}
