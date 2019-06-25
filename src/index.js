import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from './configureStore'


ReactDOM.render(
    <Provider store={configureStore().store}>
        <PersistGate loading={null} persistor={configureStore().persistor}>
            <App test="hello Nick" />
        </PersistGate>
    </Provider>, document.getElementById('root'));
    
// var CrossStorageClient = require('cross-storage').CrossStorageClient;
// var storage = new CrossStorageClient('http://192.168.1.128:3001/hub.html');

// import configureStore from './configureStore'

// var CrossStorageClient = require('cross-storage').CrossStorageClient;
// var storage = new CrossStorageClient('http://192.168.1.128:3001/hub.html');

// var saveCookie = (key, value) => {
//     var setKey = function () { return storage.set(key, value); };
//     storage.onConnect().then(setKey).catch(e => {throw e});
// }



// ReactDOM.render(
// 	<Provider store={configureStore().store}>
//         <PersistGate loading={null} persistor={configureStore().persistor}>
// 			<App saveCookie={saveCookie} loadCookie={loadCookie} />
// 			</PersistGate>
//     </Provider>
// 	, document.getElementById('root'));

//fetch("http://localhost:3000/user_manager/getUsers").then(e => console.log(e))

// ReactDOM.render(<Main saveCookie={saveCookie} loadCookie={loadCookie} />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
