const React = require('react')

export default class Success extends React.Component{
    render() {
        return (
            <div className="form">
                <h2>Successfully Registered!</h2>
                <p>Please check your email <b>{this.props.fieldValues.email}</b> for a confirmation link to activate your account.</p>
            </div>
        )
    }
}

