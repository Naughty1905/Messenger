import './dashboardPage.css';
const React = require('react')

export default class Confirmation extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="form">
                <h2 id="fullName">Confirm Registration</h2>
                <div id="email">
                    <div ><b>Name:</b> {this.props.fieldValues.name}</div>
                </div>
                <div id="login">
                    <div><b>Email:</b> {this.props.fieldValues.email}</div>
                </div>
                <div id='buttons'>
                    <button className="firstButt" onClick={this.props.previousStep}>Back</button>
                    <button className="firstButt" onClick={this.props.submitRegistration} style={{fontSize: "0.8rem"}}>Submit Registration</button>
                </div>
            </div>
        )
    }
}

