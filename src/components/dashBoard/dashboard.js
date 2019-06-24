import React, {Component} from 'react';

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
        <h1>Dashboard</h1>
      );
  }
}

export default DashApp;
