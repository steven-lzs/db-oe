import React, { useState } from 'react'
import * as Mui from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import user from 'api/user'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const history = useHistory()
  const [{ email, password }, setState] = useState(initialState)

  //   const clearState = () => {
  //     setState({ ...initialState });
  //   };

  const onChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const login = () => {
    const param = {
      email,
      password,
    }
    user.login(param).then((resp) => {
      console.log(resp)
      if (resp.status === 200) {
        history.push('/Overview')
        setState({ ...initialState })
      }
    })
  }
  return (
    <div className="text-center table w-full h-full">
      <div className="table-cell align-middle w-full h-full">
        <div className="mb-6">
          <Mui.TextField
            value={email}
            name="email"
            label="Email"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <Mui.TextField
            value={password}
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            onChange={onChange}
          />
        </div>

        <Mui.Button variant="contained" color="primary" onClick={login}>
          Login
        </Mui.Button>
      </div>
    </div>
  )
}

export default Login
