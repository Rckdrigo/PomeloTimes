import React, {Component} from 'react';
import './../App.css';
import './signin.css';
import Iframe from 'react-iframe';
//import { Link} from 'react-router-dom';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';

import NewPwdModal from './NewPwdModal.js';
import ForgotPassword from './ForgotPwd.js'


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

    //new password required modal
    requireNewPassword = () => this.n.handleShow();

    //recovering password modal
    forgotPassword = () => this.f.handleShow();

    render = () => {
        let n = (<NewPwdModal handleChangePassword={this.handleChangePassword} handleChangeConfirmPassword={this.handleChangeConfirmPassword} handleSave={this.handleSave} ref={ref => this.n = ref} />);
        let f = (<ForgotPassword handleChangeNewPassword={this.handleChangeNewPassword} handleSaveChangePassword={this.handleSaveChangePassword} handleSend={this.handleSend} handleChangeUsername={this.handleChangeUsername} forgotpwd_user_ok={this.state.forgotpwd_user_ok} ref={ref => this.f = ref} />);
        return (
        <div>
            {/* <div id="login_modal">{n}{f}</div> */}
            <div id="login-background" />
            <div id="login-form"></div>
            
            <Row className="signinWrap" style={{ paddingLeft: '10px' }}>
                <Col xs={12} sm={12} md={7} lg={8}>
                    <Row>
                        <Col xs={12}>
                            <h1>AURORA</h1>
                            <p>Framework 0.1</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={12} md={6}>
                            <Card className="shadow-sm">
                                <Iframe url="https://www.youtube.com/embed/cggc8kNll2M"
                                width="100%"
                                height="450px"
                                id="myId"
                                className="myClassname"
                                display="initial"
                                position="relative"/>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Button variant="" className="text-uppercase background-green">Join now</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <Card className="shadow-sm">
                                <Iframe url="https://www.youtube.com/embed/4nfWhWEy2Hc"
                                width="100%"
                                height="450px"
                                id="myId"
                                className="myClassname"
                                display="initial"
                                position="relative"/>
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                    </Card.Text>
                                    <Button variant="" className="text-uppercase background-green">Join now</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={5} lg={4} className="loginPanel p-3">
                <Form id='login-inputForm' className="m-auto form-login" style={{ maxWidth: '350px' }}>
                        <Form.Label id="login-title">i-Media Suite</Form.Label>
                        <br />
                        <div className='alert alert-warning' role='alert' id='currently_use'>This account is currently using by someone</div>
                        <div className='left' id='warning'>Invalid Username/Email or Password</div>
                        <Form.Group className="login-inputbox">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                placeholder="Username"
                                ref={ref => this.usernameInput = ref}
                                id="username"
                                onKeyDown={this.getUsername}
                                onChange={this.onUsernameChange}
                                value={this.state.usernameValue} />
                        </Form.Group>

                        <Form.Group className="login-inputbox">
                            <Row>
                                <Col><Form.Label>Password</Form.Label></Col>
                                <Col>
                                    <Form.Label className="center color-green">
                                        <span id="forgotpwd" value="forgotpwd" onClick={this.forgotPassword} >
                                            Forgot Password?
                                                </span>
                                    </Form.Label>
                                </Col>
                            </Row>
                            
                            <Form.Control type="password"
                                placeholder="Password"
                                ref={ref => this.passwordInput = ref}
                                id="password"
                                onKeyDown={this.getPassword}
                                onChange={this.onPasswordChange}
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
                            <Button variant="" type="submit" className="center background-green text-uppercase" id="login-button"> Signin </Button>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </div>
        
        )
    }
}

export default Signin;