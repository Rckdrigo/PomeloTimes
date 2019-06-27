import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var CrossStorageClient = require('cross-storage').CrossStorageClient;
var storage = new CrossStorageClient('http://localhost:3001/hub.html');

var saveCookie = (key, value) => {
    var setKey = function () { return storage.set(key, value); };
    storage.onConnect().then(setKey).catch(e => {throw e});
}
async function loadCookie(key) {
    var getKey = function () { return storage.get(key); };
    var value;
    await storage.onConnect().then(getKey)
        .then(e=>value=e)
        .catch(e => {throw e});
    return value;
}


ReactDOM.render(<App saveCookie={saveCookie} loadCookie={loadCookie} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
