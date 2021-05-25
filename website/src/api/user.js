// eslint-disable-next-line
import api from './api'

const user = {
  login(param) {
    return api().post(`/login`, param)
  },
  updateDiary(param) {
    return api().post(`/updateDiary`, param)
  },
  getAllDiary() {
    return api().post(`/getDiary`, {})
  },
}

export default user
