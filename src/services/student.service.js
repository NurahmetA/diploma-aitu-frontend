import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'https://diploma-aitu-backend.herokuapp.com/student/';

class StudentService {
    getTeams() {
        return axios.get(API_URL + "teams", { headers: authHeader()});
    }
}

export default new StudentService();
