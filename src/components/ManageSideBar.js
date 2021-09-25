import React from "react";
import {Layout, Menu} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import {ReadOutlined, BarChartOutlined, SendOutlined, UserOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"

const {Sider} = Layout;

class ManageSideBar extends React.Component {
    render() {
        return (
            <Sider>
                <Menu
                    mode="inline"
                >
                    <MenuItem key="1" icon={<ReadOutlined/>}>
                        <Link to="/bookManage">
                            Book Manage
                        </Link>
                    </MenuItem>
                    <MenuItem key="2" icon={<UserOutlined/>}>
                        <Link to="/userManage">
                            User Manage
                        </Link>
                    </MenuItem>
                    <MenuItem key="3" icon={<SendOutlined/>}>
                        <Link to="/orderManage">
                            Order Manage
                        </Link>
                    </MenuItem>
                    <MenuItem key="4" icon={<BarChartOutlined/>}>
                        <Link to="/bestSell">
                            Best Sell
                        </Link>
                    </MenuItem>
                    <MenuItem key="5" icon={<BarChartOutlined/>}>
                        <Link to="/bestConsumer">
                            Best Consumer
                        </Link>
                    </MenuItem>
                </Menu>
            </Sider>
        )
    }
}

export default ManageSideBar;