import React, { useRef, useEffect } from 'react'
import './index.css'
// import Scrollbar from 'react-smooth-scrollbar'
// import 'antd/dist/antd.dark.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Wrapper from 'containers/Wrapper'
// import useWindowSize from 'hooks/useWindowSize'

import { observer } from 'mobx-react'
import store from './store'

const App = () => {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  const app = useRef()
  // const scrollContainer = useRef()
  // const size = useWindowSize()
  // const changes = null

  // const scrollConfigs = {
  //   ease: 0.1,
  //   current: 0,
  //   previous: 0,
  //   rounded: 0,
  // }

  // const MathUtils = {
  //   // map number x from range [a, b] to [c, d]
  //   map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
  //   // linear interpolation
  //   lerp: (a, b, n) => (1 - n) * a + n * b
  // };

  // useEffect(() => {
  //   if (scrollContainer.current) {
  //     document.body.style.height = `${
  //       scrollContainer.current.getBoundingClientRect().height
  //     }px`
  //   }
  //   // window.scrollTo(0, 0)
  // }, [size.height, store.page])

  // // Run scrollrender once page is loaded.
  // useEffect(() => {
  //   window.requestAnimationFrame(() => smoothScrolling())
  // }, [])

  // // Scrolling
  // const smoothScrolling = (
  //   current = window.scrollY,
  //   previous = scrollConfigs.previous
  // ) => {
  //   //Set Current to the scroll position amount
  //   scrollConfigs.current = current
  //   if (store.scrollUntil != current) {
  //     store.setScrollUntil(current)
  //   }
  //   // Set Previous to the scroll previous position
  //   // scrollConfigs.previous += (current - previous) * scrollConfigs.ease
  //   scrollConfigs.previous = MathUtils.lerp(previous, current, scrollConfigs.ease);
  //   // Set rounded to
  //   scrollConfigs.rounded = Math.round(previous * 100) / 100

  //   // Difference between
  //   // const difference = current - scrollConfigs.rounded
  //   // const acceleration = difference / size.width
  //   // const velocity = +acceleration
  //   // const skew = velocity * 7.5

  //   //Assign skew and smooth scrolling to the scroll container
  //   if (scrollContainer.current) {
  //     scrollContainer.current.style.transform = `translateY(-${scrollConfigs.rounded}px)`
  //   }

  //   //loop via ref
  //   window.requestAnimationFrame(() => smoothScrolling())
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <div ref={app} className="App"> */}
      <div ref={app} className="App" >
        {/* <Wrapper forwardedRef={scrollContainer} /> */}
        <Wrapper outerWrapper={app} />
      </div>
    </ThemeProvider>
  )
}

export default observer(App)
