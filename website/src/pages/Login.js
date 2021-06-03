import React, { useState } from 'react'
import * as Mui from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import * as FaIcon from 'react-icons/fa'
import { useSnackbar } from 'notistack'

import user from 'api/user'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()
  const [{ email, password }, setState] = useState(initialState)

  const getDeviceType = () => {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet'
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile'
    }
    return 'desktop'
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const login = () => {
    const device = getDeviceType()
    const param = {
      email,
      password,
      device_name: device,
    }
    user.login(param).then((resp) => {
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data)
        history.push('/overview')
        setState({ ...initialState })
      }

      if (resp.errors) {
        const errors = resp.errors
        for (const key in errors) {
          enqueueSnackbar(errors[key], { variant: 'error' })
        }
      }
    })
  }

  return (
    <div className="text-center table w-full h-full">
      <div className="table-cell align-middle w-full h-full">
        <div className="mb-6">
          <div className="bg-gray-900 inline-flex p-3 rounded-full">
            <div className="bg-gray-600 p-2 rounded-full mr-2">
              <FaIcon.FaUserAlt className="text-lg text-gray-900" />
            </div>
            <Mui.InputBase
              value={email}
              name="email"
              placeholder="Email"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="bg-gray-900 inline-flex p-3 rounded-full">
            <div className="bg-gray-600 p-2 rounded-full mr-2">
              <FaIcon.FaKey className="text-lg text-gray-900" />
            </div>
            <Mui.InputBase
              value={password}
              placeholder="Password"
              name="password"
              type="password"
              onChange={onChange}
            />
          </div>
        </div>
        <div>
          <Mui.Button
            variant="contained"
            onClick={login}
            className="normal-case w-52 rounded-full py-3 bg-rose-600 shadow-rose text-white"
          >
            Login
          </Mui.Button>
        </div>
      </div>
    </div>
  )
}

export default Login
