import { useNavigate } from 'react-router';

import AuthService from '../../service/AuthService';
import { LoginResponse } from '../../interfaces/loginResponse';
import { useAuthStore } from '../../store/authZustandStore';

const useLogin = () => {

	const navegate = useNavigate();
  	// const authStore = useAuthStore();
	// const setAccessToken = useTokenStore((s) => s.setAccessToken);

	const authSuccess = ( loginResponse: LoginResponse ) => {

		useAuthStore.getState().login(loginResponse);
		navegate("/products-list");
	};
	
	const handleSubmit = (e: React.FormEvent, email: string, password: string) => {
		e.preventDefault();

		AuthService()
			.login(email, password)
			.then(res => {
				if (res.status !== 200) {
					throw new Error('Error en la respuesta del servidor');
				}
				authSuccess(res.data ?? '');
				// setAccessToken(res.data.accessToken);
			})
			.catch(err => {
				console.error('Error:', err.response ? err.response.data : err.message);
			});
	};

  return { handleSubmit };
};

export default useLogin;
