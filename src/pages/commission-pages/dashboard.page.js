import {Component} from "react";
import CommissionService from "../../services/commission.service";

export default class CommissionDashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defences: [],
            openTeam: false
        };
    }

    componentDidMount() {
        CommissionService.getDefences().then(response => {
            this.setState({
                defences: response.data
            })
        })
    };

    listDefences = () =>
        this.state.defences.map(defence => (
            <tr className="onTeamHover" onClick={() => {window.location.href = "/commission/defence/" + defence.id}}>
                <td>
                    {defence.team}
                </td>
                <td>
                    {defence.topic}
                </td>
                <td>
                    {defence.defenceDate.join("-")}
                </td>
            </tr>
        ));

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Team</th>
                        <th scope="col">Project Topic</th>
                        <th scope="col">Defence Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.listDefences()}
                    </tbody>
                </table>
            </div>
        );
    }
}
