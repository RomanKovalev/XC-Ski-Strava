import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const container = document.getElementById('athlete-profile');

const app = document.createElement('div');

app.id = 'root';
app.className = "card";

if (container) container.parentNode.insertBefore(app, container.nextSibling)

ReactDOM.render(<App />, document.getElementById('root'));
