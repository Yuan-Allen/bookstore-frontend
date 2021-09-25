import React from 'react';
import {Avatar, Dropdown, Menu} from 'antd';
import * as userService from '../services/userService'
import {UserOutlined} from "@ant-design/icons";

export class UserAvatar extends React.Component {

    render() {

        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="#" onClick={userService.logout}>
                        Log Out
                    </a>
                </Menu.Item>
            </Menu>
        );

        const {user} = this.props;

        // const imgUrl = config.imgUrl + "/" + user.username + ".jpg";

        return (
            <div id="avatar">
                <span className="name">Hi, {user.username}</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    {/*<Avatar src={imgUrl} style={{cursor:"pointer"}}/>*/}
                    <Avatar style={{backgroundColor: '#e59696'}} icon={<UserOutlined/>} size="large"/>
                </Dropdown>
            </div>
        );
    }
}