import React from "react";
import {Layout} from "antd";
import "../css/home.css";
import {HeaderInfo} from "../components/HeaderInfo";
import {withRouter} from "react-router-dom";
import SideBar from "../components/SideBar";
import {UserStatisticsTable} from "../components/UserStatisticsTable";

const {Header, Content, Footer} = Layout;

class UserStatisticsView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <SideBar/>
                    <Content style={{padding: '16px 50px'}}>
                        <div className="home-content">
                            <UserStatisticsTable/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(UserStatisticsView);