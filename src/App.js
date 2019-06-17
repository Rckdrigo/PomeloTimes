import React, {Component} from 'react';
import 'antd/dist/antd.css';
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
                        <Route path="/" component={Signin} />
                        <Route path="/dashboard" component={Dashboard} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
