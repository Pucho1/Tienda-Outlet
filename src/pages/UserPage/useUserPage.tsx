import useSWR from "swr";

import UserService from "../../service/UserService";
import { UserData } from "../../interfaces/userInterface";
import { useAuthStore } from "../../store/authZustandStore";


const fetcher = async (): Promise<UserData> =>  {
	const response = await UserService().getUser();
	return response.data;
};

const useUserPage = () => {
	const { isAuthenticated, useReg } = useAuthStore.getState();


	
	const { data: userData, error, isLoading } = useSWR<UserData>(

		( isAuthenticated && !useReg ) ? '/auth/me' : null,
		fetcher
	);
	
  return {
		userData: useReg || userData,
		isLoading,
		error,
  };
};

export default useUserPage;