import { useGoogleLogin } from '@react-oauth/google';
import { useAuthStore } from './authStore';
import axios from 'axios';

function useLogin() {
    const loginUser = useAuthStore(state => state.loginUser);

    return useGoogleLogin({
        onSuccess: async tokenResponse => {
            console.log(tokenResponse);
            const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                .then(res => res.data);

            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/make-user/`, {
                UserID: userInfo.sub,
            });

            if (res.status === 200) {
                loginUser(userInfo)
                console.log(res.data);
            } else {
                alert('Error logging in');
            }
        },
    });
}

export default useLogin;