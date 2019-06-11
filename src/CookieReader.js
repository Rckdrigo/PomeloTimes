import React, { Component } from 'react';

export default class CookieReader extends Component {

    state = {
        data: "Data transfered"
    }

    componentDidMount = () => {
        this.props.saveCookie('test', 'Hello world');
        this.props.loadCookie('test').then(e => console.log(e))
    }

    render = () => {
        return (
            <div></div>
        )
    }

}