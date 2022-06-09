import StudentService from "../../services/student.service"

function StudentDashboard() {

    StudentService.getTeams().then(res => {console.log(res.data.team.name)})

    return (
        <div>
            List of teams
        </div>
    );
}

export default StudentDashboard;