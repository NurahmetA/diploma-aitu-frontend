import React, {Component} from "react";
import MultiSelect from "@khanacademy/react-multi-select";
import {Link} from "react-router-dom";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import AdminService from "../services/admin.service";
import DatepickerComponent from "./common/datepicker.component";
import {useLocation} from 'react-router-dom';
import adminService from "../services/admin.service";


export default class TeamDefence extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teamId: window.location.pathname.substring(20),
            commissionArray: [],
            defence: {defence: ""},
            commission: [],
            stages: [],
            selectedDate: "2001-01-01",
            stageId: null
        }
    }

    handleChange = (stageId) => {
        this.setState({stageId}, () =>
            console.log(`Option selected:`, this.state.stageId)
        );
    };

    handleOnChange = (event) => {
        this.setState({
            selectedDate: event.target.value
        }, () =>
            console.log(`Date selected:`, this.state.selectedDate))
        console.log(`Date type:`, typeof this.state.selectedDate)
        console.warn("com" + this.state.commission)
        console.log("stage" + this.state.stageId.elIndex)
    }

    setDefence = (e) => {
        e.preventDefault()
        adminService.setDefenceDate(this.state.teamId, this.state.selectedDate, this.state.commission, this.state.stageId.elIndex)
            .then(response => {
                console.log(response.data)
            })
    }


    componentDidMount() {
        const commissionNames = []
        const stageNames = []

        AdminService.getStage()
            .then(response => {
                response.data.map(item => {
                    stageNames.push({
                        label: item.name,
                        value: item.id + 1,
                        elIndex: item.id
                    })

                })
                this.setState({
                        stages: stageNames
                    }
                )
            })

        AdminService.getCommission()
            .then(response => {
                response.data.map(item => {
                    commissionNames.push({
                        label: "" + item.first_name + " " + item.last_name,
                        value: item.id,
                        elIndex: item.id
                    })
                })

                this.setState({
                    commissionArray: commissionNames
                    }
                )
            })
    }
    render() {
        const {commission} = this.state;
        const {selectedOption} = this.state;
        console.log(commission)

        return (
            <form onSubmit={this.setDefence.bind(this)}>
                <div className="container">
                    <div className="row">
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <h2>Select defence date:</h2>
                                <DatepickerComponent selectedValue={this.state.selectedDate}
                                                     onChange={this.handleOnChange}/>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <h2>Select Commission Members:</h2>
                    <MultiSelect
                        options={this.state.commissionArray}
                        selected={commission}
                        onSelectedChanged={commission => this.setState({commission})}
                    />
                    <br/><br/><br/>
                    <h2>Select Stage:</h2>
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.stages}
                    />
                    <br/>
                    <button className="btn btn-info" type="submit">
                        Set Defence!
                    </button>
                </div>
            </form>
        );
    }
}
