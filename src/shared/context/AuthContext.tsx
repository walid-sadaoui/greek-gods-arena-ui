import React from 'react';
import { APIResponse, postRequest, ResponseData } from 'api';
import { getCurrentUser } from 'api/users';
import Loading from 'components/common/Loading';
import { User } from 'models/User';

interface LoginFormValues {
  email: string;
  password: string;
}

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

interface LogInData extends ResponseData {
  user: User;
  token: string;
  refreshToken: string;
}

interface SignUpData extends ResponseData {
  user: User;
}

type AuthContextProps = {
  user: User | undefined;
  getUser: () => User;
  logout: () => void;
  login: (newUser: LoginFormValues) => Promise<string | undefined>;
  signup: (newUser: SignupFormValues) => Promise<string | undefined>;
  updateUserState: () => Promise<void>;
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
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const updateUserState = async (): Promise<void> => {
    try {
      const { data, error } = await getCurrentUser();
      if (data) {
        setUser(data.user);
      }
      if (error) {
        console.log('/me : ', error);
        if (error.message === 'jwt expired') setUser(undefined);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUser = (): User => {
    if (user === undefined) throw new Error('User is not authenticated');
    return user;
  };

  const signup = async (
    newUser: SignupFormValues
  ): Promise<string | undefined> => {
    const { error }: APIResponse<SignUpData> = await postRequest<SignUpData>(
      '/signup',
      JSON.stringify(newUser)
    );
    if (error) return error.message;
  };

  const login = async (
    newUser: LoginFormValues
  ): Promise<string | undefined> => {
    const { data, error }: APIResponse<LogInData> =
      await postRequest<LogInData>('/login', JSON.stringify(newUser));
    if (data) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUser(data.user);
    }
    if (error) return error.message;
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(undefined);
  };

  React.useEffect(() => {
    updateUserState();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ user, getUser, signup, login, logout, updateUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
