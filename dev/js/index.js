import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Route } from 'react-router';
import { BrowserRouter, Switch, Link } from 'react-router-dom';
//import thunk from 'redux-thunk';
//import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import PartyListManager from './containers/PartyListManager';
import PartyList from './containers/PartyList';
import { install } from 'redux-loop';
import { initializeFirebase } from './firebase';
import firebase from 'firebase';
import { reactReduxFirebase } from 'react-redux-firebase';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../scss/style.scss';

// https://github.com/redux-loop/redux-loop/blob/master/example/src/index.js
// https://redux-loop.js.org/docs/api-docs/cmds.html#cmdactionactiontodispatch
// https://github.com/prescottprue/react-redux-firebase
// https://github.com/prescottprue/react-redux-firebase/blob/master/examples/complete/material/project.config.js
// https://any-api.com/

const rrfConfig = {
  userProfile: 'users', // root that user profiles are written to
  enableLogging: true, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false // enable/disable updating of profile on login
};

initializeFirebase();

const logger = createLogger();
const enhancer = compose(applyMiddleware(logger), install());

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig)
)(createStore);

const store = createStoreWithFirebase(allReducers, {}, enhancer);

//authenticate();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="document-grid">
        <Navbar color="faded" light expand="md" className="nav-bar-grid-item">
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <div className="page-grid-item">
          <Switch>
            <Route exact path="/" component={PartyListManager} />
            <Route exact path="/party-list/:id" component={PartyList} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
