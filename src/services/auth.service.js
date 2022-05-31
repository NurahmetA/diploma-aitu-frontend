import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
    login(username, password) {
        return axios.post(API_URL + "login", {
                username,
                password
            })
            .then(response => {
                if (response.data.authenticationToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    if (response.data.role.includes("ROLE_ADMIN")) {
                        window.location.href = "/admin/profile";
                    } else if (response.data.role.includes("ROLE_SECRETARY")) {
                        window.location.href = "/secretary";
                    } else if(response.data.role.includes("ROLE_COMMISSION")) {
                        window.location.href = "/commission/dashboard"
                    } else {
                        window.location.href = "/profile";
                    }
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        window.location.href = "/auth";
    }

    register(firstName, lastName, middleName, email, username, password) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            middleName,
            email,
            username,
            password
        }).then(response => {
            window.location.assign("http://localhost:3000/auth");
            return response.data;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authenticationToken) {
        return { Authorization: 'Bearer ' + user.authenticationToken,
            "Access-Control-Allow-Origin":"http://localhost:8081" }; // for Spring Boot back-end
        // return { 'x-access-token': user.authenticationToken,
        //};       // for Node.js Express back-end
    } else {
        return {};
    }
}

