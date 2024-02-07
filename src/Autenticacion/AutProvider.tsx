import React, { createContext, useContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, User, parqueadero } from "../types/types";
import { API_URL } from "../Autenticacion/constanst";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<ExtendedAuthContext>({
  esAutentico: false,
  getAccessToken: () => "",
  saveUser: (userData: AuthResponse) => {},
  getRefreshToken: () => null,
  getUser: () => ({} as User | undefined),
  signOut: () => {},
  getParqueadero: () => ({} as parqueadero | undefined),
  createParqueadero: (newParqueadero: parqueadero) => {},
  roles: [], // Add this line
});

interface ExtendedAuthContext {
  esAutentico: boolean;
  getAccessToken: () => string;
  saveUser: (userData: AuthResponse) => void;
  getRefreshToken: () => string | null;
  getUser: () => User | undefined;
  signOut: () => void;
  getParqueadero: () => parqueadero | undefined;
  createParqueadero: (newParqueadero: parqueadero) => void;
  roles: string[]; // Add this line
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [esAutentico, setEsAutentico] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [parqueadero, setParqueadero] = useState<parqueadero | undefined>();

  useEffect(() => {
    checkAuth();
  }, []);

  async function requestNewAccessToken(refreshToken: string) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json() as AccessTokenResponse;

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken; // Corrected property name here
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    if (accessToken) {
      const userInfo = await getUserInfo(accessToken);
      if (userInfo) {
        saveSessionInfo(userInfo.user, accessToken, getRefreshToken()!, userInfo.roles || []);
        setIsLoading(false);
        return;
      }
    } else {
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionInfo(userInfo.user, newAccessToken, token, userInfo.roles || []);
            setIsLoading(false);
            return;
          }
        }
      }
    }
    setIsLoading(false);
  }

  function signOut() {
    setEsAutentico(false);
    setAccessToken("");
    setUser(undefined);
    localStorage.removeItem("token");
  }

  function saveSessionInfo(userInfo: User, accessToken: string, refreshToken: string, roles: string[]) {
    setAccessToken(accessToken);
    localStorage.setItem('token', JSON.stringify(refreshToken));
    setEsAutentico(true);

    // Modificar la línea siguiente para incluir el rol en el objeto del usuario
    setUser({ ...userInfo, roles: roles || [] });
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }
    return null;
  }

  function saveUser(userData: AuthResponse) {
    saveSessionInfo(
      userData.body.user,
      userData.body.accessToken,
      userData.body.refreshToken,
      userData.body.user.roles || []
    );
  }

  function saveParqueadero(parqueaderoData: AuthResponse) {
    setParqueadero(parqueaderoData.body.parqueadero);
  }

  function getParqueadero() {
    return parqueadero;
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider value={{ esAutentico, getAccessToken, saveUser, getRefreshToken, getUser, signOut, getParqueadero }}>
      {isLoading ? <div>Cargando...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext) as ExtendedAuthContext;
