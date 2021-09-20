import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from 'react-router-dom';
import SignUp from '../../pages/SignUp';
import LogIn from '../../pages/LogIn';

const UnauthenticatedApp: FunctionComponent = () => {
  return (
    <Router>
      <header>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </header>
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
