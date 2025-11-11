import { AxiosResponse } from "axios";
import axs from "../api/axiosCustom";
import { UserData } from "../interfaces/userInterface";

const UserService = () => {

  /**
   * Fetches the user data from the server.
   * @returns {Promise<AxiosResponse<UserData>>} A promise that resolves to the user data.
   */
  const getUser = (): Promise<AxiosResponse<UserData>> => {
    
    // const accessToken = sessionStorage.getItem("accessToken");

    return axs.get<UserData>(`/auth/me`);
  };
  
  return { getUser };
};

export default UserService;