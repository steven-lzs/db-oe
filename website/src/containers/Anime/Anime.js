import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import gsap from 'gsap'

import Login from '../../pages/Anime/Konooto'

const routes = [{ path: '/anime/login', name: 'Login', Component: Login }]

const Diary = () => {
  const tl = gsap.timeline()
  useEffect(() => {
    tl.to('.main', 0, {
      css: { visibility: 'visible' },
    })
  }, [])
  return (
    <div
      className="w-full h-screen container mx-auto main"
      style={{ visibility: 'hidden' }}
    >
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/anime/login" />} />
          <Route
            exact
            path="/anime"
            render={() => <Redirect to="/anime/login" />}
          />
          {routes.map(({ path, Component }) => (
            <Route exact path={path} key={path}>
              <Component />
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default Diary
