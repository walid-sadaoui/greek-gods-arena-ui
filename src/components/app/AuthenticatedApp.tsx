import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
} from 'react-router-dom';
import Arena from '../../pages/Arena';
import Home from '../../pages/Home';
import Lobby from '../../pages/Lobby';
import Room from '../../pages/Room';
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
      <Route exact={true} path='/lobby' component={Lobby} />
      <Route exact={true} path='/room'>
        <Room />
      </Route>
      <Route path='/arena/:id'>
        <Arena />
      </Route>
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Router>
  );
};

export default AuthenticatedApp;
