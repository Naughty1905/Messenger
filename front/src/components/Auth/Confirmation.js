import './dashboardPage.css';
const React = require('react')

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="form">
                <h2>Confirm Registration</h2>
                <div>
                    <div><b>Name:</b> {this.props.fieldValues.name}</div>
                    <div><b>Email:</b> {this.props.fieldValues.email}</div>
                </div>
                <div id='buttons'>
                    <button className="firstButt" onClick={this.props.previousStep}>Back</button>
                    <button className="firstButt" onClick={this.props.submitRegistration}>Submit Registration</button>
                </div>
            </div>
        )
    }
}

