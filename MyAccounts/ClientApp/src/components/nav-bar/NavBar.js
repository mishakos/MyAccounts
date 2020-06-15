import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {
  EuroSymbol,
  AccountTree
} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const drawerWidth = 240;
const styles = (theme) =>
    ({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        nested: {
          paddingLeft: theme.spacing(4),
        },
    });

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ open: !this.state.open })
  }
    render() {
        const { classes } = this.props;
        return (

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={this.props.open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.props.toggle}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
            <List>
              <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Catalogs" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button key="Currencies" className={classes.nested} component={
                    React.forwardRef((props, ref) => (
                      <Link to="/currencies" {...props}
                        onClick={this.props.toggle} ref={ref}>
                        {props.children}
                      </Link>))}>
                    <ListItemIcon><EuroSymbol color="primary" /></ListItemIcon>
                    <ListItemText primary="Currencies" />
                  </ListItem>
                  <ListItem button key="Accounts" className={classes.nested} component={
                    React.forwardRef((props, ref) => (
                      <Link to="/accounts" {...props}
                        onClick={this.props.toggle} ref={ref}>
                        {props.children}
                      </Link>))}>
                    <ListItemIcon><AccountTree color="primary" /></ListItemIcon>
                    <ListItemText primary="Accounts" />
                  </ListItem>
                  <ListItem button key="Banks" className={classes.nested} component={
                    React.forwardRef((props, ref) => (
                      <Link to="/banks" {...props}
                        onClick={this.props.toggle} ref={ref}>
                        {props.children}
                      </Link>))}>
                    <ListItemIcon><AccountTree color="primary" /></ListItemIcon>
                    <ListItemText primary="Banks" />
                  </ListItem>
                  <ListItem button key="Clients" className={classes.nested} component={
                    React.forwardRef((props, ref) => (
                      <Link to="/clients" {...props}
                        onClick={this.props.toggle} ref={ref}>
                        {props.children}
                      </Link>))}>
                    <ListItemIcon><AccountTree color="primary" /></ListItemIcon>
                    <ListItemText primary="Clients" />
                  </ListItem>
               </List>
              </Collapse>
                </List>
                <Divider />
            </Drawer>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default withStyles(styles)(NavBar);
