import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from 'react-router-dom';
import Profile from 'pages/Profile';
import Arena from 'pages/Arena';
import Home from 'pages/Home';
import Lobby from 'pages/Lobby';
import Room from 'pages/Room';
import AuthenticatedHeader from './Header/AuthenticatedHeader';
import Main from 'pages/Main';

const AuthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <AuthenticatedHeader />
        <Home />
      </Route>
      <Route exact={true} path='/main'>
        <AuthenticatedHeader />
        <Main />
      </Route>
      <Route exact={true} path='/lobby'>
        <AuthenticatedHeader />
        <Lobby />
      </Route>
      <Route exact={true} path='/room'>
        <Room />
      </Route>
      <Route path='/arena/:id'>
        <Arena />
      </Route>
      <Route path='/profile'>
        <AuthenticatedHeader />
        <Profile />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default AuthenticatedApp;
