import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import Feed from './components/pages/Feed';
import Submit from './components/pages/Submit';
import Navigation from './components/Navigation';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route path="/" component={Navigation} />
      <Route path="/" exact component={App} />
      <Route path="/login" component={LoginPage} />
      <Route path="/submit" component={Submit} />
      <Route path="/feed" component={Feed} />
      <Route path="/register" component={RegistrationPage} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.register();
