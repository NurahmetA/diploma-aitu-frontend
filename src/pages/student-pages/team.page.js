import React, {Component} from "react";
import StudentService from "../../services/student.service";
import CreateTeamComponent from "../../components/create-team.component";

export default class StudentTeamPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: {"":""},
            members: [],
            users: [],
            requests: [],
            isCreator: false,
            isMember: false
        }

    }

    componentDidMount() {
        StudentService.checkStatus().then(res => {
            this.setState({
                isCreator: res.data.isTeamCreator,
                isMember: res.data.isTeamMember
            });
            if (res.data.isTeamCreator) {
                this.teamInfo();
            } else if (res.data.isTeamMember) {
                this.requestInfo();
            } else {
                StudentService.getSentRequest().then(res => {
                    if(res) {
                        this.setState({
                            requests: res.data
                        });
                    }
                })
            }
        });
    };

    requestInfo() {
        StudentService.getTeam().then(res => {
            if (res) {
                this.setState({
                    team: res.data.team,
                    members: res.data.members
                });
            }
        });
    }

    teamInfo() {
        StudentService.getTeam().then(res => {
            if (res) {
                this.setState({
                    team: res.data.team,
                    members: res.data.members
                });
            }
        });
        StudentService.getRequestToJoinTeam().then(res => {
            if (res.data) {
                this.setState({
                    users: res.data
                })
            }
        });
    }


    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <div className="d-flex justify-content-between">
                    <h5 className="card-text d-flex justify-content-between text-muted">
                        Team Member #{++index}: {member.first_name} {member.last_name} <a
                        href={"mailto:" + member.email}>{member.email}</a>
                    </h5>
                    {this.state.isTeamCreator &&
                        <button className="btn btn-outline-danger" onClick={() => this.deleteMember(member.id)}>Delete</button>
                    }
                </div>
                <hr/>
            </div>
        ));

    deleteMember(memberId) {
        StudentService.deleteMemberFromTeam(memberId).then(res => {
            if (res) window.location.reload();
        })
    }

    getRequests = () =>
        this.state.users.map((user, index) => (
            <div>
                <div className="d-flex justify-content-between align-content-center">
                    <div>
                        <h5 className="card-title">Request #{++index}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Student: {user.user.last_name} {user.user.first_name}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Email: {user.user.email ? user.user.email : "Not given"}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Attesstate: {user.user.isHonor ? "red" : "blue"}</h6>
                    </div>
                    <button className="btn btn-outline-primary h-50 align-self-center"
                            onClick={() => this.acceptRequestToJoin(user.id)}>Accept</button>
                </div>
                <hr/>
            </div>
        ));

    acceptRequestToJoin(requestId) {
        StudentService.acceptRequestToJoin(requestId).then(res => {
            if (res) window.location.reload();
        })
    }

    hasTopicAndAdviser() {
        let hasTopic = !!this.state.team.topic;
        let hasAdviser = !!this.state.team.adviser;

        return (
            <div>
                {hasTopic && <h6 className="card-title mb-2 ">Project Topic: {this.state.team.topic} </h6>}
                {hasAdviser && <h6 className="card-title mb-2 ">Team Adviser: {this.state.team.adviser} </h6>}
            </div>
        );
    }

    listSentRequests = () =>
        this.state.requests.map((request, index) => (
            <div className={request.request.accepted ? "accepted" : "not-accepted"}>
                <h5 className="card-title">Request #{++index}</h5>
                <div className={"d-flex justify-content-between align-content-center "}>
                    <h6 className="card-subtitle mb-2 text-muted">Team: {request.team.name}</h6>
                </div>
                <hr/>
            </div>
        ));

    render() {
        return (
            <div className="container">
                <h2>Team</h2>
                {this.state.isMember &&
                    <div className="card">
                        <div className="card-body">
                            {this.hasTopicAndAdviser()}
                            {this.getListMembers()}
                        </div>
                    </div>
                }
                {!this.state.isCreator && !this.state.isMember &&
                <div className="card mb-5">
                    <div className="card-body">
                        <CreateTeamComponent/>
                    </div>
                </div>
                }
                {!this.state.isCreator && !this.state.isMember &&
                <div>
                    <h2>My Requests</h2>
                    <div className="card ">
                        <div className="card-body">
                            <div className="card-body">
                                {this.listSentRequests()}
                            </div>
                        </div>
                    </div>
                </div>
                }
                {this.state.isCreator &&
                    <div>
                        <h2>Requests</h2>
                        <div className="card ">
                            <div className="card-body">
                                <div className="card-body">
                                    {this.getRequests()}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
