import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import FetchMock from 'react-fetch-mock';

// global setting
window.fetch = new FetchMock(require('./__mocks__')).fetch;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
