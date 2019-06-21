import React, {Component} from 'react';
import axios from 'axios';
import './../App.css';
import './signin.css';
import Iframe from 'react-iframe';
//import { Link} from 'react-router-dom';
import { Form, Button, Col, Row, Card, Modal } from 'react-bootstrap';
import { setIDToken, setRememberMe, setUserInfo } from '../actions/sessionActions';
import { connect } from 'react-redux';
const api = require('../api/api.local.json');




// import NewPwdModal from './NewPwdModal.js';
// import ForgotPassword from './ForgotPwd.js'


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
        passwordValue: "",
        forgotPassword: false,
    }

    //check login by using cognito
    checkLogin = () => {
        //e.preventDefault();

        console.log("test"+ this.usernameInput.value);
        this.authorizeUserPool();
    }

    //check login by using db (also check inUse status)
    authorizeUserPool = (r) => {

        console.log(api.webUserManagment + this.usernameInput.value)

        axios.get(api.webUserManagment + this.usernameInput.value)
            .then(result => {
                console.log("Result", result)
                console.log(result.data.response)

                this.props.setUserInfo(result.data.response)

                this.props.history.push("/dashboard");
                

            })
            .catch(e => { throw (e) })

    }

    //new password required modal
    //requireNewPassword = () => this.n.handleShow();

    //recovering password modal
    //forgotPassword = () => this.f.handleShow();

    render = () => {
        let CloseModal = () => this.setState({ forgotPassword: false });
        // let n = (<NewPwdModal handleChangePassword={this.handleChangePassword} handleChangeConfirmPassword={this.handleChangeConfirmPassword} handleSave={this.handleSave} ref={ref => this.n = ref} />);
        // let f = (<ForgotPassword handleChangeNewPassword={this.handleChangeNewPassword} handleSaveChangePassword={this.handleSaveChangePassword} handleSend={this.handleSend} handleChangeUsername={this.handleChangeUsername} forgotpwd_user_ok={this.state.forgotpwd_user_ok} ref={ref => this.f = ref} />);
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
                            <h5 className="text-uppercase color-green">Framework 0.1</h5>
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
                <Col xs={12} sm={12} md={5} lg={4} className="loginPanel d-flex">
                <Form id='login-inputForm' className="m-auto form-login" style={{ maxWidth: '350px', width: '80%' }}>
                        <Form.Label id="login-title" className="text-uppercase">Sign in to AURORA</Form.Label>
                        <br/>
                        <p className="text-uppercase"><small>Enter your detail below</small></p>
                        
                        <Form.Group className="login-inputbox">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text"
                                placeholder="Username"
                                ref={ref => this.usernameInput = ref}
                                id="username"
                                onKeyDown={this.getUsername}
                                onChange={this.onUsernameChange}
                                defaultValue={this.state.usernameValue} />
                        </Form.Group>

                        <Form.Group className="login-inputbox">
                            <Row>
                                <Col><Form.Label>Password</Form.Label></Col>
                                <Col>
                                    <button type="button" className="btn btn-link color-green" onClick={() => this.setState({ forgotPassword: true })}>Forgot Password?</button>
                                </Col>
                            </Row>
                            
                            <Form.Control type="password"
                                placeholder="Password"
                                ref={ref => this.passwordInput = ref}
                                id="password"
                                onKeyDown={this.getPassword}
                                onChange={this.onPasswordChange}
                                defaultValue={this.state.passwordValue} />
                        </Form.Group>
                        <Form.Row as={"div"}>
                            <Form.Check type="checkbox" label="Remember Me"
                                onChange={this.rememberMe}
                                defaultChecked={this.props.rememberMe}
                                id="rememberMe" />
                        </Form.Row>
                        <br />
                        <Form.Row as={"div"}>
                            <Button variant=""  onClick={this.checkLogin}  className="center background-green text-uppercase" id="login-button"> Signin </Button>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>


            <Modal
            show={this.state.forgotPassword}
            onHide={CloseModal}
            aria-labelledby="example-modal-sizes-title-sm"
            >
            <Modal.Header closeButton>
            <Modal.Header>
                <Modal.Title id='forgotpwd_title'>Forgot your password?</Modal.Title>
            </Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <div id='pwdPolicy'>
                    Enter your username below <br/>
                    and we'll get you back on track <br/>
                </div>
                <br/>
                <form>
                    <Form.Group>
                        <Form.Label className="color-green font-weight-bold text-uppercase">Username</Form.Label>
                                <Form.Control className="inputText"
                                    id="pwd_inputText"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleChangeUsername} />
                                <Form.Control.Feedback />
                    </Form.Group>
                </form>
                <div id="usernotfound" className="text-danger">User not found</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={CloseModal}>Close</Button>
                <Button onClick={this.checkLogin} >Send</Button>
            </Modal.Footer>
            </Modal>

            
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
    setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
    setIDToken: (idToken, username, password) => dispatch(setIDToken(idToken, username, password)),
    setRememberMe: (rememberMe) => dispatch(setRememberMe(rememberMe))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);