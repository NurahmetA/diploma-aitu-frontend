import React, {Component} from "react";
import AdviserService from "../../services/adviser.service"
import RequestPage from "./request.page";

export default class TopicRequestsPage extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.topicId;
        this.state = {
            requests: [],
            topic: "",
            topicId: this.id,
            requestId: "",
            showRequests: true,
            showRequest: false
        }
    }

    componentDidMount() {
        AdviserService.getRequests(this.id).then(res => {
            if (res) {
                this.setState({
                    requests: res.data
                })
            }
        });
        AdviserService.getTopic(this.id).then(res => {
           if (res) {
               this.setState({
                   topic: res.data.topic.name
               })
           }
        });
    }

    getListRequests = () =>
        this.state.requests.map((request, index) => (
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-between onTeamHover" onClick={() => this.displayRequestInfo(request.id)}>
                    <h5 className="card-title">Request #{++index}: {request.team} </h5>
                </div>
            </div>
        ));

    displayRequestInfo(requestId) {
        this.setState({
            showRequests: false,
            showRequest: true,
            requestId: requestId
        })
    }

    deleteTopic(id) {
        AdviserService.deleteTopic(id).then(res => {
            if(res) window.location.href = "/adviser/dashboard";
        })
    }

    editTopic(id) {
        let topic = prompt("Write down your topic please");
        if (topic) {
            AdviserService.updateTopic(id, topic).then(res => {
                if (res) window.location.reload()
            });
        } else {
            alert("Please write down mark from 0 to 100")
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Topic: {this.state.topic}</h1>
                {this.state.showRequests && this.getListRequests()}
                {this.state.showRequest && <RequestPage topicId={this.id} requestId={this.state.requestId}/>}
                {this.state.showRequests &&
                    <div className="row d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-edit mt-5 mr-1"
                                onClick={()=> this.editTopic(this.id)}>Edit Topic </button>
                    </div>
                }
            </div>
        );
    }
}
