import React, {Component} from "react";
import SecretaryService from "../../services/secretary.service";
import MultiSelect from "@khanacademy/react-multi-select";
import SecretaryQuestionFormComponent from "../../components/secretary-question.component";

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
            grade: "",
            studentsArray: [],
            students: [],
            displayGrades: false,
            grades: [],
            teamInfo: {"": ""}
        }
        this.showGrades = this.showGrades.bind(this);
        this.setFinalMark = this.setFinalMark.bind(this);
    }

    componentDidMount() {
        SecretaryService.getDefence(this.id).then(res => {
            this.setState({
                members: res.data.team.members,
                questions: res.data.questions,
                teamInfo: res.data.team.team
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

    getListQuestions = () =>
        this.state.questions.map((question, index) => (
            <tr>
                <td>
                    {question.responderName}
                </td>
                <td>
                    {question.description}
                </td>
                <td>
                    {question.grade}
                </td>
            </tr>
        ));

    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <p className="card-text d-flex justify-content-between onTeamHover">
                    Team Member #{++index}: {member.first_name} {member.last_name} <a
                    href={"mailto:" + member.email}>{member.email}</a>
                </p>
                <hr/>
            </div>
        ));

    getListMembersAndGrades = () =>
        this.state.grades.map(grade => (
            <div>
                <div className="d-flex justify-content-between">
                    <p className="card-text">
                        {grade.fullName}
                    </p>
                    <p className="card-text">
                        Final Grade: {grade.grade ? grade.grade : "Not Graded"}
                    </p>
                    <p className="card-text">
                        <button type="button" className="btn btn-danger" onClick={() => this.setFinalMark(grade.id)}>Edit</button>
                    </p>
                </div>
                <hr/>
            </div>
        ));

    showGrades() {
        SecretaryService.getGrades(this.id).then(response => {
            this.setState({
                grades: response.data,
                displayGrades: !this.state.displayGrades
            })
        });
    }

    setFinalMark(studentId) {
        let grade = prompt("Write down you mark please");
        SecretaryService.setGrade(this.id, studentId, grade).then(response => {
            window.location.reload();
        })

    }

    render() {
        const {students} = this.state;
        return (
            <div className="container">
                {!this.state.displayGrades &&
                    <div className="card mb-5">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Project Topic: {this.state.teamInfo.topic}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Team Name: {this.state.teamInfo.name}</h6>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-info" onClick={this.showGrades}>Grades</button>
                                </div>
                            </div>
                            <hr/>
                            {this.getListMembers()}
                        </div>
                    </div>
                }
                {this.state.displayGrades &&
                    <div className="card mb-5">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Project Topic: {this.state.team.topic}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Team Name: {this.state.team.name}</h6>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-info" onClick={this.showGrades}>Info</button>
                                </div>
                            </div>
                            <hr/>
                            {this.getListMembersAndGrades()}
                        </div>
                    </div>
                }
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Student</th>
                        <th scope="col">Question</th>
                        <th scope="col">Grade</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getListQuestions()}
                    </tbody>
                </table>
                <SecretaryQuestionFormComponent teamId={this.id} students={this.state.students}/>
                <MultiSelect
                    options={this.state.studentsArray}
                    selected={students}
                    onSelectedChanged={students => this.setState({students})}
                />
            </div>
        );
    }
}
