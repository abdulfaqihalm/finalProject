import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Annotator from './components/Annotator'
import Upload from './components/Upload'
import Result from './components/Result'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/brain/annotator" component={Annotator}/>
            <Route exact path="/brain/upload" component={Upload}/>
            <Route exact path="/brain/result" component={Result}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App