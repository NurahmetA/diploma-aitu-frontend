import {Component} from "react";
import AdminService from "../../services/admin.service";
import {Link} from "react-router-dom";


export default class AdminProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: []
        };
    }

    componentDidMount() {
        AdminService.getTeams().then(
            response => {
                this.setState({
                    teams: response.data
                })
            }
        )
    };

    listTeams = () =>
        this.state.teams.map(team => (
            <tr>
                <td>
                    <Link to={"/admin/team/" + team.id}>
                        {team.name}
                    </Link>
                </td>
                <td>{team.topic}</td>
                <td>{team.advisor}</td>
            </tr>
        ));

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Team Name</th>
                        <th scope="col">Project Topic</th>
                        <th scope="col">Advisor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.listTeams()}
                    </tbody>
                </table>
            </div>
        );
    }
}
