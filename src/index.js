import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
// import Main from './components/main/main';
import App from './App'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './configureStore'

var CrossStorageClient = require('cross-storage').CrossStorageClient;
var storage = new CrossStorageClient('http://192.168.1.128:3001/hub.html');

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


ReactDOM.render(
	<Provider store={configureStore().store}>
        <PersistGate loading={null} persistor={configureStore().persistor}>
			<App saveCookie={saveCookie} loadCookie={loadCookie} />
			</PersistGate>
    </Provider>
	, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
