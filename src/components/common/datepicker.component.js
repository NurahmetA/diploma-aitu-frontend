import React from 'react'
import { Form } from 'react-bootstrap';

class DatepickerComponent extends React.Component{

    render(){

        return(
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <Form.Group controlId="doj">
                            <Form.Control
                                type="date"
                                name="defenceDate"
                                defaultValue={this.props.selectedValue}
                                placeholder="Defence Date"
                                onChange={(e) => this.props.onChange(e)} />
                        </Form.Group>
                    </div>
                </div>
            </div>
        )
    }

}

export default DatepickerComponent;