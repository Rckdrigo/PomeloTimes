import React, { Component } from "react";
import { Modal, FormGroup, FormLabel, Button, FormControl, Row, Col } from 'react-bootstrap';
import './signin.css';

class verificationCodeModal extends Component {

    state = {
        show: false,
        forgotpwd_username: "",
        forgotpwd_password: "",
        forgotpwd_user_ok: false,
        ok: false,
        pass_policy: false,
        match: false
    }

    handleSend = () => {
        var passcode_1 = document.getElementById('passcode_1').value;
        var passcode_2 = document.getElementById('passcode_2').value;
        var passcode_3 = document.getElementById('passcode_3').value;
        var passcode_4 = document.getElementById('passcode_4').value;
        var passcode_5 = document.getElementById('passcode_5').value;
        var passcode_6 = document.getElementById('passcode_6').value;
        var pwd_inputText = document.getElementById('pwd_inputText').value;
        var con_pwd_inputText = document.getElementById('con_pwd_inputText').value;
        if(passcode_1.length === 0){
            document.getElementById('passcode_1').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('passcode_1').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }
        if (passcode_2.length === 0) {
            document.getElementById('passcode_2').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('passcode_2').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }
        if (passcode_3.length === 0) {
            document.getElementById('passcode_3').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('passcode_3').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }
        if (passcode_4.length === 0) {
            document.getElementById('passcode_4').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('passcode_4').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }
        if (passcode_5.length === 0) {
            document.getElementById('passcode_5').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('passcode_5').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }
        if (passcode_6.length === 0) {
            document.getElementById('passcode_6').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('passcode_6').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }

        if(pwd_inputText.length === 0 || this.state.pass_policy === false){
            document.getElementById('pwd_inputText').style.borderColor = "red";
            document.getElementById('warningText_2').innerHTML = "8 characters or longer. At least one CAPITAL letter and one numbers";
            document.getElementById('warningText_2').style.visibility = "visible";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('pwd_inputText').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }

        if(con_pwd_inputText.length === 0){
            document.getElementById('con_pwd_inputText').style.borderColor = "red";
            this.setState({
                ok: false
            })
        }else{
            document.getElementById('con_pwd_inputText').style.borderColor = "#707070";
            this.setState({
                ok: true
            })
        }

        if (pwd_inputText !== con_pwd_inputText) {
                document.getElementById('warningText_2').innerHTML = "Password is not match";
                document.getElementById('con_pwd_inputText').style.borderColor = "red";
                document.getElementById('warningText_2').style.visibility = "visible";
                this.setState({
                    match: false
                })
        } else {
                document.getElementById('con_pwd_inputText').style.borderColor = "#707070";
                this.setState({
                    match: true
                },this.handleSaveNewPassword())
        }
    }
    handleSaveNewPassword = () =>{
        if(this.state.ok === true && this.state.match === true && this.state.pass_policy === true){
            var passcode_1 = document.getElementById('passcode_1').value;
            var passcode_2 = document.getElementById('passcode_2').value;
            var passcode_3 = document.getElementById('passcode_3').value;
            var passcode_4 = document.getElementById('passcode_4').value;
            var passcode_5 = document.getElementById('passcode_5').value;
            var passcode_6 = document.getElementById('passcode_6').value;
            this.props.getCode(passcode_1 + passcode_2 + passcode_3 + passcode_4 + passcode_5 + passcode_6)
        }
    }

    handleChangeNewPassword = (e) => this.props.handleChangeNewPassword(e)

    handleClose = () => this.setState({ show: false });

    handleShow = (val) => {
        this.setState({ show: true });
        if (val === false) {
            document.getElementById('passcode_1').style.borderColor = "red";
            document.getElementById('passcode_2').style.borderColor = "red";
            document.getElementById('passcode_3').style.borderColor = "red";
            document.getElementById('passcode_4').style.borderColor = "red";
            document.getElementById('passcode_5').style.borderColor = "red";
            document.getElementById('passcode_6').style.borderColor = "red";
            document.getElementById('warningText_3').style.visibility = "visible";
        }
    }

    resendVerificationCode = () => this.props.handleSend();

    handleCode = () => {
        document.getElementById('passcode_1').style.borderColor = "#707070";
        document.getElementById('passcode_2').style.borderColor = "#707070";
        document.getElementById('passcode_3').style.borderColor = "#707070";
        document.getElementById('passcode_4').style.borderColor = "#707070";
        document.getElementById('passcode_5').style.borderColor = "#707070";
        document.getElementById('passcode_6').style.borderColor = "#707070";
    }

    showPassword = (e) => {
        if (this.state.showPassword === false) {
            
            if (e.target.id === 'mask_icon_1') {
                document.getElementById('pwd_inputText').type = 'text';
            } else {
                document.getElementById('con_pwd_inputText').type = 'text';
            }

            this.setState({ showPassword: true })
        } else {
           
            if (e.target.id === 'mask_icon_1') {
                document.getElementById('pwd_inputText').type = 'password';
            } else {
                document.getElementById('con_pwd_inputText').type = 'password';
            }
            this.setState({ showPassword: false })
        }
    }

    checkConfirmPassword = () => {
        var password = document.getElementById('pwd_inputText').value;
        var confirmpassword = document.getElementById('con_pwd_inputText').value;
        if(password.length !== 0 && confirmpassword.length !== 0){
            if (password !== confirmpassword) {
                document.getElementById('warningText_2').innerHTML = "Password is not match";
                document.getElementById('con_pwd_inputText').style.borderColor = "red";
                document.getElementById('warningText_2').style.visibility = "visible";
                this.setState({
                    match: false
                })
            } else {
                if(this.state.pass_policy !== false){
                    document.getElementById('warningText_2').innerHTML = "Password is not match";
                    document.getElementById('warningText_2').style.visibility = "hidden";
                }
                document.getElementById('warningText_2').style.visibility = "hidden";
                document.getElementById('con_pwd_inputText').style.borderColor = "#707070";
                this.setState({
                    match: true
                })
            }
        }
    }

    checkPasswordPolicy = (e) => {
        var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

        var testResult = regExp.test(e.target.value);

        this.setState({ password_policy: testResult })

        if (!testResult) {
            document.getElementById('pwd_inputText').style.borderColor = "red";
            document.getElementById('warningText_2').innerHTML = "8 characters or longer. At least one CAPITAL letter and one numbers";
            document.getElementById('warningText_2').style.visibility = "visible";
            this.setState({
                pass_policy: false
            })
        } else {
            document.getElementById('pwd_inputText').style.borderColor = "#707070";
            document.getElementById('warningText_2').style.visibility = "hidden";
            this.setState({
                pass_policy: true
            })
        }
    }

    render() {
        return (<div className='pwd_bg' >
            <Modal show={this.state.show} onHide={this.handleClose} className='pwd_bg'>
                <div className='modal-content verification_modal'>
                    <Modal.Header>
                        <Modal.Title id='pwd_title'>Verification Code & New Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id='pwdPolicy'>
                            Please type the verification code<br />sent to your email
                        </div><br />
                        <form>
                            <FormGroup id="verify_form">
                                <Row>
                                    <Col md={2}>
                                        <FormControl className="passcode"
                                            id="passcode_1"
                                            type="text"
                                            placeholder="1"
                                            maxLength="1"
                                            onKeyUp={this.handleCode} />
                                        <FormControl.Feedback />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl className="passcode"
                                            id="passcode_2"
                                            type="text"
                                            placeholder="2"
                                            maxLength="1"
                                            onKeyUp={this.handleCode} />
                                        <FormControl.Feedback />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl className="passcode"
                                            id="passcode_3"
                                            type="text"
                                            placeholder="3"
                                            maxLength="1"
                                            onKeyUp={this.handleCode} />
                                        <FormControl.Feedback />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl className="passcode"
                                            id="passcode_4"
                                            type="text"
                                            placeholder="4"
                                            maxLength="1"
                                            onKeyUp={this.handleCode} />
                                        <FormControl.Feedback />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl className="passcode"
                                            id="passcode_5"
                                            type="text"
                                            placeholder="5"
                                            maxLength="1"
                                            onKeyUp={this.handleCode} />
                                        <FormControl.Feedback />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl className="passcode"
                                            id="passcode_6"
                                            type="text"
                                            placeholder="6"
                                            maxLength="1"
                                            onKeyUp={this.handleCode} />
                                        <FormControl.Feedback />
                                    </Col>
                                </Row>
                                <div id="warningText_3">Invalid Verification Code</div>
                            </FormGroup>
                            <div>I didn't receive a code! <span id="resend" onClick={this.resendVerificationCode} >
                                Resend
                                        </span></div>
                            <div id="warningText_2">Password is not match</div>
                            <FormGroup>
                                <FormLabel className="pwd_label">New Password</FormLabel>
                                <Row>
                                    <Col md={12}>
                                        <FormControl className="inputText"
                                            id="pwd_inputText"
                                            type="password"
                                            onKeyUp={this.checkPasswordPolicy}
                                            onChange={this.handleChangeNewPassword} />
                                        <FormControl.Feedback />
                                    </Col>
                                </Row>
                                <br />
                                <FormLabel className="pwd_label">Confirm Password</FormLabel>
                                <Row>
                                    <Col md={12}>
                                        <FormControl className="inputText"
                                            id="con_pwd_inputText"
                                            type="password"
                                            onKeyUp={this.checkConfirmPassword} />
                                        <FormControl.Feedback />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose} id='pwd_button_sec'>Close</Button>
                        <Button onClick={this.handleSend} id='pwd_button_pri' >Send</Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>)
    }
}

export default verificationCodeModal;