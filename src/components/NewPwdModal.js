import React, { Component } from "react";
import { Modal, FormGroup, FormLabel, Button, FormControl, Row, Col } from 'react-bootstrap';
import './signin.css';


class NewPwdModal extends Component {
    state = {
        show: false,
        Password: '',
        ConfirmPassword: '',
        showPassword: false,
        ok: true
    }

    handleSave = () => {
        var password = document.getElementById('pwd_inputText').value;
        var confirmpassword = document.getElementById('con_pwd_inputText').value;
        var ok = this.state.ok;
        if (password !== confirmpassword) {
            document.getElementById('con_pwd_inputText').style.borderColor = "red";
            document.getElementById('warningText_4').style.visibility = "visible";
            this.setState({
                ok: false
            })
            ok = false;
        } else {
            document.getElementById('warningText_4').style.visibility = "hidden";
            document.getElementById('con_pwd_inputText').style.borderColor = "#707070";
            if(this.state.password_policy === true){
                ok = true;
            }
        }

         if(ok !== false){
            this.props.handleSave(); 
        }else{
             return;
        }

    }

    checkPasswordPolicy = (e) => {
        var regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

        var testResult = regExp.test(e.target.value);

        this.setState({ password_policy: testResult })

        if (!testResult) {
            document.getElementById('pwdPolicy').style.color = "red";
            document.getElementById('pwd_inputText').style.borderColor = "red";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('pwdPolicy').style.color = "#969292";
            document.getElementById('pwd_inputText').style.borderColor = "#707070";
        }
    }

    checkConfirmPassword = () => {
        var password = document.getElementById('pwd_inputText').value;
        var confirmpassword = document.getElementById('con_pwd_inputText').value;

        if (password !== confirmpassword) {
            document.getElementById('con_pwd_inputText').style.borderColor = "red";
            document.getElementById('warningText_4').style.visibility = "visible";
            this.setState({
                ok: false
            })
        } else {
            document.getElementById('warningText_4').style.visibility = "hidden";
            document.getElementById('con_pwd_inputText').style.borderColor = "#707070";
        }
    }

    //get password and confirm password
    handleChangePassword = (e) => this.props.handleChangePassword(e);

    handleChangeConfirmPassword = (e) => this.props.handleChangeConfirmPassword(e);

    handleClose = () => this.setState({ show: false });

    handleShow = () => this.setState({ show: true });

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

    render() {
        return (<div className='pwd_bg'>
            <Modal show={this.state.show} onHide={this.handleClose} className='pwd_bg'>
                <div className='modal-content newpassword_modal'>
                    <Modal.Header>
                        <Modal.Title id='pwd_title'>Create new password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id='pwdPolicy'>
                            8 Characters or longer <br />
                            At least one CAPITAL letter <br />
                            At least one number <br />
                        </div>
                        <br />
                        <form>
                            <FormGroup>
                                <FormLabel className="pwd_label">Password</FormLabel>
                                <Row>
                                    <Col md={12}>
                                        <FormControl className="inputText"
                                            id="pwd_inputText"
                                            type="password"
                                            value={this.state.value}
                                            onChange={this.handleChangePassword}
                                            onKeyUp={this.checkPasswordPolicy} />
                                        <FormControl.Feedback />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <div id="warningText_4">Password is not match</div>
                            <FormGroup>
                                <FormLabel className="pwd_label">Confirm Password</FormLabel>
                                <Row>
                                    <Col md={12}>
                                        <FormControl className="inputText"
                                            id="con_pwd_inputText"
                                            type="password"
                                            value={this.state.value}
                                            onChange={this.handleChangeConfirmPassword}
                                            onKeyUp={this.checkConfirmPassword} />
                                        <FormControl.Feedback />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose} id='pwd_button_sec'>Close</Button>
                        <Button onClick={this.handleSave} id='pwd_button_pri' >Save</Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>)
    }
}

export default NewPwdModal;