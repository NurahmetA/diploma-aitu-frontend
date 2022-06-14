import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/student/';

class StudentService {

    checkStatus() {
        return axios.get(API_URL + "status", { headers: authHeader() });
    }

    getTeams() {
        return axios.get(API_URL + "teams", { headers: authHeader() });
    }

    getTeam() {
        return axios.get(API_URL + "team", { headers: authHeader() });
    }

    getTopics() {
        return axios.get(API_URL + "topics", { headers: authHeader() });
    }

    sendRequestToTopic(topicId) {
        return axios.post(API_URL + "topics/" + topicId + "/request", {}, { headers: authHeader() });
    }

    sendRequestToJoinTeam(teamId) {
        return axios.post(API_URL + "teams/" + teamId + "/request", {}, { headers: authHeader() });
    }

    createTeam(name) {
        return axios.post(API_URL + "teams/create", {name: name}, { headers: authHeader() });
    }

    getRequestToJoinTeam() {
        return axios.get(API_URL + "teams/request",  { headers: authHeader() });
    }

    acceptRequestToJoin(requestId) {
        return axios.post(API_URL + "teams/request/" + requestId + "/accept", {}, { headers: authHeader() });
    }

    deleteMemberFromTeam(memberId) {
        return axios.delete(API_URL + "team/" + memberId + "/removeMember", { headers: authHeader() });
    }

    getSentRequest() {
        return axios.get(API_URL + "teams/request/check",  { headers: authHeader() });
    }
}

export default new StudentService();
