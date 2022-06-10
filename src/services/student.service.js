import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/student/';

class StudentService {
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

    createTeam(name, topicId, adviserId, choices) {
        return axios.post(API_URL + "teams/create",
            {name: name, topicId: topicId,
                adviserId: adviserId, choices: choices},
            { headers: authHeader() });
    }
}

export default new StudentService();
