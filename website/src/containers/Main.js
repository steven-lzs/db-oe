import React from 'react'

import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import Login from '../pages/Login/Login'
import About from '../pages/About/About'

const routes = [
  { path: '/', name: 'Login', Component: Login },
  { path: '/login', name: 'Login', Component: Login },
  { path: '/about', name: 'About', Component: About },
]

const Main = () => {
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, width: '0%' },
    enter: { opacity: 1, width: '100%' },
    leave: { opacity: 0, width: '0%' },
  })

  // const AnimatedSwitch = animated(Switch);
  return (
    <div className="main container mx-auto">
      {transitions.map(({ item: location, props, key }) => (
        <animated.div
          key={key}
          style={props}
          className="h-full absolute top-0 left-0"
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
  )
}

export default Main
