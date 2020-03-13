const React = require('react')

export default class Success extends React.Component{
    render() {
        return (
            <div className="form">
                <h2 id="fullName">Successfully Registered!</h2>
                <p id="login">Please check your email <b>{this.props.fieldValues.email}</b> for a confirmation link to activate your account.</p>
            </div>
        )
    }
}

