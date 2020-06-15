import React from 'react';
import { PropTypes } from 'prop-types';
import { 
    Card, 
    CardContent, 
    Typography, 
    CardActions,
    Button,
    TextField,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/loginActions';
import toastr from 'toastr';

class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginForm: {
                UserName: "",
                Password: ""
            },
            showPassword: false,
            toIndex: false,
            isLoading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        this.setState({isLoading: true});
      this.props.actions.login(this.state.loginForm)
        .then(() => this.props.history.push("/"))
            .catch(error => {
                console.log(error);
                toastr.error(error);
                this.setState({isLoading: false});
            });
    }
    
    handleChange(event) {
        const field = event.target.name;
        let loginForm = this.state.loginForm;
        loginForm[field] = event.target.value;
        return this.setState({loginForm: loginForm});
    }
    handleClickShowPassword() {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleMouseDownPassword(event) {
        event.preventDefault();
    }
    render() {
        return (
        <Card className="login-card center">
            <CardContent>
                <Typography className="login-card-title"
                    color="textSecondary"
                    gutterBottom >
                    Login
                    </Typography>
                    <TextField
                        id="UserName"
                        label="Login"
                        name="UserName"
                        disabled={this.state.isLoading}
                        className="login-card-login"
                        value={this.state.loginForm.UserName}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <TextField
                        id="Password"
                        label="Password"
                        disabled={this.state.isLoading}
                        name="Password"
                        className="login-card-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.loginForm.Password}
                        onChange={this.handleChange}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  edge="end"
                                  aria-label="toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                  onMouseDown={this.handleMouseDownPassword}
                                >
                                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                    />
            </CardContent>
            <CardActions className="login-card-action-bar">
              <Button type="submit" variant="contained" color="primary" disabled={this.state.isLoading} onClick={this.login}>Login</Button>
            </CardActions>
        </Card>
        );
    }
}

SignInPage.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(SignInPage);