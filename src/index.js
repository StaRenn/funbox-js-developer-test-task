import React from 'react';
import {render} from 'react-dom';
import App from './components/App';
import "./main.sass";
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

render(<App />, document.querySelector('body'));