import React, {Component} from "react";
import CommissionService from "../../services/commission.service";

export default class CommissionGradesPage extends Component {
    constructor(props) {
        super(props);
        this.id = window.location.pathname.substring(27);

        this.state = {
            team: {"":""},
            members: [],
            grades: []
        }

    }

    componentDidMount() {
        CommissionService.getDefence(this.id).then(res => {
            this.setState({
                team: res.data.team.team,
                members: res.data.team.members
            })
        });
        CommissionService.getGrades(this.id).then(res => {
            this.setState({
                grades: res.data
            })
        })
    };

    setFinalMark(studentId) {
        let grade = prompt("Write down you mark please");
        if (grade >= 0 && grade <= 100) {
            CommissionService.setGrade(this.id, studentId, grade).then(res => {
                if (res) window.location.reload()
            });
        } else {
            alert("Please write down mark from 0 to 100")
        }
    }

    getListMembersAndGrades = () =>
        this.state.grades.map(grade => (
            <div>
                <div className="d-flex justify-content-between">
                    <p className="card-text">
                        {grade.fullName}
                    </p>
                    <p className="card-text">
                        Final Grade: {grade.grade !== null ? grade.grade : "Not Graded"}
                    </p>
                    <p className="card-text">
                        <button type="button" className="btn btn-danger" onClick={() => this.setFinalMark(grade.id)}>
                            {!grade.grade ? "Set Grade" : "Edit Grade"}
                        </button>
                    </p>
                </div>
                <hr/>
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
                        {this.getListMembersAndGrades()}
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-danger mt-5"
                            onClick={()=> window.location.pathname ="commission/dashboard"}>End Defence</button>
                </div>
            </div>
        );
    }
}
