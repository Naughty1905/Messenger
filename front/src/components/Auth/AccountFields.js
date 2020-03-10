import './dashboardPage.css';

const React = require('react');

export default class AccountFields extends React.Component {

    constructor(props) {
        super(props);

        // Create the ref
        // this.name = React.createRef();
        // this.password = React.createRef();
        // this.email = React.createRef();
        // this.conpass = React.createRef();


        this.state = {
            name: '',
            password: '',
            email: '',
            imgPath: ''
        }
    }

    render() {
        return (
            <div className="form">
                <h2 id="fullName">Account Details</h2>

                <div id="email">
                    <input type="text" className="input-auth" id="login" ref={this.name} onChange={e => {
                        this.setState({name: e.target.value});

                    }}
                           placeholder="Enter username"
                           defaultValue={this.props.fieldValues.name}/>
                </div>
                <div id="login">
                    <input type="email" className="input-auth" id="login" ref={this.email} placeholder="Enter email"
                           defaultValue={this.props.fieldValues.email}
                           onChange={e => {
                               this.setState({email: e.target.value})
                           }}
                    />
                </div>
                <div id="password">
                    <input type="password" className="input-auth" id="password" ref={this.password}
                           placeholder="Enter password"
                           defaultValue={this.props.fieldValues.password}
                           onChange={e => {
                               this.setState({password: e.target.value})
                           }}/>
                </div>
                <div id="conpass">
                    <input type="password" className="input-auth" id="conpass" ref={this.conpass}
                           placeholder="Confirm password"
                           defaultValue={this.props.fieldValues.conpass}/>
                </div>
                <div id='buttons'>
                    <button className="firstButt"
                            onClick={(event) =>
                                this.nextStep(event)}>Save &amp; Continue
                    </button>
                </div>
            </div>
        )
    }


    nextStep(event) {

        this.props.changeInfo(this.state)

        // const data = {
        //     name: this.name.current.value,
        //     email: this.email.current.value,
        //     password: this.password.current.value,
        //     conpass: this.conpass.current.value,
        //
        // };

        // this.props.saveValues(data);
        this.props.nextStep()
    }
}

