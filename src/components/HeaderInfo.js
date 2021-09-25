import React from "react";
import {Col, Row} from "antd";
import {Link} from "react-router-dom"
import {UserAvatar} from "./UserAvatar";

export class HeaderInfo extends React.Component {
    render() {
        const user = JSON.parse(sessionStorage.getItem("user"))
        return (
            <div>
                <Row gutter={1100}>
                    <Col>
                        <Link to="/">
                            <img src={require("../assets/logo.png").default} alt={"avatar"} className="logo"/>
                        </Link>
                    </Col>
                    <Col justify="center">
                        {user != null ?
                            <UserAvatar user={user}/> :
                            <Link to="/login"> Log In </Link>
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}