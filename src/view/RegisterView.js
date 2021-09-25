import React from 'react';
import {withRouter} from "react-router-dom";
import {RegistrationForm} from "../components/RegistrationForm";

class RegisterView extends React.Component {
    render() {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Register</h1>
                        <div className="login-content">
                            <RegistrationForm/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterView);
