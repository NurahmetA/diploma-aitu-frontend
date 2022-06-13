import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/student/';

class StudentService {
    getTeams() {
        return axios.get(API_URL + "teams", { headers: authHeader()});
    }
}

export default new StudentService();
