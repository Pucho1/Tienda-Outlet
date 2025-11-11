import { UserData } from "./userInterface";

export interface LoginResponse extends UserData {
    accessToken: string | null;
    refreshToken: string ;
};