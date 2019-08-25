import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Container} from 'react-bootstrap';

import HomePage from './views/homePage';
import Article from './views/article';

import './App.css';

class App extends Component {

    render = () => {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/article/:id" component={Article}/>
                        <Route path="/" component={HomePage}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default App;
