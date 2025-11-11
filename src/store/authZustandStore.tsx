import { create } from 'zustand';
import { UserData } from '../interfaces/userInterface';
import { LoginResponse } from '../interfaces/loginResponse';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  useReg: UserData | null;
  isAuthenticated: boolean;
  login: (loginData: LoginResponse) => void;
  logout: () => void;
}


/**
 * * @description Store de Zustand para manejar el token de acceso.
 * * Se puede hacer tambien desde contexto como eta hecho en el AuthContext.tsx pero a la hora de usarlo fuera de react con en la configuracion de axios, es mejor usar Zustand.
 * * @returns { accessToken, setAccessToken, clearAuth }
 */

export const useAuthStore = create<AuthState>()( 
  // persist ( //--agrego persistencia al store de zustand--
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
    // ------> si quiero agregar persistencia directamente en el store de zustand, lo hago así:
    // {
    //   name: 'authStorage', // unique name
    //   // getStorage: () => sessionStorage, // (default) by using sessionStorage instead of localStorage
    // }
  // )
);