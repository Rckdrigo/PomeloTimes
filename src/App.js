import React, {Component} from 'react';
import Signin from './components/signin.js'
import Dashboard from './components/dashBoard/dashboard.js';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

class App extends Component {

    render = () => {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/dashboard" component={Dashboard} />
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
