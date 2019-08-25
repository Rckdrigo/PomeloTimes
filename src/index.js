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
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root'));

