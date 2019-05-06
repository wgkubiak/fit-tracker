import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Proteges from '../src/scripts/Proteges';
import Measures from '../src/scripts/Measures';
import Daily from '../src/scripts/Daily';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Proteges />, document.getElementById('proteges'));
ReactDOM.render(<Measures />, document.getElementById('measures'));
ReactDOM.render(<Daily />, document.getElementById('daily'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
