import React, { useState } from 'react'
import './Main.css'

import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

//pages
import Home from 'pages/v1/Home/Home'
import About from 'pages/v1/About/About'

//components
import NavBar from 'components/v1/NavBar/NavBar'

import { HiMenuAlt3 } from 'react-icons/hi'
import * as Mui from '@material-ui/core'
import * as FontAwesome from 'react-icons/fa'

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/home', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
]

const Main = () => {
  const [openNav, setOpenNav] = useState(false)
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, width: '0%', transform: 'scale(0)' },
    enter: { opacity: 1, width: '100%', transform: 'scale(1)' },
    leave: { opacity: 0, width: '0%', transform: 'scale(0)' },
  })

  const onClose = () => {
    setOpenNav(false)
  }

  const AnimatedButton = animated(Mui.Button)
  return (
    <>
      <div className="main relative h-full p-6">
        <div className="fixed top-6 right-6 text-right z-10">
          <AnimatedButton onClick={() => setOpenNav((state) => !state)}>
            {!openNav ? (
              <HiMenuAlt3 className="text-4xl" />
            ) : (
              <FontAwesome.FaTimes className="text-4xl" />
            )}
          </AnimatedButton>
        </div>
        <NavBar open={openNav} onClose={onClose} />
        {transitions.map(({ item: location, props, key }) => (
          <animated.div
            key={key}
            style={{ ...props }}
            className="h-full absolute top-0 left-0 w-full p-6 -z-1"
          >
            <Switch location={location}>
              {routes.map(({ path, Component }) => (
                <Route exact path={path} key={path}>
                  <Component />
                </Route>
              ))}
            </Switch>
          </animated.div>
        ))}
      </div>
    </>
  )
}

export default Main
