import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/secretary/';

class SecretaryService {
    addQuestion(teamId, question, grade, students) {
        return axios.post(API_URL + teamId + "/question/create", { description: question, grade: grade, studentIds: students }, {
            headers: authHeader()
        })
    }

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

    getFirstProtocol(userId) {
        return axios.get(API_URL + userId + "/document/protocol-first", { headers: authHeader() })
    }

    getSecondProtocol(userId) {
        return axios.get(API_URL + userId + "/document/protocol-second", { headers: authHeader() })
    }

}

export default new SecretaryService();
