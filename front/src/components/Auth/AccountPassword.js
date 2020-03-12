import './dashboardPage.css';
import {bindAll} from 'lodash';

const React = require('react');

export default class AccountFields extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this,
            [
                'changePassword',
                'changeConpass',
                'isFormValid',
                'isPasswordValid',
                'isConpassValid'
            ]);
        this.state = {
            password: '',
            conpass: '',
            errorPassword: '',
            errorConpass: '',
        }
    }


    changePassword(password) {
        this.setState({password});
    }

    changeConpass(conpass) {
        this.setState({conpass});
    }


    isPasswordValid(password) {
        let errorPassword = '';
        if (password === '') {
            errorPassword = 'Поле не должно быть пустым';
            this.setState({errorPassword});
            return false;
        }
        if (password.length < 8) {
            errorPassword = 'Длина имени не может быть меньше 8 символов';
            this.setState({errorPassword});
            return false;
        }
        this.setState({errorPassword});
        return true;
    }

    isConpassValid(conpass) {
        let errorConpass = '';
        if (conpass === '') {
            errorConpass = 'Поле не должно быть пустым';
            this.setState({errorConpass});
            return false;
        }
        if (conpass !== this.state.password) {
            errorConpass = 'Пароли не совпадают';
            this.setState({errorConpass});
            return false;
        }
        this.setState({errorConpass});
        return true;
    }

    isFormValid() {
        return this.isConpassValid(this.state.conpass) &&
            this.isPasswordValid(this.state.password);
    }

    render() {
        return (

            <div className="form">
                <h2 id="fullName">Password</h2>

                <div id="email">
                    <input type="password" className="input-auth" id="password" ref={this.password}
                           placeholder="Enter password"
                           defaultValue={this.props.fieldValues.password}
                           onChange={e => {
                               this.changePassword(e.target.value);
                               this.isPasswordValid(e.target.value);
                           }}/>
                    {this.state.errorPassword ? <span>{this.state.errorPassword}</span> : null}
                </div>
                <div id="login">
                    <input type="password" className="input-auth" id="conpass" ref={this.conpass}
                           placeholder="Confirm password"
                           defaultValue={this.props.fieldValues.conpass}
                    onChange={e => {
                    this.changeConpass(e.target.value);
                    this.isConpassValid(e.target.value);
                }}/>
                    {this.state.errorConpass ? <span>{this.state.errorConpass}</span> : null}
                </div>
                <div id='buttons'>
                    <button className="firstButt" onClick={this.props.previousStep}>Back</button>
                    <button className="firstButt"
                            onClick={() =>
                                this.props.nextStep(this.state)}>Save &amp; Continue
                    </button>
                </div>
            </div>
        )
    }


    nextStep() {
        this.props.changeInfo(this.state);
        this.props.nextStep();
    }
}
