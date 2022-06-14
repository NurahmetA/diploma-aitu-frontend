import {Component} from "react";
import StudentService from "../../services/student.service";

export default class StudentDashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            isMember: false
        }

    }

    componentDidMount() {
        StudentService.getTeams().then(res => {
            this.setState({
                teams: res.data
            })
        });
        if (this.state.teams) this.hasTeam();
    };

    hasTeam() {
        StudentService.checkStatus().then(res => {
            this.setState({
                isMember: res.data.isTeamMember
            })
        });
    }

    listTeams = () =>
        this.state.teams.map((team, index) => (
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{++index}. Team: {team.name} </h5>
                        <h6 className="card-subtitle mb-2 text-muted">Topic: {team.topic}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Advisor: {team.advisor}</h6>
                    </div>
                    {this.state.isMember &&
                        <button className="btn btn-outline-success h-50" onClick={() => this.sendRequestToJoin(team.id)}>Join</button>
                    }
                </div>
            </div>
        ));

    sendRequestToJoin(teamId) {
        StudentService.sendRequestToJoinTeam(teamId).then(res => {
            if (res) {
                console.log(teamId);
            }
        })
    }


    render() {
        return (
            <div className="container">
                {this.listTeams()}
            </div>
        );
    }
}
