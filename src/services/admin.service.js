import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/admin/';

class AdminService {
    getTeams() {
        return axios.get(API_URL + "team", { headers: authHeader() });
    }

    getTeam(id) {
        return axios.get(API_URL + "team/" + id, { headers: authHeader() });
    }
}

export default new AdminService();
