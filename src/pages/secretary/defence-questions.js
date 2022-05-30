import {Component} from "react";

export default class DefenceQuestions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
        }

    }

    componentDidMount() {
        this.state.questions = this.props.questions;
    };

    editMark() {

    }

    getListQuestions = () =>
        this.state.questions.map((question, index) => (
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    {++index + ". " + question.description}
                    <button>Edit</button>
                </div>
                <div>
                    {question.grade}/100
                    <button>Edit</button>
                </div>
                <div>
                    {question.responderName}
                </div>
            </div>
        ));

    render() {
        return (
            <p/>
        );
    }
}
