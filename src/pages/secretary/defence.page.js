import React, {Component} from "react";
import CommissionService from "../../services/commission.service";
import SecretaryQuestionFormComponent from "../../components/question.component";
import SecretaryService from "../../services/secretary.service";
import DefenceQuestions from "./defence-questions";
import MultiSelect from "@khanacademy/react-multi-select";

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
            grades: []
        }
        this.showGrades = this.showGrades.bind(this);
        this.setFinalMark = this.setFinalMark.bind(this);
    }

    componentDidMount() {
        SecretaryService.getDefence(this.id).then(res => {
            this.setState({
                members: res.data.team.members
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
                <p className="card-text d-flex justify-content-between">
                    Team Member #{++index}: {member.first_name} {member.last_name} <a
                    href={"mailto:" + member.email}>{member.email}</a>
                </p>
                <hr/>
            </div>
        ));

    getListMembersAndGrades = () =>
        this.state.grades.map(grade => (
            <tr>
                <td>
                    {grade.fullName}
                </td>
                <td>
                    {grade.grade ? grade.grade : "Not Graded"}
                </td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={() => this.setFinalMark(grade.id)}>Edit</button>
                </td>
            </tr>
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
        console.log("students" + students)
        return (
            <div className="container">
                {!this.state.displayGrades &&
                    <div className="card mb-5">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">Project Topic: {this.state.team.topic}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Team Name: {this.state.team.name}</h6>
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
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Student Full Name</th>
                            <th scope="col">Grade</th>
                            <th scope="col">
                                <button type="button" className="btn btn-info" onClick={this.showGrades}>Info</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getListMembersAndGrades()}
                        </tbody>
                    </table>
                }
                <DefenceQuestions questions={this.state.questions}></DefenceQuestions>
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
