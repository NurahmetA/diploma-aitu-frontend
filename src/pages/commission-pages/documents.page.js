import {Component} from "react";
import CommissionService from "../../services/commission.service";
import DownloadProtocols from "../../components/download-protocols";
import LinkToProtocols from "../../components/link-to-protocols";

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

    downloadFile(defenceId) {
        CommissionService.getDocument(defenceId).then(response => {
            this.downloadPDF(response.data);
        })
    }

    downloadPDF(pdf) {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = "abc.pdf";
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    listDefences = () =>
        this.state.defences.map(defence => (
            <tr>
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
                    There is no grade
                </td>
                <td>
                    <DownloadProtocols defenceId={defence.id}/>
                </td>
                <td>
                    <LinkToProtocols defenceId={defence.id}/>
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
                        <th scope="col">Defence Grade</th>
                        <th scope="col">Download File</th>
                        <th scope="col">Open File</th>
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
