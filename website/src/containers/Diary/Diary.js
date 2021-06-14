import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import gsap from 'gsap'

import { Login as DiaryLogin } from '../../pages/Diary/Login1'
import Overview from '../../pages/Diary/Overview'
import Entry from '../../pages/Diary/Entry'
import View from '../../pages/Diary/View'

const routes = [
  { path: '/diary/login', name: 'Login', Component: DiaryLogin },
  { path: '/diary/overview', name: 'Overview', Component: Overview },
  { path: '/diary/entry', name: 'Entry', Component: Entry },
  { path: '/diary/view', name: 'View', Component: View },
]

const Diary = () => {
  const tl = gsap.timeline()
  useEffect(() => {
    tl.to('.main', 0, {
      css: { visibility: 'visible' },
    })
  }, [])
  return (
    <div
      className="w-full h-screen container mx-auto"
      style={{ visibility: 'hidden' }}
    >
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/diary/login" />} />
          <Route
            exact
            path="/diary"
            render={() => <Redirect to="/diary/login" />}
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
