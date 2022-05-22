import {Component} from "react";
import CommissionService from "../../services/commission.service";

export default class CommissionDashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defence: {defence : ""},
            team: {team : ""},
            members: [],
            questions: []
        }

    }

    componentDidMount() {
        CommissionService.getDefence(window.location.pathname.substring(20)).then(res => {
            this.setState({
                defence: res.data.defence,
                team: res.data.team.team,
                members: res.data.team.members,
                questions: res.data.questions,
            })
            console.log(this.state.team.topic);
            console.log(this.state.members);
        });
    };


    getListMembers = () =>
        this.state.members.map(member => (
            <li className="list-group-item">{member.first_name} {member.last_name}, {member.email}</li>
        ));



    render() {
        return (
            <div className="container">
                <h2>Project Topic: {this.state.team.topic}</h2>
                <div className="panel panel-default">
                    <div className="panel-heading">Team Name: {this.state.team.name}</div>
                    <div className="panel-heading">Team Members: </div>
                    {this.getListMembers()}
                </div>
            </div>
        );
    }
}
