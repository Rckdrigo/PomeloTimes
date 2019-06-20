import React, {Component} from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap'
import './signin.css';
import { setIDToken, setRememberMe, setIDUser } from '../actions/sessionActions';
import { connect } from 'react-redux';

class Signin extends Component{

    state = {
        error: false,
        showPassword: false,
        show: false,
        Password: "",
        ConfirmPassword: "",
        save: false,
        require: "",
        usernameValue: "",
        passwordValue: ""
    }

    getUsername = () => {

    }
    getPassword = () => {

    }
    rememberMe = () => {

    }
    login = (e) => {
        e.preventDefault();
        this.props.history.push("/dashboard");
    }
    forgotPassword = () => {

    }

    render = () => {
        return (
        <div id="body-login">
                <div id="login-background" />
                <div id="login-form">

                    <Form id='login-inputForm'>
                        <Form.Label id="login-title">SIGN IN TO AURORA</Form.Label>
                        <br />
                        <Form.Group className="login-inputbox">
                            <Form.Control type="text"
                                placeholder="Username"
                                ref={ref => this.usernameInput = ref}
                                id="username"
                                onChange={this.getUsername}
                                value={this.state.usernameValue} />
                        </Form.Group>

                        <Form.Group className="login-inputbox">
                            <Form.Control type="password"
                                        placeholder="Password"
                                        ref={ref => this.passwordInput = ref}
                                        id="password"
                                        onChange={this.getPassword}
                                        value={this.state.passwordValue} />
                        </Form.Group>
                        <Form.Row as={"div"}>
                            <Form.Check type="checkbox" label="Remember Me"
                                onChange={this.rememberMe}
                                defaultChecked={this.props.rememberMe}
                                id="rememberMe" />
                        </Form.Row>
                        <br />
                        <Form.Row as={"div"}>
                            <Button variant="primary" type="submit" className="center" id="login-button" onClick={this.login.bind(this)}> Log In </Button>
                        </Form.Row>
                        <br />
                        <Form.Row as={"div"}>
                            <Form.Label className="center">
                                <span id="forgotpwd" value="forgotpwd" onClick={this.forgotPassword} >
                                    Forgot Password?
                                        </span>
                            </Form.Label>
                        </Form.Row>
                    </Form>
                </div>
            </div>
        
        )
    }
}

const mapStateToProps = (state) => {
    let { username, idToken, rememberMe, password, currentPage } = state.sessionReducer

    return {
        username: username,
        idToken: idToken,
        rememberMe: rememberMe,
        password: password,
        currentPage: currentPage
    }
}

const mapDispatchToProps = dispatch => ({
    setIDUser: (idUser, dbName, companyName) => dispatch(setIDUser(idUser, dbName, companyName)),
    setIDToken: (idToken, username, password) => dispatch(setIDToken(idToken, username, password)),
    setRememberMe: (rememberMe) => dispatch(setRememberMe(rememberMe))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);