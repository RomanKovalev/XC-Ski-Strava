import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import { Provider } from "react-redux";
import store from './store'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App /> // можно обернуть errorboundry - ОТлавливать ошибки в компонентах
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
