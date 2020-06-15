/*eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';
import registerServiceWorker from './registerServiceWorker';
import "core-js/stable";
import "regenerator-runtime/runtime";

const store = configureStore();

render(
    <Provider store={store}>
        <BrowserRouter>
          <div>
            <Routes />
          </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);

registerServiceWorker();
