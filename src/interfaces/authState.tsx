import { LoginResponse } from "./loginResponse";
import { UserData } from "./userInterface";

export interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  useReg: UserData | null;
  isAuthenticated: boolean;
  login: (loginData: LoginResponse) => void;
  logout: () => void;
}