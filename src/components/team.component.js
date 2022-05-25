import {Component} from "react";
import AdminService from "../services/admin.service";
import {Link} from "react-router-dom";

export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {team: ""},
            creator: {creator: ""},
            topic: {topic: ""},
            advisor: {advisor: ""},
            defences: [],
            members: []
        };
    }


    componentDidMount() {
        AdminService.getTeam(window.location.pathname.substring(12))
            .then(response => {
                    this.setState({
                        team: response.data.team,
                        topic: response.data.topic,
                        creator: response.data.creator,
                        advisor: response.data.advisor,
                        defences: response.data.defences,
                        members: response.data.members
                    });
                }
            )
    };

    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0 font-weight-bold">Team Member #{++index}</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {member.first_name} {member.last_name}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0 font-weight-bold">Team Member #{index} Mail</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {member.email}
                    </div>
                </div>
                <hr/>
            </div>
        ));

    getListDefences = () =>
        this.state.defences.map((defence, index) => (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0 font-weight-bold">{defence.stage.name}</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {defence.grade === null ? "Not Graded" : defence.grade}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h6 className="mb-0 font-weight-bold">{defence.stage.name} Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        {defence.defenceDate.join("-")}
                    </div>
                </div>
                <hr/>
            </div>
        ));


    render() {
        return (
            <div className="col">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0 font-weight-bold">Team Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.team.name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0 font-weight-bold">Topic Name</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.topic.name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0 font-weight-bold">Advisor</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.advisor.first_name} {this.state.advisor.last_name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0 font-weight-bold">Advisor's Mail</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.advisor.email}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0 font-weight-bold">Team Creator</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.creator.first_name} {this.state.creator.last_name}
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-sm-3">
                                <h6 className="mb-0 font-weight-bold">Team Creator's Mail</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                {this.state.creator.email}
                            </div>
                        </div>
                        <hr/>
                        {this.getListMembers()}
                        {this.getListDefences()}
                        <div className="row">
                            <div className="col-sm-12">
                                <Link className="btn btn-info" to={{
                                    pathname: "/admin/team/defence/" + this.state.team.id,
                                }}>
                                    Set Defence
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
