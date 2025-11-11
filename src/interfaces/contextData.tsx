import { LoginResponse } from "./loginResponse";
import { UserData } from "./userInterface";

export interface ContextDta {
    token: string | null,
    userData: UserData | null,
    logout: () => void,
    login: (loginData: LoginResponse) => void,
    isAuthenticated: boolean,
};