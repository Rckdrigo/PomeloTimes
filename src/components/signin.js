import React, {Component} from 'react';
import axios from 'axios';
import './../App.css';
import './signin.css';
import Iframe from 'react-iframe';
//import { Link} from 'react-router-dom';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import { setIDToken, setRememberMe, setUserInfo } from '../actions/sessionActions';
import { connect } from 'react-redux';
import { authenticateUser, newPwd, forgotpassword} from '../cognito/cognito';
import NewPwdModal from './NewPwdModal.js';
import ForgotPassword from './ForgotPwd.js'

const api = require('../api/api.local.json');


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

    componentDidMount = () => {
        console.log(this.props)

        if (this.props.idToken !== '')
            this.props.history.push(this.props.currentPage);

        this.authorizeUserPool = this.authorizeUserPool.bind(this)
        this.rememberMe = this.rememberMe.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    //check login by using cognito
    checkLogin = () => {
        //e.preventDefault();

        console.log("test"+ this.usernameInput.value);

        authenticateUser(this.usernameInput.value, this.passwordInput.value, (err, result, require, cognitoUser) => {
            if (err) {
                if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException' || err.code === 'InvalidParameterException' || err.code === 'UserNotFoundException') {
                    this.setState({ error: true })
                   
                    console.log("======================"+err.code);
                }
                // alert(err.code)
                return;
            }
            if (typeof require !== "undefined") {
                this.setState({ require: require, cognitoUser: cognitoUser, result: result }, this.requireNewPassword());
                /*if(this.state.save === true){
                    newPwd(this.usernameInput.value, this.passwordInput.value,this.state.ConfirmPassword,require);
                }*/
            }
            this.setState({ idToken: result.getIdToken().getJwtToken() })
            this.authorizeUserPool(result);
        });

    }

    //check login by using db (also check inUse status)
    authorizeUserPool = (r) => {
               
        axios.get(api.webUserManagment + this.usernameInput.value,
            {
                headers: {
                    // 'Content-Type': 'application/json',
                    'idToken': r.getIdToken().getJwtToken()
                }
                
            })
            .then(result => {
                console.log("Result", result)
                
                console.log(result.data.response)
                let roleName = "";
                result.data.response.productRoles.map((product) => {
                    if(product.productName === "aurora"){
                        roleName = product.roleName;
                    }
                })


                this.props.setUserInfo(result.data.response.productRoles,"aurora",roleName,result.data.response.allUsers,result.data.response.userInformation);
                this.props.setIDToken(r.getIdToken().getJwtToken(), this.usernameInput.value, this.props.rememberMe ? this.passwordInput.value : null);
               // this.props.setUserInfo(result.data.response.userInformation, result.data.response.companyInformation, result.data.response.isAuroraSuperuser, result.response.productRoles)

                if(this.props.currentPage === ''){
                    this.props.history.push("/dashboard");
                }
                else{
                    
                    this.props.history.push(this.props.currentPage);
                }

            })
            .catch(e => { throw (e) })
    }

    //new password required (first time login)
    handleChangePassword = (e) => this.setState({ Password: e.target.value });

    handleChangeConfirmPassword = (e) => this.setState({ ConfirmPassword: e.target.value });

    //save new password (first time login)
    handleSave = () => {
        console.log("STATE:", this.state)
        this.n.handleClose();
        newPwd(this.usernameInput.value, this.passwordInput.value, this.state.ConfirmPassword, this.state.require, this.state.cognitoUser, (err, result) => {
            if (err) {
                alert(err.code);
            }
            this.setState({ idToken: result.getIdToken().getJwtToken() })
            this.authorizeUserPool(result);
        });
    }

    //for recovering password
    handleChangeUsername = (e) => this.setState({ forgotpwd_username: e.target.value });

    handleChangeNewPassword = (e) => this.setState({ forgotpwd_password: e.target.value });

    //save new password (recovering password)
    handleSend = () => {
        forgotpassword(this.state.forgotpwd_username, (err, result) => {
            if (err) {
                this.setState({ forgotpwd_user_ok: false }, this.f.test())
                alert(err);
                return
            }
            if (typeof result !== "undefined")
                alert(result.message)
            this.setState({ forgotpwd_user_ok: true }, this.f.test())

        })
    }

    rememberMe = (e) => this.props.setRememberMe(e.target.checked)


    //new password required modal
    requireNewPassword = () => this.n.handleShow();

    //recovering password modal
    forgotPassword = () => this.f.handleShow();

    render = () => {
        let CloseModal = () => this.setState({ forgotPassword: false });
        let n = (<NewPwdModal handleChangePassword={this.handleChangePassword} handleChangeConfirmPassword={this.handleChangeConfirmPassword} handleSave={this.handleSave} ref={ref => this.n = ref} />);
        let f = (<ForgotPassword handleChangeNewPassword={this.handleChangeNewPassword} handleSaveChangePassword={this.handleSaveChangePassword} handleSend={this.handleSend} handleChangeUsername={this.handleChangeUsername} forgotpwd_user_ok={this.state.forgotpwd_user_ok} ref={ref => this.f = ref} />);
        return (
        <div>
            <div id="login_modal">{n}{f}</div>
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
                        {this.state.error && (
                            <div className='alert alert-danger'>Invalid Username/Email or Password</div>
                        )}
                        <Form.Group className="login-inputbox text-left">
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
                                <Col  className="text-left"><Form.Label>Password</Form.Label></Col>
                                <Col>
                                    <button type="button" className="btn btn-link color-green" onClick={this.forgotPassword}>Forgot Password?</button>
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

{/* 
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
            </Modal> */}

            
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
    setUserInfo: (productRoles, productName, roleName, allUsers, userInformation) => dispatch(setUserInfo(productRoles, productName, roleName, allUsers, userInformation)),
    setIDToken: (idToken, username, password) => dispatch(setIDToken(idToken, username, password)),
    setRememberMe: (rememberMe) => dispatch(setRememberMe(rememberMe))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);