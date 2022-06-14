import React, {Component} from "react";
import AdviserService from "../../services/adviser.service"

export default class RequestPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.requestId;
        this.topicId = this.props.topicId;
        this.state = {
            members: [],
            team: "",
            topic: ""
        };
    }

    componentDidMount() {
        AdviserService.getRequest(this.topicId, this.id).then(res => {
            this.setState({
                members: res.data.members,
                team: res.data.team
            })
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

    acceptRequest() {
        AdviserService.acceptRequest(this.topicId, this.id).then(res => {
            if (res) window.location.pathname ="adviser/dashboard";
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <h2 className="card-subtitle text-muted">Team: {this.state.team}</h2>
                <div className="card">
                    <div className="card-body">
                        {this.getListMembers()}
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-success mt-5 mr-1"
                            onClick={()=> this.acceptRequest()}>Accept</button>
                </div>
            </div>
        );
    }
}
