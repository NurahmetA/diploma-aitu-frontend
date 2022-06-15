import React, {useRef} from 'react';

import StudentService from "../services/student.service";

function CreateTeamComponent(props) {
    const teamNameInputRef = useRef();


    const submitHandler = (event) => {
        event.preventDefault();
        const teamName = teamNameInputRef.valueOf().current.value.toString();

        if (teamName) {
            StudentService.createTeam(teamName).then(res => {
                if (res.status) {
                    window.location.reload();
                }
            })
        }

    }


    return (
        <form onSubmit={submitHandler}>
            <div className="d-flex justify-content-between">
                <label htmlFor="teamName" className=" card-text">Team Name:</label>
                <input id="teamName" className="input-field w-75" placeholder="Team Name"
                       ref={teamNameInputRef} required />
                <button className="btn btn-outline-success" type="submit">Create</button>
            </div>
        </form>
    );
}

export default CreateTeamComponent;
