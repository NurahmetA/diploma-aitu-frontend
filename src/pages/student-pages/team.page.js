import React, {Component} from "react";
import StudentService from "../../services/student.service";


export default class StudentTeamPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {"":""},
            members: [],
            hasError: false
        }

    }

    componentDidMount() {
        StudentService.getTeam().then(res => {
            if (res) {
                this.setState({
                    team: res.data.team,
                    members: res.data.members
                })
            }
        })
    };

    static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
    }

    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <p className="card-text d-flex justify-content-between">
                    Team Member #{++index}: {member.first_name} {member.last_name} <a
                    href={"mailto:" + member.email}>{member.email}</a>
                </p>
                <hr/>
            </div>
        ));


    render() {
        return (
            <div className="container">
                {this.state.hasError &&
                    <div className="card mb-5">
                        <div className="card-body">
                            <h5 className="card-title">Team: {this.state.team.name} </h5>
                            <h6 className="card-subtitle mb-2 text-muted">Project Topic: {this.state.team.topic} </h6>
                            <h6 className="card-subtitle mb-2 text-muted">Team Adviser: {this.state.team.adviser} </h6>
                            <hr/>
                            {this.getListMembers()}
                        </div>
                    </div>
                }
                {!this.state.hasError &&
                <div className="card mb-5">
                    <div className="card-body">
                        <h5 className="card-title">Create Team</h5>
                        <hr/>
                        <div className="d-flex justify-content-between">
                            <label htmlFor="teamName" className=" card-text">Team Name:</label>
                            <input id="teamName" className="input-field w-75" />
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}
