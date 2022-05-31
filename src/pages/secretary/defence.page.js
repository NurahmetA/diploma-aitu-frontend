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
            commissionArray: [],
            commissions: [],
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

        SecretaryService.getCommissions(this.id).then(res => {
            this.setState({
                commission: res.data
            })
            const commissionNames = []
            this.state.commission.map(com => {
                commissionNames.push({
                    label: "" + com.first_name + " " + com.last_name,
                    value: com.id
                })
            })
            this.setState({
                commissionArray: commissionNames
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
                    {question.questioner}
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
        window.location.pathname = "/secretary/defence/grades/" + this.id;
    }

    setFinalMark(studentId) {
        let grade = prompt("Write down you mark please");
        SecretaryService.setGrade(this.id, studentId, grade).then(response => {
            window.location.reload();
        })

    }

    render() {
        const {students} = this.state;
        const {commissions} = this.state;
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

                <div className="row mb-5">
                    <div className="col-3">
                        <MultiSelect
                            options={this.state.commissionArray}
                            selected={commissions}
                            onSelectedChanged={commissions => this.setState({commissions})}
                        />
                    </div>
                    <div className="col-3">
                        <MultiSelect
                            options={this.state.studentsArray}
                            selected={students}
                            onSelectedChanged={students => this.setState({students})}
                        />
                    </div>
                    <div className="col-5">
                        <SecretaryQuestionFormComponent teamId={this.id} students={this.state.students} commission={commissions[0]}/>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Student</th>
                        <th scope="col">Question</th>
                        <th scope="col">Questioner</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getListQuestions()}
                    </tbody>
                </table>

            </div>
        );
    }
}
