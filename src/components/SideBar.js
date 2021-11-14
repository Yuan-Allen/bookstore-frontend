import React from "react";
import {Layout, Menu} from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import {
    ReadOutlined,
    ShoppingCartOutlined,
    SendOutlined,
    BarChartOutlined,
    MessageOutlined,
    SearchOutlined, TagOutlined
} from "@ant-design/icons"
import {Link} from "react-router-dom"

const {Sider} = Layout;

class SideBar extends React.Component {
    render() {
        return (
            <Sider>
                <Menu
                    mode="inline"
                >
                    <MenuItem key="1" icon={<ReadOutlined/>}>
                        <Link to="/">
                            Books
                        </Link>
                    </MenuItem>
                    <MenuItem key="2" icon={<ShoppingCartOutlined/>}>
                        <Link to="/cart">
                            My Cart
                        </Link>
                    </MenuItem>
                    <MenuItem key="3" icon={<SendOutlined/>}>
                        <Link to="/orders">
                            My Orders
                        </Link>
                    </MenuItem>
                    <MenuItem key="4" icon={<BarChartOutlined/>}>
                        <Link to="/userStatistics">
                            Statistics
                        </Link>
                    </MenuItem>
                    <MenuItem key="5" icon={<MessageOutlined />}>
                        <Link to="/chat">
                            Chat
                        </Link>
                    </MenuItem>
                    <MenuItem key="6" icon={<SearchOutlined />}>
                        <Link to="/fullTextSearch">
                            Full Text Search
                        </Link>
                    </MenuItem>
                    <MenuItem key="7" icon={<TagOutlined />}>
                        <Link to="/searchByLabel">
                            Search With Label
                        </Link>
                    </MenuItem>
                </Menu>
            </Sider>
        )
    }
}

export default SideBar;