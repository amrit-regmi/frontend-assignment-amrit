import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path={['/','/mock/:year/:month', '/mock/:year/:month/:day','/*']} component={App} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

