import {Component} from "react";
import SecretaryService from "../../services/secretary.service";

export default class SecretaryDocumentsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defences: [],
            openTeam: false
        };
    }

    componentDidMount() {
        SecretaryService.getDefences().then(response => {
            this.setState({
                defences: response.data
            })
        })
    };

    // downloadFile(defenceId) {
    //     CommissionService.getDocument(defenceId).then(response => {
    //         this.downloadPDF(response.data);
    //     })
    // }
    //
    // downloadPDF(pdf) {
    //     const linkSource = `data:application/pdf;base64,${pdf}`;
    //     const downloadLink = document.createElement("a");
    //     const fileName = "abc.pdf";
    //     downloadLink.href = linkSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    // }

    listDefences = () =>
        this.state.defences.map(defence => (
            <tr className="onTeamHover" onClick={() => {
                window.location.href = "/secretary/documents/" + defence.id
            }}>
                <td>
                    {defence.team}
                </td>
                <td>
                    {defence.topic}
                </td>
                <td>
                    {defence.defenceDate.join("-")}
                </td>
                <td>
                    {defence.grade ? defence.grade : "Not Graded"}
                </td>
                <td>
                    {defence.stage}
                </td>
                {/*<td>
                    <button type="button" className="btn btn-primary" onClick={() => this.downloadProtocol1(defence.id)}>
                        <i className="fa fa-download"></i></button>
                </td>
                <td>
                    <button type="button" className="btn btn-primary" onClick={() => this.downloadProtocol2(defence.id)}>
                        <i className="fa fa-download"></i></button>
                </td>*/}
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
                        <th scope="col">Grade</th>
                        <th scope="col">Stage</th>
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
