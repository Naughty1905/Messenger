import './dashboardPage.css';
import {bindAll} from 'lodash';
import is from 'is_js';

import React from 'react';

export default class AccountFields extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this,
            [
                'changeName',
                'changeLogin',
                'changeEmail',
                'isFormValid',
                'isNameValid',
                'isLoginValid',
                'isEmailValid'
            ]);
        this.state = {
            login: '',
            name: '',
            email: '',
            errorName: '',
            errorLogin: '',
            errorEmail: '',
        }
    }

    changeName(name) {
        this.setState({name});
    }

    changeLogin(login) {
        this.setState({login});
    }

    changeEmail(email) {
        this.setState({email});
    }

    isNameValid(name) {
        let errorName = '';
        if (name === '') {
            errorName = 'Поле не должно быть пустым';
            this.setState({errorName});
            return false;
        }
        this.setState({errorName});
        return true;
    }

    isLoginValid(login) {
        let errorLogin = '';
        if (login === '') {
            errorLogin = 'Поле не должно быть пустым';
            this.setState({errorLogin});
            return false;
        }
        if (login.length < 4) {
            errorLogin = 'Длина логина не может быть меньше 4 символов';
            this.setState({errorLogin});
            return false;
        }
        this.setState({errorLogin});
        return true;
    }

    isEmailValid(email) {
        let errorEmail = '';
        if (email === '') {
            errorEmail = 'Поле не должно быть пустым';
            this.setState({errorEmail});
            return false;
        }
        if (!is.email(email)) {
            errorEmail = 'Неправильно введен email';
            this.setState({errorEmail});
            return false;
        }
        this.setState({errorEmail});
        return true;
    }

    isFormValid() {
        return this.isNameValid(this.state.name) &&
            this.isLoginValid(this.state.login) &&
            this.isEmailValid(this.state.email);
    }


    render() {
        return (
            <div className="form">
                <h2 id="fullName">Account Details</h2>
                <div id="email">
                    <input autoComplete='off' type="text" className="input-auth" id="fullName"
                           onChange={e => {
                               this.changeName(e.target.value);
                               this.isNameValid(e.target.value);
                           }}
                           placeholder="Enter your name"
                           defaultValue={this.props.fieldValues.name}
                           value={this.state.name}
                    />
                    {this.state.errorName ? <span className="label">{this.state.errorName}</span> : null}
                </div>
                <div id="login">
                    <input autoComplete='off' type="text" className="input-auth" id="login"
                           onChange={e => {
                               this.changeLogin(e.target.value);
                               this.isLoginValid(e.target.value);

                           }}
                           placeholder="Enter login"
                           defaultValue={this.props.fieldValues.login}
                           value={this.state.login}
                    />
                    {this.state.errorLogin ? <span className="label">{this.state.errorLogin}</span> : null}
                </div>
                <div id="password">
                    <input autoComplete='off' type="email" className="input-auth" id="login"
                           placeholder="Enter email"
                           defaultValue={this.props.fieldValues.email}
                           onChange={e => {
                               this.changeEmail(e.target.value);
                               this.isEmailValid(e.target.value);
                           }}
                           value={this.state.email}
                    />
                    {this.state.errorEmail ? <span className="label">{this.state.errorEmail}</span> : null}
                </div>
                <div id='buttons'>
                    <button className="firstButt"
                            onClick={() => {
                                if (!this.isFormValid()) {
                                    return
                                }
                                return this.props.nextStep(this.state)
                            }}>
                        Save &amp; Continue
                    </button>
                </div>
            </div>
        )
    }
}

