import axios from './CustomAxios';
import {toast} from 'react-toastify';

class AuthService {
    login = async (username, password, setUser) => {
        await axios
            .post("api/auth/login", {
                username,
                password
            })
            .then(async response => {
                if (response.data.token) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    setUser(response.data.user);
                    toast("Logged In successfully", {type: 'success'});
                }
            },
                async error => {
                    toast(`Authentication failed. ${error.response.data.message}`, {type: 'error'});
                }
            );
    };

    signup = (username, password, role) => {
        axios
            .post("api/auth/signup", {
              username,
              password,
              role
            }).then(async response => {
                    toast("Signed up successfully. Please login with your credentials", {type: 'success'});
                },
                async error => {
                    toast(`Sign up failed. ${error.response.data.message}`, {type: 'error'});
                }
            );
    }

    getToken = () => {
        return JSON.parse(localStorage.getItem('token'));
    }

    checkToken = async (setUser) => {
        await axios.post("api/auth/checkToken")
            .then(async response => {
                    if (response.data.token) {
                        localStorage.setItem("token", JSON.stringify(response.data.token));
                        setUser(response.data.user);
                    }
                },
                async error => {
                    setUser({});
                    localStorage.removeItem("token");
                    toast("Authentication with server failed. Please log in again", {type: 'error'});
                }
            );
    }

    logout = (setUser) => {
        localStorage.removeItem("token");
        setUser({});
        toast("Logged out successfully", {type: 'success'})
    }
}

export default new AuthService();
