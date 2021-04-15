import React from 'react'
import './index.css'
// import 'antd/dist/antd.dark.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Main from './containers/Main'

const App = () => {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App h-screen container mx-auto">
        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App
