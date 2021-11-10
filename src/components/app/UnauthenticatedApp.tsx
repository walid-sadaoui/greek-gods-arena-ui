import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import SignUp from 'pages/SignUp';
import LogIn from 'pages/LogIn';
import UnauthenticatedHeader from './Header/UnauthenticatedHeader';

const UnauthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <UnauthenticatedHeader />
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <Switch>
      <Route exact={true} path='/signup' component={SignUp} />
      <Route exact={true} path='/login' component={LogIn} />
      <Route path='*'>
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
};

export default UnauthenticatedApp;
