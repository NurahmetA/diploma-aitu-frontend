import {useRef} from 'react';

import CommissionService from "../services/commission.service";

function QuestionFormComponent(props) {
    const questionInputRef = useRef();
    const gradeInputRef = useRef();


    const submitHandler = (event) => {
        event.preventDefault();
        const question = questionInputRef.valueOf().current.value.toString();
        const grade = gradeInputRef.valueOf().current.value.toString();

        if (question && grade) {
            CommissionService.addQuestion(props.teamId, question, grade).then(res => {
                if (res.status) {
                    window.location.href = "/commission/defence/" + props.teamId;
                }
            })
        }

    }


    return (
        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-9">
                    <input type="text" className="form-control" placeholder="Question" ref={questionInputRef} required/>
                </div>
                <div className="col-3">
                    <input type="number" max="100" min="0" className="form-control" placeholder="Grade"
                           ref={gradeInputRef} required/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-5"></div>
                <div className="col-2">
                    <button type="submit" className="btn btn-info">+</button>
                </div>
                <div className="col-5"></div>
            </div>
        </form>
    );
}

export default QuestionFormComponent;
