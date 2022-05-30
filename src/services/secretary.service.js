import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/secretary/';

class SecretaryService {
    getDefences() {
        return axios.get(API_URL + "defence", { headers: authHeader() })
    }

    getDefence(defenceId) {
        return axios.get(API_URL + "defence/" + defenceId, { headers: authHeader() })
    }

    getGrades(defenceId) {
        return axios.get(API_URL + defenceId + "/grades", { headers: authHeader() })
    }

    setGrade(defenceId, userId, grade) {
        return axios.post(API_URL + defenceId + "/grades/set-grade/" + userId, { grade: grade }, { headers : authHeader() })
    }

    getDocument(userId) {
        return axios.get(API_URL + userId + "/document", { headers: authHeader() })
    }

}

export default new SecretaryService();
