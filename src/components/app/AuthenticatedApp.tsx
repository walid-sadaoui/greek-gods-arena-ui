import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from 'react-router-dom';
import Home from '../../pages/Home';
import { useAuth } from '../../shared/context/AuthContext';
import Button from '../common/Button';

const AuthenticatedApp: FunctionComponent = () => {
  const { logout } = useAuth();
  return (
    <Router>
      <header>
        <Link to='/'>Home</Link>
        <Button value='Logout' onClick={logout} />
      </header>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: FunctionComponent = () => {
  return (
    <Router>
      <Route exact={true} path='/' component={Home} />
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Router>
  );
};

export default AuthenticatedApp;
