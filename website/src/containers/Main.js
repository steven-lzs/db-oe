import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from 'pages/Login'
import Overview from 'pages/Overview'
import Entry from 'pages/Entry'
import View from 'pages/View'

const routes = [
  { path: '/', name: 'Login', Component: Login },
  { path: '/login', name: 'Login', Component: Login },
  { path: '/overview', name: 'Overview', Component: Overview },
  { path: '/entry', name: 'Entry', Component: Entry },
  { patj: '/view', name: 'View', Component: View },
]

const Main = () => {
  return (
    <div className="w-full h-screen container mx-auto">
      <Router>
        <Switch>
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

export default Main
