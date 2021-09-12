import React from 'react';
import { APIResponse, getRequest, postRequest } from '../../api';
import Loading from '../../components/common/Loading';
import { User } from '../../models/User';

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

interface ResponseData {
  code: number;
  message: string;
}

interface LogInData extends ResponseData {
  user: User;
  token: string;
  refreshToken: string;
}

interface SignUpData extends ResponseData {
  user: User;
}

interface GetUserData extends ResponseData {
  user: User;
}

type AuthContextProps = {
  user: Partial<User> | undefined;
  logout: () => void;
  login: (newUser: LoginFormValues) => Promise<string | undefined>;
  signup: (newUser: SignupFormValues) => Promise<string | undefined>;
};

const AuthContext = React.createContext<AuthContextProps | undefined>(
  undefined
);

const useAuth = (): AuthContextProps => {
  const authContext = React.useContext(AuthContext);
  if (authContext === undefined)
    throw new Error('useAuth must be used within an AuthProvider');
  return authContext;
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<Partial<User> | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const getCurrentUser = async (): Promise<void> => {
    try {
      const getUserResponse = await getRequest<GetUserData>('/me');
      console.log('/me : ', getUserResponse);
      if (getUserResponse.data) {
        setUser(getUserResponse.data.user);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const signup = async (
    newUser: SignupFormValues
  ): Promise<string | undefined> => {
    const signUpResponse: APIResponse<SignUpData> =
      await postRequest<SignUpData>('/signup', JSON.stringify(newUser));
    if (signUpResponse.error) {
      return signUpResponse.error.message;
    }
  };

  const login = async (
    newUser: LoginFormValues
  ): Promise<string | undefined> => {
    const logInResponse: APIResponse<LogInData> = await postRequest<LogInData>(
      '/login',
      JSON.stringify(newUser)
    );
    console.log(logInResponse);
    if (logInResponse.data) {
      localStorage.setItem('token', logInResponse.data.token);
      localStorage.setItem('refreshToken', logInResponse.data.refreshToken);
      setUser(logInResponse.data.user);
    }
    if (logInResponse.error) {
      return logInResponse.error.message;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(undefined);
  };

  React.useEffect(() => {
    getCurrentUser();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
