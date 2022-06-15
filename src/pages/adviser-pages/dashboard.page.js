import React, {Component} from "react";
import AdviserService from "../../services/adviser.service";
import TopicTeamPage from "./topic-team.page";
import TopicRequestsPage from "./topic-requests.page";

export default class AdviserDashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            confirmedTopics: [],
            displayConfirmedTopics: true,
            unconfirmedTopics: [],
            displayUnconfirmedTopics: false,
            displayTeam: false,
            displayRequests: false,
            topicId: ""
        }
    }

    componentDidMount() {
        AdviserService.getConfirmedTopics().then(res => {
            if (res) {
                this.setState({
                    confirmedTopics: res.data
                })
            }
        });
        AdviserService.getUnconfirmedTopics().then(res => {
            if (res) {
                this.setState({
                    unconfirmedTopics: res.data
                })
            }
        });
    };

    listConfirmedTopics = () =>
        this.state.confirmedTopics.map((topic) => (
            <div className="card m-1">
                <div className="card-body">
                    <h5 className="card-title onTeamHover" onClick={() => this.displayTeam(topic.id)}>
                        {topic.topicName}
                    </h5>
                </div>
            </div>
        ));

    listUnconfirmedTopics = () =>
        this.state.unconfirmedTopics.map((topic) => (
            <div className="card m-1">
                <div className="card-body">
                    <h5 className="card-title onTeamHover" onClick={() => this.displayRequests(topic.id)}>
                        {topic.topicName}
                    </h5>
                </div>
            </div>
        ));

    displayTeam(topicId) {
        this.setState({
            displayTeam: true,
            displayRequests: false,
            topicId: topicId,
            displayConfirmedTopics: false,
            displayUnconfirmedTopics: false
        })
    }

    displayRequests(topicId) {
        this.setState({
            displayRequests: true,
            displayTeam: false,
            topicId: topicId,
            displayConfirmedTopics: false,
            displayUnconfirmedTopics: false
        })
    }

    displayConfirmed() {
        this.setState({
            displayConfirmedTopics: true,
            displayUnconfirmedTopics: false,
            displayRequests: false,
            displayTeam: false
        })
    }

    displayUnconfirmed() {
        this.setState({
            displayConfirmedTopics: false,
            displayUnconfirmedTopics: true,
            displayRequests: false,
            displayTeam: false,
        })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="d-flex justify-content-start">
                    <button className="btn btn-outline-secondary" onClick={() => this.displayConfirmed()}>Confirmed Topic</button>
                    <button className="btn btn-outline-secondary" onClick={() => this.displayUnconfirmed()}>Unconfirmed Topic</button>
                </div>
                {this.state.displayConfirmedTopics &&
                    this.listConfirmedTopics()
                }
                {this.state.displayUnconfirmedTopics &&
                    this.listUnconfirmedTopics()
                }
                {this.state.displayTeam &&
                    <TopicTeamPage topicId={this.state.topicId}/>
                }
                {this.state.displayRequests &&
                    <TopicRequestsPage topicId={this.state.topicId}/>
                }
            </div>
        );
    }
}
