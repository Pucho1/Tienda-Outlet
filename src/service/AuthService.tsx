import { AxiosResponse } from "axios";
import axs from "../api/axiosCustom";
import { LoginResponse } from "../interfaces/loginResponse";

const AuthService = () => {

  const login = ( username: string, password: string ): Promise<AxiosResponse> => {
    return axs.post<LoginResponse>(`auth/login`, {  username, password })
  };

  return{ login }
};
 
export default AuthService;