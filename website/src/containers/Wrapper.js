import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import gsap from 'gsap'

import Main from 'pages/Main'
import Login from 'pages/Login'

import Overview from 'pages/Diary/Overview'
import Entry from 'pages/Diary/Entry'
import View from 'pages/Diary/View'

import Home from 'pages/Anime/Home'

const routes = [
  { path: '/', name: 'Login', Component: Login },
  { path: '/login', name: 'login', Component: Login },
  { path: '/main', name: 'Main', Component: Main },
  { path: '/diary/overview', name: 'Overview', Component: Overview },
  { path: '/diary/entry', name: 'Entry', Component: Entry },
  { path: '/diary/view', name: 'View', Component: View },
  { path: '/anime', name: 'Home', Component: Home },
]

const Wrapper = ({ outerWrapper }) => {
  const tl = gsap.timeline()
  useEffect(() => {
    tl.to('.wrapper', 0, {
      css: { visibility: 'visible' },
    })
  }, [])
  return (
    <div
      className="w-full h-screen container mx-auto wrapper"
      style={{ visibility: 'hidden' }}
    >
      <Router>
        <Switch>
          <Route
            exact
            path="/diary"
            render={() => <Redirect to="/diary/overview" />}
          />
          {routes.map(({ path, Component }) => (
            <Route exact path={path} key={path}>
              <Component outerWrapper={outerWrapper} />
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  )
}

export default Wrapper
