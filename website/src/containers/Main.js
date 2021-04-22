import React from 'react'

import { Route, Switch, useLocation } from 'react-router-dom'
import { useTransition, animated } from 'react-spring'

import Login from '../pages/Login/Login'
import About from '../pages/About/About'

// import Drawer from '../components/Drawer'

// import { HiMenuAlt1 } from 'react-icons/hi'
// import * as Mui from '@material-ui/core'

const routes = [
  { path: '/', name: 'Login', Component: Login },
  { path: '/login', name: 'Login', Component: Login },
  { path: '/about', name: 'About', Component: About },
]

const Main = () => {
  // const [openDrawer, setOpenDrawer] = useState(false)
  const location = useLocation()
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, width: '0%' },
    enter: { opacity: 1, width: '100%' },
    leave: { opacity: 0, width: '0%' },
  })

  // const closeDrawer = () => {
  //   setOpenDrawer(false)
  // }

  // const AnimatedSwitch = animated(Switch);
  return (
    <>
      <div className="main relative h-full">
        {/* {!['/login', '/'].includes(location.pathname) && (
        <>
          <div className="absolute top-6 left-6 z-10">
            <Mui.Button onClick={() => setOpenDrawer(true)}>
              <HiMenuAlt1 className="text-4xl" />
            </Mui.Button>
          </div>
          <Drawer open={openDrawer} onClose={closeDrawer} />
        </>
      )} */}
        {transitions.map(({ item: location, props, key }) => (
          <animated.div
            key={key}
            style={props}
            className="h-full absolute top-0 left-0 w-full p-6"
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
