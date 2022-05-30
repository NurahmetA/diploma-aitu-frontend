import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/secretary/';

class SecretaryService {
    getDefences() {
        return axios.get(API_URL + "defence", { headers: authHeader() })
    }

}

export default new SecretaryService();
