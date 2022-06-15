import {Component} from "react";
import StudentService from "../../services/student.service";

export default class StudentTopicPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topics: [],
            isCreator: false
        }

    }

    componentDidMount() {
        StudentService.getTopics().then(res => {
            this.setState({
                topics: res.data
            })
        })
        this.selectTopic();
    };

    selectTopic() {
        StudentService.checkStatus().then(res => {
            this.setState({
                isCreator: res.data.isTeamCreator
            })
        })
    }

    listTopics = () =>
        this.state.topics.map((topic, index) => (
            <div className="card mb-1">
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title">{++index}. Project Topic: {topic.topicName} </h5>
                        <h6 className="card-subtitle mb-2 text-muted">Advisor: {topic.advisor}</h6>
                    </div>
                    {this.state.isCreator &&
                        <button className="btn btn-outline-success" onClick={() => this.sendRequestForTopic(topic.id)}>Apply</button>
                    }
                </div>
            </div>
        ));

    sendRequestForTopic(topicId) {
        StudentService.sendRequestToTopic(topicId).then(res => {
            if (res) {
                console.log(topicId);
            }
        });
    }


    render() {
        return (
            <div className="container">
                {this.listTopics()}
            </div>
        );
    }
}
