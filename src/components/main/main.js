import React, {Component} from 'react';



class Main extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render = () => {
      return (
        <div><h1>Hiii</h1></div>
      );
  }
}

export default Main;
