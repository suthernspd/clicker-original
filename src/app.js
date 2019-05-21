// install -> import -> use
import React from 'react';
import ReactDOM from 'react-dom';
import Clicker from './components/Clicker';

import 'normalize.css/normalize.css';
import './styles/styles.scss';


ReactDOM.render(<Clicker />, document.getElementById('app'));