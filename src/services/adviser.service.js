import axios from 'axios';
import {authHeader} from "./auth.service";

const API_URL = 'http://localhost:8080/advisor/';

class AdviserService {
    getConfirmedTopics() {
        return axios.get(API_URL + "topics/confirmed", { headers: authHeader() });
    }

    getUnconfirmedTopics() {
        return axios.get(API_URL + "topics/unconfirmed", { headers: authHeader() });
    }

    createTopic(name) {
        return axios.post(API_URL + "topics/create", { name: name }, { headers: authHeader() });
    }

    updateTopic(name) {
        return axios.put(API_URL + "topics/update", { name: name }, { headers: authHeader() });
    }

    getTopic(id) {
        return axios.get(API_URL + "topics/" + id, { headers: authHeader() });
    }

    getRequests(topicId) {
        return axios.get(API_URL + topicId + "/requests", { headers: authHeader() });
    }

    getRequest(topicId, requestId) {
        return axios.get(API_URL + topicId + "/requests/" + requestId, { headers: authHeader() });
    }

    acceptRequest(topicId, requestId) {
        return axios.post(API_URL + topicId + "/requests/" + requestId, {},{ headers: authHeader() });
    }

    deleteTopic(id) {
        return axios.delete(API_URL + "topics/" + id, { headers: authHeader() });
    }
}

export default new AdviserService();
