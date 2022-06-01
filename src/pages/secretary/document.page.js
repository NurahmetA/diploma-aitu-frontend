import {Component} from "react";
import SecretaryService from "../../services/secretary.service";

export default class SecretaryDocumentPage extends Component {
    constructor(props) {
        super(props);
        this.id = window.location.pathname.substring(21);

        this.state = {
            defences: [],
            team: [],
            members: [],
            teamInfo: {"": ""}
        };
    }

    componentDidMount() {
        SecretaryService.getDefence(this.id).then(response => {
            this.setState({
                defences: response.data.defence,
                team: response.data.team,
                members: response.data.team.members,
                teamInfo: response.data.team.team
            })
        })
    };

    downloadFirstProtocol(studentId) {
        SecretaryService.getFirstProtocol(studentId).then(response => {
            if (response) {
                let documentName;
                this.state.members.map(member => {
                    if (member.id === studentId) {
                        documentName = member.last_name + " " + member.first_name;
                    }
                })
                console.log(documentName)
                const linkSource = `data:application/pdf;base64,${response.data}`;
                const downloadLink = document.createElement("a");
                const fileName = `${documentName}_protocol_1.pdf`;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            }
        })
    }

    downloadSecondProtocol(studentId) {
        SecretaryService.getSecondProtocol(studentId).then(response => {
            if (response) {
                let documentName;
                this.state.members.map(member => {
                    if (member.id === studentId) {
                        documentName = member.last_name + " " + member.first_name;
                    }
                })
                console.log(documentName);
                const linkSource = `data:application/pdf;base64,${response.data}`;
                const downloadLink = document.createElement("a");
                const fileName = `${documentName}_protocol_2.pdf`;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            }
        })
    }

    getListMembers = () =>
        this.state.members.map((member, index) => (
            <div>
                <div className="d-flex justify-content-between">
                    <p className="card-text">
                        Team Member #{++index}: {member.first_name} {member.last_name}
                    </p>
                    <p className="card-text">
                        <button type="button" className="btn btn-primary" title="1st protocol"
                                onClick={() => this.downloadFirstProtocol(member.id)}>
                            <i className="fa fa-download"></i>
                        </button>
                        {"   "}
                        <button type="button" className="btn btn-primary" title="2nd protocol"
                                onClick={() => this.downloadSecondProtocol(member.id)}>
                            <i className="fa fa-download"></i>
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
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="card-title">Project Topic: {this.state.teamInfo.topic}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Team Name: {this.state.teamInfo.name}</h6>
                            </div>
                        </div>
                        <hr/>
                        {this.getListMembers()}
                    </div>
                </div>
            </div>
        );
    }
}
