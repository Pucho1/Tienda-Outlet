/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

import { LoginResponse } from '../interfaces/loginResponse';
import { ContextDta } from '../interfaces/contextData';
import { UserData } from '../interfaces/userInterface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [useReg, setUserReg] = useState<UserData |  null>(null);
	
  const [ accessToken, setAccessToken ] = useState<string  | null>( null );

  const [isRefreshToken, setIsRefreshToken] = useState<boolean>(
    Boolean( sessionStorage.getItem('refreshToken') ) 
  );


//  function getCookie(cname: string) {

//     const name = `${cname}=`;

//     const decodedCookie = decodeURIComponent(document.cookie);

//     const ca = decodedCookie.split(';');

//     for (let i = 0; i < ca.length; i += 1) {
//       let c = ca[i];
//       while (c.charAt(0) === ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) === 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return '';
//   }


/**
 * * @description escucha si se ha gestionado el tokent desde otras pestannas
 */
  useEffect(() => {

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        const token = event.newValue;
  
        if (token) {
          // login({ token });
          // tendria que obtener el usuariuo desde el backend para setearlo en el context
        } else  logout() 
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

	/**
   * @param accessToken Ojeto que contiene el token de acceso
   * @returns setea el token en las cookies y en el sessionStorage
   */
  const setToken = async (refreshToken: string, accessToken: string ): Promise<void>  => {
    // const now = new Date();
    // const minutos = 12 * 60;
    // now.setTime(now.getTime() + minutos);
    // document.cookie = `token=${accessToken}; expires=${now.toUTCString()};path=/;`;

    sessionStorage.setItem('accessToken', accessToken) 
    sessionStorage.setItem('refreshToken', refreshToken);
    setAccessToken(accessToken);
  };

  const logout = (): void => {
    setIsRefreshToken(false);
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
  };

  const login = ( loginData: LoginResponse ): void => {
    if (loginData.accessToken === null) return;

    const { accessToken, refreshToken, ...rest } = loginData;

    setUserReg(rest);
    setToken( refreshToken, accessToken );
    setIsRefreshToken(true);
  };

  const valueContext: ContextDta = {
		token: accessToken,
    userData: useReg,
    logout,
    login,
    isAuthenticated: isRefreshToken,
  };

  return (
    <AuthContext.Provider value={ valueContext }>{ children }</AuthContext.Provider>
  );
};

export function useAuthStore() {
  return useContext(AuthContext);
}