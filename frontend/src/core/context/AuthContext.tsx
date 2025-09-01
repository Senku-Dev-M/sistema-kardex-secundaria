import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthUser {
  id: number;
  role: 'ADMIN' | 'TEACHER';
  username: string;
}

interface AuthContextProps {
  user?: AuthUser;
  token?: string;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(
    localStorage.getItem('token') || undefined
  );
  const [user, setUser] = useState<AuthUser | undefined>(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : undefined;
  });

  const login = (newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(undefined);
    setUser(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

