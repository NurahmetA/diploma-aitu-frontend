import React, {Component} from "react";
import StudentService from "../../services/student.service";


export default class StudentTeamPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {"":""},
            members: [],
            hasTeam: true
        }

    }

    componentDidMount() {
        StudentService.getTeam().then(res => {
            console.log(res.data)
            if (res) {
                this.setState({
                    team: res.data.team,
                    members: res.data.members
                })
            } else {
                this.setState({
                    hasTeam: false
                })
            }
            console.log(this.state.hasTeam)
        })
    };

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
                {this.state.hasTeam &&
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
            </div>
        );
    }
}
