import React, {Component} from "react";
import CreateTopicComponent from "../../components/create-topic.component";

export default class TopicPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    };


    render() {
        return (
            <div className="container">
                <CreateTopicComponent/>
            </div>
        );
    }
}
