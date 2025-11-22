import { create } from 'zustand';

import { LoginResponse } from '../interfaces/loginResponse';
import { AuthState } from '../interfaces/authState';

/**
 * * @description Store de Zustand para manejar el token de acceso.
 * * Se puede hacer tambien desde contexto como eta hecho en el AuthContext.tsx pero a la hora de usarlo fuera de react con en la configuracion de axios, es mejor usar Zustand.
 * * @returns { accessToken, setAccessToken, clearAuth }
 */

export const useAuthStore = create<AuthState>()( 
    (set) => ({
      accessToken: null,
      useReg: null,
      isAuthenticated:  Boolean(sessionStorage.getItem('refreshToken')),

      setAccessToken: (token) => set( () => {
        return { accessToken: token }
      }),

      logout: () => set(() => {
        sessionStorage.removeItem('refreshToken');
        return { accessToken: null, useReg: null, isAuthenticated: false };
      }),

      login: (loginData: LoginResponse) => set(() => {
        if (loginData.accessToken === null) {
          return { useReg: null, accessToken: null, isAuthenticated: false };
        };

        const { accessToken, refreshToken, ...rest } = loginData;

        sessionStorage.setItem('refreshToken', refreshToken);

        return { useReg: rest, accessToken, isAuthenticated: true };
      }),

    }),
);