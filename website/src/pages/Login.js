import React, { useState } from 'react'
import * as Mui from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import user from 'api/user'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const history = useHistory()
  const [{ email, password }, setState] = useState(initialState)
  // const [error, setError] = useState('');

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
      console.log(resp)
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data)
        history.push('/Overview')
        setState({ ...initialState })
      }

      // if(resp.errors) {
      //   setError('Invalid fields');
      // }
    })
  }

  const ValidationTextField = withStyles({
    root: {
      '& fieldset': {
        borderRadius: '10px',
        borderStyle: 'hidden',
        boxShadow: 'inset 5px 5px 10px black',
        '& legend span': {
          display: 'none',
        },
      },
    },
  })(Mui.TextField)

  return (
    <div className="text-center table w-full h-full">
      <div className="table-cell align-middle w-full h-full">
        <div className="mb-6">
          <Mui.TextField
            value={email}
            name="email"
            placeholder="Email"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <Mui.TextField
            value={password}
            placeholder="Password"
            name="password"
            type="password"
            variant="outlined"
            onChange={onChange}
          />
        </div>

        <Mui.Button variant="contained" color="primary" onClick={login}>
          Login
        </Mui.Button>
        {/* {<Mui.Snackbar anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={3000} 
        open={!!error} message={error}>
        </Mui.Snackbar>} */}
      </div>
    </div>
  )
}

export default Login
