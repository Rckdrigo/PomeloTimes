import React, {Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/sidebar.js';
import { setIDToken, changePage } from '../../actions/sessionActions'

const config = require('../../config/config.json')

class DashApp extends Component {
  state = {
      collapsed: false,
  };


  componentDidMount = () => {
      console.log("PROPS======================"+this.props.username)
      
      this.props.saveCookie('username', this.props.username);
      this.props.saveCookie('idToken', this.props.idToken);
  
      if (this.props.idToken === '' || this.props.idToken === null || this.props.idToken === undefined){
        this.props.history.push("/")
          console.log("USER NOT FOUND");
      }else{
        console.log("USER LOGIN");
        
      }
            
            
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  

  render = () => {
      return (
        
        <div>
        <Sidebar username={this.props.userInformation.username} history={this.props.history}/>
          <h1>Dashboard</h1>
          <h2>{this.props.productName}</h2>
          <h2>{this.props.userInformation.username}</h2>

        </div>
        
      );
  }
}

const mapStateToProps = (state) => {
  let { productRoles, productName, roleName, allUsers, userInformation,username,idToken} = state.sessionReducer
  let { currentPage, rememberMe } = state.sessionReducer

  return {
    productRoles: productRoles,
    productName: productName,
    roleName:roleName,
    allUsers: allUsers,
    userInformation: userInformation,
    username: username,
    idToken: idToken,
    rememberMe: rememberMe,
    currentPage: currentPage,
  }
}

const mapDispatchToProps = dispatch => ({
  setIDToken: (idToken, username, password) => dispatch(setIDToken(idToken, username, password)),
    changePage: currentPage => dispatch(changePage(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashApp);
