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
        <div>Dashboard</div>
      );
  }
}

export default DashApp;
