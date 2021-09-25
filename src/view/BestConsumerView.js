import React from "react";
import {Layout} from "antd";
import "../css/home.css";
import {HeaderInfo} from "../components/HeaderInfo";
import {withRouter} from "react-router-dom";
import ManageSideBar from "../components/ManageSideBar";
import {BestConsumerTable} from "../components/BestConsumerTable";

const {Header, Content, Footer} = Layout;

class BestConsumerView extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <HeaderInfo/>
                </Header>
                <Layout>
                    <ManageSideBar/>
                    <Content style={{padding: '16px 50px'}}>
                        <div className="home-content">
                            <BestConsumerTable/>
                        </div>
                    </Content>
                </Layout>
                <Footer>nothing more</Footer>
            </Layout>
        )
    }
}

export default withRouter(BestConsumerView);