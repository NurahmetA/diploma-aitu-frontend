import React, {Component} from "react";
import AdviserService from "../../services/adviser.service"

export default class TopicTeamPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.topicId;

        this.state = {
            topic: {},
            team: {},
            members: []
        }
    }

    componentDidMount() {
        AdviserService.getTopic(this.id).then(res => {
            if (res) {
                this.setState({
                    topic: res.data.topic,
                    team: res.data.team.team,
                    members: res.data.team.members
                })
            }
        })
    }

    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <div className="d-flex justify-content-between">
                    <h6 className={member.isHonor ? "card-text isHonor" : "card-text text-muted"}>
                        Team Member #{++index}: {member.first_name} {member.last_name}
                    </h6>
                    <a href={"mailto:" + member.email}>{member.email}email</a>
                </div>
                <hr/>
            </div>
        ));

    deleteTopic(id) {
        AdviserService.deleteTopic(id).then(res => {
            if (res) window.location.href = "/adviser/dashboard";
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <h1>Topic: {this.state.topic.name}</h1>
                <h2 className="card-subtitle text-muted">Team: {this.state.team.name}</h2>
                <div className="card">
                    <div className="card-body">
                        {this.getListMembers()}
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-edit mt-5 mr-1"
                            onClick={()=> window.location.pathname ="commission/dashboard"}>Edit Topic </button>

                    <button type="button" className="btn btn-outline-danger mt-5"
                            onClick={()=> this.deleteTopic(this.id)}> Delete Topic</button>
                </div>
            </div>
        );
    }
}
