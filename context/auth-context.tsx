import React, { createContext, useContext, useState, useCallback } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
});

// Simulated user store
const registeredUsers: { email: string; password: string; name: string; phone: string }[] = [
  { email: 'demo@example.com', password: 'password', name: 'Demo User', phone: '555-0100' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    const found = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setUser({ id: Date.now().toString(), name: found.name, email: found.email, phone: found.phone });
      return true;
    }
    return false;
  }, []);

  const signup = useCallback(async (name: string, email: string, phone: string, password: string) => {
    const exists = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    registeredUsers.push({ email, password, name, phone });
    setUser({ id: Date.now().toString(), name, email, phone });
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
