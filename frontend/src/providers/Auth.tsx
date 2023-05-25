import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

import { Cridentials, ServerError, User } from '@/types';
import { authApi, userApi } from '@/services';
import { restApi } from '@/api';
import { useActions, useEffectOnce } from '@/hooks';
import { Cookies } from '@/utils/constants';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextProps extends AuthState {
  getMe(): Promise<User | undefined>;
  register(data: User): Promise<void>;
  login(cridentials: Cridentials): Promise<void>;
  logout(): void;
}

const { useLoginMutation, useRegisterMutation } = authApi;
const { useLazyGetProfileQuery } = userApi;

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const navigate = useNavigate();

  const dispatch = useActions();

  const { enqueueSnackbar } = useSnackbar();

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(JSON.parse(cookies.get(Cookies.TOKEN) || 'null'));
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Register
   * @param data
   */
  async function handleRegister(data: User) {
    try {
      setIsLoading(true);

      const { token } = await register(data).unwrap();
      cookies.set(Cookies.TOKEN, JSON.stringify(token));

      enqueueSnackbar('Регистрация прошла успешно', { variant: 'success' });

      getMe();
      setToken(token);
      navigate('/profile');
      setIsAuthenticated(true);
    } catch (error) {
      enqueueSnackbar((error as ServerError).data, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Login
   * @param cridentials
   * @returns
   */
  async function handleLogin(cridentials: Cridentials) {
    try {
      setIsLoading(true);

      const { token } = await login(cridentials).unwrap();
      cookies.set(Cookies.TOKEN, JSON.stringify(token));

      getMe();
      setToken(token);
      navigate('/profile');
      setIsAuthenticated(true);
    } catch (error) {
      enqueueSnackbar((error as ServerError).data, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Logout
   */
  async function handleLogout() {
    navigate('/auth/sign-in');
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setTimeout(() => dispatch(restApi.util.resetApiState()), 0);
    cookies.remove(Cookies.TOKEN);
  }

  /**
   * Get user
   * @returns
   */
  async function getMe() {
    try {
      setIsLoading(true);

      const user = await getProfile({}).unwrap();
      setUser(user);

      return user;
    } catch (error) {
      const serverError = error as ServerError;

      if (serverError.status === 401) handleLogout();
      else enqueueSnackbar(serverError.data, { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  }

  useEffectOnce(() => {
    if (!token) return;
    getMe();
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        getMe,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }

  return context;
};

export default AuthProvider;
