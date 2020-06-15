import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/loginActions';
import toastr from 'toastr';
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

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            regForm: {
                UserName: "",
                Password: "",
                PasswordConfirm: ""
            },
            showPassword: false,
            toIndex: false,
            isLoading: false
        };

        this.handleInput = this.handleInput.bind(this);
        this.registrate = this.registrate.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    handleInput(event) {
        const field = event.target.name;
        let regForm = this.state.regForm;
        regForm[field] = event.target.value;
        return this.setState({ regForm: regForm });
    }

    handleClickShowPassword() {
        this.setState({ showPassword: !this.state.showPassword });
    }
    handleMouseDownPassword(event) {
        event.preventDefault();
    }

    registrate(event) {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.props.actions.registrate(this.state.regForm)
            .then(() => this.setState({ toIndex: true }))
            .catch(error => {
                toastr.error(error);
                this.setState({ isLoading: false });
            });
    }

    render() {
        if (this.state.toIndex === true) {
            return <Redirect to="/" />;
        }
       return (
            <Card className="sign-up-card center">
                <CardContent>
                    <Typography className="login-card-title"
                        color="textSecondary"
                        gutterBottom >
                        Registration
                    </Typography>
                    <TextField
                        id="UserName"
                        label="UserName"
                        name="UserName"
                        disabled={this.state.isLoading}
                        className="login-card-login"
                        value={this.state.regForm.UserName}
                        onChange={this.handleInput}
                        margin="normal"
                    />
                    <TextField
                        id="Password"
                        label="Password"
                        disabled={this.state.isLoading}
                        name="Password"
                        className="login-card-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.regForm.Password}
                        onChange={this.handleInput}
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
                    <TextField
                        id="PasswordConfirm"
                        label="PasswordConfirm"
                        disabled={this.state.isLoading}
                        name="PasswordConfirm"
                        className="login-card-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.regForm.PasswordConfirm}
                        onChange={this.handleInput}
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
                <CardActions>
                <Button color="primary" 
                    disabled={this.state.isLoading} 
                    onClick={this.registrate}>
                    Registrate
                </Button>
               </CardActions>
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(SignUpPage);