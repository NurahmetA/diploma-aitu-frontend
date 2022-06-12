import React, {Component} from "react";
import CommissionService from "../../services/commission.service";
import QuestionFormComponent from "../../components/question.component";
import MultiSelect from "@khanacademy/react-multi-select";

export default class CommissionDashboardPage extends Component {
    constructor(props) {
        super(props);
        this.id = window.location.pathname.substring(20);

        this.state = {
            defence: {defence: ""},
            team: {team: ""},
            members: [],
            questions: [],
            question: "",
            grade: "",
            studentsArray: [],
            students: []
        }

    }

    componentDidMount() {
        CommissionService.getDefence(this.id).then(res => {
            this.setState({
                defence: res.data.defence,
                team: res.data.team.team,
                members: res.data.team.members,
                questions: res.data.questions
            })
            const studentNames = []
            this.state.members.map(member => {
                studentNames.push({
                    label: "" + member.first_name + " " + member.last_name,
                    value: member.id
                })
            })

            this.setState({
                studentsArray: studentNames
            })
        });
    };



    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <p className={member.isHonor ? "card-text isHonor" : "card-text"}>
                    Team Member #{++index}: {member.first_name} {member.last_name}
                </p>
                <hr/>
            </div>
        ));

    getListQuestions = () =>
        this.state.questions.map((question, index) => (
            <div className="d-flex justify-content-between">
                <div>{question.responderName}</div>
                <div>{++index + ". " + question.description}</div>
                <div className="d-flex">
                    <button className="btn btn-outline-danger m-1"
                            onClick={() => this.editQuestion(question.questionId, question.description, question.responderName)}>Edit</button>

                    <button className="btn btn-outline-danger m-1"
                            onClick={() => this.deleteQuestion(question.questionId)}>Delete</button>
                </div>
            </div>
        ));

    deleteQuestion(questionId) {
        CommissionService.deleteQuestion(questionId).then(res => {
            window.location.reload();
        })
    }

    editQuestion(questionId, description, responderName) {
        let desc = prompt("You are editing question for" + responderName, description);
        if (desc) {
            CommissionService.updateQuestion(questionId, desc).then(res => {
                window.location.reload();
            })
        } else {
            alert("Question can not be empty")
        }
    }

    render() {
        const {students} = this.state;
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

                <div className="row">
                    <div className="col-6">
                        <MultiSelect
                            options={this.state.studentsArray}
                            selected={students}
                            onSelectedChanged={students => this.setState({students})}
                        />
                    </div>
                    <div className="col-6">
                        <QuestionFormComponent teamId={this.id} students={this.state.students}/>
                    </div>
                </div>


                {this.state.questions.length !== 0 &&
                <div className="card mt-5">
                    <div className="card-body">
                        {this.state.questions.length !== 0 && <h5 className="card-title">Questions:</h5>}
                        {this.getListQuestions()}
                    </div>
                </div>
                }
                <div className="row d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-danger mt-5"
                            onClick={()=> window.location.pathname ="commission/defence/grades/" + this.id}>Set Grades</button>
                </div>
            </div>
        );
    }
}
