import React, {Component} from "react";
import CommissionService from "../../services/commission.service";
import QuestionFormComponent from "../../components/question.component";
import SecretaryService from "../../services/secretary.service";

export default class SecretaryDefencePage extends Component {
    constructor(props) {
        super(props);
        this.id = window.location.pathname.substring(19);

        this.state = {
            defence: {defence: ""},
            team: {team: ""},
            members: [],
            questions: [],
            question: "",
            grade: ""
        }

    }

    componentDidMount() {
        SecretaryService.getDefence(this.id).then(res => {
            this.setState({
                defence: res.data.defence,
                team: res.data.team.team,
                members: res.data.team.members,
                questions: res.data.questions
            })
        });
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

    getListQuestions = () =>
        this.state.questions.map((question, index) => (
            <div className="d-flex justify-content-between align-items-center">
                <div>{++index + ". " + question.description}</div>
                <div>{question.grade}/100</div>
            </div>
        ));

    render() {
        return (
            <div className="container">
                <div className="card mb-5">
                    <div className="card-body">
                        <h5 className="card-title">Project Topic: {this.state.team.topic}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Team Name: {this.state.team.name}</h6>
                        <hr/>
                        {this.getListMembers()}
                    </div>
                </div>
                {this.state.questions.length !== 0 &&
                    <div className="card mb-5">
                        <div className="card-body">
                            {this.state.questions.length !== 0 && <h5 className="card-title">Questions:</h5>}
                            {this.getListQuestions()}
                        </div>
                    </div>
                }
                <QuestionFormComponent teamId={this.id}/>
            </div>
        );
    }
}
