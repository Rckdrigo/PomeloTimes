import React, {Component} from 'react';
import { connect } from 'react-redux';

class DashApp extends Component {
  state = {
      collapsed: false,

  };

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
        </div>
        
      );
  }
}

const mapStateToProps = (state) => {
  let { productRoles, productName, roleName, allUsers, userInformation} = state.sessionReducer

  return {
    productRoles: productRoles,
    productName: productName,
    roleName:roleName,
    allUsers: allUsers,
    userInformation: userInformation
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DashApp);
