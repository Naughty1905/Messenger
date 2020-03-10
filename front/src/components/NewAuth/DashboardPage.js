import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {regNewUserReq, loginReq, setAuthError} from '../../redux/actions/actions'
import './dashboardPage.css';
import AccountFields from './AccountFields';
import Confirmation from './Confirmation';
import Success from './Success';
import SurveyFields from './SurveyFields'

const assign = require('object-assign');

const DashboardPage = (props) => {
    const [isReg, setIsReg] = useState(false);
    const [step, setStep] = useState(1);
    const {regNewUserReq, loginReq, setAuthError} = props;
    const [info, setInfo] = useState({});
    const loginHandler = (event) => {
        event.preventDefault();
        const login = event.target.login.value;
        const password = event.target.password.value;
        loginReq(login, password)
    };

    const regHandler = (event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const conpass = event.target.conpass.value;
        if (password !== conpass) {
            setAuthError();
            return;
        }
        const login = event.target.login.value;
        const email = event.target.email.value;
        const fullName = event.target.fullName.value;
        regNewUserReq(login, fullName, email, password)
    };

    let fieldValues = {
        name: null,
        email: null,
        password: null,
        conpass: null
    };

    const saveValues = function (field_value) {
        return function () {
            fieldValues = assign({}, fieldValues, field_value)
        }()
    };

    const changeInfo = obj => {
        console.log('ya tut', obj);
        setInfo((info) => Object.assign(info,obj) );

    }
    const nextStep = function () {
        setStep(step + 1)
    };

    const previousStep = function () {
        setStep(step - 1)
    };

    const submitRegistration = function () {
        nextStep()
    };

    const showStep = function () {
        switch (step) {
            case 1:
                return <AccountFields fieldValues={fieldValues}
                                      nextStep={nextStep}
                                      changeInfo={ changeInfo}
                                      previousStep={previousStep}
                                      saveValues={saveValues}/>;
            case 2:
                return <SurveyFields fieldValues={fieldValues}
                                     nextStep={nextStep}
                                     changeInfo={ changeInfo}
                                     previousStep={previousStep}
                                     saveValues={saveValues}/>;
            case 3:
                return <Confirmation fieldValues={info}
                                     previousStep={previousStep}
                                     submitRegistration={submitRegistration}/>;
            case 4:
                return <Success fieldValues={fieldValues}/>
        }
    };

    return (
        <div className="auth-wrap">
            {
                !isReg ?
                    <form onSubmit={loginHandler} method="POST" className="form">
                        <div className="wrap-input-auth" id="login">
                            <input autoComplete='none' name='login' type="search" className="input-auth"
                                   placeholder='Login'/>
                        </div>
                        <div className="wrap-input-auth" id="password">
                            <input name='password' type="password" className="input-auth" placeholder='Password'/>
                        </div>
                        <div id='buttons' style={{gridRowStart: '6'}}>
                            <button className='firstButt' type='submit'>Login
                            </button>
                            <button className='secondButt' type='submit' onClick={(event) => {
                                event.preventDefault();
                                setIsReg(true)
                            }}>Sign Up
                            </button>
                        </div>
                    </form> :

                    <>
                        {showStep()}
                    </>

            }
        </div>
    );
};

export default connect(
    null,
    {
        regNewUserReq,
        loginReq,
        setAuthError
    })(DashboardPage);


// import React, {useState, useEffect} from 'react';https://youtu.be/mXnJqYwebF8
// import {connect} from 'react-redux'
// import {regNewUserReq, loginReq, setAuthError} from '../../redux/actions/actions'
// import './dashboardPage.css'
//
// const DashboardPage = (props) => {
//     const [isReg, setIsReg] = useState(false);
//
//     const {regNewUserReq, loginReq, setAuthError} = props;
//
//     const loginHandler = (event) => {
//         event.preventDefault();
//         const login = event.target.login.value;
//         const password = event.target.password.value;
//
//         loginReq(login, password)
//     }
//
//     const regHandler = (event) => {
//         event.preventDefault();
//
//         const password = event.target.password.value;
//         const conpass = event.target.conpass.value;
//
//         if (password !== conpass) {
//             setAuthError()
//             return;
//         }
//
//         const login = event.target.login.value;
//         const email = event.target.email.value;
//         const fullName = event.target.fullName.value;
//
//         regNewUserReq(login, fullName, email, password)
//     }
//
//     return (
//         <div className="auth-wrap">
//             {
//                 !isReg ?
//                     <form onSubmit={loginHandler} method="POST" className="form">
//                         <div className="wrap-input-auth" id="login">
//                             <input autoComplete='none' name='login' type="search" className="input-auth"
//                                    placeholder='Login'/>
//                         </div>
//                         <div className="wrap-input-auth" id="password">
//                             <input name='password' type="password" className="input-auth" placeholder='Password'/>
//                         </div>
//                         <div id='buttons' style={{gridRowStart: '6'}}>
//                             <button className='firstButt' type='submit'>Login
//                             </button>
//                             <button className='secondButt' type='submit' onClick={(event) => {
//                                 event.preventDefault();
//                                 setIsReg(true)
//                             }}>Sign Up
//                             </button>
//                         </div>
//                     </form> :
//                     <form onSubmit={regHandler} method="POST" className="form">
//                         <div className="wrap-input-auth" id="fullName">
//                             <input autoComplete='none' name='fullName' type="search" className="input-auth"
//                                    placeholder='Full Name'/>
//                         </div>
//                         <div className="wrap-input-auth" id="email">
//                             <input autoComplete='none' name='email' type="search" className="input-auth"
//                                    placeholder='Email'/>
//                         </div>
//                         <div className="wrap-input-auth" id="login">
//                             <input autoComplete='none' name='login' type="search" className="input-auth"
//                                    placeholder='Login'/>
//                         </div>
//                         <div className="wrap-input-auth" id="password">
//                             <input name='password' type="password" className="input-auth" placeholder='Password'/>
//                         </div>
//                         <div className="wrap-input-auth" id="conpass">
//                             <input name='conpass' type="password" className="input-auth"
//                                    placeholder='Confirm Password'/>
//                         </div>
//                         <div id='buttons'>
//                             <button className='firstButt' type='submit'>Register
//                             </button>
//
//                             <button className='secondButt' type='submit' onClick={(event) => {
//                                 event.preventDefault();
//                                 setIsReg(false)
//                             }}>Sign In
//                             </button>
//                         </div>
//                     </form>
//             }
//         </div>
//     );
// }
//
// export default connect(
//     null,
//     {
//         regNewUserReq,
//         loginReq,
//         setAuthError
//     })(DashboardPage);
