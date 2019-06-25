import React, {Component} from 'react';
import Signin from './components/signin.js'
import Dashboard from './components/dashBoard/dashboard.js';
import Main from './components/main/main.js';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {

    render = () => {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/dashboard" render={
                            (props) => <Dashboard {...props} 
                                saveCookie={this.props.saveCookie}
                                loadCookie={this.props.loadCookie} /> 
                        } />
                        <Route path="/" component={Signin} />
                        <Route component={Signin} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

{/* <CookieReader saveCookie={this.props.saveCookie} loadCookie={this.props.loadCookie}/> */}
export default App;
