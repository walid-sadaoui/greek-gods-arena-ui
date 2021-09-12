import React, { FunctionComponent } from 'react';
import './App.css';
import Loading from './components/common/Loading';
import { useAuth } from './shared/context/AuthContext';

const AuthenticatedApp = React.lazy(
  () => import('./components/app/AuthenticatedApp')
);
const UnauthenticatedApp = React.lazy(
  () => import('./components/app/UnauthenticatedApp')
);

const App: FunctionComponent = () => {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<Loading />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
