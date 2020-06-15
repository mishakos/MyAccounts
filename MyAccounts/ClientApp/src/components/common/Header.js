import React from "react";
import { Link } from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavBar from '../nav-bar/NavBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/loginActions';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleDrawerToggle() {
    this.setState({
      open: !this.state.open
    });
  }

  logout() {
    this.props.actions.logout();
  }

  render() {
    return (
      <div className="top-menu-root">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="top-menu-button"
              color="inherit"
              aria-label="menu"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography color="inherit" variant="h6" className="top-menu-title" component={Link} to="/home">
              My Accounts Application
            </Typography>
            {this.props.isAuth ?
              <Button color="inherit" onClick={this.logout}>Log out</Button>
              :
              <div>
                <Button color="inherit" component={Link} to="/signin">
                  Sign In
            </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
            </Button>
              </div>
            }
          </Toolbar>
        </AppBar>
        {this.props.loading && <LinearProgress />}
        <NavBar toggle={this.handleDrawerToggle} open={this.state.open} />
      </div>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    isAuth: state.user && state.user.id ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);