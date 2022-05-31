import {useRef} from 'react';

import CommissionService from "../services/commission.service";
import SecretaryService from "../services/secretary.service";

function SecretaryQuestionFormComponent(props) {
    const questionInputRef = useRef();
    const gradeInputRef = useRef();


    const submitHandler = (event) => {
        event.preventDefault();
        const question = questionInputRef.valueOf().current.value.toString();

        if (question && props.students && props.commission) {
            SecretaryService.addQuestion(props.teamId, question, props.students, props.commission).then(res => {
                if (res.status) {
                    window.location.href = "/secretary/defence/" + props.teamId;
                }
            })
        }

    }


    return (
        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-10">
                    <input type="text" className="form-control" placeholder="Question" ref={questionInputRef} required/>
                </div>
                <div className="col-1">
                    <button type="submit" className="btn btn-info">+</button>
                </div>
            </div>
        </form>
    );
}

export default SecretaryQuestionFormComponent;
