import React from 'react';
import {Table, message, Switch} from 'antd';
import {getUsers, switchUserAuth} from "../services/userService";

export class UserManageTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user == null) {
            message.error("请登录");
        } else if (user.userType !== 0) {
            message.error("权限不足");
        } else {
            this.updateUsers();
        }
    }

    updateUsers = () => {
        const callback = (data) => {
            this.setState({dataSource: data});
            console.log(data);
        };
        getUsers({"search": null}, callback);
    }

    switchUserAuth = (userId) => {
        const callback = (data) => {
            if (data.status >= 0)
                message.success(data.msg);
            else message.error(data.msg);
        }
        const json = {userId: userId};
        switchUserAuth(json, callback);
    }

    render() {
        const columns = [
            {
                title: "UserId",
                dataIndex: "userId",
                key: "userId",
            },
            {
                title: "UserName",
                dataIndex: "username",
                key: "username",
            },
            {
                title: "Email",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "Address",
                dataIndex: "address",
                key: "address",
            },
            {
                title: "UserType",
                dataIndex: "userType",
                key: "userType",
                render: (text, record) => {
                    console.log(record);
                    return (
                        <div>
                            <Switch
                                checkedChildren={"活跃"}
                                unCheckedChildren={"禁用"}
                                defaultChecked={record.userType !== -1}
                                onChange={() => this.switchUserAuth(record.userId)}
                            />
                        </div>
                    )
                },
            },
        ]
        return (
            <div>
                <Table columns={columns} dataSource={this.state.dataSource}/>
            </div>
        )
    }
}