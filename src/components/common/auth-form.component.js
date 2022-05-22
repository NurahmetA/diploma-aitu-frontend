import {useRef, useState} from 'react';

import classes from "./auth-form.module.css"
import AuthService from "../../services/auth.service";

function AuthFormComponent(props) {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const middleNameInputRef = useRef();
    const emailInputRef = useRef();
    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredUsername = usernameInputRef.valueOf().current.value.toString();
        const enteredPassword = passwordInputRef.valueOf().current.value.toString();


        if (isLogin) {
            AuthService.login(enteredUsername, enteredPassword).then(r => {

            });
        } else {
            const enteredFirstName = firstNameInputRef.valueOf().current.value.toString();
            const enteredLastName = lastNameInputRef.valueOf().current.value.toString();
            const enteredMiddleName = middleNameInputRef.valueOf().current.value.toString();
            const enteredEmail = emailInputRef.valueOf().current.value.toString();
            AuthService.register(enteredFirstName, enteredLastName,
                enteredMiddleName, enteredEmail, enteredUsername, enteredPassword);
        }
    }


    return (
        <form onSubmit={submitHandler}>
            <div className="container mt-5 mb-5">
                <div className="d-flex flex row g-0">
                    <div className="col-md-6 mt-3">
                        <div className={"card p-3 " + classes.card1}>
                            <div className="d-flex flex-column">
                                <img src="https://astanait.edu.kz/wp-content/uploads/2020/05/aitu-logo-3.png"
                                     height="40" width="70"/>
                                <span className={classes.login + " mt-3"}>
                                    {isLogin ? "Log in" : "Sign In"}
                                </span>
                            </div>

                            <div className={classes.inputField + " d-flex flex-column mt-3"}>
                                {!isLogin &&
                                    <div className={classes.inputField + " d-flex flex-column mt-3"}>
                                        <div className={classes.signInCard}>
                                            <span>First Name: </span>
                                            <input className={classes.formControl} required
                                                   placeholder="Enter Your First Name" ref={firstNameInputRef}/>
                                        </div>
                                        <div className={classes.signInCard}>
                                            <span>Last Name: </span>
                                            <input className={classes.formControl} required
                                                   placeholder="Enter Your Last Name" ref={lastNameInputRef}/>
                                        </div>
                                        <div className={classes.signInCard}>
                                            <span>Middle Name: </span>
                                            <input className={classes.formControl} required
                                                   placeholder="Enter Your Middle Name" ref={middleNameInputRef}/>
                                        </div>
                                        <div className={classes.signInCard}>
                                            <span>Email: </span>
                                            <input className={classes.formControl} required
                                                   placeholder="Enter Your Email" ref={emailInputRef}/>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <div className={isLogin ? "d-flex flex-column mt-3" : classes.signInCard}>
                                        <span>Username</span>
                                        <input className={classes.formControl} required
                                               placeholder="Enter Your Username" ref={usernameInputRef}/>
                                    </div>

                                    <div className={isLogin ? "d-flex flex-column mt-3" : classes.signInCard}>
                                        <span className="mt-3">Password</span>
                                        <input className={classes.formControl} required type="password"
                                               placeholder="Enter Your Password" ref={passwordInputRef}/>
                                    </div>
                                </div>

                                <button type="submit"
                                        className={"mt-4 btn-dark d-flex justify-content-center align-items-center"
                                            + classes.btn}>
                                    {isLogin ? "Login" : "Sign In"}
                                </button>

                                <div className={classes.text2 + " mt-4 d-flex flex-row align-items-center"}>
                                    <span>
                                        {isLogin ? "Don't have an account? " : "Have an account "}
                                        <a className={classes.register} onClick={switchAuthModeHandler}>
                                            {isLogin ? "Register here" : "Login Here"}
                                        </a>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-6 mt-3">
                        <div className={"card p-3 " + classes.card2}>
                            <div className="image">
                                <a href="https://astanait.edu.kz/">
                                    <img
                                        src="https://astanait.edu.kz/wp-content/uploads/2020/04/aitu-e1589799195486.png"
                                        height="100%" width="100%"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AuthFormComponent;
