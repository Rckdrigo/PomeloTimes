import React, { Component } from "react";
import { Modal, FormGroup, FormLabel, Button, FormControl } from 'react-bootstrap';
import './signin.css';
import { forgotpassword,requiredVerificationCode } from '../cognito/cognito';
import VerificationCodeModal from './VerificationCodeModal'

class ForgotPwd extends Component {
    state = {
        show: false,
        forgotpwd_username: "",
        forgotpwd_password: "",
        forgotpwd_user_ok: false,
        codemistmatch: false,
        usernotfound: false,
        LimitExceeded: false
    }
    handleSend = () =>{
        console.log("hello")
        forgotpassword(this.state.forgotpwd_username, (err, result,cognitoUser,sth) => {
            if (err) {
                console.log(err.code);
                if(err.code === 'LimitExceededException'){
                    this.showVerificationModal(false)
                    this.setState({ LimitExceeded: true })
                }else if(err.code === 'CodeMismatchException'){
                    this.v.handleShow(false);
                }else{
                    this.showVerificationModal(false)
                }
                console.log(cognitoUser)
                
            }
             if (!err && typeof result !== 'undefined'){
                console.log("Result:",result)
                this.setState({cognitoUser: cognitoUser, sth: sth});
                    this.showVerificationModal(true)
            }
            
        })
    }

    showVerificationModal = (val) =>{
        console.log(val)
        if(val === false){
            this.setState({ usernotfound: true })
        }else{
            this.v.handleShow(true);
            this.handleClose();
        }
        
    }
    getCode = (e) =>{
        this.setState({verficationCode: e},function(){
            console.log(this.state.verficationCode)
            console.log(this.state.cognitoUser)
            requiredVerificationCode(this.state.verficationCode,this.state.forgotpwd_password,this.state.cognitoUser,this.state.sth)
            this.v.handleClose();
        })
    }

    handleChangeUsername = (e) => {
        this.setState({forgotpwd_username: e.target.value })
    }
    handleChangeNewPassword = (e) => {
         this.setState({forgotpwd_password: e.target.value})
    }

    handleClose = () => {
        this.setState({ show: false});
        this.setState({ usernotfound: false });
        this.setState({ LimitExceeded: false })
    }

    handleShow = () => {
        this.setState({ show: true});
    }
  render() {
    let v = (<VerificationCodeModal getCode={this.getCode} handleChangeNewPassword={this.handleChangeNewPassword} handleSend={this.handleSend} ref={ref => this.v = ref}/>);
    return (<div className='pwd_bg'>
        <div id="verification_modal">{v}</div>
        <Modal show={this.state.show} onHide={this.handleClose} className='pwd_bg' id="forgotpwd_modal">
        <div className='modal-content forgotpwd_modal'>
                    <Modal.Header>
                        <Modal.Title id='forgotpwd_title'>Forgot your password?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div id='pwdPolicy'>
                            Enter your username below <br/>
                            and we'll get you back on track <br/>
                        </div>
                        <br/>
                        <form>
                            <FormGroup>
                                <FormLabel className="pwd_label">Username</FormLabel>
                                        <FormControl className="inputText"
                                            id="pwd_inputText"
                                            type="text"
                                            value={this.state.value}
                                            onChange={this.handleChangeUsername} />
                                        <FormControl.Feedback />
                            </FormGroup>
                        </form>
                        {this.state.usernotfound && (
                            <div className='text-danger'>Invalid Username/Email or Password</div>
                        )}
                        {this.state.LimitExceeded && (
                            <div className='text-danger'>Please try again later.</div>
                        )}
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

export default ForgotPwd;