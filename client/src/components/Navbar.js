import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { createMuiTheme } from '@material-ui/core/styles';


class Landing extends Component {
  constructor(props) {
    super(props);
    this._logOut = this._logOut.bind(this);
  }

  _logOut(e) {
    e.preventDefault()
    localStorage.removeItem('userToken')
    this.props.history.push('/')
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <p>Login</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            <p>Register</p>
          </Link>
        </li>
      </ul>
    )
    
    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            <p>Home</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            <p>User</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/brain/upload" className="nav-link">
              <p>Annotator</p>
          </Link>
        </li>
        <li className="nav-item">
          <p onClick={this._logOut} className="nav-link">
            Logout
          </p>
        </li>
      </ul>
    )
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
    
        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          {localStorage.userToken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing)

// const styles = {
  
//   root: {
//     flexGrow: 1,
//     color: '#84444'
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

// function Landing(props) {
//   const { classes } = props;
//   return (
//     <div className={classes.root}>
//       <AppBar position="static" style={{backgroundColor: '#26c6da'}} >
//         <Toolbar>
//           <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit" className={classes.grow}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// Landing.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Landing);
