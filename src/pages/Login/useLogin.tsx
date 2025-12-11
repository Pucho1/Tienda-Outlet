import { useNavigate } from 'react-router';

import AuthService from '../../service/AuthService';
import { LoginResponse } from '../../interfaces/loginResponse';
import { useAuthStore } from '../../store/authZustandStore';

const useLogin = () => {

	const navegate = useNavigate();
  	const { login, setAccessToken } = useAuthStore();

	const authSuccess = ( loginResponse: LoginResponse ) => {
		login(loginResponse);
		navegate("/products-list");
	};
	
	const handleSubmit = (e: React.FormEvent, email: string, password: string) => {
		e.preventDefault();

		AuthService()
			.login(email, password)
			.then(res => {
				authSuccess(res.data ?? '');
				setAccessToken(res.data.token);
			})
			.catch(err => {
				console.error('Error:', err.response ? err.response.data : err.message);
			});
	};

  return { handleSubmit };
};

export default useLogin;
