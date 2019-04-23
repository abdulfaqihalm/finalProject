import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

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
          <PrivateRoute exact path="/" component={Landing} />
          <div className="container">
            <Route  exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/brain/annotator/:patientID" component={Annotator}/>
            <PrivateRoute exact path="/brain/upload" component={Upload}/>
            <PrivateRoute exact path="/brain/result/:patientID" component={Result}/>
          </div>
        </div>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (localStorage.userToken)
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

export default App