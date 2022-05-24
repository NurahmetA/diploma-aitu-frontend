import React, {Component} from "react";
import MultiSelect from "@khanacademy/react-multi-select";
import {Link} from "react-router-dom";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import AdminService from "../services/admin.service";
import DatepickerComponent from "./common/datepicker.component";



export default class Defence extends Component {
    commissionNames = []
    stageNames = []

    constructor(props) {
        super(props);


        this.state = {
            teamId: "",
            commission: [],
            defence: {defence: ""},
            selected: [],
            stages: [],
            selectedDate: "2015-04-14",
            selectedStage: null
        };

        AdminService.getStage()
            .then(response => {
                response.data.map( item => {
                    this.stageNames.push({
                        label: item.name,
                        value: item + 1,
                        elIndex: item.id
                    })

                })



                this.setState({
                        stages: this.stageNames
                    }
                )
            })

        AdminService.getCommission()
            .then(response => {
                response.data.map( item => {
                    this.commissionNames.push({
                        label: "" + item.first_name + " " + item.last_name,
                        value: item.id,
                        elIndex: item.id
                    })
                })



                this.setState({
                        commission: this.commissionNames
                    }
                )
            })

    }

    handleChange = (selectedStage) => {
        this.setState({selectedStage}, () =>
            console.log(`Option selected:`, this.state.selectedStage)
        );
    };

    handleOnChange = (event) => {
        this.setState({
            selectedDate: event.target.value
        }, () =>
            console.log(`Date selected:`, this.state.selectedDate))
    }


    componentDidMount() {

    }

    render() {
        const {selected} = this.state;
        const {selectedOption} = this.state;
        const date = this.state;
        //("DATE: ", date);

        return (
            <div className="container">
                <div className="row">
                    <div className='col-sm-6'>
                        <div className="form-group">
                            <h2>Select defence date:</h2>
                            {/*<Form.Control*/}
                            {/*    type="date"*/}
                            {/*    name='date_of_birth'*/}
                            {/*    id="datepicker"*/}
                            {/*    value={date}*/}
                            {/*    onChange={this.handleChangeData}*/}
                            {/*/>*/}
                            <DatepickerComponent selectedValue={this.state.selectedDate} onChange={this.handleOnChange}/>
                        </div>
                    </div>
                </div>
                <br/><br/><br/>
                <h2>Select Commission Members:</h2>
                <MultiSelect
                    options={this.commissionNames}
                    selected={selected}
                    onSelectedChanged={selected => this.setState({selected})}
                />
                <br/><br/><br/>
                <h2>Select Stage:</h2>
                <Select
                    value={selectedOption}
                    onChange={this.handleChange}
                    options={this.stageNames}
                />
                <br/>
                <Link className = "btn btn-info" to={"/admin/team/defence/" + this.state.team.id + "/success"}>
                    Set Defence!
                </Link>
            </div>
        );
    }
}
