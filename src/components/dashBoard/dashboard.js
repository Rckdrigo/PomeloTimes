import React, {Component} from 'react';
import { connect } from 'react-redux';

const config = require('../../config/config.json')

class DashApp extends Component {
  state = {
      collapsed: false,
  };

  componentDidMount = () => {
      console.log(this.props)
      
      this.props.saveCookie('username', this.props.username);
    //   this.props.saveCookie('idToken', this.props.idToken);
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render = () => {
      return (

        <div>
          <h1>Dashboard</h1>
          <h2>{this.props.productName}</h2>
          <h2>{this.props.userInformation.username}</h2>

          <button> <a href={ config.products[0]['url'] } target="_self" 
            onClick = {() => this.props.saveCookie('role', this.props.roleName)}>
            MEDIA SUITE 
        </a></button>
        </div>
        
      );
  }
}

const mapStateToProps = (state) => {
  let { productRoles, productName, roleName, allUsers, userInformation,username,idToken} = state.sessionReducer

  return {
    productRoles: productRoles,
    productName: productName,
    roleName:roleName,
    allUsers: allUsers,
    userInformation: userInformation,
    username: username,
    idToken: idToken,
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DashApp);
