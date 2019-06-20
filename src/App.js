import React, {Component} from 'react';
import logo from './logo.svg';

import CookieReader from './CookieReader'

import './App.css';

import Signin from './components/signin.js'
import Dashboard from './components/dashBoard/dashboard.js';
import Main from './components/main/main.js';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {

    render = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <BrowserRouter>
                        <div className="App">
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/" component={Signin} />
                                <Route component={Main} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                    <CookieReader saveCookie={this.props.saveCookie} loadCookie={this.props.loadCookie}/>
                </header>
            </div>
        );
    }
}

{/* <CookieReader saveCookie={this.props.saveCookie} loadCookie={this.props.loadCookie}/> */}
export default App;
