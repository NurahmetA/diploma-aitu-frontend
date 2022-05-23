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

    getCommission() {
        return axios.get(API_URL + "commission", { headers: authHeader() });
    }

    getStage() {
        return axios.get(API_URL + "stage",{ headers: authHeader() });
    }

    setDefenceDate(id, date, commissions, stage) {
        return axios.post(API_URL + id + "/defence/create", {
            headers: authHeader(),
            body: {
                defenceDate: date,
                commissions: commissions,
                stageId: stage
            }
        });
    }
}

export default new AdminService();
