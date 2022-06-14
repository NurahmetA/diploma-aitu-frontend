import React, {useRef} from 'react';
import AdviserService from "../services/adviser.service";

function CreateTopicComponent (props) {
    const topicInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const topic = topicInputRef.valueOf().current.value.toString();

        if (topic) {
            console.log(topic);
            AdviserService.createTopic(topic).then(res => {
                if (res) {
                    window.location.href = "/adviser/dashboard";
                }
            })
        }

    }


    return (
        <form onSubmit={submitHandler}>
            <div className="d-flex justify-content-between">
                <label htmlFor="topic" className=" card-text">Topic:</label>
                <input id="topic" className="input-field w-75" placeholder="topic"
                       ref={topicInputRef} required />
                <button className="btn btn-outline-success" type="submit">Create</button>
            </div>
        </form>
    );
}

export default CreateTopicComponent;
