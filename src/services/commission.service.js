import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/commission/';

class CommissionService {
    getDefences() {
        return axios.get(API_URL, { headers: authHeader() })
    }

    getDefence(id) {
        return axios.get(API_URL + id, { headers: authHeader() })
    }

    addQuestion(defenceId, question, students) {
        return axios.post(API_URL + defenceId + "/question/create", { description: question, studentIds: students }, { headers: authHeader() })
    }

    getGrades(defenceId) {
        return axios.get(API_URL + defenceId + "/grades", { headers: authHeader() })
    }

    getDocument(defenceId) {
        return axios.get(API_URL + defenceId + "/document", { headers: authHeader() })
    }

    setGrade(defenceId, studentId, grade) {
        return axios.post(API_URL + defenceId + "/set-grade/" + studentId, { grade: grade }, { headers: authHeader() })
    }

    updateQuestion(questionId, question) {
        return axios.put(API_URL + questionId + "/question/update", { description: question }, { headers: authHeader() })
    }
}

export default new CommissionService();
