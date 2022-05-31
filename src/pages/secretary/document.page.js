import {Component} from "react";
import SecretaryService from "../../services/secretary.service";

export default class SecretaryDocumentPage extends Component {
    constructor(props) {
        super(props);
        this.id = window.location.pathname.substring(21);

        this.state = {
            defences: [],
            team: [],
            members: []
        };
    }

    componentDidMount() {
        SecretaryService.getDefence(this.id).then(response => {
            this.setState({
                defences: response.data.defence,
                team: response.data.team,
                members: response.data.team.members
            })
        })
    };

    downloadProtocol1(studentId) {
        SecretaryService.getFirstProtocol(studentId).then(response => {
            if (response) {
                const linkSource = `data:application/pdf;base64,${response.data}`;
                const downloadLink = document.createElement("a");
                const fileName = "abc.pdf";
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
                                onClick={() => this.downloadProtocol1(member.id)}>
                            <i className="fa fa-download"></i>
                        </button>
                        {"   "}
                        <button type="button" className="btn btn-primary" title="2nd protocol">
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
                                <h5 className="card-title">Project Topic: {this.state.team.topic}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Team Name: {this.state.team.name}</h6>
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
